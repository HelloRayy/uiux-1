import { ref, onValue, set, update, get } from 'firebase/database';
import { initFirebase } from './firebase';
import { GameRoomState, GameStatus, Participant, VoteOption } from '../types';

const DEFAULT_ROOM_ID = 'MAIN';

export const INITIAL_ROOM_STATE: GameRoomState = {
  roomId: DEFAULT_ROOM_ID,
  status: 'LOBBY',
  currentSlideIndex: 0,
  timerDuration: 30,
  timerRemaining: 30,
  timerRunning: false,
  participants: {},
  votes: {},
  updatedAt: Date.now(),
};

// Check if BroadcastChannel is supported (for local fallback across browser tabs)
const localChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('uiux_split_vote_channel')
  : null;

// Compute accurate real-time countdown from fixed start timestamp
export function computeAccurateState(raw: GameRoomState): GameRoomState {
  if (raw.status === 'VOTING' && raw.timerRunning && raw.timerStartedAt) {
    const elapsed = Math.floor((Date.now() - raw.timerStartedAt) / 1000);
    const realRemaining = Math.max(0, raw.timerDuration - elapsed);
    if (realRemaining <= 0) {
      return {
        ...raw,
        timerRemaining: 0,
        timerRunning: false,
        status: 'REVEAL',
      };
    }
    return {
      ...raw,
      timerRemaining: realRemaining,
    };
  }
  return raw;
}

function getLocalRoomState(): GameRoomState {
  if (typeof window === 'undefined') return INITIAL_ROOM_STATE;
  try {
    const saved = localStorage.getItem(`uiux_room_${DEFAULT_ROOM_ID}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      return computeAccurateState({ ...INITIAL_ROOM_STATE, ...parsed });
    }
  } catch {
    // fallback
  }
  return INITIAL_ROOM_STATE;
}

function saveLocalRoomState(state: GameRoomState) {
  if (typeof window === 'undefined') return;
  try {
    const accurate = computeAccurateState(state);
    localStorage.setItem(`uiux_room_${DEFAULT_ROOM_ID}`, JSON.stringify(accurate));
    localChannel?.postMessage({ type: 'STATE_UPDATE', state: accurate });
  } catch {
    // fallback
  }
}

export class RealtimeService {
  private isFirebase: boolean = false;
  private db: ReturnType<typeof initFirebase>['db'] = null;

  constructor() {
    const fb = initFirebase();
    this.isFirebase = fb.isConfigured && fb.db !== null;
    this.db = fb.db;
  }

  public getIsFirebaseConnected(): boolean {
    return this.isFirebase;
  }

  // Subscribe to room state updates
  public subscribeToRoom(roomId: string = DEFAULT_ROOM_ID, callback: (state: GameRoomState) => void): () => void {
    if (this.isFirebase && this.db) {
      const roomRef = ref(this.db, `rooms/${roomId}`);
      
      // Ensure initial room exists
      get(roomRef).then((snapshot) => {
        if (!snapshot.exists()) {
          set(roomRef, INITIAL_ROOM_STATE);
        }
      });

      const unsubscribe = onValue(roomRef, (snapshot) => {
        if (snapshot.exists()) {
          const val = snapshot.val();
          const baseState: GameRoomState = {
            roomId: val.roomId || roomId,
            status: val.status || 'LOBBY',
            currentSlideIndex: typeof val.currentSlideIndex === 'number' ? val.currentSlideIndex : 0,
            timerDuration: val.timerDuration || 30,
            timerRemaining: typeof val.timerRemaining === 'number' ? val.timerRemaining : 30,
            timerRunning: !!val.timerRunning,
            timerStartedAt: val.timerStartedAt,
            participants: val.participants || {},
            votes: val.votes || {},
            updatedAt: val.updatedAt || Date.now(),
          };
          callback(computeAccurateState(baseState));
        } else {
          callback(INITIAL_ROOM_STATE);
        }
      });

      return () => unsubscribe();
    } else {
      // Local broadcast + localStorage fallback mode
      const currentState = getLocalRoomState();
      callback(currentState);

      let lastJson = JSON.stringify(currentState);

      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === 'STATE_UPDATE' && event.data.state) {
          const accurate = computeAccurateState(event.data.state);
          lastJson = JSON.stringify(accurate);
          callback(accurate);
        }
      };

      const handleStorage = (event: StorageEvent) => {
        if (event.key === `uiux_room_${DEFAULT_ROOM_ID}` && event.newValue) {
          try {
            const parsed = JSON.parse(event.newValue);
            const accurate = computeAccurateState(parsed);
            lastJson = JSON.stringify(accurate);
            callback(accurate);
          } catch {
            // ignore
          }
        }
      };

      // Periodic safety net polling (every 300ms) to ensure zero-lag synchronization across tabs
      const pollInterval = window.setInterval(() => {
        const freshState = getLocalRoomState();
        const freshJson = JSON.stringify(freshState);
        if (freshJson !== lastJson) {
          lastJson = freshJson;
          callback(freshState);
        }
      }, 300);

      localChannel?.addEventListener('message', handleMessage);
      window.addEventListener('storage', handleStorage);

      return () => {
        window.clearInterval(pollInterval);
        localChannel?.removeEventListener('message', handleMessage);
        window.removeEventListener('storage', handleStorage);
      };
    }
  }

  // Join as participant
  public async joinParticipant(participant: Participant, roomId: string = DEFAULT_ROOM_ID) {
    if (this.isFirebase && this.db) {
      const pRef = ref(this.db, `rooms/${roomId}/participants/${participant.id}`);
      await set(pRef, participant);
    } else {
      const state = getLocalRoomState();
      const nextParticipants = { ...state.participants, [participant.id]: participant };
      const nextState = { ...state, participants: nextParticipants, updatedAt: Date.now() };
      saveLocalRoomState(nextState);
    }
  }

  // Submit vote without ever resetting the running timer
  public async submitVote(participantId: string, option: VoteOption, roomId: string = DEFAULT_ROOM_ID) {
    if (this.isFirebase && this.db) {
      const vRef = ref(this.db, `rooms/${roomId}/votes/${participantId}`);
      await set(vRef, option);
    } else {
      const state = getLocalRoomState();
      let currentRemaining = state.timerRemaining;
      if (state.timerRunning && state.timerStartedAt) {
        const elapsed = Math.floor((Date.now() - state.timerStartedAt) / 1000);
        currentRemaining = Math.max(0, state.timerDuration - elapsed);
      }
      const nextVotes = { ...state.votes, [participantId]: option };
      const nextState = {
        ...state,
        votes: nextVotes,
        timerRemaining: currentRemaining,
        updatedAt: Date.now(),
      };
      saveLocalRoomState(nextState);
    }
  }

  // Admin: Show Tutorial Page
  public async showTutorial(roomId: string = DEFAULT_ROOM_ID) {
    const now = Date.now();
    const updates = {
      status: 'TUTORIAL' as GameStatus,
      currentSlideIndex: 0,
      timerRunning: false,
      timerRemaining: 30,
      timerStartedAt: undefined,
      votes: {},
      updatedAt: now,
    };

    if (this.isFirebase && this.db) {
      const roomRef = ref(this.db, `rooms/${roomId}`);
      await update(roomRef, updates);
    } else {
      const state = getLocalRoomState();
      const nextState = { ...state, ...updates };
      saveLocalRoomState(nextState);
    }
  }

  // Admin: Start round voting
  public async startVoting(duration: number = 30, roomId: string = DEFAULT_ROOM_ID) {
    const now = Date.now();
    const updates = {
      status: 'VOTING' as GameStatus,
      timerDuration: duration,
      timerRemaining: duration,
      timerRunning: true,
      timerStartedAt: now,
      votes: {}, // reset votes for new round
      updatedAt: now,
    };

    if (this.isFirebase && this.db) {
      const roomRef = ref(this.db, `rooms/${roomId}`);
      await update(roomRef, updates);
    } else {
      const state = getLocalRoomState();
      const nextState = { ...state, ...updates };
      saveLocalRoomState(nextState);
    }
  }

  // Admin: Force End Vote & Reveal
  public async endVoting(roomId: string = DEFAULT_ROOM_ID) {
    const updates = {
      status: 'REVEAL' as GameStatus,
      timerRunning: false,
      timerRemaining: 0,
      updatedAt: Date.now(),
    };

    if (this.isFirebase && this.db) {
      const roomRef = ref(this.db, `rooms/${roomId}`);
      await update(roomRef, updates);
    } else {
      const state = getLocalRoomState();
      const nextState = { ...state, ...updates };
      saveLocalRoomState(nextState);
    }
  }

  // Admin: Next Slide / Jump to Slide
  public async nextSlide(nextIndex: number, roomId: string = DEFAULT_ROOM_ID, autoStartVoting: boolean = true) {
    const now = Date.now();
    const updates = {
      status: (autoStartVoting ? 'VOTING' : 'LOBBY') as GameStatus,
      currentSlideIndex: nextIndex,
      timerRunning: autoStartVoting,
      timerDuration: 30,
      timerRemaining: 30,
      timerStartedAt: autoStartVoting ? now : undefined,
      votes: {}, // reset votes for next slide
      updatedAt: now,
    };

    if (this.isFirebase && this.db) {
      const roomRef = ref(this.db, `rooms/${roomId}`);
      await update(roomRef, updates);
    } else {
      const state = getLocalRoomState();
      const nextState = { ...state, ...updates };
      saveLocalRoomState(nextState);
    }
  }

  // Admin: Prev Slide
  public async prevSlide(prevIndex: number, roomId: string = DEFAULT_ROOM_ID, autoStartVoting: boolean = true) {
    const now = Date.now();
    const updates = {
      status: (autoStartVoting ? 'VOTING' : 'LOBBY') as GameStatus,
      currentSlideIndex: Math.max(0, prevIndex),
      timerRunning: autoStartVoting,
      timerDuration: 30,
      timerRemaining: 30,
      timerStartedAt: autoStartVoting ? now : undefined,
      votes: {},
      updatedAt: now,
    };

    if (this.isFirebase && this.db) {
      const roomRef = ref(this.db, `rooms/${roomId}`);
      await update(roomRef, updates);
    } else {
      const state = getLocalRoomState();
      const nextState = { ...state, ...updates };
      saveLocalRoomState(nextState);
    }
  }

  // Admin: Reset entire game to Lobby & slide 0
  public async resetGame(roomId: string = DEFAULT_ROOM_ID) {
    const resetState: GameRoomState = {
      ...INITIAL_ROOM_STATE,
      roomId,
      participants: {},
      votes: {},
      updatedAt: Date.now(),
    };

    if (this.isFirebase && this.db) {
      const roomRef = ref(this.db, `rooms/${roomId}`);
      await set(roomRef, resetState);
    } else {
      saveLocalRoomState(resetState);
    }
  }

  // Sync Timer tick
  public async syncTimerTick(remaining: number, roomId: string = DEFAULT_ROOM_ID) {
    if (this.isFirebase && this.db) {
      const roomRef = ref(this.db, `rooms/${roomId}`);
      await update(roomRef, {
        timerRemaining: remaining,
        timerRunning: remaining > 0,
        status: remaining <= 0 ? 'REVEAL' : 'VOTING',
        updatedAt: Date.now(),
      });
    } else {
      const state = getLocalRoomState();
      const nextState = {
        ...state,
        timerRemaining: remaining,
        timerRunning: remaining > 0,
        status: (remaining <= 0 ? 'REVEAL' : state.status) as GameStatus,
        updatedAt: Date.now(),
      };
      saveLocalRoomState(nextState);
    }
  }
}

export const realtimeService = new RealtimeService();

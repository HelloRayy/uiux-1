import { ref, onValue, set, update, get } from 'firebase/database';
import { initFirebase } from './firebase';
import {
  GameRoomState,
  GameStatus,
  Game2RoomState,
  Game2Status,
  Participant,
  VoteOption,
  VoteRecord2,
} from '../types';

const DEFAULT_ROOM_ID = 'MAIN';
const DEFAULT_ROOM_2_ID = 'UIUX_2';

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

export const INITIAL_ROOM_2_STATE: Game2RoomState = {
  roomId: DEFAULT_ROOM_2_ID,
  status: 'LOBBY',
  currentSlideIndex: 0,
  timerDuration: 30,
  timerRemaining: 30,
  timerRunning: false,
  participants: {},
  votes: {},
  scores: {},
  lastRoundScores: {},
  updatedAt: Date.now(),
};

// Check if BroadcastChannel is supported (for local fallback across browser tabs)
const localChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('uiux_split_vote_channel')
  : null;

// Compute accurate real-time countdown for Game 1
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

// Compute accurate real-time countdown for Game 2
export function computeAccurateState2(raw: Game2RoomState): Game2RoomState {
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

function getLocalRoom2State(): Game2RoomState {
  if (typeof window === 'undefined') return INITIAL_ROOM_2_STATE;
  try {
    const saved = localStorage.getItem(`uiux_room_${DEFAULT_ROOM_2_ID}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      return computeAccurateState2({ ...INITIAL_ROOM_2_STATE, ...parsed });
    }
  } catch {
    // fallback
  }
  return INITIAL_ROOM_2_STATE;
}

function saveLocalRoom2State(state: Game2RoomState) {
  if (typeof window === 'undefined') return;
  try {
    const accurate = computeAccurateState2(state);
    localStorage.setItem(`uiux_room_${DEFAULT_ROOM_2_ID}`, JSON.stringify(accurate));
    localChannel?.postMessage({ type: 'STATE_2_UPDATE', state: accurate });
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

  // =========================================================================
  // GAME 1 METHODS
  // =========================================================================

  public subscribeToRoom(roomId: string = DEFAULT_ROOM_ID, callback: (state: GameRoomState) => void): () => void {
    if (this.isFirebase && this.db) {
      const roomRef = ref(this.db, `rooms/${roomId}`);
      
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

  public async startVoting(duration: number = 30, roomId: string = DEFAULT_ROOM_ID) {
    const now = Date.now();
    const updates = {
      status: 'VOTING' as GameStatus,
      timerDuration: duration,
      timerRemaining: duration,
      timerRunning: true,
      timerStartedAt: now,
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

  public async nextSlide(nextIndex: number, roomId: string = DEFAULT_ROOM_ID, autoStartVoting: boolean = true) {
    const now = Date.now();
    const updates = {
      status: (autoStartVoting ? 'VOTING' : 'LOBBY') as GameStatus,
      currentSlideIndex: nextIndex,
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

  // =========================================================================
  // GAME 2 (UIUX-2) METHODS WITH SCORING ENGINE & LEADERBOARD
  // =========================================================================

  public subscribeToRoom2(roomId: string = DEFAULT_ROOM_2_ID, callback: (state: Game2RoomState) => void): () => void {
    if (this.isFirebase && this.db) {
      const roomRef = ref(this.db, `rooms/${roomId}`);
      
      get(roomRef).then((snapshot) => {
        if (!snapshot.exists()) {
          set(roomRef, INITIAL_ROOM_2_STATE);
        }
      });

      const unsubscribe = onValue(roomRef, (snapshot) => {
        if (snapshot.exists()) {
          const val = snapshot.val();
          const baseState: Game2RoomState = {
            roomId: val.roomId || roomId,
            status: val.status || 'LOBBY',
            currentSlideIndex: typeof val.currentSlideIndex === 'number' ? val.currentSlideIndex : 0,
            timerDuration: val.timerDuration || 30,
            timerRemaining: typeof val.timerRemaining === 'number' ? val.timerRemaining : 30,
            timerRunning: !!val.timerRunning,
            timerStartedAt: val.timerStartedAt,
            participants: val.participants || {},
            votes: val.votes || {},
            scores: val.scores || {},
            lastRoundScores: val.lastRoundScores || {},
            updatedAt: val.updatedAt || Date.now(),
          };
          callback(computeAccurateState2(baseState));
        } else {
          callback(INITIAL_ROOM_2_STATE);
        }
      });

      return () => unsubscribe();
    } else {
      const currentState = getLocalRoom2State();
      callback(currentState);

      let lastJson = JSON.stringify(currentState);

      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === 'STATE_2_UPDATE' && event.data.state) {
          const accurate = computeAccurateState2(event.data.state);
          lastJson = JSON.stringify(accurate);
          callback(accurate);
        }
      };

      const handleStorage = (event: StorageEvent) => {
        if (event.key === `uiux_room_${DEFAULT_ROOM_2_ID}` && event.newValue) {
          try {
            const parsed = JSON.parse(event.newValue);
            const accurate = computeAccurateState2(parsed);
            lastJson = JSON.stringify(accurate);
            callback(accurate);
          } catch {
            // ignore
          }
        }
      };

      const pollInterval = window.setInterval(() => {
        const freshState = getLocalRoom2State();
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

  public async joinParticipant2(participant: Participant, roomId: string = DEFAULT_ROOM_2_ID) {
    if (this.isFirebase && this.db) {
      const pRef = ref(this.db, `rooms/${roomId}/participants/${participant.id}`);
      await set(pRef, participant);
    } else {
      const state = getLocalRoom2State();
      const nextParticipants = { ...state.participants, [participant.id]: participant };
      const nextState = { ...state, participants: nextParticipants, updatedAt: Date.now() };
      saveLocalRoom2State(nextState);
    }
  }

  // Submit vote with timestamp for Kahoot-style speed bonus
  public async submitVote2(participantId: string, option: VoteOption, roomId: string = DEFAULT_ROOM_2_ID) {
    const record: VoteRecord2 = {
      participantId,
      option,
      timestamp: Date.now(),
    };

    if (this.isFirebase && this.db) {
      const vRef = ref(this.db, `rooms/${roomId}/votes/${participantId}`);
      await set(vRef, record);
    } else {
      const state = getLocalRoom2State();
      const nextVotes = { ...state.votes, [participantId]: record };
      const nextState = {
        ...state,
        votes: nextVotes,
        updatedAt: Date.now(),
      };
      saveLocalRoom2State(nextState);
    }
  }

  public async showTutorial2(roomId: string = DEFAULT_ROOM_2_ID) {
    const now = Date.now();
    const updates = {
      status: 'TUTORIAL' as Game2Status,
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
      const state = getLocalRoom2State();
      const nextState = { ...state, ...updates };
      saveLocalRoom2State(nextState);
    }
  }

  public async startVoting2(duration: number = 30, roomId: string = DEFAULT_ROOM_2_ID) {
    const now = Date.now();
    const updates = {
      status: 'VOTING' as Game2Status,
      timerDuration: duration,
      timerRemaining: duration,
      timerRunning: true,
      timerStartedAt: now,
      votes: {}, // reset votes for new round
      lastRoundScores: {},
      updatedAt: now,
    };

    if (this.isFirebase && this.db) {
      const roomRef = ref(this.db, `rooms/${roomId}`);
      await update(roomRef, updates);
    } else {
      const state = getLocalRoom2State();
      const nextState = { ...state, ...updates };
      saveLocalRoom2State(nextState);
    }
  }

  // End voting and compute Kahoot-style speed score
  public async endVoting2(correctOption: VoteOption, roomId: string = DEFAULT_ROOM_2_ID) {
    let currentState = getLocalRoom2State();

    if (this.isFirebase && this.db) {
      const roomRef = ref(this.db, `rooms/${roomId}`);
      const snap = await get(roomRef);
      if (snap.exists()) {
        currentState = snap.val();
      }
    }

    const votes = currentState.votes || {};
    const scores = { ...(currentState.scores || {}) };
    const lastRoundScores: Record<string, number> = {};
    const timerStartedAt = currentState.timerStartedAt || Date.now() - 30000;
    const duration = currentState.timerDuration || 30;

    Object.values(votes).forEach((vote) => {
      if (vote.option === correctOption) {
        // Speed calculation: (0 to duration seconds)
        const elapsed = Math.max(0, Math.min(duration, (vote.timestamp - timerStartedAt) / 1000));
        const speedRatio = 1 - elapsed / duration;
        // Points: 500 base + up to 500 speed bonus = 500 to 1000 pts
        const earned = Math.max(500, Math.round(500 + 500 * speedRatio));
        scores[vote.participantId] = (scores[vote.participantId] || 0) + earned;
        lastRoundScores[vote.participantId] = earned;
      } else {
        lastRoundScores[vote.participantId] = 0;
      }
    });

    const updates = {
      status: 'REVEAL' as Game2Status,
      timerRunning: false,
      timerRemaining: 0,
      scores,
      lastRoundScores,
      updatedAt: Date.now(),
    };

    if (this.isFirebase && this.db) {
      const roomRef = ref(this.db, `rooms/${roomId}`);
      await update(roomRef, updates);
    } else {
      const nextState = { ...currentState, ...updates };
      saveLocalRoom2State(nextState);
    }
  }

  public async showLeaderboard2(roomId: string = DEFAULT_ROOM_2_ID) {
    const updates = {
      status: 'LEADERBOARD' as Game2Status,
      timerRunning: false,
      updatedAt: Date.now(),
    };

    if (this.isFirebase && this.db) {
      const roomRef = ref(this.db, `rooms/${roomId}`);
      await update(roomRef, updates);
    } else {
      const state = getLocalRoom2State();
      const nextState = { ...state, ...updates };
      saveLocalRoom2State(nextState);
    }
  }

  public async nextSlide2(nextIndex: number, roomId: string = DEFAULT_ROOM_2_ID, autoStartVoting: boolean = true) {
    const now = Date.now();
    const updates = {
      status: (autoStartVoting ? 'VOTING' : 'LOBBY') as Game2Status,
      currentSlideIndex: nextIndex,
      timerRunning: autoStartVoting,
      timerDuration: 30,
      timerRemaining: 30,
      timerStartedAt: autoStartVoting ? now : undefined,
      votes: {},
      lastRoundScores: {},
      updatedAt: now,
    };

    if (this.isFirebase && this.db) {
      const roomRef = ref(this.db, `rooms/${roomId}`);
      await update(roomRef, updates);
    } else {
      const state = getLocalRoom2State();
      const nextState = { ...state, ...updates };
      saveLocalRoom2State(nextState);
    }
  }

  public async prevSlide2(prevIndex: number, roomId: string = DEFAULT_ROOM_2_ID, autoStartVoting: boolean = true) {
    const now = Date.now();
    const updates = {
      status: (autoStartVoting ? 'VOTING' : 'LOBBY') as Game2Status,
      currentSlideIndex: Math.max(0, prevIndex),
      timerRunning: autoStartVoting,
      timerDuration: 30,
      timerRemaining: 30,
      timerStartedAt: autoStartVoting ? now : undefined,
      votes: {},
      lastRoundScores: {},
      updatedAt: now,
    };

    if (this.isFirebase && this.db) {
      const roomRef = ref(this.db, `rooms/${roomId}`);
      await update(roomRef, updates);
    } else {
      const state = getLocalRoom2State();
      const nextState = { ...state, ...updates };
      saveLocalRoom2State(nextState);
    }
  }

  public async finishGame2(roomId: string = DEFAULT_ROOM_2_ID) {
    const updates = {
      status: 'FINISHED' as Game2Status,
      timerRunning: false,
      updatedAt: Date.now(),
    };

    if (this.isFirebase && this.db) {
      const roomRef = ref(this.db, `rooms/${roomId}`);
      await update(roomRef, updates);
    } else {
      const state = getLocalRoom2State();
      const nextState = { ...state, ...updates };
      saveLocalRoom2State(nextState);
    }
  }

  public async resetGame2(roomId: string = DEFAULT_ROOM_2_ID) {
    const resetState: Game2RoomState = {
      ...INITIAL_ROOM_2_STATE,
      roomId,
      participants: {},
      votes: {},
      scores: {},
      lastRoundScores: {},
      updatedAt: Date.now(),
    };

    if (this.isFirebase && this.db) {
      const roomRef = ref(this.db, `rooms/${roomId}`);
      await set(roomRef, resetState);
    } else {
      saveLocalRoom2State(resetState);
    }
  }
}

export const realtimeService = new RealtimeService();

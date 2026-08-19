import React, { createContext, useContext, useEffect, useState, useMemo, useRef } from 'react';
import { GameRoomState, Participant, VoteOption } from '../types';
import { realtimeService, INITIAL_ROOM_STATE } from '../services/realtimeService';
import { SLIDES_DATA, RegisteredSlide } from '../data/slides';
import { soundEffects } from '../services/audioService';
import { navigateTo, parseRoute } from '../utils/navigation';

interface GameContextType {
  roomState: GameRoomState;
  currentSlide: RegisteredSlide;
  totalSlides: number;
  myParticipant: Participant | null;
  myVote: VoteOption | null;
  isFirebase: boolean;
  soundEnabled: boolean;
  toggleSound: () => void;
  // Stats
  totalVotes: number;
  votesCountA: number;
  votesCountB: number;
  percentA: number;
  percentB: number;
  totalParticipants: number;
  // Actions
  joinAsParticipant: (nickname: string) => Promise<Participant>;
  submitMyVote: (option: VoteOption) => Promise<void>;
  startRound: (duration?: number) => Promise<void>;
  endRound: () => Promise<void>;
  nextRound: () => Promise<void>;
  prevRound: () => Promise<void>;
  jumpToRound: (index: number) => Promise<void>;
  resetAll: () => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const PARTICIPANT_STORAGE_KEY = 'uiux_participant_session';

interface GameProviderProps {
  children: React.ReactNode;
  initialRoute?: ReturnType<typeof parseRoute>;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children, initialRoute }) => {
  // Initialize state directly from dynamic URL if direct slide number was passed (e.g. /1, /2, /3)
  const [roomState, setRoomState] = useState<GameRoomState>(() => {
    if (initialRoute?.slideNumber) {
      return {
        ...INITIAL_ROOM_STATE,
        currentSlideIndex: initialRoute.slideNumber - 1,
        status: 'VOTING',
        timerRunning: true,
        timerRemaining: 30,
      };
    }
    return INITIAL_ROOM_STATE;
  });

  const [myParticipant, setMyParticipant] = useState<Participant | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const timerIntervalRef = useRef<number | null>(null);

  // Restore participant session from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PARTICIPANT_STORAGE_KEY);
      if (saved) {
        setMyParticipant(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Listen to popstate changes to handle back/forward button in browser
  useEffect(() => {
    const handleUrlChange = () => {
      const parsed = parseRoute(window.location.pathname);
      if (parsed.slideNumber !== null) {
        const targetIndex = parsed.slideNumber - 1;
        setRoomState((prev) => {
          if (prev.currentSlideIndex !== targetIndex || prev.status === 'LOBBY') {
            return {
              ...prev,
              currentSlideIndex: targetIndex,
              status: 'VOTING',
            };
          }
          return prev;
        });
        if (parsed.role === 'HOST' || parsed.role === 'ADMIN') {
          realtimeService.nextSlide(targetIndex, 'MAIN', true);
        }
      } else if (parsed.role === 'HOST' && window.location.pathname === '/') {
        setRoomState((prev) => ({
          ...prev,
          status: 'LOBBY',
        }));
        realtimeService.resetGame('MAIN');
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Subscribe to Realtime Service
  useEffect(() => {
    const unsubscribe = realtimeService.subscribeToRoom('MAIN', (updatedState) => {
      setRoomState(updatedState);

      // Dynamically sync URL on host / admin devices when remote slide changes
      const currentRoute = parseRoute(window.location.pathname);
      if (currentRoute.role === 'HOST') {
        if (updatedState.status === 'LOBBY' && window.location.pathname !== '/') {
          navigateTo('/');
        } else if (
          (updatedState.status === 'VOTING' || updatedState.status === 'REVEAL') &&
          typeof updatedState.currentSlideIndex === 'number'
        ) {
          const targetPath = `/${updatedState.currentSlideIndex + 1}`;
          if (window.location.pathname !== targetPath) {
            navigateTo(targetPath);
          }
        }
      } else if (currentRoute.role === 'ADMIN') {
        if (
          (updatedState.status === 'VOTING' || updatedState.status === 'REVEAL') &&
          typeof updatedState.currentSlideIndex === 'number'
        ) {
          const targetPath = `/admin/${updatedState.currentSlideIndex + 1}`;
          if (window.location.pathname !== targetPath) {
            navigateTo(targetPath);
          }
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Initial sync on mount if host loads a direct slide like /1 or /2
  useEffect(() => {
    const currentRoute = parseRoute(window.location.pathname);
    if (currentRoute.role === 'HOST' && currentRoute.slideNumber !== null) {
      const targetIdx = currentRoute.slideNumber - 1;
      realtimeService.nextSlide(targetIdx, 'MAIN', true);
    }
  }, []);

  // Timer Ticker Logic (Deterministic Timestamp-based Clock)
  useEffect(() => {
    if (timerIntervalRef.current) {
      window.clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (roomState.status === 'VOTING' && roomState.timerRunning) {
      timerIntervalRef.current = window.setInterval(() => {
        setRoomState((prev) => {
          if (!prev.timerRunning || prev.status !== 'VOTING') {
            if (timerIntervalRef.current) window.clearInterval(timerIntervalRef.current);
            return prev;
          }

          let nextRemaining = prev.timerRemaining;
          if (prev.timerStartedAt) {
            const elapsed = Math.floor((Date.now() - prev.timerStartedAt) / 1000);
            nextRemaining = Math.max(0, prev.timerDuration - elapsed);
          } else {
            nextRemaining = Math.max(0, prev.timerRemaining - 1);
          }

          // Sound effect tick
          if (nextRemaining <= 5 && nextRemaining > 0 && nextRemaining !== prev.timerRemaining) {
            soundEffects.playTick(true);
          } else if (nextRemaining > 5 && nextRemaining !== prev.timerRemaining) {
            soundEffects.playTick(false);
          }

          if (nextRemaining <= 0) {
            soundEffects.playTimesUp();
            realtimeService.endVoting(prev.roomId);
            return {
              ...prev,
              timerRemaining: 0,
              timerRunning: false,
              status: 'REVEAL',
            };
          }

          if (nextRemaining === prev.timerRemaining) {
            return prev;
          }

          return {
            ...prev,
            timerRemaining: nextRemaining,
          };
        });
      }, 500);
    }

    return () => {
      if (timerIntervalRef.current) {
        window.clearInterval(timerIntervalRef.current);
      }
    };
  }, [roomState.status, roomState.timerRunning, roomState.timerStartedAt]);

  // Current Slide
  const currentSlideIndex = Math.min(
    Math.max(0, roomState.currentSlideIndex || 0),
    SLIDES_DATA.length - 1
  );
  const currentSlide: RegisteredSlide = SLIDES_DATA[currentSlideIndex] || SLIDES_DATA[0];

  // Calculated Statistics
  const totalParticipants = useMemo(() => {
    return Object.keys(roomState.participants || {}).length;
  }, [roomState.participants]);

  const { votesCountA, votesCountB, totalVotes, percentA, percentB } = useMemo(() => {
    const votes = Object.values(roomState.votes || {});
    const countA = votes.filter((v) => v === 'A').length;
    const countB = votes.filter((v) => v === 'B').length;
    const total = countA + countB;
    const pA = total > 0 ? Math.round((countA / total) * 100) : 0;
    const pB = total > 0 ? 100 - pA : 0;
    return {
      votesCountA: countA,
      votesCountB: countB,
      totalVotes: total,
      percentA: pA,
      percentB: pB,
    };
  }, [roomState.votes]);

  const myVote: VoteOption | null = useMemo(() => {
    if (!myParticipant) return null;
    return roomState.votes?.[myParticipant.id] || null;
  }, [roomState.votes, myParticipant]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEffects.setEnabled(next);
  };

  const joinAsParticipant = async (nickname: string): Promise<Participant> => {
    const participant: Participant = {
      id: 'p_' + Math.random().toString(36).substring(2, 9),
      nickname,
      joinedAt: Date.now(),
      lastActive: Date.now(),
    };
    await realtimeService.joinParticipant(participant, roomState.roomId);
    setMyParticipant(participant);
    try {
      localStorage.setItem(PARTICIPANT_STORAGE_KEY, JSON.stringify(participant));
    } catch {
      // ignore
    }
    soundEffects.playJoin();
    return participant;
  };

  const submitMyVote = async (option: VoteOption) => {
    if (!myParticipant) return;
    soundEffects.playVoteSubmitted();
    await realtimeService.submitVote(myParticipant.id, option, roomState.roomId);
  };

  // Admin / Host actions with dynamic URL synchronization
  const startRound = async (duration: number = 30) => {
    soundEffects.playTick(false);
    const targetIdx = roomState.currentSlideIndex || 0;
    
    // Update local URL instantly
    const parsed = parseRoute(window.location.pathname);
    if (parsed.role === 'HOST') {
      navigateTo(`/${targetIdx + 1}`);
    } else if (parsed.role === 'ADMIN') {
      navigateTo(`/admin/${targetIdx + 1}`);
    }

    await realtimeService.startVoting(duration, roomState.roomId);
  };

  const endRound = async () => {
    soundEffects.playReveal();
    await realtimeService.endVoting(roomState.roomId);
  };

  const nextRound = async () => {
    const nextIdx = Math.min(SLIDES_DATA.length - 1, currentSlideIndex + 1);
    
    const parsed = parseRoute(window.location.pathname);
    if (parsed.role === 'HOST') {
      navigateTo(`/${nextIdx + 1}`);
    } else if (parsed.role === 'ADMIN') {
      navigateTo(`/admin/${nextIdx + 1}`);
    }

    await realtimeService.nextSlide(nextIdx, roomState.roomId, true);
  };

  const prevRound = async () => {
    const prevIdx = Math.max(0, currentSlideIndex - 1);
    
    const parsed = parseRoute(window.location.pathname);
    if (parsed.role === 'HOST') {
      navigateTo(`/${prevIdx + 1}`);
    } else if (parsed.role === 'ADMIN') {
      navigateTo(`/admin/${prevIdx + 1}`);
    }

    await realtimeService.prevSlide(prevIdx, roomState.roomId, true);
  };

  const jumpToRound = async (index: number) => {
    const targetIdx = Math.max(0, Math.min(SLIDES_DATA.length - 1, index));
    
    const parsed = parseRoute(window.location.pathname);
    if (parsed.role === 'HOST') {
      navigateTo(`/${targetIdx + 1}`);
    } else if (parsed.role === 'ADMIN') {
      navigateTo(`/admin/${targetIdx + 1}`);
    }

    await realtimeService.nextSlide(targetIdx, roomState.roomId, true);
  };

  const resetAll = async () => {
    const parsed = parseRoute(window.location.pathname);
    if (parsed.role === 'HOST') {
      navigateTo('/');
    } else if (parsed.role === 'ADMIN') {
      navigateTo('/admin');
    }

    await realtimeService.resetGame(roomState.roomId);
  };

  return (
    <GameContext.Provider
      value={{
        roomState,
        currentSlide,
        totalSlides: SLIDES_DATA.length,
        myParticipant,
        myVote,
        isFirebase: realtimeService.getIsFirebaseConnected(),
        soundEnabled,
        toggleSound,
        totalVotes,
        votesCountA,
        votesCountB,
        percentA,
        percentB,
        totalParticipants,
        joinAsParticipant,
        submitMyVote,
        startRound,
        endRound,
        nextRound,
        prevRound,
        jumpToRound,
        resetAll,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

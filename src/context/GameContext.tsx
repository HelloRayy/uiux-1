import React, { createContext, useContext, useEffect, useState, useRef, useMemo } from 'react';
import { GameRoomState, Participant, VoteOption } from '../types';
import { realtimeService, INITIAL_ROOM_STATE } from '../services/realtimeService';
import { soundEffects } from '../services/audioService';
import { SLIDES_DATA, RegisteredSlide, TUTORIAL_SLIDE } from '../data/slides';
import { parseRoute, navigateTo } from '../utils/navigation';

interface GameContextType {
  roomState: GameRoomState;
  currentSlide: RegisteredSlide;
  totalSlides: number;
  myParticipant: Participant | null;
  myVote: VoteOption | null;
  isFirebase: boolean;
  soundEnabled: boolean;
  toggleSound: () => void;
  // Computed statistics
  totalVotes: number;
  votesCountA: number;
  votesCountB: number;
  percentA: number;
  percentB: number;
  totalParticipants: number;
  // User Actions
  joinAsParticipant: (nickname: string) => Promise<void>;
  submitMyVote: (option: VoteOption) => Promise<void>;
  // Host / Admin Actions
  openTutorial: () => Promise<void>;
  startRound: (duration?: number) => Promise<void>;
  endRound: () => Promise<void>;
  nextRound: () => Promise<void>;
  prevRound: () => Promise<void>;
  jumpToRound: (index: number) => Promise<void>;
  resetAll: () => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'uiux_splitvote_user';

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roomState, setRoomState] = useState<GameRoomState>(INITIAL_ROOM_STATE);
  const [myParticipant, setMyParticipant] = useState<Participant | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const timerIntervalRef = useRef<number | null>(null);

  // Restore existing user from local storage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setMyParticipant(parsed);
        realtimeService.joinParticipant(parsed, 'MAIN');
      }
    } catch {
      // ignore
    }
  }, []);

  // Listen to popstate changes to handle back/forward button in browser
  useEffect(() => {
    const handleUrlChange = () => {
      const parsed = parseRoute(window.location.pathname);
      if (parsed.isTutorial) {
        setRoomState((prev) => ({
          ...prev,
          status: 'TUTORIAL',
          currentSlideIndex: 0,
        }));
        if (parsed.role === 'HOST' || parsed.role === 'ADMIN') {
          realtimeService.showTutorial('MAIN');
        }
      } else if (parsed.slideNumber !== null) {
        const targetIndex = parsed.slideNumber - 1;
        setRoomState((prev) => {
          if (prev.currentSlideIndex !== targetIndex || prev.status === 'LOBBY' || prev.status === 'TUTORIAL') {
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
        } else if (updatedState.status === 'TUTORIAL' && window.location.pathname !== '/tutorial') {
          navigateTo('/tutorial');
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
        if (updatedState.status === 'TUTORIAL' && window.location.pathname !== '/admin/tutorial') {
          navigateTo('/admin/tutorial');
        } else if (
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

  // Initial sync on mount if host loads a direct route
  useEffect(() => {
    const currentRoute = parseRoute(window.location.pathname);
    if (currentRoute.isTutorial) {
      realtimeService.showTutorial('MAIN');
    } else if (currentRoute.role === 'HOST' && currentRoute.slideNumber !== null) {
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
  const currentSlide = roomState.status === 'TUTORIAL'
    ? TUTORIAL_SLIDE
    : (SLIDES_DATA[currentSlideIndex] || SLIDES_DATA[0]);

  // Calculated Stats
  const votesObj = roomState.votes || {};
  const totalVotes = Object.keys(votesObj).length;
  
  const votesCountA = useMemo(() => {
    return Object.values(votesObj).filter((v) => v === 'A').length;
  }, [votesObj]);

  const votesCountB = useMemo(() => {
    return Object.values(votesObj).filter((v) => v === 'B').length;
  }, [votesObj]);

  const percentA = totalVotes > 0 ? Math.round((votesCountA / totalVotes) * 100) : 50;
  const percentB = totalVotes > 0 ? 100 - percentA : 50;

  const totalParticipants = Object.keys(roomState.participants || {}).length;

  const myVote = myParticipant ? (votesObj[myParticipant.id] as VoteOption) || null : null;

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundEffects.setEnabled(nextState);
  };

  // User Actions
  const joinAsParticipant = async (nickname: string) => {
    const newParticipant: Participant = {
      id: 'p_' + Math.random().toString(36).substring(2, 9),
      nickname: nickname.trim(),
      joinedAt: Date.now(),
      lastActive: Date.now(),
    };
    
    try {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newParticipant));
    } catch {
      // ignore
    }

    setMyParticipant(newParticipant);
    soundEffects.playVoteSubmitted();
    await realtimeService.joinParticipant(newParticipant, roomState.roomId);
  };

  const submitMyVote = async (option: VoteOption) => {
    if (!myParticipant) return;
    soundEffects.playVoteSubmitted();
    await realtimeService.submitVote(myParticipant.id, option, roomState.roomId);
  };

  // Admin / Host actions with dynamic URL synchronization
  const openTutorial = async () => {
    const parsed = parseRoute(window.location.pathname);
    if (parsed.role === 'HOST') {
      navigateTo('/tutorial');
    } else if (parsed.role === 'ADMIN') {
      navigateTo('/admin/tutorial');
    }
    await realtimeService.showTutorial(roomState.roomId);
  };

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
    if (roomState.status === 'LOBBY') {
      await openTutorial();
      return;
    }
    if (roomState.status === 'TUTORIAL') {
      await jumpToRound(0);
      return;
    }

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
    if (roomState.status === 'TUTORIAL') {
      await resetAll();
      return;
    }
    if (currentSlideIndex === 0) {
      await openTutorial();
      return;
    }

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
        openTutorial,
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

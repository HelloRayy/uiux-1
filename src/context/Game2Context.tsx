import React, { createContext, useContext, useEffect, useState, useRef, useMemo } from 'react';
import { Game2RoomState, Participant, VoteOption, LeaderboardEntry } from '../types';
import { realtimeService, INITIAL_ROOM_2_STATE } from '../services/realtimeService';
import { soundEffects } from '../services/audioService';
import { SLIDES_DATA_2, RegisteredSlide2, TUTORIAL_SLIDE_2 } from '../data/slides2';
import { parseRoute, navigateTo } from '../utils/navigation';

interface Game2ContextType {
  roomState: Game2RoomState;
  currentSlide: RegisteredSlide2;
  totalSlides: number;
  myParticipant: Participant | null;
  myVote: VoteOption | null;
  myScore: number;
  myLastEarned: number;
  myRank: number;
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
  leaderboard: LeaderboardEntry[];
  // User Actions
  joinAsParticipant: (nickname: string) => Promise<void>;
  submitMyVote: (option: VoteOption) => Promise<void>;
  // Host / Admin Actions
  openTutorial: () => Promise<void>;
  startRound: (duration?: number) => Promise<void>;
  endRound: () => Promise<void>;
  showLeaderboard: () => Promise<void>;
  nextRound: () => Promise<void>;
  prevRound: () => Promise<void>;
  jumpToRound: (index: number) => Promise<void>;
  resetAll: () => Promise<void>;
}

const Game2Context = createContext<Game2ContextType | undefined>(undefined);

const LOCAL_STORAGE_GAME2_USER_KEY = 'uiux_2_splitvote_user';

export const Game2Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roomState, setRoomState] = useState<Game2RoomState>(INITIAL_ROOM_2_STATE);
  const [myParticipant, setMyParticipant] = useState<Participant | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const timerIntervalRef = useRef<number | null>(null);

  // Restore user from local storage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(LOCAL_STORAGE_GAME2_USER_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setMyParticipant(parsed);
        realtimeService.joinParticipant2(parsed, 'UIUX_2');
      }
    } catch {
      // ignore
    }
  }, []);

  // Listen to popstate changes
  useEffect(() => {
    const handleUrlChange = () => {
      const parsed = parseRoute(window.location.pathname);
      if (parsed.gameVersion === 2) {
        if (parsed.isTutorial) {
          setRoomState((prev) => ({
            ...prev,
            status: 'TUTORIAL',
            currentSlideIndex: 0,
          }));
          if (parsed.role === 'HOST' || parsed.role === 'ADMIN') {
            realtimeService.showTutorial2('UIUX_2');
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
            realtimeService.nextSlide2(targetIndex, 'UIUX_2', true);
          }
        } else if (parsed.role === 'HOST' && (window.location.pathname === '/uiux-2' || window.location.pathname === '/uiux-2/')) {
          setRoomState((prev) => ({
            ...prev,
            status: 'LOBBY',
          }));
          realtimeService.resetGame2('UIUX_2');
        }
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Subscribe to Realtime Service for UIUX_2
  useEffect(() => {
    const unsubscribe = realtimeService.subscribeToRoom2('UIUX_2', (updatedState) => {
      setRoomState(updatedState);

      const currentRoute = parseRoute(window.location.pathname);
      if (currentRoute.gameVersion === 2 && currentRoute.role === 'HOST') {
        if (updatedState.status === 'LOBBY' && window.location.pathname !== '/uiux-2') {
          navigateTo('/uiux-2');
        } else if (updatedState.status === 'TUTORIAL' && window.location.pathname !== '/uiux-2/tutorial') {
          navigateTo('/uiux-2/tutorial');
        } else if (
          (updatedState.status === 'VOTING' || updatedState.status === 'REVEAL' || updatedState.status === 'LEADERBOARD') &&
          typeof updatedState.currentSlideIndex === 'number'
        ) {
          const targetPath = `/uiux-2/${updatedState.currentSlideIndex + 1}`;
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

  // Initial sync on mount
  useEffect(() => {
    const currentRoute = parseRoute(window.location.pathname);
    if (currentRoute.gameVersion === 2) {
      if (currentRoute.isTutorial) {
        realtimeService.showTutorial2('UIUX_2');
      } else if (currentRoute.role === 'HOST' && currentRoute.slideNumber !== null) {
        const targetIdx = currentRoute.slideNumber - 1;
        realtimeService.nextSlide2(targetIdx, 'UIUX_2', true);
      }
    }
  }, []);

  // Current Slide
  const currentSlideIndex = Math.min(
    Math.max(0, roomState.currentSlideIndex || 0),
    SLIDES_DATA_2.length - 1
  );
  const currentSlide = roomState.status === 'TUTORIAL'
    ? TUTORIAL_SLIDE_2
    : (SLIDES_DATA_2[currentSlideIndex] || SLIDES_DATA_2[0]);

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

          if (nextRemaining <= 5 && nextRemaining > 0 && nextRemaining !== prev.timerRemaining) {
            soundEffects.playTick(true);
          } else if (nextRemaining > 5 && nextRemaining !== prev.timerRemaining) {
            soundEffects.playTick(false);
          }

          if (nextRemaining <= 0) {
            soundEffects.playTimesUp();
            realtimeService.endVoting2(currentSlide.correctOption, prev.roomId);
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
  }, [roomState.status, roomState.timerRunning, roomState.timerStartedAt, currentSlide.correctOption]);

  // Calculated Stats
  const votesObj = roomState.votes || {};
  const totalVotes = Object.keys(votesObj).length;
  
  const votesCountA = useMemo(() => {
    return Object.values(votesObj).filter((v) => v.option === 'A').length;
  }, [votesObj]);

  const votesCountB = useMemo(() => {
    return Object.values(votesObj).filter((v) => v.option === 'B').length;
  }, [votesObj]);

  const percentA = totalVotes > 0 ? Math.round((votesCountA / totalVotes) * 100) : 50;
  const percentB = totalVotes > 0 ? 100 - percentA : 50;

  const totalParticipants = Object.keys(roomState.participants || {}).length;

  const myVote = myParticipant ? (votesObj[myParticipant.id]?.option as VoteOption) || null : null;
  const myScore = myParticipant ? (roomState.scores?.[myParticipant.id] || 0) : 0;
  const myLastEarned = myParticipant ? (roomState.lastRoundScores?.[myParticipant.id] || 0) : 0;

  // Compute Full Leaderboard Ranking
  const leaderboard: LeaderboardEntry[] = useMemo(() => {
    const participants = roomState.participants || {};
    const scores = roomState.scores || {};
    const lastRoundScores = roomState.lastRoundScores || {};
    const votes = roomState.votes || {};

    const list = Object.values(participants).map((p) => {
      const score = scores[p.id] || 0;
      const lastRoundPoints = lastRoundScores[p.id] || 0;
      const vote = votes[p.id];
      const isCorrectLastRound = vote ? vote.option === currentSlide.correctOption : false;

      return {
        participantId: p.id,
        nickname: p.nickname,
        score,
        rank: 1,
        lastRoundPoints,
        isCorrectLastRound,
      };
    });

    // Sort descending by score
    list.sort((a, b) => b.score - a.score);

    // Assign rank numbers
    list.forEach((entry, idx) => {
      entry.rank = idx + 1;
    });

    return list;
  }, [roomState.participants, roomState.scores, roomState.lastRoundScores, roomState.votes, currentSlide.correctOption]);

  const myRank = myParticipant
    ? leaderboard.find((e) => e.participantId === myParticipant.id)?.rank || totalParticipants
    : 0;

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundEffects.setEnabled(nextState);
  };

  // User Actions
  const joinAsParticipant = async (nickname: string) => {
    const newParticipant: Participant = {
      id: 'p2_' + Math.random().toString(36).substring(2, 9),
      nickname: nickname.trim(),
      joinedAt: Date.now(),
      lastActive: Date.now(),
    };
    
    try {
      localStorage.setItem(LOCAL_STORAGE_GAME2_USER_KEY, JSON.stringify(newParticipant));
    } catch {
      // ignore
    }

    setMyParticipant(newParticipant);
    soundEffects.playVoteSubmitted();
    await realtimeService.joinParticipant2(newParticipant, roomState.roomId);
  };

  const submitMyVote = async (option: VoteOption) => {
    if (!myParticipant) return;
    soundEffects.playVoteSubmitted();
    await realtimeService.submitVote2(myParticipant.id, option, roomState.roomId);
  };

  // Host Actions
  const openTutorial = async () => {
    const parsed = parseRoute(window.location.pathname);
    if (parsed.role === 'HOST') {
      navigateTo('/uiux-2/tutorial');
    }
    await realtimeService.showTutorial2(roomState.roomId);
  };

  const startRound = async (duration: number = 30) => {
    soundEffects.playTick(false);
    const targetIdx = roomState.currentSlideIndex || 0;
    
    const parsed = parseRoute(window.location.pathname);
    if (parsed.role === 'HOST') {
      navigateTo(`/uiux-2/${targetIdx + 1}`);
    }

    await realtimeService.startVoting2(duration, roomState.roomId);
  };

  const endRound = async () => {
    soundEffects.playReveal();
    await realtimeService.endVoting2(currentSlide.correctOption, roomState.roomId);
  };

  const showLeaderboard = async () => {
    soundEffects.playReveal();
    await realtimeService.showLeaderboard2(roomState.roomId);
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
    if (roomState.status === 'REVEAL') {
      await showLeaderboard();
      return;
    }

    const nextIdx = currentSlideIndex + 1;
    if (nextIdx >= SLIDES_DATA_2.length) {
      await realtimeService.finishGame2(roomState.roomId);
      return;
    }
    
    const parsed = parseRoute(window.location.pathname);
    if (parsed.role === 'HOST') {
      navigateTo(`/uiux-2/${nextIdx + 1}`);
    }

    await realtimeService.nextSlide2(nextIdx, roomState.roomId, true);
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
      navigateTo(`/uiux-2/${prevIdx + 1}`);
    }

    await realtimeService.prevSlide2(prevIdx, roomState.roomId, true);
  };

  const jumpToRound = async (index: number) => {
    const targetIdx = Math.max(0, Math.min(SLIDES_DATA_2.length - 1, index));
    
    const parsed = parseRoute(window.location.pathname);
    if (parsed.role === 'HOST') {
      navigateTo(`/uiux-2/${targetIdx + 1}`);
    }

    await realtimeService.nextSlide2(targetIdx, roomState.roomId, true);
  };

  const resetAll = async () => {
    const parsed = parseRoute(window.location.pathname);
    if (parsed.role === 'HOST') {
      navigateTo('/uiux-2');
    }

    await realtimeService.resetGame2(roomState.roomId);
  };

  return (
    <Game2Context.Provider
      value={{
        roomState,
        currentSlide,
        totalSlides: SLIDES_DATA_2.length,
        myParticipant,
        myVote,
        myScore,
        myLastEarned,
        myRank,
        isFirebase: realtimeService.getIsFirebaseConnected(),
        soundEnabled,
        toggleSound,
        totalVotes,
        votesCountA,
        votesCountB,
        percentA,
        percentB,
        totalParticipants,
        leaderboard,
        joinAsParticipant,
        submitMyVote,
        openTutorial,
        startRound,
        endRound,
        showLeaderboard,
        nextRound,
        prevRound,
        jumpToRound,
        resetAll,
      }}
    >
      {children}
    </Game2Context.Provider>
  );
};

export const useGame2 = () => {
  const context = useContext(Game2Context);
  if (!context) {
    throw new Error('useGame2 must be used within a Game2Provider');
  }
  return context;
};

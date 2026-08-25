export type GameStatus = 'LOBBY' | 'TUTORIAL' | 'VOTING' | 'REVEAL' | 'FINISHED';

export type Game2Status = 'LOBBY' | 'TUTORIAL' | 'VOTING' | 'REVEAL' | 'LEADERBOARD' | 'FINISHED';

export type VoteOption = 'A' | 'B';

export interface Participant {
  id: string;
  nickname: string;
  avatarSeed?: string;
  joinedAt: number;
  lastActive: number;
}

export interface VoteRecord {
  participantId: string;
  nickname: string;
  option: VoteOption;
  timestamp: number;
}

export interface VoteRecord2 {
  participantId: string;
  option: VoteOption;
  timestamp: number;
}

export interface LeaderboardEntry {
  participantId: string;
  nickname: string;
  score: number;
  rank: number;
  lastRoundPoints: number;
  isCorrectLastRound: boolean;
}

export interface SlideCase {
  id: string;
  title: string;
  category: string;
  description: string;
  optionA: {
    label: string;
    title: string;
    description: string;
    isCorrect?: boolean;
    keyPoints: string[];
  };
  optionB: {
    label: string;
    title: string;
    description: string;
    isCorrect?: boolean;
    keyPoints: string[];
  };
  mentorExplanation: {
    summary: string;
    takeaway: string;
    uxPrinciples: string[];
  };
}

export interface SlideCase2 {
  id: string;
  title: string;
  topic: string;
  aiPitfall: string;
  humanSolution: string;
  description: string;
  correctOption: VoteOption;
  optionA: {
    label: string;
    title: string;
    description: string;
    isCorrect: boolean;
    isRawAI: boolean;
    keyPoints: string[];
  };
  optionB: {
    label: string;
    title: string;
    description: string;
    isCorrect: boolean;
    isRawAI: boolean;
    keyPoints: string[];
  };
  mentorExplanation: {
    whyAIFailed: string;
    howHumanFixedIt: string;
    pjblApplication: string;
    keyTakeaway: string;
  };
}

export interface GameRoomState {
  roomId: string;
  status: GameStatus;
  currentSlideIndex: number;
  timerDuration: number;
  timerRemaining: number;
  timerRunning: boolean;
  timerStartedAt?: number;
  participants: Record<string, Participant>;
  votes: Record<string, VoteOption>;
  updatedAt: number;
}

export interface Game2RoomState {
  roomId: string;
  status: Game2Status;
  currentSlideIndex: number;
  timerDuration: number;
  timerRemaining: number;
  timerRunning: boolean;
  timerStartedAt?: number;
  participants: Record<string, Participant>;
  votes: Record<string, VoteRecord2>;
  scores: Record<string, number>;
  lastRoundScores: Record<string, number>;
  updatedAt: number;
}

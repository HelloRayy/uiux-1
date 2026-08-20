export type GameStatus = 'LOBBY' | 'TUTORIAL' | 'VOTING' | 'REVEAL' | 'FINISHED';

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

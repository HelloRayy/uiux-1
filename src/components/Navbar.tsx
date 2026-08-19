import React from 'react';
import { Volume2, VolumeX, Users, Timer, Sparkles } from 'lucide-react';
import { useGame } from '../context/GameContext';

interface NavbarProps {
  currentRole: 'HOST' | 'ADMIN' | 'PLAY';
}

export const Navbar: React.FC<NavbarProps> = () => {
  const {
    soundEnabled,
    toggleSound,
    roomState,
    totalVotes,
    totalParticipants,
    totalSlides,
  } = useGame();

  const currentIdx = (roomState.currentSlideIndex || 0) + 1;
  const isVoting = roomState.status === 'VOTING';
  const isReveal = roomState.status === 'REVEAL';

  return (
    <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 py-2.5 font-sans">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand Identity & Case Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#0560FD] flex items-center justify-center text-white font-bold text-xs shadow-xs">
              UX
            </div>
            <div className="leading-none">
              <span className="font-semibold text-sm text-[#1d1d1f] tracking-tight">
                UI/UX <span className="text-[#0560FD]">SplitVote</span>
              </span>
            </div>
          </div>

          {/* Case Index Pill */}
          {roomState.status !== 'LOBBY' && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200/60 text-slate-600 text-xs font-medium">
              Kasus {currentIdx} dari {totalSlides}
            </span>
          )}
        </div>

        {/* Right: Live Countdown Timer & User Vote Counter */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Live Countdown Timer (Active during Voting) */}
          {isVoting && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-semibold text-[#0560FD] animate-pulse shadow-xs">
              <Timer className="w-3.5 h-3.5" />
              <span>{roomState.timerRemaining}s</span>
              <span className="text-[10px] text-blue-400 font-normal hidden sm:inline">tersisa</span>
            </div>
          )}

          {/* Reveal Status Indicator */}
          {isReveal && (
            <div className="flex items-center gap-1 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-semibold text-emerald-700 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hasil Terbuka</span>
            </div>
          )}

          {/* User Vote & Participant Info */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100/90 border border-slate-200/70 rounded-full text-xs text-slate-700 font-medium">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>
              <strong className="text-slate-900 font-semibold">{totalVotes}</strong>
              <span className="text-slate-500">/{totalParticipants || totalVotes} Vote</span>
            </span>
          </div>

          {/* Minimalist Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition cursor-pointer border border-slate-200/60"
            title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#0560FD]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

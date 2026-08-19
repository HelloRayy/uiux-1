import React from 'react';
import { Timer, AlertTriangle } from 'lucide-react';

interface Props {
  remaining: number;
  duration: number;
  isRunning: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const CountdownTimer: React.FC<Props> = ({ remaining, duration, isRunning, size = 'md' }) => {
  const isUrgent = remaining <= 5 && remaining > 0;
  const isFinished = remaining === 0;

  // Calculate percentage of remaining time
  const percentage = duration > 0 ? (remaining / duration) * 100 : 0;

  if (size === 'sm') {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-extrabold border transition-all ${
          isUrgent
            ? 'bg-red-50 text-red-700 border-red-300 animate-pulse'
            : isFinished
            ? 'bg-slate-100 text-slate-500 border-slate-200'
            : 'bg-blue-50 text-[#1d68f5] border-blue-200'
        }`}
      >
        <Timer className="w-3.5 h-3.5" />
        <span>{remaining}s</span>
      </div>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center p-3 sm:p-4 rounded-2xl border transition-all ${
        isUrgent
          ? 'bg-white border-red-400 shadow-md animate-pulse'
          : isFinished
          ? 'bg-slate-50 border-slate-200 text-slate-500'
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-black font-mono text-lg sm:text-xl transition-colors ${
            isUrgent
              ? 'bg-red-600 text-white shadow-md'
              : isFinished
              ? 'bg-slate-200 text-slate-500'
              : 'bg-[#1d68f5] text-white shadow-md shadow-blue-500/25'
          }`}
        >
          {remaining}
        </div>

        <div className="text-left">
          <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1 font-mono">
            {isUrgent && <AlertTriangle className="w-3 h-3 text-red-600 animate-bounce" />}
            <span>{isFinished ? 'Waktu Habis' : 'Sisa Waktu'}</span>
          </div>
          <div className="text-xs sm:text-sm font-semibold text-slate-800 font-sans">
            {isRunning ? `${remaining} Detik Tersisa` : 'Voting Selesai'}
          </div>
        </div>
      </div>

      {/* Progress bar line at the bottom */}
      {duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-100 rounded-b-2xl overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${
              isUrgent ? 'bg-red-500' : 'bg-[#1d68f5]'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
};

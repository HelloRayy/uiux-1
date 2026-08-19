import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, ThumbsUp, Sparkles, Users } from 'lucide-react';

interface ResultBarProps {
  totalVotes: number;
  votesA: number;
  votesB: number;
  percentA: number;
  percentB: number;
  labelA?: string;
  labelB?: string;
  triggerConfetti?: boolean;
}

export const ResultBar: React.FC<ResultBarProps> = ({
  totalVotes,
  votesA,
  votesB,
  percentA,
  percentB,
  labelA = 'Desain A',
  labelB = 'Desain B',
  triggerConfetti = true,
}) => {
  // Fire celebratory confetti when results are displayed
  useEffect(() => {
    if (triggerConfetti && totalVotes > 0) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#1d68f5', '#f59e0b', '#059669', '#3b82f6'],
        });
      } catch {
        // ignore
      }
    }
  }, [triggerConfetti, totalVotes]);

  const isTie = totalVotes > 0 && votesA === votesB;
  const isWinnerA = totalVotes > 0 && votesA > votesB;
  const isWinnerB = totalVotes > 0 && votesB > votesA;

  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-card">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-[#1d68f5] rounded-2xl border border-blue-200">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Hasil Voting Polling
              <Sparkles className="w-4 h-4 text-amber-500" />
            </h3>
            <p className="text-xs text-slate-600 font-sans">Distribusi suara dari seluruh peserta di ruangan</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-1.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700">
          <Users className="w-4 h-4 text-[#1d68f5]" />
          <span>Total: <strong className="text-slate-900">{totalVotes}</strong> Suara Masuk</span>
        </div>
      </div>

      {/* Side-by-Side Dual Result Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* Option A Box */}
        <div
          className={`p-5 rounded-2xl border transition-all duration-500 relative overflow-hidden ${
            isWinnerA
              ? 'bg-blue-50/40 border-2 border-[#1d68f5] shadow-md scale-[1.02]'
              : 'bg-slate-50/80 border-slate-200 text-slate-600'
          }`}
        >
          {isWinnerA && (
            <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-[#1d68f5] text-white rounded-full text-[10px] font-extrabold tracking-wider uppercase flex items-center gap-1 shadow-sm font-mono">
              <ThumbsUp className="w-3 h-3" /> Suara Terbanyak
            </div>
          )}
          <div className="text-xs font-extrabold text-[#1d68f5] uppercase tracking-wider mb-1 font-mono">
            {labelA}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {totalVotes > 0 ? `${percentA}%` : '0%'}
            </span>
            <span className="text-sm font-semibold text-slate-500 font-sans">
              ({votesA} suara)
            </span>
          </div>

          {/* Progress Bar A */}
          <div className="mt-4 h-3.5 bg-slate-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#1d68f5] to-blue-500 transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${totalVotes > 0 ? percentA : 0}%` }}
            />
          </div>
        </div>

        {/* Option B Box */}
        <div
          className={`p-5 rounded-2xl border transition-all duration-500 relative overflow-hidden ${
            isWinnerB
              ? 'bg-amber-50/40 border-2 border-amber-500 shadow-md scale-[1.02]'
              : 'bg-slate-50/80 border-slate-200 text-slate-600'
          }`}
        >
          {isWinnerB && (
            <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-amber-500 text-white rounded-full text-[10px] font-extrabold tracking-wider uppercase flex items-center gap-1 shadow-sm font-mono">
              <ThumbsUp className="w-3 h-3" /> Suara Terbanyak
            </div>
          )}
          <div className="text-xs font-extrabold text-amber-600 uppercase tracking-wider mb-1 font-mono">
            {labelB}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {totalVotes > 0 ? `${percentB}%` : '0%'}
            </span>
            <span className="text-sm font-semibold text-slate-500 font-sans">
              ({votesB} suara)
            </span>
          </div>

          {/* Progress Bar B */}
          <div className="mt-4 h-3.5 bg-slate-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${totalVotes > 0 ? percentB : 0}%` }}
            />
          </div>
        </div>
      </div>

      {isTie && totalVotes > 0 && (
        <div className="p-3 bg-slate-100 border border-slate-200 rounded-2xl text-center text-xs font-bold text-slate-800">
          ⚖️ Hasil Imbang! Kedua opsi mendapatkan jumlah suara yang sama persis.
        </div>
      )}
    </div>
  );
};

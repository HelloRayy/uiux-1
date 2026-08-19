import React from 'react';
import { Loader2, Sparkles, Zap } from 'lucide-react';

interface CaseProps {
  variant: 'A' | 'B';
}

export const NavigationCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // ANTI-PATTERN DESIGN (Side A): Blank Screen with Bare Spinning Loader
    return (
      <div className="w-full max-w-sm mx-auto text-slate-700 font-sans py-2 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-200">
          <div className="text-xs font-bold text-slate-900">Feed Dashboard</div>
          <span className="text-[10px] font-mono text-slate-400">Loading State</span>
        </div>

        {/* Blank Canvas with generic spinner */}
        <div className="h-56 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center space-y-3 p-6 text-center">
          <Loader2 className="w-7 h-7 text-slate-400 animate-spin" />
          <div className="space-y-0.5">
            <div className="text-xs font-semibold text-slate-600">Memuat data...</div>
            <div className="text-[10px] text-slate-400 font-mono">Waktu tunggu: ~1.5 detik</div>
          </div>
        </div>

        <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-[11px] text-rose-800 space-y-1">
          <div className="font-bold">❌ Perceived Time Terasa Lambat:</div>
          <div className="text-[10px] text-rose-700 leading-snug">
            Layar putih kosong membuat pengguna merasa aplikasi macet atau koneksi terputus.
          </div>
        </div>
      </div>
    );
  }

  // BEST PRACTICE DESIGN (Side B): Doherty Threshold Shimmering Skeleton Screen
  return (
    <div className="w-full max-w-sm mx-auto text-slate-900 font-sans py-2 space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-blue-600" />
          <span>Feed Dashboard</span>
        </div>
        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Responsif &lt;400ms
        </span>
      </div>

      {/* Shimmering Skeleton Cards */}
      <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3 animate-pulse">
        {/* User profile skeleton */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-slate-200" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3 bg-slate-200 rounded-full w-2/3" />
            <div className="h-2 bg-slate-200 rounded-full w-1/3" />
          </div>
        </div>

        {/* Media banner skeleton */}
        <div className="h-20 bg-slate-200/80 rounded-xl" />

        {/* Metric pills skeleton */}
        <div className="flex gap-2">
          <div className="h-5 bg-slate-200 rounded-full w-20" />
          <div className="h-5 bg-slate-200 rounded-full w-16" />
          <div className="h-5 bg-slate-200 rounded-full w-24" />
        </div>
      </div>

      <div className="p-2.5 bg-blue-50/90 border border-blue-200/80 rounded-xl text-[11px] text-blue-950 space-y-0.5 font-medium">
        <div className="font-bold flex items-center gap-1.5 text-[#0560FD]">
          <Sparkles className="w-3.5 h-3.5" /> Doherty Threshold:
        </div>
        <div className="text-[10px] text-slate-600 leading-snug">
          Mata pengguna langsung membaca struktur tata letak. Waktu tunggu terasa 2x lebih singkat dan tidak memicu Cumulative Layout Shift (CLS).
        </div>
      </div>
    </div>
  );
};

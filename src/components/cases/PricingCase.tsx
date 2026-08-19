import React from 'react';
import { Moon, TrendingUp, BookOpen, Clock } from 'lucide-react';

interface CaseProps {
  variant: 'A' | 'B';
}

export const PricingCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // VARIANT A: Pure Black #000000 + Pure White #FFFFFF (Extreme Contrast / Halation Glare)
    return (
      <div className="w-full max-w-sm mx-auto font-sans py-1">
        <div className="bg-[#000000] border-2 border-[#333333] rounded-3xl p-4 space-y-3.5 text-[#FFFFFF] shadow-none">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#333333]">
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <Moon className="w-3.5 h-3.5 text-[#FFFFFF]" />
              <span>Reader Mode</span>
            </div>
            <span className="text-[10px] font-mono text-[#888888]">
              Pure Black #000
            </span>
          </div>

          {/* Article Card without Depth Elevation */}
          <div className="bg-[#000000] border border-[#444444] rounded-2xl p-3.5 space-y-2">
            <div className="flex justify-between items-center text-[10px] text-[#AAAAAA]">
              <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> UX Principles</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 4 min</span>
            </div>
            <h4 className="text-sm font-bold text-[#FFFFFF] leading-snug">
              Desain Antarmuka yang Nyaman untuk Mata di Malam Hari
            </h4>
            <p className="text-xs text-[#CCCCCC] leading-relaxed">
              Memahami bagaimana kontras cahaya mempengaruhi kelelahan mata pengguna saat membaca konten panjang.
            </p>
          </div>

          {/* Metric Bar */}
          <div className="bg-[#000000] border border-[#444444] rounded-xl p-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-[#AAAAAA]">
              <TrendingUp className="w-3.5 h-3.5 text-[#FFFFFF]" />
              <span>Tingkat Keterbacaan:</span>
            </div>
            <span className="font-mono font-bold text-[#FFFFFF]">21:1 Contrast</span>
          </div>
        </div>
      </div>
    );
  }

  // VARIANT B: Layered Dark Surface #0F172A + #1E293B + Off-White #F1F5F9 (Comfortable Elevation)
  return (
    <div className="w-full max-w-sm mx-auto font-sans py-1">
      <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-3xl p-4 space-y-3.5 text-[#F1F5F9] shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#1E293B]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#F1F5F9]">
            <Moon className="w-3.5 h-3.5 text-sky-400" />
            <span>Reader Mode</span>
          </div>
          <span className="text-[10px] font-semibold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded-full border border-sky-800/60">
            Dark Slate Surface
          </span>
        </div>

        {/* Elevated Surface Card with Soft Shadow */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-3.5 space-y-2 shadow-sm">
          <div className="flex justify-between items-center text-[10px] text-slate-400">
            <span className="flex items-center gap-1 text-sky-400"><BookOpen className="w-3 h-3" /> UX Principles</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 4 min</span>
          </div>
          <h4 className="text-sm font-bold text-[#F8FAFC] leading-snug">
            Desain Antarmuka yang Nyaman untuk Mata di Malam Hari
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Memahami bagaimana kontras cahaya mempengaruhi kelelahan mata pengguna saat membaca konten panjang.
          </p>
        </div>

        {/* Metric Bar on Elevated Layer */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
            <span>Tingkat Keterbacaan:</span>
          </div>
          <span className="font-mono font-bold text-sky-300">12:1 Soft Contrast</span>
        </div>
      </div>
    </div>
  );
};

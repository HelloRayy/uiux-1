import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Activity } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface CaseProps {
  variant: 'A' | 'B';
}

export const DashboardCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // VARIANT A: Raw AI Color Chaos (8 Neon Colors, Inverse Semantics, Poor Contrast)
    return (
      <div className="w-full max-w-md mx-auto font-sans py-1 text-slate-800">
        <div className="rounded-2xl border border-slate-300 bg-white p-4 space-y-3 shadow-2xs">
          <div className="flex justify-between items-center pb-1 border-b border-slate-200">
            <span className="text-xs font-black text-purple-600 font-mono">ANALYTICS 2026</span>
            <span className="px-2 py-0.5 bg-yellow-300 text-yellow-900 rounded font-bold text-[9px]">LIVE DATA</span>
          </div>

          {/* Random Neon Cluttered Cards */}
          <div className="grid grid-cols-3 gap-2">
            {/* Box 1: Pink/Neon Red */}
            <div className="p-2.5 bg-pink-100 border-2 border-pink-400 rounded-xl text-center space-y-1">
              <span className="text-[9px] text-pink-700 font-bold">Total Revenue</span>
              <div className="text-xs font-black text-pink-600">Rp 48.2M</div>
              <span className="text-[8px] bg-red-500 text-white px-1 py-0.2 rounded font-bold">+18.4% (Naik)</span>
            </div>

            {/* Box 2: Lime Green with inverted meaning */}
            <div className="p-2.5 bg-lime-100 border-2 border-lime-400 rounded-xl text-center space-y-1">
              <span className="text-[9px] text-lime-800 font-bold">Active User</span>
              <div className="text-xs font-black text-lime-600">12,450</div>
              <span className="text-[8px] bg-green-500 text-white px-1 py-0.2 rounded font-bold">-4.2% (Turun)</span>
            </div>

            {/* Box 3: Cyan Blue */}
            <div className="p-2.5 bg-cyan-100 border-2 border-cyan-400 rounded-xl text-center space-y-1">
              <span className="text-[9px] text-cyan-800 font-bold">Bounce Rate</span>
              <div className="text-xs font-black text-cyan-600">68.2%</div>
              <span className="text-[8px] bg-purple-500 text-white px-1 py-0.2 rounded font-bold">Warning</span>
            </div>
          </div>

          {/* Chaotic Fake Graph */}
          <div className="h-16 bg-gradient-to-r from-yellow-100 via-pink-100 to-cyan-100 border border-slate-200 rounded-xl flex items-center justify-center text-[10px] text-slate-500 font-mono">
            [Grafik Berwarna-Warni Tanpa Label Sumbu]
          </div>
        </div>
      </div>
    );
  }

  // VARIANT B: Human Taste Accessible Semantic Dashboard (High Contrast, Clear Hierarchy)
  return (
    <div className="w-full max-w-md mx-auto font-sans py-1 text-slate-900">
      <Card className="p-4 sm:p-5 space-y-3.5 shadow-sm border-slate-200 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
            <Activity className="w-4 h-4 text-primary" />
            <span>Ringkasan Metrik Transaksi</span>
          </div>
          <Badge variant="outline" className="font-mono text-[10px] text-slate-600">
            30 Hari Terakhir
          </Badge>
        </div>

        {/* 3 Balanced Metric Cards */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* Card 1: Revenue */}
          <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
            <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-slate-500" /> Pendapatan
            </span>
            <div className="text-xs sm:text-sm font-bold text-slate-900">Rp 48.2M</div>
            <div className="flex items-center gap-0.5 text-[9px] font-semibold text-emerald-600">
              <TrendingUp className="w-2.5 h-2.5" />
              <span>+18.4%</span>
            </div>
          </div>

          {/* Card 2: Active Users */}
          <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
            <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
              <Users className="w-3 h-3 text-slate-500" /> Peserta Aktif
            </span>
            <div className="text-xs sm:text-sm font-bold text-slate-900">12,450</div>
            <div className="flex items-center gap-0.5 text-[9px] font-semibold text-emerald-600">
              <TrendingUp className="w-2.5 h-2.5" />
              <span>+8.1%</span>
            </div>
          </div>

          {/* Card 3: Drop-off Rate */}
          <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
            <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
              <Activity className="w-3 h-3 text-slate-500" /> Churn Rate
            </span>
            <div className="text-xs sm:text-sm font-bold text-slate-900">2.1%</div>
            <div className="flex items-center gap-0.5 text-[9px] font-semibold text-rose-600">
              <TrendingDown className="w-2.5 h-2.5" />
              <span>-0.5% (Baik)</span>
            </div>
          </div>
        </div>

        {/* Clean Structured Insight */}
        <div className="p-2.5 bg-slate-50/80 border border-slate-200 rounded-lg flex items-center justify-between text-[10px] text-slate-600">
          <span>Semua metrik berada dalam batas target bulanan</span>
          <span className="font-semibold text-primary">Lihat Laporan Lengkap ➔</span>
        </div>
      </Card>
    </div>
  );
};

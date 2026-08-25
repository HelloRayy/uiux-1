import React from 'react';
import { Sparkles, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

interface CaseProps {
  variant: 'A' | 'B';
}

export const HeroCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // VARIANT A: Raw AI Generated Hero (Visual Clutter, 4 Competing Buttons, Low Contrast)
    return (
      <div className="w-full max-w-md mx-auto font-sans py-1 text-slate-800">
        <div className="rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 sm:p-5 space-y-3.5 shadow-sm text-center relative overflow-hidden">
          {/* AI Over-decoration floating badges */}
          <div className="flex flex-wrap justify-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white text-[9px] font-extrabold uppercase animate-pulse">
              ⚡ Ultra AI 4.0
            </span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-white text-[9px] font-bold">
              🔥 Best Solution
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold">
              ✨ 100x Growth
            </span>
          </div>

          {/* Low Contrast Gradient Headline */}
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Revolusionerkan Masa Depan Workflow Bisnis Anda Dengan Solusi Terintegrasi
            </h3>
            <p className="text-[11px] text-slate-400 font-normal leading-tight max-w-xs mx-auto">
              Platform all-in-one otomatisasi generasi terbaru yang mengintegrasikan seluruh ekosistem digital secara komprehensif.
            </p>
          </div>

          {/* 4 Competing Action Buttons (Choice Paralysis) */}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <button type="button" className="py-2 px-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-[10px] font-bold shadow-xs">
              Mulai Free Trial
            </button>
            <button type="button" className="py-2 px-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-[10px] font-bold shadow-xs">
              Jadwalkan Demo
            </button>
            <button type="button" className="py-2 px-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-[10px] font-bold shadow-xs">
              Hubungi Sales
            </button>
            <button type="button" className="py-2 px-2 bg-slate-900 text-white rounded-lg text-[10px] font-bold shadow-xs">
              Download App
            </button>
          </div>

          {/* AI Cluttered Card */}
          <div className="p-2.5 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-xl flex items-center justify-between text-[10px] text-slate-600">
            <span>⭐️⭐️⭐️⭐️⭐️ 99.9% Akurasi</span>
            <span className="font-mono font-bold text-indigo-600">10,000+ Integrasi</span>
          </div>
        </div>
      </div>
    );
  }

  // VARIANT B: Human Taste UI/UX (Single Clear Focus, 1 Primary CTA + 1 Secondary, WCAG AAA)
  return (
    <div className="w-full max-w-md mx-auto font-sans py-1 text-slate-900">
      <Card className="p-4 sm:p-5 space-y-4 shadow-sm border-slate-200 bg-white">
        <div className="text-center space-y-2">
          {/* Single Focused Pill */}
          <div className="flex justify-center">
            <Badge variant="outline" className="gap-1.5 px-3 py-1 font-semibold text-primary bg-primary/5 border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Platform Manajemen Proyek Siswa</span>
            </Badge>
          </div>

          {/* High Contrast Clear Value Proposition */}
          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
              Selesaikan Tugas PJBL Lebih Cepat & Rapi Bersama Tim
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
              Kelola tugas, jadwal mentoring, dan revisi desain dalam satu papan kerja sederhana yang mudah dipahami.
            </p>
          </div>
        </div>

        {/* Clear Hierarchy: 1 Primary CTA + 1 Secondary Link */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
          <Button size="sm" className="w-full sm:w-auto gap-1.5 font-bold shadow-xs">
            <span>Coba Gratis 14 Hari</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
          <Button variant="outline" size="sm" className="w-full sm:w-auto gap-1.5 text-slate-700">
            <Play className="w-3 h-3 fill-slate-700" />
            <span>Lihat Demo (2 Menit)</span>
          </Button>
        </div>

        {/* Social Proof with High Trust */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Tanpa Kartu Kredit</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Siap Pakai 1 Menit</span>
        </div>
      </Card>
    </div>
  );
};

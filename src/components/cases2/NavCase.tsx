import React from 'react';
import { Home, Search, Receipt, User, Sparkles, HelpCircle, Flame, Eye, Compass } from 'lucide-react';
import { Badge } from '../ui/badge';

interface CaseProps {
  variant: 'A' | 'B';
}

export const NavCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // VARIANT A: Raw AI Abstract Mystery Icons (No Labels, 6 Bizarre Icons)
    return (
      <div className="w-full max-w-sm mx-auto font-sans py-1 text-slate-800">
        <div className="rounded-3xl border-2 border-slate-300 bg-slate-100 p-3.5 space-y-3 shadow-2xs">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200 text-xs font-bold text-slate-900">
            <span>Project Explorer App</span>
            <span className="text-[9px] font-mono text-slate-400">6 Abstract Icons</span>
          </div>

          {/* App Body Placeholder */}
          <div className="h-36 bg-white border border-slate-200 rounded-2xl p-3 flex flex-col justify-between">
            <div className="h-20 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-xs font-mono">
              [Konten Feed Aplikasi]
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Jelajahi ide desain terbaru</div>
          </div>

          {/* AI Bizarre Icon Nav Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-2 flex items-center justify-between shadow-2xs">
            {[Sparkles, Compass, Flame, Eye, HelpCircle, Sparkles].map((Icon, idx) => (
              <div
                key={idx}
                className={`p-1.5 rounded-lg flex items-center justify-center ${
                  idx === 0 ? 'text-purple-600 bg-purple-50' : 'text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // VARIANT B: Human Taste Ergonomic Mobile Navigation (4 Labeled Standard Tasks)
  return (
    <div className="w-full max-w-sm mx-auto font-sans py-1 text-slate-900">
      <div className="rounded-3xl border-2 border-slate-300 bg-white p-3.5 space-y-3 shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-slate-100 text-xs font-bold text-slate-900">
          <span>Project Explorer App</span>
          <Badge variant="outline" className="font-mono text-[9px] text-emerald-700 bg-emerald-50 border-emerald-200">
            4 Menu Terarah
          </Badge>
        </div>

        {/* App Body Mockup */}
        <div className="h-36 bg-slate-50 border border-slate-200/90 rounded-2xl p-3 flex flex-col justify-between">
          <div className="h-20 bg-blue-50/70 border border-blue-100 rounded-xl flex items-center justify-center text-primary text-xs font-semibold">
            [Feed Proyek & Portofolio Siswa]
          </div>
          <div className="text-[11px] text-slate-700 font-bold">Rekomendasi Desain Terpilih</div>
        </div>

        {/* Clean Labeled Standard Navbar */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-1.5 grid grid-cols-4 gap-1 shadow-xs">
          {[
            { icon: Home, label: 'Beranda', active: true },
            { icon: Search, label: 'Eksplor', active: false },
            { icon: Receipt, label: 'Tugas PJBL', active: false },
            { icon: User, label: 'Profil', active: false },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`py-1.5 rounded-xl flex flex-col items-center justify-center gap-0.5 ${
                  item.active ? 'text-primary bg-primary/10 font-bold' : 'text-slate-500 font-medium'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[9px] leading-tight">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

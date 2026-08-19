import React from 'react';
import { Check } from 'lucide-react';

interface CaseProps {
  variant: 'A' | 'B';
}

export const PricingCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // VARIANT A: Flat Equal Weighting (No Visual Anchor)
    return (
      <div className="w-full max-w-md mx-auto text-slate-700 font-sans py-1 space-y-3">
        <div className="text-center space-y-0.5 pb-1">
          <div className="text-xs font-bold text-slate-900">Pilih Paket Berlangganan</div>
          <div className="text-[10px] text-slate-500">Tentukan paket yang sesuai kebutuhan Anda</div>
        </div>

        {/* 3 Identical Cards */}
        <div className="grid grid-cols-3 gap-2">
          {/* Card 1: Starter */}
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center">
            <div className="text-[11px] font-bold text-slate-800">Starter</div>
            <div className="text-xs font-bold text-slate-900">Rp 99k<span className="text-[9px] font-normal text-slate-400">/bln</span></div>
            <div className="text-[9px] text-slate-500 space-y-1 pt-1 border-t border-slate-200">
              <div>1 Proyek</div>
              <div>Review Dasar</div>
            </div>
            <button type="button" className="w-full py-1.5 bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold">
              Pilih
            </button>
          </div>

          {/* Card 2: Pro */}
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center">
            <div className="text-[11px] font-bold text-slate-800">Pro Mentorship</div>
            <div className="text-xs font-bold text-slate-900">Rp 249k<span className="text-[9px] font-normal text-slate-400">/bln</span></div>
            <div className="text-[9px] text-slate-500 space-y-1 pt-1 border-t border-slate-200">
              <div>Semua Proyek</div>
              <div>1-on-1 Mentor</div>
            </div>
            <button type="button" className="w-full py-1.5 bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold">
              Pilih
            </button>
          </div>

          {/* Card 3: Enterprise */}
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center">
            <div className="text-[11px] font-bold text-slate-800">Team</div>
            <div className="text-xs font-bold text-slate-900">Rp 599k<span className="text-[9px] font-normal text-slate-400">/bln</span></div>
            <div className="text-[9px] text-slate-500 space-y-1 pt-1 border-t border-slate-200">
              <div>5 Akun Tim</div>
              <div>Prioritas 24/7</div>
            </div>
            <button type="button" className="w-full py-1.5 bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold">
              Pilih
            </button>
          </div>
        </div>
      </div>
    );
  }

  // VARIANT B: Visual Anchor & Highlight Rekomendasi (Center Card Focus)
  return (
    <div className="w-full max-w-md mx-auto text-slate-900 font-sans py-1 space-y-3">
      <div className="text-center space-y-0.5 pb-1">
        <div className="text-xs font-bold text-slate-900">Pilih Paket Berlangganan</div>
        <div className="text-[10px] text-slate-500">Hemat hingga 40% dengan paket rekomendasi</div>
      </div>

      {/* 3 Cards with Center Highlight */}
      <div className="grid grid-cols-3 gap-2 items-center">
        {/* Card 1: Starter */}
        <div className="p-2.5 bg-white border border-slate-200 rounded-xl space-y-2 text-center shadow-2xs">
          <div className="text-[11px] font-bold text-slate-700">Starter</div>
          <div className="text-xs font-bold text-slate-900">Rp 99k<span className="text-[9px] font-normal text-slate-400">/bln</span></div>
          <div className="text-[9px] text-slate-600 space-y-1 pt-1 border-t border-slate-100">
            <div>1 Proyek</div>
            <div>Review Dasar</div>
          </div>
          <button type="button" className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-[10px] font-bold transition">
            Pilih
          </button>
        </div>

        {/* Card 2: Pro (Visual Anchor Highlight) */}
        <div className="p-3 bg-white border-2 border-[#0560FD] rounded-2xl space-y-2 text-center shadow-md relative -translate-y-1">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#0560FD] text-white text-[8px] font-bold rounded-full uppercase tracking-wider">
            Paling Populer
          </div>
          <div className="text-[11px] font-bold text-blue-700">Pro Mentorship</div>
          <div className="text-sm font-bold text-slate-900">Rp 249k<span className="text-[9px] font-normal text-slate-400">/bln</span></div>
          <div className="text-[9px] text-slate-700 space-y-1 pt-1 border-t border-blue-50 font-medium">
            <div className="flex items-center justify-center gap-0.5"><Check className="w-2.5 h-2.5 text-blue-600" /> Semua Proyek</div>
            <div className="flex items-center justify-center gap-0.5"><Check className="w-2.5 h-2.5 text-blue-600" /> 1-on-1 Mentor</div>
          </div>
          <button type="button" className="w-full py-2 bg-[#0560FD] hover:bg-blue-700 text-white rounded-xl text-[10px] font-bold shadow-xs transition">
            Mulai Sekarang
          </button>
        </div>

        {/* Card 3: Team */}
        <div className="p-2.5 bg-white border border-slate-200 rounded-xl space-y-2 text-center shadow-2xs">
          <div className="text-[11px] font-bold text-slate-700">Team</div>
          <div className="text-xs font-bold text-slate-900">Rp 599k<span className="text-[9px] font-normal text-slate-400">/bln</span></div>
          <div className="text-[9px] text-slate-600 space-y-1 pt-1 border-t border-slate-100">
            <div>5 Akun Tim</div>
            <div>Prioritas 24/7</div>
          </div>
          <button type="button" className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-[10px] font-bold transition">
            Pilih
          </button>
        </div>
      </div>
    </div>
  );
};

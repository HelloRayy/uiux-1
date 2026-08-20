import React from 'react';
import { Smartphone, CheckCircle, Sparkles, HandMetal } from 'lucide-react';

interface CaseProps {
  variant: 'A' | 'B';
}

export const TutorialCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // VARIANT A: Clean Visual Mockup for Left Side (Option A)
    return (
      <div className="w-full max-w-sm mx-auto font-sans py-1">
        <div className="bg-white border-2 border-blue-200 rounded-3xl p-5 space-y-4 shadow-sm text-center">
          {/* Header */}
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0560FD] flex items-center justify-center mx-auto border border-blue-100">
            <Smartphone className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <div className="text-base font-bold text-slate-900">Desain A (Sisi Kiri)</div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Perhatikan tampilan antarmuka di sisi kiri. Jika menurut Anda desain ini lebih baik, ketuk tombol <strong>A</strong> di HP Anda.
            </p>
          </div>

          {/* Interactive Mock Button */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <div className="text-[11px] font-semibold text-slate-500">Contoh Elemen UI:</div>
            <div className="py-2.5 px-4 bg-[#0560FD] text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pilihan Desain A</span>
            </div>
          </div>

          <div className="text-[11px] font-semibold text-blue-600 flex items-center justify-center gap-1 font-mono">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Pad A pada Smartphone Anda</span>
          </div>
        </div>
      </div>
    );
  }

  // VARIANT B: Clean Visual Mockup for Right Side (Option B)
  return (
    <div className="w-full max-w-sm mx-auto font-sans py-1">
      <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 space-y-4 shadow-sm text-center">
        {/* Header */}
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-100">
          <Smartphone className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <div className="text-base font-bold text-slate-900">Desain B (Sisi Kanan)</div>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            Perhatikan tampilan antarmuka di sisi kanan. Jika menurut Anda desain ini lebih baik, ketuk tombol <strong>B</strong> di HP Anda.
          </p>
        </div>

        {/* Interactive Mock Button */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
          <div className="text-[11px] font-semibold text-slate-500">Contoh Elemen UI:</div>
          <div className="py-2.5 px-4 bg-amber-600 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-2">
            <HandMetal className="w-3.5 h-3.5" />
            <span>Pilihan Desain B</span>
          </div>
        </div>

        <div className="text-[11px] font-semibold text-amber-600 flex items-center justify-center gap-1 font-mono">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Pad B pada Smartphone Anda</span>
        </div>
      </div>
    </div>
  );
};

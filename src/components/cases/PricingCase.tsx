import React from 'react';
import { Check, Sparkles } from 'lucide-react';

interface CaseProps {
  variant: 'A' | 'B';
}

export const PricingCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // ANTI-PATTERN (Side A): Flat, no hierarchy, same weights, vague pricing
    return (
      <div className="w-full text-slate-600 font-sans py-2">
        <h4 className="text-center font-bold text-sm sm:text-base text-slate-700 mb-4 font-sans">
          Paket Langganan Mentorship
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Plan 1 */}
          <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500 font-sans">Basic</div>
              <div className="text-xl sm:text-2xl font-bold text-slate-800 mt-1 font-mono">29k</div>
              <ul className="text-xs sm:text-sm text-slate-500 mt-3 space-y-1.5 font-sans">
                <li>• Akses materi video</li>
                <li>• 1 Akun pengguna</li>
                <li>• Email support</li>
              </ul>
            </div>
            <button type="button" className="mt-4 w-full py-2 bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold cursor-pointer border border-slate-300">
              Pilih Paket
            </button>
          </div>

          {/* Plan 2 - Exact same look */}
          <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500 font-sans">Pro</div>
              <div className="text-xl sm:text-2xl font-bold text-slate-800 mt-1 font-mono">89k</div>
              <ul className="text-xs sm:text-sm text-slate-500 mt-3 space-y-1.5 font-sans">
                <li>• Semua materi video</li>
                <li>• 5 Akun pengguna</li>
                <li>• Priority chat mentor</li>
              </ul>
            </div>
            <button type="button" className="mt-4 w-full py-2 bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold cursor-pointer border border-slate-300">
              Pilih Paket
            </button>
          </div>
        </div>
      </div>
    );
  }

  // BEST PRACTICE (Side B): Clear visual anchor, badge, price clarity, distinct CTA, WCAG AAA compliant
  return (
    <div className="w-full text-slate-900 font-sans py-2">
      <div className="text-center mb-4">
        <h4 className="font-bold text-sm sm:text-base text-slate-900">Investasi Belajar Desain</h4>
        <p className="text-xs text-slate-600 font-sans">Pilih paket terbaik untuk mempercepat karir UI/UX Anda</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
        {/* Starter Plan */}
        <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 font-mono">Starter</span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Rp 29rb</span>
              <span className="text-xs text-slate-500 font-sans">/bln</span>
            </div>
            <ul className="text-xs sm:text-sm text-slate-800 mt-3 space-y-2 font-sans font-medium">
              <li className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-slate-500" /> 10 Video Materi Dasar
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-slate-500" /> Akses Grup Komunitas
              </li>
            </ul>
          </div>
          <button type="button" className="mt-4 w-full py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-xl text-xs font-bold transition cursor-pointer font-sans border border-slate-300">
            Mulai Starter
          </button>
        </div>

        {/* Pro Plan (Highlighted Anchor) */}
        <div className="p-4 sm:p-5 bg-blue-50/70 border-2 border-[#0560FD] rounded-2xl relative shadow-md shadow-blue-500/10 flex flex-col justify-between">
          <div className="absolute -top-3 right-3 bg-[#0560FD] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm font-mono uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> REKOMENDASI
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 font-mono">Pro Mentor</span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Rp 89rb</span>
              <span className="text-xs text-slate-600 font-sans">/bln</span>
            </div>
            <ul className="text-xs sm:text-sm text-slate-900 mt-3 space-y-2 font-sans font-bold">
              <li className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#0560FD]" /> Semua Video + Figma Assets
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#0560FD]" /> 1-on-1 Review Portfolio
              </li>
            </ul>
          </div>
          <button type="button" className="mt-4 w-full py-2.5 bg-[#0560FD] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/25 transition cursor-pointer font-sans">
            Pilih Pro Mentor
          </button>
        </div>
      </div>
    </div>
  );
};

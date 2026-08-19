import React from 'react';
import { Smartphone, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface CaseProps {
  variant: 'A' | 'B';
}

export const PricingCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // ANTI-PATTERN DESIGN (Side A): Floating Top-Right 32px Button (Hard-to-reach zone)
    return (
      <div className="w-full max-w-sm mx-auto text-slate-700 font-sans py-1">
        {/* Smartphone mockup frame */}
        <div className="bg-slate-50 border-2 border-slate-300 rounded-3xl p-4 space-y-4 shadow-sm relative overflow-hidden">
          {/* Header with tiny action button in top right */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="text-xs font-bold text-slate-900">Checkout Pesanan</div>
            {/* Tiny 30px button in difficult top-right zone */}
            <button
              type="button"
              className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-bold shadow-xs flex items-center gap-1"
            >
              <span>Bayar</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Hard-to-reach indicator banner */}
          <div className="p-2 bg-rose-50 border border-rose-200 rounded-xl text-[10px] text-rose-800 font-medium flex items-center gap-1.5">
            <span>❌ Zona Sulit: Jempol harus meregang ~12cm ke pojok atas.</span>
          </div>

          {/* Order Summary Details */}
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <div className="font-bold text-slate-800">UI/UX Mentorship Program</div>
              <div className="text-[11px] text-slate-500">Akses 1 Bulan • 12 Sesi Live</div>
              <div className="text-sm font-bold text-slate-900 pt-1">Rp 750.000</div>
            </div>
          </div>

          {/* Bottom Thumb Area Left Empty */}
          <div className="h-16 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center p-2">
            <span className="text-[10px] text-slate-400 font-mono">
              [Area Jempol Bawah Kosong]
            </span>
          </div>
        </div>
      </div>
    );
  }

  // BEST PRACTICE DESIGN (Side B): Fitts's Law Ergonomic Sticky Bottom CTA (52px target height)
  return (
    <div className="w-full max-w-sm mx-auto text-slate-900 font-sans py-1">
      {/* Smartphone mockup frame */}
      <div className="bg-white border-2 border-slate-300 rounded-3xl p-4 space-y-3 shadow-md relative overflow-hidden">
        {/* Clean Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-blue-600" />
            <span>Ringkasan Checkout</span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Garansi 100%
          </span>
        </div>

        {/* Order Details */}
        <div className="p-3 bg-slate-50 border border-slate-200/90 rounded-2xl space-y-1.5 text-xs">
          <div className="flex justify-between font-bold text-slate-900">
            <span>UI/UX Mentorship Program</span>
            <span>Rp 750.000</span>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> 12 Sesi Live + Portofolio Review
          </div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-1 border-t border-slate-200/60">
            <ShieldCheck className="w-3 h-3 text-slate-500" /> Enkripsi Keamanan 256-Bit
          </div>
        </div>

        {/* Natural Ergonomic Thumb Zone Badge */}
        <div className="p-1.5 bg-emerald-50 border border-emerald-200/80 rounded-xl text-[10px] text-emerald-800 font-semibold text-center">
          ✅ Zona Natural Jempol: Target sentuh besar & instan dioperasikan
        </div>

        {/* Sticky Full-Width Bottom Action Bar (Fitts's Law 52px height) */}
        <div className="pt-1">
          <button
            type="button"
            className="w-full py-3.5 px-4 bg-[#0560FD] hover:bg-blue-700 active:scale-[0.98] text-white rounded-2xl text-xs font-bold shadow-md shadow-blue-500/25 transition cursor-pointer flex items-center justify-between"
          >
            <div className="text-left">
              <div className="text-[10px] text-blue-100 font-normal">Total Pembayaran</div>
              <div className="text-sm font-bold leading-none">Rp 750.000</div>
            </div>
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-xl font-bold">
              <span>Lanjut Bayar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

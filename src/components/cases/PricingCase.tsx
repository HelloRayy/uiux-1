import React from 'react';
import { Smartphone, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface CaseProps {
  variant: 'A' | 'B';
}

export const PricingCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // VARIANT A: Top-Right Action Button
    return (
      <div className="w-full max-w-sm mx-auto text-slate-700 font-sans py-1">
        <div className="bg-slate-50 border-2 border-slate-300 rounded-3xl p-4 space-y-4 shadow-sm relative overflow-hidden">
          {/* Header with Top-Right Action Button */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="text-xs font-bold text-slate-900">Checkout Pesanan</div>
            <button
              type="button"
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <span>Bayar</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Order Summary Details */}
          <div className="space-y-2 text-xs">
            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl space-y-1.5">
              <div className="font-bold text-slate-900">UI/UX Mentorship Program</div>
              <div className="text-[11px] text-slate-500">Akses 1 Bulan • 12 Sesi Live Interaktif</div>
              <div className="text-sm font-bold text-slate-900 pt-1 border-t border-slate-100 flex justify-between items-center">
                <span className="text-slate-500 font-normal">Total Tagihan:</span>
                <span>Rp 750.000</span>
              </div>
            </div>
          </div>

          {/* Additional details */}
          <div className="p-3 bg-white border border-slate-200 rounded-2xl space-y-1 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
              <span>Sertifikat Kelulusan Resmi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
              <span>Garansi 100% Uang Kembali</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // VARIANT B: Sticky Bottom Full-Width Bar
  return (
    <div className="w-full max-w-sm mx-auto text-slate-900 font-sans py-1">
      <div className="bg-white border-2 border-slate-300 rounded-3xl p-4 space-y-4 shadow-md relative overflow-hidden">
        {/* Clean Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-blue-600" />
            <span>Ringkasan Checkout</span>
          </div>
          <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
            1 Item
          </span>
        </div>

        {/* Order Details */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl space-y-1.5 text-xs">
          <div className="flex justify-between font-bold text-slate-900">
            <span>UI/UX Mentorship Program</span>
            <span>Rp 750.000</span>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-slate-600" /> 12 Sesi Live + Portofolio Review
          </div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-1 border-t border-slate-200/60">
            <ShieldCheck className="w-3 h-3 text-slate-500" /> Enkripsi Keamanan 256-Bit
          </div>
        </div>

        {/* Sticky Full-Width Bottom Action Bar */}
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

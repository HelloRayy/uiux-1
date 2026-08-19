import React from 'react';
import { ShieldCheck, ShoppingBag } from 'lucide-react';

interface CaseProps {
  variant: 'A' | 'B';
}

export const CheckoutCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // ANTI-PATTERN: Dangerous equal weight buttons, vague price details
    return (
      <div className="w-full text-slate-600 font-sans py-2 max-w-md mx-auto">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
          <span className="text-sm font-bold text-slate-700 font-sans">Ringkasan Pembayaran</span>
          <span className="text-base font-bold text-slate-900 font-mono">Rp 250.000</span>
        </div>

        <div className="text-xs text-slate-500 space-y-1.5 mb-6 font-sans">
          <div>Item: 1x UI Design Kit Lifetime License</div>
          <div>Biaya lain: Rp 35.000 (Otomatis ditambahkan sistem)</div>
        </div>

        {/* Dangerous button layout: Equal size, high misclick risk */}
        <div className="grid grid-cols-2 gap-3 font-mono">
          <button type="button" className="py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer transition shadow-sm">
            BATALKAN
          </button>
          <button type="button" className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer transition shadow-sm">
            BAYAR SEKARANG
          </button>
        </div>
      </div>
    );
  }

  // BEST PRACTICE: Clear breakdown, primary vs secondary CTA, security reassurance, WCAG AAA compliant
  return (
    <div className="w-full text-slate-900 font-sans py-2 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
        <div className="p-2 bg-blue-50 rounded-xl text-[#0560FD] border border-blue-200">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900">Ringkasan Pembayaran</h4>
          <p className="text-xs text-slate-600 font-sans">1 Item dalam keranjang</p>
        </div>
      </div>

      {/* Transparent cost breakdown */}
      <div className="space-y-2 text-xs sm:text-sm mb-5 font-sans">
        <div className="flex justify-between text-slate-700 font-medium">
          <span>UI Design Kit (Lifetime Access)</span>
          <span className="text-slate-900 font-bold font-mono">Rp 250.000</span>
        </div>
        <div className="flex justify-between text-slate-700 font-medium">
          <span>Diskon Pelajar (10%)</span>
          <span className="text-emerald-700 font-bold font-mono">-Rp 25.000</span>
        </div>
        <div className="flex justify-between text-slate-700 font-medium">
          <span>Biaya Layanan Gateway</span>
          <span className="text-slate-900 font-bold font-mono">Rp 2.500</span>
        </div>
        <div className="pt-2.5 border-t border-slate-200 flex justify-between items-baseline">
          <span className="font-bold text-sm text-slate-900">Total Tagihan</span>
          <span className="font-black text-lg sm:text-xl text-[#0560FD] font-mono">Rp 227.500</span>
        </div>
      </div>

      {/* Primary CTA + Subtle Safe Secondary Action */}
      <div className="space-y-2.5 font-sans">
        <button
          type="button"
          className="w-full py-3 bg-[#0560FD] hover:bg-blue-700 active:scale-[0.99] text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/25 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          Lanjut ke Pembayaran
        </button>
        <button
          type="button"
          className="w-full py-1 text-slate-600 hover:text-slate-900 text-xs font-bold transition cursor-pointer"
        >
          Kembali ke Keranjang Belanja
        </button>
      </div>

      {/* Security trust badge */}
      <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-600 font-sans font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Enkripsi 256-bit & Garansi 100% Aman</span>
      </div>
    </div>
  );
};

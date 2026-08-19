import React from 'react';
import { Tag, Receipt } from 'lucide-react';

interface CaseProps {
  variant: 'A' | 'B';
}

export const ModalAlertCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // VARIANT A: Flat Unchunked Rows
    return (
      <div className="w-full max-w-sm mx-auto text-slate-700 font-sans py-1 space-y-3">
        <div className="pb-1 border-b border-slate-200 flex justify-between items-center">
          <div className="text-xs font-bold text-slate-900">Rincian Pembayaran</div>
          <span className="text-[10px] font-mono text-slate-400">Ringkasan Tagihan</span>
        </div>

        {/* Flat unchunked rows with uniform spacing */}
        <div className="space-y-2.5 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
          <div className="flex justify-between">
            <span className="text-slate-600">Ergonomic Mouse Wireless</span>
            <span className="font-mono text-slate-800">Rp 350.000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Desk Mat Extended Leather</span>
            <span className="font-mono text-slate-800">Rp 150.000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Biaya Pengiriman Instant</span>
            <span className="font-mono text-slate-800">Rp 25.000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Biaya Layanan Aplikasi</span>
            <span className="font-mono text-slate-800">Rp 2.000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Diskon Kupon Promo</span>
            <span className="font-mono text-slate-800">-Rp 50.000</span>
          </div>
          <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200">
            <span>Total Pembayaran Akhir</span>
            <span className="font-mono text-sm">Rp 477.000</span>
          </div>
        </div>
      </div>
    );
  }

  // VARIANT B: Gestalt Law of Proximity & Common Region
  return (
    <div className="w-full max-w-sm mx-auto text-slate-900 font-sans py-1 space-y-2.5">
      {/* Header */}
      <div className="flex justify-between items-center pb-1 border-b border-slate-100">
        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
          <Receipt className="w-3.5 h-3.5 text-blue-600" />
          <span>Rincian Tagihan Belanja</span>
        </div>
        <span className="text-[10px] font-mono text-slate-500">2 Produk</span>
      </div>

      {/* Common Region 1: Item Grouping */}
      <div className="p-2.5 bg-slate-50 border border-slate-200/90 rounded-xl space-y-1.5 text-xs">
        <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">Daftar Barang</div>
        <div className="flex justify-between text-slate-700">
          <span>Ergonomic Mouse Wireless (1x)</span>
          <span className="font-medium text-slate-900">Rp 350.000</span>
        </div>
        <div className="flex justify-between text-slate-700">
          <span>Desk Mat Extended Leather (1x)</span>
          <span className="font-medium text-slate-900">Rp 150.000</span>
        </div>
      </div>

      {/* Common Region 2: Voucher Applied Group */}
      <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900">
        <div className="flex items-center gap-1.5 font-semibold">
          <Tag className="w-3.5 h-3.5 text-emerald-600" />
          <span>Voucher Promo Diskon 10%</span>
        </div>
        <span className="font-bold font-mono">-Rp 50.000</span>
      </div>

      {/* Common Region 3: Final Total Container */}
      <div className="p-3 bg-white border-2 border-slate-900 rounded-xl space-y-1 shadow-xs">
        <div className="flex justify-between text-xs text-slate-500">
          <span>Subtotal + Ongkir</span>
          <span className="font-mono">Rp 527.000</span>
        </div>
        <div className="flex justify-between text-xs text-emerald-600">
          <span>Total Hemat Promo</span>
          <span className="font-mono">-Rp 50.000</span>
        </div>
        <div className="pt-1.5 border-t border-slate-200 flex justify-between items-center">
          <span className="text-xs font-bold text-slate-900">Total Pembayaran</span>
          <span className="text-base font-bold text-[#0560FD] font-mono">Rp 477.000</span>
        </div>
      </div>
    </div>
  );
};

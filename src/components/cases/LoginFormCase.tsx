import React, { useState } from 'react';
import { Search, SlidersHorizontal, Filter, Check, Star } from 'lucide-react';

interface CaseProps {
  variant: 'A' | 'B';
}

export const LoginFormCase: React.FC<CaseProps> = ({ variant }) => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  if (variant === 'A') {
    // VARIANT A: Eksperimental Filter & Minimalist Floating Action
    return (
      <div className="w-full max-w-md mx-auto text-slate-600 font-sans py-2 space-y-4">
        {/* Top Navigation without standard search input */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-slate-700 font-bold font-mono">Eksplorasi Katalog</h4>
            <p className="text-xs text-slate-400">Pilih simbol filter kategori</p>
          </div>
          {/* Floating filter icon */}
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition cursor-pointer"
            title="Filter Menu"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Custom symbolic categories */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold text-slate-500">Filter Kategori:</div>
          <div className="flex items-center gap-2">
            {['◆', '▲', '●', '★', '◼'].map((sym, idx) => (
              <div
                key={idx}
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-mono font-bold cursor-pointer transition ${
                  idx === 0 ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {sym}
              </div>
            ))}
          </div>
        </div>

        {/* Product Card */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
          <div className="h-28 bg-slate-200/70 rounded-xl flex items-center justify-center text-slate-400 text-xs font-mono">
            [Foto Produk Wireless Headphone]
          </div>
          <div className="flex justify-between items-center text-xs">
            <div>
              <div className="font-bold text-slate-800">Wireless Headphone Pro</div>
              <div className="text-[11px] text-slate-400">Audio • Premium Series</div>
            </div>
            <div className="font-bold text-slate-900 text-sm">Rp 1.499.000</div>
          </div>
        </div>
      </div>
    );
  }

  // VARIANT B: Standard Search Bar + Category Pills
  const categories = [
    { name: 'Semua', icon: null },
    { name: '🔥 Terpopuler', icon: null },
    { name: '📱 Gadget', icon: null },
    { name: '👕 Fashion', icon: null },
    { name: '⚡ Promo', icon: null },
  ];

  return (
    <div className="w-full max-w-md mx-auto text-slate-900 font-sans py-2 space-y-4">
      {/* Prominent Standard Search Bar */}
      <div className="flex items-center gap-2.5">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari headphone, gadget, atau brand..."
            defaultValue=""
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0560FD] focus:bg-white transition"
          />
        </div>
        <button
          type="button"
          className="p-2.5 bg-white border border-slate-300 hover:border-slate-400 rounded-xl text-slate-700 shadow-xs flex items-center justify-center cursor-pointer transition"
          title="Filter Lengkap"
        >
          <SlidersHorizontal className="w-4 h-4 text-slate-800" />
        </button>
      </div>

      {/* Familiar Horizontal Category Pills */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {isActive && <Check className="w-3 h-3 text-emerald-400" />}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Card */}
      <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2.5">
        <div className="h-28 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-[#0560FD] text-xs font-semibold relative">
          <span>Wireless Noise Cancelling Pro</span>
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-500 text-white text-[10px] font-bold">
            Diskon 25%
          </span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <div>
            <div className="font-bold text-slate-900">Sony WH-1000XM5</div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> 4.9 (1.2k ulasan)
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-[#0560FD] text-sm">Rp 4.499.000</div>
            <div className="text-[10px] text-slate-400 line-through">Rp 5.999.000</div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Home, Search, ShoppingBag, User, Heart, Bell, MessageSquare, Wallet } from 'lucide-react';

interface CaseProps {
  variant: 'A' | 'B';
}

export const NavigationCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // VARIANT A: 8 Crowded Icon-Only Menu (Mystery Meat UI & Narrow Touch Targets)
    return (
      <div className="w-full max-w-sm mx-auto text-slate-700 font-sans py-1">
        <div className="bg-slate-50 border-2 border-slate-300 rounded-3xl p-3.5 space-y-3 shadow-sm relative overflow-hidden">
          {/* App Header */}
          <div className="flex justify-between items-center pb-2 border-b border-slate-200 text-xs font-bold text-slate-900">
            <span>E-Commerce App</span>
            <span className="text-[10px] text-slate-400 font-mono">8 Menu Icon-Only</span>
          </div>

          {/* Feed Content Mockup */}
          <div className="h-40 bg-white border border-slate-200 rounded-2xl p-3 flex flex-col justify-between">
            <div className="h-20 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-xs font-mono">
              [Feed Produk Katalog]
            </div>
            <div className="text-[11px] text-slate-600 font-medium">Promo Spesial Hari Ini</div>
          </div>

          {/* Crowded 8-Icon Bottom Nav */}
          <div className="bg-white border border-slate-200 rounded-2xl p-2 flex items-center justify-between shadow-2xs">
            {[
              { icon: Home, active: true },
              { icon: Search, active: false },
              { icon: ShoppingBag, active: false },
              { icon: Heart, active: false },
              { icon: MessageSquare, active: false },
              { icon: Bell, active: false },
              { icon: Wallet, active: false },
              { icon: User, active: false },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-1.5 rounded-lg flex items-center justify-center ${
                    item.active ? 'text-blue-600 bg-blue-50' : 'text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // VARIANT B: 4 Labeled & Ergonomic Bottom Menu
  return (
    <div className="w-full max-w-sm mx-auto text-slate-900 font-sans py-1">
      <div className="bg-white border-2 border-slate-300 rounded-3xl p-3.5 space-y-3 shadow-md relative overflow-hidden">
        {/* App Header */}
        <div className="flex justify-between items-center pb-2 border-b border-slate-100 text-xs font-bold text-slate-900">
          <span>E-Commerce App</span>
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            4 Menu Utama
          </span>
        </div>

        {/* Feed Content Mockup */}
        <div className="h-40 bg-slate-50 border border-slate-200/90 rounded-2xl p-3 flex flex-col justify-between">
          <div className="h-20 bg-blue-50/70 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-xs font-semibold">
            [Feed Rekomendasi Produk]
          </div>
          <div className="text-[11px] text-slate-700 font-bold">Diskon Flash Sale Terbatas</div>
        </div>

        {/* Clean 4-Item Bottom Nav with Labels */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-1.5 grid grid-cols-4 gap-1 shadow-sm">
          {[
            { icon: Home, label: 'Beranda', active: true },
            { icon: Search, label: 'Cari', active: false },
            { icon: ShoppingBag, label: 'Keranjang', active: false },
            { icon: User, label: 'Akun', active: false },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`py-1.5 rounded-xl flex flex-col items-center justify-center gap-0.5 ${
                  item.active ? 'text-[#0560FD] bg-blue-50/60 font-bold' : 'text-slate-500 font-medium'
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

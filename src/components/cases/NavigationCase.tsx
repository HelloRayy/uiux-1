import React, { useState } from 'react';
import { Home, Compass, Bookmark, Bell, User, Settings, Heart, HelpCircle, MoreHorizontal } from 'lucide-react';

interface CaseProps {
  variant: 'A' | 'B';
}

export const NavigationCase: React.FC<CaseProps> = ({ variant }) => {
  const [activeTab, setActiveTab] = useState('home');

  if (variant === 'A') {
    // ANTI-PATTERN: Overcrowded 8 icons, no labels, tiny touch targets (<24px)
    return (
      <div className="w-full text-slate-500 font-sans py-2 max-w-md mx-auto flex flex-col justify-between h-48">
        <div className="text-center text-xs text-slate-500 font-medium pt-2 font-sans">
          Halaman Beranda Aplikasi Mobile
        </div>
        
        <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200 flex justify-between items-center px-2">
          {/* 8 tiny icons crammed together with no text */}
          <button type="button" className="p-1.5 text-[#0560FD]"><Home className="w-4 h-4" /></button>
          <button type="button" className="p-1.5 text-slate-400"><Compass className="w-4 h-4" /></button>
          <button type="button" className="p-1.5 text-slate-400"><Bookmark className="w-4 h-4" /></button>
          <button type="button" className="p-1.5 text-slate-400"><Heart className="w-4 h-4" /></button>
          <button type="button" className="p-1.5 text-slate-400"><Bell className="w-4 h-4" /></button>
          <button type="button" className="p-1.5 text-slate-400"><User className="w-4 h-4" /></button>
          <button type="button" className="p-1.5 text-slate-400"><Settings className="w-4 h-4" /></button>
          <button type="button" className="p-1.5 text-slate-400"><HelpCircle className="w-4 h-4" /></button>
        </div>
      </div>
    );
  }

  // BEST PRACTICE: 4 key destinations with labels, accessible touch targets, clear active state, WCAG compliant
  return (
    <div className="w-full text-slate-900 font-sans py-2 max-w-md mx-auto flex flex-col justify-between h-48">
      <div className="text-center pt-2">
        <div className="text-sm font-bold text-slate-900">Halaman Beranda Aplikasi Mobile</div>
        <p className="text-xs text-slate-600 font-sans mt-0.5">Navigasi bawah terfokus pada 4 aksi utama</p>
      </div>

      <nav className="bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 flex justify-around items-center shadow-sm">
        {/* Home */}
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center min-w-[60px] py-1.5 rounded-xl transition cursor-pointer ${
            activeTab === 'home' ? 'text-[#0560FD] bg-blue-100/70 font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-sans font-bold">Beranda</span>
        </button>

        {/* Explore */}
        <button
          type="button"
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center justify-center min-w-[60px] py-1.5 rounded-xl transition cursor-pointer ${
            activeTab === 'explore' ? 'text-[#0560FD] bg-blue-100/70 font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-sans font-bold">Eksplor</span>
        </button>

        {/* Notifications */}
        <button
          type="button"
          onClick={() => setActiveTab('notif')}
          className={`flex flex-col items-center justify-center min-w-[60px] py-1.5 rounded-xl transition cursor-pointer relative ${
            activeTab === 'notif' ? 'text-[#0560FD] bg-blue-100/70 font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="relative">
            <Bell className="w-5 h-5" />
            <span className="w-2.5 h-2.5 bg-rose-600 rounded-full absolute -top-0.5 -right-0.5 ring-2 ring-white" />
          </div>
          <span className="text-[10px] mt-0.5 font-sans font-bold">Notifikasi</span>
        </button>

        {/* More */}
        <button
          type="button"
          onClick={() => setActiveTab('more')}
          className={`flex flex-col items-center justify-center min-w-[60px] py-1.5 rounded-xl transition cursor-pointer ${
            activeTab === 'more' ? 'text-[#0560FD] bg-blue-100/70 font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-sans font-bold">Lainnya</span>
        </button>
      </nav>
    </div>
  );
};

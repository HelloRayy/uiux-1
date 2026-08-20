import React from 'react';
import { Mail, User, Calendar, Clock, Sparkles } from 'lucide-react';

interface CaseProps {
  variant: 'A' | 'B';
}

export const TutorialCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // VARIANT A: Minimalist Flat Registration Form (Real App UI)
    return (
      <div className="w-full max-w-sm mx-auto text-slate-700 font-sans py-1 space-y-3.5">
        <div className="pb-1 border-b border-slate-200 flex justify-between items-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">REGISTRATION FORM</span>
          <span className="text-[10px] text-slate-400">Step 1</span>
        </div>

        {/* Minimalist Flat Form */}
        <div className="space-y-2.5">
          <input
            type="text"
            placeholder="user@example.com"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-700 focus:outline-none"
          />
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-700 focus:outline-none"
          />
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" className="rounded text-slate-600" />
              <span>Ingat saya</span>
            </label>
            <span className="text-slate-400 hover:underline cursor-pointer">Reset?</span>
          </div>
        </div>

        {/* Flat Submit Button */}
        <button
          type="button"
          className="w-full py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
        >
          Submit
        </button>
      </div>
    );
  }

  // VARIANT B: Rich Human-Centered Event Card (Real App UI)
  return (
    <div className="w-full max-w-sm mx-auto text-slate-900 font-sans py-1 space-y-3">
      {/* Event Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-50 text-[#0560FD] rounded-full text-[10px] font-bold border border-blue-200/80">
          <Sparkles className="w-3 h-3" />
          <span>Workshop UI/UX Fundamental</span>
        </div>
        <h4 className="text-base font-bold text-slate-900 leading-snug">
          Daftar Sesi Mentoring Desain
        </h4>
        <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-400" /> Hari Ini</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" /> 19:30 WIB</span>
        </div>
      </div>

      {/* Structured Input Fields */}
      <div className="space-y-2 text-xs">
        <div>
          <label className="block font-bold text-slate-800 mb-1">Nama Lengkap</label>
          <div className="relative">
            <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Contoh: Raditya Pratama"
              defaultValue="Raditya Pratama"
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0560FD] focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-800 mb-1">Alamat Email</label>
          <div className="relative">
            <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              placeholder="nama@email.com"
              defaultValue="raditya@student.id"
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0560FD] focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Prominent Action Button */}
      <div className="space-y-1.5 pt-1">
        <button
          type="button"
          className="w-full py-2.5 bg-[#0560FD] hover:bg-blue-700 active:scale-[0.99] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/25 transition cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Daftar Sesi Sekarang (Gratis)</span>
        </button>
        <p className="text-[10px] text-slate-600 text-center">
          Sudah terdaftar? <span className="text-[#0560FD] font-semibold cursor-pointer">Masuk di sini</span>
        </p>
      </div>
    </div>
  );
};

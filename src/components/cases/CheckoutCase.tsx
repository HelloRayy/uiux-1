import React from 'react';
import { User, Mail, ShieldAlert, Check } from 'lucide-react';

interface CaseProps {
  variant: 'A' | 'B';
}

export const CheckoutCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // VARIANT A: Equal Split Destructive vs Primary Button (High Fat-Finger Risk)
    return (
      <div className="w-full max-w-sm mx-auto text-slate-700 font-sans py-1 space-y-3.5">
        <div className="pb-1.5 border-b border-slate-200 flex justify-between items-center">
          <div className="text-xs font-bold text-slate-900">Pengaturan Profil Pengguna</div>
          <span className="text-[10px] font-mono text-slate-400">Edit Akun</span>
        </div>

        {/* Profile Mock Form */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
          <div>
            <label className="text-slate-600 font-bold">Nama Lengkap</label>
            <input
              type="text"
              defaultValue="Raditya Pratama"
              className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-800 mt-0.5"
            />
          </div>
          <div>
            <label className="text-slate-600 font-bold">Email</label>
            <input
              type="email"
              defaultValue="raditya@company.com"
              className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-800 mt-0.5"
            />
          </div>
        </div>

        {/* 50/50 Equal Split Dangerous Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            className="py-3 px-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center justify-center gap-1"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Hapus Akun</span>
          </button>
          <button
            type="button"
            className="py-3 px-2 bg-[#0560FD] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center justify-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Simpan Data</span>
          </button>
        </div>
      </div>
    );
  }

  // VARIANT B: Clear Primary Action Hierarchy & Isolated Destructive Link
  return (
    <div className="w-full max-w-sm mx-auto text-slate-900 font-sans py-1 space-y-3.5">
      <div className="pb-1.5 border-b border-slate-100 flex justify-between items-center">
        <div className="text-xs font-bold text-slate-900">Pengaturan Profil Pengguna</div>
        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Tersinkron
        </span>
      </div>

      {/* Profile Mock Form */}
      <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl space-y-2.5 text-xs">
        <div>
          <label className="block font-bold text-slate-800 mb-1">Nama Lengkap</label>
          <div className="relative">
            <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              defaultValue="Raditya Pratama"
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0560FD]"
            />
          </div>
        </div>
        <div>
          <label className="block font-bold text-slate-800 mb-1">Email</label>
          <div className="relative">
            <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              defaultValue="raditya@company.com"
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0560FD]"
            />
          </div>
        </div>
      </div>

      {/* Prominent Primary CTA + Separate Subtle Cancel */}
      <div className="space-y-2 pt-1">
        <button
          type="button"
          className="w-full py-3 bg-[#0560FD] hover:bg-blue-700 active:scale-[0.99] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/25 transition cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Simpan Perubahan</span>
        </button>

        <div className="flex justify-between items-center text-[11px] pt-1 px-1">
          <button type="button" className="text-slate-500 hover:text-slate-800 transition font-medium cursor-pointer">
            Batal
          </button>
          <button type="button" className="text-rose-600 hover:text-rose-700 transition font-medium cursor-pointer">
            Hapus Akun Ini
          </button>
        </div>
      </div>
    </div>
  );
};

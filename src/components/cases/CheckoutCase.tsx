import React from 'react';
import { ArrowRight, User, Mail, Phone, Layers } from 'lucide-react';

interface CaseProps {
  variant: 'A' | 'B';
}

export const CheckoutCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // VARIANT A: Single Long Form
    return (
      <div className="w-full max-w-sm mx-auto text-slate-700 font-sans py-1 space-y-3">
        <div className="pb-1 border-b border-slate-200 flex justify-between items-center">
          <div className="text-xs font-bold text-slate-900">Formulir Registrasi Lengkap</div>
          <span className="text-[10px] font-mono text-slate-400">12 Input</span>
        </div>

        {/* Dense crowded inputs */}
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div>
            <label className="text-slate-600 font-medium">Nama Depan</label>
            <input type="text" placeholder="John" className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 mt-0.5" />
          </div>
          <div>
            <label className="text-slate-600 font-medium">Nama Belakang</label>
            <input type="text" placeholder="Doe" className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 mt-0.5" />
          </div>
          <div className="col-span-2">
            <label className="text-slate-600 font-medium">Nomor Induk Kependudukan (NIK)</label>
            <input type="text" placeholder="3201..." className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 mt-0.5" />
          </div>
          <div>
            <label className="text-slate-600 font-medium">Email Utama</label>
            <input type="text" placeholder="john@..." className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 mt-0.5" />
          </div>
          <div>
            <label className="text-slate-600 font-medium">No. WhatsApp</label>
            <input type="text" placeholder="0812..." className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 mt-0.5" />
          </div>
          <div className="col-span-2">
            <label className="text-slate-600 font-medium">Alamat Lengkap KTP</label>
            <input type="text" placeholder="Jl. Sudirman No..." className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 mt-0.5" />
          </div>
          <div>
            <label className="text-slate-600 font-medium">Provinsi</label>
            <input type="text" placeholder="DKI Jakarta" className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 mt-0.5" />
          </div>
          <div>
            <label className="text-slate-600 font-medium">Kode Pos</label>
            <input type="text" placeholder="12190" className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 mt-0.5" />
          </div>
        </div>

        <button type="button" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer">
          Simpan Seluruh Data
        </button>
      </div>
    );
  }

  // VARIANT B: 3-Step Progressive Disclosure Wizard
  return (
    <div className="w-full max-w-sm mx-auto text-slate-900 font-sans py-1 space-y-3.5">
      {/* 3-Step Indicator with Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-800">
          <span className="flex items-center gap-1.5 font-bold text-[#0560FD]">
            <Layers className="w-4 h-4" /> Langkah 1: Info Dasar
          </span>
          <span className="text-[11px] font-mono text-slate-500">1 dari 3 (33%)</span>
        </div>
        {/* Progress bar track */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#0560FD] rounded-full w-1/3 transition-all duration-300" />
        </div>
        {/* Steps breadcrumbs */}
        <div className="flex justify-between text-[10px] text-slate-400 font-medium">
          <span className="text-[#0560FD] font-bold">1. Akun Dasar</span>
          <span>2. Alamat</span>
          <span>3. Verifikasi</span>
        </div>
      </div>

      {/* Focused Inputs for Step 1 */}
      <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl space-y-3 text-xs">
        <div>
          <label className="block font-bold text-slate-800 mb-1">Nama Lengkap</label>
          <div className="relative">
            <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Contoh: Raditya Pratama"
              defaultValue="Raditya Pratama"
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0560FD]"
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
              defaultValue="raditya@company.com"
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0560FD]"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-800 mb-1">No. WhatsApp</label>
          <div className="relative">
            <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="tel"
              placeholder="0812-3456-7890"
              defaultValue="0812-9876-5432"
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0560FD]"
            />
          </div>
        </div>
      </div>

      {/* Next Step CTA */}
      <button
        type="button"
        className="w-full py-3 bg-[#0560FD] hover:bg-blue-700 active:scale-[0.99] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/25 transition cursor-pointer flex items-center justify-center gap-2"
      >
        <span>Lanjut ke Langkah 2 (Alamat)</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

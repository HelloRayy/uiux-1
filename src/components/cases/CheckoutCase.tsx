import React from 'react';
import { ArrowRight, Sparkles, User, Mail, Phone, Layers } from 'lucide-react';

interface CaseProps {
  variant: 'A' | 'B';
}

export const CheckoutCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // ANTI-PATTERN DESIGN (Side A): Single Long 12-Field Form (Cognitive Overload)
    return (
      <div className="w-full max-w-sm mx-auto text-slate-700 font-sans py-1 space-y-2.5">
        <div className="pb-1 border-b border-slate-200 flex justify-between items-center">
          <div className="text-xs font-bold text-slate-900">Formulir Registrasi Lengkap</div>
          <span className="text-[10px] font-mono text-slate-400">12 Input Sekaligus</span>
        </div>

        <div className="p-2 bg-amber-50 border border-amber-200 rounded-xl text-[10px] text-amber-900 flex items-center gap-1.5">
          <span>⚠️ Hick's Law: 12 field sekaligus memicu kelelahan visual & form drop-off.</span>
        </div>

        {/* Dense crowded inputs */}
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div>
            <label className="text-slate-500">Nama Depan</label>
            <input type="text" placeholder="John" className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-slate-600" />
          </div>
          <div>
            <label className="text-slate-500">Nama Belakang</label>
            <input type="text" placeholder="Doe" className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-slate-600" />
          </div>
          <div className="col-span-2">
            <label className="text-slate-500">Nomor Induk Kependudukan (NIK)</label>
            <input type="text" placeholder="3201..." className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-slate-600" />
          </div>
          <div>
            <label className="text-slate-500">Email Utama</label>
            <input type="text" placeholder="john@..." className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-slate-600" />
          </div>
          <div>
            <label className="text-slate-500">No. WhatsApp</label>
            <input type="text" placeholder="0812..." className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-slate-600" />
          </div>
          <div className="col-span-2">
            <label className="text-slate-500">Alamat Lengkap KTP</label>
            <input type="text" placeholder="Jl. Sudirman No..." className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-slate-600" />
          </div>
          <div>
            <label className="text-slate-500">Provinsi</label>
            <input type="text" placeholder="DKI Jakarta" className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-slate-600" />
          </div>
          <div>
            <label className="text-slate-500">Kode Pos</label>
            <input type="text" placeholder="12190" className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-slate-600" />
          </div>
        </div>

        <button type="button" className="w-full py-2 bg-slate-200 text-slate-500 rounded-xl text-xs font-bold border border-slate-300">
          Simpan Semua Data (Panjang)
        </button>
      </div>
    );
  }

  // BEST PRACTICE DESIGN (Side B): Progressive Disclosure (3-Step Wizard)
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

      {/* Focused, High-Clarity Inputs for Step 1 */}
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

      <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
        <Sparkles className="w-3.5 h-3.5 text-[#0560FD]" />
        <span>Hanya 3 input per langkah: Ringan & cepat diselesaikan.</span>
      </div>
    </div>
  );
};

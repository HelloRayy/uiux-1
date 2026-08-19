import React from 'react';
import { RefreshCw, WifiOff } from 'lucide-react';

interface CaseProps {
  variant: 'A' | 'B';
}

export const ModalAlertCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // ANTI-PATTERN: Cryptic developer jargon, ambiguous buttons ("OK" vs "Batal")
    return (
      <div className="w-full max-w-md mx-auto p-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600">
        <div className="text-center mb-4">
          <div className="text-xs font-mono font-bold text-rose-600">
            HTTP 500: Internal Server Error
          </div>
          <p className="text-xs font-mono text-slate-700 mt-2 bg-white p-3 rounded-xl border border-slate-200 text-left overflow-x-auto">
            Uncaught TypeError: Cannot read properties of undefined (reading 'token_auth_id') at line 142.
          </p>
        </div>

        {/* Ambiguous action buttons */}
        <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 font-sans">
          <button type="button" className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold cursor-pointer">
            Batal
          </button>
          <button type="button" className="px-4 py-2 bg-slate-300 hover:bg-slate-400 text-slate-900 rounded-xl text-xs font-bold cursor-pointer">
            OK
          </button>
        </div>
      </div>
    );
  }

  // BEST PRACTICE: Empathetic human language, actionable steps, clear button verbs, WCAG AAA compliant
  return (
    <div className="w-full max-w-md mx-auto p-5 bg-white border border-slate-200 rounded-2xl text-slate-900 shadow-md relative overflow-hidden">
      <div className="flex items-start gap-3.5">
        <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 shrink-0">
          <WifiOff className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900">Gagal Menyimpan Perubahan</h4>
          <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed font-sans font-normal">
            Koneksi internet Anda terputus sejenak. Jangan khawatir, draf pekerjaan Anda telah tersimpan aman di perangkat ini.
          </p>
        </div>
      </div>

      <div className="mt-5 pt-3.5 border-t border-slate-100 flex justify-end items-center gap-2.5 font-sans">
        <button
          type="button"
          className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer"
        >
          Tutup & Coba Nanti
        </button>
        <button
          type="button"
          className="px-4 py-2.5 bg-[#0560FD] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/25 transition flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Coba Simpan Lagi
        </button>
      </div>
    </div>
  );
};

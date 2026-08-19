import React from 'react';
import { AlertTriangle, RefreshCw, HelpCircle } from 'lucide-react';

interface CaseProps {
  variant: 'A' | 'B';
}

export const ModalAlertCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // VARIANT A: Technical Jargon & Passive Dialog
    return (
      <div className="w-full max-w-sm mx-auto text-slate-700 font-sans py-2">
        <div className="bg-slate-50 border border-slate-300 rounded-3xl p-5 space-y-4 shadow-sm text-center">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <div className="text-sm font-bold text-slate-900 font-mono">ERROR #401: REQUEST_FAILED</div>
            <div className="text-[11px] text-slate-500 font-mono bg-white p-2.5 rounded-xl border border-slate-200 text-left">
              java.lang.NullPointerException at service.auth.session.SyncState() line 42. Code 0x80004005.
            </div>
          </div>

          <button
            type="button"
            className="w-full py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  // VARIANT B: Empathetic & Human-Centered Solution Dialog
  return (
    <div className="w-full max-w-sm mx-auto text-slate-900 font-sans py-2">
      <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-md text-center">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
          <RefreshCw className="w-6 h-6" />
        </div>

        <div className="space-y-1.5">
          <div className="text-base font-bold text-slate-900">Gagal Menyimpan Draf</div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Koneksi internet Anda terputus sebentar. Tenang, tulisan Anda tidak hilang dan tersimpan aman di perangkat.
          </p>
        </div>

        <div className="space-y-2 pt-1">
          <button
            type="button"
            className="w-full py-3 bg-[#0560FD] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/25 transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Coba Simpan Lagi</span>
          </button>

          <button
            type="button"
            className="w-full py-1 text-slate-500 hover:text-slate-800 text-[11px] font-medium flex items-center justify-center gap-1 cursor-pointer transition"
          >
            <HelpCircle className="w-3 h-3" />
            <span>Butuh Bantuan?</span>
          </button>
        </div>
      </div>
    </div>
  );
};

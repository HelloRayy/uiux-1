import React from 'react';
import { AlertOctagon, RefreshCw, HelpCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface CaseProps {
  variant: 'A' | 'B';
}

export const AlertCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // VARIANT A: Raw AI Robotic Jargon Dialog (Scary Technical Error, Passive Button)
    return (
      <div className="w-full max-w-sm mx-auto font-sans py-1 text-slate-800">
        <div className="rounded-3xl border border-rose-300 bg-rose-50/50 p-5 space-y-3.5 shadow-sm text-center">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertOctagon className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <div className="text-xs font-mono font-bold text-rose-700">FATAL_EXCEPTION_403</div>
            <div className="text-[10px] text-slate-600 font-mono bg-white p-2.5 rounded-lg border border-rose-200 text-left">
              Payload rejected by proxy service endpoint /api/v2/save_draft. Hash mismatch 0x884F.
            </div>
          </div>

          <button
            type="button"
            className="w-full py-2 bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
          >
            ABORT TRANSACTION
          </button>
        </div>
      </div>
    );
  }

  // VARIANT B: Human Taste Empathetic Recovery (Reassurance, Solution CTA, Help Link)
  return (
    <div className="w-full max-w-sm mx-auto font-sans py-1 text-slate-900">
      <Card className="p-5 space-y-4 shadow-sm border-slate-200 bg-white text-center">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
          <RefreshCw className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <h4 className="text-sm sm:text-base font-bold text-slate-900">
            Gagal Menyimpan Tugas Desain
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Koneksi internet Anda terputus sebentar. Tenang, seluruh perubahan tugas aman tersimpan di perangkat.
          </p>
        </div>

        <div className="space-y-2 pt-1">
          <Button size="sm" className="w-full gap-1.5 font-bold shadow-xs">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Coba Simpan Lagi</span>
          </Button>

          <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Hubungi Bantuan Mentor</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

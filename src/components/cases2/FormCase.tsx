import React from 'react';
import { Layers, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface CaseProps {
  variant: 'A' | 'B';
}

export const FormCase: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // VARIANT A: Raw AI Chaotic Form (12 Fields All-in-One, Tiny Inputs, No Grouping)
    return (
      <div className="w-full max-w-md mx-auto font-sans py-1 text-slate-800">
        <div className="rounded-2xl border border-slate-300 bg-slate-50 p-4 space-y-2.5 shadow-2xs">
          <div className="flex justify-between items-center pb-1 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-900">Formulir Pendaftaran & Checkout</span>
            <span className="text-[10px] text-rose-500 font-mono">*Wajib Semua</span>
          </div>

          {/* Crowded 3-column input grid */}
          <div className="grid grid-cols-3 gap-1.5 text-[9px]">
            <div>
              <label className="text-slate-600">Nama Depan *</label>
              <input type="text" placeholder="John" className="w-full p-1.5 bg-white border border-slate-300 rounded text-slate-800" />
            </div>
            <div>
              <label className="text-slate-600">Nama Tengah</label>
              <input type="text" placeholder="M." className="w-full p-1.5 bg-white border border-slate-300 rounded text-slate-800" />
            </div>
            <div>
              <label className="text-slate-600">Nama Belakang *</label>
              <input type="text" placeholder="Doe" className="w-full p-1.5 bg-white border border-slate-300 rounded text-slate-800" />
            </div>
            <div className="col-span-2">
              <label className="text-slate-600">Email Utama *</label>
              <input type="email" placeholder="john@email.com" className="w-full p-1.5 bg-white border border-slate-300 rounded text-slate-800" />
            </div>
            <div>
              <label className="text-slate-600">Nomor Telepon *</label>
              <input type="tel" placeholder="0812..." className="w-full p-1.5 bg-white border border-slate-300 rounded text-slate-800" />
            </div>
            <div className="col-span-3">
              <label className="text-slate-600">Alamat Lengkap Pengiriman *</label>
              <input type="text" placeholder="Jl. Sudirman Kav 21..." className="w-full p-1.5 bg-white border border-slate-300 rounded text-slate-800" />
            </div>
            <div>
              <label className="text-slate-600">Kota *</label>
              <input type="text" placeholder="Jakarta" className="w-full p-1.5 bg-white border border-slate-300 rounded text-slate-800" />
            </div>
            <div>
              <label className="text-slate-600">Provinsi *</label>
              <input type="text" placeholder="DKI" className="w-full p-1.5 bg-white border border-slate-300 rounded text-slate-800" />
            </div>
            <div>
              <label className="text-slate-600">Kode Pos *</label>
              <input type="text" placeholder="12190" className="w-full p-1.5 bg-white border border-slate-300 rounded text-slate-800" />
            </div>
          </div>

          <button type="button" className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-xs">
            Kirim Seluruh Data & Bayar
          </button>
        </div>
      </div>
    );
  }

  // VARIANT B: Human Taste Progressive Disclosure (3-Step Wizard with Clear Focus)
  return (
    <div className="w-full max-w-md mx-auto font-sans py-1 text-slate-900">
      <Card className="p-4 sm:p-5 space-y-3.5 shadow-sm border-slate-200 bg-white">
        {/* Step Indicator */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-primary font-bold">
              <Layers className="w-4 h-4" />
              <span>Langkah 1: Identitas Akun</span>
            </span>
            <Badge variant="secondary" className="font-mono text-[10px]">
              1 dari 3 (33%)
            </Badge>
          </div>
          <Progress value={33} max={100} className="h-1.5 bg-slate-100" />
        </div>

        {/* Focused Inputs for Step 1 */}
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-800 mb-1">Nama Lengkap</label>
            <input
              type="text"
              defaultValue="Raditya Pratama"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-800 mb-1">Alamat Email Kampus / Sekolah</label>
            <input
              type="email"
              defaultValue="raditya@student.sch.id"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Next Step Button */}
        <div className="space-y-2 pt-1">
          <Button size="sm" className="w-full gap-2 font-bold shadow-xs">
            <span>Lanjut ke Langkah 2 (Alamat Pengiriman)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Data Anda terenkripsi aman SSL 256-bit</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

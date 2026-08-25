import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface CaseProps {
  variant: 'A' | 'B';
}

export const TutorialCase2: React.FC<CaseProps> = ({ variant }) => {
  if (variant === 'A') {
    // VARIANT A: Raw AI Button (Over-gradient, Unreadable Contrast)
    return (
      <div className="w-full max-w-sm mx-auto font-sans py-1 text-slate-800">
        <div className="rounded-2xl border-2 border-indigo-300 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 p-4 text-center space-y-3 shadow-xs">
          <div className="text-xs font-bold text-slate-700 font-mono">CONTOH DESAIN A (RAW AI)</div>
          <p className="text-[11px] text-slate-500">
            Perhatikan tombol dengan gradasi kompleks di bawah:
          </p>
          <button
            type="button"
            className="w-full py-2.5 px-4 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 text-white font-extrabold text-xs rounded-full shadow-md animate-pulse"
          >
            KLIK DISINI SEKARANG JUGA ⚡
          </button>
        </div>
      </div>
    );
  }

  // VARIANT B: Human Taste Button (Clean Contrast & Icon Affordance)
  return (
    <div className="w-full max-w-sm mx-auto font-sans py-1 text-slate-900">
      <Card className="p-4 text-center space-y-3 shadow-sm border-slate-200 bg-white">
        <div className="flex justify-center">
          <Badge variant="outline" className="text-xs font-semibold text-primary bg-primary/5">
            CONTOH DESAIN B (HUMAN TASTE)
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Perhatikan tombol dengan hierarki dan kontras standar WCAG AAA:
        </p>
        <Button size="sm" className="w-full gap-2 font-bold shadow-xs">
          <span>Mulai Sesi Pembelajaran</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </Card>
    </div>
  );
};

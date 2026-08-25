import React, { useState } from 'react';
import { useGame2 } from '../context/Game2Context';
import { VoteOption } from '../types';
import {
  Smartphone,
  CheckCircle2,
  XCircle,
  Trophy,
  Sparkles,
  Zap,
  Clock,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

export const ParticipantView2: React.FC = () => {
  const {
    roomState,
    currentSlide,
    myParticipant,
    myVote,
    myScore,
    myLastEarned,
    myRank,
    totalParticipants,
    joinAsParticipant,
    submitMyVote,
  } = useGame2();

  const [nicknameInput, setNicknameInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState<'A' | 'B'>('A');

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nicknameInput.trim() || isSubmitting) return;
    setIsSubmitting(true);
    await joinAsParticipant(nicknameInput.trim());
    setIsSubmitting(false);
  };

  const handleVote = async (option: VoteOption) => {
    if (!myParticipant || roomState.status !== 'VOTING' || myVote) return;
    await submitMyVote(option);
  };

  const Component = currentSlide.Component;
  const isCorrect = myVote ? myVote === currentSlide.correctOption : false;

  // =========================================================================
  // 1. PARTICIPANT ONBOARDING SCREEN (NAME INPUT)
  // =========================================================================
  if (!myParticipant) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
        <Card className="w-full max-w-sm p-6 space-y-6 shadow-md border-slate-200 bg-white animate-fade-in">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto border border-primary/20">
              <Sparkles className="w-6 h-6" />
            </div>

            <Badge variant="outline" className="text-xs font-semibold text-primary bg-primary/5">
              Game 2: AI vs Human Taste
            </Badge>

            <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              Masuk ke Sesi Game
            </h2>

            <p className="text-xs text-muted-foreground">
              Masukkan nama panggilan Anda untuk mulai bersaing memperebutkan peringkat teratas!
            </p>
          </div>

          <form onSubmit={handleJoin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-foreground">
                Nama Panggilan
              </label>
              <input
                type="text"
                placeholder="Contoh: Budi, Sarah, Rayhan"
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
                maxLength={20}
                required
                autoFocus
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
              />
            </div>

            <Button
              type="submit"
              disabled={!nicknameInput.trim() || isSubmitting}
              className="w-full font-bold shadow-xs py-2.5"
            >
              <span>{isSubmitting ? 'Menghubungkan...' : 'Gabung ke Permainan'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // =========================================================================
  // 2. MAIN PARTICIPANT GAME VIEW (STANDALONE PREVIEW + CONTROLLER)
  // =========================================================================
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Top Mobile Bar */}
      <header className="border-b border-border/80 bg-card/90 backdrop-blur-md sticky top-0 z-40 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center border border-primary/20">
            {myParticipant.nickname.slice(0, 2).toUpperCase()}
          </div>
          <span className="text-xs font-bold text-foreground truncate max-w-[120px]">
            {myParticipant.nickname}
          </span>
        </div>

        {/* Realtime Player Score & Rank Badge */}
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-mono text-xs font-bold gap-1 bg-slate-100 border">
            <Trophy className="w-3 h-3 text-amber-500" />
            <span>{myScore} Pts</span>
          </Badge>
          {myRank > 0 && (
            <Badge variant="outline" className="font-mono text-[10px] font-semibold text-primary bg-primary/5">
              Rank #{myRank}
            </Badge>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-lg mx-auto p-4 flex flex-col justify-between space-y-4">
        {/* ========================================================================= */}
        {/* STATE A: LOBBY STANDBY                                                    */}
        {/* ========================================================================= */}
        {roomState.status === 'LOBBY' && (
          <Card className="p-6 text-center space-y-4 my-auto border-slate-200 bg-white shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto animate-pulse">
              <Clock className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-foreground">
                Menunggu Host Memulai Game...
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Anda sudah berhasil terhubung. Perhatikan layar proyektor saat sesi dimulai.
              </p>
            </div>
            <Badge variant="secondary" className="font-mono text-xs">
              {totalParticipants} Peserta Siap
            </Badge>
          </Card>
        )}

        {/* ========================================================================= */}
        {/* STATE B: TUTORIAL / VOTING - STANDALONE PREVIEW & TOUCH PAD                */}
        {/* ========================================================================= */}
        {(roomState.status === 'VOTING' || roomState.status === 'TUTORIAL') && (
          <div className="space-y-4 animate-fade-in flex-1 flex flex-col justify-between">
            {/* Header Question */}
            <div className="space-y-1 text-center">
              <Badge variant="outline" className="text-[10px] font-semibold text-primary bg-primary/5">
                {currentSlide.topic}
              </Badge>
              <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug">
                {currentSlide.title}
              </h3>
            </div>

            {/* Standalone Mobile Card Preview Switcher */}
            <Card className="border-slate-200 bg-white shadow-xs overflow-hidden">
              <Tabs
                value={activePreviewTab}
                onValueChange={(val) => setActivePreviewTab(val as 'A' | 'B')}
                className="p-3 space-y-2"
              >
                <div className="flex items-center justify-between pb-1">
                  <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-primary" />
                    <span>Preview Desain di HP:</span>
                  </span>
                  <TabsList className="h-8">
                    <TabsTrigger value="A" className="text-xs px-3 py-0.5">
                      Desain A
                    </TabsTrigger>
                    <TabsTrigger value="B" className="text-xs px-3 py-0.5">
                      Desain B
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="A" className="mt-0">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 min-h-[160px] flex items-center justify-center">
                    <Component variant="A" />
                  </div>
                </TabsContent>

                <TabsContent value="B" className="mt-0">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 min-h-[160px] flex items-center justify-center">
                    <Component variant="B" />
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Touch Pads Controller */}
            <div className="space-y-2.5 pt-2">
              {myVote ? (
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl text-center space-y-1.5 animate-fade-in">
                  <div className="flex items-center justify-center gap-1.5 text-primary font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Pilihan Anda ({myVote === 'A' ? 'Desain A' : 'Desain B'}) Tercatat!</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Menunggu ronde selesai untuk perhitungan skor kecepatan...
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-[11px] text-center text-muted-foreground font-medium flex items-center justify-center gap-1">
                    <Zap className="w-3 h-3 text-amber-500" />
                    <span>Pilih secepat mungkin untuk bonus skor kecepatan!</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Pad A */}
                    <button
                      type="button"
                      onClick={() => handleVote('A')}
                      className="p-4 rounded-2xl border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 active:scale-95 transition-all text-center space-y-1.5 flex flex-col items-center justify-center shadow-xs cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground font-black text-base flex items-center justify-center shadow-xs">
                        A
                      </div>
                      <div className="text-xs font-bold text-foreground">Pilih Desain A</div>
                    </button>

                    {/* Pad B */}
                    <button
                      type="button"
                      onClick={() => handleVote('B')}
                      className="p-4 rounded-2xl border-2 border-indigo-300 bg-indigo-50/50 hover:bg-indigo-100/50 active:scale-95 transition-all text-center space-y-1.5 flex flex-col items-center justify-center shadow-xs cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-base flex items-center justify-center shadow-xs">
                        B
                      </div>
                      <div className="text-xs font-bold text-foreground">Pilih Desain B</div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STATE C: REVEAL & FEEDBACK                                                */}
        {/* ========================================================================= */}
        {roomState.status === 'REVEAL' && (
          <Card className="p-5 text-center space-y-4 my-auto border-slate-200 bg-white shadow-sm animate-fade-in">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-sm ${
                isCorrect
                  ? 'bg-emerald-100 text-emerald-600 border border-emerald-300'
                  : 'bg-rose-100 text-rose-600 border border-rose-300'
              }`}
            >
              {isCorrect ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-foreground">
                {isCorrect ? 'Jawaban Anda Tepat! 🎉' : 'Belum Tepat 💡'}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Jawaban terbaik adalah{' '}
                <strong>{currentSlide.correctOption === 'A' ? 'Desain A' : 'Desain B'}</strong> ({currentSlide.correctOption === 'A' ? currentSlide.optionA.title : currentSlide.optionB.title}).
              </p>
            </div>

            {/* Score Earned Banner */}
            <div className="p-3 bg-slate-50 border rounded-xl flex items-center justify-between text-xs">
              <span className="font-medium text-muted-foreground">Poin Ronde Ini:</span>
              <span className={`font-mono font-bold text-sm ${isCorrect ? 'text-emerald-600' : 'text-rose-500'}`}>
                {myLastEarned > 0 ? `+${myLastEarned} Pts` : '+0 Pts'}
              </span>
            </div>

            {/* Mentor Takeaway Summary */}
            <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl text-left space-y-1 text-[11px] text-blue-950">
              <div className="font-bold flex items-center gap-1 text-primary">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Kunci Insight:</span>
              </div>
              <p className="leading-snug">{currentSlide.mentorExplanation.keyTakeaway}</p>
            </div>
          </Card>
        )}

        {/* ========================================================================= */}
        {/* STATE D: LEADERBOARD DISPLAY ON MOBILE                                    */}
        {/* ========================================================================= */}
        {roomState.status === 'LEADERBOARD' && (
          <Card className="p-6 text-center space-y-5 my-auto border-slate-200 bg-white shadow-sm animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 border border-amber-300 flex items-center justify-center mx-auto shadow-sm">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <Badge variant="outline" className="text-[10px] font-bold text-amber-700 bg-amber-50">
                Peringkat Anda
              </Badge>
              <h3 className="text-2xl font-black text-foreground">
                Peringkat #{myRank}
              </h3>
              <p className="text-xs text-muted-foreground">
                Total Skor Akumulasi: <strong className="text-primary font-mono text-sm">{myScore} Pts</strong>
              </p>
            </div>

            <p className="text-xs text-muted-foreground pt-2 border-t">
              Perhatikan layar proyektor untuk melihat tabel peringkat seluruh peserta!
            </p>
          </Card>
        )}

        {/* ========================================================================= */}
        {/* STATE E: FINISHED                                                         */}
        {/* ========================================================================= */}
        {roomState.status === 'FINISHED' && (
          <Card className="p-6 text-center space-y-4 my-auto border-amber-300 bg-amber-50/30 shadow-md animate-fade-in">
            <div className="w-16 h-16 rounded-3xl bg-amber-400 text-white flex items-center justify-center mx-auto shadow-lg">
              <Trophy className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-black text-foreground">
                Sesi Game Selesai! 🎉
              </h2>
              <p className="text-xs text-muted-foreground">
                Selamat! Anda menyelesaikan game di <strong>Peringkat #{myRank}</strong> dengan total skor <strong className="text-primary font-mono">{myScore} Pts</strong>.
              </p>
            </div>
          </Card>
        )}
      </main>

      {/* Footer Info */}
      <footer className="p-3 border-t border-border/80 bg-card text-center text-[10px] text-muted-foreground">
        <span>UI/UX Interactive System • Game 2</span>
      </footer>
    </div>
  );
};

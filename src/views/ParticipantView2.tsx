import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useGame2 } from '../context/Game2Context';
import { VoteOption } from '../types';
import {
  CheckCircle2,
  XCircle,
  Trophy,
  Sparkles,
  Zap,
  Clock,
  ArrowRight,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export const ParticipantView2: React.FC = () => {
  const {
    roomState,
    currentSlide,
    myParticipant,
    myVote,
    myScore,
    myLastEarned,
    myRank,
    isFirebase,
    totalParticipants,
    joinAsParticipant,
    submitMyVote,
    cancelMyVote,
  } = useGame2();

  const [nicknameInput, setNicknameInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCard, setActiveCard] = useState<'A' | 'B'>('A');
  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef<number | null>(null);

  // Auto-reset active card to A on new slide
  useEffect(() => {
    setActiveCard('A');
  }, [currentSlide.id]);

  // Idle Fade-out Timer (3.5s of no touch/mouse activity)
  useEffect(() => {
    const resetIdleTimer = () => {
      setIsIdle(false);
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = window.setTimeout(() => {
        setIsIdle(true);
      }, 3500);
    };

    resetIdleTimer();

    const events = ['pointerdown', 'touchstart', 'pointermove', 'scroll', 'click'];
    events.forEach((ev) => window.addEventListener(ev, resetIdleTimer, { passive: true }));

    return () => {
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
      }
      events.forEach((ev) => window.removeEventListener(ev, resetIdleTimer));
    };
  }, []);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nicknameInput.trim() || isSubmitting) return;
    setIsSubmitting(true);
    await joinAsParticipant(nicknameInput.trim());
    setIsSubmitting(false);
  };

  const handleVote = async (option: VoteOption) => {
    if (!myParticipant || roomState.status !== 'VOTING') return;
    await submitMyVote(option);
  };

  // Swipe drag handler with spring physics
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 40;
    if (info.offset.x < -swipeThreshold) {
      setActiveCard('B');
    } else if (info.offset.x > swipeThreshold) {
      setActiveCard('A');
    }
  };

  const Component = currentSlide.Component;
  const isCorrect = myVote ? myVote === currentSlide.correctOption : false;

  // =========================================================================
  // 1. INTEGRATED ONBOARDING SCREEN (LIGHT MODE SHADCN STYLE)
  // =========================================================================
  if (!myParticipant) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-4 sm:p-6 font-sans relative overflow-hidden selection:bg-primary selection:text-white">
        {/* Subtle Ambient Light Gradients */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-indigo-100/60 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <header className="relative z-10 pt-4 text-center space-y-2">
          <Badge variant="outline" className="text-xs font-semibold text-primary bg-white border-primary/20 shadow-2xs px-3 py-1">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            <span>Sesi Game Interaktif #2</span>
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 leading-tight">
            Human Taste <br />
            <span className="text-primary">
              vs AI Generator
            </span>
          </h1>
        </header>

        {/* Center Visual Mockup Cards Preview (Light Mode) */}
        <div className="relative z-10 my-auto py-6 flex justify-center items-center">
          <div className="relative w-64 h-52 sm:w-72 sm:h-60">
            {/* Background Layered Card A */}
            <div className="absolute inset-0 bg-slate-100 border-2 border-slate-300 rounded-3xl p-4 shadow-sm -rotate-6 scale-95 opacity-80 flex flex-col justify-between">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span className="font-bold">DESAIN A</span>
                <span className="text-rose-500 font-bold">⚠️ Raw AI</span>
              </div>
              <div className="space-y-2 text-center my-auto">
                <div className="w-10 h-10 rounded-2xl bg-slate-200 text-slate-600 flex items-center justify-center mx-auto">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-700">AI Slop UI</div>
              </div>
            </div>

            {/* Foreground Layered Card B */}
            <div className="absolute inset-0 bg-white border-2 border-primary/30 rounded-3xl p-4 shadow-xl rotate-3 flex flex-col justify-between">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="font-bold text-primary">DESAIN B</span>
                <span className="text-emerald-600 font-bold">✨ Human Taste</span>
              </div>
              <div className="space-y-2 text-center my-auto">
                <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto shadow-sm">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="text-xs font-black text-slate-900">Clean UX Hierarchy</div>
              </div>
              <div className="text-[10px] text-center text-slate-400 font-medium">Geser untuk membandingkan</div>
            </div>
          </div>
        </div>

        {/* Bottom Form Card (Light Mode Shadcn Card) */}
        <Card className="relative z-10 w-full max-w-sm mx-auto bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-xl space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900">Mulai Bermain</h3>
            <p className="text-xs text-muted-foreground">Masukkan nama Anda untuk join ke papan skor ronde:</p>
          </div>

          <form onSubmit={handleJoin} className="space-y-3">
            <input
              type="text"
              placeholder="Ketik nama panggilan..."
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value)}
              maxLength={20}
              required
              autoFocus
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white transition"
            />

            <Button
              type="submit"
              disabled={!nicknameInput.trim() || isSubmitting}
              className="w-full h-12 rounded-2xl font-bold shadow-md shadow-primary/20 text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isSubmitting ? 'Menghubungkan...' : 'Gabung ke Permainan'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // =========================================================================
  // 2. MAIN PARTICIPANT GAME VIEW (LIGHT MODE IMMERSIVE SWIPEABLE CANVAS)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans relative overflow-hidden selection:bg-primary selection:text-white">
      {/* Top Floating App Bar with Idle Fade-Out */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-4 py-3 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center justify-between transition-opacity duration-300 ${
          isIdle && (roomState.status === 'VOTING' || roomState.status === 'TUTORIAL') ? 'opacity-20 hover:opacity-100' : 'opacity-100'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center border border-primary/20">
            {myParticipant.nickname.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-900 truncate max-w-[110px]">
              {myParticipant.nickname}
            </span>
            <span className="flex items-center gap-1 text-[9px] text-slate-500 font-mono">
              <span className={`w-1.5 h-1.5 rounded-full ${isFirebase ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span>{isFirebase ? 'Cloud' : 'Local'}</span>
            </span>
          </div>
        </div>

        {/* Realtime Player Score & Rank Badge */}
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-mono text-xs font-bold gap-1 bg-white border border-slate-200 text-slate-800 shadow-2xs">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>{myScore} Pts</span>
          </Badge>
          {myRank > 0 && (
            <Badge variant="outline" className="font-mono text-[10px] font-semibold text-primary bg-primary/5 border-primary/20">
              Rank #{myRank}
            </Badge>
          )}
        </div>
      </header>

      {/* Main Swipeable Viewport */}
      <main className="flex-1 w-full max-w-md mx-auto pt-16 pb-28 px-4 flex flex-col justify-between">
        {/* ========================================================================= */}
        {/* STATE A: LOBBY STANDBY                                                    */}
        {/* ========================================================================= */}
        {roomState.status === 'LOBBY' && (
          <Card className="p-6 text-center space-y-4 my-auto border-slate-200 bg-white text-slate-900 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto animate-pulse">
              <Clock className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                Menunggu Host Memulai Game...
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Anda sudah terhubung. Amati layar proyektor saat sesi dimulai.
              </p>
            </div>
            <Badge variant="secondary" className="font-mono text-xs bg-slate-100 text-slate-700">
              {totalParticipants} Peserta Siap
            </Badge>
          </Card>
        )}

        {/* ========================================================================= */}
        {/* STATE B: TUTORIAL / VOTING - SWIPEABLE IMMERSIVE CARD + FLOATING CTA       */}
        {/* ========================================================================= */}
        {(roomState.status === 'VOTING' || roomState.status === 'TUTORIAL') && (
          <div className="space-y-3 flex-1 flex flex-col justify-between animate-fade-in">
            {/* Header Question with Idle Fade-Out */}
            <div
              className={`space-y-1 text-center transition-opacity duration-300 ${
                isIdle ? 'opacity-20 hover:opacity-100' : 'opacity-100'
              }`}
            >
              <Badge variant="outline" className="text-[10px] font-semibold text-primary bg-primary/5 border-primary/20">
                {currentSlide.topic}
              </Badge>
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                {currentSlide.title}
              </h3>
            </div>

            {/* SWIPE PAGINATION PILL SELECTOR (Light Mode Shadcn Style) */}
            <div className="flex items-center justify-center gap-2">
              <div className="inline-flex p-1 bg-slate-200/80 border border-slate-300 rounded-full shadow-inner">
                <button
                  type="button"
                  onClick={() => setActiveCard('A')}
                  className={`px-4 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeCard === 'A'
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Desain A</span>
                  {activeCard === 'A' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCard('B')}
                  className={`px-4 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeCard === 'B'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Desain B</span>
                  {activeCard === 'B' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                </button>
              </div>
            </div>

            {/* FULLSCREEN SWIPEABLE CANVAS (Framer Motion Elastic Drag) */}
            <div className="relative w-full flex-1 min-h-[310px] flex items-center justify-center touch-pan-y">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  initial={{ opacity: 0, scale: 0.96, x: activeCard === 'A' ? -20 : 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.96, x: activeCard === 'A' ? 20 : -20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="w-full bg-white text-slate-900 rounded-3xl p-4 sm:p-5 shadow-lg border-2 border-slate-200/90 cursor-grab active:cursor-grabbing flex flex-col justify-between min-h-[300px]"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-6 h-6 rounded-lg text-white font-bold text-xs flex items-center justify-center ${
                          activeCard === 'A' ? 'bg-primary' : 'bg-indigo-600'
                        }`}
                      >
                        {activeCard}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        {activeCard === 'A' ? currentSlide.optionA.title : currentSlide.optionB.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <ChevronLeft className="w-3 h-3" /> Geser <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>

                  {/* Render Actual UI Mockup */}
                  <div className="py-3 my-auto">
                    <Component variant={activeCard} />
                  </div>

                  {/* Card Footer Hint */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                    <span>{activeCard === 'A' ? 'Sisi Kiri Proyektor' : 'Sisi Kanan Proyektor'}</span>
                    <span className="font-semibold text-primary">
                      {activeCard === 'A' ? 'Geser ➔ untuk Desain B' : '⬅ Geser untuk Desain A'}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STATE C: REVEAL & FEEDBACK                                                */}
        {/* ========================================================================= */}
        {roomState.status === 'REVEAL' && (
          <Card className="p-6 text-center space-y-4 my-auto border-slate-200 bg-white text-slate-900 shadow-md animate-fade-in">
            <div
              className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto shadow-sm ${
                isCorrect
                  ? 'bg-emerald-100 text-emerald-600 border border-emerald-300'
                  : 'bg-rose-100 text-rose-600 border border-rose-300'
              }`}
            >
              {isCorrect ? <CheckCircle2 className="w-9 h-9" /> : <XCircle className="w-9 h-9" />}
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900">
                {isCorrect ? 'Jawaban Tepat! 🎉' : 'Belum Tepat 💡'}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Jawaban terbaik adalah{' '}
                <strong className="text-slate-900">{currentSlide.correctOption === 'A' ? 'Desain A' : 'Desain B'}</strong> ({currentSlide.correctOption === 'A' ? currentSlide.optionA.title : currentSlide.optionB.title}).
              </p>
            </div>

            {/* Score Earned Banner */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">Poin Ronde Ini:</span>
              <span className={`font-mono font-black text-base ${isCorrect ? 'text-emerald-600' : 'text-rose-500'}`}>
                {myLastEarned > 0 ? `+${myLastEarned} Pts` : '+0 Pts'}
              </span>
            </div>

            {/* Mentor Takeaway Summary */}
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl text-left space-y-1.5 text-xs text-blue-950">
              <div className="font-bold flex items-center gap-1.5 text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Kunci Insight Mentor:</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-700">
                {currentSlide.mentorExplanation.keyTakeaway}
              </p>
            </div>
          </Card>
        )}

        {/* ========================================================================= */}
        {/* STATE D: LEADERBOARD DISPLAY ON MOBILE                                    */}
        {/* ========================================================================= */}
        {roomState.status === 'LEADERBOARD' && (
          <Card className="p-6 text-center space-y-5 my-auto border-slate-200 bg-white text-slate-900 shadow-md animate-fade-in">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 border border-amber-300 flex items-center justify-center mx-auto shadow-sm">
              <Trophy className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <Badge variant="outline" className="text-[10px] font-bold text-amber-700 bg-amber-50 border-amber-200">
                Peringkat Live Anda
              </Badge>
              <h3 className="text-3xl font-black text-slate-900">
                Peringkat #{myRank}
              </h3>
              <p className="text-xs text-muted-foreground">
                Total Akumulasi: <strong className="text-primary font-mono text-base">{myScore} Pts</strong>
              </p>
            </div>

            <p className="text-xs text-muted-foreground pt-3 border-t border-slate-100">
              Perhatikan layar proyektor untuk melihat podium dan papan klasemen lengkap!
            </p>
          </Card>
        )}

        {/* ========================================================================= */}
        {/* STATE E: FINISHED                                                         */}
        {/* ========================================================================= */}
        {roomState.status === 'FINISHED' && (
          <Card className="p-6 text-center space-y-5 my-auto border-amber-300 bg-amber-50/40 text-slate-900 shadow-lg animate-fade-in">
            <div className="w-20 h-20 rounded-3xl bg-amber-400 text-white flex items-center justify-center mx-auto shadow-md">
              <Trophy className="w-10 h-10" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-2xl font-black text-slate-900">
                Sesi Game Selesai! 🎉
              </h2>
              <p className="text-xs text-muted-foreground">
                Selamat! Anda menyelesaikan game di <strong className="text-slate-900 font-bold">Peringkat #{myRank}</strong> dengan total skor <strong className="text-primary font-mono text-base">{myScore} Pts</strong>.
              </p>
            </div>
          </Card>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 3. CONTEXTUAL FLOATING ACTION BUTTON DOCK (LIGHT MODE SHADCN)              */}
      {/* ========================================================================= */}
      {(roomState.status === 'VOTING' || roomState.status === 'TUTORIAL') && (
        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-50 animate-fade-in">
          {myVote ? (
            /* STATE: ALREADY VOTED (CONFIRMATION & QUICK SWITCH) */
            <div className="bg-white/95 backdrop-blur-xl border-2 border-slate-200 rounded-3xl p-3.5 shadow-xl text-center space-y-2">
              <div className="flex items-center justify-between px-2 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Pilihan Tercatat: Desain {myVote}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Kecepatan Terhitung ⚡</span>
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const otherOption = myVote === 'A' ? 'B' : 'A';
                    setActiveCard(otherOption);
                    handleVote(otherOption);
                  }}
                  className="flex-1 text-xs font-bold text-primary border-primary/30 hover:bg-primary/5 rounded-2xl h-10"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  <span>Ganti ke Desain {myVote === 'A' ? 'B' : 'A'}</span>
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={cancelMyVote}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-2xl h-10 px-3"
                >
                  Batal
                </Button>
              </div>
            </div>
          ) : (
            /* STATE: NOT VOTED YET (CONTEXTUAL VOTE CTA FOR ACTIVE PREVIEW CARD) */
            <div className="bg-white/95 backdrop-blur-xl border-2 border-slate-200 rounded-3xl p-2.5 shadow-xl space-y-2">
              <div className="flex items-center gap-2">
                {/* Main Floating Vote Button for the actively viewed card */}
                <Button
                  size="lg"
                  onClick={() => handleVote(activeCard)}
                  className={`flex-1 h-13 rounded-2xl font-black text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    activeCard === 'A'
                      ? 'bg-primary hover:bg-primary/90 text-white shadow-primary/20'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
                  }`}
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Vote {activeCard === 'A' ? 'Desain A' : 'Desain B'}</span>
                </Button>

                {/* Quick Toggle to the other card */}
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setActiveCard(activeCard === 'A' ? 'B' : 'A')}
                  className="w-13 h-13 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 shrink-0 cursor-pointer"
                  title={`Lihat Desain ${activeCard === 'A' ? 'B' : 'A'}`}
                >
                  {activeCard === 'A' ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                </Button>
              </div>

              <div className="text-[10px] text-center text-slate-500 font-medium flex items-center justify-center gap-1">
                <span>Tekan tombol di atas untuk memilih <strong>Desain {activeCard}</strong></span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

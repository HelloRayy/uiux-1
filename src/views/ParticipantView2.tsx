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
  X,
  Repeat,
  Heart,
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
  // 1. INTEGRATED ONBOARDING SCREEN (LIGHT MODE SHADCN DATING APP HERO)
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

        {/* Center Visual Mockup Cards Preview (Dating App Stack Style) */}
        <div className="relative z-10 my-auto py-6 flex justify-center items-center">
          <div className="relative w-64 h-56 sm:w-72 sm:h-64">
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
  // 2. MAIN PARTICIPANT GAME VIEW (DATING-APP CARD DECK WITH SIDE PEEK)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col justify-between font-sans relative overflow-x-hidden selection:bg-primary selection:text-white pb-6">
      {/* Top Floating App Bar with Idle Fade-Out */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-4 py-2.5 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center justify-between transition-opacity duration-300 ${
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
          <Badge variant="secondary" className="font-mono text-xs font-bold gap-1 bg-slate-50 border border-slate-200 text-slate-800 shadow-2xs">
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

      {/* Main Container */}
      <main className="flex-1 w-full max-w-sm mx-auto pt-14 px-3 flex flex-col justify-center">
        {/* ========================================================================= */}
        {/* STATE A: LOBBY STANDBY                                                    */}
        {/* ========================================================================= */}
        {roomState.status === 'LOBBY' && (
          <Card className="p-6 text-center space-y-4 my-auto border-slate-200 bg-white text-slate-900 shadow-md rounded-3xl">
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
        {/* STATE B: TUTORIAL / VOTING - DATING-APP TALL CARD STACK WITH PEEK          */}
        {/* ========================================================================= */}
        {(roomState.status === 'VOTING' || roomState.status === 'TUTORIAL') && (
          <div className="space-y-2.5 flex-1 flex flex-col justify-center animate-fade-in py-2">
            {/* Header Question with Idle Fade-Out */}
            <div
              className={`text-center space-y-0.5 transition-opacity duration-300 ${
                isIdle ? 'opacity-20 hover:opacity-100' : 'opacity-100'
              }`}
            >
              <Badge variant="outline" className="text-[10px] font-semibold text-primary bg-white border-primary/20 shadow-2xs">
                {currentSlide.topic}
              </Badge>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                {currentSlide.title}
              </h3>
            </div>

            {/* DATING-APP SWIPEABLE CARD DECK CONTAINER */}
            <div className="relative w-full h-[510px] flex items-center justify-center touch-pan-y select-none">
              {/* SIDE PEEKING CARD: CARD A (WHEN CARD B IS ACTIVE) */}
              {activeCard === 'B' && (
                <div
                  onClick={() => setActiveCard('A')}
                  className="absolute -left-14 top-4 bottom-4 w-[70%] bg-slate-200/90 border-2 border-slate-300 rounded-3xl p-3 shadow-md opacity-60 scale-90 -rotate-3 cursor-pointer z-10 overflow-hidden flex flex-col justify-between pointer-events-auto transition-all"
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
                    <span className="w-5 h-5 rounded-md bg-primary text-white text-[10px] flex items-center justify-center">A</span>
                    <span className="truncate">{currentSlide.optionA.title}</span>
                  </div>
                  <div className="my-auto opacity-50 pointer-events-none scale-75 origin-center">
                    <Component variant="A" />
                  </div>
                  <span className="text-[9px] font-bold text-primary text-center">Ketuk untuk buka Desain A</span>
                </div>
              )}

              {/* SIDE PEEKING CARD: CARD B (WHEN CARD A IS ACTIVE) */}
              {activeCard === 'A' && (
                <div
                  onClick={() => setActiveCard('B')}
                  className="absolute -right-14 top-4 bottom-4 w-[70%] bg-slate-200/90 border-2 border-slate-300 rounded-3xl p-3 shadow-md opacity-60 scale-90 rotate-3 cursor-pointer z-10 overflow-hidden flex flex-col justify-between pointer-events-auto transition-all"
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
                    <span className="w-5 h-5 rounded-md bg-indigo-600 text-white text-[10px] flex items-center justify-center">B</span>
                    <span className="truncate">{currentSlide.optionB.title}</span>
                  </div>
                  <div className="my-auto opacity-50 pointer-events-none scale-75 origin-center">
                    <Component variant="B" />
                  </div>
                  <span className="text-[9px] font-bold text-indigo-600 text-center">Ketuk untuk buka Desain B</span>
                </div>
              )}

              {/* MAIN ACTIVE CARD (SPRING DRAG PHYSICS) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={handleDragEnd}
                  initial={{ opacity: 0, scale: 0.94, x: activeCard === 'A' ? -30 : 30 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.94, x: activeCard === 'A' ? 30 : -30 }}
                  transition={{ type: 'spring', damping: 24, stiffness: 280 }}
                  className="relative z-20 w-full h-full bg-white text-slate-900 rounded-[32px] p-4 shadow-2xl border-2 border-slate-300/80 flex flex-col justify-between cursor-grab active:cursor-grabbing overflow-hidden"
                >
                  {/* Floating Gesture Hint Pill (Top Right Corner) */}
                  <div
                    onClick={() => setActiveCard(activeCard === 'A' ? 'B' : 'A')}
                    className="absolute top-3.5 right-3.5 z-30 bg-primary/10 hover:bg-primary/20 text-primary px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 cursor-pointer shadow-2xs border border-primary/20 active:scale-95 transition"
                  >
                    <Repeat className="w-3 h-3" />
                    <span>Lihat {activeCard === 'A' ? 'Desain B' : 'Desain A'}</span>
                  </div>

                  {/* Card Header Info */}
                  <div className="space-y-0.5 pr-20 pt-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-6 h-6 rounded-lg text-white font-bold text-xs flex items-center justify-center shadow-xs ${
                          activeCard === 'A' ? 'bg-primary' : 'bg-indigo-600'
                        }`}
                      >
                        {activeCard}
                      </span>
                      <h4 className="text-sm font-black text-slate-900 truncate">
                        {activeCard === 'A' ? currentSlide.optionA.title : currentSlide.optionB.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-muted-foreground pl-8">
                      {activeCard === 'A' ? 'Sisi Kiri Proyektor' : 'Sisi Kanan Proyektor'}
                    </p>
                  </div>

                  {/* Card Visual Content Showcase */}
                  <div className="py-2 my-auto flex items-center justify-center overflow-y-auto max-h-[300px]">
                    <Component variant={activeCard} />
                  </div>

                  {/* Card Bottom Area: Title + Subtitle + FAB Button Pair (Identical to reference image) */}
                  <div className="pt-2 border-t border-slate-100 space-y-2.5">
                    {/* Title & Subtitle like 'Brigitta Caroline, 24' & 'Creative Designer' */}
                    <div className="text-center space-y-0.5">
                      <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-tight">
                        {activeCard === 'A' ? `Desain A: ${currentSlide.optionA.title}` : `Desain B: ${currentSlide.optionB.title}`}
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium">
                        {activeCard === 'A' ? currentSlide.optionA.description : currentSlide.optionB.description}
                      </p>
                    </div>

                    {/* FAB Button Pair (Identical to dating-app X & 💜 squircle buttons) */}
                    <div className="flex items-center justify-center gap-3.5 pb-1">
                      {/* Left FAB: Switch Card (X Squircle) */}
                      <button
                        type="button"
                        onClick={() => setActiveCard(activeCard === 'A' ? 'B' : 'A')}
                        title={`Lihat Desain ${activeCard === 'A' ? 'B' : 'A'}`}
                        className="w-14 h-14 rounded-2xl bg-slate-200 hover:bg-slate-300 active:scale-90 text-slate-600 flex items-center justify-center border border-slate-300 shadow-md transition-all cursor-pointer"
                      >
                        <X className="w-7 h-7 text-slate-600 stroke-[2.5]" />
                      </button>

                      {/* Right FAB: Vote Active Card (Heart / 💜 Squircle) */}
                      <button
                        type="button"
                        onClick={() => handleVote(activeCard)}
                        title={`Vote ${activeCard === 'A' ? 'Desain A' : 'Desain B'}`}
                        className={`w-14 h-14 rounded-2xl text-white flex items-center justify-center shadow-xl active:scale-90 transition-all cursor-pointer ${
                          activeCard === 'A'
                            ? 'bg-primary hover:bg-primary/90 shadow-primary/30 ring-4 ring-primary/20'
                            : 'bg-[#6342ff] hover:bg-[#5233ea] shadow-indigo-500/30 ring-4 ring-indigo-500/20'
                        }`}
                      >
                        <Heart
                          className={`w-7 h-7 stroke-[2.5] ${
                            myVote === activeCard ? 'fill-white' : 'fill-transparent'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Voted Confirmation Notice (If already voted) */}
                    {myVote && (
                      <div className="flex items-center justify-between text-[11px] bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 animate-fade-in">
                        <span className="font-semibold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Pilihan: Desain {myVote}</span>
                        </span>
                        <button
                          type="button"
                          onClick={cancelMyVote}
                          className="text-rose-600 hover:underline font-bold cursor-pointer"
                        >
                          Batal
                        </button>
                      </div>
                    )}
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
          <Card className="p-6 text-center space-y-4 my-auto border-slate-200 bg-white text-slate-900 shadow-lg rounded-3xl animate-fade-in">
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
          <Card className="p-6 text-center space-y-5 my-auto border-slate-200 bg-white text-slate-900 shadow-lg rounded-3xl animate-fade-in">
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
          <Card className="p-6 text-center space-y-5 my-auto border-amber-300 bg-amber-50/40 text-slate-900 shadow-lg rounded-3xl animate-fade-in">
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
    </div>
  );
};

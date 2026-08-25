import React, { useState, useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
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
  Heart,
  MapPin,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export const ParticipantView2: React.FC = () => {
  const {
    roomState,
    currentSlide,
    totalSlides,
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

  // Embla Carousel Engine for Fullscreen Swipe
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    duration: 25,
    skipSnaps: false,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const selected = emblaApi.selectedScrollSnap();
    setActiveCard(selected === 0 ? 'A' : 'B');
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-reset active card to A on new slide
  useEffect(() => {
    setActiveCard('A');
    if (emblaApi) {
      emblaApi.scrollTo(0);
    }
  }, [currentSlide.id, emblaApi]);

  const scrollToCard = (card: 'A' | 'B') => {
    setActiveCard(card);
    if (emblaApi) {
      emblaApi.scrollTo(card === 'A' ? 0 : 1);
    }
  };

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

  const Component = currentSlide.Component;
  const isCorrect = myVote ? myVote === currentSlide.correctOption : false;

  // =========================================================================
  // 1. FULLSCREEN ONBOARDING SCREEN
  // =========================================================================
  if (!myParticipant) {
    return (
      <div className="h-[100dvh] w-full bg-slate-50 text-slate-900 flex flex-col justify-between p-5 font-sans relative overflow-hidden selection:bg-primary selection:text-white">
        {/* Ambient Glows */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-100/70 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-indigo-100/70 rounded-full blur-3xl pointer-events-none" />

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

        {/* Center Visual Showcase */}
        <div className="relative z-10 my-auto py-4 flex justify-center items-center">
          <div className="relative w-64 h-56 sm:w-72 sm:h-64">
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

        {/* Bottom Form */}
        <Card className="relative z-10 w-full max-w-sm mx-auto bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-xl space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900">Mulai Bermain</h3>
            <p className="text-xs text-muted-foreground">Masukkan nama panggilan Anda untuk mulai ronde:</p>
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
  // 2. FULLSCREEN IMMERSIVE MOBILE GAME VIEW (ACCURATELY MATCHING REFERENCE)
  // =========================================================================
  return (
    <div className="h-[100dvh] w-full bg-slate-900 text-white flex flex-col justify-between font-sans relative overflow-hidden select-none">
      {/* ----------------------------------------------------------------- */}
      {/* TOP HEADER BAR (REFERENCE MATCH: Avatar + Hello Name! + Location) */}
      {/* ----------------------------------------------------------------- */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-4 py-3 bg-slate-950/80 backdrop-blur-md flex items-center justify-between transition-opacity duration-300 ${
          isIdle && (roomState.status === 'VOTING' || roomState.status === 'TUTORIAL') ? 'opacity-20 hover:opacity-100' : 'opacity-100'
        }`}
      >
        {/* User Profile Avatar & Name */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-indigo-500 text-white font-black text-sm flex items-center justify-center shadow-md border-2 border-slate-700">
            {myParticipant.nickname.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-extrabold text-white tracking-tight leading-none">
              Hello {myParticipant.nickname}!
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium pt-1">
              <MapPin className="w-3 h-3 text-primary" />
              <span>Room UI/UX 2.0</span>
              <span className={`w-1.5 h-1.5 rounded-full ml-0.5 ${isFirebase ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            </span>
          </div>
        </div>

        {/* Right Circular Score / Rank Button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-slate-200 shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono font-bold text-xs">{myScore} Pts</span>
          </div>

          {myRank > 0 && (
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 text-primary font-bold text-xs flex items-center justify-center">
              #{myRank}
            </div>
          )}
        </div>
      </header>

      {/* Main Fullscreen Body */}
      <main className="flex-1 w-full h-full overflow-hidden flex flex-col justify-between pt-16">
        {/* ========================================================================= */}
        {/* STATE A: LOBBY STANDBY                                                    */}
        {/* ========================================================================= */}
        {roomState.status === 'LOBBY' && (
          <div className="flex-1 flex flex-col justify-center items-center p-6 text-center max-w-sm mx-auto space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-primary/20 text-primary flex items-center justify-center mx-auto animate-pulse">
              <Clock className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">
                Menunggu Host Memulai Game...
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Anda sudah terhubung. Perhatikan layar proyektor saat sesi dimulai.
              </p>
            </div>
            <Badge variant="secondary" className="font-mono text-xs bg-slate-800 text-slate-300 px-3 py-1">
              {totalParticipants} Peserta Siap
            </Badge>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STATE B: TUTORIAL / VOTING - TRUE FULLSCREEN CAROUSEL SLIDER               */}
        {/* ========================================================================= */}
        {(roomState.status === 'VOTING' || roomState.status === 'TUTORIAL') && (
          <div className="h-full w-full overflow-hidden flex flex-col" ref={emblaRef}>
            <div className="flex h-full w-full">
              {/* ------------------------------------------------------------- */}
              {/* SLIDE A: FULLSCREEN DESAIN A                                  */}
              {/* ------------------------------------------------------------- */}
              <div className="min-w-0 shrink-0 grow-0 basis-full h-full w-full flex flex-col justify-between p-4 pb-3 bg-white text-slate-900 relative rounded-t-[32px]">
                {/* Top-Left Pill Badge ("Match 86%" Replica) */}
                <div className="absolute top-4 left-4 z-30">
                  <div className="bg-slate-900/90 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-md flex items-center gap-1.5">
                    <span>Match {roomState.status === 'TUTORIAL' ? '100%' : '88%'}</span>
                    <span className="text-primary">• {roomState.status === 'TUTORIAL' ? 'Tutorial' : `Ronde ${(roomState.currentSlideIndex || 0) + 1}/${totalSlides}`}</span>
                  </div>
                </div>

                {/* Right Edge Slide Indicator Capsule */}
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1 items-center">
                  <div className={`w-1.5 h-6 rounded-full transition-all ${activeCard === 'A' ? 'bg-primary shadow-xs' : 'bg-slate-300'}`} />
                  <div className={`w-1.5 h-2 rounded-full transition-all ${activeCard === 'B' ? 'bg-indigo-600 shadow-xs' : 'bg-slate-300'}`} />
                </div>

                {/* Center Visual Mockup Canvas (Full Height Flex) */}
                <div className="flex-1 w-full my-auto flex items-center justify-center overflow-y-auto py-8">
                  <div className="w-full max-w-sm mx-auto">
                    <Component variant="A" />
                  </div>
                </div>

                {/* Bottom Area: Title with Green Dot + Subtitle + FAB Buttons (Image 2 Replica) */}
                <div className="w-full max-w-sm mx-auto pt-2 space-y-2.5">
                  <div className="text-left space-y-0.5 pl-1">
                    <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                      <span>Desain A: {currentSlide.optionA.title}</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium truncate">
                      {currentSlide.optionA.description}
                    </p>
                  </div>

                  {/* FAB Button Pair (Squircle X & Heart) */}
                  <div className="flex items-center justify-center gap-4 pb-1">
                    <button
                      type="button"
                      onClick={() => scrollToCard('B')}
                      title="Lihat Desain B"
                      className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-90 text-slate-600 flex items-center justify-center border border-slate-300 shadow-md transition-all cursor-pointer"
                    >
                      <X className="w-7 h-7 text-slate-600 stroke-[2.5]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleVote('A')}
                      title="Vote Desain A"
                      className={`w-14 h-14 rounded-2xl text-white flex items-center justify-center shadow-xl active:scale-90 transition-all cursor-pointer bg-primary hover:bg-primary/90 shadow-primary/30 ring-4 ring-primary/20`}
                    >
                      <Heart
                        className={`w-7 h-7 stroke-[2.5] ${
                          myVote === 'A' ? 'fill-white' : 'fill-transparent'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Voted Notice */}
                  {myVote === 'A' && (
                    <div className="flex items-center justify-between text-[11px] bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 animate-fade-in">
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Pilihan: Desain A Tercatat</span>
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
              </div>

              {/* ------------------------------------------------------------- */}
              {/* SLIDE B: FULLSCREEN DESAIN B                                  */}
              {/* ------------------------------------------------------------- */}
              <div className="min-w-0 shrink-0 grow-0 basis-full h-full w-full flex flex-col justify-between p-4 pb-3 bg-white text-slate-900 relative rounded-t-[32px]">
                {/* Top-Left Pill Badge ("Match 86%" Replica) */}
                <div className="absolute top-4 left-4 z-30">
                  <div className="bg-slate-900/90 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-md flex items-center gap-1.5">
                    <span>Match {roomState.status === 'TUTORIAL' ? '100%' : '98%'}</span>
                    <span className="text-indigo-400">• {roomState.status === 'TUTORIAL' ? 'Tutorial' : `Ronde ${(roomState.currentSlideIndex || 0) + 1}/${totalSlides}`}</span>
                  </div>
                </div>

                {/* Right Edge Slide Indicator Capsule */}
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1 items-center">
                  <div className={`w-1.5 h-2 rounded-full transition-all ${activeCard === 'A' ? 'bg-primary shadow-xs' : 'bg-slate-300'}`} />
                  <div className={`w-1.5 h-6 rounded-full transition-all ${activeCard === 'B' ? 'bg-indigo-600 shadow-xs' : 'bg-slate-300'}`} />
                </div>

                {/* Center Visual Mockup Canvas (Full Height Flex) */}
                <div className="flex-1 w-full my-auto flex items-center justify-center overflow-y-auto py-8">
                  <div className="w-full max-w-sm mx-auto">
                    <Component variant="B" />
                  </div>
                </div>

                {/* Bottom Area: Title with Green Dot + Subtitle + FAB Buttons (Image 2 Replica) */}
                <div className="w-full max-w-sm mx-auto pt-2 space-y-2.5">
                  <div className="text-left space-y-0.5 pl-1">
                    <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                      <span>Desain B: {currentSlide.optionB.title}</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium truncate">
                      {currentSlide.optionB.description}
                    </p>
                  </div>

                  {/* FAB Button Pair (Squircle X & Heart) */}
                  <div className="flex items-center justify-center gap-4 pb-1">
                    <button
                      type="button"
                      onClick={() => scrollToCard('A')}
                      title="Lihat Desain A"
                      className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-90 text-slate-600 flex items-center justify-center border border-slate-300 shadow-md transition-all cursor-pointer"
                    >
                      <X className="w-7 h-7 text-slate-600 stroke-[2.5]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleVote('B')}
                      title="Vote Desain B"
                      className={`w-14 h-14 rounded-2xl text-white flex items-center justify-center shadow-xl active:scale-90 transition-all cursor-pointer bg-[#6342ff] hover:bg-[#5233ea] shadow-indigo-500/30 ring-4 ring-indigo-500/20`}
                    >
                      <Heart
                        className={`w-7 h-7 stroke-[2.5] ${
                          myVote === 'B' ? 'fill-white' : 'fill-transparent'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Voted Notice */}
                  {myVote === 'B' && (
                    <div className="flex items-center justify-between text-[11px] bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 animate-fade-in">
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Pilihan: Desain B Tercatat</span>
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
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STATE C: REVEAL & FEEDBACK                                                */}
        {/* ========================================================================= */}
        {roomState.status === 'REVEAL' && (
          <div className="flex-1 flex flex-col justify-center items-center p-6 text-center max-w-sm mx-auto space-y-4 bg-white text-slate-900 rounded-3xl m-4 shadow-xl">
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
            <div className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">Poin Ronde Ini:</span>
              <span className={`font-mono font-black text-base ${isCorrect ? 'text-emerald-600' : 'text-rose-500'}`}>
                {myLastEarned > 0 ? `+${myLastEarned} Pts` : '+0 Pts'}
              </span>
            </div>

            {/* Mentor Takeaway Summary */}
            <div className="w-full p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl text-left space-y-1.5 text-xs text-blue-950">
              <div className="font-bold flex items-center gap-1.5 text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Kunci Insight Mentor:</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-700">
                {currentSlide.mentorExplanation.keyTakeaway}
              </p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STATE D: LEADERBOARD DISPLAY ON MOBILE                                    */}
        {/* ========================================================================= */}
        {roomState.status === 'LEADERBOARD' && (
          <div className="flex-1 flex flex-col justify-center items-center p-6 text-center max-w-sm mx-auto space-y-5 bg-white text-slate-900 rounded-3xl m-4 shadow-xl">
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

            <p className="text-xs text-muted-foreground pt-3 border-t border-slate-100 w-full">
              Perhatikan layar proyektor untuk melihat podium dan papan klasemen lengkap!
            </p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STATE E: FINISHED                                                         */}
        {/* ========================================================================= */}
        {roomState.status === 'FINISHED' && (
          <div className="flex-1 flex flex-col justify-center items-center p-6 text-center max-w-sm mx-auto space-y-5 bg-white text-slate-900 rounded-3xl m-4 shadow-xl">
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
          </div>
        )}
      </main>
    </div>
  );
};

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import {
  Timer,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Trophy,
  ArrowRight,
  Vote,
  Monitor,
  BookOpen,
} from 'lucide-react';

export const ParticipantView: React.FC = () => {
  const {
    roomState,
    currentSlide,
    totalSlides,
    myParticipant,
    myVote,
    percentA,
    percentB,
    totalVotes,
    joinAsParticipant,
    submitMyVote,
  } = useGame();

  const [nicknameInput, setNicknameInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Nickname Onboarding
  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nicknameInput.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await joinAsParticipant(nicknameInput.trim());
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Vote Submission with Native Haptic Feedback
  const handleVote = async (option: 'A' | 'B') => {
    if (roomState.status !== 'VOTING') return;
    try {
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(25);
      }
      await submitMyVote(option);
    } catch {
      // ignore
    }
  };

  const currentIdx = (roomState.currentSlideIndex || 0) + 1;
  const isVoting = roomState.status === 'VOTING';

  // Clean title without "Studi Kasus X:" prefix
  const cleanTitle = currentSlide.title.includes(':')
    ? currentSlide.title.split(':')[1]?.trim()
    : currentSlide.title;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      {/* ========================================================================= */}
      {/* TOP HEADER: Clean Apple HIG Native Header                                */}
      {/* ========================================================================= */}
      <header className="border-b border-slate-200/80 bg-white sticky top-0 z-40 px-4 sm:px-6 py-3 shadow-xs">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          {/* User Nickname / Live Status */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold text-slate-900 tracking-tight">
              {myParticipant ? myParticipant.nickname : 'UI/UX SplitVote'}
            </span>
          </div>

          {/* Right Status / Case Index & Timer */}
          <div className="flex items-center gap-2">
            {isVoting && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
                <Timer className="w-3 h-3 text-slate-600" />
                <span>{roomState.timerRemaining}s</span>
              </span>
            )}
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/80 font-mono">
              {roomState.status === 'LOBBY'
                ? 'Lobby'
                : roomState.status === 'TUTORIAL'
                ? 'Panduan'
                : `Kasus ${currentIdx} / ${totalSlides}`}
            </span>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN CONTAINER: Full Height Flex Container                                */}
      {/* ========================================================================= */}
      <main className="flex-1 w-full max-w-md mx-auto p-4 sm:p-6 flex flex-col justify-between">
        {/* ========================================================================= */}
        {/* STEP 1: PARTICIPANT ONBOARDING (Simple Native Style)                      */}
        {/* ========================================================================= */}
        {!myParticipant ? (
          <div className="w-full bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm text-center space-y-6 my-auto">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center mx-auto">
              <Smartphone className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Bergabung ke Sesi Live
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-normal">
                Masukkan nama panggilan Anda untuk mulai memberikan voting desain.
              </p>
            </div>

            <form onSubmit={handleJoin} className="space-y-4 w-full">
              <div className="space-y-1 text-left w-full">
                <label className="block text-xs font-semibold text-slate-700">
                  Nama Panggilan / Nickname
                </label>
                <input
                  type="text"
                  required
                  maxLength={15}
                  value={nicknameInput}
                  onChange={(e) => setNicknameInput(e.target.value)}
                  placeholder="Contoh: Rayhan"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-slate-800 focus:bg-white transition"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={!nicknameInput.trim() || isSubmitting}
                className="w-full py-3.5 bg-slate-900 hover:bg-black active:scale-[0.99] disabled:opacity-50 text-white rounded-xl font-semibold text-sm shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Masuk ke Sesi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-2 text-[11px] text-slate-600 flex items-center justify-center gap-1.5 font-normal">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Real-time Live Sync Cloud</span>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* STEP 2: ACTIVE GAMEPLAY AREA                                              */
          /* ========================================================================= */
          <div className="w-full flex-1 flex flex-col justify-between">
            {/* ========================================================================= */}
            {/* CASE A: LOBBY STATE                                                      */}
            {/* ========================================================================= */}
            {roomState.status === 'LOBBY' && (
              <div className="w-full bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-sm my-auto">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center mx-auto border border-slate-200">
                  <Vote className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Kamu Sudah Terhubung! 🎉
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    Sesi akan segera dimulai oleh mentor. Perhatikan layar proyektor utama di depan ruangan.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700 flex items-center justify-center gap-2 font-medium">
                  <Sparkles className="w-4 h-4 text-slate-800" />
                  <span>Siapkan fokusmu untuk memilih desain terbaik!</span>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* CASE B: TUTORIAL / PANDUAN STATE                                          */}
            {/* ========================================================================= */}
            {roomState.status === 'TUTORIAL' && (
              <div className="w-full bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-sm my-auto animate-fade-in">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0560FD] flex items-center justify-center mx-auto border border-blue-100">
                  <BookOpen className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Perhatikan Layar Proyektor 🖥️
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    Mentor sedang menjelaskan panduan cara bermain. Siapkan fokusmu, studi kasus pertama akan segera dimulai!
                  </p>
                </div>

                <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl text-xs text-blue-800 flex items-center justify-center gap-2 font-semibold">
                  <Sparkles className="w-4 h-4 text-[#0560FD]" />
                  <span>Status: Kamu Siap Memilih</span>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* CASE C: VOTING STATE (LIGHTWEIGHT NATIVE GREY PADS, NO HEAVY MOTION)      */}
            {/* ========================================================================= */}
            {roomState.status === 'VOTING' && (
              <div className="w-full flex-1 flex flex-col justify-between py-2">
                {/* UPPER BOLD HEADER (Centered Vertically) */}
                <div className="w-full flex-1 flex flex-col justify-center items-center text-center space-y-3 px-2 my-auto">
                  {/* Proyektor Guide Pill */}
                  <div className="flex justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-xs">
                      <Monitor className="w-3.5 h-3.5 text-slate-800" />
                      Perhatikan Layar Proyektor di Depan
                    </span>
                  </div>

                  {/* Big Bold Headline */}
                  <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight leading-[1.25]">
                    {cleanTitle}
                  </h2>

                  {/* Clear Scenario Description */}
                  <p className="text-[14px] sm:text-[15px] text-slate-600 font-normal max-w-xs sm:max-w-sm mx-auto leading-relaxed">
                    {currentSlide.description}
                  </p>
                </div>

                {/* BOTTOM THUMB ZONE (Simple Notification Badge + Lightweight Grey Pads) */}
                <div className="space-y-2.5 pt-4">
                  {/* Simple Clean Notification Badge */}
                  <div className="flex justify-center min-h-[28px] items-center">
                    {myVote ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800 shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Pilihanmu (Desain {myVote}) telah tercatat</span>
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 font-normal">
                        Ketuk pad kiri (A) atau kanan (B) untuk memilih:
                      </span>
                    )}
                  </div>

                  {/* 2-COLUMN LIGHTWEIGHT GREY NATIVE PADS (Zero Heavy Motion, Instant Tap) */}
                  <div className="grid grid-cols-2 gap-3.5 w-full h-[175px] sm:h-[190px]">
                    {/* LEFT PAD: DESAIN A */}
                    <button
                      type="button"
                      onClick={() => handleVote('A')}
                      className={`h-full rounded-3xl p-4 flex flex-col justify-between items-center text-center cursor-pointer select-none active:bg-slate-200 ${
                        myVote === 'A'
                          ? 'bg-slate-100 text-slate-900 border-2 border-slate-400 shadow-xs'
                          : 'bg-white text-slate-800 border-2 border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      {/* Badge Letter A */}
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${
                        myVote === 'A' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        A
                      </div>

                      {/* Descriptive Label */}
                      <div className="space-y-0.5">
                        <div className="text-sm font-bold text-slate-900">
                          {currentSlide.optionA.label}
                        </div>
                        <div className="text-[11px] text-slate-500 font-normal line-clamp-1">
                          {currentSlide.optionA.title}
                        </div>
                      </div>

                      {/* Selected Pill Indicator */}
                      <div className="h-5 flex items-center justify-center">
                        {myVote === 'A' ? (
                          <span className="text-[10px] font-semibold text-slate-900 bg-white border border-slate-300 px-2 py-0.5 rounded-full">
                            ✓ Terpilih
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">Pilih A</span>
                        )}
                      </div>
                    </button>

                    {/* RIGHT PAD: DESAIN B */}
                    <button
                      type="button"
                      onClick={() => handleVote('B')}
                      className={`h-full rounded-3xl p-4 flex flex-col justify-between items-center text-center cursor-pointer select-none active:bg-slate-200 ${
                        myVote === 'B'
                          ? 'bg-slate-100 text-slate-900 border-2 border-slate-400 shadow-xs'
                          : 'bg-white text-slate-800 border-2 border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      {/* Badge Letter B */}
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${
                        myVote === 'B' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        B
                      </div>

                      {/* Descriptive Label */}
                      <div className="space-y-0.5">
                        <div className="text-sm font-bold text-slate-900">
                          {currentSlide.optionB.label}
                        </div>
                        <div className="text-[11px] text-slate-500 font-normal line-clamp-1">
                          {currentSlide.optionB.title}
                        </div>
                      </div>

                      {/* Selected Pill Indicator */}
                      <div className="h-5 flex items-center justify-center">
                        {myVote === 'B' ? (
                          <span className="text-[10px] font-semibold text-slate-900 bg-white border border-slate-300 px-2 py-0.5 rounded-full">
                            ✓ Terpilih
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">Pilih B</span>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* CASE D: REVEAL STATE (READ-ONLY CLEAN SUMMARY)                            */}
            {/* ========================================================================= */}
            {roomState.status === 'REVEAL' && (
              <div className="w-full bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 text-center space-y-4 shadow-sm my-auto">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center mx-auto border border-slate-200">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    Voting Telah Ditutup!
                  </h3>
                  <p className="text-xs text-slate-600 font-normal">
                    {myVote ? (
                      <span>Anda memilih <strong className="text-slate-900 font-semibold">Desain {myVote}</strong>.</span>
                    ) : (
                      <span>Anda tidak sempat memberikan vote pada kasus ini.</span>
                    )}
                  </p>
                </div>

                {/* Live Vote Result Ratio Bars */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-800">
                    <span>Desain A: {percentA}%</span>
                    <span>Desain B: {percentB}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-slate-400 transition-all duration-500"
                      style={{ width: `${percentA}%` }}
                    />
                    <div
                      className="h-full bg-[#0560FD] transition-all duration-500"
                      style={{ width: `${percentB}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-600 text-center font-normal">
                    Total {totalVotes} voting tercatat dari audiens
                  </div>
                </div>

                <div className="text-xs text-slate-600 flex items-center justify-center gap-1.5 font-normal pt-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#0560FD]" />
                  <span>Simak penjelasan mentor di layar proyektor!</span>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* CASE E: FINISHED STATE                                                    */}
            {/* ========================================================================= */}
            {roomState.status === 'FINISHED' && (
              <div className="w-full bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-sm my-auto">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center mx-auto border border-slate-200">
                  <Trophy className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Sesi Mentoring Selesai! 🎉
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    Terima kasih telah aktif berpartisipasi dalam sesi voting dan studi kasus hari ini.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* BOTTOM FOOTER BRANDING                                                    */}
      {/* ========================================================================= */}
      <footer className="py-2.5 text-center text-[10px] text-slate-600 border-t border-slate-200/60 bg-white">
        SplitVote UI/UX Interactive • Live Mobile Client
      </footer>
    </div>
  );
};

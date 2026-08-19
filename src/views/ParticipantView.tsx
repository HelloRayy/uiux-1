import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import {
  CheckCircle2,
  Sparkles,
  Smartphone,
  Trophy,
  Users,
  Lightbulb,
  ArrowRight,
  Vote,
  Timer,
  Monitor,
} from 'lucide-react';

export const ParticipantView: React.FC = () => {
  const {
    roomState,
    currentSlide,
    totalSlides,
    myParticipant,
    myVote,
    joinAsParticipant,
    submitMyVote,
    totalVotes,
    votesCountA,
    votesCountB,
    percentA,
    percentB,
  } = useGame();

  const [nicknameInput, setNicknameInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Nickname Registration
  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = nicknameInput.trim();
    if (!cleanName) {
      setErrorMsg('Silakan masukkan nama panggilan Anda.');
      return;
    }
    if (cleanName.length < 2) {
      setErrorMsg('Nama terlalu pendek (minimal 2 karakter).');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await joinAsParticipant(cleanName);
    } catch {
      setErrorMsg('Gagal bergabung. Coba lagi.');
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
                  placeholder="Contoh: Rian UX, Sarah..."
                  value={nicknameInput}
                  onChange={(e) => {
                    setNicknameInput(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  maxLength={20}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white"
                  autoFocus
                />
                {errorMsg && (
                  <p className="text-xs text-rose-600 font-semibold mt-1">{errorMsg}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !nicknameInput.trim()}
                className="w-full py-3.5 bg-slate-800 hover:bg-slate-900 active:bg-slate-950 disabled:opacity-50 text-white rounded-2xl font-semibold text-sm shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? 'Menghubungkan...' : 'Masuk ke Arena Voting'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500 font-normal">
              <Users className="w-4 h-4 text-slate-600" />
              <span>Realtime Interactive Voting</span>
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

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 flex items-center justify-center gap-2 font-medium">
                  <Sparkles className="w-4 h-4 text-slate-700" />
                  <span>Siapkan fokusmu untuk memilih desain terbaik!</span>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* CASE B: VOTING STATE (LIGHTWEIGHT NATIVE GREY PADS, NO HEAVY MOTION)      */}
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

                      {/* Title & Status */}
                      <div className="space-y-0.5 my-auto">
                        <div className="text-base sm:text-lg font-bold tracking-tight text-slate-900">Desain A</div>
                        <div className={`text-[11px] font-normal ${myVote === 'A' ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
                          {myVote === 'A' ? 'Terpilih ✓' : 'Ketuk Memilih'}
                        </div>
                      </div>

                      {/* Indicator Dot */}
                      <div>
                        {myVote === 'A' ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />
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

                      {/* Title & Status */}
                      <div className="space-y-0.5 my-auto">
                        <div className="text-base sm:text-lg font-bold tracking-tight text-slate-900">Desain B</div>
                        <div className={`text-[11px] font-normal ${myVote === 'B' ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
                          {myVote === 'B' ? 'Terpilih ✓' : 'Ketuk Memilih'}
                        </div>
                      </div>

                      {/* Indicator Dot */}
                      <div>
                        {myVote === 'B' ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* CASE C: REVEAL STATE (Clean Simple Result Cards)                          */}
            {/* ========================================================================= */}
            {roomState.status === 'REVEAL' && (
              <div className="w-full space-y-3.5 my-auto">
                {/* Dual Results for Mobile */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className={`p-4 rounded-2xl border ${
                    votesCountA >= votesCountB ? 'bg-slate-50 border-2 border-slate-400 shadow-xs' : 'bg-white border border-slate-200'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-800" />
                      <span className="text-xs font-semibold text-slate-900 uppercase font-mono">
                        Desain A
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 mt-1">
                      {totalVotes > 0 ? `${percentA}%` : '0%'}
                    </div>
                    <span className="text-[11px] text-slate-500 font-normal">{votesCountA} suara</span>
                  </div>

                  <div className={`p-4 rounded-2xl border ${
                    votesCountB >= votesCountA ? 'bg-slate-50 border-2 border-slate-400 shadow-xs' : 'bg-white border border-slate-200'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-xs bg-slate-800" />
                      <span className="text-xs font-semibold text-slate-900 uppercase font-mono">
                        Desain B
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 mt-1">
                      {totalVotes > 0 ? `${percentB}%` : '0%'}
                    </div>
                    <span className="text-[11px] text-slate-500 font-normal">{votesCountB} suara</span>
                  </div>
                </div>

                {/* Personal Vote Feedback */}
                {myVote && (
                  <div className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl text-xs space-y-1 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-medium">Pilihan Kamu:</span>
                      <span className="font-semibold text-slate-900 px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200 font-mono flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                        Desain {myVote}
                      </span>
                    </div>
                  </div>
                )}

                {/* Mentor Takeaway Summary */}
                <div className="w-full p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                    <Lightbulb className="w-4 h-4 text-slate-700" />
                    <span>Poin Edukasi Mentor</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {currentSlide.mentorExplanation.summary}
                  </p>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* CASE D: GAME FINISHED                                                     */}
            {/* ========================================================================= */}
            {roomState.status === 'FINISHED' && (
              <div className="w-full bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-sm my-auto">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center mx-auto border border-slate-200">
                  <Trophy className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Sesi Telah Selesai! 🎉</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal">
                  Terima kasih, {myParticipant.nickname}! Kamu telah menyelesaikan seluruh studi kasus UI/UX hari ini.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

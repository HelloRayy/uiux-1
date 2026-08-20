import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useGame } from '../context/GameContext';
import { SplitScreenViewer } from '../components/SplitScreenViewer';
import { Navbar } from '../components/Navbar';
import {
  Users,
  Trophy,
  Play,
  ChevronRight,
  ChevronLeft,
  X,
  QrCode,
  Smartphone,
  Sparkles,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

export const HostView: React.FC = () => {
  const {
    roomState,
    currentSlide,
    totalSlides,
    totalVotes,
    votesCountA,
    votesCountB,
    percentA,
    percentB,
    totalParticipants,
    openTutorial,
    endRound,
    nextRound,
    prevRound,
    jumpToRound,
    resetAll,
  } = useGame();

  const [showQRCode, setShowQRCode] = useState(false);

  const joinUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/play`
    : 'http://localhost:5173/play';

  const participantsList = Object.values(roomState.participants || {});

  // Keyboard shortcut listener for effortless 1-laptop presenter control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing in inputs
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'Escape') {
        setShowQRCode(false);
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (showQRCode) {
          setShowQRCode(false);
          openTutorial();
        } else if (roomState.status === 'LOBBY') {
          openTutorial();
        } else if (roomState.status === 'TUTORIAL') {
          jumpToRound(0);
        } else if (roomState.status === 'VOTING') {
          endRound();
        } else if (roomState.status === 'REVEAL') {
          nextRound();
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextRound();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevRound();
      } else if (e.key.toLowerCase() === 'q') {
        setShowQRCode((prev) => !prev);
      } else if (e.key.toLowerCase() === 'r') {
        resetAll();
      } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const targetIdx = parseInt(e.key, 10) - 1;
        if (targetIdx >= 0 && targetIdx < totalSlides) {
          jumpToRound(targetIdx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showQRCode, roomState.status, totalSlides]);

  return (
    <div className="min-h-screen bg-[#f6f8fa] text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white pb-24 font-sans">
      <Navbar currentRole="HOST" />

      <main className="flex-1 w-full max-w-[1440px] mx-auto p-3 sm:p-5 lg:p-6 flex flex-col justify-center">
        {/* ========================================================================= */}
        {/* CASE 1: LOBBY SCREEN (Hero Section from Figma)                             */}
        {/* ========================================================================= */}
        {roomState.status === 'LOBBY' && (
          <div className="w-full pt-[60px] pb-12 px-4 animate-fade-in my-auto max-w-[1080px] mx-auto flex flex-col items-center">
            {/* Minimalist Hero Headline */}
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <h1
                className="text-[#151619] font-bold text-center tracking-tight"
                style={{
                  fontSize: 'clamp(40px, 8vw, 80px)',
                  lineHeight: 'clamp(44px, 7.5vw, 72px)',
                  fontWeight: 700,
                }}
              >
                The smarter way to
                <div className="mt-3 sm:mt-4 flex justify-center">
                  <span
                    className="inline-flex h-14 sm:h-20 px-4 sm:px-6 items-center gap-2 sm:gap-3 rounded-[20px] bg-[#0560FD] text-white -rotate-2 transform font-black tracking-tight"
                    style={{
                      boxShadow: '0 0 0 4px rgba(5, 96, 253, 0.24)',
                    }}
                  >
                    <span className="text-2xl sm:text-4xl select-none">✨</span>
                    <span className="text-3xl sm:text-5xl md:text-6xl font-black">schedule teams</span>
                  </span>
                </div>
              </h1>

              <p
                className="text-[#151619] text-center max-w-2xl mx-auto"
                style={{
                  fontSize: 'clamp(16px, 2.5vw, 24px)',
                  lineHeight: 'clamp(24px, 3.2vw, 32px)',
                  fontWeight: 500,
                  letterSpacing: '0.07px',
                }}
              >
                Say goodbye to broken spreadsheets and unfit tools — Compare live UI/UX case studies and let your audience vote in real-time.
              </p>

              {/* CTA Button */}
              <div className="pt-2 flex justify-center items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowQRCode(true)}
                  className="flex p-4 justify-center items-center bg-[#1e232d] hover:bg-slate-900 active:scale-95 text-white rounded-2xl font-semibold text-base shadow-md transition gap-2.5 cursor-pointer"
                >
                  <QrCode className="w-5 h-5 text-white" />
                  <span>Request access</span>
                </button>
              </div>
            </div>

            {/* Video Showcase Container Frame from Figma (1080px x 601px) */}
            <div className="w-full mt-10 sm:mt-14">
              <div
                className="w-full flex-shrink-0 self-stretch rounded-[16px] border border-[#C8CAD0] overflow-hidden bg-[#f4f5f7] relative shadow-card flex flex-col justify-between p-4 sm:p-6 group transition-all duration-300"
                style={{
                  height: 'clamp(320px, 50vw, 601px)',
                }}
              >
                {/* Header mock controls */}
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-300" />
                    <div className="w-3 h-3 rounded-full bg-slate-300" />
                    <div className="w-3 h-3 rounded-full bg-slate-300" />
                    <span className="text-xs font-semibold text-slate-400 ml-2 font-mono hidden sm:inline">
                      hellotime-demo-preview.mp4
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0560FD] text-xs font-bold font-mono border border-blue-200">
                    Sesi Interaktif UI/UX
                  </span>
                </div>

                {/* Center interactive video play trigger */}
                <div className="my-auto flex flex-col items-center justify-center text-center space-y-3">
                  <div
                    onClick={() => openTutorial()}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0560FD] text-white flex items-center justify-center shadow-xl shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                  >
                    <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white ml-1" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                      Mulai Sesi & Buka Panduan
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-sans">
                      Klik tombol play atau tekan Spacebar untuk membuka panduan interaktif
                    </p>
                  </div>
                </div>

                {/* Bottom dimension indicator */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-200/60 font-mono">
                  <span>Self-stretch • 1080px max</span>
                  <span>16px border-radius</span>
                </div>
              </div>
            </div>

            {/* Floating participant chips below hero */}
            {participantsList.length > 0 && !showQRCode && (
              <div className="mt-8 max-w-xl mx-auto flex flex-wrap items-center justify-center gap-2">
                {participantsList.map((p) => (
                  <div
                    key={p.id}
                    className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 flex items-center gap-2 shadow-xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{p.nickname}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* CASE 2: TUTORIAL SCREEN (Identical Split-Screen A vs B Layout as Page 1)  */}
        {/* ========================================================================= */}
        {roomState.status === 'TUTORIAL' && (
          <div className="w-full mx-auto animate-fade-in">
            <SplitScreenViewer
              slide={currentSlide}
              showExplanation={false}
              showResults={totalVotes > 0}
              percentA={percentA}
              percentB={percentB}
              votesA={votesCountA}
              votesB={votesCountB}
              totalVotes={totalVotes}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* CASE 3: VOTING SCREEN (ACTIVE ROUND - PURE CLEAN VISUAL)                  */}
        {/* ========================================================================= */}
        {roomState.status === 'VOTING' && (
          <div className="w-full mx-auto animate-fade-in">
            <SplitScreenViewer slide={currentSlide} showExplanation={false} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* CASE 4: REVEAL SCREEN (INTEGRATED ON-CARD RESULTS + EXPLANATION)          */}
        {/* ========================================================================= */}
        {roomState.status === 'REVEAL' && (
          <div className="w-full mx-auto space-y-6 animate-fade-in">
            <SplitScreenViewer
              slide={currentSlide}
              showExplanation={true}
              showResults={true}
              percentA={percentA}
              percentB={percentB}
              votesA={votesCountA}
              votesB={votesCountB}
              totalVotes={totalVotes}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* CASE 5: FINISHED SCREEN                                                   */}
        {/* ========================================================================= */}
        {roomState.status === 'FINISHED' && (
          <div className="max-w-2xl mx-auto text-center space-y-6 py-12 animate-fade-in">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-[#0560FD] flex items-center justify-center text-white shadow-2xl shadow-blue-500/30">
              <Trophy className="w-10 h-10" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Sesi Mentoring UI/UX Selesai! 🎉
            </h1>
            <p className="text-sm text-slate-600 max-w-md mx-auto font-normal">
              Terima kasih kepada seluruh peserta yang telah berpartisipasi aktif dalam sesi perbandingan desain hari ini.
            </p>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* UNIFIED PRESENTER CONTROL TOOLBAR (Fixed Bottom Floating Dock)             */}
      {/* ========================================================================= */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 sm:gap-2 p-2 bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl rounded-full text-xs font-semibold transition-all duration-300">
        {/* Reset / Lobby Button */}
        <button
          type="button"
          onClick={resetAll}
          className={`px-3 py-1.5 rounded-full transition flex items-center gap-1.5 cursor-pointer ${
            roomState.status === 'LOBBY'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Kembali ke Lobby (Tekan R)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Lobby</span>
        </button>

        {/* Tutorial / Panduan Button */}
        <button
          type="button"
          onClick={openTutorial}
          className={`px-3 py-1.5 rounded-full transition flex items-center gap-1.5 cursor-pointer ${
            roomState.status === 'TUTORIAL'
              ? 'bg-[#0560FD] text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Buka Panduan Sesi"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Panduan</span>
        </button>

        <div className="w-[1px] h-4 bg-slate-200 mx-0.5" />

        {/* Previous Slide */}
        <button
          type="button"
          onClick={prevRound}
          disabled={roomState.status === 'LOBBY'}
          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none rounded-full transition cursor-pointer"
          title="Sebelumnya (←)"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Slide Quick Jumper Pills (1 to 5) */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalSlides }).map((_, idx) => {
            const isActive = roomState.status !== 'LOBBY' && roomState.status !== 'TUTORIAL' && (roomState.currentSlideIndex || 0) === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => jumpToRound(idx)}
                className={`w-7 h-7 rounded-full text-xs font-semibold transition cursor-pointer flex items-center justify-center ${
                  isActive
                    ? 'bg-[#0560FD] text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                title={`Buka Kasus ${idx + 1} (Tekan ${idx + 1})`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Next Slide */}
        <button
          type="button"
          onClick={nextRound}
          disabled={roomState.status !== 'LOBBY' && roomState.status !== 'TUTORIAL' && (roomState.currentSlideIndex || 0) >= totalSlides - 1}
          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none rounded-full transition cursor-pointer"
          title="Berikutnya (→)"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-4 bg-slate-200 mx-0.5" />

        {/* Primary Action Button (Spacebar Trigger) */}
        {roomState.status === 'LOBBY' ? (
          <button
            type="button"
            onClick={openTutorial}
            className="px-4 py-1.5 bg-[#0560FD] hover:bg-blue-700 text-white rounded-full transition flex items-center gap-1.5 cursor-pointer shadow-xs font-semibold"
            title="Buka Panduan (Tekan Spacebar)"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Panduan</span>
          </button>
        ) : roomState.status === 'TUTORIAL' ? (
          <button
            type="button"
            onClick={() => jumpToRound(0)}
            className="px-4 py-1.5 bg-[#0560FD] hover:bg-blue-700 text-white rounded-full transition flex items-center gap-1.5 cursor-pointer shadow-xs font-semibold"
            title="Mulai Kasus 1 (Tekan Spacebar)"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Mulai Kasus 1</span>
          </button>
        ) : roomState.status === 'VOTING' ? (
          <button
            type="button"
            onClick={endRound}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition flex items-center gap-1.5 cursor-pointer shadow-xs animate-pulse font-semibold"
            title="Buka Hasil Voting (Tekan Spacebar)"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Buka Hasil ({roomState.timerRemaining}s)</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={nextRound}
            className="px-4 py-1.5 bg-[#0560FD] hover:bg-blue-700 text-white rounded-full transition flex items-center gap-1.5 cursor-pointer shadow-xs font-semibold"
            title="Lanjut ke Kasus Berikutnya (Tekan Spacebar)"
          >
            <span>Lanjut Kasus</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}

        <div className="w-[1px] h-4 bg-slate-200 mx-0.5" />

        {/* QR Code Modal Toggle */}
        <button
          type="button"
          onClick={() => setShowQRCode(!showQRCode)}
          className={`p-1.5 rounded-full transition cursor-pointer ${
            showQRCode
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Tampilkan / Sembunyikan QR Code (Tekan Q)"
        >
          <QrCode className="w-4 h-4" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* CLEAN FULLSCREEN QR CODE MODAL FOR AUDIENCE JOIN                          */}
      {/* ========================================================================= */}
      {showQRCode && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10 animate-fade-in">
          {/* Top discreet close button */}
          <div className="w-full max-w-6xl mx-auto flex items-center justify-end">
            <button
              type="button"
              onClick={() => setShowQRCode(false)}
              className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition cursor-pointer"
              title="Tutup (ESC)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Large QR Section */}
          <div className="my-auto flex flex-col items-center justify-center text-center space-y-6 max-w-3xl mx-auto py-4">
            <div>
              <h2 className="text-3xl sm:text-5xl font-bold text-[#151619] tracking-tight">
                Scan QR Code untuk Bergabung
              </h2>
              <p className="text-sm sm:text-base text-slate-500 mt-2 font-normal flex items-center justify-center gap-2">
                <Smartphone className="w-4 h-4 text-[#0560FD]" /> Arahkan kamera smartphone ke layar proyektor
              </p>
            </div>

            {/* Clean QR Code without background */}
            <div className="py-2 flex items-center justify-center">
              <QRCodeSVG
                value={joinUrl}
                size={typeof window !== 'undefined' && window.innerWidth < 640 ? 260 : 360}
                level="Q"
                fgColor="#151619"
                bgColor="transparent"
              />
            </div>

            {/* URL Address Display */}
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                Atau Buka Alamat Web:
              </div>
              <div className="text-base sm:text-xl font-mono font-semibold text-[#0560FD] bg-blue-50 px-5 py-2 rounded-2xl border border-blue-200/80 inline-block select-all shadow-xs">
                {joinUrl}
              </div>
            </div>
          </div>

          {/* Bottom Bar: Participants Counter & Start Button */}
          <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200 text-xs font-semibold text-slate-800">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>
                  <strong className="text-slate-900 font-bold">{totalParticipants}</strong> Peserta Terhubung
                </span>
              </div>

              {participantsList.length > 0 && (
                <div className="flex -space-x-2 overflow-hidden max-w-[200px] sm:max-w-xs">
                  {participantsList.slice(0, 5).map((p) => (
                    <div
                      key={p.id}
                      className="inline-block h-7 px-2.5 bg-[#0560FD] text-white rounded-full text-[10px] font-semibold ring-2 ring-white flex items-center justify-center font-sans"
                      title={p.nickname}
                    >
                      {p.nickname}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setShowQRCode(false);
                openTutorial();
              }}
              className="px-6 py-3 bg-[#0560FD] hover:bg-blue-700 active:scale-95 text-white rounded-2xl font-semibold text-sm shadow-md shadow-blue-500/25 transition cursor-pointer flex items-center gap-2"
            >
              <span>Buka Panduan Sesi</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useGame2 } from '../context/Game2Context';
import { SplitScreenViewer2 } from '../components/SplitScreenViewer2';
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
  Medal,
  Award,
  Crown,
  TrendingUp,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../components/ui/table';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { FirebaseSetupModal } from '../components/FirebaseSetupModal';

export const HostView2: React.FC = () => {
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
    leaderboard,
    isFirebase,
    openTutorial,
    endRound,
    showLeaderboard,
    nextRound,
    prevRound,
    jumpToRound,
    resetAll,
  } = useGame2();

  const [showQRCode, setShowQRCode] = useState(false);
  const [showFirebaseModal, setShowFirebaseModal] = useState(false);

  const joinUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/uiux-2/play`
    : 'http://localhost:5173/uiux-2/play';

  const participantsList = Object.values(roomState.participants || {});

  // Keyboard shortcut listener for seamless 1-laptop presenter control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
          showLeaderboard();
        } else if (roomState.status === 'LEADERBOARD') {
          nextRound();
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextRound();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevRound();
      } else if (e.key.toLowerCase() === 'l') {
        showLeaderboard();
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

  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];
  const rank4AndBeyond = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-primary-foreground pb-24 font-sans">
      {/* Top Navbar */}
      <header className="border-b border-border/80 bg-card/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 py-3">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="default" className="font-bold text-xs">
              UI/UX 2.0
            </Badge>
            <span className="text-sm font-bold text-foreground">
              Human Taste vs AI Design
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Firebase Connection Status Badge */}
            <button
              type="button"
              onClick={() => setShowFirebaseModal(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border transition cursor-pointer ${
                isFirebase
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
              }`}
              title="Klik untuk konfigurasi Firebase Realtime DB"
            >
              <span className={`w-2 h-2 rounded-full ${isFirebase ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span>{isFirebase ? 'Cloud Online' : 'Local Mode'}</span>
            </button>

            <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-md text-xs font-semibold text-muted-foreground border">
              <Users className="w-3.5 h-3.5 text-primary" />
              <span>{totalParticipants} Peserta</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowQRCode(true)}
              className="gap-1.5 text-xs font-semibold"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>QR Code</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        {/* ========================================================================= */}
        {/* 1. LOBBY SCREEN                                                           */}
        {/* ========================================================================= */}
        {roomState.status === 'LOBBY' && (
          <div className="w-full max-w-4xl mx-auto py-8 sm:py-12 px-4 animate-fade-in my-auto space-y-8 text-center">
            <div className="space-y-4 max-w-2xl mx-auto">
              <Badge variant="outline" className="gap-1.5 px-3.5 py-1 text-xs font-bold text-primary bg-primary/5 border-primary/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sesi Game Interaktif #2</span>
              </Badge>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight leading-tight">
                Kenapa AI Butuh <span className="text-primary underline decoration-primary/30">Human Taste</span>?
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Bandingkan desain mentah (*Raw AI*) melawan sentuhan desainer profesional (*Human Taste & UX Principles*). Uji intuisi desain Anda sekarang!
              </p>

              <div className="pt-2 flex items-center justify-center gap-3">
                <Button
                  size="lg"
                  onClick={() => openTutorial()}
                  className="gap-2 font-bold shadow-md shadow-primary/20 text-sm sm:text-base"
                >
                  <Play className="w-4 h-4 fill-primary-foreground" />
                  <span>Buka Panduan & Mulai Game</span>
                </Button>
              </div>
            </div>

            {/* Live Participants Grid */}
            <Card className="p-5 border-slate-200 bg-white/70 backdrop-blur-xs space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold pb-2 border-b">
                <span className="flex items-center gap-1.5 text-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Daftar Peserta Terhubung ({totalParticipants})</span>
                </span>
                <span className="text-muted-foreground font-mono text-[10px]">
                  Realtime Cloud Sync
                </span>
              </div>

              {participantsList.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted-foreground space-y-1">
                  <p>Belum ada peserta yang bergabung.</p>
                  <p className="text-[11px]">Buka QR Code agar peserta bisa scan lewat smartphone masing-masing.</p>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-center gap-2 max-h-48 overflow-y-auto p-1">
                  {participantsList.map((p) => (
                    <Badge
                      key={p.id}
                      variant="secondary"
                      className="px-3 py-1.5 gap-2 text-xs font-semibold bg-white border shadow-2xs"
                    >
                      <Avatar className="w-5 h-5">
                        <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                          {p.nickname.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{p.nickname}</span>
                    </Badge>
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. TUTORIAL / SIMULASI SCREEN                                             */}
        {/* ========================================================================= */}
        {roomState.status === 'TUTORIAL' && (
          <div className="w-full mx-auto animate-fade-in space-y-6">
            <SplitScreenViewer2
              slide={currentSlide}
              showExplanation={false}
              showResults={totalVotes > 0}
              percentA={percentA}
              percentB={percentB}
              votesA={votesCountA}
              votesB={votesCountB}
              totalVotes={totalVotes}
            />

            {/* Mobile Controller Helper Card */}
            <Card className="max-w-xl mx-auto p-4 border-dashed border-2 bg-muted/30 text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-foreground">
                <Smartphone className="w-4 h-4 text-primary" />
                <span>Format Soal Game 2: Standalone Mobile Preview</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Di HP peserta sekarang muncul preview kartu yang sama persis. Peserta yang menjawab <strong>Benar dan Paling Cepat</strong> akan mendapatkan skor tertinggi (maks 1000 poin)!
              </p>
            </Card>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. ACTIVE VOTING SCREEN                                                   */}
        {/* ========================================================================= */}
        {roomState.status === 'VOTING' && (
          <div className="w-full mx-auto animate-fade-in">
            <SplitScreenViewer2 slide={currentSlide} showExplanation={false} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. REVEAL & EXPLANATION SCREEN                                            */}
        {/* ========================================================================= */}
        {roomState.status === 'REVEAL' && (
          <div className="w-full mx-auto animate-fade-in">
            <SplitScreenViewer2
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
        {/* 5. INTERACTIVE LEADERBOARD SCREEN (PODIUM TOP 3 + TABLE 4-N)             */}
        {/* ========================================================================= */}
        {roomState.status === 'LEADERBOARD' && (
          <div className="w-full max-w-4xl mx-auto py-4 px-4 animate-fade-in my-auto space-y-8">
            <div className="text-center space-y-1.5">
              <Badge variant="outline" className="gap-1.5 px-3 py-1 font-semibold text-primary bg-primary/5 border-primary/20">
                <Trophy className="w-3.5 h-3.5" />
                <span>Papan Skor Sementara (Ronde {roomState.currentSlideIndex + 1})</span>
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Peringkat Peserta Tercepat & Tepat
              </h2>
            </div>

            {/* PODIUM TOP 3 CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end pt-4 max-w-3xl mx-auto">
              {/* 2ND PLACE (SILVER) */}
              <Card className="p-4 text-center space-y-2.5 border-slate-300 bg-slate-50/50 shadow-xs order-2 sm:order-1 sm:h-[220px] flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center mx-auto border-2 border-slate-300">
                    <Medal className="w-5 h-5 text-slate-600" />
                  </div>
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    JUARA 2
                  </Badge>
                </div>

                <div className="space-y-0.5">
                  <div className="font-bold text-sm text-foreground truncate">
                    {top2 ? top2.nickname : '—'}
                  </div>
                  <div className="text-base font-black text-primary font-mono">
                    {top2 ? `${top2.score} Pts` : '0 Pts'}
                  </div>
                </div>

                <div className="text-[10px] text-emerald-600 font-medium">
                  {top2 && top2.lastRoundPoints > 0 ? `+${top2.lastRoundPoints} ronde ini` : '—'}
                </div>
              </Card>

              {/* 1ST PLACE (GOLD - ELEVATED) */}
              <Card className="p-5 text-center space-y-3 border-amber-400 bg-amber-50/40 shadow-lg ring-2 ring-amber-400/30 order-1 sm:order-2 sm:h-[250px] flex flex-col justify-between -translate-y-2">
                <div className="space-y-1.5">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 font-bold text-base flex items-center justify-center mx-auto border-2 border-amber-400 shadow-xs">
                    <Crown className="w-6 h-6 text-amber-600" />
                  </div>
                  <Badge variant="warning" className="font-mono text-[10px] font-bold">
                    👑 JUARA 1
                  </Badge>
                </div>

                <div className="space-y-0.5">
                  <div className="font-extrabold text-base text-foreground truncate">
                    {top1 ? top1.nickname : '—'}
                  </div>
                  <div className="text-lg sm:text-xl font-black text-amber-600 font-mono">
                    {top1 ? `${top1.score} Pts` : '0 Pts'}
                  </div>
                </div>

                <div className="text-[11px] text-emerald-700 font-bold flex items-center justify-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{top1 && top1.lastRoundPoints > 0 ? `+${top1.lastRoundPoints} ronde ini` : '—'}</span>
                </div>
              </Card>

              {/* 3RD PLACE (BRONZE) */}
              <Card className="p-4 text-center space-y-2.5 border-amber-200/80 bg-amber-50/20 shadow-xs order-3 sm:order-3 sm:h-[200px] flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="w-10 h-10 rounded-full bg-amber-100/70 text-amber-800 font-bold text-sm flex items-center justify-center mx-auto border-2 border-amber-300">
                    <Award className="w-5 h-5 text-amber-700" />
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    JUARA 3
                  </Badge>
                </div>

                <div className="space-y-0.5">
                  <div className="font-bold text-sm text-foreground truncate">
                    {top3 ? top3.nickname : '—'}
                  </div>
                  <div className="text-base font-black text-primary font-mono">
                    {top3 ? `${top3.score} Pts` : '0 Pts'}
                  </div>
                </div>

                <div className="text-[10px] text-emerald-600 font-medium">
                  {top3 && top3.lastRoundPoints > 0 ? `+${top3.lastRoundPoints} ronde ini` : '—'}
                </div>
              </Card>
            </div>

            {/* TABLE RANKING 4 TO N */}
            {rank4AndBeyond.length > 0 && (
              <Card className="p-4 border-slate-200 bg-white">
                <div className="text-xs font-bold text-foreground pb-2 border-b flex justify-between items-center">
                  <span>Peringkat 4 Sampai {leaderboard.length}</span>
                  <span className="text-muted-foreground font-normal">Diperbarui Live</span>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Rank</TableHead>
                      <TableHead>Peserta</TableHead>
                      <TableHead className="text-right">Poin Terakhir</TableHead>
                      <TableHead className="text-right">Total Skor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rank4AndBeyond.map((entry) => (
                      <TableRow key={entry.participantId}>
                        <TableCell className="font-mono font-bold text-muted-foreground">
                          #{entry.rank}
                        </TableCell>
                        <TableCell className="font-semibold text-foreground flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-[9px]">
                              {entry.nickname.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{entry.nickname}</span>
                        </TableCell>
                        <TableCell className="text-right font-mono text-emerald-600 text-xs">
                          {entry.lastRoundPoints > 0 ? `+${entry.lastRoundPoints}` : '—'}
                        </TableCell>
                        <TableCell className="text-right font-mono font-bold text-foreground">
                          {entry.score}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}

            {/* Next Action Button */}
            <div className="flex justify-center pt-2">
              <Button
                size="lg"
                onClick={nextRound}
                className="gap-2 font-bold shadow-md shadow-primary/20"
              >
                <span>
                  {roomState.currentSlideIndex + 1 >= totalSlides
                    ? 'Lihat Hasil Akhir Sesi 🎉'
                    : `Lanjut ke Studi Kasus ${roomState.currentSlideIndex + 2} ➔`}
                </span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 6. FINISHED SCREEN                                                        */}
        {/* ========================================================================= */}
        {roomState.status === 'FINISHED' && (
          <div className="max-w-2xl mx-auto text-center space-y-6 py-12 animate-fade-in">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-primary flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/30">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Selamat Kepada Para Pemenang! 🏆
              </h1>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Kalian telah membuktikan bahwa AI hanyalah alat bantu, dan **Human Taste & Empati Desainer** tetap menjadi penentu kesuksesan produk digital!
              </p>
            </div>

            {/* Final Champion Card */}
            {top1 && (
              <Card className="p-6 border-amber-400 bg-amber-50/40 max-w-md mx-auto shadow-md">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-400 text-white flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div className="text-left">
                    <div className="text-xs uppercase font-bold text-amber-700">Juara Utama Game 2</div>
                    <div className="text-xl font-black text-foreground">{top1.nickname}</div>
                    <div className="text-sm font-mono font-bold text-primary">{top1.score} Total Poin</div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* UNIFIED PRESENTER DOCK FOR GAME 2                                         */}
      {/* ========================================================================= */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 sm:gap-2 p-2 bg-card/95 backdrop-blur-xl border border-border shadow-2xl rounded-full text-xs font-semibold transition-all duration-300">
        {/* Reset / Lobby */}
        <Button
          variant={roomState.status === 'LOBBY' ? 'default' : 'ghost'}
          size="sm"
          onClick={resetAll}
          className="rounded-full gap-1 text-xs px-3"
          title="Kembali ke Lobby (R)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Lobby</span>
        </Button>

        {/* Tutorial Button */}
        <Button
          variant={roomState.status === 'TUTORIAL' ? 'default' : 'ghost'}
          size="sm"
          onClick={openTutorial}
          className="rounded-full gap-1 text-xs px-3"
          title="Buka Panduan Sesi"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Panduan</span>
        </Button>

        <div className="w-[1px] h-4 bg-border mx-0.5" />

        {/* Prev Slide */}
        <Button
          variant="ghost"
          size="icon"
          onClick={prevRound}
          disabled={roomState.status === 'LOBBY'}
          className="rounded-full w-7 h-7"
          title="Sebelumnya (←)"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Slide Numbers 1 to 5 */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalSlides }).map((_, idx) => {
            const isActive =
              roomState.status !== 'LOBBY' &&
              roomState.status !== 'TUTORIAL' &&
              (roomState.currentSlideIndex || 0) === idx;
            return (
              <Button
                key={idx}
                variant={isActive ? 'default' : 'ghost'}
                size="icon"
                onClick={() => jumpToRound(idx)}
                className={`w-7 h-7 rounded-full text-xs font-semibold ${isActive ? 'font-bold' : ''}`}
                title={`Soal ${idx + 1}`}
              >
                {idx + 1}
              </Button>
            );
          })}
        </div>

        {/* Next Slide */}
        <Button
          variant="ghost"
          size="icon"
          onClick={nextRound}
          disabled={roomState.status !== 'LOBBY' && roomState.status !== 'TUTORIAL' && (roomState.currentSlideIndex || 0) >= totalSlides - 1}
          className="rounded-full w-7 h-7"
          title="Berikutnya (→)"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        <div className="w-[1px] h-4 bg-border mx-0.5" />

        {/* Dynamic Action Trigger */}
        {roomState.status === 'LOBBY' ? (
          <Button size="sm" onClick={openTutorial} className="rounded-full gap-1.5 px-3.5 font-bold">
            <Play className="w-3.5 h-3.5 fill-primary-foreground" />
            <span>Mulai</span>
          </Button>
        ) : roomState.status === 'TUTORIAL' ? (
          <Button size="sm" onClick={() => jumpToRound(0)} className="rounded-full gap-1.5 px-3.5 font-bold">
            <Play className="w-3.5 h-3.5 fill-primary-foreground" />
            <span>Soal 1</span>
          </Button>
        ) : roomState.status === 'VOTING' ? (
          <Button size="sm" variant="destructive" onClick={endRound} className="rounded-full gap-1.5 px-3.5 font-bold animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Buka ({roomState.timerRemaining}s)</span>
          </Button>
        ) : roomState.status === 'REVEAL' ? (
          <Button size="sm" onClick={showLeaderboard} className="rounded-full gap-1.5 px-3.5 font-bold bg-amber-600 hover:bg-amber-700 text-white">
            <Trophy className="w-3.5 h-3.5" />
            <span>Leaderboard</span>
          </Button>
        ) : (
          <Button size="sm" onClick={nextRound} className="rounded-full gap-1.5 px-3.5 font-bold">
            <span>Lanjut</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        )}

        <div className="w-[1px] h-4 bg-border mx-0.5" />

        {/* QR Code Modal Toggle */}
        <Button
          variant={showQRCode ? 'default' : 'ghost'}
          size="icon"
          onClick={() => setShowQRCode(!showQRCode)}
          className="rounded-full w-7 h-7"
          title="Tampilkan QR Code (Q)"
        >
          <QrCode className="w-4 h-4" />
        </Button>
      </div>

      {/* FULLSCREEN QR CODE MODAL FOR GAME 2 */}
      {showQRCode && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10 animate-fade-in">
          <div className="w-full max-w-6xl mx-auto flex items-center justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowQRCode(false)}
              className="rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="my-auto flex flex-col items-center justify-center text-center space-y-6 max-w-3xl mx-auto py-4">
            <div>
              <Badge variant="outline" className="mb-2 text-xs font-bold text-primary bg-primary/5">
                Game #2: Human Taste vs AI Design
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
                Scan QR Code untuk Bergabung
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Arahkan kamera smartphone Anda ke layar untuk masuk ke sesi Game 2
              </p>
            </div>

            <div className="p-4 bg-white rounded-3xl border shadow-md">
              <QRCodeSVG
                value={joinUrl}
                size={typeof window !== 'undefined' && window.innerWidth < 640 ? 240 : 320}
                level="Q"
                fgColor="#09090b"
                bgColor="transparent"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground font-mono">Atau Buka Alamat Web:</span>
              <div className="text-base sm:text-lg font-mono font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-xl border border-primary/20 select-all">
                {joinUrl}
              </div>
            </div>
          </div>

          <div className="w-full max-w-4xl mx-auto flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span><strong>{totalParticipants}</strong> Peserta Terhubung</span>
            </div>

            <Button
              onClick={() => {
                setShowQRCode(false);
                openTutorial();
              }}
              className="gap-2 font-bold"
            >
              <span>Mulai Sesi Game 2</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* FIREBASE SETUP MODAL FOR GAME 2 */}
      {showFirebaseModal && (
        <FirebaseSetupModal onClose={() => setShowFirebaseModal(false)} />
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Navbar } from '../components/Navbar';
import { SLIDES_DATA } from '../data/slides';
import {
  Play,
  Square,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Timer,
  Users,
  Shield,
  Layers,
  BarChart2,
  CheckCircle2,
} from 'lucide-react';

export const AdminView: React.FC = () => {
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
    startRound,
    endRound,
    nextRound,
    prevRound,
    jumpToRound,
    resetAll,
  } = useGame();

  const [selectedDuration, setSelectedDuration] = useState<number>(30);
  const participantsList = Object.values(roomState.participants || {});
  const currentIdx = roomState.currentSlideIndex || 0;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar currentRole="ADMIN" />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Header Title */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 p-5 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-[#0560FD] rounded-2xl border border-blue-200">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                Panel Kendali Mentor
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-extrabold uppercase font-mono">
                  Remote Admin
                </span>
              </h1>
              <p className="text-xs text-slate-600 font-sans mt-0.5 font-medium">
                Atur alur presentasi, countdown timer, dan buka hasil voting dari perangkat Anda.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-bold text-slate-900">{totalParticipants}</span>
              <span className="text-slate-500 font-medium">Peserta</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
              <BarChart2 className="w-3.5 h-3.5 text-[#0560FD]" />
              <span className="font-bold text-slate-900">{totalVotes}</span>
              <span className="text-slate-500 font-medium">Vote</span>
            </div>
          </div>
        </div>

        {/* Current Active Slide Overview */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-[#0560FD] text-white rounded-lg text-xs font-black font-mono">
                Kasus {currentIdx + 1} / {totalSlides}
              </span>
              <span className="text-xs text-slate-600 font-bold font-mono">{currentSlide.category}</span>
            </div>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1 font-mono">
              Status:{' '}
              <span className={`uppercase font-black px-2.5 py-0.5 rounded-md ${
                roomState.status === 'VOTING'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : roomState.status === 'REVEAL'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-blue-100 text-blue-900 border border-blue-300'
              }`}>
                {roomState.status}
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">{currentSlide.title}</h2>
            <p className="text-xs text-slate-600 mt-1 font-sans font-medium">{currentSlide.description}</p>
          </div>

          {/* Live Real-time Distribution (Visible to mentor during voting and reveal) */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl">
              <span className="text-[10px] font-bold text-[#0560FD] uppercase tracking-wider block font-mono">
                Opsi A ({currentSlide.optionA.title})
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-slate-900">{percentA}%</span>
                <span className="text-xs text-slate-500 font-medium font-sans">({votesCountA} vote)</span>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block font-mono">
                Opsi B ({currentSlide.optionB.title})
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-slate-900">{percentB}%</span>
                <span className="text-xs text-slate-500 font-medium font-sans">({votesCountB} vote)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 font-mono">
            <Timer className="w-4 h-4 text-[#0560FD]" /> Pengaturan Ronde & Timer
          </h3>

          {/* Duration Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-700 font-bold font-sans">Durasi:</span>
            {[15, 30, 45, 60].map((dur) => (
              <button
                key={dur}
                type="button"
                onClick={() => setSelectedDuration(dur)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition cursor-pointer border ${
                  selectedDuration === dur
                    ? 'bg-[#0560FD] text-white border-[#0560FD] shadow-xs'
                    : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                }`}
              >
                {dur}s
              </button>
            ))}
          </div>

          {/* Main Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roomState.status === 'VOTING' ? (
              <button
                type="button"
                onClick={endRound}
                className="py-3.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-rose-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Square className="w-4 h-4 fill-white" /> Tutup Vote & Buka Hasil
              </button>
            ) : (
              <button
                type="button"
                onClick={() => startRound(selectedDuration)}
                className="py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                {roomState.status === 'REVEAL' ? 'Ulangi Voting Ronde Ini' : 'Mulai Voting Ronde Ini'}
              </button>
            )}

            <button
              type="button"
              onClick={nextRound}
              disabled={currentIdx >= totalSlides - 1}
              className="py-3.5 px-4 bg-[#0560FD] hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-2xl font-bold text-sm shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lanjut Kasus Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Sub Navigation Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={prevRound}
              disabled={currentIdx === 0}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer border border-slate-300"
            >
              <ChevronLeft className="w-4 h-4" /> Kasus Sebelumnya
            </button>

            <button
              type="button"
              onClick={() => {
                if (confirm('Yakin ingin reset game ke awal (Lobby)? Semua data vote akan direset.')) {
                  resetAll();
                }
              }}
              className="px-3.5 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer border border-slate-300"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Game ke Awal
            </button>
          </div>
        </div>

        {/* Quick Slide Jumper */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 font-mono">
            <Layers className="w-4 h-4 text-[#0560FD]" /> Lompat Cepat ke Kasus Lain:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {SLIDES_DATA.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => jumpToRound(idx)}
                className={`p-3.5 rounded-2xl border text-left text-xs transition cursor-pointer flex flex-col justify-between ${
                  currentIdx === idx
                    ? 'bg-blue-50/70 border-[#0560FD] text-slate-900 font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase text-[#0560FD] font-mono">Kasus {idx + 1}</span>
                  {currentIdx === idx && <CheckCircle2 className="w-3.5 h-3.5 text-[#0560FD]" />}
                </div>
                <div className="line-clamp-1 font-sans font-semibold">{slide.title.split(':')[1] || slide.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Participants Manager List */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 font-mono">
            <Users className="w-4 h-4 text-[#0560FD]" /> Daftar Peserta Terhubung ({participantsList.length})
          </h3>
          {participantsList.length === 0 ? (
            <p className="text-xs text-slate-500 italic font-sans font-medium">Belum ada peserta yang mendaftar.</p>
          ) : (
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
              {participantsList.map((p) => {
                const voted = roomState.votes?.[p.id];
                return (
                  <div
                    key={p.id}
                    className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-center gap-2 font-medium"
                  >
                    <span className={`w-2 h-2 rounded-full ${voted ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                    <span className="font-bold text-slate-900 font-sans">{p.nickname}</span>
                    {voted && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 font-extrabold font-mono border border-blue-200">
                        Voted {voted}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

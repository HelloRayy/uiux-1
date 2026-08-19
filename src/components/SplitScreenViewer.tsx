import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RegisteredSlide } from '../data/slides';
import { CheckCircle2, XCircle, ThumbsUp } from 'lucide-react';

interface SplitScreenViewerProps {
  slide: RegisteredSlide;
  showExplanation?: boolean;
  showResults?: boolean;
  percentA?: number;
  percentB?: number;
  votesA?: number;
  votesB?: number;
  totalVotes?: number;
}

export const SplitScreenViewer: React.FC<SplitScreenViewerProps> = ({
  slide,
  showExplanation = false,
  showResults = false,
  percentA = 0,
  percentB = 0,
  votesA = 0,
  votesB = 0,
  totalVotes = 0,
}) => {
  const [mobileTab, setMobileTab] = useState<'A' | 'B'>('A');
  const Component = slide.Component;

  // Trigger confetti when results are displayed and there are votes
  useEffect(() => {
    if (showResults && totalVotes > 0) {
      try {
        confetti({
          particleCount: 60,
          spread: 55,
          origin: { y: 0.6 },
          colors: ['#0560FD', '#d97706', '#059669', '#3b82f6'],
        });
      } catch {
        // ignore
      }
    }
  }, [showResults, totalVotes]);

  const isWinnerA = showResults && totalVotes > 0 && votesA > votesB;
  const isWinnerB = showResults && totalVotes > 0 && votesB > votesA;

  // Clean title representation
  const cleanTitle = slide.title.includes(':')
    ? slide.title.split(':')[1]?.trim()
    : slide.title;

  return (
    <div className="w-full max-w-[1240px] mx-auto space-y-6 animate-fade-in font-sans">
      {/* FIXED HEADING CONTAINER */}
      <div className="w-full max-w-[900px] mx-auto text-center space-y-2 px-4">
        {/* Category Eyebrow Pill */}
        <div className="flex justify-center mb-1">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-slate-200 shadow-xs text-slate-800 text-xs font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0560FD]" />
            {slide.category}
          </span>
        </div>

        {/* Fixed Title (High contrast WCAG AAA compliant text) */}
        <h1 className="text-[32px] sm:text-[40px] font-bold text-slate-900 tracking-tight leading-[1.2]">
          {cleanTitle}
        </h1>

        {/* Fixed Subtitle (WCAG AA compliant slate-600) */}
        <p className="text-[16px] sm:text-[18px] text-slate-600 font-normal leading-[26px] max-w-[680px] mx-auto">
          {slide.description}
        </p>
      </div>

      {/* Mobile Segmented Control */}
      <div className="flex md:hidden justify-center px-4">
        <div className="bg-slate-200/80 p-1 rounded-xl flex w-full max-w-xs text-xs font-medium border border-slate-300">
          <button
            type="button"
            onClick={() => setMobileTab('A')}
            className={`flex-1 py-1.5 rounded-lg transition cursor-pointer ${
              mobileTab === 'A'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Desain A {showResults && `(${percentA}%)`}
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('B')}
            className={`flex-1 py-1.5 rounded-lg transition cursor-pointer ${
              mobileTab === 'B'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Desain B {showResults && `(${percentB}%)`}
          </button>
        </div>
      </div>

      {/* HIGH-CONTRAST PURE WHITE CARDS (548px width, 480px min-height, solid white surface) */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 w-full max-w-[1160px] mx-auto px-4">
        {/* CARD A */}
        <div
          className={`w-full md:w-[548px] min-h-[480px] flex-shrink-0 flex flex-col justify-between rounded-3xl bg-white text-slate-900 p-6 sm:p-7 transition-all duration-200 border shadow-xl shadow-slate-200/60 ${
            mobileTab !== 'A' ? 'hidden md:flex' : 'flex'
          } ${
            showExplanation
              ? slide.optionA.isCorrect
                ? 'border-emerald-500 ring-4 ring-emerald-500/20'
                : 'border-rose-400 ring-4 ring-rose-400/20'
              : showResults && isWinnerA
              ? 'border-[#0560FD] ring-4 ring-[#0560FD]/20 shadow-blue-500/15'
              : 'border-slate-200/90 hover:border-slate-300'
          }`}
        >
          {/* Top Card Navigation Bar */}
          <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-[#0560FD] text-white font-bold text-sm flex items-center justify-center gap-1 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-white inline-block" />
                <span>A</span>
              </span>
              <span className="text-sm font-bold text-slate-900">
                Desain A
              </span>
            </div>

            {/* Results or Best Practice Badge */}
            {showResults ? (
              <div className="flex items-center gap-2">
                {isWinnerA && (
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0560FD] text-[11px] font-bold flex items-center gap-1 border border-blue-200">
                    <ThumbsUp className="w-3 h-3" /> Terbanyak
                  </span>
                )}
                <div className="text-right">
                  <span className="text-2xl font-bold text-[#0560FD] block leading-none font-sans">
                    {totalVotes > 0 ? `${percentA}%` : '0%'}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5 font-medium">
                    {votesA} suara
                  </span>
                </div>
              </div>
            ) : showExplanation ? (
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                  slide.optionA.isCorrect
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    : 'bg-rose-50 text-rose-800 border border-rose-300'
                }`}
              >
                {slide.optionA.isCorrect ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                {slide.optionA.isCorrect ? 'Best Practice' : 'Anti-Pattern'}
              </span>
            ) : null}
          </div>

          {/* Centered UI/UX Design Canvas */}
          <div className="my-auto py-2 w-full flex-1 flex flex-col justify-center items-center">
            <Component variant="A" />
          </div>

          {/* Result Progress Bar */}
          {showResults && (
            <div className="mt-3 pt-2">
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0560FD] transition-all duration-700 ease-out rounded-full"
                  style={{ width: `${totalVotes > 0 ? percentA : 0}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* CARD B */}
        <div
          className={`w-full md:w-[548px] min-h-[480px] flex-shrink-0 flex flex-col justify-between rounded-3xl bg-white text-slate-900 p-6 sm:p-7 transition-all duration-200 border shadow-xl shadow-slate-200/60 ${
            mobileTab !== 'B' ? 'hidden md:flex' : 'flex'
          } ${
            showExplanation
              ? slide.optionB.isCorrect
                ? 'border-emerald-500 ring-4 ring-emerald-500/20'
                : 'border-rose-400 ring-4 ring-rose-400/20'
              : showResults && isWinnerB
              ? 'border-amber-500 ring-4 ring-amber-500/20 shadow-amber-500/15'
              : 'border-slate-200/90 hover:border-slate-300'
          }`}
        >
          {/* Top Card Navigation Bar */}
          <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-bold text-sm flex items-center justify-center gap-1 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-xs bg-white inline-block" />
                <span>B</span>
              </span>
              <span className="text-sm font-bold text-slate-900">
                Desain B
              </span>
            </div>

            {/* Results or Best Practice Badge */}
            {showResults ? (
              <div className="flex items-center gap-2">
                {isWinnerB && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold flex items-center gap-1 border border-amber-200">
                    <ThumbsUp className="w-3 h-3 text-amber-600" /> Terbanyak
                  </span>
                )}
                <div className="text-right">
                  <span className="text-2xl font-bold text-amber-600 block leading-none font-sans">
                    {totalVotes > 0 ? `${percentB}%` : '0%'}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5 font-medium">
                    {votesB} suara
                  </span>
                </div>
              </div>
            ) : showExplanation ? (
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                  slide.optionB.isCorrect
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    : 'bg-rose-50 text-rose-800 border border-rose-300'
                }`}
              >
                {slide.optionB.isCorrect ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                {slide.optionB.isCorrect ? 'Best Practice' : 'Anti-Pattern'}
              </span>
            ) : null}
          </div>

          {/* Centered UI/UX Design Canvas */}
          <div className="my-auto py-2 w-full flex-1 flex flex-col justify-center items-center">
            <Component variant="B" />
          </div>

          {/* Result Progress Bar */}
          {showResults && (
            <div className="mt-3 pt-2">
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-700 ease-out rounded-full"
                  style={{ width: `${totalVotes > 0 ? percentB : 0}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

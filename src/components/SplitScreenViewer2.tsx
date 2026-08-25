import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RegisteredSlide2 } from '../data/slides2';
import { CheckCircle2, AlertTriangle, Sparkles, BookOpen, GraduationCap, ThumbsUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface SplitScreenViewer2Props {
  slide: RegisteredSlide2;
  showExplanation?: boolean;
  showResults?: boolean;
  percentA?: number;
  percentB?: number;
  votesA?: number;
  votesB?: number;
  totalVotes?: number;
}

export const SplitScreenViewer2: React.FC<SplitScreenViewer2Props> = ({
  slide,
  showExplanation = false,
  showResults = false,
  percentA = 0,
  percentB = 0,
  votesA = 0,
  votesB = 0,
  totalVotes = 0,
}) => {
  const Component = slide.Component;

  // Trigger confetti when results are displayed and there are votes
  useEffect(() => {
    if (showResults && totalVotes > 0) {
      try {
        confetti({
          particleCount: 60,
          spread: 55,
          origin: { y: 0.6 },
          colors: ['#2563EB', '#4F46E5', '#059669', '#38BDF8'],
        });
      } catch {
        // ignore
      }
    }
  }, [showResults, totalVotes]);

  const isWinnerA = showResults && totalVotes > 0 && votesA > votesB;
  const isWinnerB = showResults && totalVotes > 0 && votesB > votesA;

  return (
    <div className="w-full max-w-[1240px] mx-auto space-y-6 animate-fade-in font-sans">
      {/* Header Container */}
      <div className="w-full max-w-[900px] mx-auto text-center space-y-2 px-4">
        <div className="flex justify-center mb-1">
          <Badge variant="outline" className="gap-1.5 px-3 py-1 font-semibold text-primary bg-primary/5 border-primary/20 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{slide.topic}</span>
          </Badge>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
          {slide.title}
        </h2>

        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {slide.description}
        </p>
      </div>

      {/* 2-Column Split Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
        {/* CARD A (DESAIN A) */}
        <Card
          className={`flex flex-col justify-between transition-all duration-300 rounded-2xl overflow-hidden border-2 ${
            showResults && slide.optionA.isCorrect
              ? 'border-emerald-500 bg-emerald-50/10 shadow-md ring-2 ring-emerald-500/20'
              : showResults && !slide.optionA.isCorrect
              ? 'border-rose-300/80 bg-rose-50/5'
              : 'border-slate-200 hover:border-slate-300 shadow-xs'
          }`}
        >
          {/* Card Header */}
          <CardHeader className="p-4 sm:p-5 pb-3 border-b border-border/60 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center shadow-xs">
                A
              </span>
              <div>
                <CardTitle className="text-sm font-bold text-foreground">
                  {slide.optionA.label}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  {slide.optionA.title}
                </CardDescription>
              </div>
            </div>

            {/* AI vs Human Badge on Reveal */}
            {showResults && (
              <Badge variant={slide.optionA.isCorrect ? 'success' : 'destructive'} className="font-mono text-[10px] uppercase">
                {slide.optionA.isCorrect ? '✨ Human Taste' : '⚠️ Raw AI'}
              </Badge>
            )}
          </CardHeader>

          {/* Interactive UI Mockup */}
          <CardContent className="p-4 sm:p-6 my-auto flex items-center justify-center min-h-[260px] bg-slate-50/50">
            <Component variant="A" />
          </CardContent>

          {/* Reveal Keypoints & Votes Bar */}
          {showResults && (
            <div className="p-4 sm:p-5 border-t border-border/80 space-y-3 bg-card">
              {/* Vote Percentage Result */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-foreground flex items-center gap-1">
                    {isWinnerA && <ThumbsUp className="w-3 h-3 text-primary" />}
                    {votesA} Suara ({percentA}%)
                  </span>
                  <span className="text-muted-foreground font-mono text-[10px]">
                    {slide.optionA.isCorrect ? 'Jawaban Terbaik' : 'Kelemahan AI'}
                  </span>
                </div>
                <Progress value={percentA} max={100} className="h-2 bg-muted" />
              </div>

              {/* Analysis Bullet Points */}
              <ul className="space-y-1.5 text-xs text-muted-foreground pt-1">
                {slide.optionA.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    {slide.optionA.isCorrect ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-500 mt-0.5 shrink-0" />
                    )}
                    <span className="leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>

        {/* CARD B (DESAIN B) */}
        <Card
          className={`flex flex-col justify-between transition-all duration-300 rounded-2xl overflow-hidden border-2 ${
            showResults && slide.optionB.isCorrect
              ? 'border-emerald-500 bg-emerald-50/10 shadow-md ring-2 ring-emerald-500/20'
              : showResults && !slide.optionB.isCorrect
              ? 'border-rose-300/80 bg-rose-50/5'
              : 'border-slate-200 hover:border-slate-300 shadow-xs'
          }`}
        >
          {/* Card Header */}
          <CardHeader className="p-4 sm:p-5 pb-3 border-b border-border/60 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                B
              </span>
              <div>
                <CardTitle className="text-sm font-bold text-foreground">
                  {slide.optionB.label}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  {slide.optionB.title}
                </CardDescription>
              </div>
            </div>

            {/* AI vs Human Badge on Reveal */}
            {showResults && (
              <Badge variant={slide.optionB.isCorrect ? 'success' : 'destructive'} className="font-mono text-[10px] uppercase">
                {slide.optionB.isCorrect ? '✨ Human Taste' : '⚠️ Raw AI'}
              </Badge>
            )}
          </CardHeader>

          {/* Interactive UI Mockup */}
          <CardContent className="p-4 sm:p-6 my-auto flex items-center justify-center min-h-[260px] bg-slate-50/50">
            <Component variant="B" />
          </CardContent>

          {/* Reveal Keypoints & Votes Bar */}
          {showResults && (
            <div className="p-4 sm:p-5 border-t border-border/80 space-y-3 bg-card">
              {/* Vote Percentage Result */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-foreground flex items-center gap-1">
                    {isWinnerB && <ThumbsUp className="w-3 h-3 text-indigo-600" />}
                    {votesB} Suara ({percentB}%)
                  </span>
                  <span className="text-muted-foreground font-mono text-[10px]">
                    {slide.optionB.isCorrect ? 'Jawaban Terbaik' : 'Kelemahan AI'}
                  </span>
                </div>
                <Progress value={percentB} max={100} className="h-2 bg-muted" />
              </div>

              {/* Analysis Bullet Points */}
              <ul className="space-y-1.5 text-xs text-muted-foreground pt-1">
                {slide.optionB.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    {slide.optionB.isCorrect ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-500 mt-0.5 shrink-0" />
                    )}
                    <span className="leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </div>

      {/* DETAILED MENTOR EXPLANATION ON REVEAL */}
      {showExplanation && (
        <Card className="p-5 sm:p-6 border-slate-300 bg-white shadow-sm space-y-4 rounded-2xl animate-fade-in">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <BookOpen className="w-4 h-4 text-primary" />
            <h3 className="text-sm sm:text-base font-bold text-foreground">
              Bedah Insight Mentor: Kenapa Human Taste Menang?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Why AI Failed */}
            <div className="p-3.5 bg-rose-50/60 border border-rose-200 rounded-xl space-y-1.5">
              <div className="font-bold text-rose-700 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Kelemahan Tipikal AI di Kasus Ini:</span>
              </div>
              <p className="text-rose-900/80 leading-relaxed">
                {slide.mentorExplanation.whyAIFailed}
              </p>
            </div>

            {/* How Human Fixed It */}
            <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1.5">
              <div className="font-bold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Solusi Sentuhan Human Taste:</span>
              </div>
              <p className="text-emerald-900/80 leading-relaxed">
                {slide.mentorExplanation.howHumanFixedIt}
              </p>
            </div>
          </div>

          {/* PJBL Application Note */}
          <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-xl flex items-start gap-2.5 text-xs text-blue-900">
            <GraduationCap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Penerapan di Tugas PJBL Siswa: </strong>
              <span>{slide.mentorExplanation.pjblApplication}</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

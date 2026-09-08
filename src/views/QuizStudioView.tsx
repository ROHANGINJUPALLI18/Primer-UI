import React, { useState } from 'react';
import { 
  type OfficialDetail, 
  generateQuizFromDocument, 
  getNextQuestion, 
  submitQuizAnswer, 
  getSessionSummary, 
  type QuizQuestion, 
  type AnswerResponse, 
  type SessionSummary,
  resetSimulatedSession
} from '../services/api';
import confetti from 'canvas-confetti';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  Brain 
} from 'lucide-react';

interface QuizStudioViewProps {
  official: OfficialDetail;
  setCurrentTab: (tab: string) => void;
}

export const QuizStudioView: React.FC<QuizStudioViewProps> = ({ official, setCurrentTab }) => {
  // Wizard Stages: 'upload' | 'active' | 'summary'
  const [stage, setStage] = useState<'upload' | 'active' | 'summary'>('upload');
  
  // Upload State
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active Quiz State
  const [sessionId, setSessionId] = useState<string>('');
  const [quizTitle, setQuizTitle] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerResult, setAnswerResult] = useState<AnswerResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [questionCount, setQuestionCount] = useState(1);

  // Summary State
  const [summary, setSummary] = useState<SessionSummary | null>(null);

  // Pre-seeded MoSPI Sample Manuals for 1-click convenience
  const sampleManuals = [
    {
      name: 'Foundations_of_Survey_Design_for_Official_Statistics.pdf',
      title: 'Survey Design & Sampling Architecture',
      pages: '48 pages',
      domain: 'Statistical Methodology'
    },
    {
      name: 'Advanced_Sample_Survey_Design_Complete_Manual.pdf',
      title: 'Weight Calibration & Small Area Estimation',
      pages: '64 pages',
      domain: 'Advanced Statistics'
    },
    {
      name: 'Professional_Communication_for_Government_Officials.pdf',
      title: 'Inter-Ministerial Briefings & Reporting',
      pages: '32 pages',
      domain: 'Behavioural Leadership'
    },
    {
      name: 'Project_Management_for_Government_Programmes.pdf',
      title: 'MoSPI Scheme Monitoring & Audit',
      pages: '40 pages',
      domain: 'Governance & Execution'
    }
  ];

  // Handler for uploading or selecting a sample document
  const handleStartWithFile = async (file: File) => {
    setUploading(true);
    setErrorMessage(null);
    resetSimulatedSession();

    try {
      const res = await generateQuizFromDocument(file, official.id);
      setSessionId(res.session_id);
      setQuizTitle(res.title);

      // Fetch the first question
      const firstQ = await getNextQuestion(res.session_id);
      if ('question' in firstQ) {
        setCurrentQuestion(firstQ);
        setQuestionCount(1);
        setStage('active');
      } else {
        throw new Error('No questions available in this session.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to generate quiz from document.');
    } finally {
      setUploading(false);
    }
  };

  const handleSelectSample = (sampleName: string) => {
    // Create synthetic file object for sample
    const mockFile = new File(['%PDF-1.4 sample content for MoSPI training'], sampleName, {
      type: 'application/pdf'
    });
    setSelectedFileName(sampleName);
    handleStartWithFile(mockFile);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFileName(file.name);
      handleStartWithFile(file);
    }
  };

  // Submit current answer
  const handleSubmitAnswer = async () => {
    if (!selectedOption || !currentQuestion) return;

    setSubmitting(true);
    try {
      const res = await submitQuizAnswer({
        session_id: sessionId,
        question_id: currentQuestion.question_id,
        selected_option: selectedOption,
      });
      setAnswerResult(res);
    } catch (err: any) {
      console.error('Answer submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Advance to next question or show summary
  const handleNextQuestion = async () => {
    if (!answerResult) return;

    if (answerResult.session_status === 'completed') {
      // Completed!
      const sum = await getSessionSummary(sessionId);
      setSummary(sum);
      setStage('summary');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      return;
    }

    // Fetch next
    setSelectedOption(null);
    setAnswerResult(null);
    try {
      const nextQ = await getNextQuestion(sessionId);
      if ('question' in nextQ) {
        setCurrentQuestion(nextQ);
        setQuestionCount(prev => prev + 1);
      } else {
        const sum = await getSessionSummary(sessionId);
        setSummary(sum);
        setStage('summary');
        confetti({ particleCount: 80, spread: 70 });
      }
    } catch (err) {
      console.error('Failed to load next question:', err);
    }
  };

  return (
    <div className="space-y-12">
      {/* ------------------------------------------------------------- */}
      {/* STAGE 1: UPLOAD & SAMPLE SELECTOR                             */}
      {/* ------------------------------------------------------------- */}
      {stage === 'upload' && (
        <div className="space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="mc-eyebrow mb-2">
                <span className="mc-eyebrow-dot" />
                <span>ADAPTIVE DIAGNOSTIC LAB</span>
              </div>
              <h1 className="text-[var(--mc-ink)] text-3xl sm:text-5xl font-medium tracking-tight">
                AI Quiz Engine
              </h1>
              <p className="text-[var(--mc-granite)] text-base sm:text-lg max-w-2xl mt-2 font-normal">
                Upload training manuals or select standard MoSPI course material. The AI dynamically crafts questions, diagnoses knowledge gaps, and injects real-time remediation.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[var(--mc-border-light)] self-start md:self-auto text-xs font-semibold text-[var(--mc-granite)]">
              <span>Candidate:</span>
              <span className="text-[var(--mc-ink)]">{official.name}</span>
            </div>
          </div>

          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="bg-white rounded-[40px] p-12 sm:p-16 border-2 border-dashed border-[var(--mc-border-light)] hover:border-[var(--mc-ink)] text-center transition-all cursor-pointer shadow-xs group"
          >
            <div className="max-w-md mx-auto flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[var(--mc-canvas)] text-[var(--mc-ink)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-10 h-10 text-[var(--mc-signal-orange)]" />
              </div>

              <h3 className="text-2xl font-medium text-[var(--mc-ink)] mb-2">
                Drop your training material here
              </h3>
              <p className="text-sm text-[var(--mc-slate-gray)] mb-6">
                Supports official PDF or PPTX manuals. The AI parses tables, formulas, and definitions.
              </p>

              <label className="mc-btn-primary cursor-pointer">
                <span>Browse Local Document</span>
                <input
                  type="file"
                  accept=".pdf,.pptx"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setSelectedFileName(file.name);
                      handleStartWithFile(file);
                    }
                  }}
                />
              </label>

              {uploading && (
                <div className="mt-6 flex items-center gap-3 text-sm text-[var(--mc-granite)]">
                  <div className="w-4 h-4 border-2 border-[var(--mc-ink)] border-t-transparent rounded-full animate-spin" />
                  <span>Parsing {selectedFileName || 'document'} and synthesizing adaptive question tree...</span>
                </div>
              )}

              {errorMessage && (
                <div className="mt-4 p-3 rounded-2xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>
          </div>

          {/* 1-Click Sample MoSPI Manuals */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-medium text-[var(--mc-ink)]">
                  Or Test with Pre-Loaded MoSPI Manuals
                </h3>
                <p className="text-xs text-[var(--mc-slate-gray)] mt-0.5">
                  Extracted directly from backend/Sample_materials for instant testing
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--mc-canvas)] text-[var(--mc-granite)]">
                1-Click Launch
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sampleManuals.map((manual) => (
                <div
                  key={manual.name}
                  onClick={() => handleSelectSample(manual.name)}
                  className="mc-card-lifted p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-[var(--mc-ink)] text-white flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[var(--mc-light-orange)]" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--mc-canvas)] text-[var(--mc-slate-gray)]">
                        {manual.pages}
                      </span>
                    </div>

                    <h4 className="text-base font-medium text-[var(--mc-ink)] mb-1 group-hover:text-[var(--mc-signal-orange)] transition-colors">
                      {manual.title}
                    </h4>
                    <p className="text-xs text-[var(--mc-slate-gray)]">
                      {manual.domain}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[var(--mc-ink)]">
                    <span>Generate Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* STAGE 2: ACTIVE ADAPTIVE QUIZ SESSION                         */}
      {/* ------------------------------------------------------------- */}
      {stage === 'active' && currentQuestion && (
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--mc-border-light)]">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[var(--mc-canvas)] text-[var(--mc-granite)]">
                Question {questionCount}
              </span>
              <span className="text-xs text-[var(--mc-slate-gray)] font-medium">
                {quizTitle}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Difficulty Badge */}
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                currentQuestion.difficulty === 'Advanced'
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : currentQuestion.difficulty === 'Intermediate'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                Level: {currentQuestion.difficulty}
              </span>

              {/* Remedial Indicator */}
              {currentQuestion.is_remedial && (
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#FFF5F2] text-[var(--mc-signal-orange)] border border-[var(--mc-signal-orange)]/30 flex items-center gap-1">
                  <Brain className="w-3 h-3" />
                  Remedial Check
                </span>
              )}
            </div>
          </div>

          {/* Remedial Notice Alert */}
          {currentQuestion.is_remedial && (
            <div className="p-4 rounded-2xl bg-[#FFF5F2] border border-[var(--mc-signal-orange)]/20 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[var(--mc-signal-orange)] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mc-signal-orange)]">
                  Remedial Intervention Triggered
                </h4>
                <p className="text-xs text-[var(--mc-granite)] mt-0.5">
                  The AI detected conceptual ambiguity in previous responses. This foundational check reinforces core principles before advancing.
                </p>
              </div>
            </div>
          )}

          {/* Question Card */}
          <div className="bg-white rounded-[36px] p-8 sm:p-10 border border-[var(--mc-border-light)] shadow-sm">
            {/* Target Competency */}
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--mc-slate-gray)]">
                Target Competency: <strong className="text-[var(--mc-ink)]">{currentQuestion.competency_name}</strong>
              </span>
            </div>

            {/* Question Statement */}
            <h2 className="text-xl sm:text-2xl font-medium text-[var(--mc-ink)] leading-snug mb-8">
              {currentQuestion.question}
            </h2>

            {/* Radio Options in Mastercard Pill Cards */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === option;
                const isAnswered = answerResult !== null;
                const isCorrect = isAnswered && option === answerResult.correct_option;
                const isWrong = isAnswered && isSelected && !answerResult.is_correct;

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => setSelectedOption(option)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer ${
                      isCorrect
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium'
                        : isWrong
                          ? 'bg-red-50 border-red-400 text-red-950 font-medium'
                          : isSelected
                            ? 'bg-[var(--mc-canvas)] border-[var(--mc-ink)] text-[var(--mc-ink)] font-medium shadow-xs'
                            : 'bg-white hover:bg-gray-50 border-gray-200 text-[var(--mc-granite)]'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isCorrect
                        ? 'bg-emerald-600 text-white'
                        : isWrong
                          ? 'bg-red-600 text-white'
                          : isSelected
                            ? 'bg-[var(--mc-ink)] text-white'
                            : 'border border-gray-300 text-gray-500'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-sm leading-relaxed flex-1">
                      {option}
                    </span>
                    {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                    {isWrong && <XCircle className="w-5 h-5 text-red-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Action Row: Submit or Next */}
            {!answerResult ? (
              <div className="flex justify-end">
                <button
                  disabled={!selectedOption || submitting}
                  onClick={handleSubmitAnswer}
                  className={`mc-btn-primary px-8 ${
                    !selectedOption || submitting ? 'opacity-40 cursor-not-allowed' : ''
                  }`}
                >
                  {submitting ? 'Verifying...' : 'Submit Answer'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Answer Feedback Banner */
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <div className={`p-5 rounded-2xl border ${
                  answerResult.is_correct
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-[#FFF5F2] border-[var(--mc-signal-orange)]/30 text-amber-950'
                }`}>
                  <div className="flex items-center gap-2 font-semibold text-sm mb-1">
                    {answerResult.is_correct ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Correct Analysis</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-[var(--mc-signal-orange)]" />
                        <span>Conceptual Discrepancy</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    {answerResult.explanation}
                  </p>
                  
                  {/* Dynamic Action Cue */}
                  <div className="mt-3 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-semibold">
                    <span>Engine Response:</span>
                    <span className="uppercase tracking-wider">
                      {answerResult.action === 'escalate' && '⚡ Escalating Difficulty'}
                      {answerResult.action === 'remediate' && '🔄 Routing to Remedial Topic'}
                      {answerResult.action === 'continue' && '➡️ Continuing Progression'}
                      {answerResult.action === 'session_complete' && '🏁 Assessment Completed'}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="mc-btn-primary px-8"
                  >
                    <span>{answerResult.session_status === 'completed' ? 'View Final Report' : 'Next Question'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* STAGE 3: COMPLETION & MASTERY SUMMARY                         */}
      {/* ------------------------------------------------------------- */}
      {stage === 'summary' && summary && (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-white rounded-[40px] p-8 sm:p-12 border border-[var(--mc-border-light)] text-center shadow-lg">
            <div className="w-20 h-20 rounded-full bg-[var(--mc-ink)] text-white flex items-center justify-center mx-auto mb-6 shadow-md">
              <Award className="w-10 h-10 text-[var(--mc-yellow)]" />
            </div>

            <h2 className="text-3xl font-medium text-[var(--mc-ink)] mb-2">
              Diagnostic Session Concluded
            </h2>
            <p className="text-sm text-[var(--mc-slate-gray)] max-w-md mx-auto mb-8">
              Adaptive assessment metrics have been synchronized with your profile and Neon database scores.
            </p>

            {/* Score Ring / Pill */}
            <div className="inline-flex items-center gap-6 px-8 py-4 rounded-full bg-[var(--mc-canvas)] mb-8">
              <div>
                <div className="text-3xl font-bold text-[var(--mc-ink)]">
                  {summary.score} / {summary.total}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--mc-slate-gray)] font-bold">
                  Score Attained
                </div>
              </div>
              <div className="w-px h-8 bg-gray-300" />
              <div>
                <div className="text-3xl font-bold text-emerald-600">
                  {Math.round((summary.score / summary.total) * 100)}%
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--mc-slate-gray)] font-bold">
                  Proficiency Rating
                </div>
              </div>
            </div>

            {/* Mastered vs Needing Practice */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Concepts Mastered (+10 pts)
                </h4>
                <ul className="text-xs text-emerald-950 space-y-1.5 font-medium">
                  {summary.concepts_mastered.map((c, i) => (
                    <li key={i}>• {c}</li>
                  ))}
                  {summary.concepts_mastered.length === 0 && (
                    <li className="text-gray-500 italic">No concepts mastered this round.</li>
                  )}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Needs Reinforcement
                </h4>
                <ul className="text-xs text-amber-950 space-y-1.5 font-medium">
                  {summary.concepts_needing_practice.map((c, i) => (
                    <li key={i}>• {c}</li>
                  ))}
                  {summary.concepts_needing_practice.length === 0 && (
                    <li className="text-gray-500 italic">No remaining deficiencies!</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setStage('upload')}
                className="mc-btn-secondary"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Test Another Document</span>
              </button>

              <button
                onClick={() => setCurrentTab('competencies')}
                className="mc-btn-primary"
              >
                <span>Review Updated Competency Radar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

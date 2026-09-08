import React, { useState, useEffect } from 'react';
import { type OfficialDetail, type CompetencyGap, fetchCompetencyGaps } from '../services/api';
import { Target, ArrowRight, Filter, Sparkles, CheckCircle, AlertCircle, Award } from 'lucide-react';

interface CompetencyViewProps {
  official: OfficialDetail;
  setCurrentTab: (tab: string) => void;
}

export const CompetencyView: React.FC<CompetencyViewProps> = ({ official, setCurrentTab }) => {
  const [gaps, setGaps] = useState<CompetencyGap[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState<string>('All');

  useEffect(() => {
    async function loadGaps() {
      setLoading(true);
      try {
        const data = await fetchCompetencyGaps(official.id);
        setGaps(data);
      } catch (err) {
        console.error('Failed to load gaps:', err);
      } finally {
        setLoading(false);
      }
    }
    loadGaps();
  }, [official.id]);

  const domains = ['All', 'Statistical', 'Technical', 'DigitalGovernance', 'Behavioural'];

  const filteredGaps = selectedDomain === 'All' 
    ? gaps 
    : gaps.filter(g => g.domain.toLowerCase() === selectedDomain.toLowerCase());

  // Aggregate stats
  const criticalGaps = gaps.filter(g => g.gap >= 20).length;
  const averageScore = gaps.length > 0 
    ? Math.round(gaps.reduce((acc, curr) => acc + curr.score, 0) / gaps.length) 
    : 0;

  return (
    <div className="space-y-12">
      {/* Header & Official Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="mc-eyebrow mb-2">
            <span className="mc-eyebrow-dot" />
            <span>COMPETENCY BENCHMARK ENGINE</span>
          </div>
          <h1 className="text-[var(--mc-ink)] text-3xl sm:text-5xl font-medium tracking-tight">
            Competency Gap Analysis
          </h1>
          <p className="text-[var(--mc-granite)] text-base sm:text-lg max-w-2xl mt-2 font-normal">
            Calibrated against the 33 official competency descriptors defined for MoSPI Indian Statistical Service cadres.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setCurrentTab('recommendations')}
          className="mc-btn-primary self-start md:self-auto shrink-0"
        >
          <span>View Matched iGOT Courses</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Metric Callout Cards in Lifted Surface */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="mc-card-lifted p-6 flex items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-[var(--mc-ink)] text-white flex items-center justify-center shrink-0">
            <Target className="w-6 h-6 text-[var(--mc-light-orange)]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--mc-ink)]">{averageScore}%</div>
            <div className="text-xs uppercase tracking-wider text-[var(--mc-slate-gray)] font-semibold mt-0.5">
              Current Average Score
            </div>
          </div>
        </div>

        <div className="mc-card-lifted p-6 flex items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-[#FFF5F2] text-[var(--mc-signal-orange)] flex items-center justify-center shrink-0 border border-[var(--mc-signal-orange)]/20">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--mc-signal-orange)]">{criticalGaps} High Priority</div>
            <div className="text-xs uppercase tracking-wider text-[var(--mc-slate-gray)] font-semibold mt-0.5">
              Gaps Exceeding 20 Points
            </div>
          </div>
        </div>

        <div className="mc-card-lifted p-6 flex items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-[#F5F8FF] text-[var(--mc-link-blue)] flex items-center justify-center shrink-0 border border-[var(--mc-link-blue)]/20">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--mc-ink)]">80.0 Benchmark</div>
            <div className="text-xs uppercase tracking-wider text-[var(--mc-slate-gray)] font-semibold mt-0.5">
              Target Cadre Proficiency
            </div>
          </div>
        </div>
      </div>

      {/* Domain Filters (Mastercard Rounded Pills) */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-[var(--mc-border-light)] pb-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase text-[var(--mc-slate-gray)] mr-3 tracking-wider">
          <Filter className="w-3.5 h-3.5" />
          <span>Domain Filter:</span>
        </div>
        {domains.map((domain) => {
          const isActive = selectedDomain === domain;
          return (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                isActive
                  ? 'bg-[var(--mc-ink)] text-white shadow-xs'
                  : 'bg-white hover:bg-white/80 text-[var(--mc-granite)] border border-[var(--mc-border-light)]'
              }`}
            >
              {domain}
            </button>
          );
        })}
      </div>

      {/* Competencies Grid */}
      {loading ? (
        <div className="py-20 text-center text-[var(--mc-slate-gray)]">
          <div className="inline-block w-8 h-8 border-3 border-[var(--mc-ink)] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm">Calculating official competency matrix...</p>
        </div>
      ) : filteredGaps.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl p-8 border border-[var(--mc-border-light)]">
          <p className="text-base text-[var(--mc-granite)]">No competencies recorded under this domain.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGaps.map((item) => {
            const hasCriticalGap = item.gap >= 20;
            const isMastered = item.score >= item.target_score;

            return (
              <div
                key={item.competency_id}
                className="bg-white rounded-[32px] p-7 border border-[var(--mc-border-light)] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Domain & Gap Pill */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--mc-canvas)] text-[var(--mc-granite)]">
                      {item.domain}
                    </span>

                    {hasCriticalGap ? (
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#FFF5F2] text-[var(--mc-signal-orange)] border border-[var(--mc-signal-orange)]/30">
                        Critical Gap: -{Math.round(item.gap)} pts
                      </span>
                    ) : isMastered ? (
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Proficient
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                        Gap: -{Math.round(item.gap)} pts
                      </span>
                    )}
                  </div>

                  {/* Competency Name */}
                  <h3 className="text-lg font-medium text-[var(--mc-ink)] mb-4">
                    {item.name}
                  </h3>

                  {/* Score Meter */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[var(--mc-slate-gray)]">Current: {Math.round(item.score)}</span>
                      <span className="text-[var(--mc-ink)]">Benchmark: {Math.round(item.target_score)}</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-[var(--mc-canvas)] rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(item.score, 100)}%`,
                          backgroundColor: hasCriticalGap 
                            ? 'var(--mc-signal-orange)' 
                            : isMastered 
                              ? '#10B981' 
                              : 'var(--mc-ink)'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setCurrentTab('quiz')}
                    className="text-xs font-medium text-[var(--mc-ink)] hover:text-[var(--mc-signal-orange)] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[var(--mc-light-orange)]" />
                    <span>Run Diagnostic Quiz</span>
                  </button>

                  <button
                    onClick={() => setCurrentTab('recommendations')}
                    className="text-xs font-medium text-[var(--mc-link-blue)] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Match Courses</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

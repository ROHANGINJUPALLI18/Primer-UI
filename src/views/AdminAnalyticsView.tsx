import React, { useState, useEffect } from 'react';
import { type AdminDashboardData, fetchAdminDashboard } from '../services/api';
import { Users, TrendingUp, Award, Layers } from 'lucide-react';

export const AdminAnalyticsView: React.FC = () => {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAdmin() {
      setLoading(true);
      try {
        const res = await fetchAdminDashboard();
        setData(res);
      } catch (err) {
        console.error('Failed to load admin dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAdmin();
  }, []);

  if (loading || !data) {
    return (
      <div className="py-24 text-center text-[var(--mc-slate-gray)]">
        <div className="inline-block w-8 h-8 border-3 border-[var(--mc-ink)] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm">Aggregating ministry-wide competency analytics...</p>
      </div>
    );
  }

  const domainColors: Record<string, string> = {
    'Technical': 'var(--mc-signal-orange)',
    'DigitalGovernance': 'var(--mc-light-orange)',
    'Statistical': 'var(--mc-ink)',
    'Behavioural': 'var(--mc-slate-gray)'
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <div className="mc-eyebrow mb-2">
          <span className="mc-eyebrow-dot" />
          <span>NATIONAL CAPACITY DIRECTORY</span>
        </div>
        <h1 className="text-[var(--mc-ink)] text-3xl sm:text-5xl font-medium tracking-tight">
          Leadership & Cadre Analytics
        </h1>
        <p className="text-[var(--mc-granite)] text-base sm:text-lg max-w-2xl mt-2 font-normal">
          Ministry-wide competency health metrics and strategic training allocation projections for NSSTA leadership.
        </p>
      </div>

      {/* Top Metric Cards in Lifted Surface */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="mc-card-lifted p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--mc-ink)] text-white flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-[var(--mc-light-orange)]" />
          </div>
          <div>
            <div className="text-3xl font-bold text-[var(--mc-ink)]">{data.total_officials}</div>
            <div className="text-xs uppercase tracking-wider text-[var(--mc-slate-gray)] font-semibold mt-0.5">
              Enrolled Officials
            </div>
          </div>
        </div>

        <div className="mc-card-lifted p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FFF5F2] text-[var(--mc-signal-orange)] flex items-center justify-center shrink-0 border border-[var(--mc-signal-orange)]/20">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-bold text-[var(--mc-signal-orange)]">
              {data.projected_training_priority[0] || 'Technical'}
            </div>
            <div className="text-xs uppercase tracking-wider text-[var(--mc-slate-gray)] font-semibold mt-0.5">
              #1 Cadre Deficit
            </div>
          </div>
        </div>

        <div className="mc-card-lifted p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#F5F8FF] text-[var(--mc-link-blue)] flex items-center justify-center shrink-0 border border-[var(--mc-link-blue)]/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-bold text-[var(--mc-ink)]">33 Core</div>
            <div className="text-xs uppercase tracking-wider text-[var(--mc-slate-gray)] font-semibold mt-0.5">
              Mapped Competencies
            </div>
          </div>
        </div>

        <div className="mc-card-lifted p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-800">iGOT / NSSTA</div>
            <div className="text-xs uppercase tracking-wider text-[var(--mc-slate-gray)] font-semibold mt-0.5">
              Dual Repository
            </div>
          </div>
        </div>
      </div>

      {/* Main Analysis: Domain Gap Bars & Projected Training Priorities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Average Gap by Domain */}
        <div className="lg:col-span-2 bg-white rounded-[36px] p-8 sm:p-10 border border-[var(--mc-border-light)] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-medium text-[var(--mc-ink)]">
                Average Competency Gap by Domain
              </h3>
              <p className="text-xs text-[var(--mc-slate-gray)] mt-1">
                Points below the 80.0 standard target score across all monitored divisions
              </p>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--mc-canvas)] text-[var(--mc-granite)]">
              Org-Wide
            </span>
          </div>

          {/* Bars */}
          <div className="space-y-6">
            {Object.entries(data.avg_gap_by_domain).map(([domain, avgGap]) => {
              const color = domainColors[domain] || 'var(--mc-ink)';
              const percentageOfMax = Math.min((avgGap / 35) * 100, 100);

              return (
                <div key={domain} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-[var(--mc-ink)]">{domain}</span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--mc-canvas)]" style={{ color }}>
                      -{avgGap} pts deficit
                    </span>
                  </div>
                  <div className="w-full h-4 bg-[var(--mc-canvas)] rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${percentageOfMax}%`,
                        backgroundColor: color
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Projected Training Priorities */}
        <div className="bg-white rounded-[36px] p-8 border border-[var(--mc-border-light)] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[var(--mc-signal-orange)]" />
              <h3 className="text-xl font-medium text-[var(--mc-ink)]">
                Projected Curriculum Priorities
              </h3>
            </div>
            <p className="text-xs text-[var(--mc-slate-gray)] mb-6 leading-relaxed">
              Recommended training focus order for NSSTA batch schedule in the upcoming fiscal quarter.
            </p>

            <div className="space-y-3">
              {data.projected_training_priority.map((domain, idx) => (
                <div
                  key={domain}
                  className="p-4 rounded-2xl bg-[var(--mc-surface-lifted)] border border-[var(--mc-border-light)] flex items-center gap-3"
                >
                  <div className="w-7 h-7 rounded-full bg-[var(--mc-ink)] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--mc-ink)]">
                      {domain}
                    </div>
                    <div className="text-[11px] text-[var(--mc-slate-gray)]">
                      {idx === 0 && 'Immediate intervention required'}
                      {idx === 1 && 'High cohort enrollment gap'}
                      {idx === 2 && 'Standard periodic refresh'}
                      {idx >= 3 && 'Baseline maintained'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-[var(--mc-granite)]">
            <span className="font-semibold text-[var(--mc-ink)]">DoPT Compliance:</span> All projected courses map to National Training Policy norms.
          </div>
        </div>
      </div>
    </div>
  );
};

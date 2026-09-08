import React from 'react';
import type { OfficialDetail } from '../services/api';
import { ArrowRight, Sparkles, Target, BookOpen, Brain, BarChart3 } from 'lucide-react';

interface OverviewViewProps {
  official: OfficialDetail;
  setCurrentTab: (tab: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ official, setCurrentTab }) => {
  return (
    <div className="space-y-24">
      {/* 1. Mastercard Signature Stadium Hero Media Frame (40px corners) */}
      <section className="mc-stadium-hero p-8 sm:p-14 lg:p-20 relative overflow-hidden">
        {/* Ambient atmospheric lighting behind dark stadium */}
        <div 
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: 'var(--mc-light-orange)' }}
        />
        <div 
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-15"
          style={{ backgroundColor: 'var(--mc-yellow)' }}
        />

        <div className="relative z-10 max-w-4xl">
          {/* Eyebrow label with tiny dot */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white text-xs font-semibold tracking-wider uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--mc-light-orange)] animate-pulse" />
            <span>AI Capacity Framework • Mission Karmayogi</span>
          </div>

          <h1 className="text-white text-4xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.02em] leading-[1.04] mb-8">
            Precision competency intelligence for India's statistical vanguard.
          </h1>

          <p className="text-white/80 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mb-12">
            Targeted skill gap diagnosis, personalized course matching across iGOT and NSSTA, and generative adaptive assessments calibrated specifically for MoSPI officials.
          </p>

          {/* Action CTAs in Mastercard Pill Format */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setCurrentTab('competencies')}
              className="px-8 py-3.5 rounded-[20px] bg-white text-[var(--mc-ink)] font-medium text-base hover:bg-[var(--mc-canvas)] transition-all flex items-center gap-2.5 cursor-pointer shadow-sm group"
            >
              <span>Explore My Skill Gaps</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setCurrentTab('quiz')}
              className="px-8 py-3.5 rounded-[20px] bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium text-base transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[var(--mc-yellow)]" />
              <span>Launch Adaptive Quiz</span>
            </button>

            <div className="w-full sm:w-auto mt-2 sm:mt-0 flex items-center gap-3 text-xs text-white/60 sm:ml-4">
              <span>Current Profile:</span>
              <span className="font-semibold text-white bg-white/10 px-3 py-1 rounded-full border border-white/10">
                {official.name} ({official.designation})
              </span>
            </div>
          </div>
        </div>

        {/* Floating Quick Metric Badges in Hero */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
          <div>
            <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">33</div>
            <div className="text-xs uppercase tracking-wider text-white/60 mt-1 font-medium">Curated Competencies</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">38</div>
            <div className="text-xs uppercase tracking-wider text-white/60 mt-1 font-medium">iGOT & NSSTA Courses</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">6</div>
            <div className="text-xs uppercase tracking-wider text-white/60 mt-1 font-medium">MoSPI Cadre Profiles</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-semibold text-[var(--mc-light-orange)] tracking-tight">100%</div>
            <div className="text-xs uppercase tracking-wider text-white/60 mt-1 font-medium">Adaptive Remediation</div>
          </div>
        </div>
      </section>

      {/* 2. Mastercard Constellation Section with Circular Portraits & Satellite CTAs */}
      <section className="relative">
        {/* Layered Ghost Watermark Typography */}
        <div className="absolute top-0 right-0 mc-watermark-text select-none">
          CAPACITY
        </div>

        <div className="mb-14 relative z-10">
          <div className="mc-eyebrow mb-3">
            <span className="mc-eyebrow-dot" />
            <span>INTELLIGENCE ECOSYSTEM</span>
          </div>
          <h2 className="text-[var(--mc-ink)] text-3xl sm:text-4xl font-medium tracking-tight">
            Four pillars of official statistical modernization.
          </h2>
          <p className="text-[var(--mc-granite)] text-base sm:text-lg max-w-2xl mt-2 font-normal">
            Every module is dynamically synchronized with the official's administrative cadre level and past training history.
          </p>
        </div>

        {/* Constellation Grid with Orbital Connective Arcs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {/* Card 1: Statistical Methodology */}
          <div 
            onClick={() => setCurrentTab('competencies')}
            className="mc-card-lifted p-7 flex flex-col items-center text-center cursor-pointer group"
          >
            <div className="mc-portrait-wrapper mb-6">
              <div className="mc-portrait-circle w-52 h-52 bg-gradient-to-br from-[#FFF9F3] to-[#F5EBE1]">
                <div className="flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 rounded-full bg-[var(--mc-ink)] text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Target className="w-8 h-8 text-[var(--mc-light-orange)]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--mc-signal-orange)]">
                    10 Competencies
                  </span>
                </div>
              </div>
              {/* Attached White Satellite Micro-CTA */}
              <div className="mc-satellite-cta">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            <h3 className="text-xl font-medium text-[var(--mc-ink)] mb-2">
              Statistical Methodology
            </h3>
            <p className="text-sm text-[var(--mc-granite)] leading-relaxed">
              Sample survey design, weight calibration, small area estimation, and national accounts modeling.
            </p>
          </div>

          {/* Card 2: Modern Data Science & Python */}
          <div 
            onClick={() => setCurrentTab('recommendations')}
            className="mc-card-lifted p-7 flex flex-col items-center text-center cursor-pointer group"
          >
            <div className="mc-portrait-wrapper mb-6">
              <div className="mc-portrait-circle w-52 h-52 bg-gradient-to-br from-[#F5F8FF] to-[#E9EFFC]">
                <div className="flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 rounded-full bg-[var(--mc-ink)] text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-8 h-8 text-[var(--mc-link-blue)]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--mc-link-blue)]">
                    12 Competencies
                  </span>
                </div>
              </div>
              <div className="mc-satellite-cta">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            <h3 className="text-xl font-medium text-[var(--mc-ink)] mb-2">
              Technical & Data Science
            </h3>
            <p className="text-sm text-[var(--mc-granite)] leading-relaxed">
              Automated ETL with Python, R for survey processing, SQL data lakes, and Power BI dashboards.
            </p>
          </div>

          {/* Card 3: Digital Governance & DPDP */}
          <div 
            onClick={() => setCurrentTab('quiz')}
            className="mc-card-lifted p-7 flex flex-col items-center text-center cursor-pointer group"
          >
            <div className="mc-portrait-wrapper mb-6">
              <div className="mc-portrait-circle w-52 h-52 bg-gradient-to-br from-[#FFF5F2] to-[#FCEAE5]">
                <div className="flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 rounded-full bg-[var(--mc-ink)] text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Brain className="w-8 h-8 text-[var(--mc-signal-orange)]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--mc-signal-orange)]">
                    Adaptive AI
                  </span>
                </div>
              </div>
              <div className="mc-satellite-cta">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            <h3 className="text-xl font-medium text-[var(--mc-ink)] mb-2">
              Adaptive Quiz Studio
            </h3>
            <p className="text-sm text-[var(--mc-granite)] leading-relaxed">
              Upload official manuals or policy drafts to generate instant diagnostic quizzes with real-time escalation.
            </p>
          </div>

          {/* Card 4: Macro Cadre Analytics */}
          <div 
            onClick={() => setCurrentTab('admin')}
            className="mc-card-lifted p-7 flex flex-col items-center text-center cursor-pointer group"
          >
            <div className="mc-portrait-wrapper mb-6">
              <div className="mc-portrait-circle w-52 h-52 bg-gradient-to-br from-[#F5FFF8] to-[#E5F7EB]">
                <div className="flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 rounded-full bg-[var(--mc-ink)] text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Cadre Macro View
                  </span>
                </div>
              </div>
              <div className="mc-satellite-cta">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            <h3 className="text-xl font-medium text-[var(--mc-ink)] mb-2">
              Leadership Analytics
            </h3>
            <p className="text-sm text-[var(--mc-granite)] leading-relaxed">
              Organization-wide competency distributions and projected capacity development priorities for NSSTA.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Featured Cadre Profile Banner */}
      <section className="bg-white rounded-[40px] p-8 sm:p-12 border border-[var(--mc-border-light)] shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-[var(--mc-ink)] text-white text-3xl font-bold flex items-center justify-center shadow-md shrink-0">
              {official.name.charAt(0)}
            </div>
            <div>
              <div className="mc-eyebrow mb-1">
                <span className="mc-eyebrow-dot" />
                <span>ACTIVE LEARNER PROFILE</span>
              </div>
              <h3 className="text-2xl font-medium text-[var(--mc-ink)]">
                {official.name}
              </h3>
              <p className="text-[var(--mc-granite)] text-sm mt-1">
                {official.designation} • {official.department}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 rounded-full bg-[var(--mc-canvas)] text-xs font-medium text-[var(--mc-ink)]">
                  Exp: {official.experience_years} Years
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--mc-canvas)] text-xs font-medium text-[var(--mc-ink)]">
                  Edu: {official.education}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <button
              onClick={() => setCurrentTab('competencies')}
              className="mc-btn-primary flex-1 lg:flex-initial"
            >
              <span>View Full Gap Radar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentTab('recommendations')}
              className="mc-btn-secondary flex-1 lg:flex-initial"
            >
              <span>Curated Courses</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

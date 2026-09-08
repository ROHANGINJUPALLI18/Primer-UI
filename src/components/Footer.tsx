import React from 'react';
import { Globe, ArrowUpRight, HelpCircle, Shield, Award, BookOpen, Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--mc-ink)] text-white pt-20 pb-24 px-6 md:px-16 mt-28 rounded-t-[48px] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Large Conversational Headline */}
        <div className="mb-16 border-b border-white/10 pb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--mc-light-orange)]" />
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[var(--mc-dust-taupe)]">
              Official Statistical Capacity Architecture
            </span>
          </div>
          <h2 className="text-white text-3xl sm:text-5xl font-medium tracking-tight max-w-4xl leading-tight">
            Empowering India's statistical vanguard with precision, intelligence, and continuous learning.
          </h2>
          <p className="text-[var(--mc-dust-taupe)] text-base sm:text-lg max-w-2xl mt-4 font-normal">
            Bridging operational competency gaps across MoSPI, NSO, and state statistical bureaus through unified iGOT Karmayogi integration and generative adaptive diagnostic engines.
          </p>
        </div>

        {/* 4-Column Structured Link Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Column 1: Core Framework */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-white/50 mb-4 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[var(--mc-light-orange)]" />
              Competency Domains
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80 font-normal">
              <li>
                <a href="#statistical" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Statistical Methodology (10)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#technical" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Data Science & Python (12)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#governance" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Digital Governance & DPDP (5)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#behavioural" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Leadership & Communication (6)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Institutional Ecosystem */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-white/50 mb-4 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-[var(--mc-yellow)]" />
              Institutional Partners
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80 font-normal">
              <li>
                <a href="https://igotkarmayogi.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>iGOT Karmayogi Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white" />
                </a>
              </li>
              <li>
                <a href="https://nssta.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>NSSTA Greater Noida</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white" />
                </a>
              </li>
              <li>
                <a href="https://mospi.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>MoSPI Official Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white" />
                </a>
              </li>
              <li>
                <a href="https://dopt.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>DoPT Capacity Building Commission</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Capabilities */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-white/50 mb-4 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-[var(--mc-red)]" />
              Intelligence Engines
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80 font-normal">
              <li>
                <span className="text-white/90">Neon pgvector Semantic Matching</span>
              </li>
              <li>
                <span className="text-white/90">Dynamic Remediation Trees</span>
              </li>
              <li>
                <span className="text-white/90">CAPI / PLFS Survey Diagnostics</span>
              </li>
              <li>
                <span className="text-white/90">Macro National Skill Projection</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Standards */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-white/50 mb-4 flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5 text-white/80" />
              Cadre Assistance
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80 font-normal">
              <li className="flex items-center gap-2 text-white/80">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Encrypted GovCloud Infrastructure</span>
              </li>
              <li className="text-white/70">
                NSSTA Academic Advisory Desk
              </li>
              <li className="text-white/70">
                DoPT Mission Karmayogi Helpline
              </li>
              <li className="text-white/70">
                v0.1.0 • Smart India Hackathon PS 26101
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Bottom Utility Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/60">
          <div className="flex items-center gap-4">
            {/* Mastercard Interlocking Logo Stamp */}
            <div className="flex items-center relative w-8 h-5">
              <div 
                className="w-5 h-5 rounded-full absolute left-0"
                style={{ backgroundColor: 'var(--mc-red)', opacity: 0.95 }}
              />
              <div 
                className="w-5 h-5 rounded-full absolute left-3"
                style={{ backgroundColor: 'var(--mc-yellow)', mixBlendMode: 'screen', opacity: 0.95 }}
              />
            </div>
            <span>
              Designed following Mastercard Human-Centered Editorial Design System.
            </span>
          </div>

          {/* Country/Region Pill Selector */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/5 border border-white/15 px-3 py-1.5 rounded-full text-white/90 text-xs">
              <Globe className="w-3.5 h-3.5 text-[var(--mc-light-orange)]" />
              <span>India • Official Statistical Cadre</span>
            </div>
            <span>© 2026 PRIMER Intelligent Systems.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

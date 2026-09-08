import React, { useState } from 'react';
import type { OfficialDetail } from '../services/api';
import { ChevronDown, CheckCircle2, Search } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  officials: OfficialDetail[];
  selectedOfficial: OfficialDetail;
  setSelectedOfficial: (official: OfficialDetail) => void;
  isBackendLive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  officials,
  selectedOfficial,
  setSelectedOfficial,
  isBackendLive,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'competencies', label: 'Competencies & Gaps' },
    { id: 'recommendations', label: 'iGOT Courses' },
    { id: 'quiz', label: 'Adaptive Quiz AI' },
    { id: 'admin', label: 'Leadership Analytics' },
  ];

  return (
    <header className="mc-floating-nav flex items-center justify-between transition-all duration-300">
      {/* Brand Logo with Mastercard-inspired Interlocking Emblem */}
      <div 
        className="flex items-center gap-3 cursor-pointer select-none group"
        onClick={() => setCurrentTab('overview')}
      >
        <div className="flex items-center relative w-10 h-6">
          <div 
            className="w-6 h-6 rounded-full absolute left-0"
            style={{ backgroundColor: 'var(--mc-red)', opacity: 0.95 }}
          />
          <div 
            className="w-6 h-6 rounded-full absolute left-3.5"
            style={{ backgroundColor: 'var(--mc-yellow)', mixBlendMode: 'multiply', opacity: 0.95 }}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-lg tracking-tight text-[var(--mc-ink)]">
              PRIMER
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#141413]/5 text-[var(--mc-ink)] border border-[#141413]/10">
              MoSPI AI
            </span>
          </div>
        </div>
      </div>

      {/* Primary Navigation Pill Links */}
      <nav className="hidden lg:flex items-center gap-1 bg-[var(--mc-canvas)]/60 p-1 rounded-full border border-[var(--mc-border-light)]">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[var(--mc-ink)] text-[var(--mc-canvas)] shadow-sm'
                  : 'text-[var(--mc-granite)] hover:text-[var(--mc-ink)] hover:bg-white/60'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Right Action Cluster: Search, Official Switcher & Live Badge */}
      <div className="flex items-center gap-3">
        {/* Backend Status Dot */}
        <div 
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
          style={{
            backgroundColor: isBackendLive ? '#EBF9F1' : '#FFF5EB',
            borderColor: isBackendLive ? '#A3E6C2' : '#FCD3AA',
            color: isBackendLive ? '#0A6C3E' : '#B44200'
          }}
          title={isBackendLive ? "Connected to Neon PostgreSQL Backend" : "Operating in Resilient Demo Mode"}
        >
          <span 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: isBackendLive ? '#10B981' : '#F37338' }}
          />
          <span className="text-[11px] font-semibold tracking-wide">
            {isBackendLive ? 'Neon Live' : 'Demo Ready'}
          </span>
        </div>

        {/* Quick Search Toggle */}
        <div className="relative">
          {searchOpen ? (
            <div className="flex items-center bg-white border border-[var(--mc-ink)]/30 rounded-full px-3 py-1 text-sm shadow-sm animate-in fade-in zoom-in-95 duration-150">
              <Search className="w-4 h-4 text-[var(--mc-slate-gray)] mr-1.5" />
              <input
                type="text"
                placeholder="Search competencies, courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-36 sm:w-48 outline-none bg-transparent text-xs text-[var(--mc-ink)]"
                autoFocus
                onBlur={() => !searchQuery && setSearchOpen(false)}
              />
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 rounded-full bg-white border border-[var(--mc-border-light)] flex items-center justify-center text-[var(--mc-granite)] hover:text-[var(--mc-ink)] hover:border-[var(--mc-ink)] transition-all cursor-pointer"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Official Switcher Pill Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-white hover:bg-[#FAFAF9] border border-[var(--mc-border-light)] hover:border-[var(--mc-ink)]/30 px-3 py-1.5 rounded-full transition-all text-left cursor-pointer shadow-xs"
          >
            <div className="w-6 h-6 rounded-full bg-[var(--mc-ink)] text-[var(--mc-canvas)] flex items-center justify-center text-xs font-bold">
              {selectedOfficial.name.charAt(0)}
            </div>
            <div className="hidden md:flex flex-col pr-1">
              <span className="text-xs font-semibold text-[var(--mc-ink)] leading-tight">
                {selectedOfficial.name}
              </span>
              <span className="text-[10px] text-[var(--mc-slate-gray)] truncate max-w-[110px]">
                {selectedOfficial.designation}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--mc-slate-gray)]" />
          </button>

          {/* Switcher Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[var(--mc-border-light)] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-[10px] uppercase tracking-wider font-bold text-[var(--mc-slate-gray)]">
                  Switch MoSPI Official Profile
                </p>
                <p className="text-xs text-[var(--mc-granite)] mt-0.5">
                  View tailored gaps and training paths
                </p>
              </div>
              <div className="max-h-64 overflow-y-auto py-1">
                {officials.map((official) => {
                  const isCurrent = official.id === selectedOfficial.id;
                  return (
                    <button
                      key={official.id}
                      onClick={() => {
                        setSelectedOfficial(official);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[var(--mc-canvas)] text-[var(--mc-ink)] font-medium'
                          : 'hover:bg-gray-50 text-[var(--mc-granite)]'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCurrent ? 'bg-[var(--mc-ink)] text-white' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {official.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[var(--mc-ink)] truncate">
                            {official.name}
                          </span>
                          {isCurrent && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--mc-signal-orange)] shrink-0" />}
                        </div>
                        <p className="text-[11px] text-[var(--mc-slate-gray)] truncate">
                          {official.designation}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

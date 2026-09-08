import React, { useState, useEffect } from 'react';
import { type OfficialDetail, type CourseRecommendation, fetchRecommendations } from '../services/api';
import { ExternalLink, Clock, Sparkles } from 'lucide-react';

interface RecommendationsViewProps {
  official: OfficialDetail;
  setCurrentTab?: (tab: string) => void;
}

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({ official }) => {
  const [courses, setCourses] = useState<CourseRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [providerFilter, setProviderFilter] = useState<'All' | 'iGOT' | 'NSSTA'>('All');

  useEffect(() => {
    async function loadRecs() {
      setLoading(true);
      try {
        const data = await fetchRecommendations(official.id);
        setCourses(data);
      } catch (err) {
        console.error('Failed to load course recommendations:', err);
      } finally {
        setLoading(false);
      }
    }
    loadRecs();
  }, [official.id]);

  const filteredCourses = providerFilter === 'All' 
    ? courses 
    : courses.filter(c => c.source.toUpperCase() === providerFilter.toUpperCase());

  return (
    <div className="space-y-12">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="mc-eyebrow mb-2">
            <span className="mc-eyebrow-dot" />
            <span>KNOWLEDGE HARMONIZATION</span>
          </div>
          <h1 className="text-[var(--mc-ink)] text-3xl sm:text-5xl font-medium tracking-tight">
            iGOT & NSSTA Pathways
          </h1>
          <p className="text-[var(--mc-granite)] text-base sm:text-lg max-w-2xl mt-2 font-normal">
            Personalized course recommendations aggregated from Mission Karmayogi's iGOT repository and the National Statistical Systems Training Academy.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[var(--mc-border-light)] self-start md:self-auto text-xs font-semibold text-[var(--mc-granite)]">
          <span>Targeting:</span>
          <span className="text-[var(--mc-ink)]">{official.name}</span>
        </div>
      </div>

      {/* Provider Filter Tabs */}
      <div className="flex items-center justify-between border-b border-[var(--mc-border-light)] pb-4">
        <div className="flex items-center gap-2">
          {(['All', 'iGOT', 'NSSTA'] as const).map((prov) => {
            const isActive = providerFilter === prov;
            return (
              <button
                key={prov}
                onClick={() => setProviderFilter(prov)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[var(--mc-ink)] text-white shadow-xs'
                    : 'bg-white hover:bg-white/80 text-[var(--mc-granite)] border border-[var(--mc-border-light)]'
                }`}
              >
                {prov === 'All' ? 'All Providers (38)' : `${prov} Courses`}
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-1 text-xs text-[var(--mc-slate-gray)]">
          <Sparkles className="w-3.5 h-3.5 text-[var(--mc-yellow)]" />
          <span>Ranked by Neon pgvector similarity</span>
        </div>
      </div>

      {/* Course Cards Grid */}
      {loading ? (
        <div className="py-24 text-center text-[var(--mc-slate-gray)]">
          <div className="inline-block w-8 h-8 border-3 border-[var(--mc-ink)] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm">Matching national curriculum catalogs...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl p-8 border border-[var(--mc-border-light)]">
          <p className="text-base text-[var(--mc-granite)]">No courses found matching this provider.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCourses.map((course) => {
            const isIgot = course.source.toUpperCase() === 'IGOT';

            return (
              <div
                key={course.course_id}
                className="bg-white rounded-[36px] p-8 border border-[var(--mc-border-light)] hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span 
                      className={`text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border ${
                        isIgot 
                          ? 'bg-blue-50 text-[var(--mc-link-blue)] border-blue-200' 
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {course.source} Catalog
                    </span>

                    <div className="flex items-center gap-2">
                      {course.duration_hrs && (
                        <span className="flex items-center gap-1 text-xs text-[var(--mc-slate-gray)] font-medium">
                          <Clock className="w-3 h-3" />
                          {course.duration_hrs} hrs
                        </span>
                      )}
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {Math.round(course.score)}% Match
                      </span>
                    </div>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-xl font-medium text-[var(--mc-ink)] mb-3 group-hover:text-[var(--mc-signal-orange)] transition-colors">
                    {course.title}
                  </h3>

                  {/* Domain Tag */}
                  {course.domain && (
                    <div className="mb-4">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--mc-canvas)] text-[var(--mc-granite)]">
                        {course.domain}
                      </span>
                    </div>
                  )}

                  {/* Rationale Callout Box */}
                  <div className="bg-[var(--mc-surface-lifted)] rounded-2xl p-4 border border-[var(--mc-border-light)] mb-6">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--mc-slate-gray)] mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[var(--mc-signal-orange)]" />
                      <span>Curricular Alignment Rationale</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--mc-granite)] leading-relaxed">
                      {course.reason}
                    </p>
                  </div>
                </div>

                {/* Bottom CTA Row */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-[var(--mc-slate-gray)]">
                    Govt. Accredited Certificate
                  </span>

                  <a
                    href={course.url || 'https://igotkarmayogi.gov.in'}
                    target="_blank"
                    rel="noreferrer"
                    className="mc-btn-primary text-xs py-2 px-5 no-underline"
                  >
                    <span>Enroll on {course.source}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

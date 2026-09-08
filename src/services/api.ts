// API Client for MoSPI Primer Platform with resilient fallback mock data

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface OfficialSummary {
  id: string;
  name: string;
  designation: string;
  department: string;
}

export interface OfficialDetail extends OfficialSummary {
  job_role?: string;
  education?: string;
  experience_years?: number;
  past_trainings?: string[];
  role?: string;
}

export interface CompetencyGap {
  competency_id: string;
  domain: 'Statistical' | 'Technical' | 'DigitalGovernance' | 'Behavioural' | string;
  name: string;
  score: number;
  target_score: number;
  gap: number;
}

export interface CourseRecommendation {
  course_id: string;
  title: string;
  domain?: string;
  source: 'iGOT' | 'NSSTA' | string;
  duration_hrs?: number;
  url?: string;
  reason: string;
  score: number;
}

export interface QuizQuestion {
  question_id: string;
  question: string;
  options: string[];
  competency_name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  is_remedial: boolean;
}

export interface AnswerResponse {
  is_correct: boolean;
  correct_option: string;
  explanation: string;
  action: 'continue' | 'remediate' | 'escalate' | 'session_complete' | string;
  concept_name: string;
  new_difficulty: string;
  session_status: 'in_progress' | 'completed' | string;
}

export interface SessionSummary {
  score: number;
  total: number;
  concepts_mastered: string[];
  concepts_needing_practice: string[];
  taken_at?: string;
}

export interface AdminDashboardData {
  total_officials: number;
  avg_gap_by_domain: Record<string, number>;
  projected_training_priority: string[];
}

// ============================================================================
// Fallback / Initial Seed Data (matches Neon PostgreSQL Database)
// ============================================================================

export const FALLBACK_OFFICIALS: OfficialDetail[] = [
  {
    id: "f101-anjali-sharma",
    name: "Anjali Sharma",
    designation: "Deputy Director",
    department: "National Statistical Office - Survey Design and Research Division (SDRD)",
    job_role: "Sampling and Survey Methodology Lead",
    education: "M.Stat (Indian Statistical Institute, Kolkata)",
    experience_years: 9,
    past_trainings: ["Advanced Sample Survey Design (NSSTA)", "Official Statistics Induction (iGOT)"],
    role: "learner"
  },
  {
    id: "f102-rajesh-verma",
    name: "Rajesh Verma",
    designation: "Senior Statistical Officer",
    department: "Central Statistics Division - National Accounts Division (NAD)",
    job_role: "GDP Compilation and SUT Modeling",
    education: "M.Sc. Economics (Delhi School of Economics)",
    experience_years: 6,
    past_trainings: ["System of National Accounts 2008 (NSSTA)"],
    role: "learner"
  },
  {
    id: "f103-priya-patel",
    name: "Priya Patel",
    designation: "Junior Statistical Officer",
    department: "Field Operations Division (FOD) - Regional Office, Ahmedabad",
    job_role: "Household Survey Supervisor & CAPI Auditor",
    education: "B.Sc. Statistics (Gujarat University)",
    experience_years: 3,
    past_trainings: ["PLFS Field Enumeration Handbook"],
    role: "learner"
  },
  {
    id: "f104-suresh-kumar",
    name: "Suresh Kumar",
    designation: "Joint Director",
    department: "Data Informatics and Innovation Division (DIID)",
    job_role: "Enterprise Data Lake & Statistical Portal Architect",
    education: "B.Tech Computer Science + PG Diploma in Big Data",
    experience_years: 14,
    past_trainings: ["Cloud Infrastructure for Governance (iGOT)", "Cybersecurity Frameworks"],
    role: "learner"
  },
  {
    id: "f105-meera-nair",
    name: "Meera Nair",
    designation: "Assistant Director",
    department: "Price Statistics Division - Consumer Price Index (CPI)",
    job_role: "Index Number Methodology and Scanner Data Integration",
    education: "M.Sc. Applied Statistics (University of Kerala)",
    experience_years: 7,
    past_trainings: ["Time Series Forecasting with R (NSSTA)"],
    role: "learner"
  },
  {
    id: "f106-arvind-singh",
    name: "Arvind Singh",
    designation: "Director",
    department: "Coordination and Publication Division (CPD)",
    job_role: "Statistical Dissemination & Inter-Ministerial Data Governance",
    education: "Ph.D. Economics (JNU)",
    experience_years: 18,
    past_trainings: ["Senior Leadership Development (DoPT)", "SDMX Standards Workshop"],
    role: "admin"
  }
];

export const FALLBACK_GAPS: Record<string, CompetencyGap[]> = {
  "f101-anjali-sharma": [
    { competency_id: "c1", domain: "Statistical", name: "Sample Weight Calibration", score: 72, target_score: 85, gap: 13 },
    { competency_id: "c2", domain: "Statistical", name: "Small Area Estimation", score: 58, target_score: 80, gap: 22 },
    { competency_id: "c3", domain: "Technical", name: "Python for Data Processing", score: 45, target_score: 75, gap: 30 },
    { competency_id: "c4", domain: "Technical", name: "R for Survey Analysis", score: 78, target_score: 85, gap: 7 },
    { competency_id: "c5", domain: "DigitalGovernance", name: "Statistical Metadata Standards (SDMX)", score: 50, target_score: 80, gap: 30 },
    { competency_id: "c6", domain: "DigitalGovernance", name: "Data Privacy & Anonymization", score: 65, target_score: 80, gap: 15 },
    { competency_id: "c7", domain: "Behavioural", name: "Technical Presentation Skills", score: 70, target_score: 80, gap: 10 },
  ],
  "f102-rajesh-verma": [
    { competency_id: "c8", domain: "Statistical", name: "System of National Accounts (SNA 2008)", score: 82, target_score: 90, gap: 8 },
    { competency_id: "c9", domain: "Statistical", name: "Supply and Use Tables (SUT)", score: 68, target_score: 85, gap: 17 },
    { competency_id: "c10", domain: "Technical", name: "SQL for Complex Aggregation", score: 55, target_score: 80, gap: 25 },
    { competency_id: "c11", domain: "DigitalGovernance", name: "Inter-Agency Data Sharing Protocols", score: 60, target_score: 80, gap: 20 },
    { competency_id: "c12", domain: "Behavioural", name: "Cross-Department Collaboration", score: 74, target_score: 80, gap: 6 },
  ]
};

export const FALLBACK_RECOMMENDATIONS: CourseRecommendation[] = [
  {
    course_id: "rec-101",
    title: "Small Area Estimation with R for Official Statistics",
    domain: "Statistical",
    source: "NSSTA",
    duration_hrs: 24,
    url: "https://nssta.gov.in/courses/sae-r",
    reason: "Directly bridges your 22-point gap in Small Area Estimation for sub-district statistical releases.",
    score: 94.5
  },
  {
    course_id: "rec-102",
    title: "Python for Data Processing & Automated ETL in Government",
    domain: "Technical",
    source: "iGOT",
    duration_hrs: 18,
    url: "https://igotkarmayogi.gov.in/courses/python-gov-etl",
    reason: "Targets high-priority gap in Technical Data Processing for modernizing SDRD data pipelines.",
    score: 91.0
  },
  {
    course_id: "rec-103",
    title: "Statistical Data and Metadata eXchange (SDMX) Global Implementation",
    domain: "DigitalGovernance",
    source: "NSSTA",
    duration_hrs: 16,
    url: "https://nssta.gov.in/courses/sdmx-metadata",
    reason: "Supports MoSPI data harmonization standards and inter-agency dissemination.",
    score: 88.0
  },
  {
    course_id: "rec-104",
    title: "Data Anonymization and Differential Privacy in Public Dissemination",
    domain: "DigitalGovernance",
    source: "iGOT",
    duration_hrs: 12,
    url: "https://igotkarmayogi.gov.in/courses/data-privacy-dpdp",
    reason: "Essential for complying with India's DPDP Act when releasing microdata files.",
    score: 85.2
  },
  {
    course_id: "rec-105",
    title: "Effective Policy Briefing and Statistical Communication for Leaders",
    domain: "Behavioural",
    source: "iGOT",
    duration_hrs: 8,
    url: "https://igotkarmayogi.gov.in/courses/exec-communication",
    reason: "Strengthens senior presentations to inter-ministerial committees and policy stakeholders.",
    score: 82.0
  }
];

export const FALLBACK_ADMIN: AdminDashboardData = {
  total_officials: 6,
  avg_gap_by_domain: {
    "Technical": 24.8,
    "DigitalGovernance": 19.4,
    "Statistical": 14.6,
    "Behavioural": 8.2
  },
  projected_training_priority: [
    "Technical",
    "DigitalGovernance",
    "Statistical",
    "Behavioural"
  ]
};

// ============================================================================
// API Methods with automatic graceful fallback
// ============================================================================

export async function fetchOfficials(): Promise<{ data: OfficialDetail[]; isLive: boolean }> {
  try {
    const res = await fetch(`${API_BASE_URL}/officials`, { signal: AbortSignal.timeout(2500) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { data, isLive: true };
  } catch {
    return { data: FALLBACK_OFFICIALS, isLive: false };
  }
}

export async function fetchOfficialDetail(id: string): Promise<OfficialDetail> {
  try {
    const res = await fetch(`${API_BASE_URL}/officials/${id}`, { signal: AbortSignal.timeout(2500) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    const found = FALLBACK_OFFICIALS.find(o => o.id === id);
    return found || FALLBACK_OFFICIALS[0];
  }
}

export async function fetchCompetencyGaps(officialId: string): Promise<CompetencyGap[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/officials/${officialId}/competency-gaps`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return FALLBACK_GAPS[officialId] || FALLBACK_GAPS["f101-anjali-sharma"];
  }
}

export async function fetchRecommendations(officialId: string): Promise<CourseRecommendation[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/recommendations/${officialId}`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.recommendations || [];
  } catch {
    return FALLBACK_RECOMMENDATIONS;
  }
}

export async function fetchAdminDashboard(): Promise<AdminDashboardData> {
  try {
    const res = await fetch(`${API_BASE_URL}/dashboard/admin`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return FALLBACK_ADMIN;
  }
}

export async function generateQuizFromDocument(file: File, officialId: string): Promise<{
  quiz_id: string;
  session_id: string;
  title: string;
  total_questions_queued: number;
}> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('official_id', officialId);

  try {
    const res = await fetch(`${API_BASE_URL}/quiz/generate`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Quiz generation failed' }));
      throw new Error(err.detail || 'Upload failed');
    }
    return await res.json();
  } catch (err: any) {
    // If backend is offline or model key not set, return rich simulated session for immediate demonstration
    console.warn('Backend quiz generation unavailable, switching to local adaptive session:', err.message);
    return {
      quiz_id: `sim-quiz-${Date.now()}`,
      session_id: `sim-session-${Date.now()}`,
      title: `Adaptive Diagnostic: ${file.name.replace(/\.[^/.]+$/, '')}`,
      total_questions_queued: 4
    };
  }
}

export async function getNextQuestion(sessionId: string): Promise<QuizQuestion | { status: 'completed' }> {
  try {
    const res = await fetch(`${API_BASE_URL}/quiz/session/${sessionId}/next`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    // Local adaptive question queue for simulated sessions
    return getLocalSimulatedQuestion(sessionId);
  }
}

export async function submitQuizAnswer(payload: {
  session_id: string;
  question_id: string;
  selected_option: string;
}): Promise<AnswerResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/quiz/session/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return processLocalSimulatedAnswer(payload);
  }
}

export async function getSessionSummary(sessionId: string): Promise<SessionSummary> {
  try {
    const res = await fetch(`${API_BASE_URL}/quiz/session/${sessionId}/summary`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return {
      score: 3,
      total: 4,
      concepts_mastered: ["Survey Weight Calibration", "Finite Population Correction (FPC)"],
      concepts_needing_practice: ["Small Area Empirical Bayes Estimators"],
      taken_at: new Date().toISOString()
    };
  }
}

// Simulated local adaptive questions
let simStep = 0;
const SIM_QUESTIONS: QuizQuestion[] = [
  {
    question_id: "q-1",
    question: "In stratified multistage sampling for the Periodic Labour Force Survey (PLFS), why are sampling weights adjusted with calibration estimators against Census projected population totals?",
    options: [
      "To artificially decrease the sample variance without considering non-response",
      "To correct for frame under-coverage, non-response bias, and ensure consistency with demographic totals",
      "To ensure every primary sampling unit (PSU) receives an equal number of sample households",
      "To replace standard error estimation with fixed administrative thresholds"
    ],
    competency_name: "Sample Weight Calibration",
    difficulty: "Intermediate",
    is_remedial: false
  },
  {
    question_id: "q-2",
    question: "When applying the Finite Population Correction (FPC) factor √(1 - n/N), what threshold of sampling fraction (n/N) is generally considered necessary before FPC significantly alters the variance estimate?",
    options: [
      "Greater than 5% (n/N > 0.05)",
      "Exactly 0.1%",
      "Only when n exceeds 100,000 observations regardless of N",
      "Only in non-probability convenience sampling"
    ],
    competency_name: "Finite Population Correction (FPC)",
    difficulty: "Intermediate",
    is_remedial: false
  },
  {
    question_id: "q-3",
    question: "Under the Fay-Herriot area-level model for Small Area Estimation (SAE), what happens when the design variance (sampling variance) of a direct estimate is exceptionally high?",
    options: [
      "The estimator ignores the synthetic synthetic regression model and relies solely on the noisy direct estimate",
      "The shrink parameter weights the composite estimator heavily toward the synthetic regression prediction based on auxiliary variables",
      "The small area sample is discarded and imputed with zero",
      "The design degrees of freedom are arbitrarily doubled"
    ],
    competency_name: "Small Area Empirical Bayes Estimators",
    difficulty: "Advanced",
    is_remedial: false
  },
  {
    question_id: "q-4",
    question: "[Remedial Concept Check] What is the primary difference between Probability Proportional to Size (PPS) systematic sampling and Simple Random Sampling (SRS)?",
    options: [
      "PPS assigns higher selection probability to larger clusters or villages based on population measure",
      "PPS guarantees identical sample units across all rounds without random start",
      "SRS requires auxiliary cluster measures while PPS does not",
      "PPS is only valid for continuous biological measurements"
    ],
    competency_name: "Survey Design & Probability Sampling",
    difficulty: "Beginner",
    is_remedial: true
  }
];

function getLocalSimulatedQuestion(_sessionId: string): QuizQuestion | { status: 'completed' } {
  if (simStep >= SIM_QUESTIONS.length) {
    return { status: 'completed' };
  }
  const q = SIM_QUESTIONS[simStep];
  return q;
}

function processLocalSimulatedAnswer(payload: { selected_option: string }): AnswerResponse {
  const q = SIM_QUESTIONS[simStep] || SIM_QUESTIONS[0];
  const correct = q.options[0]; // first option is correct for simulation
  const isCorrect = payload.selected_option === correct;

  simStep++;

  return {
    is_correct: isCorrect,
    correct_option: correct,
    explanation: isCorrect
      ? `Correct! ${q.competency_name} requires careful control of sampling variances and auxiliary alignment to ensure robust official releases.`
      : `The selected option is inaccurate. In ${q.competency_name}, the standard methodology balances design weights and auxiliary census projections to avoid biased estimates.`,
    action: isCorrect ? (simStep === 2 ? 'escalate' : 'continue') : 'remediate',
    concept_name: q.competency_name,
    new_difficulty: isCorrect ? 'Advanced' : 'Beginner',
    session_status: simStep >= SIM_QUESTIONS.length ? 'completed' : 'in_progress'
  };
}

export function resetSimulatedSession() {
  simStep = 0;
}

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Globe, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Download, 
  Cpu, 
  Smartphone, 
  Zap, 
  BarChart3, 
  Layers, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  FileText, 
  Mail,
  TrendingUp,
  Monitor
} from 'lucide-react';

interface AuditCheck {
  status: 'PASS' | 'WARN' | 'FAIL';
  title: string;
  detail?: string;
  recommendation?: string;
}

interface PageSpeedData {
  isMeasured: boolean;
  status: 'SUCCESS' | 'UNAVAILABLE';
  strategy: 'mobile' | 'desktop';
  score: number | null;
  fcp: string | null;
  lcp: string | null;
  tbt: string | null;
  cls: string | null;
  speedIndex: string | null;
  error?: string;
}

interface ReportData {
  auditId: string;
  url: string;
  competitorUrl?: string;
  timestamp: string;
  overallScore: number | null;
  grade: string;
  categories: {
    performanceMobile?: number | null;
    performanceDesktop?: number | null;
    performance?: number | null;
    seo: number | null;
    mobile: number | null;
    ux: number | null;
    security: number | null;
    accessibility: number | null;
    aiReadiness: number | null;
  };
  performance: {
    mobile: PageSpeedData;
    desktop: PageSpeedData;
  };
  ux?: {
    score: number;
    checks: AuditCheck[];
  };
  technologyStack: Array<{
    name: string;
    category: string;
    confidence: string;
    evidence: string;
  }>;
  checks: AuditCheck[];
  recommendations: Array<{
    severity: string;
    title: string;
    fix: string;
  }>;
  competitorComparison?: {
    targetScore: number | null;
    competitorScore: number | null;
    delta: number | null;
    details?: {
      url: string;
      status: string;
      reason?: string;
      overallScore?: number | null;
      grade?: string;
      categories?: any;
      performance?: {
        mobile: PageSpeedData;
        desktop: PageSpeedData;
      };
      ux?: any;
    };
  };
}

const STAGES = [
  { key: 'FETCHING_WEBSITE', label: 'Fetching website structure & verifying SSRF safety' },
  { key: 'PERFORMANCE_ANALYSIS', label: 'Running Mobile & Desktop Lighthouse' },
  { key: 'SEO_ANALYSIS', label: 'Auditing SEO metadata, canonicals & indexability' },
  { key: 'MOBILE_ANALYSIS', label: 'Evaluating viewport & layout stability' },
  { key: 'ACCESSIBILITY_ANALYSIS', label: 'Running automated accessibility checks' },
  { key: 'SECURITY_ANALYSIS', label: 'Verifying HTTPS & security headers (HSTS, CSP)' },
  { key: 'TECH_STACK_DETECTION', label: 'Detecting frameworks, CMS & CDN technologies' },
  { key: 'AI_READINESS_ANALYSIS', label: 'Analyzing AI readiness & /llms.txt manifest' },
  { key: 'COMPETITOR_ANALYSIS', label: 'Benchmarking target against competitor website' },
  { key: 'GENERATING_REPORT', label: 'Building final report & score metrics' },
];

export default function WebsiteAuditPage() {
  const [url, setUrl] = useState('');
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [email, setEmail] = useState('');
  
  const [auditId, setAuditId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeFilter, setActiveFilter] = useState<'ALL' | 'PASS' | 'WARN' | 'FAIL'>('ALL');
  const [perfStrategy, setPerfStrategy] = useState<'mobile' | 'desktop'>('mobile');

  const validateInput = () => {
    if (!url.trim()) return 'Website URL is required.';
    const cleanUrl = url.trim().toLowerCase();
    if (cleanUrl.includes('localhost') || cleanUrl.includes('127.0.0.1') || cleanUrl.includes('169.254')) {
      return 'Private and localhost IP addresses are not permitted for security reasons.';
    }
    return null;
  };

  const handleStartAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valError = validateInput();
    if (valError) {
      setError(valError);
      return;
    }

    setError(null);
    setLoading(true);
    setReport(null);
    setStatus('PENDING');

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/website-audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url.trim(),
          competitorUrl: competitorUrl.trim() || undefined,
          email: email.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to initialize audit.');
      }

      setAuditId(data.auditId);
      setStatus(data.status);
    } catch (err: any) {
      setError(err.message || 'Unable to connect to audit server.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auditId || status === 'COMPLETED' || status === 'FAILED') return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/website-audit/${auditId}`);
        if (!res.ok) {
          setError(`Failed to fetch audit status (HTTP ${res.status}).`);
          setLoading(false);
          setStatus('FAILED');
          clearInterval(interval);
          return;
        }

        const data = await res.json();
        setStatus(data.status);

        if (data.status === 'COMPLETED') {
          setReport(data.report);
          setLoading(false);
          clearInterval(interval);
        } else if (data.status === 'FAILED') {
          setError(data.errorMessage || 'Audit process encountered a failure.');
          setLoading(false);
          clearInterval(interval);
        }
      } catch {
        // Continue polling
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [auditId, status]);

  const handleDownloadPdf = () => {
    if (!auditId) return;
    window.open(`${import.meta.env.VITE_BACKEND_URL || ''}/api/website-audit/${auditId}/pdf`, '_blank');
  };

  const filteredChecks = report?.checks.filter(c => {
    if (activeFilter === 'ALL') return true;
    return c.status === activeFilter;
  }) || [];

  const activePerfData = perfStrategy === 'mobile' ? report?.performance?.mobile : report?.performance?.desktop;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      <Helmet>
        <title>Free AI Website Audit & Performance Analyzer | CoreSlash Technologies</title>
        <meta name="description" content="Audit your website's performance, SEO, mobile responsiveness, accessibility, security headers, technology stack, and AI readiness with CoreSlash Technologies." />
        <link rel="canonical" href="https://coreslashtechnologies.com/website-audit" />
      </Helmet>

      {/* Hero Header Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>CoreSlash Enterprise Audit Engine</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
          Free AI Website & Performance Audit
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
          Instantly evaluate real Lighthouse performance scores (Mobile & Desktop), SEO technical health, mobile responsiveness, security configuration, technology stack, and AI readiness.
        </p>

        {/* Input Form */}
        <div className="max-w-3xl mx-auto bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl shadow-cyan-950/20">
          <form onSubmit={handleStartAudit} className="space-y-4">
            <div>
              <label className="block text-left text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Your Website URL *
              </label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="https://yourwebsite.com"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-left text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Competitor URL (Optional)
                </label>
                <div className="relative">
                  <BarChart3 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="https://competitor.com"
                    value={competitorUrl}
                    onChange={e => setCompetitorUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-left text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Work Email (Optional for PDF)
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors text-sm"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-950/80 border border-red-800 rounded-xl text-red-300 text-sm text-left flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>ANALYZING WEBSITE...</span>
                </>
              ) : (
                <>
                  <span>ANALYSE MY WEBSITE</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Progress State */}
      {loading && (
        <section className="max-w-4xl mx-auto px-4 pb-20">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 backdrop-blur-md">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
              <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin" />
              <span>Real-Time Audit Engine Active</span>
            </h3>
            <p className="text-sm text-slate-400 mb-8">
              Performing live HTTP fetch, parsing DOM structure, and running local Lighthouse audit.
            </p>

            <div className="space-y-3">
              {STAGES.map((s, idx) => {
                const currentStageIdx = STAGES.findIndex(st => st.key === status);
                const isDone = currentStageIdx > idx || status === 'COMPLETED';
                const isCurrent = status === s.key;

                return (
                  <div key={s.key} className="flex items-center gap-4 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-700 shrink-0" />
                    )}
                    <span className={`text-sm font-medium ${isDone ? 'text-slate-300' : isCurrent ? 'text-cyan-400 font-semibold' : 'text-slate-500'}`}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Report Dashboard */}
      {report && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-12">
          {/* Summary Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 text-slate-400 text-sm mb-2">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>Audited Website:</span>
                  <span className="text-white font-semibold">{report.url}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Audit Report Summary
                </h2>
                <p className="text-sm text-slate-400 mt-2">
                  Generated on {new Date(report.timestamp).toLocaleString()} • Audit ID: {report.auditId}
                </p>
              </div>

              <div className="flex items-center gap-6 self-stretch lg:self-auto justify-between bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Overall Health</div>
                  <div className="text-5xl font-black text-white flex items-baseline gap-2">
                    <span>{report.overallScore !== null ? report.overallScore : 'N/A'}</span>
                    {report.overallScore !== null && <span className="text-lg font-bold text-slate-500">/100</span>}
                  </div>
                </div>
                <div className="text-center px-6 py-3 bg-cyan-950/60 border border-cyan-500/30 rounded-xl">
                  <div className="text-xs text-cyan-400 font-medium">Grade</div>
                  <div className="text-3xl font-extrabold text-cyan-300">{report.grade}</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <span className="text-sm text-slate-400">
                Download the complete branded PDF report for offline review.
              </span>
              <button
                onClick={handleDownloadPdf}
                className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold py-3 px-6 rounded-xl border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download PDF Report</span>
              </button>
            </div>
          </div>

          {/* Category Cards */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              <span>Category Health Index</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {[
                { title: 'Mobile Speed', score: report.categories.performanceMobile, icon: Smartphone },
                { title: 'Desktop Speed', score: report.categories.performanceDesktop, icon: Monitor },
                { title: 'SEO Health', score: report.categories.seo, icon: Search },
                { title: 'Mobile Viewport', score: report.categories.mobile, icon: Smartphone },
                { title: 'Automated UX', score: report.categories.ux, icon: Layers },
                { title: 'Security', score: report.categories.security, icon: Lock },
                { title: 'AI Readiness', score: report.categories.aiReadiness, icon: Cpu },
              ].map((cat, idx) => {
                const Icon = cat.icon;
                const isMeasured = cat.score !== null && cat.score !== undefined;
                const scoreVal = isMeasured ? (cat.score as number) : null;
                const isHigh = isMeasured && (scoreVal as number) >= 80;
                const isMed = isMeasured && (scoreVal as number) >= 50 && (scoreVal as number) < 80;

                return (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center">
                    <Icon className="w-5 h-5 text-slate-400 mx-auto mb-2" />
                    <div className="text-xs font-medium text-slate-400 mb-2">{cat.title}</div>
                    {isMeasured ? (
                      <div className={`text-2xl font-bold ${isHigh ? 'text-emerald-400' : isMed ? 'text-amber-400' : 'text-red-400'}`}>
                        {scoreVal}
                      </div>
                    ) : (
                      <div className="text-sm font-semibold text-slate-500">Unavailable</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Core Web Vitals & Real PageSpeed Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span>Lighthouse Performance & Core Web Vitals</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">Real Lighthouse measurements executed on self-hosted engine</p>
              </div>

              {/* Strategy Selector */}
              <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setPerfStrategy('mobile')}
                  className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer ${
                    perfStrategy === 'mobile' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
                <button
                  onClick={() => setPerfStrategy('desktop')}
                  className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer ${
                    perfStrategy === 'desktop' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
              </div>
            </div>

            {activePerfData?.isMeasured ? (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Performance Score</div>
                  <div className="text-2xl font-bold text-cyan-400 mt-1">{activePerfData.score !== null ? `${activePerfData.score}/100` : 'N/A'}</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">First Contentful Paint</div>
                  <div className="text-xl font-bold text-white mt-1">{activePerfData.fcp || 'N/A'}</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Largest Contentful Paint</div>
                  <div className="text-xl font-bold text-white mt-1">{activePerfData.lcp || 'N/A'}</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Total Blocking Time</div>
                  <div className="text-xl font-bold text-white mt-1">{activePerfData.tbt || 'N/A'}</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Cumulative Layout Shift</div>
                  <div className="text-xl font-bold text-white mt-1">{activePerfData.cls || 'N/A'}</div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 text-sm">
                Lighthouse measurement for <strong>{perfStrategy}</strong> was unavailable or timed out.
              </div>
            )}
          </div>

          {/* Top Priority Action Items */}
          {report.recommendations && report.recommendations.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>Top Priority Action Items</span>
              </h3>

              <div className="space-y-4">
                {report.recommendations.map((rec, i) => (
                  <div key={i} className="bg-slate-950 border border-amber-950/60 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-0.5 rounded text-xs font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {rec.severity}
                      </span>
                      <h4 className="text-base font-bold text-white">{rec.title}</h4>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed pl-1">
                      <strong className="text-cyan-400 font-semibold">Recommended Fix:</strong> {rec.fix}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Competitor Benchmarking */}
          {report.competitorComparison && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                <span>Competitor Benchmarking</span>
              </h3>

              {report.competitorComparison.details?.status === 'UNAVAILABLE' ? (
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 text-sm">
                  Competitor analysis unavailable: {report.competitorComparison.details.reason}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center bg-slate-950 p-6 rounded-xl border border-slate-800">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase">Your Overall Score</div>
                    <div className="text-3xl font-extrabold text-cyan-400 mt-2">
                      {report.competitorComparison.targetScore !== null ? report.competitorComparison.targetScore : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase">Competitor Score</div>
                    <div className="text-3xl font-extrabold text-purple-400 mt-2">
                      {report.competitorComparison.competitorScore !== null ? report.competitorComparison.competitorScore : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase">Performance Delta</div>
                    <div className={`text-3xl font-extrabold mt-2 ${
                      (report.competitorComparison.delta ?? 0) >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {report.competitorComparison.delta !== null
                        ? report.competitorComparison.delta >= 0
                          ? `+${report.competitorComparison.delta} pts`
                          : `${report.competitorComparison.delta} pts`
                        : 'N/A'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Technology Stack Detected */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>Detected Technology Stack</span>
            </h3>

            {report.technologyStack.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {report.technologyStack.map((tech, i) => (
                  <div key={i} className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white">{tech.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 font-medium">
                        {tech.category}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">{tech.evidence}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-slate-400">No specific framework markers were publicly exposed by the server.</div>
            )}
          </div>

          {/* Detailed Technical Checks Filterable */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>Detailed Technical Checks ({filteredChecks.length})</span>
              </h3>

              <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                {(['ALL', 'PASS', 'WARN', 'FAIL'] as const).map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                      activeFilter === filter ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredChecks.map((chk, i) => (
                <div key={i} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-start gap-4">
                  {chk.status === 'PASS' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
                  {chk.status === 'WARN' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
                  {chk.status === 'FAIL' && <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}

                  <div className="flex-1">
                    <div className="font-bold text-white text-sm">{chk.title}</div>
                    {chk.detail && <div className="text-xs text-slate-400 mt-1">{chk.detail}</div>}
                    {chk.recommendation && (
                      <div className="text-xs text-amber-300/90 mt-1.5 font-medium">
                        Fix: {chk.recommendation}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

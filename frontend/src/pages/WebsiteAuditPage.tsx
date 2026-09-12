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
  status: 'SUCCESS' | 'UNAVAILABLE' | 'IN_PROGRESS' | 'PENDING' | 'FAILED';
  strategy: 'mobile' | 'desktop';
  score: number | null;
  fcp: string | null;
  lcp: string | null;
  tbt: string | null;
  cls: string | null;
  ttfb?: string | null;
  domInteractive?: string | null;
  loadEvent?: string | null;
  methodologyNote?: string;
  error?: string;
}

interface ReportData {
  auditId: string;
  url: string;
  competitorUrl?: string;
  timestamp: string;
  overallScore: number | null;
  grade: string;
  auditMethodology?: {
    performance?: string;
    heuristicsNote?: string;
  };
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
  { key: 'PERFORMANCE_ANALYSIS', label: 'Measuring Mobile & Desktop Browser Performance (CDP)' },
  { key: 'SEO_ANALYSIS', label: 'Auditing SEO metadata, canonicals & indexability' },
  { key: 'MOBILE_ANALYSIS', label: 'Evaluating viewport & layout stability' },
  { key: 'ACCESSIBILITY_ANALYSIS', label: 'Running automated accessibility checks' },
  { key: 'SECURITY_ANALYSIS', label: 'Verifying HTTPS & security headers (HSTS, CSP)' },
  { key: 'TECH_STACK_DETECTION', label: 'Detecting frameworks, CMS & CDN technologies' },
  { key: 'AI_READINESS_ANALYSIS', label: 'Analyzing AI readiness & /llms.txt manifest' },
  { key: 'COMPETITOR_ANALYSIS', label: 'Benchmarking target against competitor website' },
  { key: 'GENERATING_REPORT', label: 'Building final report & score metrics' },
];

interface ServiceMapping {
  title: string;
  url: string;
  ctaText: string;
}

function getServiceMapping(text: string): ServiceMapping | null {
  const lower = text.toLowerCase();

  // 1. SEO-related findings
  if (
    lower.includes('seo') ||
    lower.includes('meta description') ||
    lower.includes('title tag') ||
    lower.includes('canonical') ||
    lower.includes('schema.org') ||
    lower.includes('json-ld') ||
    lower.includes('microdata') ||
    lower.includes('open graph') ||
    lower.includes('alt text') ||
    lower.includes('alt attribute') ||
    lower.includes('heading structure') ||
    lower.includes('sitemap') ||
    lower.includes('robots.txt') ||
    lower.includes('search engine')
  ) {
    return {
      title: 'SEO Solutions',
      url: '/services/seo-solutions',
      ctaText: 'Get Professional SEO Optimization',
    };
  }

  // 2. Cloud & Infrastructure performance findings
  if (
    lower.includes('hsts') ||
    lower.includes('csp') ||
    lower.includes('security header') ||
    lower.includes('https') ||
    lower.includes('ssl') ||
    lower.includes('x-frame-options') ||
    lower.includes('x-content-type-options') ||
    lower.includes('referrer-policy') ||
    lower.includes('ttfb') ||
    lower.includes('server response') ||
    lower.includes('fcp') ||
    lower.includes('lcp') ||
    lower.includes('tbt') ||
    lower.includes('cls') ||
    lower.includes('core web vitals') ||
    lower.includes('cdn') ||
    lower.includes('cloud') ||
    lower.includes('hosting') ||
    lower.includes('infrastructure')
  ) {
    return {
      title: 'Cloud Infrastructure',
      url: '/services/cloud-infrastructure',
      ctaText: 'Improve Your Cloud Infrastructure',
    };
  }

  // 3. Web Development & UI/UX findings
  if (
    lower.includes('viewport') ||
    lower.includes('responsive') ||
    lower.includes('mobile layout') ||
    lower.includes('touch target') ||
    lower.includes('accessibility') ||
    lower.includes('aria') ||
    lower.includes('form label') ||
    lower.includes('ux') ||
    lower.includes('cro') ||
    lower.includes('navigation') ||
    lower.includes('react') ||
    lower.includes('web application') ||
    lower.includes('frontend') ||
    lower.includes('layout stability')
  ) {
    return {
      title: 'Web Development',
      url: '/services/web-development',
      ctaText: 'Talk to Our Web Development Team',
    };
  }

  return null;
}

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
      if (data.report) {
        setReport(data.report);
      }
      if (data.status === 'COMPLETED' || data.status === 'FAILED') {
        setLoading(false);
      }
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

        if (data.report) {
          setReport(data.report);
        }

        if (data.status === 'COMPLETED') {
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
    }, 3000);

    return () => clearInterval(interval);
  }, [auditId, status]);

  useEffect(() => {
    if (report) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [report]);

  const handleResetAudit = () => {
    setReport(null);
    setAuditId(null);
    setStatus(null);
    setError(null);
    setLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Helmet>
        <title>Free AI Website Audit & Performance Analyzer | CoreSlash Technologies</title>
        <meta name="description" content="Audit your website's performance, SEO, mobile responsiveness, accessibility, security headers, technology stack, and AI readiness with CoreSlash Technologies." />
        <link rel="canonical" href="https://coreslashtechnologies.com/website-audit" />
      </Helmet>

      {/* Initial Audit Input Form (Hidden once report is available) */}
      {!report && (
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden animate-fade-in">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-40 left-1/3 w-80 h-80 bg-cyan-300/15 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-sm font-semibold mb-6 backdrop-blur-sm shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>CoreSlash Enterprise Audit Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Free AI Website & Performance Audit
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Instantly evaluate real Core Web Performance scores (Mobile & Desktop), SEO technical health, mobile responsiveness, security configuration, technology stack, and AI readiness.
          </p>

          {/* Input Form */}
          <div className="max-w-3xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 backdrop-blur-md">
            <form onSubmit={handleStartAudit} className="space-y-4">
              <div>
                <label className="block text-left text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  Your Website URL *
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="https://yourwebsite.com"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-medium text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-left text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Competitor URL (Optional)
                  </label>
                  <div className="relative">
                    <BarChart3 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="https://competitor.com"
                      value={competitorUrl}
                      onChange={e => setCompetitorUrl(e.target.value)}
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-left text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Work Email (Optional for PDF)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-left flex items-center gap-2 font-medium">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer text-base"
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
      )}

      {/* Progress State Overlay Modal */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-2xl max-w-sm w-full text-center">
            <div className="w-full flex justify-center items-center">
              <svg viewBox="0 0 200 130" className="w-64 sm:w-72 overflow-visible">
                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#EF4444" />
                  </linearGradient>
                </defs>

                {/* Remaining Track (Light Gray) */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="16"
                  strokeLinecap="round"
                />

                {/* Filled Progress Arc (Orange -> Red Gradient) */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="url(#gaugeGradient)"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray="251.327"
                  strokeDashoffset={
                    251.327 *
                    (1 -
                      (status === 'COMPLETED'
                        ? 100
                        : STAGES.findIndex(s => s.key === status) >= 0
                          ? Math.min(95, Math.round(((STAGES.findIndex(s => s.key === status) + 1) / STAGES.length) * 100))
                          : 15) /
                        100)
                  }
                  style={{ transition: 'stroke-dashoffset 0.6s ease-out' }}
                />

                {/* Centered Live Percentage */}
                <text
                  x="100"
                  y="85"
                  textAnchor="middle"
                  className="text-4xl font-extrabold fill-slate-900"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  {status === 'COMPLETED'
                    ? 100
                    : STAGES.findIndex(s => s.key === status) >= 0
                      ? Math.min(95, Math.round(((STAGES.findIndex(s => s.key === status) + 1) / STAGES.length) * 100))
                      : 15}%
                </text>

                {/* Bottom Left 0% Label */}
                <text
                  x="20"
                  y="122"
                  textAnchor="middle"
                  className="text-xs font-semibold fill-slate-400"
                >
                  0%
                </text>

                {/* Bottom Right 100% Label */}
                <text
                  x="180"
                  y="122"
                  textAnchor="middle"
                  className="text-xs font-semibold fill-slate-400"
                >
                  100%
                </text>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Report Dashboard */}
      {report && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-24 space-y-10 animate-fade-in">
          {/* AUDIT COMPLETE Results Header Bar */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-lg shadow-slate-200/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>AUDIT COMPLETE</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Your Website Audit Results
              </h1>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-base sm:text-lg mt-2 truncate">
                <Globe className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="truncate">{report.url}</span>
              </div>
            </div>

            <button
              onClick={handleResetAudit}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-sm font-bold border border-slate-200 transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-sm"
            >
              <RefreshCw className="w-4 h-4 text-blue-600" />
              <span>Audit Another Website</span>
            </button>
          </div>

          {/* Summary Banner */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg shadow-slate-200/50 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 text-slate-500 text-sm mb-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>Audited Website:</span>
                  <span className="text-slate-900 font-bold">{report.url}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                    Audit Report Summary
                  </h2>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold backdrop-blur-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Complete Audit Report</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-2">
                  Generated on {new Date(report.timestamp).toLocaleString()} • Audit ID: {report.auditId}
                </p>
              </div>

              <div className="flex items-center gap-6 self-stretch lg:self-auto justify-between bg-slate-50 border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Overall Health
                  </div>
                  <div className="text-5xl font-black text-slate-900 flex items-baseline gap-2">
                    <span>{report.overallScore !== null ? report.overallScore : 'N/A'}</span>
                    {report.overallScore !== null && <span className="text-lg font-bold text-slate-400">/100</span>}
                  </div>
                </div>
                <div className="text-center px-6 py-3 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="text-xs text-blue-700 font-bold">Grade</div>
                  <div className="text-3xl font-extrabold text-blue-600">{report.grade}</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <span className="text-sm text-slate-600 font-medium">
                Download the complete branded PDF report for offline review.
              </span>
              <button
                onClick={handleDownloadPdf}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 px-6 rounded-xl shadow-md shadow-blue-500/20 border border-blue-600 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-white" />
                <span>Download PDF Report</span>
              </button>
            </div>
          </div>

          {/* Category Cards */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
              <BarChart3 className="w-5 h-5 text-blue-600" />
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
                  <div key={idx} className="bg-white border border-slate-200/90 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                    <Icon className="w-5 h-5 text-slate-500 mx-auto mb-2.5" />
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{cat.title}</div>
                    {isMeasured ? (
                      <div className={`text-2xl font-black ${isHigh ? 'text-emerald-600' : isMed ? 'text-amber-600' : 'text-red-600'}`}>
                        {scoreVal}
                      </div>
                    ) : (
                      <div className="text-xs font-semibold text-slate-400">Unavailable</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Core Web Vitals & Real Performance Section */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-lg shadow-slate-200/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <span>Core Web Performance & Browser Vitals</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">Real browser performance metrics measured directly via Chrome DevTools Protocol</p>
              </div>

              {/* Strategy Selector (Mobile / Desktop Tabs) */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => setPerfStrategy('mobile')}
                  className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    perfStrategy === 'mobile' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
                <button
                  onClick={() => setPerfStrategy('desktop')}
                  className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    perfStrategy === 'desktop' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
              </div>
            </div>

            {activePerfData?.isMeasured || activePerfData?.status === 'SUCCESS' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  <div className="bg-blue-50/80 p-4 rounded-xl border border-blue-200/80">
                    <div className="text-xs text-blue-700 font-bold uppercase tracking-wider">Perf Score</div>
                    <div className="text-2xl font-black text-blue-900 mt-1">{activePerfData.score !== null ? `${activePerfData.score}/100` : 'N/A'}</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">FCP</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">{activePerfData.fcp || 'N/A'}</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">LCP</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">{activePerfData.lcp || 'N/A'}</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider" title="Total Blocking Time from FCP to Load Event">TBT (Load)</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">{activePerfData.tbt || 'N/A'}</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider" title="W3C Session-Window Layout Shift">CLS</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">{activePerfData.cls !== null && activePerfData.cls !== undefined ? activePerfData.cls : 'N/A'}</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">TTFB</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">{activePerfData.ttfb || 'N/A'}</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">DOM Int</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">{activePerfData.domInteractive || 'N/A'}</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Load Event</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">{activePerfData.loadEvent || 'N/A'}</div>
                  </div>
                </div>

                <div className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-xl text-xs text-slate-600 leading-relaxed">
                  <strong className="text-blue-700 font-semibold">Measurement Methodology:</strong> {activePerfData.methodologyNote || "Measured in Chromium via CDP. Mobile strategy uses viewport (412x823) and mobile User-Agent emulation without CPU/network throttling. Scores use CoreSlash's Lighthouse-style log-normal methodology."}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm flex items-center gap-3 font-medium">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <span className="font-semibold">Browser measurement for {perfStrategy} was unavailable or encountered an issue.</span>
                  <span className="block text-xs text-slate-500 mt-0.5">{activePerfData?.error || 'All other audit categories remain fully valid and measured.'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Top Priority Action Items Section */}
          {report.recommendations && report.recommendations.length > 0 && (
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-lg shadow-slate-200/50">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span>Top Priority Action Items</span>
              </h3>

              <div className="space-y-4">
                {report.recommendations.map((rec, i) => {
                  const service = getServiceMapping(`${rec.title} ${rec.fix}`);
                  return (
                    <div key={i} className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2.5 py-0.5 rounded text-xs font-extrabold uppercase bg-amber-100 text-amber-800 border border-amber-300">
                          {rec.severity}
                        </span>
                        <h4 className="text-base font-bold text-slate-900">{rec.title}</h4>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed pl-1 font-normal">
                        <strong className="text-blue-700 font-semibold">Recommended Fix:</strong> {rec.fix}
                      </p>
                      {service && (
                        <div className="mt-3 pt-3 border-t border-amber-200/60 flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs text-slate-500 font-medium">Need expert help implementing this fix?</span>
                          <a
                            href={service.url}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
                          >
                            <span>{service.ctaText}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Competitor Benchmarking Section */}
          {report.competitorComparison && (
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-lg shadow-slate-200/50">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Competitor Benchmarking</span>
              </h3>

              {report.competitorComparison.details?.status === 'UNAVAILABLE' ? (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 text-sm">
                  Competitor analysis unavailable: {report.competitorComparison.details.reason}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Overall Score</div>
                    <div className="text-3xl font-black text-blue-600 mt-2">
                      {report.competitorComparison.targetScore !== null ? report.competitorComparison.targetScore : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Competitor Score</div>
                    <div className="text-3xl font-black text-purple-600 mt-2">
                      {report.competitorComparison.competitorScore !== null ? report.competitorComparison.competitorScore : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Performance Delta</div>
                    <div className={`text-3xl font-black mt-2 ${
                      (report.competitorComparison.delta ?? 0) >= 0 ? 'text-emerald-600' : 'text-red-600'
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

          {/* Technology Stack Section */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-lg shadow-slate-200/50">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>Detected Technology Stack</span>
            </h3>

            {report.technologyStack.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {report.technologyStack.map((tech, i) => (
                  <div key={i} className="bg-slate-50/80 border border-slate-200/80 p-4 rounded-2xl hover:border-blue-300 transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-slate-900">{tech.name}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">
                        {tech.category}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">{tech.evidence}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-slate-500">No specific framework markers were publicly exposed by the server.</div>
            )}
          </div>

          {/* Detailed Technical Checks Section */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-lg shadow-slate-200/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Detailed Technical Checks ({filteredChecks.length})</span>
              </h3>

              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-semibold">
                {(['ALL', 'PASS', 'WARN', 'FAIL'] as const).map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeFilter === filter ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredChecks.map((chk, i) => {
                const service = chk.status !== 'PASS' ? getServiceMapping(`${chk.title} ${chk.detail || ''} ${chk.recommendation || ''}`) : null;
                return (
                  <div key={i} className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-4 hover:bg-white hover:shadow-sm transition-all">
                    {chk.status === 'PASS' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                    {chk.status === 'WARN' && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />}
                    {chk.status === 'FAIL' && <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />}

                    <div className="flex-1">
                      <div className="font-bold text-slate-900 text-sm">{chk.title}</div>
                      {chk.detail && <div className="text-xs text-slate-500 mt-1">{chk.detail}</div>}
                      {chk.recommendation && (
                        <div className="text-xs text-amber-700 mt-1.5 font-medium bg-amber-50 p-2 rounded-lg border border-amber-200/60 inline-block">
                          Fix: {chk.recommendation}
                        </div>
                      )}
                      {service && (
                        <div className="mt-2.5 flex items-center gap-2">
                          <a
                            href={service.url}
                            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-bold transition-all hover:underline"
                          >
                            <span>{service.ctaText}</span>
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* End-of-Page SEO Services CTA Card */}
      <section className="max-w-4xl mx-auto px-4 pb-20 mt-12">
        <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50/50 border border-blue-200/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-blue-900/5 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Grow Your Business</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
            Need Help Improving Your SEO?
          </h3>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed">
            Let our team help you fix the technical issues and improve your search engine visibility.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700 mb-8">
            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-blue-100 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Technical & On-Page SEO</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-blue-100 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Content Optimization</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-blue-100 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Better Rankings & Traffic</span>
            </div>
          </div>

          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] cursor-pointer text-sm"
          >
            <span>Contact Us for SEO Services</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import EngagementModels from "@/components/web-development/EngagementModels";
import ProcessTimeline from "@/components/web-development/ProcessTimeline";
import FaqSection, { type FaqData } from "@/components/ui/habit-faq-scroller";
import { CoreServiceCard } from "@/components/web-development/CoreServices";

const ppcSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "PPC & Performance Marketing Services",
  "url": "https://coreslashtechnologies.com/services/ppc",
  "provider": {
    "@type": "Organization",
    "name": "CoreSlash Technologies",
    "url": "https://coreslashtechnologies.com/",
    "logo": "https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png"
  },
  "serviceType": "PPC Marketing",
  "description": "Maximize ad spend ROAS with data-driven Google Ads, LinkedIn Ads, retargeting funnels, and landing page conversion rate optimization.",
  "areaServed": "Worldwide"
};

const ppcFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Everything you need to know about our PPC campaign management, ad budgets, and conversion strategies.",
  rows: [
    {
      id: "row1",
      speed: "55s",
      direction: "left",
      faqItems: [
        {
          id: "q1",
          question: "Which ad platforms do you manage?",
          answer: "We specialize in Google Search & Display Ads, YouTube Video Ads, LinkedIn B2B campaigns, and Meta (Facebook/Instagram) retargeting funnels."
        },
        {
          id: "q2",
          question: "How do you optimize ad spend ROAS?",
          answer: "We conduct negative keyword filtering, continuous A/B ad copy testing, custom bid adjustments, and high-converting landing page engineering."
        },
        {
          id: "q3",
          question: "What is your recommended monthly ad budget?",
          answer: "We manage ad budgets ranging from $1,500/month for local campaigns up to $50,000+/month for enterprise global ad accounts."
        }
      ]
    },
    {
      id: "row2",
      speed: "42s",
      direction: "right",
      faqItems: [
        {
          id: "q4",
          question: "Do you design custom landing pages for ads?",
          answer: "Yes, we design ultra-fast, mobile-optimized landing pages designed specifically for maximum lead conversion and Quality Score optimization."
        },
        {
          id: "q5",
          question: "How soon can we see PPC campaign results?",
          answer: "Google Search campaigns generate qualified impressions and conversions within the first 24 to 48 hours of ad launch."
        }
      ]
    }
  ]
};

export default function PPCServices() {
  return (
    <>
      <Helmet>
        <title>Google Ads & PPC Management Services | CoreSlash Technologies</title>
        <meta name="description" content="Maximize return on ad spend with target-driven Google Ads and LinkedIn B2B PPC management campaigns optimized for conversions by CoreSlash Technologies." />
        <link rel="canonical" href="https://coreslashtechnologies.com/services/ppc" />
        <script type="application/ld+json">{JSON.stringify(ppcSchema)}</script>
      </Helmet>

      {/* 1. HERO SECTION */}
      <section
        className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-start overflow-hidden py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-slate-950"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dual Vignette Overlay: Blends both left and right edges seamlessly into deep dark slate-950 */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-l from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent)] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto w-full relative z-10 text-left space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-zinc-300 select-none">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <span>&gt;</span>
            <Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link>
            <span>&gt;</span>
            <span className="text-[#3b82f6] font-bold">Google Ads & PPC</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15] max-w-4xl">
            Maximizing Ad ROAS with{" "}
            <span className="text-[#3b82f6]">
              Data-Driven PPC
            </span>
          </h1>

          <p className="text-zinc-300 text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl font-medium">
            We engineer high-intent Google Search campaigns, LinkedIn B2B funnels, retargeting engines, and conversion-focused landing pages designed to maximize your return on ad spend.
          </p>

          {/* CTA Buttons & Feature Badges Row */}
          <div className="pt-2 space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all text-center"
              >
                <span>Launch Your PPC Campaign</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition-all text-center"
              >
                <span>View PPC Case Studies</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-300 pt-3 border-t border-slate-800/80 max-w-3xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>High-Intent Google Search Ads</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Quality Score Optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Maximum ROAS Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE SERVICES */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden bg-background">
        <div className="flex flex-col items-start gap-4 mb-16">
          <div className="flex items-center">
            <div className="w-[3px] h-6 bg-[#3b82f6] rounded-full mr-3" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Core Services – PPC & Growth Marketing
            </h3>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">Precision Performance Marketing</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CoreServiceCard
            number="01"
            title="Google Search & Shopping Ads"
            subtext="Capture high-intent buyers searching for your exact products and services with optimized bid strategies, negative keyword protection, and compelling ad copy."
            badge="Search Ads"
          />
          <CoreServiceCard
            number="02"
            title="LinkedIn B2B Lead Generation"
            subtext="Target C-suite executives, decision makers, and enterprise accounts with account-based LinkedIn sponsored content and direct messaging funnels."
            badge="B2B Growth"
          />
          <CoreServiceCard
            number="03"
            title="Landing Page CRO & Speed Tuning"
            subtext="Convert paid ad traffic into qualified leads with sub-second landing pages engineered with instant form validation and frictionless UX design."
            badge="CRO Engineering"
          />
          <CoreServiceCard
            number="04"
            title="Retargeting & Audience Funnels"
            subtext="Re-engage previous website visitors across Google Display Network, Meta, and YouTube to increase multi-touch sales conversions."
            badge="Retargeting"
          />
        </div>
      </section>

      {/* 3. ENGAGEMENT MODELS */}
      <EngagementModels />

      {/* 4. PROCESS TIMELINE */}
      <ProcessTimeline />

      {/* 5. FAQ SECTION */}
      <FaqSection data={ppcFaqData} />
    </>
  );
}

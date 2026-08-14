import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import EngagementModels from "@/components/web-development/EngagementModels";
import ProcessTimeline from "@/components/web-development/ProcessTimeline";
import FaqSection, { type FaqData } from "@/components/ui/habit-faq-scroller";
import { CoreServiceCard } from "@/components/web-development/CoreServices";

const seoSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "SEO & Organic Search Services",
  "url": "https://coreslashtechnologies.com/services/seo-solutions",
  "provider": {
    "@type": "Organization",
    "name": "CoreSlash Technologies",
    "url": "https://coreslashtechnologies.com/",
    "logo": "https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png"
  },
  "serviceType": "Search Engine Optimization",
  "description": "Technical SEO audits, structural schema.org markup, high-intent keyword targeting, and organic link building designed to maximize Google search rankings.",
  "areaServed": "Worldwide"
};

const seoFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Everything you need to know about technical SEO, schema markup, and organic search growth.",
  rows: [
    {
      id: "row1",
      speed: "45s",
      direction: "left",
      faqItems: [
        { id: "q1", question: "How long does it take to see SEO results?", answer: "SEO is a compound growth strategy. Initial technical quick fixes show improvements within 4-6 weeks, while page-one rankings mature in 3-6 months." },
        { id: "q2", question: "What is Technical SEO and why is it important?", answer: "Technical SEO ensures crawlers index your site efficiently. It covers site speed, mobile usability, canonical tags, XML sitemaps, and SSL." }
      ]
    },
    {
      id: "row2",
      speed: "40s",
      direction: "right",
      faqItems: [
        { id: "q3", question: "Do you guarantee #1 rankings on Google?", answer: "No reputable agency guarantees position #1 because algorithms update constantly. However, our methodology consistently delivers top rankings." },
        { id: "q4", question: "Do you optimize for local SEO?", answer: "Yes! CoreSlash optimizes Google Business Profiles, local citations, NAP consistency, and geo-targeted landing pages for local search dominance." }
      ]
    }
  ]
};

export default function SEOOptimization() {

  return (
    <>
      <Helmet>
        <title>SEO Optimization Services | CoreSlash Technologies</title>
        <meta name="description" content="Technical SEO audits, schema markup, high-intent keyword strategies, and organic search ranking growth." />
        <link rel="canonical" href="https://coreslashtechnologies.com/services/seo-solutions" />
        <script type="application/ld+json">{JSON.stringify(seoSchema)}</script>
      </Helmet>

      {/* 1. HERO SECTION */}
      <section
        className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-start overflow-hidden py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-slate-950"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1600&auto=format&fit=crop&q=80')",
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
            <span className="text-[#3b82f6] font-bold">SEO Solutions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15] max-w-4xl">
            Dominating Search Rankings with{" "}
            <span className="text-[#3b82f6]">
              Data-Driven SEO
            </span>
          </h1>

          <p className="text-zinc-300 text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl font-medium">
            CoreSlash Technologies provides SEO services focused on technical SEO audits, structured data, high-intent keyword strategies, and organic link building designed to maximize Google search visibility.
          </p>

          {/* CTA Buttons & Feature Badges Row */}
          <div className="pt-2 space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all text-center"
              >
                <span>Boost Search Rankings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition-all text-center"
              >
                <span>View SEO Case Studies</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-300 pt-3 border-t border-slate-800/80 max-w-3xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Technical SEO & Schema</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Core Web Vitals Speed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Page #1 Keyword Growth</span>
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
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-muted-foreground">
              Core Services – SEO Optimization
            </h3>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">Complete Organic Search Growth</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CoreServiceCard
            number="01"
            title="Technical SEO & Architecture Audits"
            subtext="Fix crawl budgets, canonical conflicts, JavaScript indexing bottlenecks, XML sitemaps, and core Web Vitals page speed metrics."
            highlight="Engineered to achieve sub-second page loads and zero Google Search Console indexing errors."
            darkBg={true}
            delay={0.1}
          />
          <CoreServiceCard
            number="02"
            title="On-Page SEO & Structured Data"
            subtext="Implement HTML5 semantic structure, Schema.org JSON-LD microdata, metadata optimization, and internal link silos."
            highlight="Rich search snippet eligibility with structured Schema.org data markup."
            delay={0.2}
          />
          <CoreServiceCard
            number="03"
            title="Content Strategy & Keyword Targeting"
            subtext="Develop topical authority clusters and high-converting landing page content focused on commercial search intent."
            highlight="Laser-targeted keyword maps focused on driving high-intent organic conversion traffic."
            delay={0.3}
          />
          <CoreServiceCard
            number="04"
            title="Authority & Organic Link Building"
            subtext="White-hat editorial outreach and digital PR to earn domain authority backlinks from high-trust industry publications."
            highlight="High-authority white-hat backlink profiles built for sustainable long-term ranking dominance."
            blueBg={true}
            delay={0.4}
          />
        </div>
      </section>

      {/* 3. PROCESS TIMELINE */}
      <ProcessTimeline />

      {/* 4. ENGAGEMENT MODELS */}
      <EngagementModels />

      {/* 6. FAQS */}
      <section className="w-full py-16 md:py-24 border-t border-border/40 overflow-hidden bg-background">
        <FaqSection data={seoFaqData} />
      </section>

      {/* 7. CTA */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="rounded-[3rem] bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-10 md:p-16 text-center text-white relative overflow-hidden"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to Dominate Search Engine Results?</h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-8">Get a complete technical SEO audit and keyword strategy roadmap from our engineers.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#3b82f6] text-white font-extrabold hover:bg-blue-600 transition-all shadow-lg">
            <span>Request Free Audit</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}

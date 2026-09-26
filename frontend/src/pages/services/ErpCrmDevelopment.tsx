import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Server, CheckCircle2 } from "lucide-react";
import EngagementModels from "@/components/web-development/EngagementModels";
import ProcessTimeline from "@/components/web-development/ProcessTimeline";
import FaqSection, { type FaqData } from "@/components/ui/habit-faq-scroller";
import { CoreServiceCard } from "@/components/web-development/CoreServices";
import {
  SiNodedotjs, SiPython, SiGo, SiDocker, SiKubernetes,
  SiPostgresql, SiMongodb, SiRedis, SiTypescript
} from "react-icons/si";

// ----------------------------------------------------
// SCHEMA
// ----------------------------------------------------
const erpSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom ERP Software Development",
  "url": "https://coreslashtechnologies.com/services/erp-crm-development",
  "provider": {
    "@type": "Organization",
    "name": "CoreSlash Technologies",
    "url": "https://coreslashtechnologies.com/",
    "logo": "https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png"
  },
  "serviceType": "ERP and CRM Engineering",
  "description": "Top custom ERP software development company in India. We build scalable cloud ERP solutions, automate business processes, and integrate secure CRM systems.",
  "areaServed": "Worldwide"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is custom ERP development vs off-the-shelf?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Custom ERP software is engineered specifically for your business logic. You get 100% IP ownership, zero licensing fees per user, and unlimited scalability, whereas off-the-shelf SaaS limits flexibility."
      }
    },
    {
      "@type": "Question",
      "name": "How do you handle software data security and RBAC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CoreSlash enforces AES-256 data encryption, Granular Role-Based Access Control (RBAC), multi-factor auth, and compliance auditing for SOC2, HIPAA, and GDPR."
      }
    }
  ]
};

// ----------------------------------------------------
// TECH STACK DATA
// ----------------------------------------------------
const SOFTWARE_TECHS = [
  { name: "NODE.JS", icon: <SiNodedotjs className="w-6 h-6" />, color: "#339933" },
  { name: "PYTHON", icon: <SiPython className="w-6 h-6" />, color: "#3776AB" },
  { name: "GOLANG", icon: <SiGo className="w-6 h-6" />, color: "#00ADD8" },
  { name: "TYPESCRIPT", icon: <SiTypescript className="w-6 h-6" />, color: "#3178C6" },
  { name: "DOCKER", icon: <SiDocker className="w-6 h-6" />, color: "#2496ED" },
  { name: "KUBERNETES", icon: <SiKubernetes className="w-6 h-6" />, color: "#326CE5" },
  { name: "AWS CLOUD", icon: <Server className="w-6 h-6" />, color: "#FF9900" },
  { name: "POSTGRESQL", icon: <SiPostgresql className="w-6 h-6" />, color: "#4169E1" },
  { name: "MONGODB", icon: <SiMongodb className="w-6 h-6" />, color: "#47A248" },
  { name: "REDIS CACHE", icon: <SiRedis className="w-6 h-6" />, color: "#DC382D" }
];

// ----------------------------------------------------
// CASE STUDIES DATA
// ----------------------------------------------------
const CASE_STUDIES = [
  {
    title: "OmniERP – Multi-Tenant Enterprise Software",
    subtext: "Cloud-native ERP platform automating inventory forecasting, multi-warehouse logistics, and real-time financial reporting.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80",
    link: "/portfolio"
  },
  {
    title: "DataStream – Real-Time Logistics Analytics",
    subtext: "Event-driven microservices architecture processing 50,000+ telemetry events per second with sub-100ms dashboard latency.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80",
    link: "/portfolio"
  }
];

const erpFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Everything you need to know about our custom ERP software development and architecture.",
  rows: [
    {
      id: "row1",
      speed: "50s",
      direction: "left",
      faqItems: [
        { id: "q1", question: "What is custom ERP development vs off-the-shelf?", answer: "Custom ERP software is engineered specifically for your business logic. You get 100% IP ownership, zero licensing fees per user, and unlimited scalability, whereas off-the-shelf SaaS limits flexibility." },
        { id: "q2", question: "How long does an enterprise ERP project take?", answer: "A custom SaaS MVP takes 8 to 12 weeks. Large-scale enterprise platforms with complex database migrations take 14 to 20 weeks." }
      ]
    },
    {
      id: "row2",
      speed: "45s",
      direction: "right",
      faqItems: [
        { id: "q3", question: "Can you modernize our existing legacy application?", answer: "Yes! CoreSlash converts monolithic applications into microservices, wrap legacy databases with modern REST APIs, and deploy zero-downtime cloud pipelines." },
        { id: "q4", question: "How do you handle software data security and RBAC?", answer: "CoreSlash enforces AES-256 data encryption, Granular Role-Based Access Control (RBAC), multi-factor auth, and compliance auditing for SOC2, HIPAA, and GDPR." },
        { id: "q5", question: "Do you offer post-deployment SLA support?", answer: "Yes, CoreSlash provides 24/7 infrastructure monitoring, zero-downtime CI/CD deployment pipelines, automated backups, and guaranteed SLA response times." }
      ]
    }
  ]
};

export default function ErpCrmDevelopment() {
  return (
    <>
      <Helmet>
        <title>Custom ERP Software Development Company in India | CoreSlash</title>
        <meta name="description" content="Top custom ERP software development company in India. We build scalable cloud ERP solutions, automate business processes, and integrate secure CRM systems." />
        <link rel="canonical" href="https://coreslashtechnologies.com/services/erp-crm-development" />

        {/* Open Graph SEO */}
        <meta property="og:title" content="Custom ERP Software Development Company in India | CoreSlash" />
        <meta property="og:description" content="Top custom ERP software development company in India. We build scalable cloud ERP solutions, automate business processes, and integrate secure CRM systems." />
        <meta property="og:url" content="https://coreslashtechnologies.com/services/erp-crm-development" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png" />

        {/* Twitter Card SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Custom ERP Software Development Company in India | CoreSlash" />
        <meta name="twitter:description" content="Top custom ERP software development company in India. We build scalable cloud ERP solutions, automate business processes, and integrate secure CRM systems." />
        <meta name="twitter:image" content="https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png" />

        <script type="application/ld+json">{JSON.stringify(erpSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* 1. HERO SECTION */}
      <section
        className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-start overflow-hidden py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-slate-950"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dual Vignette Overlay */}
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
            <span className="text-[#3b82f6] font-bold">ERP & CRM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15] max-w-4xl">
            Custom ERP{" "}
            <span className="text-[#3b82f6]">
              Software Development
            </span>{" "}
            Company in India
          </h1>

          <p className="text-zinc-300 text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl font-medium">
            CoreSlash Technologies is a top custom ERP software development company in India. We build scalable cloud ERP solutions, automate business processes, and integrate secure CRM systems for enterprises worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all text-center"
              >
                <span>Architect Your ERP System</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition-all text-center"
              >
                <span>View ERP Case Studies</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-300 pt-3 border-t border-slate-800/80 max-w-3xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Microservices & Distributed APIs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>SOC2 Security & Cloud Datacenters</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>99.99% Uptime Guarantee</span>
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
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-muted-foreground">
              End-to-End Custom ERP Development Services
            </h2>
          </div>
          <p className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">Automate Business Processes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CoreServiceCard
            number="01"
            title="Enterprise Resource Planning (ERP) Implementation"
            subtext="Build scalable multi-tenant SaaS platforms, custom ERP engines, and automated workflow portals with 100% IP ownership."
            highlight="Multi-tenant cloud architecture built to support high concurrency."
            darkBg={true}
            delay={0.1}
          />
          <CoreServiceCard
            number="02"
            title="Business Process Automation & Workflows"
            subtext="Architect high-concurrency cloud microservices to automate complex operational workflows and financial reporting."
            highlight="Eliminate manual data entry and streamline enterprise operations."
            delay={0.2}
          />
          <CoreServiceCard
            number="03"
            title="CRM Integration & Cloud Modules"
            subtext="Connect complex third-party software, secure RESTful/GraphQL webhooks, and real-time CRM dashboards."
            highlight="Seamless system interoperability with real-time data sync."
            delay={0.3}
          />
          <CoreServiceCard
            number="04"
            title="Custom ERP vs. Off-the-Shelf SaaS"
            subtext="Migrate away from expensive licensing per-user. Custom ERPs deliver long-term ROI with tailor-made business logic."
            highlight="100% intellectual property ownership with zero licensing fees."
            blueBg={true}
            delay={0.4}
          />
        </div>
      </section>

      {/* 3. PROCESS TIMELINE */}
      <ProcessTimeline />

      {/* 4. ENGAGEMENT MODELS */}
      <EngagementModels />

      {/* 5. TECH STACK */}
      <section className="relative w-full py-24 border-t border-border/40 overflow-hidden bg-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 w-full text-left">
          <div className="text-center max-w-[900px] mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2 mb-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/20">
              <span>Modern Technology Stack</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight text-center">
              Core Technologies Used in Our ERP Systems
            </h2>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-4xl mx-auto font-normal text-center">
              CoreSlash leverages cloud-native enterprise technologies ensuring sub-second response times, rock-solid security, and seamless horizontal scalability.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
            {SOFTWARE_TECHS.map((tech) => (
              <div key={tech.name} className="flex items-center gap-4 p-4 md:p-5 bg-white dark:bg-slate-900 border border-border/60 rounded-2xl shadow-sm hover:border-blue-500/20 transition-all select-none">
                <div className="text-2xl md:text-3xl" style={{ color: tech.color }}>{tech.icon}</div>
                <span className="text-sm md:text-base font-medium text-foreground/90 uppercase truncate">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INDUSTRIES */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden bg-background">
        <div className="text-center max-w-[900px] mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 leading-tight text-center">
            Industries & Use Cases for Custom ERPs
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal text-center">
            Our custom ERPs are utilized across manufacturing, supply chain, logistics, and regional IT sectors to streamline large-scale operations.
          </p>
        </div>
      </section>

      {/* 7. WHY CHOOSE US */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden bg-background">
        <div className="text-center max-w-[900px] mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 leading-tight text-center">
            Why Choose Us for ERP Development in India?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal text-center">
            As a leading software development company, we provide end-to-end 100% IP ownership, stringent SOC2-compliant security, and limitless scalability designed specifically for your organizational structure.
          </p>
        </div>
      </section>

      {/* 8. CASE STUDIES */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden bg-background">
        <div className="text-center max-w-[900px] mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 mb-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/25">
            <span>Case Studies</span>
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-4 leading-tight text-center">
            Featured ERP{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Case Studies
            </span>
          </h3>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal text-center mb-6">
            Real-world enterprise platforms engineered by our development teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-5xl mx-auto">
          {CASE_STUDIES.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group flex flex-col justify-between rounded-[2rem] bg-white dark:bg-slate-900 border border-border/80 shadow-sm hover:shadow-lg transition-all p-6"
            >
              <div className="relative w-full h-56 bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center mb-6 border border-border/40">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500" />
              </div>

              <div className="text-left space-y-3 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="text-lg md:text-xl font-extrabold text-foreground group-hover:text-[#3b82f6] transition-colors">{item.title}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mt-2 line-clamp-3">{item.subtext}</p>
                </div>
                <div className="flex justify-end pt-4 mt-auto">
                  <Link to={item.link} className="text-xs md:text-sm font-extrabold text-[#3b82f6] flex items-center gap-1 group/btn uppercase tracking-wider">
                    View Case Study <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9. FAQS */}
      <section className="w-full py-16 md:py-24 border-t border-border/40 overflow-hidden bg-background">
        <h2 className="sr-only">Frequently Asked Questions (FAQs)</h2>
        <FaqSection data={erpFaqData} />
      </section>

      {/* 10. CTA */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="rounded-[3rem] bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-10 md:p-16 text-center text-white relative overflow-hidden"
        >
          <p className="text-3xl md:text-5xl font-black mb-6">Ready to Architect Your Enterprise ERP System?</p>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-8">Consult with our lead software architects to design your custom platform.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#3b82f6] text-white font-extrabold hover:bg-blue-600 transition-all shadow-lg">
            <span>Schedule Architecture Call</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}

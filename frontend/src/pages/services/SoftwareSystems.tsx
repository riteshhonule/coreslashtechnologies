import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Server,
  CheckCircle2,
  Layers,
  Database,
  Users,
  Code2,
  ShieldCheck,
  Zap
} from "lucide-react";
import EngagementModels from "@/components/web-development/EngagementModels";
import ProcessTimeline from "@/components/web-development/ProcessTimeline";
import FaqSection, { type FaqData } from "@/components/ui/habit-faq-scroller";
import { CoreServiceCard } from "@/components/web-development/CoreServices";
import {
  SiNodedotjs,
  SiNestjs,
  SiPython,
  SiDjango,
  SiFastapi,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiTypescript
} from "react-icons/si";

import pitcsImg from "@/assets/portfolio/pitcs.webp";
import skandanImg from "@/assets/portfolio/skandan.webp";
import fintrackImg from "@/assets/portfolio/fintrack.webp";

// ----------------------------------------------------
// STRUCTURED DATA (JSON-LD) SCHEMAS
// ----------------------------------------------------
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom Software Development Company in India",
  "url": "https://coreslashtechnologies.com/services/software-systems",
  "provider": {
    "@type": "Organization",
    "name": "CoreSlash Technologies",
    "url": "https://coreslashtechnologies.com/",
    "logo": "https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png"
  },
  "serviceType": "Custom Software Engineering Services",
  "description": "CoreSlash is a custom software development company in India engineering enterprise software systems, legacy modernization, cloud microservices, and dedicated dev teams.",
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Custom Software Engineering Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Enterprise Software Development"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Enterprise Software Modernization Services"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Backend API Development Services"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Dedicated Development Team India"
        }
      }
    ]
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://coreslashtechnologies.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://coreslashtechnologies.com/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Software Systems",
      "item": "https://coreslashtechnologies.com/services/software-systems"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the typical development timeline for custom enterprise software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A standard custom software MVP typically takes 8 to 12 weeks to design, develop, and launch. Large-scale enterprise systems, multi-tenant SaaS platforms, or complex legacy software migrations usually require 14 to 24 weeks delivered in milestone-based agile sprints."
      }
    },
    {
      "@type": "Question",
      "name": "Do clients own the complete intellectual property (IP) and source code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Clients retain full ownership of custom source code, documentation, and project assets delivered under the scope of work upon milestone completion and final handover."
      }
    },
    {
      "@type": "Question",
      "name": "How does CoreSlash modernize legacy software without business disruption?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We apply phased modernization patterns such as the Strangler Fig approach. We decouple legacy monolithic backends into modular cloud microservices, wrap existing relational databases with modern REST and GraphQL APIs, and use phased staging and validation testing to minimize operational disruption and safeguard data integrity throughout the transition."
      }
    },
    {
      "@type": "Question",
      "name": "How do your dedicated development team and IT staff augmentation models operate in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our dedicated development teams and IT staff augmentation pods integrate directly with your product managers, daily standups, and Git workflows. Clients work directly with experienced software engineers who integrate with your workflow, providing transparent sprint tracking, regular check-ins, and overlapping working hours."
      }
    },
    {
      "@type": "Question",
      "name": "What security protocols and data compliance standards are implemented in custom software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We implement industry-standard security best practices, including OWASP security principles, data encryption in transit and at rest, role-based access control (RBAC), secure token authentication, and dependency vulnerability scans."
      }
    },
    {
      "@type": "Question",
      "name": "How do you estimate costs for custom software development projects in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Estimates are prepared based on technical architecture requirements, third-party integrations, and project scope. We provide milestone-based pricing for clearly scoped deliverables as well as flexible monthly team engagements tailored to your roadmap."
      }
    }
  ]
};

// ----------------------------------------------------
// TECH STACK DATA
// ----------------------------------------------------
const SOFTWARE_TECHS = [
  { name: "NODE.JS", icon: <SiNodedotjs className="w-6 h-6" />, color: "#339933" },
  { name: "NESTJS", icon: <SiNestjs className="w-6 h-6" />, color: "#E0234E" },
  { name: "PYTHON", icon: <SiPython className="w-6 h-6" />, color: "#3776AB" },
  { name: "DJANGO", icon: <SiDjango className="w-6 h-6" />, color: "#092E20" },
  { name: "FASTAPI", icon: <SiFastapi className="w-6 h-6" />, color: "#009688" },
  { name: "TYPESCRIPT", icon: <SiTypescript className="w-6 h-6" />, color: "#3178C6" },
  { name: "POSTGRESQL", icon: <SiPostgresql className="w-6 h-6" />, color: "#4169E1" },
  { name: "REDIS CACHE", icon: <SiRedis className="w-6 h-6" />, color: "#DC382D" },
  { name: "DOCKER", icon: <SiDocker className="w-6 h-6" />, color: "#2496ED" },
  { name: "KUBERNETES", icon: <SiKubernetes className="w-6 h-6" />, color: "#326CE5" },
  { name: "AWS CLOUD", icon: <Server className="w-6 h-6" />, color: "#FF9900" },
  { name: "MONGODB", icon: <SiMongodb className="w-6 h-6" />, color: "#47A248" }
];

// ----------------------------------------------------
// VERIFIED CASE STUDIES DATA (MATCHING PORTFOLIO REPO)
// ----------------------------------------------------
const CASE_STUDIES = [
  {
    title: "Skandan – Enterprise Advisory & Decision Engine",
    subtext: "Executive decision platform engineered with React, TypeScript, and Python Django, featuring operational modeling and structured risk reporting.",
    imageUrl: skandanImg,
    link: "/portfolio"
  },
  {
    title: "FinTrack – Corporate Financial Operations Portal",
    subtext: "Financial operations and treasury management portal built with React, NestJS, and PostgreSQL for automated transaction reconciliation and reporting.",
    imageUrl: fintrackImg,
    link: "/portfolio"
  },
  {
    title: "PITCS – Global Workforce Management Platform",
    subtext: "Enterprise talent management and recruiter workflow platform engineered with React, Next.js, and Node.js for high-volume candidate operations.",
    imageUrl: pitcsImg,
    link: "/portfolio"
  }
];

// ----------------------------------------------------
// FAQ DATA FOR SCROLLER UI
// ----------------------------------------------------
const softwareFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Everything you need to know about our custom software development, architecture, modernization, and dedicated engineering pods in India.",
  rows: [
    {
      id: "row1",
      speed: "50s",
      direction: "left",
      faqItems: [
        {
          id: "q1",
          question: "What is the typical development timeline for custom enterprise software?",
          answer: "A standard custom software MVP typically takes 8 to 12 weeks to design, develop, and launch. Large-scale enterprise systems, multi-tenant SaaS platforms, or complex legacy software migrations usually require 14 to 24 weeks delivered in milestone-based agile sprints."
        },
        {
          id: "q2",
          question: "Do clients own the complete intellectual property (IP) and source code?",
          answer: "Yes. Clients retain full ownership of custom source code, documentation, and project assets delivered under the scope of work upon milestone completion and final handover."
        },
        {
          id: "q3",
          question: "How does CoreSlash modernize legacy software without business disruption?",
          answer: "We apply phased modernization patterns such as the Strangler Fig approach. We decouple legacy monolithic backends into modular cloud microservices, wrap existing relational databases with modern REST and GraphQL APIs, and use phased staging and validation testing to minimize operational disruption and safeguard data integrity throughout the transition."
        }
      ]
    },
    {
      id: "row2",
      speed: "45s",
      direction: "right",
      faqItems: [
        {
          id: "q4",
          question: "How do your dedicated development team and IT staff augmentation models operate in India?",
          answer: "Our dedicated development teams and IT staff augmentation pods integrate directly with your product managers, daily standups, and Git workflows. Clients work directly with experienced software engineers who integrate with your workflow, providing transparent sprint tracking, regular check-ins, and overlapping working hours."
        },
        {
          id: "q5",
          question: "What security protocols and data compliance standards are implemented in custom software?",
          answer: "We implement industry-standard security best practices, including OWASP security principles, data encryption in transit and at rest, role-based access control (RBAC), secure token authentication, and dependency vulnerability scans."
        },
        {
          id: "q6",
          question: "How do you estimate costs for custom software development projects in India?",
          answer: "Estimates are prepared based on technical architecture requirements, third-party integrations, and project scope. We provide milestone-based pricing for clearly scoped deliverables as well as flexible monthly team engagements tailored to your roadmap."
        }
      ]
    }
  ]
};

export default function SoftwareSystems() {
  return (
    <>
      <Helmet>
        <title>Custom Software Development Company in India | CoreSlash Technologies</title>
        <meta
          name="description"
          content="CoreSlash is a custom software development company in India engineering enterprise software systems, legacy modernization, cloud microservices, and dedicated dev teams."
        />
        <link rel="canonical" href="https://coreslashtechnologies.com/services/software-systems" />

        {/* Open Graph SEO */}
        <meta property="og:title" content="Custom Software Development Company in India | CoreSlash Technologies" />
        <meta
          property="og:description"
          content="CoreSlash is a custom software development company in India engineering enterprise software systems, legacy modernization, cloud microservices, and dedicated dev teams."
        />
        <meta property="og:url" content="https://coreslashtechnologies.com/services/software-systems" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png" />

        {/* Twitter Card SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Custom Software Development Company in India | CoreSlash Technologies" />
        <meta
          name="twitter:description"
          content="CoreSlash is a custom software development company in India engineering enterprise software systems, legacy modernization, cloud microservices, and dedicated dev teams."
        />
        <meta name="twitter:image" content="https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png" />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
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
            <span className="text-[#3b82f6] font-bold">Software Systems</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15] max-w-4xl">
            Custom Software Development Company &{" "}
            <span className="text-[#3b82f6]">
              Enterprise Engineering in India
            </span>
          </h1>

          <p className="text-zinc-300 text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl font-medium">
            CoreSlash Technologies is a premier custom software development company in India offering end-to-end custom software engineering services. We engineer bespoke business software, scalable cloud architectures, high-performance backend platforms, and secure enterprise software modernization solutions for growing companies and global businesses.
          </p>

          {/* CTA Buttons & Feature Badges Row */}
          <div className="pt-2 space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all text-center"
              >
                <span>Consult Our Software Architects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition-all text-center"
              >
                <span>View System Architecture</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-300 pt-3 border-t border-slate-800/80 max-w-3xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Custom Software Engineering Services</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Cloud Microservices & Backend APIs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Dedicated Development Teams in India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Service Contextual Banner */}
      <section className="w-full py-12 bg-slate-950 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <p className="max-w-4xl mx-auto text-sm md:text-base text-slate-400 leading-relaxed">
            As a full-lifecycle <strong className="text-white font-medium">custom software development company in India</strong>, we deliver robust solutions across the entire tech stack. Expanding your digital footprint? Discover our <Link to="/services/web-development" className="text-[#3b82f6] font-semibold hover:underline">custom web development services</Link>, modernize business operations with our <Link to="/services/erp-crm-development" className="text-[#3b82f6] font-semibold hover:underline">custom ERP software development company</Link> solutions, or implement autonomous workflows with our <Link to="/services/ai-automation" className="text-[#3b82f6] font-semibold hover:underline">AI automation services</Link>. Regional leaders can also explore our index of top <Link to="/top-it-companies-in-belagavi" className="text-[#3b82f6] font-semibold hover:underline">software companies in Belgaum</Link>.
          </p>
        </div>
      </section>

      {/* 2. CORE SERVICES */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden bg-background">
        <div className="flex flex-col items-start gap-4 mb-16">
          <div className="flex items-center">
            <div className="w-[3px] h-6 bg-[#3b82f6] rounded-full mr-3" />
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#3b82f6]">
              Core Services – Software Systems
            </h3>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
            Full-Lifecycle Software Development Services & Enterprise Engineering
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-3xl">
            As an engineering-driven custom software development company in India, we provide custom software engineering services tailored to complex operating workflows, high data volumes, and mission-critical reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Link to="/services/erp-crm-development" className="block focus:outline-none">
            <CoreServiceCard
              number="01"
              title="Enterprise Software Development & ERP Systems"
              subtext="Build scalable multi-tenant SaaS platforms, custom enterprise software development solutions, and automated workflow engines with complete source code ownership and client IP rights upon project completion."
              highlight="Multi-tenant cloud architecture built to support high concurrency and operational uptime."
              darkBg={true}
              delay={0.1}
            />
          </Link>
          <CoreServiceCard
            number="02"
            title="Custom Backend API Development & Microservices Architecture"
            subtext="Engineer high-concurrency custom backend API development services and microservices architecture consulting services using Node.js, NestJS, Python Django, and FastAPI."
            highlight="High-availability microservice clusters built for fault tolerance, event-driven messaging, and zero-downtime deploys."
            delay={0.2}
          />
          <CoreServiceCard
            number="03"
            title="Legacy Software Modernization & Cloud Migration Services"
            subtext="Transform legacy monolithic systems into resilient cloud architectures with enterprise software modernization services, designed to minimize downtime and preserve data integrity."
            highlight="Risk-mitigated architectural refactoring boosting legacy system execution speed, security, and scalability."
            delay={0.3}
          />
          <CoreServiceCard
            number="04"
            title="Dedicated Development Teams & IT Staff Augmentation"
            subtext="Scale engineering output with a dedicated development team in India. Engage dedicated Node.js, Python, and full-stack software engineers aligned with your sprint cycles."
            highlight="Flexible staff augmentation and dedicated engineering pods delivering predictable milestone velocity."
            blueBg={true}
            delay={0.4}
          />
        </div>
      </section>

      {/* 3. LEGACY MODERNIZATION DEEP DIVE */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden bg-background">
        <div className="flex flex-col items-start gap-4 mb-16">
          <div className="flex items-center">
            <div className="w-[3px] h-6 bg-[#3b82f6] rounded-full mr-3" />
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#3b82f6]">
              Modernization & Migration
            </h3>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
            Legacy Software Modernization & Cloud Migration Services
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-3xl">
            Eliminate technical debt, unmaintainable monolithic codebases, and restrictive licensing fees with our structured enterprise software modernization services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-border/80 shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Monolith to Microservices Refactoring</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Decouple legacy applications using the Strangler Fig pattern. We extract business modules into independent, containerized microservices built with Node.js and FastAPI without disrupting day-to-day operations.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-border/80 shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Structured Database Migration & Modernization</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Migrate complex relational schemas from legacy environments to modern PostgreSQL and cloud databases. We apply automated validation pipelines and parallel run stages to minimize operational downtime and protect data integrity.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-border/80 shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Secure REST & GraphQL API Wrapping</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Wrap legacy database backends with secure, documented REST and GraphQL endpoints, allowing modern web applications and mobile apps to integrate seamlessly with existing business data.
            </p>
          </div>
        </div>
      </section>

      {/* 4. DEDICATED DEVELOPMENT TEAMS & STAFF AUGMENTATION */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden bg-background">
        <div className="flex flex-col items-start gap-4 mb-16">
          <div className="flex items-center">
            <div className="w-[3px] h-6 bg-[#3b82f6] rounded-full mr-3" />
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#3b82f6]">
              Staff Augmentation & Pods
            </h3>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
            Dedicated Development Teams & IT Staff Augmentation in India
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-3xl">
            Accelerate your product roadmap with senior software engineers, backend specialists, and tech leads who integrate directly into your sprint workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-border/80 shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Dedicated Engineering Pods</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cross-functional engineering squads including senior backend developers, frontend engineers, DevOps specialists, and QA engineers managing end-to-end sprint deliverables.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-border/80 shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">IT Staff Augmentation Services</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Bridge critical technical skill gaps on-demand. Access experienced Node.js, Python, and TypeScript software engineers who integrate directly with your standups, Jira boards, and development workflows.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-border/80 shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Transparent Sprint Governance & IP Protection</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full operational visibility with daily asynchronous standups, regular sprint demos, time-zone overlap, and complete client ownership of custom source code upon milestone handover.
            </p>
          </div>
        </div>
      </section>

      {/* 5. PROCESS TIMELINE */}
      <ProcessTimeline />

      {/* 6. ENGAGEMENT MODELS */}
      <EngagementModels />

      {/* 7. TECH STACK */}
      <section className="relative w-full py-24 border-t border-border/40 overflow-hidden bg-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 w-full text-left">
          <div className="text-center max-w-[900px] mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2 mb-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/20">
              <span>Modern Technology Stack</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight text-center">
              Enterprise Backend Technologies &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Cloud Architecture
              </span>
            </h2>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-4xl mx-auto font-normal text-center">
              As a Node.js backend development company and Python engineering partner, we build high-throughput backends using FastAPI backend development services and Python Django custom software development, backed by robust cloud microservices and scalable database systems.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
            {SOFTWARE_TECHS.map((tech) => (
              <div key={tech.name} className="flex items-center gap-4 p-4 md:p-5 bg-white dark:bg-slate-900 border border-border/60 rounded-2xl shadow-sm hover:border-blue-500/20 transition-all select-none">
                <div className="text-2xl md:text-3xl" style={{ color: tech.color }}>{tech.icon}</div>
                <span className="text-sm md:text-base font-medium text-foreground/90 uppercase truncate">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CASE STUDIES (PORTFOLIO SHOWCASE) */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden bg-background">
        <div className="text-center max-w-[900px] mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 mb-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/25">
            <span>Case Studies</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-4 leading-tight text-center">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Case Studies
            </span>
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal text-center mb-6">
            Real-world software systems and enterprise platforms engineered by our development teams.
          </p>

          <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors uppercase tracking-wider group">
            <span>VIEW ALL CASE STUDIES</span> <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <img src={item.imageUrl} alt={item.title} loading="lazy" className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500" />
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
        <FaqSection data={softwareFaqData} />
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
          <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to Architect Your Enterprise Software System?</h2>
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

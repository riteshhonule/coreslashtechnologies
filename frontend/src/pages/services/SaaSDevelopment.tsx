import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Server, CheckCircle2,
  Code2, Cloud, RefreshCw, Database
} from "lucide-react";
import EngagementModels from "@/components/web-development/EngagementModels";
import FaqSection, { type FaqData } from "@/components/ui/habit-faq-scroller";
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs,
  SiNestjs, SiPython, SiPostgresql, SiRedis, SiDocker
} from "react-icons/si";

import fintrackImg from "@/assets/portfolio/fintrack.webp";
import skandanImg from "@/assets/portfolio/skandan.webp";
import flexicartImg from "@/assets/portfolio/flexicart.webp";

// ----------------------------------------------------
// STRUCTURED DATA SCHEMAS
// ----------------------------------------------------
const saasSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom SaaS Product Development & MVP Engineering Services",
  "url": "https://coreslashtechnologies.com/services/saas-development",
  "provider": {
    "@type": "Organization",
    "name": "CoreSlash Technologies",
    "url": "https://coreslashtechnologies.com/",
    "logo": "https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png"
  },
  "serviceType": "SaaS Product Engineering",
  "description": "CoreSlash is a SaaS product development company engineering custom SaaS platforms, startup MVPs, subscription workflows, and scalable cloud applications.",
  "areaServed": "Worldwide"
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
      "name": "SaaS Development",
      "item": "https://coreslashtechnologies.com/services/saas-development"
    }
  ]
};

// ----------------------------------------------------
// TECHNOLOGY STACK DATA
// ----------------------------------------------------
const SAAS_TECHS = [
  { name: "REACT", icon: <SiReact className="w-6 h-6" />, color: "#61DAFB" },
  { name: "NEXT.JS", icon: <SiNextdotjs className="w-6 h-6" />, color: "#000000" },
  { name: "TYPESCRIPT", icon: <SiTypescript className="w-6 h-6" />, color: "#3178C6" },
  { name: "NODE.JS", icon: <SiNodedotjs className="w-6 h-6" />, color: "#339933" },
  { name: "NESTJS", icon: <SiNestjs className="w-6 h-6" />, color: "#E0234E" },
  { name: "PYTHON", icon: <SiPython className="w-6 h-6" />, color: "#3776AB" },
  { name: "POSTGRESQL", icon: <SiPostgresql className="w-6 h-6" />, color: "#4169E1" },
  { name: "REDIS", icon: <SiRedis className="w-6 h-6" />, color: "#DC382D" },
  { name: "DOCKER", icon: <SiDocker className="w-6 h-6" />, color: "#2496ED" },
  { name: "AWS CLOUD", icon: <Server className="w-6 h-6" />, color: "#FF9900" }
];

// ----------------------------------------------------
// AUTHENTIC CASE STUDIES DATA (PORTFOLIO-ALIGNED)
// ----------------------------------------------------
const CASE_STUDIES = [
  {
    title: "FinTrack – AI Financial Management & Corporate Treasury Portal",
    client: "FinTrack Global",
    subtext: "AI-driven corporate expense portal featuring multi-currency accounting, automated invoice extraction, and audit readiness.",
    imageUrl: fintrackImg,
    techStack: ["React", "NestJS", "Python AI", "PostgreSQL", "Redis"],
    link: "/portfolio"
  },
  {
    title: "Skandan – Executive Business Consulting & Crisis Management",
    client: "Skandan Global Advisory",
    subtext: "Executive decision engine providing business crisis management, real-time risk assessment, and operational advisory dashboards.",
    imageUrl: skandanImg,
    techStack: ["React", "TypeScript", "Python", "Chart.js", "Django"],
    link: "/portfolio"
  },
  {
    title: "FlexiCart – On-Demand Multi-Vendor Delivery & Marketplace",
    client: "FlexiCart Inc.",
    subtext: "On-demand hyper-local grocery & retail delivery platform featuring live driver GPS tracking and instant split payments.",
    imageUrl: flexicartImg,
    techStack: ["React Native", "Node.js", "Socket.io", "Stripe API", "MongoDB"],
    link: "/portfolio"
  }
];

// ----------------------------------------------------
// PROCESS STAGES DATA
// ----------------------------------------------------
const PROCESS_STEPS = [
  {
    number: "01",
    title: "Architecture Discovery & Tenancy Modeling",
    description: "We evaluate target user personas, data isolation requirements (shared-schema vs database-per-tenant), and cloud infrastructure architecture before writing production code."
  },
  {
    number: "02",
    title: "UI/UX Wireframing & Subscriber Flow Design",
    description: "We design intuitive user journeys, multi-role organization dashboards, team invitation flows, and friction-free subscriber onboarding experiences in Figma."
  },
  {
    number: "03",
    title: "Agile Milestone Sprints & Development",
    description: "Our engineering pods deliver production-grade frontend and backend modules in iterative sprints with automated testing, code reviews, and transparent sprint reviews."
  },
  {
    number: "04",
    title: "Cloud Provisioning, CI/CD & Launch Preparation",
    description: "We configure containerized deployment pipelines, database migration protocols, secure environment variables, and production monitoring for a dependable release."
  }
];

// ----------------------------------------------------
// CORE SOLUTIONS DATA
// ----------------------------------------------------
const CORE_SOLUTIONS = [
  {
    number: "01",
    title: "Multi-Tenant Architecture & Data Isolation",
    description: "We design multi-tenancy models tailored to client specifications—evaluating shared-schema architectures with tenant-level scoping or separate database environments to balance cost-efficiency, data isolation, and operational performance.",
    icon: <Database className="w-6 h-6 text-[#3b82f6]" />
  },
  {
    number: "02",
    title: "Startup MVP Engineering & Product Prototyping",
    description: "We engineer focused minimum viable products (MVPs) for venture-backed startups and tech founders, prioritizing core customer workflows, modular codebases, and production-ready architectures to validate product-market fit.",
    icon: <Code2 className="w-6 h-6 text-[#3b82f6]" />
  },
  {
    number: "03",
    title: "Subscription Billing & Payment Gateway Integration",
    description: "We engineer custom payment flows using developer APIs and webhooks from processors like Stripe or Razorpay, integrating recurring subscription plans, tiered access control, and automated billing status synchronization.",
    icon: <RefreshCw className="w-6 h-6 text-[#3b82f6]" />
  },
  {
    number: "04",
    title: "Cloud-Native Backends & API Infrastructure",
    description: "We build resilient backend services, REST and GraphQL APIs, containerized Docker microservices, and PostgreSQL/Redis data pipelines designed to maintain responsive application performance as subscriber concurrency scales.",
    icon: <Cloud className="w-6 h-6 text-[#3b82f6]" />
  }
];

// ----------------------------------------------------
// FAQS DATA (FACTUALLY GROUNDED)
// ----------------------------------------------------
const saasFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Practical answers regarding custom SaaS product engineering, multi-tenant architectures, and development partnerships.",
  rows: [
    {
      id: "row1",
      speed: "50s",
      direction: "left",
      faqItems: [
        {
          id: "q1",
          question: "What is the difference between shared-schema and separate-database multi-tenant architecture?",
          answer: "Shared-schema multi-tenancy pools subscriber data in a unified database with tenant-level scoping keys, offering cost-effective resource utilization for early-stage platforms. Separate-database architecture isolates each tenant in a dedicated database, providing strict data boundaries and independent backup lifecycles for enterprise clients. We evaluate these architectural options based on each project's data compliance, performance, and scaling requirements."
        },
        {
          id: "q2",
          question: "How do you implement subscription billing and payment gateways for SaaS products?",
          answer: "We design and engineer custom payment integrations using developer APIs and webhooks from processors like Stripe or Razorpay. Depending on project specifications, we implement recurring subscription plans, tiered pricing logic, invoice generation, and automated webhook handlers to synchronize payment statuses with application entitlements."
        }
      ]
    },
    {
      id: "row2",
      speed: "42s",
      direction: "right",
      faqItems: [
        {
          id: "q3",
          question: "How does CoreSlash approach SaaS MVP development for tech startups?",
          answer: "We collaborate through discovery, architecture planning, and agile development sprints to bring minimum viable products (MVPs) to market. Our engineering process focuses on validating core user workflows, building scalable foundations, and delivering milestone-driven code without making rigid turnaround promises or cutting architectural corners."
        },
        {
          id: "q4",
          question: "How do you approach tenant data isolation and access security?",
          answer: "We apply industry security practices including encrypted HTTPS communication, token-based authentication, and role-based permissions. Tenant data isolation is engineered at the application and database query layers using tenant identifier filtering or infrastructure-level segregation according to client access-control and regulatory requirements."
        },
        {
          id: "q5",
          question: "Who owns the code and intellectual property for our SaaS platform?",
          answer: "Intellectual property and source code ownership terms are defined within the signed project agreement. Upon completion of project milestones and payment obligations under the contract, client ownership rights are transferred for the custom code and architectures delivered."
        }
      ]
    }
  ]
};

export default function SaaSDevelopment() {
  return (
    <>
      <Helmet>
        <title>SaaS Product Development Company & MVP Engineering | CoreSlash</title>
        <meta
          name="description"
          content="CoreSlash is a SaaS product development company engineering custom SaaS platforms, startup MVPs, subscription workflows, and scalable cloud applications."
        />
        <link rel="canonical" href="https://coreslashtechnologies.com/services/saas-development" />

        {/* Open Graph SEO */}
        <meta property="og:title" content="SaaS Product Development Company & MVP Engineering | CoreSlash" />
        <meta property="og:description" content="CoreSlash is a SaaS product development company engineering custom SaaS platforms, startup MVPs, subscription workflows, and scalable cloud applications." />
        <meta property="og:url" content="https://coreslashtechnologies.com/services/saas-development" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png" />

        {/* Twitter Card SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SaaS Product Development Company & MVP Engineering | CoreSlash" />
        <meta name="twitter:description" content="CoreSlash is a SaaS product development company engineering custom SaaS platforms, startup MVPs, subscription workflows, and scalable cloud applications." />
        <meta name="twitter:image" content="https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png" />

        <script type="application/ld+json">{JSON.stringify(saasSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* 1. HERO SECTION */}
      <section
        className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-start overflow-hidden py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-slate-950"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-l from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent)] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto w-full relative z-10 text-left space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-zinc-300 select-none">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <span>&gt;</span>
            <Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link>
            <span>&gt;</span>
            <span className="text-[#3b82f6] font-bold">SaaS Development</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15] max-w-4xl">
            Custom SaaS{" "}
            <span className="text-[#3b82f6]">
              Product Development
            </span>{" "}
            & MVP Engineering Services
          </h1>

          <p className="text-zinc-300 text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl font-medium">
            CoreSlash Technologies is a custom SaaS product development company. We design and build scalable multi-tenant SaaS applications, startup MVPs, subscription workflows, and cloud-native backends engineered around client product requirements.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all text-center"
              >
                <span>Schedule a SaaS Architecture Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition-all text-center"
              >
                <span>View SaaS Case Studies</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-300 pt-3 border-t border-slate-800/80 max-w-3xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Multi-Tenant Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Startup MVP Engineering</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Subscription Billing Workflows</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Service Contextual Banner */}
      <section className="w-full py-12 bg-slate-950 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <p className="max-w-4xl mx-auto text-sm md:text-base text-slate-400 leading-relaxed">
            As a specialized <strong className="text-white font-medium">SaaS product development company</strong>, we engineer tailored commercial applications. Connect web interfaces with our <Link to="/services/web-development" className="text-[#3b82f6] font-semibold hover:underline">enterprise web development services</Link>, build resilient distributed backends with our <Link to="/services/software-systems" className="text-[#3b82f6] font-semibold hover:underline">custom software engineering</Link> team, automate intelligent workflows with our <Link to="/services/ai-automation" className="text-[#3b82f6] font-semibold hover:underline">AI automation services</Link>, or manage business operations with our <Link to="/services/erp-crm-development" className="text-[#3b82f6] font-semibold hover:underline">custom ERP & CRM platforms</Link>.
          </p>
        </div>
      </section>

      {/* 2. CORE SOLUTIONS */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden bg-background">
        <div className="flex flex-col items-start gap-4 mb-16">
          <div className="flex items-center">
            <div className="w-[3px] h-6 bg-[#3b82f6] rounded-full mr-3" />
            <span className="text-sm font-extrabold uppercase tracking-widest text-[#3b82f6]">
              Core Capabilities – SaaS Engineering
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
            End-to-End SaaS Engineering Solutions
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-3xl">
            From architecture planning to production rollout, our custom SaaS development services engineer resilient software platforms designed around your business model and target user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CORE_SOLUTIONS.map((item) => (
            <div
              key={item.number}
              className="p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-border/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
                    STEP {item.number}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PRODUCT DEVELOPMENT PROCESS */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden bg-background">
        <div className="text-center max-w-[900px] mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 mb-6 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-semibold">
            <span>Structured Delivery Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 leading-tight text-center">
            Our SaaS Product Engineering Process
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-normal text-center">
            We follow a disciplined engineering lifecycle from technical discovery to production deployment, ensuring clear milestones, scalable architectural foundations, and clean code handoffs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.number}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-border/80 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-extrabold text-[#3b82f6] block mb-3">{step.number}</span>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TECH STACK */}
      <section className="relative w-full py-24 border-t border-border/40 overflow-hidden bg-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 w-full text-left">
          <div className="text-center max-w-[900px] mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2 mb-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/20">
              <span>Modern Technology Stack</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight text-center">
              Technology Stack for SaaS Applications
            </h2>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-4xl mx-auto font-normal text-center">
              CoreSlash engineers custom software using proven frameworks and cloud-native backends ensuring responsive user experiences, reliable API contracts, and scalable databases.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
            {SAAS_TECHS.map((tech) => (
              <div key={tech.name} className="flex items-center gap-4 p-4 md:p-5 bg-white dark:bg-slate-900 border border-border/60 rounded-2xl shadow-sm hover:border-blue-500/20 transition-all select-none">
                <div className="text-2xl md:text-3xl" style={{ color: tech.color }}>{tech.icon}</div>
                <span className="text-sm md:text-base font-medium text-foreground/90 uppercase truncate">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CASE STUDIES */}
      <section id="case-studies" className="w-full py-24 border-t border-border/40 overflow-hidden bg-background">
        <div className="text-center max-w-[900px] mx-auto mb-12 sm:mb-16 px-6">
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 mb-6 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-semibold">
            <span>Portfolio Highlights</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-4 leading-tight text-center">
            Featured Product{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Engineering Case Studies
            </span>
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal text-center mb-6">
            Real-world software platforms engineered by our development teams for client engagements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-6xl mx-auto px-6">
          {CASE_STUDIES.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="group flex flex-col justify-between rounded-[2rem] bg-white dark:bg-slate-900 border border-border/80 shadow-sm hover:shadow-lg transition-all p-6"
            >
              <div className="relative w-full h-56 bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center mb-6 border border-border/40">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="text-left space-y-3 flex-grow flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#3b82f6] uppercase tracking-wider mb-1">{item.client}</div>
                  <h3 className="text-lg md:text-xl font-extrabold text-foreground group-hover:text-[#3b82f6] transition-colors">{item.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mt-2 line-clamp-3">{item.subtext}</p>
                </div>
                <div className="pt-4 mt-auto">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.techStack.map((tech) => (
                      <span key={tech} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Link to={item.link} className="text-xs md:text-sm font-extrabold text-[#3b82f6] flex items-center gap-1 group/btn uppercase tracking-wider">
                      View Case Study <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. ENGAGEMENT MODELS */}
      <section className="border-t border-border/40">
        <EngagementModels />
      </section>

      {/* 7. FAQS */}
      <section className="w-full py-16 md:py-24 border-t border-border/40 overflow-hidden bg-background">
        <FaqSection data={saasFaqData} />
      </section>

      {/* 8. BOTTOM CTA BANNER */}
      <section className="relative w-full py-20 bg-gradient-to-br from-blue-900/30 via-slate-950 to-indigo-950/40 border-t border-border/40 overflow-hidden text-center px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Ready to Build Your Custom SaaS Product?
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Discuss your application requirements, multi-tenancy model, and development roadmap with our software engineering architects.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-blue-500/25 transition-all"
            >
              <span>Schedule a Technical Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

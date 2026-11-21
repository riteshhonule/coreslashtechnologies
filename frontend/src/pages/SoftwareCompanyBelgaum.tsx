import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Cloud,
  Cpu,
  Building2,
  Factory,
  HeartPulse,
  Truck,
  Check,
  Calendar,
  Lock,
  Workflow,
  Sparkles
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiNestjs,
  SiPython,
  SiPostgresql,
  SiRedis,
  SiDocker
} from "react-icons/si";
import FaqSection, { type FaqData } from "@/components/ui/habit-faq-scroller";
import fintrackImg from "@/assets/portfolio/fintrack.webp";
import skandanImg from "@/assets/portfolio/skandan.webp";
import pitcsImg from "@/assets/portfolio/pitcs.webp";

// ----------------------------------------------------
// STRUCTURED DATA SCHEMAS
// ----------------------------------------------------
const softwareCompanySchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom Software Development in Belgaum (Belagavi)",
  "url": "https://coreslashtechnologies.com/software-company-in-belgaum",
  "provider": {
    "@type": "Organization",
    "name": "CoreSlash Technologies",
    "url": "https://coreslashtechnologies.com/",
    "logo": "https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png"
  },
  "serviceType": "Custom Software Development",
  "description": "CoreSlash Technologies builds custom business software, operational portals, ERP systems, and scalable cloud applications for businesses in Belgaum and beyond.",
  "areaServed": [
    {
      "@type": "City",
      "name": "Belgaum"
    },
    {
      "@type": "City",
      "name": "Belagavi"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Karnataka"
    }
  ]
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
      "name": "Software Company in Belgaum",
      "item": "https://coreslashtechnologies.com/software-company-in-belgaum"
    }
  ]
};

// ----------------------------------------------------
// CORE CAPABILITIES DATA
// ----------------------------------------------------
const CORE_SERVICES = [
  {
    icon: <Workflow className="w-6 h-6 text-blue-500" />,
    title: "Operational Workflow Portals",
    description: "Bespoke internal dashboards, staff management portals, and multi-step approval workflows engineered to replace fragmented spreadsheets.",
    link: "/services/software-systems"
  },
  {
    icon: <Database className="w-6 h-6 text-indigo-500" />,
    title: "Inventory & Business Systems",
    description: "Automated inventory management, order fulfillment pipelines, and centralized reporting systems designed for reliable daily operations.",
    link: "/services/erp-crm-development"
  },
  {
    icon: <Cloud className="w-6 h-6 text-cyan-500" />,
    title: "Legacy Software Modernization",
    description: "Refactoring aging desktop software and legacy databases into secure, responsive cloud web applications with seamless data migration.",
    link: "/services/software-systems"
  },
  {
    icon: <Server className="w-6 h-6 text-emerald-500" />,
    title: "Custom ERP & CRM Solutions",
    description: "Tailored enterprise resource planning and CRM software engineered around your specific operational rules and business relationships.",
    link: "/services/erp-crm-development"
  },
  {
    icon: <Terminal className="w-6 h-6 text-purple-500" />,
    title: "API Integration & Database Architecture",
    description: "Robust relational database design in PostgreSQL, caching with Redis, and custom REST/GraphQL APIs connecting internal and third-party tools.",
    link: "/services/software-systems"
  },
  {
    icon: <Layers className="w-6 h-6 text-amber-500" />,
    title: "Custom SaaS & Cloud Applications",
    description: "Multi-tenant software product engineering, scalable cloud infrastructure, and subscription workflow systems built for business growth.",
    link: "/services/saas-development"
  }
];

// ----------------------------------------------------
// SUPPORTED WORKFLOW DOMAINS (ILLUSTRATIVE EXAMPLES)
// ----------------------------------------------------
const SUPPORTED_WORKFLOWS = [
  {
    icon: <Factory className="w-6 h-6 text-blue-500" />,
    title: "Manufacturing & Industrial Operations",
    description: "Production scheduling dashboards, machine maintenance tracking, job card workflows, and quality checklist management systems."
  },
  {
    icon: <Truck className="w-6 h-6 text-indigo-500" />,
    title: "Wholesale & Supply Chain Logistics",
    description: "Multi-warehouse stock visibility, dealer dispatch tracking, automated purchase order approvals, and delivery reconciliation."
  },
  {
    icon: <HeartPulse className="w-6 h-6 text-emerald-500" />,
    title: "Healthcare & Clinical Administration",
    description: "Patient appointment scheduling, administrative workflow tracking, multi-department record access, and billing logs."
  },
  {
    icon: <Building2 className="w-6 h-6 text-purple-500" />,
    title: "Professional Services & Corporate Portals",
    description: "Executive decision dashboards, automated client onboarding, milestone project tracking, and document verification workflows."
  }
];

// ----------------------------------------------------
// ENGINEERING PROCESS STEPS
// ----------------------------------------------------
const PROCESS_STEPS = [
  {
    step: "01",
    title: "Technical Discovery & Scope Definition",
    description: "We map your operational workflows, user roles, data entities, and system integration requirements to build a clear technical specification."
  },
  {
    step: "02",
    title: "Architecture & Database Design",
    description: "We structure relational data schemas, define secure API contracts, and design clean system interfaces before writing production code."
  },
  {
    step: "03",
    title: "Milestone-Driven Development",
    description: "Our engineering sprints deliver verifiable feature increments with regular client review sessions to ensure alignment at every stage."
  },
  {
    step: "04",
    title: "Quality Assurance & Security Checks",
    description: "Every module undergoes unit and integration testing, role-based permission verification, and data integrity audits before release."
  },
  {
    step: "05",
    title: "Deployment & Knowledge Handover",
    description: "We manage cloud deployment, provide operational documentation, and hand over repository access according to project contractual terms."
  }
];

// ----------------------------------------------------
// TECHNOLOGY STACK DATA
// ----------------------------------------------------
const TECH_STACK = [
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
// VERIFIED CASE STUDIES (AUTHENTIC PORTFOLIO DATA)
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
    title: "PITCS – Global IT Consulting & Workforce Management Platform",
    client: "PITCS Tech Solutions",
    subtext: "Enterprise talent acquisition & workforce management engine serving Fortune 500 companies with automated candidate matching.",
    imageUrl: pitcsImg,
    techStack: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    link: "/portfolio"
  }
];

// ----------------------------------------------------
// FAQS DATA (FACTUALLY GROUNDED)
// ----------------------------------------------------
const softwareFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Straightforward answers about our custom software engineering services, in-person meetings, and project engagements in Belgaum.",
  rows: [
    {
      id: "row1",
      speed: "48s",
      direction: "left",
      faqItems: [
        {
          id: "q1",
          question: "What is the difference between custom software engineering and ordinary website development?",
          answer: "Website development typically focuses on marketing websites, informational portals, or customer-facing presentation. Custom software engineering designs bespoke business logic, database architectures, automated workflows, role-based operational permissions, and system integrations tailored to specific internal operational requirements."
        },
        {
          id: "q2",
          question: "Can we schedule an in-person technical meeting in Belagavi?",
          answer: "Yes. CoreSlash Technologies is based in Belagavi, Karnataka. While initial project discussions frequently occur via video conference, in-person technical discovery sessions, architecture planning workshops, and milestone reviews are available in Belagavi by prior appointment."
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
          question: "What types of custom business software can CoreSlash engineer?",
          answer: "We engineer operational workflow portals, custom ERP and CRM solutions, multi-tenant SaaS platforms, inventory automation pipelines, custom billing modules, and secure API integrations for businesses across regional and global markets."
        },
        {
          id: "q4",
          question: "Who owns the source code and intellectual property for custom software projects?",
          answer: "Source-code and intellectual-property ownership arrangements are defined in the signed project agreement. Upon completion of agreed milestones and fulfillment of contractual obligations, ownership rights to the custom application code and architecture are transferred to the client."
        },
        {
          id: "q5",
          question: "How are project scopes, timelines, and delivery milestones determined?",
          answer: "We begin with technical discovery to analyze your business workflows, database schemas, and integration points. Based on these requirements, we prepare a detailed technical specification with phased delivery milestones. Development timelines depend on project scope and complexity rather than rigid generic schedules."
        }
      ]
    }
  ]
};

export default function SoftwareCompanyBelgaum() {
  return (
    <>
      <Helmet>
        <title>Software Company in Belgaum (Belagavi) | CoreSlash</title>
        <meta
          name="description"
          content="CoreSlash Technologies builds custom business software, operational portals, ERP systems, and scalable cloud applications for businesses in Belgaum and beyond."
        />
        <link rel="canonical" href="https://coreslashtechnologies.com/software-company-in-belgaum" />

        {/* Open Graph SEO */}
        <meta property="og:title" content="Software Company in Belgaum (Belagavi) | CoreSlash" />
        <meta
          property="og:description"
          content="CoreSlash Technologies builds custom business software, operational portals, ERP systems, and scalable cloud applications for businesses in Belgaum and beyond."
        />
        <meta property="og:url" content="https://coreslashtechnologies.com/software-company-in-belgaum" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://coreslashtechnologies.com/coreslash_technologies_url_image.webp" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Software Company in Belgaum (Belagavi) | CoreSlash" />
        <meta
          name="twitter:description"
          content="CoreSlash Technologies builds custom business software, operational portals, ERP systems, and scalable cloud applications for businesses in Belgaum and beyond."
        />
        <meta name="twitter:image" content="https://coreslashtechnologies.com/coreslash_technologies_url_image.webp" />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(softwareCompanySchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-500 dark:text-blue-400 text-xs md:text-sm font-semibold tracking-wide uppercase mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Custom Software Engineering · Belgaum (Belagavi)</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground max-w-5xl mx-auto leading-[1.1]">
            Custom Software Development Company in{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Belgaum (Belagavi)
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            CoreSlash Technologies engineers custom business software, operational workflow portals, ERP systems, and cloud platforms tailored to the operational demands of growing enterprises in Belgaum and across Karnataka.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold bg-[#3b82f6] text-white hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 group"
            >
              <span>Schedule Technical Consultation</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services/software-systems"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold border border-border/80 bg-background hover:bg-muted text-foreground transition-all"
            >
              Explore Software Systems
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-500" />
              <span>In-Person Meetings in Belagavi by Appointment</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-500" />
              <span>Contract-Defined Code & IP Ownership</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-500" />
              <span>Custom Architecture Without Template Lock-In</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REGIONAL ECOSYSTEM & BUSINESS CONTEXT */}
      <section className="py-16 md:py-24 border-t border-border/40 bg-muted/20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                <Building2 className="w-3.5 h-3.5" />
                <span>Local Software Engineering</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Custom Software Engineering for Belgaum Businesses
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                As commercial and industrial activity in Belgaum expands across manufacturing corridors like Udyambag and Machhe, trade hubs, and healthcare centers, businesses increasingly outgrow generic off-the-shelf software and disjointed spreadsheets. Off-the-shelf platforms often impose inflexible subscription tiers, rigid workflows, and recurring licensing fees without fitting local operational rules.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                At CoreSlash Technologies, we architect bespoke software solutions built specifically around your business processes. Whether you require internal workflow automation, custom ERP and CRM modules, multi-tenant cloud applications, or customer-facing portals, our team delivers production-ready engineering designed for scalability and data security.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-border/80 px-4 py-2 rounded-lg">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>Based in Belagavi · Technical Discovery Sessions</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-border/80 px-4 py-2 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                  <span>Direct Architect Communication</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-slate-900 border border-white/10 p-8 text-white space-y-6 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500" />

                <h3 className="text-xl font-bold text-white flex items-center gap-3 relative z-10">
                  <Lock className="w-5 h-5 text-blue-400" />
                  <span>Core Engineering Principles</span>
                </h3>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-300 relative z-10">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-white">Contract-Defined IP:</strong> Source-code ownership and repository rights transferred upon completion of milestones and contractual terms.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-white">Zero Rigid Lock-In:</strong> Built with open modern frameworks (React, Node.js, Python, PostgreSQL) rather than proprietary closed builders.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-white">Secure Data Architecture:</strong> Token-based authentication, role-based access control (RBAC), and encrypted HTTPS communication.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-white">Local Technical Engagement:</strong> In-person discovery and milestone meetings available in Belagavi by prior appointment.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SOFTWARE ENGINEERING SERVICES */}
      <section className="py-20 md:py-28 max-w-[1400px] mx-auto px-6 md:px-12 border-t border-border/40">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Capabilities & Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Comprehensive Software Engineering Services
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            From internal operational tools to full-scale enterprise systems, our engineering services address complex operational workflows with clean code and resilient architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORE_SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="p-8 rounded-2xl bg-card border border-border/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{service.description}</p>
              </div>
              <Link
                to={service.link}
                className="inline-flex items-center text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 group"
              >
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. DETAILED ENGINEERING AREAS */}
      <section className="py-20 border-t border-border/40 bg-muted/20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Operational Workflow Portals and Internal Tools
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Many growing organizations rely on fragmented spreadsheets, manual emails, and disparate messaging groups to coordinate team actions. This results in data discrepancies, communication bottlenecks, and lost operational records.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                We develop centralized web portals featuring role-based access control, automated review checkpoints, and real-time status tracking. Whether you need internal operational dashboards, employee management systems, or client-facing project trackers, we create intuitive interfaces that unify operations.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-500" />
                  <span>Multi-level user authorization and granular role permissions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-500" />
                  <span>Real-time operational activity feeds and audit trail logs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-500" />
                  <span>Automated notifications and status transitions</span>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-6 p-8 rounded-2xl bg-card border border-border/80 shadow-md">
              <h4 className="text-lg font-bold text-foreground mb-4">Inventory Automation & Business Systems</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Managing stock levels, raw material intake, and order dispatches across multiple warehouses requires synchronized data pipelines. Our business system architectures automate stock reconciliation, generate structured dispatch orders, and provide real-time inventory alerts.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                By integrating barcode workflows, purchase orders, and accounting endpoints, businesses maintain complete operational visibility across the entire procurement lifecycle.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8 border-t border-border/40">
            <div className="lg:col-span-6 p-8 rounded-2xl bg-card border border-border/80 shadow-md">
              <h4 className="text-lg font-bold text-foreground mb-4">Legacy Software Modernization & Cloud Migration</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Businesses running on aging desktop software, local Microsoft Access databases, or legacy spreadsheet pipelines face reliability risks, hardware dependencies, and limited remote accessibility.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We re-engineer legacy systems into modern cloud web applications. Our modernization roadmap includes database normalization, automated data migration, secure web API development, and modern responsive UI design without disrupting daily operations.
              </p>
            </div>
            <div className="lg:col-span-6 space-y-5">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                API Integration and Database Architecture
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Reliable software depends on clean data modeling and resilient integration pipelines. We design normalized PostgreSQL database schemas with indexed queries, transactional consistency, and Redis caching layers for high throughput.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                We also engineer secure REST and GraphQL APIs that connect internal systems with payment gateways, SMS/WhatsApp notification services, third-party ERP platforms, and cloud storage providers.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  PostgreSQL Data Modeling
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  Redis High-Speed Caching
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  Webhook Event Handlers
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SUPPORTED WORKFLOW DOMAINS */}
      <section className="py-20 md:py-28 max-w-[1400px] mx-auto px-6 md:px-12 border-t border-border/40">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <Factory className="w-3.5 h-3.5" />
            <span>Workflow Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Industries and Business Workflows We Can Support
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Our software engineering practices apply across diverse operational domains. We design systems to match specific operational rules, compliance standards, and administrative workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SUPPORTED_WORKFLOWS.map((workflow, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-card border border-border/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-6">
                  {workflow.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{workflow.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{workflow.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SOFTWARE ENGINEERING PROCESS */}
      <section className="py-20 md:py-28 border-t border-border/40 bg-muted/20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">
              <Code2 className="w-3.5 h-3.5" />
              <span>Disciplined Execution</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              Our Software Engineering Process
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              We structure projects around milestone-driven deliverables, transparent code reviews, and proactive technical communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-card border border-border/80 shadow-sm flex flex-col justify-between relative"
              >
                <div>
                  <span className="text-3xl font-black text-blue-500/30 mb-4 block">{item.step}</span>
                  <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CORE TECHNOLOGIES */}
      <section className="py-20 max-w-[1400px] mx-auto px-6 md:px-12 border-t border-border/40">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Core Technologies We Build With
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            We use proven, scalable open technologies that ensure long-term maintainability, high performance, and zero dependency on proprietary builders.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-card border border-border/80 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="text-muted-foreground group-hover:text-blue-500 transition-colors mb-3">
                {tech.icon}
              </div>
              <span className="text-xs font-bold tracking-wider text-foreground">{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. VERIFIED SOFTWARE ENGINEERING CASE STUDIES */}
      <section className="py-20 md:py-28 border-t border-border/40 bg-muted/20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Proven Deliverables</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              Verified Software Engineering Case Studies
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Explore authentic projects engineered by CoreSlash, showcasing our technical architecture, cloud performance, and software capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CASE_STUDIES.map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="group flex flex-col justify-between rounded-[2rem] bg-card border border-border/80 shadow-sm hover:shadow-lg transition-all p-6"
              >
                <div className="relative w-full h-52 bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center mb-6 border border-border/40">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="text-left space-y-3 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                      {item.client}
                    </div>
                    <h3 className="text-lg md:text-xl font-extrabold text-foreground group-hover:text-blue-500 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mt-2 line-clamp-3">
                      {item.subtext}
                    </p>
                  </div>
                  <div className="pt-4 mt-auto">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <Link
                        to={item.link}
                        className="text-xs md:text-sm font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1 group/btn uppercase tracking-wider"
                      >
                        View Case Study <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CONTEXTUAL REGIONAL ECOSYSTEM LINKS */}
      <section className="w-full py-12 border-t border-border/40 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <p className="max-w-4xl mx-auto text-sm md:text-base text-muted-foreground leading-relaxed">
            Exploring technology solutions in the Belgaum region? Read our directory guide to the{" "}
            <Link to="/top-it-companies-in-belagavi" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              top IT companies in Belgaum
            </Link>
            , explore our local{" "}
            <Link to="/web-development-company-in-belagavi" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              web development services in Belagavi
            </Link>
            , or discover our national{" "}
            <Link to="/services/software-systems" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              software systems engineering services
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      <section className="w-full py-16 md:py-24 border-t border-border/40 overflow-hidden bg-background">
        <FaqSection data={softwareFaqData} />
      </section>

      {/* 11. SCHEDULE A TECHNICAL CONSULTATION */}
      <section className="relative w-full py-20 bg-gradient-to-br from-blue-900/30 via-slate-950 to-indigo-950/40 border-t border-border/40 overflow-hidden text-center px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Schedule a Technical Consultation in Belgaum
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Discuss your custom software requirements, internal workflows, or database architecture with our engineering architects. In-person discovery meetings in Belagavi are available by prior appointment.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold bg-[#3b82f6] text-white hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 group"
            >
              <span>Book Appointment & Consultation</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all"
            >
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

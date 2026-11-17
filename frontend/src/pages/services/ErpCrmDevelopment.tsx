import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Server, CheckCircle2, Factory, Truck,
  Store, Briefcase, Layers, ShieldCheck, Database, Sliders
} from "lucide-react";
import EngagementModels from "@/components/web-development/EngagementModels";
import ProcessTimeline from "@/components/web-development/ProcessTimeline";
import FaqSection, { type FaqData } from "@/components/ui/habit-faq-scroller";
import { CoreServiceCard } from "@/components/web-development/CoreServices";
import {
  SiNodedotjs, SiPython, SiGo, SiDocker, SiKubernetes,
  SiPostgresql, SiMongodb, SiRedis, SiTypescript
} from "react-icons/si";

import pitcsImg from "@/assets/portfolio/pitcs.webp";
import skandanImg from "@/assets/portfolio/skandan.webp";
import fintrackImg from "@/assets/portfolio/fintrack.webp";

// ----------------------------------------------------
// SCHEMA
// ----------------------------------------------------
const erpSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom ERP Software Development & CRM Systems",
  "url": "https://coreslashtechnologies.com/services/erp-crm-development",
  "provider": {
    "@type": "Organization",
    "name": "CoreSlash Technologies",
    "url": "https://coreslashtechnologies.com/",
    "logo": "https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png"
  },
  "serviceType": "ERP and CRM Engineering",
  "description": "CoreSlash is a custom ERP software development company engineering tailored ERP systems, custom CRM platforms, inventory automation, and scalable business software.",
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
      "name": "ERP & CRM Development",
      "item": "https://coreslashtechnologies.com/services/erp-crm-development"
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
// AUTHENTIC CASE STUDIES DATA
// ----------------------------------------------------
const CASE_STUDIES = [
  {
    title: "FinTrack – AI Financial Management & Corporate Treasury Portal",
    client: "FinTrack Global",
    subtext: "Corporate financial management portal featuring multi-currency accounting, automated invoice extraction, and ERP transaction reconciliation.",
    imageUrl: fintrackImg,
    techStack: ["React", "NestJS", "PostgreSQL", "Redis"],
    link: "/portfolio"
  },
  {
    title: "PITCS – Global IT Consulting & Workforce Management Platform",
    client: "PITCS Tech Solutions",
    subtext: "Enterprise talent acquisition & workforce management engine featuring automated candidate screening dashboards and real-time status tracking.",
    imageUrl: pitcsImg,
    techStack: ["React", "Next.js", "Node.js", "PostgreSQL"],
    link: "/portfolio"
  },
  {
    title: "Skandan – Executive Business Consulting & Risk Management",
    client: "Skandan Global Advisory",
    subtext: "Executive decision engine providing business risk assessment, interactive financial modeling, and operational advisory dashboards.",
    imageUrl: skandanImg,
    techStack: ["React", "TypeScript", "Python", "Django"],
    link: "/portfolio"
  }
];

// ----------------------------------------------------
// INDUSTRY VERTICALS DATA
// ----------------------------------------------------
const INDUSTRY_SOLUTIONS = [
  {
    title: "Manufacturing & Industrial Operations",
    icon: <Factory className="w-6 h-6 text-blue-500" />,
    description: "Configurable operational platforms for bill of materials tracking, production milestone scheduling, equipment maintenance logs, and raw material inventory workflows."
  },
  {
    title: "Wholesale Distribution & Logistics",
    icon: <Truck className="w-6 h-6 text-indigo-500" />,
    description: "Multi-warehouse inventory synchronization, supplier purchase order tracking, shipment status visibility, and automated dispatch management."
  },
  {
    title: "Retail & Multi-Branch Commercial",
    icon: <Store className="w-6 h-6 text-purple-500" />,
    description: "Centralized point-of-sale data aggregation, branch inventory visibility, customer order history, and unified commercial billing systems."
  },
  {
    title: "Professional & Financial Services",
    icon: <Briefcase className="w-6 h-6 text-emerald-500" />,
    description: "Workforce time tracking, client billing automation, multi-currency transaction logging, and executive reporting dashboards."
  }
];

// ----------------------------------------------------
// WHY CHOOSE CORESLASH DATA
// ----------------------------------------------------
const VALUE_PILLARS = [
  {
    title: "Tailored Business Workflows",
    icon: <Sliders className="w-6 h-6 text-blue-500" />,
    description: "Software engineered around your existing operational processes and organizational structure rather than forcing rigid pre-packaged constraints."
  },
  {
    title: "Modular Application Architecture",
    icon: <Layers className="w-6 h-6 text-indigo-500" />,
    description: "Built with modular services, clean data layers, and performant backends that adapt smoothly as transaction volume and user concurrency grow."
  },
  {
    title: "Role-Based Access & Data Controls",
    icon: <ShieldCheck className="w-6 h-6 text-purple-500" />,
    description: "Granular role-based permission controls, token-authenticated API endpoints, and private database configurations that protect sensitive operational data."
  },
  {
    title: "System & API Interoperability",
    icon: <Database className="w-6 h-6 text-emerald-500" />,
    description: "Structured REST, GraphQL, and database connector architectures designed to connect smoothly with your existing third-party business software."
  }
];

// ----------------------------------------------------
// FAQ DATA
// ----------------------------------------------------
const erpFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Everything you need to know about our custom ERP software development, CRM engineering, and integration architecture.",
  rows: [
    {
      id: "row1",
      speed: "50s",
      direction: "left",
      faqItems: [
        {
          id: "q1",
          question: "What is custom ERP development vs off-the-shelf software?",
          answer: "Custom ERP software is engineered specifically around your organizational workflows and business rules. Unlike off-the-shelf SaaS platforms with recurring per-user licensing and rigid feature sets, custom platforms provide tailored functionality, complete codebase control under agreed contract terms, and flexible scaling."
        },
        {
          id: "q2",
          question: "What is the typical development timeline for an enterprise ERP?",
          answer: "Timelines depend on module scope, data integration needs, and workflow complexity. Engagements typically begin with a scoped discovery and system architecture phase, followed by milestone-based development, staging validation, and phased operational rollout."
        }
      ]
    },
    {
      id: "row2",
      speed: "45s",
      direction: "right",
      faqItems: [
        {
          id: "q3",
          question: "Can you modernize or integrate with our existing legacy systems?",
          answer: "Yes. We engineer integration architectures that connect custom ERP and CRM modules with existing databases, third-party software, and legacy systems using standard REST APIs, GraphQL endpoints, and secure database connectors."
        },
        {
          id: "q4",
          question: "How do you handle enterprise data security and access control?",
          answer: "We apply security practices such as encrypted HTTPS communication and token-based authentication. Role-based permissions and database isolation can be designed around each project's access-control, data-protection, and deployment requirements."
        },
        {
          id: "q5",
          question: "Do you provide post-deployment support and system maintenance?",
          answer: "Yes. We provide scheduled maintenance and technical support packages tailored to the agreed engagement scope, covering system health monitoring, dependency updates, and ongoing operational enhancements."
        }
      ]
    }
  ]
};

export default function ErpCrmDevelopment() {
  return (
    <>
      <Helmet>
        <title>Custom ERP Software Development Company & CRM | CoreSlash</title>
        <meta
          name="description"
          content="CoreSlash is a custom ERP software development company engineering tailored ERP systems, custom CRM platforms, inventory automation, and scalable business software."
        />
        <link rel="canonical" href="https://coreslashtechnologies.com/services/erp-crm-development" />

        {/* Open Graph SEO */}
        <meta property="og:title" content="Custom ERP Software Development Company & CRM | CoreSlash" />
        <meta property="og:description" content="CoreSlash is a custom ERP software development company engineering tailored ERP systems, custom CRM platforms, inventory automation, and scalable business software." />
        <meta property="og:url" content="https://coreslashtechnologies.com/services/erp-crm-development" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png" />

        {/* Twitter Card SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Custom ERP Software Development Company & CRM | CoreSlash" />
        <meta name="twitter:description" content="CoreSlash is a custom ERP software development company engineering tailored ERP systems, custom CRM platforms, inventory automation, and scalable business software." />
        <meta name="twitter:image" content="https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png" />

        <script type="application/ld+json">{JSON.stringify(erpSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
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
            Company & CRM Systems
          </h1>

          <p className="text-zinc-300 text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl font-medium">
            CoreSlash Technologies is a custom ERP software development company in India. We engineer tailored enterprise resource planning systems, custom CRM platforms, and multi-location inventory automation designed to streamline business workflows, financial reporting, and operational logistics.
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
                <span>Custom ERP & CRM Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Inventory & Billing Automation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Role-Based Access & Security</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Service Contextual Banner */}
      <section className="w-full py-12 bg-slate-950 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <p className="max-w-4xl mx-auto text-sm md:text-base text-slate-400 leading-relaxed">
            As a specialized <strong className="text-white font-medium">custom ERP software development company</strong>, we architect connected enterprise solutions. Accelerate user engagement with our <Link to="/services/web-development" className="text-[#3b82f6] font-semibold hover:underline">custom web development services</Link>, scale distributed backends with our <Link to="/services/software-systems" className="text-[#3b82f6] font-semibold hover:underline">custom software development company</Link> team, or infuse autonomous agents with our <Link to="/services/ai-automation" className="text-[#3b82f6] font-semibold hover:underline">AI automation services</Link>.
          </p>
        </div>
      </section>

      {/* 2. CORE SERVICES */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden bg-background">
        <div className="flex flex-col items-start gap-4 mb-16">
          <div className="flex items-center">
            <div className="w-[3px] h-6 bg-[#3b82f6] rounded-full mr-3" />
            <span className="text-sm font-extrabold uppercase tracking-widest text-[#3b82f6]">
              Core Services – ERP & CRM
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
            Full-Suite ERP Software Development & Custom CRM Engineering
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-3xl">
            From multi-location inventory workflows to automated sales pipelines, our custom ERP software development company engineers scalable enterprise solutions tailored to your operational structure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CoreServiceCard
            number="01"
            title="Tailored ERP Software Development & Cloud Platforms"
            subtext="Build scalable, modular enterprise resource planning systems engineered around your operational logic, data workflows, and administrative controls."
            highlight="Cloud-native backend architecture engineered for high operational reliability and system stability."
            darkBg={true}
            delay={0.1}
          />
          <CoreServiceCard
            number="02"
            title="Operational Workflow & Supply Chain Management Software"
            subtext="Configurable operational software managing order processing, production scheduling workflows, multi-stage procurement, and supply chain tracking."
            highlight="Streamline cross-departmental operations and reduce manual data entry across teams."
            delay={0.2}
          />
          <CoreServiceCard
            number="03"
            title="Custom CRM Development & Pipeline Automation"
            subtext="Tailored customer relationship management platforms with lead tracking, deal pipelines, customer interaction histories, and automated communications."
            highlight="Centralized customer data and workflow automation integrated with your business communication channels."
            delay={0.3}
          />
          <CoreServiceCard
            number="04"
            title="Multi-Location Inventory & Billing Automation"
            subtext="Centralized inventory tracking across multiple branches and warehouses, automated invoice generation workflows, and structured transaction ledgers."
            highlight="Real-time stock level visibility and automated billing architectures for expanding commercial operations."
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
              CoreSlash leverages proven cloud-native technologies ensuring responsive application performance, secure data isolation, and scalable database backends.
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
            Enterprise Industry Solutions & Commercial Operations
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-normal text-center">
            We architect tailored operational software, inventory management systems, and commercial workflows engineered to address the specific requirements of expanding commercial sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRY_SOLUTIONS.map((item) => (
            <div key={item.title} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-border/80 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. WHY CHOOSE US */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden bg-background">
        <div className="text-center max-w-[900px] mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 leading-tight text-center">
            Why Choose CoreSlash as Your Custom ERP Software Development Company
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-normal text-center">
            We engineer custom software systems that integrate smoothly with your operational practices, providing long-term architecture flexibility, role-based governance, and reliable data contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUE_PILLARS.map((item) => (
            <div key={item.title} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-border/80 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CASE STUDIES */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden bg-background">
        <div className="text-center max-w-[900px] mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 mb-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/25">
            <span>Case Studies</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-4 leading-tight text-center">
            Featured Enterprise{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Case Studies
            </span>
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal text-center mb-6">
            Real-world enterprise platforms engineered by our development teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-6xl mx-auto">
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

      {/* 9. FAQS */}
      <section className="w-full py-16 md:py-24 border-t border-border/40 overflow-hidden bg-background">
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

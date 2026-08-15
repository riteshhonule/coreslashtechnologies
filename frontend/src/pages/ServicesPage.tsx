import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code2, Smartphone, ShoppingBag, Cpu, Search, Cloud, BarChart3,
  ArrowRight, Sparkles, Layers
} from "lucide-react";
import ProcessTimeline from "@/components/web-development/ProcessTimeline";
import EngagementModels from "@/components/web-development/EngagementModels";
import TechnologyGrid from "@/components/web-development/TechnologyGrid";
import CTASection from "@/components/web-development/CTASection";
import FaqSection, { type FaqData } from "@/components/ui/habit-faq-scroller";

// Import service background images
import aiDevImg from "@/assets/services/ai-automation/coreslash-technologies-intelligent-ai-automation.avif";
import webDevImg from "@/assets/services/web-development/coreslash-technologies-modern-web-development.avif";
import appDevImg from "@/assets/services/mobile-app-development/coreslash-technologies-mobile-app-development-showcase.avif";
import softwareSysImg from "@/assets/services/software-systems/coreslash-technologies-custom-software-systems.avif";
import ecommerceImg from "@/assets/services/ecommerce-solutions/coreslash-technologies-scalable-ecommerce-platforms.avif";
import seoImg from "@/assets/services/seo-solutions/coreslash-technologies-seo-search-growth.avif";
import cloudDevopsImg from "@/assets/services/cloud-infrastructure/coreslash-technologies-cloud-devops.avif";
import dataAnalyticsImg from "@/assets/services/data-analytics/coreslash-technologies-business-intelligence-data-analytics.avif";
import shopifyDevImg from "@/assets/services/shopify-development/coreslash-technology-shopify-development.webp";

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "CoreSlash Engineering & Software Development Services",
  "url": "https://coreslashtechnologies.com/services",
  "provider": {
    "@type": "Organization",
    "name": "CoreSlash Technologies",
    "url": "https://coreslashtechnologies.com/",
    "logo": "https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png"
  },
  "description": "Full-suite software engineering services: AI Automation, Web Development, Mobile Apps, Custom Software Systems, E-Commerce, SEO, Shopify, Cloud Infrastructure, and Data Analytics.",
  "areaServed": "Worldwide"
};

const allServicesFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Everything you need to know about partnering with CoreSlash Technologies across all digital engineering domains.",
  rows: [
    {
      id: "row1",
      speed: "50s",
      direction: "left",
      faqItems: [
        {
          id: "q1",
          question: "Which service domain should we choose for our business?",
          answer: "CoreSlash solution architects provide free technical consultations to review your goals and recommend the ideal stack—whether that is a custom SaaS platform, web app, mobile app, or AI automation pipeline."
        },
        {
          id: "q2",
          question: "Do you offer full-stack end-to-end development?",
          answer: "Yes! CoreSlash handle UI/UX wireframing, frontend engineering, backend API development, database optimization, cloud DevOps deployment, and post-launch SLA support."
        },
        {
          id: "q3",
          question: "Can multiple service packages be combined into a single contract?",
          answer: "Absolutely. Most client engagements combine core web/mobile development with cloud infrastructure, SEO optimization, and custom AI agent workflows."
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
          question: "What is your average project turnaround time?",
          answer: "Custom website portals deliver in 4-6 weeks, mobile applications take 6-10 weeks, and enterprise SaaS & AI systems ship within 8-14 weeks."
        },
        {
          id: "q5",
          question: "Who owns the code and intellectual property (IP)?",
          answer: "You maintain 100% full ownership of all source code, design assets, database schemas, and intellectual property upon project completion."
        },
        {
          id: "q6",
          question: "What SLA support models do you provide post-launch?",
          answer: "CoreSlash offer 24/7 DevOps cloud monitoring, monthly security patches, database backups, performance scaling, and dedicated SLA response windows."
        }
      ]
    }
  ]
};

export default function ServicesIndex() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      id: "ai-automation",
      title: "AI Automation",
      category: "AI & WORKFLOWS",
      description: "Engineer custom LLM architectures, retrieval-augmented generation (RAG) vector search pipelines, autonomous multi-agent systems, and intelligent process automation.",
      icon: Cpu,
      href: "/services/ai-automation",
      image: aiDevImg,
      gradient: "from-blue-600 to-cyan-500",
      features: [
        "Custom LLM & RAG Vector Search",
        "Autonomous Multi-Agent Workflows",
        "Intelligent Document OCR Extraction",
        "Predictive Machine Learning Models"
      ],
      popular: true
    },
    {
      id: "web-dev",
      title: "Web Development",
      category: "WEB PLATFORMS",
      description: "High-performance React and Next.js web applications built for lightning-fast speeds, responsive UI elegance, sub-second rendering, and high conversions.",
      icon: Code2,
      href: "/services/web-development",
      image: webDevImg,
      gradient: "from-blue-600 to-indigo-600",
      features: [
        "Custom React & Next.js Frameworks",
        "Sub-Second Page Load Speeds",
        "Responsive Pixel-Perfect UI/UX",
        "Headless CMS & API Integration"
      ],
      popular: true
    },
    {
      id: "app-dev",
      title: "App Development",
      category: "MOBILE ECOSYSTEMS",
      description: "Native iOS (Swift), Android (Kotlin), and cross-platform Flutter mobile applications engineered with offline synchronization and sub-second touch interactions.",
      icon: Smartphone,
      href: "/services/app-development",
      image: appDevImg,
      gradient: "from-indigo-600 to-purple-600",
      features: [
        "Native iOS & Android Applications",
        "Cross-Platform Flutter & React Native",
        "Real-Time Push Notifications & Chat",
        "App Store & Google Play Publishing"
      ],
      popular: true
    },
    {
      id: "software-systems",
      title: "Software Systems",
      category: "ENTERPRISE ARCHITECTURE",
      description: "Scalable multi-tenant SaaS engines, custom CRM/ERP platforms, microservices backends, and automated data pipelines engineered for enterprise concurrency.",
      icon: Layers,
      href: "/services/software-systems",
      image: softwareSysImg,
      gradient: "from-blue-600 to-sky-500",
      features: [
        "Custom ERP & CRM Enterprise Systems",
        "High-Concurrency Microservices APIs",
        "Legacy Monolith Modernization",
        "SOC2 Security & Compliance Hardening"
      ]
    },
    {
      id: "ecommerce-solutions",
      title: "E-Commerce Solutions",
      category: "E-COMMERCE ENGINES",
      description: "B2B and B2C custom web storefronts featuring inventory API synchronization, multi-currency global checkout, sub-second product search, and automated shipping.",
      icon: ShoppingBag,
      href: "/services/ecommerce-solutions",
      image: ecommerceImg,
      gradient: "from-cyan-600 to-blue-600",
      features: [
        "Custom B2B & B2C Store Architecture",
        "Multi-Currency & Automatic Tax Sync",
        "Real-Time Inventory & ERP Integration",
        "Frictionless Instant Checkout Funnels"
      ]
    },
    {
      id: "seo-solutions",
      title: "SEO Solutions",
      category: "SEARCH GROWTH",
      description: "Technical SEO audits, semantic schema markup, Core Web Vitals optimization, and keyword content strategies designed to secure #1 Google rankings.",
      icon: Search,
      href: "/services/seo-solutions",
      image: seoImg,
      gradient: "from-purple-600 to-pink-600",
      features: [
        "Technical SEO & Structured Schema",
        "Core Web Vitals Speed Optimization",
        "High-Intent Keyword Content Strategy",
        "Search Console Telemetry Dashboards"
      ]
    },
    {
      id: "shopify-dev",
      title: "Shopify Development",
      category: "SHOPIFY STORES",
      description: "High-converting custom Liquid OS 2.0 themes, Headless Shopify Hydrogen storefronts, custom app microservices, and revenue-tuned checkout funnels.",
      icon: ShoppingBag,
      href: "/services/shopify-development",
      image: shopifyDevImg,
      gradient: "from-emerald-600 to-teal-600",
      features: [
        "Custom Shopify OS 2.0 Liquid Themes",
        "Headless Storefronts (Hydrogen/Remix)",
        "Custom Shopify App & API Integration",
        "Conversion Rate Optimization (CRO)"
      ]
    },
    {
      id: "cloud-infrastructure",
      title: "Cloud Infrastructure",
      category: "DEVOPS & CLOUD",
      description: "Architecting resilient AWS, Azure, and Cloudflare cloud infrastructure with automated CI/CD pipelines, Kubernetes container orchestration, and 99.99% SLA uptime.",
      icon: Cloud,
      href: "/services/cloud-infrastructure",
      image: cloudDevopsImg,
      gradient: "from-sky-500 to-blue-700",
      features: [
        "AWS & Azure Multi-Region Architecture",
        "Automated CI/CD Release Pipelines",
        "Kubernetes & Docker Orchestration",
        "FinOps Cloud Cost Cut (Up to 50%)"
      ]
    },
    {
      id: "data-analytics",
      title: "Data Analytics",
      category: "BUSINESS INTELLIGENCE",
      description: "Transform complex operational data into actionable real-time executive dashboards, automated ETL data ingestion pipelines, and predictive telemetry.",
      icon: BarChart3,
      href: "/services/data-analytics",
      image: dataAnalyticsImg,
      gradient: "from-violet-600 to-indigo-800",
      features: [
        "Real-Time Executive KPI Dashboards",
        "Snowflake & BigQuery Data Lakes",
        "Apache Kafka Telemetry Streaming",
        "Automated PDF Executive Digests"
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen bg-background text-foreground overflow-hidden">
      <Helmet>
        <title>Full-Stack Software Engineering & Digital Services | CoreSlash Technologies</title>
        <meta
          name="description"
          content="Explore CoreSlash Technologies' software engineering divisions: AI Automation, Web Development, Mobile Apps, Custom Software Systems, E-Commerce, SEO, Shopify, Cloud Infrastructure, and Data Analytics."
        />
        <link rel="canonical" href="https://coreslashtechnologies.com/services" />
        <script type="application/ld+json">{JSON.stringify(servicesSchema)}</script>
      </Helmet>

      {/* ========================================================
          1. HERO SECTION (DARK SLATE WITH BACKGROUND IMAGE)
          ======================================================== */}
      <section
        className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-start overflow-hidden py-8 md:py-12 px-6 md:px-12 lg:px-24 bg-slate-950"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/30 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_60%)] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] w-full text-left space-y-4 md:space-y-5">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide text-slate-400 uppercase"
          >
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-blue-400 font-semibold">Services</span>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs md:text-sm font-semibold tracking-wide backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span>Full-Stack Engineering Divisions</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl"
          >
            World-Class Engineering &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
              Digital Solutions
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl leading-relaxed font-normal"
          >
            CoreSlash Technologies provides software development services for scalable AI solutions, high-performance web platforms, mobile applications, cloud infrastructure, custom software systems, and real-time business intelligence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm md:text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Schedule Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#services-grid"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-sm md:text-base backdrop-blur-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Explore All Divisions</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          2. SERVICES BENTO GRID WITH BACKGROUND IMAGES
          ======================================================== */}
      <section id="services-grid" className="w-full py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-background border-t border-border/40">
        <div className="max-w-[1400px] mx-auto">

          {/* Header */}
          <div className="flex flex-col items-start gap-4 mb-16 text-left">
            <div className="flex items-center">
              <div className="w-[3px] h-6 bg-blue-600 rounded-full mr-3" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Our Divisions
              </h3>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
              Specialized Software Engineering Services
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl">
              Each division operates with specialized senior engineers, structured design systems, and enterprise SLA standards. Select a service below to view full specifications.
            </p>
          </div>

          {/* 9 Rich Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, idx: number) => {
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06, duration: 0.5 }}
                  className="group relative rounded-[2rem] bg-card border border-border/80 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer"
                >
                  <Link to={item.href} className="absolute inset-0 z-20" aria-label={`Explore ${item.title}`} />

                  {/* Card Header Background Image Layer */}
                  <div className="relative w-full h-[200px] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-[0.85] dark:brightness-[0.75]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-grow space-y-6">
                    <div className="flex items-center gap-4">
                      {/* Large Styled Number matching individual service pages */}
                      <span className="text-6xl md:text-7xl font-bold select-none tracking-tighter shrink-0 transition-transform duration-300 group-hover:scale-110 text-transparent bg-clip-text bg-gradient-to-b from-slate-300 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-2xl font-extrabold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">
                        {item.title}
                      </h3>
                    </div>

                    {/* CTA Link */}
                    <div className="pt-2">
                      <div
                        className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-secondary group-hover:bg-blue-600 text-secondary-foreground group-hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 group/btn shadow-sm"
                      >
                        <span>Explore {item.title}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          3. THE SOFTWARE DEVELOPMENT CYCLE (DONUT WHEEL PROCESS)
          ======================================================== */}
      <ProcessTimeline />

      {/* ========================================================
          4. ENGAGEMENT MODELS
          ======================================================== */}
      <EngagementModels />

      {/* ========================================================
          5. TECHNOLOGY GRID
          ======================================================== */}
      <TechnologyGrid />

      {/* ========================================================
          6. FAQ SECTION
          ======================================================== */}
      <section className="w-full py-16 md:py-24 border-t border-border/40 overflow-hidden bg-background">
        <FaqSection data={allServicesFaqData} />
      </section>

      {/* ========================================================
          7. CTA SECTION
          ======================================================== */}
      <CTASection />
    </div>
  );
}

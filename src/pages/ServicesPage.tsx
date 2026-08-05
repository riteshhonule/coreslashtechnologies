import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code2, Smartphone, ShoppingBag, Cpu, Search, Cloud,
  ArrowRight, CheckCircle2, Sparkles, Zap, Rocket, MessageSquare
} from "lucide-react";
import TechnologyGrid from "@/components/web-development/TechnologyGrid";

export default function ServicesIndex() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      id: "ai-automation",
      title: "AI Automation",
      category: "AI & Automation",
      description: "AI-powered workflows, custom LLM integration, autonomous agentic systems, and predictive data pipelines built for high efficiency.",
      icon: Cpu,
      href: "/services/ai-automation",
      gradient: "from-blue-600 to-cyan-500",
      features: [
        "Custom LLM & RAG Integration",
        "Autonomous Agentic Workflows",
        "Intelligent Process Automation",
        "Predictive Analytics Engines"
      ],
      popular: true
    },
    {
      id: "web-dev",
      title: "Web Development",
      category: "Web Development",
      description: "High-performance React & Next.js websites built for lightning-fast speeds, responsive elegance, and maximal conversion rates.",
      icon: Code2,
      href: "/services/web-development",
      gradient: "from-blue-600 to-indigo-600",
      features: [
        "Custom React & Next.js Architecture",
        "Sub-Second Page Load Optimization",
        "Responsive & Accessible UI/UX Design",
        "Headless CMS & API Integration"
      ],
      popular: true
    },
    {
      id: "app-dev",
      title: "App Development",
      category: "App Development",
      description: "Native & cross-platform mobile apps engineered with Flutter and React Native for fluid touch interactions and offline capability.",
      icon: Smartphone,
      href: "/services/app-development",
      gradient: "from-indigo-600 to-purple-600",
      features: [
        "iOS & Android Cross-Platform Apps",
        "Real-Time Push Notifications & Chat",
        "Offline Data Storage & Sync",
        "App Store & Play Store Deployment"
      ]
    },
    {
      id: "software-systems",
      title: "Software Systems",
      category: "Software Systems",
      description: "Scalable backend APIs, custom CRM/ERP solutions, SCADA integrations, and enterprise microservices engineered for industrial scale.",
      icon: Cpu,
      href: "/services/software-systems",
      gradient: "from-blue-600 to-sky-500",
      features: [
        "Custom ERP/CRM Enterprise Engines",
        "Industrial SCADA & IoT Pipelines",
        "Scalable Microservices Architecture",
        "High-Throughput REST & GraphQL APIs"
      ],
      popular: true
    },
    {
      id: "ecommerce-solutions",
      title: "E-Commerce Solutions",
      category: "E-Commerce Solutions",
      description: "B2B and B2C custom web stores featuring inventory sync, multi-currency checkout, sub-second search, and automated shipping.",
      icon: ShoppingBag,
      href: "/services/ecommerce-solutions",
      gradient: "from-cyan-600 to-blue-600",
      features: [
        "B2B & B2C Custom Store Architecture",
        "Multi-Currency & Tax Automation",
        "Inventory & Logistics API Sync",
        "Frictionless Instant Checkout"
      ]
    },
    {
      id: "seo-solutions",
      title: "SEO Solutions",
      category: "SEO Solutions",
      description: "Technical SEO audits, semantic schema markup, Core Web Vitals tuning, and content strategies to rank #1 on Google.",
      icon: Search,
      href: "/services/seo-solutions",
      gradient: "from-purple-600 to-pink-600",
      features: [
        "Technical SEO & Schema Markup",
        "Core Web Vitals & Speed Tuning",
        "Keyword Research & Content Strategy",
        "Search Console & Analytics Dashboards"
      ]
    },
    {
      id: "shopify-dev",
      title: "Shopify Development",
      category: "Shopify Development",
      description: "High-converting Liquid custom themes, headless Shopify storefronts, app integrations, and conversion-tuned checkout funnels.",
      icon: ShoppingBag,
      href: "/services/shopify-development",
      gradient: "from-emerald-600 to-teal-600",
      features: [
        "Custom Shopify Liquid Theme Design",
        "Headless Shopify & Storefront API",
        "Payment Gateway & Tax Engine Setup",
        "Conversion Rate Optimization (CRO)"
      ]
    },
    {
      id: "cloud-infrastructure",
      title: "Cloud Infrastructure",
      category: "Cloud Infrastructure",
      description: "Architecting resilient AWS, Azure, and Cloudflare environments with automated CI/CD pipelines, Kubernetes, and zero-downtime deploys.",
      icon: Cloud,
      href: "/services/cloud-infrastructure",
      gradient: "from-sky-500 to-blue-700",
      features: [
        "AWS / Azure Multi-Cloud Architecture",
        "Automated CI/CD Deployment Pipelines",
        "Kubernetes & Container Orchestration",
        "24/7 Monitoring & Infrastructure Security"
      ]
    },
    {
      id: "data-analytics",
      title: "Data Analytics",
      category: "Data Analytics",
      description: "Transform raw organizational data into actionable executive insights through real-time dashboards, telemetry, and automated reporting.",
      icon: Cloud,
      href: "/services/data-analytics",
      gradient: "from-violet-600 to-indigo-800",
      features: [
        "Real-Time Executive Dashboards",
        "Data Warehouse & Pipeline ETL",
        "Business Intelligence Telemetry",
        "Automated PDF & Email Reports"
      ]
    }
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Discovery & Blueprint",
      description: "We analyze your business requirements, define technical scope, and map architecture blueprints."
    },
    {
      step: "02",
      title: "UI/UX & Prototyping",
      description: "Our design team crafts intuitive glassmorphic wireframes and interactive user journeys."
    },
    {
      step: "03",
      title: "Agile Development",
      description: "Engineers build clean, modular codebases with continuous integration and security testing."
    },
    {
      step: "04",
      title: "Launch & Optimization",
      description: "We deploy to high-availability cloud infrastructure with 24/7 monitoring and performance tuning."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-background text-foreground overflow-hidden">
      <Helmet>
        <title>Our Services | CoreSlash Technologies</title>
        <meta
          name="description"
          content="Explore CoreSlash Technologies' software engineering services: Web Development, Mobile Apps, Shopify E-Commerce, Custom Software Systems, and SEO Optimization."
        />
        <link rel="canonical" href="https://www.coreslashtechnologies.com/services" />
      </Helmet>

      {/* 1. HERO BANNER */}
      <section className="relative w-full pt-16 md:pt-24 pb-16 px-6 sm:px-10 md:px-16 lg:px-24 max-w-[1700px] mx-auto overflow-hidden">
        {/* Ambient Glowing Background */}
        <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/20 via-indigo-500/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-sky-500/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950 text-white dark:bg-white/10 dark:text-white border border-slate-800 dark:border-white/20 text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-xl backdrop-blur-xl"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Full-Stack Engineering & Digital Solutions</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]"
          >
            Our Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400">Services</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base sm:text-lg max-w-2xl font-medium leading-relaxed"
          >
            We build high-performance web applications, mobile platforms, Shopify storefronts, and automated enterprise software systems designed to scale your revenue.
          </motion.p>

          {/* Stats Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4"
          >
            <div className="p-4 rounded-2xl bg-card border border-border/60 shadow-sm text-center">
              <span className="text-2xl font-bold text-blue-600 block">06+</span>
              <span className="text-xs text-muted-foreground font-semibold uppercase">Core Domains</span>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border/60 shadow-sm text-center">
              <span className="text-2xl font-bold text-foreground block">100%</span>
              <span className="text-xs text-muted-foreground font-semibold uppercase">Code Ownership</span>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border/60 shadow-sm text-center">
              <span className="text-2xl font-bold text-indigo-600 block">&lt; 100ms</span>
              <span className="text-xs text-muted-foreground font-semibold uppercase">Latency Standard</span>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border/60 shadow-sm text-center">
              <span className="text-2xl font-bold text-foreground block">24/7</span>
              <span className="text-xs text-muted-foreground font-semibold uppercase">DevOps Support</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. SERVICES BENTO GRID */}
      <section className="w-full max-w-[1700px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-12">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20">
            Tailored Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">What We Build & Deliver</h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto font-medium">
            Explore our specialized development divisions below. Click any card for detailed specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, idx: number) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group relative rounded-[2.5rem] bg-card border border-border/80 p-8 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
              >
                {/* Popular Pill */}
                {item.popular && (
                  <div className="absolute top-6 right-6">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-600 text-white shadow-md shadow-blue-500/30">
                      <Zap className="w-3 h-3" /> Featured
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} text-white flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComp className="w-7 h-7" />
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 pt-2 border-t border-border/60">
                    {item.features.map((feat: string, fIdx: number) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs font-semibold text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Link Button */}
                <div className="pt-8 mt-6">
                  <Link
                    to={item.href}
                    className="w-full py-3.5 px-5 rounded-2xl bg-slate-950 text-white dark:bg-white/10 dark:text-white font-semibold text-xs sm:text-sm flex items-center justify-between group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-md"
                  >
                    <span>Explore Service Details</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. TECHNOLOGIES & STACK SECTION */}
      <TechnologyGrid />

      {/* 4. WORKFLOW PROCESS */}
      <section className="w-full max-w-[1700px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-16 border-t border-border/40">
        <div className="text-center mb-16 space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20">
            Agile Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">How We Execute Your Project</h2>
          <p className="text-muted-foreground text-sm sm:text-base font-medium">
            From initial concept strategy to post-deployment monitoring, our structured workflow guarantees on-time delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((ws, i) => (
            <div key={i} className="p-8 rounded-3xl bg-card border border-border/80 shadow-lg space-y-4 relative group">
              <span className="text-4xl font-bold text-blue-600/30 group-hover:text-blue-600 transition-colors block">
                {ws.step}
              </span>
              <h3 className="text-xl font-bold text-foreground">{ws.title}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{ws.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CALL TO ACTION BANNER */}
      <section className="w-full max-w-[1700px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pb-20">
        <div className="p-10 sm:p-14 rounded-[3rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-4 max-w-2xl text-center lg:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold uppercase">
              <Rocket className="w-3.5 h-3.5" />
              <span>Ready to Scale Your Project?</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              Have a custom software requirement?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Schedule a technical consultation with our engineering directors. We provide free scope evaluations, architecture advice, and fixed-price estimates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full sm:w-auto">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Get Free Quotation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="https://wa.me/918310711652"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-extrabold text-sm sm:text-base transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

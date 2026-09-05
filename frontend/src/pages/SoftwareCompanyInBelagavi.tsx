import { useEffect, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code2, Smartphone, Cpu, ShoppingBag, Search, Cloud,
  BarChart3, ArrowRight, Sparkles, CheckCircle2, ShieldCheck,
  Building2, Server, Terminal, Lock, Layers, MapPin, ExternalLink,
  Zap, Check, Headphones, Factory, HeartPulse,
  Users, Briefcase, Landmark
} from "lucide-react";
import CTASection from "@/components/web-development/CTASection";
import FaqSection, { type FaqData } from "@/components/ui/habit-faq-scroller";

const belagaviServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Top IT & Software Development Services in Belagavi (Belgaum)",
  "url": "https://coreslashtechnologies.com/top-it-companies-in-belagavi",
  "serviceType": "Software Development",
  "description": "CoreSlash Technologies is a software development company in Belagavi offering custom web applications, mobile apps, enterprise software systems, and AI solutions.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "CoreSlash Technologies",
    "url": "https://coreslashtechnologies.com/",
    "telephone": "+918310711652",
    "email": "contact@coreslashtechnologies.com",
    "logo": "https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Belagavi",
      "addressRegion": "Karnataka",
      "postalCode": "590006",
      "addressCountry": "IN"
    }
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Belagavi"
    },
    {
      "@type": "City",
      "name": "Belgaum"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Software Engineering Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Web Development",
          "url": "https://coreslashtechnologies.com/services/web-development"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mobile App Development",
          "url": "https://coreslashtechnologies.com/services/app-development"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Enterprise Software Systems",
          "url": "https://coreslashtechnologies.com/services/software-systems"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Automation Solutions",
          "url": "https://coreslashtechnologies.com/services/ai-automation"
        }
      }
    ]
  }
};

const belagaviFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Everything you need to know about software development services with CoreSlash Technologies in Belagavi.",
  rows: [
    {
      id: "row1",
      speed: "50s",
      direction: "left",
      faqItems: [
        {
          id: "q1",
          question: "What should businesses look for when evaluating IT companies in Belagavi (Belgaum)?",
          answer: "When evaluating IT and software companies in Belagavi, businesses should look for 100% source code and IP ownership, modern full-stack engineering practices (React, Next.js, Node.js, Python, AWS), transparent delivery timelines, sub-second web performance, and reliable SLA support."
        },
        {
          id: "q2",
          question: "What IT and software engineering services are available in Belagavi?",
          answer: "Leading IT companies in Belagavi offer custom services including Custom Web Development, Native & Cross-Platform Mobile App Development, Enterprise Software Systems (ERP/CRM), AI Automation, E-Commerce Portals, SEO Solutions, Cloud Infrastructure, and Data Analytics."
        },
        {
          id: "q3",
          question: "Do you build custom software or use pre-made templates?",
          answer: "We specialize in custom software engineering tailored specifically to your business logic using React, Next.js, Node.js, Python, and cloud-native microservices, ensuring zero bloat and maximum scalability."
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
          question: "Who owns the source code and intellectual property?",
          answer: "You maintain 100% full ownership of all source code, database schemas, API architecture, and intellectual property upon project completion."
        },
        {
          id: "q5",
          question: "How quickly can a software project be launched in Belagavi?",
          answer: "Web development and corporate portals deliver in 4 to 6 weeks, mobile applications ship in 6 to 10 weeks, and complex enterprise software platforms deliver in 8 to 14 weeks."
        },
        {
          id: "q6",
          question: "Do you provide post-launch support and maintenance for Belagavi businesses?",
          answer: "Yes, we offer ongoing SLA maintenance contracts including 24/7 cloud DevOps monitoring, security updates, database backups, and feature enhancements."
        }
      ]
    }
  ]
};

const VALUE_CARDS = [
  {
    icon: <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "Custom Software",
    description: "Bespoke SaaS platforms, enterprise ERP/CRM engines, and API microservices tailored to your exact workflows."
  },
  {
    icon: <Smartphone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    title: "Web & Mobile Apps",
    description: "Ultra-fast React/Next.js web platforms and native iOS/Android/Flutter mobile apps built for performance."
  },
  {
    icon: <Cpu className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
    title: "AI & Automation",
    description: "Autonomous LLM agents, intelligent document processors, and RAG vector search data pipelines."
  },
  {
    icon: <Server className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
    title: "Enterprise Solutions",
    description: "Cloud infrastructure management, Docker microservices, automated backups, and 24/7 SLA DevOps support."
  }
];

const CORE_SERVICES = [
  {
    icon: <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "Web Development",
    description: "High-performance web applications, corporate portals, and SaaS platforms built with React, Next.js, and modern APIs.",
    link: "/services/web-development"
  },
  {
    icon: <Smartphone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    title: "Mobile App Development",
    description: "Native iOS, Android, and cross-platform Flutter/React Native mobile applications with smooth offline sync.",
    link: "/services/app-development"
  },
  {
    icon: <Server className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
    title: "Enterprise Software Systems",
    description: "Custom ERP, CRM, inventory automation, and multi-tenant cloud software engineered for operational efficiency.",
    link: "/services/software-systems"
  },
  {
    icon: <Cpu className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
    title: "AI Automation",
    description: "Intelligent workflow automation, custom AI agent integration, predictive models, and LLM data pipelines.",
    link: "/services/ai-automation"
  },
  {
    icon: <ShoppingBag className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    title: "E-Commerce Solutions",
    description: "Scalable online storefronts and Shopify OS 2.0 implementations with instant payment gateways and shipping APIs.",
    link: "/services/ecommerce-solutions"
  },
  {
    icon: <Search className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
    title: "SEO Solutions",
    description: "Technical SEO, local search optimization, structured Schema microdata, and organic growth strategies.",
    link: "/services/seo-solutions"
  },
  {
    icon: <Cloud className="w-6 h-6 text-sky-600 dark:text-sky-400" />,
    title: "Cloud Infrastructure",
    description: "AWS cloud architecture, Docker microservices, automated CI/CD deployment pipelines, and DevOps SLAs.",
    link: "/services/cloud-infrastructure"
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
    title: "Data Analytics",
    description: "Real-time analytics dashboards, business intelligence reporting, data pipelines, and executive key metrics.",
    link: "/services/data-analytics"
  }
];

const WHY_CORESLASH_PILLARS = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "100% Code & IP Ownership",
    description: "You maintain total ownership of source code, git repositories, database schemas, and intellectual property without platform lock-in."
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
    title: "Sub-Second Web Speed",
    description: "Custom engineered architectures achieving FCP <0.8s, zero script bloat, and 95+ Google Lighthouse Web Vitals scores."
  },
  {
    icon: <Layers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    title: "Modern Full-Stack Engineering",
    description: "Built with React, Next.js, Node.js, Python, and AWS cloud microservices to handle high user concurrency effortlessly."
  },
  {
    icon: <Headphones className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    title: "Dedicated Local & SLA Support",
    description: "Direct access to senior solutions architects, clear project milestones, and post-launch SLA cloud maintenance options."
  }
];

const INDUSTRIES_SERVED = [
  {
    icon: <Factory className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    category: "Industrial & Logistics",
    title: "Manufacturing & Supply Chain",
    desc: "Automated inventory tracking, warehouse management, multi-location logistics, and GST billing software for Belagavi manufacturing hubs."
  },
  {
    icon: <HeartPulse className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    category: "Healthcare Technology",
    title: "Healthcare & Medical Clinics",
    desc: "Secure electronic health record portals, appointment booking engines, diagnostic workflows, and patient data synchronization."
  },
  {
    icon: <Users className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    category: "Workforce & Talent",
    title: "IT Consulting & Recruitment",
    desc: "Talent acquisition management platforms, candidate verification engines, real-time candidate search dashboards, and recruiter tools."
  },
  {
    icon: <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    category: "Enterprise Advisory",
    title: "Executive Advisory & Enterprise SaaS",
    desc: "Real-time risk assessment dashboards, crisis management engines, automated financial reporting, and operational monitoring."
  },
  {
    icon: <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    category: "Digital Commerce",
    title: "Retail & E-Commerce Brands",
    desc: "Custom headless web storefronts, mobile shopping apps, multi-currency payment checkout, and automated inventory sync."
  },
  {
    icon: <Landmark className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    category: "Financial Systems",
    title: "Financial Technology & Business Systems",
    desc: "Custom financial analytics dashboards, automated invoicing platforms, secure user auth, and transactional audit trails."
  }
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discover & Analyze",
    desc: "We analyze your business logic, system specs, user requirements, and technical goals to outline a clear project architecture."
  },
  {
    num: "02",
    title: "Architecture & Wireframing",
    desc: "Our solution architects create database schemas, API contracts, user flows, and modern UI/UX design wireframes."
  },
  {
    num: "03",
    title: "Full-Stack Engineering",
    desc: "We build your software using clean React, Node.js/Python, and cloud microservices with rigorous code quality standards."
  },
  {
    num: "04",
    title: "Quality Assurance & Speed Test",
    desc: "Comprehensive security checks, cross-device testing, API latency validation, and sub-second Web Vitals optimization."
  },
  {
    num: "05",
    title: "Deployment & 24/7 SLA Support",
    desc: "Zero-downtime deployment to AWS/Vercel with automated backups, CI/CD pipelines, and dedicated post-launch support."
  }
];

export default function SoftwareCompanyInBelagavi() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Helmet>
        <title>Top IT Companies in Belagavi (Belgaum) | Software Development</title>
        <meta
          name="description"
          content="Discover the top IT and software companies in Belgaum (Belagavi), Karnataka. Explore leading technology firms, software services, and digital solutions for businesses."
        />
        <link rel="canonical" href="https://coreslashtechnologies.com/top-it-companies-in-belagavi" />

        {/* Open Graph SEO */}
        <meta property="og:title" content="Top IT Companies in Belagavi (Belgaum) | Software Development" />
        <meta property="og:description" content="Discover leading software development and IT services in Belagavi by CoreSlash Technologies, covering custom web apps, mobile solutions, and enterprise software." />
        <meta property="og:url" content="https://coreslashtechnologies.com/top-it-companies-in-belagavi" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CoreSlash Technologies" />
        <meta property="og:image" content="https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png" />

        {/* Twitter Card SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Top IT Companies in Belagavi (Belgaum) | Software Development" />
        <meta name="twitter:description" content="Discover leading software development and IT services in Belagavi by CoreSlash Technologies, covering custom web apps, mobile solutions, and enterprise software." />
        <meta name="twitter:image" content="https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(belagaviServiceSchema)}
        </script>
      </Helmet>

      {/* ========================================================
          1. HERO SECTION
          ======================================================== */}
      <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-slate-950 text-white border-b border-white/10">
        {/* Ambient Radial Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),transparent_70%)] pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            {/* Glowing Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md"
            >
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Belagavi Local Software Engineering Partner</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
            >
              Top IT Companies in{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Belagavi
              </span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-normal"
            >
              Guide to top IT companies and software development providers in Belagavi (Belgaum). CoreSlash Technologies delivers custom web applications, mobile apps, enterprise software, and AI solutions for growing businesses in Karnataka.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-2"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold text-sm shadow-xl shadow-blue-600/25 transition-all duration-300 group cursor-pointer"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 text-sm font-semibold transition-all duration-300 cursor-pointer"
              >
                <span>Explore Portfolio</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </Link>
            </motion.div>

            {/* Key Highlight Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left border-t border-white/10 mt-8"
            >
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">100% IP Code Ownership</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 shadow-sm">
                <Terminal className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">React & Node.js Stack</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">Sub-Second Web Vitals</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 shadow-sm">
                <Building2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">Belagavi Local Presence</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. TRUST / COMPACT VALUE CARDS SECTION
          ======================================================== */}
      <section className="py-16 md:py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-border/40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUE_CARDS.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-800/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================
          3. BELAGAVI LOCAL CONTEXT SECTION
          ======================================================== */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-border/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center px-4 py-1.5 rounded-md bg-blue-50 dark:bg-blue-950/40 border-l-4 border-blue-600 text-xs font-semibold text-blue-700 dark:text-blue-400">
              Technology Partner in Belagavi
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
              Empowering Businesses in Belagavi & Belgaum With Modern Software Systems
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              As Belagavi (commonly known as Belgaum) expands as a major industrial, educational, and commercial center in North Karnataka, local enterprises and growing organizations increasingly rely on high-performance IT infrastructure. Navigating software and technology options in Belagavi requires choosing engineering partners that deliver scalable digital software, complete code ownership, and robust cloud security.
            </p>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Whether your organization in Belagavi or Belgaum requires custom <Link to="/services/web-development" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">web development</Link> with React and Next.js, cross-platform <Link to="/services/app-development" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">mobile app development</Link>, custom <Link to="/services/software-systems" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">enterprise software systems</Link>, or intelligent <Link to="/services/ai-automation" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">AI automation</Link>, modern engineering standards ensure long-term operational success.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 font-medium">
                <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Custom React & Node.js Web Apps</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 font-medium">
                <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Native iOS & Android Mobile Apps</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 font-medium">
                <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Enterprise ERP & Inventory Portals</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 font-medium">
                <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Autonomous AI Agent Pipelines</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-slate-900 border border-white/10 p-8 text-white space-y-6 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500" />

              <h3 className="text-xl font-bold text-white flex items-center gap-3 relative z-10">
                <Lock className="w-5 h-5 text-blue-400" />
                <span>CoreSlash Quality Commitments</span>
              </h3>

              <ul className="space-y-4 text-xs sm:text-sm text-slate-300 relative z-10">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Full Code Ownership:</strong> Complete source code, git repository access, and database architecture ownership transferred upon project delivery.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">No Rigid Template Lock-In:</strong> We write clean, maintainable modular code without reliant template plugins or rigid website builders.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Enterprise Security:</strong> Enterprise OAuth/JWT authentication, AES encryption, SSL, and AWS cloud microservices infrastructure.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Direct Technical Access:</strong> Speak directly with senior solution architects based in Karnataka to map your software requirements.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. CORE SERVICES GRID
          ======================================================== */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-border/40">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Service Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Software Engineering Services Offered in Belagavi
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            We deliver end-to-end digital capabilities utilizing modern technology stacks, proven software architecture patterns, and rigorous quality assurance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-6">
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-2.5 transition-all"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================
          5. WHY CORESLASH SECTION (FACTUAL PILLARS)
          ======================================================== */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-border/40">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Factual Advantage</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Why Businesses Choose CoreSlash Technologies
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            We operate with complete engineering transparency, delivering clean source code, predictable timelines, and dedicated post-launch support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CORESLASH_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-800/50 flex items-center justify-center mb-4">
                {pillar.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {pillar.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          6. TARGETED BELAGAVI INDUSTRIES (PREMIUM REDESIGN)
          ======================================================== */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-border/40">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Targeted Industry Solutions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Industries We Empower in Belagavi & Belgaum
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Our software engineering solutions address domain-specific challenges across key industry sectors in the Belagavi region.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES_SERVED.map((ind, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header Badge Row */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-800/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {ind.icon}
                  </div>
                  <span className="text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                    {ind.category}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {ind.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {ind.desc}
                </p>
              </div>

              {/* Bottom Subtle Explore Indicator */}
              <div className="pt-6 flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-2.5 transition-all">
                <span>Explore Capability</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================
          7. PORTFOLIO WORK HIGHLIGHTS (CLICKABLE CARDS TO /portfolio)
          ======================================================== */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-border/40">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Proven Track Record</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Featured Software Engineering Case Studies
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Explore how our custom web applications and software systems drive real operational outcomes.
            </p>
          </div>

          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs transition-transform hover:scale-105"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: PITCS (Clickable Link to /portfolio) */}
          <Link
            to="/portfolio"
            className="block text-left no-underline group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-3xl"
          >
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl bg-slate-950 border border-white/10 p-8 text-white space-y-6 shadow-2xl overflow-hidden flex flex-col justify-between h-full group-hover:border-blue-500/50 group-hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-all duration-300"
            >
              {/* Top Accent Stripe & Ambient Glow */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500" />
              <div className="absolute -top-12 -right-12 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-colors" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                    ENTERPRISE WEB PLATFORM
                  </span>

                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors">
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  PITCS – Global IT Consulting & Talent Engine
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Engineered a modern React/Next.js web portal and database architecture managing 250,000+ candidate profiles with sub-second response times and automated recruiter matching.
                </p>

                {/* Metrics Highlights */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center">
                  <div className="space-y-0.5">
                    <span className="text-base sm:text-lg font-extrabold text-blue-400">250K+</span>
                    <p className="text-[10px] text-slate-400">Profiles Managed</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-base sm:text-lg font-extrabold text-cyan-400">40%</span>
                    <p className="text-[10px] text-slate-400">Faster Onboarding</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-base sm:text-lg font-extrabold text-indigo-400">99.9%</span>
                    <p className="text-[10px] text-slate-400">System Uptime</p>
                  </div>
                </div>
              </div>

              {/* Tech Badges & View Case Study Affordance */}
              <div className="space-y-4 pt-2 relative z-10">
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
                  <span className="px-3 py-1 rounded-md bg-white/10 border border-white/10">React</span>
                  <span className="px-3 py-1 rounded-md bg-white/10 border border-white/10">Next.js</span>
                  <span className="px-3 py-1 rounded-md bg-white/10 border border-white/10">Node.js</span>
                  <span className="px-3 py-1 rounded-md bg-white/10 border border-white/10">PostgreSQL</span>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    View Case Study
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Card 2: Skandan (Clickable Link to /portfolio) */}
          <Link
            to="/portfolio"
            className="block text-left no-underline group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-3xl"
          >
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl bg-slate-950 border border-white/10 p-8 text-white space-y-6 shadow-2xl overflow-hidden flex flex-col justify-between h-full group-hover:border-indigo-500/50 group-hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)] transition-all duration-300"
            >
              {/* Top Accent Stripe & Ambient Glow */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />
              <div className="absolute -top-12 -right-12 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-colors" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                    EXECUTIVE SAAS PLATFORM
                  </span>

                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-colors">
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  Skandan – Advisory & Decision Engine
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Built an executive decision dashboard providing real-time operational risk assessment, crisis management workflows, and high-uptime cloud infrastructure.
                </p>

                {/* Metrics Highlights */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center">
                  <div className="space-y-0.5">
                    <span className="text-base sm:text-lg font-extrabold text-indigo-400">3x</span>
                    <p className="text-[10px] text-slate-400">Efficiency Gain</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-base sm:text-lg font-extrabold text-purple-400">100+</span>
                    <p className="text-[10px] text-slate-400">Enterprise Clients</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-base sm:text-lg font-extrabold text-cyan-400">Zero</span>
                    <p className="text-[10px] text-slate-400">Downtime Incidents</p>
                  </div>
                </div>
              </div>

              {/* Tech Badges & View Case Study Affordance */}
              <div className="space-y-4 pt-2 relative z-10">
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
                  <span className="px-3 py-1 rounded-md bg-white/10 border border-white/10">React</span>
                  <span className="px-3 py-1 rounded-md bg-white/10 border border-white/10">Python</span>
                  <span className="px-3 py-1 rounded-md bg-white/10 border border-white/10">AWS</span>
                  <span className="px-3 py-1 rounded-md bg-white/10 border border-white/10">Tailwind CSS</span>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    View Case Study
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* ========================================================
          8. 5-STEP DEVELOPMENT PROCESS (PREMIUM REDESIGN)
          ======================================================== */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-border/40">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Delivery Framework</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Our Software Engineering Process
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            From initial discovery to post-launch SLA cloud maintenance, we follow a transparent multi-phase delivery framework.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 space-y-3 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-3 pt-1">
                <span className="text-3xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent font-mono">
                  {step.num}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          9. FAQ & CTA SECTIONS
          ======================================================== */}
      <Suspense fallback={null}>
        <section className="w-full py-16 md:py-24 border-t border-border/40 overflow-hidden bg-background">
          <FaqSection data={belagaviFaqData} />
        </section>

        <CTASection
          badge="Belagavi Local Software Authority"
          title="Have a Software Idea or Business Challenge in Belagavi?"
          subtitle="Partner with CoreSlash Technologies to engineer high-performance web applications, mobile apps, and enterprise software systems tailored to your operational goals."
          primaryBtnText="Get Free Technical Proposal"
          secondaryBtnText="Explore Portfolio"
          primaryBtnLink="/contact"
          secondaryBtnLink="/portfolio"
        />
      </Suspense>
    </div>
  );
}

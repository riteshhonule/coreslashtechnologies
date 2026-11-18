import { useEffect, Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code2, Laptop, Globe, CheckCircle2, ShieldCheck, MapPin,
  Calendar, MessageSquare, ArrowRight, ExternalLink,
  Server, Zap, Layers, RefreshCw, ShoppingBag, Factory,
  HeartPulse, GraduationCap, Store
} from "lucide-react";
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiPython,
  SiPostgresql, SiDocker, SiTailwindcss
} from "react-icons/si";

import pitcsImg from "@/assets/portfolio/pitcs.webp";
import skandanImg from "@/assets/portfolio/skandan.webp";
import thedutzImg from "@/assets/portfolio/thedutz.webp";

const CTASection = lazy(() => import("@/components/web-development/CTASection"));
const FaqSection = lazy(() => import("@/components/ui/habit-faq-scroller"));
import { type FaqData } from "@/components/ui/habit-faq-scroller";

// ----------------------------------------------------
// STRUCTURED DATA (JSON-LD)
// ----------------------------------------------------
const localWebDevSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Web Development Services in Belagavi",
  "serviceType": "Web Development",
  "description": "CoreSlash Technologies is a custom web development company in Belagavi (Belgaum). We build fast, responsive business websites, web portals and custom applications.",
  "url": "https://coreslashtechnologies.com/web-development-company-in-belagavi",
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
      "name": "Services",
      "item": "https://coreslashtechnologies.com/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Web Development in Belagavi",
      "item": "https://coreslashtechnologies.com/web-development-company-in-belagavi"
    }
  ]
};

// ----------------------------------------------------
// PAGE DATA
// ----------------------------------------------------
const BELAGAVI_WEB_FAQS: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Common questions from Belagavi business owners about our website design, development, timelines, and collaboration.",
  rows: [
    {
      id: "row1",
      speed: "52s",
      direction: "left",
      faqItems: [
        {
          id: "q1",
          question: "Can we schedule an in-person meeting in Belagavi?",
          answer: "Yes. Belagavi-based business owners and project stakeholders can arrange in-person technical discovery and project consultation meetings in Belagavi by prior appointment. We also host online video consultations for initial discussions."
        },
        {
          id: "q2",
          question: "How long does it take to design and launch a business website in Belgaum?",
          answer: "Timelines are indicative and depend on specific project scope, feature requirements, and feedback cycles. Typical corporate and business websites launch in 4 to 6 weeks from technical requirement sign-off, while complex web applications or custom portals generally require 6 to 10 weeks."
        },
        {
          id: "q3",
          question: "Do you build on templates or write custom code?",
          answer: "We engineer project-specific architectures using React, Next.js, TypeScript, and modern APIs. This ensures high page speed, clean state management, modular components, and zero bloat from unneeded plugins."
        }
      ]
    },
    {
      id: "row2",
      speed: "44s",
      direction: "right",
      faqItems: [
        {
          id: "q4",
          question: "Who owns the website source code and intellectual property?",
          answer: "You maintain 100% legal ownership of your website source code, design assets, and database schemas upon milestone payment completion. We do not lock you into proprietary CMS licensing."
        },
        {
          id: "q5",
          question: "Will our website be mobile-responsive and optimized for Google search?",
          answer: "Yes. Every website we build is mobile-first responsive and engineered with semantic HTML5, Core Web Vitals optimization, and structured Schema.org markup for local search discovery."
        },
        {
          id: "q6",
          question: "Do you offer post-launch support and maintenance?",
          answer: "Yes. We offer flexible post-deployment SLA maintenance agreements covering cloud hosting management, automated backups, security patching, and ongoing content updates."
        }
      ]
    }
  ]
};

const SERVICES_LIST = [
  {
    icon: <Globe className="w-6 h-6 text-blue-500" />,
    title: "Business & Corporate Websites",
    description: "Responsive, brand-aligned websites engineered to establish professional credibility, present service offerings, and capture high-intent inquiries from local and national buyers."
  },
  {
    icon: <Code2 className="w-6 h-6 text-indigo-500" />,
    title: "Custom Web Applications",
    description: "Bespoke web applications built with React and Next.js, tailored to automate unique operational workflows, internal calculation tools, and multi-user business logic."
  },
  {
    icon: <Laptop className="w-6 h-6 text-cyan-500" />,
    title: "Customer & Business Portals",
    description: "Secure, authenticated customer portals, client dashboards, and vendor extranets with role-based access control and real-time database synchronization."
  },
  {
    icon: <ShoppingBag className="w-6 h-6 text-emerald-500" />,
    title: "E-Commerce Development",
    description: "Fast, conversion-focused online storefronts and custom Shopify integrations with secure payment gateway processing, automated inventory updates, and smooth checkout."
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-amber-500" />,
    title: "Website Redesign & Modernization",
    description: "Upgrading outdated, slow websites into modern Next.js platforms with improved mobile layouts, enhanced Core Web Vitals, and zero downtime migration."
  },
  {
    icon: <Server className="w-6 h-6 text-purple-500" />,
    title: "Backend & API Integrations",
    description: "Custom Node.js and Python microservices connecting your website with third-party CRMs, ERP databases, automated email systems, and operational software."
  }
];

const LOCAL_INDUSTRIES = [
  {
    icon: <Factory className="w-6 h-6 text-blue-500" />,
    title: "Manufacturing & Foundry Units",
    subtitle: "Udyambag, Machhe & Auto Nagar Corridors",
    description: "Custom web product catalogs, technical specification sheets, RFQ (Request for Quote) engines, and customer support portals for industrial suppliers."
  },
  {
    icon: <HeartPulse className="w-6 h-6 text-rose-500" />,
    title: "Healthcare & Diagnostic Centers",
    subtitle: "Clinics, Hospitals & Laboratories",
    description: "HIPAA/data-compliant websites featuring online appointment booking, doctor profiles, diagnostic test directories, and secure report download links."
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-amber-500" />,
    title: "Educational & Training Institutes",
    subtitle: "Colleges, Academies & Schools",
    description: "Academic websites featuring departmental directories, digital course prospectuses, event calendars, student inquiry workflows, and alumni portals."
  },
  {
    icon: <Store className="w-6 h-6 text-emerald-500" />,
    title: "Retail & Regional Commercial Businesses",
    subtitle: "Distributors, Retailers & Services",
    description: "Brand discovery websites and localized digital catalogs that improve Google Maps visibility and connect regional buyers with physical storefronts."
  }
];

const TECH_STACK = [
  { name: "React", icon: <SiReact className="w-6 h-6" />, color: "#61DAFB" },
  { name: "Next.js", icon: <SiNextdotjs className="w-6 h-6" />, color: "#FFFFFF" },
  { name: "Node.js", icon: <SiNodedotjs className="w-6 h-6" />, color: "#339933" },
  { name: "Python", icon: <SiPython className="w-6 h-6" />, color: "#3776AB" },
  { name: "PostgreSQL", icon: <SiPostgresql className="w-6 h-6" />, color: "#4169E1" },
  { name: "AWS Cloud", icon: <Server className="w-6 h-6" />, color: "#FF9900" },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="w-6 h-6" />, color: "#06B6D4" },
  { name: "Docker", icon: <SiDocker className="w-6 h-6" />, color: "#2496ED" }
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery & Scope",
    description: "We discuss your target audience, commercial objectives, and technical requirements to create a detailed project scope document."
  },
  {
    num: "02",
    title: "Architecture & Wireframes",
    description: "Our design team develops clean UI/UX wireframes, sitemap hierarchies, and content layouts tailored to your business goals."
  },
  {
    num: "03",
    title: "Engineering & Frontend",
    description: "We build your platform using modular React and Next.js components, ensuring fluid responsiveness across mobile, tablet, and desktop."
  },
  {
    num: "04",
    title: "QA & Performance Testing",
    description: "Comprehensive cross-browser testing, accessibility validation, form security audits, and Google Core Web Vitals speed checks."
  },
  {
    num: "05",
    title: "Deployment & Training",
    description: "Zero-downtime deployment to secure cloud hosting, domain/SSL configuration, analytics setup, and handoff of source code and assets."
  },
  {
    num: "06",
    title: "Support & AMC",
    description: "Optional ongoing maintenance contracts for scheduled backups, cloud updates, security monitoring, and feature enhancements."
  }
];

const VERIFIED_PORTFOLIO = [
  {
    title: "PITCS – Global IT Consulting & Workforce Portal",
    category: "Enterprise Web Platform",
    image: pitcsImg,
    description: "Enterprise workforce platform featuring automated candidate screening dashboards, real-time application tracking, and cloud document verification.",
    tech: ["React", "Next.js", "Node.js", "PostgreSQL"],
    link: "/portfolio"
  },
  {
    title: "Skandan – Advisory & Executive Decision Engine",
    category: "SaaS & Systems Portal",
    image: skandanImg,
    description: "Executive decision platform providing business crisis management, real-time risk assessment modeling, and interactive financial dashboards.",
    tech: ["React", "TypeScript", "Python", "Chart.js"],
    link: "/portfolio"
  },
  {
    title: "The Dutz – Premium Natural D2C E-Commerce Store",
    category: "E-Commerce & Storefront",
    image: thedutzImg,
    description: "High-converting online store engineered for rapid mobile page loads, instant one-click checkout, and automated subscription orders.",
    tech: ["Shopify OS 2.0", "Liquid", "GraphQL", "Tailwind CSS"],
    link: "/portfolio"
  }
];

export default function WebDevelopmentBelagavi() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-background min-h-screen text-foreground transition-colors duration-300">
      <Helmet>
        <title>Web Development Company in Belagavi (Belgaum) | CoreSlash</title>
        <meta
          name="description"
          content="CoreSlash Technologies is a custom web development company in Belagavi (Belgaum). We build fast, responsive business websites, web portals and custom applications."
        />
        <link rel="canonical" href="https://coreslashtechnologies.com/web-development-company-in-belagavi" />

        {/* Open Graph SEO */}
        <meta property="og:title" content="Web Development Company in Belagavi (Belgaum) | CoreSlash" />
        <meta property="og:description" content="CoreSlash Technologies is a custom web development company in Belagavi (Belgaum). We build fast, responsive business websites, web portals and custom applications." />
        <meta property="og:url" content="https://coreslashtechnologies.com/web-development-company-in-belagavi" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CoreSlash Technologies" />
        <meta property="og:image" content="https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png" />

        {/* Twitter Card SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Development Company in Belagavi (Belgaum) | CoreSlash" />
        <meta name="twitter:description" content="CoreSlash Technologies is a custom web development company in Belagavi (Belgaum). We build fast, responsive business websites, web portals and custom applications." />
        <meta name="twitter:image" content="https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(localWebDevSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* ========================================================
          1. HERO SECTION
          ======================================================== */}
      <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-slate-950 text-white border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),transparent_70%)] pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 text-left">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-400 select-none mb-6"
          >
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <span>&gt;</span>
            <Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link>
            <span>&gt;</span>
            <span className="text-[#3b82f6] font-bold">Web Development Belagavi</span>
          </motion.div>

          <div className="max-w-4xl space-y-6">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md"
            >
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Belagavi & Regional Web Engineering</span>
            </motion.div>

            {/* Main Headline H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
            >
              Custom Web Development Company in{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Belagavi (Belgaum)
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-3xl"
            >
              CoreSlash Technologies engineers high-performance business websites, web portals, custom web applications, and e-commerce platforms. We deliver modern React and Next.js engineering tailored to regional manufacturers, clinics, institutions, and growing enterprises in Belagavi.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold text-sm sm:text-base shadow-xl shadow-blue-600/25 transition-all duration-300"
              >
                <span>Request a Project Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm sm:text-base font-semibold transition-all duration-300"
              >
                <span>View Our Portfolio</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. LOCAL CONSULTATION & MEETING OPTIONS
          ======================================================== */}
      <section className="w-full py-12 md:py-16 bg-slate-900/60 border-b border-border/40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2 text-blue-500 font-semibold text-sm uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Local Project Collaboration</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                In-Person & Online Technical Consultations in Belagavi
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                For Belagavi business owners and project leadership who value direct discussions, we arrange in-person technical scoping sessions in Belagavi by prior appointment. We also offer online video consultations for teams evaluating specifications, milestones, and architectures.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-card border border-border/60 text-left space-y-2">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base text-foreground">In-Person Meetings</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Available in Belagavi by prior appointment for detailed requirement discovery and project alignment.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card border border-border/60 text-left space-y-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base text-foreground">Online Consultations</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Scheduled video calls with our software architects to review architecture, wireframes, and project estimates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. WHY CHOOSE CORESLASH
          ======================================================== */}
      <section className="w-full py-20 md:py-24 max-w-[1400px] mx-auto px-6 md:px-12 border-b border-border/40">
        <div className="text-left space-y-4 max-w-3xl mb-14">
          <div className="flex items-center">
            <div className="w-[3px] h-6 bg-[#3b82f6] rounded-full mr-3" />
            <span className="text-sm font-semibold uppercase tracking-widest text-[#3b82f6]">
              Engineering Standards
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Why Belagavi Businesses Choose CoreSlash Technologies
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Rather than relying on generic website templates with hidden plugin fees, we deliver purpose-built web platforms engineered for longevity, security, and measurable performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-card border border-border/70 text-left space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">100% IP & Source Code Ownership</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You own all custom source code, git repositories, and design deliverables upon milestone completion. No recurring proprietary platform licensing fees.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/70 text-left space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Performance-Conscious Development</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We engineer with a strict focus on mobile speed, fluid responsive design, clean semantic HTML5, and Google Core Web Vitals optimization.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/70 text-left space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Modern Component Architecture</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Built on React, Next.js, and TypeScript. Modular component architecture enables seamless future scaling without rewriting code.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/70 text-left space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Project-Specific Engineering</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every site layout, workflow, and data schema is tailored to your commercial use case instead of shoehorned into a bloated pre-made template.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/70 text-left space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Local & Regional SEO Ready</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Structured JSON-LD schema markup, canonical configurations, mobile viewport tuning, and search-optimized architectures built directly into every build.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/70 text-left space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Dedicated Post-Launch Support</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              SLA options covering cloud hosting configuration, automated data backups, security monitoring, and regular software updates.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. SERVICES BREAKDOWN
          ======================================================== */}
      <section className="w-full py-20 md:py-24 max-w-[1400px] mx-auto px-6 md:px-12 border-b border-border/40">
        <div className="text-left space-y-4 max-w-3xl mb-14">
          <div className="flex items-center">
            <div className="w-[3px] h-6 bg-[#3b82f6] rounded-full mr-3" />
            <span className="text-sm font-semibold uppercase tracking-widest text-[#3b82f6]">
              Core Offerings
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Website Development Services We Deliver
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            From corporate business presentations to full-featured cloud portals, we engineer custom solutions adapted to your business model.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((svc) => (
            <div key={svc.title} className="p-7 rounded-3xl bg-card border border-border/70 hover:border-blue-500/30 transition-all text-left space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                {svc.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground">{svc.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{svc.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          5. LOCAL INDUSTRY USE CASES
          ======================================================== */}
      <section className="w-full py-20 md:py-24 max-w-[1400px] mx-auto px-6 md:px-12 border-b border-border/40">
        <div className="text-left space-y-4 max-w-3xl mb-14">
          <div className="flex items-center">
            <div className="w-[3px] h-6 bg-[#3b82f6] rounded-full mr-3" />
            <span className="text-sm font-semibold uppercase tracking-widest text-[#3b82f6]">
              Regional Applications
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Web Solutions Tailored to Belagavi Industry Sectors
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            We architect solutions designed to address the operational and commercial requirements of North Karnataka’s key business corridors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LOCAL_INDUSTRIES.map((ind) => (
            <div key={ind.title} className="p-8 rounded-3xl bg-card border border-border/70 text-left space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10">
                  {ind.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{ind.title}</h3>
                  <span className="text-xs font-semibold text-blue-500 tracking-wide uppercase">{ind.subtitle}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                {ind.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          6. TECH STACK
          ======================================================== */}
      <section className="w-full py-20 md:py-24 max-w-[1400px] mx-auto px-6 md:px-12 border-b border-border/40">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#3b82f6]">
            Verified Technology Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Built with Modern Engineering Frameworks
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            We use production-proven languages and cloud services to ensure your website remains fast, secure, and easily maintainable.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {TECH_STACK.map((tech) => (
            <div key={tech.name} className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border/60 shadow-sm text-left">
              <div className="text-2xl" style={{ color: tech.color }}>
                {tech.icon}
              </div>
              <span className="font-semibold text-sm sm:text-base text-foreground">{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          7. DEVELOPMENT PROCESS
          ======================================================== */}
      <section className="w-full py-20 md:py-24 max-w-[1400px] mx-auto px-6 md:px-12 border-b border-border/40">
        <div className="text-left space-y-4 max-w-3xl mb-14">
          <div className="flex items-center">
            <div className="w-[3px] h-6 bg-[#3b82f6] rounded-full mr-3" />
            <span className="text-sm font-semibold uppercase tracking-widest text-[#3b82f6]">
              Structured Roadmap
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Our Website Engineering Process
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Transparent milestones from initial concept discussion through cloud launch and post-deployment maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROCESS_STEPS.map((step) => (
            <div key={step.num} className="p-7 rounded-3xl bg-card border border-border/70 text-left space-y-3 relative overflow-hidden">
              <span className="text-4xl font-black text-slate-200 dark:text-slate-800 select-none block">
                {step.num}
              </span>
              <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          8. VERIFIED PORTFOLIO
          ======================================================== */}
      <section className="w-full py-20 md:py-24 max-w-[1400px] mx-auto px-6 md:px-12 border-b border-border/40">
        <div className="text-left space-y-4 max-w-3xl mb-14">
          <div className="flex items-center">
            <div className="w-[3px] h-6 bg-[#3b82f6] rounded-full mr-3" />
            <span className="text-sm font-semibold uppercase tracking-widest text-[#3b82f6]">
              Proven Deliverables
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Featured Engineering Projects
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            A selection of verified web platforms and digital systems engineered by our software development team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VERIFIED_PORTFOLIO.map((p) => (
            <div key={p.title} className="rounded-3xl bg-card border border-border/80 overflow-hidden flex flex-col justify-between text-left shadow-sm">
              <div className="h-48 w-full overflow-hidden bg-slate-900 border-b border-border/40">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover select-none" loading="lazy" />
              </div>
              <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">{p.category}</span>
                  <h3 className="text-lg font-bold text-foreground mt-1">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2">{p.description}</p>
                </div>
                <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground">{t}</span>
                    ))}
                  </div>
                  <Link to={p.link} className="text-xs font-bold text-blue-500 flex items-center gap-1 hover:underline">
                    View Case Study <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          9. CONTEXTUAL REGIONAL ECOSYSTEM LINKS
          ======================================================== */}
      <section className="w-full py-12 bg-slate-950 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <p className="max-w-4xl mx-auto text-sm md:text-base text-slate-400 leading-relaxed">
            Evaluating the broader technology ecosystem in North Karnataka? Explore our comprehensive guide to the <Link to="/top-it-companies-in-belagavi" className="text-[#3b82f6] font-semibold hover:underline">top IT companies in Belgaum</Link>, consult our dedicated <Link to="/software-company-in-belgaum" className="text-[#3b82f6] font-semibold hover:underline">software company in Belgaum</Link> for operational systems, or discover our full national <Link to="/services/web-development" className="text-[#3b82f6] font-semibold hover:underline">custom web development services</Link> for distributed enterprise cloud platforms.
          </p>
        </div>
      </section>

      {/* ========================================================
          10. FREQUENTLY ASKED QUESTIONS
          ======================================================== */}
      <Suspense fallback={null}>
        <section className="w-full py-16 md:py-24 border-b border-border/40 overflow-hidden bg-background">
          <FaqSection data={BELAGAVI_WEB_FAQS} />
        </section>

        {/* ========================================================
            11. CTA SECTION
            ======================================================== */}
        <CTASection
          badge="Start Your Local Web Project"
          title="Ready to Build a High-Performance Website in Belagavi?"
          subtitle="Consult directly with our solution architects to scope your requirements, review timeline milestones, and build a secure digital platform."
          primaryBtnText="Request a Project Estimate"
          secondaryBtnText="Explore Portfolio"
          primaryBtnLink="/contact"
          secondaryBtnLink="/portfolio"
        />
      </Suspense>
    </div>
  );
}

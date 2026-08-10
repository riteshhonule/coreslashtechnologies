import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Sparkles, X, CheckCircle2, 
  ShieldCheck, Star, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { OverlappingImageCard } from "@/components/ui/OverlappingImageCard";

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: "Web Platforms" | "Mobile Apps" | "E-Commerce & Shopify" | "SaaS & Systems";
  description: string;
  imageUrl: string;
  metrics: string[];
  techStack: string[];
  challenge: string;
  solution: string;
  results: string[];
  featured?: boolean;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "pitcs",
    title: "PITCS – Global IT Consulting & Workforce Management Platform",
    client: "PITCS Tech Solutions",
    category: "Web Platforms",
    description: "Enterprise talent acquisition & workforce management engine serving Fortune 500 companies with automated candidate matching.",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    metrics: ["250K+ Candidates Managed", "40% Faster Onboarding", "99.9% System Uptime"],
    techStack: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    challenge: "Managing thousands of candidate applications across multiple countries using legacy manual spreadsheets resulted in delayed client hiring timelines and high drop-off rates.",
    solution: "We engineered a modern React & Node.js portal featuring automated candidate screening dashboards, real-time status tracking, and cloud document verification.",
    results: [
      "Reduced candidate onboarding time from 14 days to just 3 days.",
      "Processed 250,000+ active tech profiles with sub-second search speeds.",
      "Improved enterprise recruiter productivity by 65%."
    ],
    featured: true
  },
  {
    id: "skandan",
    title: "Skandan – Executive Business Consulting & Crisis Management",
    client: "Skandan Global Advisory",
    category: "SaaS & Systems",
    description: "Executive decision engine providing business crisis management, real-time risk assessment, and operational advisory dashboards.",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
    metrics: ["3x Operational Efficiency", "100+ Enterprise Clients", "Zero Downtime"],
    techStack: ["React", "TypeScript", "Python", "Chart.js", "Django"],
    challenge: "Corporate executives lacked real-time visibility into cross-department operational risks during economic fluctuations.",
    solution: "CoreSlash built a high-security executive dashboard with interactive financial modeling, threat level indicators, and automated crisis mitigation playbooks.",
    results: [
      "Helped 100+ enterprise clients streamline crisis decision frameworks.",
      "Delivered real-time financial risk modeling with 99.4% prediction accuracy.",
      "Automated executive report generation, saving 20 hours weekly per executive."
    ]
  },
  {
    id: "thedutz",
    title: "The Dutz – Handcrafted Natural Snack D2C E-Commerce Store",
    client: "The Dutz Organics",
    category: "E-Commerce & Shopify",
    description: "High-converting D2C e-commerce experience for organic dates & energy snacks with automated cart upsells and subscriptions.",
    imageUrl: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800&auto=format&fit=crop&q=80",
    metrics: ["180% Revenue Growth", "0.8s Page Speed", "42% Repeat Customers"],
    techStack: ["Shopify OS 2.0", "Liquid", "GraphQL", "Tailwind CSS"],
    challenge: "The client's existing online store was slow on mobile devices, suffered from cart abandonment, and failed to showcase premium organic branding.",
    solution: "We engineered a custom Shopify OS 2.0 theme optimized for mobile-first shopping with sub-second page loads, instant one-click checkout, and date-based subscriptions.",
    results: [
      "Boosted online monthly sales revenue by 180% within 60 days.",
      "Reduced mobile page load time to under 0.8 seconds globally.",
      "Increased repeat customer purchase rate to 42% via automated subscriptions."
    ]
  },
  {
    id: "healthpulse",
    title: "HealthPulse – HIPAA-Compliant Telemedicine & Patient Portal",
    client: "HealthPulse Care Network",
    category: "Mobile Apps",
    description: "Cross-platform mobile telemedicine app featuring HD video consultations, electronic health records, and biometric login.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    metrics: ["50K+ Monthly Consultations", "4.9 App Store Rating", "HIPAA Compliant"],
    techStack: ["Flutter", "Dart", "Firebase", "WebRTC", "Swift"],
    challenge: "Patients faced long wait times for specialist consultations and lacked a secure, encrypted mobile channel for sharing medical records.",
    solution: "We developed a cross-platform Flutter application with end-to-end WebRTC video encryption, automated doctor scheduling, and instant prescription downloads.",
    results: [
      "Connected 50,000+ patients with certified doctors monthly.",
      "Maintained a 4.9/5 user rating on Apple App Store & Google Play.",
      "Achieved 100% HIPAA and ISO 27001 data compliance auditing."
    ]
  },
  {
    id: "flexicart",
    title: "FlexiCart – On-Demand Multi-Vendor Delivery & Marketplace",
    client: "FlexiCart Inc.",
    category: "Mobile Apps",
    description: "On-demand hyper-local grocery & retail delivery platform featuring live driver GPS tracking and instant split payments.",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=80",
    metrics: ["1M+ Orders Shipped", "15 Mins Avg Delivery", "99.9% Uptime"],
    techStack: ["React Native", "Node.js", "Socket.io", "Stripe API", "MongoDB"],
    challenge: "Building a scalable dispatching architecture that could handle thousands of concurrent driver GPS updates during peak hours without server lag.",
    solution: "We engineered a WebSocket-driven microservice backend with automated order routing to the nearest available driver based on real-time traffic data.",
    results: [
      "Successfully processed over 1,000,000 completed delivery orders.",
      "Reduced average city delivery times to under 15 minutes.",
      "Maintained sub-100ms server latency across 10,000 concurrent active users."
    ]
  },
  {
    id: "fintrack",
    title: "FinTrack – AI Financial Management & Corporate Treasury Portal",
    client: "FinTrack Global",
    category: "SaaS & Systems",
    description: "AI-driven corporate expense portal featuring multi-currency accounting, automated invoice extraction, and audit readiness.",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80",
    metrics: ["$12M+ Monthly Volume", "SOC2 Compliant", "95% Auto Categorized"],
    techStack: ["React", "NestJS", "Python AI", "PostgreSQL", "Redis"],
    challenge: "Finance teams spent hundreds of hours manually categorizing receipts, cross-checking bank feeds, and compiling quarterly tax reports.",
    solution: "We integrated an AI OCR pipeline that automatically parses receipt data, extracts tax line items, and reconciles transactions with ERP systems.",
    results: [
      "Automated receipt categorization for 95% of incoming expense items.",
      "Processed $12M+ in monthly corporate transactions securely.",
      "Reduced quarterly financial audit preparation time by 80%."
    ]
  }
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All Projects");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const categories = ["All Projects", "Web Platforms", "Mobile Apps", "E-Commerce & Shopify", "SaaS & Systems"];

  const filteredCases = activeCategory === "All Projects"
    ? CASE_STUDIES
    : CASE_STUDIES.filter(item => item.category === activeCategory);

  const featuredProject = CASE_STUDIES.find(c => c.featured) || CASE_STUDIES[0];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Helmet>
        <title>Our Portfolio & Case Studies | CoreSlash Technologies</title>
        <meta 
          name="description" 
          content="Explore real-world case studies of digital platforms, e-commerce storefronts, SaaS applications, and mobile apps engineered by CoreSlash Technologies." 
        />
        <link rel="canonical" href="https://coreslashtechnologies.com/portfolio" />
      </Helmet>

      {/* 1. Hero Header Section */}
      <section className="relative w-full pt-8 pb-12 md:pt-12 md:pb-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto overflow-hidden">
        <div className="relative z-10 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden">
          
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400 text-xs font-semibold tracking-widest uppercase shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>FEATURED WORK & CASE STUDIES</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              Engineering High-Impact <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">Digital Products</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
              Discover how we partner with ambitious brands, SaaS startups, and global enterprises to build high-performance web applications, e-commerce storefronts, and mobile ecosystems.
            </p>

            {/* Live Stats Bar */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm font-semibold text-slate-300">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>50+ Shipped Solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>99.8% Satisfaction Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>15+ Global Industries</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Featured Showcase Card */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
        <div className="flex flex-col items-start gap-2 mb-6">
          <span className="text-xs font-semibold tracking-widest text-blue-600 dark:text-blue-400 uppercase">FLAGSHIP CASE STUDY</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Featured Project Spotlight</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative rounded-[2.5rem] bg-white dark:bg-slate-900 border border-border/80 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden grid grid-cols-1 lg:grid-cols-12 p-6 sm:p-8 lg:p-10 gap-8 items-center"
        >
          <div className="lg:col-span-6 relative w-full flex justify-center pb-6 sm:pb-8 lg:pb-0">
            <OverlappingImageCard
              primaryImage={featuredProject.imageUrl}
              secondaryImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&auto=format&fit=crop&q=80"
              altText={featuredProject.title}
              badgeText="Featured Case Study"
            />
          </div>

          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-500 uppercase tracking-wider">
                <span>{featuredProject.category}</span>
                <span>•</span>
                <span>{featuredProject.client}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {featuredProject.title}
              </h3>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {featuredProject.description}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-end border-t border-border/40">
              <Button
                onClick={() => setSelectedCase(featuredProject)}
                className="h-11 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Category Filter & Project Grid */}
      <section className="w-full py-16 border-t border-border/40 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Explore Shipped Client Solutions</h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md font-semibold"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredCases.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 border border-border/80 shadow-md hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 p-6 overflow-hidden"
              >
                {/* Top Image Box */}
                <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6 bg-slate-950 border border-border/40">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-md bg-slate-900/90 text-white text-[11px] font-semibold uppercase tracking-wider border border-white/10 backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Trigger button */}
                  <div className="pt-4 border-t border-border/40 mt-auto">
                    <Button
                      onClick={() => setSelectedCase(item)}
                      variant="outline"
                      className="w-full h-11 text-xs font-semibold border-border hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Explore Case Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[3rem] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-10 md:p-16 text-center text-white relative overflow-hidden border border-slate-800 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Have a Visionary Project in Mind?</h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              Let's engineer a high-performance web platform, mobile application, or enterprise solution tailored to your business goals.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-base hover:from-blue-700 hover:to-indigo-700 transition-all shadow-xl hover:shadow-2xl hover:shadow-blue-500/30">
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 6. Case Study Detail Modal Drawer */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-border/80 rounded-3xl p-6 sm:p-10 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCase(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-md bg-blue-600/10 text-blue-600 text-xs font-semibold uppercase tracking-wider">
                    {selectedCase.category} • {selectedCase.client}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight pt-2">
                    {selectedCase.title}
                  </h2>
                </div>

                {/* Hero Image */}
                <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-border/40">
                  <img src={selectedCase.imageUrl} alt={selectedCase.title} className="w-full h-full object-cover" />
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {selectedCase.metrics.map(m => (
                    <div key={m} className="p-4 rounded-xl bg-muted/60 border border-border/50 text-center">
                      <span className="text-sm font-black text-foreground block">{m}</span>
                    </div>
                  ))}
                </div>

                {/* Challenge & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/40">
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> The Challenge
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      {selectedCase.challenge}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600" /> Engineered Solution
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      {selectedCase.solution}
                    </p>
                  </div>
                </div>

                {/* Results Bullet Points */}
                <div className="space-y-3 pt-4 border-t border-border/40">
                  <h3 className="text-lg font-bold text-foreground">Proven Impact & Business Results</h3>
                  <div className="space-y-2">
                    {selectedCase.results.map((res, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCase.techStack.map(t => (
                      <span key={t} className="text-xs font-bold px-2.5 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    onClick={() => setSelectedCase(null)}
                    className="w-full sm:w-auto h-11 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <span>Discuss Similar Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

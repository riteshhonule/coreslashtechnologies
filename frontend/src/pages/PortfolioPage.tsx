import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  SparklesIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import { 
  Check, 
  Clock, 
  TrendingUp, 
  Layers, 
  Briefcase, 
  ExternalLink,
  Lock,
  Quote
} from "lucide-react";
import SEO from "../components/SEO";

import imgLogistics from "../img/project/AI Logistics Management Platform.webp";
import imgHospital from "../img/project/Smart Hospital Management System.webp";
import imgFinTech from "../img/project/FinTech Banking Dashboard.webp";
import imgCRM from "../img/project/AI CRM & Sales Automation.webp";
import imgEcommerce from "../img/project/E-Commerce Multi-Vendor Platform.webp";

const items = [
  {
    id: 1,
    title: "AI Logistics Management Platform",
    category: "Supply Chain & Transport",
    clientIndustry: "Global Supply Chain Logistics (US)",
    timeline: "6 Months",
    img: imgLogistics,
    description: "An enterprise logistics ecosystem with route optimization, fleet tracking, live delivery monitoring, and warehouse automation.",
    link: "#",
    overview: "We architected an enterprise logistics ecosystem utilizing custom machine learning models to maximize supply chain efficiency and automate dispatch routing.",
    challenge: "Inefficient fleet routes, high fuel costs, and lack of real-time monitoring of multi-state delivery assets, causing order processing latency.",
    solution: "Built a Python-based path-finding optimization engine integrated with React frontends, scheduling deliveries dynamically and balancing loads.",
    technologies: ["React", "Python FastAPI", "TensorFlow", "PostgreSQL", "Docker", "AWS"],
    featuresDelivered: [
      "Dynamic Route Planning Engine",
      "Real-time GPS Fleet Tracker Integration",
      "Warehouse Loading Queue Optimizer",
      "Automated Order Billing Webhooks"
    ],
    results: "23% reduction in delivery times and 15% reduction in fuel consumption within 6 months.",
    businessImpact: "Helped the agency's client expand active daily routes by 45% and reduced dispatcher administrative overhead by 30%.",
    keyMetrics: [
      { label: "Delivery Time", value: "-23%" },
      { label: "Fuel Expenses", value: "-15%" },
      { label: "SLA Deliveries", value: "99.8%" }
    ],
    testimonial: {
      quote: "The CoreSlash engineering squad delivered the core route algorithms on schedule. Our clients love the dynamic dashboard.",
      author: "Robert Kowalski",
      role: "VP of Product",
      company: "FleetFlow Inc."
    }
  },
  {
    id: 2,
    title: "Smart Hospital Management System",
    category: "Healthcare Technology",
    clientIndustry: "Clinical Healthcare Networks",
    timeline: "5 Months",
    img: imgHospital,
    description: "A complete digital healthcare suite with patient management, appointment scheduling, billing, EHR, and AI-powered diagnostics.",
    link: "#",
    overview: "Engineered a secure, HIPAA-compliant patient management and diagnostics platform for multi-specialty hospital networks.",
    challenge: "Manual paper records, slow billing cycles, and high scheduling friction for doctors, resulting in patient drop-offs.",
    solution: "Designed microservice database structures for EHR tables, integrated automated appointment triggers, and built a billing gateway.",
    technologies: ["React", "NodeJS", "NestJS", "PostgreSQL", "HIPAA Compliance", "Kubernetes"],
    featuresDelivered: [
      "HIPAA-compliant EHR database rows",
      "Real-time Doctor Consultation Scheduler",
      "Automated Insurance Verification Pipeline",
      "Secure Patient Billing Portal"
    ],
    results: "99.9% uptime, 40% reduction in billing cycle latencies, and 30,000+ patient records processed securely.",
    businessImpact: "Allowed the partner agency to secure a long-term enterprise development contract and improved clinic patient throughput by 25%.",
    keyMetrics: [
      { label: "Billing Latency", value: "-40%" },
      { label: "System Uptime", value: "99.9%" },
      { label: "Active EHRs", value: "30K+" }
    ],
    testimonial: {
      quote: "Absolute professionals. Their knowledge of healthcare compliance and secure database design is top tier.",
      author: "Dr. Linda Sterling",
      role: "Chief Medical Officer",
      company: "CareAxis Network"
    }
  },
  {
    id: 3,
    title: "FinTech Banking Dashboard",
    category: "Financial Technology",
    clientIndustry: "Commercial Financial Services",
    timeline: "7 Months",
    img: imgFinTech,
    description: "A secure banking and analytics platform with real-time transactions, fraud detection, investment insights, and compliance monitoring.",
    link: "#",
    overview: "Built a high-security banking dashboard with real-time transactions processing and anomaly detection.",
    challenge: "Scalability issues under high query concurrency, and latency during transaction fraud checks.",
    solution: "Optimized PostgreSQL indexes, implemented connection pools, and built an event-driven Go microservices handler.",
    technologies: ["React", "Go", "PostgreSQL", "Kafka", "AWS Lambda", "PCI-DSS"],
    featuresDelivered: [
      "Real-time transaction stream handler",
      "AI Anomaly Fraud Detection Engine",
      "Compliance audit log visualizer",
      "Dynamic portfolio analytics widgets"
    ],
    results: "Sub-100ms transaction checks, zero fraud escapes, and seamless handling of 10k concurrent users.",
    businessImpact: "Helped the agency client clear PCI-DSS security compliance audits on the first attempt.",
    keyMetrics: [
      { label: "Fraud Check Speed", value: "<100ms" },
      { label: "Concurrent Users", value: "10K+" },
      { label: "Compliance Score", value: "100%" }
    ],
    testimonial: {
      quote: "The security procedures and code documentation provided by the CoreSlash team were stellar.",
      author: "David Vance",
      role: "VP of Security",
      company: "CapitalTrust"
    }
  },
  {
    id: 4,
    title: "AI CRM & Sales Automation",
    category: "Business Automation",
    clientIndustry: "Enterprise SaaS Agencies",
    timeline: "4 Months",
    img: imgCRM,
    description: "An intelligent CRM platform designed for lead management, automated workflows, customer analytics, and sales forecasting.",
    link: "#",
    overview: "Architected a CRM platform integrating automated workflows and predictive sales forecasting models.",
    challenge: "Siloed customer databases and lack of visibility on future sales conversion timelines.",
    solution: "Integrated local LLM engines for automated lead scoring and structured dashboard visualizations.",
    technologies: ["React", "Python Django", "MongoDB", "OpenAI API", "Redis"],
    featuresDelivered: [
      "AI Automated Lead Grading model",
      "Sales Conversion Forecasting Graph",
      "Multi-channel message inbox",
      "Automated follow-up scheduling"
    ],
    results: "35% increase in sales conversion rates and automated 10,500 monthly lead emails.",
    businessImpact: "Agency client reduced sales cycle length by 18 days and automated all repetitive intake scripting.",
    keyMetrics: [
      { label: "Conversions", value: "+35%" },
      { label: "Auto Emails", value: "10K+/mo" },
      { label: "Sales Cycle", value: "-18 Days" }
    ],
    testimonial: {
      quote: "The CRM automation is excellent. It saved our sales team hundreds of hours of manual logging.",
      author: "Elena Rostova",
      role: "Director of Business Growth",
      company: "SaaSGen Systems"
    }
  },
  {
    id: 5,
    title: "E-Commerce Multi-Vendor Platform",
    category: "Retail Technology",
    clientIndustry: "B2B Marketplace Retail",
    timeline: "5 Months",
    img: imgEcommerce,
    description: "A scalable marketplace platform supporting multi-vendor operations, payment gateways, inventory tracking, and analytics.",
    link: "#",
    overview: "Designed a multi-vendor digital storefront with localized database schemas and fast transaction checkouts.",
    challenge: "High checkout abandonment rate due to slow page speeds and payment processing latency.",
    solution: "Configured Cloudflare CDN rules, optimized next-gen asset pipelines, and implemented Stripe API gateways.",
    technologies: ["React", "NestJS", "PostgreSQL", "Redis", "Stripe API", "CloudflareEdge"],
    featuresDelivered: [
      "Multi-vendor dashboard panel",
      "Stripe Connect split payment gateway",
      "Real-time Inventory Sync queue",
      "Sub-second checkout pipeline"
    ],
    results: "50% increase in checkout speed and 18% reduction in basket abandonment rates.",
    businessImpact: "Client experienced a direct 22% increase in mobile purchase conversions due to faster rendering.",
    keyMetrics: [
      { label: "Checkout Speed", value: "+50%" },
      { label: "Abandonment", value: "-18%" },
      { label: "Conversions", value: "+22%" }
    ],
    testimonial: {
      quote: "CoreSlash's optimization of the payment flows cut checkout drop-offs significantly.",
      author: "Marcus Aurelius",
      role: "CEO & Co-founder",
      company: "MarketHub Ltd"
    }
  }
];

export default function PortfolioPage() {
  const [active, setActive] = useState<typeof items[0] | null>(null);

  return (
    <div className="bg-[#F9FAFB] min-h-screen pt-0 overflow-hidden relative">
      <SEO
        title="Agency Case Studies & Portfolio | CoreSlash Technologies"
        description="Explore our white-label software engineering case studies. Delivering custom software, web platforms, and AI automation for global digital agencies."
      />
      {/* GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-purple/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-indigo/2 rounded-full blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative py-16 md:py-32 w-full">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 1, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-8"
          >
            <SparklesIcon className="w-4 h-4 text-secondary-indigo" />
            <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.3em]">
              The Delivery Ledger
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-5xl md:text-8xl font-black text-gray-900 mb-10 leading-[1.1] tracking-tight"
          >
            Our Case <span className="text-gradient-purple">Studies</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="text-gray-500 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Explore real-world software engineering solutions delivered behind the scenes for digital agencies and enterprise partners.
          </motion.p>
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section className="py-12 md:py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
            {items.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0, margin: "200px" }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="group relative"
                onClick={() => setActive(p)}
              >
                <div className="glass-card h-full rounded-[2.5rem] overflow-hidden border border-gray-200 bg-white cursor-pointer hover:border-secondary-indigo/20 transition-all duration-500 shadow-md">
                  <div className="aspect-[16/10] overflow-hidden relative bg-gray-50 flex items-center justify-center p-4">
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      className="max-w-full max-h-full object-contain rounded-2xl group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-gray-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1">
                      <Lock className="w-3 h-3 text-secondary-indigo" />
                      <span>NDA Protected</span>
                    </div>
                  </div>

                  <div className="p-8 relative">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-indigo" />
                      <span className="text-secondary-indigo text-[10px] font-bold uppercase tracking-[0.2em]">
                        {p.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-secondary-indigo transition-colors duration-300">{p.title}</h3>
                    <p className="text-xs text-gray-500 font-semibold leading-relaxed line-clamp-2">{p.description}</p>
                    
                    <div className="flex items-center gap-3 text-secondary-indigo text-xs font-bold tracking-widest uppercase mt-6 opacity-80 group-hover:opacity-100 transition-all">
                      Read Case Study <ArrowRightIcon className="w-4 h-4 text-secondary-indigo" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILED CASE STUDY MODAL */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4 md:p-6 bg-gray-950/40 backdrop-blur-xl"
            style={{ zIndex: 2000 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-6xl w-full max-h-[85vh] overflow-hidden rounded-[3rem] border border-gray-200 flex flex-col relative shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActive(null)}
                className="absolute top-5 right-5 z-[2010] bg-gray-150 hover:bg-gray-200 text-gray-700 w-10 h-10 rounded-full transition flex items-center justify-center border border-gray-200"
                aria-label="Close details"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>

              <div className="flex flex-col lg:flex-row overflow-y-auto h-full">
                {/* Visual / Image Column */}
                <div className="w-full lg:w-[45%] bg-gray-50 flex flex-col justify-between p-8 md:p-10 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200">
                  <div className="flex items-center justify-center flex-1 min-h-[220px] lg:min-h-0 mb-8">
                    <img src={active.img} className="max-w-full max-h-[280px] object-contain rounded-2xl shadow-lg" alt={active.title} />
                  </div>
                  
                  {/* Screenshots Placeholder Mockup */}
                  <div className="bg-white border border-gray-200/60 p-5 rounded-2xl shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-secondary-indigo" />
                        Screenshots & Code sanitized
                      </span>
                      <span className="text-[9px] font-bold text-gray-400">NDA PROTECTED</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-10 bg-gray-50 rounded border border-dashed border-gray-200 flex items-center justify-center text-[9px] text-gray-400 font-bold">API.md</div>
                      <div className="h-10 bg-gray-50 rounded border border-dashed border-gray-200 flex items-center justify-center text-[9px] text-gray-400 font-bold">Schema.json</div>
                      <div className="h-10 bg-gray-50 rounded border border-dashed border-gray-200 flex items-center justify-center text-[9px] text-gray-400 font-bold">Main.tsx</div>
                    </div>
                  </div>
                </div>

                {/* Content Details Column */}
                <div className="w-full lg:w-[55%] p-8 md:p-12 overflow-y-auto space-y-8 max-h-[60vh] lg:max-h-[85vh]">
                  
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-secondary-indigo font-bold text-[10px] tracking-[0.25em] uppercase">{active.category}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{active.clientIndustry}</span>
                    </div>

                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">{active.title}</h2>
                  </div>

                  {/* Metadata block */}
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-200/50">
                    <div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Timeline</span>
                      <span className="text-sm font-bold text-gray-900 flex items-center gap-1.5 mt-1">
                        <Clock className="w-4 h-4 text-secondary-indigo" />
                        {active.timeline}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Targeting</span>
                      <span className="text-sm font-bold text-gray-900 flex items-center gap-1.5 mt-1">
                        <Briefcase className="w-4 h-4 text-secondary-indigo" />
                        White-label delivery
                      </span>
                    </div>
                  </div>

                  {/* Key Metrics block */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-950 text-xs uppercase tracking-wider">Key Project Metrics</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {active.keyMetrics.map((metric, mIdx) => (
                        <div key={mIdx} className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl text-center">
                          <span className="text-xl font-extrabold text-emerald-700 block">{metric.value}</span>
                          <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider mt-1 block">{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fleshed out study sections */}
                  <div className="space-y-6 text-sm text-gray-600 leading-relaxed font-semibold">
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-950 text-xs uppercase tracking-wider">Project Overview</h4>
                      <p className="text-xs">{active.overview}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-950 text-xs uppercase tracking-wider">The Challenge</h4>
                      <p className="text-xs">{active.challenge}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-950 text-xs uppercase tracking-wider">Our Solution</h4>
                      <p className="text-xs">{active.solution}</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-bold text-gray-950 text-xs uppercase tracking-wider">Features Delivered</h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {active.featuresDelivered.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 bg-[#F9FAFB] p-3 rounded-lg border border-gray-150 text-xs font-bold text-gray-800">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-950 text-xs uppercase tracking-wider">Business Impact</h4>
                      <p className="text-xs">{active.businessImpact}</p>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-950 text-xs uppercase tracking-wider">Technology Stack Used</h4>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {active.technologies.map((tech) => (
                          <span key={tech} className="bg-gray-100 border border-gray-200 text-gray-850 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">{tech}</span>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial block */}
                    {active.testimonial && (
                      <div className="bg-secondary-indigo/5 p-6 rounded-2xl border-l-4 border-secondary-indigo relative overflow-hidden space-y-4">
                        <Quote className="w-10 h-10 text-secondary-indigo/10 absolute -right-2 -bottom-2" />
                        <p className="italic text-gray-600 text-xs leading-relaxed font-semibold">
                          "{active.testimonial.quote}"
                        </p>
                        <div>
                          <h5 className="font-bold text-gray-900 text-xs">{active.testimonial.author}</h5>
                          <p className="text-[10px] text-gray-400 font-semibold">{active.testimonial.role}, {active.testimonial.company}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

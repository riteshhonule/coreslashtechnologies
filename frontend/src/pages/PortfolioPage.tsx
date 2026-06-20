import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

import imgLogistics from "../img/project/AI Logistics Management Platform.png";
import imgHospital from "../img/project/Smart Hospital Management System.png";
import imgFinTech from "../img/project/FinTech Banking Dashboard.png";
import imgCRM from "../img/project/AI CRM & Sales Automation.png";
import imgEcommerce from "../img/project/E-Commerce Multi-Vendor Platform.png";
import imgRealEstate from "../img/project/Real Estate Property Management.png";
import imgLMS from "../img/project/AI Learning Management System.png";
import imgCyberSecurity from "../img/project/cloud.png";
import imgManufacturing from "../img/project/Smart Manufacturing ERP.png";
import imgHR from "../img/project/AI Recruitment & HR Platform.png";

const items = [
  {
    id: 1,
    title: "AI Logistics Management Platform",
    category: "Supply Chain & Transport",
    img: imgLogistics,
    description: "An enterprise logistics ecosystem with route optimization, fleet tracking, live delivery monitoring, and warehouse automation.",
    link: "#",
  },
  {
    id: 2,
    title: "Smart Hospital Management System",
    category: "Healthcare Technology",
    img: imgHospital,
    description: "A complete digital healthcare suite with patient management, appointment scheduling, billing, EHR, and AI-powered diagnostics.",
    link: "#",
  },
  {
    id: 3,
    title: "FinTech Banking Dashboard",
    category: "Financial Technology",
    img: imgFinTech,
    description: "A secure banking and analytics platform with real-time transactions, fraud detection, investment insights, and compliance monitoring.",
    link: "#",
  },
  {
    id: 4,
    title: "AI CRM & Sales Automation",
    category: "Business Automation",
    img: imgCRM,
    description: "An intelligent CRM platform designed for lead management, automated workflows, customer analytics, and sales forecasting.",
    link: "#",
  },
  {
    id: 5,
    title: "E-Commerce Multi-Vendor Platform",
    category: "Retail Technology",
    img: imgEcommerce,
    description: "A scalable marketplace platform supporting multi-vendor operations, payment gateways, inventory tracking, and analytics.",
    link: "#",
  },
  {
    id: 6,
    title: "Real Estate Property Management",
    category: "Real Estate Solutions",
    img: imgRealEstate,
    description: "A digital property ecosystem enabling virtual tours, property listings, CRM integration, and automated lead management.",
    link: "#",
  },
  {
    id: 7,
    title: "AI Learning Management System",
    category: "EdTech Platform",
    img: imgLMS,
    description: "A modern LMS platform with adaptive learning, live classes, AI-based assessments, and student performance analytics.",
    link: "#",
  },
  {
    id: 8,
    title: "Cloud-Based Cybersecurity Suite",
    category: "Cybersecurity",
    img: imgCyberSecurity,
    description: "A cloud-native security monitoring platform featuring threat detection, access control, vulnerability scanning, and incident response.",
    link: "#",
  },
  {
    id: 9,
    title: "Smart Manufacturing ERP",
    category: "Industrial IoT & ERP",
    img: imgManufacturing,
    description: "A next-generation ERP system designed for manufacturing, featuring predictive maintenance, resource planning, and IoT integration.",
    link: "#",
  },
  {
    id: 10,
    title: "AI Recruitment & HR Platform",
    category: "Human Resources",
    img: imgHR,
    description: "An AI-driven HR suite streamlining talent acquisition, resume parsing, employee onboarding, and performance tracking.",
    link: "#",
  }
];

const PortfolioPage = () => {
  const [active, setActive] = useState<typeof items[0] | null>(null);

  return (
    <div className="bg-dark-black min-h-screen pt-0 overflow-hidden relative">
      {/* GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-purple/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative py-12 md:py-32 w-full">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 1, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <SparklesIcon className="w-4 h-4 text-accent-cyan" />
            <span className="text-xs font-bold text-accent-cyan uppercase tracking-[0.3em]">
              The Achievement Matrix
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-5xl md:text-8xl font-bold text-white mb-10 leading-[1.1] tracking-tight"
          >
            Digital <span className="text-gradient-purple">Proof</span> of Concept.
          </motion.h1>

          <motion.p
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="text-white/40 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
          >
            Showcasing a lineage of high-impact engineering and disruptive design.
            We build the systems that build the future.
          </motion.p>
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section className="py-12 md:py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
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
                <div className="glass-card h-full rounded-[3rem] overflow-hidden border-white/5 cursor-pointer hover:border-accent-cyan/20 transition-all duration-700">
                  <div className="aspect-[16/10] overflow-hidden transition-all duration-1000 relative">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[600ms]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-dark-black/40 to-transparent opacity-80" />
                  </div>

                  <div className="p-10 relative">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                      <span className="text-accent-cyan text-[10px] font-bold uppercase tracking-[0.2em]">
                        {p.category}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-accent-cyan transition-colors duration-500">{p.title}</h3>

                    <div className="flex items-center gap-3 text-white/40 text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                      DECRYPT CASE STUDY <ArrowRightIcon className="w-4 h-4 text-accent-cyan" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL REDESIGN */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4 md:p-6 bg-dark-black/95 backdrop-blur-xl"
            style={{ zIndex: 1100 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 1, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-4xl w-[85vw] md:w-full h-[75vh] md:h-auto overflow-hidden rounded-3xl md:rounded-[4rem] border-white/10 flex flex-col md:flex-row relative"
            >
              {/* Close Button - positioned cleanly to avoid rounded corner clipping */}
              <button
                onClick={() => setActive(null)}
                className="absolute top-5 right-5 md:top-8 md:right-8 z-[1110] bg-dark-black/60 hover:bg-dark-black/80 text-white w-10 h-10 rounded-full backdrop-blur-md transition flex items-center justify-center border border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                aria-label="Close details"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>

              {/* Image Column - occupies 35% height on mobile */}
              <div className="w-full md:w-1/2 relative h-[35%] md:h-auto overflow-hidden shrink-0">
                <img src={active.img} className="w-full h-full object-cover" alt={active.title} />
                <div className="absolute inset-0 bg-gradient-to-r from-dark-black/60 to-transparent md:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-black/60 to-transparent md:hidden block" />
              </div>

              {/* Content Column - occupies 65% height on mobile and spreads top-to-bottom */}
              <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 flex flex-col justify-between h-[65%] md:h-auto overflow-y-auto">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                    <span className="text-accent-cyan font-bold text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase">{active.category}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">{active.title}</h2>

                  <p className="text-white/50 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-medium italic">
                    "{active.description}"
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:items-center">
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`btn-pill text-xs md:text-sm lg:text-base px-5 py-3 flex items-center justify-center gap-2 ${active.link === "#"
                      ? "bg-white/5 text-white/20 cursor-not-allowed border-white/5"
                      : "btn-primary-glow text-white"
                      }`}
                    onClick={(e) => active.link === "#" && e.preventDefault()}
                  >
                    {active.link === "#" ? "Project Offline" : "View Project"}
                    {active.link !== "#" && <ArrowTopRightOnSquareIcon className="w-4 h-4" />}
                  </a>

                  <button
                    onClick={() => setActive(null)}
                    className="btn-pill btn-glass text-white text-xs md:text-sm lg:text-base px-5 py-3"
                  >
                    Back to Matrix
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioPage;


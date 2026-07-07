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
    <div className="bg-[#F9FAFB] min-h-screen pt-0 overflow-hidden relative">
      {/* GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-purple/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-indigo/2 rounded-full blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative py-12 md:py-32 w-full">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 1, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-8"
          >
            <SparklesIcon className="w-4 h-4 text-secondary-indigo" />
            <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.3em]">
              The Achievement Matrix
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-5xl md:text-8xl font-bold text-gray-900 mb-10 leading-[1.1] tracking-tight"
          >
            Digital <span className="text-gradient-purple">Proof</span> of Concept.
          </motion.h1>

          <motion.p
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="text-gray-500 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
          >
            Showcasing a lineage of high-impact engineering and disruptive design.
            We build the systems that build the future.
          </motion.p>
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section className="py-12 md:py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-12 max-w-7xl mx-auto">
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
                <div className="glass-card h-full rounded-[3rem] overflow-hidden border border-gray-200/50 bg-white cursor-pointer hover:border-secondary-indigo/20 transition-all duration-700 shadow-md shadow-gray-200/30">
                  <div className="aspect-[16/10] overflow-hidden transition-all duration-1000 relative bg-gray-50 flex items-center justify-center p-4">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="max-w-full max-h-full object-contain rounded-2xl group-hover:scale-105 transition-transform duration-[600ms]"
                    />
                  </div>

                  <div className="p-10 relative">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-indigo" />
                      <span className="text-secondary-indigo text-[10px] font-bold uppercase tracking-[0.2em]">
                        {p.category}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-secondary-indigo transition-colors duration-500">{p.title}</h3>

                    <div className="flex items-center gap-3 text-gray-500 text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                      DECRYPT CASE STUDY <ArrowRightIcon className="w-4 h-4 text-secondary-indigo" />
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4 md:p-6 bg-gray-900/40 backdrop-blur-xl"
            style={{ zIndex: 2000 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-6xl w-[90vw] md:w-full max-h-[85vh] md:max-h-none overflow-hidden rounded-3xl md:rounded-[4rem] border border-gray-200 flex flex-col relative shadow-2xl"
            >
              {/* Close Button - positioned cleanly to avoid rounded corner clipping */}
              <button
                onClick={() => setActive(null)}
                className="absolute top-5 right-5 md:top-8 md:right-8 z-[2010] bg-gray-100 hover:bg-gray-200 text-gray-700 w-10 h-10 rounded-full backdrop-blur-md transition flex items-center justify-center border border-gray-200 shadow-sm"
                aria-label="Close details"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
 
              {/* Inner columns wrapper: scrollable on mobile, regular on desktop */}
              <div className="flex flex-col md:flex-row overflow-y-auto md:overflow-hidden h-full">
                {/* Image Column */}
                <div className="w-full md:w-1/2 relative bg-gray-50 flex items-center justify-center p-6 md:p-8 min-h-[250px] md:min-h-[450px] shrink-0">
                  <img src={active.img} className="max-w-full max-h-full object-contain rounded-2xl shadow-xl" alt={active.title} />
                </div>
 
                {/* Content Column */}
                <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 flex flex-col justify-between md:h-auto">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-indigo animate-pulse" />
                      <span className="text-secondary-indigo font-bold text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase">{active.category}</span>
                    </div>
 
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">{active.title}</h2>
 
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-medium italic">
                      "{active.description}"
                    </p>
                  </div>
 
                  <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:items-center">
                    <a
                      href={active.link}
                      target="_blank"
                      rel="noreferrer"
                      className={`btn-pill text-xs md:text-sm lg:text-base px-5 py-3 flex items-center justify-center gap-2 ${active.link === "#"
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                        : "btn-primary-glow text-white"
                        }`}
                      onClick={(e) => active.link === "#" && e.preventDefault()}
                    >
                      {active.link === "#" ? "Project Offline" : "View Project"}
                      {active.link !== "#" && <ArrowTopRightOnSquareIcon className="w-4 h-4" />}
                    </a>
                  </div>
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


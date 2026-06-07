import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

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

export default function Portfolio() {
  const [active, setActive] = useState<typeof items[0] | null>(null);

  return (
    <section id="portfolio" className="relative py-32 overflow-hidden bg-dark-black">

      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary-purple/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <span className="text-xs font-bold text-accent-cyan uppercase tracking-[0.2em]">
              Selected Works
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Case Studies of <span className="text-gradient-cyan text-gradient-cyan">Success</span>
          </h2>
          <p className="text-white/40 text-xl leading-relaxed">
            Explore how we've helped businesses transform their operations through
            custom software and intelligent automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {items.slice(0, 2).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group cursor-pointer relative"
              onClick={() => setActive(project)}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[3rem] border border-white/10 glass-card">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-dark-black/40 to-transparent opacity-90" />

                <div className="absolute bottom-0 left-0 p-10 md:p-12 w-full">
                  <p className="text-accent-cyan text-xs font-bold uppercase tracking-[0.3em] mb-4">
                    {project.category}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 group-hover:text-accent-cyan transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-3 text-white/40 text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                    View Case Study <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <Link to="/portfolio" className="btn-pill btn-glass text-white px-12 inline-block">
            Browse Full Portfolio
          </Link>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-dark-black/95 backdrop-blur-xl"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              className="bg-dark-black/90 border border-white/10 rounded-[4rem] max-w-5xl w-full overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-square lg:aspect-auto">
                  <img src={active.img} alt={active.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-dark-black/50 to-transparent lg:hidden" />
                </div>

                <div className="p-12 md:p-16 flex flex-col justify-center relative">
                  <button
                    onClick={() => setActive(null)}
                    className="absolute top-8 right-8 p-3 rounded-full bg-white/5 text-white hover:bg-accent-cyan hover:text-dark-black transition-all"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>

                  <p className="text-accent-cyan font-bold uppercase tracking-[0.3em] text-xs mb-6">
                    {active.category}
                  </p>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                    {active.title}
                  </h3>
                  <p className="text-white/50 text-xl leading-relaxed mb-12">
                    {active.description}
                  </p>

                  <div className="flex flex-wrap gap-6">
                    {active.link !== "#" && (
                      <a
                        href={active.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-pill btn-primary-glow text-white px-10 flex items-center gap-3"
                      >
                        Live Preview <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                      </a>
                    )}
                    <button
                      onClick={() => setActive(null)}
                      className="btn-pill btn-glass text-white px-10"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


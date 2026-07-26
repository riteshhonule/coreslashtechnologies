import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import imgLogistics from "../img/project/AI Logistics Management Platform.webp";
import imgHospital from "../img/project/Smart Hospital Management System.webp";
import imgFinTech from "../img/project/FinTech Banking Dashboard.webp";
import imgCRM from "../img/project/AI CRM & Sales Automation.webp";
import imgEcommerce from "../img/project/E-Commerce Multi-Vendor Platform.webp";
import imgRealEstate from "../img/project/Real Estate Property Management.webp";
import imgLMS from "../img/project/AI Learning Management System.webp";
import imgCyberSecurity from "../img/project/cloud.webp";
import imgManufacturing from "../img/project/Smart Manufacturing ERP.webp";
import imgHR from "../img/project/AI Recruitment & HR Platform.webp";

const items = [
  {
    id: 1,
    title: "AI Logistics Management Platform",
    category: "Supply Chain & Transport",
    img: imgLogistics,
    description: "An enterprise logistics ecosystem with route optimization, fleet tracking, live delivery monitoring, and warehouse automation.",
    link: "#",
    overview: "We architected an enterprise logistics ecosystem utilizing custom machine learning models to maximize supply chain efficiency.",
    challenge: "Inefficient fleet routes, high fuel costs, and lack of real-time monitoring of multi-state delivery assets.",
    solution: "Built a Python-based path-finding optimization engine integrated with React frontends, scheduling deliveries dynamically.",
    technologies: ["React", "Python FastAPI", "TensorFlow", "PostgreSQL", "Docker", "AWS"],
    results: "23% reduction in delivery times and 15% reduction in fuel consumption within 6 months."
  },
  {
    id: 2,
    title: "Smart Hospital Management System",
    category: "Healthcare Technology",
    img: imgHospital,
    description: "A complete digital healthcare suite with patient management, appointment scheduling, billing, EHR, and AI-powered diagnostics.",
    link: "#",
    overview: "Engineered a secure, HIPAA-compliant patient management and diagnostics platform for multi-specialty hospital networks.",
    challenge: "Manual paper records, slow billing cycles, and high scheduling friction for doctors and patients.",
    solution: "Designed microservice database structures for EHR tables, integrated automated appointment triggers, and built a billing gateway.",
    technologies: ["Angular", "Spring Boot", "MySQL", "Redis Cache", "HIPAA Compliance", "Kubernetes"],
    results: "99.9% uptime, 40% reduction in billing cycle latencies, and 30,000+ patient records processed securely."
  },
  {
    id: 3,
    title: "FinTech Banking Dashboard",
    category: "Financial Technology",
    img: imgFinTech,
    description: "A secure banking and analytics platform with real-time transactions, fraud detection, investment insights, and compliance monitoring.",
    link: "#",
    overview: "Built a high-security banking dashboard with real-time transactions processing and anomaly detection.",
    challenge: "Scalability issues under high query concurrency, and latency during transaction fraud checks.",
    solution: "Optimized PostgreSQL indexes, implemented connection pools, and built an event-driven Go microservices handler.",
    technologies: ["React Native", "Go", "PostgreSQL", "Kafka", "AWS Lambda", "PCI-DSS"],
    results: "Sub-100ms transaction checks, zero fraud escapes, and seamless handling of 10k concurrent users."
  },
  {
    id: 4,
    title: "AI CRM & Sales Automation",
    category: "Business Automation",
    img: imgCRM,
    description: "An intelligent CRM platform designed for lead management, automated workflows, customer analytics, and sales forecasting.",
    link: "#",
    overview: "Architected a CRM platform integrating automated workflows and predictive sales forecasting models.",
    challenge: "Siloed customer databases and lack of visibility on future sales conversion timelines.",
    solution: "Integrated local LLM engines for automated lead scoring and structured dashboard visualizations.",
    technologies: ["Vue.js", "Python Django", "MongoDB", "OpenAI API", "HuggingFace"],
    results: "35% increase in sales conversion rates and automated 10,500 monthly lead emails."
  },
  {
    id: 5,
    title: "E-Commerce Multi-Vendor Platform",
    category: "Retail Technology",
    img: imgEcommerce,
    description: "A scalable marketplace platform supporting multi-vendor operations, payment gateways, inventory tracking, and analytics.",
    link: "#",
    overview: "Designed a multi-vendor digital storefront with localized database schemas and fast transaction checkouts.",
    challenge: "High checkout abandonment rate due to slow page speeds and payment processing latency.",
    solution: "Configured Cloudflare CDN rules, optimized next-gen asset pipelines, and implemented Stripe API gateways.",
    technologies: ["React", "NestJS", "PostgreSQL", "Redis", "Stripe API", "Cloudflare Edge"],
    results: "50% increase in checkout speed and 18% reduction in basket abandonment rates."
  },
  {
    id: 6,
    title: "Real Estate Property Management",
    category: "Real Estate Solutions",
    img: imgRealEstate,
    description: "A digital property ecosystem enabling virtual tours, property listings, CRM integration, and automated lead management.",
    link: "#",
    overview: "Built a unified property ecosystem enabling custom virtual tours and automatic tenant scheduling.",
    challenge: "Fragmented systems for listing, scheduling, and invoicing, leading to high administrative friction.",
    solution: "Constructed API webhooks connecting scheduling engines with billing databases and virtual mapping systems.",
    technologies: ["React", "Node.js", "GraphQL", "MySQL", "AWS S3", "Twilio API"],
    results: "Managed 5,000+ rental properties and reduced scheduling friction by 60%."
  },
  {
    id: 7,
    title: "AI Learning Management System",
    category: "EdTech Platform",
    img: imgLMS,
    description: "A modern LMS platform with adaptive learning, live classes, AI-based assessments, and student performance analytics.",
    link: "#",
    overview: "Developed an adaptive online learning portal with live video integrations and automated performance diagnostics.",
    challenge: "High student drop-out rates in standard online programs due to lack of adaptive curriculum logic.",
    solution: "Built a custom recommendation engine matching learning modules to student diagnostic scores.",
    technologies: ["Next.js", "Python FastAPI", "PostgreSQL", "WebRTC", "Docker"],
    results: "92% course completion rates and automated grading for 100,000+ practice tests."
  },
  {
    id: 8,
    title: "Cloud-Based Cybersecurity Suite",
    category: "Cybersecurity",
    img: imgCyberSecurity,
    description: "A cloud-native security monitoring platform featuring threat detection, access control, vulnerability scanning, and incident response.",
    link: "#",
    overview: "Created a cloud security dashboard highlighting system vulnerability scores and threat indicators.",
    challenge: "Difficulty in tracing un-sanitized form inputs and query errors across distributed client systems.",
    solution: "Configured automated static code checking, encrypted database rows, and centralized cloud logs.",
    technologies: ["React", "Node.js", "PostgreSQL", "Docker", "Kubernetes", "AWS CloudWatch"],
    results: "Detected and neutralized 99.8% of access threats and achieved ISO 27001 security parameters."
  },
  {
    id: 9,
    title: "Smart Manufacturing ERP",
    category: "Industrial IoT & ERP",
    img: imgManufacturing,
    description: "A next-generation ERP system designed for manufacturing, featuring predictive maintenance, resource planning, and IoT integration.",
    link: "#",
    overview: "Architected a real-time SCADA and ERP automation system for foundry and mill operations.",
    challenge: "Equipment breakdown downtime, lack of inventory tracking, and database scale limitations.",
    solution: "Integrated IoT sensors with a timescale database, and coded resource scheduling logic.",
    technologies: ["Angular", "Go", "TimescaleDB", "MQTT Protocol", "Kubernetes", "Docker"],
    results: "30% reduction in equipment downtime and real-time visibility across 4 manufacturing units."
  },
  {
    id: 10,
    title: "AI Recruitment & HR Platform",
    category: "Human Resources",
    img: imgHR,
    description: "An AI-driven HR suite streamlining talent acquisition, resume parsing, employee onboarding, and performance tracking.",
    link: "#",
    overview: "Built an intelligent recruitment ecosystem featuring OCR resume parsing and automated applicant tracking.",
    challenge: "Recruiting delays due to manual screening of thousands of resume PDFs.",
    solution: "Deployed Python OCR parsing pipelines that grade resume text against criteria keywords.",
    technologies: ["React", "Python Django", "MongoDB", "Tesseract OCR", "Docker", "AWS"],
    results: "Saved 80+ HR recruiting hours per month and decreased time-to-hire by 50%."
  }
];

export default function Portfolio() {
  const [active, setActive] = useState<typeof items[0] | null>(null);

  return (
    <section id="portfolio" className="relative py-12 md:py-16 overflow-hidden bg-[#F9FAFB]">

      {/* Background Glow */}
      <div className="hidden md:block absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary-purple/2 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-24">
          <motion.div
              initial={{ opacity: 1, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0, margin: "200px" }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-8"
          >
            <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.2em]">
              Selected Works
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
            Case Studies of <span className="text-gradient-cyan">Success</span>
          </h2>
          <p className="text-gray-500 text-xl leading-relaxed">
            Explore how we've helped businesses transform their operations through
            custom software and intelligent automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {items.slice(0, 2).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 1, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: "200px" }}
              transition={{ duration: 0.3, delay: idx * 0.02 }}
              className="group cursor-pointer relative"
              onClick={() => setActive(project)}
            >
              <div className="glass-card h-full rounded-[3rem] overflow-hidden border border-gray-300 hover:border-secondary-indigo/20 transition-all duration-700 flex flex-col">
                <div className="aspect-[16/10] overflow-hidden relative bg-gray-50 flex items-center justify-center p-4 shrink-0">
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={750}
                    className="max-w-full max-h-full object-contain rounded-2xl transition-transform duration-600 group-hover:scale-105"
                  />
                </div>

                <div className="p-8 md:p-10 relative flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-secondary-indigo text-xs font-bold uppercase tracking-[0.3em] mb-4">
                      {project.category}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 group-hover:text-secondary-indigo transition-colors duration-500">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-gray-500 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                    View Case Study <ArrowTopRightOnSquareIcon className="w-5 h-5 text-secondary-indigo" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: "200px" }}
          className="mt-12 md:mt-24 text-center"
        >
          <Link to="/portfolio" className="btn-pill btn-glass text-secondary-indigo hover:text-white px-12 inline-block">
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
                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between md:h-auto overflow-y-auto max-h-[60vh] md:max-h-[85vh]">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-indigo animate-pulse" />
                      <span className="text-secondary-indigo font-bold text-[10px] tracking-[0.25em] uppercase">{active.category}</span>
                    </div>
 
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">{active.title}</h2>
 
                    <div className="space-y-4 text-sm text-gray-600">
                      <div>
                        <h4 className="font-bold text-gray-950 text-xs uppercase tracking-wider mb-1">Overview</h4>
                        <p className="font-medium text-xs leading-relaxed">{active.overview}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-950 text-xs uppercase tracking-wider mb-1">Challenge</h4>
                        <p className="font-medium text-xs leading-relaxed">{active.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-950 text-xs uppercase tracking-wider mb-1">Solution</h4>
                        <p className="font-medium text-xs leading-relaxed">{active.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-950 text-xs uppercase tracking-wider mb-1">Technologies Used</h4>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {active.technologies?.map((tech) => (
                            <span key={tech} className="bg-gray-150 px-2 py-0.5 rounded text-[10px] font-bold text-gray-700 uppercase tracking-wider border border-gray-200">{tech}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-950 text-xs uppercase tracking-wider mb-1">Results</h4>
                        <p className="font-bold text-xs leading-relaxed text-green-700">{active.results}</p>
                      </div>
                    </div>
                  </div>
 
                  <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:items-center shrink-0">
                    {active.link !== "#" && (
                      <a
                        href={active.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-pill text-xs md:text-sm lg:text-base px-5 py-3 btn-primary-glow text-white flex items-center justify-center gap-2"
                      >
                        Live Preview <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      </a>
                    )}
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


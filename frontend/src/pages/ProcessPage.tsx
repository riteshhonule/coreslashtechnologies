import React from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { useModal } from "../context/ModalContext";
import { 
  Compass, 
  FileText, 
  Layout, 
  Code, 
  CheckCircle2, 
  Rocket, 
  Server, 
  Users,
  Sparkles,
  ArrowRight
} from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Discovery Phase",
    icon: Compass,
    desc: "Understanding your client's scoping documents, wireframes, and target outcomes under complete NDA protection. We analyze requirements and resolve potential tech-stack bottlenecks.",
    deliverables: ["Mutual NDA executed", "Functional project brief summary", "Technical architecture recommendations"],
    timeline: "Days 1 - 2"
  },
  {
    step: "02",
    title: "Planning & Architecture",
    icon: FileText,
    desc: "Mapping out relational database schemas, detailing API endpoints, configuring secure third-party integrations, and laying out the bi-weekly Agile sprint schedule.",
    deliverables: ["Entity Relationship Diagram (ERD)", "API Spec draft", "Shared Jira / Trello project board setup"],
    timeline: "Days 3 - 5"
  },
  {
    step: "03",
    title: "UI / UX Review",
    icon: Layout,
    desc: "Our engineers inspect your agency's Figma layouts. We analyze structural responsiveness, micro-animations, color tokens, and asset configurations to ensure pixel-perfect conversion.",
    deliverables: ["Figma conversion audit report", "Responsive layout specifications", "Micro-animation guidelines"],
    timeline: "Days 6 - 7"
  },
  {
    step: "04",
    title: "Silent Development",
    icon: Code,
    desc: "Our dedicated engineers write modern, commented, and typed code (React, NestJS, Python). Commits are pushed from generic, white-label git handles.",
    deliverables: ["Private GitHub repository branch access", "Bi-weekly staging build releases", "Clean, modular code reviews"],
    timeline: "Iterative sprints"
  },
  {
    step: "05",
    title: "Rigorous QA Testing",
    icon: CheckCircle2,
    desc: "Thorough functional testing, cross-browser compatibility checks, responsive layouts audit, and database vulnerability checks. We run linting and speed optimization tests.",
    deliverables: ["QA audit log", "PageSpeed Score checks (>90)", "Cross-device compatibility approval"],
    timeline: "Continuous during development"
  },
  {
    step: "06",
    title: "Sanitized Deployment",
    icon: Rocket,
    desc: "Deploying the staging-approved build to your client's web servers (AWS, Docker, Vercel, NGINX) using sanitized deployment credentials. Domain configurations and CDNs are activated.",
    deliverables: ["Production environment launch", "SSL cert & CDN configuration", "Deployment credentials transfer"],
    timeline: "Launch day"
  },
  {
    step: "07",
    title: "SLA Maintenance",
    icon: Server,
    desc: "Continuous automated monitoring of system uptime, database backups, security patches, library upgrades, and monthly reporting.",
    deliverables: ["24/7 uptime logs", "Weekly data backups", "Security updates report"],
    timeline: "Monthly Support SLA"
  },
  {
    step: "08",
    title: "Agency Support Extension",
    icon: Users,
    desc: "We remain your silent engineering extension. We stand ready to tackle next-version features, content edits, emergency patches, and participate invisibly on client-facing reviews.",
    deliverables: ["Dedicated team standby hours", "Sanitized email/Slack presence", "Next-version scope drafts"],
    timeline: "Ongoing partnership"
  }
];

export default function ProcessPage() {
  const { openModal } = useModal();

  return (
    <main className="relative min-h-screen bg-[#F9FAFB] pt-0 overflow-x-hidden pb-12 text-gray-900">
      <SEO
        title="White-Label Partnership Process | CoreSlash Technologies"
        description="Learn how we work behind the scenes. Our 8-step agency development process ensures seamless, secure, and completely white-label software engineering delivery."
      />

      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-purple/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-indigo/2 rounded-full blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative py-20 md:py-32 w-full text-center px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 1, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-4"
          >
            <Sparkles className="w-4 h-4 text-secondary-indigo" />
            <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.3em]">
              The Operations Blueprint
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-5xl md:text-8xl font-black text-gray-900 leading-[1.1] tracking-tight"
          >
            Our Delivery <br />
            <span className="text-gradient-purple">Process</span>
          </motion.h1>

          <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We operate in synchronous alignment with your account managers. Our structured delivery pipeline keeps milestones clear, codes clean, and launch checklists strictly covered.
          </p>
        </div>
      </section>

      {/* PROCESS TIMELINE FLOW */}
      <section className="py-10 md:py-20 relative z-10">
        <div className="container mx-auto px-6 max-w-5xl relative">
          
          {/* Vertical central line for larger viewports */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 -z-10" />

          <div className="space-y-16 md:space-y-24">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 1, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0, margin: "150px" }}
                  transition={{ duration: 0.4 }}
                  className={`flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-0 relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Central Node Badge */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 md:top-6 w-12 h-12 rounded-full bg-white border-2 border-secondary-indigo flex items-center justify-center font-bold text-secondary-indigo text-sm shadow-md hidden md:flex z-25">
                    {step.step}
                  </div>

                  {/* Content Card Side (44% width) */}
                  <div className="w-full md:w-[44%] bg-white border border-gray-200/60 p-8 rounded-[2.5rem] shadow-xl shadow-gray-250/5 relative hover:border-secondary-indigo/20 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-11 h-11 rounded-xl bg-secondary-indigo/5 text-secondary-indigo flex items-center justify-center border border-secondary-indigo/10 shrink-0">
                        <Icon className="w-5.5 h-5.5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block md:hidden">Step {step.step}</span>
                        <h3 className="font-extrabold text-gray-950 text-xl tracking-tight leading-none">{step.title}</h3>
                      </div>
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed font-semibold mb-6">{step.desc}</p>

                    <div className="border-t border-gray-100 pt-6 space-y-4">
                      <div>
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Stage Deliverables</h4>
                        <ul className="space-y-2">
                          {step.deliverables.map((item, dIdx) => (
                            <li key={dIdx} className="text-xs font-bold text-gray-900 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary-indigo mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between bg-[#F9FAFB] px-4 py-2.5 rounded-xl border border-gray-100">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Est. Duration</span>
                        <span className="text-xs font-bold text-secondary-indigo">{step.timeline}</span>
                      </div>
                    </div>
                  </div>

                  {/* Empty Spacer Side (44% width) */}
                  <div className="hidden md:block w-[44%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL SCHEDULE CALL SECTION */}
      <section className="py-16 md:py-28 relative z-10 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white border border-gray-200/60 p-12 md:p-24 rounded-[3.5rem] shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/3 to-secondary-indigo/3" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-6xl font-black text-gray-950 tracking-tight leading-tight">
                Integrate Our Developer <br />
                <span className="text-gradient-purple">Squad Into Your Next Sprint</span>
              </h2>
              <p className="text-gray-500 text-lg md:text-xl font-medium max-w-xl mx-auto">
                Ready to review standard SLA agreements? Book an intro call with our architecture leads.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={openModal}
                  className="btn-pill btn-primary-glow text-white px-8 py-4 text-sm font-bold shadow-lg"
                >
                  Book Discovery Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

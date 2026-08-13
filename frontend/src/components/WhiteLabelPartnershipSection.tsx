import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  TrendingUp,
  ShieldCheck,
  Compass,
  Code2,
  CheckCircle2,
  Rocket,
  LifeBuoy,
  RefreshCw,
  Building,
  Cpu,
} from "lucide-react";
import type { FC, ElementType } from "react";

interface ResponsibilityItem {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
}

const CLIENT_RESPONSIBILITIES: ResponsibilityItem[] = [
  {
    id: "01",
    title: "Client relationship",
    description: "Primary point of contact, client trust & strategic alignment",
    icon: Users,
  },
  {
    id: "02",
    title: "Communication",
    description: "Status updates, requirements gathering & scope discussions",
    icon: MessageSquare,
  },
  {
    id: "03",
    title: "Business development",
    description: "Proposal creation, pricing, pitching & closing contracts",
    icon: TrendingUp,
  },
  {
    id: "04",
    title: "Account management",
    description: "Billing, long-term strategy & client satisfaction",
    icon: ShieldCheck,
  },
];

const CORESLASH_RESPONSIBILITIES: ResponsibilityItem[] = [
  {
    id: "01",
    title: "Technical planning",
    description: "Architecture design, tech stack selection & sprint planning",
    icon: Compass,
  },
  {
    id: "02",
    title: "Development",
    description: "Clean code execution, web, mobile & custom software engineering",
    icon: Code2,
  },
  {
    id: "03",
    title: "Testing",
    description: "Quality assurance, cross-browser testing & security audits",
    icon: CheckCircle2,
  },
  {
    id: "04",
    title: "Deployment",
    description: "CI/CD pipelines, cloud hosting setup & production launch",
    icon: Rocket,
  },
  {
    id: "05",
    title: "Technical support",
    description: "SLA maintenance, bug fixes, updates & infrastructure monitoring",
    icon: LifeBuoy,
  },
];

export const WhiteLabelPartnershipSection: FC = () => {
  return (
    <section
      id="white-label-partnership"
      className="relative py-20 md:py-28 bg-gradient-to-b from-white via-slate-50/60 to-white text-slate-900 overflow-hidden font-sans border-t border-slate-100"
    >
      {/* Background Decorative Accents - Subtle & Modern */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-50/40 rounded-full filter blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-slate-100/60 rounded-full filter blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        {/* ============================================================ */}
        {/* HEADER SECTION                                                */}
        {/* ============================================================ */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-2.5 mb-4 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100/80"
          >
            <div className="w-2 h-2 rounded-full bg-[#1769E8] animate-pulse" />
            <span
              className="text-xs font-bold uppercase tracking-[0.2em] text-[#1769E8]"
              style={{ fontFamily: "Cambria, Georgia, serif" }}
            >
              WHITE-LABEL PARTNERSHIP
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            style={{ fontFamily: "Cambria, Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#0B1738] tracking-tight leading-tight max-w-3xl"
          >
            Your Client. Your Brand.{" "}
            <span className="text-[#1769E8] relative inline-block">
              Our Technology.
              <svg
                className="absolute left-0 -bottom-1.5 w-full h-2 text-[#1769E8]/20"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 10 Q 50 20 100 10"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                />
              </svg>
            </span>
          </motion.h2>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-sans"
          >
            You manage the client relationship.
            <br className="hidden sm:inline" /> CoreSlash handles the technical
            execution.
          </motion.p>
        </div>

        {/* ============================================================ */}
        {/* TWO-SIDED COMPARISON CONTAINER                                */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-6 items-stretch relative">
          
          {/* ========================================================== */}
          {/* LEFT SIDE — YOUR RESPONSIBILITIES                            */}
          {/* ========================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(11,23,56,0.06)] transition-all duration-500 relative"
          >
            {/* Header Badge */}
            <div className="border-b border-slate-100 pb-6 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold uppercase tracking-wider mb-2">
                <Building className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
                YOUR BRAND
              </div>
              <h3
                style={{ fontFamily: "Cambria, Georgia, serif" }}
                className="text-2xl sm:text-3xl font-bold text-[#0B1738]"
              >
                You Handle
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                Client & Business Relationship
              </p>
            </div>

            {/* Responsibility Items */}
            <div className="space-y-4 flex-1">
              {CLIENT_RESPONSIBILITIES.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + idx * 0.09,
                      ease: "easeOut",
                    }}
                    className="group flex items-start gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-md hover:translate-x-1.5 transition-all duration-300 cursor-default"
                  >
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 text-slate-700 group-hover:bg-[#0B1738] group-hover:border-[#0B1738] group-hover:text-white group-hover:scale-105 transition-all duration-300 flex items-center justify-center shrink-0 shadow-sm">
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold text-[#0B1738] group-hover:text-black transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>


          </motion.div>

          {/* ========================================================== */}
          {/* CENTER CONNECTOR / PARTNERSHIP BRIDGE                       */}
          {/* ========================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center justify-center py-4 lg:py-0 px-2 relative"
          >
            {/* Desktop Vertical Connecting Line */}
            <div className="hidden lg:flex flex-col items-center justify-between h-full py-8 w-px bg-gradient-to-b from-slate-200 via-blue-400 to-slate-200 relative">
              {/* Traveling dot along line */}
              <motion.div
                animate={{ y: [0, 280, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-2.5 h-2.5 rounded-full bg-[#1769E8] shadow-[0_0_12px_rgba(23,105,232,0.8)] absolute -left-1"
              />
            </div>

            {/* Center Interactive Node / Partnership Badge */}
            <div className="relative z-20 flex flex-col items-center bg-white border border-blue-100 p-4 sm:p-5 rounded-2xl shadow-[0_8px_30px_rgba(23,105,232,0.12)] min-w-[150px] text-center my-auto">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1769E8] to-blue-700 text-white flex items-center justify-center mb-2.5 shadow-md">
                <RefreshCw className="w-5 h-5 animate-[spin_10s_linear_infinite]" aria-hidden="true" />
              </div>
              <p className="text-xs font-bold text-[#0B1738]">
                White-Label Bridge
              </p>
            </div>

            {/* Mobile Vertical Arrow Flow */}
            <div className="flex lg:hidden flex-col items-center my-2 text-slate-300">
              <div className="w-0.5 h-8 bg-gradient-to-b from-slate-300 to-blue-500" />
            </div>
          </motion.div>

          {/* ========================================================== */}
          {/* RIGHT SIDE — CORESLASH RESPONSIBILITIES                    */}
          {/* ========================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col rounded-3xl border border-blue-100/90 bg-white p-7 sm:p-9 shadow-[0_4px_24px_rgba(23,105,232,0.06)] hover:shadow-[0_12px_40px_rgba(23,105,232,0.12)] transition-all duration-500 relative"
          >
            {/* Subtle Gradient Backdrop highlight */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-50/70 to-transparent rounded-tr-3xl pointer-events-none" />

            {/* Header Badge */}
            <div className="border-b border-slate-100 pb-6 mb-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1769E8] text-[11px] font-bold uppercase tracking-wider mb-2 border border-blue-100">
                <Cpu className="w-3.5 h-3.5 text-[#1769E8]" aria-hidden="true" />
                CORESLASH TECHNOLOGIES
              </div>
              <h3
                style={{ fontFamily: "Cambria, Georgia, serif" }}
                className="text-2xl sm:text-3xl font-bold text-[#0B1738]"
              >
                CoreSlash Handles
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                Technical Execution
              </p>
            </div>

            {/* Responsibility Items */}
            <div className="space-y-3.5 flex-1 relative z-10">
              {CORESLASH_RESPONSIBILITIES.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + idx * 0.09,
                      ease: "easeOut",
                    }}
                    className="group flex items-start gap-4 p-3.5 sm:p-4 rounded-2xl border border-blue-50 bg-gradient-to-r from-blue-50/20 to-white hover:bg-blue-50/50 hover:border-blue-300 hover:shadow-md hover:translate-x-1.5 transition-all duration-300 cursor-default"
                  >
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#1769E8] group-hover:bg-[#1769E8] group-hover:border-[#1769E8] group-hover:text-white group-hover:scale-105 transition-all duration-300 flex items-center justify-center shrink-0 shadow-sm">
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold text-[#0B1738] group-hover:text-[#1769E8] transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>


          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhiteLabelPartnershipSection;

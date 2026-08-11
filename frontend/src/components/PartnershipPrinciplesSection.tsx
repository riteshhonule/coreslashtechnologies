import { motion } from "framer-motion";
import {
  Users,
  Eye,
  ShieldCheck,
  LockKeyhole,
  BadgeCheck,
  MessageCircle,
  Handshake,
} from "lucide-react";
import type { FC, ElementType } from "react";

interface PrincipleItem {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
  colSpan: string;
  featured?: boolean;
}

const PRINCIPLES: PrincipleItem[] = [
  {
    id: "01",
    title: "Transparency",
    description: "Clear scope, timelines, communication, and expectations.",
    icon: Eye,
    colSpan: "lg:col-span-7",
    featured: true,
  },
  {
    id: "02",
    title: "Accountability",
    description: "Taking ownership of assigned technical responsibilities.",
    icon: ShieldCheck,
    colSpan: "lg:col-span-5",
  },
  {
    id: "03",
    title: "Confidentiality",
    description: "Respecting client information, project details, and intellectual property.",
    icon: LockKeyhole,
    colSpan: "lg:col-span-4",
  },
  {
    id: "04",
    title: "Quality",
    description: "Following structured development and testing practices.",
    icon: BadgeCheck,
    colSpan: "lg:col-span-4",
  },
  {
    id: "05",
    title: "Communication",
    description: "Keeping partners informed throughout the project lifecycle.",
    icon: MessageCircle,
    colSpan: "lg:col-span-4",
  },
];

export const PartnershipPrinciplesSection: FC = () => {
  return (
    <section
      id="partnership-principles"
      className="relative py-20 md:py-28 bg-gradient-to-b from-[#EBF1F9] via-[#F3F6FB] to-[#E9F0F8] text-slate-900 overflow-hidden font-sans border-t border-blue-100/60"
    >
      {/* ============================================================ */}
      {/* DECORATIVE BACKGROUND VECTOR ACCENTS                           */}
      {/* ============================================================ */}

      {/* Top Left Organic Soft Cloud Gradient */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/50 via-blue-100/30 to-transparent rounded-full filter blur-3xl pointer-events-none -z-10" />

      {/* Top Right Concentric Curved Lines */}
      <div className="absolute top-0 right-0 pointer-events-none -z-10 overflow-hidden w-96 h-96">
        <svg
          className="w-full h-full text-blue-300/40"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="200" cy="0" r="180" strokeWidth="1" />
          <circle cx="200" cy="0" r="140" strokeWidth="1" />
          <circle cx="200" cy="0" r="100" strokeWidth="1" />
          <circle cx="200" cy="0" r="60" strokeWidth="1" />
        </svg>
      </div>

      {/* Far Left 4x4 Dot Matrix Pattern */}
      <div className="absolute top-1/3 left-6 sm:left-12 pointer-events-none -z-10 hidden md:block opacity-35">
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#1769E8]" />
          ))}
        </div>
      </div>

      {/* Bottom Right Concentric Curved Rings */}
      <div className="absolute bottom-0 right-0 pointer-events-none -z-10 overflow-hidden w-[450px] h-[450px]">
        <svg
          className="w-full h-full text-blue-300/35"
          viewBox="0 0 300 300"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="300" cy="300" r="260" strokeWidth="1.5" />
          <circle cx="300" cy="300" r="200" strokeWidth="1.5" />
          <circle cx="300" cy="300" r="140" strokeWidth="1.5" />
          <circle cx="300" cy="300" r="80" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">

        {/* ============================================================ */}
        {/* HEADER SECTION                                                */}
        {/* ============================================================ */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-16">

          {/* Eyebrow Badge Pill */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-[#DDE7F7] border border-blue-200/60 shadow-sm"
          >
            <Users className="w-4 h-4 text-[#1769E8]" aria-hidden="true" />
            <span
              className="text-xs font-bold uppercase tracking-[0.18em] text-[#1769E8]"
              style={{ fontFamily: "Cambria, Georgia, serif" }}
            >
              PARTNERSHIP PRINCIPLES
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            style={{ fontFamily: "Cambria, Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#0B1738] tracking-tight leading-tight max-w-3xl"
          >
            Built on Trust.{" "}
            <span className="text-[#1769E8]">Driven by Delivery.</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-sans"
          >
            CoreSlash believes long-term partnerships are built through transparency,
            accountability, confidentiality, quality, communication and long-term
            thinking.
          </motion.p>

          {/* Underline Accent Bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-14 h-[3px] bg-[#1769E8] rounded-full mt-4"
          />
        </div>

        {/* ============================================================ */}
        {/* BENTO GRID ARRANGEMENT                                        */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch mb-6">
          {PRINCIPLES.map((principle, idx) => {
            const IconComponent = principle.icon;

            {/* FEATURED TRANSPARENCY CARD (01) */ }
            if (principle.featured) {
              return (
                <motion.div
                  key={principle.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.08,
                    ease: "easeOut",
                  }}
                  className={`group relative flex flex-col justify-between p-8 sm:p-10 rounded-[24px] bg-gradient-to-br from-[#041334] via-[#09245E] to-[#0A4DD6] text-white shadow-[0_12px_40px_rgba(4,19,52,0.25)] hover:shadow-[0_18px_50px_rgba(10,77,214,0.35)] hover:-translate-y-1 transition-all duration-300 overflow-hidden ${principle.colSpan}`}
                >
                  {/* Bottom Right Wave Effect & Glow */}
                  <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#1769E8]/35 rounded-full filter blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                  <svg
                    className="absolute bottom-0 right-0 w-64 h-40 text-blue-400/20 pointer-events-none rounded-br-[24px]"
                    viewBox="0 0 200 120"
                    fill="currentColor"
                    preserveAspectRatio="none"
                  >
                    <path d="M0 120 C 60 70, 130 90, 200 30 L 200 120 Z" />
                  </svg>

                  {/* Header Row: Icon Container */}
                  <div className="flex items-center justify-start relative z-10 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-sm">
                      <IconComponent className="w-6 h-6" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="relative z-10">
                    <h3
                      style={{ fontFamily: "Cambria, Georgia, serif" }}
                      className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight"
                    >
                      {principle.title}
                    </h3>
                    <div className="w-8 h-[2px] bg-[#1769E8] my-2.5 rounded-full" />
                    <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-sans max-w-md">
                      {principle.description}
                    </p>
                  </div>
                </motion.div>
              );
            }

            {/* CARDS 02, 03, 04, 05 */ }
            return (
              <motion.div
                key={principle.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: "easeOut",
                }}
                className={`group relative flex flex-col justify-between p-7 sm:p-8 rounded-[24px] border border-blue-100/90 bg-gradient-to-br from-[#FFFFFF] via-[#F6F9FF] to-[#E5EFFD] shadow-[0_8px_30px_rgba(23,105,232,0.06)] hover:shadow-[0_16px_40px_rgba(23,105,232,0.15)] hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden ${principle.colSpan}`}
              >
                {/* Bottom Right Soft Fluid Wave Backdrop */}
                <svg
                  className="absolute bottom-0 right-0 w-44 h-28 text-blue-400/15 pointer-events-none rounded-br-[24px]"
                  viewBox="0 0 150 100"
                  fill="currentColor"
                  preserveAspectRatio="none"
                >
                  <path d="M0 100 C 45 60, 95 80, 150 25 L 150 100 Z" />
                </svg>

                {/* Top Row: Icon Container */}
                <div className="flex items-center justify-start relative z-10 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50/90 border border-blue-100/90 text-[#1769E8] flex items-center justify-center shadow-sm group-hover:bg-[#1769E8] group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-6 h-6" aria-hidden="true" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3
                    style={{ fontFamily: "Cambria, Georgia, serif" }}
                    className="text-xl sm:text-2xl font-bold text-[#0B1738] group-hover:text-[#1769E8] transition-colors mb-1"
                  >
                    {principle.title}
                  </h3>
                  <div className="w-8 h-[2px] bg-[#1769E8] my-2 rounded-full" />
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-normal">
                    {principle.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* CARD 06 — LONG-TERM THINKING BANNER CARD                    */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.6,
            delay: 0.45,
            ease: "easeOut",
          }}
          className="group relative flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-7 rounded-[24px] border border-blue-100/90 bg-gradient-to-r from-[#FFFFFF] via-[#F4F8FF] to-[#E2EEFE] shadow-[0_8px_30px_rgba(23,105,232,0.06)] hover:shadow-[0_16px_40px_rgba(23,105,232,0.15)] hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          {/* Bottom Right Fluid Wave Backdrop */}
          <svg
            className="absolute bottom-0 right-0 w-60 h-28 text-blue-400/15 pointer-events-none rounded-br-[24px]"
            viewBox="0 0 200 100"
            fill="currentColor"
            preserveAspectRatio="none"
          >
            <path d="M0 100 C 60 50, 130 75, 200 20 L 200 100 Z" />
          </svg>

          {/* Left Content Area */}
          <div className="flex items-center gap-5 z-10 w-full sm:w-auto">
            {/* Icon Container */}
            <div className="w-14 h-14 rounded-2xl bg-blue-50/90 border border-blue-200/80 text-[#1769E8] flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#1769E8] group-hover:text-white transition-all duration-300">
              <Handshake className="w-7 h-7" aria-hidden="true" />
            </div>

            {/* Vertical Divider */}
            <div className="w-[1px] h-10 bg-slate-300/80 hidden sm:block shrink-0" />

            {/* Text Title & Subtitle */}
            <div>
              <h3
                style={{ fontFamily: "Cambria, Georgia, serif" }}
                className="text-xl sm:text-2xl font-bold text-[#0B1738] group-hover:text-[#1769E8] transition-colors"
              >
                Long-Term Thinking
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed font-sans">
                Building relationships that extend beyond a single project.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default PartnershipPrinciplesSection;

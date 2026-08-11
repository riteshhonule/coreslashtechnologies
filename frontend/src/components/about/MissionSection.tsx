import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import missionMainImg from "@/assets/about/coreslash-mission-main.jpg";
import missionSecondaryImg from "@/assets/about/coreslash-mission-secondary.png";

interface MissionPillar {
  title: string;
  description: string;
}

const MISSION_PILLARS: MissionPillar[] = [
  {
    title: "Innovation",
    description: "Providing creative, advanced, and future-ready digital solutions for evolving business needs."
  },
  {
    title: "Scalability",
    description: "Developing scalable software solutions designed to support long-term business growth."
  },
  {
    title: "Reliability & Security",
    description: "Ensuring secure, high-performance, and reliable digital products and technology systems."
  },
  {
    title: "Collaboration",
    description: "Working closely with clients to deliver customized, result-oriented digital solutions."
  }
];

const CARD_THEMES = [
  {
    // Card 01: Rich Vibrant Blue & Cyan
    bgHover: "hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:border-blue-600 hover:shadow-[0_14px_30px_rgba(37,99,235,0.35)]",
    badge: "group-hover:bg-white/20 group-hover:text-white group-hover:border-white/40",
    text: "group-hover:text-white",
    desc: "group-hover:text-white/90",
    icon: "text-white"
  },
  {
    // Card 02: Rich Vibrant Indigo & Purple
    bgHover: "hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:border-indigo-600 hover:shadow-[0_14px_30px_rgba(79,70,229,0.35)]",
    badge: "group-hover:bg-white/20 group-hover:text-white group-hover:border-white/40",
    text: "group-hover:text-white",
    desc: "group-hover:text-white/90",
    icon: "text-white"
  },
  {
    // Card 03: Rich Vibrant Emerald & Teal
    bgHover: "hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 hover:border-emerald-600 hover:shadow-[0_14px_30px_rgba(16,185,129,0.35)]",
    badge: "group-hover:bg-white/20 group-hover:text-white group-hover:border-white/40",
    text: "group-hover:text-white",
    desc: "group-hover:text-white/90",
    icon: "text-white"
  },
  {
    // Card 04: Rich Vibrant Violet & Fuchsia
    bgHover: "hover:bg-gradient-to-r hover:from-violet-600 hover:to-fuchsia-600 hover:border-violet-600 hover:shadow-[0_14px_30px_rgba(139,92,246,0.35)]",
    badge: "group-hover:bg-white/20 group-hover:text-white group-hover:border-white/40",
    text: "group-hover:text-white",
    desc: "group-hover:text-white/90",
    icon: "text-white"
  }
];

export const MissionSection: React.FC = () => {
  return (
    <section className="relative w-full py-10 lg:py-16 bg-[#090E17] text-slate-100 border-t border-slate-800/60 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 min-h-[calc(100vh-120px)] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left Column: Enlarged Indian IT Software Team Images with Sparkle Accents */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative w-full flex justify-center items-center py-2"
          >
            <div className="relative w-full max-w-[620px]">
              
              {/* Top-Right Decorative Sparkle Star */}
              <div className="absolute -top-5 right-8 sm:right-14 z-20 text-blue-500">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#3b82f6" fillOpacity="0.25" />
                </svg>
              </div>

              {/* Middle-Right Overlap Sparkle Star */}
              <div className="absolute top-1/2 -right-3 sm:-right-5 z-30 text-blue-500">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#3b82f6" fillOpacity="0.3" />
                </svg>
              </div>

              {/* Primary Main Image (Indian Software Engineering Team) */}
              <div className="relative z-10 overflow-hidden rounded-[2.2rem] shadow-2xl border border-slate-800/80 aspect-[4/3] bg-slate-900">
                <img
                  src={missionMainImg}
                  alt="Indian IT software engineering team collaborating in modern tech office"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Secondary Floating Overlap Image (Indian Tech Professional) */}
              <div className="absolute -bottom-6 -right-2 sm:right-2 w-[70%] sm:w-[64%] z-20 rounded-[1.8rem] shadow-2xl border-4 border-[#090E17] overflow-hidden aspect-[4/3] bg-slate-900">
                <img
                  src={missionSecondaryImg}
                  alt="Indian software developer reviewing code on laptop"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

            </div>
          </motion.div>

          {/* Right Column: Compact, Single-Screen Readable Mission Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-center items-start space-y-3.5"
          >
            {/* Tag */}
            <div className="inline-flex items-center px-3 py-1 rounded-md bg-blue-500/10 border-l-4 border-blue-500 text-blue-400 text-xs font-semibold tracking-wider uppercase select-none">
              MISSION
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight text-white leading-[1.18]">
              Building High-Performance Systems{" "}
              <span className="text-blue-500">Designed to Scale</span>
            </h2>

            {/* Subtext */}
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
              To deliver innovative, scalable, and technology-driven software solutions that help businesses grow, transform operations, and achieve success in the modern digital landscape.
            </p>

            {/* 4 Pillars Card List Stack (Full Background Color Fill Cards on Dark Section) */}
            <div className="w-full space-y-3 pt-1">
              {MISSION_PILLARS.map((pillar, idx) => {
                const theme = CARD_THEMES[idx % CARD_THEMES.length];
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.08 * idx, ease: "easeOut" }}
                    whileHover={{ y: -3, scale: 1.015 }}
                    className={`relative group p-4 sm:p-4.5 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-[0_2px_12px_rgba(0,0,0,0.2)] ${theme.bgHover} transition-all duration-300 overflow-hidden cursor-default`}
                  >
                    <div className="flex items-start gap-3.5 relative z-10">
                      {/* Step Number Badge */}
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-800/90 border border-slate-700/80 text-slate-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 ${theme.badge} transition-all duration-300 shadow-sm`}>
                        {`0${idx + 1}`}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className={`text-sm sm:text-base font-bold text-slate-100 ${theme.text} transition-colors tracking-tight`}>
                            {pillar.title}
                          </h3>
                          <ArrowRight className={`w-3.5 h-3.5 ${theme.icon} opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0 ml-2`} />
                        </div>
                        <p className={`text-slate-400 text-xs sm:text-[13px] leading-relaxed font-normal mt-1 ${theme.desc} transition-colors`}>
                          {pillar.description}
                        </p>
                      </div>
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

export default MissionSection;

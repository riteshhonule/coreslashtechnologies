import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import visionMainImg from "@/assets/about/coreslash-vision-main.webp";
import visionSecondaryImg from "@/assets/about/coreslash-vision-secondary.webp";

interface VisionPillar {
  title: string;
  description: string;
}

const VISION_PILLARS: VisionPillar[] = [
  {
    title: "Human-Centered Innovation",
    description: "Develop advanced technologies and digital solutions focused on improving user experience and business value."
  },
  {
    title: "Design & Engineering Excellence",
    description: "Maintain high standards in software development, design consistency, and industry best practices."
  },
  {
    title: "Trusted Long-Term Partnerships",
    description: "Build reliable client relationships through transparency, collaboration, and long-term business support."
  },
  {
    title: "Secure & Future-Ready Digital Solutions",
    description: "Create secure, scalable, and future-ready systems designed for sustainable digital growth."
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

export const VisionSection: React.FC = () => {
  return (
    <section className="relative w-full py-8 lg:py-12 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto overflow-hidden bg-background text-foreground border-t border-border/40 min-h-[calc(100vh-80px)] flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
        
        {/* Left Column: Compact Vision Text & 4 Pillar Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-6 flex flex-col justify-center items-start space-y-3.5 order-2 lg:order-1"
        >
          {/* Tag */}
          <div className="inline-flex items-center px-3 py-1 rounded-md bg-blue-600/10 border-l-4 border-blue-600 text-blue-600 text-xs font-semibold tracking-wider uppercase select-none">
            VISION
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight text-foreground leading-[1.18]">
            Shaping the Next Era{" "}
            <span className="text-blue-600">Of Intelligent Technology</span>
          </h2>

          {/* Subtext */}
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-normal">
            To create innovative, scalable, and technology-driven software solutions that help businesses grow, transform operations, and succeed in the modern digital era.
          </p>

          {/* 4 Pillars Card List Stack (Enhanced Full Background Color Fill Cards) */}
          <div className="w-full space-y-3 pt-1">
            {VISION_PILLARS.map((pillar, idx) => {
              const theme = CARD_THEMES[idx % CARD_THEMES.length];
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.08 * idx, ease: "easeOut" }}
                  whileHover={{ y: -3, scale: 1.015 }}
                  className={`relative group p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.03)] ${theme.bgHover} transition-all duration-300 overflow-hidden cursor-default`}
                >
                  <div className="flex items-start gap-3.5 relative z-10">
                    {/* Step Number Badge */}
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 ${theme.badge} transition-all duration-300 shadow-sm`}>
                      {`0${idx + 1}`}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm sm:text-base font-bold text-foreground dark:text-white ${theme.text} transition-colors tracking-tight`}>
                          {pillar.title}
                        </h3>
                        <ArrowRight className={`w-3.5 h-3.5 ${theme.icon} opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0 ml-2`} />
                      </div>
                      <p className={`text-muted-foreground dark:text-slate-300 text-xs sm:text-[13px] leading-relaxed font-normal mt-1 ${theme.desc} transition-colors`}>
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: Enlarged Indian IT Software Team Images with Sparkle Accents */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-6 relative w-full flex justify-center items-center py-2 order-1 lg:order-2"
        >
          <div className="relative w-full max-w-[620px]">
            
            {/* Top-Left Decorative Sparkle Star */}
            <div className="absolute -top-5 left-6 sm:left-12 z-20 text-blue-600">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#2563eb" fillOpacity="0.12" />
              </svg>
            </div>

            {/* Middle-Left Overlap Sparkle Star */}
            <div className="absolute top-1/2 -left-3 sm:-left-5 z-30 text-blue-600">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#2563eb" fillOpacity="0.18" />
              </svg>
            </div>

            {/* Primary Main Image (Indian Software Engineering Team) */}
            <div className="relative z-10 overflow-hidden rounded-[2.2rem] shadow-2xl border border-border/50 aspect-[4/3] bg-muted">
              <img
                src={visionMainImg}
                alt="Indian IT software team in strategic vision planning meeting"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Secondary Floating Overlap Image (Indian Software Professional) */}
            <div className="absolute -bottom-6 -left-2 sm:left-2 w-[70%] sm:w-[64%] z-20 rounded-[1.8rem] shadow-2xl border-4 border-background overflow-hidden aspect-[4/3] bg-muted">
              <img
                src={visionSecondaryImg}
                alt="Indian software developers working together on digital product"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default VisionSection;

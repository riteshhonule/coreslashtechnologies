import React from "react";
import { motion } from "framer-motion";

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

export const MissionSection: React.FC = () => {
  return (
    <section className="relative w-full py-8 lg:py-12 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto overflow-hidden bg-background text-foreground border-t border-border/40 min-h-[calc(100vh-80px)] flex items-center">
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
            <div className="absolute -top-5 right-8 sm:right-14 z-20 text-blue-600">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#2563eb" fillOpacity="0.12" />
              </svg>
            </div>

            {/* Middle-Right Overlap Sparkle Star */}
            <div className="absolute top-1/2 -right-3 sm:-right-5 z-30 text-blue-600">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#2563eb" fillOpacity="0.18" />
              </svg>
            </div>

            {/* Primary Main Image (Indian Software Engineering Team) */}
            <div className="relative z-10 overflow-hidden rounded-[2.2rem] shadow-2xl border border-border/50 aspect-[4/3] bg-muted">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=80"
                alt="Indian IT software engineering team collaborating in modern tech office"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Secondary Floating Overlap Image (Indian Tech Professional) */}
            <div className="absolute -bottom-6 -right-2 sm:right-2 w-[70%] sm:w-[64%] z-20 rounded-[1.8rem] shadow-2xl border-4 border-background overflow-hidden aspect-[4/3] bg-muted">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&auto=format&fit=crop&q=80"
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
          <div className="inline-flex items-center px-3 py-1 rounded-md bg-blue-600/10 border-l-4 border-blue-600 text-blue-600 text-xs font-semibold tracking-wider uppercase select-none">
            MISSION
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight text-foreground leading-[1.18]">
            Empowering Businesses Through{" "}
            <span className="text-blue-600">Innovative Digital Solutions</span>
          </h2>

          {/* Subtext */}
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-normal">
            To deliver innovative, scalable, and technology-driven software solutions that help businesses grow, transform operations, and achieve success in the modern digital landscape.
          </p>

          {/* 4 Pillars Card List Stack (Compact Single-Screen View) */}
          <div className="w-full space-y-2.5 pt-1">
            {MISSION_PILLARS.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.08 * idx }}
                className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900/80 border border-blue-500/20 shadow-[0_2px_12px_rgba(0,0,0,0.015)] hover:shadow-md hover:border-blue-500/40 transition-all duration-300 flex flex-col items-start group"
              >
                <h3 className="text-sm sm:text-base font-semibold text-foreground mb-0.5 group-hover:text-blue-600 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default MissionSection;

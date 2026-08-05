import React from "react";
import { motion } from "framer-motion";

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
            Delivering{" "}
            <span className="text-blue-600">Innovative & Scalable</span> Digital Solutions
          </h2>

          {/* Subtext */}
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-normal">
            To create innovative, scalable, and technology-driven software solutions that help businesses grow, transform operations, and succeed in the modern digital era.
          </p>

          {/* 4 Pillars Card List Stack (Compact Single-Screen View) */}
          <div className="w-full space-y-2.5 pt-1">
            {VISION_PILLARS.map((pillar, idx) => (
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
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=1200&auto=format&fit=crop&q=80"
                alt="Indian IT software team in strategic vision planning meeting"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Secondary Floating Overlap Image (Indian Software Professional) */}
            <div className="absolute -bottom-6 -left-2 sm:left-2 w-[70%] sm:w-[64%] z-20 rounded-[1.8rem] shadow-2xl border-4 border-background overflow-hidden aspect-[4/3] bg-muted">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&auto=format&fit=crop&q=80"
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

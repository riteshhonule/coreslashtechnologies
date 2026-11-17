import { useState } from "react";
import { motion } from "framer-motion";

export interface CoreServiceCardProps {
  number: string;
  title: string;
  subtext: string;
  highlight?: string;
  badge?: string;
  darkBg?: boolean;
  blueBg?: boolean;
  delay?: number;
  headingTag?: "h3" | "h4";
}

export const CoreServiceCard = ({
  number,
  title,
  subtext,
  highlight,
  badge,
  darkBg,
  blueBg,
  delay = 0,
  headingTag = "h3"
}: CoreServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const displayHighlight = highlight || badge;
  const isDark = darkBg || isHovered;
  const HeadingTag = headingTag;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, scale: 1.015 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden p-8 md:p-10 rounded-3xl border flex flex-col justify-between transition-all duration-300 cursor-pointer ${
        isDark
          ? "bg-slate-900 text-white border-slate-800 shadow-[0_20px_50px_rgba(59,130,246,0.2)] border-blue-500/50"
          : blueBg
          ? "bg-blue-500/5 text-foreground border-blue-500/20 shadow-sm"
          : "bg-card text-foreground border-border/80 shadow-sm"
      }`}
    >
      {/* Glow highlight effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 pointer-events-none transition-opacity duration-500 ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 relative z-10">
        {/* Large Number with Gradients */}
        <div
          className={`text-6xl md:text-7xl font-bold select-none tracking-tighter shrink-0 transition-all duration-300 ${
            isDark
              ? "text-transparent bg-clip-text bg-gradient-to-b from-white/40 to-white/10 scale-110"
              : blueBg
              ? "text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-blue-300"
              : "text-transparent bg-clip-text bg-gradient-to-b from-slate-300 to-slate-100 dark:from-slate-800 dark:to-slate-900"
          }`}
        >
          {number}
        </div>

        {/* Text Area */}
        <div className="space-y-4 text-left">
          <HeadingTag
            className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
              isDark ? "text-blue-400" : "text-[#3b82f6]"
            }`}
          >
            {title}
          </HeadingTag>
          <p
            className={`text-sm md:text-base leading-relaxed transition-colors duration-300 ${
              isDark ? "text-slate-300" : "text-muted-foreground"
            }`}
          >
            {subtext}
          </p>
        </div>
      </div>

      {/* Highlight Box with Left Accent Vertical Border */}
      {displayHighlight && (
        <div
          className={`mt-8 pl-4 border-l-2 text-left relative z-10 transition-colors duration-300 ${
            isDark ? "border-blue-400" : "border-[#3b82f6]"
          }`}
        >
          <p
            className={`text-xs md:text-sm font-semibold italic transition-colors duration-300 ${
              isDark ? "text-slate-400" : "text-foreground/80"
            }`}
          >
            {displayHighlight}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default function CoreServices() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden">
      {/* Title with left accent vertical border */}
      <div className="flex flex-col items-start gap-4 mb-16">
        <div className="flex items-center">
          <div className="w-[3px] h-6 bg-[#3b82f6] rounded-full mr-3" />
          <span className="text-sm font-semibold uppercase tracking-widest text-[#3b82f6]">
            Core Services – Web Development
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
          Full-Cycle Enterprise Web Development & Engineering
        </h2>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-3xl">
          As an enterprise web application development company, CoreSlash provides custom React and Next.js applications, scalable B2B portals, and high-performance frontend architectures tailored for growing brands and enterprise teams.
        </p>
      </div>

      {/* 2 Column, 2 Row Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CoreServiceCard
          number="01"
          title="Custom React & Next.js Web Applications"
          subtext="Architect modern web applications using React, Next.js, and TypeScript. Engineered for sub-second rendering, modular component structures, and seamless API integrations."
          highlight="Built with modern SSR and static prerendering for optimal Core Web Vitals and search visibility."
          darkBg={true}
          delay={0.1}
        />
        <CoreServiceCard
          number="02"
          title="Enterprise Web Application Engineering & Cloud Portals"
          subtext="Develop robust, high-traffic web applications, B2B customer self-service portals, and role-based administrative dashboards that streamline complex business operations."
          highlight="Enterprise-grade access controls, responsive layouts, and cloud-native hosting deployment."
          delay={0.2}
        />
        <CoreServiceCard
          number="03"
          title="Frontend Architecture & High-Performance User Interfaces"
          subtext="Engineer intuitive, accessible user interfaces built on reusable design systems, Tailwind CSS, and strict TypeScript patterns that enhance user engagement and conversion."
          highlight="Optimized client-side performance, accessible DOM structures, and fluid responsive behavior across all viewports."
          delay={0.3}
        />
        <CoreServiceCard
          number="04"
          title="Scalable Web Application Development"
          subtext="End-to-end full-stack web application delivery, connecting interactive web frontends to scalable backend services, secure authentication workflows, and third-party APIs."
          highlight="Structured REST and GraphQL API consumption with reliable error handling and data security standards."
          blueBg={true}
          delay={0.4}
        />
      </div>
    </section>
  );
}

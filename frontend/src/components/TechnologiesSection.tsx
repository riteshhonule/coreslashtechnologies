"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  SiReact, SiNextdotjs, SiVuedotjs, SiAngular, SiJavascript, SiTypescript,
  SiFlutter, SiSwift, SiKotlin, SiThreedotjs, SiGreensock,
  SiNodedotjs, SiDjango, SiSpringboot, SiPhp, SiLaravel,
  SiDotnet, SiGo, SiRubyonrails, SiKibana,
  SiFigma, SiSketch, SiMarvelapp
} from "react-icons/si";
import { FaJava, FaWindows, FaPalette, FaImage } from "react-icons/fa";

import openaiLogo from "@/assets/tech/coreslash_openai_logo.svg";
import geminiLogo from "@/assets/tech/coreslash_gemini_logo.svg";
import claudeLogo from "@/assets/tech/coreslash_claude_logo.svg";
import n8nLogo from "@/assets/tech/coreslash_n8n_logo.svg";
import makeLogo from "@/assets/tech/coreslash_make_logo.svg";
import clayLogo from "@/assets/tech/coreslash_clay_logo.svg";
import apolloLogo from "@/assets/tech/coreslash_apollo_logo.svg";
import firecrawlLogo from "@/assets/tech/coreslash_firecrawl_logo.svg";
import apifyLogo from "@/assets/tech/coreslash_apify_logo.svg";
import playwrightLogo from "@/assets/tech/coreslash_playwright_logo.svg";
import crawleeLogo from "@/assets/tech/coreslash_crawlee_logo.svg";
import pythonLogo from "@/assets/tech/coreslash_python_logo.svg";
import postgresqlLogo from "@/assets/tech/coreslash_postgresql_logo.svg";
import redisLogo from "@/assets/tech/coreslash_redis_logo.svg";
import bullmqLogo from "@/assets/tech/coreslash_bullmq_logo.svg";
import awsLambdaLogo from "@/assets/tech/coreslash_aws_lambda_logo.svg";
import awsEventBridgeLogo from "@/assets/tech/coreslash_aws_eventbridge_logo.svg";

type TechCategory = 
  | "AI & LLM" 
  | "AUTOMATION" 
  | "AI RESEARCH & DATA" 
  | "ENGINEERING" 
  | "DATA & INFRASTRUCTURE" 
  | "FRONT-END & MOBILE" 
  | "DESIGN";

const CATEGORIES: TechCategory[] = [
  "AI & LLM",
  "AUTOMATION",
  "AI RESEARCH & DATA",
  "ENGINEERING",
  "DATA & INFRASTRUCTURE",
  "FRONT-END & MOBILE",
  "DESIGN"
];

const techData: Record<TechCategory, { name: string; icon: React.ReactNode; color?: string }[]> = {
  "AI & LLM": [
    { name: "OpenAI", icon: <img src={openaiLogo} alt="OpenAI" className="w-8 h-8 object-contain" />, color: "#10A37F" },
    { name: "Google Gemini", icon: <img src={geminiLogo} alt="Google Gemini" className="w-8 h-8 object-contain" />, color: "#1A73E8" },
    { name: "Claude", icon: <img src={claudeLogo} alt="Claude" className="w-8 h-8 object-contain" />, color: "#D97757" },
  ],
  "AUTOMATION": [
    { name: "n8n", icon: <img src={n8nLogo} alt="n8n" className="w-8 h-8 object-contain" />, color: "#EA4B71" },
    { name: "Make", icon: <img src={makeLogo} alt="Make" className="w-8 h-8 object-contain" />, color: "#9333EA" },
  ],
  "AI RESEARCH & DATA": [
    { name: "Clay", icon: <img src={clayLogo} alt="Clay" className="w-8 h-8 object-contain" />, color: "#2563EB" },
    { name: "Apollo", icon: <img src={apolloLogo} alt="Apollo" className="w-8 h-8 object-contain" />, color: "#F97316" },
    { name: "Firecrawl", icon: <img src={firecrawlLogo} alt="Firecrawl" className="w-8 h-8 object-contain" />, color: "#FF4500" },
    { name: "Apify", icon: <img src={apifyLogo} alt="Apify" className="w-8 h-8 object-contain" />, color: "#00C676" },
  ],
  "ENGINEERING": [
    { name: "Python", icon: <img src={pythonLogo} alt="Python" className="w-8 h-8 object-contain" />, color: "#3776AB" },
    { name: "Playwright", icon: <img src={playwrightLogo} alt="Playwright" className="w-8 h-8 object-contain" />, color: "#2EAD33" },
    { name: "Crawlee", icon: <img src={crawleeLogo} alt="Crawlee" className="w-8 h-8 object-contain" />, color: "#FF6B6B" },
    { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
    { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
    { name: "Go", icon: <SiGo />, color: "#00ADD8" },
    { name: "Java", icon: <FaJava />, color: "#007396" },
    { name: "Spring Boot", icon: <SiSpringboot />, color: "#6DB33F" },
    { name: "Django", icon: <SiDjango />, color: "#092E20" },
    { name: "PHP", icon: <SiPhp />, color: "#777BB4" },
    { name: "Laravel", icon: <SiLaravel />, color: "#FF2D20" },
    { name: ".NET", icon: <SiDotnet />, color: "#512BD4" },
    { name: "Ruby on Rails", icon: <SiRubyonrails />, color: "#CC0000" },
  ],
  "DATA & INFRASTRUCTURE": [
    { name: "PostgreSQL", icon: <img src={postgresqlLogo} alt="PostgreSQL" className="w-8 h-8 object-contain" />, color: "#336791" },
    { name: "Redis", icon: <img src={redisLogo} alt="Redis" className="w-8 h-8 object-contain" />, color: "#DC382D" },
    { name: "BullMQ", icon: <img src={bullmqLogo} alt="BullMQ" className="w-8 h-8 object-contain" />, color: "#E11D48" },
    { name: "AWS Lambda", icon: <img src={awsLambdaLogo} alt="AWS Lambda" className="w-8 h-8 object-contain" />, color: "#FF9900" },
    { name: "AWS EventBridge", icon: <img src={awsEventBridgeLogo} alt="AWS EventBridge" className="w-8 h-8 object-contain" />, color: "#FF9900" },
    { name: "Kibana", icon: <SiKibana />, color: "#005571" },
  ],
  "FRONT-END & MOBILE": [
    { name: "React.js", icon: <SiReact />, color: "#61DAFB" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "#000000" },
    { name: "Vue.js", icon: <SiVuedotjs />, color: "#4FC08D" },
    { name: "Angular", icon: <SiAngular />, color: "#DD0031" },
    { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
    { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
    { name: "Flutter", icon: <SiFlutter />, color: "#02569B" },
    { name: "Swift", icon: <SiSwift />, color: "#F05138" },
    { name: "Kotlin", icon: <SiKotlin />, color: "#7F52FF" },
    { name: "Xamarin", icon: <FaWindows />, color: "#3498DB" },
    { name: "Three.js", icon: <SiThreedotjs />, color: "#000000" },
    { name: "GSAP", icon: <SiGreensock />, color: "#88CE02" },
  ],
  "DESIGN": [
    { name: "Figma", icon: <SiFigma />, color: "#F24E1E" },
    { name: "Adobe XD", icon: <FaPalette />, color: "#FF61F6" },
    { name: "Photoshop", icon: <FaImage />, color: "#31A8FF" },
    { name: "Sketch", icon: <SiSketch />, color: "#F2A900" },
    { name: "Marvel", icon: <SiMarvelapp />, color: "#000000" },
  ]
};

export default function TechnologiesSection() {
  const [activeTab, setActiveTab] = useState<TechCategory>("AI & LLM");

  const currentTechs = techData[activeTab];

  return (
    <section className="relative pt-12 md:pt-32 pb-16 md:pb-24 px-6 md:px-12 bg-background border-t border-white/5 overflow-hidden">
      <div className="max-w-[1100px] mx-auto">

        {/* ========================================================
            HEADER
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-[900px] mx-auto mb-16"
        >
          {/* Top Tag */}
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/20">
            <span>Modern Technology Stack</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            Technologies We Use As A <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-rose-500">
              Leading Development Company
            </span>
          </h2>

          <p className="hidden md:block text-slate-500 text-sm md:text-base leading-[1.8] max-w-4xl mx-auto">
            We leverage advanced AI models, intelligent workflow automation tools, data engineering frameworks, and modern cloud infrastructure to build secure, scalable, and high-performance digital solutions tailored to diverse business requirements.
          </p>
        </motion.div>

        {/* ========================================================
            TABS NAVIGATION
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-nowrap overflow-x-auto sm:flex-wrap items-center justify-start sm:justify-center gap-4 md:gap-8 mb-16 border-b border-black/10 dark:border-white/10 pb-4 w-full hide-scrollbar scroll-smooth"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeTab === category;
            return (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={cn(
                  "relative px-3 sm:px-4 py-3 text-sm md:text-base font-medium uppercase tracking-wider transition-colors duration-300 whitespace-nowrap flex-shrink-0",
                  isActive ? "text-blue-600 dark:text-blue-500 font-bold" : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                )}
              >
                {category}
                {isActive && (
                  <motion.div
                    layoutId="activeTechTabIndicator"
                    className="absolute -bottom-[17px] left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* ========================================================
            TECHNOLOGY GRID
            ======================================================== */}
        <div className="min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
            >
              {currentTechs.map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="group relative flex items-center gap-4 p-4 md:p-5 h-[80px] bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)] hover:border-blue-500/50 dark:hover:border-blue-500/50 cursor-pointer transition-all duration-300"
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 text-4xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm"
                    style={{ color: tech.color }}
                  >
                    {tech.icon}
                  </div>
                  <span className="font-medium text-foreground text-sm md:text-base tracking-tight truncate">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}


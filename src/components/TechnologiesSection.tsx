"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  SiReact, SiNextdotjs, SiVuedotjs, SiAngular, SiJavascript, SiTypescript,
  SiFlutter, SiSwift, SiKotlin, SiThreedotjs, SiGreensock,
  SiNodedotjs, SiPython, SiDjango, SiSpringboot, SiPhp, SiLaravel,
  SiDotnet, SiGo, SiRubyonrails, SiKibana,
  SiFigma, SiSketch, SiMarvelapp
} from "react-icons/si";
import { FaJava, FaWindows, FaPalette, FaImage } from "react-icons/fa";

type TechCategory = "FRONT-END" | "BACK-END" | "DESIGN";

const CATEGORIES: TechCategory[] = ["FRONT-END", "BACK-END", "DESIGN"];

const techData: Record<TechCategory, { name: string; icon: React.ReactNode; color: string }[]> = {
  "FRONT-END": [
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
  "BACK-END": [
    { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
    { name: "Python", icon: <SiPython />, color: "#3776AB" },
    { name: "Django", icon: <SiDjango />, color: "#092E20" },
    { name: "Java", icon: <FaJava />, color: "#007396" },
    { name: "Spring Boot", icon: <SiSpringboot />, color: "#6DB33F" },
    { name: "PHP", icon: <SiPhp />, color: "#777BB4" },
    { name: "Laravel", icon: <SiLaravel />, color: "#FF2D20" },
    { name: ".NET", icon: <SiDotnet />, color: "#512BD4" },
    { name: "Go", icon: <SiGo />, color: "#00ADD8" },
    { name: "Ruby on Rails", icon: <SiRubyonrails />, color: "#CC0000" },
    { name: "Kibana", icon: <SiKibana />, color: "#005571" },
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
  const [activeTab, setActiveTab] = useState<TechCategory>("FRONT-END");

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

          <p className="text-slate-500 text-sm md:text-base leading-[1.8] max-w-4xl mx-auto">
            We leverage advanced technologies, modern development frameworks, and industry-leading tools to build secure, scalable, and high-performance digital solutions. Our technology expertise enables us to deliver innovative software, web applications, mobile apps, and enterprise solutions tailored to diverse business requirements.
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
          className="flex flex-wrap items-center justify-center gap-2 md:gap-8 mb-16 border-b border-white/10 pb-4"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeTab === category;
            return (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={cn(
                  "relative px-4 py-3 text-sm md:text-base font-medium uppercase tracking-wider transition-colors duration-300",
                  isActive ? "text-black dark:text-white font-bold" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                {category}
                {isActive && (
                  <motion.div
                    layoutId="activeTechTabIndicator"
                    className="absolute -bottom-[17px] left-0 w-full h-[3px] bg-gradient-to-r from-orange-400 to-rose-400 rounded-t-full"
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
                  className="group relative flex items-center gap-4 p-4 md:p-5 h-[80px] bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_30px_rgba(251,146,60,0.15)] dark:hover:shadow-[0_10px_30px_rgba(251,146,60,0.1)] hover:border-orange-400/50 dark:hover:border-orange-400/50 cursor-pointer transition-all duration-300"
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 text-4xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm"
                    style={{ color: tech.color }}
                  >
                    {tech.icon}
                  </div>
                  <span className="font-bold text-black dark:text-white text-base md:text-lg tracking-tight truncate uppercase">
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

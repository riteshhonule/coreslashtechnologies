import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiVuedotjs, SiAngular, SiJavascript, SiTypescript,
  SiFlutter, SiSwift, SiKotlin, SiThreedotjs, SiGreensock,
  SiNodedotjs, SiPython, SiDjango, SiSpringboot, SiPhp, SiLaravel,
  SiDotnet, SiGo, SiRubyonrails, SiKibana,
  SiFigma, SiSketch, SiMarvelapp
} from "react-icons/si";
import { FaJava, FaWindows, FaPalette, FaImage } from "react-icons/fa";

type TabName = "FRONT-END" | "BACK-END" | "DESIGN";

interface TechItem {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const techData: Record<TabName, TechItem[]> = {
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

export default function TechnologyGrid() {
  const [activeTab, setActiveTab] = useState<TabName>("FRONT-END");
  const tabs: TabName[] = ["FRONT-END", "BACK-END", "DESIGN"];
  const currentTechs = techData[activeTab];

  return (
    <section className="relative w-full pt-16 pb-12 md:pt-20 md:pb-16 border-t border-border/40 overflow-hidden bg-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 w-full text-left">

        {/* Centered Modern Technology Stack Header */}
        <div className="text-center max-w-[900px] mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 mb-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/20">
            <span>Modern Technology Stack</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight text-center">
            Technologies{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              We Use
            </span>
          </h2>

          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-4xl mx-auto font-normal text-center">
            CoreSlash chooses technologies based on project requirements, system stability, scalability, security, and long-term maintainability rather than short-term trends or popularity, ensuring reliable and future-ready digital solutions.
          </p>
        </div>

        {/* Tabs Header */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-12 border-b border-border/40 mb-8 py-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 text-sm md:text-base font-medium tracking-wider transition-colors duration-300 uppercase focus:outline-none ${isActive ? "text-blue-600 dark:text-blue-400 font-bold" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {tab}
                {/* Active Underline Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderlineTechGrid"
                    className="absolute bottom-0 inset-x-0 h-[3px] bg-blue-600 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Grid Layout matching exact styling of image 2 */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
            >
              {currentTechs.map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03, duration: 0.25 }}
                  whileHover={{ y: -4 }}
                  className="group relative flex items-center gap-4 p-4 md:p-5 h-[80px] bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)] hover:border-blue-500/50 dark:hover:border-blue-500/50 cursor-pointer transition-all duration-300"
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm shrink-0"
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

import { useState } from "react";
import { motion } from "framer-motion";

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  sliceIndex: number;
}

const STEPS: ProcessStep[] = [
  {
    id: 1,
    title: "Discovery & Requirement Analysis",
    description: "Align business objectives, technical requirements, project scope, and development timelines for efficient and strategic software implementation.",
    sliceIndex: 1
  },
  {
    id: 2,
    title: "Design & Architecture",
    description: "Convert business requirements into scalable system architecture, structured designs, and user-focused digital solutions.",
    sliceIndex: 2
  },
  {
    id: 3,
    title: "Development & Integration",
    description: "Execute structured software development with seamless integrations, regular project reviews, and continuous quality validations.",
    sliceIndex: 3
  },
  {
    id: 4,
    title: "Testing & Quality Assurance",
    description: "Conduct functional, performance, usability, and security testing to ensure reliable software before deployment.",
    sliceIndex: 4
  },
  {
    id: 5,
    title: "Deployment & Ongoing Support",
    description: "Ensure smooth software deployment followed by maintenance, continuous optimization, updates, and long-term technical support.",
    sliceIndex: 5
  }
];

// Helper to translate degrees to cartesian coordinates
const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
};

// Generates SVG path for a donut segment
const getDescribeDonutSegment = (x: number, y: number, radius: number, innerRadius: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const startInner = polarToCartesian(x, y, innerRadius, endAngle);
  const endInner = polarToCartesian(x, y, innerRadius, startAngle);
  
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    "L", endInner.x, endInner.y,
    "A", innerRadius, innerRadius, 0, largeArcFlag, 1, startInner.x, startInner.y,
    "Z"
  ].join(" ");
};

interface SliceConfig {
  label: string;
  label2?: string;
  number: string;
  start: number;
  end: number;
  color: string;
  hoverColor: string;
}

const SLICES: SliceConfig[] = [
  { label: "TESTING &", label2: "INTEGRATION", number: "5", start: 0, end: 60, color: "#eab308", hoverColor: "#facc15" }, // Yellow
  { label: "MAINTENANCE", number: "6", start: 60, end: 120, color: "#3b82f6", hoverColor: "#60a5fa" }, // Blue
  { label: "PLANNING", number: "1", start: 120, end: 180, color: "#991b1b", hoverColor: "#dc2626" }, // Maroon
  { label: "ANALYSIS", number: "2", start: 180, end: 240, color: "#1e293b", hoverColor: "#334155" }, // Dark Slate
  { label: "DESIGN", number: "3", start: 240, end: 300, color: "#0284c7", hoverColor: "#38bdf8" }, // Ocean Blue
  { label: "IMPLEMENTATION", number: "4", start: 300, end: 360, color: "#0d9488", hoverColor: "#14b8a6" } // Emerald Teal
];

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="w-full max-w-[1440px] mx-auto min-h-[calc(100vh-80px)] flex flex-col justify-center py-6 md:py-8 px-6 md:px-12 rounded-[2.5rem] my-4 bg-gradient-to-br from-[#edf4ff] via-[#f4f7fc] to-[#e8f0fe] dark:from-[#080c1b] dark:via-[#0b1226] dark:to-[#060917] border border-blue-500/20 shadow-2xl relative overflow-hidden">
      
      {/* Background Image Layer with High-Tech Glow & Blending */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-35 mix-blend-luminosity dark:mix-blend-lighten pointer-events-none select-none"
        style={{ backgroundImage: `url('/images/process-bg.png')` }}
      />

      {/* Cybernetic Tech Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f612_1px,transparent_1px),linear-gradient(to_bottom,#3b82f612_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Radial Gradient Vignette Overlay for Crisp Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80 pointer-events-none" />

      {/* Decorative Background Glow Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col justify-center">
        
        {/* Section Title Header */}
        <div className="flex flex-col items-start gap-2 mb-6 sm:mb-8">
          <div className="inline-flex items-center px-4 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-blue-500/20 shadow-sm backdrop-blur-md">
            <div className="w-1.5 h-4.5 bg-[#3b82f6] rounded-full mr-2.5" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200">
              How We Deliver <span className="text-slate-500 font-medium ml-1">(Process & Governance)</span>
            </h3>
          </div>
        </div>

        {/* Two Column Grid fitting single screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full">
          
          {/* Left Column: BIGGER DONUT CIRCLE WHEEL */}
          <div className="lg:col-span-6 flex justify-center items-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="p-5 sm:p-7 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col justify-center items-center max-w-[500px] lg:max-w-[540px] w-full relative overflow-hidden group"
            >
              {/* Subtle inner highlight */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-indigo-500/5 pointer-events-none" />
              
              <svg 
                viewBox="0 0 360 360" 
                className="w-full h-auto max-w-[480px] lg:max-w-[500px] select-none relative z-10 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
              >
                {SLICES.map((slice, index) => {
                  const isHighlighted = activeStep !== null && (
                    (activeStep === 1 && (index === 2 || index === 3)) || // Planning & Analysis
                    (activeStep === 2 && index === 4) || // Design
                    (activeStep === 3 && index === 5) || // Implementation
                    (activeStep === 4 && index === 0) || // Testing
                    (activeStep === 5 && index === 1)    // Maintenance
                  );

                  const midAngle = (slice.start + slice.end) / 2;
                  const textCoords = polarToCartesian(180, 180, 118, midAngle);

                  return (
                    <g key={slice.label} className="cursor-pointer">
                      {/* Donut Segment Path */}
                      <motion.path
                        d={getDescribeDonutSegment(180, 180, 160, 84, slice.start, slice.end)}
                        fill={isHighlighted ? slice.hoverColor : slice.color}
                        stroke="#ffffff"
                        strokeWidth="3.5"
                        animate={{ 
                          scale: isHighlighted ? 1.04 : 1,
                          filter: isHighlighted ? "brightness(1.1) drop-shadow(0 8px 16px rgba(0,0,0,0.2))" : "brightness(1)"
                        }}
                        transition={{ duration: 0.2 }}
                        className="transition-all duration-300 origin-center"
                      />

                      {/* Step Number */}
                      <text
                        x={textCoords.x}
                        y={textCoords.y - 4}
                        fill="#ffffff"
                        fontSize="18"
                        fontWeight="700"
                        textAnchor="middle"
                      >
                        {slice.number}
                      </text>

                      {/* Step Label */}
                      {slice.label2 ? (
                        <>
                          <text
                            x={textCoords.x}
                            y={textCoords.y + 8}
                            fill="#ffffff"
                            fontSize="8.5"
                            fontWeight="700"
                            textAnchor="middle"
                            letterSpacing="0.3"
                          >
                            {slice.label}
                          </text>
                          <text
                            x={textCoords.x}
                            y={textCoords.y + 17}
                            fill="#ffffff"
                            fontSize="8.5"
                            fontWeight="700"
                            textAnchor="middle"
                            letterSpacing="0.3"
                          >
                            {slice.label2}
                          </text>
                        </>
                      ) : (
                        <text
                          x={textCoords.x}
                          y={textCoords.y + 9}
                          fill="#ffffff"
                          fontSize={slice.label.length > 10 ? "8.5" : "9.5"}
                          fontWeight="700"
                          textAnchor="middle"
                          letterSpacing="0.4"
                        >
                          {slice.label}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Inner White Center Circle */}
                <circle cx="180" cy="180" r="82" fill="#ffffff" className="dark:fill-slate-900" />
                <circle cx="180" cy="180" r="76" fill="transparent" stroke="#cbd5e1" strokeWidth="2" className="dark:stroke-slate-800" />
                
                {/* Center Core Text */}
                <text x="180" y="158" textAnchor="middle" fill="#3b82f6" className="dark:fill-blue-400" fontSize="11" fontWeight="700" letterSpacing="1.2">
                  THE
                </text>
                <text x="180" y="175" textAnchor="middle" fill="#0f172a" className="dark:fill-white" fontSize="14" fontWeight="700" letterSpacing="0.6">
                  SOFTWARE
                </text>
                <text x="180" y="190" textAnchor="middle" fill="#0f172a" className="dark:fill-white" fontSize="14" fontWeight="700" letterSpacing="0.6">
                  DEVELOPMENT
                </text>
                <text x="180" y="204" textAnchor="middle" fill="#3b82f6" className="dark:fill-blue-400" fontSize="11" fontWeight="700" letterSpacing="1.2">
                  CYCLE
                </text>
              </svg>
            </motion.div>
          </div>

          {/* Right Column: Timeline Steps fitting single screen */}
          <div className="lg:col-span-6 space-y-3">
            {STEPS.map((step) => {
              const isHovered = activeStep === step.id;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: step.id * 0.06 }}
                  onMouseEnter={() => setActiveStep(step.id)}
                  onMouseLeave={() => setActiveStep(null)}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start gap-3.5 ${
                    isHovered 
                      ? "bg-white dark:bg-slate-900 border-blue-500/40 shadow-lg shadow-blue-500/5 translate-x-2" 
                      : "bg-transparent border-transparent hover:bg-white/60 dark:hover:bg-slate-900/40"
                  }`}
                >
                  {/* Step Number Badge Node */}
                  <div className="relative shrink-0 mt-0.5">
                    <div 
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-xs transition-all duration-300 ${
                        isHovered 
                          ? "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-110 border border-blue-400/50" 
                          : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                      }`}
                    >
                      0{step.id}
                    </div>
                  </div>

                  {/* Content Block */}
                  <div className="text-left space-y-0.5">
                    <h4 className={`text-sm sm:text-base font-bold tracking-tight transition-colors duration-300 ${
                      isHovered ? "text-blue-600 dark:text-blue-400" : "text-slate-900 dark:text-foreground"
                    }`}>
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-xs md:text-sm text-slate-600 dark:text-muted-foreground leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

    </section>
  );
}

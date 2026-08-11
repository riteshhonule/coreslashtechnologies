import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sectionBg from "@/assets/about/coreslash-tech.jpg";

interface StageConfig {
  id: number;
  number: string;
  title: string;
  shortLabel: string;
  description: string;
  color: string;
  hoverColor: string;
  glowColor: string;
  lightBg: string;
  borderColor: string;
  startAngle: number;
  endAngle: number;
  iconPath: string;
}

const STAGES: StageConfig[] = [
  {
    id: 1,
    number: "01",
    title: "Discovery & Requirement Analysis",
    shortLabel: "DISCOVERY",
    description: "Align business objectives, technical requirements, project scope, and development timelines for efficient and strategic software implementation.",
    color: "#e11d48", // Rose Crimson
    hoverColor: "#f43f5e",
    glowColor: "rgba(225, 29, 72, 0.4)",
    lightBg: "rgba(225, 29, 72, 0.07)",
    borderColor: "rgba(225, 29, 72, 0.35)",
    startAngle: 0,
    endAngle: 72,
    iconPath: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35"
  },
  {
    id: 2,
    number: "02",
    title: "Design & Architecture",
    shortLabel: "DESIGN",
    description: "Convert business requirements into scalable system architecture, structured designs, and user-focused digital solutions.",
    color: "#0284c7", // Ocean Blue
    hoverColor: "#38bdf8",
    glowColor: "rgba(2, 132, 199, 0.4)",
    lightBg: "rgba(2, 132, 199, 0.07)",
    borderColor: "rgba(2, 132, 199, 0.35)",
    startAngle: 72,
    endAngle: 144,
    iconPath: "M3 3h18v18H3z M3 9h18 M9 21V9"
  },
  {
    id: 3,
    number: "03",
    title: "Development & Integration",
    shortLabel: "DEVELOPMENT",
    description: "Execute structured software development with seamless integrations, regular project reviews, and continuous quality validations.",
    color: "#0d9488", // Emerald Teal
    hoverColor: "#2dd4bf",
    glowColor: "rgba(13, 148, 136, 0.4)",
    lightBg: "rgba(13, 148, 136, 0.07)",
    borderColor: "rgba(13, 148, 136, 0.35)",
    startAngle: 144,
    endAngle: 216,
    iconPath: "m18 16 4-4-4-4 M6 8l-4 4 4 4 M14.5 4l-5 16"
  },
  {
    id: 4,
    number: "04",
    title: "Testing & Quality Assurance",
    shortLabel: "TESTING",
    description: "Conduct functional, performance, usability, and security testing to ensure reliable software before deployment.",
    color: "#eab308", // Amber Gold
    hoverColor: "#facc15",
    glowColor: "rgba(234, 179, 8, 0.4)",
    lightBg: "rgba(234, 179, 8, 0.07)",
    borderColor: "rgba(234, 179, 8, 0.35)",
    startAngle: 216,
    endAngle: 288,
    iconPath: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4"
  },
  {
    id: 5,
    number: "05",
    title: "Deployment & Ongoing Support",
    shortLabel: "DEPLOYMENT",
    description: "Ensure smooth software deployment followed by maintenance, continuous optimization, updates, and long-term technical support.",
    color: "#3b82f6", // Royal Blue
    hoverColor: "#60a5fa",
    glowColor: "rgba(59, 130, 246, 0.4)",
    lightBg: "rgba(59, 130, 246, 0.07)",
    borderColor: "rgba(59, 130, 246, 0.35)",
    startAngle: 288,
    endAngle: 360,
    iconPath: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.79-1.81.2-2.71l-3.2-3.2c-.9-.59-2-.51-2.7.2z M12 15l-3-3 M15 9l-3-3 M9 18l3 3 M16.5 4.5a7.5 7.5 0 0 1 3 3l-4.5 4.5-3-3 4.5-4.5z"
  }
];

// Translate polar coordinates to cartesian (SVG centered at 180, 180)
const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180.0);
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
};

// Generates precise SVG donut segment path with tiny gap separation
const getDescribeDonutSegment = (
  x: number,
  y: number,
  radius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number
) => {
  const gapDegrees = 1.2;
  const sAngle = startAngle + gapDegrees;
  const eAngle = endAngle - gapDegrees;

  const start = polarToCartesian(x, y, radius, eAngle);
  const end = polarToCartesian(x, y, radius, sAngle);
  const startInner = polarToCartesian(x, y, innerRadius, eAngle);
  const endInner = polarToCartesian(x, y, innerRadius, sAngle);

  const largeArcFlag = eAngle - sAngle <= 180 ? "0" : "1";

  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    "L", endInner.x, endInner.y,
    "A", innerRadius, innerRadius, 0, largeArcFlag, 1, startInner.x, startInner.y,
    "Z"
  ].join(" ");
};

export default function ProcessTimeline() {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  const activeStageData = STAGES.find((s) => s.id === activeStage);

  return (
    <section className="w-full max-w-[1440px] mx-auto min-h-[calc(100vh-80px)] flex flex-col justify-center py-8 md:py-12 px-6 md:px-12 rounded-[2.5rem] my-4 bg-slate-950 text-white border border-slate-800/80 shadow-2xl relative overflow-hidden">
      {/* Subtle Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-overlay pointer-events-none select-none"
        style={{ backgroundImage: `url(${sectionBg})` }}
      />

      {/* Cybernetic Tech Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f615_1px,transparent_1px),linear-gradient(to_bottom,#3b82f615_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Soft Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-slate-950/90 pointer-events-none" />

      {/* Background Ambient Glow Orbs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: activeStageData ? `${activeStageData.color}20` : "rgba(59,130,246,0.15)" }}
      />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col justify-center">
        {/* Section Title Header */}
        <div className="flex flex-col items-start gap-2 mb-6 sm:mb-8">
          <div className="inline-flex items-center px-4 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm backdrop-blur-md">
            <div
              className="w-2 h-4.5 rounded-full mr-2.5 transition-colors duration-500"
              style={{ backgroundColor: activeStageData ? activeStageData.color : "#3b82f6" }}
            />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-100">
              How We Deliver <span className="text-slate-400 font-medium ml-1">(Process & Governance)</span>
            </h3>
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          {/* ========================================================
              LEFT COLUMN — PREMIUM INTERACTIVE PROCESS WHEEL
              ======================================================== */}
          <div className="lg:col-span-6 flex justify-center items-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="p-2 sm:p-4 flex flex-col justify-center items-center max-w-[480px] lg:max-w-[520px] w-full relative overflow-hidden group"
            >
              <svg
                viewBox="0 0 360 360"
                className="w-full h-auto max-w-[460px] lg:max-w-[490px] select-none relative z-10 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
              >
                <defs>
                  {/* Subtle radial inner glow */}
                  <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={activeStageData ? activeStageData.color : "#3b82f6"} stopOpacity="0.3" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Outer Rotating Cyber Ring */}
                <motion.circle
                  cx="180"
                  cy="180"
                  r="174"
                  fill="none"
                  stroke={activeStageData ? activeStageData.color : "rgba(59, 130, 246, 0.35)"}
                  strokeWidth="1.2"
                  strokeDasharray="4 8"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
                  style={{ transformOrigin: "180px 180px" }}
                  className="transition-colors duration-500"
                />

                {/* Outer Solid Guide Orbit */}
                <circle cx="180" cy="180" r="168" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />

                {/* Glowing Traveling Orbit Dot */}
                <motion.circle
                  cx="180"
                  cy="180"
                  r="174"
                  fill="none"
                  stroke={activeStageData ? activeStageData.color : "#3b82f6"}
                  strokeWidth="3"
                  strokeDasharray="20 1060"
                  strokeLinecap="round"
                  animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                  style={{ transformOrigin: "180px 180px" }}
                  className="transition-colors duration-500 filter drop-shadow-[0_0_8px_currentColor]"
                />

                {/* 5 STAGE CIRCULAR SEGMENTS */}
                {STAGES.map((stage) => {
                  const isHighlighted = activeStage === stage.id;
                  const isAnyActive = activeStage !== null;
                  const isSubdued = isAnyActive && !isHighlighted;

                  const midAngle = (stage.startAngle + stage.endAngle) / 2;
                  const rad = ((midAngle - 90) * Math.PI) / 180;

                  // 7px outward shift vector for active segment
                  const shiftAmount = isHighlighted ? 7 : 0;
                  const shiftX = Math.cos(rad) * shiftAmount;
                  const shiftY = Math.sin(rad) * shiftAmount;

                  const textCoords = polarToCartesian(180, 180, 122, midAngle);

                  return (
                    <g
                      key={stage.id}
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => setActiveStage(isHighlighted ? null : stage.id)}
                      onMouseEnter={() => setActiveStage(stage.id)}
                      onMouseLeave={() => setActiveStage(null)}
                      style={{
                        transform: `translate(${shiftX}px, ${shiftY}px)`,
                        transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease"
                      }}
                    >
                      {/* Donut Segment Path */}
                      <path
                        d={getDescribeDonutSegment(180, 180, 160, 84, stage.startAngle, stage.endAngle)}
                        fill={isHighlighted ? stage.hoverColor : stage.color}
                        stroke="#090d16"
                        strokeWidth="3"
                        opacity={isSubdued ? 0.55 : 1}
                        style={{
                          filter: isHighlighted
                            ? `brightness(1.15) drop-shadow(0 0 16px ${stage.glowColor})`
                            : "brightness(1)",
                          transition: "fill 0.3s ease, filter 0.3s ease, opacity 0.3s ease"
                        }}
                      />

                      {/* Icon */}
                      <g
                        transform={`translate(${textCoords.x - 9}, ${textCoords.y - 20}) scale(0.75)`}
                        style={{
                          color: "#ffffff",
                          opacity: isSubdued ? 0.6 : 1,
                          transition: "opacity 0.3s ease"
                        }}
                      >
                        <path
                          d={stage.iconPath}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>

                      {/* Step Short Label */}
                      <text
                        x={textCoords.x}
                        y={textCoords.y + 12}
                        fill="#ffffff"
                        fontSize="8.5"
                        fontWeight="800"
                        textAnchor="middle"
                        letterSpacing="0.8"
                        opacity={isSubdued ? 0.65 : 0.95}
                      >
                        {stage.shortLabel}
                      </text>
                    </g>
                  );
                })}

                {/* Center Radial Glow Backdrop */}
                <circle cx="180" cy="180" r="82" fill="url(#centerGlow)" />

                {/* Center Breathing Glow Ring */}
                <motion.circle
                  cx="180"
                  cy="180"
                  animate={{ r: [80, 84, 80], opacity: [0.35, 0.75, 0.35] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  fill="none"
                  stroke={activeStageData ? activeStageData.color : "#3b82f6"}
                  strokeWidth="2"
                  className="transition-colors duration-500"
                />

                {/* Center Dark Circle */}
                <circle
                  cx="180"
                  cy="180"
                  r="78"
                  fill="#090d16"
                  className="transition-colors duration-500"
                />
                <circle
                  cx="180"
                  cy="180"
                  r="74"
                  fill="transparent"
                  stroke={activeStageData ? activeStageData.borderColor : "rgba(51, 65, 85, 0.6)"}
                  strokeWidth="1.5"
                  className="transition-colors duration-500"
                />

                {/* Center Core Typography */}
                <text
                  x="180"
                  y="156"
                  textAnchor="middle"
                  fill={activeStageData ? activeStageData.color : "#3b82f6"}
                  className="transition-colors duration-500"
                  fontSize="10"
                  fontWeight="700"
                  letterSpacing="1.8"
                >
                  THE
                </text>
                <text
                  x="180"
                  y="173"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="13"
                  fontWeight="800"
                  letterSpacing="0.8"
                >
                  SOFTWARE
                </text>
                <text
                  x="180"
                  y="189"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="13"
                  fontWeight="800"
                  letterSpacing="0.8"
                >
                  DEVELOPMENT
                </text>
                <text
                  x="180"
                  y="204"
                  textAnchor="middle"
                  fill={activeStageData ? activeStageData.color : "#3b82f6"}
                  className="transition-colors duration-500"
                  fontSize="10"
                  fontWeight="700"
                  letterSpacing="1.8"
                >
                  CYCLE
                </text>
              </svg>
            </motion.div>
          </div>

          {/* ========================================================
              RIGHT COLUMN — ANIMATED TIMELINE CARDS (SYNCHRONIZED)
              ======================================================== */}
          <div className="lg:col-span-6 relative pl-4 sm:pl-6 space-y-4">
            {/* Background Vertical Timeline Track Line */}
            <div className="absolute left-[34px] sm:left-[42px] top-6 bottom-6 w-1 bg-slate-800/80 rounded-full" />

            {/* Active Traveling Progress Line */}
            <motion.div
              className="absolute left-[34px] sm:left-[42px] top-6 w-1 rounded-full transition-all duration-500"
              style={{
                height: activeStage ? `${((activeStage - 1) / 4) * 82 + 5}%` : "0%",
                backgroundColor: activeStageData ? activeStageData.color : "#3b82f6",
                boxShadow: activeStageData ? `0 0 12px ${activeStageData.glowColor}` : "none"
              }}
            />

            {/* Glowing Traveling Dot on Track */}
            <AnimatePresence>
              {activeStage && activeStageData && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute left-[30px] sm:left-[38px] w-3 h-3 rounded-full z-20 transition-all duration-500 border-2 border-slate-950"
                  style={{
                    top: `calc(${((activeStage - 1) / 4) * 82 + 5}% + 14px)`,
                    backgroundColor: activeStageData.color,
                    boxShadow: `0 0 14px ${activeStageData.color}`
                  }}
                />
              )}
            </AnimatePresence>

            {/* 5 TIMELINE STAGE CARDS */}
            {STAGES.map((stage) => {
              const isHovered = activeStage === stage.id;

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  onViewportEnter={() => {
                    if (activeStage === null) {
                      setActiveStage(stage.id);
                    }
                  }}
                  transition={{ duration: 0.4, delay: stage.id * 0.05 }}
                  onMouseEnter={() => setActiveStage(stage.id)}
                  onMouseLeave={() => setActiveStage(null)}
                  onClick={() => setActiveStage(isHovered ? null : stage.id)}
                  className="relative flex items-start gap-4 p-4 sm:p-4.5 rounded-2xl border transition-all duration-300 cursor-pointer select-none backdrop-blur-md"
                  style={{
                    backgroundColor: isHovered ? stage.lightBg : "rgba(15, 23, 42, 0.75)",
                    borderColor: isHovered ? stage.color : "rgba(51, 65, 85, 0.5)",
                    boxShadow: isHovered
                      ? `0 10px 28px ${stage.glowColor}, 0 0 0 1px ${stage.borderColor}`
                      : "0 4px 20px rgba(0,0,0,0.3)",
                    transform: isHovered ? "translateX(10px) scale(1.015)" : "translateX(0px) scale(1)"
                  }}
                >
                  {/* Step Node Badge */}
                  <div className="relative shrink-0 z-10 mt-0.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xs transition-all duration-300 border"
                      style={{
                        backgroundColor: isHovered ? stage.color : "rgba(30, 41, 59, 0.8)",
                        color: isHovered ? "#ffffff" : stage.color,
                        borderColor: isHovered ? stage.color : "rgba(51, 65, 85, 0.6)",
                        boxShadow: isHovered ? `0 0 16px ${stage.glowColor}` : "none",
                        transform: isHovered ? "scale(1.1)" : "scale(1)"
                      }}
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={stage.iconPath} />
                      </svg>
                    </div>
                  </div>

                  {/* Card Content Block */}
                  <div className="text-left space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className="text-sm sm:text-base font-extrabold tracking-tight transition-colors duration-300 text-white"
                        style={{ color: isHovered ? stage.color : "#ffffff" }}
                      >
                        {stage.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {stage.description}
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

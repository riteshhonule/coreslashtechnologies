import { useState } from "react";
import { motion } from "framer-motion";
import { Link2, Target, Compass, CheckCircle2 } from "lucide-react";

export default function EngagementModels() {
  const [activeModel, setActiveModel] = useState<string>("dedicated");

  return (
    <section className="relative w-full max-w-[1440px] mx-auto py-16 md:py-24 px-6 md:px-12 lg:px-20 border-t border-border/40 overflow-hidden bg-background">
      
      {/* Background Ambient Grid & Radial Tech Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[480px] h-[480px] bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-cyan-500/15 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Inline styles for orbital rotation */}
      <style>{`
        @keyframes orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes counter-orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        .animate-orbit {
          animation: orbit 45s linear infinite;
        }
        .animate-counter-orbit {
          animation: counter-orbit 45s linear infinite;
        }
      `}</style>

      {/* Right straight vertical accent strips */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 flex gap-2.5 opacity-60 pointer-events-none select-none z-0">
        <div className="w-2.5 h-96 rounded-l-full bg-[#3b82f6] dark:bg-blue-500 shadow-[0_0_20px_#3b82f6]" />
        <div className="w-2.5 h-80 rounded-l-full bg-[#3b82f6]/40 dark:bg-blue-500/40" />
        <div className="w-2.5 h-64 rounded-l-full bg-[#3b82f6]/20 dark:bg-blue-600/30" />
      </div>

      {/* Centered Content Container */}
      <div className="relative z-10 w-full flex flex-col justify-center">
        
        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full">
          
          {/* Left Column: Heading & Interactive Model Detail */}
          <div className="lg:col-span-6 text-left space-y-6">
            {/* Top Header Accent Line & Title */}
            <div className="flex items-center">
              <div className="w-[3px] h-6 bg-blue-600 rounded-full mr-3" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                ENGAGEMENT MODELS
              </h3>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
              Exploring Different{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent block mt-1">
                Engagement Models
              </span>{" "}
              In Modern Software Development
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              We offer client-aligned partnership structures tailored to your project scope, engineering scale, and release timelines.
            </p>

            {/* Interactive Model Info Card */}
            <motion.div
              key={activeModel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md shadow-lg shadow-blue-500/5 space-y-3 max-w-xl"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  {activeModel === "dedicated" && <Link2 className="w-5 h-5" />}
                  {activeModel === "hourly" && <Target className="w-5 h-5" />}
                  {activeModel === "fixed" && <Compass className="w-5 h-5" />}
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-foreground">
                    {activeModel === "dedicated" && "Dedicated Engineering Team"}
                    {activeModel === "hourly" && "Hourly Consultation & Advisory"}
                    {activeModel === "fixed" && "Fixed Scope Project Delivery"}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
                    {activeModel === "dedicated" && "Full-time software engineers, UI designers, and project managers working as a seamless extension of your organization."}
                    {activeModel === "hourly" && "Flexible access to senior solutions architects for code reviews, technical audits, and high-impact advisory sprints."}
                    {activeModel === "fixed" && "Defined deliverables, milestones, and predictable budget requirements for well-scoped software releases."}
                  </p>
                </div>
              </div>

              {/* Highlights Pill Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {activeModel === "dedicated" && (
                  <>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Agile Sprints
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Full Time Alignment
                    </span>
                  </>
                )}
                {activeModel === "hourly" && (
                  <>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[11px] font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Pay As You Go
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[11px] font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Senior Architect Access
                    </span>
                  </>
                )}
                {activeModel === "fixed" && (
                  <>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Guaranteed Milestones
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Predictable Budget
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Orbital Wheel Graphic */}
          <div className="lg:col-span-6 flex justify-center items-center w-full py-4">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] flex items-center justify-center">
              
              {/* Concentric Background Guide Rings */}
              <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-blue-500/20 pointer-events-none hidden sm:block" />
              <div className="absolute w-[260px] h-[260px] rounded-full border border-dashed border-indigo-500/20 pointer-events-none" />

              {/* Ambient Glow behind Orbit Wheel */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-blue-500/20 via-indigo-500/15 to-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Orbit Circle Path (Wheel Rolling - Preserved) */}
              <div className="absolute inset-0 rounded-full border-2 border-[#3b82f6]/40 dark:border-blue-400/50 shadow-[0_0_40px_rgba(59,130,246,0.15)] animate-orbit flex items-center justify-center">
                
                {/* Node 1: Top (Dedicated Development Team) */}
                <div className="absolute left-[50%] top-[0%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="animate-counter-orbit flex flex-col items-center gap-2">
                    <motion.div 
                      whileHover={{ scale: 1.15 }}
                      onClick={() => setActiveModel("dedicated")}
                      className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-white dark:bg-slate-900 border-2 shadow-xl flex items-center justify-center cursor-pointer transition-all ${
                        activeModel === "dedicated" ? "border-[#3b82f6] shadow-blue-500/40 scale-110 ring-4 ring-blue-500/20" : "border-slate-300 dark:border-slate-700"
                      }`}
                    >
                      <Link2 className="w-8 h-8 text-[#3b82f6]" />
                    </motion.div>
                    <span className="text-[10px] sm:text-xs font-bold tracking-tight text-foreground text-center max-w-[120px] leading-tight select-none uppercase bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 rounded-full border border-border/80 shadow-md">
                      Dedicated Team
                    </span>
                  </div>
                </div>

                {/* Node 2: Bottom Right (Hourly Consultation Based) */}
                <div className="absolute left-[93.3%] top-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="animate-counter-orbit flex flex-col items-center gap-2">
                    <motion.div 
                      whileHover={{ scale: 1.15 }}
                      onClick={() => setActiveModel("hourly")}
                      className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-white dark:bg-slate-900 border-2 shadow-xl flex items-center justify-center cursor-pointer transition-all ${
                        activeModel === "hourly" ? "border-cyan-500 shadow-cyan-500/40 scale-110 ring-4 ring-cyan-500/20" : "border-slate-300 dark:border-slate-700"
                      }`}
                    >
                      <Target className="w-8 h-8 text-cyan-500" />
                    </motion.div>
                    <span className="text-[10px] sm:text-xs font-bold tracking-tight text-foreground text-center max-w-[120px] leading-tight select-none uppercase bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 rounded-full border border-border/80 shadow-md">
                      Hourly Consultation
                    </span>
                  </div>
                </div>

                {/* Node 3: Bottom Left (Fixed Scope Engagement) */}
                <div className="absolute left-[6.7%] top-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="animate-counter-orbit flex flex-col items-center gap-2">
                    <motion.div 
                      whileHover={{ scale: 1.15 }}
                      onClick={() => setActiveModel("fixed")}
                      className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-white dark:bg-slate-900 border-2 shadow-xl flex items-center justify-center cursor-pointer transition-all ${
                        activeModel === "fixed" ? "border-emerald-500 shadow-emerald-500/40 scale-110 ring-4 ring-emerald-500/20" : "border-slate-300 dark:border-slate-700"
                      }`}
                    >
                      <Compass className="w-8 h-8 text-emerald-500" />
                    </motion.div>
                    <span className="text-[10px] sm:text-xs font-bold tracking-tight text-foreground text-center max-w-[120px] leading-tight select-none uppercase bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 rounded-full border border-border/80 shadow-md">
                      Fixed Scope
                    </span>
                  </div>
                </div>

              </div>

              {/* Center Core Circle */}
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-white/95 dark:bg-slate-900/95 border-2 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)] flex flex-col items-center justify-center text-center p-2 z-10 pointer-events-none backdrop-blur-md">
                <span className="text-[10px] font-semibold tracking-widest text-[#3b82f6] uppercase">CORE</span>
                <span className="text-sm font-bold text-foreground uppercase tracking-wider">ENGAGEMENT</span>
                <span className="text-[10px] font-medium text-muted-foreground uppercase">MODELS</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

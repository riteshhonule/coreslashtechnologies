import { useState } from "react";
import { motion } from "framer-motion";
import { Link2, Target, Compass, CheckCircle2 } from "lucide-react";
import sectionBg from "@/assets/about/coreslash-technologies-team-working.avif";

export default function EngagementModels() {
  const [activeModel, setActiveModel] = useState<string>("dedicated");

  return (
    <div className="w-full bg-background border-t border-border/40">

      {/* Standalone Section Heading Block (Outside background image & section container) */}
      <div className="max-w-[1440px] mx-auto pt-16 md:pt-24 pb-8 md:pb-12 px-6 md:px-12 lg:px-20 text-center">
        <div className="text-center max-w-[900px] mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 mb-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/25">
            <span>Engagement Models</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-4 leading-tight text-center">
            Flexible Ways to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Build, Scale & Deliver
            </span>{" "}
            Software
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal text-center">
            Client-aligned partnership structures tailored to your project scope, engineering scale, and release timelines.
          </p>
        </div>
      </div>

      {/* Existing Engagement Models Section (completely unchanged) */}
      <section className="relative w-full max-w-[1440px] mx-auto py-12 md:py-20 px-6 md:px-12 lg:px-20 overflow-hidden bg-background">

        {/* Background Ambient Grid & Radial Tech Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

        {/* Subtle Professional Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.50] dark:opacity-[0.20] mix-blend-luminosity dark:mix-blend-lighten pointer-events-none select-none"
          style={{ backgroundImage: `url(${sectionBg})` }}
        />

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

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl font-normal text-slate-800 dark:text-slate-300">
                CoreSlash offers client-aligned partnership structures tailored to your project scope, engineering scale, and release timelines.
              </p>

              {/* Interactive Model Info Card */}
              <motion.div
                key={activeModel}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-md shadow-xl shadow-slate-950/20 space-y-3 max-w-xl"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                    {activeModel === "dedicated" && <Link2 className="w-5 h-5" />}
                    {activeModel === "hourly" && <Target className="w-5 h-5" />}
                    {activeModel === "fixed" && <Compass className="w-5 h-5" />}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-white">
                      {activeModel === "dedicated" && "Dedicated Engineering Team"}
                      {activeModel === "hourly" && "Hourly Consultation & Advisory"}
                      {activeModel === "fixed" && "Fixed Scope Project Delivery"}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
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
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[11px] font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-blue-400" /> Agile Sprints
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[11px] font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-blue-400" /> Full Time Alignment
                      </span>
                    </>
                  )}
                  {activeModel === "hourly" && (
                    <>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-cyan-400" /> Pay As You Go
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-cyan-400" /> Senior Architect Access
                      </span>
                    </>
                  )}
                  {activeModel === "fixed" && (
                    <>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Guaranteed Milestones
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Predictable Budget
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
                        className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-white dark:bg-slate-900 border-2 shadow-xl flex items-center justify-center cursor-pointer transition-all ${activeModel === "dedicated" ? "border-[#3b82f6] shadow-blue-500/40 scale-110 ring-4 ring-blue-500/20" : "border-slate-300 dark:border-slate-700"
                          }`}
                      >
                        <Link2 className="w-8 h-8 text-[#3b82f6]" />
                      </motion.div>
                      <span className="text-[10px] sm:text-xs font-bold tracking-tight text-slate-800 dark:text-white text-center max-w-[120px] leading-tight select-none uppercase bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-md">
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
                        className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-white dark:bg-slate-900 border-2 shadow-xl flex items-center justify-center cursor-pointer transition-all ${activeModel === "hourly" ? "border-cyan-500 shadow-cyan-500/40 scale-110 ring-4 ring-cyan-500/20" : "border-slate-300 dark:border-slate-700"
                          }`}
                      >
                        <Target className="w-8 h-8 text-cyan-500" />
                      </motion.div>
                      <span className="text-[10px] sm:text-xs font-bold tracking-tight text-slate-800 dark:text-white text-center max-w-[120px] leading-tight select-none uppercase bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-md">
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
                        className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-white dark:bg-slate-900 border-2 shadow-xl flex items-center justify-center cursor-pointer transition-all ${activeModel === "fixed" ? "border-emerald-500 shadow-emerald-500/40 scale-110 ring-4 ring-emerald-500/20" : "border-slate-300 dark:border-slate-700"
                          }`}
                      >
                        <Compass className="w-8 h-8 text-emerald-500" />
                      </motion.div>
                      <span className="text-[10px] sm:text-xs font-bold tracking-tight text-slate-800 dark:text-white text-center max-w-[120px] leading-tight select-none uppercase bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-md">
                        Fixed Scope
                      </span>
                    </div>
                  </div>

                </div>

                {/* Center Core Circle */}
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-white/95 dark:bg-slate-900/95 border-2 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)] flex flex-col items-center justify-center text-center p-2 z-10 pointer-events-none backdrop-blur-md">
                  <span className="text-[10px] font-semibold tracking-widest text-[#3b82f6] uppercase">CORE</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">ENGAGEMENT</span>
                  <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 uppercase">MODELS</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

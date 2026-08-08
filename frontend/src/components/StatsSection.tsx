import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star, ShieldCheck, Briefcase, Headphones, Users, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountUpProps {
  end: number;
  suffix?: string;
  decimals?: number;
}

const CountUp: React.FC<CountUpProps> = ({ end, suffix = "", decimals = 0 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);

  const spring = useSpring(count, {
    stiffness: 40,
    damping: 15,
    mass: 0.8
  });

  const display = useTransform(spring, (current) =>
    current.toFixed(decimals) + suffix
  );

  useEffect(() => {
    if (isInView) {
      count.set(end);
    }
  }, [isInView, count, end]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const STATS = [
  { value: 99.9, decimals: 1, suffix: "%", label: "Uptime Guaranteed", description: "High availability for all enterprise platforms", icon: ShieldCheck },
  { value: 50, decimals: 0, suffix: "+", label: "Projects Delivered", description: "Successfully shipped high-scale applications", icon: Briefcase },
  { value: 24, decimals: 0, suffix: "/7", label: "Technical Support", description: "Round-the-clock expert assistance", icon: Headphones },
  { value: 15, decimals: 0, suffix: "+", label: "Happy Clients", description: "Long-term partnership success worldwide", icon: Users },
  { value: 10, decimals: 0, suffix: "+", label: "AI Solutions Built", description: "Next-generation intelligent software systems", icon: Bot }
];

export const StatsSection: React.FC = () => {
  const duplicatedStats = [...STATS, ...STATS];

  return (
    <section className="relative pt-24 pb-24 overflow-hidden bg-[#FAFBFF]">
      {/* Premium Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 mb-16">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-sm font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Star className="w-4 h-4" />
              <span>Trusted Performance</span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-5"
          >
            Numbers That Build Trust
          </motion.h2>
        </div>
      </div>

      {/* Horizontal Marquee */}
      <div className="relative w-full overflow-hidden scroller-mask">
        <div 
          className="flex w-max gap-6 px-4 py-8 animate-scroll-horizontal hover:[animation-play-state:paused]" 
          style={{ "--scroll-duration": "45s" } as React.CSSProperties}
        >
          {duplicatedStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative flex-shrink-0 w-[95vw] sm:w-[420px] min-h-[220px] sm:min-h-[auto] overflow-hidden flex items-center gap-5 sm:gap-6 p-6 sm:p-6 rounded-[24px] border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)] hover:-translate-y-2 transition-all duration-300 cursor-default"
              >
                {/* Background Image with Blur */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 blur-[24px] scale-110 pointer-events-none transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800')` }}
                />
                
                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 to-[#0a1128]/90 pointer-events-none" />
                
                {/* Subtle Hover Glow Outline */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen" />
                
                {/* Left Side: Icon + Number */}
                <div className="relative z-10 flex flex-col items-center justify-center min-w-[110px] sm:min-w-[120px] pr-5 sm:pr-6 border-r border-slate-700/60 group-hover:border-blue-500/50 transition-colors duration-300">
                  <div className="w-14 h-14 sm:w-12 sm:h-12 rounded-2xl bg-slate-800/80 text-blue-400 flex items-center justify-center mb-3 sm:mb-3 shadow-inner group-hover:scale-110 transition-transform duration-300 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-indigo-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                    <Icon className="w-7 h-7 sm:w-6 sm:h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-3xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors">
                    <CountUp end={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                  </h3>
                </div>

                {/* Right Side: Title + Description */}
                <div className="relative z-10 flex flex-col justify-center gap-2 sm:gap-1.5 flex-1">
                  <h4 className="text-lg sm:text-lg font-bold text-slate-100 tracking-tight group-hover:text-white transition-colors">
                    {stat.label}
                  </h4>
                  <p className="text-sm sm:text-sm font-medium text-slate-400 leading-snug group-hover:text-slate-300 transition-colors">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star, ShieldCheck, Briefcase, Headphones, Users, Bot } from "lucide-react";

interface CountUpProps {
  end: number;
  suffix?: string;
  decimals?: number;
}

const CountUp: React.FC<CountUpProps> = ({ end, suffix = "", decimals = 0 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);

  // Use spring for a very smooth deceleration
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
  { value: 99.9, decimals: 1, suffix: "%", label: "Uptime Guaranteed", icon: ShieldCheck },
  { value: 50, decimals: 0, suffix: "+", label: "Projects Delivered", icon: Briefcase },
  { value: 24, decimals: 0, suffix: "/7", label: "Technical Support", icon: Headphones },
  { value: 15, decimals: 0, suffix: "+", label: "Happy Clients", icon: Users },
  { value: 10, decimals: 0, suffix: "+", label: "AI Solutions Built", icon: Bot }
];

export const StatsSection: React.FC = () => {
  return (
    <section className="relative pt-16 md:pt-24 pb-24 overflow-hidden bg-[#FAFBFF]">
      {/* Premium Background Gradients */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-500/10 blur-[120px] rounded-full pointer-events-none translate-x-1/4 translate-y-1/4" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-sm font-semibold text-white shadow-lg shadow-blue-500/20">
              <Star className="w-4 h-4" />
              <span>Trusted Performance</span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-black mb-5"
          >
            Numbers That Build Trust
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-slate-500 text-lg leading-relaxed"
          >
            Delivering reliable digital solutions with measurable results,<br className="hidden md:block" /> enterprise-grade performance, and continuous support.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -10, scale: 1.08 }}
                className="group relative overflow-hidden flex flex-col items-center justify-center p-6 h-56 rounded-[24px] bg-white/60 backdrop-blur-2xl border border-black/15 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] hover:border-black/40 transition-all duration-500"
              >
                {/* Glossy Liquid Glass Shine */}
                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/80 to-transparent pointer-events-none opacity-50" />

                {/* Animated Shine Sweep on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 bg-gradient-to-tr from-transparent via-white/90 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] pointer-events-none" />

                <div className="relative z-10 w-10 h-10 rounded-full bg-blue-50/80 text-blue-600 flex items-center justify-center mb-4 shadow-inner border border-white">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>

                <h3 className="relative z-10 text-3xl md:text-4xl font-bold tracking-tight text-black drop-shadow-sm group-hover:scale-105 transition-transform duration-500">
                  <CountUp end={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                </h3>

                <div className="relative z-10 w-6 h-[2px] bg-slate-200 my-3 group-hover:bg-blue-300 transition-colors duration-500" />

                <p className="relative z-10 text-[11px] font-bold text-slate-600 tracking-wider text-center uppercase group-hover:text-blue-900 transition-colors duration-500">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

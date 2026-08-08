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
}

export const CoreServiceCard = ({ number, title, subtext, highlight, badge, darkBg, blueBg, delay = 0 }: CoreServiceCardProps) => {
  const displayHighlight = highlight || badge;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, scale: 1.015 }}
      className={`group relative overflow-hidden p-8 md:p-10 rounded-3xl border flex flex-col justify-between transition-all duration-300 cursor-pointer ${darkBg
          ? "bg-slate-900 text-white border-slate-800 shadow-xl hover:border-blue-500/50 hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)]"
          : blueBg
            ? "bg-blue-500/5 text-foreground border-blue-500/20 shadow-sm hover:border-blue-500/50 hover:shadow-[0_20px_45px_rgba(59,130,246,0.15)]"
            : "bg-card text-foreground border-border/80 shadow-sm hover:border-blue-500/40 hover:shadow-[0_20px_45px_rgba(59,130,246,0.12)]"
        }`}
    >
      {/* Glow highlight effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 relative z-10">
        {/* Large Number with Gradients */}
        <div
          className={`text-6xl md:text-7xl font-bold select-none tracking-tighter shrink-0 transition-transform duration-300 group-hover:scale-110 ${darkBg
              ? "text-transparent bg-clip-text bg-gradient-to-b from-white/40 to-white/10"
              : blueBg
                ? "text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-blue-300"
                : "text-transparent bg-clip-text bg-gradient-to-b from-slate-300 to-slate-100 dark:from-slate-800 dark:to-slate-900"
            }`}
        >
          {number}
        </div>

        {/* Text Area */}
        <div className="space-y-4 text-left">
          <h4 className="text-xl md:text-2xl font-bold text-[#3b82f6] group-hover:text-blue-500 transition-colors">
            {title}
          </h4>
          <p className={`text-sm md:text-base leading-relaxed ${darkBg ? "text-slate-300" : "text-muted-foreground"}`}>
            {subtext}
          </p>
        </div>
      </div>

      {/* Highlight Box with Left Accent Vertical Border */}
      {displayHighlight && (
        <div className="mt-8 pl-4 border-l-2 border-[#3b82f6] group-hover:border-blue-400 text-left relative z-10 transition-colors duration-300">
          <p className={`text-xs md:text-sm font-semibold italic ${darkBg ? "text-slate-400" : "text-foreground/80"}`}>
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

      {/* Title with left accent vertical border, matching the Zikrabyte screenshot */}
      <div className="flex flex-col items-start gap-4 mb-16">
        <div className="flex items-center">
          <div className="w-[3px] h-6 bg-[#3b82f6] rounded-full mr-3" />
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Core Services – Web Development
          </h3>
        </div>
      </div>

      {/* 2 Column, 2 Row Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CoreServiceCard
          number="01"
          title="Website Design & Development"
          subtext="Design and develop responsive, brand-focused websites."
          highlight="Engineered to manage high traffic, complex workflows, and future system integrations."
          darkBg={true}
          delay={0.1}
        />
        <CoreServiceCard
          number="02"
          title="Enterprise Website Engineering"
          subtext="High-performance websites that enhance brand credibility and strengthen user trust."
          highlight="Optimized for speed, accessibility, and enterprise-level security compliance standards."
          delay={0.2}
        />
        <CoreServiceCard
          number="03"
          title="Frontend Engineering"
          subtext="Fast, intuitive user interfaces that boost engagement and improve conversion rates."
          highlight="Pixel-perfect implementations aligned with UX principles and modern design systems."
          delay={0.3}
        />
        <CoreServiceCard
          number="04"
          title="Backend & API Development"
          subtext="Robust architectures ensuring reliability, scalability, and seamless third-party integrations."
          highlight="Built for stability, data integrity, and long-term scalable system maintainability."
          blueBg={true}
          delay={0.4}
        />
      </div>

    </section>
  );
}

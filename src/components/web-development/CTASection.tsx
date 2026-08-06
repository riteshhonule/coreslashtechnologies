import { motion } from "framer-motion";
import { LiquidGlassButton } from "../LiquidGlass";
import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative rounded-3xl bg-slate-900 border border-white/10 dark:border-white/5 py-20 px-8 md:px-16 text-center shadow-2xl overflow-hidden"
      >
        {/* Animated Background Shapes */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-blue-500/10 blur-[90px] pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0f172a_90%)] pointer-events-none opacity-80" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Your Innovation</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Ready to Build Your Next Digital Product?
          </h2>

          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            CoreSlash brings robust software engineering standards, advanced technologies, and transparent communication to every lifecycle milestone. Let's build a secure, lightning-fast digital asset together.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <LiquidGlassButton
              variant="cta"
              onClick={() => navigate("/contact")}
              className="flex items-center gap-2 group border-white/20 hover:border-white/40"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </LiquidGlassButton>
            <LiquidGlassButton
              variant="default"
              onClick={() => navigate("/contact")}
              className="bg-transparent border-white/10 hover:bg-white/5 text-white hover:text-white"
            >
              Contact Us
            </LiquidGlassButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-start overflow-hidden py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-slate-950"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&auto=format&fit=crop&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}
    >
      {/* Background Overlay: Fades dark slate on left for clear text readability, revealing modern web code setup on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/35 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent)] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-[1400px] w-full text-left space-y-6">

        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-xs md:text-sm font-semibold text-zinc-300 select-none"
        >
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span>&gt;</span>
          <Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link>
          <span>&gt;</span>
          <span className="text-[#3b82f6] font-bold">Web Development</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15] max-w-4xl"
        >
          Creating Scalable, Reliable{" "}
          <span className="text-[#3b82f6]">
            Web Platforms
          </span>{" "}
          for Business Growth Success
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-zinc-300 text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl font-medium"
        >
          CoreSlash builds and creates secure, high-performance websites and web applications using trusted technologies and structured engineering practices.
        </motion.p>

        {/* CTA Buttons & Feature Badges Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="pt-2 space-y-6"
        >
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all text-center"
            >
              <span>Get Started With Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition-all text-center"
            >
              <span>View Case Studies</span>
            </Link>
          </div>

        </motion.div>

      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PartnerHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hlsUrl =
      "https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: false,
      });

      hls.loadSource(hlsUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => { });
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsUrl;

      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => { });
      });
    }
  }, []);

  return (
    <section className="relative w-full min-h-[650px] lg:min-h-[720px] bg-[#070b0a] text-white flex flex-col justify-center overflow-hidden pt-20 md:pt-24 lg:pt-28 pb-12 md:pb-16 border-b border-white/10">
      {/* 1. HLS Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-85 scale-105 contrast-125 brightness-110 saturate-140"
        />

        {/* Left-to-right gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to right, #070b0a 0%, rgba(7, 11, 10, 0.5) 40%, transparent 100%)",
          }}
        />

        {/* Bottom-to-top gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to top, #070b0a 0%, rgba(7, 11, 10, 0.45) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* 2. Ambient Blue Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 w-full max-w-5xl flex justify-center">
        <div className="w-[550px] h-[220px] bg-blue-600/20 rounded-full blur-[70px] pointer-events-none animate-soft-breathe" />
      </div>

      {/* 3. Hero Content Container */}
      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-6 md:px-12 lg:px-16">
        <div className="max-w-[620px] lg:max-w-[680px] flex flex-col items-start text-left">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ fontFamily: "Cambria, serif" }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] md:text-xs font-medium tracking-wide uppercase mb-3 shadow-[0_0_12px_rgba(59,130,246,0.12)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>CoreSlash Partner Program</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            style={{ fontFamily: "Cambria, serif" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3 leading-[1.08]"
          >
            Partner With CoreSlash
          </motion.h1>

          {/* Main Supporting Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-2xl lg:text-3xl font-semibold tracking-tight text-slate-200 mb-4 leading-snug"
          >
            Bring the Opportunity.{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(59,130,246,0.4)]">
              We Bring the Technology.
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-xs sm:text-sm lg:text-base text-slate-300 italic font-light leading-relaxed mb-6 max-w-[550px]"
          >
            Have a client requirement, software project, website project, or digital transformation opportunity? Partner with CoreSlash for the technical expertise and delivery capabilities to turn opportunities into successful solutions.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            {/* Primary CTA */}
            <Link to="/contact" className="w-full sm:w-auto">
              <button
                type="button"
                aria-label="Become a Partner"
                className="group flex items-center justify-between gap-5 w-full sm:w-auto min-w-[190px] px-5 py-2.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white hover:bg-black/40 transition-all duration-300 cursor-pointer"
              >
                <span className="text-sm md:text-base font-medium whitespace-nowrap">
                  Partner with us
                </span>

                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            </Link>

            {/* Secondary CTA */}
            <Link to="/enquiry-form" className="w-full sm:w-auto">
              <button
                type="button"
                aria-label="Discuss a Project"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm md:text-base border border-white/20 hover:border-white/40 shadow-sm backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Discuss a Project</span>
              </button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

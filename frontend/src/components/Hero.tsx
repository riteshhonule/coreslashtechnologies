import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import videoSrc from "../img/banner/banner-video.webm";

export default function Hero() {
  const { openModal } = useModal();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0118] pt-24 pb-16">

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main Purple Glow */}
        <div className="absolute top-[-15%] left-[-10%] w-[900px] h-[900px] bg-[#5B21FF]/30 rounded-full blur-[140px]" />
        {/* Bottom Glow */}
        <div className="absolute bottom-[-20%] left-[-5%] w-[700px] h-[700px] border border-white/5 rounded-full opacity-20" />
        {/* Right Ambient */}
        <div className="absolute top-1/2 right-[-10%] w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[120px]" />
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0118_80%)]" />
      </div>

      {/* Floating Glow Animation */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-[100px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1fr_1.1fr] items-center gap-12 lg:gap-0">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-20"
          >
            {/* Heading */}
            <h1 className="font-black text-white leading-[0.92] tracking-[-3px] mb-8">
              {/* Small Top Line */}
              <span className="block text-[30px] md:text-[42px] mb-2">
                AI-powered solutions
              </span>
              {/* Main Heading */}
              <span className="block text-[48px] md:text-[86px]">
                <span className="text-[36px] md:text-[58px] align-middle">
                  to Solve{" "}
                </span>
                <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-500 bg-clip-text text-transparent animate-pulse-glow">
                  Complex
                </span>
              </span>
              {/* Second Line */}
              <span className="block text-[48px] md:text-[86px]">
                Business Problems
                <span className="text-cyan-400">.</span>
              </span>
            </h1>

            {/* Paragraph */}
            <p className="max-w-xl text-lg md:text-xl leading-relaxed text-white/65 mb-12 font-medium">
              We design structured software systems and enhance them with
              intelligent automation to improve how your business operates,
              scales, and makes decisions.
            </p>

            {/* CTA Button */}
            <div className="flex flex-wrap gap-5">
              <button
                onClick={openModal}
                className="group relative flex items-center gap-5 rounded-full bg-white px-8 py-4 text-[#0A0118] font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.15)] active:scale-95"
              >
                <span className="relative z-10">
                  Explore Our Approach
                </span>
                {/* Arrow Circle */}
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-cyan-400 transition-all duration-500 group-hover:rotate-45 group-hover:scale-110">
                  <ArrowUpRightIcon className="w-6 h-6 stroke-[3]" />
                </div>
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-white/10 to-cyan-300/10" />
              </button>
            </div>
          </motion.div>

          {/* RIGHT VIDEO */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.4,
              ease: "easeOut",
            }}
            className="relative flex justify-center lg:justify-end lg:-mr-24 xl:-mr-48"
          >
            {/* Video Wrapper */}
            <div className="relative z-10 w-full lg:w-[130%] max-w-[850px] lg:max-w-none">
              <motion.video
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-contain mix-blend-screen scale-110 lg:scale-125"
              />
            </div>

            {/* Ambient Glows */}
            <div className="absolute top-1/4 right-0 w-72 h-72 bg-cyan-400/15 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
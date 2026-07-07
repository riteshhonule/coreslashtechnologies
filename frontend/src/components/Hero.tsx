import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";
import { ArrowUpRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function Hero() {
  const { openModal } = useModal();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] as const }
    },
  };

  return (
    <section className="relative min-h-[85svh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#F9FAFB] pt-28 sm:pt-24 md:pt-32 pb-8 lg:pb-0 w-full" style={{ zIndex: 1 }}>

      {/* Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Radial Glows */}
        <div className="hidden md:block absolute top-[-5%] left-[-5%] w-[800px] h-[800px] bg-secondary-indigo/8 rounded-full blur-[140px] animate-pulse" />
        <div className="hidden md:block absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-primary-purple/3 rounded-full blur-[120px] animate-pulse" />

        {/* Subtle Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />

        {/* Floating Glow Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
            }}
            className="hidden md:block absolute w-1 h-1 bg-secondary-indigo/40 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 md:px-12 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">

          {/* LEFT CONTENT AREA - 58% Width on Desktop */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[58%] text-center lg:text-left relative z-20"
          >
            {/* Tagline */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-4 sm:py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-8 backdrop-blur-md max-w-[92%] sm:max-w-max mx-auto lg:mx-0"
            >
              <SparklesIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary-indigo shrink-0" />
              <span className="text-[8.5px] min-[360px]:text-[9px] sm:text-[10px] font-bold text-secondary-indigo uppercase tracking-[0.2em] sm:tracking-[0.3em] whitespace-normal text-center leading-normal">
                Strategic Intelligence Protocol
              </span>
            </motion.div>

            {/* Premium Mixed-Scale Hero Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-black leading-[0.9] tracking-[-0.02em] text-gray-900 mb-8"
            >

              {/* Small Top Text */}
              <span
                className="block font-bold text-secondary-indigo mb-2"
                style={{
                  fontSize: "clamp(24px, 3vw, 52px)",
                  lineHeight: "1",
                }}
              >
                AI-powered solutions
              </span>

              {/* To Solve + Complex */}
              <div
                className="flex flex-wrap items-end justify-center lg:justify-start gap-x-3 gap-y-1"
                style={{
                  lineHeight: "0.9",
                }}
              >
                <span
                  className="text-gray-900 whitespace-nowrap"
                  style={{
                    fontSize: "clamp(32px, 4vw, 68px)",
                  }}
                >
                  to Solve
                </span>

                <span
                  className="bg-gradient-to-r from-secondary-indigo via-secondary-indigo to-[#4503B9] bg-clip-text text-transparent whitespace-nowrap"
                  style={{
                    fontSize: "clamp(42px, 5.5vw, 88px)",
                  }}
                >
                  Complex
                </span>
              </div>

              {/* Business Problems in One Line */}
              <div
                className="flex flex-wrap items-end justify-center lg:justify-start gap-x-3 gap-y-1"
                style={{
                  lineHeight: "0.9",
                }}
              >
                <span
                  className="text-gray-900 whitespace-nowrap"
                  style={{
                    fontSize: "clamp(38px, 4.5vw, 76px)",
                  }}
                >
                  Business
                </span>

                <span
                  className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent whitespace-nowrap"
                  style={{
                    fontSize: "clamp(38px, 4.5vw, 76px)",
                  }}
                >
                  Problems
                  <span className="text-secondary-indigo">.</span>
                </span>
              </div>

            </motion.h1>
            {/* Desktop and Tablet Description */}
            <motion.p
              variants={itemVariants}
              className="hidden md:block max-w-[620px] text-lg md:text-xl text-gray-500 leading-relaxed mb-12 mx-auto lg:mx-0 font-medium px-4 md:px-0"
            >
              We architect high-performance digital ecosystems and enhance them with
              autonomous intelligence to scale your business operations
              with surgical precision.
            </motion.p>

            {/* Mobile Description */}
            <motion.p
              variants={itemVariants}
              className="block md:hidden text-xl text-gray-600 font-bold tracking-wider mb-6 text-center"
            >
              Software • Cloud • AI
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6"
            >
              <button
                onClick={openModal}
                className="w-fit sm:w-auto btn-pill btn-primary-glow text-white text-base sm:text-lg px-6 py-3.5 sm:px-10 sm:py-5 group shadow-[0_0_20px_rgba(115,124,253,0.15)] hover:shadow-[0_0_30px_rgba(115,124,253,0.3)] transition-all"
              >
                Schedule a Call
                <ArrowUpRightIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-45" />
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE ANIMATION - 42% Width on Desktop, Moved Behind on Mobile */}
          <motion.div
            initial={{ opacity: 1, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute lg:relative inset-0 lg:inset-auto flex items-center justify-center lg:w-[42%] pointer-events-none lg:pointer-events-auto opacity-20 lg:opacity-100 z-10"
          >
            {/* Animation Container */}
            <div className="relative w-full max-w-[400px] md:max-w-[500px] aspect-square flex items-center justify-center">

              {/* Soft Radial Blur Glow */}
              <div className="hidden md:block absolute inset-0 bg-secondary-indigo/8 rounded-full blur-[120px] animate-pulse" />
              <div className="hidden md:block absolute inset-20 bg-primary-purple/5 rounded-full blur-[100px] animate-pulse delay-1000" />

              {/* Abstract Floating Matrix */}
              <motion.div
                animate={{
                  y: [0, -30, 0],
                  rotateX: [0, 10, 0],
                  rotateY: [0, 15, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Layered Glass Panels */}
                <div className="absolute w-[80%] h-[80%] border border-gray-200/60 rounded-[40%] backdrop-blur-[10px] rotate-45 animate-slow-spin" />
                <div className="absolute w-[70%] h-[70%] border border-secondary-indigo/20 rounded-[30%] backdrop-blur-[8px] -rotate-12 animate-reverse-slow-spin" />

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, 50, 0], rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-10 right-10 w-16 h-16 glass rounded-2xl border-gray-200/40 rotate-12 flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-secondary-indigo rounded-full animate-ping" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -40, 0], x: [10, -20, 10] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-12 left-8 w-24 h-24 glass rounded-[3rem] border-primary-purple/10 -rotate-12"
                />

                {/* Neural Core */}
                <div className="hidden md:block absolute w-32 h-32 bg-gradient-to-br from-secondary-indigo via-primary-purple to-secondary-indigo rounded-full blur-3xl opacity-40 animate-pulse" />
                <div className="w-24 h-24 rounded-full border border-gray-200/40 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-xl" />
                  <div className="relative z-10 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200/40 shadow-sm">
                    <div className="w-4 h-4 bg-secondary-indigo rounded-full animate-pulse" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Reactive Desktop Glow (Hidden on Mobile) */}
      <div className="hidden lg:block absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200/60 to-transparent shadow-none" />
    </section>
  );
}

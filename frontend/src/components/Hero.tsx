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
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const }
    },
  };

  return (
    <section className="relative min-h-[100svh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-dark-black pt-24 md:pt-32 pb-12 lg:pb-0 w-full">

      {/* Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Radial Glows */}
        <div className="absolute top-[-5%] left-[-5%] w-[800px] h-[800px] bg-primary-purple/15 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-secondary-indigo/10 rounded-full blur-[120px] animate-pulse" />

        {/* Subtle Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)`,
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
            className="absolute w-1 h-1 bg-accent-cyan rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 md:px-12 w-full overflow-x-hidden">
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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
            >
              <SparklesIcon className="w-4 h-4 text-accent-cyan" />
              <span className="text-[10px] font-bold text-accent-cyan uppercase tracking-[0.3em]">
                Strategic Intelligence Protocol
              </span>
            </motion.div>

            {/* Responsive Heading using Clamp */}
            {/* <motion.h1 
                variants={itemVariants}
                className="font-bold text-white leading-[0.95] tracking-tight mb-8"
                style={{
                    fontSize: 'clamp(42px, 12vw, 58px)', // Mobile default
                }}
            >
              <span className="block lg:inline md:text-[clamp(52px,7vw,80px)] lg:text-[clamp(70px,8vw,120px)]">To Solve</span> <br />
              <span className="block lg:inline md:text-[clamp(52px,7vw,80px)] lg:text-[clamp(70px,8vw,120px)] text-gradient-cyan">Complex</span> <br />
              <span className="block lg:inline md:text-[clamp(52px,7vw,80px)] lg:text-[clamp(70px,8vw,120px)]">Problems</span>
              <span className="text-primary-purple text-[clamp(42px,12vw,120px)]">.</span>
            </motion.h1> */}
            {/* Premium Mixed-Scale Hero Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-black leading-[0.9] tracking-[-0.02em] text-white mb-8"
            >

              {/* Small Top Text */}
              <span
                className="block font-bold text-[#CFFAFE] mb-2"
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
                  className="text-white whitespace-nowrap"
                  style={{
                    fontSize: "clamp(32px, 4vw, 68px)",
                  }}
                >
                  to Solve
                </span>

                <span
                  className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent whitespace-nowrap"
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
                  className="text-white whitespace-nowrap"
                  style={{
                    fontSize: "clamp(38px, 4.5vw, 76px)",
                  }}
                >
                  Business
                </span>

                <span
                  className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent whitespace-nowrap"
                  style={{
                    fontSize: "clamp(38px, 4.5vw, 76px)",
                  }}
                >
                  Problems
                  <span className="text-[#22D3EE]">.</span>
                </span>
              </div>

            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="max-w-[620px] text-lg md:text-xl text-white/40 leading-relaxed mb-12 mx-auto lg:mx-0 font-medium px-4 md:px-0"
            >
              We architect high-performance digital ecosystems and enhance them with
              autonomous intelligence to scale your business operations
              with surgical precision.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6"
            >
              <button
                onClick={openModal}
                className="w-full sm:w-auto btn-pill btn-primary-glow text-white text-lg px-10 py-5 group shadow-[0_0_30px_rgba(69,3,185,0.3)] hover:shadow-[0_0_50px_rgba(69,3,185,0.5)] transition-all"
              >
                Schedule a Call
                <ArrowUpRightIcon className="w-5 h-5 transition-transform group-hover:rotate-45" />
              </button>

              {/* <button className="w-full sm:w-auto btn-pill btn-glass text-white/60 hover:text-white px-10 py-5 border-white/5 hover:border-accent-cyan/30 transition-all backdrop-blur-xl">
                View Intelligence
              </button> */}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE ANIMATION - 42% Width on Desktop, Moved Behind on Mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute lg:relative inset-0 lg:inset-auto flex items-center justify-center lg:w-[42%] pointer-events-none lg:pointer-events-auto opacity-20 lg:opacity-100 z-10"
          >
            {/* Animation Container */}
            <div className="relative w-full max-w-[400px] md:max-w-[500px] aspect-square flex items-center justify-center">

              {/* Soft Radial Blur Glow */}
              <div className="absolute inset-0 bg-accent-cyan/15 rounded-full blur-[120px] animate-pulse" />
              <div className="absolute inset-20 bg-primary-purple/20 rounded-full blur-[100px] animate-pulse delay-1000" />

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
                <div className="absolute w-[80%] h-[80%] border border-white/20 rounded-[40%] backdrop-blur-[10px] rotate-45 animate-slow-spin" />
                <div className="absolute w-[70%] h-[70%] border border-accent-cyan/20 rounded-[30%] backdrop-blur-[8px] -rotate-12 animate-reverse-slow-spin" />

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, 50, 0], rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-10 right-10 w-16 h-16 glass rounded-2xl border-white/10 rotate-12 flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-accent-cyan rounded-full animate-ping" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -40, 0], x: [10, -20, 10] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-12 left-8 w-24 h-24 glass rounded-[3rem] border-primary-purple/20 -rotate-12"
                />

                {/* Neural Core */}
                <div className="absolute w-32 h-32 bg-gradient-to-br from-accent-cyan via-primary-purple to-secondary-indigo rounded-full blur-3xl opacity-40 animate-pulse" />
                <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-xl" />
                  <div className="relative z-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <div className="w-4 h-4 bg-accent-cyan rounded-full animate-pulse" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Reactive Desktop Glow (Hidden on Mobile) */}
      <div className="hidden lg:block absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent shadow-[0_0_40px_rgba(34,211,238,0.1)]" />
    </section>
  );
}



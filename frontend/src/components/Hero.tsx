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
    <section className="relative min-h-[100svh] md:min-h-[85svh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#F9FAFB] pt-36 pb-10 md:pt-32 md:pb-8 lg:pb-0 w-full" style={{ zIndex: 1 }}>

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
            className="w-full min-h-[calc(100svh-184px)] md:min-h-0 flex flex-col justify-center items-center md:block lg:w-[58%] text-center lg:text-left relative z-20"
          >
            {/* Tagline */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-4 sm:py-1.5 rounded-full bg-primary-purple/5 border border-primary-purple/15 mb-8 backdrop-blur-md max-w-[92%] sm:max-w-max mx-auto lg:mx-0"
            >
              <SparklesIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-purple shrink-0" />
              <span className="text-[8.5px] min-[360px]:text-[9px] sm:text-[10px] font-bold text-primary-purple uppercase tracking-[0.2em] sm:tracking-[0.3em] whitespace-normal text-center leading-normal">
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
                className="block font-bold text-primary-purple mb-2"
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
                  className="bg-gradient-to-r from-primary-purple via-primary-purple to-[#2d007c] bg-clip-text text-transparent whitespace-nowrap"
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
                  <span className="text-primary-purple">.</span>
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
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-8 md:mt-0"
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
            className="relative mt-20 w-[90%] max-w-[420px] mx-auto z-10 opacity-100 pointer-events-auto md:absolute md:inset-0 md:translate-x-0 md:w-auto md:max-w-none md:aspect-auto md:z-10 md:opacity-20 md:pointer-events-none md:mt-0 md:mx-0 lg:relative lg:inset-auto lg:w-[42%] lg:pointer-events-auto lg:opacity-100 lg:z-10 flex items-center justify-center"
          >
            {/* Animation Container */}
            <div className="relative w-full max-w-[400px] md:max-w-[500px] aspect-square flex items-center justify-center">

              {/* Soft Radial Blur Glow */}
              <div className="hidden md:block absolute inset-0 bg-secondary-indigo/8 rounded-full blur-[120px] animate-pulse" />
              <div className="hidden md:block absolute inset-20 bg-primary-purple/5 rounded-full blur-[100px] animate-pulse delay-1000" />

              {/* Image Illustration */}
              <motion.img
                src="/CoreSlash_Home_Image.webp"
                alt="CoreSlash Home Platform"
                className="w-full h-full object-contain relative z-10 rounded-[3rem]"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Reactive Desktop Glow (Hidden on Mobile) */}
      <div className="hidden lg:block absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200/60 to-transparent shadow-none" />
    </section>
  );
}

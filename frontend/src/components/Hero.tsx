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
    <section className="relative min-h-[100svh] md:min-h-[620px] md:h-auto lg:min-h-[750px] lg:h-[80vh] lg:max-h-[900px] flex items-center justify-center overflow-hidden bg-[#F9FAFB] pt-36 pb-10 md:pt-28 md:pb-16 lg:pt-0 lg:pb-0 w-full" style={{ zIndex: 1 }}>

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
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-6 lg:gap-0">

          {/* LEFT CONTENT AREA - 58% Width on Desktop */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full min-h-[calc(100svh-184px)] md:min-h-0 flex flex-col justify-center items-center md:block md:w-[58%] text-center md:text-left relative z-20"
          >
            {/* MOBILE ONLY LAYOUT */}
            <div className="flex flex-col items-center justify-center md:hidden w-full font-sans">
              {/* Tagline / Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-[#5B21F4]/5 border border-[#5B21F4]/15 mb-8 backdrop-blur-md max-w-[92%]"
              >
                <SparklesIcon className="w-3.5 h-3.5 text-[#5B21F4] shrink-0" />
                <span className="text-[8.5px] min-[360px]:text-[9px] font-bold text-[#5B21F4] uppercase tracking-[0.2em] whitespace-normal text-center leading-normal">
                  Enterprise Technology Protocol
                </span>
              </motion.div>

              {/* Mobile Hero Heading */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center text-center w-full mb-8"
              >
                {/* AI-powered solutions style */}
                <span className="block font-bold text-[#5B21F4] text-[24px] min-[375px]:text-[28px] min-[410px]:text-[30px] tracking-tight leading-normal mb-1 font-sans">
                  White-label development
                </span>

                {/* to Solve style */}
                <span className="block font-bold text-[#111827] text-[32px] min-[375px]:text-[34px] min-[410px]:text-[36px] tracking-tight leading-none mb-2 font-sans">
                  to Scale
                </span>

                {/* Complex style */}
                <span className="block font-satisfy font-normal text-[#5B21F4] text-[58px] min-[375px]:text-[66px] min-[410px]:text-[74px] leading-[0.8] my-3 filter drop-shadow-[0_2px_8px_rgba(91,33,244,0.12)]">
                  Partner
                </span>

                {/* Business Problems style */}
                <span className="block font-extrabold text-[#111827] text-[38px] min-[375px]:text-[44px] min-[410px]:text-[48px] tracking-tight leading-[0.95] flex flex-col items-center font-sans mt-2">
                  <span>Technical</span>
                  <span>Delivery.</span>
                </span>
              </motion.div>

              {/* Mobile Description / Subtitle */}
              <motion.p
                variants={itemVariants}
                className="block text-base font-semibold text-[#6B7280] mb-8 text-center"
              >
                Software • AI Automation • Cloud
              </motion.p>
            </div>

            {/* DESKTOP / TABLET ONLY LAYOUT */}
            <div className="hidden md:block w-full">
              {/* Tagline */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-4 sm:py-1.5 rounded-full bg-primary-purple/5 border border-primary-purple/15 mb-8 backdrop-blur-md max-w-[92%] sm:max-w-max mx-auto md:mx-0"
              >
                <SparklesIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-purple shrink-0" />
                <span className="text-[8.5px] min-[360px]:text-[9px] sm:text-[10px] font-bold text-primary-purple uppercase tracking-[0.2em] sm:tracking-[0.3em] whitespace-normal text-center leading-normal">
                  Enterprise Technology Protocol
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
                  White-label engineering
                </span>

                {/* To Solve + Complex */}
                <div
                  className="flex flex-wrap items-end justify-start gap-x-3 gap-y-1"
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
                    to Scale
                  </span>

                  <span
                    className="bg-gradient-to-r from-primary-purple via-primary-purple to-[#2d007c] bg-clip-text text-transparent whitespace-nowrap font-black"
                    style={{
                      fontSize: "clamp(42px, 5.5vw, 88px)",
                    }}
                  >
                    Partner
                  </span>
                </div>

                {/* Business Problems in One Line */}
                <div
                  className="flex flex-wrap items-end justify-start gap-x-3 gap-y-1"
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
                    Technical
                  </span>

                  <span
                    className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent whitespace-nowrap"
                    style={{
                      fontSize: "clamp(38px, 4.5vw, 76px)",
                    }}
                  >
                    Delivery
                    <span className="text-primary-purple">.</span>
                  </span>
                </div>

              </motion.h1>
              {/* Desktop and Tablet Description */}
              <motion.p
                variants={itemVariants}
                className="hidden md:block max-w-[620px] text-lg md:text-xl text-gray-500 leading-relaxed mb-12 mx-auto md:mx-0 font-medium px-4 md:px-0"
              >
                We help digital, design, and SEO agencies scale by providing reliable software engineering, technical SEO, website maintenance, and custom development services under their own brand.
              </motion.p>

              {/* Mobile Description */}
              <motion.p
                variants={itemVariants}
                className="block md:hidden text-xl text-gray-600 font-bold tracking-wider mb-6 text-center"
              >
                Software • Maintenance • SEO
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6 mt-4 md:mt-0"
            >
              <button
                onClick={openModal}
                className="w-fit sm:w-auto btn-pill btn-primary-glow text-white text-base sm:text-lg px-6 py-3.5 sm:px-10 sm:py-5 group shadow-[0_0_20px_rgba(115,124,253,0.15)] hover:shadow-[0_0_30px_rgba(115,124,253,0.3)] transition-all"
              >
                Book a Discovery Call
                <ArrowUpRightIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-45" />
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE ANIMATION - 42% Width on Desktop, Moved Behind on Mobile */}
          <motion.div
            initial={{ opacity: 1, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative mt-20 -mx-5 w-[calc(100%+2.5rem)] z-10 opacity-100 pointer-events-auto md:relative md:inset-auto md:w-[42%] md:opacity-100 md:pointer-events-auto md:mt-0 md:mx-0 flex items-center justify-center"
          >
            {/* Animation Container */}
            <div className="relative w-full md:max-w-[380px] lg:max-w-[500px] aspect-square flex items-center justify-center">

              {/* Soft Radial Blur Glow */}
              <div className="hidden md:block absolute inset-0 bg-secondary-indigo/8 rounded-full blur-[120px] animate-pulse" />
              <div className="hidden md:block absolute inset-20 bg-primary-purple/5 rounded-full blur-[100px] animate-pulse delay-1000" />

              {/* Image Illustration */}
              <picture className="w-full h-full object-contain relative z-10 rounded-[3rem] flex items-center justify-center">
                <source
                  type="image/avif"
                  srcSet="/CoreSlash_Home_Image-mobile.avif 480w, /CoreSlash_Home_Image-tablet.avif 581w, /CoreSlash_Home_Image-desktop.avif 928w"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 581px, 42vw"
                />
                <source
                  type="image/webp"
                  srcSet="/CoreSlash_Home_Image-mobile.webp 480w, /CoreSlash_Home_Image-tablet.webp 581w, /CoreSlash_Home_Image-desktop.webp 928w"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 581px, 42vw"
                />
                <motion.img
                  src="/CoreSlash_Home_Image.webp"
                  width={928}
                  height={1152}
                  loading="eager"
                  fetchPriority="high"
                  alt="CoreSlash Home Platform"
                  className="w-full h-full object-contain rounded-[3rem]"
                  animate={{
                    y: [0, -12, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </picture>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Reactive Desktop Glow (Hidden on Mobile) */}
      <div className="hidden lg:block absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200/60 to-transparent shadow-none" />
    </section>
  );
}

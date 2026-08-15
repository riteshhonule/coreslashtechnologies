"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface AnimatedMarqueeHeroProps {
  tagline: string;
  titlePart1?: string;
  titlePart2?: string;
  titlePart3?: string;
  title?: string;
  smallTitle?: string;
  description: string;
  ctaText: string;
  secondaryCtaText?: string;
  images: string[];
  className?: string;
}

export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  titlePart1: _titlePart1 = "AI-Powered",
  titlePart2: _titlePart2 = "SOLUTIONS TO SOLVE",
  titlePart3: _titlePart3 = "COMPLEX BUSINESS PROBLEMS",
  description,
  ctaText,
  secondaryCtaText,
  images,
  className,
}) => {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const duplicatedImages = [...images, ...images];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 20 },
    },
  };

  return (
    <section
      className={cn(
        "relative w-full min-h-[85vh] overflow-hidden bg-[#fafcff] flex flex-col items-center justify-start pb-24 text-center px-4 pt-[100px]",
        className
      )}
    >
      {/* --- HERO CONTENT --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="z-10 flex flex-col items-center relative w-full max-w-[1200px] mx-auto"
      >
        {/* Tagline Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-8 sm:mb-3 inline-flex items-center gap-1.5 rounded-full border border-blue-800/20 bg-slate-900 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] md:text-xs font-semibold text-blue-100 shadow-[0_4px_20px_-4px_rgba(30,58,138,0.3)] backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>{tagline}</span>
        </motion.div>

        {/* Premium Futuristic Trio Typography Heading */}
        <motion.h1
          variants={itemVariants}
          className="flex flex-col items-center justify-center gap-1 sm:gap-2 mb-8 max-w-[1050px] mx-auto select-none tracking-normal px-2"
        >
          <span
            style={{ fontFamily: "Baskerville, 'Baskerville Old Face', serif" }}
            className="italic whitespace-nowrap text-[12.5vw] min-[430px]:text-[54px] sm:text-[56px] md:text-[72px] lg:text-[84px] font-bold leading-[1.0] text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 glow-purple-blue px-2 transition-transform duration-300 hover:scale-[1.02] mb-0 sm:-mb-4 md:-mb-6 z-10 text-center"
          >
            AI-Powered
          </span>

          {/* Part 2: "SOLUTIONS TO SOLVE" with custom stylized E */}
          <div key={animationKey} className="flex items-center justify-center font-hero-sans font-black uppercase text-[27px] sm:text-[38px] md:text-[50px] lg:text-[64px] tracking-tight leading-[1.0] text-[#1a1f2e] drop-shadow-sm px-2 z-20 flex-wrap text-center max-w-full">
            <span className="break-words text-center">
              {"SOLUTIONS TO SOLV".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1, delay: 0.5 + i * 0.06 }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + 17 * 0.06, type: "spring", bounce: 0.4 }}
              className="flex flex-col justify-between h-[0.7em] w-[0.6em] ml-[0.05em] mt-[0.05em] flex-shrink-0"
            >
              <div className="h-[22%] w-full bg-[#1a1f2e] rounded-sm"></div>
              <div className="h-[22%] w-[85%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-sm"></div>
              <div className="h-[22%] w-full bg-[#1a1f2e] rounded-sm"></div>
            </motion.div>
          </div>
          {/* Part 3: "COMPLEX BUSINESS PROBLEMS" - Futuristic tech font, wide letter spacing */}
          <span className="font-hero-tech font-semibold uppercase text-[14px] sm:text-[20px] md:text-[26px] lg:text-[34px] tracking-[0.1em] sm:tracking-[0.18em] leading-[1.2] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-2 mt-2 sm:mt-1 ml-0 sm:ml-4 text-center">
            COMPLEX BUSINESS PROBLEMS
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="hidden sm:block max-w-[700px] text-[15px] md:text-[17px] text-black font-medium leading-[1.6] mb-10 sm:mb-12 px-4 sm:px-0"
        >
          {description}
        </motion.p>

        {/* Action Buttons & Glow */}
        <motion.div
          variants={itemVariants}
          className="relative flex flex-row items-center gap-3 sm:gap-6 w-full sm:w-auto justify-center px-4 sm:px-0 max-w-[500px] mx-auto sm:max-w-none"
        >
          {/* Floating Glow behind buttons */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-2xl rounded-full scale-110 pointer-events-none" />


          <Link to="/contact" className="w-[48%] sm:w-auto block">
            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: "0 20px 40px -10px rgba(37, 99, 235, 0.45)",
              }}
              whileTap={{ scale: 0.97 }}
              className="relative w-full px-1.5 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-bold text-[12px] sm:text-lg shadow-[0_8px_20px_-6px_rgba(37,99,235,0.35)] transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap"
            >
              {ctaText}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </Link>
          {/* Secondary Outline CTA */}
          {secondaryCtaText && (
            <Link to="/contact" className="w-[48%] sm:w-auto block">
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                whileTap={{ scale: 0.97 }}
                className="relative w-full px-1.5 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-white/40 border border-slate-200 text-slate-700 font-bold text-[12px] sm:text-lg shadow-sm backdrop-blur-sm transition-all hover:border-slate-300 cursor-pointer whitespace-nowrap"
              >
                {secondaryCtaText}
              </motion.button>
            </Link>
          )}
        </motion.div>
      </motion.div>

      {/* --- MARQUEE SLIDER --- */}
      {/* Soft fade transition top mask */}
      <div className="absolute bottom-0 left-0 w-full h-[45%] md:h-[38%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%,black_85%,transparent_100%)] pointer-events-none">
        <motion.div
          className="flex gap-4 md:gap-6 w-max items-end h-full pt-20 sm:pt-36 md:pt-44"
          animate={{
            x: ["0%", "-50%"],
            transition: {
              ease: "linear",
              duration: 45,
              repeat: Infinity,
            },
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] h-[200px] sm:h-[220px] lg:h-[250px] flex-shrink-0"
              style={{
                rotate: `${(index % 2 === 0 ? -3 : 4)}deg`,
                transform: `translateY(${index % 2 === 0 ? '10px' : '-10px'})`
              }}
            >
              <img
                src={src}
                alt={`Showcase ${index + 1}`}
                width={187}
                height={250}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "low"}
                decoding={index === 0 ? "sync" : "async"}
                className="w-full h-full object-cover rounded-[20px] sm:rounded-[24px] border border-white/40 shadow-lg"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedMarqueeHero;

"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: string;
  smallTitle?: string;
  description: string;
  ctaText: string;
  secondaryCtaText?: string;
  images: string[];
  className?: string;
}

export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  smallTitle,
  description,
  ctaText,
  secondaryCtaText,
  images,
  className,
}) => {
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

  const [charIndex, setCharIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const totalLength = title.length + (smallTitle ? smallTitle.length : 0);

  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const minCharIndex = title.length;

    if (!isDeleting && charIndex === totalLength) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && charIndex === minCharIndex) {
      timeout = setTimeout(() => setIsDeleting(false), 800);
    } else {
      const delay = isDeleting ? 30 : 60;
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
      }, delay + Math.random() * 30);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, totalLength, title.length]);

  return (
    <section
      className={cn(
        "relative w-full min-h-[80vh] overflow-hidden bg-[#fafcff] flex flex-col items-center justify-start pb-24 text-center px-4 pt-[100px]",
        className
      )}
      style={{ fontFamily: '"Clash Display", "Sora", system-ui, sans-serif' }}
    >
      {/* --- HERO CONTENT --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="z-10 flex flex-col items-center relative w-full max-w-[1100px] mx-auto"
      >
        {/* Tagline Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-blue-800 bg-slate-800 px-3.5 py-1.5 text-[11px] md:text-xs font-semibold text-blue-50 shadow-[0_4px_20px_-4px_rgba(30,58,138,0.4)] backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-900" />
          {tagline}
        </motion.div>

        {/* Continuous Typewriter Title */}
        <div className="font-extrabold tracking-tight text-[#0f172a] leading-[1.1] mb-6 max-w-[900px] flex flex-col items-center justify-center gap-y-2 md:gap-y-3">

          {/* Main Title Row */}
          <div className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[68px] flex items-center justify-center flex-wrap text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 relative flex items-center flex-wrap justify-center">

              {title.split("").map((char, i) => (
                <span key={`t-${i}`} className={i < charIndex ? "inline-block" : "hidden"}>
                  {char === " " ? "\u00A0" : char}

                </span>
              ))}
            </span>
          </div>

          {/* Small Title Row */}
          {smallTitle && (
            <div className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] font-bold flex items-center justify-center flex-wrap text-center">
              <span className="relative flex items-center flex-wrap justify-center">
                {smallTitle.split("").map((char, i) => {
                  const globalIdx = title.length + i;
                  return (
                    <span key={`s-${i}`} className={globalIdx < charIndex ? "inline-block" : "hidden"}>
                      {char === " " ? "\u00A0" : char}

                    </span>
                  );
                })}
              </span>
            </div>
          )}

        </div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="max-w-[700px] text-[15px] md:text-[17px] text-black font-medium leading-[1.6] mb-12"
        >
          {description}
        </motion.p>

        {/* Action Buttons & Glow */}
        <motion.div
          variants={itemVariants}
          className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          {/* Floating Glow behind buttons */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-2xl rounded-full scale-110 pointer-events-none" />

          {/* Primary CTA */}
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 20px 40px -10px rgba(147, 51, 234, 0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="relative px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg shadow-[0_8px_20px_-6px_rgba(147,51,234,0.3)] transition-all flex items-center gap-2 cursor-pointer"
            >
              {ctaText}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>

          {/* Secondary Outline CTA */}
          {secondaryCtaText && (
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                whileTap={{ scale: 0.97 }}
                className="relative px-8 py-3.5 rounded-full bg-white/40 border border-slate-200 text-slate-700 font-bold text-lg shadow-sm backdrop-blur-sm transition-all hover:border-slate-300 cursor-pointer"
              >
                {secondaryCtaText}
              </motion.button>
            </Link>
          )}
        </motion.div>
      </motion.div>

      {/* --- MARQUEE SLIDER --- */}
      {/* Soft fade transition top mask */}
      <div className="absolute bottom-0 left-0 w-full h-[35%] md:h-[38%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_40%,black_85%,transparent_100%)] pointer-events-none">
        <motion.div
          className="flex gap-4 md:gap-6 w-max items-end h-full pt-36 md:pt-44"
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
              className="relative aspect-[3/4] h-36 md:h-[220px] lg:h-[250px] flex-shrink-0"
              style={{
                rotate: `${(index % 2 === 0 ? -3 : 4)}deg`,
                transform: `translateY(${index % 2 === 0 ? '10px' : '-10px'})`
              }}
            >
              <img
                src={src}
                alt={`Showcase ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[24px] border border-white/40"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedMarqueeHero;

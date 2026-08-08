import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface OverlappingImageCardProps {
  primaryImage: string;
  secondaryImage: string;
  altText: string;
  badgeText?: string;
  className?: string;
}

export const OverlappingImageCard: React.FC<OverlappingImageCardProps> = ({
  primaryImage,
  secondaryImage,
  altText,
  badgeText,
  className = ""
}) => {
  return (
    <div className={`relative w-full max-w-[620px] mx-auto select-none p-4 sm:p-6 ${className}`}>
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[500px] max-h-[400px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/5 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Blue Four-Point Sparkle Elements */}
      <motion.div
        animate={{ y: [0, -6, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-2 left-6 text-blue-500 z-30 pointer-events-none"
      >
        <Sparkles className="w-6 h-6 fill-blue-500/20" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -top-4 right-12 text-cyan-500 z-30 pointer-events-none"
      >
        <Sparkles className="w-5 h-5 fill-cyan-500/20" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -bottom-4 left-10 text-indigo-500 z-30 pointer-events-none"
      >
        <Sparkles className="w-5 h-5 fill-indigo-500/20" />
      </motion.div>

      {/* Main Interactive Motion Group */}
      <motion.div 
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="relative w-full"
      >
        {/* 1. LARGER BACKGROUND IMAGE CARD */}
        <motion.div
          variants={{
            rest: { x: 0, y: 0, scale: 1 },
            hover: { x: -6, y: -4, scale: 1.01 }
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xl shadow-slate-900/10 dark:shadow-black/50 aspect-[4/3] sm:aspect-[16/10]"
        >
          <img
            src={primaryImage}
            alt={altText}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          {badgeText && (
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-wider shadow-md">
                {badgeText}
              </span>
            </div>
          )}
        </motion.div>

        {/* 2. SMALLER OVERLAPPING FRONT IMAGE CARD */}
        <motion.div
          variants={{
            rest: { x: 0, y: 0, scale: 1, rotate: 0 },
            hover: { x: 8, y: -8, scale: 1.04, rotate: 1 }
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-[-50px] sm:mt-0 sm:absolute sm:-bottom-8 sm:-right-6 md:-bottom-10 md:-right-8 lg:-bottom-8 lg:-right-6 z-20 w-[82%] sm:w-[62%] md:w-[58%] ml-auto sm:ml-0 overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] border-4 border-white dark:border-slate-900 bg-white dark:bg-slate-900 shadow-2xl shadow-blue-600/20 dark:shadow-black/70 aspect-[4/3]"
        >
          <img
            src={secondaryImage}
            alt={`${altText} detail view`}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OverlappingImageCard;

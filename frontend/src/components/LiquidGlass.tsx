"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LiquidGlassProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "logo" | "cta" | "default";
  onClick?: () => void;
}

export const LiquidGlassButton: React.FC<LiquidGlassProps> = ({
  children,
  className,
  variant = "default",
  onClick,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.96 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        "relative group inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-all duration-500 cursor-pointer select-none",
        // Liquid glass styling base
        "bg-gradient-to-b from-white/20 via-white/10 to-white/5 dark:from-white/15 dark:via-white/8 dark:to-white/3",
        "backdrop-blur-xl border border-white/30 dark:border-white/20",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.4)]",
        "hover:border-white/50 hover:shadow-[0_12px_40px_0_rgba(59,130,246,0.25),inset_0_1px_2px_0_rgba(255,255,255,0.6)]",
        variant === "logo" && "px-5 py-2 text-lg font-bold tracking-tight text-foreground",
        variant === "cta" && "px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600/80 via-indigo-600/80 to-purple-600/80 hover:from-blue-500 hover:to-purple-500 shadow-blue-500/20",
        variant === "default" && "px-6 py-2.5 text-sm text-foreground",
        className
      )}
      {...(props as any)}
    >
      {/* SVG Liquid Refraction Filter */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-glass-refraction">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Outer ambient glow */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10" />

      {/* Liquid shine light reflection line */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

      {/* Inner highlight curve */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

      {/* Liquid glass specular highlight orb */}
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-white/20 blur-xl pointer-events-none -z-10"
        animate={{
          x: isHovered ? [0, 40, -40, 0] : 0,
          y: isHovered ? [0, -20, 20, 0] : 0,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

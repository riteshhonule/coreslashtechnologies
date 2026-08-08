import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ImageItem {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface PhoneCarouselProps {
  images: ImageItem[];
  className?: string;
  autoPlayInterval?: number;
}

const FALLBACK_IMAGES: ImageItem[] = [
  {
    src: "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&auto=format&fit=crop&q=80",
    alt: "E-Commerce Mobile Shopping App UI",
    title: "E-Commerce Ecosystem",
    description: "High-conversion iOS & Android mobile shopping experience with instant payment gateway."
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    alt: "Fintech Dashboard Mobile App UI",
    title: "Fintech Analytics Platform",
    description: "Real-time mobile portfolio tracking, multi-currency wallet & AI financial insights."
  },
  {
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
    alt: "Social Network & Chat Mobile App UI",
    title: "Next-Gen Messaging App",
    description: "End-to-end encrypted messaging, media sharing, and high-scale community feeds."
  },
  {
    src: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&auto=format&fit=crop&q=80",
    alt: "SaaS Workflow & Task Management Mobile App",
    title: "Enterprise SaaS Task Suite",
    description: "Seamless team collaboration, cloud sync, and operational push notifications."
  }
];

export const PhoneCarousel: React.FC<PhoneCarouselProps> = ({
  images = [],
  className = "",
  autoPlayInterval = 4000
}) => {
  const activeImages = images && images.length > 0 ? images : FALLBACK_IMAGES;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % activeImages.length);
  }, [activeImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? activeImages.length - 1 : prevIndex - 1
    );
  }, [activeImages.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, autoPlayInterval]);

  const currentImage = activeImages[currentIndex];
  const isFallbackNeeded = failedImages[currentIndex];

  const displaySrc = isFallbackNeeded || !currentImage.src
    ? FALLBACK_IMAGES[currentIndex % FALLBACK_IMAGES.length].src
    : currentImage.src;

  return (
    <div
      className={`relative w-full max-w-[1200px] mx-auto py-2 sm:py-4 px-4 flex flex-col items-center select-none ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header Accent Badge */}
      <div className="flex flex-col items-center text-center mb-4 sm:mb-6 space-y-1.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive App Showcase</span>
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground tracking-tight">
          Experience Live Mobile UI Mockups
        </h3>
        <p className="text-muted-foreground text-xs sm:text-sm max-w-md leading-relaxed">
          Swipe through native iOS & Android user interface designs engineered for performance and maximum engagement.
        </p>
      </div>

      {/* Main Container Grid: iPhone Frame + Control Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full max-w-[1050px]">
        
        {/* Left Side: Interactive Specs & Controls on Desktop */}
        <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col justify-center space-y-5 text-center lg:text-left">
          <div className="space-y-3">
            {/* Screen Counter Pill */}
            <div className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-black tracking-widest uppercase shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping" />
                <span>Screen {currentIndex + 1} of {activeImages.length}</span>
              </span>
            </div>

            {/* Bold Main Title */}
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight leading-snug">
              {currentImage.title || currentImage.alt}
            </h4>

            {/* Clear Subtitle Description */}
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0 font-medium">
              {currentImage.description || "Engineered according to high-density Retina display guidelines with ultra-fluid 60fps gesture navigation and native hardware integration."}
            </p>
          </div>

          {/* Feature Badge Tags */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
            <span className="px-3.5 py-1.5 rounded-xl bg-muted/80 text-foreground text-xs font-extrabold border border-border/60 shadow-xs">
              ⚡ 60 FPS Fluid UX
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-muted/80 text-foreground text-xs font-extrabold border border-border/60 shadow-xs">
              📱 Retina Display
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 text-xs font-extrabold border border-blue-500/20 shadow-xs">
              ✨ Native iOS & Android
            </span>
          </div>

          {/* Large Stylish Controls Bar */}
          <div className="flex items-center justify-center lg:justify-start gap-4 pt-3">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white dark:bg-slate-900 border-2 border-border/80 hover:border-blue-500 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 shrink-0 cursor-pointer"
              aria-label="Previous Screen"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            {/* Slide Navigation Dots */}
            <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-muted/80 dark:bg-slate-900/90 border border-border/80 shadow-inner">
              {activeImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? "w-8 bg-blue-600 dark:bg-blue-500 shadow-md shadow-blue-500/50"
                      : "w-3 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white dark:bg-slate-900 border-2 border-border/80 hover:border-blue-500 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 shrink-0 cursor-pointer"
              aria-label="Next Screen"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Right Side: Realistic iPhone Mockup Frame */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center items-center relative py-1">
          
          {/* Outer Soft Backdrop Ambient Glow */}
          <div className="absolute w-[240px] h-[450px] sm:w-[260px] sm:h-[490px] bg-gradient-to-tr from-blue-600/25 via-indigo-500/15 to-purple-600/15 rounded-[3rem] blur-2xl pointer-events-none -z-10 animate-pulse" />

          {/* iPhone 16 / 15 Pro Compact Outer Chassis Frame */}
          <div className="relative w-[230px] h-[450px] sm:w-[250px] sm:h-[490px] md:w-[260px] md:h-[500px] bg-slate-950 p-2.5 sm:p-3 rounded-[2.8rem] sm:rounded-[3.2rem] border-[3.5px] border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden">
            
            {/* Side Metal Buttons */}
            <div className="absolute -left-[6px] top-24 w-[2.5px] h-7 bg-slate-700 rounded-l-sm" />
            <div className="absolute -left-[6px] top-35 w-[2.5px] h-11 bg-slate-700 rounded-l-sm" />
            <div className="absolute -left-[6px] top-50 w-[2.5px] h-11 bg-slate-700 rounded-l-sm" />
            <div className="absolute -right-[6px] top-30 w-[2.5px] h-16 bg-slate-700 rounded-r-sm" />

            {/* Inner Phone Display Bezel Container */}
            <div className="relative w-full h-full bg-slate-900 rounded-[2.3rem] sm:rounded-[2.6rem] overflow-hidden border border-slate-800 flex flex-col">
              
              {/* Dynamic Island Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-4.5 sm:h-5 bg-black rounded-full z-30 flex items-center justify-between px-2 shadow-md">
                <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                  <div className="w-0.8 h-0.8 rounded-full bg-blue-900/60" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-800" />
              </div>

              {/* Status Bar */}
              <div className="w-full pt-2.5 px-5 pb-1 flex items-center justify-between text-[10px] font-semibold text-white/90 z-20 pointer-events-none">
                <span>9:41</span>
                <div className="flex items-center gap-1 text-white/80">
                  <span className="text-[9px]">5G</span>
                  <div className="w-3.5 h-1.8 rounded-xs border border-white/80 p-0.5 flex items-center">
                    <div className="w-full h-full bg-white rounded-xs" />
                  </div>
                </div>
              </div>

              {/* Animated Display Content Screen */}
              <div className="relative flex-1 w-full bg-slate-950 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={displaySrc}
                      alt={currentImage.alt}
                      onError={() => {
                        setFailedImages((prev) => ({ ...prev, [currentIndex]: true }));
                      }}
                      className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Subtle Screen Reflection Glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10" />
              </div>

              {/* iOS Home Indicator Bar */}
              <div className="w-full py-1.5 bg-slate-950 flex justify-center items-center z-20">
                <div className="w-24 sm:w-28 h-1 bg-white/40 rounded-full" />
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PhoneCarousel;

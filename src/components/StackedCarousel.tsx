"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/Badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Slide {
  image: string;
  title: string;
  description: string;
  badge: string;
}

export const DEFAULT_STACKED_SLIDES: Slide[] = [
  {
    image: "https://images.unsplash.com/photo-1709884735646-897b57461d61?q=80&w=1200&auto=format&fit=crop",
    title: "Neural Architecture",
    description: "Scale new heights in deep learning and real-time model inference.",
    badge: "AI & ML",
  },
  {
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop",
    title: "Stream Telemetry",
    description: "Feel the speed as you navigate distributed event data streams.",
    badge: "Cloud Data",
  },
  {
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1200&auto=format&fit=crop",
    title: "Quantum Defense",
    description: "Deep dive into post-quantum cryptographic security protocols.",
    badge: "Security",
  },
  {
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    title: "Edge Compute Nodes",
    description: "Deploy serverless workloads on high-availability global edge networks.",
    badge: "DevOps",
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    title: "Glassmorphic Design",
    description: "Discover intuitive SaaS user interfaces and fluid experiences.",
    badge: "UX Design",
  },
];

interface CarouselConfig {
  distanceDivisor: number;
  velocityDivisor: number;
  sensitivity: number;
  xMultiplier: number;
  yMultiplier: number;
  rotationMultiplier: number;
  scaleReduction: number;
}

const getCarouselConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return {
      distanceDivisor: 120,
      velocityDivisor: 500,
      sensitivity: 180,
      xMultiplier: 90,
      yMultiplier: 20,
      rotationMultiplier: 8,
      scaleReduction: 0.06,
    };
  }
  if (width < 1024) {
    return {
      distanceDivisor: 160,
      velocityDivisor: 650,
      sensitivity: 220,
      xMultiplier: 130,
      yMultiplier: 30,
      rotationMultiplier: 10,
      scaleReduction: 0.09,
    };
  }
  return {
    distanceDivisor: 200,
    velocityDivisor: 800,
    sensitivity: 250,
    xMultiplier: 170,
    yMultiplier: 40,
    rotationMultiplier: 12,
    scaleReduction: 0.12,
  };
};

export interface CarouselStackedProps {
  slides?: Slide[];
  className?: string;
}

export const CarouselStacked: React.FC<CarouselStackedProps> = ({
  slides = DEFAULT_STACKED_SLIDES,
  className,
}) => {
  const scrollProgress = useMotionValue(0);
  const startProgress = React.useRef(0);
  const isDraggingRef = React.useRef(false);
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);

  const total = slides.length;

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update active index state when progress changes for indicator dots
  React.useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (latest) => {
      const normalized = Math.round(latest) % total;
      const index = (normalized + total) % total;
      setActiveCardIndex(index);
    });
    return () => unsubscribe();
  }, [scrollProgress, total]);

  const config = React.useMemo(
    () => getCarouselConfig(windowWidth),
    [windowWidth],
  );

  const scrollToCard = React.useCallback(
    (targetIndex: number) => {
      const currentP = scrollProgress.get();
      let diff = (targetIndex - currentP) % total;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      const target = currentP + diff;

      animate(scrollProgress, target, {
        type: "spring",
        stiffness: 220,
        damping: 28,
        mass: 1,
      });
    },
    [scrollProgress, total]
  );

  const handleDragStart = () => {
    isDraggingRef.current = true;
    startProgress.current = scrollProgress.get();
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);

    const dragDistance = info.offset.x;
    const velocity = info.velocity.x;

    const distanceShift = -dragDistance / config.distanceDivisor;
    const velocityShift = -velocity / config.velocityDivisor;

    let totalShift = Math.round(distanceShift + velocityShift);
    totalShift = Math.max(-3, Math.min(3, totalShift));

    const target = Math.round(startProgress.current) + totalShift;

    animate(scrollProgress, target, {
      type: "spring",
      stiffness: 200,
      damping: 30,
      mass: 1,
    });
  };

  const handleCardClick = (index: number) => {
    if (isDraggingRef.current) return;
    scrollToCard(index);
  };

  return (
    <div className={cn("flex flex-col items-center justify-center w-full py-10 bg-background overflow-hidden select-none", className)}>
      <div className="relative w-full max-w-7xl h-80 sm:h-112 lg:h-128 flex items-center justify-center">
        {/* Transparent Drag Surface */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={handleDragStart}
          onDrag={(_, info) => {
            const delta = -info.delta.x / config.sensitivity;
            scrollProgress.set(scrollProgress.get() + delta);
          }}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
        />

        {/* Stacked Cards with click to slide enabled */}
        {slides.map((slide, i) => (
          <Card
            key={i}
            slide={slide}
            index={i}
            total={total}
            progress={scrollProgress}
            config={config}
            onCardClick={handleCardClick}
          />
        ))}
      </div>

      {/* Interactive Controls: Left/Right Arrows & Dots */}
      <div className="flex items-center gap-6 mt-6 z-30">
        <button
          onClick={() => scrollToCard((activeCardIndex - 1 + total) % total)}
          className="p-3 rounded-full bg-card/60 hover:bg-card border border-border text-foreground backdrop-blur-md shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                activeCardIndex === i
                  ? "w-8 bg-blue-500 shadow-sm shadow-blue-500/50"
                  : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => scrollToCard((activeCardIndex + 1) % total)}
          className="p-3 rounded-full bg-card/60 hover:bg-card border border-border text-foreground backdrop-blur-md shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

interface CardProps {
  slide: Slide;
  index: number;
  total: number;
  progress: MotionValue<number>;
  config: CarouselConfig;
  onCardClick: (index: number) => void;
}

const Card = ({ slide, index, total, progress, config, onCardClick }: CardProps) => {
  const offset = useTransform(progress, (p) => {
    let diff = (index - p) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  });

  const x = useTransform(offset, (o) => o * config.xMultiplier);
  const rotate = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return o * config.rotationMultiplier;
  });
  const y = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return absO * config.yMultiplier;
  });
  const scale = useTransform(
    offset,
    (o) => 1 - Math.abs(o) * config.scaleReduction,
  );
  const opacity = useTransform(
    offset,
    [-total / 2, -total / 2 + 0.5, 0, total / 2 - 0.5, total / 2],
    [0, 1, 1, 1, 0],
  );
  // Give cards interactive zIndex above the background
  const zIndex = useTransform(offset, (o) =>
    Math.round(100 - Math.abs(o) * 10),
  );

  return (
    <motion.div
      onClick={() => onCardClick(index)}
      style={{
        x,
        rotate,
        y,
        scale,
        opacity,
        zIndex,
      }}
      className={cn(
        "absolute rounded-2xl overflow-hidden bg-muted group pointer-events-auto cursor-pointer border border-border/60 shadow-xl transition-shadow duration-300 hover:shadow-2xl hover:border-blue-500/50",
        "w-44 h-56 sm:w-56 sm:h-80 lg:w-64 lg:h-96",
      )}
    >
      <img
        src={slide.image}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-110"
      />

      <motion.div
        style={{
          opacity: useTransform(
            offset,
            [-2, -0.5, 0, 0.5, 2],
            [0.5, 0.2, 0, 0.2, 0.5],
          ),
        }}
        className="absolute inset-0 bg-black pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      <Badge className="absolute top-3 right-3 sm:top-5 sm:right-5 lg:top-6 lg:right-6 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-black pointer-events-none">
        {slide.badge}
      </Badge>

      <div className="absolute bottom-5 left-3 right-3 sm:bottom-8 sm:left-5 sm:right-5 lg:bottom-10 lg:left-6 lg:right-6 text-white text-center sm:text-left pointer-events-none">
        <motion.p
          style={{
            opacity: useTransform(offset, [-0.5, 0, 0.5], [0, 1, 0]),
          }}
          className="text-sm sm:text-lg lg:text-xl font-bold leading-tight mb-0.5 sm:mb-1 drop-shadow-md"
        >
          {slide.title}
        </motion.p>
        <motion.p
          style={{
            opacity: useTransform(offset, [-0.5, 0, 0.5], [0, 1, 0]),
          }}
          className="hidden sm:block text-xs text-white/70 line-clamp-2 italic font-medium"
        >
          {slide.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default CarouselStacked;


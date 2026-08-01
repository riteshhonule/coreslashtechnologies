import React from "react";
import CarouselStacked from "@/components/ui/carousel-07";
import { Sparkles, MoveHorizontal } from "lucide-react";

export const StackedCarouselSection: React.FC = () => {
  return (
    <section id="showcase" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/40 text-xs font-semibold text-muted-foreground backdrop-blur-md mb-4">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>Interactive 3D Deck</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          Core Engineering Tech Deck
        </h2>
        <p className="mt-4 text-muted-foreground text-sm md:text-base flex items-center justify-center gap-2">
          <span>Drag or swipe left/right to browse our tech stack cards</span>
          <MoveHorizontal className="w-4 h-4 text-blue-500 animate-pulse" />
        </p>
      </div>

      <CarouselStacked />
    </section>
  );
};

export default StackedCarouselSection;

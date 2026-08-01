import React from "react";
import SocialCards from "@/components/ui/card-fan-carousel";
import type { CardItem } from "@/components/ui/card-fan-carousel";
import { Sparkles, Layers } from "lucide-react";

export const DEMO_FAN_CARDS: CardItem[] = [
  { imgUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=900&fit=crop", alt: "Mountain landscape" },
  { imgUrl: "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=600&h=900&fit=crop", alt: "City night" },
  { imgUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=900&fit=crop", alt: "Foggy forest" },
  { imgUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=900&fit=crop", alt: "Sunlit woods" },
  { imgUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=900&fit=crop", alt: "Tropical beach" },
  { imgUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=900&fit=crop", alt: "Starry mountain" },
  { imgUrl: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=600&h=900&fit=crop", alt: "Golden sunset" },
  { imgUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&h=900&fit=crop", alt: "Lake reflection" },
  { imgUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=900&fit=crop", alt: "Green valley" },
  { imgUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=900&fit=crop", alt: "Sunbeam nature" },
];

export const FanCarouselSection: React.FC = () => {
  return (
    <section id="fanned-showcase" className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/40 text-xs font-semibold text-muted-foreground backdrop-blur-md mb-4">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>GSAP 3D Fanned Deck</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground flex items-center justify-center gap-3">
          <span>Dynamic Card Fan Showcase</span>
          <Layers className="w-8 h-8 text-blue-500 hidden sm:inline-block" />
        </h2>
        <p className="mt-4 text-muted-foreground text-sm md:text-base">
          Hover over cards to expand the fanned stack, or use the pagination controls to cycle smoothly through items.
        </p>
      </div>

      <SocialCards cards={DEMO_FAN_CARDS} />
    </section>
  );
};

export default FanCarouselSection;

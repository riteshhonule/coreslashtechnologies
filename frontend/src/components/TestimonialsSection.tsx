import React from "react";
import { CircularTestimonials } from "@/components/CircularTestimonials";
import type { Testimonial } from "@/components/CircularTestimonials";
import { Sparkles, MessageSquareQuote } from "lucide-react";

export const DEMO_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "CoreSlash transformed our entire software architecture. Their real-time telemetry pipelines and modern UI framework scaled our platform by 400% without a single millisecond of downtime.",
    name: "Tamar Mendelson",
    designation: "VP of Engineering at TechScale",
    src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop",
  },
  {
    quote:
      "The attention to design excellence and microsecond performance is unprecedented. The interactive 3D interfaces and deep AI automation exceeded all expectations of our executive team.",
    name: "Joe Charlescraft",
    designation: "Principal Architect at CloudFlux",
    src: "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop",
  },
  {
    quote:
      "CoreSlash is a true innovation engine. Their post-quantum security defense and agentic AI models delivered enterprise-grade safety for our global financial clients.",
    name: "Martina Edelweist",
    designation: "Chief Security Officer at QuantumGuard",
    src: "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop",
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="pt-0 pb-32 md:pb-48 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/40 text-xs font-semibold text-muted-foreground backdrop-blur-md mb-4">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>Client Testimonials</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground flex items-center justify-center gap-3">
          <span>Trusted by Tech Leaders</span>
          <MessageSquareQuote className="w-8 h-8 text-blue-500 hidden sm:inline-block" />
        </h2>
        <p className="mt-4 text-muted-foreground text-sm md:text-base">
          Discover how industry pioneers leverage CoreSlash to ship extraordinary digital experiences.
        </p>
      </div>

      {/* Styled Testimonials Wrapper with Theme Adaptability */}
      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-5xl bg-card/60 backdrop-blur-xl border border-border/60 p-6 sm:p-12 rounded-3xl shadow-2xl flex justify-center">
          <CircularTestimonials
            testimonials={DEMO_TESTIMONIALS}
            autoplay={true}
            colors={{
              name: "var(--color-foreground, #f7f7ff)",
              designation: "#3b82f6",
              testimony: "var(--color-muted-foreground, #cbd5e1)",
              arrowBackground: "#1e293b",
              arrowForeground: "#f8fafc",
              arrowHoverBackground: "#3b82f6",
            }}
            fontSizes={{
              name: "26px",
              designation: "16px",
              quote: "18px",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;


import { AnimatedMarqueeHero } from "@/components/ui/hero";
import ExpandableGallery, { NINE_DEMO_IMAGES } from "@/components/ui/expandable-gallery";
import FanCarouselSection from "@/components/sections/fan-carousel-section";
import TechnologiesSection from "@/components/sections/technologies-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import ContactSection from "@/components/sections/contact-section";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1756312148347-611b60723c7a?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1757865579201-693dd2080c73?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1756786605218-28f7dd95a493?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1757519740947-eef07a74c4ab?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1757263005786-43d955f07fb1?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1757207445614-d1e12b8f753e?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1757269746970-dc477517268f?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1755119902709-a53513bcbedc?w=900&auto=format&fit=crop&q=60",
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CoreSlash Technologies",
  "url": "https://www.coreslash.com",
  "logo": "https://www.coreslash.com/vite.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9000000000",
    "contactType": "customer service"
  }
};

export default function Home() {
  return (
    <>
      <Helmet>
        <title>CoreSlash Technologies | Enterprise-grade digital solutions</title>
        <meta name="description" content="Top web development and IT solutions company in Belgaum." />
        <link rel="canonical" href="https://www.coreslash.com/" />
        <meta property="og:title" content="CoreSlash Technologies" />
        <meta property="og:description" content="Top web development and IT solutions company in Belgaum." />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      {/* Main Hero Section */}
      <section className="relative w-full">
        <AnimatedMarqueeHero
          tagline="CoreSlash AI & Software Engineering"
          title={
            <>
              Architecting Next-Gen
              <br />
              Digital Experiences
            </>
          }
          description="We build intelligent AI solutions, high-scale web platforms, and futuristic SaaS applications for ambitious companies worldwide."
          ctaText="Get Started"
          images={DEMO_IMAGES}
        />
      </section>

      {/* 9-Card Interactive Showcase Gallery Section */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/40 text-xs font-semibold text-muted-foreground backdrop-blur-md mb-4">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Interactive 9-Card Showcase</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Explore Our Digital Innovations
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md text-sm md:text-base">
            Hover over any card below to expand its visual focus or click any item to launch the high-resolution lightbox modal.
          </p>
        </div>

        <ExpandableGallery images={NINE_DEMO_IMAGES} />
      </section>

      {/* GSAP 3D Fanned Card Carousel Section */}
      <FanCarouselSection />

      {/* Technologies We Use Section */}
      <TechnologiesSection />

      {/* Circular Testimonials Section */}
      <TestimonialsSection />

      {/* Book a Free Session Contact Section */}
      <ContactSection />

      {/* About Section */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">About CoreSlash</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              We are a team of visionary engineers, designers, and AI researchers obsessed with building fast, resilient, and beautiful software.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                <span className="font-medium">100+ Enterprise Products Shipped</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                <span className="font-medium">99.99% Uptime Guarantee & SLA Support</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                <span className="font-medium">AI Integration Experts</span>
              </div>
            </div>
          </div>
          <div className="p-8 rounded-3xl bg-gradient-to-tr from-blue-600/10 via-indigo-600/10 to-purple-600/10 border border-blue-500/20 backdrop-blur-2xl text-center">
            <h3 className="text-4xl font-extrabold text-blue-500 mb-2">99.8%</h3>
            <p className="text-muted-foreground text-sm uppercase tracking-wider font-semibold mb-6">Client Satisfaction Rate</p>
            <p className="text-muted-foreground italic text-sm">"CoreSlash transformed our product pipeline within weeks. Their engineering precision is unmatched."</p>
          </div>
        </div>
      </section>
    </>
  );
}

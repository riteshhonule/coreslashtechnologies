import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { AnimatedMarqueeHero } from "@/components/ui/hero-3";
import ExpandableGallery, { NINE_DEMO_IMAGES } from "@/components/ui/gallery-animation";
import FanCarouselSection from "@/components/sections/fan-carousel-section";
import TechnologiesSection from "@/components/sections/technologies-section";

import TestimonialsSection from "@/components/sections/testimonials-section";
import ContactSection from "@/components/sections/contact-section";
import FooterSection from "@/components/sections/footer-section";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, X } from "lucide-react";

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



const AnimatedHeroDemo = () => {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* 1. CoreSlash Glass Navbar */}
      <Navbar
        onGetQuoteClick={() => setQuoteModalOpen(true)}
      />

      {/* 2. Main Hero Section (#home) */}
      <section id="home" className="relative w-full">
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

      {/* 2.5 9-Card Interactive Showcase Gallery Section (#gallery) */}
      <section id="gallery" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40">
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

        {/* Expandable Gallery Component with 9 Cards */}
        <ExpandableGallery images={NINE_DEMO_IMAGES} />
      </section>

      {/* 2.7 GSAP 3D Fanned Card Carousel Section */}
      <FanCarouselSection />

      {/* 2.8 Technologies We Use Section */}
      <TechnologiesSection />


      {/* 2.9 Circular Testimonials Section (#testimonials) */}
      <TestimonialsSection />

      {/* 2.10 Book a Free Session Contact Section (#contact) */}
      <ContactSection />



      {/* 5. About Section (#about) */}
      <section id="about" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40">
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

      {/* 7. Premium Footer */}
      <FooterSection />

      {/* 8. Get Quote Modal */}
      <AnimatePresence>
        {quoteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg p-8 rounded-3xl bg-card border border-border shadow-2xl backdrop-blur-2xl"
            >
              <button
                onClick={() => {
                  setQuoteModalOpen(false);
                  setQuoteSubmitted(false);
                }}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>

              {!quoteSubmitted ? (
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-semibold mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Instant Quote Estimate</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Request CoreSlash Project Quote</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Tell us about your project requirements and our engineering leads will deliver a proposal within 24 hours.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setQuoteSubmitted(true);
                    }}
                    className="space-y-4 text-left"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">Your Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">Work Email</label>
                      <input
                        required
                        type="email"
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">Project Scope</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Briefly describe your software or AI project..."
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors duration-200 cursor-pointer shadow-lg shadow-blue-500/20"
                    >
                      Submit Quote Request
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold mb-2">Quote Request Received!</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Thank you for choosing CoreSlash. Our solutions architect will review your project specs and contact you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setQuoteModalOpen(false);
                      setQuoteSubmitted(false);
                    }}
                    className="px-6 py-2.5 rounded-full bg-muted text-foreground text-sm font-semibold hover:bg-muted/80"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedHeroDemo;

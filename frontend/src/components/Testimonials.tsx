import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "CoreSlash became our invisible engineering department overnight. We scaled our web design agency capacity by 3x without hiring a single internal developer. Their NestJS/React code is clean, documented, and delivered on schedule.",
    author: "Jonathan Vance",
    role: "Founder & Creative Director",
    company: "Vance Design Co. (New York)",
    rating: 5,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    quote: "We sign strict NDAs on every project, and CoreSlash strictly respects them. They commit code directly to our GitHub repositories using generic commits. To our clients, they are part of our internal team.",
    author: "Sarah Lieberman",
    role: "VP of Client Services",
    company: "Apex Marketing Group (Chicago)",
    rating: 5,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    quote: "Their technical SEO optimizations and speed boosts on Next.js platforms are phenomenal. We outsourced an ERP platform construction to their NodeJS team, and our client was blown away by the response time and final delivery.",
    author: "Marcus Brody",
    role: "Director of Operations",
    company: "Solis Tech Agencies (Austin)",
    rating: 5,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const next = () => {
    setIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="py-16 md:py-28 relative z-10 bg-[#F9FAFB] border-b border-gray-200/60 overflow-hidden">
      {/* Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-secondary-indigo/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-6">
            <span className="text-xs font-bold text-secondary-indigo uppercase tracking-widest">Agency Feedback</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            What Our Agency Partners <span className="text-gradient-purple">Say</span>
          </h2>
        </div>

        <div className="relative bg-white border border-gray-200/50 p-8 md:p-16 rounded-[3rem] shadow-xl shadow-gray-200/10">
          <div className="absolute top-8 right-12 opacity-5 text-secondary-indigo">
            <Quote className="w-24 h-24 stroke-[4]" />
          </div>

          <div className="min-h-[220px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex gap-1.5">
                  {[...Array(testimonials[index].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-semibold italic">
                  "{testimonials[index].quote}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[index].img}
                    alt={testimonials[index].author}
                    className="w-14 h-14 rounded-full object-cover border-2 border-secondary-indigo/20 shadow-md"
                  />
                  <div>
                    <h4 className="font-bold text-gray-950 text-base">{testimonials[index].author}</h4>
                    <p className="text-xs text-gray-500 font-bold">{testimonials[index].role}</p>
                    <p className="text-[11px] text-secondary-indigo font-bold tracking-wide uppercase mt-0.5">{testimonials[index].company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-end gap-3 mt-10 md:mt-0">
              <button
                onClick={prev}
                className="p-3.5 rounded-full border border-gray-200 text-gray-600 bg-white hover:bg-secondary-indigo hover:text-white hover:border-secondary-indigo transition-all duration-300 shadow-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="p-3.5 rounded-full border border-gray-200 text-gray-600 bg-white hover:bg-secondary-indigo hover:text-white hover:border-secondary-indigo transition-all duration-300 shadow-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    quote: "CoreSlash's engineering rigor is unmatched. They migrated our legacy corporate systems to React 19 without a single minute of unexpected downtime. Our platform response times dropped from 400ms to under 90ms.",
    name: "Marcus Aurelius",
    role: "Chief Technology Officer",
    company: "NexusAas Systems",
    rating: 5
  },
  {
    quote: "The custom SaaS dashboard designed by CoreSlash has completely modernized our supply chain workflows. The performance is incredibly fluid, and our field teams have noted a substantial reduction in load latency.",
    name: "Elena Rostova",
    role: "Director of Product",
    company: "Optima Logistics",
    rating: 5
  },
  {
    quote: "We commissioned CoreSlash to redesign our flagship e-commerce engine. The result is a headless React setup that loads instantly on mobile. Our conversion rates increased by 22% within the first month.",
    name: "Arthur Pendragon",
    role: "VP of Digital Commerce",
    company: "Veloce International",
    rating: 5
  }
];

export default function TestimonialsList() {
  return (
    <section className="relative py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      {/* Title with left accent vertical border */}
      <div className="flex flex-col items-start gap-4 mb-16">
        <div className="flex items-center">
          <div className="w-[3px] h-6 bg-blue-600 dark:bg-blue-500 rounded-full mr-3" />
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Testimonials
          </h3>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
          What Our Clients Say About CoreSlash
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, index) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative p-8 rounded-3xl bg-white/5 dark:bg-white/[0.02] border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(59,130,246,0.1)] hover:border-blue-500/20 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Specular glass reflection line */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

            <div>
              {/* Star Rating & Quote Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-blue-500/20 group-hover:text-blue-500/40 transition-colors" />
              </div>

              {/* Quote text */}
              <p className="text-foreground/90 italic text-sm leading-[1.7] mb-8 font-medium">
                "{t.quote}"
              </p>
            </div>

            {/* Author details */}
            <div className="border-t border-border/40 pt-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 flex items-center justify-center font-bold text-blue-500 text-sm select-none border border-blue-500/10">
                {t.name.split(" ").map(w => w[0]).join("")}
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">{t.name}</h4>
                <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider mt-0.5">
                  {t.role} &bull; <span className="text-blue-500/90 dark:text-blue-400/90">{t.company}</span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

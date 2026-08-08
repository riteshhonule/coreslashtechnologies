import { motion } from "framer-motion";

export default function TrustedBy() {
  // We'll create mock placeholder text logos representing modern digital brands
  const partners = ["CLOUDSCALE", "NEXUSAAS", "APEXDEV", "OPTICFLOW", "SYNAPSE"];

  return (
    <section className="py-12 border-y border-border/40 bg-card/20 backdrop-blur-sm overflow-hidden w-full">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <h3 className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-8">
          Businesses Trust CoreSlash to Build Modern Digital Experiences
        </h3>
        
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((partner, index) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-lg md:text-xl font-black tracking-widest text-foreground select-none"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

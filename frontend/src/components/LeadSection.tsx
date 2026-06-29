import ContactForm from "./ContactForm";
import { motion } from "framer-motion";

export default function LeadSection() {
  return (
    <section id="contact" className="relative py-12 md:py-16 overflow-hidden bg-dark-black scroll-mt-28">

      {/* Background Animated Glow */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-purple/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 1, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0, margin: "200px" }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
              <span className="text-xs font-bold text-accent-cyan uppercase tracking-[0.2em]">
                Enterprise Trust
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-[1.1]">
              Ready to <span className="text-gradient-purple">Scale</span> <br />
              Your Digital Empire?
            </h2>

            <p className="text-white/50 text-lg mb-12 max-w-lg leading-relaxed">
              Join 150+ global brands that have transformed their digital presence
              with our AI-driven strategies and engineering excellence.
            </p>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 1, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0, margin: "200px" }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Form Glow */}
            <div className="hidden md:block absolute -inset-10 bg-primary-purple/20 blur-[100px] rounded-full pointer-events-none animate-pulse" />

            <div className="relative glass-card p-8 md:p-10 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Book a <span className="text-accent-cyan text-gradient-cyan">Free</span> Session
              </h3>
              <p className="text-white/40 mb-6 text-base">Get a personalized growth roadmap in 30 minutes.</p>

              <ContactForm variant="dark" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}



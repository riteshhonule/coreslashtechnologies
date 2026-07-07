import ContactForm from "./ContactForm";
import { motion } from "framer-motion";

export default function LeadSection() {
  return (
    <section id="contact" className="relative py-12 md:py-16 overflow-hidden bg-white scroll-mt-28">

      {/* Background Animated Glow */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-purple/2 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 1, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0, margin: "200px" }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-8">
              <span className="w-2 h-2 rounded-full bg-secondary-indigo animate-pulse" />
              <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.2em]">
                Enterprise Trust
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-10 leading-[1.1]">
              Ready to <span className="text-gradient-purple">Scale</span> <br />
              Your Digital Empire?
            </h2>

            <p className="text-gray-500 text-lg mb-12 max-w-lg leading-relaxed">
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
            <div className="hidden md:block absolute -inset-10 bg-secondary-indigo/5 blur-[100px] rounded-full pointer-events-none animate-pulse" />

            <div className="relative glass-card p-8 md:p-10 border border-gray-200/60 shadow-xl shadow-gray-200/40 rounded-3xl bg-white">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Book a <span className="text-gradient-cyan">Free</span> Session
              </h3>
              <p className="text-gray-500 mb-6 text-base">Get a personalized growth roadmap in 30 minutes.</p>

              <ContactForm variant="default" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}



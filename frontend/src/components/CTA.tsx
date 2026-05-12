import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";

export default function CTA() {
  const { openModal } = useModal();
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[3rem] overflow-hidden glass-card border-white/10"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/20 via-transparent to-accent-cyan/10" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-light/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 p-12 md:p-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <span className="text-xs font-bold text-accent-cyan uppercase tracking-widest">
                Start Your Journey
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-7xl font-bold text-white mb-8 leading-tight"
            >
              Ready to Accelerate <br />
              <span className="text-gradient-cyan">Your Digital Growth?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-white/50 text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Get a custom-engineered digital strategy designed to dominate your market and scale your operations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <button
                onClick={openModal}
                className="btn-primary"
              >
                Book a Free Consultation
              </button>
              <button
                className="btn-outline"
              >
                Explore All Services
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


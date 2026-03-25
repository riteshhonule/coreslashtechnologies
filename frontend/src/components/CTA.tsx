import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";

export default function CTA() {
  const { openModal } = useModal();
  return (
    <section className="py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[3rem] bg-gray-900 overflow-hidden"
        >
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />

          <div className="relative z-10 p-12 md:p-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-blue-400 font-bold uppercase tracking-[0.3em] text-xs mb-6"
            >
              Let's Create Something Great
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight"
            >
              Ready to accelerate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">your business growth?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Get a custom digital strategy designed specifically for your goals and market conditions.
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
                className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-bold hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
              >
                Book a Free Consultation
              </button>
              <a
                href="/services"
                className="px-10 py-5 bg-white/10 text-white backdrop-blur-md border border-white/20 rounded-2xl font-bold hover:bg-white/20 transition-all"
              >
                Explore Services
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

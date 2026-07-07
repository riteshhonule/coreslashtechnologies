import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function CTA() {
  const { openModal } = useModal();

  return (
    <section className="relative py-12 md:py-16 px-6 overflow-hidden bg-[#F9FAFB]">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-radial-glow opacity-[0.08] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 1, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: "200px" }}
          transition={{ duration: 0.3 }}
          className="relative glass-card bg-white p-12 md:p-24 rounded-[3rem] overflow-hidden text-center border border-gray-200/50 shadow-xl shadow-gray-200/30"
        >
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/5 via-transparent to-secondary-indigo/5 pointer-events-none" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 1, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0, margin: "200px" }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-10"
            >
              <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.3em]">
                Join the Future
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-7xl font-bold text-gray-900 mb-10 leading-[1.1] tracking-tight">
              Ready to <span className="text-gradient-cyan">Modernize</span> <br />
              Your Business?
            </h2>

            <p className="text-gray-500 text-xl md:text-2xl max-w-2xl mx-auto mb-16 leading-relaxed">
              Let's collaborate to build something extraordinary. Our team of 
              AI experts and engineers are ready to scale your vision.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={openModal}
                className="btn-pill btn-primary-glow text-white text-xl px-12 group"
              >
                Get Started Now
                <ArrowRightIcon className="w-6 h-6 transition-transform group-hover:translate-x-2" />
              </button>
              
              <Link to="/services" className="btn-pill btn-glass text-secondary-indigo hover:text-white text-xl px-12 inline-flex items-center justify-center">
                Our Services
              </Link>
            </div>

            {/* Floating Particles */}
            <div className="hidden md:block absolute top-10 left-10 w-2 h-2 bg-secondary-indigo/40 rounded-full animate-pulse" />
            <div className="hidden md:block absolute bottom-20 right-20 w-3 h-3 bg-primary-purple/40 rounded-full animate-pulse delay-700" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}



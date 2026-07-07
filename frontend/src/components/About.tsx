


import { motion } from "framer-motion";
import wall from "../img/CoreslashTechnologies_wall.png";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

export default function About() {

  return (
    <section id="about" className="relative py-16 md:py-32 overflow-hidden bg-white" style={{ position: 'relative', zIndex: 10 }}>
      
      {/* Decorative Glows */}
      <div className="hidden md:block absolute top-1/2 right-0 w-[600px] h-[600px] bg-secondary-indigo/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-24 items-center">
          
          {/* Visual Left */}
          <motion.div
            initial={{ opacity: 1, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0, margin: "200px" }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-gray-200/60 shadow-xl aspect-[4/5] lg:aspect-auto">
              <img
                src={wall}
                alt="Our Workspace"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-all duration-1000 scale-110 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-80" />
            </div>

            {/* Floating Achievement Card */}
            <motion.div 
              initial={{ opacity: 1, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0, margin: "200px" }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="absolute -bottom-10 -right-10 bg-white p-8 border border-gray-200 rounded-3xl shadow-xl shadow-gray-200/50 z-20 hidden md:block"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-secondary-indigo/10 flex items-center justify-center text-secondary-indigo border border-secondary-indigo/15">
                  <CheckBadgeIcon className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">ISO Certified</p>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em]">Quality Excellence</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Right */}
          <motion.div
            initial={{ opacity: 1, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0, margin: "200px" }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-8"
            >
              <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.3em]">
                Our Legacy
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-10 leading-[1.1]">
              Architecting the <span className="text-gradient-purple">Future</span> of Intelligence
            </h2>

            <p className="text-gray-500 leading-relaxed mb-8 md:mb-12 text-xl max-w-xl">
              At CoreSlash Technologies, we don't just build software; we engineer progress. 
              Our mission is to bridge the gap between complex business challenges 
              and intuitive, AI-powered solutions.
            </p>

            <button className="btn-pill btn-glass text-secondary-indigo hover:text-white px-10">
              Discover Our Story
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}




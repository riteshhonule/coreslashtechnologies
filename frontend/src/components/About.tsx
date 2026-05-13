


import { motion } from "framer-motion";
import wall from "../img/CoreslashTechnologies_wall.png";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

export default function About() {
  const stats = [
    { label: "Years Experience", value: "8+" },
    { label: "Projects Delivered", value: "150+" },
    { label: "AI Implementations", value: "40+" },
    { label: "Client Retention", value: "95%" },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden bg-dark-black">
      
      {/* Decorative Glows */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-secondary-indigo/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          
          {/* Visual Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/5] lg:aspect-auto">
              <img
                src={wall}
                alt="Our Workspace"
                className="w-full h-full object-cover transition-all duration-1000 scale-110 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-transparent to-transparent opacity-80" />
            </div>

            {/* Floating Achievement Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-10 -right-10 glass-card p-8 border-accent-cyan/20 shadow-[0_20px_50px_rgba(34,211,238,0.15)] z-20 hidden md:block"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-accent-cyan/10 flex items-center justify-center text-accent-cyan border border-accent-cyan/20">
                  <CheckBadgeIcon className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">ISO Certified</p>
                  <p className="text-xs text-white/30 font-bold uppercase tracking-[0.2em]">Quality Excellence</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <span className="text-xs font-bold text-accent-cyan uppercase tracking-[0.3em]">
                Our Legacy
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-[1.1]">
              Architecting the <span className="text-gradient-purple">Future</span> of Intelligence
            </h2>

            <p className="text-white/50 leading-relaxed mb-12 text-xl max-w-xl">
              At CoreSlash Technologies, we don't just build software; we engineer progress. 
              Our mission is to bridge the gap between complex business challenges 
              and intuitive, AI-powered solutions.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-16">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-xs font-bold text-white/30 uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <button className="btn-pill btn-glass text-white px-10">
              Discover Our Story
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}




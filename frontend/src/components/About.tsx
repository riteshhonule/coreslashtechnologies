


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
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-light/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={wall}
                alt="Our Workspace"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent opacity-60" />
            </div>

            {/* Floating Stat Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-8 -right-8 glass p-6 border border-accent-cyan/30 shadow-glow animate-float hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent-cyan/20 flex items-center justify-center text-accent-cyan">
                  <CheckBadgeIcon className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">ISO Certified</p>
                  <p className="text-xs text-white/50 uppercase tracking-widest">Quality Excellence</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <span className="text-xs font-bold text-accent-cyan uppercase tracking-widest">
                Our Story
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Driving the Future of <span className="text-gradient-purple">Intelligent Technology</span>
            </h2>

            <p className="text-white/60 leading-relaxed mb-10 text-lg">
              At CoreSlash Technologies, we don't just build software; we engineer progress. Our mission is to bridge the gap between complex business challenges and intuitive, AI-powered solutions that scale.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card p-6 border-white/5"
                >
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-white/40 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12">
               <button className="btn-primary">Learn More About Us</button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}



import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Clock, Route, Shield, Zap, Phone, Mail } from "lucide-react";
import { PremiumContactForm } from "@/components/PremiumContactForm";

const features = [
  {
    icon: Clock,
    title: "Free Strategy Session",
    description: "30-Minute Consultation",
  },
  {
    icon: Route,
    title: "Custom Growth Roadmap",
    description: "Tailored to your business",
  },
  {
    icon: Shield,
    title: "NDA Available",
    description: "100% Confidential Discussion",
  },
  {
    icon: Zap,
    title: "Response Within 24 Hours",
    description: "Fast expert support",
  }
];

export const ContactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section id="contact" className="w-full pt-4 pb-8 md:pt-24 md:pb-12 px-4 md:px-8 flex justify-center bg-[#03050c]">
      {/* 1440px Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[1440px] rounded-[32px] overflow-hidden bg-[#050816] border border-white/5 shadow-[0_0_80px_-20px_rgba(79,70,229,0.15)]"
      >
        {/* Abstract Background Elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[20%] left-[40%] w-[30%] h-[30%] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />

        {/* Stars (CSS Generated) */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-0 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                transform: `scale(${Math.random() * 0.5 + 0.2})`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-10 p-6 md:p-10 lg:p-12">

          {/* Left Side (40%) */}
          <div className="w-full lg:w-[40%] flex flex-col">

            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="inline-flex items-center self-start px-3 py-1 mb-6 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-[11px] font-semibold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 uppercase relative z-10">
                Book a Free Session
              </span>
            </motion.div>

            <motion.h2
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1 } }
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.1]"
            >
              Let's Build Something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
                Extraordinary Together
              </span>
            </motion.h2>

            <motion.p
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
              }}
              className="text-white/60 text-base md:text-lg max-w-[520px] mb-6 leading-relaxed"
            >
              Tell us about your project and our experts will prepare a personalized roadmap with technology recommendations, timelines, estimated costs and the best development strategy.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  animate={controls}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 + (idx * 0.1) } }
                  }}
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-[20px] bg-white/[0.02] border border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] backdrop-blur-md group transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:bg-white/[0.08]">
                    <feature.icon size={18} className="text-blue-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <h4 className="text-white text-sm font-semibold mb-1">{feature.title}</h4>
                  <p className="text-white/50 text-xs">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Removed Abstract Animation */}

            {/* Bottom Contact */}
            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.6, delay: 0.8 } }
              }}
              className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mt-2"
            >
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Need immediate assistance?</p>
                <div className="flex gap-6">
                  <a href="tel:+918310711652" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group">
                    <Phone size={16} className="text-blue-400 group-hover:text-purple-400 transition-colors" />
                    <span className="text-sm">+91 8310711652</span>
                  </a>
                  <a href="mailto:contact@coreslashtechnologies.com" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group">
                    <Mail size={16} className="text-blue-400 group-hover:text-purple-400 transition-colors" />
                    <span className="text-sm">contact@coreslashtechnologies.com</span>
                  </a>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Side Form (60%) */}
          <div className="w-full lg:w-[60%] flex items-center justify-center relative z-20">
            <PremiumContactForm />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;


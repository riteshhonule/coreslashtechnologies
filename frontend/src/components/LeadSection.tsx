import googlePartner from "../img/leads/CoreslashTechnologies-solutions-Google-Partner.webp";
import metaPartner from "../img/leads/CoreslashTechnologies-solutions-Meta-Business-Partner.webp";
import person1 from "../img/leads/CoreslashTechnologies_no_1_company_ (1).png";
import person2 from "../img/leads/CoreslashTechnologies_no_1_company_ (2).png";
import person3 from "../img/leads/CoreslashTechnologies_no_1_company_ (3).png";
import person4 from "../img/leads/CoreslashTechnologies_no_1_company_ (4).png";
import ContactForm from "./ContactForm";
import { motion } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";

export default function LeadSection() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-dark-black scroll-mt-28">

      {/* Background Animated Glow */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-purple/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

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

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mb-16">
              {[
                { label: "Projects Delivered", value: "250+" },
                { label: "Client Satisfaction", value: "99%" },
              ].map((stat, i) => (
                <div key={i} className="glass-card p-6 border-white/5">
                  <p className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-xs font-bold text-white/30 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-5 opacity-80 hover:opacity-100 transition-opacity duration-500">
              <img src={googlePartner} alt="Google Partner" loading="lazy" decoding="async" className="h-10 w-auto object-contain" />
              <img src={metaPartner} alt="Meta Partner" loading="lazy" decoding="async" className="h-10 w-auto object-contain" />
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-6 mt-12">
              <div className="flex -space-x-3">
                {[person1, person2, person3, person4].map((p, i) => (
                  <img key={i} src={p} alt="Client" loading="lazy" decoding="async" className="w-12 h-12 rounded-full border-2 border-dark-black object-cover transition-all duration-300" />
                ))}
              </div>
              <div>
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-accent-cyan" />
                  ))}
                </div>
                <p className="text-white/40 text-sm font-medium">Trusted by 500+ professionals</p>
              </div>
            </div>
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



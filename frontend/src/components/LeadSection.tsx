import googlePartner from "../img/leads/CoreslashTechnologies-solutions-Google-Partner.webp";
import metaPartner from "../img/leads/CoreslashTechnologies-solutions-Meta-Business-Partner.webp";
import person1 from "../img/leads/CoreslashTechnologies_no_1_company_ (1).png";
import person2 from "../img/leads/CoreslashTechnologies_no_1_company_ (2).png";
import person3 from "../img/leads/CoreslashTechnologies_no_1_company_ (3).png";
import person4 from "../img/leads/CoreslashTechnologies_no_1_company_ (4).png";
import bgImage from "../img/process/CoreslashTechnologiestechnologiesstep4.avif";
import ContactForm from "./ContactForm";
import { motion } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";

export default function LeadSection() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background with Blur */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(40px) saturate(150%)",
        }}
      />
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-bg-dark/80 to-bg-dark z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
              <span className="text-xs font-bold text-accent-cyan uppercase tracking-widest">
                Growth Accelerated
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Ready to <span className="text-gradient-purple">Scale</span> Your Digital Empire?
            </h2>

            <p className="text-white/60 text-lg mb-12 max-w-lg leading-relaxed">
              Join 150+ brands that have transformed their digital presence with our AI-driven strategies and engineering excellence.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="glass-card p-6 border-white/5 group hover:border-accent-cyan/30 transition-all">
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Official Partner</p>
                <img src={googlePartner} alt="Google Partner" className="h-10 w-auto opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="glass-card p-6 border-white/5 group hover:border-accent-cyan/30 transition-all">
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Meta Partner</p>
                <img src={metaPartner} alt="Meta Partner" className="h-10 w-auto opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[person1, person2, person3, person4].map((p, i) => (
                  <img key={i} src={p} alt="Client" className="w-12 h-12 rounded-full border-2 border-bg-dark object-cover" />
                ))}
              </div>
              <div>
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-accent-cyan" />
                  ))}
                </div>
                <p className="text-white/60 text-sm font-medium">Trusted by 500+ professionals</p>
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Form Glow */}
            <div className="absolute -inset-4 bg-primary-accent/20 blur-3xl rounded-[3rem] pointer-events-none" />
            
            <div className="relative glass-card p-8 md:p-12 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Book a <span className="text-accent-cyan">Discovery</span> Session
              </h3>
              <p className="text-white/50 mb-8">Get a personalized growth roadmap in 30 minutes.</p>
              
              <ContactForm variant="dark" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}


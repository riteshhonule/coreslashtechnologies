import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import WhyChooseUs from "../components/WhyChooseUs";
import { SparklesIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

// Importing images
import websiteImg from "../img/website.webp";
import ppcImg from "../img/ads.webp";
import ecommerceImg from "../img/e-commerce.webp";
import socialImg from "../img/FacebookInstagram-Ads.webp";
import googleAdsImg from "../img/google-ads.webp";
import seoImg from "../img/SEO-optimization.webp";
import managementImg from "../img/social-media-management.webp";

const services = [
  {
    title: "Website Architectures",
    desc: "Bespoke, high-performance digital ecosystems tailored for enterprise scale.",
    image: websiteImg,
    link: "/services/website-development"
  },
  {
    title: "E-Commerce Engines",
    desc: "Fluid retail experiences with secure, high-velocity transaction layers.",
    image: ecommerceImg,
    link: "/services/ecommerce"
  },
  {
    title: "PPC Ad Intelligence",
    desc: "Algorithmic bidding and intent-based targeting for aggressive ROI.",
    image: ppcImg,
    link: "/services/ppc"
  },
  {
    title: "Google Ads Growth",
    desc: "Precision-engineered search dominance to capture high-intent leads.",
    image: googleAdsImg,
    link: "/services/ppc"
  },
  {
    title: "Paid Social Systems",
    desc: "Creative social architectures designed for viral engagement and conversion.",
    image: socialImg,
    link: "/services/ppc"
  },
  {
    title: "SEO Data Dominance",
    desc: "Neural-driven search optimization to establish industry authority.",
    image: seoImg,
    link: "/services/seo"
  },
  {
    title: "Social Ecosystems",
    desc: "Strategic community management and brand narrative development.",
    image: managementImg,
    link: "/services"
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-dark-black">
      {/* ================= HERO HEADER ================= */}
      <section className="relative pt-[180px] pb-32 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-purple/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <SparklesIcon className="w-4 h-4 text-accent-cyan" />
            <span className="text-xs font-bold text-accent-cyan uppercase tracking-[0.3em]">
              Our Capability Matrix
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-bold text-white mb-10 leading-[1.1] tracking-tight"
          >
            Future-Proof <br />
            <span className="text-gradient-purple">Intelligence</span> Modules.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/40 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
          >
            We architect bespoke technology solutions that empower ambitious brands 
            to dominate their digital categories.
          </motion.p>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.05 }}
              className="group relative"
            >
              <Link to={service.link} className="block h-full">
                <div className="glass-card h-full p-10 rounded-[3rem] border-white/5 group-hover:border-accent-cyan/20 transition-all duration-500 relative overflow-hidden flex flex-col">
                  {/* Hover Image Reveal */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000">
                    <img src={service.image} alt="" className="w-full h-full object-cover grayscale" />
                  </div>
                  
                  <div className="relative z-10 mb-8">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent-cyan/10 transition-colors duration-500">
                      <img src={service.image} alt={service.title} className="w-12 h-12 object-cover rounded-lg" />
                    </div>
                  </div>

                  <h3 className="relative z-10 text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-accent-cyan transition-colors">
                    {service.title}
                  </h3>

                  <p className="relative z-10 text-white/40 leading-relaxed font-medium mb-10 flex-grow group-hover:text-white/60 transition-colors">
                    {service.desc}
                  </p>

                  <div className="relative z-10 flex items-center gap-2 text-accent-cyan font-bold text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                    EXPLORE MODULE <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-16 md:p-24 rounded-[4rem] border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-purple/10 to-transparent pointer-events-none" />
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 tracking-tight">
              Ready for <span className="text-gradient-cyan">Global Scale?</span>
            </h2>
            
            <p className="text-white/40 text-xl mb-12 leading-relaxed">
              Let's architect a custom technology roadmap to achieve your strategic objectives.
            </p>

            <Link
              to="/contact"
              className="btn-pill btn-primary-glow text-white text-xl px-16 inline-block"
            >
              Get Custom Proposal
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <WhyChooseUs />
    </div>
  );
}
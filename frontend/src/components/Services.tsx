

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import WhyChooseUs from "../components/WhyChooseUs";

// Importing images from src/img
import websiteImg from "../img/website.webp";
import ppcImg from "../img/ads.webp"; // Assuming these names based on your upload
import ecommerceImg from "../img/e-commerce.webp";
import socialImg from "../img/FacebookInstagram-Ads.webp";
import googleAdsImg from "../img/google-ads.webp";
import seoImg from "../img/SEO-optimization.webp";
import managementImg from "../img/social-media-management.webp";


const services = [
  {
    title: "Website Development",
    desc: "Build stunning, responsive websites tailored to your brand with SEO-friendly, user-centric design.",
    image: websiteImg,
    color: "blue",
    glow: "rgba(59, 130, 246, 0.5)",
    link: "/services/website-development"
  },
  {
    title: "E-Commerce Websites",
    desc: "End-to-end secure e-commerce solutions from product listings to payment gateways.",
    image: ecommerceImg,
    color: "purple",
    glow: "rgba(168, 85, 247, 0.5)",
    link: "/services/ecommerce"
  },
  {
    title: "PPC Ads Services",
    desc: "Expertly managed pay-per-click campaigns focused on high ROI and performance.",
    image: ppcImg,
    color: "orange",
    glow: "rgba(249, 115, 22, 0.5)",
    link: "/services/ppc"
  },
  {
    title: "Google Ads Services",
    desc: "Targeted Google Ads strategies to maximize reach and generate quality leads.",
    image: googleAdsImg,
    color: "cyan",
    glow: "rgba(6, 182, 212, 0.5)",
    link: "/services/ppc"
  },
  {
    title: "Facebook / Instagram Ads",
    desc: "Creative social media campaigns that engage audiences and deliver measurable results.",
    image: socialImg,
    color: "teal",
    glow: "rgba(20, 184, 166, 0.5)",
    link: "/services/ppc"
  },
  {
    title: "Search Engine Optimization (SEO)",
    desc: "Proven SEO strategies to improve rankings, organic traffic, and conversions.",
    image: seoImg,
    color: "green",
    glow: "rgba(34, 197, 94, 0.5)",
    link: "/services/seo"
  },
  {
    title: "Social Media Management",
    desc: "Complete social media handling including content creation and brand consistency.",
    image: managementImg,
    color: "rose",
    glow: "rgba(244, 63, 94, 0.5)",
    link: "/services"
  },
];

const colorVariants = {
  blue: "from-blue-600 to-blue-400 text-blue-600 border-blue-200 group-hover:border-blue-500 bg-blue-50/30",
  purple: "from-purple-600 to-purple-400 text-purple-600 border-purple-200 group-hover:border-purple-500 bg-purple-50/30",
  orange: "from-orange-600 to-orange-400 text-orange-600 border-orange-200 group-hover:border-orange-500 bg-orange-50/30",
  cyan: "from-cyan-600 to-cyan-400 text-cyan-600 border-cyan-200 group-hover:border-cyan-500 bg-cyan-50/30",
  teal: "from-teal-600 to-teal-400 text-teal-600 border-teal-200 group-hover:border-teal-500 bg-teal-50/30",
  green: "from-green-600 to-green-400 text-green-600 border-green-200 group-hover:border-green-500 bg-green-50/30",
  rose: "from-rose-600 to-rose-400 text-rose-600 border-rose-200 group-hover:border-rose-500 bg-rose-50/30",
};

export default function Services() {
  return (
    <>
      <section id="services" className="relative py-24 bg-white overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-50/40 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 mb-6 shadow-sm"
            >
              <span className="text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent uppercase tracking-[0.2em]">
                Our Services
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.2] mb-6 tracking-tight"
            >
              What We Are Offering For You?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-lg text-gray-500 leading-relaxed font-medium"
            >
              Our services are designed to elevate your online presence, grow your audience, and drive real results for your business.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
                className="group relative h-full"
              >
                {/* Glass Card */}
                <motion.div
                  whileHover={{
                    y: -10,
                    boxShadow: `0 20px 40px -10px ${service.glow}`,
                  }}
                  className={`h-full p-8 rounded-[2.5rem] bg-white/70 backdrop-blur-[16px] border-2 transition-all duration-500 flex flex-col items-start relative overflow-hidden ${colorVariants[service.color as keyof typeof colorVariants].split(' ').filter(c => c.includes('border')).join(' ')}`}
                >
                  {/* Accent Highlight Background */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${colorVariants[service.color as keyof typeof colorVariants].split(' ')[0]}`} />

                  {/* Image Container */}
                  <div className={`relative z-10 w-24 h-24 rounded-3xl bg-gradient-to-br ${colorVariants[service.color as keyof typeof colorVariants].split(' ').slice(0, 2).join(' ')} shadow-xl shadow-white/20 mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 flex items-center justify-center overflow-hidden border-4 border-white/40`}>
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>

                  <h3 className="relative z-10 text-xl font-bold text-gray-900 mb-4 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="relative z-10 text-gray-500 leading-relaxed text-[0.95rem] font-medium">
                    {service.desc}
                  </p>

                  {/* Bottom Border Glow Overlay */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${colorVariants[service.color as keyof typeof colorVariants].split(' ').slice(0, 2).join(' ')} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </motion.div>
                <Link to={service.link} className="absolute inset-0 z-20" aria-label={`View ${service.title}`} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 text-center"
          >
            <div className="inline-block p-1 rounded-[2rem] bg-gray-50/50 backdrop-blur-sm border border-gray-100 shadow-inner">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white rounded-[1.8rem] font-bold transition-all duration-300 hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200 active:scale-95"
              >
                <span className="relative z-10">Get a Custom Proposal</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="relative z-10"
                >
                  →
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <WhyChooseUs />
    </>
  );
}
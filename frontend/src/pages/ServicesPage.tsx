import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import WhyChooseUs from "../components/WhyChooseUs";

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
    title: "Website Development",
    desc: "Build stunning, responsive websites tailored to your brand.",
    image: websiteImg,
    color: "blue",
    glow: "rgba(59, 130, 246, 0.5)",
    link: "/services/website-development"
  },
  {
    title: "E-Commerce Websites",
    desc: "Secure e-commerce solutions with payment integration.",
    image: ecommerceImg,
    color: "purple",
    glow: "rgba(168, 85, 247, 0.5)",
    link: "/services/ecommerce"
  },
  {
    title: "PPC Ads Services",
    desc: "High ROI pay-per-click campaigns.",
    image: ppcImg,
    color: "orange",
    glow: "rgba(249, 115, 22, 0.5)",
    link: "/services/ppc"
  },
  {
    title: "Google Ads Services",
    desc: "Targeted Google Ads for lead generation.",
    image: googleAdsImg,
    color: "cyan",
    glow: "rgba(6, 182, 212, 0.5)",
    link: "/services/ppc"
  },
  {
    title: "Facebook / Instagram Ads",
    desc: "Creative social media ad campaigns.",
    image: socialImg,
    color: "teal",
    glow: "rgba(20, 184, 166, 0.5)",
    link: "/services/ppc"
  },
  {
    title: "SEO Optimization",
    desc: "Improve rankings and organic traffic.",
    image: seoImg,
    color: "green",
    glow: "rgba(34, 197, 94, 0.5)",
    link: "/services/seo"
  },
  {
    title: "Social Media Management",
    desc: "Complete social media handling.",
    image: managementImg,
    color: "rose",
    glow: "rgba(244, 63, 94, 0.5)",
    link: "/services"
  },
];

// Mapping colors to Tailwind classes for consistency
const colorVariants: Record<string, string> = {
  blue: "border-blue-200 hover:border-blue-500 from-blue-500 to-blue-600 bg-blue-500",
  purple: "border-purple-200 hover:border-purple-500 from-purple-500 to-purple-600 bg-purple-500",
  orange: "border-orange-200 hover:border-orange-500 from-orange-500 to-orange-600 bg-orange-500",
  cyan: "border-cyan-200 hover:border-cyan-500 from-cyan-500 to-cyan-600 bg-cyan-500",
  teal: "border-teal-200 hover:border-teal-500 from-teal-500 to-teal-600 bg-teal-500",
  green: "border-green-200 hover:border-green-500 from-green-500 to-green-600 bg-green-500",
  rose: "border-rose-200 hover:border-rose-500 from-rose-500 to-rose-600 bg-rose-500",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ================= DARK HEADER ================= */}
      <section className="relative pt-[120px] mt-[90px] md:pt-[140px] pb-20 md:pb-32 bg-slate-900 overflow-hidden z-10">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent z-20" />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10 md:mt-[20px]">
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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            What We Are Offering For You?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Our services help grow your business online with strategic expertise and custom solutions.
          </motion.p>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <div className="max-w-7xl mx-auto px-6 mt-16 relative z-30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {services.map((service, idx) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
            className="group relative h-full"
          >
            <motion.div
              whileHover={{
                y: -10,
                boxShadow: `0 20px 40px -10px ${service.glow}`,
              }}
              className={`h-full p-8 rounded-[2.5rem] bg-white backdrop-blur-[16px] border-2 transition-all duration-500 flex flex-col items-start relative overflow-hidden ${colorVariants[service.color].split(' ')[0]} ${colorVariants[service.color].split(' ')[1]}`}
            >
              <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${colorVariants[service.color].split(' ').pop()}`} />

              <div className={`relative z-10 w-24 h-24 rounded-3xl bg-gradient-to-br ${colorVariants[service.color].split(' ').slice(2, 4).join(' ')} shadow-xl shadow-white/20 mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 flex items-center justify-center overflow-hidden border-4 border-white/40`}>
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>

              <h3 className="relative z-10 text-xl font-bold text-gray-900 mb-4 tracking-tight">
                {service.title}
              </h3>

              <p className="relative z-10 text-gray-500 leading-relaxed text-[0.95rem] font-medium">
                {service.desc}
              </p>

              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${colorVariants[service.color].split(' ').slice(2, 4).join(' ')} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </motion.div>
            <Link to={service.link} className="absolute inset-0 z-20" aria-label={`View ${service.title}`} />
          </motion.div>
        ))}
      </div>

      {/* ================= CALL TO ACTION ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-20 text-center pb-20"
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

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-white">
        <WhyChooseUs />
      </section>
    </div>
  );
}


import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import WhyChooseUs from "../components/WhyChooseUs";
import { 
  CodeBracketIcon, 
  ShoppingCartIcon, 
  RocketLaunchIcon, 
  MagnifyingGlassIcon,
  PresentationChartLineIcon,
  CircleStackIcon,
  CpuChipIcon
} from "@heroicons/react/24/outline";

const services = [
  {
    title: "Website Development",
    desc: "Next-gen, lightning-fast websites built with modern frameworks and a focus on conversion and scalability.",
    icon: <CodeBracketIcon className="w-8 h-8" />,
    link: "/services/website-development"
  },
  {
    title: "AI & Software Systems",
    desc: "Custom enterprise software and intelligent automation systems powered by cutting-edge AI technologies.",
    icon: <CpuChipIcon className="w-8 h-8" />,
    link: "/services/software-development"
  },
  {
    title: "E-Commerce Solutions",
    desc: "Robust, secure, and highly scalable online storefronts designed to maximize sales and customer retention.",
    icon: <ShoppingCartIcon className="w-8 h-8" />,
    link: "/services/ecommerce"
  },
  {
    title: "SEO Optimization",
    desc: "Strategic search engine optimization to dominate rankings and drive high-quality organic traffic.",
    icon: <MagnifyingGlassIcon className="w-8 h-8" />,
    link: "/services/seo"
  },
  {
    title: "Digital Growth",
    desc: "Comprehensive digital marketing strategies encompassing PPC, social media, and content performance.",
    icon: <RocketLaunchIcon className="w-8 h-8" />,
    link: "/services/digital-marketing"
  },
  {
    title: "Data Analytics",
    desc: "Transforming raw data into actionable insights with advanced visualization and predictive modelling.",
    icon: <PresentationChartLineIcon className="w-8 h-8" />,
    link: "/services"
  },
  {
    title: "Cloud Infrastructure",
    desc: "Secure, scalable cloud architecture and DevOps solutions for modern enterprise applications.",
    icon: <CircleStackIcon className="w-8 h-8" />,
    link: "/services"
  },
  {
    title: "App Development",
    desc: "Immersive mobile and desktop applications built for performance across all devices and platforms.",
    icon: <CodeBracketIcon className="w-8 h-8" />,
    link: "/services/App-development"
  },
];

export default function Services() {
  return (
    <>
      <section id="services" className="relative py-32 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary-accent/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <span className="text-xs font-bold text-accent-cyan uppercase tracking-widest">
                Our Expertise
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Transforming Ideas into <span className="text-gradient-cyan">Digital Reality</span>
            </motion.h2>

            <p className="text-lg text-white/60 leading-relaxed">
              We leverage the latest technologies and AI-driven methodologies to build products that solve complex business problems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <Link to={service.link} className="block group">
                  <div className="glass-card h-full p-8 relative overflow-hidden group-hover:border-accent-cyan/50">
                    {/* Hover Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-cyan/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-accent/20 to-accent-blue/10 flex items-center justify-center mb-6 text-accent-cyan group-hover:scale-110 transition-transform duration-500 border border-white/10">
                      {service.icon}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-cyan transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-white/50 text-sm leading-relaxed mb-6">
                      {service.desc}
                    </p>

                    <div className="flex items-center text-accent-cyan text-xs font-bold uppercase tracking-wider gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                      Learn More <span className="text-lg">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <Link
              to="/services"
              className="btn-outline group inline-flex items-center gap-3"
            >
              Explore All Services
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>
      </section>
      <WhyChooseUs />
    </>
  );
}
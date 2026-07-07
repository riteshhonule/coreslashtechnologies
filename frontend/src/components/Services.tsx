

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
  CpuChipIcon,
  DevicePhoneMobileIcon
} from "@heroicons/react/24/outline";

const services = [
  {
    title: "Website Development",
    desc: "Next-gen, lightning-fast websites built with modern frameworks and a focus on conversion and scalability.",
    icon: <CodeBracketIcon className="w-7 h-7" />,
    link: "/services/website-development",
    size: "lg",
    bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "AI & Software Systems",
    desc: "Custom enterprise software and intelligent automation systems powered by cutting-edge AI technologies.",
    icon: <CpuChipIcon className="w-7 h-7" />,
    link: "/services/software-development",
    size: "md",
    bgImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "E-Commerce Solutions",
    desc: "Robust, secure, and highly scalable online storefronts designed to maximize sales.",
    icon: <ShoppingCartIcon className="w-7 h-7" />,
    link: "/services/ecommerce",
    size: "md",
    bgImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "SEO Optimization",
    desc: "Strategic search engine optimization to dominate rankings and drive high-quality organic traffic.",
    icon: <MagnifyingGlassIcon className="w-7 h-7" />,
    link: "/services/seo",
    size: "sm",
    bgImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Digital Growth",
    desc: "Comprehensive digital marketing strategies encompassing PPC and social media.",
    icon: <RocketLaunchIcon className="w-7 h-7" />,
    link: "/services/digital-marketing",
    size: "sm",
    bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Data Analytics",
    desc: "Transforming raw data into actionable insights with advanced visualization.",
    icon: <PresentationChartLineIcon className="w-7 h-7" />,
    link: "/services",
    size: "md",
    bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Cloud Infrastructure",
    desc: "Secure, scalable cloud architecture and DevOps solutions.",
    icon: <CircleStackIcon className="w-7 h-7" />,
    link: "/services",
    size: "md",
    bgImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "App Development",
    desc: "Immersive mobile and desktop applications built for performance across all devices.",
    icon: <DevicePhoneMobileIcon className="w-7 h-7" />,
    link: "/services/App-development",
    size: "md",
    bgImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80"
  },
];

export default function Services() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = document.getElementsByClassName("service-card-interactive");
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <>
      <section id="services" className="relative pt-16 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-white" onMouseMove={handleMouseMove}>
        
        {/* Decorative Glows */}
        <div className="hidden md:block absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary-purple/2 rounded-full blur-[120px] pointer-events-none" />
        <div className="hidden md:block absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-secondary-indigo/3 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="mx-auto max-w-[1600px] px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-24">
            <motion.div
              initial={{ opacity: 1, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0, margin: "200px" }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-8"
            >
              <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.2em]">
                Our Expertise
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 1, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: "200px" }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-8"
            >
              Transforming Ideas into <br />
              <span className="text-gradient-cyan">Digital Reality</span>
            </motion.h2>

            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              We leverage the latest technologies and AI-driven methodologies to build 
              products that solve complex business problems.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px]">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 1, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0, margin: "200px" }}
                transition={{ duration: 0.3, delay: idx * 0.02 }}
                className={`group service-card-interactive ${
                  service.size === "lg" ? "md:col-span-2 md:row-span-2" : 
                  service.size === "md" ? "md:col-span-2" : "md:col-span-1"
                }`}
              >
                <Link to={service.link} className="block h-full">
                  <div className="glass-card h-full p-6 md:p-8 relative overflow-hidden flex flex-col items-center text-center justify-between group-hover:border-secondary-indigo/40">
                    
                    {/* Spotlight Effect */}
                    <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(115,124,253,0.08),transparent_40%)]" />

                    {/* Background Image Overlay */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-[0.015] group-hover:opacity-[0.04] transition-all duration-700 pointer-events-none scale-100 group-hover:scale-105 grayscale brightness-95"
                      style={{ backgroundImage: `url(${service.bgImage})` }}
                    />

                    <div className="relative z-10 w-full">
                      <div className="w-14 h-14 rounded-2xl bg-secondary-indigo/5 border border-secondary-indigo/15 flex items-center justify-center text-secondary-indigo mx-auto mb-5 md:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:bg-secondary-indigo/10">
                        {service.icon}
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 transition-colors group-hover:text-secondary-indigo">
                        {service.title}
                      </h3>

                      <p className="text-gray-500 text-sm md:text-base leading-relaxed line-clamp-3 font-medium">
                        {service.desc}
                      </p>
                    </div>

                    <div className="relative z-10 w-full flex items-center justify-center gap-2 text-secondary-indigo text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                      Learn More <span>→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>


          <motion.div
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0, margin: "200px" }}
            className="mt-12 md:mt-24 text-center"
          >
            <Link
              to="/services"
              className="btn-pill btn-glass inline-flex items-center gap-2.5 text-secondary-indigo hover:text-white px-6 py-2.5 text-sm"
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


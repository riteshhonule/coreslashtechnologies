

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
    size: "lg"
  },
  {
    title: "AI & Software Systems",
    desc: "Custom enterprise software and intelligent automation systems powered by cutting-edge AI technologies.",
    icon: <CpuChipIcon className="w-7 h-7" />,
    link: "/services/software-development",
    size: "md"
  },
  {
    title: "E-Commerce Solutions",
    desc: "Robust, secure, and highly scalable online storefronts designed to maximize sales.",
    icon: <ShoppingCartIcon className="w-7 h-7" />,
    link: "/services/ecommerce",
    size: "md"
  },
  {
    title: "SEO Optimization",
    desc: "Strategic search engine optimization to dominate rankings and drive high-quality organic traffic.",
    icon: <MagnifyingGlassIcon className="w-7 h-7" />,
    link: "/services/seo",
    size: "sm"
  },
  {
    title: "Digital Growth",
    desc: "Comprehensive digital marketing strategies encompassing PPC and social media.",
    icon: <RocketLaunchIcon className="w-7 h-7" />,
    link: "/services/digital-marketing",
    size: "sm"
  },
  {
    title: "Data Analytics",
    desc: "Transforming raw data into actionable insights with advanced visualization.",
    icon: <PresentationChartLineIcon className="w-7 h-7" />,
    link: "/services",
    size: "md"
  },
  {
    title: "Cloud Infrastructure",
    desc: "Secure, scalable cloud architecture and DevOps solutions.",
    icon: <CircleStackIcon className="w-7 h-7" />,
    link: "/services",
    size: "md"
  },
  {
    title: "App Development",
    desc: "Immersive mobile and desktop applications built for performance across all devices.",
    icon: <DevicePhoneMobileIcon className="w-7 h-7" />,
    link: "/services/App-development",
    size: "lg"
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
      <section id="services" className="relative py-32 overflow-hidden bg-dark-black" onMouseMove={handleMouseMove}>
        
        {/* Decorative Glows */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary-purple/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="mx-auto max-w-[1600px] px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <span className="text-xs font-bold text-accent-cyan uppercase tracking-[0.2em]">
                Our Expertise
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white mb-8"
            >
              Transforming Ideas into <br />
              <span className="text-gradient-cyan">Digital Reality</span>
            </motion.h2>

            <p className="text-lg text-white/70 leading-relaxed font-medium">
              We leverage the latest technologies and AI-driven methodologies to build 
              products that solve complex business problems.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px]">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className={`group service-card-interactive ${
                  service.size === "lg" ? "md:col-span-2 md:row-span-2" : 
                  service.size === "md" ? "md:col-span-2" : "md:col-span-1"
                }`}
              >
                <Link to={service.link} className="block h-full">
                  <div className="glass-card h-full p-8 relative overflow-hidden flex flex-col justify-between group-hover:border-accent-cyan/50">
                    
                    {/* Spotlight Effect */}
                    <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(34,211,238,0.15),transparent_40%)]" />

                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-cyan mb-8 transition-all duration-500 group-hover:scale-110 group-hover:bg-accent-cyan/10">
                        {service.icon}
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-4 transition-colors group-hover:text-accent-cyan">
                        {service.title}
                      </h3>

                      <p className="text-white/60 text-base leading-relaxed line-clamp-3 font-medium">
                        {service.desc}
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center gap-2 text-accent-cyan text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                      Learn More <span>→</span>
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
            className="mt-24 text-center"
          >
            <Link
              to="/services"
              className="btn-pill btn-glass inline-flex items-center gap-3 text-white"
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


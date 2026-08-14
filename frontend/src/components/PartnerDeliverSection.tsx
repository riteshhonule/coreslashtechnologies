import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PartnerDeliverSection() {
  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Websites, web applications, redesign & performance",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
      href: "/services/web-development",
    },
    {
      id: 2,
      title: "Custom Software",
      description: "ERP, CRM, dashboards & business applications",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      href: "/services/software-systems",
    },
    {
      id: 3,
      title: "Backend & APIs",
      description: "APIs, integrations, authentication & databases",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      href: "/services/web-development",
    },
    {
      id: 4,
      title: "AI & Automation",
      description: "AI integrations, automation, chatbots & intelligent tools",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
      href: "/services/ai-automation",
    },
    {
      id: 5,
      title: "Technical SEO",
      description: "Technical SEO, Core Web Vitals, performance & schema",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      href: "/services/seo-solutions",
    },
    {
      id: 6,
      title: "Maintenance & Support",
      description: "Bug fixes, updates, monitoring & ongoing development",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      href: "/services/web-development",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Header */}
        <div className="flex flex-col items-start mb-12 md:mb-16">
          
          {/* Small Label */}
          <div className="flex items-center mb-4">
            <div className="w-[3px] h-6 bg-[#1769E8] rounded-full mr-3" />
            <span
              className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1769E8]"
              style={{ fontFamily: "Cambria, Georgia, serif" }}
            >
              What We Can Deliver
            </span>
          </div>

          {/* Main Heading */}
          <h2
            style={{ fontFamily: "Cambria, Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0B1738] tracking-tight leading-tight max-w-3xl"
          >
            Technology Solutions That
            <span className="text-[#1769E8]"> Move Projects Forward.</span>
          </h2>

          {/* Description */}
          <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-500 leading-relaxed max-w-2xl font-sans">
            From websites and custom software to AI, automation and technical
            support, CoreSlash provides the technology expertise you need to
            deliver more for your clients.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((item, idx: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                delay: idx * 0.07,
                duration: 0.55,
                ease: "easeOut",
              }}
              className="group relative h-full rounded-[2rem] overflow-hidden border border-white/60 bg-slate-50 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(23,105,232,0.15)] transition-all duration-500 hover:-translate-y-1 flex flex-col"
            >
              {/* Clickable Area */}
              <Link
                to={item.href}
                className="absolute inset-0 z-30"
                aria-label={`Explore ${item.title}`}
              />

              {/* Full Background Image */}
              <div className="absolute inset-0 z-0 bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Top Image Clear Area */}
              <div className="relative h-[200px] w-full shrink-0 z-10">
                {/* Subtle fade transitioning into the glass */}
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/30 to-transparent" />
              </div>

              {/* Bottom Liquid Glass Content Area */}
              <div className="relative flex-1 p-5 md:px-6 md:py-5 flex flex-col justify-between bg-white/50 backdrop-blur-xl backdrop-saturate-150 z-10 border-t border-white/60">
                
                {/* Ambient Depth and Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/20 to-[#1769E8]/10 pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 pointer-events-none" />
                
                <div className="relative z-20">
                  {/* Service Title */}
                  <h3
                    style={{ fontFamily: "Cambria, Georgia, serif" }}
                    className="text-xl md:text-[22px] font-bold text-[#0B1738] group-hover:text-[#1769E8] transition-colors duration-300 leading-tight mb-2 drop-shadow-sm"
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13px] text-slate-600 font-sans leading-relaxed mb-4 font-medium drop-shadow-sm">
                    {item.description}
                  </p>
                </div>

                {/* Bottom CTA Button */}
                <div className="relative z-20 w-full py-2.5 rounded-[10px] bg-white/70 backdrop-blur-md text-[#1769E8] text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-[#1769E8] group-hover:border-[#1769E8] group-hover:text-white transition-all duration-300 border border-white shadow-sm">
                  EXPLORE
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

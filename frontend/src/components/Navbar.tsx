import { useEffect, useState } from "react";
import { envConfig } from "../config/env.config";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../img/CoreslashTechnologies-solutions-main-logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  const servicesLinks = [
    { to: "/services", label: "All Services" },
    { to: "/services/website-development", label: "Web Development" },
    { to: "/services/App-development", label: "App Development" },
    { to: "/services/shopify-development", label: "Shopify Development" },
    { to: "/services/software-development", label: "Software Systems" },
    { to: "/services/digital-marketing", label: "Digital Marketing" },
    { to: "/services/seo", label: "SEO Solutions" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-4" : "py-8"
        }`}
    >
      <div className="mx-auto max-w-[1600px] px-4 md:px-6">
        <nav
          className={`flex items-center justify-between px-4 md:px-8 py-3 md:py-4 rounded-full transition-all duration-500 ${scrolled
              ? "bg-dark-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              : "bg-transparent border border-transparent"
            }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img
              src={logo}
              alt="Coreslash Technologies"
              className="h-6 md:h-9 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => {
              const isActive = location.pathname === link.to || (link.label === "Services" && location.pathname.includes("/services"));
              
              if (link.label === "About") {
                return (
                  <div key="services-dropdown" className="relative"
                    onMouseEnter={() => setHoveredService(true)}
                    onMouseLeave={() => setHoveredService(false)}>
                    <div className={`flex items-center gap-1.5 px-5 py-2 text-sm font-bold uppercase tracking-widest rounded-full cursor-pointer transition-all duration-300 ${location.pathname.includes("/services") ? "text-accent-cyan" : "text-white/60 hover:text-white"
                      }`}>
                      Services
                      <ChevronDownIcon className={`w-3 h-3 transition-transform duration-500 ${hoveredService ? "rotate-180" : ""}`} />
                    </div>

                    <AnimatePresence>
                      {hoveredService && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 15, scale: 0.95 }}
                          className="absolute top-full left-0 mt-4 w-72 p-3 bg-dark-black/90 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                        >
                          {servicesLinks.map((service) => (
                            <Link
                              key={service.to}
                              to={service.to}
                              className="block px-5 py-3 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-accent-cyan hover:bg-white/5 rounded-2xl transition-all"
                            >
                              {service.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-5 py-2 text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${isActive ? "text-white" : "text-white/60 hover:text-white"
                    }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-glow"
                      className="absolute inset-0 bg-white/5 rounded-full border border-white/10"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-6">
            <a
              href={envConfig.social.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-3 px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-500 bg-white text-dark-black hover:bg-accent-cyan hover:scale-105 active:scale-95 shadow-glow-cyan"
            >
              <FaWhatsapp className="text-lg" />
              <span>Connect</span>
            </a>

            <button
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="w-8 h-8" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[60] bg-dark-black md:hidden flex flex-col"
          >
            <div className="flex justify-between items-center p-8 border-b border-white/5">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-full bg-white/5 text-white"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              <nav className="space-y-6">
                {links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-4xl font-bold text-white hover:text-accent-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-10 space-y-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Services</p>
                  {servicesLinks.map((service) => (
                    <Link
                      key={service.to}
                      to={service.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xl font-bold text-white/50 hover:text-accent-cyan"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </nav>

              <div className="pt-12">
                <a
                  href={envConfig.social.whatsappLink}
                  className="flex items-center justify-center gap-4 w-full py-6 rounded-3xl bg-white text-dark-black font-bold text-xl shadow-2xl"
                >
                  <FaWhatsapp className="text-2xl" />
                  Connect Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}




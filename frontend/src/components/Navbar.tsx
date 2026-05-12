import { useEffect, useState } from "react";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${scrolled
              ? "bg-[#0A0118]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              : "bg-transparent border border-transparent"
            }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="Coreslash Technologies"
              className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link, idx) => {
              const isActive = location.pathname === link.to || (link.label === "Services" && location.pathname.includes("/services"));
              if (link.label === "About") {
                return (
                  <div key="services-dropdown" className="relative"
                    onMouseEnter={() => setHoveredService(true)}
                    onMouseLeave={() => setHoveredService(false)}>
                    <div className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition-all duration-300 ${location.pathname.includes("/services") ? "text-accent-cyan" : "text-white/80 hover:text-white"
                      }`}>
                      Services
                      <ChevronDownIcon className={`w-3 h-3 transition-transform duration-300 ${hoveredService ? "rotate-180" : ""}`} />
                    </div>

                    <AnimatePresence>
                      {hoveredService && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute top-full left-0 mt-2 w-64 p-2 bg-[#0A0118]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                        >
                          {servicesLinks.map((service) => (
                            <Link
                              key={service.to}
                              to={service.to}
                              className="block px-4 py-2.5 text-sm text-white/70 hover:text-accent-cyan hover:bg-white/5 rounded-xl transition-all"
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
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isActive ? "text-accent-cyan" : "text-white/80 hover:text-white"
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-glow"
                      className="absolute inset-0 bg-accent-cyan/10 rounded-full border border-accent-cyan/20 shadow-[0_0_15px_rgba(77,235,255,0.2)]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/918861220023"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-500 bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95"
            >
              <FaWhatsapp className="text-lg text-accent-cyan" />
              <span>Let's Build</span>
            </a>

            <button
              className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="w-7 h-7" />
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
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#0A0118] md:hidden flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white/5 text-white"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <nav className="space-y-4">
                {links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-2xl font-bold text-white/90 hover:text-accent-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40">Services</p>
                  {servicesLinks.map((service) => (
                    <Link
                      key={service.to}
                      to={service.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-lg text-white/70 hover:text-accent-cyan"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </nav>

              <div className="pt-8">
                <a
                  href="https://wa.me/918861220023"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-primary-accent to-accent-blue text-white font-bold text-lg shadow-lg"
                >
                  <FaWhatsapp className="text-xl" />
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



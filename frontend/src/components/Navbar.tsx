import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
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

  // Mobile menu rendered via portal to escape header stacking context
  const mobileMenuPortal = createPortal(
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          {/* Backdrop - click to close */}
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeMobileMenu}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100vh",
              zIndex: 9998,
              backgroundColor: "rgba(5, 1, 15, 0.85)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            aria-hidden="true"
          />

          {/* Full-screen Mobile Menu Panel */}
          <motion.div
            key="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "100%",
              height: "100dvh",
              zIndex: 9999,
              backgroundColor: "rgba(5, 1, 15, 0.98)",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
           >
            {/* Close button - small, absolute corner, no layout impact */}
            <button
              onClick={closeMobileMenu}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors z-10"
              aria-label="Close menu"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>

            {/* Content area — fills full screen, centered vertically */}
            <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
              {/* Logo */}
              <img src={logo} alt="Logo" className="h-7 w-auto mb-7" />

              {/* Nav links */}
              <nav className="space-y-3 w-full">
                {links.map((link, idx) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                  >
                    <Link
                      to={link.to}
                      onClick={closeMobileMenu}
                      className={`block text-2xl font-bold tracking-wide transition-colors ${
                        location.pathname === link.to
                          ? "text-accent-cyan"
                          : "text-white hover:text-accent-cyan"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Divider */}
              <div className="w-16 h-px bg-white/10 my-5" />

              {/* Services */}
              <div className="space-y-2 w-full">
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/25 mb-2">Services</p>
                {servicesLinks.map((service, idx) => (
                  <motion.div
                    key={service.to}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.04, duration: 0.3 }}
                  >
                    <Link
                      to={service.to}
                      onClick={closeMobileMenu}
                      className={`block text-base font-medium transition-colors ${
                        location.pathname === service.to
                          ? "text-accent-cyan"
                          : "text-white/50 hover:text-accent-cyan"
                      }`}
                    >
                      {service.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Connect Now button */}
              <div className="mt-6 w-full max-w-xs">
                <a
                  href={envConfig.social.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl bg-white text-dark-black font-bold text-base shadow-2xl hover:bg-accent-cyan transition-colors"
                >
                  <FaWhatsapp className="text-xl" />
                  Connect Now
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );

  return (
    <>      <header
        className={`fixed top-0 left-0 right-0 w-full transition-all duration-500 ${
          scrolled 
            ? "py-3 bg-dark-black/80 backdrop-blur-lg" 
            : "py-6 bg-transparent"
        }`}
        style={{ zIndex: 1000 }}
      >
        <div className="mx-auto max-w-[1600px] w-full px-4 md:px-6">
          <nav
            className={`w-full flex flex-row items-center justify-between px-4 md:px-8 py-2.5 transition-all duration-500 ${
              scrolled
                ? "bg-transparent"
                : "rounded-full bg-white/5 border border-white/10 glass"
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
            <div className="hidden md:flex flex-row flex-nowrap items-center gap-1 lg:gap-2">
              {/* Render first link (Home) */}
              {links.filter(l => l.label === "Home").map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-3 lg:px-5 py-2 text-xs lg:text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${isActive ? "text-white" : "text-white/60 hover:text-white"}`}
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

              {/* Services Dropdown — standalone, not tied to any link */}
              <div className="relative"
                onMouseEnter={() => setHoveredService(true)}
                onMouseLeave={() => setHoveredService(false)}>
                <div className={`flex items-center gap-1.5 px-3 lg:px-5 py-2 text-xs lg:text-sm font-bold uppercase tracking-widest rounded-full cursor-pointer transition-all duration-300 ${location.pathname.includes("/services") ? "text-accent-cyan" : "text-white/60 hover:text-white"
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
                      style={{ zIndex: 1001 }}
                    >
                      {servicesLinks.map((service) => (
                        <Link
                          key={service.to}
                          to={service.to}
                          onClick={() => setHoveredService(false)}
                          className="block px-5 py-3 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-accent-cyan hover:bg-white/5 rounded-2xl transition-all"
                        >
                          {service.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Remaining links: About, Portfolio, Blog, Contact */}
              {links.filter(l => l.label !== "Home").map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-3 lg:px-5 py-2 text-xs lg:text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${isActive ? "text-white" : "text-white/60 hover:text-white"}`}
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
                aria-label="Open menu"
              >
                <Bars3Icon className="w-8 h-8" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu portal - renders outside header stacking context */}
      {mobileMenuPortal}
    </>
  );
}

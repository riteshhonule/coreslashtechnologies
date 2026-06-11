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
            initial={{ opacity: 0 }}
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
              height: "100vh",
              zIndex: 9999,
              backgroundColor: "rgba(5, 1, 15, 0.98)",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header with logo and close button */}
            <div className="flex justify-between items-center p-8 border-b border-white/5 shrink-0">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
              <button
                onClick={closeMobileMenu}
                className="p-3 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Menu content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              <nav className="space-y-6">
                {links.map((link, idx) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                  >
                    <Link
                      to={link.to}
                      onClick={closeMobileMenu}
                      className={`block text-4xl font-bold transition-colors ${
                        location.pathname === link.to
                          ? "text-accent-cyan"
                          : "text-white hover:text-accent-cyan"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-10 space-y-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Services</p>
                  {servicesLinks.map((service, idx) => (
                    <motion.div
                      key={service.to}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.04, duration: 0.3 }}
                    >
                      <Link
                        to={service.to}
                        onClick={closeMobileMenu}
                        className={`block text-xl font-bold transition-colors ${
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
              </nav>

              <div className="pt-12">
                <a
                  href={envConfig.social.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-4 w-full py-6 rounded-3xl bg-white text-dark-black font-bold text-xl shadow-2xl hover:bg-accent-cyan transition-colors"
                >
                  <FaWhatsapp className="text-2xl" />
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${scrolled ? "py-4" : "py-8"
          }`}
        style={{ zIndex: 1000 }}
      >
        <div className="mx-auto max-w-[1600px] px-4 md:px-6">
          <nav
            className={`flex items-center justify-between px-4 md:px-8 py-3 md:py-4 rounded-full transition-all duration-500 glass ${scrolled
                ? "bg-dark-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                : "bg-white/5"
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
              {/* Render first link (Home) */}
              {links.filter(l => l.label === "Home").map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-5 py-2 text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${isActive ? "text-white" : "text-white/60 hover:text-white"}`}
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
                      style={{ zIndex: 1001 }}
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

              {/* Remaining links: About, Portfolio, Blog, Contact */}
              {links.filter(l => l.label !== "Home").map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-5 py-2 text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${isActive ? "text-white" : "text-white/60 hover:text-white"}`}
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

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { envConfig } from "../config/env.config";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";
import {
  Home,
  User,
  Briefcase,
  FileText,
  Users,
  Mail,
  ChevronRight,
  Grid,
  Code,
  Smartphone,
  ShoppingBag,
  Server,
  BarChart3,
  Target,
  X,
  Linkedin,
  Instagram,
  Twitter,
  Github
} from "lucide-react";
import logo from "../img/CoreslashTechnologies-solutions-main-logo.webp";

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
    { to: "/", label: "Home", icon: Home },
    { to: "/about", label: "About", icon: User },
    { to: "/portfolio", label: "Portfolio", icon: Briefcase },
    { to: "/blog", label: "Blog", icon: FileText },
    { to: "/careers", label: "Careers", icon: Users },
    { to: "/contact", label: "Contact", icon: Mail },
  ];

  const servicesLinks = [
    { to: "/services", label: "All Services", icon: Grid },
    { to: "/services/website-development", label: "Web Development", icon: Code },
    { to: "/services/App-development", label: "App Development", icon: Smartphone },
    { to: "/services/shopify-development", label: "Shopify Development", icon: ShoppingBag },
    { to: "/services/software-development", label: "Software Systems", icon: Server },
    { to: "/services/digital-marketing", label: "Digital Marketing", icon: BarChart3 },
    { to: "/services/seo", label: "SEO Solutions", icon: Target },
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
              backgroundColor: "rgba(15, 23, 42, 0.4)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
            aria-hidden="true"
          />

          {/* Sliding Sidebar Menu Panel */}
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
              maxWidth: "340px",
              height: "100dvh",
              zIndex: 9999,
              backgroundColor: "#F8FAFC",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.05)",
            }}
          >
            {/* Header: Logo & Close Button */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 shrink-0">
              <img src={logo} alt="Logo" decoding="async" width={423} height={54} className="h-7 w-auto invert" />
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-full bg-[#f0f4ff]/80 text-[#737CFD] hover:bg-[#737CFD]/15 hover:text-secondary-indigo transition-all"
                aria-label="Close menu"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Skyscraper Banner with Angled Diagonal Slashes */}
            <div className="relative w-full h-32 overflow-hidden bg-gray-100 shrink-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=350&q=70"
                alt="City Architecture"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
              <div
                className="absolute inset-y-0 left-0 w-[45%] bg-[#0c081d] z-10"
                style={{ clipPath: "polygon(0 0, 100% 0, 60% 100%, 0 100%)" }}
              />
              <div
                className="absolute inset-y-0 left-[35%] w-[12%] bg-[#737cfd] z-10"
                style={{ clipPath: "polygon(0 0, 100% 0, 60% 100%, 0 100%)" }}
              />
            </div>

            {/* Scrollable Navigation Area */}
            <div className="flex-1 overflow-y-auto">
              {/* Main Links */}
              <div className="px-5 py-4 space-y-1">
                {links.map((link, idx) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.to;
                  return (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.03, duration: 0.3 }}
                    >
                      <Link
                        to={link.to}
                        onClick={closeMobileMenu}
                        className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 ${isActive
                          ? "bg-[#f0f4ff] text-secondary-indigo font-bold shadow-sm"
                          : "text-gray-700 hover:bg-gray-100 hover:text-secondary-indigo font-semibold"
                          }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-secondary-indigo" : "text-gray-500"}`} />
                          <span className="text-base tracking-wide">{link.label}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-colors ${isActive ? "text-secondary-indigo" : "text-gray-400"}`} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Services Section */}
              <div className="px-5 py-4 border-t border-gray-100/50">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#737CFD] mb-4 pl-1">SERVICES</p>
                <div className="space-y-3">
                  {servicesLinks.map((service, idx) => {
                    const Icon = service.icon;
                    const isActive = location.pathname === service.to;
                    return (
                      <motion.div
                        key={service.to}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.03, duration: 0.3 }}
                      >
                        <Link
                          to={service.to}
                          onClick={closeMobileMenu}
                          className={`flex items-center justify-between p-3 rounded-2xl bg-white border transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.015)] ${isActive
                            ? "border-secondary-indigo/40 bg-indigo-50/10 shadow-sm"
                            : "border-gray-100 hover:border-secondary-indigo/20 hover:shadow-md"
                            }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="w-9 h-9 rounded-xl bg-secondary-indigo/5 flex items-center justify-center text-secondary-indigo shrink-0">
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className={`text-sm font-semibold transition-colors ${isActive ? "text-secondary-indigo font-bold" : "text-gray-800"}`}>
                              {service.label}
                            </span>
                          </div>
                          <ChevronRight className={`w-4 h-4 transition-colors ${isActive ? "text-secondary-indigo" : "text-gray-400"}`} />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Connect & Footer */}
            <div className="px-5 py-6 flex flex-col items-center bg-[#F8FAFC] border-t border-gray-100/50 shrink-0">
              <div className="w-full max-w-[280px]">
                <a
                  href={envConfig.social.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl bg-[#5C5CFF] text-white font-bold text-base shadow-lg shadow-indigo-500/20 hover:bg-[#4b4be6] hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <FaWhatsapp className="text-xl" />
                  Connect Now
                </a>
                <p className="text-xs text-gray-400 text-center mt-3 font-medium">
                  We're just a message away!
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex items-center justify-center gap-6 mt-6 pb-2">
                <a href={envConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Visit CoreSlash Technologies on LinkedIn" className="text-gray-400 hover:text-secondary-indigo transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={envConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visit CoreSlash Technologies on Instagram" className="text-gray-400 hover:text-secondary-indigo transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href={envConfig.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Visit CoreSlash Technologies on Twitter/X" className="text-gray-400 hover:text-secondary-indigo transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our GitHub organization" className="text-gray-400 hover:text-secondary-indigo transition-colors">
                  <Github className="w-5 h-5" />
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
      className={`fixed top-0 left-0 right-0 w-full transition-all duration-500 bg-[#0c081d]/90 backdrop-blur-lg border-b border-white/5 shadow-md ${scrolled ? "py-3" : "py-4.5"
        }`}
      style={{ zIndex: 1000 }}
    >
      <div className="mx-auto max-w-[1600px] w-full px-4 md:px-6">
        <nav className="w-full flex flex-row items-center justify-between px-4 md:px-8 py-1.5"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img
              src={logo}
              alt="Coreslash Technologies"
              decoding="async"
              width={423}
              height={54}
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
              <div
                onClick={() => setHoveredService(prev => !prev)}
                className={`flex items-center gap-1.5 px-3 lg:px-5 py-2 text-xs lg:text-sm font-bold uppercase tracking-widest rounded-full cursor-pointer transition-all duration-300 ${location.pathname.includes("/services") ? "text-accent-cyan" : "text-white/60 hover:text-white"
                  }`}
              >
                Services
                <ChevronDownIcon className={`w-3 h-3 transition-transform duration-500 ${hoveredService ? "rotate-180" : ""}`} />
              </div>

              <AnimatePresence>
                {hoveredService && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-72 pt-3"
                    style={{ zIndex: 1001 }}
                  >
                    <div className="p-3 bg-white/95 backdrop-blur-3xl border border-gray-200/80 rounded-3xl shadow-2xl overflow-hidden">
                      {servicesLinks.map((service) => {
                        const isActive = location.pathname === service.to;
                        return (
                          <Link
                            key={service.to}
                            to={service.to}
                            onClick={() => setHoveredService(false)}
                            className={`relative flex items-center justify-between px-5 py-3 text-xs font-bold uppercase tracking-widest rounded-2xl transition-all ${isActive
                              ? "text-secondary-indigo bg-secondary-indigo/5"
                              : "text-gray-500 hover:text-secondary-indigo hover:bg-gray-50"
                              }`}
                          >
                            <span>{service.label}</span>
                            {isActive && (
                              <motion.span
                                layoutId="active-dropdown-indicator"
                                className="w-1.5 h-1.5 rounded-full bg-secondary-indigo"
                              />
                            )}
                          </Link>
                        );
                      })}
                    </div>
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

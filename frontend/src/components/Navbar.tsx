import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";


import logo from "../img/CoreslashTechnologies-solutions-main-logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"menu" | "services">("menu");
  const [hoveredService, setHoveredService] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);

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
    { to: "/services/website-development", label: "Website Development" },
    { to: "/services/App-development", label: "App Development" },
    { to: "/services/shopify-development", label: "Shopify Website Development" },
    { to: "/services/software-development", label: "Software Development" },
    { to: "/services/digital-marketing", label: "Digital Marketing" },
    { to: "/services/seo", label: "SEO Optimization" },
    { to: "/services/ecommerce", label: "E-commerce Website" },
    { to: "/services/ppc", label: "PPC / Ad Services" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-4 md:py-4" : "py-3 md:py-6"
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className={`flex items-center justify-between px-3 md:px-6 py-2 md:py-3 rounded-2xl transition-all duration-500 ${scrolled
            ? "bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl"
            : "bg-transparent border border-transparent"
            }`}
        >
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Coreslash Technologies Logo"
              className="h-10 w-auto object-contain transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {links.slice(0, 1).map((l) => (
              <li key={l.to} className="relative group">
                <Link
                  to={l.to}
                  className={`relative z-10 inline-flex items-center justify-center px-4 py-2 text-sm font-bold transition-colors duration-300 rounded-full ${location.pathname === l.to
                    ? scrolled || location.pathname !== "/" ? "text-blue-600 group-hover:text-white" : "text-blue-400 group-hover:text-white"
                    : scrolled || location.pathname !== "/" ? "text-gray-600 group-hover:text-white" : "text-gray-200 group-hover:text-white"
                    }`}
                >
                  {l.label}
                  {/* Hover background visual */}
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 bg-blue-900" />
                </Link>
              </li>
            ))}

            <li className="relative group">
              <Link
                to="/about"
                className={`relative z-10 inline-flex items-center justify-center px-4 py-2 text-sm font-bold transition-colors duration-300 rounded-full ${location.pathname === "/about"
                  ? "text-blue-600 group-hover:text-white"
                  : scrolled || location.pathname !== "/" ? "text-gray-600 group-hover:text-white" : "text-gray-200 group-hover:text-white"
                  }`}
              >
                About
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 bg-blue-900" />
              </Link>
            </li>

            <li
              className="relative group"
              onMouseEnter={() => setHoveredService(true)}
              onMouseLeave={() => setHoveredService(false)}
            >
              <div
                className={`inline-flex items-center justify-center gap-1 cursor-pointer px-4 py-2 text-sm font-bold transition-colors duration-300 rounded-full relative z-10 ${location.pathname.includes("/services")
                  ? "text-blue-600 group-hover:text-white"
                  : scrolled || location.pathname !== "/" ? "text-gray-600 group-hover:text-white" : "text-gray-200 group-hover:text-white"
                  }`}
              >
                Services
                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${hoveredService ? "rotate-180" : ""}`} />

                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 bg-blue-900" />
              </div>

              <AnimatePresence>
                {hoveredService && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-72"
                  >
                    <div className="bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl overflow-hidden p-2">
                      {servicesLinks.map((service) => (
                        <Link
                          key={service.to}
                          to={service.to}
                          className={`block px-4 py-3 text-sm font-bold rounded-xl transition-colors ${location.pathname === service.to
                            ? "bg-blue-50 text-blue-800"
                            : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                            }`}
                        >
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {links.slice(2).map((l) => (
              <li key={l.to} className="relative group">
                <Link
                  to={l.to}
                  className={`relative z-10 inline-flex items-center justify-center px-4 py-2 text-sm font-bold transition-colors duration-300 rounded-full ${location.pathname === l.to
                    ? scrolled || location.pathname !== "/" ? "text-blue-600 group-hover:text-white" : "text-blue-400 group-hover:text-white"
                    : scrolled || location.pathname !== "/" ? "text-gray-600 group-hover:text-white" : "text-gray-200 group-hover:text-white"
                    }`}
                >
                  {l.label}
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 bg-blue-900" />
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="https://wa.me/919000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-5 py-2
 rounded-full font-lg text-white
  bg-gradient-to-r from-orange-500 to-yellow-400
  hover:scale-105 hover:shadow-md hover:shadow-orange-500/30
  transition-all duration-300"
          >

            {/* Full Green WhatsApp Icon */}
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#25D366]">

              <FaWhatsapp className="text-white text-[11px]" />

            </span>

            <span className="text-xs font-semibold">
              Let's Talk
            </span>

            <span className="text-sm leading-none">
              ?
            </span>

          </a>


          <button
            className={`md:hidden p-2 rounded-xl transition-colors mb-0.5 ${scrolled || location.pathname !== "/" ? "hover:bg-gray-100" : "hover:bg-white/10"
              }`}
            onClick={() => setOpen(true)}
          >
            <div className="w-6 space-y-1.5">
              <span className={`block h-0.5 w-full transition-colors duration-300 ${scrolled || location.pathname !== "/" ? "bg-gray-800" : "bg-white"}`} />
              <span className={`block h-0.5 w-full transition-colors duration-300 ${scrolled || location.pathname !== "/" ? "bg-gray-800" : "bg-white"}`} />
              <span className={`block h-0.5 w-full transition-colors duration-300 ${scrolled || location.pathname !== "/" ? "bg-gray-800" : "bg-white"}`} />
            </div>
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60] md:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-[70] shadow-2xl md:hidden overflow-y-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <img src={logo} alt="Logo" className="h-8 w-auto object-contain" />
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-800" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex px-6 border-b border-gray-100">
                <button
                  onClick={() => setActiveTab("menu")}
                  className={`flex-1 pb-4 text-center font-bold text-lg transition-colors relative ${activeTab === "menu" ? "text-blue-600" : "text-gray-400"
                    }`}
                >
                  Menu
                  {activeTab === "menu" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("services")}
                  className={`flex-1 pb-4 text-center font-bold text-lg transition-colors relative ${activeTab === "services" ? "text-blue-600" : "text-gray-400"
                    }`}
                >
                  Services
                  {activeTab === "services" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    />
                  )}
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-8">
                <AnimatePresence mode="wait">
                  {activeTab === "menu" ? (
                    <motion.ul
                      key="menu"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <li>
                        <Link to="/" onClick={() => setOpen(false)} className="block text-xl font-bold text-gray-800 hover:text-blue-600">Home</Link>
                      </li>
                      <li>
                        <Link to="/about" onClick={() => setOpen(false)} className="block text-xl font-bold text-gray-800 hover:text-blue-600">About</Link>
                      </li>
                      <li>
                        <button
                          onClick={() => setMobileServiceOpen(!mobileServiceOpen)}
                          className="flex items-center justify-between w-full text-xl font-bold text-gray-800 hover:text-blue-600"
                        >
                          Services
                          <ChevronDownIcon className={`w-5 h-5 transition-transform ${mobileServiceOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {mobileServiceOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-4 mt-4 space-y-4 border-l-2 border-gray-100"
                            >
                              {servicesLinks.map((service) => (
                                <Link
                                  key={service.to}
                                  to={service.to}
                                  onClick={() => setOpen(false)}
                                  className="block text-lg font-medium text-gray-600 hover:text-blue-600"
                                >
                                  {service.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                      <li>
                        <Link to="/portfolio" onClick={() => setOpen(false)} className="block text-xl font-bold text-gray-800 hover:text-blue-600">Portfolio</Link>
                      </li>
                      <li>
                        <Link to="/contact" onClick={() => setOpen(false)} className="block text-xl font-bold text-gray-800 hover:text-blue-600">Contact</Link>
                      </li>
                      <li className="pt-4">
                        <a
                          href="https://wa.me/919000000000"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold shadow-lg shadow-orange-500/30"
                        >
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#25D366]">
                            <FaWhatsapp className="text-white text-[11px]" />
                          </span>
                          Let's Talk
                        </a>
                      </li>
                    </motion.ul>
                  ) : (
                    <motion.ul
                      key="services"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      <li>
                        <Link to="/services" onClick={() => setOpen(false)} className="block text-xl font-bold text-gray-800 hover:text-blue-600">App Development</Link>
                      </li>
                      <li>
                        <Link to="/services/website-development" onClick={() => setOpen(false)} className="block text-xl font-bold text-gray-800 hover:text-blue-600">Website Development</Link>
                      </li>
                      <li>
                        <Link to="/services" onClick={() => setOpen(false)} className="block text-xl font-bold text-gray-800 hover:text-blue-600">Software Development</Link>
                      </li>
                      <li>
                        <Link to="/services/ppc" onClick={() => setOpen(false)} className="block text-xl font-bold text-gray-800 hover:text-blue-600">Digital Marketing</Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}


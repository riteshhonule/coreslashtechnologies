"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidGlassButton } from "./LiquidGlass";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles, ArrowRight, ChevronDown } from "lucide-react";
import logoImg from "@/assets/coreslash technologies.png";

export interface NavItem {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    dropdown: [
      { label: "All Services", href: "/services" },
      { label: "AI Automation", href: "/services/ai-automation" },
      { label: "Web Development", href: "/services/web-development" },
      { label: "App Development", href: "/services/app-development" },
      { label: "Software Systems", href: "/services/software-systems" },
      { label: "E-Commerce Solutions", href: "/services/ecommerce-solutions" },
      { label: "SEO Solutions", href: "/services/seo-solutions" },
      { label: "Shopify Development", href: "/services/shopify-development" },
      { label: "Cloud Infrastructure", href: "/services/cloud-infrastructure" },
      { label: "Data Analytics", href: "/services/data-analytics" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const CAPSULE_FONT_FAMILY = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`;

interface NavbarProps {
  activeSection?: string;
  className?: string;
  onGetQuoteClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  className,
  onGetQuoteClick,
}) => {
  const location = useLocation();

  const getActiveTab = () => {
    if (location.pathname === "/") return "Home";
    const match = NAV_ITEMS.find(item => item.href !== "/" && location.pathname.startsWith(item.href));
    return match ? match.label : "Home";
  };

  const activeTab = getActiveTab();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  // Monitor scroll to update navbar background opacity and shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontFamily: CAPSULE_FONT_FAMILY }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full h-[72px] md:h-[76px]",
          "transition-all duration-500 flex items-center justify-between px-6 md:px-12 bg-blue-800/90 backdrop-blur-md shadow-lg border-b border-blue-700/50",
          isScrolled && "shadow-xl bg-blue-900/95 backdrop-blur-lg border-blue-600/50",
          className
        )}
      >
        {/* LEFT SECTION: Logo (CoreSlash) */}
        <div className="flex items-center">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 group"
          >
            {/* Brand Logo Image */}
            <img
              src={logoImg}
              alt="CoreSlash Technologies"
              className="h-7 md:h-9 w-auto object-contain brightness-0 invert group-hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_4px_rgba(255,255,255,0.1)]"
            />
          </Link>
        </div>

        {/* CENTER NAVIGATION ITEMS (Desktop) */}
        <nav
          className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-blue-700/60 border border-blue-500/40 backdrop-blur-md"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.label;
            const isHovered = hoveredTab === item.label;
            const hasDropdown = !!item.dropdown;

            return (
              <div
                key={item.label}
                onMouseEnter={() => setHoveredTab(item.label)}
                onMouseLeave={() => setHoveredTab(null)}
                className="relative flex items-center"
              >
                {hasDropdown ? (
                  <div
                    style={{ fontFamily: CAPSULE_FONT_FAMILY }}
                    className={cn(
                      "relative px-4 py-1.5 text-[14px] md:text-[15px] font-semibold transition-colors duration-300 cursor-pointer select-none rounded-full flex items-center justify-center gap-1.5",
                      isActive
                        ? "text-blue-900"
                        : "text-white/90 hover:text-white"
                    )}
                    aria-expanded={hasDropdown ? isHovered : undefined}
                    aria-haspopup={hasDropdown ? "true" : undefined}
                  >
                    {/* Active Highlight Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 rounded-full bg-white shadow-md -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}

                    {/* Hover Glow Pill */}
                    {!isActive && isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 rounded-full bg-white/20 -z-10"
                        transition={{ duration: 0.15 }}
                      />
                    )}

                    {/* Text animation */}
                    <span className="relative z-10 flex items-center gap-1">
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-300",
                          isHovered && "rotate-180"
                        )}
                      />
                    </span>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => handleNavClick()}
                    style={{ fontFamily: CAPSULE_FONT_FAMILY }}
                    className={cn(
                      "relative px-4 py-1.5 text-[14px] md:text-[15px] font-semibold transition-colors duration-300 cursor-pointer select-none rounded-full flex items-center justify-center gap-1.5",
                      isActive
                        ? "text-blue-900"
                        : "text-white/90 hover:text-white"
                    )}
                  >
                    {/* Active Highlight Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 rounded-full bg-white shadow-md -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}

                    {/* Hover Glow Pill */}
                    {!isActive && isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 rounded-full bg-white/20 -z-10"
                        transition={{ duration: 0.15 }}
                      />
                    )}

                    {/* Text animation */}
                    <span className="relative z-10 flex items-center gap-1">
                      {item.label}
                    </span>
                  </Link>
                )}

                {/* Desktop Dropdown */}
                {hasDropdown && (
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
                      >
                        <div
                          className="w-[240px] bg-white dark:bg-slate-900 rounded-[18px] shadow-2xl p-2 flex flex-col border border-slate-100 dark:border-slate-800"
                          role="menu"
                        >
                          {item.dropdown?.map((dropItem) => {
                            const isDropActive = location.pathname === dropItem.href;
                            return (
                              <Link
                                key={dropItem.label}
                                to={dropItem.href}
                                role="menuitem"
                                onClick={() => {
                                  setHoveredTab(null);
                                  handleNavClick();
                                }}
                                className={cn(
                                  "px-4 py-2.5 text-[14px] font-semibold rounded-[12px] transition-all flex items-center justify-between",
                                  isDropActive
                                    ? "bg-blue-600 text-white font-bold shadow-sm"
                                    : "text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400"
                                )}
                              >
                                <span>{dropItem.label}</span>
                                {isDropActive && (
                                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        {/* RIGHT SIDE CTA BUTTON (Desktop) */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={onGetQuoteClick}
            className="py-2.5 px-6 font-semibold text-sm rounded-full bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-md flex items-center gap-2 group"
          >
            <span style={{ fontFamily: CAPSULE_FONT_FAMILY }}>Connect</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative p-2.5 rounded-full bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-all duration-300 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </motion.header>

      {/* MOBILE GLASS DRAWER */}
      <AnimatePresence>
        {
          mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
              style={{ fontFamily: CAPSULE_FONT_FAMILY }}
              className="fixed inset-0 z-40 bg-sky-50/95 dark:bg-slate-950/95 flex flex-col justify-between pt-28 pb-10 px-8 lg:hidden text-slate-900"
            >
              {/* Mobile Nav Links */}
              <div className="flex flex-col space-y-2 overflow-y-auto max-h-[70vh] px-2 -mx-2">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = activeTab === item.label;
                  const hasDropdown = !!item.dropdown;
                  const isDropdownOpen = openMobileDropdown === item.label;

                  return (
                    <div key={item.label} className="flex flex-col border-b border-black/10 dark:border-white/15 pb-4 mb-2">
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                        style={{ fontFamily: CAPSULE_FONT_FAMILY }}
                        className="flex items-center justify-between"
                      >
                        {hasDropdown ? (
                          <div
                            onClick={() => setOpenMobileDropdown(isDropdownOpen ? null : item.label)}
                            className={cn(
                              "text-2xl font-semibold tracking-tight transition-colors flex flex-1 items-center gap-3 cursor-pointer",
                              isActive
                                ? "text-blue-600 dark:text-blue-400 font-bold"
                                : "text-slate-700 hover:text-slate-950"
                            )}
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={cn(
                                "w-6 h-6 transition-transform duration-300 text-slate-500",
                                isDropdownOpen && "rotate-180"
                              )}
                            />
                          </div>
                        ) : (
                          <Link
                            to={item.href}
                            onClick={() => handleNavClick()}
                            className={cn(
                              "text-2xl font-semibold tracking-tight transition-colors flex flex-1 items-center gap-3",
                              isActive
                                ? "text-blue-600 dark:text-blue-400 font-bold"
                                : "text-slate-700 hover:text-slate-950"
                            )}
                          >
                            <span>{item.label}</span>
                          </Link>
                        )}
                        {isActive && !hasDropdown && (
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400 shadow-[0_0_10px_#2563eb]" />
                        )}
                      </motion.div>

                      {/* Mobile Dropdown */}
                      <AnimatePresence>
                        {hasDropdown && isDropdownOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden flex flex-col space-y-3 pt-4 pl-4"
                          >
                            {item.dropdown?.map((dropItem) => {
                              const isDropActive = location.pathname === dropItem.href || (location.pathname === "/services/seo" && dropItem.href === "/services/seo-solutions");
                              return (
                                <Link
                                  key={dropItem.label}
                                  to={dropItem.href}
                                  className={cn(
                                    "text-[17px] font-medium transition-colors py-1 flex items-center justify-between",
                                    isDropActive
                                      ? "text-blue-600 dark:text-blue-400 font-bold"
                                      : "text-slate-600 hover:text-blue-600 dark:hover:text-blue-400"
                                  )}
                                  onClick={() => {
                                    setMobileMenuOpen(false);
                                    setOpenMobileDropdown(null);
                                  }}
                                >
                                  <span>{dropItem.label}</span>
                                  {isDropActive && <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-4" />}
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Bottom CTA */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="pt-6 border-t border-black/10 dark:border-white/15"
              >
                <LiquidGlassButton
                  variant="cta"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onGetQuoteClick) onGetQuoteClick();
                  }}
                  className="w-full py-3.5 text-center justify-center text-base bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                >
                  <span style={{ fontFamily: CAPSULE_FONT_FAMILY }}>Connect</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </LiquidGlassButton>
              </motion.div>
            </motion.div>
          )
        }
      </AnimatePresence >
    </>
  );
};

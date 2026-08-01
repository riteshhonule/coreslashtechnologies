"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidGlassButton } from "./liquid-glass";
import { cn } from "@/lib/utils";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Gallery", href: "#gallery" },
  { label: "Tech Deck", href: "#showcase" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const CAPSULE_FONT_FAMILY = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`;

interface NavbarProps {
  activeSection?: string;
  className?: string;
  onGetQuoteClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection = "Home",
  className,
  onGetQuoteClick,
}) => {
  const [activeTab, setActiveTab] = useState(activeSection);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleNavClick = (label: string, href: string) => {
    setActiveTab(label);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontFamily: CAPSULE_FONT_FAMILY }}
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[1440px] h-[72px] md:h-[76px]",
          "rounded-full transition-all duration-500 flex items-center justify-between px-4 md:px-6 relative overflow-hidden",
          // iPhone Liquid Glass + Low Opacity Black Border
          isScrolled
            ? "bg-white/80 dark:bg-white/[0.05] backdrop-blur-3xl backdrop-saturate-150 border border-black/10 dark:border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
            : "bg-white/50 dark:bg-white/[0.02] backdrop-blur-2xl backdrop-saturate-150 border border-black/5 dark:border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
          className
        )}
      >
        {/* Specular Highlight Curve at Top Edge (iPhone Liquid Glass) */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

        {/* LEFT SECTION: Liquid Glass Logo (CoreSlash) */}
        <div className="flex items-center">
          <LiquidGlassButton
            variant="logo"
            onClick={() => handleNavClick("Home", "#home")}
            className="group py-1.5 px-4 md:px-5 bg-white/60 dark:bg-white/10 hover:bg-white/80 border border-black/10 dark:border-white/20 text-slate-900 shadow-sm"
          >
            {/* AI Slash Icon */}
            <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
            </div>
            <span
              style={{ fontFamily: CAPSULE_FONT_FAMILY }}
              className="text-slate-900 font-extrabold text-lg md:text-xl tracking-tight"
            >
              Core<span className="text-blue-600 dark:text-blue-400">Slash</span>
            </span>
          </LiquidGlassButton>
        </div>

        {/* CENTER NAVIGATION ITEMS (iPhone Capsule Track - Desktop) */}
        <nav
          className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 backdrop-blur-md"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.label;
            const isHovered = hoveredTab === item.label;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.label, item.href);
                }}
                onMouseEnter={() => setHoveredTab(item.label)}
                onMouseLeave={() => setHoveredTab(null)}
                style={{ fontFamily: CAPSULE_FONT_FAMILY }}
                className={cn(
                  "relative px-4 py-1.5 text-[14px] md:text-[15px] font-medium transition-colors duration-300 cursor-pointer select-none rounded-full flex items-center justify-center",
                  isActive
                    ? "text-slate-950 font-semibold"
                    : "text-slate-700 hover:text-slate-950"
                )}
              >
                {/* Active Capsule Highlight Pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeCapsulePill"
                    className="absolute inset-0 rounded-full bg-white dark:bg-sky-600 shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-black/10 dark:border-sky-500 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}

                {/* Hover Glow Pill */}
                {!isActive && isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 rounded-full bg-white/60 dark:bg-white/15 -z-10"
                    transition={{ duration: 0.15 }}
                  />
                )}

                {/* Text animation */}
                <motion.span
                  animate={{ y: isHovered ? -1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  {item.label}
                </motion.span>
              </a>
            );
          })}
        </nav>

        {/* RIGHT SIDE CTA BUTTON (Desktop) */}
        <div className="hidden lg:flex items-center">
          <LiquidGlassButton
            variant="cta"
            onClick={onGetQuoteClick}
            className="py-2 px-5 font-semibold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-500/25 hover:shadow-blue-500/40"
          >
            <span style={{ fontFamily: CAPSULE_FONT_FAMILY }}>Get Quote</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </LiquidGlassButton>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative p-2.5 rounded-full bg-white/60 dark:bg-white/10 border border-black/10 dark:border-white/20 backdrop-blur-xl text-slate-900 hover:bg-white/80 transition-all duration-300 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-900" />
            ) : (
              <Menu className="w-6 h-6 text-slate-900" />
            )}
          </button>
        </div>
      </motion.header>

      {/* MOBILE GLASS DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            style={{ fontFamily: CAPSULE_FONT_FAMILY }}
            className="fixed inset-0 z-40 bg-sky-50/95 dark:bg-slate-950/95 flex flex-col justify-between pt-28 pb-10 px-8 lg:hidden text-slate-900"
          >
            {/* Mobile Nav Links */}
            <div className="flex flex-col space-y-5">
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeTab === item.label;

                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.label, item.href);
                    }}
                    style={{ fontFamily: CAPSULE_FONT_FAMILY }}
                    className={cn(
                      "text-2xl font-semibold tracking-tight transition-colors flex items-center justify-between border-b border-black/10 dark:border-white/15 pb-4",
                      isActive
                        ? "text-blue-600 dark:text-blue-400 font-bold"
                        : "text-slate-700 hover:text-slate-950"
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400 shadow-[0_0_10px_#2563eb]" />
                    )}
                  </motion.a>
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
                className="w-full py-3.5 text-center justify-center text-base bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white"
              >
                <span style={{ fontFamily: CAPSULE_FONT_FAMILY }}>Get Quote</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </LiquidGlassButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

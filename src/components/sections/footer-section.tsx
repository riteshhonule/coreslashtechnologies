"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FooterSection() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate subscribe
    setEmail("");
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <footer className="relative bg-[#050816] text-slate-300 pt-32 pb-10 overflow-hidden border-t border-white/5">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* ========================================================
            NEWSLETTER SECTION
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[32px] overflow-hidden p-1 border border-white/10 mb-24 group"
        >
          {/* Animated Gradient Border Layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-50 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
          
          <div className="bg-[#0a0f24]/90 backdrop-blur-2xl rounded-[28px] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 h-full relative overflow-hidden">
            {/* Inner Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />

            <div className="max-w-xl relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-semibold text-blue-400 mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Stay Updated</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Subscribe to our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Newsletter</span>
              </h2>
              <p className="text-slate-400 text-lg">
                Receive the latest technology insights, AI trends, and company updates directly in your inbox. No spam, ever.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-shrink-0 relative z-10">
              <div className="relative flex items-center p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors focus-within:border-blue-500/50 focus-within:bg-white/[0.05] shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <Mail className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full md:w-[320px] bg-transparent border-none py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-0"
                />
                <button
                  type="submit"
                  className="relative flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold overflow-hidden group/btn shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out" />
                  <Send className="w-5 h-5 relative z-10" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* ========================================================
            5-COLUMN LAYOUT
            ======================================================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20"
        >
          {/* Column 1: Brand (Takes up 4 cols on large screens) */}
          <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-8">
            <a href="#" className="flex items-center gap-3 mb-6 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Core<span className="text-blue-500">Slash</span>
              </span>
            </a>
            <p className="text-slate-400 leading-relaxed mb-8">
              Building AI-powered software solutions for businesses worldwide. We engineer high-performance tools that define the future of technology and enterprise workflows.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: <FaLinkedinIn className="w-4 h-4" />, href: "#" },
                { icon: <FaInstagram className="w-4 h-4" />, href: "#" },
                { icon: <FaFacebookF className="w-4 h-4" />, href: "#" },
                { icon: <FaGithub className="w-4 h-4" />, href: "#" },
                { icon: <FaTwitter className="w-4 h-4" />, href: "#" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-white/[0.08] hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(96,165,250,0.3)] transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Services */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-white font-bold text-lg mb-6">Services</h4>
            <ul className="flex flex-col space-y-3.5">
              {[
                { label: "Website Development", href: "/services/website-development" },
                { label: "Shopify Development", href: "/services/shopify-development" },
                { label: "E-commerce Website", href: "/services/ecommerce" },
                { label: "Google Ads & PPC", href: "/services/ppc" },
                { label: "SEO Optimization", href: "/services/seo" },
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.href} 
                    className="text-slate-400 hover:text-white inline-block relative group transition-transform hover:translate-x-1"
                  >
                    <span className="group-hover:text-blue-400 transition-colors">{link.label}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Company */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-white font-bold text-lg mb-6">Company</h4>
            <ul className="flex flex-col space-y-3.5">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Contact Us", href: "/contact" },
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.href} 
                    className="text-slate-400 hover:text-white inline-block relative group transition-transform hover:translate-x-1"
                  >
                    <span className="group-hover:text-blue-400 transition-colors">{link.label}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-400 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Legal */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-white font-bold text-lg mb-6">Legal</h4>
            <ul className="flex flex-col space-y-3.5">
              {[
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.href} 
                    className="text-slate-400 hover:text-white inline-block relative group transition-transform hover:translate-x-1"
                  >
                    <span className="group-hover:text-blue-400 transition-colors">{link.label}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 5: Contact */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
            <ul className="flex flex-col space-y-4">
              <li>
                <a href="tel:+11234567890" className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-400 group-hover:text-white transition-colors text-sm mt-1.5">+1 (123) 456-7890</span>
                </a>
              </li>
              <li>
                <a href="mailto:hello@coreslash.com" className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-400 group-hover:text-white transition-colors text-sm mt-1.5">hello@coreslash.com</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-colors">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-400 group-hover:text-white transition-colors text-sm mt-1.5">123 Innovation Drive,<br/>Tech City, CA 94016</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 mt-4 pt-4 border-t border-white/5">
                  <div className="text-xs text-slate-500 font-medium">
                    <span className="block text-slate-400 mb-1">Business Hours:</span>
                    Mon - Fri: 9:00 AM - 6:00 PM EST<br/>
                    Sat - Sun: Closed
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* ========================================================
            BOTTOM BAR
            ======================================================== */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium">
          <div className="text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} CoreSlash Technologies. All Rights Reserved.
          </div>
          
          <div className="flex items-center gap-1.5 text-slate-400 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5">
            Made with <span className="text-red-500 animate-pulse">❤️</span> in India
          </div>
          
          <div className="flex items-center gap-6 text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}

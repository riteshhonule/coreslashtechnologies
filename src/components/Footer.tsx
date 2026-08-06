"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function FooterSection() {

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
                { name: "LinkedIn", icon: <FaLinkedinIn className="w-4 h-4" />, href: "https://www.linkedin.com/company/coreslash-technologies/" },
                { name: "X", icon: <FaXTwitter className="w-4 h-4" />, href: "https://x.com/CoreSlashTech" },
                { name: "Instagram", icon: <FaInstagram className="w-4 h-4" />, href: "https://www.instagram.com/coreslashtechnologies?igsh=MWRmaTN2am1wNG1kdw%3D%3D&utm_source=qr" },
                { name: "Facebook", icon: <FaFacebookF className="w-4 h-4" />, href: "https://www.facebook.com/profile.php?id=61591466563226" },
                { name: "WhatsApp", icon: <FaWhatsapp className="w-4 h-4" />, href: "https://wa.me/918310711652" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-white/[0.08] hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(96,165,250,0.3)] transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Services (Takes up 3 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h4 className="text-white font-bold text-lg mb-6">Services</h4>
            <ul className="flex flex-col space-y-3">
              {[
                { label: "AI Automation", href: "/services/ai-automation" },
                { label: "Web Development", href: "/services/web-development" },
                { label: "App Development", href: "/services/app-development" },
                { label: "Software Systems", href: "/services/software-systems" },
                { label: "E-Commerce Solutions", href: "/services/ecommerce-solutions" },
                { label: "SEO Solutions", href: "/services/seo-solutions" },
                { label: "Shopify Development", href: "/services/shopify-development" },
                { label: "Cloud Infrastructure", href: "/services/cloud-infrastructure" },
                { label: "Data Analytics", href: "/services/data-analytics" },
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

          {/* Column 3: Company (Takes up 2 cols) */}
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

          {/* Column 4: Contact (Takes up 3 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
            <ul className="flex flex-col space-y-4">
              <li>
                <a href="tel:+918310711652" className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-400 group-hover:text-white transition-colors text-sm mt-1.5">+91 8310711652</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@coreslashtechnologies.com" className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-400 group-hover:text-white transition-colors text-sm mt-1.5">contact@coreslashtechnologies.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://maps.google.com/?q=Belgaum,+Karnataka,+India+590006" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-start gap-3 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-colors">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-400 group-hover:text-white transition-colors text-sm mt-1.5">Belgaum, Karnataka, India 590006</span>
                </a>
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

          <div className="flex items-center gap-6 text-slate-500">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
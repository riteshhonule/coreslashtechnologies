import { Link } from 'react-router-dom';
import { envConfig } from '../config/env.config';
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Instagram, ExternalLink } from "lucide-react";
import logo from "../img/CoreslashTechnologies-solutions-main-logo.png";

const footerLinks = {
  company: [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Work", path: "/portfolio" },
    { name: "Insights", path: "/blog" },
    { name: "Contact", path: "/contact" }
  ],
  services: [
    { name: "Web Development", path: "/services/website-development" },
    { name: "AI Solutions", path: "/services/software-development" },
    { name: "E-Commerce", path: "/services/ecommerce" },
    { name: "SEO Mastery", path: "/services/seo" },
    { name: "Cloud Systems", path: "/services" }
  ],
  legal: [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Service", path: "/terms-of-service" },
    { name: "Cookie Policy", path: "/cookie-policy" }
  ]
};

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-12 overflow-hidden bg-[#05010F] border-t border-white/5">
      
      {/* Top Border Gradient Glow Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />

      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary-purple/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-10 lg:grid-cols-10 border border-white/5 rounded-[2.5rem] bg-white/[0.01] backdrop-blur-xl overflow-hidden mb-16">

          {/* Brand/Logo Column */}
          <div className="p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 md:border-r border-white/5 space-y-8 md:col-span-5 lg:col-span-3">
            <div className="space-y-6">
              <Link to="/" className="inline-block group">
                <img 
                  src={logo} 
                  alt="CoreSlash" 
                  className="h-10 w-auto transition-all duration-500 group-hover:brightness-110 group-hover:scale-[1.02]" 
                />
              </Link>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Architecting the next generation of digital experiences through
                intelligent design, custom AI models, and engineering excellence.
              </p>
            </div>
            
            {/* Social Badges with Custom Glows */}
            <div className="flex gap-4">
              <motion.a
                whileHover={{ y: -4, scale: 1.05 }}
                href={envConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/5 hover:shadow-[0_0_15px_rgba(10,102,194,0.25)] transition-all duration-300"
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                whileHover={{ y: -4, scale: 1.05 }}
                href={envConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40 hover:text-[#E1306C] hover:border-[#E1306C]/30 hover:bg-[#E1306C]/5 hover:shadow-[0_0_15px_rgba(225,48,108,0.25)] transition-all duration-300"
              >
                <Instagram size={18} />
              </motion.a>
            </div>
          </div>

          {/* Links Column: Company */}
          <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/5 space-y-6 md:col-span-5 lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-[0.25em] text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-pulse shrink-0" />
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map(link => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="group/link flex items-center gap-2 text-white/40 hover:text-accent-cyan transition-all duration-300 text-sm font-medium hover:translate-x-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan opacity-0 group-hover/link:opacity-100 transition-all duration-300 shrink-0" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column: Solutions */}
          <div className="p-8 lg:p-10 border-b md:border-b-0 md:border-r border-white/5 space-y-6 md:col-span-5 lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-[0.25em] text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-pulse shrink-0" />
              Solutions
            </h4>
            <ul className="space-y-4">
              {footerLinks.services.map(link => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="group/link flex items-center gap-2 text-white/40 hover:text-accent-cyan transition-all duration-300 text-sm font-medium hover:translate-x-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan opacity-0 group-hover/link:opacity-100 transition-all duration-300 shrink-0" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="p-8 lg:p-10 space-y-6 md:col-span-5 lg:col-span-3">
            <h4 className="text-white font-bold uppercase tracking-[0.25em] text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-pulse shrink-0" />
              Connect
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3.5 group/link">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan opacity-0 group-hover/link:opacity-100 transition-all duration-300 shrink-0" />
                <Mail size={15} className="text-white/40 group-hover/link:text-accent-cyan transition-colors duration-300 shrink-0" />
                <a 
                  href={`mailto:${envConfig.contact.email}`} 
                  className="text-sm text-white/40 group-hover/link:text-accent-cyan transition-all duration-300 font-medium break-all"
                >
                  {envConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3.5 group/link">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan opacity-0 group-hover/link:opacity-100 transition-all duration-300 shrink-0 mt-2" />
                <Phone size={15} className="text-white/40 group-hover/link:text-accent-cyan transition-colors duration-300 mt-1 shrink-0" />
                <div className="flex flex-col gap-2">
                  <a 
                    href={`tel:${envConfig.social.whatsappPhone}`} 
                    className="text-sm text-white/40 group-hover/link:text-accent-cyan transition-all duration-300 font-medium"
                  >
                    +{envConfig.social.whatsappPhone}
                  </a>
                  <a 
                    href="tel:+919513013247" 
                    className="text-sm text-white/40 group-hover/link:text-accent-cyan transition-all duration-300 font-medium"
                  >
                    +91 9513013247
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal row */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] font-bold tracking-[0.25em] uppercase">
            © {new Date().getFullYear()} CORESLASH TECHNOLOGIES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            {footerLinks.legal.map(link => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-white/20 hover:text-accent-cyan hover:underline hover:underline-offset-4 transition-all text-[10px] font-bold uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

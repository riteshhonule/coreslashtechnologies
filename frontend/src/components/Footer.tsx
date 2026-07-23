import { Link } from 'react-router-dom';
import { envConfig } from '../config/env.config';
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Instagram, ExternalLink } from "lucide-react";
import { FaDiscord, FaFacebook, FaTelegram } from 'react-icons/fa';
import logo from "../img/CoreslashTechnologies-solutions-main-logo.webp";

const footerLinks = {
  company: [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Work", path: "/portfolio" },
    { name: "Insights", path: "/blog" },
    { name: "Careers", path: "/careers" },
    { name: "IT Companies in Belagavi", path: "/top-it-companies-in-belagavi" },
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
    <footer className="relative pt-20 pb-12 overflow-hidden bg-[#F9FAFB] border-t border-gray-200/80">
      
      {/* Top Border Gradient Glow Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-secondary-indigo/40 to-transparent" />

      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary-purple/2 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-indigo/2 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.01] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-10 lg:grid-cols-10 border border-gray-200/50 rounded-[2.5rem] bg-white shadow-xl shadow-gray-200/30 overflow-hidden mb-16">

          {/* Brand/Logo Column */}
          <div className="p-8 lg:p-10 flex flex-col justify-start items-center text-center border-b lg:border-b-0 md:border-r border-gray-200/50 space-y-6 md:col-span-5 lg:col-span-3">
            <div className="space-y-6 flex flex-col items-center">
              <Link to="/" className="inline-block">
                <img 
                  src={logo} 
                  alt="CoreSlash" 
                  loading="lazy"
                  decoding="async"
                  width={423}
                  height={54}
                  className="h-10 w-auto invert mx-auto" 
                />
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                Architecting the next generation of digital experiences through
                intelligent design, custom AI models, and engineering excellence.
              </p>
            </div>
            
            {/* Social Badges with Custom Glows */}
            <div className="flex gap-4 justify-center">
              <motion.a
                whileHover={{ y: -4, scale: 1.05 }}
                href={envConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit CoreSlash Technologies on LinkedIn"
                className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/5 hover:shadow-[0_0_15px_rgba(10,102,194,0.15)] transition-all duration-300"
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                whileHover={{ y: -4, scale: 1.05 }}
                href={envConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit CoreSlash Technologies on Instagram"
                className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#E1306C] hover:border-[#E1306C]/30 hover:bg-[#E1306C]/5 hover:shadow-[0_0_15px_rgba(225,48,108,0.15)] transition-all duration-300"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                whileHover={{ y: -4, scale: 1.05 }}
                href={envConfig.social.discord}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join our Discord community"
                className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#5865F2] hover:border-[#5865F2]/30 hover:bg-[#5865F2]/5 hover:shadow-[0_0_15px_rgba(88,101,242,0.15)] transition-all duration-300"
              >
                <FaDiscord size={18} />
              </motion.a>
              <motion.a
                whileHover={{ y: -4, scale: 1.05 }}
                href={envConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit CoreSlash Technologies on Facebook"
                className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#1877F2] hover:border-[#1877F2]/30 hover:bg-[#1877F2]/5 hover:shadow-[0_0_15px_rgba(24,119,242,0.15)] transition-all duration-300"
              >
                <FaFacebook size={18} />
              </motion.a>
              <motion.a
                whileHover={{ y: -4, scale: 1.05 }}
                href={envConfig.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join our Telegram channel"
                className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#24A1DE] hover:border-[#24A1DE]/30 hover:bg-[#24A1DE]/5 hover:shadow-[0_0_15px_rgba(36,161,222,0.15)] transition-all duration-300"
              >
                <FaTelegram size={18} />
              </motion.a>
            </div>
          </div>

          {/* Links Column: Company */}
          <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-200/50 flex flex-col justify-start items-center text-center space-y-6 md:col-span-5 lg:col-span-2">
            <h4 className="text-gray-900 font-bold uppercase tracking-[0.25em] text-xs flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-secondary-indigo rounded-full shrink-0" />
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map(link => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="group/link flex items-center justify-center gap-2 text-gray-500 hover:text-secondary-indigo transition-all duration-300 text-sm font-medium hover:scale-105"
                  >
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column: Solutions */}
          <div className="p-8 lg:p-10 border-b md:border-b-0 md:border-r border-gray-200/50 flex flex-col justify-start items-center text-center space-y-6 md:col-span-5 lg:col-span-2">
            <h4 className="text-gray-900 font-bold uppercase tracking-[0.25em] text-xs flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-secondary-indigo rounded-full shrink-0" />
              Solutions
            </h4>
            <ul className="space-y-4">
              {footerLinks.services.map(link => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="group/link flex items-center justify-center gap-2 text-gray-500 hover:text-secondary-indigo transition-all duration-300 text-sm font-medium hover:scale-105"
                  >
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="p-8 lg:p-10 flex flex-col justify-start items-center text-center space-y-6 md:col-span-5 lg:col-span-3">
            <h4 className="text-gray-900 font-bold uppercase tracking-[0.25em] text-xs flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-secondary-indigo rounded-full shrink-0" />
              Connect
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center justify-center gap-3.5 group/link">
                <Mail size={15} className="text-gray-400 group-hover/link:text-secondary-indigo transition-colors duration-300 shrink-0" />
                <a 
                  href={`mailto:${envConfig.contact.email}`} 
                  className="text-xs sm:text-sm text-gray-500 group-hover/link:text-secondary-indigo transition-all duration-300 font-medium text-center"
                >
                  {envConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center justify-center gap-3.5 group/link">
                <Phone size={15} className="text-gray-400 group-hover/link:text-secondary-indigo transition-colors duration-300 shrink-0" />
                <div className="flex flex-col items-center gap-1">
                  <a 
                    href={`tel:+${envConfig.social.whatsappPhone.replace(/^\+/, '')}`} 
                    className="text-sm text-gray-500 group-hover/link:text-secondary-indigo transition-all duration-300 font-medium text-center"
                  >
                    +91 83107 11652
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal row */}
        <div className="pt-10 border-t border-gray-200/80 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-gray-400 text-[10px] font-bold tracking-[0.25em] uppercase text-center">
            © {new Date().getFullYear()} CORESLASH TECHNOLOGIES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-center">
            {footerLinks.legal.map(link => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-gray-400 hover:text-secondary-indigo hover:underline hover:underline-offset-4 transition-all text-[10px] font-bold uppercase tracking-widest whitespace-nowrap"
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

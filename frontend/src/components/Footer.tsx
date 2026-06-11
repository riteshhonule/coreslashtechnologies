import { Link } from 'react-router-dom';
import { envConfig } from '../config/env.config';
import { motion } from "framer-motion";
import { Mail, Phone, Facebook, Linkedin, Instagram, Twitter } from "lucide-react";
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
    { name: "Privacy Policy", path: "#" },
    { name: "Terms of Service", path: "#" },
    { name: "Cookie Policy", path: "#" }
  ]
};

export default function Footer() {
  return (
    <footer className="relative pt-32 pb-12 overflow-hidden bg-dark-black border-t border-white/5">

      {/* Top Border Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />

      {/* Background Glows */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-10">
            <Link to="/" className="inline-block group">
              <img src={logo} alt="CoreSlash" className="h-10 w-auto transition-transform group-hover:scale-105" />
            </Link>
            <p className="text-white/40 text-lg leading-relaxed max-w-sm">
              Architecting the next generation of digital experiences through
              intelligent design and engineering excellence.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Linkedin, url: envConfig.social.linkedin },
                { Icon: Instagram, url: envConfig.social.instagram }
              ].map(({ Icon, url }, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -5, scale: 1.1 }}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-white/40 hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-10 uppercase tracking-[0.2em] text-xs">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-white/40 hover:text-accent-cyan transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-10 uppercase tracking-[0.2em] text-xs">Solutions</h4>
            <ul className="space-y-4">
              {footerLinks.services.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-white/40 hover:text-accent-cyan transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3 space-y-10">
            <h4 className="text-white font-bold mb-2 uppercase tracking-[0.2em] text-xs">Connect</h4>
            <div className="space-y-6 pt-2">
              <div className="flex items-center gap-4 text-white/40 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center group-hover:text-accent-cyan group-hover:border-accent-cyan/30 transition-all">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-0.5">Email Us</p>
                  <span className="text-sm font-medium text-white/60">{envConfig.contact.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/40 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center group-hover:text-accent-cyan group-hover:border-accent-cyan/30 transition-all">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-0.5">Call Us</p>
                  <span className="text-sm font-medium text-white/60">+{envConfig.social.whatsappPhone}</span><br />
                  <span className="text-sm font-medium text-white/60">+91 9513013247</span><br />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/20 text-[10px] font-bold tracking-[0.3em] uppercase">
            © {new Date().getFullYear()} CORESLASH TECHNOLOGIES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-10">
            {footerLinks.legal.map(link => (
              <a key={link.name} href={link.path} className="text-white/20 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}


import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram, Twitter } from "lucide-react";
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
  locations: [
    "Bangalore HQ",
    "Belagavi Office",
    "Hubli Tech Hub",
    "Mysore Presence",
    "Global Remote"
  ]
};

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-12 overflow-hidden border-t border-white/5 bg-[#020617]">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="inline-block">
              <img src={logo} alt="CoreSlash" className="h-10 w-auto" />
            </Link>
            <p className="text-white/50 text-lg leading-relaxed max-w-sm">
              Architecting the next generation of digital experiences through intelligent design and engineering excellence.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Twitter, Instagram, Facebook].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -5, color: "#56E5FF" }}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-white/40 hover:text-cyan-400 transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-white/40 hover:text-cyan-400 transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">Stay Connected</h4>
            <div className="flex p-2 gap-2 border border-white/10 rounded-xl bg-white/5">
               <input 
                 type="email" 
                 placeholder="Enter your email" 
                 className="flex-1 bg-transparent border-none focus:ring-0 text-white text-sm px-4"
               />
               <button className="bg-cyan-500 text-[#020617] px-6 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors">
                 Join
               </button>
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 text-white/40 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:text-cyan-400 transition-colors">
                  <Mail size={18} />
                </div>
                <span className="text-sm font-medium">hello@coreslash.com</span>
              </div>
              <div className="flex items-center gap-4 text-white/40 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:text-cyan-400 transition-colors">
                  <Phone size={18} />
                </div>
                <span className="text-sm font-medium">+91 90000 00000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs font-medium tracking-widest">
            © {new Date().getFullYear()} CORESLASH TECHNOLOGIES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-white/20 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="text-white/20 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

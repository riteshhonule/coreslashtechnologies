import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from "lucide-react";

import logo from "../img/CoreslashTechnologies-solutions-main-logo.png";

export default function Footer() {

  return (

    <footer className="relative mt-8 pt-12 pb-10 overflow-hidden bg-[#020617] text-slate-300 w-full border-t border-white/10 bg-gradient-to-r from-[#020617]/90 to-[#02142b]/90 backdrop-blur-xl">


      {/* BACKGROUND GLOWS */}

      <div className="absolute top-0 left-1/3 h-96 w-96 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="absolute bottom-0 right-1/3 h-96 w-96 bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />



      {/* CONTENT CONTAINER */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">


        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* COMPANY */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Coreslash Technologies Logo" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-slate-400 text-[15px] leading-relaxed">
              Elevating digital experiences through bespoke web development and strategic marketing.
            </p>
            <div className="flex gap-4">
              {[Facebook, Linkedin, Instagram].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.2 }}
                  className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-blue-500/20 transition"
                  href="#"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {["Home", "About", "Services", "Portfolio", "Blog", "Contact"].map(item => (
                <li key={item} className="hover:text-blue-400 cursor-pointer transition-colors text-sm font-medium">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-white font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              {[
                "Website Development",
                "App Development",
                "Software Development",
                "Digital Marketing",
                "SEO Optimization"
              ].map(item => (
                <li key={item} className="hover:text-cyan-400 cursor-pointer transition-colors text-sm font-medium">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* LOCATIONS (SEO KEYWORDS) */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold mb-6">Areas We Serve</h3>
            <ul className="space-y-3">
              {[
                "Best Digital Marketing Agency in Bangalore",
                "Best Digital Marketing Agency in Hubli",
                "Best Digital Marketing Company in Belagavi",
                "Best Digital Marketing Agency in Mysore",
                "Best Digital Marketing Agency in Tumkur",
                "Best Digital Marketing Company in Mangalore",
                "Best Digital Marketing Agency in Gadag"
              ].map(item => (
                <li key={item} className="text-slate-500 hover:text-white cursor-default transition-colors text-[11px] font-medium leading-tight">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-white font-semibold mb-6">Get in Touch</h3>
            <div className="space-y-5">
              {[
                { icon: Mail, text: "contact@CoreslashTechnologies.com" },
                { icon: Phone, text: "+91 90000 00000" },
                { icon: MapPin, text: "Bangalore, Hubli, Belagavi" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <item.icon size={16} />
                  </div>
                  <span className="group-hover:text-white transition-colors text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>



        {/* BOTTOM */}

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">


          <p className="text-slate-500 text-xs tracking-widest text-center md:text-left">

            © {new Date().getFullYear()} Coreslash Technologies

          </p>


          <div className="flex gap-10 text-xs tracking-widest">

            <a href="#" className="hover:text-white transition-colors">

              PRIVACY POLICY

            </a>

            <a href="#" className="hover:text-white transition-colors">

              TERMS OF SERVICE

            </a>

          </div>


        </div>



      </div>

    </footer>

  );

}


import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import pitcsImg from "@/assets/portfolio/pitcs.webp";
import skandanImg from "@/assets/portfolio/skandan.webp";
import thedutzImg from "@/assets/portfolio/thedutz.webp";

interface CaseStudyItem {
  title: string;
  subtext: string;
  imageUrl: string;
  link: string;
}

const CASES: CaseStudyItem[] = [
  {
    title: "PITCS – IT Consulting & Staffing Solutions",
    subtext: "Providing global IT consulting, staffing, payroll, and workforce management services across multiple industries.",
    imageUrl: pitcsImg,
    link: "/portfolio"
  },
  {
    title: "Skandan – Business Consulting Solutions",
    subtext: "Helping businesses with crisis management, consulting, and smart solutions for better growth and operations.",
    imageUrl: skandanImg,
    link: "/portfolio"
  },
  {
    title: "The Dutz – Healthy, Guilt-Free Snacks",
    subtext: "Handcrafted energy bites made with premium dates, nuts, and seeds. 100% natural and plastic-free.",
    imageUrl: thedutzImg,
    link: "/portfolio"
  }
];

export default function PortfolioSection() {
  return (
    <section className="pt-16 pb-20 md:pt-20 md:pb-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden bg-background">

      {/* Centered Middle Heading Block for Case Studies */}
      <div className="text-center max-w-[900px] mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center justify-center gap-2 px-5 py-2 mb-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/25">
          <span>Case Studies</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-4 leading-tight text-center">
          Featured{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            Case Studies
          </span>
        </h2>

        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal text-center mb-6">
          Explore how CoreSlash engineers scalable software solutions, custom web applications, and high-impact digital experiences for enterprise clients.
        </p>

        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors uppercase tracking-wider group"
        >
          <span>VIEW ALL CASE STUDIES</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CASES.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="group flex flex-col justify-between rounded-[2rem] bg-white dark:bg-slate-900 border border-border/80 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.05)] transition-all duration-300 p-6"
          >
            {/* Visual Phone Mockup sitting on 3D Blocks */}
            <div className="relative w-full h-56 bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center mb-6 border border-border/40">

              {/* Layered 3D Geometric Blocks */}
              <div className="absolute bottom-2 left-[15%] w-24 h-24 bg-slate-200 dark:bg-slate-800 rounded-md rotate-[12deg] shadow-sm transition-transform group-hover:rotate-[15deg] group-hover:-translate-y-1 duration-500" />
              <div className="absolute bottom-5 right-[15%] w-28 h-20 bg-slate-300 dark:bg-slate-700 rounded-md rotate-[-8deg] shadow-sm transition-transform group-hover:rotate-[-12deg] group-hover:-translate-y-1 duration-500" />
              <div className="absolute bottom-1 left-[38%] w-[84px] h-[90px] bg-slate-400 dark:bg-slate-600 rounded-md shadow-md transition-transform group-hover:-translate-y-1 duration-500" />

              {/* Centered Floating Mock Phone Frame */}
              <div className="relative w-[106px] h-[200px] rounded-[22px] border-[5px] border-slate-950 dark:border-slate-800 bg-slate-950 shadow-2xl overflow-hidden z-10 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">

                {/* Notch */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-2 rounded-full bg-slate-950 z-20" />

                {/* Inside Image Screen */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                />
              </div>

            </div>

            {/* Typography block */}
            <div className="text-left space-y-3 flex-grow flex flex-col justify-between">
              <div>
                <h4 className="text-lg md:text-xl font-bold tracking-tight text-foreground line-clamp-1 group-hover:text-[#3b82f6] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mt-2 line-clamp-3">
                  {item.subtext}
                </p>
              </div>

              {/* View Case Study trigger link */}
              <div className="flex justify-end pt-4 mt-auto">
                <Link
                  to={item.link}
                  className="text-xs md:text-sm font-semibold text-[#3b82f6] flex items-center gap-1 group/btn hover:text-blue-600 transition-colors uppercase tracking-wider"
                >
                  View Case Study
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
}

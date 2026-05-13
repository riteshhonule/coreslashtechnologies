import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

const items = [
  {
    id: 1,
    title: "Exam Portal",
    category: "Education Platform",
    img: "/img/project/CoreslashTechnologiestechnologiesoec.png",
    description: "A complete online examination and assessment system engineered for massive concurrent traffic and high-integrity academic evaluations. Featuring real-time proctoring and neural analytics.",
    link: "https://olympiadexamination.org/"
  },
  {
    id: 2,
    title: "Surekha Lawns",
    category: "Booking System",
    img: "/img/project/CoreslashTechnologiestechnologiessurekha.png",
    description: "A smart venue booking platform with an integrated inventory management layer. Designed to streamline luxury event operations through automated scheduling and payment ecosystems.",
    link: "#"
  },
  {
    id: 3,
    title: "CSR Portal",
    category: "Management System",
    img: "/img/project/CoreslashTechnologiestechnologiescsr.png",
    description: "A centralized CSR management system built for enterprise-scale corporate social responsibility tracking. Real-time impact dashboards and stakeholder reporting modules.",
    link: "#"
  },
  {
    id: 4,
    title: "Shaadi Karoge",
    category: "Matrimony Platform",
    img: "/img/project/CoreslashTechnologiestechnologiesshadi.png",
    description: "A specialized matrimonial ecosystem focusing on secure user matching and verification. Features advanced filter algorithms and high-velocity search indexing.",
    link: "#"
  },
  {
    id: 5,
    title: "Doctorate Portal",
    category: "Nomination Platform",
    img: "/img/project/CoreslashTechnologiestechnologieschon.png",
    description: "A specialized web architecture designed to manage honorary doctorate nominations globally. Featuring complex document verification and committee review workflows.",
    link: "#"
  }
];

const PortfolioPage = () => {
  const [active, setActive] = useState<typeof items[0] | null>(null);

  return (
    <div className="bg-dark-black min-h-screen pt-[100px] overflow-hidden">
      {/* GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-purple/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative py-24 md:py-32 w-full">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <SparklesIcon className="w-4 h-4 text-accent-cyan" />
            <span className="text-xs font-bold text-accent-cyan uppercase tracking-[0.3em]">
              The Achievement Matrix
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-bold text-white mb-10 leading-[1.1] tracking-tight"
          >
            Digital <span className="text-gradient-purple">Proof</span> of Concept.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/40 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
          >
            Showcasing a lineage of high-impact engineering and disruptive design.
            We build the systems that build the future.
          </motion.p>
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {items.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="group relative"
                onClick={() => setActive(p)}
              >
                <div className="glass-card h-full rounded-[3rem] overflow-hidden border-white/5 cursor-pointer hover:border-accent-cyan/20 transition-all duration-700">
                  <div className="aspect-[16/10] overflow-hidden transition-all duration-1000 relative">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-dark-black/40 to-transparent opacity-80" />
                  </div>

                  <div className="p-10 relative">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                      <span className="text-accent-cyan text-[10px] font-bold uppercase tracking-[0.2em]">
                        {p.category}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-accent-cyan transition-colors duration-500">{p.title}</h3>

                    <div className="flex items-center gap-3 text-white/40 text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                      DECRYPT CASE STUDY <ArrowRightIcon className="w-4 h-4 text-accent-cyan" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL REDESIGN */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-dark-black/95 backdrop-blur-xl"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-[4rem] border-white/10 flex flex-col md:flex-row relative"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-8 right-8 z-[110] bg-white/5 hover:bg-white/10 text-white w-12 h-12 rounded-full backdrop-blur-md transition flex items-center justify-center border border-white/10"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                <img src={active.img} className="w-full h-full object-cover" alt={active.title} />
                <div className="absolute inset-0 bg-gradient-to-r from-dark-black/60 to-transparent md:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-black/60 to-transparent md:hidden block" />
              </div>

              <div className="md:w-1/2 p-12 md:p-20 overflow-y-auto flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 mb-8">
                  <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                  <span className="text-accent-cyan font-bold text-xs tracking-[0.3em] uppercase">{active.category}</span>
                </div>

                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight">{active.title}</h2>

                <p className="text-white/40 text-xl leading-relaxed mb-12 font-medium italic">
                  "{active.description}"
                </p>

                <div className="flex flex-col sm:flex-row gap-6 mt-auto">
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`btn-pill text-lg px-10 ${active.link === "#"
                      ? "bg-white/5 text-white/20 cursor-not-allowed border-white/5"
                      : "btn-primary-glow text-white"
                      }`}
                    onClick={(e) => active.link === "#" && e.preventDefault()}
                  >
                    {active.link === "#" ? "Project Offline" : "View Project"}
                    {active.link !== "#" && <ArrowTopRightOnSquareIcon className="w-5 h-5" />}
                  </a>

                  <button
                    onClick={() => setActive(null)}
                    className="btn-pill btn-glass text-white px-10"
                  >
                    Back to Matrix
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioPage;





import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  {
    id: 1,
    title: "Exam Portal",
    category: "Education Platform",
    img: "/img/project/InfoteliaITSolutionstechnologiesoec.png",
    description: "A complete online examination and assessment system...",
    link: "https://olympiadexamination.org/"
  },
  {
    id: 2,
    title: "Surekha Lawns",
    category: "Booking System",
    img: "/img/project/InfoteliaITSolutionstechnologiessurekha.png",
    description: "A smart venue booking platform...",
    link: "#"
  },
  {
    id: 3,
    title: "CSR Portal",
    category: "Management System",
    img: "/img/project/InfoteliaITSolutionstechnologiescsr.png",
    description: "A centralized CSR management system...",
    link: "#"
  },
  {
    id: 4,
    title: "Shaadi Karoge",
    category: "Matrimony Platform",
    img: "/img/project/InfoteliaITSolutionstechnologiesshadi.png",
    description: "A specialized web platform...",
    link: "#"
  },
  {
    id: 5,
    title: "Honorary Doctorate Portal",
    category: "Nomination Platform",
    img: "/img/project/InfoteliaITSolutionstechnologieschon.png",
    description:
      "A specialized web platform designed to manage honorary doctorate nominations.",
    link: "#"
  },

  // {
  //   id: 5,
  //   title: "Wellness Center",
  //   category: "Healthcare Platform",
  //   img: "https://placehold.co/600x400/047857/ffffff?text=Project+6",
  //   description: "A digital healthcare and wellness management platform...",
  //   link: "#"
  // }
];

const PortfolioPage = () => {
  const [active, setActive] = useState<typeof items[0] | null>(null);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. TOP SPACER: Matches your Navbar height to keep the top area clean/white */}
      <div className="h-24 md:h-32 bg-white w-full" />

      {/* 2. DARK HEADER SECTION: Starts strictly below the navbar area */}
      <section className="bg-[#0a0a0b] py-12 md:py-24 w-full">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent"
          >
            Our Portfolio
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-sm md:text-lg max-w-2xl mx-auto font-medium"
          >
            Showcasing our journey in building impactful digital experiences. Dive into our portfolio and discover the remarkable success stories behind Campaign.
          </motion.p>
        </div>
      </section>

      {/* 3. WHITE CONTENT SECTION: The portfolio grid */}
      <section className="bg-white py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {items.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-[2.5rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] cursor-pointer"
                onClick={() => setActive(p)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 p-8 text-white">
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2 block">
                    {p.category}
                  </span>
                  <h3 className="text-2xl font-bold">{p.title}</h3>
                  <div className="mt-3 flex items-center gap-2 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                    View Details <span className="text-lg">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="relative h-60 md:h-72">
                <img src={active.img} className="w-full h-full object-cover" alt={active.title} />
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-5 right-5 bg-black/50 text-white w-10 h-10 rounded-full hover:bg-black transition flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="p-8 overflow-y-auto">
                <span className="text-blue-600 font-bold text-sm tracking-wide">{active.category}</span>
                <h2 className="text-3xl font-black mt-1 mb-4 text-gray-900">{active.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-8">{active.description}</p>
                <a
                  href={active.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-block px-8 py-3 rounded-xl font-bold transition ${active.link === "#"
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100"
                    }`}
                  onClick={(e) => active.link === "#" && e.preventDefault()}
                >
                  Visit Live Project
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioPage;

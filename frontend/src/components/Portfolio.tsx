import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const items = [
  {
    id: 1,
    title: "Olympiad Exam Portal",
    category: "Education Platform",
    img: "/img/project/CoreslashTechnologiestechnologiesoec.png",
    description: "A comprehensive online assessment engine designed for national level olympiads, featuring real-time monitoring and automated grading.",
    link: "https://olympiadexamination.org/"
  },
  {
    id: 2,
    title: "Surekha Event Lawns",
    category: "Booking & Management",
    img: "/img/project/CoreslashTechnologiestechnologiessurekha.png",
    description: "An integrated venue management system that streamlines bookings, vendor coordination, and customer relationship management.",
    link: "#"
  },
  {
    id: 3,
    title: "Enterprise CSR Portal",
    category: "Management System",
    img: "/img/project/CoreslashTechnologiestechnologiescsr.png",
    description: "Digital transformation of CSR activities for major corporations, ensuring transparency and efficient impact tracking.",
    link: "#"
  },
  {
    id: 4,
    title: "Academic Nomination System",
    category: "Nomination Platform",
    img: "/img/project/CoreslashTechnologiestechnologiesshadi.png",
    description: "A secure, peer-reviewed nomination platform for honorary academic recognitions and credentials verification.",
    link: "#"
  }
];

export default function Portfolio() {
  const [active, setActive] = useState<typeof items[0] | null>(null);

  return (
    <section id="portfolio" className="relative py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <span className="text-xs font-bold text-accent-cyan uppercase tracking-widest">
              Selected Works
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Case Studies of <span className="text-gradient-cyan">Success</span>
          </h2>
          <p className="text-white/60 text-lg">
            Explore how we've helped businesses transform their operations through custom software and AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group cursor-pointer relative"
              onClick={() => setActive(project)}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-white/10 glass-card">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-transparent opacity-80" />

                <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                  <p className="text-accent-cyan text-xs font-bold uppercase tracking-widest mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-accent-cyan transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-white/50 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Case Study <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
           <button className="btn-outline">Browse Full Portfolio</button>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg-dark/95 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-[#1A004D] border border-white/10 rounded-[3rem] max-w-4xl w-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <img src={active.img} alt={active.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-black/50 text-white hover:bg-accent-cyan hover:text-black transition-all"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-10">
                <p className="text-accent-cyan font-bold uppercase tracking-widest text-sm mb-4">
                  {active.category}
                </p>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {active.title}
                </h3>
                <p className="text-white/60 text-lg leading-relaxed mb-10">
                  {active.description}
                </p>
                
                <div className="flex flex-wrap gap-4">
                   {active.link !== "#" && (
                     <a 
                       href={active.link} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="btn-primary flex items-center gap-2"
                     >
                       Visit Live Site <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                     </a>
                   )}
                   <button 
                     onClick={() => setActive(null)}
                     className="btn-outline"
                   >
                     Close Project
                   </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

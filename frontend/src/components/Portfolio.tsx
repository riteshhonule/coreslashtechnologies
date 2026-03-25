

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const items = [
//   {
//     id: 1,
//     title: "Exam Portal",
//     category: "Education Platform",
//     img: "/img/project/InfoteliaITSolutionstechnologiesoec.png",
//     description: "A complete online examination and assessment system designed for schools, institutes, and organizations. It allows student registration, exam scheduling, secure test participation, automated evaluation, instant result generation, performance analytics, and administrative control through a centralized dashboard.",
//     link: "https://olympiadexamination.org/"
//   },
//   {
//     id: 2,
//     title: "Surekha Lawns",
//     category: "Booking System",
//     img: "/img/project/InfoteliaITSolutionstechnologiessurekha.png",
//     description: "A smart venue booking platform developed for event and wedding lawn management. It enables users to explore venue details, check availability in real time, view gallery and pricing, submit booking requests, and allows administrators to manage bookings, inquiries, and customer communication efficiently.",
//     link: "#"
//   },
//   {
//     id: 3,
//     title: "CSR Portal",
//     category: "Management System",
//     img: "/img/project/InfoteliaITSolutionstechnologiescsr.png",
//     description: "A centralized Corporate Social Responsibility management system built for organizations to handle CSR initiatives digitally. It supports application submission, project tracking, document management, approval workflows, reporting, and transparency in CSR operations with a structured administrative interface.",
//     link: "#"
//   },
//   {
//     id: 4,
//     title: "Honorary Doctorate Portal",
//     category: "Nomination Platform",
//     img: "/img/project/InfoteliaITSolutionstechnologiesshadi.png",
//     description: "A specialized web platform designed to manage honorary doctorate nominations and verification processes. It allows applicants to submit profiles, upload documents, track application status, and enables administrators to review, verify, approve, and manage the entire nomination lifecycle securely.",
//     link: "#"
//   },
//   {
//     id: 5,
//     title: "Wellness Center",
//     category: "Healthcare Platform",
//     img: "https://placehold.co/600x400/047857/ffffff?text=Project+6",
//     description: "A digital healthcare and wellness management platform that helps clinics and wellness providers manage services, appointments, patient inquiries, and online engagement. It improves operational efficiency and enhances the overall client experience through organized service management.",
//     link: "#"
//   }
// ];

// export default function Portfolio() {
//   const [active, setActive] = useState<typeof items[0] | null>(null);

//   return (
//     <section id="portfolio" className="py-24 bg-gray-50/50">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//         {/* Header */}
//         <div className="text-center max-w-3xl mx-auto mb-14">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 mb-4 shadow-sm"
//           >
//             <span className="text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent uppercase tracking-[0.2em]">
//               Our Portfolio
//             </span>
//           </motion.div>

//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
//           >
//             Case Studies That{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
//               Inspire
//             </span>
//           </motion.h2>
//         </div>

//         {/* View All Row (Reduced Gap) */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-2 md:gap-6">
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//           >
//             <a
//               href="/portfolio"
//               className="inline-flex items-center gap-2 text-gray-900 font-bold hover:text-blue-600 transition-colors"
//             >
//               View All Projects <span>→</span>
//             </a>
//           </motion.div>
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {items.map((p, idx) => (
//             <motion.div
//               key={p.id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: idx * 0.1 }}
//               className="group cursor-pointer"
//               onClick={() => setActive(p)}
//             >
//               <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-gray-200/50">
//                 <div className="aspect-[4/3] overflow-hidden">
//                   <motion.img
//                     src={p.img}
//                     alt={p.title}
//                     className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                 </div>

//                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

//                 <div className="absolute bottom-0 left-0 right-0 p-8">
//                   <div className="text-white font-bold text-xl mb-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
//                     {p.title}
//                   </div>
//                   <div className="opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-100">
//                     <span className="inline-block px-6 py-2 bg-white text-gray-900 rounded-full font-bold text-sm hover:bg-blue-50 transition-colors">
//                       View Project
//                     </span>
//                   </div>
//                 </div>

//                 <div className="absolute top-6 right-6 p-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                   <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                   </svg>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Modal (unchanged) */}
//       <AnimatePresence>
//         {active && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/90 backdrop-blur-sm"
//             onClick={() => setActive(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               className="bg-white rounded-[3rem] overflow-hidden max-w-4xl w-full shadow-2xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="relative aspect-video">
//                 <img src={active.img} alt={active.title} className="w-full h-full object-cover" />
//                 <button
//                   className="absolute top-6 right-6 p-3 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors"
//                   onClick={() => setActive(null)}
//                 >
//                   ✕
//                 </button>
//               </div>
//               <div className="p-10">
//                 <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-widest">
//                   {active.category}
//                 </span>
//                 <h3 className="text-3xl font-extrabold text-gray-900 mt-6 mb-6">{active.title}</h3>
//                 <p className="text-gray-600 text-lg leading-relaxed mb-8">
//                   {active.description}
//                 </p>
//                 <div className="flex gap-4">
//                   <a
//                     href={active.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`px-8 py-4 rounded-2xl font-bold transition-colors flex items-center gap-2 ${active.link === "#" ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-900 text-white hover:bg-blue-600"}`}
//                     onClick={(e) => active.link === "#" && e.preventDefault()}
//                   >
//                     Visit Live Project
//                     {active.link !== "#" && <span>→</span>}
//                   </a>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }




import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  {
    id: 1,
    title: "Exam Portal",
    category: "Education Platform",
    img: "/img/project/InfoteliaITSolutionstechnologiesoec.png",
    description:
      "A complete online examination and assessment system designed for schools, institutes, and organizations.",
    link: "https://olympiadexamination.org/"
  },
  {
    id: 2,
    title: "Surekha Lawns",
    category: "Booking System",
    img: "/img/project/InfoteliaITSolutionstechnologiessurekha.png",
    description:
      "A smart venue booking platform developed for event and wedding lawn management.",
    link: "#"
  },
  {
    id: 3,
    title: "CSR Portal",
    category: "Management System",
    img: "/img/project/InfoteliaITSolutionstechnologiescsr.png",
    description:
      "A centralized Corporate Social Responsibility management system.",
    link: "#"
  },
  {
    id: 4,
    title: "Honorary Doctorate Portal",
    category: "Nomination Platform",
    img: "/img/project/InfoteliaITSolutionstechnologiesshadi.png",
    description:
      "A specialized web platform designed to manage honorary doctorate nominations.",
    link: "#"
  }
  // {
  //   id: 5,
  //   title: "Wellness Center",
  //   category: "Healthcare Platform",
  //   img: "https://placehold.co/600x400",
  //   description:
  //     "A digital healthcare and wellness management platform.",
  //   link: "#"
  // }
];

export default function Portfolio() {

  const [active, setActive] = useState<typeof items[0] | null>(null);

  return (

    <section className="py-24 bg-gray-50/50">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">

        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="
    inline-flex items-center gap-2
    px-5 py-2
    rounded-full
    bg-gradient-to-r from-blue-100 via-cyan-100 to-indigo-100
    border border-blue-200
    shadow-md shadow-blue-200/40
    mb-5"
        >

          {/* Dot */}
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse"></span>

          <span className="
    text-xs font-bold
    bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600
    bg-clip-text text-transparent
    uppercase tracking-[0.25em]">

            Our Portfolio

          </span>

        </motion.div>


        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
    text-4xl md:text-5xl lg:text-6xl
    font-extrabold
    text-gray-900
    tracking-tight
    leading-tight"
        >

          Case Studies That{" "}

          <span className="
    text-transparent bg-clip-text
    bg-gradient-to-r
    from-blue-600 via-cyan-500 to-indigo-600">

            Inspire

          </span>

        </motion.h2>


        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 mt-4 text-lg"
        >

          Explore our latest premium work and success stories

        </motion.p>

      </div>


      {/* View All Row */}
      <div className="max-w-7xl mx-auto px-4 flex justify-start mb-10">

        <motion.a
          href="/portfolio"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="
    inline-flex items-center gap-2
    px-5 py-2.5
    text-sm font-semibold
    text-white
    bg-gradient-to-r from-blue-600 to-cyan-500
    rounded-lg
    shadow-md shadow-blue-500/20
    hover:shadow-blue-500/40
    hover:from-blue-700 hover:to-cyan-600
    transition-all duration-300
    "
        >

          View All Projects

          <span className="transition-transform duration-300 hover:translate-x-1">
            →
          </span>

        </motion.a>

      </div>



      <div className="max-w-7xl mx-auto px-4">


        {/* GRID */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {items.map((p, idx) => (

            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setActive(p)}
            >

              <div className="relative overflow-hidden rounded-[2rem] shadow-xl">

                <div className="aspect-[4/3] overflow-hidden">

                  <img
                    src={p.img}
                    className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
                  />

                </div>

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />


                {/* TEXT */}

                <div className="absolute bottom-0 p-6 text-white">

                  <h3 className="text-xl font-bold">

                    {p.title}

                  </h3>

                  {/* <span className="opacity-0 group-hover:opacity-100">

                    View Project →

                  </span> */}

                  <span className="
inline-flex items-center gap-2 px-5 py-2.5 rounded-full 
bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500
text-white font-semibold text-sm tracking-wide
shadow-lg shadow-blue-500/30

opacity-100 md:opacity-0
md:group-hover:opacity-100

translate-y-0 md:translate-y-6
md:group-hover:translate-y-0

transition-all duration-500 ease-out
">

                    View Project

                    <span className="transition-transform duration-300 md:group-hover:translate-x-1">
                      →
                    </span>

                  </span>


                </div>


                {/* EYE ICON (KEPT SAFE) */}

                <div className="absolute top-4 right-4 p-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 opacity-0 group-hover:opacity-100 transition">

                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />

                  </svg>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>


      {/* MODAL */}

      <AnimatePresence>

        {active && (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"

            onClick={() => setActive(null)}

          >


            <motion.div

              initial={{ scale: 0.9 }}

              animate={{ scale: 1 }}

              exit={{ scale: 0.9 }}

              onClick={(e) => e.stopPropagation()}

              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] shadow-2xl flex flex-col overflow-hidden"

            >


              {/* IMAGE */}

              <div className="relative h-56 md:h-64">

                <img

                  src={active.img}

                  className="w-full h-full object-cover"

                />


                <button

                  onClick={() => setActive(null)}

                  className="absolute top-4 right-4 bg-black/40 text-white p-2 rounded-full hover:bg-black"

                >

                  ✕

                </button>

              </div>


              {/* CONTENT */}

              <div className="p-6 md:p-8 overflow-y-auto">

                <span className="text-blue-600 font-semibold text-sm">

                  {active.category}

                </span>


                <h2 className="text-2xl font-bold mt-2 mb-4">

                  {active.title}

                </h2>


                <p className="text-gray-600 mb-6">

                  {active.description}

                </p>


                <a

                  href={active.link}

                  target="_blank"

                  className={`

px-6 py-3

rounded-xl

font-semibold

${active.link === "#"
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-black text-white hover:bg-blue-600"
                    }

`}

                  onClick={(e) => active.link === "#" && e.preventDefault()}

                >

                  Visit Live Project →

                </a>


              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>


    </section>

  );

}


import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroVideo from "../assets/CoreslashTechnologiestechnologies.webm";
import { useModal } from "../context/ModalContext";

export default function Hero() {
  const { openModal } = useModal();

  return (
    <section className="relative isolate min-h-screen flex items-center pt-40 overflow-hidden">
      {/* Background Video Layer */}
      <video
        autoPlay
        loop
        muted
        playsInline
        src={heroVideo}
        className="absolute top-0 left-0 w-full h-full object-cover -z-20"
      />

      {/* Dark Overlay Layer */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 to-black/40 -z-10" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >

          {/* TOP BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm font-semibold text-cyan-300">
              Your Partner in AI-Driven Digital Growth
            </span>
          </motion.div>



          {/* MAIN HEADING
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white tracking-tight">
  Top IT Solutions & Software Development Company in India <br/> 
  <span className="text-3xl md:text-4xl text-blue-400">Based in Belgaum</span><br/>
  <span className="text-white">Coreslash Technologies</span>
</h1>



          {/* SUB HEADING */}
          {/* <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-200">

            India�s No.1{" "}

            <span className="text-yellow-400">
              AI IT Solutions
            </span>{" "}

            Company

          </h2> */}


          {/* MAIN HEADING */}
          <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
            AI-Powered IT & Software Development Company
            <br />
          </h1>
          <span className="text-2xl md:text-5xl font-extrabold tracking-wide bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
            Coreslash Technologies
          </span>
          {/* SUB HEADING */}
          <h2 className="mt-3 text-sm md:text-l text-gray-300">
            Custom Software, Web & Scalable
            <span className="text-yellow-400"> AI Solutions</span>
          </h2>

          {/* LOCATION / TRUST LINE
          <p className="mt-2 text-sm text-gray-400">
            Based in Belgaum • Serving Clients Across India
          </p> */}

          {/* SEO DESCRIPTION
          <p className="mt-6 text-sm text-gray-300 leading-relaxed max-w-xl">

            Transform your business with AI-powered IT solutions, website development,
            software development, and digital marketing services.

            We help companies increase traffic, automate operations,
            and scale revenue faster with cutting-edge technology.

          </p> */}



          <div className="mt-10 flex flex-wrap justify-center items-center gap-6">

            <button
              onClick={openModal}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-2xl font-bold hover:scale-105 transition"
            >
              Get Started ?
            </button>


            <Link
              to="/services"
              className="px-8 py-4 border border-white/30 text-white rounded-2xl font-bold hover:bg-white/10 transition"
            >
              View Services
            </Link>

          </div>



          {/* TRUST LOGOS */}
          <div className="mt-6 mb-12 flex items-center justify-center gap-8 opacity-70">

            <img src="https://img.icons8.com/color/48/google-logo.png" className="h-12 invert" />

            <img src="https://img.icons8.com/color/48/meta.png" className="h-12 invert" />

            <img src="https://img.icons8.com/color/48/microsoft.png" className="h-12 invert" />

          </div>


        </motion.div>

      </div>
    </section>
  );
}





import { motion } from "framer-motion";
import wall from "../img/InfoteliaITSolutions_wall.png";

export default function About() {
  return (
    <section id="about" className="py-10 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Trusted by growth-focused brands
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed">
              We blend data-driven marketing with robust engineering to deliver outcomes:
              higher visibility, qualified leads, and scalable digital products.
            </p>

            {/* STATS GRID */}
            <div className="mt-8 grid grid-cols-2 gap-4 ">
              {[
                { k: "Years Experience", v: "8+" },
                { k: "Projects Delivered", v: "120+" },
                { k: "Avg ROI Improvement", v: "3.5x" },
                { k: "Client Retention", v: "92%" },
              ].map((i) => (
                <div
                  key={i.k}
                  className="glass rounded-xl p-5 hover-lift border border-blue-300"
                >
                  {/* Dark Blue Number */}
                  <div className="text-3xl font-extrabold text-blue-700 tracking-tight">
                    {i.v}
                  </div>

                  <div className="text-sm text-gray-600 mt-1 font-bold">
                    {i.k}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>


          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-start"
          >
            {/* Image */}
            <img
              src={wall} // replace with your image
              alt="About Infotelia IT Solutions"
              className="rounded-2xl shadow-xl w-full max-w-lg object-cover"
            />

            {/* Text */}
            <p className="mt-6 text-sm text-gray-600 leading-relaxed max-w-lg">
              Modern, accessible, and performance-first websites paired with premium
              brand storytelling, carefully tuned for conversions.
            </p>
          </motion.div>



        </div>
      </div>
    </section>
  );
}


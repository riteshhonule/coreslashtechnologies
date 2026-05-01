import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section className="relative py-12 bg-transparent">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Send us a Message
          </h2>
          <p className="text-gray-600">
            Have a specific inquiry? Fill out the form below.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl rounded-3xl p-8 md:p-12"
        >
          <ContactForm variant="default" />
        </motion.div>
      </div>
    </section>
  );
}

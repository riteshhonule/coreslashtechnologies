import { motion } from "framer-motion";
import { envConfig } from "../config/env.config";
import Contact from "../components/Contact";
import SEO from "../components/SEO";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

const ContactPage = () => {
  const contactItems = [
    {
      icon: <PhoneIcon className="w-8 h-8 md:w-12 md:h-12" />,
      title: "Mobile",
      detail: (
        <a
          href={`tel:+${envConfig.social.whatsappPhone}`}
          className="block hover:text-secondary-indigo transition-colors duration-300"
        >
          +91 83107 11652
        </a>
      ),
      link: "#",
      accent: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: <ChatBubbleLeftRightIcon className="w-8 h-8 md:w-12 md:h-12" />,
      title: "WhatsApp",
      detail: (
        <a
          href={envConfig.social.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-secondary-indigo transition-colors duration-300"
        >
          WhatsApp Business
        </a>
      ),
      link: "#",
      accent: "text-green-600",
      bg: "bg-green-50"
    },
    {
      icon: <EnvelopeIcon className="w-8 h-8 md:w-12 md:h-12" />,
      title: "Mailbox",
      detail: envConfig.contact.email,
      link: envConfig.contact.emailLink,
      accent: "text-primary-purple",
      bg: "bg-purple-50"
    },
    {
      icon: <MapPinIcon className="w-8 h-8 md:w-12 md:h-12" />,
      title: "Location",
      detail: "Belgaum, India",
      link: envConfig.contact.mapsLink,
      accent: "text-cyan-600",
      bg: "bg-cyan-50"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "CoreSlash Technologies",
    "image": `${envConfig.appUrl}/CoreslashTechnologies-solutions-main-logo.webp`,
    "@id": envConfig.appUrl,
    "url": `${envConfig.appUrl}/contact`,
    "telephone": envConfig.social.whatsappPhone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Belgaum",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    }
  };

  return (
    <main className="relative min-h-screen bg-[#F9FAFB] pt-0 overflow-x-hidden pb-12 text-gray-900">
      <SEO
        title="Contact Us"
        description="Get in touch with CoreSlash Technologies for expert IT solutions, custom software development, and AI systems."
        structuredData={structuredData}
      />
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-purple/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-indigo/2 rounded-full blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative py-12 md:py-32 w-full text-center px-6">
        <motion.div
          initial={{ opacity: 1, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-8"
        >
          <SparklesIcon className="w-4 h-4 text-secondary-indigo" />
          <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.3em]">
            Secure Channel
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-5xl md:text-8xl font-bold text-gray-900 mb-10 tracking-tight leading-[1.1]"
        >
          Connect with <span className="text-gradient-purple">Intelligence.</span>
        </motion.h1>

        <p className="text-gray-500 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-12">
          Sync with our engineering core to deploy bespoke digital solutions.
          Book your <span className="text-secondary-indigo font-bold">FREE Architecture Session</span> to
          define your project trajectory.
        </p>
      </section>

      {/* CONTACT METHOD CARDS */}
      <section className="py-10 md:py-20 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {contactItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                initial={{ opacity: 1, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0, margin: "200px" }}
                transition={{ delay: index * 0.04, duration: 0.3 }}
                className="glass-card group p-8 md:p-12 rounded-[3rem] text-center border border-gray-200/50 bg-white hover:border-secondary-indigo/20 transition-all duration-700 block relative overflow-hidden shadow-md shadow-gray-200/30"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-8 rounded-3xl ${item.bg} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(99,91,255,0.15)]`}>
                  <div className={`${item.accent} transition-transform duration-500 group-hover:rotate-12`}>
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-gray-900 text-lg md:text-xl font-bold mb-3 tracking-tight">
                  {item.title}
                </h3>

                <div className="text-gray-500 text-xs md:text-sm font-medium leading-tight break-words px-2 group-hover:text-gray-800 transition-colors duration-500">
                  {item.detail}
                </div>

                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-secondary-indigo/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section id="consultation" className="py-12 md:py-24 relative z-10 px-6 scroll-mt-28">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 1, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0, margin: "200px" }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-200/60 shadow-xl shadow-gray-200/30"
          >
            <div className="text-center mb-10 flex flex-col items-center justify-center">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight text-center">Schedule a Call</h2>
              <p className="text-gray-500 text-lg font-medium text-center">Describe your vision and our architects will reach out.</p>
            </div>
            <Contact />
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;


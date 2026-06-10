import { motion } from "framer-motion";
import { envConfig } from "../config/env.config";
import Contact from "../components/Contact";
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
        <>
          <a
            href={`tel:+${envConfig.social.whatsappPhone}`}
            className="block hover:text-white transition-colors duration-300"
          >
            +{envConfig.social.whatsappPhone}
          </a>

          <a
            href="tel:+919513013247"
            className="block mt-2 hover:text-white transition-colors duration-300"
          >
            +91 9513013247
          </a>
        </>
      ),
      link: "#",
      accent: "text-accent-cyan",
      bg: "bg-accent-cyan/10"
    },
    {
      icon: <ChatBubbleLeftRightIcon className="w-8 h-8 md:w-12 md:h-12" />,
      title: "WhatsApp",
      detail: (
        <>
          <a
            href={envConfig.social.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:text-white transition-colors duration-300"
          >
            WhatsApp 1
          </a>
          <a
            href={envConfig.social.whatsappLinkSecondary}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 hover:text-white transition-colors duration-300"
          >
            WhatsApp 2
          </a>
        </>
      ),
      link: "#",
      accent: "text-green-400",
      bg: "bg-green-400/10"
    },
    {
      icon: <EnvelopeIcon className="w-8 h-8 md:w-12 md:h-12" />,
      title: "Mailbox",
      detail: envConfig.contact.email,
      link: envConfig.contact.emailLink,
      accent: "text-primary-purple",
      bg: "bg-primary-purple/10"
    },
    {
      icon: <MapPinIcon className="w-8 h-8 md:w-12 md:h-12" />,
      title: "Location",
      detail: "Belgaum, India",
      link: envConfig.contact.mapsLink,
      accent: "text-blue-400",
      bg: "bg-blue-400/10"
    }
  ];

  return (
    <main className="min-h-screen bg-dark-black pt-[100px] overflow-hidden">
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-purple/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative py-24 md:py-32 w-full text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <SparklesIcon className="w-4 h-4 text-accent-cyan" />
          <span className="text-xs font-bold text-accent-cyan uppercase tracking-[0.3em]">
            Secure Channel
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-bold text-white mb-10 tracking-tight leading-[1.1]"
        >
          Connect with <span className="text-gradient-purple">Intelligence.</span>
        </motion.h1>

        <p className="text-white/40 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-12">
          Sync with our engineering core to deploy bespoke digital solutions.
          Book your <span className="text-accent-cyan font-bold">FREE Architecture Session</span> to
          define your project trajectory.
        </p>
      </section>

      {/* CONTACT METHOD CARDS */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {contactItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card group p-8 md:p-12 rounded-[3rem] text-center border-white/5 hover:border-white/20 transition-all duration-700 block relative overflow-hidden"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-8 rounded-3xl ${item.bg} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]`}>
                  <div className={`${item.accent} transition-transform duration-500 group-hover:rotate-12`}>
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-white text-lg md:text-xl font-bold mb-3 tracking-tight">
                  {item.title}
                </h3>

                <p className="text-white/30 text-xs md:text-sm font-medium leading-tight break-words px-2 group-hover:text-white transition-colors duration-500">
                  {item.detail}
                </p>

                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-32 relative z-10 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-20 rounded-[4rem] border-white/5"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Schedule a Call</h2>
              <p className="text-white/40 text-xl font-medium">Describe your vision and our architects will reach out.</p>
            </div>
            <Contact />
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;


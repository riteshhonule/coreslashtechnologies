
import { motion } from "framer-motion";
import Contact from "../components/Contact";

import emailIcon from "../img/contact/email.png";
import phoneIcon from "../img/contact/call.png";
import whatsappIcon from "../img/contact/whatsapp.webp";
import locationIcon from "../img/contact/location.webp";

const ContactPage = () => {
  const contactItems = [
    {
      icon: phoneIcon,
      title: "Call Us",
      detail: "+91 8861220023",
      link: "tel:+918861220023",
      glow: "hover:shadow-purple-500/40"
    },
    {
      icon: whatsappIcon,
      title: "WhatsApp",
      detail: "Start Chat",
      link: "https://wa.me/918861220023",
      glow: "hover:shadow-green-500/40"
    },
    {
      icon: emailIcon,
      title: "Email Us",
      detail: "coreslashTechnologies@gmail.com",
      link: "mailto:coreslashTechnologies@gmail.com",
      glow: "hover:shadow-blue-500/40"
    },
    {
      icon: locationIcon,
      title: "Location",
      detail: "Mumbai, India",
      link: "https://maps.google.com",
      glow: "hover:shadow-cyan-500/40"
    }
  ];

  return (
    /* REMOVED: pt-[120px] and bg-white from the main wrapper */
    // <main className="min-h-screen overflow-hidden mt-[74px] md:mt-[88px] bg-[#3B82F6]">
    <main className="min-h-screen overflow-hidden mt-[74px] md:mt-[88px] bg-[#3B82F6]">
      {/* Premium Header - Gradient now starts at the very top of the viewport */}
      <section className="text-center pt-[40px] md:pt-[70px] lg:pt-[90px] pb-20 px-4 bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
        >
          Contact Us
        </motion.h1>
        <p className="text-blue-100/80 max-w-3xl mx-auto leading-relaxed">
          Contact Us to book a 30 minutes
          <span className="text-green-400 font-bold text-4xl md:text-4xl mx-1">
            FREE
          </span>
          session to get a customized strategy and quotation with
          <span className="text-white font-bold ml-1">CoreslashTechnologies</span> Marketing Agency.
          <br className="hidden md:block" />
          Start a conversation with us to build a good relationship and business together.
        </p>
      </section>

      {/* Ultra Premium Cards - Added bg-white here to separate from the header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10">
          {contactItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target={item.link.startsWith('mailto:') ? undefined : "_blank"}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                rotateX: 5,
                rotateY: 5
              }}
              className={`
                group
                relative
                p-[1px]
                rounded-2xl md:rounded-3xl
                bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500
                ${item.glow}
                transition duration-500
              `}
            >
              {/* Glass Card */}
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-3xl p-5 md:p-10 text-center h-full flex flex-col justify-center items-center shadow-lg border border-gray-100">
                {/* Floating 3D Icon */}
                <motion.img
                  src={item.icon}
                  className="w-12 md:w-24 mb-3 md:mb-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] object-contain"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                />

                <h3 className="text-gray-900 text-sm md:text-xl font-bold mb-1">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-[10px] md:text-sm lg:text-base break-words font-medium leading-tight px-2">
                  {item.detail}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-5xl mx-auto pb-20 px-4">
          <Contact />
        </div>
      </div>
    </main >
  );
};

export default ContactPage;

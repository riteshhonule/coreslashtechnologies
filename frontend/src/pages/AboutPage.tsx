import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import StarIcon from "@heroicons/react/24/outline/StarIcon";
import CheckBadgeIcon from "@heroicons/react/24/outline/CheckBadgeIcon";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
import RocketLaunchIcon from "@heroicons/react/24/outline/RocketLaunchIcon";
import Services from "../components/Services";
import teamCollaborationImg from "../img/process/CoreslashTechnologiestechnologiesstep4.avif";

// --- Components ---
const GlassCard = ({ children, className = "", hoverEffect = true }: { children: React.ReactNode, className?: string, hoverEffect?: boolean }) => (
  <motion.div
    whileHover={hoverEffect ? { y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.03)" } : {}}
    className={`bg-white border border-gray-200/60 rounded-3xl p-6 relative overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/10 to-transparent pointer-events-none" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

const SectionHeading = ({ badge, title, subtitle, align = "center" }: { badge?: string, title: string, subtitle?: string, align?: "center" | "left" }) => (
  <div className={`text-${align} mb-12`}>
    {badge && (
      <motion.div
        initial={{ opacity: 1, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0, margin: "200px" }}
        className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-8"
      >
        <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.2em]">{badge}</span>
      </motion.div>
    )}
    <motion.h2
      initial={{ opacity: 1, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0, margin: "200px" }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0, margin: "200px" }}
        transition={{ delay: 0.2 }}
        className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const AccordionItem = ({ title, children, isOpen, onClick }: { title: string, children: React.ReactNode, isOpen: boolean, onClick: () => void }) => (
  <div className="border border-gray-200/60 rounded-2xl mb-4 overflow-hidden bg-white transition-all hover:border-gray-300">
    <button
      onClick={onClick}
      className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-gray-50/50"
    >
      <span className="font-semibold text-lg text-gray-900">{title}</span>
      <ChevronDownIcon
        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 1 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-6 text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// --- Page Component ---

import SEO from "../components/SEO";

const AboutPage = () => {
  const [activeFAQ, setActiveFAQ] = useState(-1);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const testimonials = [
    // Testimonials can be added here
  ];

  return (
    <div className="relative min-h-screen bg-[#F9FAFB] overflow-hidden font-sans text-gray-900 pt-0">
      <SEO 
        title="About Us"
        description="Learn more about CoreSlash Technologies, our mission to build digital futures, our vision, and the core values that drive our software and AI solutions."
      />

      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-purple/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-indigo/2 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[70vh] flex items-center justify-center px-4 pt-2 md:pt-10 bg-transparent z-20">
        <motion.div
          style={{ opacity, scale }}
          className="text-center max-w-4xl mx-auto z-10"
        >
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-secondary-indigo animate-pulse" />
            <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.2em]">Established 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-gray-900"
          >
            We Build <br />
            <span className="text-gradient-purple">
              Digital Futures
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Coreslash Technologies is a premier digital agency crafting enterprise-grade software and immersive brand experiences for the modern web.
          </motion.p>

          <motion.div
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/services"
              className="btn-pill btn-primary-glow text-white px-8 py-4">
              Grow Your Business
            </Link>
            <Link to="/portfolio" className="btn-pill btn-glass text-secondary-indigo hover:text-white px-8 py-4">
              View Portfolio
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="relative z-10 py-16 px-4 container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 1, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0, margin: "200px" }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -inset-4 bg-primary-purple/5 rounded-[3rem] blur-2xl -z-10" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-md border border-gray-200/60 bg-white">
              <img
                src={teamCollaborationImg}
                alt="Team Collaboration"
                loading="lazy"
                decoding="async"
                width={1200}
                height={800}
                className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-gray-900/80 to-transparent text-white backdrop-blur-[2px]">
                <h3 className="text-2xl font-bold mb-2 text-white">Empowering Growth</h3>
                <p className="text-white/70">Delivering excellence in every line of code.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0, margin: "200px" }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <SectionHeading
              badge="Our Journey"
              title="More Than Just An Agency"
              align="left"
            />
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              Founded with a vision to bridge the gap between complex technology and human-centric design, Coreslash has grown from a small studio to a global partner for innovation. We don't just build software; we build relationships and sustainable digital ecosystems.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Our Mission",
              content: "To accelerate digital transformation through scalable, robust, and beautiful technology solutions that solve real-world problems for businesses of all sizes.",
              icon: RocketLaunchIcon,
              gradient: "bg-white",
              border: "border-gray-200/50 shadow-md",
              text: "text-secondary-indigo",
              bgIcon: "bg-secondary-indigo/10"
            },
            {
              title: "Our Vision",
              content: "To be the world's most trusted partner in digital innovation, setting new standards for quality, creativity, and technical excellence.",
              icon: EyeIcon,
              gradient: "bg-white",
              border: "border-gray-200/50 shadow-md",
              text: "text-primary-purple",
              bgIcon: "bg-primary-purple/10"
            },
            {
              title: "Our Values",
              content: "Integrity in our actions, innovation in our approach, and impact in our results. We believe in transparent partnerships and delivering value that lasts.",
              icon: HeartIcon,
              gradient: "bg-white",
              border: "border-gray-200/50 shadow-md",
              text: "text-pink-600",
              bgIcon: "bg-pink-500/10"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: "200px" }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02, translateX: 5 }}
              className={`relative overflow-hidden p-6 rounded-[2rem] border ${item.border} ${item.gradient} glass-card group transition-all duration-300 hover:border-secondary-indigo/15 h-full`}
            >
              <div className={`absolute -right-4 -bottom-4 opacity-0 group-hover:opacity-10 transition-opacity duration-500 transform rotate-12 ${item.text}`}>
                <item.icon className="w-32 h-32" />
              </div>
              <div className="relative z-10 flex gap-5 items-start">
                <div className={`p-3 rounded-2xl ${item.bgIcon} flex-shrink-0 ${item.text} border border-gray-200/40`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className={`text-xl font-bold mb-2 text-gray-900`}>{item.title}</h4>
                  <p className="text-gray-500 leading-relaxed text-sm">{item.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <Services />

      {/* Logos Strip */}
      <section className="py-12 overflow-hidden border-y border-gray-200/60 bg-transparent">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] border border-gray-200/60 px-4 py-2 w-fit mx-auto rounded-full bg-white">Trusted by industry leaders</p>
        </div>
      </section>

      {/* Certifications (New Section) */}
      <section className="relative z-10 py-16 container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-10">
          {[
            {
              name: "Google Partner",
              color: "text-secondary-indigo",
              glow: "shadow-sm"
            },
            {
              name: "Meta Business Partner",
              color: "text-primary-purple",
              glow: "shadow-sm"
            },
            {
              name: "Microsoft Partner",
              color: "text-blue-600",
              glow: "shadow-sm"
            }
          ].map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 0 }}
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: idx * 1.2,
                ease: "easeInOut"
              }}
              whileHover={{
                scale: 1.05,
                y: -5
              }}
              className="relative group cursor-pointer"
            >
              {/* Glow Background */}
              <div className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gray-100`} />

              {/* Main Card */}
              <div className={`relative px-8 py-4 rounded-full bg-white border border-gray-200/60 ${cert.glow} flex items-center gap-4 transition-all duration-500 hover:bg-gray-50/50`}>
                {/* Icon */}
                <div className={`p-2 rounded-full bg-gray-50 border border-gray-100 ${cert.color}`}>
                  <CheckBadgeIcon className="w-6 h-6" />
                </div>
                {/* Text */}
                <span className="font-bold text-gray-900 tracking-wide text-sm">
                  {cert.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials (New Section) */}
      {testimonials.length > 0 && (
        <section className="relative z-10 py-12 md:py-24 px-4 bg-transparent">
          <div className="container mx-auto relative z-10">
            <SectionHeading
              badge="Testimonials"
              title="What Our Clients Say"
              subtitle="Don't just take our word for it. Hear from the visionaries we've worked with."
            />
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {testimonials.map((testim: any, idx: number) => (
                <GlassCard key={idx} className="bg-white border border-gray-200/60 shadow-md">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} className="w-5 h-5 text-secondary-indigo fill-secondary-indigo" />)}
                  </div>
                  <p className="text-gray-600 mb-6 italic text-sm">"{testim.text}"</p>
                  <div className="flex items-center gap-4">
                    <img 
                      src={testim.img} 
                      alt={testim.name} 
                      loading="lazy"
                      decoding="async"
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100" 
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{testim.name}</h4>
                      <p className="text-xs text-gray-400">{testim.role}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section (New Section) */}
      <section className="relative z-10 py-16 container mx-auto px-4 max-w-4xl">
        <SectionHeading
          badge="FAQ"
          title="Common Questions"
        />
        <div className="mt-8 space-y-4">
          {[
            { q: "How do you handle project timelines?", a: "We work with agile methodologies, setting clear milestones and deliverables to ensure timely completion without compromising quality." },
            { q: "What industries do you specialize in?", a: "We have experience across Fintech, Healthcare, E-commerce, and SaaS, but our adaptable framework allows us to serve any industry effectively." },
            { q: "Do you provide ongoing support?", a: "Absolutely. We offer comprehensive maintenance and support packages to ensure your digital products continue to perform optimally." },
            { q: "What is your typical engagement model?", a: "We offer both project-based fixed pricing and dedicated team augmentation models, tailored to your specific needs." }
          ].map((faq, idx) => (
            <AccordionItem
              key={idx}
              title={faq.q}
              isOpen={activeFAQ === idx}
              onClick={() => setActiveFAQ(activeFAQ === idx ? -1 : idx)}
            >
              {faq.a}
            </AccordionItem>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 container mx-auto px-4 mb-8">
        <div className="relative rounded-[3rem] overflow-hidden bg-white border border-gray-200/60 shadow-xl shadow-gray-200/30 p-6 md:p-24 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/3 to-secondary-indigo/3 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary-indigo/5 rounded-full blur-3xl animate-pulse pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-purple/5 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 1, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0, margin: "200px" }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900 tracking-tight">Ready To Transform Your <span className="text-gradient-cyan">Digital</span> Presence?</h2>
              <p className="text-xl text-gray-500 mb-12">Let's build something extraordinary together. Contact us today for a free consultation.</p>
              <Link
                to="/contact"
                className="btn-pill btn-primary-glow text-white px-10 py-5 text-lg inline-block"
              >
                Start Your Project
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;

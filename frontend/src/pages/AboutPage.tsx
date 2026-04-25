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
import omPatil from "../img/review/CoreslashTechnologies-om.png";
import CoreslashTechnologiesIcon from "../img/CoreslashTechnologies_icon.webp";



// --- Components ---
const GlassCard = ({ children, className = "", hoverEffect = true }: { children: React.ReactNode, className?: string, hoverEffect?: boolean }) => (
  <motion.div
    whileHover={hoverEffect ? { y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" } : {}}
    className={`bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-lg p-6 relative overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 pointer-events-none" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

const SectionHeading = ({ badge, title, subtitle, align = "center" }: { badge?: string, title: string, subtitle?: string, align?: "center" | "left" }) => (
  <div className={`text-${align} mb-12`}>
    {badge && (
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-block px-4 py-1.5 rounded-full bg-blue-100/80 text-blue-600 text-sm font-semibold mb-4 border border-blue-200"
      >
        {badge}
      </motion.span>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// const StatCounter = ({ end, label, suffix = "+" }: { end: number, label: string, suffix?: string }) => {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });

//   useEffect(() => {
//     if (isInView) {
//       let start = 0;
//       const duration = 2000;
//       const increment = end / (duration / 16);

//       const timer = setInterval(() => {
//         start += increment;
//         if (start >= end) {
//           setCount(end);
//           clearInterval(timer);
//         } else {
//           setCount(Math.round(start));
//         }
//       }, 16);
//       return () => clearInterval(timer);
//     }
//   }, [isInView, end]);

//   return (
//     <div ref={ref} className="text-center">
//       <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
//         {count}{suffix}
//       </div>
//       <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</div>
//     </div>
//   );
// };

const AccordionItem = ({ title, children, isOpen, onClick }: { title: string, children: React.ReactNode, isOpen: boolean, onClick: () => void }) => (
  <div className="border border-gray-100 rounded-2xl mb-4 overflow-hidden bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
    <button
      onClick={onClick}
      className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-white/80"
    >
      <span className="font-semibold text-lg text-gray-800">{title}</span>
      <ChevronDownIcon
        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// --- Page Component ---

const AboutPage = () => {
  const [activeFAQ, setActiveFAQ] = useState(-1);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // const team = [
  //   // { name: "Sarah Johnson", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
  //   { name: "David Chen", role: "CTO", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
  //   { name: "Emily Davis", role: "Head of Design", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400" },
  //   { name: "Michael Wilson", role: "Marketing Director", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" },
  // ];



  const testimonials = [

    // {
    //   name: "Om Patil",
    //   role: "Owner, Om Patil Crane Service",
    //   text: "Coreslash Technologies created our crane service website and improved our Google presence. Now we receive regular client inquiries. Best IT solutions company in Belagavi.",
    //   img: omPatil
    // },

    // {
    //   name: "Abhishek Patil",
    //   role: "Tax Consultant, Abhishek Patil Tax Consultant",
    //   text: "They built a professional website for my tax consultancy and helped increase my online visibility. I am getting more client calls than ever before.",
    //   img: CoreslashTechnologiesIcon
    // },

    // {
    //   name: "Yash Kangralkar",
    //   role: "Owner, Kangralkar Mess",
    //   text: "Coreslash Technologies helped promote our mess business online. Our reach increased and more students contact us daily. Highly recommended digital marketing company.",
    //   img: CoreslashTechnologiesIcon
    // },

  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden font-sans text-gray-800">

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-100/40 to-blue-100/40 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-4 pt-10 border-t border-white/10 bg-slate-900 z-10 mt-[80px] md:mt-[88px]">
        <motion.div
          style={{ opacity, scale }}
          className="text-center max-w-4xl mx-auto z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-600">Established 2020</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white md:text-white"
          >
            We Build <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
              Digital Futures
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Coreslash Technologies is a premier digital agency crafting enterprise-grade software and immersive brand experiences for the modern web.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/services"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300">
              Grow Your Business
            </Link>
            <Link to="/portfolio" className="px-8 py-4 rounded-full bg-white text-gray-700 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-100">
              View Portfolio
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 rounded-[3rem] blur-2xl -z-10" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/50 bg-white">
              <img
                src={teamCollaborationImg}
                alt="Team Collaboration"
                className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-gray-900/90 to-transparent text-white backdrop-blur-[2px]">
                <h3 className="text-2xl font-bold mb-2">Empowering Growth</h3>
                <p className="text-white/80">Delivering excellence in every line of code.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <SectionHeading
              badge="Our Journey"
              title="More Than Just An Agency"
              align="left"
            />
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
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
              gradient: "from-blue-500/10 to-cyan-500/10",
              border: "border-blue-200/60",
              text: "text-blue-600",
              bgIcon: "text-blue-100"
            },
            {
              title: "Our Vision",
              content: "To be the world's most trusted partner in digital innovation, setting new standards for quality, creativity, and technical excellence.",
              icon: EyeIcon,
              gradient: "from-purple-500/10 to-pink-500/10",
              border: "border-purple-200/60",
              text: "text-purple-600",
              bgIcon: "text-purple-100"
            },
            {
              title: "Our Values",
              content: "Integrity in our actions, innovation in our approach, and impact in our results. We believe in transparent partnerships and delivering value that lasts.",
              icon: HeartIcon,
              gradient: "from-amber-500/10 to-orange-500/10",
              border: "border-amber-200/60",
              text: "text-amber-600",
              bgIcon: "text-amber-100"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, translateX: 5 }}
              className={`relative overflow-hidden p-6 rounded-2xl border ${item.border} bg-gradient-to-br ${item.gradient} backdrop-blur-sm group transition-all duration-300 shadow-sm hover:shadow-md h-full`}
            >
              <div className={`absolute -right-4 -bottom-4 opacity-0 group-hover:opacity-10 transition-opacity duration-500 transform rotate-12`}>
                <item.icon className="w-32 h-32" />
              </div>
              <div className="relative z-10 flex gap-5 items-start">
                <div className={`p-3 rounded-xl bg-white shadow-sm flex-shrink-0 ${item.text}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className={`text-xl font-bold mb-2 ${item.text}`}>{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">{item.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <Services />

      {/* Logos Strip */}
      <section className="py-6 overflow-hidden bg-white/60 border-y border-white/50">
        <div className="container mx-auto px-4 mb-2 text-center">
          <p className="text-lg font-semibold text-gray-500 uppercase tracking-widest border border-black-200 p-2 w-fit mx-auto rounded-full">Trusted by industry leaders</p>
        </div>
        {/* <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex gap-16 px-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex items-center justify-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">
                Placeholder for logos - using text for now or simple shapes
                <span className="text-2xl font-bold text-gray-400">CLIENT {i}</span>
              </div>
            ))}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={`dup-${i}`} className="flex items-center justify-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">
                <span className="text-2xl font-bold text-gray-400">CLIENT {i}</span>
              </div>
            ))}
          </div>
        </div> */}
      </section>

      {/* Certifications (New Section) */}
      <section className="py-8 container mx-auto px-4">

        <div className="flex flex-wrap justify-center gap-10">

          {[
            {
              name: "Google Partner",
              color: "from-blue-500 via-cyan-400 to-blue-600",
              glow: "shadow-blue-500/30"
            },
            {
              name: "Meta Business Partner",
              color: "from-indigo-500 via-purple-500 to-pink-500",
              glow: "shadow-purple-500/30"
            },
            {
              name: "Microsoft Silver Partner",
              color: "from-sky-500 via-blue-500 to-indigo-600",
              glow: "shadow-indigo-500/30"
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
                scale: 1.07,
                y: -5
              }}

              className="relative group cursor-pointer"
            >


              {/* Glow Background */}

              <div className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r ${cert.color}`} />



              {/* Main Card */}

              <div className={`relative px-10 py-5 rounded-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl ${cert.glow} flex items-center gap-4 transition-all duration-500`}>



                {/* Icon */}

                <div className={`p-2 rounded-full bg-gradient-to-r ${cert.color} shadow-md`}>

                  <CheckBadgeIcon className="w-6 h-6 text-white" />

                </div>



                {/* Text */}

                <span className="font-semibold text-gray-800 tracking-wide">

                  {cert.name}

                </span>


              </div>


            </motion.div>

          ))}

        </div>

      </section>

      {/* Stats Section
      <section className="py-20 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2.5rem] bg-gradient-to-r from-blue-900 to-indigo-900 p-12 md:p-16 text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mixed-blend-overlay" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-2">Our Impact</h3>
              <p className="text-blue-200">By the numbers</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <StatCounter end={5} label="Years Experience" />
              <StatCounter end={150} label="Projects Delivered" />
              <StatCounter end={98} label="Client Satisfaction" suffix="%" />
              <StatCounter end={10} label="Revenue Impact" suffix="M+" />
            </div>
          </div>
        </motion.div>
      </section> */}

      {/* Team Section */}
      {/* <section className="py-24 bg-gray-50/50">

        <div className="container mx-auto px-4 text-center">

          <SectionHeading
            badge="The Team"
            title="Meet The Minds"
            subtitle="A diverse group of thinkers, makers, and doers passionate about technology."
          />



          <div className="flex flex-wrap justify-center gap-8 mt-16 max-w-6xl mx-auto">

            {team.map((member, idx) => (

              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group w-[260px]"
              >

                <div className="h-80 overflow-hidden">

                  <img
                    src={member.img}
                    className="w-full h-full object-cover"
                  />

                </div>


                <div className="p-6 text-center">

                  <h3 className="text-xl font-bold">

                    {member.name}

                  </h3>

                  <p className="text-blue-600">

                    {member.role}

                  </p>

                </div>


              </motion.div>

            ))}

          </div>

        </div>

      </section> */}


      {/* Testimonials (New Section) */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-blue-50/50">
        <div className="container mx-auto">
          <SectionHeading
            badge="Testimonials"
            title="What Our Clients Say"
            subtitle="Don't just take our word for it. Hear from the visionaries we've worked with."
          />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testim, idx) => (
              <GlassCard key={idx} className="bg-white/60">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testim.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={testim.img} alt={testim.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{testim.name}</h4>
                    <p className="text-xs text-gray-500">{testim.role}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section (New Section) */}
      <section className="py-16 container mx-auto px-4 max-w-4xl">
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
      <section className="py-16 container mx-auto px-4 mb-8">
        <div className="relative rounded-[3rem] overflow-hidden bg-gray-900 text-white p-12 md:p-24 text-center shadow-2xl">
          {/* ... existing decorations ... */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-purple-600/40" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready To Transform Your Digital Presence?</h2>
              <p className="text-xl text-gray-200 mb-12">Let's build something extraordinary together. Contact us today for a free consultation.</p>
              <Link
                to="/contact"
                className="px-10 py-5 rounded-full bg-white text-gray-900 font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 duration-300"
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


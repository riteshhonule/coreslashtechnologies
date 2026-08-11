import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code2, CheckCircle2 } from "lucide-react";
import EngagementModels from "@/components/web-development/EngagementModels";
import ProcessTimeline from "@/components/web-development/ProcessTimeline";
import FaqSection, { type FaqData } from "@/components/ui/habit-faq-scroller";
import PhoneMockupBasic from "@/components/ui/phone-mockups-1";
import { CoreServiceCard } from "@/components/web-development/CoreServices";
import {
  SiSwift, SiKotlin, SiFlutter, SiReact, SiApple,
  SiAndroid, SiFirebase, SiTypescript, SiGraphql, SiTailwindcss
} from "react-icons/si";

// ----------------------------------------------------
// SCHEMA
// ----------------------------------------------------
const appDevSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Mobile App Development Services",
  "url": "https://coreslashtechnologies.com/services/app-development",
  "provider": {
    "@type": "Organization",
    "name": "CoreSlash Technologies",
    "url": "https://coreslashtechnologies.com/",
    "logo": "https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png"
  },
  "serviceType": "Mobile App Development",
  "description": "Custom native iOS, Android, and cross-platform Flutter/React Native mobile application development with scalable cloud APIs and intuitive user interfaces.",
  "areaServed": "Worldwide"
};

// ----------------------------------------------------
// ----------------------------------------------------
// TECH STACK DATA
// ----------------------------------------------------
const NATIVE_TECHS = [
  { name: "SWIFT (iOS)", icon: <SiSwift className="w-6 h-6" />, color: "#FA7343" },
  { name: "KOTLIN", icon: <SiKotlin className="w-6 h-6" />, color: "#7F52FF" },
  { name: "APPLE iOS", icon: <SiApple className="w-6 h-6" />, color: "#000000" },
  { name: "ANDROID", icon: <SiAndroid className="w-6 h-6" />, color: "#3DDC84" },
  { name: "OBJECTIVE-C", icon: <Code2 className="w-6 h-6" />, color: "#FF7A00" }
];

const CROSS_TECHS = [
  { name: "FLUTTER", icon: <SiFlutter className="w-6 h-6" />, color: "#02569B" },
  { name: "REACT NATIVE", icon: <SiReact className="w-6 h-6" />, color: "#61DAFB" },
  { name: "TYPESCRIPT", icon: <SiTypescript className="w-6 h-6" />, color: "#3178C6" },
  { name: "TAILWIND", icon: <SiTailwindcss className="w-6 h-6" />, color: "#38BDF8" }
];

const BACKEND_TECHS = [
  { name: "FIREBASE", icon: <SiFirebase className="w-6 h-6" />, color: "#FFCA28" },
  { name: "GRAPHQL", icon: <SiGraphql className="w-6 h-6" />, color: "#E10098" },
  { name: "REST API", icon: <Code2 className="w-6 h-6" />, color: "#3178C6" }
];

// ----------------------------------------------------
// CASE STUDIES DATA
// ----------------------------------------------------
const CASE_STUDIES = [
  {
    title: "HealthPulse – Telemedicine & Patient Portal",
    subtext: "HIPAA-compliant native iOS & Android app providing video consultations, prescription tracking, and biometric login.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop&q=80",
    link: "/portfolio"
  },
  {
    title: "FlexiCart – On-Demand Delivery & Shopping App",
    subtext: "Cross-platform Flutter application with real-time GPS courier tracking, push notifications, and instant payment checkout.",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&auto=format&fit=crop&q=80",
    link: "/portfolio"
  },
  {
    title: "FinTrack – Smart Expense Tracker & Wallet",
    subtext: "React Native mobile banking application featuring real-time transaction analytics, budget caps, and multi-currency exchange.",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&auto=format&fit=crop&q=80",
    link: "/portfolio"
  }
];

// ----------------------------------------------------
// FAQS DATA
// ----------------------------------------------------
const appDevFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Everything you need to know about native iOS, Android, and cross-platform mobile app development.",
  rows: [
    {
      id: "row1",
      speed: "50s",
      direction: "left",
      faqItems: [
        { id: "q1", question: "Do you build native iOS and Android apps?", answer: "Yes! CoreSlash builds native apps using Swift for iOS and Kotlin for Android, as well as cross-platform Flutter and React Native apps." },
        { id: "q2", question: "Should I choose Native or Cross-Platform?", answer: "Cross-platform (Flutter/React Native) is ideal for faster time-to-market and shared codebase. Native is best for deep hardware access and heavy graphics." }
      ]
    },
    {
      id: "row2",
      speed: "45s",
      direction: "right",
      faqItems: [
        { id: "q3", question: "How do you handle App Store and Google Play deployment?", answer: "CoreSlash manages the entire submission process, app guidelines compliance, metadata optimization, and app store approvals." },
        { id: "q4", question: "Can you integrate push notifications & biometric login?", answer: "Yes, CoreSlash integrates Firebase push notifications, Apple FaceID/TouchID, Google Biometrics, and OAuth social logins." }
      ]
    }
  ]
};

export default function AppDevelopment() {
  const [activeTechTab, setActiveTechTab] = useState<"NATIVE MOBILE" | "CROSS-PLATFORM" | "BACKEND & CLOUD">("NATIVE MOBILE");

  const getTechsForTab = () => {
    switch (activeTechTab) {
      case "NATIVE MOBILE":
        return NATIVE_TECHS;
      case "CROSS-PLATFORM":
        return CROSS_TECHS;
      case "BACKEND & CLOUD":
        return BACKEND_TECHS;
    }
  };

  return (
    <>
      <Helmet>
        <title>Mobile App Development Services | CoreSlash Technologies</title>
        <meta name="description" content="Build high-performance native iOS, Android, and cross-platform Flutter/React Native mobile applications with CoreSlash Technologies." />
        <link rel="canonical" href="https://coreslashtechnologies.com/services/app-development" />
        <script type="application/ld+json">{JSON.stringify(appDevSchema)}</script>
      </Helmet>

      {/* 1. HERO SECTION */}
      <section
        className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-start overflow-hidden py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-slate-950"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dual Vignette Overlay: Blends both left and right edges seamlessly into deep dark slate-950 */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-l from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent)] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto w-full relative z-10 text-left space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-zinc-300 select-none">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <span>&gt;</span>
            <Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link>
            <span>&gt;</span>
            <span className="text-[#3b82f6] font-bold">App Development</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15] max-w-4xl">
            Engineering Next-Gen{" "}
            <span className="text-[#3b82f6]">
              Mobile Applications
            </span>{" "}
            for iOS & Android
          </h1>

          <p className="text-zinc-300 text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl font-medium">
            CoreSlash builds scalable, high-performance native iOS, Android, and cross-platform Flutter/React Native mobile applications with seamless cloud backends and intuitive user interfaces.
          </p>

          {/* CTA Buttons & Feature Badges Row */}
          <div className="pt-2 space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all text-center"
              >
                <span>Start Mobile Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition-all text-center"
              >
                <span>View Mobile Apps</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-300 pt-3 border-t border-slate-800/80 max-w-3xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>iOS & Android Native</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Flutter & React Native</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Offline Sync & Push Notifications</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE SERVICES */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden bg-background">
        <div className="flex flex-col items-start gap-4 mb-16">
          <div className="flex items-center">
            <div className="w-[3px] h-6 bg-[#3b82f6] rounded-full mr-3" />
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-muted-foreground">
              Core Services – App Development
            </h3>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">End-to-End Mobile App Development</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CoreServiceCard
            number="01"
            title="Native iOS & Android Development"
            subtext="Build ultra-fast, robust native applications using Swift and Kotlin to harness hardware sensors, camera APIs, and offline performance."
            highlight="Engineered with Swift & Kotlin for low-latency performance and full hardware access."
            darkBg={true}
            delay={0.1}
          />
          <CoreServiceCard
            number="02"
            title="Cross-Platform (Flutter & React Native)"
            subtext="Deploy high-quality iOS and Android mobile apps simultaneously from a unified codebase, reducing time-to-market and maintenance overhead."
            highlight="Unified codebase deployment cutting time-to-market while keeping 60fps native feel."
            delay={0.2}
          />
          <CoreServiceCard
            number="03"
            title="Mobile UI/UX Design & Prototyping"
            subtext="Engineer fluid micro-interactions, dark mode themes, and user journeys adhering to Apple Human Interface and Google Material 3 guidelines."
            highlight="Pixel-perfect implementations aligned with iOS HIG and Google Material 3 design systems."
            delay={0.3}
          />
          <CoreServiceCard
            number="04"
            title="Mobile Backend & Cloud APIs"
            subtext="Architect real-time RESTful/GraphQL backend APIs, Firebase push notification pipelines, OAuth authentication, and AWS cloud databases."
            highlight="Built for real-time data sync, high concurrency, and long-term enterprise maintainability."
            blueBg={true}
            delay={0.4}
          />
        </div>
      </section>

      {/* 2.5 INTERACTIVE PHONE MOCKUP SHOWCASE */}
      <section className="w-full py-4 sm:py-6 md:py-8 px-4 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden bg-background flex items-center justify-center min-h-[calc(100vh-100px)]">
        <PhoneMockupBasic />
      </section>

      {/* 3. PROCESS TIMELINE */}
      <ProcessTimeline />

      {/* 4. ENGAGEMENT MODELS */}
      <EngagementModels />

      {/* 5. TECH STACK (Animated Framer Motion Sliding Tabs) */}
      <section className="relative w-full py-24 border-t border-border/40 overflow-hidden bg-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 w-full text-left">
          <div className="text-center max-w-[900px] mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2 mb-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/20">
              <span>Modern Technology Stack</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight text-center">
              Technologies{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                We Use
              </span>
            </h2>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-4xl mx-auto font-normal text-center">
              CoreSlash leverages enterprise mobile frameworks and cloud backends ensuring fluid 60fps animations, rock-solid security, and future-ready scalability.
            </p>
          </div>

          {/* Animated Tabs Header */}
          <div className="flex items-center justify-center gap-8 md:gap-16 border-b border-border/40 mb-12 py-3">
            {(["NATIVE MOBILE", "CROSS-PLATFORM", "BACKEND & CLOUD"] as const).map((tab) => {
              const isActive = activeTechTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTechTab(tab)}
                  className="relative py-2 text-sm md:text-base lg:text-lg font-extrabold tracking-wider transition-colors duration-300 focus:outline-none uppercase"
                  style={{ color: isActive ? "#3b82f6" : "var(--muted-foreground, #71717a)" }}
                >
                  {tab}
                  {isActive && (
                    <motion.div
                      layoutId="activeAppTabUnderline"
                      className="absolute bottom-0 inset-x-0 h-[3px] bg-[#3b82f6] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Dynamic Grid Layout */}
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            <AnimatePresence mode="popLayout">
              {getTechsForTab().map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, delay: idx * 0.02 }}
                  whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(59,130,246,0.06)", borderColor: "rgba(59,130,246,0.2)" }}
                  className="flex items-center gap-4 p-4 md:p-5 bg-white dark:bg-slate-900 border border-border/60 rounded-2xl shadow-sm transition-all select-none"
                >
                  <div className="text-2xl md:text-3xl" style={{ color: tech.color }}>{tech.icon}</div>
                  <span className="text-sm md:text-base font-medium text-foreground/90 uppercase truncate">{tech.name}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 7. CASE STUDIES (PORTFOLIO SHOWCASE) */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden bg-background">
        {/* Centered Middle Heading Block for Case Studies */}
        <div className="text-center max-w-[900px] mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 mb-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/25">
            <span>Case Studies</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-4 leading-tight text-center">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Case Studies
            </span>
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal text-center mb-6">
            Real-world mobile apps and cross-platform software systems engineered by our development teams.
          </p>

          <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors uppercase tracking-wider group">
            <span>VIEW ALL CASE STUDIES</span> <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group flex flex-col justify-between rounded-[2rem] bg-white dark:bg-slate-900 border border-border/80 shadow-sm hover:shadow-lg transition-all p-6"
            >
              <div className="relative w-full h-56 bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center mb-6 border border-border/40">
                <div className="absolute bottom-2 left-[15%] w-24 h-24 bg-slate-200 dark:bg-slate-800 rounded-md rotate-[12deg]" />
                <div className="absolute bottom-5 right-[15%] w-28 h-20 bg-slate-300 dark:bg-slate-700 rounded-md rotate-[-8deg]" />
                <div className="relative w-[106px] h-[200px] rounded-[22px] border-[5px] border-slate-950 bg-slate-950 shadow-2xl overflow-hidden z-10 group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-2 rounded-full bg-slate-950 z-20" />
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover select-none" />
                </div>
              </div>

              <div className="text-left space-y-3 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="text-lg md:text-xl font-extrabold text-foreground group-hover:text-[#3b82f6] transition-colors">{item.title}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mt-2 line-clamp-3">{item.subtext}</p>
                </div>
                <div className="flex justify-end pt-4 mt-auto">
                  <Link to={item.link} className="text-xs md:text-sm font-extrabold text-[#3b82f6] flex items-center gap-1 group/btn uppercase tracking-wider">
                    View Case Study <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. FAQS */}
      <section className="w-full py-16 md:py-24 border-t border-border/40 overflow-hidden bg-background">
        <FaqSection data={appDevFaqData} />
      </section>

      {/* 9. CTA */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="rounded-[3rem] bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-10 md:p-16 text-center text-white relative overflow-hidden"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to Build Your Custom Mobile Application?</h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-8">Consult with our mobile app engineers to architect your iOS and Android app.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#3b82f6] text-white font-extrabold hover:bg-blue-600 transition-all shadow-lg">
            <span>Schedule Discovery Call</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { 
  Cookie, FileText, ArrowRight, CheckCircle2, 
  Mail, Phone, ExternalLink, ShieldCheck, Eye, Layers, Settings, Sparkles
} from "lucide-react";

export default function CookiePolicyPage() {
  const [activeSection, setActiveSection] = useState<string>("sec-1");

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const sectionElements = sections.map(sec => document.getElementById(sec.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    { id: "sec-1", number: "01", title: "What Are Cookies?", icon: Cookie, tag: "Cookie Definition" },
    { id: "sec-2", number: "02", title: "How We Use Cookies", icon: Eye, tag: "Usage Purposes" },
    { id: "sec-3", number: "03", title: "Cookie Categories", icon: Layers, tag: "Essential & Analytics" },
    { id: "sec-4", number: "04", title: "Third-Party Trackers", icon: ShieldCheck, tag: "Google & Meta" },
    { id: "sec-5", number: "05", title: "Managing Preferences", icon: Settings, tag: "Browser Controls" },
    { id: "sec-6", number: "06", title: "Updates & Support", icon: Phone, tag: "DPO Inquiries" },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground overflow-hidden">
      <Helmet>
        <title>Cookie Policy | CoreSlash Technologies</title>
        <meta
          name="description"
          content="Learn about the Cookie Policy at CoreSlash Technologies. Discover how we deploy essential, analytics, and functional tracking cookies to enhance user experience."
        />
        <link rel="canonical" href="https://coreslashtechnologies.com/cookie-policy" />
      </Helmet>

      {/* 1. HERO BANNER */}
      <section className="relative w-full pt-16 md:pt-24 pb-16 px-6 sm:px-10 md:px-16 lg:px-24 max-w-[1700px] mx-auto overflow-hidden">
        {/* Background Radial Glow */}
        <div className="absolute top-10 right-1/3 w-96 h-96 bg-gradient-to-tr from-blue-600/20 via-sky-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950 text-white dark:bg-white/10 dark:text-white border border-slate-800 dark:border-white/20 text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-xl backdrop-blur-xl"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <Cookie className="w-4 h-4 text-blue-400" />
            <span>Tracking & Transparency Policy</span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1]"
          >
            Cookie <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400">Policy</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base sm:text-lg max-w-2xl font-medium leading-relaxed"
          >
            Discover how CoreSlash Technologies deploys essential, analytics, and functional tracking cookies to safeguard user experience and guarantee high performance.
          </motion.p>

          {/* Meta Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4"
          >
            <div className="p-3.5 rounded-2xl bg-card border border-border/60 shadow-sm text-center">
              <span className="text-xs text-muted-foreground font-bold uppercase block">Last Updated</span>
              <span className="text-xs sm:text-sm font-black text-foreground">June 23, 2026</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-card border border-border/60 shadow-sm text-center">
              <span className="text-xs text-muted-foreground font-bold uppercase block">Control</span>
              <span className="text-xs sm:text-sm font-black text-blue-600">100% User Managed</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-card border border-border/60 shadow-sm text-center">
              <span className="text-xs text-muted-foreground font-bold uppercase block">3rd Party Trackers</span>
              <span className="text-xs sm:text-sm font-black text-foreground">Google & Meta</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-card border border-border/60 shadow-sm text-center">
              <span className="text-xs text-muted-foreground font-bold uppercase block">Sections</span>
              <span className="text-xs sm:text-sm font-black text-foreground">06 Detailed</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. MAIN CONTENT GRID */}
      <section className="w-full max-w-[1700px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Quick Index Sidebar (Desktop Sticky Glass Card) */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-28 space-y-4 p-6 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-200">
                  Cookie Index
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                6 Topics
              </span>
            </div>

            <nav className="space-y-2 pt-2">
              {sections.map((sec) => {
                const IconComponent = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-between group ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <span className={`text-xs font-black px-2 py-0.5 rounded-md ${isActive ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"}`}>
                        {sec.number}
                      </span>
                      <span className="truncate">{sec.title}</span>
                    </div>
                    <IconComponent className={`w-4 h-4 flex-shrink-0 transition-transform ${isActive ? "text-white" : "text-slate-600 group-hover:text-blue-400"}`} />
                  </button>
                );
              })}
            </nav>

            <div className="pt-6 border-t border-slate-800 mt-6 space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/10 border border-blue-500/30 space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-extrabold text-xs uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Privacy Inquiries</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Reach out to learn how we protect your personal browsing preferences.
                </p>
                <a 
                  href="mailto:contact@coreslashtechnologies.com" 
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>Contact DPO Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Content Column */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-10">
            
            {/* Section 1 */}
            <motion.div
              id="sec-1"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="scroll-mt-32 p-8 sm:p-12 rounded-[2.5rem] bg-card border border-border/80 shadow-xl hover:shadow-2xl transition-all duration-300 space-y-6 relative overflow-hidden group"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-blue-500/30">
                    01
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">What Are Cookies?</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Cookie Definition & Tokens</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-extrabold uppercase border border-blue-500/20">
                  Definition
                </span>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg">
                <p>
                  Cookies are small text files containing details of your browser settings that are stored on your computer or mobile terminal when you visit a webpage.
                </p>
                <p>
                  They act as a memory token for websites. They allow our server to identify your system configuration, remember preferences, and ensure page interactions function correctly. We also use web beacons, tracking pixels, and local storage elements which function similarly.
                </p>
              </div>
            </motion.div>

            {/* Section 2 */}
            <motion.div
              id="sec-2"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="scroll-mt-32 p-8 sm:p-12 rounded-[2.5rem] bg-card border border-border/80 shadow-xl hover:shadow-2xl transition-all duration-300 space-y-6 relative overflow-hidden group"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-blue-500/30">
                    02
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">How We Use Cookies</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Usage Purposes</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-extrabold uppercase border border-blue-500/20">
                  Purposes
                </span>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg">
                <p>
                  We deploy cookies to improve your navigation experience, monitor site usage speed, and customize promotional campaigns.
                </p>
                <p>
                  Cookies can be either "first-party" cookies (which are set directly by Coreslash Technologies) or "third-party" cookies (which are set by external companies providing analytics, payment platforms, or support modules). They are also split between "session" cookies (deleted automatically when you close your web browser) and "persistent" cookies (remain stored until they expire or are manually cleared).
                </p>
              </div>
            </motion.div>

            {/* Section 3 */}
            <motion.div
              id="sec-3"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="scroll-mt-32 p-8 sm:p-12 rounded-[2.5rem] bg-card border border-border/80 shadow-xl hover:shadow-2xl transition-all duration-300 space-y-6 relative overflow-hidden group"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-blue-500/30">
                    03
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">Cookie Categories We Collect</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Categorization</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-extrabold uppercase border border-blue-500/20">
                  Categories
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                We classify the cookies we run into the following four categories:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3 shadow-lg">
                  <span className="text-xs font-black px-2.5 py-1 rounded-md bg-blue-600 text-white uppercase">Essential</span>
                  <h3 className="text-base font-black text-white">Essential Session Cookies</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Critical to run fundamental features like validating user sessions and lead form spam protection. Cannot be deactivated.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3 shadow-lg">
                  <span className="text-xs font-black px-2.5 py-1 rounded-md bg-indigo-600 text-white uppercase">Analytics</span>
                  <h3 className="text-base font-black text-white">Performance & Speed</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Collect aggregated data on visitor count, speed bottlenecks, and page engagement patterns to optimize UI accessibility.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3 shadow-lg">
                  <span className="text-xs font-black px-2.5 py-1 rounded-md bg-sky-600 text-white uppercase">Functional</span>
                  <h3 className="text-base font-black text-white">Personalization</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Provide enhanced personalization, such as saving form inputs so you don't lose typed text on page refresh.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3 shadow-lg">
                  <span className="text-xs font-black px-2.5 py-1 rounded-md bg-purple-600 text-white uppercase">Targeting</span>
                  <h3 className="text-base font-black text-white">Marketing Campaigns</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Build a profile of digital interests to display relevant project updates and campaigns on partner networks.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Section 4 */}
            <motion.div
              id="sec-4"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="scroll-mt-32 p-8 sm:p-12 rounded-[2.5rem] bg-card border border-border/80 shadow-xl hover:shadow-2xl transition-all duration-300 space-y-6 relative overflow-hidden group"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-blue-500/30">
                    04
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">Third-Party Tracker Disclosures</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Vendor Integrations</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-extrabold uppercase border border-blue-500/20">
                  Trackers
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                We deploy specialized third-party software systems to handle analytics and transactional records. These vendors write cookies to your terminal:
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-5 rounded-2xl bg-accent/40 border border-border/60 flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base font-extrabold text-foreground">Google Analytics</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1">
                      Compiles insights on visitor counts, geography, and general page flows anonymously. You can opt out using Google's opt-out browser add-on.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-accent/40 border border-border/60 flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base font-extrabold text-foreground">LinkedIn & Meta Tags</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1">
                      Measures campaign conversion ROI to display tailored project promotions to users who have previously visited our site.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-accent/40 border border-border/60 flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base font-extrabold text-foreground">Stripe & Payment Gateways</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1">
                      Deploys security cookies to prevent fraudulent actions and secure contract transactions.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Section 5 */}
            <motion.div
              id="sec-5"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="scroll-mt-32 p-8 sm:p-12 rounded-[2.5rem] bg-card border border-border/80 shadow-xl hover:shadow-2xl transition-all duration-300 space-y-6 relative overflow-hidden group"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-blue-500/30">
                    05
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">Managing Cookie Preferences</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Browser Configuration</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-extrabold uppercase border border-blue-500/20">
                  Controls
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                You have complete control over how cookies are managed on your device. Most web browsers allow you to modify settings to block new cookies, delete existing cookies, or alert you when cookies are sent.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {[
                  { name: "Google Chrome", url: "https://support.google.com/chrome/answer/95647" },
                  { name: "Apple Safari", url: "https://support.google.com/guide/safari/manage-cookies-sfri11471" },
                  { name: "Mozilla Firefox", url: "https://support.google.com/kb/enhanced-tracking-protection-firefox-desktop" },
                  { name: "Microsoft Edge", url: "https://support.microsoft.com/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9a73-d065-ca94-01b2c3902639" },
                ].map((b, i) => (
                  <a 
                    key={i} 
                    href={b.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-4 rounded-2xl bg-slate-950 text-white border border-slate-800 text-center hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg group flex flex-col items-center justify-center gap-1.5"
                  >
                    <span className="text-xs sm:text-sm font-extrabold text-white group-hover:text-blue-400 transition-colors">{b.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Section 6 */}
            <motion.div
              id="sec-6"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="scroll-mt-32 p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-transparent border border-blue-500/30 shadow-2xl space-y-6 relative overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-blue-500/40">
                    06
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">Updates & Inquiries</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Policy Amendments</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500 text-white text-xs font-extrabold uppercase shadow-md">
                  Support
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                We may update this Cookie Policy from time to time to reflect changes in our technology systems or legal obligations. If you have any questions or require support managing your tracking preferences, feel free to contact us:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <a 
                  href="mailto:contact@coreslashtechnologies.com" 
                  className="p-5 rounded-2xl bg-card border border-border/80 hover:border-blue-500/60 flex items-center gap-4 transition-all duration-300 hover:shadow-xl group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground font-bold block">Official Email</span>
                    <span className="text-sm font-extrabold text-foreground group-hover:text-blue-600 transition-colors">contact@coreslashtechnologies.com</span>
                  </div>
                </a>

                <a 
                  href="https://wa.me/918310711652" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-5 rounded-2xl bg-card border border-border/80 hover:border-blue-500/60 flex items-center gap-4 transition-all duration-300 hover:shadow-xl group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground font-bold block">Call / WhatsApp</span>
                    <span className="text-sm font-extrabold text-foreground group-hover:text-blue-600 transition-colors">+91 83107 11652</span>
                  </div>
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}

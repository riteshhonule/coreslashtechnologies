import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ShieldCheck, FileText, ArrowRight, CheckCircle2, 
  Mail, Phone, Lock, Eye, Database, Server, UserCheck, Sparkles
} from "lucide-react";

export default function PrivacyPolicyPage() {
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
    { id: "sec-1", number: "01", title: "Introduction", icon: ShieldCheck, tag: "Scope & Consent" },
    { id: "sec-2", number: "02", title: "Information We Collect", icon: Database, tag: "Data Types" },
    { id: "sec-3", number: "03", title: "How We Use Information", icon: Eye, tag: "Processing Purpose" },
    { id: "sec-4", number: "04", title: "Data Protection & Security", icon: Lock, tag: "Encryption Standard" },
    { id: "sec-5", number: "05", title: "Sharing & Disclosure", icon: Server, tag: "Third-Party Limits" },
    { id: "sec-6", number: "06", title: "Cookies & Analytics", icon: FileText, tag: "Tracking Control" },
    { id: "sec-7", number: "07", title: "Your Rights & Controls", icon: UserCheck, tag: "GDPR & CCPA" },
    { id: "sec-8", number: "08", title: "Contact Information", icon: Phone, tag: "DPO Assistance" },
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
        <title>Privacy Policy | CoreSlash Technologies</title>
        <meta
          name="description"
          content="Read the Privacy Policy for CoreSlash Technologies. Learn how we collect, protect, and use your personal information."
        />
        <link rel="canonical" href="https://www.coreslashtechnologies.com/privacy-policy" />
      </Helmet>

      {/* 1. HERO BANNER */}
      <section className="relative w-full pt-16 md:pt-24 pb-16 px-6 sm:px-10 md:px-16 lg:px-24 max-w-[1700px] mx-auto overflow-hidden">
        {/* Glowing Background Radial Accents */}
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-gradient-to-tr from-blue-600/20 via-indigo-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white dark:bg-white/10 dark:text-white border border-slate-800 dark:border-white/20 text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-xl backdrop-blur-xl"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Legal Compliance & Data Safety</span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1]"
          >
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400">Policy</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base sm:text-lg max-w-2xl font-medium leading-relaxed"
          >
            We are committed to total transparency. Learn how CoreSlash Technologies safeguards your personal data, handles project inquiries, and enforces strict security.
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
              <span className="text-xs text-muted-foreground font-bold uppercase block">Compliance</span>
              <span className="text-xs sm:text-sm font-black text-blue-600">GDPR & CCPA</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-card border border-border/60 shadow-sm text-center">
              <span className="text-xs text-muted-foreground font-bold uppercase block">Encryption</span>
              <span className="text-xs sm:text-sm font-black text-foreground">TLS 1.3 / SSL</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-card border border-border/60 shadow-sm text-center">
              <span className="text-xs text-muted-foreground font-bold uppercase block">Sections</span>
              <span className="text-xs sm:text-sm font-black text-foreground">08 Detailed</span>
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
                  Navigation Index
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                8 Sections
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
                  <span>DPO Assistance</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Have questions about how your data is handled? Contact our dedicated Data Protection Officer.
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
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">Introduction</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Scope & User Consent</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-extrabold uppercase border border-blue-500/20">
                  Overview
                </span>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg">
                <p>
                  Welcome to <strong className="text-foreground">CoreSlash Technologies</strong>. We operate the digital website located at <a href="https://coreslashtechnologies.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">coreslashtechnologies.com</a> and deliver enterprise digital transformation products, custom software platforms, artificial intelligence, IoT, and digital marketing services.
                </p>
                <p>
                  Your privacy is of paramount importance to us. This Privacy Policy describes how we collect, store, share, use, and process your personal information when you use our website, send inquiries through our lead generation systems, or execute custom software projects with us.
                </p>
              </div>

              {/* Callout Box */}
              <div className="p-5 rounded-2xl bg-blue-500/5 border-l-4 border-blue-600 border-border/60 text-sm font-semibold text-foreground leading-relaxed">
                By accessing or using our Services, you consent to the collection, use, transfer, and storage of your information in accordance with this Privacy Policy. If you do not agree with these policies, please discontinue your access to our services.
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
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">Information We Collect</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Data Types & Acquisition</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-extrabold uppercase border border-blue-500/20">
                  Data Inputs
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                We collect personal and technical information to optimize your experience, process contract applications, and respond to your digital project requests efficiently.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3 shadow-lg">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-black text-white">Direct Form Inquiries</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Full Name, Business Email, Phone Number, Company Details, Budget Specifications, and custom project descriptions.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3 shadow-lg">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-black text-white">Usage & Analytics</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    IP Address, browser properties, operating system configuration, referral sources, visit duration, and click patterns.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3 shadow-lg">
                  <div className="w-10 h-10 rounded-xl bg-sky-600/20 text-sky-400 flex items-center justify-center font-bold">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-black text-white">Billing Information</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Client contract payment records. Credit card data is processed directly via PCI-DSS compliant third-party gateways.
                  </p>
                </div>
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
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">How We Use Information</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Business Purposes</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-extrabold uppercase border border-blue-500/20">
                  Processing
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                We process your data strictly for standard legal and business purposes:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Project Quotations", desc: "Evaluate technical scope, calculate quotations, and schedule initial consultations." },
                  { title: "Transactions & Invoices", desc: "Dispatch automated transaction receipts, verify payments, and issue legal invoices." },
                  { title: "Service & Security Alerts", desc: "Notify you about service updates, deliver customer assistance, and report security events." },
                  { title: "UX & Performance Tuning", desc: "Compile site-wide analytics to debug performance, test UI accessibility, and optimize UX." },
                  { title: "Legal Compliance", desc: "Comply with regulatory laws, tax reporting standards, and law enforcement processes." }
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-accent/40 border border-border/60 flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-extrabold text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
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
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">Data Protection & Security</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Security Protocols</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-extrabold uppercase border border-blue-500/20">
                  Encryption
                </span>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg">
                <p>
                  We prioritize data security above all. All information transmitted through our digital infrastructure pipelines is protected using <strong className="text-foreground">Transport Layer Security (TLS 1.3 / SSL)</strong> encryption during transit.
                </p>
                <p>
                  Access to lead information is restricted internally to specialized IT support staff, operations teams, and directors required to coordinate project specifications. However, please remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to protect your personal data, we cannot guarantee its absolute safety.
                </p>
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
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">Sharing & Disclosure</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Zero Data Trade Guarantee</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-extrabold uppercase border border-blue-500/20">
                  Privacy Policy
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg font-bold text-foreground">
                We do not sell, rent, or trade your personal information to third parties under any circumstances.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-5 rounded-2xl bg-accent/40 border border-border/60 space-y-1">
                  <h4 className="text-base font-extrabold text-foreground">Service Providers</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    We use hosting architectures, email notification delivery services, and payment processors to complete operations. These systems are strictly bound by privacy contracts to not expose or utilize your data.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-accent/40 border border-border/60 space-y-1">
                  <h4 className="text-base font-extrabold text-foreground">Legal Obligations</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    We may disclose information if required to do so by applicable local laws, law enforcement inquiries, judicial trials, or tax authorities.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-accent/40 border border-border/60 space-y-1">
                  <h4 className="text-base font-extrabold text-foreground">Business Transfers</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    In the event of a merger, acquisition, or restructuring of CoreSlash Technologies assets, user data could be transferred to the acquiring entity.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Section 6 */}
            <motion.div
              id="sec-6"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="scroll-mt-32 p-8 sm:p-12 rounded-[2.5rem] bg-card border border-border/80 shadow-xl hover:shadow-2xl transition-all duration-300 space-y-6 relative overflow-hidden group"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-blue-500/30">
                    06
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">Cookies & Analytics</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Browser Configuration</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-extrabold uppercase border border-blue-500/20">
                  Tracking
                </span>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg">
                <p>
                  We deploy cookies (small text files saved on your terminal) and web beacons to remember preferences, assess page engagement speed, and compile statistical audience reports.
                </p>
                <p>
                  You have complete control over cookies through your web browser configuration. You can disable, block, or delete cookies at any time. For detailed information, view our dedicated <Link to="/cookie-policy" className="text-blue-600 font-bold hover:underline">Cookie Policy</Link>.
                </p>
              </div>
            </motion.div>

            {/* Section 7 */}
            <motion.div
              id="sec-7"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="scroll-mt-32 p-8 sm:p-12 rounded-[2.5rem] bg-card border border-border/80 shadow-xl hover:shadow-2xl transition-all duration-300 space-y-6 relative overflow-hidden group"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-blue-500/30">
                    07
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">Your Rights & Controls</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Global User Rights</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-extrabold uppercase border border-blue-500/20">
                  User Controls
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                Regardless of your geographic location, we respect your rights to manage your personal details. Depending on your local jurisdiction (GDPR, CCPA, or regional IT regulations), you have:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-2">
                  <span className="text-sm font-extrabold text-blue-400 block">01. Access Rights</span>
                  <p className="text-xs text-slate-300 leading-relaxed">Request a summary report of all personal data we currently hold on you.</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-2">
                  <span className="text-sm font-extrabold text-blue-400 block">02. Correction Rights</span>
                  <p className="text-xs text-slate-300 leading-relaxed">Request immediate corrections of inaccurate or outdated information.</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-2">
                  <span className="text-sm font-extrabold text-blue-400 block">03. Deletion Rights</span>
                  <p className="text-xs text-slate-300 leading-relaxed">Request permanent deletion of your records from our system.</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-2">
                  <span className="text-sm font-extrabold text-blue-400 block">04. Data Portability</span>
                  <p className="text-xs text-slate-300 leading-relaxed">Request transfer of your structured profile information to another operator.</p>
                </div>
              </div>
            </motion.div>

            {/* Section 8 */}
            <motion.div
              id="sec-8"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="scroll-mt-32 p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-transparent border border-blue-500/30 shadow-2xl space-y-6 relative overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-blue-500/40">
                    08
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">Contact Information</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Data Officer Support</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500 text-white text-xs font-extrabold uppercase shadow-md">
                  Inquiries
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                If you have any questions about this Privacy Policy, wish to exercise your data protection rights, or have queries about how your data is handled, feel free to contact our data officer:
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

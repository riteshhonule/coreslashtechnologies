import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { 
  Scale, FileText, ArrowRight, CheckCircle2, 
  Mail, Phone, ShieldCheck, Code2, DollarSign, AlertTriangle, XCircle, Gavel, Sparkles
} from "lucide-react";

export default function TermsOfServicePage() {
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
    { id: "sec-1", number: "01", title: "Acceptance & Scope", icon: Scale, tag: "Agreement Scope" },
    { id: "sec-2", number: "02", title: "Project Execution", icon: Code2, tag: "SOW & Agile" },
    { id: "sec-3", number: "03", title: "IP & Code Ownership", icon: ShieldCheck, tag: "Code Ownership" },
    { id: "sec-4", number: "04", title: "Payments & Invoicing", icon: DollarSign, tag: "Billing Terms" },
    { id: "sec-5", number: "05", title: "Limitation of Liability", icon: AlertTriangle, tag: "Liability Limits" },
    { id: "sec-6", number: "06", title: "Acceptable Use Policy", icon: FileText, tag: "Usage Rules" },
    { id: "sec-7", number: "07", title: "Termination Terms", icon: XCircle, tag: "Contract Breach" },
    { id: "sec-8", number: "08", title: "Governing Law", icon: Gavel, tag: "Karnataka Court" },
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
        <title>Terms of Service | CoreSlash Technologies</title>
        <meta
          name="description"
          content="Review the Terms of Service for CoreSlash Technologies. Understand client agreements, IP code ownership, payment milestones, and legal guidelines."
        />
        <link rel="canonical" href="https://www.coreslashtechnologies.com/terms-of-service" />
      </Helmet>

      {/* 1. HERO BANNER */}
      <section className="relative w-full pt-16 md:pt-24 pb-16 px-6 sm:px-10 md:px-16 lg:px-24 max-w-[1700px] mx-auto overflow-hidden">
        {/* Background Radial Glow */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-tr from-indigo-600/20 via-blue-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-sky-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950 text-white dark:bg-white/10 dark:text-white border border-slate-800 dark:border-white/20 text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-xl backdrop-blur-xl"
          >
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <Scale className="w-4 h-4 text-indigo-400" />
            <span>Master Client Service Agreement</span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1]"
          >
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400">Service</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base sm:text-lg max-w-2xl font-medium leading-relaxed"
          >
            Clear, transparent project agreements. Review our rules regarding codebase IP transfer, development milestones, billing terms, and legal jurisdiction.
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
              <span className="text-xs text-muted-foreground font-bold uppercase block">Code IP Transfer</span>
              <span className="text-xs sm:text-sm font-black text-blue-600">100% Client Ownership</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-card border border-border/60 shadow-sm text-center">
              <span className="text-xs text-muted-foreground font-bold uppercase block">Jurisdiction</span>
              <span className="text-xs sm:text-sm font-black text-foreground">Karnataka, India</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-card border border-border/60 shadow-sm text-center">
              <span className="text-xs text-muted-foreground font-bold uppercase block">Clauses</span>
              <span className="text-xs sm:text-sm font-black text-foreground">08 Standard</span>
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
                  Terms Index
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                8 Clauses
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
                  <span>Operations Support</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Questions about your Statement of Work or active project milestones?
                </p>
                <a 
                  href="mailto:contact@coreslashtechnologies.com" 
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>Contact Operations</span>
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
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">Acceptance of Terms & Services Scope</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Agreement Scope</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-extrabold uppercase border border-blue-500/20">
                  Overview
                </span>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg">
                <p>
                  By engaging with <strong className="text-foreground">CoreSlash Technologies</strong> (the "Company", "we", "us", or "our"), signing a client contract, submitting inquiries through <a href="https://coreslashtechnologies.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">coreslashtechnologies.com</a>, or using any of our services, you agree to be bound by these Terms of Service. If you do not accept these terms, you must refrain from utilizing our services.
                </p>
                <p>
                  CoreSlash Technologies provides a range of professional IT services, including but not limited to: Custom Website Development, Mobile App Development, Artificial Intelligence & Machine Learning Integrations, E-Commerce Systems (Shopify/Custom), Search Engine Optimization (SEO) & Marketing, Cloud Infrastructure Setup, SCADA & Industrial Automation, and Business Automation Systems.
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
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">Project Execution & Client Cooperation</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Agile Workflow</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-extrabold uppercase border border-blue-500/20">
                  Execution
                </span>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg">
                <p>
                  Successful project delivery requires active collaboration. To ensure projects stay on schedule, the Client agrees to provide prompt feedback, text copy, graphic assets, brand guidelines, credentials, or API tokens as outlined in our project onboarding checklists.
                </p>
                <p>
                  We coordinate project releases through agile milestones. Any deviation or addition to the features outlined in the original Statement of Work (SOW) will be processed as a "Change Order" and may incur additional charges and timeline extensions.
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
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">Intellectual Property Rights & Code Ownership</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Client Ownership Guarantee</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-extrabold uppercase border border-blue-500/20">
                  IP Rights
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                Unless otherwise agreed in a signed written contract, the assignment of Intellectual Property (IP) is structured as follows:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3 shadow-lg">
                  <span className="text-xs font-black px-2.5 py-1 rounded-md bg-blue-600 text-white uppercase">100% Client Ownership</span>
                  <h3 className="text-base font-black text-white">Client Custom Code</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Upon receipt of all final invoice completions, CoreSlash Technologies assigns full IP and codebase ownership of custom code specifically developed for the Client.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3 shadow-lg">
                  <span className="text-xs font-black px-2.5 py-1 rounded-md bg-indigo-600 text-white uppercase">Perpetual License</span>
                  <h3 className="text-base font-black text-white">Company Frameworks</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    CoreSlash Technologies retains rights over pre-existing configuration scripts and frameworks, granting the Client a perpetual, royalty-free license.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3 shadow-lg">
                  <span className="text-xs font-black px-2.5 py-1 rounded-md bg-sky-600 text-white uppercase">Vendor Licenses</span>
                  <h3 className="text-base font-black text-white">Third-Party Assets</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Licenses for third-party libraries, APIs, widgets, or visual fonts remain governed by respective vendor terms and client responsibility.
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
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">Payments, Milestones & Invoicing</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Transparent Milestones</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-extrabold uppercase border border-blue-500/20">
                  Billing
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                Our billing system is organized around clearly defined payment milestones to ensure complete transparency:
              </p>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-accent/40 border border-border/60 space-y-1">
                  <h4 className="text-base font-extrabold text-foreground">Milestone Deposits</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Projects typically require an upfront commitment deposit before scheduling resources. Remaining milestones are billed upon completion of designated stages (e.g., Design Sign-off, Beta Release, Final Delivery).
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-accent/40 border border-border/60 space-y-1">
                  <h4 className="text-base font-extrabold text-foreground">Invoicing Terms</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Invoices are dispatched electronically and due within 7 to 14 business days. Late payments may result in the suspension of active development or hosting access.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-accent/40 border border-border/60 space-y-1">
                  <h4 className="text-base font-extrabold text-foreground">Refund Policy</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Since custom software engineering requires immediate allocation of developer hours, payments made for completed design/development milestones are non-refundable.
                  </p>
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
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">Limitation of Liability</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Statutory Limits</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-extrabold uppercase border border-blue-500/20">
                  Liability
                </span>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg">
                <p className="uppercase font-extrabold text-xs tracking-widest text-blue-600">
                  Maximum Statutory Limitations
                </p>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL CORESLASH TECHNOLOGIES BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES WHATSOEVER.
                </p>
                <p>
                  This includes, but is not limited to, damages for loss of profits, business interruptions, data corruption, server downtime, security breaches on third-party host architectures, or any other commercial losses, even if we have been advised of the possibility of such losses. Our total aggregate liability under these terms shall not exceed the total fees paid by the Client to the Company for the specific project during the three (3) months prior to the occurrence of the claim.
                </p>
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
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">Acceptable Use Policy</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">System Security</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-extrabold uppercase border border-blue-500/20">
                  Usage Policy
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                Our services, servers, and digital environments must only be utilized for lawful purposes. You agree not to use our codebases or websites to:
              </p>

              <div className="space-y-3">
                {[
                  "Promote unlawful actions, distribute fraudulent content, or host materials that violate intellectual property rights.",
                  "Transmit malicious malware, viruses, trojans, logic bombs, or participate in distributed denial-of-service (DDoS) campaigns.",
                  "Reverse-engineer, copy, or scrape our proprietary system interfaces, frameworks, and design grids."
                ].map((rule, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-accent/40 border border-border/60 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-foreground">{rule}</span>
                  </div>
                ))}
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
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">Termination of Engagements</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Contract Breach Terms</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-extrabold uppercase border border-blue-500/20">
                  Termination
                </span>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg">
                <p>
                  Either party may terminate a project contract if the other party commits a material breach of terms and fails to cure such breach within thirty (30) days of receiving written notice.
                </p>
                <p>
                  Upon termination, the Client is legally required to pay for all completed milestones and human-hours logged up to the date of termination. If terminated before completion, no IP transfer or codebase deployment will be executed, and all licenses granted hereunder will cease.
                </p>
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
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">Governing Law & Jurisdiction</h2>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Karnataka Judicial Court</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500 text-white text-xs font-extrabold uppercase shadow-md">
                  Jurisdiction
                </span>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg">
                <p>
                  These Terms of Service, along with any separate project contracts, shall be governed by, construed, and enforced in accordance with the laws of the State of Karnataka, India, without regard to its principles of conflicts of law.
                </p>
                <p className="font-extrabold text-foreground">
                  You agree that any legal action, dispute, or lawsuit arising out of or relating to these Terms or our Services must be filed exclusively in the courts located in Belgaum, Karnataka, India.
                </p>
              </div>

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

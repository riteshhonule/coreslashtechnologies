import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { envConfig } from "../config/env.config";
import SEO from "../components/SEO";
import ContactForm from "../components/ContactForm";
import BookACall from "../components/BookACall";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Shield,
  MessageSquare
} from "lucide-react";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const contactDetails = [
    {
      icon: Phone,
      title: "Mobile / WhatsApp",
      detail: "+91 83107 11652",
      subText: "Standard working hours response",
      link: `tel:+${envConfig.social.whatsappPhone}`,
      color: "text-blue-600 bg-blue-50/50 border-blue-100"
    },
    {
      icon: Mail,
      title: "Direct Mailbox",
      detail: envConfig.contact.email,
      subText: "Support & project scoping inquiries",
      link: `mailto:${envConfig.contact.email}`,
      color: "text-purple-600 bg-purple-50/50 border-purple-100"
    },
    {
      icon: MapPin,
      title: "HQ Coordinates",
      detail: "Belagavi, Karnataka, India",
      subText: "Software Engineering Core Center",
      link: envConfig.contact.mapsLink,
      color: "text-cyan-600 bg-cyan-50/50 border-cyan-100"
    },
    {
      icon: Clock,
      title: "Working Hours",
      detail: "9:00 AM - 6:00 PM EST",
      subText: "Guaranteed 24h Response SLA",
      link: "#",
      color: "text-emerald-600 bg-emerald-50/50 border-emerald-100"
    }
  ];

  const contactFaqs = [
    {
      q: "Can you sign an NDA before we share project briefs?",
      a: "Yes. CoreSlash Technologies signs standard mutual NDAs before reviewing proprietary codebase setups, technical schemas, or client brief folders."
    },
    {
      q: "How does the developer communication loop work?",
      a: "Once a dedicated team is assigned, we establish a direct channel in your Slack or Microsoft Teams. All task routing occurs directly inside ClickUp or Jira."
    },
    {
      q: "Who owns the code created during the partnership?",
      a: "You do. Your agency owns 100% of all intellectual property, repositories, server configuration keys, and database models we construct."
    },
    {
      q: "What is your standard developer response SLA?",
      a: "We maintain a guaranteed sub-24h response time for all communication tickets, and sub-4h SLAs for clients on dedicated support plans."
    }
  ];

  return (
    <main className="relative min-h-screen bg-[#F9FAFB] pt-0 overflow-x-hidden pb-12 text-gray-900">
      <SEO
        title="Contact & Partnership Scoping | CoreSlash Technologies"
        description="Sync with our software engineering core. Submit your project requirements, sign mutual NDAs, or book a Calendly call with our tech leads."
      />

      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-purple/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-indigo/2 rounded-full blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative py-20 md:py-32 w-full text-center px-6">
        <motion.div
          initial={{ opacity: 1, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-4"
        >
          <Sparkles className="w-4 h-4 text-secondary-indigo" />
          <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.3em]">
            Sync with Engineers
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-5xl md:text-8xl font-black text-gray-900 mb-10 leading-[1.1] tracking-tight"
        >
          Let's Build <br />
          <span className="text-gradient-purple">Together</span>
        </motion.h1>

        <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
          Whether you need a dedicated NestJS/React developer squad or want to scope a fixed-price milestone project, we're ready to integrate behind the scenes.
        </p>
      </section>

      {/* INTRO GRID: DETAILED INFO & BRIEF INTAKE */}
      <section className="py-10 md:py-16 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Contact details & response SLAs */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-extrabold text-gray-950 tracking-tight leading-tight">HQ Details & Response SLAs</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-semibold">
                  We process new scoping requests, NDA agreements, and partner developer proposals within 24 business hours.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {contactDetails.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a 
                      key={idx}
                      href={item.link}
                      target={item.link !== "#" ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="bg-white border border-gray-250 p-6 rounded-2xl flex flex-col justify-between hover:border-secondary-indigo/25 transition-all duration-300 shadow-sm"
                    >
                      <div>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-4 ${item.color}`}>
                          <Icon className="w-5.5 h-5.5" />
                        </div>
                        <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-1">{item.title}</h4>
                        <p className="text-sm font-extrabold text-gray-950 leading-tight break-all">{item.detail}</p>
                      </div>
                      <p className="text-[10px] text-gray-400 font-semibold mt-4">{item.subText}</p>
                    </a>
                  );
                })}
              </div>

              {/* Map Placeholder */}
              <div className="bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Office Location (Belagavi, India)</span>
                  <span className="text-[9px] font-bold text-green-700 bg-green-500/10 px-2 py-0.5 rounded">Active Core</span>
                </div>
                <div className="h-44 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-4 space-y-2">
                  <MapPin className="w-8 h-8 text-secondary-indigo animate-pulse" />
                  <span className="text-xs font-bold text-gray-700">Google Map Integration</span>
                  <p className="text-[10px] text-gray-400 max-w-xs font-semibold">HQ Coordinates: Belagavi Development Zone, Karnataka, India</p>
                </div>
              </div>
            </div>

            {/* Right Column: Brief Intake Form */}
            <div className="lg:col-span-7 bg-white p-8 md:p-12 border border-gray-200/65 rounded-[3rem] shadow-xl shadow-gray-200/20">
              <h3 className="text-2xl font-extrabold text-gray-950 mb-2 tracking-tight">Submit a Project Brief</h3>
              <p className="text-xs text-gray-400 font-semibold mb-8">Discuss white-label developer capacity, NDA frameworks, or start a pilot sprint.</p>
              <ContactForm variant="default" service="General Contact Request" />
            </div>

          </div>
        </div>
      </section>

      {/* SCHEDULER BLOCK */}
      <section className="py-12 md:py-24 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <BookACall />
        </div>
      </section>

      {/* CONTACT FAQ SECTION */}
      <section className="py-12 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight text-center mb-16">
            FAQ & Scoping <span className="text-gradient-purple">Procedures</span>
          </h2>
          <div className="space-y-4">
            {contactFaqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-[2rem] border border-gray-200/60 overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-6 md:p-8 text-left font-bold text-gray-950 hover:text-secondary-indigo transition-colors"
                >
                  <span className="text-base flex items-center gap-2"><HelpCircle className="w-4.5 h-4.5 text-secondary-indigo shrink-0" /> {faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-t border-gray-100 p-6 md:p-8 bg-gray-50/50"
                    >
                      <p className="text-sm text-gray-500 font-semibold leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import ContactForm from "../components/ContactForm";
import { useModal } from "../context/ModalContext";
import agencyCollabImg from "../img/agency_collab.png";
import { 
  Users, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  HelpCircle, 
  ChevronDown, 
  Code, 
  Server, 
  Database, 
  Search, 
  Cpu, 
  Rocket, 
  CheckCircle,
  FileText,
  Clock,
  Compass,
  Layout,
  Terminal,
  Grid,
  Zap,
  DollarSign
} from "lucide-react";

export default function AgencyPartnershipPage() {
  const { openModal } = useModal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTechTab, setActiveTechTab] = useState<string>("frontend");

  const pageUrl = "https://coreslashtechnologies.com/agency-partnership";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "White Label Software Development Partner Programs",
    "description": "White-label website development, technical SEO, AI automation, and custom software engineering services for digital agencies.",
    "provider": {
      "@type": "Organization",
      "name": "CoreSlash Technologies",
      "url": "https://coreslashtechnologies.com"
    }
  };

  const partnerCards = [
    {
      title: "White Label Delivery",
      desc: "We work behind your brand.",
      details: "No branded commits, generic email logins, and strict white-label code ownership.",
      icon: ShieldCheck
    },
    {
      title: "Dedicated Technical Team",
      desc: "Experienced developers for long-term collaboration.",
      details: "Assign dedicated React, Node, and Python developers that integrate into your active Slack channels.",
      icon: Users
    },
    {
      title: "Fast Turnaround",
      desc: "Reliable delivery without compromising quality.",
      details: "Structured Agile sprints, clean coding guidelines, and automated unit testing tools.",
      icon: Zap
    },
    {
      title: "24-Hour Response Time",
      desc: "Clear and responsive communication.",
      details: "Dedicated project managers sync with your team inside Jira, Slack, or Basecamp daily.",
      icon: Clock
    },
    {
      title: "Technical SEO Experts",
      desc: "Engineering-driven SEO improvements.",
      details: "Core Web Vitals acceleration, site crawlabity optimization, schema mappings, and organic search engineering.",
      icon: Search
    },
    {
      title: "Long-Term Support",
      desc: "Maintenance after project delivery.",
      details: "Comprehensive support plans and SLAs to protect client websites and microservices from downtime.",
      icon: Server
    }
  ];

  const services = {
    website: [
      "Business Website Development",
      "Corporate Websites",
      "Landing Pages",
      "Website Redesign",
      "WordPress Development",
      "React Development",
      "Custom Web Applications"
    ],
    maintenance: [
      "Monthly Website Maintenance",
      "Bug Fixes",
      "Security Updates",
      "Performance Optimization",
      "Website Migration",
      "Server Support"
    ],
    seo: [
      "Technical SEO",
      "Technical SEO Audits",
      "Website Speed Optimization",
      "Core Web Vitals Optimization",
      "Schema Implementation",
      "SEO Maintenance"
    ],
    software: [
      "Custom Software Development",
      "ERP Development",
      "CRM Development",
      "Admin Panel Development",
      "Dashboard Development",
      "API Development",
      "AI Automation"
    ]
  };

  const chooseUsGrid = [
    "Responsive Communication",
    "Dedicated Engineering Team",
    "Clean & Scalable Code",
    "On-Time Delivery",
    "Transparent Workflow",
    "Competitive Pricing",
    "Modern Technology Stack",
    "Agile Development",
    "Long-Term Partnership",
    "White Label Friendly"
  ];

  const techStack = {
    frontend: ["React", "Next.js", "Vite", "Tailwind CSS"],
    backend: ["NestJS", "Node.js", "Python", "Django"],
    databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    cloud: ["AWS", "Cloudflare", "Docker", "NGINX"],
    seo: ["Technical SEO", "Core Web Vitals", "Schema", "PageSpeed Optimization"],
    ai: ["OpenAI", "AI Automation", "Workflow Automation"]
  };

  const processSteps = [
    { title: "Discovery", desc: "Understanding scope, wireframes, and target outcomes under NDA.", icon: Compass },
    { title: "Planning", desc: "Mapping databases, API architecture, and bi-weekly sprint targets.", icon: FileText },
    { title: "UI Review", desc: "Scrutinizing Figma designs to ensure clean pixel-perfect frontend layouts.", icon: Layout },
    { title: "Development", desc: "Writing clean, commented code following modular specifications.", icon: Code },
    { title: "Testing", desc: "Applying functional testing, responsive checks, and vulnerability scanning.", icon: CheckCircle },
    { title: "Deployment", desc: "Secure staging approvals, DNS settings, and CDN configurations.", icon: Rocket },
    { title: "Maintenance", desc: "24/7 uptime monitoring, patching, and developer SLA support.", icon: Server }
  ];

  const faqItems = [
    {
      q: "Can you work under our brand?",
      a: "Yes. All code, repository commits, communication channels, and design configurations are executed completely white-label under your agency's name."
    },
    {
      q: "Do clients know about CoreSlash?",
      a: "Only if you want them to. By default, we remain invisible in the background as your silent software engineering extension."
    },
    {
      q: "Can you sign an NDA?",
      a: "Absolutely. We sign strict non-disclosure agreements before reviewing client brief folders or starting technical scoping discussions."
    },
    {
      q: "Do you provide maintenance?",
      a: "Yes. We offer long-term support SLA packages covering monthly security patches, backups, uptime checks, and bug-fix allocations."
    },
    {
      q: "Can we scale the team?",
      a: "Yes. You can scale your dedicated developer count up or down with a 30-day notice period as client demands fluctuate."
    },
    {
      q: "Do you communicate directly with clients?",
      a: "Only when requested. If you need our engineers to join technical client calls, we represent ourselves as part of your agency's development team."
    }
  ];

  return (
    <div className="relative flex flex-col min-h-screen bg-[#F9FAFB] overflow-hidden pt-2 md:pt-4">
      <SEO
        title="White Label Software Development Partner | CoreSlash Technologies"
        description="Partner with CoreSlash Technologies for white-label website development, technical SEO, AI automation, and custom software engineering services. Scale your agency with a reliable technical team."
        structuredData={structuredData}
        canonicalUrl={pageUrl}
      />

      {/* SECTION 1: HERO */}
      <section className="relative py-12 md:py-24 overflow-hidden border-b border-gray-200/50 bg-[#F9FAFB]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary-purple/3 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight">
              Scale Your Agency <br />
              <span className="text-gradient-purple">Without Hiring</span> <br />
              More Developers
            </h1>
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              Partner with CoreSlash Technologies as your trusted white-label software engineering team. Deliver websites, technical SEO, AI solutions, and custom software under your own brand while we handle the technical execution.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button onClick={openModal} className="btn-pill btn-primary-glow text-white px-8 py-4 text-sm font-bold shadow-lg">
                Book a Discovery Call
              </button>
              <Link to="/contact" className="btn-pill btn-glass text-secondary-indigo hover:text-white px-8 py-4 text-sm font-bold">
                Become a Partner
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-secondary-indigo/5 rounded-[3rem] blur-2xl -z-10" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-200/60 bg-white">
              <img
                src={agencyCollabImg}
                alt="Agency white-label software engineering partnership illustration"
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY PARTNER WITH CORESLASH */}
      <section className="py-16 md:py-28 relative z-10 bg-white border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Your Dedicated <span className="text-gradient-cyan">Technical Team</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              Growing agencies often win more projects than they can deliver internally. CoreSlash helps agencies scale by becoming their reliable white-label engineering partner.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnerCards.map((card, idx) => (
              <div key={idx} className="bg-gray-50/50 p-8 rounded-3xl border border-gray-200/60 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-secondary-indigo/5 flex items-center justify-center text-secondary-indigo mb-6">
                    <card.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-950 text-xl mb-2">{card.title}</h4>
                  <p className="text-sm text-secondary-indigo font-bold mb-3">{card.desc}</p>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold">{card.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICES */}
      <section className="py-16 md:py-28 relative z-10 bg-[#F9FAFB] border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              White-Label <span className="text-gradient-purple">Service Matrix</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Website Engineering */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-200/60 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-500/5 text-blue-600 flex items-center justify-center mb-6"><Code className="w-5 h-5" /></div>
              <h3 className="font-black text-gray-950 text-lg mb-4 border-b border-gray-100 pb-2">Website Engineering</h3>
              <ul className="space-y-2 text-xs font-semibold text-gray-500">
                {services.website.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-600" /> {item}</li>
                ))}
              </ul>
            </div>

            {/* Website Maintenance */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-200/60 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-green-500/5 text-green-600 flex items-center justify-center mb-6"><Server className="w-5 h-5" /></div>
              <h3 className="font-black text-gray-950 text-lg mb-4 border-b border-gray-100 pb-2">Website Maintenance</h3>
              <ul className="space-y-2 text-xs font-semibold text-gray-500">
                {services.maintenance.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-600" /> {item}</li>
                ))}
              </ul>
            </div>

            {/* Technical SEO */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-200/60 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-500/5 text-amber-600 flex items-center justify-center mb-6"><Search className="w-5 h-5" /></div>
              <h3 className="font-black text-gray-950 text-lg mb-4 border-b border-gray-100 pb-2">Technical SEO</h3>
              <ul className="space-y-2 text-xs font-semibold text-gray-500">
                {services.seo.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-600" /> {item}</li>
                ))}
              </ul>
            </div>

            {/* Software Development */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-200/60 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-500/5 text-purple-650 flex items-center justify-center mb-6"><Database className="w-5 h-5" /></div>
              <h3 className="font-black text-gray-950 text-lg mb-4 border-b border-gray-100 pb-2">Software Development</h3>
              <ul className="space-y-2 text-xs font-semibold text-gray-500">
                {services.software.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-655" /> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW WE WORK */}
      <section className="py-16 md:py-28 relative z-10 bg-white border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
              How <span className="text-gradient-cyan">We Work</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/3 left-12 right-12 h-0.5 bg-gray-100 -z-10" />

            {[
              { step: "Step 1", title: "You Win The Client", desc: "You manage sales and communication." },
              { step: "Step 2", title: "We Build", desc: "CoreSlash delivers technical implementation." },
              { step: "Step 3", title: "You Deliver", desc: "Projects are delivered under your brand." },
              { step: "Step 4", title: "Long-Term Support", desc: "We continue providing maintenance and technical support." }
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-200/60 shadow-sm text-center">
                <div className="w-10 h-10 rounded-full bg-secondary-indigo text-white font-bold flex items-center justify-center mx-auto mb-4 text-xs">{idx + 1}</div>
                <span className="text-secondary-indigo font-bold text-xs uppercase tracking-wider block mb-2">{step.step}</span>
                <h4 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-semibold">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY AGENCIES CHOOSE US */}
      <section className="py-16 md:py-28 relative z-10 bg-[#F9FAFB] border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Why Agencies <span className="text-gradient-purple">Choose Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {chooseUsGrid.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200/50 shadow-sm text-center flex flex-col justify-center items-center">
                <CheckCircle className="w-6 h-6 text-green-600 mb-3" />
                <h4 className="font-bold text-gray-900 text-xs leading-snug">{item}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: TECH STACK */}
      <section className="py-16 md:py-28 relative z-10 bg-white border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Our Agency <span className="text-gradient-cyan">Technology Stack</span>
            </h2>
          </div>

          <div className="flex justify-center flex-wrap gap-2 mb-10 max-w-2xl mx-auto">
            {Object.keys(techStack).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTechTab(tab)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                  activeTechTab === tab
                    ? "bg-secondary-indigo border-secondary-indigo text-white shadow-md shadow-secondary-indigo/25"
                    : "bg-white border-gray-250 text-gray-600 hover:border-secondary-indigo/30"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-gray-50 border border-gray-200/60 p-8 rounded-3xl max-w-2xl mx-auto text-center">
            <div className="grid grid-cols-2 gap-4">
              {techStack[activeTechTab as keyof typeof techStack].map((tech, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-gray-200/60 shadow-sm text-gray-900 font-bold text-sm">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: OUR DEVELOPMENT PROCESS */}
      <section className="py-16 md:py-28 relative z-10 bg-[#F9FAFB] border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
              Our Development <span className="text-gradient-purple">Process</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-7 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200/65 shadow-sm text-center flex flex-col justify-between items-center relative">
                {idx < 6 && <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-gray-200 font-bold z-10">→</div>}
                <div className="w-10 h-10 rounded-xl bg-secondary-indigo/5 text-secondary-indigo flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-gray-950 text-sm mb-2">{step.title}</h4>
                <p className="text-[10px] text-gray-500 leading-normal font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: ENGAGEMENT MODELS */}
      <section className="py-16 md:py-28 relative z-10 bg-white border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Flexible <span className="text-gradient-cyan">Engagement Models</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { title: "Dedicated Team", desc: "Secure senior developer squads allocated full-time to your custom client projects." },
              { title: "Monthly Retainer", desc: "Fixed monthly allocation of hours for minor changes, updates, and layouts." },
              { title: "Project Based", desc: "Fixed scope estimations with transparent milestone sprints and timeline targets." },
              { title: "Hourly Development", desc: "On-demand technical troubleshooting and programming hours on raw scope." },
              { title: "Maintenance Plans", desc: "Continuous uptime support SLAs for plugins, cores, server databases, and backups." }
            ].map((model, idx) => (
              <div key={idx} className="bg-[#F9FAFB] p-8 rounded-3xl border border-gray-200/60 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-black text-gray-900 text-base mb-3 border-b border-gray-150 pb-2">{model.title}</h4>
                  <p className="text-xs text-gray-505 leading-relaxed font-semibold">{model.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQ */}
      <section className="py-16 md:py-28 relative z-10 bg-[#F9FAFB] border-b border-gray-200/60">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight text-center mb-16">
            Partnership <span className="text-gradient-purple">FAQs</span>
          </h2>
          <div className="space-y-4">
            {faqItems.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-gray-200/60 overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-6 text-left font-bold text-gray-950 hover:text-secondary-indigo transition-colors"
                >
                  <span className="text-base flex items-center gap-2"><HelpCircle className="w-4 h-4 text-secondary-indigo shrink-0" /> {faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-t border-gray-100 p-6 bg-gray-50/50"
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

      {/* SECTION 10: FINAL CTA */}
      <section className="py-16 md:py-28 relative z-10 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative rounded-[3.5rem] overflow-hidden bg-white border border-gray-200/60 shadow-xl shadow-gray-250/10 p-10 md:p-20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/3 to-secondary-indigo/3 pointer-events-none" />
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Let's Build Great <span className="text-gradient-cyan">Products Together</span>
            </h2>
            <p className="text-gray-500 text-lg md:text-xl mb-12 font-medium max-w-2xl mx-auto">
              Partner with CoreSlash Technologies and extend your agency with a reliable software engineering team.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <button onClick={openModal} className="btn-pill btn-primary-glow text-white px-8 py-4 text-sm font-bold shadow-lg">
                Book Discovery Call
              </button>
              <Link to="/contact" className="btn-pill btn-glass text-secondary-indigo hover:text-white px-8 py-4 text-sm font-bold">
                Become Our Partner
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

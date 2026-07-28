import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import ContactForm from "../components/ContactForm";
import { useModal } from "../context/ModalContext";
import ClientLogos from "../components/ClientLogos";
import Testimonials from "../components/Testimonials";
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
  ShieldAlert,
  MessageSquare,
  Globe,
  Lock
} from "lucide-react";

export default function AgencyPartnershipPage() {
  const { openModal } = useModal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTechTab, setActiveTechTab] = useState<string>("frontend");

  const pageUrl = "https://coreslashtechnologies.com/agency-partnership";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "White-Label Software Development Agency Partnerships",
    "description": "White-label website development, technical SEO, AI automation, and custom software engineering services for digital agencies.",
    "provider": {
      "@type": "Organization",
      "name": "CoreSlash Technologies",
      "url": "https://coreslashtechnologies.com"
    }
  };

  const partnerCards = [
    {
      title: "White-Label Delivery",
      desc: "Generic commits, no branded footprints.",
      details: "We commit directly to your repositories under generic/anonymous handles, ensuring absolute white-label delivery.",
      icon: ShieldCheck,
      badge: "Invisible"
    },
    {
      title: "NDA Friendly Protocol",
      desc: "Strict NDA protection for all project scope.",
      details: "We sign standard NDAs before scoping projects. Your clients stay strictly your clients.",
      icon: Lock,
      badge: "Secure"
    },
    {
      title: "Your Brand Stays First",
      desc: "We remain completely behind the curtain.",
      details: "If technical client calls are required, we join representing your agency's internal dev team.",
      icon: Globe,
      badge: "100% Agency"
    },
    {
      title: "Dedicated Developers",
      desc: "Full-time allocation of senior engineers.",
      details: "Assign React, NestJS, and Python engineers dedicated solely to your account and sprint backlog.",
      icon: Users,
      badge: "Expert squads"
    },
    {
      title: "Fast Response SLAs",
      desc: "Sub-24h turnaround SLAs for all tickets.",
      details: "Quick responses to code patches, critical bug fixes, and operational server tickets.",
      icon: Clock,
      badge: "24h Response"
    },
    {
      title: "Flexible Team Scaling",
      desc: "Scale your capacity as deal flow demands.",
      details: "Increase or decrease developer headcount on standard 30-day notice limits.",
      icon: Zap,
      badge: "Dynamic"
    },
    {
      title: "Technical Expertise",
      desc: "Senior engineering and clean code patterns.",
      details: "We build modular, scalable components following strict OOP, SOLID, and testing protocols.",
      icon: Code,
      badge: "Senior developers"
    },
    {
      title: "Reliable Sprints",
      desc: "Structured, on-time project milestones.",
      details: "Consistent bi-weekly sprint velocity checks, detailed tracking boards, and transparent reviews.",
      icon: CheckCircle,
      badge: "On schedule"
    }
  ];

  const servicesMatrix = [
    {
      title: "Web Engineering",
      icon: Layout,
      color: "text-blue-600 bg-blue-500/5 border-blue-200/50",
      items: [
        "React & Next.js SPAs/SaaS",
        "Vite & Tailwind CSS templates",
        "Headless CMS Architectures",
        "E-Commerce Solutions (Shopify/Woo)",
        "Responsive Landing Pages",
        "WordPress Custom Themes"
      ]
    },
    {
      title: "Custom Software",
      icon: Database,
      color: "text-purple-600 bg-purple-500/5 border-purple-200/50",
      items: [
        "Bespoke ERP & CRM Systems",
        "NestJS & Node.js API Gateways",
        "Python FastAPI Services",
        "Microservices Orchestration",
        "Database Design & Indexing",
        "Stripe Gateway Integrations"
      ]
    },
    {
      title: "Technical SEO & Speed",
      icon: Search,
      color: "text-amber-600 bg-amber-500/5 border-amber-200/50",
      items: [
        "Core Web Vitals Optimization",
        "Sub-second Load Time tuning",
        "Structured Schema Markup",
        "Crawlability & Server Audits",
        "Redirection & Canonical setup",
        "Continuous SEO Performance Monitor"
      ]
    },
    {
      title: "AI & Automation",
      icon: Cpu,
      color: "text-emerald-600 bg-emerald-500/5 border-emerald-200/50",
      items: [
        "OpenAI API integrations",
        "LLM Agent Workflows",
        "Vector Database RAG setup",
        "Internal Business Automation",
        "Zapier & Make Custom Webhooks",
        "Data Scraping & Mining pipelines"
      ]
    }
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Figma Briefing & NDA",
      desc: "You supply project briefs, wireframes, or Figma design files. We sign NDAs and formulate a transparent scope documentation.",
      deliverable: "Scoping Doc & NDA executed",
      timeline: "1-2 Business Days"
    },
    {
      step: "02",
      title: "Sprint Planning",
      desc: "We split the roadmap into bi-weekly Agile sprints. We set targets on shared Jira or Basecamp boards with transparent developer assignees.",
      deliverable: "Jira Sprint backlog setup",
      timeline: "2-3 Business Days"
    },
    {
      step: "03",
      title: "Silent Coding Sprints",
      desc: "Our engineers construct clean backend APIs and pixel-perfect frontends. Commits are logged using anonymous workspace emails.",
      deliverable: "Private Git repo & regular updates",
      timeline: "Iterative sprints"
    },
    {
      step: "04",
      title: "Rigorous QA Review",
      desc: "We run unit testing, responsive verification across viewports, cross-browser audits, and PageSpeed inspections prior to staging updates.",
      deliverable: "Staging build & QA report",
      timeline: "Continuous"
    },
    {
      step: "05",
      title: "Invisible Launch & SLA",
      desc: "We securely deploy to your client's hosting servers (AWS, Vercel, Nginx). We continue providing long-term bug fix SLAs and speed maintenance.",
      deliverable: "Production launch & support SLA",
      timeline: "Ongoing maintenance"
    }
  ];

  const techStack = {
    frontend: ["React", "Next.js", "Vite", "Tailwind CSS", "HTML5 & CSS3"],
    backend: ["NestJS", "Node.js", "Python", "FastAPI", "Django"],
    databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    cloud: ["AWS", "Docker", "NGINX", "GitHub Actions", "Linux Systems"],
    automation: ["OpenAI LLMs", "LangChain", "Vector DBs", "Workflow Integrations"]
  };

  const commProcess = [
    {
      title: "Slack / Teams Channels",
      desc: "We join your internal messaging channel under generic emails (e.g., developer@youragency.com) to coordinate with your managers directly."
    },
    {
      title: "Jira, Trello, or ClickUp",
      desc: "We assign tasks, estimate story points, and status update cards inside your chosen project workspace in real-time."
    },
    {
      title: "Generic Git Handles",
      desc: "All code repository check-ins are pushed from sanitized git authors so end-client developers never see CoreSlash references."
    }
  ];

  const engagementModels = [
    {
      title: "Dedicated Developers",
      price: "Monthly Squad Allocation",
      desc: "Allocate senior full-time developers exclusively to your projects. Ideal for agencies with consistent design-and-dev backlogs.",
      perks: [
        "100% Dedicated Developer",
        "Direct Slack & Jira integration",
        "Daily standup syncs",
        "30-day notice scale protocol"
      ]
    },
    {
      title: "Project-Based Milestones",
      price: "Fixed-Scope Estimates",
      desc: "Send us a specific design file or scope brief, and receive a flat-rate estimation with scheduled delivery timeline sprints.",
      perks: [
        "Guaranteed project delivery",
        "Fixed sprint targets",
        "Dedicated project manager",
        "Post-launch bug SLA"
      ]
    },
    {
      title: "Monthly Retainer SLAs",
      price: "Support & Speed updates",
      desc: "Guarantee developer hours for monthly website updates, emergency patches, backups, speed optimizations, and database cleanups.",
      perks: [
        "Monthly support hours",
        "Uptime SLA monitoring",
        "Vulnerability scanning",
        "PageSpeed upkeep"
      ]
    }
  ];

  const faqItems = [
    {
      q: "How does CoreSlash remain completely invisible to our clients?",
      a: "All project repository commits are made using generic workspace email addresses, and we coordinate within your communication channels (Slack, Jira) under standard alias identities. Your client remains strictly yours."
    },
    {
      q: "Can we sign a Non-Disclosure Agreement (NDA) before sharing briefs?",
      a: "Yes. We sign non-disclosure agreements before examining any client project folders, Figma designs, database specifications, or API parameters."
    },
    {
      q: "Do you have experience working with agency Figma designs?",
      a: "Yes. Our frontend engineers specialize in translating complex, premium Figma layouts into pixel-perfect, highly responsive React and Next.js interfaces with micro-animations."
    },
    {
      q: "Can your developers join client-facing meetings?",
      a: "Only when explicitly requested. If you need our senior developers to explain technical details or API endpoints to your client, we join presenting ourselves as your internal technical specialists."
    },
    {
      q: "What is your standard response SLA for issues?",
      a: "We guarantee a sub-24h response time for all standard communication. For agencies with support retainers, we provide emergency priority SLAs covering database downtime and critical issues."
    },
    {
      q: "Can we scale our team up or down?",
      a: "Yes. You can scale the dedicated developer count up or down with a standard 30-day notice period as your active contract pipeline shifts."
    }
  ];

  return (
    <div className="relative flex flex-col min-h-screen bg-[#F9FAFB] overflow-hidden pt-2 md:pt-4">
      <SEO
        title="White-Label Software Engineering Partner for Digital Agencies | CoreSlash"
        description="We become your invisible engineering team. Partner with CoreSlash for custom software, web development, technical SEO, and AI automation under your agency brand."
        structuredData={structuredData}
        canonicalUrl={pageUrl}
      />

      {/* SECTION 1: HERO */}
      <section className="relative py-20 md:py-32 overflow-hidden border-b border-gray-200/50 bg-[#F9FAFB]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary-purple/3 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-indigo animate-pulse" />
              <span className="text-xs font-bold text-secondary-indigo uppercase tracking-wider">Agency Partnership Program</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight">
              We Become Your <br />
              <span className="text-gradient-purple">Invisible</span> Engineering Team
            </h1>
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              Scale your digital agency capacity without the overhead, risk, and friction of recruiting developers. We build websites, software, technical SEO structures, and AI integrations behind the scenes, strictly under your brand.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button onClick={openModal} className="btn-pill btn-primary-glow text-white px-8 py-4 text-sm font-bold shadow-lg">
                Book a Discovery Call
              </button>
              <a href="#engagement" className="btn-pill btn-glass text-secondary-indigo hover:text-white px-8 py-4 text-sm font-bold">
                View Partner Models
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-secondary-indigo/5 rounded-[3rem] blur-2xl -z-10" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-200/60 bg-white p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-bold text-xs text-gray-500 uppercase tracking-wider">White-Label Status</span>
                </div>
                <span className="text-[10px] font-black bg-[#5B21F4]/5 text-[#5B21F4] border border-[#5B21F4]/15 px-2.5 py-1 rounded-full uppercase tracking-wider">Sanitized Git</span>
              </div>
              <blockquote className="italic text-gray-600 text-sm leading-relaxed font-semibold">
                "CoreSlash handles all technical execution. Our client receives enterprise-grade React code, complete milestone schedules, and sub-second load speeds, while all communication remains with our account managers."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-150 flex items-center justify-center font-bold text-secondary-indigo text-xs">US</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xs">Managing Director</h4>
                  <p className="text-[10px] text-gray-400 font-semibold">Digital Growth Agency, New York</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT LOGOS */}
      <ClientLogos />

      {/* SECTION 2: WHY PARTNER WITH US */}
      <section className="py-16 md:py-28 relative z-10 bg-white border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Everything You Need to <span className="text-gradient-cyan">Scale Profitably</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              We eliminate the coding bottleneck. Win the client business, manage strategy, and leave the technical engineering to us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerCards.map((card, idx) => (
              <div key={idx} className="bg-[#F9FAFB]/50 p-8 rounded-[2rem] border border-gray-200/60 flex flex-col justify-between hover:shadow-md hover:border-secondary-indigo/15 transition-all duration-300">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-secondary-indigo/5 flex items-center justify-center text-secondary-indigo">
                      <card.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-secondary-indigo bg-secondary-indigo/5 border border-secondary-indigo/10 px-2 py-0.5 rounded-md">
                      {card.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-950 text-xl mb-2">{card.title}</h4>
                  <p className="text-xs text-secondary-indigo font-bold mb-3">{card.desc}</p>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold">{card.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW WHITE LABEL WORKS */}
      <section className="py-16 md:py-28 relative z-10 bg-[#F9FAFB] border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
              How the White-Label <span className="text-gradient-purple">Workflow Works</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              From contract scoping to final staging approval, we align behind your operations team invisibly.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 relative">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-200/60 shadow-sm flex flex-col justify-between relative">
                <div>
                  <span className="text-3xl font-black text-gray-200 block mb-6">{step.step}</span>
                  <h4 className="font-bold text-gray-950 text-base mb-3">{step.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold mb-6">{step.desc}</p>
                </div>
                <div className="border-t border-gray-100 pt-4 space-y-1">
                  <span className="text-[9px] font-bold text-gray-400 uppercase block">Deliverable</span>
                  <span className="text-[11px] font-bold text-gray-900 block">{step.deliverable}</span>
                  <span className="text-[9px] font-bold text-secondary-indigo uppercase block mt-2">Timeline</span>
                  <span className="text-[10px] font-bold text-gray-500 block">{step.timeline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: SERVICE MATRIX */}
      <section className="py-16 md:py-28 relative z-10 bg-white border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
              Our White-Label <span className="text-gradient-cyan">Service Matrix</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              Deliver comprehensive technical solutions to your clients under your own agency envelope.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesMatrix.map((matrix, idx) => {
              const Icon = matrix.icon;
              return (
                <div key={idx} className="bg-[#F9FAFB]/50 p-8 rounded-[2.5rem] border border-gray-200/60 shadow-sm">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${matrix.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-950 text-lg mb-6 border-b border-gray-150 pb-2">{matrix.title}</h3>
                  <ul className="space-y-3.5 text-xs font-semibold text-gray-500">
                    {matrix.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: TECH STACK */}
      <section className="py-16 md:py-28 relative z-10 bg-[#F9FAFB] border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
              Built on Modern <span className="text-gradient-purple">Tech Stacks</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              We write clean, typed code adhering to international deployment parameters.
            </p>
          </div>

          <div className="flex justify-center flex-wrap gap-2.5 mb-12 max-w-2xl mx-auto">
            {Object.keys(techStack).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTechTab(tab)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                  activeTechTab === tab
                    ? "bg-secondary-indigo border-secondary-indigo text-white shadow-md shadow-secondary-indigo/25"
                    : "bg-white border-gray-200 text-gray-600 hover:border-secondary-indigo/30"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white border border-gray-200/60 p-8 rounded-3xl max-w-3xl mx-auto shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {techStack[activeTechTab as keyof typeof techStack].map((tech, i) => (
                <div key={i} className="bg-[#F9FAFB] p-5 rounded-2xl border border-gray-200/60 text-center font-bold text-gray-900 text-sm hover:border-secondary-indigo/20 transition-all">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: COMMUNICATION PROCESS */}
      <section className="py-16 md:py-28 relative z-10 bg-white border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
              Asynchronous & <span className="text-gradient-cyan">Reliable Communication</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              No messaging friction. We slip into your operational channels without skipping a beat.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {commProcess.map((item, idx) => (
              <div key={idx} className="bg-[#F9FAFB]/50 p-8 rounded-[2rem] border border-gray-200/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-secondary-indigo/5 text-secondary-indigo flex items-center justify-center mb-6">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-950 text-lg mb-3">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: SECURITY & NDA */}
      <section className="py-16 md:py-28 relative z-10 bg-[#F9FAFB] border-b border-gray-200/60">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/5 border border-rose-500/15 mb-8">
            <ShieldCheck className="w-4 h-4 text-rose-600 animate-pulse" />
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Client Protection Protocol</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 tracking-tight">
            Security, NDA, & Code Ownership
          </h2>
          <p className="text-gray-500 text-lg md:text-xl mb-12 font-medium leading-relaxed max-w-3xl mx-auto">
            We operate strictly under contract. We maintain absolute confidentiality regarding your databases, user keys, and Figma assets.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-8 rounded-[2rem] border border-gray-200/60 shadow-sm">
              <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-rose-600" />
                100% NDA Protection
              </h4>
              <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                Standard mutual NDAs are signed before project file transfers occur.
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-gray-200/60 shadow-sm">
              <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-rose-600" />
                Generic Git Commit Handles
              </h4>
              <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                Clean repositories with anonymous handles. CoreSlash remains completely invisible.
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-gray-200/60 shadow-sm">
              <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Server className="w-4 h-4 text-rose-600" />
                Secure Databases
              </h4>
              <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                We handle credentials using secure key vaults and encrypted environment configurations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: ENGAGEMENT MODELS */}
      <section id="engagement" className="py-16 md:py-28 relative z-10 bg-white border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Flexible <span className="text-gradient-purple">Engagement Models</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {engagementModels.map((model, idx) => (
              <div key={idx} className="bg-[#F9FAFB] p-8 md:p-12 rounded-[2.5rem] border border-gray-200/60 shadow-sm flex flex-col justify-between hover:border-secondary-indigo/25 transition-all">
                <div className="space-y-6">
                  <h4 className="font-black text-gray-900 text-xl border-b border-gray-150 pb-4">{model.title}</h4>
                  <span className="text-lg font-bold text-secondary-indigo block">{model.price}</span>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold">{model.desc}</p>
                </div>
                <ul className="space-y-3 mt-8 border-t border-gray-150 pt-6 text-xs font-semibold text-gray-600">
                  {model.perks.map((perk, perkIdx) => (
                    <li key={perkIdx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* SECTION 9: FAQ */}
      <section className="py-16 md:py-28 relative z-10 bg-[#F9FAFB] border-b border-gray-200/60">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight text-center mb-16 md:mb-24">
            Partnership <span className="text-gradient-purple">FAQs</span>
          </h2>
          <div className="space-y-4">
            {faqItems.map((faq, idx) => (
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

      {/* SECTION 10: FINAL CTA & SCHEDULER PANEL */}
      <section className="py-16 md:py-28 relative z-10 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative rounded-[3.5rem] overflow-hidden bg-white border border-gray-200/60 shadow-xl p-10 md:p-20 grid lg:grid-cols-12 gap-12 items-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/3 to-secondary-indigo/3 pointer-events-none" />
            
            <div className="lg:col-span-6 space-y-6 relative z-10 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                Secure Your <span className="text-gradient-cyan">Engineering Sprints</span>
              </h2>
              <p className="text-gray-500 text-base md:text-lg font-medium max-w-xl mx-auto lg:mx-0">
                Book a 15-minute alignment call with our partnership team. We'll outline contract parameters, sign NDAs, and assign developers.
              </p>
              
              <ul className="space-y-4 text-xs font-semibold text-gray-600 text-left max-w-md mx-auto lg:mx-0">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary-indigo/5 text-secondary-indigo flex items-center justify-center font-bold">1</div>
                  <span>**15-Min Intro Call**: Align on agency size, tech stack, and roadmap targets.</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary-indigo/5 text-secondary-indigo flex items-center justify-center font-bold">2</div>
                  <span>**Project Scoping**: Analyze design briefs and database constraints.</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary-indigo/5 text-secondary-indigo flex items-center justify-center font-bold">3</div>
                  <span>**Pilot Launch**: Assign your dedicated team and launch a sandbox pilot.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6 relative z-10 bg-white p-6 md:p-8 border border-gray-200 rounded-[2.5rem] shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Book a Partnership Call</h3>
              <p className="text-xs text-gray-400 font-semibold mb-6">Complete the brief below to launch scheduling page details.</p>
              <ContactForm variant="default" service="Agency Partnership Call" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

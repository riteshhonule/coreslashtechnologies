import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Sparkles, 
  ChevronDown, 
  ArrowRight, 
  Check, 
  Lock, 
  Scale, 
  Settings, 
  Activity, 
  Building2, 
  Users, 
  TrendingUp 
} from "lucide-react";

import ServiceLayout from "./ServicesLayout";
import { useModal } from "../../context/ModalContext";
import software_hero_splash from "../../img/software/CoreslashTechnologies-software.webp";
import software_hero_splashAvif from "../../img/software/CoreslashTechnologies-software.avif";
import SEO from "../../components/SEO";

export default function SoftwareDevelopment() {
  const { openModal } = useModal();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Structured schemas
  const pageUrl = "https://coreslashtechnologies.com/services/software-development";
  
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Custom Software Development Services",
    "serviceType": "Software Engineering & Architecture",
    "provider": {
      "@type": "Organization",
      "name": "CoreSlash Technologies",
      "url": "https://coreslashtechnologies.com"
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "India" },
      { "@type": "AdministrativeArea", "name": "Belagavi" },
      { "@type": "AdministrativeArea", "name": "Karnataka" }
    ],
    "description": "Enterprise-grade custom software development, API design, legacy modernization, and scalable cloud application development in Belagavi."
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://coreslashtechnologies.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://coreslashtechnologies.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Custom Software Development",
        "item": pageUrl
      }
    ]
  };

  const faqsList = [
    {
      q: "What is the difference between custom software development and buying commercial SaaS?",
      a: "Custom software development is a bespoke process where the application's logic, database design, user interfaces, and API integrations are engineered specifically for your company's proprietary workflows. This grants you 100% intellectual property (IP) ownership, eliminates recurring monthly per-seat licensing fees, and guarantees that the software adapts to your scaling needs, rather than forcing your operations to conform to a rigid third-party platform."
    },
    {
      q: "How do you calculate development costs for a custom software project in Belagavi?",
      a: "Our estimation model is based on technical scoping, database schema complexity, integration density (number of external APIs), and the estimated developer sprints required. We begin with a free scoping session to map user journeys and wireframes, followed by a detailed technical proposal with fixed milestones. This protects local businesses from budget overruns and timeline drag."
    },
    {
      q: "Do we retain complete intellectual property (IP) ownership of the software?",
      a: "Yes. CoreSlash Technologies signs standard non-disclosure agreements (NDAs) and intellectual property transfer agreements prior to initiating any development. Once final milestones are cleared, the custom source code, documentation, and cloud infrastructure access are transferred entirely to your organization."
    },
    {
      q: "How does CoreSlash handle legacy modernization for older enterprise applications?",
      a: "Our legacy modernization starts with a code and database audit. We extract core business logic and map out safe migration pathways. We decouple old monolithic architectures into scalable microservices using modern backend platforms (like Node.js, NestJS, and Python) and frontend libraries (React/Next.js) while ensuring zero data loss during PostgreSQL or MongoDB database transitions."
    },
    {
      q: "What is your development methodology, and how are we kept updated during the build?",
      a: "We implement an Agile Scrum methodology. Development is divided into 2-week sprints. At the end of each sprint, we host live video demonstrations showing working software builds. We also provide access to project management boards (Jira or ClickUp) and direct communication channels on Slack or Microsoft Teams."
    },
    {
      q: "How do you secure custom enterprise applications from cybersecurity threats?",
      a: "Security is embedded into every layer of our Software Development Life Cycle (SDLC). We apply OWASP Top 10 guidelines, perform regular static and dynamic code audits, encrypt data at rest (using AES-256) and in transit (via HTTPS/TLS), and configure strict IAM database permissions. We also recommend scheduling bi-annual penetration tests."
    },
    {
      q: "Can custom software integrate with our existing ERP and CRM systems?",
      a: "Yes. Our team specializes in building custom RESTful and GraphQL API gateways that connect your new custom applications with legacy ERP systems (like SAP or Oracle) or cloud CRM platforms (like Salesforce). This unifies data streams across your operations."
    },
    {
      q: "What programming languages and frameworks do your developers specialize in?",
      a: "Our engineering team has deep expertise in modern frontend frameworks (React, Next.js, Angular, Vue), scalable backend platforms (Node.js, NestJS, Python FastAPI, Laravel, Spring Boot, .NET Core), cross-platform mobile frameworks (Flutter, React Native), and cloud environments (AWS, Azure, Google Cloud)."
    },
    {
      q: "How do you optimize applications to handle high user concurrency and traffic spikes?",
      a: "We design cloud-native architectures that utilize containerization (Docker) and cluster orchestration (Kubernetes). By leveraging automated horizontal pod autoscaling and serverless compute triggers (like AWS Lambda), our custom databases and APIs dynamically scale resources to absorb traffic surges without slowing down."
    },
    {
      q: "What are your post-launch support and SLA maintenance policies?",
      a: "We offer comprehensive Service Level Agreements (SLAs) tailored to your operational needs. These include 24/7 server monitoring, database backup checks, security patch deployments, and bug-fix sprint allocations to ensure your software remains secure and functional post-launch."
    },
    {
      q: "Do you build offline-first applications for environments with unstable networks?",
      a: "Yes. For logistics, field service, and agricultural businesses operating in low-network regions, we design offline-first databases (using SQLite, IndexedDB, or Room). The software runs locally on client devices and automatically syncs data with cloud servers once a connection is restored."
    },
    {
      q: "What compliance standards do your custom systems adhere to?",
      a: "We build systems matching industry-specific compliance requirements, such as HIPAA standards for healthcare databases, GDPR frameworks for data privacy, and ISO standards for manufacturing inspection software."
    },
    {
      q: "How does custom software lower long-term operating costs?",
      a: "While custom software has higher initial setup costs, it eliminates the scaling bottleneck of SaaS platforms. As your company grows from 50 to 500 users, your software costs do not increase, since you do not pay per-seat licensing fees. Additionally, bespoke workflow automation reduces manual staff overheads."
    },
    {
      q: "Can you build MVP applications for tech startups seeking seed funding?",
      a: "Yes. We operate a dedicated startup MVP pipeline. We help founders narrow their feature scope to build a Minimum Viable Product (MVP) within 6 to 8 weeks, providing a secure, modular codebase that investors can trust and developers can scale later."
    },
    {
      q: "Where is CoreSlash Technologies located, and do you work with international clients?",
      a: "Our headquarters are based in Belagavi, Karnataka, India. We collaborate with regional enterprises in Karnataka, Maharashtra, and Goa, and operate a secure remote delivery model serving international clients across North America, Middle East, and Europe."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsList.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <ServiceLayout
      title="Custom Software Development"
      subtitle="Engineering high-performance enterprise systems, custom APIs, and scalable database architectures."
      ctaText="Schedule Technical Scoping"
    >
      <SEO
        title="Custom Software Development in Belagavi | CoreSlash Technologies"
        description="Premium B2B custom software engineering, legacy system modernization, API design, and cloud database development in Belagavi. Request a scoping session."
        structuredData={[serviceSchema, faqSchema, breadcrumbSchema]}
        canonicalUrl={pageUrl}
      />

      <div className="bg-[#F9FAFB] text-gray-900 font-sans leading-relaxed pb-20">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-12 md:pt-20 pb-16 overflow-hidden bg-gradient-to-b from-[#0c081d]/5 to-transparent">
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <div className="flex justify-center items-center gap-2 mb-6 text-primary-purple font-bold tracking-[0.2em] uppercase text-xs">
              <Sparkles className="w-4 h-4" />
              Custom Enterprise Engineering
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight max-w-5xl mx-auto">
              Bespoke <span className="text-gradient-purple">Software Systems</span> Engineered for Scale
            </h1>
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
              We design, build, and deploy custom enterprise databases, secure APIs, and responsive web platforms. Transform manual bottlenecks into automated B2B workflows.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={openModal}
                className="px-8 py-3.5 bg-gradient-to-r from-primary-purple to-[#737CFD] text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                Start Free Scoping Session
              </button>
              <a
                href="#overview"
                className="px-8 py-3.5 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all inline-flex items-center gap-1.5"
              >
                Read Technical Guide
              </a>
            </div>

            {/* Visual Callout Container */}
            <div className="relative max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden border border-gray-200 shadow-2xl bg-white">
              <picture className="w-full h-auto object-cover flex items-center justify-center">
                <source srcSet={software_hero_splashAvif} type="image/avif" />
                <img
                  src={software_hero_splash}
                  alt="Custom software engineering and system architecture planning at CoreSlash Belagavi"
                  loading="eager"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
              </picture>
            </div>
          </div>
        </section>

        {/* ================= OVERVIEW SECTION ================= */}
        <section id="overview" className="py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-200 shadow-md">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 tracking-tight">
                Evaluating the Shift to Custom B2B Software Architectures
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-600 leading-relaxed font-medium">
                <div className="space-y-4">
                  <p>
                    For growing enterprises, relying on generic off-the-shelf software or standard subscription-based SaaS tools eventually creates operational friction. Mismatched database structures, rigid user permission layers, and a lack of direct API access force teams into manual workarounds. Businesses throughout the Karnataka-Maharashtra-Goa manufacturing and retail corridors require software designed to map their unique processes.
                  </p>
                  <p>
                    At CoreSlash Technologies, we act as strategic engineering partners. We perform in-depth systems scoping, analyze database normalization requirements, and deploy modular codebases. By developing custom web platforms, mobile apps, and database pipelines locally in Belagavi, we help enterprises automate workflows and gain 100% intellectual property (IP) control of their digital systems.
                  </p>
                </div>
                <div className="space-y-4">
                  <p>
                    A primary advantage of custom engineering is the elimination of per-user licensing fees. As your operations expand from 50 to 500 employees, your software costs remain flat, maximizing B2B margins. Additionally, bespoke systems guarantee data residency compliance and allow the injection of custom AI tools and SCADA automation modules.
                  </p>
                  <p>
                    Whether you need to modernization legacy desktop codebases, transition databases to AWS, or launch a multi-tenant SaaS platform, our engineering teams build systems to your exact specifications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= COMPARISON TABLE ================= */}
        <section className="py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">Custom Software vs. Off-the-Shelf SaaS</h2>
              <p className="text-gray-500 text-sm max-w-xl mx-auto">Analyze the long-term cost, ownership, and scalability benefits of custom builds.</p>
            </div>
            
            <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-sm bg-white">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-200">
                    <th className="p-6">Feature / Metric</th>
                    <th className="p-6">Custom Software Development</th>
                    <th className="p-6">Commercial Off-the-Shelf SaaS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-6 font-bold text-gray-900">IP & Code Ownership</td>
                    <td className="p-6 text-green-600">100% Ownership. Code transferred upon launch.</td>
                    <td className="p-6 text-red-600">0% Ownership. Bound to vendor terms and lock-in.</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-6 font-bold text-gray-900">Scaling Costs</td>
                    <td className="p-6 text-green-600">Zero per-user licensing fees. Scale infinitely.</td>
                    <td className="p-6 text-red-600">Monthly per-seat subscription overheads.</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-6 font-bold text-gray-900">Integration Density</td>
                    <td className="p-6">Custom API webhooks connecting offline & online systems.</td>
                    <td className="p-6">Rigid, pre-built modules requiring paid plugins.</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-6 font-bold text-gray-900">Database Control</td>
                    <td className="p-6">Direct access, custom schema design, local hosting.</td>
                    <td className="p-6">Restricted data access, shared cloud servers.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ================= BUSINESS PROBLEMS SOLVED ================= */}
        <section className="py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900 tracking-tight">
              B2B Operational Problems We Resolve
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Fragmented Spreadsheet Workflows", desc: "We replace manual, error-prone spreadsheets with normalized database systems and single-dashboard interfaces." },
                { title: "Database Query Bottlenecks", desc: "We optimize database indexes, rewrite SQL queries, and implement connection pools to eliminate workflow latency." },
                { title: "Rigid API Gaps", desc: "We build custom RESTful and GraphQL API gateways that sync CRM, warehouse, and accounting systems in real-time." },
                { title: "Legacy System Vulnerability", desc: "We modernize unsupported legacy desktop codebases to secure, cloud-native backend and frontend environments." }
              ].map((prob, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-red-500/5 flex items-center justify-center text-red-500 mb-4 font-bold">
                    !
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-base">{prob.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">{prob.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= INDUSTRIES SERVED ================= */}
        <section className="py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900 tracking-tight">
              Sectors Benefiting from Custom Software
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Manufacturing & Foundries", desc: "SCADA dashboards, inventory trackers, and mill workflow automation." },
                { title: "Healthcare & Clinics", desc: "EMR security, clinic schedulers, LIMS setups, and HIPAA compliance." },
                { title: "Education & VTU Colleges", desc: "Student enrollment portals, grading logs, and resource booking trackers." },
                { title: "Retail & E-commerce", desc: "POS checkout terminals, custom Shopify checkouts, and shipping API connections." }
              ].map((ind, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <span className="font-bold text-gray-900 block mb-2 text-sm">{ind.title}</span>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">{ind.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FEATURES SECTION ================= */}
        <section className="py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900 tracking-tight">
              Bespoke Software Engineering Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Dynamic API Gateways", desc: "We design and document secure RESTful and GraphQL endpoints, allowing your internal databases to sync with delivery providers and banking APIs." },
                { title: "Role-Based Access Control", desc: "We configure fine-grained user permission layers, ensuring employees only access data inputs matching their corporate role." },
                { title: "Offline-First Database Synchronization", desc: "For logistics and agricultural teams working in low-network regions, our databases run locally and sync automatically when connected." }
              ].map((feat, idx) => (
                <div key={idx} className="p-8 bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">{feat.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">{feat.desc}</p>
                  </div>
                  <span className="text-primary-purple text-xs font-black tracking-widest mt-6 block">ENTERPRISE SYSTEM</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= DEVELOPMENT PROCESS ================= */}
        <section className="py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-gray-900 tracking-tight">
              Our Agile Development Life Cycle
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 text-center">
              {[
                { step: "01", name: "Scoping", desc: "User journeys & wireframes." },
                { step: "02", name: "DB Design", desc: "Schema normalization." },
                { step: "03", name: "Sprints", desc: "2-week coding cycles." },
                { step: "04", name: "QA Sync", desc: "Automated unit tests." },
                { step: "05", name: "Launch", desc: "Safe AWS deployment." },
                { step: "06", name: "SLA Care", desc: "24/7 server monitoring." }
              ].map((proc, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <span className="text-3xl font-extrabold text-[#737CFD] block mb-2">{proc.step}</span>
                  <span className="font-bold text-gray-900 block mb-1 text-sm">{proc.name}</span>
                  <p className="text-[10px] text-gray-500 leading-relaxed font-medium">{proc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TECHNOLOGIES USED ================= */}
        <section className="py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900 tracking-tight">
              Verified Tech Stacks Deployed
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Frontend Libraries", items: ["React & Next.js", "Angular", "Vue.js", "Tailwind CSS"] },
                { title: "Backend Platforms", items: ["Node.js & NestJS", "Python FastAPI", "Laravel (PHP)", "Spring Boot"] },
                { title: "Database Systems", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis Cache"] },
                { title: "Cloud & DevOps", items: ["AWS Cloud Engine", "Docker Containers", "Kubernetes Clusters", "Terraform IAC"] }
              ].map((stack, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <span className="font-bold text-gray-900 block mb-3 text-sm">{stack.title}</span>
                  <ul className="space-y-1.5 text-xs text-gray-500 font-semibold">
                    {stack.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#737CFD]" /> {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ARCHITECTURE, SECURITY, COMPLIANCE ================= */}
        <section className="py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Systems Architecture */}
              <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-purple-500/5 flex items-center justify-center text-purple-600 mb-6">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Scalable Systems Architecture</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  We design decoupled microservices and event-driven database pipelines. By separating frontend render systems from database query layers, our custom applications scale smoothly.
                </p>
              </div>

              {/* Data Security */}
              <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-red-500/5 flex items-center justify-center text-red-600 mb-6">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Enterprise Cybersecurity</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  We encrypt database tables (AES-256), sanitize user form inputs to prevent SQL injections, deploy HTTPS/TLS transit tunnels, and run automated static code security audits during compile steps.
                </p>
              </div>

              {/* B2B Compliance */}
              <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-green-500/5 flex items-center justify-center text-green-600 mb-6">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Regulatory Compliance</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  Our databases are configured to support industry-specific compliance requirements, including HIPAA rules for patient charts, GDPR encryption standards, and ISO quality guidelines for manufacturing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= why choose us ================= */}
        <section className="py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-[#737CFD]/5 p-8 md:p-12 rounded-[2.5rem] border border-[#737CFD]/15 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 tracking-tight">Why Choose CoreSlash as Your Engineering Partner</h2>
              <p className="text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mb-6">
                Unlike typical agencies that build simple WordPress templates, CoreSlash is a dedicated engineering firm. Our technical consultants hold degrees in computer science and extensive experience design. We combine transparent sprints (2-week video demos) with strict NDA security compliance to ensure your software project is built correctly and delivered on time.
              </p>
              <div className="flex justify-center gap-6 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <span>✓ 100% NDA Protection</span>
                <span>•</span>
                <span>✓ Verified Sprints</span>
                <span>•</span>
                <span>✓ Complete IP Ownership</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section id="faqs" className="py-12 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqsList.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={index}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <button 
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-6 cursor-pointer text-left focus:outline-none"
                    >
                      <span className="font-bold text-gray-900 pr-4 text-sm">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary-purple" : ""}`} />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-6 pb-6 text-xs text-gray-500 leading-relaxed font-medium border-t border-gray-50 pt-4">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= CALL TO ACTION ================= */}
        <section className="py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-gradient-to-br from-[#0c081d] to-[#1a1438] p-10 md:p-16 rounded-[3rem] text-white text-center relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(115,124,253,0.1),transparent_50%)] pointer-events-none" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">Ready to Scope Your Software Project?</h2>
                <p className="text-white/70 text-sm md:text-base mb-8 leading-relaxed">
                  Partner with CoreSlash to resolve operational bottlenecks. Request a free scoping session to plan database schemas, wireframe user flows, and get a milestone-based cost estimation.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={openModal} className="px-8 py-3.5 bg-white text-primary-purple font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
                    Schedule Free Technical Scoping
                  </button>
                  <a href="/contact" className="px-8 py-3.5 bg-transparent border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-colors">
                    Contact Our Engineers
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Alt Guidelines references */}
        <div className="sr-only">
          <h4>Metadata Alt and Internal Linking References:</h4>
          <ul>
            <li><strong>Hero Image Alt:</strong> Custom software development database architecture mapping and dashboard coding.</li>
            <li><strong>Sitemap Position:</strong> Child of /services directory.</li>
            <li><strong>Related Services:</strong> <a href="/services/website-development">Web Application Development</a>, <a href="/services/app-development">Mobile Application Development</a>, <a href="/services/ai-solutions">AI Development Services</a>.</li>
            <li><strong>Suggested Blog Link:</strong> <a href="/blog/software-development-cost-belagavi">Software Development Cost Scoping Guide</a>.</li>
          </ul>
        </div>

      </div>
    </ServiceLayout>
  );
}

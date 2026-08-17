import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu, Bot, Database, Sparkles, Zap, Brain } from "lucide-react";
import EngagementModels from "@/components/web-development/EngagementModels";
import ProcessTimeline from "@/components/web-development/ProcessTimeline";
import FaqSection, { type FaqData } from "@/components/ui/habit-faq-scroller";
import { CoreServiceCard } from "@/components/web-development/CoreServices";
import CTASection from "@/components/web-development/CTASection";
import {
  SiPython, SiPytorch, SiTensorflow, SiDocker
} from "react-icons/si";
import aiHeroBg from "@/assets/services/ai-automation/coreslash-technologies-ai-development-services.webp";

// ----------------------------------------------------
// SCHEMA
// ----------------------------------------------------
const aiSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Automation & Autonomous LLM Agents",
  "url": "https://coreslashtechnologies.com/services/ai-automation",
  "provider": {
    "@type": "Organization",
    "name": "CoreSlash Technologies",
    "url": "https://coreslashtechnologies.com/",
    "logo": "https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png"
  },
  "serviceType": "AI Automation",
  "description": "Build AI-powered workflows, custom LLM fine-tuning, RAG vector search, autonomous AI agents, and intelligent process automation with CoreSlash Technologies.",
  "areaServed": "Worldwide"
};

// ----------------------------------------------------
// TECH STACK DATA
// ----------------------------------------------------
const LLM_TECHS = [
  { name: "GPT-4o & LLMS", icon: <Brain className="w-6 h-6 text-purple-400" />, color: "#A855F7" },
  { name: "CLAUDE 3.5", icon: <Sparkles className="w-6 h-6 text-amber-400" />, color: "#F59E0B" },
  { name: "PYTHON", icon: <SiPython className="w-6 h-6" />, color: "#3776AB" },
  { name: "PYTORCH", icon: <SiPytorch className="w-6 h-6" />, color: "#EE4C2C" },
  { name: "TENSORFLOW", icon: <SiTensorflow className="w-6 h-6" />, color: "#FF6F00" }
];

const AGENT_TECHS = [
  { name: "LANGCHAIN", icon: <Bot className="w-6 h-6 text-blue-400" />, color: "#3178C6" },
  { name: "LLAMAINDEX", icon: <Cpu className="w-6 h-6 text-purple-400" />, color: "#7F52FF" },
  { name: "CREWAI", icon: <Sparkles className="w-6 h-6 text-cyan-400" />, color: "#00ADD8" },
  { name: "AUTOGEN", icon: <Zap className="w-6 h-6 text-amber-400" />, color: "#F7DF1E" }
];

const VECTOR_TECHS = [
  { name: "PINECONE & QDRANT", icon: <Database className="w-6 h-6 text-emerald-400" />, color: "#3DDC84" },
  { name: "CHROMADB", icon: <Database className="w-6 h-6 text-rose-400" />, color: "#FF2D20" },
  { name: "DOCKER CONTAINER", icon: <SiDocker className="w-6 h-6" />, color: "#2496ED" }
];

// ----------------------------------------------------
// FAQ DATA
// ----------------------------------------------------
const aiFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Everything you need to know about our AI automation engineering, custom LLM integration, and agentic workflows.",
  rows: [
    {
      id: "row1",
      speed: "48s",
      direction: "left",
      faqItems: [
        {
          id: "q1",
          question: "What AI automation solutions do you engineer?",
          answer: "CoreSlash engineers autonomous agentic workflows, custom LLM fine-tuning, Retrieval-Augmented Generation (RAG) vector pipelines, intelligent document extraction, and enterprise AI chatbots."
        },
        {
          id: "q2",
          question: "How do you ensure our enterprise data remains private?",
          answer: "CoreSlash deploys models inside private cloud VPC environments with zero-retention API agreements, end-to-end data encryption, and isolated vector database storage."
        },
        {
          id: "q3",
          question: "Can AI agents integrate with our CRM and databases?",
          answer: "Yes! CoreSlash integrates custom AI agents directly with Salesforce, HubSpot, PostgreSQL, SAP, Shopify, and custom REST/GraphQL microservices."
        }
      ]
    },
    {
      id: "row2",
      speed: "42s",
      direction: "right",
      faqItems: [
        {
          id: "q4",
          question: "What is the typical deployment timeline for an AI workflow?",
          answer: "Initial functional AI prototypes take 2-3 weeks, while full enterprise multi-agent automation systems are deployed in 6-10 weeks."
        },
        {
          id: "q5",
          question: "How do you prevent LLM hallucination?",
          answer: "CoreSlash utilizes strict Retrieval-Augmented Generation (RAG), ground truth context verification, deterministic prompt guardrails, and human-in-the-loop validation checkpoints."
        },
        {
          id: "q6",
          question: "Do you provide model drift and latency telemetry?",
          answer: "Yes, CoreSlash sets up 24/7 latency telemetry dashboards, model drift monitoring, continuous prompt evaluation, and SLAs for ongoing fine-tuning."
        }
      ]
    }
  ]
};

export default function AIAutomation() {
  const [activeTechTab, setActiveTechTab] = useState<"LLMS & MODELS" | "AGENTIC & RAG" | "VECTOR DATABASES">("LLMS & MODELS");

  const getTechsForTab = () => {
    switch (activeTechTab) {
      case "LLMS & MODELS":
        return LLM_TECHS;
      case "AGENTIC & RAG":
        return AGENT_TECHS;
      case "VECTOR DATABASES":
        return VECTOR_TECHS;
      default:
        return LLM_TECHS;
    }
  };

  return (
    <div className="w-full bg-background min-h-screen">
      <Helmet>
        <title>AI Automation & Custom LLM Agent Development | CoreSlash Technologies</title>
        <meta
          name="description"
          content="Accelerate enterprise operations with custom AI agents, autonomous workflows, LLM fine-tuning, RAG vector search, and intelligent process automation."
        />
        <link rel="canonical" href="https://coreslashtechnologies.com/services/ai-automation" />

        {/* Open Graph SEO */}
        <meta property="og:title" content="AI Automation & Custom LLM Agent Development | CoreSlash Technologies" />
        <meta property="og:description" content="Accelerate enterprise operations with custom AI agents, autonomous workflows, LLM fine-tuning, RAG vector search, and intelligent process automation." />
        <meta property="og:url" content="https://coreslashtechnologies.com/services/ai-automation" />
        <meta property="og:type" content="website" />

        {/* Twitter Card SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Automation & Custom LLM Agent Development | CoreSlash Technologies" />
        <meta name="twitter:description" content="Accelerate enterprise operations with custom AI agents, autonomous workflows, LLM fine-tuning, RAG vector search, and intelligent process automation." />

        <script type="application/ld+json">{JSON.stringify(aiSchema)}</script>
      </Helmet>

      {/* ========================================================
          1. HERO SECTION
          ======================================================== */}
      <section
        className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-start overflow-hidden py-8 md:py-12 px-6 md:px-12 lg:px-24 bg-slate-950"
        style={{
          backgroundImage: `url(${aiHeroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent)] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] w-full text-left space-y-4 md:space-y-5">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide text-slate-400 uppercase"
          >
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-blue-400 font-semibold">AI Automation</span>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs md:text-sm font-semibold tracking-wide backdrop-blur-md"
          >
            <Cpu className="w-4 h-4 text-blue-400 animate-pulse" />
            <span>AI & Autonomous Agentic Workflows</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl"
          >
            Autonomous AI Agents &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
              Intelligent Workflow Automation
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl leading-relaxed font-normal"
          >
            CoreSlash AI automation services engineer custom LLM architectures, retrieval-augmented generation (RAG) pipelines, autonomous multi-agent systems, and fine-tuned AI workflows designed to eliminate repetitive operational overhead.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm md:text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Schedule AI Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-sm md:text-base backdrop-blur-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Explore AI Systems</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          2. CORE SERVICES SECTION
          ======================================================== */}
      <section className="relative w-full py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-background border-t border-border/40">
        <div className="max-w-[1400px] mx-auto">

          {/* Header */}
          <div className="flex flex-col items-start gap-4 mb-16 text-left">
            <div className="flex items-center">
              <div className="w-[3px] h-6 bg-blue-600 rounded-full mr-3" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                AI Capabilities
              </h3>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
              Enterprise AI & Automation Solutions
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl">
              CoreSlash designs and deploy custom artificial intelligence systems that automate complex business logic, structure unstructured data, and transform executive decision making.
            </p>
          </div>

          {/* 4 Core Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CoreServiceCard
              number="01"
              title="Custom LLM Fine-Tuning & RAG"
              subtext="Domain-specific model fine-tuning and retrieval-augmented generation (RAG) vector search."
              highlight="Llama 3 & GPT-4 domain training paired with Pinecone/Qdrant vector retrieval for zero-hallucination accuracy."
              darkBg={true}
              delay={0.1}
            />

            <CoreServiceCard
              number="02"
              title="Autonomous Multi-Agent Systems"
              subtext="Autonomous AI agentic frameworks that execute complex multi-step procedures automatically."
              highlight="CrewAI, AutoGen, and LangChain agents that parse documents, generate reports, and trigger API actions."
              delay={0.2}
            />

            <CoreServiceCard
              number="03"
              title="Intelligent Enterprise Chatbots"
              subtext="Conversational AI assistants integrated with internal knowledge bases and CRM tools."
              highlight="Omni-channel bot integration across Slack, WhatsApp, Salesforce, and custom React web apps."
              delay={0.3}
            />

            <CoreServiceCard
              number="04"
              title="Predictive Analytics & Machine Learning"
              subtext="Machine learning models for demand forecasting, customer churn prediction, and telemetry analysis."
              highlight="Automated statistical forecasting models delivering real-time operational insights."
              delay={0.4}
            />
          </div>

        </div>
      </section>

      {/* ========================================================
          3. PROCESS TIMELINE
          ======================================================== */}
      <ProcessTimeline />

      {/* ========================================================
          4. ENGAGEMENT MODELS
          ======================================================== */}
      <EngagementModels />

      {/* ========================================================
          5. TECH STACK SECTION
          ======================================================== */}
      <section className="relative w-full py-16 md:py-24 border-t border-border/40 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
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
              State-of-the-Art AI Frameworks
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 border-b border-border/40 mb-8 py-2">
            {(["LLMS & MODELS", "AGENTIC & RAG", "VECTOR DATABASES"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTechTab(tab)}
                className={`relative px-4 py-2 text-sm md:text-base font-medium tracking-wider transition-colors duration-300 uppercase focus:outline-none ${activeTechTab === tab ? "text-blue-600 dark:text-blue-400 font-bold" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {tab}
                {activeTechTab === tab && (
                  <motion.div
                    layoutId="activeTabUnderlineAi"
                    className="absolute bottom-0 inset-x-0 h-[3px] bg-blue-600 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[140px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTechTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
              >
                {getTechsForTab().map((tech, idx) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.04, duration: 0.25 }}
                    whileHover={{ y: -4 }}
                    className="group relative flex items-center gap-4 p-4 md:p-5 h-[80px] bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)] hover:border-blue-500/50 dark:hover:border-blue-500/50 cursor-pointer transition-all duration-300"
                  >
                    <div
                      className="flex items-center justify-center w-12 h-12 text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm shrink-0"
                      style={{ color: tech.color }}
                    >
                      {tech.icon}
                    </div>
                    <span className="font-medium text-foreground text-sm tracking-tight truncate">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. FAQ SECTION
          ======================================================== */}
      <section className="w-full py-16 md:py-24 border-t border-border/40 overflow-hidden bg-background">
        <FaqSection data={aiFaqData} />
      </section>

      {/* ========================================================
          7. CTA SECTION
          ======================================================== */}
      <CTASection />
    </div>
  );
}

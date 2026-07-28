import React from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { useModal } from "../context/ModalContext";
import { 
  Code, 
  Server, 
  Database, 
  Cloud, 
  Cpu, 
  Terminal,
  Layers,
  Sparkles,
  ArrowRight
} from "lucide-react";

const techCategories = [
  {
    title: "Frontend Engineering",
    icon: Code,
    desc: "Interactive, pixel-perfect, and highly responsive user interfaces built on modern component structures.",
    techs: [
      { name: "React", desc: "For dynamic SPAs and component modularity" },
      { name: "Next.js", desc: "For SSR, static rendering, and SEO speed" },
      { name: "HTML5 & CSS3", desc: "Clean semantic markup and styling structures" },
      { name: "Tailwind CSS", desc: "For modern utility-first layouts" },
      { name: "Vite", desc: "Fast build orchestration tool" }
    ],
    color: "text-blue-600 bg-blue-50 border-blue-200/50 shadow-blue-500/5"
  },
  {
    title: "Backend Core",
    icon: Server,
    desc: "Robust REST & GraphQL APIs, microservices architectures, and event-driven systems built for concurrency.",
    techs: [
      { name: "NestJS", desc: "Modular framework for scalable APIs" },
      { name: "Node.js", desc: "Event-driven asynchronous backend runtime" },
      { name: "Python", desc: "For high-performance data processing" },
      { name: "FastAPI / Django", desc: "Robust API construction and routing engines" }
    ],
    color: "text-purple-600 bg-purple-50 border-purple-200/50 shadow-purple-500/5"
  },
  {
    title: "Databases & Cache",
    icon: Database,
    desc: "Optimized relational tables, high-throughput caching layers, and elastic document storages.",
    techs: [
      { name: "PostgreSQL", desc: "Robust, ACID-compliant relational engine" },
      { name: "MySQL", desc: "Consistent and standard relational storage" },
      { name: "MongoDB", desc: "Flexible document-based database models" },
      { name: "Redis", desc: "Ultra-fast in-memory caching and session queues" }
    ],
    color: "text-amber-600 bg-amber-50 border-amber-200/50 shadow-amber-500/5"
  },
  {
    title: "Cloud & DevOps Infrastructure",
    icon: Cloud,
    desc: "Automated delivery pipelines, secure sandbox deployments, CDNs, and robust load balancing.",
    techs: [
      { name: "AWS Services", desc: "EC2, S3, RDS, Lambda, and secure IAM" },
      { name: "Docker", desc: "Containerization for consistent staging builds" },
      { name: "NGINX", desc: "High-performance reverse proxy routing" },
      { name: "CI / CD Pipelines", desc: "GitHub Actions automation and automated tests" },
      { name: "Linux / Git", desc: "Sanitized code commits and server deployments" }
    ],
    color: "text-teal-600 bg-teal-50 border-teal-200/50 shadow-teal-500/5"
  },
  {
    title: "AI, ML & Automation",
    icon: Cpu,
    desc: "Integrating generative neural networks, automated work queues, and semantic retrieval architectures.",
    techs: [
      { name: "OpenAI API", desc: "Harnessing GPT engines and model prompts" },
      { name: "LLM Workflows", desc: "LangChain logic and custom agent scripts" },
      { name: "Workflow Automation", desc: "Zapier, Make, and webhook handlers" },
      { name: "Vector Databases", desc: "Chroma, Pinecone for semantic memory RAG" }
    ],
    color: "text-rose-600 bg-rose-50 border-rose-200/50 shadow-rose-500/5"
  }
];

export default function TechStackPage() {
  const { openModal } = useModal();

  return (
    <main className="relative min-h-screen bg-[#F9FAFB] pt-0 overflow-x-hidden pb-12 text-gray-900">
      <SEO
        title="Agency Technology Stack | CoreSlash Technologies"
        description="Explore our white-label technology stacks. We build using React, Next.js, NestJS, Node.js, Python, AWS, Docker, and AI automation engines."
      />

      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-purple/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-indigo/2 rounded-full blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative py-20 md:py-32 w-full text-center px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 1, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-4"
          >
            <Sparkles className="w-4 h-4 text-secondary-indigo" />
            <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.3em]">
              The Core Stack
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-5xl md:text-8xl font-black text-gray-900 leading-[1.1] tracking-tight"
          >
            Our Agency <br />
            <span className="text-gradient-purple">Technology</span> Stack
          </motion.h1>

          <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We build with production-grade, vetted technologies that ensure speed, structural security, and cross-platform flexibility. Vetted for sub-second responses and scalability.
          </p>
        </div>
      </section>

      {/* TECH STACK BENTO GRID */}
      <section className="py-10 md:py-20 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl space-y-20">
          {techCategories.map((category, catIdx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={catIdx}
                initial={{ opacity: 1, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0, margin: "150px" }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-gray-200/60 rounded-[3rem] p-8 md:p-16 shadow-xl shadow-gray-200/20 grid lg:grid-cols-12 gap-12 items-start"
              >
                {/* Left Description Column */}
                <div className="lg:col-span-5 space-y-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm ${category.color}`}>
                    <Icon className="w-6.5 h-6.5" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight">{category.title}</h2>
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed font-semibold">{category.desc}</p>
                </div>

                {/* Right Technology List Column */}
                <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                  {category.techs.map((tech, techIdx) => (
                    <div 
                      key={techIdx}
                      className="bg-[#F9FAFB]/50 border border-gray-200 p-6 rounded-2xl hover:border-secondary-indigo/25 hover:bg-white transition-all duration-300 flex flex-col justify-between"
                    >
                      <h4 className="font-bold text-gray-950 text-base mb-1">{tech.name}</h4>
                      <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">{tech.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-16 md:py-24 relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white border border-gray-200 p-12 md:p-20 rounded-[3rem] shadow-xl shadow-gray-200/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/3 via-transparent to-secondary-indigo/3" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                Need Specific Stack <br />
                <span className="text-gradient-cyan">Capabilities?</span>
              </h2>
              <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto font-medium">
                Let's discuss details under NDA. We recruit and screen dedicated developers specifically aligned to your backend environments.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={openModal}
                  className="btn-pill btn-primary-glow text-white px-8 py-3.5 text-sm font-bold shadow-lg"
                >
                  Talk to an Engineer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

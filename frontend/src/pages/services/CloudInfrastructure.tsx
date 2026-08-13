import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cloud } from "lucide-react";
import EngagementModels from "@/components/web-development/EngagementModels";
import ProcessTimeline from "@/components/web-development/ProcessTimeline";
import FaqSection, { type FaqData } from "@/components/ui/habit-faq-scroller";
import { CoreServiceCard } from "@/components/web-development/CoreServices";
import CTASection from "@/components/web-development/CTASection";
import {
  SiCloudflare, SiDocker, SiKubernetes, SiTerraform,
  SiGithubactions, SiDatadog, SiPrometheus
} from "react-icons/si";
import { FaCloud, FaServer } from "react-icons/fa";
import cloudHeroBg from "@/assets/services/cloud-infrastructure/coreslash-technologies-cloud-infrastructure.png";

// ----------------------------------------------------
// SCHEMA
// ----------------------------------------------------
const cloudSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Cloud Infrastructure & DevOps Engineering Services",
  "url": "https://coreslashtechnologies.com/services/cloud-infrastructure",
  "provider": {
    "@type": "Organization",
    "name": "CoreSlash Technologies",
    "url": "https://coreslashtechnologies.com/",
    "logo": "https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png"
  },
  "serviceType": "Cloud Infrastructure",
  "description": "Architect high-availability AWS, Azure, and Cloudflare environments with automated CI/CD pipelines, Kubernetes container orchestration, and 99.99% uptime guarantees.",
  "areaServed": "Worldwide"
};

// ----------------------------------------------------
// TECH STACK DATA
// ----------------------------------------------------
const PLATFORM_TECHS = [
  { name: "AWS CLOUD", icon: <FaCloud className="w-6 h-6 text-amber-500" />, color: "#FF9900" },
  { name: "AZURE CLOUD", icon: <FaServer className="w-6 h-6 text-blue-500" />, color: "#0089D6" },
  { name: "CLOUDFLARE", icon: <SiCloudflare className="w-6 h-6" />, color: "#F38020" }
];

const CONTAINER_TECHS = [
  { name: "DOCKER", icon: <SiDocker className="w-6 h-6" />, color: "#2496ED" },
  { name: "KUBERNETES", icon: <SiKubernetes className="w-6 h-6" />, color: "#326CE5" },
  { name: "TERRAFORM", icon: <SiTerraform className="w-6 h-6" />, color: "#7B42BC" }
];

const CICD_TECHS = [
  { name: "GITHUB ACTIONS", icon: <SiGithubactions className="w-6 h-6" />, color: "#2088FF" },
  { name: "DATADOG", icon: <SiDatadog className="w-6 h-6" />, color: "#632CA6" },
  { name: "PROMETHEUS", icon: <SiPrometheus className="w-6 h-6" />, color: "#E6522C" }
];

// ----------------------------------------------------
// FAQ DATA
// ----------------------------------------------------
const cloudFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Everything you need to know about our cloud architecture, DevOps automation, and infrastructure security.",
  rows: [
    {
      id: "row1",
      speed: "48s",
      direction: "left",
      faqItems: [
        {
          id: "q1",
          question: "Which cloud platforms do you support?",
          answer: "CoreSlash specializes in AWS, Microsoft Azure, Google Cloud Platform (GCP), Cloudflare Edge Workers, and Vercel Enterprise deployments."
        },
        {
          id: "q2",
          question: "How do you achieve zero-downtime deployment?",
          answer: "CoreSlash implements Infrastructure as Code (Terraform), blue-green deployments, canary releases, automated database migrations, and health check rollback triggers."
        },
        {
          id: "q3",
          question: "Can you optimize our monthly cloud infrastructure spending?",
          answer: "Yes! CoreSlash's FinOps cloud audits typically reduce monthly AWS and Azure infrastructure costs by 30% to 50% through auto-scaling, spot instances, and resource right-sizing."
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
          question: "Do you offer 24/7 DevOps monitoring and incident response?",
          answer: "Yes, CoreSlash sets up Datadog, Prometheus, Grafana, and PagerDuty monitoring with rapid incident response SLAs to guarantee maximum operational availability."
        },
        {
          id: "q5",
          question: "How do you handle cloud security and compliance hardening?",
          answer: "CoreSlash enforces zero-trust IAM policies, automated container security scans, secrets management, SSL/TLS encryption, and SOC2 / GDPR security standards."
        },
        {
          id: "q6",
          question: "What is your process for legacy cloud migration?",
          answer: "CoreSlash performs an infrastructure audit, containerizes legacy code with Docker/Kubernetes, and executes phased database synchronization with zero customer downtime."
        }
      ]
    }
  ]
};

export default function CloudInfrastructure() {
  const [activeTechTab, setActiveTechTab] = useState<"CLOUD PLATFORMS" | "CONTAINERS & IAC" | "CI/CD & MONITORING">("CLOUD PLATFORMS");

  const getTechsForTab = () => {
    switch (activeTechTab) {
      case "CLOUD PLATFORMS":
        return PLATFORM_TECHS;
      case "CONTAINERS & IAC":
        return CONTAINER_TECHS;
      case "CI/CD & MONITORING":
        return CICD_TECHS;
      default:
        return PLATFORM_TECHS;
    }
  };

  return (
    <div className="w-full bg-background min-h-screen">
      <Helmet>
        <title>Cloud Infrastructure & DevOps Engineering Services | CoreSlash Technologies</title>
        <meta
          name="description"
          content="Architect resilient AWS, Azure, and Cloudflare environments with automated CI/CD pipelines, Kubernetes container orchestration, and zero-downtime deployments."
        />
        <link rel="canonical" href="https://coreslashtechnologies.com/services/cloud-infrastructure" />
        <script type="application/ld+json">{JSON.stringify(cloudSchema)}</script>
      </Helmet>

      {/* ========================================================
          1. HERO SECTION
          ======================================================== */}
      <section
        className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-start overflow-hidden py-8 md:py-12 px-6 md:px-12 lg:px-24 bg-slate-950"
        style={{
          backgroundImage: `url(${cloudHeroBg})`,
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
            <span className="text-blue-400 font-semibold">Cloud Infrastructure</span>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs md:text-sm font-semibold tracking-wide backdrop-blur-md"
          >
            <Cloud className="w-4 h-4 text-blue-400 animate-pulse" />
            <span>Cloud Architecture & DevOps Automation</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl"
          >
            Enterprise Cloud Infrastructure &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400">
              DevOps Engineering
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl leading-relaxed font-normal"
          >
            Architect resilient cloud environments on AWS, Azure, and Cloudflare. Implement automated CI/CD pipelines, Kubernetes container orchestration, and zero-downtime deployment pipelines built for 99.99% SLA uptime.
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
              <span>Schedule Infrastructure Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-sm md:text-base backdrop-blur-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Explore Architecture</span>
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
                Cloud Capabilities
              </h3>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
              Cloud & DevOps Solutions
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl">
              CoreSlash designs, automates, and protects scalable cloud infrastructure that ensures your software applications run with ultra-fast speed, high reliability, and robust security.
            </p>
          </div>

          {/* 4 Core Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CoreServiceCard
              number="01"
              title="AWS & Multi-Cloud Architecture"
              subtext="High-availability cloud foundation engineering across AWS, Azure, and GCP built with multi-region redundancy."
              highlight="Engineered with global edge routing, auto-scaling, and active-active database replication."
              darkBg={true}
              delay={0.1}
            />

            <CoreServiceCard
              number="02"
              title="Automated CI/CD Deployment Pipelines"
              subtext="Continuous integration and deployment pipelines using GitHub Actions, GitLab CI, and ArgoCD."
              highlight="Automated release pipelines with blue-green deployments and instant rollback safeguards."
              delay={0.2}
            />

            <CoreServiceCard
              number="03"
              title="Kubernetes & Container Orchestration"
              subtext="Docker containerization and container cluster management with Amazon EKS and Azure AKS."
              highlight="Horizontal pod auto-scaling, load balancing, and Istio service mesh traffic control."
              delay={0.3}
            />

            <CoreServiceCard
              number="04"
              title="Infrastructure as Code (IaC) & FinOps"
              subtext="Declarative IaC provisioning via Terraform paired with continuous cloud cost optimization audits."
              highlight="Version-controlled cloud setups that cut monthly infrastructure bills by up to 50%."
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
              Industry-Leading DevOps Tools
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 border-b border-border/40 mb-8 py-2">
            {(["CLOUD PLATFORMS", "CONTAINERS & IAC", "CI/CD & MONITORING"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTechTab(tab)}
                className={`relative px-4 py-2 text-sm md:text-base font-medium tracking-wider transition-colors duration-300 uppercase focus:outline-none ${activeTechTab === tab ? "text-blue-600 dark:text-blue-400 font-bold" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {tab}
                {activeTechTab === tab && (
                  <motion.div
                    layoutId="activeTabUnderlineCloud"
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
        <FaqSection data={cloudFaqData} />
      </section>

      {/* ========================================================
          7. CTA SECTION
          ======================================================== */}
      <CTASection />
    </div>
  );
}

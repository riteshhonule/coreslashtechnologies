import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BarChart3, LineChart, Activity } from "lucide-react";
import EngagementModels from "@/components/web-development/EngagementModels";
import ProcessTimeline from "@/components/web-development/ProcessTimeline";
import FaqSection, { type FaqData } from "@/components/ui/habit-faq-scroller";
import { CoreServiceCard } from "@/components/web-development/CoreServices";
import CTASection from "@/components/web-development/CTASection";
import {
  SiSnowflake, SiGooglecloud, SiPostgresql, SiRedis, SiApachekafka,
  SiApacheairflow, SiPython
} from "react-icons/si";
import dataHeroBg from "@/assets/services/data-analytics/coreslash-technologies-business-intelligence-data-analytics.avif";

// ----------------------------------------------------
// SCHEMA
// ----------------------------------------------------
const dataSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Data Analytics & Business Intelligence Solutions",
  "provider": {
    "@type": "Organization",
    "name": "CoreSlash Technologies",
    "url": "https://www.coreslash.com",
    "logo": "https://www.coreslash.com/vite.svg"
  },
  "serviceType": "Data Analytics",
  "description": "Transform complex business data into real-time interactive executive dashboards, automated reporting pipelines, and predictive telemetry.",
  "areaServed": "Worldwide"
};

// ----------------------------------------------------
// TECH STACK DATA
// ----------------------------------------------------
const WAREHOUSE_TECHS = [
  { name: "SNOWFLAKE", icon: <SiSnowflake className="w-6 h-6" />, color: "#29B5E8" },
  { name: "BIGQUERY", icon: <SiGooglecloud className="w-6 h-6" />, color: "#4285F4" },
  { name: "POSTGRESQL", icon: <SiPostgresql className="w-6 h-6" />, color: "#4169E1" },
  { name: "REDIS CACHE", icon: <SiRedis className="w-6 h-6" />, color: "#DC382D" }
];

const DASHBOARD_TECHS = [
  { name: "EXECUTIVE BI", icon: <BarChart3 className="w-6 h-6 text-blue-400" />, color: "#3178C6" },
  { name: "D3.JS / CHARTS", icon: <LineChart className="w-6 h-6 text-indigo-400" />, color: "#6366F1" },
  { name: "TELEMETRY DASHBOARDS", icon: <Activity className="w-6 h-6 text-emerald-400" />, color: "#10B981" }
];

const ETL_TECHS = [
  { name: "APACHE AIRFLOW", icon: <SiApacheairflow className="w-6 h-6" />, color: "#017CEE" },
  { name: "KAFKA STREAMING", icon: <SiApachekafka className="w-6 h-6" />, color: "#231F20" },
  { name: "PYTHON ETL", icon: <SiPython className="w-6 h-6" />, color: "#3776AB" }
];

// ----------------------------------------------------
// FAQ DATA
// ----------------------------------------------------
const dataFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Everything you need to know about our data analytics pipelines, custom dashboards, and business intelligence solutions.",
  rows: [
    {
      id: "row1",
      speed: "48s",
      direction: "left",
      faqItems: [
        {
          id: "q1",
          question: "What data analytics and business intelligence solutions do you build?",
          answer: "We engineer custom executive dashboards, automated ETL data pipelines, enterprise data warehousing (Snowflake/BigQuery), predictive ML models, and scheduled PDF email reports."
        },
        {
          id: "q2",
          question: "Can you aggregate data from multiple isolated SaaS tools into one dashboard?",
          answer: "Yes! We consolidate Shopify sales, Stripe revenue, Google Analytics traffic, Salesforce CRM leads, and custom database records into a single source-of-truth dashboard."
        },
        {
          id: "q3",
          question: "How do you ensure sub-second response times on massive datasets?",
          answer: "We utilize high-performance OLAP analytics databases (ClickHouse / Snowflake), Redis in-memory caching, and WebSocket streaming to render millions of data points under 200ms."
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
          question: "Can executive reports be generated and sent out automatically?",
          answer: "Yes, we build automated scheduled PDF report generators that deliver weekly or monthly performance digests directly to executive email inboxes and Slack channels."
        },
        {
          id: "q5",
          question: "How is sensitive organizational data encrypted and protected?",
          answer: "We enforce Role-Based Access Control (RBAC), Single Sign-On (SSO) authentication, column-level data encryption, and GDPR/HIPAA compliance standards."
        },
        {
          id: "q6",
          question: "What is the typical timeframe for a BI dashboard project?",
          answer: "Interactive executive dashboard MVP projects deliver in 3-4 weeks, while enterprise multi-source data warehouses deploy within 6-10 weeks."
        }
      ]
    }
  ]
};

export default function DataAnalytics() {
  const [activeTechTab, setActiveTechTab] = useState<"DATA WAREHOUSES" | "BI & DASHBOARDS" | "ETL & STREAMING">("DATA WAREHOUSES");

  const getTechsForTab = () => {
    switch (activeTechTab) {
      case "DATA WAREHOUSES":
        return WAREHOUSE_TECHS;
      case "BI & DASHBOARDS":
        return DASHBOARD_TECHS;
      case "ETL & STREAMING":
        return ETL_TECHS;
      default:
        return WAREHOUSE_TECHS;
    }
  };

  return (
    <div className="w-full bg-background min-h-screen">
      <Helmet>
        <title>Data Analytics & Business Intelligence Services | CoreSlash Technologies</title>
        <meta
          name="description"
          content="Turn raw operational data into actionable insights through custom real-time executive dashboards, ETL data pipelines, and predictive business intelligence."
        />
        <link rel="canonical" href="https://www.coreslashtechnologies.com/services/data-analytics" />
        <script type="application/ld+json">{JSON.stringify(dataSchema)}</script>
      </Helmet>

      {/* ========================================================
          1. HERO SECTION
          ======================================================== */}
      <section 
        className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-start overflow-hidden py-8 md:py-12 px-6 md:px-12 lg:px-24 bg-slate-950"
        style={{
          backgroundImage: `url(${dataHeroBg})`,
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
            <span className="text-blue-400 font-semibold">Data Analytics</span>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs md:text-sm font-semibold tracking-wide backdrop-blur-md"
          >
            <BarChart3 className="w-4 h-4 text-blue-400 animate-pulse" />
            <span>Business Intelligence & Telemetry Analytics</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl"
          >
            Business Intelligence &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
              Real-Time Data Analytics
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl leading-relaxed font-normal"
          >
            Transform raw organizational data into actionable executive insights through real-time dashboards, high-throughput ETL data pipelines, data warehousing, and automated telemetry reporting.
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
              <span>Request Dashboard Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-sm md:text-base backdrop-blur-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Explore Analytics</span>
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
                Analytics Capabilities
              </h3>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
              Data Engineering & BI Solutions
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl">
              We design real-time analytics architectures, automated ETL data ingestion pipelines, and interactive executive dashboards that provide single-source-of-truth clarity.
            </p>
          </div>

          {/* 4 Core Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CoreServiceCard
              number="01"
              title="Executive BI & Custom Dashboards"
              subtext="Custom interactive dashboards built with React, D3.js, PowerBI, and Tableau for real-time executive monitoring."
              highlight="Real-time KPI metrics with sub-second data rendering and role-based views."
              darkBg={true}
              delay={0.1}
            />

            <CoreServiceCard
              number="02"
              title="ETL Pipelines & Data Warehousing"
              subtext="Centralized cloud data lakes and automated ingestion pipelines using Snowflake, BigQuery, and PostgreSQL."
              highlight="High-throughput batch and stream ETL pipeline architecture for normalized data ingestion."
              delay={0.2}
            />

            <CoreServiceCard
              number="03"
              title="Real-Time Telemetry & Event Streaming"
              subtext="High-frequency event streaming and sub-200ms telemetry visualization powered by Kafka and Redis."
              highlight="Apache Kafka event ingestion paired with WebSocket real-time dashboard streaming."
              delay={0.3}
            />

            <CoreServiceCard
              number="04"
              title="Predictive Analytics & Automated Reports"
              subtext="Customer churn modeling, revenue forecasting, and scheduled executive PDF report generators."
              highlight="Automated daily/weekly email digests and Slack webhook alerts for operational KPIs."
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
              Enterprise Data Tools
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 border-b border-border/40 mb-8 py-2">
            {(["DATA WAREHOUSES", "BI & DASHBOARDS", "ETL & STREAMING"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTechTab(tab)}
                className={`relative px-4 py-2 text-sm md:text-base font-medium tracking-wider transition-colors duration-300 uppercase focus:outline-none ${
                  activeTechTab === tab ? "text-blue-600 dark:text-blue-400 font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
                {activeTechTab === tab && (
                  <motion.div
                    layoutId="activeTabUnderlineData"
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
        <FaqSection data={dataFaqData} />
      </section>

      {/* ========================================================
          7. CTA SECTION
          ======================================================== */}
      <CTASection />
    </div>
  );
}

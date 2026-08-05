import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/web-development/HeroSection";
import CoreServices from "@/components/web-development/CoreServices";
import ProcessTimeline from "@/components/web-development/ProcessTimeline";
import EngagementModels from "@/components/web-development/EngagementModels";
import TechnologyGrid from "@/components/web-development/TechnologyGrid";
import CTASection from "@/components/web-development/CTASection";
import FaqSection, { type FaqData } from "@/components/ui/habit-faq-scroller";

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

const dataFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Everything you need to know about our data analytics pipelines, custom dashboards, and business intelligence solutions.",
  rows: [
    {
      id: "row1",
      speed: "55s",
      direction: "left",
      faqItems: [
        {
          id: "q1",
          question: "What data analytics services do you provide?",
          answer: "We engineer ETL data warehousing (Snowflake, BigQuery), real-time executive BI dashboards (PowerBI, Tableau, custom React charts), and predictive ML analytics."
        },
        {
          id: "q2",
          question: "Can you connect multiple data sources into one unified dashboard?",
          answer: "Yes, we build centralized data lakes connecting PostgreSQL, MongoDB, Shopify APIs, Stripe financial records, and Google Analytics into real-time dashboards."
        },
        {
          id: "q3",
          question: "How do you maintain real-time telemetry speed?",
          answer: "We utilize Redis caching, ClickHouse analytics databases, and WebSocket streaming to load millions of telemetry points in under 200 milliseconds."
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
          question: "Can we export automated weekly or monthly reports?",
          answer: "Yes, we set up scheduled automated PDF and Slack/Email digest generation for executive stakeholders."
        },
        {
          id: "q5",
          question: "Is our business data secure in custom dashboards?",
          answer: "We enforce strict Role-Based Access Control (RBAC), SSO authentication, end-to-end data encryption, and HIPAA/GDPR compliance controls."
        }
      ]
    }
  ]
};

export default function DataAnalytics() {
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

      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. CORE SERVICES */}
      <CoreServices />

      {/* 3. PROCESS TIMELINE */}
      <ProcessTimeline />

      {/* 4. ENGAGEMENT MODELS */}
      <EngagementModels />

      {/* 5. TECH STACK GRID */}
      <TechnologyGrid />

      {/* 6. FAQ SECTION */}
      <FaqSection data={dataFaqData} />

      {/* 7. CTA SECTION */}
      <CTASection />
    </div>
  );
}

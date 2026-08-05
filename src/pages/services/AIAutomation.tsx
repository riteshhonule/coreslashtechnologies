import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/web-development/HeroSection";
import CoreServices from "@/components/web-development/CoreServices";
import ProcessTimeline from "@/components/web-development/ProcessTimeline";
import EngagementModels from "@/components/web-development/EngagementModels";
import TechnologyGrid from "@/components/web-development/TechnologyGrid";
import CTASection from "@/components/web-development/CTASection";
import FaqSection, { type FaqData } from "@/components/ui/habit-faq-scroller";

const aiSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Automation & Agentic Workflows",
  "provider": {
    "@type": "Organization",
    "name": "CoreSlash Technologies",
    "url": "https://www.coreslash.com",
    "logo": "https://www.coreslash.com/vite.svg"
  },
  "serviceType": "AI Automation",
  "description": "Build AI-powered workflows, custom LLM agents, intelligent chatbots, and predictive data pipelines with CoreSlash Technologies.",
  "areaServed": "Worldwide"
};

const aiFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Everything you need to know about our AI automation engineering, custom LLM integration, and agentic workflows.",
  rows: [
    {
      id: "row1",
      speed: "55s",
      direction: "left",
      faqItems: [
        {
          id: "q1",
          question: "What AI automation solutions do you build?",
          answer: "We engineer autonomous agentic workflows, custom LLM fine-tuning, retrieval-augmented generation (RAG) systems, intelligent document processing, and enterprise AI chatbots."
        },
        {
          id: "q2",
          question: "Can you integrate AI into our existing software stack?",
          answer: "Yes, we integrate OpenAI, Claude, Llama 3, and custom AI APIs seamlessly into your existing React, Node, Python, or enterprise ERP systems with strict data privacy."
        },
        {
          id: "q3",
          question: "Is our proprietary business data kept private?",
          answer: "Absolutely. We implement enterprise security boundaries using private VPC deployments, encrypted vector stores (Pinecone / Qdrant), and zero-retention data policies."
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
          question: "How long does an AI workflow project take?",
          answer: "Initial AI agent prototypes take 2-4 weeks, while full-scale enterprise AI workflow pipelines are delivered in 6-10 weeks."
        },
        {
          id: "q5",
          question: "Do you provide post-deployment monitoring for AI drift?",
          answer: "Yes, we provide 24/7 telemetry, latency monitoring, model evaluation, and continuous prompt engineering to ensure consistent accuracy."
        }
      ]
    }
  ]
};

export default function AIAutomation() {
  return (
    <div className="w-full bg-background min-h-screen">
      <Helmet>
        <title>AI Automation & Custom LLM Development | CoreSlash Technologies</title>
        <meta
          name="description"
          content="Accelerate business operations with custom AI agents, intelligent workflows, LLM fine-tuning, RAG architecture, and enterprise automation."
        />
        <link rel="canonical" href="https://www.coreslashtechnologies.com/services/ai-automation" />
        <script type="application/ld+json">{JSON.stringify(aiSchema)}</script>
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
      <FaqSection data={aiFaqData} />

      {/* 7. CTA SECTION */}
      <CTASection />
    </div>
  );
}

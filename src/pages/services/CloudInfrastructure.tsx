import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/web-development/HeroSection";
import CoreServices from "@/components/web-development/CoreServices";
import ProcessTimeline from "@/components/web-development/ProcessTimeline";
import EngagementModels from "@/components/web-development/EngagementModels";
import TechnologyGrid from "@/components/web-development/TechnologyGrid";
import CTASection from "@/components/web-development/CTASection";
import FaqSection, { type FaqData } from "@/components/ui/habit-faq-scroller";

const cloudSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Cloud Infrastructure & DevOps Engineering",
  "provider": {
    "@type": "Organization",
    "name": "CoreSlash Technologies",
    "url": "https://www.coreslash.com",
    "logo": "https://www.coreslash.com/vite.svg"
  },
  "serviceType": "Cloud Infrastructure",
  "description": "Architect high-availability AWS, Azure, and Cloudflare environments with automated CI/CD pipelines, Kubernetes, and 99.99% uptime guarantees.",
  "areaServed": "Worldwide"
};

const cloudFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Everything you need to know about our cloud architecture, DevOps automation, and infrastructure security.",
  rows: [
    {
      id: "row1",
      speed: "55s",
      direction: "left",
      faqItems: [
        {
          id: "q1",
          question: "Which cloud platforms do you support?",
          answer: "We specialize in AWS, Microsoft Azure, Google Cloud Platform (GCP), Cloudflare Workers/Pages, and Vercel enterprise deployments."
        },
        {
          id: "q2",
          question: "How do you ensure zero-downtime deployments?",
          answer: "We implement Infrastructure as Code (Terraform), blue-green deployments, canary releases, and automated health checking pipelines."
        },
        {
          id: "q3",
          question: "Can you help optimize our monthly cloud infrastructure bills?",
          answer: "Yes, our FinOps cloud audits typically reduce monthly infrastructure costs by 30% to 50% through auto-scaling, reserved instances, and asset optimization."
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
          question: "Do you offer 24/7 DevOps monitoring?",
          answer: "Yes, we implement Datadog, Prometheus, Grafana, and PagerDuty monitoring with rapid incident response SLAs."
        },
        {
          id: "q5",
          question: "How do you handle cloud migration for legacy software?",
          answer: "We perform complete infrastructure discovery, containerize applications with Docker/Kubernetes, and execute phased zero-downtime database migrations."
        }
      ]
    }
  ]
};

export default function CloudInfrastructure() {
  return (
    <div className="w-full bg-background min-h-screen">
      <Helmet>
        <title>Cloud Infrastructure & DevOps Engineering Services | CoreSlash Technologies</title>
        <meta
          name="description"
          content="Architect resilient AWS, Azure, and Cloudflare infrastructure with automated CI/CD pipelines, Kubernetes orchestration, and zero-downtime deployments."
        />
        <link rel="canonical" href="https://www.coreslashtechnologies.com/services/cloud-infrastructure" />
        <script type="application/ld+json">{JSON.stringify(cloudSchema)}</script>
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
      <FaqSection data={cloudFaqData} />

      {/* 7. CTA SECTION */}
      <CTASection />
    </div>
  );
}

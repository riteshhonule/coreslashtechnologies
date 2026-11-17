import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import HeroSection from "@/components/web-development/HeroSection";
import { type FaqData } from "@/components/ui/habit-faq-scroller";

const CoreServices = lazy(() => import("@/components/web-development/CoreServices"));
const ProcessTimeline = lazy(() => import("@/components/web-development/ProcessTimeline"));
const EngagementModels = lazy(() => import("@/components/web-development/EngagementModels"));
const TechnologyGrid = lazy(() => import("@/components/web-development/TechnologyGrid"));
const PortfolioSection = lazy(() => import("@/components/web-development/PortfolioSection"));
const CTASection = lazy(() => import("@/components/web-development/CTASection"));
const FaqSection = lazy(() => import("@/components/ui/habit-faq-scroller"));

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Enterprise Web Application Development Services",
  "url": "https://coreslashtechnologies.com/services/web-development",
  "provider": {
    "@type": "Organization",
    "name": "CoreSlash Technologies",
    "url": "https://coreslashtechnologies.com/",
    "logo": "https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png"
  },
  "serviceType": "Web Development",
  "description": "CoreSlash is an enterprise web application development company building custom React, Next.js, and TypeScript web platforms, SaaS portals, and B2B web systems.",
  "areaServed": "Worldwide"
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://coreslashtechnologies.com/"
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
      "name": "Web Development",
      "item": "https://coreslashtechnologies.com/services/web-development"
    }
  ]
};

const webDevFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Key details about our enterprise web application engineering process, technology stack, and deliverables.",
  rows: [
    {
      id: "row1",
      speed: "55s",
      direction: "left",
      faqItems: [
        {
          id: "q1",
          question: "What web development services do you offer?",
          answer: "CoreSlash delivers custom web application development, scalable SaaS platform interfaces, B2B customer portals, enterprise administrative dashboards, and full-stack web platforms built with React, Next.js, and TypeScript."
        },
        {
          id: "q2",
          question: "What is the typical timeline for web application development?",
          answer: "Project timelines vary based on architectural complexity, feature scope, and third-party integrations. Typical web applications progress through discovery, UI/UX design, iterative sprint development, and deployment milestones, with project schedules established during the initial technical discovery phase."
        },
        {
          id: "q3",
          question: "Which technologies do you use for web development?",
          answer: "Our primary web engineering stack centers on React, Next.js, TypeScript, and Tailwind CSS for frontends, paired with Node.js/NestJS or Python backends and structured relational databases such as PostgreSQL."
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
          question: "Can you modernize or redesign an existing web application?",
          answer: "Yes. CoreSlash modernizes legacy web platforms by redesigning user interfaces, refactoring frontend codebases to modern frameworks like React and Next.js, and executing structured data and API migrations with careful rollback planning to maintain operational continuity."
        },
        {
          id: "q5",
          question: "Do you build web applications with technical SEO and performance in mind?",
          answer: "Yes. We implement technical SEO best practices directly into web architectures: clean semantic HTML5 markup, structured JSON-LD metadata, responsive asset optimization, server-side or prerendered static assets, and optimization for Core Web Vitals."
        },
        {
          id: "q6",
          question: "Are your web applications responsive across different screen sizes?",
          answer: "Yes. All web applications are engineered with responsive, mobile-first design principles using modern CSS grid and flexbox layouts to ensure consistent usability across mobile devices, tablets, and desktop displays."
        }
      ]
    },
    {
      id: "row3",
      speed: "60s",
      direction: "left",
      faqItems: [
        {
          id: "q7",
          question: "How do you approach web application security?",
          answer: "We follow industry security practices including encrypted HTTPS communication, token-based authentication such as JWT, strict input validation to mitigate injection risks, and environment-isolated credentials."
        },
        {
          id: "q8",
          question: "Do you provide post-launch maintenance and support?",
          answer: "Yes. We offer post-deployment maintenance arrangements covering routine dependency updates, performance monitoring, bug fixes, and technical support tailored to your project requirements."
        },
        {
          id: "q9",
          question: "Can you integrate third-party APIs and payment gateways?",
          answer: "We can integrate payment gateways such as Stripe and Razorpay, subject to the project's provider requirements and integration scope, alongside third-party REST APIs and other external services."
        }
      ]
    }
  ]
};

export default function WebsiteDevelopment() {
  return (
    <>
      <Helmet>
        <title>Enterprise Web Application Development Company | CoreSlash</title>
        <meta
          name="description"
          content="CoreSlash is an enterprise web application development company building custom React, Next.js, and TypeScript web platforms, SaaS portals, and B2B web systems."
        />
        <link rel="canonical" href="https://coreslashtechnologies.com/services/web-development" />
        
        {/* Open Graph SEO */}
        <meta property="og:title" content="Enterprise Web Application Development Company | CoreSlash" />
        <meta property="og:description" content="CoreSlash is an enterprise web application development company building custom React, Next.js, and TypeScript web platforms, SaaS portals, and B2B web systems." />
        <meta property="og:url" content="https://coreslashtechnologies.com/services/web-development" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png" />

        {/* Twitter Card SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Enterprise Web Application Development Company | CoreSlash" />
        <meta name="twitter:description" content="CoreSlash is an enterprise web application development company building custom React, Next.js, and TypeScript web platforms, SaaS portals, and B2B web systems." />
        <meta name="twitter:image" content="https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png" />

        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <HeroSection />

      <section className="w-full py-12 bg-slate-950 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <p className="max-w-4xl mx-auto text-sm md:text-base text-slate-400 leading-relaxed">
            As an <strong className="text-white font-medium">enterprise web application development company</strong>, CoreSlash delivers end-to-end full-stack web engineering for modern businesses. Looking to expand your technology ecosystem? Explore our capabilities as an enterprise <Link to="/services/software-systems" className="text-[#3b82f6] font-semibold hover:underline">custom software development company</Link>, streamline operations with tailored <Link to="/services/erp-crm-development" className="text-[#3b82f6] font-semibold hover:underline">custom ERP & CRM platforms</Link>, or integrate autonomous workflows with our <Link to="/services/ai-automation" className="text-[#3b82f6] font-semibold hover:underline">AI automation services</Link>. Seeking local project consultation? Discover our dedicated <Link to="/web-development-company-in-belagavi" className="text-[#3b82f6] font-semibold hover:underline">web development company in Belagavi</Link> services, or read our guide on selecting the <Link to="/blog/best-react-js-development-company-in-bangalore" className="text-[#3b82f6] font-semibold hover:underline">best React.js development company in Bangalore</Link>.
          </p>
        </div>
      </section>

      <Suspense fallback={null}>
        <CoreServices />
        <ProcessTimeline />
        <EngagementModels />
        <TechnologyGrid />
        <PortfolioSection />

        <section className="w-full py-16 md:py-24 border-t border-border/40 overflow-hidden bg-background">
          <FaqSection data={webDevFaqData} />
        </section>

        <CTASection />
      </Suspense>
    </>
  );
}

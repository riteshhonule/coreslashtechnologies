import React from "react";
import ServiceLayout from "./ServicesLayout";
import SEO from "../../components/SEO";
import ContactForm from "../../components/ContactForm";
import { CheckCircle2, Terminal, Code, Cpu, Target, Search } from "lucide-react";

export default function TechnicalSEO() {
  const pageUrl = "https://coreslashtechnologies.com/services/technical-seo";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Technical SEO Engineering",
    "description": "Code-level search engine optimization, Core Web Vitals acceleration, site structure audit, and JSON-LD schema integration.",
    "provider": {
      "@type": "Organization",
      "name": "CoreSlash Technologies",
      "url": "https://coreslashtechnologies.com"
    }
  };

  return (
    <ServiceLayout
      title="Technical SEO"
      subtitle="Search optimization treated as an engineering science. Structured schemas, clean crawlabity, and sub-second speeds."
      ctaText="Book Tech SEO Audit"
    >
      <SEO
        title="Technical SEO & Crawl Optimization Engineering | CoreSlash Technologies"
        description="Engineering-driven search optimization. Core Web Vitals acceleration, structured schema JSON-LD implementation, semantic site architecture, and index audits."
        structuredData={structuredData}
        canonicalUrl={pageUrl}
      />

      <div className="bg-[#F9FAFB] text-gray-900 font-sans leading-relaxed pb-20">
        
        {/* Intro Section */}
        <section className="container mx-auto px-6 lg:px-12 py-12 md:py-24 max-w-5xl">
          <div className="bg-white p-8 md:p-16 rounded-[3rem] border border-gray-200 shadow-xl shadow-gray-250/10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight text-center md:text-left">
              Algorithmic Search <span className="text-gradient-purple">Precision</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-600 font-medium">
              <p>
                <strong>The Business Problem:</strong> Most SEO services are limited to keyword stuffing and content curation. However, if your website has slow Time-to-First-Byte (TTFB), blocking render JS scripts, or incorrect schema files, search bots will de-rank you due to poor page experience.
              </p>
              <p>
                <strong>Our Technical Solution:</strong> We optimize your website from the code level up. We audit indexing bottlenecks, eliminate server redirects, compress JS bundles, configure dynamic hydration, and embed clean JSON-LD local business and product schemas.
              </p>
            </div>
          </div>
        </section>

        {/* Audit Pillars Grid */}
        <section className="py-12 md:py-24 bg-white border-y border-gray-200/60 shadow-sm">
          <div className="container mx-auto px-6 lg:px-12">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight text-center mb-16">
              Our Technical <span className="text-gradient-cyan">SEO Blueprint</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Core Web Vitals Optimization",
                  desc: "We minimize bundle sizes, adjust Largest Contentful Paint (LCP) triggers, and eliminate Cumulative Layout Shifts (CLS) for a 95+ score on lighthouse performance audits.",
                  icon: Cpu
                },
                {
                  title: "Structured Schema Markup",
                  desc: "We write clean JSON-LD script blocks representing Product, LocalBusiness, FAQPage, and BreadcrumbList schemas so search engines display rich snippets for your site.",
                  icon: Terminal
                },
                {
                  title: "Crawl Pathway Audits",
                  desc: "We analyze sitemap configurations, modify robots.txt instructions, resolve duplicate path parameters, and remove canonical loop chains to optimize crawl budgets.",
                  icon: Search
                }
              ].map((pillar, idx) => (
                <div key={idx} className="bg-[#F9FAFB] p-10 rounded-[2.5rem] border border-gray-200/60 hover:border-secondary-indigo/25 transition-all shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-secondary-indigo/5 flex items-center justify-center text-secondary-indigo mb-6">
                      <pillar.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-950 text-xl mb-3">{pillar.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">{pillar.desc}</p>
                  </div>
                  <span className="text-secondary-indigo text-[10px] font-black tracking-widest mt-8 block uppercase">TECHNICAL SPECIFICATION</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Scoping Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Claim Your <span className="text-gradient-purple">Technical Site Audit</span>
            </h3>
            <p className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed mb-12 font-medium">
              Let our engineering specialists scan your React/Next.js platforms or database pathways to highlight indexing and speed bottlenecks.
            </p>
            <div className="bg-gray-50 border border-gray-200/60 shadow-xl p-8 md:p-12 rounded-[3.5rem]">
              <ContactForm variant="default" service="Technical SEO" />
            </div>
          </div>
        </section>

      </div>
    </ServiceLayout>
  );
}

import React from "react";
import ServiceLayout from "./ServicesLayout";
import SEO from "../../components/SEO";
import ContactForm from "../../components/ContactForm";
import { CheckCircle2, Zap, LayoutGrid, Clock, Cpu, BarChart } from "lucide-react";

export default function WebsiteSpeedOptimization() {
  const pageUrl = "https://coreslashtechnologies.com/services/website-speed-optimization";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Website Speed Optimization",
    "description": "Code compression, image formatting, database cache integration, and Core Web Vitals optimization.",
    "provider": {
      "@type": "Organization",
      "name": "CoreSlash Technologies",
      "url": "https://coreslashtechnologies.com"
    }
  };

  return (
    <ServiceLayout
      title="Speed Optimization"
      subtitle="Minimizing bounce rates and maximizing conversions by engineering sub-second page rendering."
      ctaText="Claim Speed Audit"
    >
      <SEO
        title="Website Speed Optimization & Core Web Vitals | CoreSlash Technologies"
        description="Speed optimization services. Bundle compression, Next.js page generation tuning, image optimizations, database caching, and Lighthouse audit enhancements."
        structuredData={structuredData}
        canonicalUrl={pageUrl}
      />

      <div className="bg-[#F9FAFB] text-gray-900 font-sans leading-relaxed pb-20">
        
        {/* Intro Section */}
        <section className="container mx-auto px-6 lg:px-12 py-12 md:py-24 max-w-5xl">
          <div className="bg-white p-8 md:p-16 rounded-[3rem] border border-gray-200 shadow-xl shadow-gray-250/10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight text-center md:text-left">
              Speed is a <span className="text-gradient-purple">Conversion Pillar</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-600 font-medium">
              <p>
                <strong>The Business Problem:</strong> Every single second of website load delay increases bounce rates by up to 20%. Bloated Javascript files, uncompressed assets, lack of page caching, and slow servers frustrate users and lower your conversion rates.
              </p>
              <p>
                <strong>Our Technical Solution:</strong> We implement precise code modifications. We compile image assets to AVIF/WebP, code-split massive vendor libraries, configure CDNs (Cloudflare), cache database tables (Redis), and optimize rendering pathways.
              </p>
            </div>
          </div>
        </section>

        {/* Speed Pillars */}
        <section className="py-12 md:py-24 bg-white border-y border-gray-200/60 shadow-sm">
          <div className="container mx-auto px-6 lg:px-12">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight text-center mb-16">
              Our Core <span className="text-gradient-cyan">Speed Interventions</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Code-Splitting & Tree Shaking",
                  desc: "We analyze JS dependency trees to eliminate unused logic, compile modern ES modules, and load blocking assets asynchronously.",
                  icon: Cpu
                },
                {
                  title: "Database Caching (Redis)",
                  desc: "We decouple database queries from page render triggers by implementing Redis caching layers, avoiding repetitive database workloads.",
                  icon: Clock
                },
                {
                  title: "Asset Pipelines & CDNs",
                  desc: "We convert graphics to AVIF, compress CSS payloads, and configure Cloudflare page rules to serve cached content at edge endpoints globally.",
                  icon: LayoutGrid
                }
              ].map((pill, idx) => (
                <div key={idx} className="bg-[#F9FAFB] p-10 rounded-[2.5rem] border border-gray-200/60 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-secondary-indigo/5 flex items-center justify-center text-secondary-indigo mb-6">
                      <pill.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-950 text-xl mb-3">{pill.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">{pill.desc}</p>
                  </div>
                  <span className="text-secondary-indigo text-[10px] font-black tracking-widest mt-8 block uppercase">PERFORMANCE CRITERIA</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Scoping Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Request Your <span className="text-gradient-purple">Lighthouse Optimization Audit</span>
            </h3>
            <p className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed mb-12 font-medium">
              Talk to our performance engineers to evaluate your website payload, bundle sizes, and response times for a speed blueprint.
            </p>
            <div className="bg-gray-50 border border-gray-200/60 shadow-xl p-8 md:p-12 rounded-[3.5rem]">
              <ContactForm variant="default" service="Website Speed Optimization" />
            </div>
          </div>
        </section>

      </div>
    </ServiceLayout>
  );
}

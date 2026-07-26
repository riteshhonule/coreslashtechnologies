import React from "react";
import ServiceLayout from "./ServicesLayout";
import SEO from "../../components/SEO";
import ContactForm from "../../components/ContactForm";
import { CheckCircle2, ShieldCheck, Activity, Search, RefreshCw, BarChart2 } from "lucide-react";

export default function SEOMaintenance() {
  const pageUrl = "https://coreslashtechnologies.com/services/seo-maintenance";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Search Engine Optimization (SEO) Maintenance",
    "description": "Continuous search ranking audits, schema tracking, link profile health checks, and ranking maintenance.",
    "provider": {
      "@type": "Organization",
      "name": "CoreSlash Technologies",
      "url": "https://coreslashtechnologies.com"
    }
  };

  return (
    <ServiceLayout
      title="SEO Maintenance"
      subtitle="Securing and defending your search rankings from algorithm updates and indexing errors."
      ctaText="Discuss Maintenance Scope"
    >
      <SEO
        title="SEO Maintenance & Rank Defending Services | CoreSlash Technologies"
        description="Continuous SEO monitoring, ranking protection, algorithm alignment, schema validation, link profile updates, and monthly crawl checks."
        structuredData={structuredData}
        canonicalUrl={pageUrl}
      />

      <div className="bg-[#F9FAFB] text-gray-900 font-sans leading-relaxed pb-20">
        
        {/* Intro Section */}
        <section className="container mx-auto px-6 lg:px-12 py-12 md:py-24 max-w-5xl">
          <div className="bg-white p-8 md:p-16 rounded-[3rem] border border-gray-200 shadow-xl shadow-gray-250/10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight text-center md:text-left">
              Defend Your <span className="text-gradient-purple">Organic Authority</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-600 font-medium">
              <p>
                <strong>The Business Problem:</strong> Search algorithms are updated hundreds of times annually. If code shifts break your microdata layouts, or competitor optimization outpaces you, your hard-won search rankings will drop, affecting bottom-line pipeline revenue.
              </p>
              <p>
                <strong>Our Technical Solution:</strong> We provide continuous SEO maintenance packages. Our engineering team schedules weekly page validation checks, monitors search console crawl exceptions, keeps redirect links updated, and defends your target keywords.
              </p>
            </div>
          </div>
        </section>

        {/* Maintenance Pillars */}
        <section className="py-12 md:py-24 bg-white border-y border-gray-200/60 shadow-sm">
          <div className="container mx-auto px-6 lg:px-12">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight text-center mb-16">
              Continuous <span className="text-gradient-cyan">SEO Operations</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Redirection & Index Monitoring",
                  desc: "We scan for crawl anomalies (404s, redirect loops, un-indexed tags) and update database pathways instantly before search bot spiders trigger warnings.",
                  icon: Search
                },
                {
                  title: "Schema Maintenance",
                  desc: "When schema standards change, we update and re-validate JSON-LD blocks on FAQ, Product, and Article pages to ensure rich snippets remain active.",
                  icon: RefreshCw
                },
                {
                  title: "Keyword Position Audits",
                  desc: "Weekly ranking volatility tracking and competitive intelligence reporting, mapping out adjustment tasks to defend your organic search authority.",
                  icon: BarChart2
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
                  <span className="text-secondary-indigo text-[10px] font-black tracking-widest mt-8 block uppercase">CONTINUOUS CARE</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Scoping Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Request an <span className="text-gradient-purple">SEO Maintenance Proposal</span>
            </h3>
            <p className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed mb-12 font-medium">
              Talk to our technical SEO specialists to design a rank defending package matching your enterprise size and website scale.
            </p>
            <div className="bg-gray-50 border border-gray-200/60 shadow-xl p-8 md:p-12 rounded-[3.5rem]">
              <ContactForm variant="default" service="SEO Maintenance" />
            </div>
          </div>
        </section>

      </div>
    </ServiceLayout>
  );
}

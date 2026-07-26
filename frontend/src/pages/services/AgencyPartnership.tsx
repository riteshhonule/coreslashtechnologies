import React from "react";
import ServiceLayout from "./ServicesLayout";
import SEO from "../../components/SEO";
import ContactForm from "../../components/ContactForm";
import { Users, Layers, Award, Target, HelpCircle, ArrowRight, ShieldCheck, Check } from "lucide-react";

export default function AgencyPartnership() {
  const pageUrl = "https://coreslashtechnologies.com/services/agency-partnership";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Agency Partnership Programs",
    "description": "Premium white-label software engineering and technical partnership models for global agencies.",
    "provider": {
      "@type": "Organization",
      "name": "CoreSlash Technologies",
      "url": "https://coreslashtechnologies.com"
    }
  };

  return (
    <ServiceLayout
      title="Agency Partnership"
      subtitle="Scale your agency's technical execution with our dedicated software engineering squads."
      ctaText="Discuss Partner Program"
    >
      <SEO
        title="Agency Partnership Programs | CoreSlash Technologies"
        description="Premium B2B white-label software development, dedicated developer teams, and technology outsourcing partnerships for global digital agencies."
        structuredData={structuredData}
        canonicalUrl={pageUrl}
      />

      <div className="bg-[#F9FAFB] text-gray-900 font-sans leading-relaxed pb-20">
        
        {/* Intro Section */}
        <section className="container mx-auto px-6 lg:px-12 py-12 md:py-24 max-w-5xl">
          <div className="bg-white p-8 md:p-16 rounded-[3rem] border border-gray-200 shadow-xl shadow-gray-250/10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight text-center md:text-left">
              The Technology Partner for <span className="text-gradient-purple">Growing Agencies</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-600 font-medium">
              <p>
                <strong>The Business Problem:</strong> Digital and creative agencies often struggle to deliver complex software projects, custom database structures, or AI integrations due to a lack of in-house senior developers, leading to missed opportunities.
              </p>
              <p>
                <strong>Our Technical Solution:</strong> CoreSlash Technologies acts as your dedicated technical delivery team. We deploy senior developers, manage full systems integration, write clean modular source code, and commit to strict white-label code agreements.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-12 md:py-24 bg-white border-y border-gray-200/60">
          <div className="container mx-auto px-6 lg:px-12">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight text-center mb-16">
              Our Partnership <span className="text-gradient-cyan">Models & Execution</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Dedicated Squads",
                  desc: "A fully integrated engineering team consisting of senior developers, database architects, and QA testers allocated to your agency projects.",
                  tag: "RESOURCE SCALING"
                },
                {
                  title: "White-Label Execution",
                  desc: "All source code, commits, design systems, and deployments are executed under your agency's name, protected by strict mutual NDAs.",
                  tag: "SILENT DELIVERY"
                },
                {
                  title: "Agile Project Syncs",
                  desc: "Complete transparency with bi-weekly sprint reviews, shared Jira boards, direct Slack developer communication, and clear milestone estimations.",
                  tag: "SEAMLESS INTEGRATION"
                }
              ].map((model, idx) => (
                <div key={idx} className="bg-[#F9FAFB] p-8 rounded-3xl border border-gray-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <h4 className="font-bold text-gray-950 text-xl mb-3">{model.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">{model.desc}</p>
                  </div>
                  <span className="text-secondary-indigo text-xs font-black tracking-widest mt-6 block">{model.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Structured QA & Scope */}
        <section className="py-12 md:py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight text-center mb-10">How We Coordinate Deliveries</h3>
            <div className="space-y-4 font-medium text-gray-650 text-sm">
              {[
                { q: "Strict NDA & IP Ownership Transfer", a: "We sign clean non-disclosure agreements before scheduling technical calls. 100% of codebase ownership, system assets, and structural files transfer directly to your agency or your end-client upon milestone completion." },
                { q: "Git Commit & White-Label Access", a: "Our engineers pull requests and commit directly to your GitHub/GitLab repositories. We sign commits with non-branded profiles to preserve agency integrity." },
                { q: "Support SLA for Agency Client Portals", a: "We provide SLA guarantees and post-launch technical support tiers. If your client experiences server downtime, our team resolves issues immediately." }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">
                  <span className="font-bold text-gray-950 block mb-2 text-base">{faq.q}</span>
                  <p className="text-gray-500 leading-relaxed text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Scoping Section */}
        <section className="py-12 bg-white border-t border-gray-200/60">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Talk to Our <span className="text-gradient-purple">Partnership Team</span>
            </h3>
            <p className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed mb-12 font-medium">
              Discuss white-label rates, developer capacity, scheduling timelines, and onboarding integrations with our engineering leads.
            </p>
            <div className="bg-gray-50 border border-gray-200/60 shadow-xl p-8 md:p-12 rounded-[3.5rem]">
              <ContactForm variant="default" service="Agency Partnership" />
            </div>
          </div>
        </section>

      </div>
    </ServiceLayout>
  );
}

import React from "react";
import ServiceLayout from "./ServicesLayout";
import SEO from "../../components/SEO";
import ContactForm from "../../components/ContactForm";
import { ShieldCheck, Server, RefreshCw, CheckCircle2, Layers } from "lucide-react";

export default function WhiteLabelDevelopment() {
  const pageUrl = "https://coreslashtechnologies.com/services/white-label-development";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "White Label Software Development",
    "description": "On-demand white-label engineering services, software logic building, and scalable B2B delivery pipelines.",
    "provider": {
      "@type": "Organization",
      "name": "CoreSlash Technologies",
      "url": "https://coreslashtechnologies.com"
    }
  };

  return (
    <ServiceLayout
      title="White Label Development"
      subtitle="Bespoke software development executed silently under your brand's name."
      ctaText="Discuss Outsource Scope"
    >
      <SEO
        title="White Label Software Development | CoreSlash Technologies"
        description="Premium on-demand white-label software development, backend API scaling, custom web platforms, and mobile engineering under strict NDAs."
        structuredData={structuredData}
        canonicalUrl={pageUrl}
      />

      <div className="bg-[#F9FAFB] text-gray-900 font-sans leading-relaxed pb-20">
        
        {/* Intro Section */}
        <section className="container mx-auto px-6 lg:px-12 py-12 md:py-24 max-w-5xl">
          <div className="bg-white p-8 md:p-16 rounded-[3rem] border border-gray-200 shadow-xl shadow-gray-250/10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight text-center md:text-left">
              Silent Engineering, <span className="text-gradient-purple">Premium Codebases</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-600 font-medium">
              <p>
                <strong>The Business Problem:</strong> Consulting firms and product teams face sudden peaks in feature requests or database migrations. Hiring full-time senior programmers creates massive overheads and recruitment delays.
              </p>
              <p>
                <strong>Our Technical Solution:</strong> We provide on-demand white-label software development. Our developers integrate into your workflow, adopting your coding standards, commit structures, project tracking systems, and NDA safety rules.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-12 md:py-24 bg-white border-y border-gray-200/60">
          <div className="container mx-auto px-6 lg:px-12">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight text-center mb-16">
              Our Development <span className="text-gradient-cyan">Capabilities</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#F9FAFB] p-8 rounded-3xl border border-gray-200/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/5 flex items-center justify-center text-primary-purple mb-6"><Layers className="w-5 h-5" /></div>
                  <h4 className="font-bold text-gray-950 text-xl mb-3">Custom Web Platforms</h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">Highly responsive Next.js and React frontends connected to robust NestJS or FastAPI server engines.</p>
                </div>
              </div>
              <div className="bg-[#F9FAFB] p-8 rounded-3xl border border-gray-200/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-green-500/5 flex items-center justify-center text-green-600 mb-6"><Server className="w-5 h-5" /></div>
                  <h4 className="font-bold text-gray-950 text-xl mb-3">Backend & Database Systems</h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">Database design, SQL query optimizations, Redis caching, microservices, and secure API gateways.</p>
                </div>
              </div>
              <div className="bg-[#F9FAFB] p-8 rounded-3xl border border-gray-200/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/5 flex items-center justify-center text-blue-600 mb-6"><RefreshCw className="w-5 h-5" /></div>
                  <h4 className="font-bold text-gray-950 text-xl mb-3">Mobile Applications</h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">High-fidelity cross-platform apps using Flutter or React Native with clean store deployments.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Scoping Section */}
        <section className="py-12 bg-white border-t border-gray-200/60">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Start Your <span className="text-gradient-purple">White Label Project</span>
            </h3>
            <p className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed mb-12 font-medium">
              Share your software wireframes, systems architecture requirements, or development timelines with our technical consultants.
            </p>
            <div className="bg-gray-50 border border-gray-200/60 shadow-xl p-8 md:p-12 rounded-[3.5rem]">
              <ContactForm variant="default" service="White Label Development" />
            </div>
          </div>
        </section>

      </div>
    </ServiceLayout>
  );
}

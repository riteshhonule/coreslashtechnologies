import React from "react";
import ServiceLayout from "./ServicesLayout";
import SEO from "../../components/SEO";
import ContactForm from "../../components/ContactForm";
import { CheckCircle2, Cpu, RefreshCw, BarChart2, Layers, Shield } from "lucide-react";

export default function AIAutomation() {
  const pageUrl = "https://coreslashtechnologies.com/services/ai-automation";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Automation Solutions",
    "description": "Custom LLM integrations, document extraction automation, NLP pipelines, and machine learning architectures.",
    "provider": {
      "@type": "Organization",
      "name": "CoreSlash Technologies",
      "url": "https://coreslashtechnologies.com"
    }
  };

  return (
    <ServiceLayout
      title="AI Automation"
      subtitle="Infusing autonomous intelligence into your business systems to eliminate operational bottlenecks."
      ctaText="Discuss AI Automation"
    >
      <SEO
        title="AI Automation & Custom ML Solutions | CoreSlash Technologies"
        description="Custom AI integration services. LLM pipelines, autonomous chatbots, document extraction OCR, vector database setup, and machine learning development."
        structuredData={structuredData}
        canonicalUrl={pageUrl}
      />

      <div className="bg-[#F9FAFB] text-gray-900 font-sans leading-relaxed pb-20">
        
        {/* Intro Section */}
        <section className="container mx-auto px-6 lg:px-12 py-12 md:py-24 max-w-5xl">
          <div className="bg-white p-8 md:p-16 rounded-[3rem] border border-gray-200 shadow-xl shadow-gray-250/10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight text-center md:text-left">
              Intelligent Business <span className="text-gradient-purple">Automation</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-600 font-medium">
              <p>
                <strong>The Business Problem:</strong> Repetitive data entries, slow customer support ticket routing, unstructured document analysis, and siloed software platforms cost organizations thousands of manual hours and introduce costly human errors.
              </p>
              <p>
                <strong>Our Technical Solution:</strong> We design custom artificial intelligence pipelines. We connect secure Large Language Models (LLMs) to your proprietary data systems, configure OCR document ingestion systems, build semantic databases, and code backend webhooks to automate execution.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Capabilities */}
        <section className="py-12 md:py-24 bg-white border-y border-gray-200/60 shadow-sm">
          <div className="container mx-auto px-6 lg:px-12">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight text-center mb-16">
              AI Engineering <span className="text-gradient-cyan">Capabilities</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Custom LLM Integrations",
                  desc: "We deploy secure LLM pipelines (OpenAI, Anthropic, or local open-source models) connected to your data using Retrieval-Augmented Generation (RAG) for accurate, contextual automation.",
                  icon: Cpu
                },
                {
                  title: "Document Ingestion & OCR",
                  desc: "We construct data processing systems that extract text, tables, and unstructured metrics from invoices, receipts, and PDFs, updating your CRM or ERP automatically.",
                  icon: Layers
                },
                {
                  title: "NLP Chatbots & Support Routing",
                  desc: "We build advanced, conversational AI agents that resolve customer queries, schedule sessions, qualify leads, and route complex cases to specialists.",
                  icon: RefreshCw
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
                  <span className="text-secondary-indigo text-[10px] font-black tracking-widest mt-8 block uppercase">INTELLIGENCE CRITERIA</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Scoping Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Design Your <span className="text-gradient-purple">AI Roadmap</span>
            </h3>
            <p className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed mb-12 font-medium">
              Talk to our AI engineering leads to map out your database compatibility, LLM compliance parameters, and automation workflows.
            </p>
            <div className="bg-gray-50 border border-gray-200/60 shadow-xl p-8 md:p-12 rounded-[3.5rem]">
              <ContactForm variant="default" service="AI Automation" />
            </div>
          </div>
        </section>

      </div>
    </ServiceLayout>
  );
}

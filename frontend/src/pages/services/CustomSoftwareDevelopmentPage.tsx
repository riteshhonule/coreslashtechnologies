import React from "react";
import ServiceLayout from "./ServicesLayout";
import SEO from "../../components/SEO";
import ContactForm from "../../components/ContactForm";
import { Code, Server, Database, Shield, Cpu, RefreshCw, Layers, CheckCircle2 } from "lucide-react";

export default function CustomSoftwareDevelopmentPage() {
  const pageUrl = "https://coreslashtechnologies.com/services/custom-software-development";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Custom Software Development",
    "description": "Premium B2B custom software engineering, legacy systems modernization, and database integration.",
    "provider": {
      "@type": "Organization",
      "name": "CoreSlash Technologies",
      "url": "https://coreslashtechnologies.com"
    }
  };

  return (
    <ServiceLayout
      title="Custom Software Development"
      subtitle="Engineering tailored B2B software architectures and scalable database engines."
      ctaText="Discuss Your Project"
    >
      <SEO
        title="Custom Software Development Services | CoreSlash Technologies"
        description="Enterprise-grade custom software development, legacy system modernization, API design, and cloud application engineering. Get a technical scoping proposal."
        structuredData={structuredData}
        canonicalUrl={pageUrl}
      />

      <div className="bg-[#F9FAFB] text-gray-900 font-sans leading-relaxed pb-20">
        
        {/* Intro Section */}
        <section className="container mx-auto px-6 lg:px-12 py-12 md:py-24 max-w-5xl">
          <div className="bg-white p-8 md:p-16 rounded-[3rem] border border-gray-200 shadow-xl shadow-gray-250/10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight text-center md:text-left">
              The Engine for <span className="text-gradient-purple">Proprietary</span> Innovation
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-600 font-medium">
              <p>
                <strong>The Business Problem:</strong> Many growing enterprises rely on generic off-the-shelf software or rigid SaaS platforms. This leads to spreadsheet fragmentation, manual data entry, data silos, and rising monthly per-seat licensing costs that limit scale.
              </p>
              <p>
                <strong>Our Technical Solution:</strong> We engineer custom software solutions from the database layer up. By building bespoke web and mobile systems, we normalize database schemas, secure data routes, and establish direct API pipelines, giving you 100% IP control.
              </p>
            </div>
          </div>
        </section>

        {/* Technology Stack Grid */}
        <section className="py-12 md:py-24 bg-white border-y border-gray-200/60">
          <div className="container mx-auto px-6 lg:px-12">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight text-center mb-16">
              Our Core <span className="text-gradient-cyan">Technology Stack</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { title: "Languages", items: ["TypeScript", "Python", "Go", "Java"] },
                { title: "Frameworks", items: ["React / Next.js", "NestJS", "FastAPI", "Spring Boot"] },
                { title: "Databases", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis Cache"] },
                { title: "Cloud & DevOps", items: ["AWS Cloud", "Docker", "Kubernetes", "CI/CD Pipelines"] }
              ].map((group, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-200/60 shadow-sm text-center">
                  <h4 className="font-bold text-gray-950 mb-3 text-base">{group.title}</h4>
                  <ul className="space-y-1.5 text-sm text-gray-500 font-semibold">
                    {group.items.map((item, i) => (
                      <li key={i} className="flex items-center justify-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-secondary-indigo" /> {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Proposition Grid */}
        <section className="py-12 md:py-24">
          <div className="container mx-auto px-6 lg:px-12">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight text-center mb-16">
              Value <span className="text-gradient-purple">Metrics & Benefits</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-gray-200/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/5 flex items-center justify-center text-primary-purple mb-6"><Layers className="w-5 h-5" /></div>
                  <h4 className="font-bold text-gray-900 text-lg mb-3">Modular Microservices</h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">Decoupled microservice architectures that scale backend resources dynamically under load spikes.</p>
                </div>
                <span className="text-primary-purple text-xs font-black tracking-widest mt-6 block uppercase">Scalability</span>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-200/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-green-500/5 flex items-center justify-center text-green-600 mb-6"><Shield className="w-5 h-5" /></div>
                  <h4 className="font-bold text-gray-900 text-lg mb-3">Enterprise Security</h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">Data encryption (AES-256) at rest, secure SSL/TLS transit channels, and OWASP safety audits.</p>
                </div>
                <span className="text-green-600 text-xs font-black tracking-widest mt-6 block uppercase">Protection</span>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-200/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/5 flex items-center justify-center text-blue-600 mb-6"><RefreshCw className="w-5 h-5" /></div>
                  <h4 className="font-bold text-gray-900 text-lg mb-3">Long-term IP Ownership</h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">Get 100% intellectual property ownership of the source code, eliminating per-user monthly SaaS fees.</p>
                </div>
                <span className="text-blue-600 text-xs font-black tracking-widest mt-6 block uppercase">IP Control</span>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Scoping Section */}
        <section className="py-12 bg-white border-t border-gray-200/60">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Request a <span className="text-gradient-purple">Scoping Proposal</span>
            </h3>
            <p className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed mb-12 font-medium">
              Talk to our software engineers to map out user journeys, design database schemas, and outline deployment milestones.
            </p>
            <div className="bg-gray-50 border border-gray-200/60 shadow-xl p-8 md:p-12 rounded-[3.5rem]">
              <ContactForm variant="default" service="Custom Software Development" />
            </div>
          </div>
        </section>

      </div>
    </ServiceLayout>
  );
}

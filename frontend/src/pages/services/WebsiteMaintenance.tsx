import React from "react";
import ServiceLayout from "./ServicesLayout";
import SEO from "../../components/SEO";
import ContactForm from "../../components/ContactForm";
import { CheckCircle2, Shield, Flame, Activity, ShieldAlert, Cpu } from "lucide-react";

export default function WebsiteMaintenance() {
  const pageUrl = "https://coreslashtechnologies.com/services/website-maintenance";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Website Maintenance & Technical SLA Support",
    "description": "Premium B2B web maintenance, database backups, dependency upgrades, security updates, and SLA support.",
    "provider": {
      "@type": "Organization",
      "name": "CoreSlash Technologies",
      "url": "https://coreslashtechnologies.com"
    }
  };

  const maintenancePlans = [
    {
      name: "SLA Core Support",
      price: "Discuss",
      desc: "Ideal for business websites requiring routine backups, basic dependency updates, and security scanning.",
      features: [
        "Weekly Cloud Database Backups",
        "CMS Core & Plugin Security Patching",
        "Uptime Monitoring (5-min checks)",
        "SSL Certificate Verification",
        "48-hour Bug Fix Response",
        "Monthly Health Reports"
      ]
    },
    {
      name: "SLA Professional Care",
      price: "Discuss",
      desc: "Designed for e-commerce platforms and high-traffic portals requiring proactive optimizations.",
      features: [
        "Daily Cloud Database Backups",
        "Bi-weekly Speed & Core Web Vitals Audit",
        "Vulnerability Patching & Firewall Setup",
        "Broken Link & API Connection Fixes",
        "24-hour Bug Fix Response Priority",
        "4 Developer Hours/Month for Tweaks"
      ],
      isPopular: true
    },
    {
      name: "Enterprise SLA Support",
      price: "Discuss",
      desc: "Comprehensive support for custom applications, databases, and multi-tenant cloud platforms.",
      features: [
        "Real-time database mirroring",
        "Continuous vulnerability audits",
        "AWS CloudWatch logs monitoring",
        "API Integration & Webhook Maintenance",
        "4-hour SLA critical bug response",
        "12 Developer Hours/Month for Upgrades"
      ]
    }
  ];

  return (
    <ServiceLayout
      title="Website Maintenance"
      subtitle="Guaranteeing uptime, security patches, and sub-second performance for your web assets."
      ctaText="Request Support SLA Proposal"
    >
      <SEO
        title="Website Maintenance & SLA Support Services | CoreSlash Technologies"
        description="Premium website maintenance services. Uptime monitoring, dependency updates, security audits, database cleanups, and dedicated B2B developer SLA support."
        structuredData={structuredData}
        canonicalUrl={pageUrl}
      />

      <div className="bg-[#F9FAFB] text-gray-900 font-sans leading-relaxed pb-20">
        
        {/* Intro Section */}
        <section className="container mx-auto px-6 lg:px-12 py-12 md:py-24 max-w-5xl">
          <div className="bg-white p-8 md:p-16 rounded-[3rem] border border-gray-200 shadow-xl shadow-gray-250/10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight text-center md:text-left">
              Protect Your <span className="text-gradient-purple">Digital Infrastructure</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-600 font-medium">
              <p>
                <strong>The Business Problem:</strong> Websites that lack technical monitoring gradually degrade. They face database index fragmentation, dependency code deprecations, unpatched security vulnerabilities, and database inflation, causing drop-offs in page loading speeds and sales conversions.
              </p>
              <p>
                <strong>Our Technical Solution:</strong> CoreSlash Technologies offers structured Service Level Agreements (SLAs). We deploy automated uptime sensors, run bi-weekly vulnerability audits, perform database normalization cleanups, and allocate dedicated developer hours to resolve issues.
              </p>
            </div>
          </div>
        </section>

        {/* Maintenance Plans */}
        <section className="py-12 md:py-24 bg-white border-y border-gray-200/60 shadow-sm">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-16 text-center tracking-tight">
              Maintenance <span className="text-gradient-cyan">Support Tiers</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {maintenancePlans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`relative p-10 rounded-[3.5rem] border flex flex-col justify-between ${
                    plan.isPopular
                      ? "bg-white border-2 border-primary-purple/35 shadow-2xl scale-103 z-10"
                      : "bg-white border-gray-200 hover:border-secondary-indigo/30 shadow-md transition-all duration-350"
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-primary-purple text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
                      Most Requested SLA
                    </div>
                  )}
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">{plan.desc}</p>
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                          <div className="w-5.5 h-5.5 rounded-full bg-secondary-indigo/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-secondary-indigo" />
                          </div>
                          <span className="text-gray-600 text-sm font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Discuss Your <span className="text-gradient-purple">Support Plan</span>
            </h3>
            <p className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed mb-12 font-medium">
              Talk to our systems engineers to select the maintenance tier that fits your application structure and user load.
            </p>
            <div className="bg-gray-50 border border-gray-200/60 shadow-xl p-8 md:p-12 rounded-[3.5rem]">
              <ContactForm variant="default" service="Website Maintenance" />
            </div>
          </div>
        </section>

      </div>
    </ServiceLayout>
  );
}

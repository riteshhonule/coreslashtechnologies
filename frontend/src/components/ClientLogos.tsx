import React from "react";

export default function ClientLogos() {
  const logos = [
    { name: "DigitalAgency", label: "DIGITAL AGENCY" },
    { name: "CreativeStudio", label: "CREATIVE STUDIO" },
    { name: "SaaSLabs", label: "SAAS LABS" },
    { name: "MarketingFlow", label: "MARKETING FLOW" },
    { name: "TechGroup", label: "TECH GROUP" },
    { name: "DesignCore", label: "DESIGN CORE" }
  ];

  return (
    <section className="py-10 bg-white border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[10px] font-bold text-gray-400 tracking-[0.25em] uppercase mb-8">
          TRUSTED BY US & GLOBAL DIGITAL AGENCIES AS THEIR ENGINEERING SECRET
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-20 opacity-40 hover:opacity-60 transition-opacity duration-300">
          {logos.map((logo, idx) => (
            <div key={idx} className="flex items-center gap-2 select-none grayscale cursor-pointer">
              <svg className="w-6 h-6 text-gray-950 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
                <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span className="font-display font-bold text-sm md:text-base tracking-[0.05em] text-gray-900 leading-none">
                {logo.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

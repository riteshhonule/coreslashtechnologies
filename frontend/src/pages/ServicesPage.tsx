import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import WhyChooseUs from "../components/WhyChooseUs";
import SEO from "../components/SEO";
import { SparklesIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

// Importing images
import websiteImg from "../img/website.webp";
import ppcImg from "../img/ads.webp";
import ecommerceImg from "../img/e-commerce.webp";
import socialImg from "../img/FacebookInstagram-Ads.webp";
import googleAdsImg from "../img/google-ads.webp";
import seoImg from "../img/SEO-optimization.webp";
import managementImg from "../img/social-media-management.webp";

const services = [
  {
    title: "AI Solutions",
    desc: "Predictive analytics, custom NLP pipelines, image modeling, and autonomous workflows designed for operational efficiency.",
    image: seoImg,
    link: "/services/ai-solutions"
  },
  {
    title: "Custom Software Development",
    desc: "Scalable enterprise architectures, legacy modernization, systems integration, and bespoke operations planning databases.",
    image: websiteImg,
    link: "/services/custom-software-development"
  },
  {
    title: "Website Development",
    desc: "Sub-second load times, headless architectures, React/Next.js platforms, and high-performance digital stores.",
    image: ecommerceImg,
    link: "/services/website-development"
  },
  {
    title: "Website Maintenance",
    desc: "Uptime monitoring, continuous security patches, SLA technical support, and backup scheduling.",
    image: websiteImg,
    link: "/services/website-maintenance"
  },
  {
    title: "Technical SEO",
    desc: "Core Web Vitals acceleration, site crawlability optimization, schema mappings, and organic search engineering.",
    image: seoImg,
    link: "/services/technical-seo"
  },
  {
    title: "ERP & CRM Development",
    desc: "Operations management suites, billing automations, custom client portals, and pipeline managers.",
    image: ecommerceImg,
    link: "/services/erp-crm-development"
  },
  {
    title: "SaaS Development",
    desc: "Multi-tenant platforms, subscription logic integration, dashboard reporting, and secure tenant separation.",
    image: websiteImg,
    link: "/services/saas-development"
  },
  {
    title: "API Development & Integration",
    desc: "Robust RESTful and GraphQL API gateways, secure webhooks, and third-party data synchronization pipelines.",
    image: websiteImg,
    link: "/services/api-development"
  },
  {
    title: "Mobile App Development",
    desc: "Premium native iOS & Android applications and high-performance cross-platform mobile frameworks.",
    image: websiteImg,
    link: "/services/app-development"
  },
  {
    title: "Cloud Deployment",
    desc: "AWS configuration, Docker/Kubernetes container orchestration, server migrations, and CI/CD pipelines.",
    image: websiteImg,
    link: "/services/cloud-solutions"
  }
];

export default function ServicesPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#F9FAFB] overflow-hidden">
      <SEO 
        title="Software Development Services | CoreSlash Technologies"
        description="Explore our custom software development, web development, mobile applications, AI, cloud, DevOps, UI/UX, and enterprise solutions."
      />
      {/* ================= HERO HEADER ================= */}
      <section className="relative pt-10 md:pt-16 pb-16 md:pb-32 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-purple/3 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-indigo/2 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 1, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-8"
          >
            <SparklesIcon className="w-4 h-4 text-secondary-indigo" />
            <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.3em]">
              Our Capability Matrix
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-5xl md:text-8xl font-bold text-gray-900 mb-10 leading-[1.1] tracking-tight"
          >
            Engineering <br />
            <span className="text-gradient-purple">Service Matrix</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="text-gray-500 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
          >
            We build intelligent software, scalable web applications, AI-powered solutions, and high-performance websites for growing businesses.
          </motion.p>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="py-12 md:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const isWide = idx === 0 || idx === 5;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 1, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0, margin: "200px" }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                className={`group relative w-full ${isWide ? "md:col-span-2" : "md:col-span-1"}`}
              >
                <Link to={service.link} className="block h-full">
                  <div className={`glass-card h-full p-8 md:p-10 rounded-[3rem] border border-gray-300 bg-white hover:border-secondary-indigo/20 transition-all duration-500 relative overflow-hidden flex flex-col items-center text-center shadow-md shadow-gray-200/30 ${
                    isWide ? "md:flex-row md:text-left md:items-center md:justify-between" : ""
                  }`}>
                    {/* Hover Image Reveal */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        loading="lazy"
                        decoding="async"
                        width={450}
                        height={450}
                        className="w-full h-full object-cover grayscale" 
                      />
                    </div>

                    <div className={`relative z-10 flex flex-col items-center text-center ${
                      isWide ? "md:flex-row md:text-left md:items-center md:flex-1" : ""
                    }`}>
                      <div className={`mb-6 shrink-0 ${isWide ? "md:mb-0 md:mr-8" : "mx-auto"}`}>
                        <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-secondary-indigo/10 transition-colors duration-500 mx-auto">
                          <img 
                            src={service.image} 
                            alt={service.title} 
                            loading="lazy"
                            decoding="async"
                            width={450}
                            height={450}
                            className="w-12 h-12 object-cover rounded-lg" 
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className={`text-2xl font-bold text-gray-900 mb-4 tracking-tight group-hover:text-secondary-indigo transition-colors ${
                          isWide ? "md:text-left" : "text-center"
                        }`}>
                          {service.title}
                        </h3>
                        <p className={`text-gray-500 leading-relaxed font-medium mb-6 group-hover:text-gray-600 transition-colors ${
                          isWide ? "md:text-left md:mb-0 pr-4" : "text-center"
                        }`}>
                          {service.desc}
                        </p>
                      </div>
                    </div>

                    <div className={`relative z-10 flex items-center justify-center gap-2 text-secondary-indigo font-bold text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 shrink-0 ${
                      isWide ? "md:opacity-100 md:translate-x-0" : "mt-6"
                    }`}>
                      <span className={isWide ? "hidden lg:inline" : ""}>EXPLORE MODULE</span> <ArrowRightIcon className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= ADDITIONAL SERVICES ================= */}
      <section className="py-12 md:py-16 bg-white border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Additional <span className="text-gradient-purple">Services</span>
          </h2>
          <p className="text-gray-500 text-lg mb-12 max-w-2xl mx-auto font-medium">
            We also provide supplementary digital consulting and creative systems support.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
            {[
              { title: "Outsource Design", desc: "Corporate brand assets and collateral layout." },
              { title: "Social Infrastructure", desc: "Setting up secure workspace channels and communication paths." },
              { title: "Content Engineering", desc: "Structuring technical blogs and developer documentation." },
              { title: "Digital Marketing Integration", desc: "Deploying tracking pixels, tag managers, and ad integrations." }
            ].map((s, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-3xl border border-gray-200/60 shadow-sm flex flex-col justify-between">
                <h4 className="font-bold text-gray-900 text-sm mb-2">{s.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-16 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0, margin: "200px" }}
            className="bg-white p-8 md:p-24 rounded-[4rem] border border-gray-200/60 shadow-xl shadow-gray-200/30 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-purple/3 to-transparent pointer-events-none" />

            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-10 tracking-tight">
              Ready for <span className="text-gradient-cyan">Global Scale?</span>
            </h2>

            <p className="text-gray-500 text-xl mb-12 leading-relaxed">
              Let's architect a custom technology roadmap to achieve your strategic objectives.
            </p>

            <div className="flex justify-center">
              <Link
                to="/contact"
                className="w-full sm:w-auto btn-pill btn-primary-glow text-white text-base sm:text-lg px-6 py-3 sm:px-12 sm:py-4 inline-block text-center whitespace-nowrap"
              >
                Get Custom Proposal
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <WhyChooseUs />
    </div>
  );
}

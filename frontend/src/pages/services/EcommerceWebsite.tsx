import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import EngagementModels from "@/components/web-development/EngagementModels";
import ProcessTimeline from "@/components/web-development/ProcessTimeline";
import FaqSection, { type FaqData } from "@/components/ui/habit-faq-scroller";
import { CoreServiceCard } from "@/components/web-development/CoreServices";

const ecommerceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom E-Commerce Development Services",
  "url": "https://coreslashtechnologies.com/services/ecommerce-solutions",
  "provider": {
    "@type": "Organization",
    "name": "CoreSlash Technologies",
    "url": "https://coreslashtechnologies.com/",
    "logo": "https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png"
  },
  "serviceType": "E-Commerce Development",
  "description": "Custom headless e-commerce platforms, checkout optimization, multi-currency cart architectures, and ERP integration for scaling online businesses.",
  "areaServed": "Worldwide"
};

const ecommerceFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Everything you need to know about Headless E-Commerce, payment integrations, and ERP sync.",
  rows: [
    {
      id: "row1",
      speed: "45s",
      direction: "left",
      faqItems: [
        { id: "q1", question: "What is Headless E-Commerce and why choose it?", answer: "Headless e-commerce decouples frontend from backend. This allows sub-second page loads, total design freedom, and custom app integration." },
        { id: "q2", question: "Can you handle custom multi-vendor marketplaces?", answer: "Yes! CoreSlash builds multi-vendor platforms with seller onboarding dashboards, automated split payouts, inventory tracking, and commission rules." }
      ]
    },
    {
      id: "row2",
      speed: "40s",
      direction: "right",
      faqItems: [
        { id: "q3", question: "How do you ensure secure payment processing?", answer: "CoreSlash enforces tokenized payment gateways (Stripe, PayPal) keeping your platform 100% PCI-DSS compliant." },
        { id: "q4", question: "Do you integrate with warehouse and ERP software?", answer: "Yes, CoreSlash integrates custom REST APIs with ERPs like SAP, NetSuite, Odoo, and warehouse management systems for real-time sync." }
      ]
    }
  ]
};

export default function EcommerceWebsite() {

  return (
    <>
      <Helmet>
        <title>Custom E-Commerce Development | CoreSlash Technologies</title>
        <meta name="description" content="Custom headless e-commerce platforms, checkout optimization, multi-currency cart architectures, and ERP integration." />
        <link rel="canonical" href="https://coreslashtechnologies.com/services/ecommerce-solutions" />

        {/* Open Graph SEO */}
        <meta property="og:title" content="Custom E-Commerce Development | CoreSlash Technologies" />
        <meta property="og:description" content="Custom headless e-commerce platforms, checkout optimization, multi-currency cart architectures, and ERP integration." />
        <meta property="og:url" content="https://coreslashtechnologies.com/services/ecommerce-solutions" />
        <meta property="og:type" content="website" />

        {/* Twitter Card SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Custom E-Commerce Development | CoreSlash Technologies" />
        <meta name="twitter:description" content="Custom headless e-commerce platforms, checkout optimization, multi-currency cart architectures, and ERP integration." />

        <script type="application/ld+json">{JSON.stringify(ecommerceSchema)}</script>
      </Helmet>

      {/* 1. HERO SECTION */}
      <section
        className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-start overflow-hidden py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-slate-950"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1556742049-0a6756598c19?w=1600&auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dual Vignette Overlay: Blends both left and right edges seamlessly into deep dark slate-950 */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-l from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent)] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto w-full relative z-10 text-left space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-zinc-300 select-none">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <span>&gt;</span>
            <Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link>
            <span>&gt;</span>
            <span className="text-[#3b82f6] font-bold">E-Commerce Solutions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15] max-w-4xl">
            Building High-Converting{" "}
            <span className="text-[#3b82f6]">
              Custom E-Commerce
            </span>{" "}
            Platforms
          </h1>

          <p className="text-zinc-300 text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl font-medium">
            CoreSlash Technologies provides custom e-commerce development services for high-converting online stores, headless storefronts, multi-vendor marketplaces, and scalable commerce platforms with secure checkout and real-time inventory integration.
          </p>

          {/* CTA Buttons & Feature Badges Row */}
          <div className="pt-2 space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all text-center"
              >
                <span>Launch Your Web Store</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition-all text-center"
              >
                <span>View E-Commerce Work</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-300 pt-3 border-t border-slate-800/80 max-w-3xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Headless & Custom Cart</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Multi-Currency & Tax Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Sub-Second Page Loads</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE SERVICES */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden bg-background">
        <div className="flex flex-col items-start gap-4 mb-16">
          <div className="flex items-center">
            <div className="w-[3px] h-6 bg-[#3b82f6] rounded-full mr-3" />
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-muted-foreground">
              Core Services – E-Commerce Solutions
            </h3>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">Scalable E-Commerce Infrastructure</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CoreServiceCard
            number="01"
            title="Custom Headless Storefronts"
            subtext="Build sub-second React/Next.js e-commerce storefronts connected to Shopify, WooCommerce, or BigCommerce Storefront APIs."
            highlight="Sub-second storefront page rendering engineered for maximum organic conversion rates."
            darkBg={true}
            delay={0.1}
          />
          <CoreServiceCard
            number="02"
            title="Payment Gateway & Checkout Pipelines"
            subtext="Seamless multi-currency payment checkout integrations (Stripe, PayPal, Apple Pay, Klarna) with PCI-DSS compliance."
            highlight="Frictionless checkout flows with automated tax calculations and multi-currency support."
            delay={0.2}
          />
          <CoreServiceCard
            number="03"
            title="Multi-Vendor Marketplace Engines"
            subtext="Build custom marketplaces with seller portal dashboards, automated payout splits, and catalog management systems."
            highlight="Automated seller onboarding, order routing, and real-time commission split rules."
            delay={0.3}
          />
          <CoreServiceCard
            number="04"
            title="ERP & Inventory Synchronization"
            subtext="Real-time bi-directional data pipelines connecting online carts with SAP, NetSuite, QuickBooks, and custom warehouse management tools."
            highlight="Automated inventory sync across warehouse hubs preventing stockouts and data errors."
            blueBg={true}
            delay={0.4}
          />
        </div>
      </section>

      {/* 3. PROCESS TIMELINE */}
      <ProcessTimeline />

      {/* 4. ENGAGEMENT MODELS */}
      <EngagementModels />

      {/* 6. FAQS */}
      <section className="w-full py-16 md:py-24 border-t border-border/40 overflow-hidden bg-background">
        <FaqSection data={ecommerceFaqData} />
      </section>

      {/* 7. CTA */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="rounded-[3rem] bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-10 md:p-16 text-center text-white relative overflow-hidden"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to Build Your Enterprise E-Commerce Platform?</h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-8">Consult with our e-commerce engineers to architect your custom store.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#3b82f6] text-white font-extrabold hover:bg-blue-600 transition-all shadow-lg">
            <span>Schedule Discovery Call</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}

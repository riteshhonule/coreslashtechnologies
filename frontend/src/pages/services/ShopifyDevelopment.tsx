import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import EngagementModels from "@/components/web-development/EngagementModels";
import ProcessTimeline from "@/components/web-development/ProcessTimeline";
import FaqSection, { type FaqData } from "@/components/ui/habit-faq-scroller";
import { CoreServiceCard } from "@/components/web-development/CoreServices";
import { 
  SiShopify, SiReact, SiTailwindcss, SiGraphql
} from "react-icons/si";

const THEME_TECHS = [
  { name: "SHOPIFY OS 2.0", icon: <SiShopify className="w-6 h-6" />, color: "#96bf48" },
  { name: "LIQUID", icon: <SiShopify className="w-6 h-6" />, color: "#96bf48" },
  { name: "TAILWIND CSS", icon: <SiTailwindcss className="w-6 h-6" />, color: "#38BDF8" }
];

const HEADLESS_TECHS = [
  { name: "HYDROGEN", icon: <SiReact className="w-6 h-6" />, color: "#61DAFB" },
  { name: "REMIX", icon: <SiReact className="w-6 h-6" />, color: "#61DAFB" },
  { name: "STOREFRONT API", icon: <SiGraphql className="w-6 h-6" />, color: "#E10098" }
];

const APP_TECHS = [
  { name: "SHOPIFY CLI", icon: <SiShopify className="w-6 h-6" />, color: "#96bf48" },
  { name: "GRAPHQL ADMIN API", icon: <SiGraphql className="w-6 h-6" />, color: "#E10098" }
];

const shopifySchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Shopify Development Services",
  "url": "https://coreslashtechnologies.com/services/shopify-development",
  "provider": {
    "@type": "Organization",
    "name": "CoreSlash Technologies",
    "url": "https://coreslashtechnologies.com/",
    "logo": "https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png"
  },
  "serviceType": "Shopify Development",
  "description": "Custom Shopify themes, Liquid templates, Headless Storefronts, and seamless app integrations engineered to maximize conversions and scale e-commerce growth.",
  "areaServed": "Worldwide"
};

const shopifyFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Everything you need to know about custom Shopify themes, Headless Hydrogen, and store migrations.",
  rows: [
    {
      id: "row1",
      speed: "48s",
      direction: "left",
      faqItems: [
        { id: "q1", question: "Can you build custom Shopify themes from scratch?", answer: "Yes! We design custom Shopify OS 2.0 themes tailored to your brand aesthetics and conversion goals." },
        { id: "q2", question: "Can you migrate my existing store to Shopify?", answer: "We provide complete migration services from WooCommerce, Magento, or custom platforms, preserving all order data and SEO rankings." }
      ]
    },
    {
      id: "row2",
      speed: "42s",
      direction: "right",
      faqItems: [
        { id: "q3", question: "Do you offer Headless Shopify development?", answer: "Yes, we build Headless Shopify storefronts using Hydrogen (Remix) and Next.js connected to the Storefront GraphQL API for ultra-fast speeds." },
        { id: "q4", question: "How long does a custom Shopify store take?", answer: "Standard custom store setups take 3-5 weeks, while enterprise multi-country stores with custom app integrations take 6-10 weeks." }
      ]
    }
  ]
};

export default function ShopifyDevelopment() {
  const [activeTechTab, setActiveTechTab] = useState<"THEMES & LIQUID" | "HEADLESS HYDROGEN" | "APIS & APPS">("THEMES & LIQUID");

  const getTechsForTab = () => {
    switch (activeTechTab) {
      case "THEMES & LIQUID":
        return THEME_TECHS;
      case "HEADLESS HYDROGEN":
        return HEADLESS_TECHS;
      case "APIS & APPS":
        return APP_TECHS;
    }
  };

  return (
    <>
      <Helmet>
        <title>Shopify Development Services | CoreSlash Technologies</title>
        <meta name="description" content="Custom Shopify themes, Liquid templates, Headless Storefronts, and app integrations engineered to scale e-commerce revenue." />
        <link rel="canonical" href="https://coreslashtechnologies.com/services/shopify-development" />
        <script type="application/ld+json">{JSON.stringify(shopifySchema)}</script>
      </Helmet>

      {/* 1. HERO SECTION */}
      <section 
        className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-start overflow-hidden py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-slate-950"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=80')",
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
            <span className="text-[#3b82f6] font-bold">Shopify Development</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15] max-w-4xl">
            Scaling High-Converting{" "}
            <span className="text-[#3b82f6]">
              Shopify Stores
            </span>{" "}
            for E-Commerce Brands
          </h1>

          <p className="text-zinc-300 text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl font-medium">
            We engineer custom Shopify themes, OS 2.0 Liquid architectures, Headless Hydrogen storefronts, and deep API integrations built for speed and revenue growth.
          </p>

          {/* CTA Buttons & Feature Badges Row */}
          <div className="pt-2 space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all text-center"
              >
                <span>Build Your Shopify Store</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition-all text-center"
              >
                <span>View Shopify Work</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-300 pt-3 border-t border-slate-800/80 max-w-3xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Shopify OS 2.0 Themes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Headless Hydrogen & Storefront API</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>CRO & Checkout Speed Tuning</span>
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
              Core Services – Shopify Development
            </h3>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">End-to-End Shopify Engineering</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CoreServiceCard
            number="01"
            title="Custom Shopify OS 2.0 Theme Design"
            subtext="Tailor-crafted, high-converting Liquid themes engineered for mobile speed, checkout optimization, and brand identity."
            highlight="Custom OS 2.0 section architecture optimized for sub-second load times and high conversion rates."
            darkBg={true}
            delay={0.1}
          />
          <CoreServiceCard
            number="02"
            title="App Integration & Custom Private Apps"
            subtext="Connect ERPs, CRMs, inventory managers, and custom subscription workflows using Shopify GraphQL and REST Admin APIs."
            highlight="Custom Shopify Admin API tools engineered for automated workflow efficiency."
            delay={0.2}
          />
          <CoreServiceCard
            number="03"
            title="Store Migration to Shopify Plus"
            subtext="Seamless data migration from WooCommerce, Magento, or custom carts to Shopify with zero data loss and 100% SEO preservation."
            highlight="Risk-free data and URL migration protecting your search engine rankings and order history."
            delay={0.3}
          />
          <CoreServiceCard
            number="04"
            title="Headless Commerce (Hydrogen & Remix)"
            subtext="Ultra-fast storefronts powered by React, Next.js, and Hydrogen coupled with Shopify Storefront API for sub-second load times."
            highlight="Decoupled frontend architecture providing extreme page speed and custom UX capabilities."
            blueBg={true}
            delay={0.4}
          />
        </div>
      </section>

      {/* 3. PROCESS TIMELINE */}
      <ProcessTimeline />

      {/* 4. ENGAGEMENT MODELS */}
      <EngagementModels />

      {/* 5. TECH STACK (Animated Framer Motion Sliding Tabs) */}
      <section className="relative w-full py-24 border-t border-border/40 overflow-hidden bg-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 w-full text-left">
          <div className="text-center max-w-[900px] mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2 mb-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/20">
              <span>Modern Technology Stack</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight text-center">
              Technologies{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                We Use
              </span>
            </h2>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-4xl mx-auto font-normal text-center">
              We leverage modern Shopify OS 2.0 architectures, Remix/Hydrogen headless tech, and Storefront APIs for high conversion.
            </p>
          </div>

          <div className="flex items-center justify-center gap-8 md:gap-16 border-b border-border/40 mb-12 py-3">
            {(["THEMES & LIQUID", "HEADLESS HYDROGEN", "APIS & APPS"] as const).map((tab) => {
              const isActive = activeTechTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTechTab(tab)}
                  className="relative py-2 text-sm md:text-base lg:text-lg font-extrabold tracking-wider transition-colors duration-300 focus:outline-none uppercase"
                  style={{ color: isActive ? "#3b82f6" : "var(--muted-foreground, #71717a)" }}
                >
                  {tab}
                  {isActive && (
                    <motion.div
                      layoutId="activeShopifyTabUnderline"
                      className="absolute bottom-0 inset-x-0 h-[3px] bg-[#3b82f6] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            <AnimatePresence mode="popLayout">
              {getTechsForTab().map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, delay: idx * 0.02 }}
                  whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(59,130,246,0.06)", borderColor: "rgba(59,130,246,0.2)" }}
                  className="flex items-center gap-4 p-4 md:p-5 bg-white dark:bg-slate-900 border border-border/60 rounded-2xl shadow-sm transition-all select-none"
                >
                  <div className="text-2xl md:text-3xl" style={{ color: tech.color }}>{tech.icon}</div>
                  <span className="text-sm md:text-base font-medium text-foreground/90 uppercase truncate">{tech.name}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 7. CASE STUDIES (PORTFOLIO SHOWCASE) */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden bg-background">
        {/* Centered Middle Heading Block for Case Studies */}
        <div className="text-center max-w-[900px] mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 mb-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/25">
            <span>Case Studies</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-4 leading-tight text-center">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Case Studies
            </span>
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal text-center mb-6">
            Explore high-converting e-commerce platforms and Shopify Plus stores built for global brands.
          </p>

          <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors uppercase tracking-wider group">
            <span>VIEW ALL CASE STUDIES</span> <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Aura Apparel – Shopify Plus Custom Theme", subtext: "Ultra-fast Shopify OS 2.0 store with custom collection filters and 3.2s load time reduction.", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&auto=format&fit=crop&q=80" },
            { title: "LuxeDecor – Headless Hydrogen Storefront", subtext: "Oxygen hosted Remix/Hydrogen storefront handling 100k+ monthly active shoppers with instant page transitions.", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&auto=format&fit=crop&q=80" },
            { title: "KetoBites – Private App & Migration to Plus", subtext: "Seamless Magento to Shopify Plus migration with subscription billing & custom private app integration.", img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&auto=format&fit=crop&q=80" }
          ].map((item, idx) => (
            <motion.div 
              key={item.title} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group flex flex-col justify-between rounded-[2rem] bg-white dark:bg-slate-900 border border-border/80 shadow-sm hover:shadow-lg transition-all p-6"
            >
              <div className="relative w-full h-56 bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center mb-6 border border-border/40">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="text-left space-y-3 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="text-lg md:text-xl font-extrabold text-foreground group-hover:text-[#3b82f6] transition-colors">{item.title}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mt-2 line-clamp-3">{item.subtext}</p>
                </div>
                <div className="flex justify-end pt-4 mt-auto">
                  <Link to="/portfolio" className="text-xs md:text-sm font-extrabold text-[#3b82f6] flex items-center gap-1 group/btn uppercase tracking-wider">
                    View Case Study <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. FAQS */}
      <section className="w-full py-16 md:py-24 border-t border-border/40 overflow-hidden bg-background">
        <FaqSection data={shopifyFaqData} />
      </section>

      {/* 9. CTA */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="rounded-[3rem] bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-10 md:p-16 text-center text-white relative overflow-hidden"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to Build Your High-Converting Shopify Store?</h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-8">Schedule a discovery call with our Shopify engineering team to get started.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#3b82f6] text-white font-extrabold hover:bg-blue-600 transition-all shadow-lg">
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}

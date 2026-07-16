import Hero from "../components/Hero";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { envConfig } from "../config/env.config";
import React, { lazy, Suspense } from "react";

const Services = lazy(() => import("../components/Services"));
const PaymentGateway = lazy(() => import("../components/PaymentGateway"));
const About = lazy(() => import("../components/About"));
const Portfolio = lazy(() => import("../components/Portfolio"));
const LeadSection = lazy(() => import("../components/LeadSection"));
const CTA = lazy(() => import("../components/CTA"));

const Home = () => {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "CoreSlash Technologies",
      "url": envConfig.appUrl,
      "logo": `${envConfig.appUrl}/CoreslashTechnologies-solutions-main-logo.webp`,
      "description": "IT solutions, software development and AI systems company in India.",
      "sameAs": [
        envConfig.social.linkedin,
        envConfig.social.instagram,
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": envConfig.social.whatsappPhone,
        "contactType": "customer service",
        "email": envConfig.contact.email
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "CoreSlash Technologies",
      "url": envConfig.appUrl
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <SEO
        title="Home"
        description="CoreSlash Technologies offers cutting-edge AI Solutions, Custom Software Development, and Enterprise IT Solutions to scale your business."
        structuredData={structuredData}
      />
      <Hero />
      <Suspense fallback={null}>
        <Services />
        <PaymentGateway />
        <About />
        <Portfolio />
        <LeadSection />
        <CTA />
      </Suspense>
    </motion.div>
  );
};

export default Home;

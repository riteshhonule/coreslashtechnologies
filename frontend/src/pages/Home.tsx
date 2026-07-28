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

// New components
const ClientLogos = lazy(() => import("../components/ClientLogos"));
const WhyAgenciesPartner = lazy(() => import("../components/WhyAgenciesPartner"));
const Testimonials = lazy(() => import("../components/Testimonials"));

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <SEO
        title="CoreSlash Technologies | White-Label Software Engineering Partner"
        description="We become your invisible engineering team. Partner with CoreSlash for custom software, web development, technical SEO, and AI automation under your brand."
      />
      <Hero />
      <Suspense fallback={null}>
        <ClientLogos />
        <WhyAgenciesPartner />
        <Services />
        <PaymentGateway />
        <About />
        <Portfolio />
        <Testimonials />
        <LeadSection />
        <CTA />
      </Suspense>
    </motion.div>
  );
};

export default Home;

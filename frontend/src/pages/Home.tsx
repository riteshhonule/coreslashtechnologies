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
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <SEO
        title="CoreSlash Technologies | Software Development & AI Solutions"
        description="Enterprise-grade software development, AI solutions, web applications, mobile apps, cloud solutions, and digital transformation services."
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

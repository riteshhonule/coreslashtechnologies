import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import CTA from "../components/CTA";
import { motion } from "framer-motion";
import LeadSection from "../components/LeadSection";
import PaymentGateway from "../components/PaymentGateway";
import SEO from "../components/SEO";
import { envConfig } from "../config/env.config";

const Home = () => {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "CoreSlash Technologies",
      "url": envConfig.appUrl,
      "logo": `${envConfig.appUrl}/CoreslashTechnologies-solutions-main-logo.png`,
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
      <Services />
      <PaymentGateway />
      <About />
      <Portfolio />
      <LeadSection />
      <CTA />
    </motion.div>
  );
};

export default Home;

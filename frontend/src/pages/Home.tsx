import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import CTA from "../components/CTA";
import { motion } from "framer-motion";
import LeadSection from "../components/LeadSection";
import PaymentGateway from "../components/PaymentGateway";
import SEO from "../components/SEO";

const Home = () => {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "CoreSlash Technologies",
      "url": "https://coreslashtechnologies.com/",
      "logo": "https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png",
      "description": "IT solutions, software development and AI systems company in India.",
      "sameAs": [
        "https://www.linkedin.com/company/coreslash",
        "https://www.facebook.com/coreslash",
        "https://twitter.com/coreslash"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+918861220023",
        "contactType": "customer service",
        "email": "coreslashtechnologies@gmail.com"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "CoreSlash Technologies",
      "url": "https://coreslashtechnologies.com/"
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

import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import CTA from "../components/CTA";
import Contact from "../components/Contact";
import { motion } from "framer-motion";
import LeadSection from "../components/LeadSection";
import PaymentGateway from "../components/PaymentGateway";

import ReviewSection from "../components/ReviewSection";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Services />
      <PaymentGateway />
      <About />
      <Portfolio />
      <LeadSection />
      <ReviewSection />
      <CTA />
      {/* <Contact /> */}
    </motion.div>
  );
};

export default Home;

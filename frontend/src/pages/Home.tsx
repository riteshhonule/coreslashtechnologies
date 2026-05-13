import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import CTA from "../components/CTA";
import { motion } from "framer-motion";
import LeadSection from "../components/LeadSection";
import PaymentGateway from "../components/PaymentGateway";

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
      <CTA />
    </motion.div>
  );
};

export default Home;

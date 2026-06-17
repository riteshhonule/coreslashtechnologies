import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import PortfolioPage from "./pages/PortfolioPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import FAQPage from "./pages/FAQPage";
import LoginPage from "./pages/superadmin/LoginPage";
import DashboardPage from "./pages/superadmin/DashboardPage";
import { useEffect } from "react";
import {
  WebsiteDevelopment,
  ShopifyDevelopment,
  SEOOptimization,
  EcommerceWebsite,
  PPCServices,
  AppDevelopment,
  SoftwareDevelopment,
  DigitalMarketing,
  AISolutions,
  CustomSoftwareDevelopment,
  EnterpriseITSolutions,
  CloudSolutions,
  SCADAIndustrialAutomation,
  IoTSolutions,
  BusinessAutomation,
  DataAnalytics
} from "./pages/services";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />

        {/* Specific Service Routes */}
        <Route path="/services/website-development" element={<WebsiteDevelopment />} />
        <Route path="/services/shopify-development" element={<ShopifyDevelopment />} />
        <Route path="/services/seo" element={<SEOOptimization />} />
        <Route path="/services/ecommerce" element={<EcommerceWebsite />} />
        <Route path="/services/ppc" element={<PPCServices />} />
        <Route path="/services/App-development" element={<AppDevelopment />} />
        <Route path="/services/software-development" element={<SoftwareDevelopment />} />
        <Route path="/services/digital-marketing" element={<DigitalMarketing />} />

        {/* New Service Routes */}
        <Route path="/services/ai-solutions" element={<AISolutions />} />
        <Route path="/services/custom-software-development" element={<CustomSoftwareDevelopment />} />
        <Route path="/services/enterprise-it-solutions" element={<EnterpriseITSolutions />} />
        <Route path="/services/cloud-solutions" element={<CloudSolutions />} />
        <Route path="/services/scada-industrial-automation" element={<SCADAIndustrialAutomation />} />
        <Route path="/services/iot-solutions" element={<IoTSolutions />} />
        <Route path="/services/business-automation" element={<BusinessAutomation />} />
        <Route path="/services/data-analytics" element={<DataAnalytics />} />

        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Superadmin routes */}
        <Route path="/superadmin" element={<LoginPage />} />
        <Route path="/superadmin/login" element={<LoginPage />} />
        <Route path="/superadmin/dashboard" element={<DashboardPage />} />
      </Routes>
    </AnimatePresence>
  );
}

import { ModalProvider } from "./context/ModalContext";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ModalProvider>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </ModalProvider>
    </Router>
  );
}

export default App;

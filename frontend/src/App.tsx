import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { useEffect, lazy, Suspense } from "react";
import { ModalProvider } from "./context/ModalContext";

// Lazy-loaded subpages
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const LoginPage = lazy(() => import("./pages/superadmin/LoginPage"));
const DashboardPage = lazy(() => import("./pages/superadmin/DashboardPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const EnquiryFormPage = lazy(() => import("./pages/EnquiryFormPage"));
const MarketingEnquiryPage = lazy(() => import("./pages/MarketingEnquiryPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const CertificateVerifyPage = lazy(() => import("./pages/CertificateVerifyPage"));

// Lazy-loaded services
const WebsiteDevelopment = lazy(() => import("./pages/services/WebsiteDevelopment"));
const ShopifyDevelopment = lazy(() => import("./pages/services/ShopifyDevelopment"));
const SEOOptimization = lazy(() => import("./pages/services/SEOOptimization"));
const EcommerceWebsite = lazy(() => import("./pages/services/EcommerceWebsite"));
const PPCServices = lazy(() => import("./pages/services/PPCServices"));
const AppDevelopment = lazy(() => import("./pages/services/AppDevelopment"));
const SoftwareDevelopment = lazy(() => import("./pages/services/SoftwareDevelopment"));
const DigitalMarketing = lazy(() => import("./pages/services/DigitalMarketing"));

// Lazy-loaded new services (named exports from NewServices)
const AISolutions = lazy(() => import("./pages/services/NewServices").then(m => ({ default: m.AISolutions })));
const CustomSoftwareDevelopment = lazy(() => import("./pages/services/NewServices").then(m => ({ default: m.CustomSoftwareDevelopment })));
const EnterpriseITSolutions = lazy(() => import("./pages/services/NewServices").then(m => ({ default: m.EnterpriseITSolutions })));
const CloudSolutions = lazy(() => import("./pages/services/NewServices").then(m => ({ default: m.CloudSolutions })));
const SCADAIndustrialAutomation = lazy(() => import("./pages/services/NewServices").then(m => ({ default: m.SCADAIndustrialAutomation })));
const IoTSolutions = lazy(() => import("./pages/services/NewServices").then(m => ({ default: m.IoTSolutions })));
const BusinessAutomation = lazy(() => import("./pages/services/NewServices").then(m => ({ default: m.BusinessAutomation })));
const DataAnalytics = lazy(() => import("./pages/services/NewServices").then(m => ({ default: m.DataAnalytics })));

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
        <Route path="/services/app-development" element={<AppDevelopment />} />
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
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/enquiry-form" element={<EnquiryFormPage />} />
        <Route path="/enquiry-form1" element={<MarketingEnquiryPage />} />
        <Route path="/careers" element={<CareersPage />} />
        
        {/* Certificate Verification Routes */}
        <Route path="/certificate/verify" element={<CertificateVerifyPage />} />
        <Route path="/certificate/verify/:certificateId" element={<CertificateVerifyPage />} />
        <Route path="/verify" element={<CertificateVerifyPage />} />
        <Route path="/verify/:certificateId" element={<CertificateVerifyPage />} />
        
        {/* Superadmin routes */}
        <Route path="/superadmin" element={<LoginPage />} />
        <Route path="/superadmin/login" element={<LoginPage />} />
        <Route path="/superadmin/dashboard" element={<DashboardPage />} />
      </Routes>
    </AnimatePresence>
  );
}

const LoadingFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-transparent">
    <div className="w-10 h-10 border-4 border-[#737CFD] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ModalProvider>
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <AnimatedRoutes />
          </Suspense>
        </Layout>
      </ModalProvider>
    </Router>
  );
}

export default App;

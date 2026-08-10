import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/layout";
import Home from "./pages/home";
import About from "./pages/AboutPage";
import Portfolio from "./pages/PortfolioPage";
import Contact from "./pages/ContactPage";
import Careers from "./pages/CareersPage";
import Blog from "./pages/BlogPage";
import BlogPost from "./pages/BlogPostPage";
import ServicesIndex from "./pages/ServicesPage";
import WebsiteDevelopment from "./pages/services/WebsiteDevelopment";
import AppDevelopment from "./pages/services/AppDevelopment";
import ShopifyDevelopment from "./pages/services/ShopifyDevelopment";
import SEOOptimization from "./pages/services/SEOOptimization";
import EcommerceWebsite from "./pages/services/EcommerceWebsite";
import SoftwareSystems from "./pages/services/SoftwareSystems";
import AIAutomation from "./pages/services/AIAutomation";
import CloudInfrastructure from "./pages/services/CloudInfrastructure";
import DataAnalytics from "./pages/services/DataAnalytics";
import PrivacyPolicy from "./pages/PrivacyPolicyPage";
import TermsOfService from "./pages/TermsOfServicePage";
import CookiePolicy from "./pages/CookiePolicyPage";
import EnquiryFormPage from "./pages/EnquiryFormPage";
import PartnerPage from "./pages/PartnerPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="contact" element={<Contact />} />
            <Route path="partner" element={<PartnerPage />} />
            <Route path="partner-program" element={<PartnerPage />} />
            <Route path="dealership" element={<PartnerPage />} />
            <Route path="enquiry-form" element={<EnquiryFormPage />} />
            <Route path="careers" element={<Careers />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="cookie-policy" element={<CookiePolicy />} />


            <Route path="services">
              <Route index element={<ServicesIndex />} />
              <Route path="ai-automation" element={<AIAutomation />} />
              <Route path="web-development" element={<WebsiteDevelopment />} />
              <Route path="website-development" element={<WebsiteDevelopment />} />
              <Route path="app-development" element={<AppDevelopment />} />
              <Route path="software-systems" element={<SoftwareSystems />} />
              <Route path="ecommerce-solutions" element={<EcommerceWebsite />} />
              <Route path="ecommerce" element={<EcommerceWebsite />} />
              <Route path="seo-solutions" element={<SEOOptimization />} />
              <Route path="seo" element={<SEOOptimization />} />
              <Route path="shopify-development" element={<ShopifyDevelopment />} />
              <Route path="cloud-infrastructure" element={<CloudInfrastructure />} />
              <Route path="data-analytics" element={<DataAnalytics />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;

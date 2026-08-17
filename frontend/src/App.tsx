import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/layout";

// Lazy-loaded page components
const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/AboutPage"));
const Portfolio = lazy(() => import("./pages/PortfolioPage"));
const Contact = lazy(() => import("./pages/ContactPage"));
const Careers = lazy(() => import("./pages/CareersPage"));
const Blog = lazy(() => import("./pages/BlogPage"));
const BlogPost = lazy(() => import("./pages/BlogPostPage"));
const ServicesIndex = lazy(() => import("./pages/ServicesPage"));
const WebsiteDevelopment = lazy(() => import("./pages/services/WebsiteDevelopment"));
const AppDevelopment = lazy(() => import("./pages/services/AppDevelopment"));
const ShopifyDevelopment = lazy(() => import("./pages/services/ShopifyDevelopment"));
const SEOOptimization = lazy(() => import("./pages/services/SEOOptimization"));
const EcommerceWebsite = lazy(() => import("./pages/services/EcommerceWebsite"));
const SoftwareSystems = lazy(() => import("./pages/services/SoftwareSystems"));
const AIAutomation = lazy(() => import("./pages/services/AIAutomation"));
const CloudInfrastructure = lazy(() => import("./pages/services/CloudInfrastructure"));
const DataAnalytics = lazy(() => import("./pages/services/DataAnalytics"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfService = lazy(() => import("./pages/TermsOfServicePage"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicyPage"));
const EnquiryFormPage = lazy(() => import("./pages/EnquiryFormPage"));
const PartnerPage = lazy(() => import("./pages/PartnerPage"));
const PartnerFormPage = lazy(() => import("./pages/PartnerFormPage"));
const SoftwareCompanyInBelagavi = lazy(() => import("./pages/SoftwareCompanyInBelagavi"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="login" element={<AdminLogin />} />
            </Route>

            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="contact" element={<Contact />} />
              <Route path="partner" element={<PartnerPage />} />
              <Route path="partner-program" element={<PartnerPage />} />
              <Route path="dealership" element={<PartnerPage />} />
              <Route path="partner-form" element={<PartnerFormPage />} />
              <Route path="partner/form" element={<PartnerFormPage />} />
              <Route path="enquiry-form" element={<EnquiryFormPage />} />
              <Route path="careers" element={<Careers />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-of-service" element={<TermsOfService />} />
              <Route path="cookie-policy" element={<CookiePolicy />} />
              <Route path="software-company-in-belagavi" element={<Navigate to="/top-it-companies-in-belagavi" replace />} />
              <Route path="top-it-companies-in-belgavi" element={<Navigate to="/top-it-companies-in-belagavi" replace />} />
              <Route path="top-it-companies-in-belagavi" element={<SoftwareCompanyInBelagavi />} />

              <Route path="services">
                <Route index element={<ServicesIndex />} />
                <Route path="ai-automation" element={<AIAutomation />} />
                <Route path="web-development" element={<WebsiteDevelopment />} />
                <Route path="website-development" element={<WebsiteDevelopment />} />
                <Route path="app-development" element={<AppDevelopment />} />
                <Route path="software-systems" element={<SoftwareSystems />} />
                <Route path="erp-crm-development" element={<Navigate to="/services/software-systems" replace />} />
                <Route path="ecommerce-solutions" element={<EcommerceWebsite />} />
                <Route path="ecommerce" element={<EcommerceWebsite />} />
                <Route path="seo-solutions" element={<SEOOptimization />} />
                <Route path="seo" element={<SEOOptimization />} />
                <Route path="digital-marketing" element={<Navigate to="/services/seo-solutions" replace />} />
                <Route path="shopify-development" element={<ShopifyDevelopment />} />
                <Route path="cloud-infrastructure" element={<CloudInfrastructure />} />
                <Route path="data-analytics" element={<DataAnalytics />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default App;

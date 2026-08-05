import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/layout";
import Home from "./pages/Home";
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
import PrivacyPolicy from "./pages/PrivacyPolicyPage";
import TermsOfService from "./pages/TermsOfServicePage";
import CookiePolicy from "./pages/CookiePolicyPage";
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
            <Route path="careers" element={<Careers />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="cookie-policy" element={<CookiePolicy />} />

            <Route path="services">
              <Route index element={<ServicesIndex />} />
              <Route path="website-development" element={<WebsiteDevelopment />} />
              <Route path="web-development" element={<WebsiteDevelopment />} />
              <Route path="app-development" element={<AppDevelopment />} />
              <Route path="shopify-development" element={<ShopifyDevelopment />} />
              <Route path="software-systems" element={<SoftwareSystems />} />
              <Route path="seo" element={<SEOOptimization />} />
              <Route path="seo-solutions" element={<SEOOptimization />} />
              <Route path="ecommerce" element={<EcommerceWebsite />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;

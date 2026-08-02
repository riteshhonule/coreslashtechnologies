import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/AboutPage";
import Portfolio from "./pages/PortfolioPage";
import Contact from "./pages/ContactPage";
import ServicesIndex from "./pages/ServicesPage";
import WebsiteDevelopment from "./pages/services/WebsiteDevelopment";
import ShopifyDevelopment from "./pages/services/ShopifyDevelopment";
import SEOOptimization from "./pages/services/SEOOptimization";
import EcommerceWebsite from "./pages/services/EcommerceWebsite";
import PPCServices from "./pages/services/PPCServices";
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
            
            <Route path="services">
              <Route index element={<ServicesIndex />} />
              <Route path="website-development" element={<WebsiteDevelopment />} />
              <Route path="shopify-development" element={<ShopifyDevelopment />} />
              <Route path="seo" element={<SEOOptimization />} />
              <Route path="ecommerce" element={<EcommerceWebsite />} />
              <Route path="ppc" element={<PPCServices />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/layout";
import Home from "./pages/home";
import About from "./pages/about";
import Portfolio from "./pages/portfolio";
import Contact from "./pages/contact";
import ServicesIndex from "./pages/services";
import WebsiteDevelopment from "./pages/services/website-development";
import ShopifyDevelopment from "./pages/services/shopify-development";
import SEOOptimization from "./pages/services/seo";
import EcommerceWebsite from "./pages/services/ecommerce";
import PPCServices from "./pages/services/ppc";
import NotFound from "./pages/not-found";

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

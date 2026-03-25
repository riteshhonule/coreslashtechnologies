import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import ReviewSection from "../components/ReviewSection";

const servicesData: Record<string, { title: string; subtitle: string; description: string; features: string[]; cta: string }> = {
    "website-development": {
        title: "Website Development",
        subtitle: "Custom, high-performance websites built for your brand.",
        description: "We create stunning, responsive, and SEO-friendly websites that drive engagement and conversions. Our team uses the latest technologies to ensure your site is fast, secure, and scalable, tailored perfectly to your business needs.",
        features: ["Custom Design & UI/UX", "Mobile Responsive", "SEO Optimized Structure", "Fast Loading Speeds", "Secure & Scalable"],
        cta: "Start Your Website Project"
    },
    "shopify-development": {
        title: "Shopify Website Development",
        subtitle: "Scalable e-commerce stores powered by Shopify.",
        description: "Launch your online store with our expert Shopify development services. From custom themes to app integrations, we build high-converting storefronts that provide seamless shopping experiences for your customers.",
        features: ["Custom Shopify Themes", "App Integration", "Payment Gateway Setup", "Inventory Management", "Conversion Optimization"],
        cta: "Build Your Shopify Store"
    },
    "seo": {
        title: "SEO Optimization",
        subtitle: "Rank higher and drive organic traffic.",
        description: "Dominate search engine results with our data-driven SEO strategies. We optimize your website's on-page and off-page elements to improve visibility, attract quality traffic, and increase your authority in your industry.",
        features: ["Keyword Research", "On-Page Optimization", "Technical SEO Audits", "Link Building", "Performance Tracking"],
        cta: "Boost Your Rankings"
    },
    "ecommerce": {
        title: "E-commerce Website",
        subtitle: "Robust online stores for growing businesses.",
        description: "We build powerful e-commerce platforms that are secure, easy to manage, and optimized for sales. whether you need a custom solution or a platform-based store, we ensure a smooth path to purchase for your users.",
        features: ["User-Friendly Cart & Checkout", "Product Management System", "Secure Payment Processing", "Customer Analytics", "Mobile-First Design"],
        cta: "Launch Your Online Store"
    },
    "ppc": {
        title: "PPC / Ad Services",
        subtitle: "Maximize ROI with targeted advertising campaigns.",
        description: "Reach your ideal customers instantly with precision-targeted Pay-Per-Click campaigns. We manage Google Ads and social media ads to ensure every dollar spent brings you closer to your business goals.",
        features: ["Google Ads Management", "Social Media Advertising", "Ad Copywriting & Creative", "Audience Targeting", "Detailed ROI Reporting"],
        cta: "Start Your Ad Campaign"
    }
};

const ServiceDetailPage = () => {
    const { slug } = useParams();
    const service = servicesData[slug || ""];

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
                    <Link to="/services" className="text-blue-600 hover:underline">Back to Services</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-[124px]">
            {/* Hero Section */}
            <section className="relative py-16 md:py-20 bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/20" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            {service.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8">
                            {service.subtitle}
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-transform hover:scale-105"
                        >
                            {service.cta}
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Service</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            {service.description}
                        </p>
                        <Link to="/services" className="inline-flex items-center text-blue-600 font-semibold hover:gap-2 transition-all">
                            <ArrowLeftIcon className="w-5 h-5 mr-2" />
                            View All Services
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 p-8 rounded-3xl border border-gray-100"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
                        <ul className="space-y-4">
                            {service.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700 font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            <ReviewSection />

            {/* CTA Section */}
            <section className="py-20 bg-blue-600 text-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to get started?</h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                        Transform your digital presence today with our expert team using {service.title} strategies.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block px-10 py-5 bg-white text-blue-600 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all"
                    >
                        Contact Us Now
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetailPage;

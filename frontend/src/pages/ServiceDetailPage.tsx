import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon, CheckCircleIcon, SparklesIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const servicesData: Record<string, { title: string; subtitle: string; description: string; features: string[]; cta: string }> = {
    "website-development": {
        title: "Website Architectures",
        subtitle: "Custom, high-performance websites built for enterprise brands.",
        description: "We create stunning, responsive, and SEO-friendly websites that drive engagement and conversions. Our team uses the latest technologies to ensure your site is fast, secure, and scalable, tailored perfectly to your business needs.",
        features: ["Custom Design & UI/UX", "Mobile Fluid Layouts", "SEO Optimized Structure", "Sub-second Loading Speeds", "Secure & Scalable Core"],
        cta: "Initiate Architecture Project"
    },
    "shopify-development": {
        title: "Shopify Intelligence",
        subtitle: "Scalable e-commerce stores powered by custom liquid code.",
        description: "Launch your online store with our expert Shopify development services. From custom themes to app integrations, we build high-converting storefronts that provide seamless shopping experiences for your customers.",
        features: ["Bespoke Shopify Themes", "Neural App Integration", "Secure Payment Ecosystem", "Logic-based Inventory", "Conversion Velocity Optimization"],
        cta: "Build Your Shopify Ecosystem"
    },
    "seo": {
        title: "SEO Data Dominance",
        subtitle: "Rank higher and drive high-intent organic traffic.",
        description: "Dominate search engine results with our data-driven SEO strategies. We optimize your website's on-page and off-page elements to improve visibility, attract quality traffic, and increase your authority in your industry.",
        features: ["Intent Mapping", "On-Page Semantic Optimization", "Technical SEO Audits", "Authority Link Building", "Real-time ROI Tracking"],
        cta: "Establish Search Authority"
    },
    "ecommerce": {
        title: "E-commerce Engines",
        subtitle: "Robust online retail systems for growing brands.",
        description: "We build powerful e-commerce platforms that are secure, easy to manage, and optimized for sales. Whether you need a custom solution or a platform-based store, we ensure a smooth path to purchase for your users.",
        features: ["Fluid Checkout Architectures", "Product Management Core", "Encrypted Payment Processing", "Predictive Customer Analytics", "Mobile-First Commerce Design"],
        cta: "Launch Your Commerce Engine"
    },
    "ppc": {
        title: "PPC Ad Intelligence",
        subtitle: "Maximize ROI with targeted algorithmic campaigns.",
        description: "Reach your ideal customers instantly with precision-targeted Pay-Per-Click campaigns. We manage Google Ads and social media ads to ensure every dollar spent brings you closer to your business goals.",
        features: ["Neural Google Ads Management", "Paid Social Architectures", "High-CTR Creative Strategy", "Behavioral Audience Targeting", "Deep-Dive ROI Dashboards"],
        cta: "Activate Performance Growth"
    }
};

const ServiceDetailPage = () => {
    const { slug } = useParams();
    const service = servicesData[slug || ""];

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-black text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Module Not Found</h1>
                    <Link to="/services" className="text-accent-cyan hover:underline flex items-center gap-2 justify-center">
                        <ArrowLeftIcon className="w-5 h-5" /> Back to Matrix
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-dark-black pt-[100px] overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 overflow-hidden border-b border-white/5">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-purple/10 rounded-full blur-[140px] pointer-events-none" />
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 1, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
                            <SparklesIcon className="w-4 h-4 text-accent-cyan" />
                            <span className="text-xs font-bold text-accent-cyan uppercase tracking-[0.3em]">
                                Strategic Module
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight">
                            <span className="text-gradient-purple">{service.title}</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/40 max-w-3xl mx-auto mb-12 leading-relaxed">
                            {service.subtitle}
                        </p>
                        <Link
                            to="/contact"
                            className="btn-pill btn-primary-glow text-white text-lg px-12"
                        >
                            {service.cta}
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-32 container mx-auto px-6 lg:px-12">
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 1, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0, margin: "200px" }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">System Architecture</h2>
                        <p className="text-xl text-white/40 leading-relaxed mb-10 font-medium">
                            {service.description}
                        </p>
                        <Link to="/services" className="inline-flex items-center gap-2 text-accent-cyan font-bold tracking-widest text-xs hover:gap-4 transition-all">
                            <ArrowLeftIcon className="w-4 h-4" />
                            RETURN TO SERVICE MATRIX
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 1, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0, margin: "200px" }}
                        className="glass-card p-12 rounded-[3rem] border-white/5 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 text-white/[0.02] text-8xl font-black">
                            CORE
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-10 relative z-10 tracking-tight">Strategic Capabilities</h3>
                        <ul className="space-y-6 relative z-10">
                            {service.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full bg-accent-cyan/10 flex items-center justify-center shrink-0">
                                        <CheckCircleIcon className="w-4 h-4 text-accent-cyan" />
                                    </div>
                                    <span className="text-white/60 font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-dark-black">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div 
                        initial={{ opacity: 1, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0, margin: "200px" }}
                        className="glass-card p-16 md:p-24 rounded-[4rem] border-white/5 text-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/10 to-transparent" />
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight relative z-10">Ready for Growth?</h2>
                        <p className="text-xl text-white/40 mb-12 max-w-xl mx-auto relative z-10 leading-relaxed">
                            Architect your digital future with CoreSlash's elite engineering and strategic teams.
                        </p>
                        <Link
                            to="/contact"
                            className="btn-pill btn-primary-glow text-white text-xl px-16 relative z-10 inline-block"
                        >
                            Contact us now
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetailPage;


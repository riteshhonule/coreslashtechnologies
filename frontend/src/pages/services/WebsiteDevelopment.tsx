import React from "react";
import { envConfig } from "../../config/env.config";
import { motion } from "framer-motion";
import ArrowRightIcon from "@heroicons/react/24/outline/ArrowRightIcon";
import SparklesIcon from "@heroicons/react/24/outline/SparklesIcon";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";

// Image Imports
import cmsImg from "../../img/website/cms.webp";
import customDesignImg from "../../img/website/custom-design.webp";
import responsiveImg from "../../img/website/responsive.webp";
import seoImg from "../../img/website/seo.webp";
import securityImg from "../../img/website/security.webp";
import speedImg from "../../img/website/fast_load.webp";
import coreslashWebsiteDevelopment from "../../img/website/coreslash-website-development.png";

import ServiceLayout from "./ServicesLayout";
import SEO from "../../components/SEO";
import { useModal } from "../../context/ModalContext";
import ContactForm from "../../components/ContactForm";

// ... features and pricingPlans omitted for brevity in replacement instruction ...

const features = [
    { title: "Bespoke Design", desc: "Tailored layouts that represent your brand’s unique identity.", icon: customDesignImg },
    { title: "Fluid UI", desc: "Seamless performance across all devices, from desktops to smartphones.", icon: responsiveImg },
    { title: "High Velocity", desc: "Optimized code and caching techniques for lightning-fast speed.", icon: speedImg },
    { title: "SEO Ready", desc: "Built-in SEO features to improve your search engine rankings.", icon: seoImg },
    { title: "Intuitive CMS", desc: "Easy-to-use content management systems for effortless updates.", icon: cmsImg },
    { title: "Top Security", desc: "Advanced security measures and scalability to grow with your business.", icon: securityImg },
];

const pricingPlans = [
    {
        name: "Basic Package",
        price: "10,000",
        desc: "Perfect for businesses starting out, offering foundational website development and SEO.",
        features: [
            "Website Development (up to 5 pages)",
            "Basic SEO Setup and Optimization",
            "Social Media Profile Creation",
            "3 SEO Optimized Blog Posts",
            "1 Year Hosting & Domain",
            "Custom Email Creation",
            "Responsive Mobile Design",
            "SSL Certificate (HTTPS)",
            "6 Months Technical Support"
        ]
    },
    {
        name: "Standard Package",
        price: "15,000",
        desc: "Designed for growing businesses, providing professional development and comprehensive SEO.",
        features: [
            "Website Development (up to 10 pages)",
            "Comprehensive SEO Setup",
            "Social Media Management",
            "4 SEO Optimized Blog Posts",
            "1 Year High Speed Hosting",
            "Custom Email Creation",
            "Enhanced Security Protocols",
            "WhatsApp / Live Chat Integration",
            "1 Year Technical Support"
        ],
        isPopular: true
    },
    {
        name: "Premium Package",
        price: "20,000",
        desc: "Ideal for scaling businesses, including advanced solutions and full-scale marketing.",
        features: [
            "Website Development (up to 15 pages)",
            "Advanced SEO & Analytics",
            "Full Social Media Strategy",
            "Content Strategy & Production",
            "Priority High Speed Hosting",
            "Enterprise Security",
            "Custom API Integrations",
            "Performance Optimization",
            "Priority 24/7 Support"
        ]
    }
];

const WebsiteDevelopment: React.FC = () => {
    const { openModal } = useModal();

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Website Development",
        "description": "Premium website development services tailored for scale and growth.",
        "provider": {
            "@type": "Organization",
            "name": "CoreSlash Technologies",
            "url": "https://coreslashtechnologies.com"
        }
    };

    return (
        <ServiceLayout
            title="Website Development"
            subtitle="Transforming vision into digital excellence."
            ctaText="Start Your Project"
        >
            <SEO 
                title="Website Development Services"
                description="Custom, high-performance website development services. We build digital growth engines engineered for speed, SEO, and conversions."
                structuredData={structuredData}
            />            <div className="bg-dark-black">
                {/* Intro & Visuals */}
                <section className="container mx-auto px-6 lg:px-12 py-12 md:py-24">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Narrative & Tags */}
                        <motion.div
                            initial={{ opacity: 1, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0, margin: "200px" }}
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-2 text-accent-cyan font-bold tracking-[0.3em] uppercase text-xs">
                                <SparklesIcon className="w-4 h-4" />
                                Engineering Excellence
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                                We architect <span className="text-gradient-purple">Digital Growth</span> engines.
                            </h2>
                            <p className="text-white/60 text-lg leading-relaxed font-medium">
                                We leverage the latest web technologies to build lightning-fast, high-converting digital storefronts and enterprise architectures. Our design system prioritizes mobile responsiveness, sub-second load times, and clean modular codebases.
                            </p>
                            
                            {/* Expertise Tags */}
                            <div className="pt-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 text-center md:text-left">Core Technology Stack</p>
                                <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3">
                                    {["React / Next.js", "Headless CMS", "Cloud Infrastructure", "UX Architecture", "SEO Engineering"].map((tech, index) => (
                                        <div 
                                            key={tech} 
                                            className={`glass-card px-4 py-2.5 rounded-xl border-white/5 text-[10px] sm:text-xs text-white/60 font-bold uppercase tracking-wider text-center flex items-center justify-center ${
                                                index === 2 ? "col-span-2 justify-self-center w-full max-w-[240px] md:w-auto" : "w-full"
                                            }`}
                                        >
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Featured Mockup Image */}
                        <motion.div
                            initial={{ opacity: 1, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0, margin: "200px" }}
                            className="relative group"
                        >
                            <div className="absolute -inset-2 bg-gradient-to-r from-primary-purple to-accent-cyan rounded-[3rem] blur opacity-25 group-hover:opacity-45 transition duration-1000" />
                            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 aspect-video bg-white flex items-center justify-center p-4">
                                <img
                                    src={coreslashWebsiteDevelopment}
                                    alt="CoreSlash Website Development"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-contain transition-all duration-1000 group-hover:scale-[1.02]"
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Premium Capabilities Grid */}
                <section className="py-12 md:py-24 bg-dark-black/40 border-y border-white/5">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="text-center mb-20">
                            <motion.div
                                initial={{ opacity: 1, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0, margin: "200px" }}
                                className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
                            >
                                <span className="text-xs font-bold text-accent-cyan uppercase tracking-[0.2em]">
                                    Capabilities
                                </span>
                            </motion.div>
                            <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                                Complete <span className="text-gradient-cyan">Website</span> Ecosystem
                            </h3>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((f, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 1, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0, margin: "200px" }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    className="glass-card p-10 rounded-[2.5rem] border-white/5 hover:border-accent-cyan/20 group flex flex-col items-start gap-6 transition-all relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(34,211,238,0.08),transparent_50%)] pointer-events-none" />

                                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-cyan shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:bg-accent-cyan/10">
                                        <img src={f.icon} alt={f.title} loading="lazy" decoding="async" className="w-8 h-8 object-contain transition-all" />
                                    </div>
                                    
                                    <div className="space-y-3 relative z-10">
                                        <h4 className="text-2xl font-bold text-white transition-colors group-hover:text-accent-cyan">
                                            {f.title}
                                        </h4>
                                        <p className="text-white/40 text-sm leading-relaxed font-medium">
                                            {f.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Dedicated Consultation Section */}
                <section className="py-12 md:py-24 bg-dark-black">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <div className="glass-card p-10 md:p-16 rounded-[4rem] border-white/5 relative overflow-hidden">
                            <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-primary-purple/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="hidden md:block absolute bottom-0 left-0 w-64 h-64 bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none" />

                            <div className="text-center mb-12">
                                <h3 className="text-4xl font-bold text-white mb-4 tracking-tight">
                                    Book Your <span className="text-accent-cyan italic">Free</span> Consultation
                                </h3>
                                <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed">
                                    Get a customized technology strategy and development roadmap from our engineering specialists.
                                </p>
                            </div>

                            <ContactForm variant="glass" service="Website Development" isSidebar={false} />
                        </div>
                    </div>
                </section>

                {/* PRICING SECTION */}
                <section className="pt-10 pb-12 md:pt-12 md:pb-16 bg-dark-black border-t border-white/5">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24">
                            <motion.div
                                initial={{ opacity: 1, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0, margin: "200px" }}
                                className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
                            >
                                <span className="text-xs font-bold text-accent-cyan uppercase tracking-[0.2em]">
                                    Investment Plans
                                </span >
                            </motion.div>
                            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                                Strategic <span className="text-gradient-purple">Pricing</span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
                            {pricingPlans.map((plan, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 1, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0, margin: "200px" }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    className={`relative p-12 rounded-[4rem] border flex flex-col ${plan.isPopular
                                        ? "bg-primary-purple/10 border-primary-purple/30 shadow-[0_30px_100px_rgba(69,3,185,0.2)] scale-105 z-10"
                                        : "bg-white/5 border-white/10 hover:border-white/20 transition-all duration-500"
                                        }`}
                                >
                                    {plan.isPopular && (
                                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-primary-purple text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
                                            Most Requested
                                        </div>
                                    )}

                                    <div className="mb-12">
                                        <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                                        <div className="flex items-baseline gap-2 mb-6">
                                            <span className="text-xl font-bold text-accent-cyan">₹</span>
                                            <span className="text-6xl font-black text-white tracking-tight">{plan.price}</span>
                                        </div>
                                        <p className="text-white/40 text-sm leading-relaxed">{plan.desc}</p>
                                    </div>

                                    <div className="flex-grow space-y-5 mb-14">
                                        {plan.features.map((feature, fIdx) => (
                                            <div key={fIdx} className="flex items-start gap-4">
                                                <div className="w-6 h-6 rounded-full bg-accent-cyan/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <CheckIcon className="w-3.5 h-3.5 text-accent-cyan font-bold" />
                                                </div>
                                                <span className="text-white/60 text-sm font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={openModal}
                                        className={`btn-pill w-full text-lg ${plan.isPopular ? "btn-primary-glow text-white" : "btn-glass text-white"}`}
                                    >
                                        Get Started
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </ServiceLayout>
    );
};

export default WebsiteDevelopment;



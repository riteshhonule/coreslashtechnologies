import React, { useState } from "react";
import { envConfig } from "../../config/env.config";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import PhoneIcon from "@heroicons/react/24/outline/PhoneIcon";
import EnvelopeIcon from "@heroicons/react/24/outline/EnvelopeIcon";
import ArrowRightIcon from "@heroicons/react/24/outline/ArrowRightIcon";
import SparklesIcon from "@heroicons/react/24/outline/SparklesIcon";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

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

type FormValues = {
    name: string;
    phone: string;
    city: string;
    service: string;
};

const WebsiteDevelopment: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [modalOpen, setModalOpen] = useState(false);

    const API_BASE = envConfig.apiUrl;

    const onSubmit = async (data: FormValues) => {
        try {
            setStatus('loading');
            const res = await fetch(`${API_BASE}/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Network error');
            setStatus('success');
            reset();
        } catch (e) {
            console.error(e);
            setStatus('error');
        } finally {
            setModalOpen(true);
            setTimeout(() => setStatus('idle'), 2000);
        }
    };

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
            />
            <div className="bg-dark-black">
                {/* Main Content & Sidebar */}
                <section className="container mx-auto px-6 lg:px-12 py-20">
                    <div className="grid lg:grid-cols-3 gap-16 items-start">

                        {/* CONTENT AREA */}
                        <div className="lg:col-span-2 space-y-20">

                            {/* Featured Image */}
                            <motion.div
                                initial={{ opacity: 1, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0, margin: "200px" }}
                                className="relative group"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary-purple to-accent-cyan rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                                <div className="relative rounded-[3rem] overflow-hidden border border-white/10 aspect-video">
                                    <img
                                        src={coreslashWebsiteDevelopment}
                                        alt="CoreSlash Website Development"
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-contain transition-all duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-transparent to-transparent opacity-60" />
                                </div>
                            </motion.div>

                            {/* Narrative */}
                            <motion.div
                                initial={{ opacity: 1, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0, margin: "200px" }}
                                className="max-w-4xl"
                            >
                                <div className="flex items-center gap-2 mb-6 text-accent-cyan font-bold tracking-[0.3em] uppercase text-xs">
                                    <SparklesIcon className="w-4 h-4" />
                                    Engineering Excellence
                                </div>
                                <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-[1.1] tracking-tight">
                                    We architect <span className="text-gradient-purple">Digital Growth</span> engines.
                                </h2>
                                <p className="text-white/50 text-xl leading-relaxed mb-12">
                                    A premium brand deserves a premium digital home. Our approach combines
                                    computational design with the latest technology stacks to convert
                                    casual visitors into loyal advocates.
                                </p>

                                {/* Bento Features Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {features.map((f, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 1, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0, margin: "200px" }}
                                            transition={{ duration: 0.3, delay: i * 0.05 }}
                                            className="glass-card p-8 rounded-[2rem] border-white/5 hover:border-accent-cyan/20 group"
                                        >
                                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-accent-cyan/10 transition-colors">
                                                <img src={f.icon} alt={f.title} loading="lazy" decoding="async" className="w-7 h-7 object-contain  transition-all" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                                            <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* SIDEBAR */}
                        <aside className="lg:sticky lg:top-32 space-y-8">
                            {/* Lead Form */}
                            <div className="glass-card p-10 rounded-[3rem] border-white/5 relative overflow-hidden">
                                <div className="hidden md:block absolute top-0 right-0 w-32 h-32 bg-primary-purple/10 rounded-full blur-3xl pointer-events-none" />

                                <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                                    Book Your <br />
                                    <span className="text-accent-cyan italic">Free</span> Consultation
                                </h3>
                                <p className="text-white/40 text-sm mb-8 leading-relaxed">
                                    Get a customized technology strategy and development roadmap.
                                </p>

                                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                                    <input
                                        {...register('name', { required: true })}
                                        type="text"
                                        placeholder="Full Name"
                                        className="glass-input"
                                    />
                                    <input
                                        {...register('phone', { required: true })}
                                        type="tel"
                                        placeholder="Phone Number"
                                        className="glass-input"
                                    />
                                    <input
                                        {...register('city', { required: true })}
                                        type="text"
                                        placeholder="City"
                                        className="glass-input"
                                    />
                                    <select
                                        {...register('service', { required: true })}
                                        className="glass-input appearance-none"
                                    >
                                        <option value="" className="bg-dark-black">Select Service</option>
                                        <option value="New Website" className="bg-dark-black">New Website</option>
                                        <option value="Redesign" className="bg-dark-black">Redesign</option>
                                        <option value="Ecommerce" className="bg-dark-black">Ecommerce</option>
                                    </select>

                                    <button
                                        disabled={status === 'loading'}
                                        className="btn-pill btn-primary-glow w-full text-white font-bold py-5 mt-4"
                                    >
                                        {status === 'loading' ? 'Processing...' : 'Send Request'}
                                        <ArrowRightIcon className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>

                            {/* Expertise List */}
                            <div className="glass-card p-10 rounded-[3rem] border-white/5">
                                <p className="text-xs font-bold text-white/30 uppercase tracking-[0.3em] mb-8">Expertise</p>
                                <ul className="space-y-6">
                                    {["React / Next.js", "Headless CMS", "Cloud Systems", "UX Architecture"].map((s) => (
                                        <li key={s} className="flex items-center justify-between text-white/60 hover:text-accent-cyan transition-colors cursor-pointer group">
                                            <span className="font-bold text-sm tracking-wide">{s}</span>
                                            <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    </div>
                </section>

                {/* PRICING SECTION */}
                <section className="py-32 bg-dark-black border-t border-white/5">
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

                                    <button className={`btn-pill w-full text-lg ${plan.isPopular ? "btn-primary-glow text-white" : "btn-glass text-white"
                                        }`}>
                                        Get Started
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-dark-black/90 backdrop-blur-xl">
                        <motion.div initial={{ y: 40, opacity: 1 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="glass-card max-w-md w-full p-12 rounded-[3rem] border-white/10 text-center">
                            {status === 'success' ? (
                                <>
                                    <div className="mx-auto w-20 h-20 rounded-3xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mb-8">
                                        <CheckIcon className="w-10 h-10 text-accent-cyan" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Confirmed</h3>
                                    <p className="text-white/40 mb-10 leading-relaxed text-lg">Our strategic consultants will reach out within 24 hours.</p>
                                </>
                            ) : (
                                <>
                                    <div className="mx-auto w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-8">
                                        <XMarkIcon className="w-10 h-10 text-rose-500" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Error</h3>
                                    <p className="text-white/40 mb-10 leading-relaxed text-lg">System failure during submission. Please try again or contact us directly.</p>
                                </>
                            )}
                            <button onClick={() => setModalOpen(false)} className="btn-pill btn-glass w-full text-white">Return</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </ServiceLayout>
    );
};

export default WebsiteDevelopment;



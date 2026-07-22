import React from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon, RocketLaunchIcon, ChartBarIcon, BriefcaseIcon, SparklesIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import ServiceLayout from "./ServicesLayout";
import ppcImage from "../../img/ppc-expert.webp";
import { useModal } from "../../context/ModalContext";
import SEO from "../../components/SEO";

/* ================= PACKAGES JSON ================= */
const packages = [
    {
        name: "Starter Tier",
        description: "Ideal for local businesses starting their digital journey.",
        price: "7,999",
        duration: "/mo",
        icon: <RocketLaunchIcon className="w-10 h-10 text-secondary-indigo" />,
        features: [
            "1 Strategic Ad Platform",
            "Full Campaign Audit",
            "Intent-based Keyword Research",
            "High-CTR Ad Copy Creation",
            "Basic Demographic Targeting",
            "Monthly Growth Reports",
            "Email-based Support",
        ],
    },
    {
        name: "Growth Engine",
        description: "Engineered for scaling brands seeking aggressive ROI.",
        price: "14,999",
        duration: "/mo",
        isPopular: true,
        icon: <ChartBarIcon className="w-10 h-10 text-secondary-indigo" />,
        features: [
            "2 Dominant Ad Platforms",
            "Advanced Behavioral Targeting",
            "Conversion Tracking API",
            "Dynamic Retargeting Funnels",
            "Continuous A/B Optimization",
            "UX/CRO Landing Page Audit",
            "Bi-Weekly Strategy Syncs",
            "Priority Technical Support",
        ],
    },
    {
        name: "Market Leader",
        description: "Full-funnel dominance for industry heavyweights.",
        price: "24,999",
        duration: "/mo",
        icon: <BriefcaseIcon className="w-10 h-10 text-secondary-indigo" />,
        features: [
            "Omni-channel Ad Strategy",
            "Full-funnel Lead Architecture",
            "Custom Conversion API Setup",
            "Daily Algorithmic Bid Optimization",
            "Premium Creative Design",
            "Weekly Analytics Deep-Dives",
            "Dedicated Growth Manager",
            "Strategic Scaling Roadmap",
        ],
    },
];

const features = [
    "Google Search & Display Intelligence",
    "Meta (FB & IG) Paid Social",
    "LinkedIn & YouTube Enterprise Ads",
    "Hyper-Local Geospatial Targeting",
    "Psychology-Backed Ad Copy",
    "GTM & Server-side Pixel Integration",
    "Multivariate A/B Testing",
    "Retargeting & LAL Funnels",
    "ROI & ROAS Velocity Optimization",
    "Real-time Neural Data Dashboards",
];

const PPCServices = () => {
    const { openModal } = useModal();

    return (
        <ServiceLayout
            title="PPC Intelligence"
            subtitle="Data-driven precision. Performance-led results. Dominate the digital landscape with elite ad strategies."
            ctaText="Scale My Business"
        >
            <SEO
                title="Pay-Per-Click (PPC) Advertising Services | CoreSlash Technologies"
                description="Targeted Google Ads, paid social media campaigns, behavior targeting, and conversion rate optimization for higher ROI."
            />
            <div className="bg-[#F9FAFB] text-gray-900">
                <div className="container mx-auto px-6 lg:px-12 py-12 md:py-24">

                    {/* HERO SECTION */}
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-16 md:mb-40">
                        <motion.div
                            initial={{ opacity: 1, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0, margin: "200px" }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-primary-purple/5 rounded-[3rem] blur-3xl opacity-50" />
                            <div className="relative rounded-[3rem] overflow-hidden border border-gray-200 shadow-xl aspect-video group">
                                <img
                                    src={ppcImage}
                                    alt="PPC Specialist"
                                    className="w-full h-full object-cover transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent opacity-60" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 1, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0, margin: "200px" }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="flex items-center gap-2 mb-6 text-secondary-indigo font-bold tracking-[0.3em] uppercase text-xs">
                                <SparklesIcon className="w-4 h-4" />
                                Performance Engineering
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-10 leading-[1.1] tracking-tight">
                                ROI-Driven <span className="text-gradient-purple">Precision</span> Ad Ecosystems.
                            </h2>
                            <p className="text-gray-500 text-xl leading-relaxed mb-12">
                                Stop burning your marketing capital. We architect high-performance lead generation 
                                funnels that target customers at the exact moment of intent. By combining algorithmic 
                                bidding with creative excellence, we engineer profitable growth at scale.
                            </p>
                            <div className="flex justify-center w-full">
                                <button
                                    onClick={openModal}
                                    className="w-full sm:w-auto btn-pill btn-primary-glow text-white text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4 whitespace-nowrap"
                                >
                                    Start Profitable Growth
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* STRATEGY BENTO GRID */}
                    <div className="mb-16 md:mb-40">
                        <div className="text-center mb-24">
                            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Strategic Framework</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">Our methodology integrates behavioral psychology with neural data analytics.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                            {features.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 1, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0, margin: "200px" }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white p-6 rounded-3xl border border-gray-200/60 flex flex-col items-center text-center group hover:border-secondary-indigo/30 hover:shadow-lg shadow-md shadow-gray-200/10"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4 group-hover:bg-secondary-indigo/10 transition-colors">
                                        <CheckCircleIcon className="w-5 h-5 text-secondary-indigo" />
                                    </div>
                                    <span className="text-gray-900 font-bold text-xs leading-tight group-hover:text-secondary-indigo transition-colors">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* INVESTMENT TIERS */}
                    <section className="pb-32">
                        <div className="text-center mb-24">
                            <h2 className="text-4xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
                                Investment <span className="text-gradient-cyan">Tiers</span>
                            </h2>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto items-stretch">
                            {packages.map((pkg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 1, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0, margin: "200px" }}
                                    transition={{ duration: 0.8, delay: index * 0.05 }}
                                    className={`relative p-12 rounded-[4rem] border flex flex-col transition-all duration-700 ${
                                        pkg.isPopular 
                                        ? "bg-white border-2 border-primary-purple/30 shadow-2xl scale-105 z-10" 
                                        : "bg-white border-gray-200/80 hover:border-secondary-indigo/30 shadow-md shadow-gray-200/10"
                                    }`}
                                >
                                    {pkg.isPopular && (
                                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-8 py-2 rounded-full bg-primary-purple text-white text-[10px] font-black uppercase tracking-widest">
                                            Aggressive ROI
                                        </div>
                                    )}

                                    <div className="mb-12">
                                        <div className="mb-8">{pkg.icon}</div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{pkg.name}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-6">{pkg.description}</p>
                                    </div>

                                    <div className="flex-grow space-y-5 mb-14">
                                        {pkg.features.map((f, i) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <div className="w-6 h-6 rounded-full bg-secondary-indigo/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <CheckCircleIcon className="w-4 h-4 text-secondary-indigo" />
                                                </div>
                                                <span className="text-gray-600 text-sm font-medium">{f}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={openModal}
                                        className={`btn-pill w-full text-lg ${
                                            pkg.isPopular ? "btn-primary-glow text-white" : "btn-glass text-secondary-indigo hover:text-white"
                                        }`}
                                    >
                                        Activate Plan
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </ServiceLayout>
    );
};

export default PPCServices;

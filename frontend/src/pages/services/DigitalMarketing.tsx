import React from "react";
import { motion } from "framer-motion";
import {
    CheckCircleIcon,
    ArrowTrendingUpIcon,
    ChartBarIcon,
    GlobeAltIcon,
    SparklesIcon,
    ArrowRightIcon
} from "@heroicons/react/24/outline";

import ServiceLayout from "./ServicesLayout";
import digitalMarketingImage from "../../img/CoreslashTechnologies-DigitalMarketing.webp";
import { useModal } from "../../context/ModalContext";
import SEO from "../../components/SEO";

const features = [
    "Advanced Keyword Research & Intent Mapping",
    "On-Page SEO Optimization",
    "Technical SEO & Core Web Vitals Fix",
    "High Authority Link Building",
    "Local SEO & Google Business Optimization",
    "Competitor Gap Analysis",
    "Content Strategy for Ranking & Conversions",
    "Performance Tracking & ROI Reporting"
];

const DigitalMarketing: React.FC = () => {
    const { openModal } = useModal();

    return (
        <ServiceLayout
            title="Digital Marketing"
            subtitle="Engineered for visibility. Optimized for conversion."
            ctaText="Free Marketing Audit"
        >
            <SEO
                title="Digital Marketing Agency Services | CoreSlash Technologies"
                description="Comprehensive performance marketing, content strategy, social media campaigns, and brand development services."
            />
            <div className="bg-[#F9FAFB] text-gray-900">
                {/* Hero Content */}
                <section className="container mx-auto px-6 lg:px-12 py-12 md:py-24">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                        
                        {/* Visual Side */}
                        <motion.div
                            initial={{ opacity: 1, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0, margin: "200px" }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-primary-purple/5 rounded-[3rem] blur-3xl opacity-50" />
                            <div className="relative rounded-[3rem] overflow-hidden border border-gray-200 shadow-xl group aspect-video">
                                <img
                                    src={digitalMarketingImage}
                                    alt="Digital Marketing Services"
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent opacity-60" />
                                
                                {/* Animated Floating Badge */}
                                <motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute bottom-2 right-2 md:bottom-6 md:right-6 bg-white p-2 md:p-3 rounded-lg md:rounded-xl border border-gray-200 shadow-md z-20"
                                >
                                    <div className="flex gap-1.5 md:gap-2.5 items-center">
                                        <div className="p-1 md:p-2 bg-secondary-indigo/10 rounded-md md:rounded-lg">
                                            <ArrowTrendingUpIcon className="w-4 h-4 md:w-6 md:h-6 text-secondary-indigo" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm md:text-lg text-gray-900 leading-tight">+312%</p>
                                            <p className="text-[6px] md:text-[8px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">Growth Velocity</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Content Side */}
                        <motion.div
                            initial={{ opacity: 1, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0, margin: "200px" }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="flex items-center gap-2 mb-6 text-secondary-indigo font-bold tracking-[0.3em] uppercase text-xs">
                                <SparklesIcon className="w-4 h-4" />
                                Performance Marketing
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-10 leading-[1.1] tracking-tight">
                                Data-Driven <span className="text-gradient-purple">Growth</span> Excellence.
                            </h2>
                            <p className="text-gray-500 text-xl leading-relaxed mb-12">
                                At CoreSlash Technologies, we don't just "market"—we architect complete organic ecosystems. 
                                By combining semantic search intelligence with high-authority technical optimization, 
                                we ensure your brand dominates its industry landscape.
                            </p>

                            {/* Mini Stats Grid */}
                            <div className="grid grid-cols-3 gap-6 mb-12">
                                {[
                                    { val: "3X", label: "Traffic", icon: ChartBarIcon },
                                    { val: "Top 10", label: "Rankings", icon: GlobeAltIcon },
                                    { val: "250%", label: "ROI", icon: ArrowTrendingUpIcon },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white p-4 rounded-2xl border border-gray-200/60 shadow-md shadow-gray-200/10 flex flex-col items-center text-center">
                                        <stat.icon className="w-6 h-6 text-secondary-indigo mb-2" />
                                        <span className="text-xl font-bold text-gray-900">{stat.val}</span>
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">{stat.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center w-full">
                                <button
                                    onClick={openModal}
                                    className="w-full sm:w-auto btn-pill btn-primary-glow text-white text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4 whitespace-nowrap"
                                >
                                    Claim Free Audit
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Ecosystem */}
                <section className="pt-16 pb-12 md:pt-32 md:pb-16 bg-white border-t border-gray-200/60 shadow-sm">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24">
                            <h3 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                                Complete <span className="text-gradient-cyan">Marketing</span> Solution
                            </h3>
                            <p className="text-gray-500 max-w-2xl mx-auto">Full-funnel optimization strategies designed for modern AI-driven search algorithms.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 1, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0, margin: "200px" }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white p-8 rounded-[2rem] border border-gray-200/60 hover:border-secondary-indigo/30 hover:shadow-lg shadow-md shadow-gray-200/10 group transition-all h-full flex flex-col items-center text-center"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-6 group-hover:bg-secondary-indigo/10 transition-colors mx-auto">
                                        <CheckCircleIcon className="w-6 h-6 text-secondary-indigo" />
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-secondary-indigo transition-colors">{feature}</h4>
                                    <div className="w-8 h-1 bg-gray-200 rounded-full group-hover:w-16 group-hover:bg-secondary-indigo transition-all mx-auto" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </ServiceLayout>
    );
};

export default DigitalMarketing;

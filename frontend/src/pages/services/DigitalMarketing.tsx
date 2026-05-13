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
import digitalMarketingImage from "../../img/CoreslashTechnologies-DigitalMarketing.png";
import { useModal } from "../../context/ModalContext";

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
            <div className="bg-dark-black">
                {/* Hero Content */}
                <section className="container mx-auto px-6 lg:px-12 py-24">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        
                        {/* Visual Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-primary-purple/20 rounded-[3rem] blur-3xl opacity-50" />
                            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 group aspect-video">
                                <img
                                    src={digitalMarketingImage}
                                    alt="Digital Marketing Services"
                                    className="w-full h-full object-cover  transition-all duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-transparent to-transparent opacity-60" />
                                
                                {/* Animated Floating Badge */}
                                <motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute bottom-8 right-8 glass-card p-6 rounded-2xl border-white/10 z-20"
                                >
                                    <div className="flex gap-4 items-center">
                                        <div className="p-3 bg-accent-cyan/10 rounded-xl">
                                            <ArrowTrendingUpIcon className="w-8 h-8 text-accent-cyan" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-2xl text-white">+312%</p>
                                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Growth Velocity</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Content Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="flex items-center gap-2 mb-6 text-accent-cyan font-bold tracking-[0.3em] uppercase text-xs">
                                <SparklesIcon className="w-4 h-4" />
                                Performance Marketing
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-[1.1] tracking-tight">
                                Data-Driven <span className="text-gradient-purple">Growth</span> Excellence.
                            </h2>
                            <p className="text-white/40 text-xl leading-relaxed mb-12">
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
                                    <div key={i} className="glass-card p-4 rounded-2xl border-white/5 flex flex-col items-center text-center">
                                        <stat.icon className="w-6 h-6 text-accent-cyan mb-2" />
                                        <span className="text-xl font-bold text-white">{stat.val}</span>
                                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-tight">{stat.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center w-full">
                                <button onClick={openModal} className="btn-pill btn-primary-glow text-white text-lg px-10">
                                    Claim Free Audit
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Ecosystem */}
                <section className="py-32 bg-dark-black border-t border-white/5">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24">
                            <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                                Complete <span className="text-gradient-cyan">Marketing</span> Solution
                            </h3>
                            <p className="text-white/40 max-w-2xl mx-auto">Full-funnel optimization strategies designed for modern AI-driven search algorithms.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="glass-card p-8 rounded-[2rem] border-white/5 hover:border-accent-cyan/20 group transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-accent-cyan/10 transition-colors">
                                        <CheckCircleIcon className="w-6 h-6 text-accent-cyan" />
                                    </div>
                                    <h4 className="text-lg font-bold text-white leading-tight mb-2 group-hover:text-accent-cyan transition-colors">{feature}</h4>
                                    <div className="w-8 h-1 bg-white/10 rounded-full group-hover:w-16 group-hover:bg-accent-cyan transition-all" />
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

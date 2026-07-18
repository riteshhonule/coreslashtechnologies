import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import ArrowTrendingUpIcon from "@heroicons/react/24/outline/ArrowTrendingUpIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import GlobeAltIcon from "@heroicons/react/24/outline/GlobeAltIcon";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import CommandLineIcon from "@heroicons/react/24/outline/CommandLineIcon";
import LinkIcon from "@heroicons/react/24/outline/LinkIcon";
import MapPinIcon from "@heroicons/react/24/outline/MapPinIcon";
import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import ArrowUpRightIcon from "@heroicons/react/24/outline/ArrowUpRightIcon";
import SparklesIcon from "@heroicons/react/24/outline/SparklesIcon";

import ServiceLayout from "./ServicesLayout";
import { useModal } from "../../context/ModalContext";
import seoImage from "../../img/CoreslashTechnologies-seo.webp";

const detailedFeatures = [
    { title: "Intent Mapping", desc: "Advanced keyword research targeting high-conversion search intent.", icon: MagnifyingGlassIcon },
    { title: "Technical SEO", desc: "Optimizing Core Web Vitals and site architecture for peak crawlability.", icon: CommandLineIcon },
    { title: "Authority Building", desc: "Strategic backlink acquisition from high-DA industry leaders.", icon: LinkIcon },
    { title: "Local Dominance", desc: "GMB optimization to capture 'near me' local search traffic.", icon: MapPinIcon },
    { title: "Content Velocity", desc: "Data-backed content strategies that rank and convert readers.", icon: DocumentTextIcon },
    { title: "ROI Reporting", desc: "Transparent tracking of rankings, traffic, and bottom-line revenue.", icon: ChartBarIcon }
];

const SEOOptimization: React.FC = () => {
    const { openModal } = useModal();
    const { scrollYProgress } = useScroll();
    const yRange = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <ServiceLayout
            title="SEO Dominance"
            subtitle="Engineered for visibility. Optimized for authority."
            ctaText="Claim Free SEO Audit"
        >
            <div className="bg-[#F9FAFB] text-gray-900 overflow-hidden">
                {/* --- HERO SECTION --- */}
                <section className="container mx-auto px-6 lg:px-12 py-12 md:py-24 md:py-32">
                    <div className="flex flex-col lg:flex-row items-center gap-20">

                        {/* LEFT VISUAL: IMAGE WITH PARALLAX */}
                        <motion.div
                            className="w-full lg:w-1/2 relative"
                            style={{ y: yRange }}
                        >
                            <div className="absolute -inset-4 bg-primary-purple/5 rounded-[3rem] blur-3xl opacity-50" />
                            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-gray-200 shadow-xl group aspect-video">
                                <img
                                    src={seoImage}
                                    alt="SEO Optimization Services"
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Floating Stats Badge */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-4 right-2 md:-bottom-8 md:-right-4 bg-white p-2 md:p-3 rounded-lg md:rounded-xl border border-gray-200 shadow-md z-20"
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
                        </motion.div>

                        {/* RIGHT CONTENT */}
                        <motion.div
                            initial={{ opacity: 1, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0, margin: "200px" }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="flex items-center gap-2 mb-6 text-secondary-indigo font-bold tracking-[0.3em] uppercase text-xs">
                                <SparklesIcon className="w-4 h-4" />
                                Algorithm Intelligence
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-10 leading-[1.1] tracking-tight">
                                Data-Driven <span className="text-gradient-purple">SEO</span> Excellence.
                            </h2>
                            <p className="text-gray-500 text-xl leading-relaxed mb-12">
                                Visibility isn't just about traffic—it's about <span className="text-gray-900 font-bold">Authority.</span> 
                                We combine technical precision with semantic search strategies to ensure your brand 
                                doesn't just rank, but dominates the entire search landscape.
                            </p>

                            {/* SMALL ICON STATS GRID */}
                            <div className="grid grid-cols-3 gap-6 mb-12">
                                {[
                                    { label: "Growth", val: "3X", icon: ChartBarIcon },
                                    { label: "Rankings", val: "Top 10", icon: GlobeAltIcon },
                                    { label: "ROI", val: "250%", icon: ArrowTrendingUpIcon },
                                ].map((stat, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-200/60 shadow-md shadow-gray-200/10 flex flex-col items-center text-center">
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
                                    Claim Free SEO Audit
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* --- FEATURES ECOSYSTEM --- */}
                <section className="bg-white border-t border-gray-200/60 pt-16 pb-12 md:pt-32 md:pb-16 shadow-sm">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="text-center mb-24">
                            <h3 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                                Complete <span className="text-gradient-cyan">SEO</span> Ecosystem
                            </h3>
                            <p className="text-gray-500 max-w-2xl mx-auto">Full-funnel optimization for modern search algorithms.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {detailedFeatures.map((f, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 1, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0, margin: "200px" }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-white p-10 rounded-[2.5rem] border border-gray-200/60 hover:border-secondary-indigo/30 hover:shadow-lg shadow-md shadow-gray-200/10 group transition-all h-full flex flex-col items-center text-center"
                                >
                                    <div className="w-16 h-16 mb-8 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-secondary-indigo/10 transition-colors mx-auto">
                                        <f.icon className="w-8 h-8 text-gray-900 group-hover:text-secondary-indigo transition-colors" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight group-hover:text-secondary-indigo transition-colors">{f.title}</h4>
                                    <p className="text-gray-500 leading-relaxed mb-8 font-medium">
                                        {f.desc}
                                    </p>
                                    <div className="flex items-center gap-2 text-secondary-indigo font-bold text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 justify-center w-full">
                                        STRATEGY <ArrowUpRightIcon className="w-4 h-4" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </ServiceLayout>
    );
};

export default SEOOptimization;

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

import ServiceLayout from "./ServicesLayout";
import { useModal } from "../../context/ModalContext";
import seoImage from "../../img/seo.webp";

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
            title="SEO Optimization"
            subtitle="Dominate Search Results & Capture High-Intent Traffic"
            ctaText="Get Free SEO Audit"
            headerGradient="from-[#1e1b4b] via-[#4c1d95] to-[#1e1b4b] mt-3"
        >
            <div className="bg-white overflow-hidden">
                {/* --- HERO SECTION --- */}
                <section className="container mx-auto px-4 md:px-12 py-16 md:py-32">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

                        {/* LEFT VISUAL: IMAGE WITH PARALLAX */}
                        <motion.div
                            className="w-full lg:w-1/2 relative"
                            style={{ y: yRange }}
                        >
                            <div className="relative z-10 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl border border-slate-100">
                                <img
                                    src={seoImage}
                                    alt="SEO Optimization Services"
                                    className="w-full h-[250px] md:h-[450px] object-cover hover:scale-105 transition duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent" />
                            </div>

                            {/* Floating Stats Badge */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -bottom-6 -right-2 md:-right-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl p-6 z-20 border border-slate-50"
                            >
                                <div className="flex gap-4 items-center">
                                    <div className="p-3 bg-green-100 rounded-2xl">
                                        <ArrowTrendingUpIcon className="w-8 h-8 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-black text-2xl text-slate-900">+312%</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Traffic Growth</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* RIGHT CONTENT */}
                        <motion.div
                            className="w-full lg:w-1/2"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-[1] tracking-tighter">
                                Data-Driven <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                                    SEO Excellence.
                                </span>
                            </h2>
                            <p className="text-slate-600 text-base md:text-lg mb-10 leading-relaxed">
                                Visibility isn't just about traffic—it's about <span className="font-bold text-slate-900">Authority.</span> We combine technical precision with semantic search strategies to ensure your brand doesn't just rank, but dominates the entire search landscape.
                            </p>

                            {/* SMALL ICON STATS GRID */}
                            <div className="grid grid-cols-3 gap-4 mb-10">
                                {[
                                    { label: "Growth", val: "3X", icon: ChartBarIcon },
                                    { label: "Rankings", val: "Top 10", icon: GlobeAltIcon },
                                    { label: "ROI", val: "250%", icon: ArrowTrendingUpIcon },
                                ].map((stat, idx) => (
                                    <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        <stat.icon className="w-5 h-5 text-purple-600 mb-2" />
                                        <p className="font-black text-lg text-slate-900">{stat.val}</p>
                                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            <button onClick={openModal} className="w-full md:w-auto px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-purple-700 transition-all transform hover:-translate-y-1">
                                Claim Your Free SEO Audit
                            </button>
                        </motion.div>
                    </div>
                </section>

                {/* --- FEATURES GRID (Animated Borders & 2 in 1 Row on Mobile) --- */}
                <section className="bg-slate-50/50 py-20 md:py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16 md:mb-24">
                            <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Complete SEO Ecosystem</h3>
                            <p className="text-slate-500 mt-4 font-medium">Full-funnel optimization for modern search algorithms.</p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10">
                            {detailedFeatures.map((f, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group relative p-[1px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-slate-200 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-200/50"
                                >
                                    {/* ANIMATED BORDER */}
                                    <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_180deg,#9333ea_270deg,transparent_360deg)] opacity-0 group-hover:opacity-100 animate-[spin_8s_linear_infinite]" />

                                    {/* CARD BODY */}
                                    <div className="relative h-full bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-10 z-10 overflow-hidden">
                                        {/* GRADIENT FADE */}
                                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                        <div className="relative z-20">
                                            <div className="w-10 h-10 md:w-16 md:h-16 mb-4 md:mb-8 rounded-xl md:rounded-2xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-200 group-hover:rotate-6 transition-all">
                                                <f.icon className="w-5 h-5 md:w-8 md:h-8 text-white" />
                                            </div>
                                            <h4 className="text-sm md:text-2xl font-black text-slate-900 mb-1 md:mb-4 tracking-tight">{f.title}</h4>
                                            <p className="text-[10px] md:text-base text-slate-500 leading-tight md:leading-relaxed mb-4 font-medium line-clamp-2 md:line-clamp-none">
                                                {f.desc}
                                            </p>
                                            <div className="hidden md:flex items-center gap-2 text-purple-600 font-black text-xs tracking-widest group-hover:gap-4 transition-all">
                                                STRATEGY <ArrowUpRightIcon className="w-4 h-4" />
                                            </div>
                                        </div>
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
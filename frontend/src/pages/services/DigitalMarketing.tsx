


// import React, { useEffect, useState } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import {
//     ChartBarIcon,
//     UserGroupIcon,
//     ChatBubbleLeftRightIcon,
//     CursorArrowRaysIcon,
//     FunnelIcon,
//     PresentationChartLineIcon,
//     CheckBadgeIcon,
//     ArrowUpRightIcon,
//     SparklesIcon
// } from "@heroicons/react/24/outline";
// import ServiceLayout from "./ServicesLayout";
// import { useModal } from "../../context/ModalContext";

// const features = [
//     { title: "Social Ads", desc: "Precision campaigns on Meta & LinkedIn.", icon: UserGroupIcon },
//     { title: "Content", desc: "Stories that convert leads to advocates.", icon: ChatBubbleLeftRightIcon },
//     { title: "SEO", desc: "Rank higher and dominate organic search.", icon: ChartBarIcon },
//     { title: "PPC", desc: "High-ROI Google & Bing Ads management.", icon: CursorArrowRaysIcon },
//     { title: "Funnels", desc: "Architectures for seamless conversion.", icon: FunnelIcon },
//     { title: "Analytics", desc: "Deep-dive insights into your spend.", icon: PresentationChartLineIcon },
// ];

// const FeatureCard = ({ f, i }: { f: any; i: number }) => {
//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 15 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: i * 0.05 }}
//             className="group relative p-[1px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-slate-100 transition-all duration-500"
//         >
//             {/* ANIMATED BORDER */}
//             <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_180deg,#fb923c_270deg,transparent_360deg)] opacity-0 group-hover:opacity-100 animate-spin-slow" />

//             {/* INNER CARD BODY */}
//             <div className="relative h-full bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-10 z-10 overflow-hidden flex flex-col items-center text-center md:items-start md:text-left">

//                 {/* ORANGE FADE-OUT */}
//                 <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

//                 <div className="relative z-20 w-full">
//                     {/* Scaled down icon for mobile */}
//                     <div className="w-10 h-10 md:w-16 md:h-16 mb-3 md:mb-8 rounded-xl md:rounded-2xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-200 mx-auto md:mx-0 group-hover:scale-110 transition-transform">
//                         <f.icon className="w-5 h-5 md:w-8 md:h-8 text-white" />
//                     </div>

//                     <h3 className="text-sm md:text-2xl font-black text-[#0f172a] mb-1 md:mb-4 tracking-tight">
//                         {f.title}
//                     </h3>

//                     <p className="text-[10px] md:text-base text-slate-500 leading-tight md:leading-relaxed mb-4 md:mb-8 font-medium line-clamp-2 md:line-clamp-none">
//                         {f.desc}
//                     </p>

//                     <div className="hidden md:flex items-center gap-2 text-orange-600 font-black text-xs tracking-[0.15em] transition-all group-hover:gap-4">
//                         LEARN MORE <ArrowUpRightIcon className="w-4 h-4" />
//                     </div>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// const DigitalMarketing: React.FC = () => {
//     const { openModal } = useModal();
//     const { scrollYProgress } = useScroll();
//     const yRange = useTransform(scrollYProgress, [0, 1], [0, -100]); // Parallax shift

//     return (
//         <ServiceLayout
//             title="Digital Marketing"
//             subtitle="Strategic Growth Through Digital Intelligence"
//             ctaText="Request a Strategy Proposal"
//             headerGradient="from-[#020617] via-[#1e293b] to-[#020617] mt-5"
//         >
//             <div className="bg-white">

//                 {/* HERO SECTION */}
//                 <section className="container mx-auto px-4 md:px-12 py-12 md:py-32">
//                     <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-24">

//                         <motion.div
//                             className="w-full lg:w-1/2 relative order-2 lg:order-1"
//                             style={{ y: yRange }} // Parallax Effect
//                         >
//                             <div className="rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl border border-slate-100">
//                                 <img
//                                     src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000"
//                                     alt="Strategy"
//                                     className="w-full h-[300px] md:h-[550px] object-cover"
//                                 />
//                             </div>
//                             <div className="absolute -bottom-5 -right-2 md:-bottom-10 md:-right-5 bg-white p-3 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl z-20 border border-slate-50 flex items-center gap-2 md:gap-4">
//                                 <div className="p-2 md:p-3 bg-orange-600 rounded-lg md:rounded-xl"><SparklesIcon className="w-4 h-4 md:w-6 md:h-6 text-white" /></div>
//                                 <div>
//                                     <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth</p>
//                                     <p className="text-sm md:text-lg font-black text-slate-900">+312% ROI</p>
//                                 </div>
//                             </div>
//                         </motion.div>

//                         <div className="w-full lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
//                             <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-[1] md:leading-[0.95]">
//                                 Data-Driven <br />
//                                 <span className="text-orange-600">Marketing Excellence.</span>
//                             </h2>
//                             <p className="text-slate-600 text-sm md:text-lg mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
//                                 Architecting high-performance revenue engines through algorithmic precision.
//                             </p>
//                             <button onClick={openModal} className="w-full md:w-auto px-8 py-4 md:px-10 md:py-5 bg-slate-900 text-white font-black rounded-xl md:rounded-2xl hover:bg-orange-600 transition-all">
//                                 Get Your Free Audit
//                             </button>
//                         </div>
//                     </div>
//                 </section>

//                 {/* FEATURES GRID - 2 per row on Mobile */}
//                 <section className="bg-slate-50/50 py-10 md:py-20">
//                     <div className="container mx-auto px-4 md:px-6">
//                         <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10">
//                             {features.map((f, i) => (
//                                 <FeatureCard key={i} f={f} i={i} />
//                             ))}
//                         </div>
//                     </div>
//                 </section>

//                 {/* PRICING */}
//                 <section className="py-20 md:py-32">
//                     <div className="container mx-auto px-4 md:px-6">
//                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10 max-w-7xl mx-auto">
//                             {/* Reuse your existing pricing packages map here, just ensure grid-cols-1 for mobile */}
//                         </div>
//                     </div>
//                 </section>
//             </div>
//         </ServiceLayout>
//     );
// };

// export default DigitalMarketing;



import React from "react";
import { motion } from "framer-motion";
import {
    CheckCircleIcon,
    ArrowTrendingUpIcon,
    ChartBarIcon,
    GlobeAltIcon
} from "@heroicons/react/24/solid";

import ServiceLayout from "./ServicesLayout";
import seoImage from "../../img/seo.jpg"; // add your image here

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

const SEOOptimization: React.FC = () => {
    return (
        <ServiceLayout
            title="SEO Optimization"
            subtitle="Rank Higher on Google, Drive Organic Traffic & Grow Your Revenue"
            ctaText="Get Free SEO Audit"
            headerGradient="from-indigo-900 via-purple-900 to-pink-900 mt-3"
        >
            <section className="container mx-auto px-6 py-16">

                <div className="grid md:grid-cols-2 gap-16 items-center">


                    {/* IMAGE LEFT */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >

                        <img
                            src={seoImage}
                            alt="SEO Optimization Services"
                            className="rounded-3xl shadow-2xl group-hover:scale-105 transition duration-500 w-full h-[200px] md:h-[450px] object-cover"
                        />

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity
                            }}
                            className="absolute -bottom-6 -right-6 bg-white shadow-xl rounded-2xl p-5"
                        >
                            <div className="flex gap-3 items-center">

                                <ArrowTrendingUpIcon className="w-10 h-10 text-green-500" />

                                <div>

                                    <p className="font-bold text-lg">
                                        +312%
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Avg Traffic Growth
                                    </p>

                                </div>

                            </div>
                        </motion.div>

                    </motion.div>



                    {/* CONTENT RIGHT */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >

                        <h2 className="text-4xl font-bold mb-6 leading-tight">

                            Data-Driven
                            <span className="text-purple-600">
                                {" "}Marketing Excellence
                            </span>

                        </h2>



                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">

                            Our SEO services are designed to position your business at the top of search engine results,
                            helping you attract high-intent customers who are actively searching for your products and services.

                            We combine advanced keyword research, technical optimization, and strategic content marketing
                            to create a powerful digital presence that delivers consistent organic traffic, leads,
                            and revenue growth.

                        </p>


                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">

                            Unlike traditional SEO agencies, we focus on measurable business outcomes —
                            improving rankings, increasing visibility, enhancing user experience, and maximizing your ROI.

                            Our data-driven approach ensures sustainable long-term growth and competitive dominance
                            in your industry.

                        </p>



                        {/* ICON STATS */}
                        <div className="grid grid-cols-3 gap-6 mb-10">

                            <div className="text-center">

                                <ChartBarIcon className="w-10 mx-auto text-purple-600 mb-2" />

                                <p className="font-bold text-xl">
                                    3X
                                </p>

                                <p className="text-sm text-gray-500">
                                    Traffic Growth
                                </p>

                            </div>


                            <div className="text-center">

                                <GlobeAltIcon className="w-10 mx-auto text-purple-600 mb-2" />

                                <p className="font-bold text-xl">
                                    Top 10
                                </p>

                                <p className="text-sm text-gray-500">
                                    Google Rankings
                                </p>

                            </div>



                            <div className="text-center">

                                <ArrowTrendingUpIcon className="w-10 mx-auto text-purple-600 mb-2" />

                                <p className="font-bold text-xl">
                                    250%
                                </p>

                                <p className="text-sm text-gray-500">
                                    ROI Increase
                                </p>

                            </div>


                        </div>



                    </motion.div>



                    {/* FEATURES FULL WIDTH */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 bg-gradient-to-br from-white to-purple-50 border rounded-3xl p-10 shadow-xl"
                    >

                        <h3 className="text-3xl font-bold mb-8 text-center">

                            Our Complete SEO Solution

                        </h3>


                        <div className="grid md:grid-cols-2 gap-6">

                            {features.map((feature, index) => (

                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    className="flex gap-4 items-start p-4 rounded-xl hover:bg-white hover:shadow-lg transition"
                                >

                                    <CheckCircleIcon className="w-7 h-7 text-purple-600" />

                                    <span className="text-lg font-medium text-gray-700">
                                        {feature}
                                    </span>

                                </motion.div>

                            ))}

                        </div>


                    </motion.div>



                </div>

            </section>

        </ServiceLayout>
    );
};

export default SEOOptimization;
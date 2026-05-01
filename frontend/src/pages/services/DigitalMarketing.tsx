

import React from "react";
import { motion } from "framer-motion";
import {
    CheckCircleIcon,
    ArrowTrendingUpIcon,
    ChartBarIcon,
    GlobeAltIcon
} from "@heroicons/react/24/solid";

import ServiceLayout from "./ServicesLayout";
import digitalMarketingImage from "../../img/CoreslashTechnologies-DigitalMarketing.png"; // add your image here

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
                            src={digitalMarketingImage}
                            alt="Digital Marketing Services"
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
import React from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon, RocketLaunchIcon, ChartBarIcon, BriefcaseIcon } from "@heroicons/react/24/solid";
import ServiceLayout from "./ServicesLayout";
import ppcImage from "../../img/ppc-expert.webp";

/* ================= PACKAGES JSON ================= */
const packages = [
    {
        name: "Starter",
        description: "Ideal for local businesses starting their digital journey.",
        price: "₹7,999",
        duration: "/mo",
        highlight: false,
        icon: <RocketLaunchIcon className="w-8 h-8 text-cyan-600" />,
        buttonText: "Get Started",
        features: [
            "1 Advertising Platform",
            "Campaign Setup & Audit",
            "Keyword Research",
            "Ad Copy Creation",
            "Basic Audience Targeting",
            "Monthly Performance Report",
            "Email Support",
        ],
    },
    {
        name: "Growth",
        description: "Engineered for scaling brands seeking aggressive ROI.",
        price: "₹14,999",
        duration: "/mo",
        highlight: true,
        icon: <ChartBarIcon className="w-8 h-8 text-white" />,
        buttonText: "Scale Now",
        features: [
            "2 Advertising Platforms",
            "Advanced Audience Targeting",
            "Conversion Tracking Setup",
            "Retargeting Campaigns",
            "A/B Testing & Optimization",
            "Landing Page Audit",
            "Bi-Weekly Strategy Calls",
            "Priority Support",
        ],
    },
    {
        name: "Enterprise",
        description: "Full-funnel dominance for market leaders.",
        price: "₹24,999",
        duration: "/mo",
        highlight: false,
        icon: <BriefcaseIcon className="w-8 h-8 text-cyan-600" />,
        buttonText: "Contact Sales",
        features: [
            "Omni-channel Strategy",
            "Full Funnel Architecture",
            "Advanced Conversion API",
            "Daily Bid Optimization",
            "Creative Design Support",
            "Weekly Deep-Dive Reports",
            "Dedicated Account Manager",
            "Custom Scaling Roadmap",
        ],
    },
];

const features = [
    "Google Search & Display Ads",
    "Meta (FB & IG) Ads",
    "LinkedIn & YouTube Ads",
    "Hyper-Local Targeting",
    "High-Converting Ad Copy",
    "GTM & Pixel Integration",
    "Continuous A/B Testing",
    "Remarketing Funnels",
    "ROI & ROAS Optimization",
    "Real-time Data Dashboards",
];

/* ================= COMPONENT ================= */
const PPCServices = () => {
    return (
        <ServiceLayout
            title="PPC & Ads Management"
            subtitle="Data-driven precision. Performance-led results. Maximize your digital footprint with elite PPC strategies."
            ctaText="Start Growing Today"
            headerGradient="from-slate-950 via-blue-950 to-indigo-950"
        >
            <div className="container mx-auto px-6 py-24">

                {/* HERO/IMAGE SECTION */}
                <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <img
                            src={ppcImage}
                            alt="PPC Specialist"
                            className="relative rounded-2xl shadow-2xl border border-white/10"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-cyan-600 font-bold tracking-widest uppercase text-sm mb-4 block">Performance First</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-slate-900 leading-tight">
                            ROI-Driven Precision <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
                                PPC Campaigns
                            </span>
                        </h2>
                        <p className="text-slate-600 text-xl leading-relaxed mb-6">
                            Stop burning your budget. We craft high-performance funnels using Google Ads and Meta Ads that target customers ready to convert.
                        </p>
                        <div className="h-1 w-20 bg-cyan-600 rounded-full mb-8"></div>
                        <p className="text-slate-500 text-lg italic">
                            "We don't just manage clicks; we engineer profitable growth."
                        </p>
                    </motion.div>
                </div>

                {/* STRATEGY SECTION */}
                <div className="grid lg:grid-cols-3 gap-12 mb-32">
                    <div className="lg:col-span-1">
                        <h2 className="text-3xl font-bold mb-6 text-slate-900">Our Strategic Framework</h2>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            Our methodology combines behavioral psychology with advanced data analytics to ensure every rupee spent contributes to your bottom line.
                        </p>
                        <button className="px-8 py-3 border-2 border-slate-900 rounded-full font-bold hover:bg-slate-900 hover:text-white transition-all duration-300">
                            Learn Our Method
                        </button>
                    </div>

                    <div className="lg:col-span-2 bg-slate-50 p-8 md:p-12 rounded-[2rem] border border-slate-200/60 shadow-inner">
                        <ul className="grid md:grid-cols-2 gap-y-6 gap-x-12">
                            {features.map((item, index) => (
                                <motion.li
                                    key={index}
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-4 text-slate-700 font-medium"
                                >
                                    <CheckCircleIcon className="w-6 h-6 text-cyan-500 flex-shrink-0" />
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* PACKAGES SECTION */}
                <section>
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold mb-4 text-slate-900">Investment Tiers</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                            Transparent pricing models designed to scale with your business goals.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 items-stretch">
                        {packages.map((pkg, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                className={`relative flex flex-col rounded-[2.5rem] p-10 transition-all duration-500 border
                  ${pkg.highlight
                                        ? "bg-slate-950 text-white shadow-2xl shadow-blue-900/20 border-slate-800"
                                        : "bg-white text-slate-900 shadow-xl border-slate-100"
                                    }`}
                            >
                                {pkg.highlight && (
                                    <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">{pkg.icon}</div>

                                <h3 className="text-2xl font-bold mb-3">{pkg.name}</h3>
                                <p className={`text-sm mb-8 leading-relaxed ${pkg.highlight ? "text-slate-400" : "text-slate-500"}`}>
                                    {pkg.description}
                                </p>

                                <div className="flex items-baseline mb-10">
                                    <span className={`text-5xl font-extrabold tracking-tight ${pkg.highlight ? "text-white" : "text-slate-900"}`}>
                                        {pkg.price}
                                    </span>
                                    <span className={`text-lg ml-2 font-medium ${pkg.highlight ? "text-slate-400" : "text-slate-500"}`}>
                                        {pkg.duration}
                                    </span>
                                </div>

                                <ul className="space-y-5 mb-12 flex-grow">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm font-medium">
                                            <CheckCircleIcon className={`w-5 h-5 flex-shrink-0 ${pkg.highlight ? "text-cyan-400" : "text-cyan-600"}`} />
                                            <span className={pkg.highlight ? "text-slate-300" : "text-slate-600"}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 transform active:scale-95
                    ${pkg.highlight
                                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30 hover:brightness-110"
                                            : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                                        }`}
                                >
                                    {pkg.buttonText}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </ServiceLayout>
    );
};

export default PPCServices;


import React from "react";
import { motion } from "framer-motion";
import CommandLineIcon from "@heroicons/react/24/outline/CommandLineIcon";
import CloudIcon from "@heroicons/react/24/outline/CloudIcon";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import KeyIcon from "@heroicons/react/24/outline/KeyIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import BeakerIcon from "@heroicons/react/24/outline/BeakerIcon";
import CheckBadgeIcon from "@heroicons/react/24/outline/CheckBadgeIcon";
import CpuChipIcon from "@heroicons/react/24/outline/CpuChipIcon";
import ShieldCheckIcon from "@heroicons/react/24/outline/ShieldCheckIcon";
import RocketLaunchIcon from "@heroicons/react/24/outline/RocketLaunchIcon";

import ServiceLayout from "./ServicesLayout";
import { useModal } from "../../context/ModalContext";
import software_hero_splash from "../../img/software/CoreslashTechnologies-software.webp"; // Ensure this path is correct

/* ================= DATA ================= */

const features = [
    { title: "Custom CRM / ERP", desc: "Tailored business management software.", icon: CommandLineIcon, color: "bg-blue-50 text-blue-600" },
    { title: "Cloud Integration", desc: "Deploy on AWS, Azure, or Google Cloud.", icon: CloudIcon, color: "bg-indigo-50 text-indigo-600" },
    { title: "Legacy Migration", desc: "Upgrade old software to modern systems.", icon: ArrowPathIcon, color: "bg-purple-50 text-purple-600" },
    { title: "API Development", desc: "Secure and scalable API solutions.", icon: KeyIcon, color: "bg-cyan-50 text-cyan-600" },
];

const solutions = [
    { name: "CRM Software", icon: <CheckBadgeIcon className="w-6 h-6" /> },
    { name: "ERP Software", icon: <CpuChipIcon className="w-6 h-6" /> },
    { name: "Billing Software", icon: <ShieldCheckIcon className="w-6 h-6" /> },
    { name: "Inventory Systems", icon: <CircleStackIcon className="w-6 h-6" /> },
    { name: "SaaS Platforms", icon: <CloudIcon className="w-6 h-6" /> },
    { name: "Custom Business Software", icon: <RocketLaunchIcon className="w-6 h-6" /> },
];

const packages = [

    {
        name: "Basic Software",
        price: "?15,000",
        features: [
            "Admin panel",
            "Basic dashboard",
            "Database",
            "Login system",
            "1 Month Support"
        ]
    },

    {
        name: "Standard Software",
        price: "?35,000",
        highlight: true,
        features: [
            "Custom software",
            "Admin dashboard",
            "Reports",
            "API integration",
            "3 Months Support"
        ]
    },

    {
        name: "Premium Software",
        price: "?75,000",
        features: [
            "Fully custom software",
            "Cloud deployment",
            "Payment integration",
            "Advanced features",
            "6 Months Support"
        ]
    }

];

const SoftwareDevelopment: React.FC = () => {
    const { openModal } = useModal();

    return (
        <ServiceLayout
            title="Software Development"
            subtitle="Custom Enterprise Solutions"
            ctaText="Request a Demo"
            headerGradient="from-[#020617] via-[#1e1b4b] to-[#020617] mt-5"
        >
            {/* ================= HERO SECTION (SPLASH LEFT, CONTENT RIGHT) ================= */}
            <section className="relative container mx-auto px-6 py-12 md:py-24 overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* LEFT SIDE: SPLASH IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        {/* Decorative Gradient Glow behind image */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-3xl rounded-full" />

                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10"
                        >
                            <img
                                src={software_hero_splash}
                                alt="Software Development Visual"
                                className="w-full h-auto rounded-[2.5rem] shadow-2xl border-b-8 border-indigo-600/20 shadow-indigo-500/10"
                            />
                        </motion.div>
                    </motion.div>

                    {/* RIGHT SIDE: CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            Future-Ready Tech
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
                            Enterprise Software<br />
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Built for Scalability
                            </span>
                        </h2>

                        <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-xl">
                            Coreslash Technologies develops secure, scalable software tailored to your specific business logic. We don't just write code; we solve complex operational bottlenecks.
                        </p>

                        {/* Classy Tag Grid */}
                        <div className="flex flex-wrap gap-4 mb-10">
                            {["Secure", "Scalable", "Fast"].map((tag) => (
                                <div key={tag} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-800 font-bold text-sm">
                                    <CheckBadgeIcon className="w-5 h-5 text-indigo-600" />
                                    {tag}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={openModal}
                            className="group relative px-10 py-5 bg-indigo-600 text-white font-bold rounded-2xl overflow-hidden transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 active:scale-95"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Book Free Consultation
                                <RocketLaunchIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </motion.div>
                </div>
            </section>


            {/* ================= ICONIC SOLUTIONS - PROFESSIONAL NAVY BLUE ================= */}
            <section className="py-20 bg-white relative overflow-hidden">

                {/* Large Background Decorative Text (Classy Branding) */}
                <div className="absolute top-10 left-0 w-full overflow-hidden pointer-events-none select-none hidden md:block">
                    <h2 className="text-[12rem] font-black text-slate-50 leading-none tracking-tighter uppercase translate-y-20">
                        Systems
                    </h2>
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center mb-12 md:mb-20">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-blue-600 font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 block"
                        >
                            Secure Infrastructure
                        </motion.span>
                        <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
                            Solutions We <span className="text-blue-700">Deploy</span>
                        </h2>
                        <div className="flex justify-center gap-1">
                            <div className="w-10 h-1 md:w-12 md:h-1.5 bg-blue-600 rounded-full" />
                            <div className="w-2 h-1 md:w-2 md:h-1.5 bg-blue-200 rounded-full" />
                        </div>
                    </div>

                    {/* 2nd column mobile grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 max-w-7xl mx-auto">
                        {solutions.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ y: -8 }}
                                className="group relative p-4 md:p-10 bg-[#020617] rounded-[1.5rem] md:rounded-[3rem] transition-all duration-500 border border-blue-900/20 hover:border-blue-500/50 hover:shadow-[0_20px_40px_-10px_rgba(2,6,23,0.5)]"
                            >
                                {/* Blue Glow Reveal */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[1.5rem] md:rounded-[3rem]" />

                                <div className="relative z-10">
                                    {/* Professional Icon Box: Blue on Dark Blue */}
                                    <div className="w-10 h-10 md:w-16 md:h-16 bg-blue-950 rounded-xl md:rounded-2xl flex items-center justify-center text-blue-400 border border-blue-800/50 mb-4 md:mb-8 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-[360deg] transition-all duration-[0.7s] ease-in-out shadow-lg">
                                        {React.cloneElement(item.icon, { className: "w-5 h-5 md:w-8 md:h-8" })}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-sm md:text-2xl font-bold text-white mb-1 md:mb-3 tracking-tight group-hover:text-blue-200 transition-colors">
                                        {item.name}
                                    </h3>

                                    {/* Description - Desktop Only */}
                                    <p className="hidden md:block text-blue-100/40 text-sm leading-relaxed mb-6 group-hover:text-blue-100/80 transition-colors">
                                        Robust, enterprise-grade {item.name.toLowerCase()} designed for maximum uptime and security.
                                    </p>

                                    {/* Mobile Link */}
                                    <div className="md:hidden flex items-center gap-1 text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-2">
                                        Deploy ?
                                    </div>
                                </div>

                                {/* Iconic Ghost Numbering */}
                                <div className="absolute bottom-3 right-4 md:bottom-8 md:right-10 text-white/[0.02] text-3xl md:text-7xl font-black group-hover:text-blue-500/[0.05] transition-colors">
                                    0{i + 1}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* ================= PACKAGES SECTION: ICONIC LIGHT BLUE ================= */}
            <section className="py-24 bg-slate-50/50 relative overflow-hidden">
                {/* Decorative Background Element */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 blur-[100px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    {/* Heading */}
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">
                                Tailored Investment
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
                                Software Development <span className="text-blue-600">Packages</span>
                            </h2>
                            <div className="w-24 h-1.5 bg-blue-500 mx-auto rounded-full mb-6" />
                            <p className="text-slate-500 max-w-2xl mx-auto font-medium">
                                Scalable solutions designed to evolve with your business. Choose a foundation that matches your current operational scale.
                            </p>
                        </motion.div>
                    </div>

                    {/* Pricing Grid */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {packages.map((pkg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                whileHover={{ y: -15 }}
                                className={`relative p-10 rounded-[3rem] bg-white transition-all duration-500 border ${pkg.highlight
                                    ? "border-blue-400 shadow-[0_40px_80px_-15px_rgba(59,130,246,0.15)] ring-1 ring-blue-100 scale-105 z-20"
                                    : "border-slate-200 shadow-xl shadow-slate-200/50 z-10"
                                    }`}
                            >
                                {/* Featured Badge */}
                                {pkg.highlight && (
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-200">
                                        Most Popular
                                    </div>
                                )}

                                {/* Package Identity */}
                                <div className="text-center mb-8">
                                    <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-2">
                                        {pkg.name.split(' ')[0]}
                                    </h3>
                                    <div className="text-3xl font-black text-slate-900 mb-4">
                                        {pkg.name}
                                    </div>
                                    <div className="flex items-center justify-center gap-1">
                                        <span className="text-5xl font-black text-slate-900 tracking-tighter">
                                            {pkg.price}
                                        </span>
                                    </div>
                                    <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-tighter">
                                        Base Implementation Fee
                                    </p>
                                </div>

                                <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-100 to-transparent mb-8" />

                                {/* Features List */}
                                <ul className="space-y-5 mb-10">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-4 group/item">
                                            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${pkg.highlight ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400"
                                                }`}>
                                                <CheckBadgeIcon className="w-4 h-4" />
                                            </div>
                                            <span className="text-slate-600 font-medium text-sm group-hover/item:text-slate-900 transition-colors">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Action Button */}
                                <button
                                    onClick={openModal}
                                    className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-[0.1em] transition-all duration-300 ${pkg.highlight
                                        ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200"
                                        : "bg-slate-900 text-white hover:bg-blue-600 shadow-lg"
                                        }`}
                                >
                                    Get Custom Quote
                                </button>

                                {/* Subtle Bottom Accent */}
                                <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full ${pkg.highlight ? "bg-blue-200" : "bg-slate-100"
                                    }`} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom Trust Note */}
                    <div className="mt-16 text-center">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                            All packages include standard <span className="text-blue-600">SLA compliance</span> & documentation
                        </p>
                    </div>
                </div>
            </section>
        </ServiceLayout>
    );
};

export default SoftwareDevelopment;

import React from "react";
import { motion } from "framer-motion";
import {
    CommandLineIcon,
    CloudIcon,
    ArrowPathIcon,
    KeyIcon,
    CircleStackIcon,
    BeakerIcon,
    CheckBadgeIcon,
    CpuChipIcon,
    ShieldCheckIcon,
    RocketLaunchIcon,
    SparklesIcon,
    ArrowRightIcon
} from "@heroicons/react/24/outline";

import ServiceLayout from "./ServicesLayout";
import { useModal } from "../../context/ModalContext";
import software_hero_splash from "../../img/software/CoreslashTechnologies-software.webp";
import software_hero_splashAvif from "../../img/software/CoreslashTechnologies-software.avif";
import SEO from "../../components/SEO";

/* ================= DATA ================= */

const features = [
    { title: "Bespoke Architectures", desc: "Tailored CRM & ERP systems engineered for specific business logic.", icon: CommandLineIcon },
    { title: "Cloud Native Scale", desc: "Distributed deployments on AWS, Azure, and Google Cloud Infrastructure.", icon: CloudIcon },
    { title: "Modernization Stack", desc: "Systematic legacy migration to modern high-velocity frameworks.", icon: ArrowPathIcon },
    { title: "Neural API Layer", desc: "Secure, hyper-scalable API ecosystems for seamless data flow.", icon: KeyIcon },
];

const solutions = [
    { name: "CRM Architecture", icon: <CheckBadgeIcon className="w-6 h-6" /> },
    { name: "ERP Systems", icon: <CpuChipIcon className="w-6 h-6" /> },
    { name: "Financial SaaS", icon: <ShieldCheckIcon className="w-6 h-6" /> },
    { name: "Neural Inventory", icon: <CircleStackIcon className="w-6 h-6" /> },
    { name: "Omni-SaaS Platforms", icon: <CloudIcon className="w-6 h-6" /> },
    { name: "Custom Logic", icon: <RocketLaunchIcon className="w-6 h-6" /> },
];

const packages = [
    {
        name: "MVP Protocol",
        price: "15,000",
        features: [
            "Advanced Admin Interface",
            "Real-time Logic Dashboard",
            "Optimized Neural Database",
            "Secure Auth Ecosystem",
            "1 Month Technical Sync"
        ]
    },
    {
        name: "Enterprise Core",
        price: "35,000",
        isPopular: true,
        features: [
            "Fully Bespoke Logic",
            "Executive Analytics Hub",
            "Complex Reporting Engine",
            "Omni-API Integration",
            "3 Months Dedicated Support"
        ]
    },
    {
        name: "Global Scale",
        price: "75,000",
        features: [
            "Distributed SaaS Architecture",
            "Multi-Cloud Deployment",
            "Fintech-grade Integration",
            "Advanced Feature Set",
            "6 Months Executive Care"
        ]
    }
];

const SoftwareDevelopment: React.FC = () => {
    const { openModal } = useModal();

    return (
        <ServiceLayout
            title="Software Intelligence"
            subtitle="Engineering robust enterprise ecosystems for high-velocity growth."
            ctaText="Request Engineering Demo"
        >
            <SEO
                title="Enterprise Software Development | CoreSlash Technologies"
                description="Tailored enterprise software development, system integrations, APIs, and scalable backend architectures for businesses."
            />
            <div className="bg-[#F9FAFB] text-gray-900">
                {/* HERO SECTION */}
                <section className="container mx-auto px-6 py-12 md:py-24">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 1, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0, margin: "200px" }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="flex items-center gap-2 mb-6 text-secondary-indigo font-bold tracking-[0.3em] uppercase text-xs">
                                <SparklesIcon className="w-4 h-4" />
                                Engineering Excellence
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-10 leading-[1.1] tracking-tight">
                                Enterprise <span className="text-gradient-purple">Intelligence</span> Built for Scale.
                            </h2>
                            <p className="text-gray-500 text-xl leading-relaxed mb-12">
                                At CoreSlash Technologies, we don't just write code—we solve complex operational
                                bottlenecks through systematic engineering. Our bespoke software solutions are
                                designed to be the digital backbone of your organization.
                            </p>

                            <div className="flex flex-wrap gap-4 mb-12">
                                {["Distributed", "Neural", "Atomic"].map((tag) => (
                                    <div key={tag} className="bg-white px-6 py-2 rounded-xl border border-gray-200/60 shadow-sm flex items-center gap-3">
                                        <CheckBadgeIcon className="w-5 h-5 text-secondary-indigo" />
                                        <span className="text-gray-900 font-bold text-sm tracking-widest uppercase">{tag}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center w-full">
                                <button
                                    onClick={openModal}
                                    className="w-full sm:w-auto btn-pill btn-primary-glow text-white text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4 whitespace-nowrap"
                                >
                                    Start Consultation
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 1, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0, margin: "200px" }}
                            transition={{ duration: 1 }}
                            className="relative"
                            style={{ perspective: 1200 }}
                        >
                            {/* Ambient breathing glow that amplifies on hover */}
                            <motion.div 
                                className="absolute -inset-4 bg-gradient-to-tr from-primary-purple/20 to-secondary-indigo/25 rounded-[3rem] blur-3xl opacity-40 pointer-events-none"
                                animate={{
                                    scale: [1, 1.03, 1],
                                    opacity: [0.4, 0.55, 0.4],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                whileHover={{ scale: 1.15, opacity: 0.8 }}
                            />
                            
                            {/* 3D Tilt Card Container */}
                            <motion.div 
                                className="relative rounded-[3rem] overflow-hidden border border-gray-200/80 shadow-2xl bg-white group cursor-pointer"
                                style={{ transformStyle: "preserve-3d" }}
                                whileHover={{
                                    rotateX: 4,
                                    rotateY: -6,
                                    scale: 1.03,
                                    boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.25)"
                                }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <motion.div 
                                    className="w-full h-auto"
                                    style={{ translateZ: 30 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                >
                                    <picture className="w-full h-auto object-cover flex items-center justify-center">
                                        <source srcSet={software_hero_splashAvif} type="image/avif" />
                                        <img
                                            src={software_hero_splash}
                                            alt="Software Development"
                                            loading="eager"
                                            decoding="async"
                                            className="w-full h-auto object-cover"
                                        />
                                    </picture>
                                </motion.div>

                                {/* Interactive glass shimmer sweep */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none" />
                                
                                {/* Overlay Border Highlight */}
                                <div className="absolute inset-0 rounded-[3rem] border border-white/20 pointer-events-none mix-blend-overlay" />
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* SOLUTIONS GRID */}
                <section className="py-16 md:py-32 bg-white border-t border-gray-200/60 shadow-sm">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24">
                            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                                Modular <span className="text-gradient-cyan">Solutions</span>
                            </h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">Enterprise-grade infrastructure designed for maximum uptime and security.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                            {solutions.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 1, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0, margin: "200px" }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-white p-6 sm:p-8 lg:p-12 rounded-[2rem] lg:rounded-[3rem] border border-gray-200/60 shadow-md shadow-gray-200/10 hover:shadow-lg group hover:border-secondary-indigo/30 transition-all relative overflow-hidden h-full flex flex-col"
                                >

                                    <div className="relative z-10 flex flex-col items-center text-center">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 mb-6 sm:mb-8 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900 group-hover:bg-secondary-indigo/10 group-hover:text-secondary-indigo transition-all mx-auto">
                                            {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-6 h-6 sm:w-8 sm:h-8" })}
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight group-hover:text-secondary-indigo transition-colors">{item.name}</h3>
                                        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 group-hover:text-gray-700 transition-colors">
                                            High-availability {item.name.toLowerCase()} architecture optimized for complex operational workflows.
                                        </p>
                                        <div className="flex items-center gap-2 text-secondary-indigo font-bold text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-all transform -translate-x-4 group-hover:translate-x-0 justify-center w-full">
                                            DEPLOY SYSTEM <ArrowRightIcon className="w-3 h-3" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PRICING PACKAGES */}
                <section className="pt-10 pb-12 md:pt-12 md:pb-16 bg-[#F9FAFB]">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24">
                            <h2 className="text-4xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
                                Strategic <span className="text-gradient-purple">Deployments</span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto items-stretch">
                            {packages.map((pkg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 1, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0, margin: "200px" }}
                                    transition={{ duration: 0.8, delay: index * 0.05 }}
                                    className={`relative p-12 rounded-[4rem] border flex flex-col transition-all duration-700 ${pkg.isPopular
                                            ? "bg-white border-2 border-primary-purple/30 shadow-2xl scale-105 z-10"
                                            : "bg-white border-gray-200/80 hover:border-secondary-indigo/30 shadow-md shadow-gray-200/10"
                                        }`}
                                >
                                    {pkg.isPopular && (
                                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-8 py-2 rounded-full bg-primary-purple text-white text-[10px] font-black uppercase tracking-widest shadow-2xl">
                                            Recommended Scale
                                        </div>
                                    )}

                                    <div className="mb-12">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{pkg.name}</h3>
                                    </div>

                                    <div className="flex-grow space-y-5 mb-14">
                                        {pkg.features.map((f, i) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <div className="w-6 h-6 rounded-full bg-secondary-indigo/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <CheckBadgeIcon className="w-4 h-4 text-secondary-indigo" />
                                                </div>
                                                <span className="text-gray-600 text-sm font-medium">{f}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={openModal}
                                        className={`btn-pill w-full text-lg ${pkg.isPopular ? "btn-primary-glow text-white" : "btn-glass text-secondary-indigo hover:text-white"
                                            }`}
                                    >
                                        Initiate Build
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-24 text-center">
                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">
                                All deployments include standard <span className="text-secondary-indigo">SLA compliance</span> & neural monitoring
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </ServiceLayout>
    );
};

export default SoftwareDevelopment;

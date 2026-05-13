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
            <div className="bg-dark-black">
                {/* HERO SECTION */}
                <section className="container mx-auto px-6 py-24">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="flex items-center gap-2 mb-6 text-accent-cyan font-bold tracking-[0.3em] uppercase text-xs">
                                <SparklesIcon className="w-4 h-4" />
                                Engineering Excellence
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-[1.1] tracking-tight">
                                Enterprise <span className="text-gradient-purple">Intelligence</span> Built for Scale.
                            </h2>
                            <p className="text-white/40 text-xl leading-relaxed mb-12">
                                At CoreSlash Technologies, we don't just write code—we solve complex operational 
                                bottlenecks through systematic engineering. Our bespoke software solutions are 
                                designed to be the digital backbone of your organization.
                            </p>

                            <div className="flex flex-wrap gap-4 mb-12">
                                {["Distributed", "Neural", "Atomic"].map((tag) => (
                                    <div key={tag} className="glass-card px-6 py-2 rounded-xl border-white/5 flex items-center gap-3">
                                        <CheckBadgeIcon className="w-5 h-5 text-accent-cyan" />
                                        <span className="text-white font-bold text-sm tracking-widest uppercase">{tag}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center w-full">
                                <button
                                    onClick={openModal}
                                    className="btn-pill btn-primary-glow text-white text-lg px-12"
                                >
                                    Start Consultation
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-primary-purple/20 rounded-[3rem] blur-3xl opacity-50" />
                            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 group aspect-video">
                                <img
                                    src={software_hero_splash}
                                    alt="Software Development"
                                    className="w-full h-full object-cover  transition-all duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-transparent to-transparent opacity-60" />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SOLUTIONS GRID */}
                <section className="py-32 bg-dark-black border-t border-white/5">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24">
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                                Modular <span className="text-gradient-cyan">Solutions</span>
                            </h2>
                            <p className="text-white/40 max-w-2xl mx-auto">Enterprise-grade infrastructure designed for maximum uptime and security.</p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {solutions.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="glass-card p-12 rounded-[3rem] border-white/5 group hover:border-accent-cyan/20 transition-all relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-8 text-white/[0.02] text-8xl font-black group-hover:text-accent-cyan/[0.05] transition-colors">
                                        0{i + 1}
                                    </div>
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 mb-8 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-accent-cyan/10 group-hover:text-accent-cyan transition-all">
                                            {React.cloneElement(item.icon as React.ReactElement, { className: "w-8 h-8" })}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-accent-cyan transition-colors">{item.name}</h3>
                                        <p className="text-white/40 text-sm leading-relaxed mb-6 group-hover:text-white/60 transition-colors">
                                            High-availability {item.name.toLowerCase()} architecture optimized for complex operational workflows.
                                        </p>
                                        <div className="flex items-center gap-2 text-accent-cyan font-bold text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-all transform -translate-x-4 group-hover:translate-x-0">
                                            DEPLOY SYSTEM <ArrowRightIcon className="w-3 h-3" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PRICING PACKAGES */}
                <section className="py-32 bg-dark-black">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24">
                            <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                                Strategic <span className="text-gradient-purple">Deployments</span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto items-stretch">
                            {packages.map((pkg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className={`relative p-12 rounded-[4rem] border flex flex-col transition-all duration-700 ${
                                        pkg.isPopular 
                                        ? "bg-primary-purple/10 border-primary-purple/30 shadow-[0_30px_100px_rgba(69,3,185,0.2)] scale-105 z-10" 
                                        : "bg-white/5 border-white/10 hover:border-white/30"
                                    }`}
                                >
                                    {pkg.isPopular && (
                                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-8 py-2 rounded-full bg-primary-purple text-white text-[10px] font-black uppercase tracking-widest shadow-2xl">
                                            Recommended Scale
                                        </div>
                                    )}

                                    <div className="mb-12">
                                        <h3 className="text-2xl font-bold text-white mb-4">{pkg.name}</h3>
                                        <div className="flex items-baseline gap-2 mb-6">
                                            <span className="text-xl font-bold text-accent-cyan">₹</span>
                                            <span className="text-6xl font-black text-white tracking-tight">{pkg.price}</span>
                                        </div>
                                    </div>

                                    <div className="flex-grow space-y-5 mb-14">
                                        {pkg.features.map((f, i) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <div className="w-6 h-6 rounded-full bg-accent-cyan/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <CheckBadgeIcon className="w-4 h-4 text-accent-cyan" />
                                                </div>
                                                <span className="text-white/60 text-sm font-medium">{f}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={openModal}
                                        className={`btn-pill w-full text-lg ${
                                            pkg.isPopular ? "btn-primary-glow text-white" : "btn-glass text-white"
                                        }`}
                                    >
                                        Initiate Build
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-24 text-center">
                            <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">
                                All deployments include standard <span className="text-accent-cyan">SLA compliance</span> & neural monitoring
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </ServiceLayout>
    );
};

export default SoftwareDevelopment;

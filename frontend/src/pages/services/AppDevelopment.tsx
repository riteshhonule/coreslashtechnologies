import React from "react";
import { motion } from "framer-motion";
import AppFeaturesSection from "../../components/AppFeaturesSection";
import ServiceLayout from "./ServicesLayout";
import { useModal } from "../../context/ModalContext";
import CoreslashTechnologies_app_development from "../../img/CoreslashTechnologies-app-development.png";
import { SparklesIcon, CheckIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

/* ================= PRICING PACKAGES ================= */

const packages = [
    {
        name: "Basic App Package",
        price: "15,000",
        desc: "Ideal for startups needing a foundational mobile presence.",
        features: [
            "Android App Development",
            "Up to 5 Custom Screens",
            "Standard UI/UX Design",
            "Firebase Core Integration",
            "Push Notification Setup",
            "App Icon & Branding",
            "Binary File Delivery",
            "1 Month Technical Support"
        ]
    },
    {
        name: "Standard App Package",
        price: "30,000",
        desc: "Professional solution for businesses with growing user bases.",
        highlight: true,
        features: [
            "Android App Development",
            "Up to 10 Advanced Screens",
            "Premium UI/UX Design",
            "Cloud Sync & Storage",
            "Authentication Systems",
            "Custom Admin Panel",
            "Analytics Integration",
            "Store Submission Support",
            "3 Months Dedicated Support"
        ]
    },
    {
        name: "Premium App Package",
        price: "60,000",
        desc: "Enterprise-grade cross-platform application ecosystem.",
        features: [
            "Android + iOS Development",
            "Bespoke High-End UI/UX",
            "Complex Backend Architecture",
            "Scalable Cloud Systems",
            "Payment Infrastructure",
            "Real-time Data Processing",
            "Full Store Optimization",
            "Multi-language Support",
            "6 Months Priority Support"
        ]
    }
];

const AppDevelopment: React.FC = () => {
    const { openModal } = useModal();

    return (
        <ServiceLayout
            title="App Development"
            subtitle="Engineering immersive mobile experiences for the next generation."
            ctaText="Build Your App"
        >
            <div className="bg-[#F9FAFB] text-gray-900">
                {/* Immersive Hero Content */}
                <section className="container mx-auto px-6 lg:px-12 py-12 md:py-24">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 1, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0, margin: "200px" }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center text-center lg:items-center lg:text-center"
                        >
                            <div className="flex items-center gap-2 mb-6 text-secondary-indigo font-bold tracking-[0.3em] uppercase text-xs">
                                <SparklesIcon className="w-4 h-4" />
                                Mobile Intelligence
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-10 leading-[1.1] tracking-tight">
                                Architecting <span className="text-gradient-cyan">Powerful</span> Mobile Ecosystems.
                            </h2>
                            <p className="text-gray-500 text-xl leading-relaxed mb-12 max-w-xl">
                                At CoreSlash Technologies, we don't just build apps; we engineer digital 
                                companions. From fluid UI transitions to robust backend scalability, 
                                we ensure your mobile presence is state-of-the-art.
                            </p>
                            <div className="flex justify-center w-full">
                                <button
                                    onClick={openModal}
                                    className="btn-pill btn-primary-glow text-white text-lg px-10"
                                >
                                    Get Free Consultation
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 1, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0, margin: "200px" }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-primary-purple/5 rounded-[3rem] blur-3xl opacity-50 pointer-events-none" />
                            <div className="relative rounded-[3rem] overflow-hidden border border-gray-200 shadow-xl aspect-video lg:aspect-square group">
                                <img
                                    src={CoreslashTechnologies_app_development}
                                    alt="App Development"
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent opacity-60" />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section Integration */}
                <div className="relative z-10 border-y border-gray-200/60 bg-white/5 shadow-sm overflow-hidden">
                     <AppFeaturesSection />
                </div>

                {/* PREMIUM PRICING SECTION */}
                <section className="pt-10 pb-12 md:pt-12 md:pb-16 bg-[#F9FAFB]">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24">
                            <motion.div
                                initial={{ opacity: 1, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0, margin: "200px" }}
                                className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-8"
                            >
                                <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.2em]">
                                    App Packages
                                </span>
                            </motion.div>
                            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
                                Strategic <span className="text-gradient-purple">Development</span> Plans
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
                                    className={`relative p-12 rounded-[4rem] border flex flex-col transition-all duration-700 ${
                                        pkg.highlight 
                                        ? "bg-white border-2 border-primary-purple/30 shadow-2xl scale-105 z-10" 
                                        : "bg-white border-gray-200/80 hover:border-secondary-indigo/30 shadow-md shadow-gray-200/10"
                                    }`}
                                >
                                    {pkg.highlight && (
                                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-8 py-2 rounded-full bg-primary-purple text-white text-[10px] font-black uppercase tracking-widest shadow-2xl">
                                            Recommended
                                        </div>
                                    )}

                                    <div className="mb-12">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{pkg.name}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-6">{pkg.desc}</p>
                                    </div>

                                    <div className="flex-grow space-y-5 mb-14">
                                        {pkg.features.map((f, i) => (
                                            <div key={i} className="flex items-start gap-4 group/item">
                                                <div className="w-6 h-6 rounded-full bg-secondary-indigo/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-secondary-indigo/20 transition-colors">
                                                    <CheckIcon className="w-3.5 h-3.5 text-secondary-indigo font-bold" />
                                                </div>
                                                <span className="text-gray-600 text-sm font-medium group-hover/item:text-gray-950 transition-colors">{f}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={openModal}
                                        className={`btn-pill w-full text-lg flex items-center justify-center gap-2 ${
                                            pkg.highlight ? "btn-primary-glow text-white" : "btn-glass text-secondary-indigo hover:text-white"
                                        }`}
                                    >
                                        <span className="relative z-10">Get Custom Quote</span>
                                        <ArrowRightIcon className="w-5 h-5 relative z-10" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </ServiceLayout>
    );
};

export default AppDevelopment;


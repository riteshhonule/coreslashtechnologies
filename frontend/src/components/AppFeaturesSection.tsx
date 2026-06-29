import React from "react";
import { motion } from "framer-motion";
import {
    DevicePhoneMobileIcon,
    RocketLaunchIcon,
    CpuChipIcon,
    GlobeAltIcon,
    ShieldCheckIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";

const features = [
    {
        title: "Native & Cross Platform",
        desc: "Apps built for Android & iOS with seamless performance.",
        icon: DevicePhoneMobileIcon,
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        title: "Lightning Fast Performance",
        desc: "Optimized architecture for speed and scalability.",
        icon: RocketLaunchIcon,
        gradient: "from-purple-500 to-pink-500",
    },
    {
        title: "Secure Backend",
        desc: "Enterprise-grade backend & API integrations.",
        icon: CpuChipIcon,
        gradient: "from-orange-500 to-red-500",
    },
    {
        title: "Global Ready Apps",
        desc: "Launch worldwide with multilingual support.",
        icon: GlobeAltIcon,
        gradient: "from-green-500 to-emerald-500",
    },
    {
        title: "Enterprise Security",
        desc: "Secure authentication and encrypted data.",
        icon: ShieldCheckIcon,
        gradient: "from-indigo-500 to-blue-500",
    },
    {
        title: "Premium UI/UX",
        desc: "Modern, beautiful, and conversion-focused design.",
        icon: SparklesIcon,
        gradient: "from-pink-500 to-rose-500",
    },
];

export default function AppFeaturesSection() {
    return (
        <section className="py-10 md:py-20 bg-transparent">

            {/* Heading */}

            <div className="text-center mb-16 px-4">

                <motion.h2
                    initial={{ opacity: 1, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0, margin: "200px" }}
                    className="text-3xl md:text-5xl font-bold text-white mb-4"
                >
                    Powerful App Features
                </motion.h2>

                <p className="text-white/40 max-w-2xl mx-auto">
                    We build modern mobile apps packed with powerful features to grow your business faster.
                </p>

            </div>


            {/* Features Grid */}

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-6">

                {features.map((feature, i) => (

                    <motion.div
                        key={i}
                        initial={{ opacity: 1, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0, margin: "200px" }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        whileHover={{ y: -10 }}
                        className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-white/5 hover:from-accent-cyan/50 hover:to-primary-purple/50 transition-all duration-500"
                    >

                        {/* Card */}

                        <div className="bg-[#05010F]/90 rounded-3xl p-6 h-full shadow-sm hover:shadow-xl transition">

                            {/* Icon */}

                            <div
                                className={`w-14 h-14 mb-5 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition`}
                            >

                                <feature.icon className="w-7 h-7 text-white" />

                            </div>


                            {/* Title */}

                            <h3 className="font-bold text-white mb-2">
                                {feature.title}
                            </h3>


                            {/* Description */}

                            <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
                                {feature.desc}
                            </p>

                        </div>

                    </motion.div>

                ))}

            </div>

        </section>
    );
}

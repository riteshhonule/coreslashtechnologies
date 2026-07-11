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
                    className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
                >
                    Powerful App Features
                </motion.h2>

                <p className="text-gray-500 max-w-2xl mx-auto">
                    We build modern mobile apps packed with powerful features to grow your business faster.
                </p>

            </div>


            {/* Features Grid */}

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                {features.map((feature, i) => (

                    <motion.div
                        key={i}
                        initial={{ opacity: 1, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0, margin: "200px" }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        whileHover={{ y: -10 }}
                        className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-gray-200/60 to-gray-200/30 hover:from-secondary-indigo/30 hover:to-primary-purple/30 transition-all duration-500"
                    >

                        {/* Card */}

                        <div className="bg-white rounded-3xl p-6 h-full border border-gray-300 shadow-md shadow-gray-200/10 hover:shadow-xl transition flex flex-col items-center text-center">

                            {/* Icon */}

                            <div
                                className={`w-14 h-14 mb-5 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition mx-auto`}
                            >

                                <feature.icon className="w-7 h-7 text-white" />

                            </div>


                            {/* Title */}

                            <h3 className="font-bold text-gray-900 mb-2">
                                {feature.title}
                            </h3>


                            {/* Description */}

                            <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                                {feature.desc}
                            </p>

                        </div>

                    </motion.div>

                ))}

            </div>

        </section>
    );
}



import { motion } from "framer-motion";
import { CheckCircle2, Target, Zap, TrendingUp } from "lucide-react";
import CoreslashTechnologies_solutions from "../img/CoreslashTechnologies_solutions.png";

const features = [
    {
        title: "Tailored Solutions",
        icon: <Target className="w-5 h-5" />,
        color: "bg-blue-600"
    },
    {
        title: "Proven Expertise",
        icon: <CheckCircle2 className="w-5 h-5" />,
        color: "bg-purple-600"
    },
    {
        title: "Data-Driven Results",
        icon: <TrendingUp className="w-5 h-5" />,
        color: "bg-cyan-600"
    },
    {
        title: "Innovative Strategies",
        icon: <Zap className="w-5 h-5" />,
        color: "bg-rose-600"
    },
];

export default function WhyChooseUs() {
    return (
        <section className="relative py-12 md:py-24 bg-white overflow-hidden">

            {/* --- Animated Background Orbs --- */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/50 blur-[80px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100/50 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 md:gap-16 items-center">

                {/* --- Image Showcase (Now Top on Mobile) --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    // order-1 ensures it is first on mobile, lg:order-1 keeps it left on desktop
                    className="relative order-1 lg:order-1 mb-8 lg:mb-0"
                >
                    {/* Decorative frame element */}
                    <div className="absolute -inset-3 border-2 border-dashed border-gray-200 rounded-[2rem] -z-10" />

                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10"
                    >
                        <img
                            src={CoreslashTechnologies_solutions}
                            alt="Coreslash Technologies Office"
                            className="rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border-4 md:border-8 border-white object-cover w-full"
                        />

                        {/* Growth Stat Card - NOW VISIBLE ON MOBILE */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            // Positioned carefully to stay on screen for both mobile and desktop
                            className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 bg-white p-3 md:p-5 rounded-xl md:rounded-2xl shadow-xl border border-gray-100 z-20"
                        >
                            <div className="flex items-center gap-2 md:gap-4">
                                <div className="w-8 h-8 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <TrendingUp className="w-4 h-4 md:w-6 md:h-6" />
                                </div>
                                <div>
                                    <p className="text-[8px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">Growth</p>
                                    <p className="text-sm md:text-xl font-black text-gray-900 leading-none">150% +</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* --- Text & Feature Grid (Below Image on Mobile) --- */}
                <div className="flex flex-col order-2 lg:order-2">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block px-4 py-1 bg-slate-900 text-white rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 md:mb-6">
                            Why Choose Us
                        </span>

                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6 md:mb-8">
                            Creating Experiences,<br />
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Generating Success
                            </span>
                        </h2>
                    </motion.div>

                    {/* Feature Grid: 2 Columns Always */}
                    <div className="grid grid-cols-2 gap-3 md:gap-6">
                        {features.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-4 md:p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                            >
                                <div className={`w-8 h-8 md:w-11 md:h-11 ${item.color} text-white rounded-lg flex items-center justify-center mb-3 md:mb-4 shadow-md`}>
                                    {/* Clone icon to adjust size for mobile */}
                                    {item.icon}
                                </div>
                                <h4 className="text-xs md:text-lg font-bold text-gray-900 leading-tight">
                                    {item.title}
                                </h4>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 p-4 bg-slate-50 rounded-xl border-l-4 border-blue-600"
                    >
                        <p className="text-gray-600 text-xs md:text-base italic">
                            "Building the digital infrastructure your business needs to dominate the market."
                        </p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}

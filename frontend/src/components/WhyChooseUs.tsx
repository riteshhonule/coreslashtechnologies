import { motion } from "framer-motion";
import { CheckCircle2, Target, Zap, TrendingUp } from "lucide-react";
import CoreslashTechnologies_solutions from "../img/CoreslashTechnologies_solutions.png";

const features = [
    {
        title: "Tailored Solutions",
        icon: <Target className="w-5 h-5" />,
        color: "from-blue-50 to-blue-100/30",
        iconColor: "text-blue-600"
    },
    {
        title: "Proven Expertise",
        icon: <CheckCircle2 className="w-5 h-5" />,
        color: "from-purple-50 to-purple-100/30",
        iconColor: "text-purple-600"
    },
    {
        title: "Data-Driven Results",
        icon: <TrendingUp className="w-5 h-5" />,
        color: "from-cyan-50 to-cyan-100/30",
        iconColor: "text-cyan-600"
    },
    {
        title: "Innovative Strategies",
        icon: <Zap className="w-5 h-5" />,
        color: "from-rose-50 to-rose-100/30",
        iconColor: "text-rose-600"
    },
];

export default function WhyChooseUs() {
    return (
        <section className="relative pt-10 pb-16 md:pt-12 md:pb-24 overflow-hidden bg-white">
            {/* Background Orbs */}
            <div className="hidden md:block absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-secondary-indigo/3 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                    
                    {/* Visuals */}
                    <motion.div
                        initial={{ opacity: 1, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0, margin: "200px" }}
                        className="relative group flex flex-col gap-8"
                    >
                        <div className="relative">
                            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-gray-200/60 shadow-md transition-all duration-500 group-hover:shadow-lg">
                                <img
                                    src={CoreslashTechnologies_solutions}
                                    alt="Solutions"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent" />
                            </div>


                        </div>

                        {/* Quote Block (Moved to left side for balance) */}
                        <motion.div
                            initial={{ opacity: 1 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0, margin: "200px" }}
                            transition={{ delay: 0.1 }}
                            className="p-6 rounded-[2rem] bg-secondary-indigo/5 border-l-4 border-secondary-indigo italic relative overflow-hidden transition-all duration-500 group-hover:bg-secondary-indigo/10"
                        >
                            <p className="text-gray-650 text-base md:text-lg leading-relaxed relative z-10 font-medium">
                                "We build the digital infrastructure your business needs to dominate the market."
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 1, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0, margin: "200px" }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-6">
                                <span className="text-xs font-bold text-secondary-indigo uppercase tracking-widest">Efficiency Redefined</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
                                Engineering Experiences,<br />
                                <span className="text-gradient-cyan">Fueling Global Success</span>
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {features.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 1, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0, margin: "200px" }}
                                    transition={{ delay: idx * 0.02, duration: 0.3 }}
                                    className="glass-card p-6 border border-gray-300 group hover:border-secondary-indigo/25 transition-all flex flex-col items-center text-center"
                                >
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 border border-gray-200/40 mx-auto ${item.iconColor}`}>
                                        {item.icon}
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-secondary-indigo transition-colors">
                                        {item.title}
                                    </h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Optimized methodologies for maximum performance and impact.
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}


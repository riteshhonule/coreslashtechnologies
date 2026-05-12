import { motion } from "framer-motion";
import { CheckCircle2, Target, Zap, TrendingUp } from "lucide-react";
import CoreslashTechnologies_solutions from "../img/CoreslashTechnologies_solutions.png";

const features = [
    {
        title: "Tailored Solutions",
        icon: <Target className="w-5 h-5" />,
        color: "from-blue-600/20 to-blue-600/5",
        iconColor: "text-blue-400"
    },
    {
        title: "Proven Expertise",
        icon: <CheckCircle2 className="w-5 h-5" />,
        color: "from-purple-600/20 to-purple-600/5",
        iconColor: "text-purple-400"
    },
    {
        title: "Data-Driven Results",
        icon: <TrendingUp className="w-5 h-5" />,
        color: "from-cyan-600/20 to-cyan-600/5",
        iconColor: "text-cyan-400"
    },
    {
        title: "Innovative Strategies",
        icon: <Zap className="w-5 h-5" />,
        color: "from-rose-600/20 to-rose-600/5",
        iconColor: "text-rose-400"
    },
];

export default function WhyChooseUs() {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary-accent/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Visuals */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-glow">
                            <img
                                src={CoreslashTechnologies_solutions}
                                alt="Solutions"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 to-transparent" />
                        </div>

                        {/* Floating Metric */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -bottom-6 -left-6 glass p-6 border border-accent-cyan/20 hidden md:block"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-accent-cyan/10 flex items-center justify-center text-accent-cyan">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white">150%+</p>
                                    <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Growth ROI</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                                <span className="text-xs font-bold text-accent-cyan uppercase tracking-widest">Efficiency Redefined</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8">
                                Engineering Experiences,<br />
                                <span className="text-gradient-cyan">Fueling Global Success</span>
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {features.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="glass-card p-6 border-white/5 group hover:border-white/10 transition-all"
                                >
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 border border-white/5 ${item.iconColor}`}>
                                        {item.icon}
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">
                                        {item.title}
                                    </h4>
                                    <p className="text-white/40 text-sm leading-relaxed">
                                        Optimized methodologies for maximum performance and impact.
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mt-10 p-6 rounded-2xl bg-white/5 border-l-4 border-accent-cyan italic"
                        >
                            <p className="text-white/60 text-lg">
                                "We build the digital infrastructure your business needs to dominate the market."
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}


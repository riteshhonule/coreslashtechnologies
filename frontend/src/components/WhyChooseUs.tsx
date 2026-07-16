import { motion } from "framer-motion";
import { CheckCircle2, Target, Zap, TrendingUp } from "lucide-react";
import CoreslashTechnologies_solutions from "../img/CoreslashTechnologies_solutions.webp";
import CoreslashTechnologies_solutionsAvif from "../img/CoreslashTechnologies_solutions.avif";

const features = [
    {
        title: "Tailored Solutions",
        icon: <Target className="w-5 h-5" />,
        theme: {
            cardBg: "bg-blue-50/40 hover:bg-blue-50/80",
            cardBorder: "border-blue-200/50 hover:border-blue-300",
            iconContainer: "bg-blue-100/50 text-blue-600 border-blue-200/50 group-hover:bg-blue-100 group-hover:text-blue-700",
            textAccent: "group-hover:text-blue-600",
            spotlightColor: "rgba(37, 99, 235, 0.12)"
        }
    },
    {
        title: "Proven Expertise",
        icon: <CheckCircle2 className="w-5 h-5" />,
        theme: {
            cardBg: "bg-purple-50/40 hover:bg-purple-50/80",
            cardBorder: "border-purple-200/50 hover:border-purple-300",
            iconContainer: "bg-purple-100/50 text-purple-600 border-purple-200/50 group-hover:bg-purple-100 group-hover:text-purple-700",
            textAccent: "group-hover:text-purple-600",
            spotlightColor: "rgba(147, 51, 234, 0.12)"
        }
    },
    {
        title: "Data-Driven Results",
        icon: <TrendingUp className="w-5 h-5" />,
        theme: {
            cardBg: "bg-cyan-50/40 hover:bg-cyan-50/80",
            cardBorder: "border-cyan-200/50 hover:border-cyan-300",
            iconContainer: "bg-cyan-100/50 text-cyan-600 border-cyan-200/50 group-hover:bg-cyan-100 group-hover:text-cyan-700",
            textAccent: "group-hover:text-cyan-650",
            spotlightColor: "rgba(8, 145, 178, 0.12)"
        }
    },
    {
        title: "Innovative Strategies",
        icon: <Zap className="w-5 h-5" />,
        theme: {
            cardBg: "bg-rose-50/40 hover:bg-rose-50/80",
            cardBorder: "border-rose-200/50 hover:border-rose-300",
            iconContainer: "bg-rose-100/50 text-rose-600 border-rose-200/50 group-hover:bg-rose-100 group-hover:text-rose-700",
            textAccent: "group-hover:text-rose-600",
            spotlightColor: "rgba(225, 29, 72, 0.12)"
        }
    },
];

export default function WhyChooseUs() {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const cards = document.getElementsByClassName("choose-card-interactive");
        for (const card of cards) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
            (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
        }
    };

    return (
        <section className="relative pt-10 pb-16 md:pt-12 md:pb-24 overflow-hidden bg-[#fafbfc]/80" onMouseMove={handleMouseMove}>
            
            {/* Subtle grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

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
                                <picture className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 flex items-center justify-center">
                                    <source srcSet={CoreslashTechnologies_solutionsAvif} type="image/avif" />
                                    <img
                                        src={CoreslashTechnologies_solutions}
                                        alt="Solutions"
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover"
                                    />
                                </picture>
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
                                    className={`glass-card p-6 border shadow-sm transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden group choose-card-interactive ${item.theme.cardBg} ${item.theme.cardBorder}`}
                                >
                                    {/* Spotlight Effect */}
                                    <div 
                                        className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), ${item.theme.spotlightColor}, transparent 40%)`
                                        }}
                                    />

                                    <div className="relative z-10">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border transition-all duration-500 group-hover:scale-110 mx-auto ${item.theme.iconContainer}`}>
                                            {item.icon}
                                        </div>
                                        <h4 className={`text-lg font-bold text-gray-900 mb-2 transition-colors ${item.theme.textAccent}`}>
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-500 text-sm leading-relaxed font-medium">
                                            Optimized methodologies for maximum performance and impact.
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}


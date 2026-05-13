import React from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../../context/ModalContext';

interface ServiceLayoutProps {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink?: string;
    headerGradient?: string;
    children: React.ReactNode;
}

const ServiceLayout: React.FC<ServiceLayoutProps> = ({
    title,
    subtitle,
    ctaText,
    children
}) => {
    const { openModal } = useModal();
    return (
        <div className="min-h-screen bg-dark-black pt-[100px] overflow-hidden">
            {/* Premium Header Section */}
            <section className="relative py-24 md:py-32 w-full text-white overflow-hidden">

                {/* Massive Animated Glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-purple/10 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute -top-24 left-0 w-[400px] h-[400px] bg-accent-cyan/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                        <span className="text-xs font-bold text-accent-cyan uppercase tracking-[0.3em]">
                            Expert Solutions
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="text-5xl md:text-8xl font-bold mb-10 leading-[1.1] tracking-tight"
                    >
                        {title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="text-xl md:text-2xl text-white/40 max-w-3xl mx-auto mb-12 leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex justify-center w-full"
                    >
                        <button
                            onClick={openModal}
                            className="btn-pill btn-primary-glow text-white text-lg px-12"
                        >
                            {ctaText}
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Area */}
            <main className="relative z-10">
                {children}
            </main>

            {/* Global Bottom CTA Section */}
            <section className="py-32 bg-dark-black text-white text-center relative overflow-hidden">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-secondary-indigo/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="glass-card p-16 md:p-24 rounded-[4rem] border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <h2 className="text-4xl md:text-7xl font-bold mb-10 tracking-tight relative z-10">
                            Ready to scale <br />
                            <span className="text-gradient-cyan">Your Business?</span>
                        </h2>

                        <p className="text-xl text-white/40 mb-14 max-w-2xl mx-auto relative z-10 leading-relaxed">
                            Let's architect a custom technology roadmap to achieve your strategic objectives.
                        </p>

                        <div className="flex justify-center">
                            <button
                                onClick={openModal}
                                className="btn-pill btn-primary-glow text-white text-xl px-16 relative z-10"
                            >
                                Contact us today
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ServiceLayout;


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
        <div className="relative min-h-screen bg-[#F9FAFB] pt-0 overflow-x-clip text-gray-900">
            {/* Premium Header Section */}
            <section className="relative py-12 md:py-32 w-full text-gray-900 overflow-hidden">

                {/* Massive Animated Glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-purple/3 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute -top-24 left-0 w-[400px] h-[400px] bg-secondary-indigo/2 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 1, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-secondary-indigo animate-pulse" />
                        <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.3em]">
                            Expert Solutions
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 1, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.06 }}
                        className="text-5xl md:text-8xl font-bold mb-10 leading-[1.1] tracking-tight text-gray-900"
                    >
                        {title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 1, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.12, ease: "easeOut" }}
                        className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 1, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.18 }}
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
            <section className="pt-4 pb-16 md:pt-8 md:pb-32 bg-[#F9FAFB] text-gray-900 text-center relative overflow-hidden">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-secondary-indigo/2 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 1, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0, margin: "200px" }}
                        transition={{ duration: 0.4 }}
                        className="bg-white border border-gray-200/60 shadow-xl shadow-gray-200/30 p-8 md:p-24 rounded-[4rem] relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <h2 className="text-4xl md:text-7xl font-bold mb-10 tracking-tight relative z-10 text-gray-900">
                            Ready to scale <br />
                            <span className="text-gradient-cyan">Your Business?</span>
                        </h2>

                        <p className="text-xl text-gray-500 mb-14 max-w-2xl mx-auto relative z-10 leading-relaxed">
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


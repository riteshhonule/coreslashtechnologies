import React from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../../context/ModalContext';
import ReviewSection from '../../components/ReviewSection';

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
    headerGradient = "from-blue-900 via-indigo-900 to-purple-900 mt-3",
    children
}) => {
    const { openModal } = useModal();
    return (
        <div className="min-h-screen bg-gray-50 pt-[80px]">
            {/* Unique Header Section */}
            <section className={`relative py-10 md:py-16 w-full bg-gradient-to-r ${headerGradient} text-white overflow-hidden`}>
                {/* Abstract Background Shapes */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[150%] rounded-[40%] bg-gradient-to-b from-white/5 to-transparent rotate-12 blur-3xl" />
                    <div className="absolute top-[20%] -right-[20%] w-[60%] h-[100%] rounded-[50%] bg-gradient-to-b from-white/5 to-transparent -rotate-12 blur-3xl" />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-sm"
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        className="text-sm md:text-lg text-blue-50 max-w-3xl mx-auto mb-6 font-medium opacity-90"
                    >
                        {subtitle}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <button
                            onClick={openModal}
                            className="inline-block px-10 py-4 bg-white text-gray-900 font-bold text-lg rounded-full shadow-lg hover:shadow-2xl hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 ring-4 ring-white/20"
                        >
                            {ctaText}
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Area */}
            <main className="bg-white">
                {children}
            </main>

            <ReviewSection />

            {/* Global Bottom CTA Section */}
            <section className="py-24 bg-gray-900 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready to grow your business?</h2>
                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                            Let's discuss how we can help you achieve your digital goals.
                        </p>
                        <button
                            onClick={openModal}
                            className="inline-block px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-blue-500/30 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            Contact us today
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ServiceLayout;

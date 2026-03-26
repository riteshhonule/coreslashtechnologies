import React from "react";
import { motion } from "framer-motion";
import { useModal } from "../../context/ModalContext";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

const BlogCTA: React.FC = () => {
    const { openModal } = useModal();

    return (
        <section className="py-24 px-6 md:px-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-purple-700 via-orange-500 to-pink-600 shadow-2xl"
            >
                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mixed-blend-overlay" />
                    <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-black/10 rounded-full blur-3xl animate-pulse delay-700" />
                </div>

                <div className="relative z-10 px-8 py-20 text-center text-white">
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                            <SparklesIcon className="w-5 h-5 text-yellow-300" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em]">Ready to scale?</span>
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight max-w-4xl mx-auto drop-shadow-md">
                        Let's Build Your Business with Coreslash Technologies
                    </h2>

                    <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
                        Empower your brand with modern digital strategies, high-performance websites, and data-driven marketing.
                    </p>

                    <button
                        onClick={openModal}
                        className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-gray-900 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-black/20"
                    >
                        Get Free Consultation
                        <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default BlogCTA;

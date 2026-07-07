import React from "react";
import { motion } from "framer-motion";
import { useModal } from "../../context/ModalContext";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

const BlogCTA: React.FC = () => {
    const { openModal } = useModal();

    return (
        <section className="relative py-16 md:py-24 px-6 bg-[#F9FAFB] overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-purple/3 rounded-full blur-[160px] pointer-events-none" />
            
            <motion.div
                initial={{ opacity: 1, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0, margin: "200px" }}
                className="max-w-7xl mx-auto relative rounded-[4rem] overflow-hidden bg-white border border-gray-200/60 shadow-xl shadow-gray-200/30 p-16 md:p-24 text-center"
            >
                {/* Background Decor */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/3 via-transparent to-secondary-indigo/3 pointer-events-none" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary-indigo/3 rounded-full blur-[100px] animate-pulse" />

                <div className="relative z-10 text-gray-900">
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15">
                            <SparklesIcon className="w-4 h-4 text-secondary-indigo" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary-indigo">Architecture of Growth</span>
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-7xl font-bold mb-10 leading-tight tracking-tight max-w-5xl mx-auto">
                        Ready to Architect your <span className="text-gradient-purple">Digital Dominance?</span>
                    </h2>

                    <p className="text-gray-500 text-xl md:text-2xl mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
                        Deploy elite digital strategies and high-velocity engineering with the CoreSlash ecosystem.
                    </p>

                    <button
                        onClick={openModal}
                        className="btn-pill btn-primary-glow text-white text-xl px-16 py-6 group mx-auto"
                    >
                        Initiate Consultation
                        <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default BlogCTA;


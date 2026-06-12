import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ContactForm from "./ContactForm";

interface ConsultationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 1, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-xl bg-[#050816] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden"
                    >
                        <div className="p-6 md:p-10 relative">
                            <button
                                onClick={onClose}
                                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all z-30"
                            >
                                <XMarkIcon className="w-5 h-5 md:w-6 md:h-6" />
                            </button>

                            <div className="mb-6 relative z-10 pr-8">
                                <h2 className="text-xl md:text-3xl font-black text-white mb-1 leading-tight tracking-tight">
                                    Start Your <span className="text-gradient-cyan">Project</span>
                                </h2>
                                <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                                    Strategic Technical Architecture
                                </p>
                            </div>

                            <div className="relative z-10">
                                <ContactForm variant="glass" onSuccess={() => {
                                    setTimeout(onClose, 2500);
                                }} />
                            </div>

                            {/* Background elements */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600/10 rounded-full blur-[60px] pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-600/10 rounded-full blur-[60px] pointer-events-none" />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConsultationModal;

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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-[#050816] rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors z-30"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>

                        <div className="mb-8 relative z-10">
                            <h2 className="text-3xl font-black text-white mb-2 leading-tight">
                                Start Your <span className="text-blue-500">Project</span>
                            </h2>
                            <p className="text-blue-400 text-sm font-medium">
                                Book a free session & get a customized strategy
                            </p>
                        </div>

                        <div className="relative z-10">
                            <ContactForm variant="glass" onSuccess={() => {
                                setTimeout(onClose, 2500);
                            }} />
                        </div>

                        {/* Background elements */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConsultationModal;

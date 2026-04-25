import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { XMarkIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

type FormValues = {
    name: string;
    phone: string;
    city: string;
    service: string;
};

interface ConsultationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

    const onSubmit = async (data: FormValues) => {
        try {
            setStatus('loading');
            const res = await fetch(`${API_BASE}/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Network error');
            setStatus('success');
            reset();
            setTimeout(() => {
                onClose();
                setStatus('idle');
            }, 3000);
        } catch (e) {
            console.error(e);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

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
                            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>

                        {status !== 'success' && (
                            <div className="mb-8">
                                <h2 className="text-3xl font-black text-white mb-2 leading-tight">
                                    Start Your <span className="text-blue-500">Project</span>
                                </h2>
                                <p className="text-blue-400 text-sm font-medium">
                                    Book a free session & get a customized strategy
                                </p>
                            </div>
                        )}

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-10"
                            >
                                <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Inquiry Sent!</h3>
                                <p className="text-slate-400">Our experts will reach out to you within 24 hours.</p>
                            </motion.div>
                        ) : (
                            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Full Name</label>
                                    <input
                                        {...register('name', { required: true, minLength: 2 })}
                                        type="text"
                                        placeholder="Enter your name"
                                        className={`w-full bg-[#0a0f26] rounded-xl px-5 py-4 text-white outline-none transition-all placeholder:text-slate-600 border ${errors.name ? 'border-rose-500/50 ring-2 ring-rose-500/20' : 'border-white/5 focus:border-blue-500/50'}`}
                                    />
                                    {errors.name && <p className="text-rose-400 text-xs mt-1.5 px-1">Full name is required</p>}
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Contact Number</label>
                                        <input
                                            {...register('phone', { required: true, minLength: 6 })}
                                            type="tel"
                                            placeholder="+91..."
                                            className={`w-full bg-[#0a0f26] rounded-xl px-5 py-4 text-white outline-none transition-all placeholder:text-slate-600 border ${errors.phone ? 'border-rose-500/50 ring-2 ring-rose-500/20' : 'border-white/5 focus:border-blue-500/50'}`}
                                        />
                                        {errors.phone && <p className="text-rose-400 text-xs mt-1.5 px-1">Valid contact required</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">City</label>
                                        <input
                                            {...register('city', { required: true, minLength: 2 })}
                                            type="text"
                                            placeholder="Your City"
                                            className={`w-full bg-[#0a0f26] rounded-xl px-5 py-4 text-white outline-none transition-all placeholder:text-slate-600 border ${errors.city ? 'border-rose-500/50 ring-2 ring-rose-500/20' : 'border-white/5 focus:border-blue-500/50'}`}
                                        />
                                        {errors.city && <p className="text-rose-400 text-xs mt-1.5 px-1">City is required</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Service Needed</label>
                                    <select
                                        {...register('service', { required: true })}
                                        className={`w-full bg-[#0a0f26] rounded-xl px-5 py-4 text-white outline-none transition-all border ${errors.service ? 'border-rose-500/50 ring-2 ring-rose-500/20' : 'border-white/5 focus:border-blue-500/50'}`}
                                    >
                                        <option value="" className="bg-[#0a0f26]">Select Service</option>
                                        <option value="Website Development" className="bg-[#0a0f26]">Website Development</option>
                                        <option value="App Development" className="bg-[#0a0f26]">App Development</option>
                                        <option value="Software Development" className="bg-[#0a0f26]">Software Development</option>
                                        <option value="Digital Marketing" className="bg-[#0a0f26]">Digital Marketing</option>
                                        <option value="SEO Services" className="bg-[#0a0f26]">SEO Services</option>
                                        <option value="E-commerce Solutions" className="bg-[#0a0f26]">E-commerce Solutions</option>
                                    </select>
                                    {errors.service && <p className="text-rose-400 text-xs mt-1.5 px-1">Please select a service</p>}
                                </div>

                                {status === 'error' && (
                                    <p className="text-rose-400 text-sm text-center bg-rose-500/10 py-3 rounded-lg border border-rose-500/20">
                                        Something went wrong. Please try again.
                                    </p>
                                )}

                                <button
                                    disabled={status === 'loading'}
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black py-5 rounded-2xl hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-3 text-lg mt-4 disabled:opacity-60 disabled:cursor-not-allowed group"
                                >
                                    {status === 'loading' ? 'Processing...' : 'Submit Request'}
                                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        )}

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

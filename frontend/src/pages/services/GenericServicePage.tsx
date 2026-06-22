import React, { useState } from "react";
import { envConfig } from "../../config/env.config";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import ArrowRightIcon from "@heroicons/react/24/outline/ArrowRightIcon";
import SparklesIcon from "@heroicons/react/24/outline/SparklesIcon";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

import ServiceLayout from "./ServicesLayout";
import SEO from "../../components/SEO";
import { submitLead } from "../../lib/api";

type FormValues = {
    name: string;
    phone: string;
    city: string;
    service: string;
};

interface Feature {
    title: string;
    desc: string;
    icon?: string;
}

interface GenericServicePageProps {
    title: string;
    subtitle: string;
    description: string;
    features: Feature[];
    slug: string;
}

const GenericServicePage: React.FC<GenericServicePageProps> = ({ title, subtitle, description, features, slug }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [modalOpen, setModalOpen] = useState(false);

    const onSubmit = async (data: FormValues) => {
        try {
            setStatus('loading');
            await submitLead(data);
            setStatus('success');
            reset();
        } catch (e) {
            console.error(e);
            setStatus('error');
        } finally {
            setModalOpen(true);
            setTimeout(() => setStatus('idle'), 2000);
        }
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": title,
        "description": description,
        "provider": {
            "@type": "Organization",
            "name": "CoreSlash Technologies",
            "url": "https://coreslashtechnologies.com"
        }
    };

    return (
        <ServiceLayout
            title={title}
            subtitle={subtitle}
            ctaText="Start Your Project"
        >
            <SEO 
                title={title}
                description={description}
                structuredData={structuredData}
            />
            <div className="bg-dark-black">
                <section className="container mx-auto px-6 lg:px-12 py-10 md:py-20">
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 items-start">
                        <div className="lg:col-span-2 space-y-20">
                            <motion.div
                                initial={{ opacity: 1, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0, margin: "200px" }}
                                className="max-w-4xl"
                            >
                                <div className="flex items-center gap-2 mb-6 text-accent-cyan font-bold tracking-[0.3em] uppercase text-xs">
                                    <SparklesIcon className="w-4 h-4" />
                                    Engineering Excellence
                                </div>
                                <h1 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-[1.1] tracking-tight">
                                    {title}
                                </h1>
                                <p className="text-white/50 text-xl leading-relaxed mb-12">
                                    {description}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {features.map((f, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 1, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0, margin: "200px" }}
                                            transition={{ duration: 0.3, delay: i * 0.05 }}
                                            className="glass-card p-8 rounded-[2rem] border-white/5 hover:border-accent-cyan/20 group"
                                        >
                                            <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                                            <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        <aside className="lg:sticky lg:top-32 space-y-8">
                            <div className="glass-card p-10 rounded-[3rem] border-white/5 relative overflow-hidden">
                                <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                                    Book Your <br />
                                    <span className="text-accent-cyan italic">Free</span> Consultation
                                </h3>
                                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                                    <input
                                        {...register('name', { required: true })}
                                        type="text"
                                        placeholder="Full Name"
                                        className="glass-input"
                                    />
                                    <input
                                        {...register('phone', { required: true })}
                                        type="tel"
                                        placeholder="Phone Number"
                                        className="glass-input"
                                    />
                                    <input
                                        {...register('city', { required: true })}
                                        type="text"
                                        placeholder="City"
                                        className="glass-input"
                                    />
                                    <input
                                        {...register('service')}
                                        type="hidden"
                                        value={title}
                                    />

                                    <button
                                        disabled={status === 'loading'}
                                        className="btn-pill btn-primary-glow w-full text-white font-bold py-5 mt-4"
                                    >
                                        {status === 'loading' ? 'Processing...' : 'Send Request'}
                                        <ArrowRightIcon className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </aside>
                    </div>
                </section>
            </div>
            {/* Modal code */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-dark-black/90 backdrop-blur-xl">
                        <motion.div initial={{ y: 40, opacity: 1 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="glass-card max-w-md w-full p-12 rounded-[3rem] border-white/10 text-center">
                            {status === 'success' ? (
                                <>
                                    <div className="mx-auto w-20 h-20 rounded-3xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mb-8">
                                        <CheckIcon className="w-10 h-10 text-accent-cyan" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Confirmed</h3>
                                </>
                            ) : (
                                <>
                                    <div className="mx-auto w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-8">
                                        <XMarkIcon className="w-10 h-10 text-rose-500" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Error</h3>
                                </>
                            )}
                            <button onClick={() => setModalOpen(false)} className="btn-pill btn-glass w-full text-white">Return</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </ServiceLayout>
    );
};

export default GenericServicePage;

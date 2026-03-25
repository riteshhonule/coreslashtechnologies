
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import PhoneIcon from "@heroicons/react/24/outline/PhoneIcon";
import EnvelopeIcon from "@heroicons/react/24/outline/EnvelopeIcon";
import ArrowRightIcon from "@heroicons/react/24/outline/ArrowRightIcon";
import SparklesIcon from "@heroicons/react/24/outline/SparklesIcon";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";

// Image Imports
import cmsImg from "../../img/website/cms.webp";
import customDesignImg from "../../img/website/custom-design.webp";
import responsiveImg from "../../img/website/responsive.webp";
import seoImg from "../../img/website/seo.webp";
import securityImg from "../../img/website/security.webp";
import speedImg from "../../img/website/fast_load.webp";

import ServiceLayout from "./ServicesLayout";

const features = [
    { title: "Bespoke Design", desc: "Tailored layouts that represent your brand’s identity.", icon: customDesignImg },
    { title: "Fluid UI", desc: "Seamless performance across all devices, from desktops to smartphones.", icon: responsiveImg },
    { title: "High Velocity", desc: "Optimized code and caching techniques for lightning-fast speed.", icon: speedImg },
    { title: "SEO Ready", desc: "Built-in SEO features to improve your search engine rankings.", icon: seoImg },
    { title: "Intuitive CMS", desc: "Easy-to-use content management systems for effortless updates.", icon: cmsImg },
    { title: "Top Security", desc: "Advanced security measures and scalability to grow with your business.", icon: securityImg },
];

const pricingPlans = [
    {
        name: "Basic Package",
        price: "10,000",
        desc: "Perfect for businesses starting out, offering foundational website development, SEO, and social media presence.",
        features: [
            "Website Development (Landing Page up to 5 pages)",
            "Basic SEO Setup and Optimization",
            "Social Media Profile Creation",
            "3 SEO Optimized Blog Post Creation",
            "1 Year High Speed Hosting & Domain",
            "Custom Email Creation",
            "Enhanced Security",
            "Responsive view on mobile, tablet, desktop",
            "SSL certificate (Https verified)",
            "WhatsApp / Live Chat on Website",
            "6 Months Technical Support"
        ]
    },
    {
        name: "Standard Package",
        price: "15,000",
        desc: "Designed for growing businesses, this package provides professional development and comprehensive SEO.",
        features: [
            "Website Development (Responsive up to 10 pages)",
            "Comprehensive SEO Setup and Optimization",
            "Social Media Profile Creation",
            "4 SEO Optimized Blog Post Creation",
            "1 Year High Speed Hosting & Domain",
            "Custom Email Creation",
            "Enhanced Security",
            "Desktop, laptop, tablet & mobile friendly",
            "SSL certificate (Https verified)",
            "WhatsApp / Live Chat on Website",
            "1 Year Technical Support"
        ],
        isPopular: true
    },
    {
        name: "Premium Package",
        price: "20,000",
        desc: "Ideal for scaling businesses, this package includes advanced solutions and full-scale marketing campaigns.",
        features: [
            "Website Development (Responsive up to 15 pages)",
            "Comprehensive SEO Setup and Optimization",
            "Social Media Profile Creation",
            "4 SEO Optimized Blog Post Creation",
            "1 Year High Speed Hosting & Domain",
            "Custom Email Creation",
            "Enhanced Security",
            "Desktop, laptop, tablet & mobile friendly",
            "SSL certificate (Https verified)",
            "WhatsApp / Live Chat on Website",
            "1 Year Technical Support"
        ]
    }
];

type FormValues = {
    name: string;
    phone: string;
    city: string;
    service: string;
};

const WebsiteDevelopment: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [modalOpen, setModalOpen] = useState(false);

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
        } catch (e) {
            console.error(e);
            setStatus('error');
        } finally {
            setModalOpen(true);
            setTimeout(() => setStatus('idle'), 2000);
        }
    };

    return (
        <ServiceLayout
            title="Website Development"
            subtitle="Transforming Ideas Into Results"
            ctaText="Consult Our Experts"
            headerGradient="from-[#020617] via-[#0f172a] to-[#020617] mt-5"
        >
            <div className="bg-[#fcfcfd]">
                <section className="container mx-auto px-6 lg:px-12 py-16">
                    <div className="grid lg:grid-cols-3 gap-10 items-start">

                        {/* ================= MAIN CONTENT ================= */}
                        <div className="lg:col-span-2 space-y-12">

                            {/* VIDEO PLAYER */}
                            <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                                <iframe
                                    className="w-full aspect-video"
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                    title="Agency Overview"
                                    allowFullScreen
                                />
                            </div>

                            {/* CONTENT AREA */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="max-w-3xl"
                            >
                                <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold tracking-widest uppercase text-xs">
                                    <SparklesIcon className="w-4 h-4" />
                                    The Gold Standard
                                </div>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-8 leading-tight">
                                    We don’t just build websites. <br />
                                    <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                        We build growth engines.
                                    </span>
                                </h2>
                                <p className="text-slate-600 text-xl leading-relaxed font-light">
                                    A premium brand deserves a premium digital home. Our approach combines
                                    psychological design principles with the latest tech stack to convert
                                    casual browsers into loyal advocates.
                                </p>
                            </motion.div>

                            {/* REDUCED SIZE FEATURE CARDS
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {features.map((f, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -5 }}
                                        className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-blue-400 transition-all group"
                                    >
                                        <div className="w-10 h-10 mb-3 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                            <img src={f.icon} alt={f.title} className="w-6 h-6 object-contain" />
                                        </div>
                                        <h3 className="text-sm font-bold text-slate-900 mb-1">{f.title}</h3>
                                        <p className="text-slate-400 text-[11px] leading-tight">{f.desc}</p>
                                    </motion.div>
                                ))}
                            </div> */}

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {features.map((f, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        whileHover={{ scale: 1.02, y: -4 }}
                                        className="group relative p-4 bg-slate-950 rounded-xl overflow-hidden cursor-pointer"
                                    >
                                        {/* THE ANIMATED BORDER: Rotating Gradient Trace */}
                                        <div className="absolute inset-0 p-[1px] rounded-xl group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-blue-500 transition-all duration-500">
                                            <div className="absolute inset-0 bg-slate-950 rounded-[11px]" />
                                        </div>

                                        {/* INNER CONTENT */}
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 shrink-0 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                                                    <img
                                                        src={f.icon}
                                                        alt={f.title}
                                                        className="w-4 h-4 object-contain brightness-90 group-hover:brightness-110"
                                                    />
                                                </div>
                                                <h3 className="text-[13px] font-semibold text-slate-200 group-hover:text-white transition-colors">
                                                    {f.title}
                                                </h3>
                                            </div>

                                            <p className="text-slate-500 text-[10px] leading-snug group-hover:text-slate-400 transition-colors line-clamp-2">
                                                {f.desc}
                                            </p>
                                        </div>

                                        {/* SUBTLE GLOW HOVER EFFECT */}
                                        <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* ================= FLOATING SIDEBAR ================= */}
                        <aside className="lg:sticky lg:top-32 space-y-6">

                            {/* DARK THEME QUOTATION FORM */}
                            <div className="bg-[#050816] rounded-[2rem] p-8 shadow-2xl border border-white/5 relative overflow-hidden">
                                <h3 className="text-xl md:text-3xl font-bold text-white mb-2 leading-tight tracking-tight">
                                    Book Your 30 Minutes
                                    <span className="relative inline-block ml-2">
                                        {/* Soft Glow behind the text */}
                                        <span className="absolute -inset-1 bg-orange-600/20 blur-xl rounded-full animate-pulse" />

                                        {/* The Text */}
                                        <span className="relative bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 bg-clip-text text-transparent font-black italic drop-shadow-sm text-5xl">
                                            FREE
                                        </span>
                                    </span>
                                    <span className="text-white"> Session</span>
                                </h3>
                                <p className="text-blue-400 text-[11px] mb-6 font-medium">
                                    Get A Customized Strategy + Quotation
                                </p>

                                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <input
                                            {...register('name', { required: true, minLength: 2 })}
                                            type="text"
                                            placeholder="Full Name"
                                            className={`w-full bg-[#0a0f26] rounded-xl px-5 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-500 ${errors.name ? 'ring-2 ring-rose-400' : 'border border-white/10'}`}
                                        />
                                        {errors.name && <p className="text-rose-300 text-xs mt-1">Full name is required</p>}
                                    </div>

                                    <div>
                                        <input
                                            {...register('phone', { required: true, minLength: 6 })}
                                            type="tel"
                                            placeholder="Contact Number"
                                            className={`w-full bg-[#0a0f26] rounded-xl px-5 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-500 ${errors.phone ? 'ring-2 ring-rose-400' : 'border border-white/10'}`}
                                        />
                                        {errors.phone && <p className="text-rose-300 text-xs mt-1">Please provide a valid contact number</p>}
                                    </div>

                                    <div>
                                        <input
                                            {...register('city', { required: true, minLength: 2 })}
                                            type="text"
                                            placeholder="City"
                                            className={`w-full bg-[#0a0f26] rounded-xl px-5 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-500 ${errors.city ? 'ring-2 ring-rose-400' : 'border border-white/10'}`}
                                        />
                                        {errors.city && <p className="text-rose-300 text-xs mt-1">City is required</p>}
                                    </div>

                                    <div>
                                        <select
                                            {...register('service', { required: true })}
                                            className={`w-full bg-[#0a0f26] rounded-xl px-5 py-3 text-sm text-slate-400 outline-none transition-all ${errors.service ? 'ring-2 ring-rose-400' : 'border border-white/10'}`}
                                        >
                                            <option value="">Select Service</option>
                                            <option value="New Website Development">New Website Development</option>
                                            <option value="Website Re-Designing">Website Re-Designing</option>
                                            <option value="Social Media Management">Social Media Management</option>
                                        </select>
                                        {errors.service && <p className="text-rose-300 text-xs mt-1">Please select a service</p>}
                                    </div>

                                    <button disabled={status === 'loading'} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2 text-sm mt-2 disabled:opacity-60">
                                        {status === 'loading' ? 'Sending...' : 'Book Session'} <ArrowRightIcon className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>

                            {/* EXPERTISE */}
                            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                                <h3 className="text-[10px] uppercase tracking-widest font-black text-blue-600 mb-6">Expertise</h3>
                                <ul className="space-y-4">
                                    {["E-Commerce", "Digital Ads", "SEO Strategy", "Cloud Hosting"].map((s) => (
                                        <li key={s} className="group flex items-center justify-between cursor-pointer">
                                            <span className="text-slate-600 text-xs font-semibold group-hover:text-blue-600 transition-all">{s}</span>
                                            <ArrowRightIcon className="w-3 h-3 text-slate-300 group-hover:text-blue-600" />
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CONTACT */}
                            <div className="bg-gradient-to-br from-blue-700 to-slate-950 rounded-[2rem] p-8 text-white shadow-xl group">
                                <h3 className="text-xl font-black mb-2 italic">Questions?</h3>
                                <p className="text-blue-100/60 text-[11px] mb-6">Direct access to technical consulting.</p>
                                <div className="space-y-3">
                                    <a href="tel:+919148404621" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-all border border-white/5">
                                        <PhoneIcon className="w-5 h-5 text-blue-400" />
                                        <span className="text-xs font-bold">+91 9148404621</span>
                                    </a>
                                    <a href="mailto:contact@yourcompany.com" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-all border border-white/5">
                                        <EnvelopeIcon className="w-5 h-5 text-blue-400" />
                                        <span className="text-xs truncate">contact@yourcompany.com</span>
                                    </a>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>
            </div>
            {/* PRICING PLANS SECTION */}
            <section className="bg-white py-24 px-6 border-t border-blue-100">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-blue-200">
                            Pricing Plans
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mt-6 mb-4 tracking-tight">
                            Website Pricing Plans
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light">
                            Choose a package that fits your business stage.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
                        {pricingPlans.map((plan, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                className={`flex flex-col p-8 md:p-10 rounded-[2.5rem] border transition-all duration-500 ${plan.isPopular
                                    ? "bg-blue-600 border-blue-600 shadow-[0_30px_60px_-15px_rgba(37,99,235,0.25)] scale-[1.03] z-10"
                                    : "bg-white border-blue-100 hover:border-blue-300 shadow-lg"
                                    }`}
                            >
                                <div className="mb-8">
                                    <span
                                        className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${plan.isPopular
                                            ? "bg-white/20 text-white border border-white/30"
                                            : "bg-blue-50 border border-blue-200 text-blue-700"
                                            }`}
                                    >
                                        {plan.name} {plan.isPopular && " — Best Value"}
                                    </span>

                                    <div className="mt-8 flex items-baseline gap-1">
                                        <span className={`text-2xl font-bold ${plan.isPopular ? "text-white" : "text-blue-600"}`}>
                                            ₹
                                        </span>
                                        <span
                                            className={`text-6xl font-black tracking-tighter ${plan.isPopular ? "text-white" : "text-slate-900"
                                                }`}
                                        >
                                            {plan.price}
                                        </span>
                                    </div>

                                    <p
                                        className={`mt-6 text-xs leading-relaxed font-medium ${plan.isPopular ? "text-blue-100" : "text-slate-500"
                                            }`}
                                    >
                                        {plan.desc}
                                    </p>
                                </div>

                                <div className="flex-grow space-y-4 mb-12">
                                    <p
                                        className={`text-[9px] uppercase font-bold tracking-[0.2em] mb-4 ${plan.isPopular ? "text-blue-200" : "text-blue-400"
                                            }`}
                                    >
                                        Included Features
                                    </p>

                                    {plan.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-start gap-3 group/feat">

                                            <div
                                                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.isPopular
                                                    ? "bg-white/20"
                                                    : "bg-blue-100"
                                                    }`}
                                            >
                                                <CheckIcon
                                                    className={`w-3 h-3 font-bold ${plan.isPopular ? "text-white" : "text-blue-600"
                                                        }`}
                                                />
                                            </div>

                                            <span
                                                className={`text-[11px] leading-snug font-medium ${plan.isPopular ? "text-white" : "text-slate-600"
                                                    }`}
                                            >
                                                {feature}
                                            </span>

                                        </div>
                                    ))}
                                </div>

                                <button
                                    className={`w-full font-bold py-5 rounded-2xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 group shadow-lg ${plan.isPopular
                                        ? "bg-white text-blue-600 hover:bg-blue-50"
                                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
                                        }`}
                                >
                                    <span className="text-sm">Get Custom Quote</span>
                                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>

                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div initial={{ y: 20, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 10, opacity: 0 }} transition={{ duration: 0.2 }} className="max-w-md w-full bg-white rounded-xl shadow-2xl p-6 text-center">
                            {status === 'success' ? (
                                <>
                                    <div className="mx-auto w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Thank You!</h3>
                                    <p className="text-slate-500 mb-6">Your request has been submitted successfully. Our team will contact you soon.</p>
                                </>
                            ) : (
                                <>
                                    <div className="mx-auto w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Submission Failed</h3>
                                    <p className="text-slate-500 mb-6">Something went wrong. Please try again.</p>
                                </>
                            )}

                            <div className="flex justify-center">
                                <button onClick={() => { setModalOpen(false); setStatus('idle'); }} className="px-6 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm font-semibold">OK</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </ServiceLayout>
    );
};

export default WebsiteDevelopment;



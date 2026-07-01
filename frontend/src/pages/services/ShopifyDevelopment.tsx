import React from "react";
import { motion } from "framer-motion";
import { 
    CheckCircleIcon, 
    ShoppingBagIcon, 
    CreditCardIcon, 
    RocketLaunchIcon, 
    DevicePhoneMobileIcon, 
    ChartBarIcon,
    SparklesIcon,
    ArrowRightIcon
} from "@heroicons/react/24/outline";
import razorpay from "../../img/e-commerce/CoreslashTechnologies-razorpay.webp";
import stripe from "../../img/e-commerce/CoreslashTechnologies-stripe.webp";
import paypal from "../../img/e-commerce/CoreslashTechnologies-paypal.webp";
import phonepe from "../../img/e-commerce/CoreslashTechnologies-phonepe.webp";
import gpay from "../../img/e-commerce/CoreslashTechnologies-paytm.webp";

import ServiceLayout from "./ServicesLayout";
import { useModal } from "../../context/ModalContext";

/* ================= FEATURES ================= */

const features = [
    {
        title: "Bespoke Storefronts",
        desc: "Tailored Shopify architectures that reflect your unique brand identity.",
        icon: ShoppingBagIcon,
    },
    {
        title: "Universal Payments",
        desc: "Seamless integration with global gateways including Stripe & Razorpay.",
        icon: CreditCardIcon,
    },
    {
        title: "Conversion Engine",
        desc: "Psychology-backed design patterns to maximize your revenue velocity.",
        icon: ChartBarIcon,
    },
    {
        title: "Mobile First Velocity",
        desc: "Sub-second load times on all mobile viewports for fluid shopping.",
        icon: DevicePhoneMobileIcon,
    },
    {
        title: "Algorithmic Speed",
        desc: "Optimized liquid code and asset delivery for peak performance.",
        icon: RocketLaunchIcon,
    },
];

/* ================= PRICING ================= */

const packages = [
    {
        name: "Starter Store",
        price: "15,000",
        features: [
            "Shopify Store Setup",
            "Premium Theme Calibration",
            "Up to 10 Product Architectures",
            "Core Gateway Integration",
            "Mobile Fluid Layout",
            "Standard SEO Mapping",
            "1 Month Technical Support",
        ],
    },
    {
        name: "Growth Partner",
        price: "30,000",
        isPopular: true,
        features: [
            "Custom Liquid Development",
            "Up to 50 Advanced Products",
            "Full Payment Ecosystem",
            "Complex Shipping Logic",
            "Server-side Speed Optimization",
            "Semantic SEO Domination",
            "3 Months Dedicated Support",
        ],
    },
    {
        name: "Enterprise Brand",
        price: "60,000",
        features: [
            "Fully Custom Storefront",
            "Unlimited Product Catalogs",
            "Bespoke UI/UX System",
            "Omni-channel Integration",
            "Priority Asset Delivery",
            "Custom App Development",
            "6 Months Executive Support",
        ],
    },
];

const ShopifyDevelopment: React.FC = () => {
    const { openModal } = useModal();

    return (
        <ServiceLayout
            title="Shopify Intelligence"
            subtitle="Engineering high-velocity commerce engines for the digital era."
            ctaText="Launch Your Store"
        >
            <div className="bg-dark-black">
                {/* HERO SECTION */}
                <section className="container mx-auto px-6 py-12 md:py-24">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 1, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0, margin: "200px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-2 mb-6 text-accent-cyan font-bold tracking-[0.3em] uppercase text-xs">
                                <SparklesIcon className="w-4 h-4" />
                                Commerce Excellence
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-[1.1] tracking-tight">
                                Build <span className="text-gradient-purple">Shopify</span> Ecosystems That Scale.
                            </h2>
                            <p className="text-white/40 text-xl leading-relaxed mb-12">
                                At CoreSlash Technologies, we don't just "set up" stores—we engineer profitable commerce 
                                environments. By combining Shopify's robust infrastructure with our custom design 
                                intelligence, we ensure your brand captures every conversion opportunity.
                            </p>

                            {/* Gateway Grid */}
                            <div className="mt-16">
                                <div className="flex items-center gap-4 mb-10">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 whitespace-nowrap">
                                        Secure Transaction Layer
                                    </h3>
                                    <div className="h-[1px] w-full bg-white/5" />
                                </div>
                                <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3 md:gap-4">
                                    {[
                                        { 
                                            name: "Razorpay", 
                                            img: razorpay, 
                                            classes: "bg-[#0c80e3]/10 border-[#0c80e3]/30 text-white/70 hover:bg-[#0c80e3] hover:border-[#0c80e3] hover:text-white shadow-[0_0_15px_rgba(12,128,227,0.1)] hover:shadow-[0_0_25px_rgba(12,128,227,0.4)]"
                                        },
                                        { 
                                            name: "Stripe", 
                                            img: stripe, 
                                            classes: "bg-[#635bff]/10 border-[#635bff]/30 text-white/70 hover:bg-[#635bff] hover:border-[#635bff] hover:text-white shadow-[0_0_15px_rgba(99,91,255,0.1)] hover:shadow-[0_0_25px_rgba(99,91,255,0.4)]"
                                        },
                                        { 
                                            name: "PayPal", 
                                            img: paypal, 
                                            classes: "bg-[#00457c]/15 border-[#00457c]/35 text-white/70 hover:bg-[#00457c] hover:border-[#00457c] hover:text-white shadow-[0_0_15px_rgba(0,69,124,0.1)] hover:shadow-[0_0_25px_rgba(0,69,124,0.4)]"
                                        },
                                        { 
                                            name: "PhonePe", 
                                            img: phonepe, 
                                            classes: "bg-[#5f259f]/15 border-[#5f259f]/35 text-white/70 hover:bg-[#5f259f] hover:border-[#5f259f] hover:text-white shadow-[0_0_15px_rgba(95,37,159,0.1)] hover:shadow-[0_0_25px_rgba(95,37,159,0.4)]"
                                        },
                                        { 
                                            name: "Paytm", 
                                            img: gpay, 
                                            classes: "bg-[#00baf2]/10 border-[#00baf2]/30 text-white/70 hover:bg-[#00baf2] hover:border-[#00baf2] hover:text-white shadow-[0_0_15px_rgba(0,186,242,0.1)] hover:shadow-[0_0_25px_rgba(0,186,242,0.4)]"
                                        },
                                    ].map((payment, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ y: -3 }}
                                            className={`px-4 py-3 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                                                payment.classes
                                            } ${
                                                index === 4 ? "col-span-2 md:col-span-auto justify-center" : ""
                                            }`}
                                        >
                                            <img src={payment.img} alt={payment.name} className="w-6 h-6 object-contain" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">{payment.name}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 1, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0, margin: "200px" }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-primary-purple/20 rounded-[3rem] blur-3xl opacity-50" />
                            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 group aspect-video">
                                <img
                                    src="https://images.unsplash.com/photo-1557821552-17105176677c"
                                    alt="Shopify Development"
                                    className="w-full h-full object-cover  transition-all duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-transparent to-transparent opacity-60" />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* FEATURES BENTO GRID */}
                <section className="py-16 md:py-32 bg-dark-black border-t border-white/5">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24">
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                                Shopify <span className="text-gradient-cyan">Intelligence</span> Modules
                            </h2>
                            <p className="text-white/40 max-w-2xl mx-auto">Advanced store capabilities engineered for maximum conversion velocity.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
                            {features.map((f, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 1, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0, margin: "200px" }}
                                    transition={{ delay: i * 0.05 }}
                                    className="glass-card p-6 sm:p-8 rounded-[2rem] border-white/5 group hover:border-accent-cyan/20 flex flex-col items-center text-center transition-all h-full"
                                >
                                    <div className="w-14 h-14 mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent-cyan/10 transition-colors">
                                        <f.icon className="w-7 h-7 text-white group-hover:text-accent-cyan transition-colors" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-accent-cyan transition-colors">{f.title}</h3>
                                    <p className="text-[11px] text-white/40 leading-relaxed font-medium">{f.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* STRATEGIC PACKAGES */}
                <section className="pt-10 pb-12 md:pt-12 md:pb-16 bg-dark-black">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24">
                            <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                                Strategic <span className="text-gradient-purple">Store</span> Plans
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto items-stretch">
                            {packages.map((pkg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 1, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0, margin: "200px" }}
                                    transition={{ duration: 0.8, delay: index * 0.05 }}
                                    className={`relative p-12 rounded-[4rem] border flex flex-col transition-all duration-700 ${
                                        pkg.isPopular 
                                        ? "bg-primary-purple/10 border-primary-purple/30 shadow-[0_30px_100px_rgba(69,3,185,0.2)] scale-105 z-10" 
                                        : "bg-white/5 border-white/10 hover:border-white/30"
                                    }`}
                                >
                                    {pkg.isPopular && (
                                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-8 py-2 rounded-full bg-primary-purple text-white text-[10px] font-black uppercase tracking-widest shadow-2xl">
                                            Most Requested
                                        </div>
                                    )}

                                    <div className="mb-12">
                                        <h3 className="text-2xl font-bold text-white mb-4">{pkg.name}</h3>
                                        <div className="flex items-baseline gap-2 mb-6">
                                            <span className="text-xl font-bold text-accent-cyan">₹</span>
                                            <span className="text-6xl font-black text-white tracking-tight">{pkg.price}</span>
                                        </div>
                                    </div>

                                    <div className="flex-grow space-y-5 mb-14">
                                        {pkg.features.map((f, i) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <div className="w-6 h-6 rounded-full bg-accent-cyan/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <CheckCircleIcon className="w-4 h-4 text-accent-cyan font-bold" />
                                                </div>
                                                <span className="text-white/60 text-sm font-medium">{f}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={openModal}
                                        className={`btn-pill w-full text-lg ${
                                            pkg.isPopular ? "btn-primary-glow text-white" : "btn-glass text-white"
                                        }`}
                                    >
                                        Activate Plan
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </ServiceLayout >
    );
};

export default ShopifyDevelopment;


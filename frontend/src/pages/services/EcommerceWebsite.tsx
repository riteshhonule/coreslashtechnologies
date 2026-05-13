import React from "react";
import { motion } from "framer-motion";
import {
    CheckCircleIcon,
    SparklesIcon,
    ArrowRightIcon,
    CreditCardIcon,
    ShoppingCartIcon,
    RocketLaunchIcon
} from "@heroicons/react/24/outline";

import ServiceLayout from "./ServicesLayout";
import ecommerceImg from "../../img/CoreslashTechnologies-ecommerce.png";
import razorpay from "../../img/e-commerce/CoreslashTechnologies-razorpay.webp";
import stripe from "../../img/e-commerce/CoreslashTechnologies-stripe.webp";
import paypal from "../../img/e-commerce/CoreslashTechnologies-paypal.webp";
import phonepe from "../../img/e-commerce/CoreslashTechnologies-phonepe.webp";
import gpay from "../../img/e-commerce/CoreslashTechnologies-paytm.webp";

const features = [
    "Custom UI/UX Design for Higher Conversion",
    "Secure Payment Gateway Integration",
    "Advanced Inventory Management System",
    "Mobile Responsive & Progressive Web App",
    "SEO Optimized Product Architecture",
    "Real-time Analytics Dashboard",
    "Automated Email & SMS Notifications",
    "Multi-vendor & Marketplace Capabilities"
];

const packages = [
    {
        name: "Starter Store",
        price: "25,000",
        icon: <ShoppingCartIcon className="w-12 h-12 text-accent-cyan" />,
        features: [
            "Up to 50 Products",
            "Essential UI/UX Design",
            "Payment Gateway Setup",
            "Order Management System",
            "Basic SEO Optimization",
            "Standard Security SSL",
            "3 Months Support"
        ]
    },
    {
        name: "Business Pro",
        price: "50,000",
        icon: <RocketLaunchIcon className="w-12 h-12 text-accent-cyan" />,
        features: [
            "Unlimited Products",
            "Premium Custom Design",
            "Multiple Payment Gateways",
            "Advanced Analytics",
            "Coupons & Discounts",
            "Customer Accounts",
            "1 Year Support"
        ],
        isPopular: true
    },
    {
        name: "Enterprise Hub",
        price: "95,000",
        icon: <CreditCardIcon className="w-12 h-12 text-accent-cyan" />,
        features: [
            "Bespoke Scalable Architecture",
            "Multi-vendor Support",
            "AI Product Recommendations",
            "Custom API Integrations",
            "Priority Cloud Hosting",
            "Enterprise Security",
            "24/7 Priority Support"
        ]
    }
];

const EcommerceWebsite: React.FC = () => {
    return (
        <ServiceLayout
            title="E-commerce Solutions"
            subtitle="Engineering high-conversion digital storefronts for global scale."
            ctaText="Build Your Store"
        >
            <div className="bg-dark-black">
                {/* Hero & Context */}
                <div className="container mx-auto px-6 py-24">
                    <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-2 mb-6 text-accent-cyan font-bold tracking-[0.3em] uppercase text-xs">
                                <SparklesIcon className="w-4 h-4" />
                                Retail Intelligence
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-[1.1] tracking-tight">
                                Transform Browsing into <span className="text-gradient-cyan">Buying</span> Experiences.
                            </h2>
                            <p className="text-white/40 text-xl leading-relaxed mb-12">
                                We engineer bespoke e-commerce ecosystems that don't just list products—they tell stories
                                and build trust. From secure payment logic to lightning-fast load times, we ensure
                                your digital storefront is optimized for maximum revenue velocity.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <button className="btn-pill btn-primary-glow text-white px-10 py-5">
                                    Consult Our Experts
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-accent-cyan/10 rounded-[3rem] blur-3xl" />
                            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 aspect-video group">
                                <img
                                    src={ecommerceImg}
                                    alt="Ecommerce Development"
                                    className="w-full h-full object-cover  transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-transparent to-transparent opacity-60" />
                            </div>
                        </motion.div>
                    </div>

                    {/* GATEWAY SECTION */}
                    <div className="mb-32">
                        <div className="flex items-center gap-6 mb-16">
                            <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-accent-cyan whitespace-nowrap">
                                Secure Ecosystem Integrations
                            </h3>
                            <div className="h-[1px] w-full bg-white/10" />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            {[
                                { name: "Razorpay", img: razorpay },
                                { name: "Stripe", img: stripe },
                                { name: "PayPal", img: paypal },
                                { name: "PhonePe", img: phonepe },
                                { name: "Google Pay", img: gpay },
                            ].map((payment, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    className="glass-card p-8 rounded-3xl border-white/5 flex flex-col items-center justify-center gap-4 group"
                                >
                                    <img src={payment.img} alt={payment.name} className="h-8 object-contain  transition-all" />
                                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{payment.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* FEATURES BENTO GRID */}
                    <div className="mb-32">
                        <div className="text-center mb-24">
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Store Features</h2>
                            <p className="text-white/40 max-w-2xl mx-auto">Advanced functional modules designed for the modern digital merchant.</p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="glass-card p-8 rounded-[2rem] border-white/5 group hover:border-accent-cyan/20"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-accent-cyan/10">
                                        <CheckCircleIcon className="w-6 h-6 text-accent-cyan" />
                                    </div>
                                    <p className="text-white font-bold leading-snug group-hover:text-accent-cyan transition-colors">{feature}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* STRATEGIC PACKAGES */}
                    <div className="mb-32">
                        <div className="text-center mb-24">
                            <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                                Strategic <span className="text-gradient-purple">Store</span> Plans
                            </h2>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto items-stretch">
                            {packages.map((pkg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className={`relative p-12 rounded-[4rem] border flex flex-col transition-all duration-700 ${pkg.isPopular
                                        ? "bg-primary-purple/10 border-primary-purple/30 shadow-[0_30px_100px_rgba(69,3,185,0.2)] scale-105 z-10"
                                        : "bg-white/5 border-white/10 hover:border-white/30"
                                        }`}
                                >
                                    {pkg.isPopular && (
                                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-8 py-2 rounded-full bg-primary-purple text-white text-[10px] font-black uppercase tracking-widest">
                                            Most Requested
                                        </div>
                                    )}

                                    <div className="mb-12">
                                        <div className="mb-6">{pkg.icon}</div>
                                        <h3 className="text-2xl font-bold text-white mb-4">{pkg.name}</h3>
                                        <div className="flex items-baseline gap-2 mb-6">
                                            <span className="text-xl font-bold text-accent-cyan">₹</span>
                                            <span className="text-6xl font-black text-white tracking-tighter">{pkg.price}</span>
                                        </div>
                                    </div>

                                    <div className="flex-grow space-y-5 mb-14">
                                        {pkg.features.map((f, i) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <div className="w-6 h-6 rounded-full bg-accent-cyan/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <CheckCircleIcon className="w-4 h-4 text-accent-cyan" />
                                                </div>
                                                <span className="text-white/60 text-sm font-medium">{f}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button className={`btn-pill w-full text-lg ${pkg.isPopular ? "btn-primary-glow text-white" : "btn-glass text-white"
                                        }`}>
                                        Launch My Store
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ServiceLayout>
    );
};

export default EcommerceWebsite;

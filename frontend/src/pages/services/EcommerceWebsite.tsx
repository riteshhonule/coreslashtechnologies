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
import ecommerceImg from "../../img/CoreslashTechnologies-ecommerce.webp";
import { useModal } from "../../context/ModalContext";
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
        icon: <ShoppingCartIcon className="w-12 h-12 text-secondary-indigo" />,
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
        icon: <RocketLaunchIcon className="w-12 h-12 text-secondary-indigo" />,
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
        icon: <CreditCardIcon className="w-12 h-12 text-secondary-indigo" />,
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
    const { openModal } = useModal();

    return (
        <ServiceLayout
            title="E-commerce Solutions"
            subtitle="Engineering high-conversion digital storefronts for global scale."
            ctaText="Build Your Store"
        >
            <div className="bg-[#F9FAFB] text-gray-900">
                {/* Hero & Context */}
                <div className="container mx-auto px-6 py-12 md:py-24">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-12 md:mb-32">
                        <motion.div
                            initial={{ opacity: 1, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0, margin: "200px" }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="flex items-center gap-2 mb-6 text-secondary-indigo font-bold tracking-[0.3em] uppercase text-xs">
                                <SparklesIcon className="w-4 h-4" />
                                Retail Intelligence
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-10 leading-[1.1] tracking-tight">
                                Transform Browsing into <span className="text-gradient-cyan">Buying</span> Experiences.
                            </h2>
                            <p className="text-gray-500 text-xl leading-relaxed mb-12">
                                We engineer bespoke e-commerce ecosystems that don't just list products—they tell stories
                                and build trust. From secure payment logic to lightning-fast load times, we ensure
                                your digital storefront is optimized for maximum revenue velocity.
                            </p>
                            <div className="flex justify-center w-full">
                                <button onClick={openModal} className="btn-pill btn-primary-glow text-white px-10 py-5">
                                    Consult Our Experts
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 1, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0, margin: "200px" }}
                            transition={{ duration: 1 }}
                            className="relative"
                            style={{ perspective: 1200 }}
                        >
                            {/* Ambient breathing glow that amplifies on hover */}
                            <motion.div 
                                className="absolute -inset-4 bg-gradient-to-tr from-primary-purple/20 to-secondary-indigo/25 rounded-[3rem] blur-3xl opacity-40 pointer-events-none"
                                animate={{
                                    scale: [1, 1.03, 1],
                                    opacity: [0.4, 0.55, 0.4],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                whileHover={{ scale: 1.15, opacity: 0.8 }}
                            />
                            
                            {/* 3D Tilt Card Container */}
                            <motion.div 
                                className="relative rounded-[3rem] overflow-hidden border border-gray-200/80 shadow-2xl bg-white group cursor-pointer"
                                style={{ transformStyle: "preserve-3d" }}
                                whileHover={{
                                    rotateX: 4,
                                    rotateY: -6,
                                    scale: 1.03,
                                    boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.25)"
                                }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <motion.div 
                                    className="w-full h-auto"
                                    style={{ translateZ: 30 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                >
                                    <img
                                        src={ecommerceImg}
                                        alt="Ecommerce Development"
                                        className="w-full h-auto object-cover"
                                    />
                                </motion.div>

                                {/* Interactive glass shimmer sweep */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none" />
                                
                                {/* Overlay Border Highlight */}
                                <div className="absolute inset-0 rounded-[3rem] border border-white/20 pointer-events-none mix-blend-overlay" />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* GATEWAY SECTION */}
                    <div className="mb-12 md:mb-32">
                        <div className="flex items-center gap-6 mb-16">
                            <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-secondary-indigo whitespace-nowrap">
                                Secure Ecosystem Integrations
                            </h3>
                            <div className="h-[1px] w-full bg-gray-200" />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            {[
                                { 
                                    name: "Razorpay", 
                                    img: razorpay, 
                                    classes: "bg-[#0c80e3]/5 border-[#0c80e3]/20 text-gray-700 hover:bg-white hover:border-[#0c80e3] hover:text-[#0c80e3] hover:shadow-xl hover:shadow-[#0c80e3]/10"
                                },
                                { 
                                    name: "Stripe", 
                                    img: stripe, 
                                    classes: "bg-[#635bff]/5 border-[#635bff]/20 text-gray-700 hover:bg-white hover:border-[#635bff] hover:text-[#635bff] hover:shadow-xl hover:shadow-[#635bff]/10"
                                },
                                { 
                                    name: "PayPal", 
                                    img: paypal, 
                                    classes: "bg-[#00457c]/5 border-[#00457c]/20 text-gray-700 hover:bg-white hover:border-[#00457c] hover:text-[#00457c] hover:shadow-xl hover:shadow-[#00457c]/10"
                                },
                                { 
                                    name: "PhonePe", 
                                    img: phonepe, 
                                    classes: "bg-[#5f259f]/5 border-[#5f259f]/20 text-gray-700 hover:bg-white hover:border-[#5f259f] hover:text-[#5f259f] hover:shadow-xl hover:shadow-[#5f259f]/10"
                                },
                                { 
                                    name: "Paytm", 
                                    img: gpay, 
                                    classes: "bg-[#00baf2]/5 border-[#00baf2]/20 text-gray-700 hover:bg-white hover:border-[#00baf2] hover:text-[#00baf2] hover:shadow-xl hover:shadow-[#00baf2]/10"
                                },
                            ].map((payment, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    className={`p-8 rounded-3xl border flex flex-col items-center justify-center gap-4 transition-all cursor-pointer ${
                                        payment.classes
                                    } ${
                                        index === 4 ? "col-span-2 md:col-span-1" : ""
                                    }`}
                                >
                                    <img src={payment.img} alt={payment.name} className="h-8 object-contain" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{payment.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* FEATURES BENTO GRID */}
                    <div className="mb-12 md:mb-32">
                        <div className="text-center mb-24">
                            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Store Features</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">Advanced functional modules designed for the modern digital merchant.</p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 1, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0, margin: "200px" }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white p-8 rounded-[2rem] border border-gray-200/60 shadow-md shadow-gray-200/10 hover:border-secondary-indigo/30 hover:shadow-lg group flex flex-col items-center text-center"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-6 group-hover:bg-secondary-indigo/10 mx-auto">
                                        <CheckCircleIcon className="w-6 h-6 text-secondary-indigo" />
                                    </div>
                                    <p className="text-gray-900 font-bold leading-snug group-hover:text-secondary-indigo transition-colors">{feature}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* STRATEGIC PACKAGES */}
                    <div className="mb-12 md:mb-32">
                        <div className="text-center mb-24">
                            <h2 className="text-4xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
                                Strategic <span className="text-gradient-purple">Store</span> Plans
                            </h2>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto items-stretch">
                            {packages.map((pkg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 1, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0, margin: "200px" }}
                                    transition={{ duration: 0.8, delay: index * 0.05 }}
                                    className={`relative p-12 rounded-[4rem] border flex flex-col transition-all duration-700 ${pkg.isPopular
                                        ? "bg-white border-2 border-primary-purple/30 shadow-2xl scale-105 z-10"
                                        : "bg-white border-gray-200/80 hover:border-secondary-indigo/30 shadow-md shadow-gray-200/10"
                                        }`}
                                >
                                    {pkg.isPopular && (
                                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-8 py-2 rounded-full bg-primary-purple text-white text-[10px] font-black uppercase tracking-widest">
                                            Most Requested
                                        </div>
                                    )}

                                    <div className="mb-12">
                                        <div className="mb-6">{pkg.icon}</div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{pkg.name}</h3>
                                    </div>

                                    <div className="flex-grow space-y-5 mb-14">
                                        {pkg.features.map((f, i) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <div className="w-6 h-6 rounded-full bg-secondary-indigo/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <CheckCircleIcon className="w-4 h-4 text-secondary-indigo" />
                                                </div>
                                                <span className="text-gray-600 text-sm font-medium">{f}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button onClick={openModal} className={`btn-pill w-full text-lg ${pkg.isPopular ? "btn-primary-glow text-white" : "btn-glass text-secondary-indigo hover:text-white"
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

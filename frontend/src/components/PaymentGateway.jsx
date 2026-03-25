import React from "react";
import { motion } from "framer-motion";

// import images
import razorpay from "../img/e-commerce/InfoteliaITSolutions-razorpay.webp";
import stripe from "../img/e-commerce/InfoteliaITSolutions-stripe.webp";
import paypal from "../img/e-commerce/InfoteliaITSolutions-paypal.webp";
import phonepe from "../img/e-commerce/InfoteliaITSolutions-phonepe.webp";
import gpay from "../img/e-commerce/InfoteliaITSolutions-paytm.webp";

const gateways = [
    {
        name: "Razorpay",
        img: razorpay,
        desc: "India's #1 Payments Partner",
        color: "from-blue-600/10 to-blue-400/5",
        accent: "bg-blue-600"
    },
    {
        name: "Stripe",
        img: stripe,
        desc: "Trusted by Global Companies",
        color: "from-purple-600/10 to-indigo-400/5",
        accent: "bg-purple-600"
    },
    {
        name: "PayPal",
        img: paypal,
        desc: "Global Standard Payment",
        color: "from-cyan-600/10 to-blue-400/5",
        accent: "bg-cyan-600"
    },
    {
        name: "PhonePe",
        img: phonepe,
        desc: "Quick & Secure UPI",
        color: "from-purple-600/10 to-pink-400/5",
        accent: "bg-purple-700"
    },
    {
        name: "Paytm",
        img: gpay,
        desc: "Fast Mobile Payments",
        color: "from-cyan-500/10 to-blue-300/5",
        accent: "bg-cyan-500"
    },
];

const PaymentGateway = () => {
    return (
        <section className="relative py-14 overflow-hidden">
            {/* Soft Background Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl -z-10 pointer-events-none opacity-40">
                <div className="absolute top-20 left-0 w-72 h-72 bg-orange-400/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-20 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 mb-6"
                    >
                        <span className="text-sm font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent uppercase tracking-widest">
                            Seamless Integration
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight"
                    >
                        Working with Payments <br />
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Anywhere in the World</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-lg text-slate-600 font-medium"
                    >
                        We integrate industry-leading payment gateways into your platform,
                        ensuring secure, instant, and frictionless transactions for your customers.
                    </motion.p>
                </div>

                {/* Gateways Grid - Adjusted grid-cols-2 for mobile */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {gateways.map((payment, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className="group relative overflow-hidden flex flex-col items-center p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500"
                        >
                            {/* Hover Background Accent */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${payment.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            {/* Gateway Logo - Removed grayscale class */}
                            <div className="relative z-10 w-20 h-12 md:w-24 md:h-16 mb-4 md:mb-6 flex items-center justify-center transition-all duration-500">
                                <img
                                    src={payment.img}
                                    alt={payment.name}
                                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Info - Removed h4 name as per "remove 1 duplicate name" request */}
                            <div className="relative z-10 text-center">
                                <p className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                                    {payment.desc}
                                </p>
                            </div>

                            {/* Status Indicator */}
                            <div className="absolute top-4 right-4 md:top-6 md:right-8">
                                <div className={`h-1.5 w-1.5 rounded-full ${payment.accent} opacity-60 group-hover:opacity-100 animate-pulse`} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
                        <span className="h-px w-4 md:w-8 bg-slate-200" />
                        PCI DSS Compliant & Secure
                        <span className="h-px w-4 md:w-8 bg-slate-200" />
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default PaymentGateway;

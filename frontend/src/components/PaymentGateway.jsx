import React from "react";
import { motion } from "framer-motion";

// import images
import razorpay from "../img/e-commerce/CoreslashTechnologies-razorpay.webp";
import stripe from "../img/e-commerce/CoreslashTechnologies-stripe.webp";
import paypal from "../img/e-commerce/CoreslashTechnologies-paypal.webp";
import phonepe from "../img/e-commerce/CoreslashTechnologies-phonepe.webp";
import gpay from "../img/e-commerce/CoreslashTechnologies-paytm.webp";

const gateways = [
    {
        name: "Razorpay",
        img: razorpay,
        desc: "Regional Payments",
        accent: "text-blue-400"
    },
    {
        name: "Stripe",
        img: stripe,
        desc: "Global Operations",
        accent: "text-indigo-400"
    },
    {
        name: "PayPal",
        img: paypal,
        desc: "International Trade",
        accent: "text-cyan-400"
    },
    {
        name: "PhonePe",
        img: phonepe,
        desc: "Secure UPI",
        accent: "text-purple-500"
    },
    {
        name: "Paytm",
        img: gpay,
        desc: "Mobile Commerce",
        accent: "text-cyan-500"
    },
];

const PaymentGateway = () => {
    return (
        <section className="relative py-32 overflow-hidden bg-dark-black">
            
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-purple/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-indigo/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 1, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0, margin: "200px" }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
                    >
                        <span className="text-xs font-bold text-accent-cyan uppercase tracking-[0.2em]">Global Integrations</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                        Seamlessly Integrated <br />
                        <span className="text-gradient-cyan">Financial Infrastructure</span>
                    </h2>

                    <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
                        We engineer secure, high-performance financial integrations that bridge 
                        the gap between your platform and global capital.
                    </p>
                </div>

                {/* Integration Web Visualization */}
                <div className="relative">
                    {/* Connection Lines (SVG) */}
                    <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none hidden md:block" viewBox="0 0 1200 400">
                        <motion.path
                            d="M 100 200 Q 300 50 600 200 T 1100 200"
                            fill="none"
                            stroke="url(#gradient-line)"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        <defs>
                            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#4503B9" />
                                <stop offset="50%" stopColor="#22D3EE" />
                                <stop offset="100%" stopColor="#737CFD" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {gateways.map((payment, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 1, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.04, duration: 0.3 }}
                                viewport={{ once: true, amount: 0, margin: "200px" }}
                                className="glass-card p-10 flex flex-col items-center justify-center text-center group hover:border-accent-cyan/30"
                            >
                                <div className="relative w-full aspect-square flex items-center justify-center mb-8">
                                    <div className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 blur-xl" />
                                    <img
                                        src={payment.img}
                                        alt={payment.name}
                                        className="w-20 h-auto object-contain brightness-0 invert opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 relative z-10"
                                    />
                                </div>

                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-2">
                                    {payment.desc}
                                </p>
                                
                                <div className={`h-1 w-12 rounded-full bg-white/10 overflow-hidden`}>
                                    <motion.div 
                                        initial={{ x: "-100%" }}
                                        whileInView={{ x: "100%" }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: index * 0.05 }}
                                        className={`h-full w-1/2 bg-gradient-to-r from-transparent via-accent-cyan to-transparent`}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 1 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0, margin: "200px" }}
                    className="mt-24 flex flex-col items-center"
                >
                    <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
                    <p className="text-white/20 text-xs font-bold uppercase tracking-[0.4em] text-center">
                        Enterprise Grade Security & PCI DSS Compliance
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default PaymentGateway;


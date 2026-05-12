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
        color: "from-blue-600/20 to-blue-400/5",
        accent: "bg-blue-400"
    },
    {
        name: "Stripe",
        img: stripe,
        desc: "Global Operations",
        color: "from-purple-600/20 to-indigo-400/5",
        accent: "bg-purple-400"
    },
    {
        name: "PayPal",
        img: paypal,
        desc: "International Trade",
        color: "from-cyan-600/20 to-blue-400/5",
        accent: "bg-cyan-400"
    },
    {
        name: "PhonePe",
        img: phonepe,
        desc: "Secure UPI",
        color: "from-purple-600/20 to-pink-400/5",
        accent: "bg-purple-500"
    },
    {
        name: "Paytm",
        img: gpay,
        desc: "Mobile Commerce",
        color: "from-cyan-500/20 to-blue-300/5",
        accent: "bg-cyan-500"
    },
];

const PaymentGateway = () => {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-accent/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
                    >
                        <span className="text-xs font-bold text-accent-cyan uppercase tracking-widest">Global Transactions</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Seamlessly Integrated <br />
                        <span className="text-gradient-cyan">Global Payment Solutions</span>
                    </h2>

                    <p className="text-white/40 text-lg max-w-2xl mx-auto">
                        We engineer secure, high-performance financial integrations that bridge the gap between your platform and global capital.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {gateways.map((payment, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 border-white/5 group hover:border-white/10 transition-all flex flex-col items-center justify-center text-center"
                        >
                            <div className="relative w-full aspect-video flex items-center justify-center mb-6">
                                <img
                                    src={payment.img}
                                    alt={payment.name}
                                    className="w-24 h-auto object-contain brightness-0 invert opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                />
                            </div>

                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">
                                {payment.desc}
                            </p>
                            
                            <div className={`mt-4 w-1.5 h-1.5 rounded-full ${payment.accent} animate-pulse shadow-[0_0_8px_currentColor]`} />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-20 flex flex-col items-center"
                >
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />
                    <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em]">
                        Enterprise Grade Security & PCI DSS Compliance
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default PaymentGateway;

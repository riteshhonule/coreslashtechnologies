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
        glow: "rgba(9, 114, 231, 0.15)"
    },
    {
        name: "Stripe",
        img: stripe,
        desc: "Global Operations",
        glow: "rgba(99, 91, 255, 0.15)"
    },
    {
        name: "PayPal",
        img: paypal,
        desc: "International Trade",
        glow: "rgba(0, 48, 135, 0.2)"
    },
    {
        name: "PhonePe",
        img: phonepe,
        desc: "Secure UPI",
        glow: "rgba(95, 37, 159, 0.2)"
    },
    {
        name: "Paytm",
        img: gpay,
        desc: "Mobile Commerce",
        glow: "rgba(0, 186, 242, 0.15)"
    },
];

const PaymentGateway = () => {
    return (
        <section className="relative py-12 md:py-16 overflow-hidden bg-dark-black">
            
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-purple/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-indigo/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
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

                {/* Integration Visualization Grid */}
                <div className="relative">
                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                        {gateways.map((payment, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 1, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.04, duration: 0.3 }}
                                viewport={{ once: true, amount: 0, margin: "200px" }}
                                whileHover={{ y: -8 }}
                                className="relative flex-1 min-w-[180px] max-w-[220px] h-48 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl p-6 flex flex-col items-center justify-center text-center group cursor-pointer transition-all duration-500 hover:border-accent-cyan/30 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                            >
                                {/* Brand Glow Backdrop */}
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none blur-2xl -z-10"
                                    style={{ background: `radial-gradient(circle, ${payment.glow} 0%, transparent 70%)` }}
                                />

                                <div className="relative w-16 h-16 flex items-center justify-center mb-6">
                                    <div className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 blur-xl pointer-events-none" />
                                    <img
                                        src={payment.img}
                                        alt={payment.name}
                                        className="max-w-full max-h-full object-contain filter grayscale opacity-45 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 relative z-10"
                                    />
                                </div>

                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2 group-hover:text-white/60 transition-colors">
                                    {payment.name}
                                </p>
                                <p className="text-[9px] font-medium text-white/20 uppercase tracking-wider group-hover:text-accent-cyan transition-colors">
                                    {payment.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 1 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0, margin: "200px" }}
                    className="mt-16 flex flex-col items-center"
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

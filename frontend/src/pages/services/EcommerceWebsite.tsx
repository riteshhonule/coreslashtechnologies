import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, RocketLaunchIcon, BriefcaseIcon, GlobeAltIcon } from '@heroicons/react/24/solid';
import ServiceLayout from './ServicesLayout';
import ecommerceImg from "../../img/ecommerce-development.jpg";
import razorpay from "../../img/e-commerce/InfoteliaITSolutions-razorpay.webp";
import stripe from "../../img/e-commerce/InfoteliaITSolutions-stripe.webp";
import paypal from "../../img/e-commerce/InfoteliaITSolutions-paypal.webp";
import phonepe from "../../img/e-commerce/InfoteliaITSolutions-phonepe.webp";
import gpay from "../../img/e-commerce/InfoteliaITSolutions-paytm.webp";



const features = [
    "User-Friendly Cart & Checkout",
    "Product Management System",
    "Secure Payment Gateway Integration (Razorpay, Stripe)",
    "Customer Analytics Dashboard",
    "Mobile Responsive Design",
    "SEO Optimized Store",
    "Multi-Vendor Marketplace Option",
    "Advanced Product Search & Filters",
    "Inventory Management System",
    "Order & Delivery Tracking"
];

const packages = [
    {
        name: "Starter E-commerce",
        price: "₹14,999",
        icon: <RocketLaunchIcon className="w-8 h-8 text-orange-500" />,
        features: [
            "Up to 25 Products",
            "Mobile Responsive Design",
            "Payment Gateway Integration",
            "Admin Panel",
            "Basic SEO Setup",
            "1 Month Support"
        ]
    },
    {
        name: "Business E-commerce",
        price: "₹24,999",
        icon: <BriefcaseIcon className="w-8 h-8 text-orange-600" />,
        features: [
            "Up to 100 Products",
            "Advanced Admin Dashboard",
            "SEO Optimized Store",
            "Payment Gateway + COD",
            "Speed Optimization",
            "3 Months Support"
        ]
    },
    {
        name: "Enterprise E-commerce",
        price: "₹39,999",
        icon: <GlobeAltIcon className="w-8 h-8 text-orange-700" />,
        features: [
            "Unlimited Products",
            "Custom Design",
            "Advanced SEO Optimization",
            "Multi Vendor Option",
            "Analytics Integration",
            "6 Months Support"
        ]
    }
];

const EcommerceWebsite: React.FC = () => {
    return (
        <ServiceLayout
            title="E-commerce Website Development Company in India | Infotelia IT Solutions"
            subtitle="Infotelia IT Solutions builds SEO-optimized, high-converting e-commerce websites to grow your online business and increase sales."
            ctaText="Get Free E-commerce Consultation"
            headerGradient="from-slate-900 via-orange-950 to-red-950 mt-3"
        >
            <div className="bg-white overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">

                    {/* SECTION 1: HERO & ABOUT */}
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* IMAGE LEFT - Premium Shadow & Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative group order-2 lg:order-1"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-tr from-orange-100 to-red-50 rounded-[2rem] -z-10 blur-2xl opacity-50 transition duration-700" />
                            <img
                                src={ecommerceImg}
                                alt="Ecommerce Website Development Company Infotelia IT Solutions"
                                className="rounded-[2rem] shadow-2xl w-full object-cover transform transition duration-500 group-hover:scale-[1.01]"
                            />

                            <motion.div
                                initial={{ y: 10 }}
                                animate={{ y: 0 }}
                                transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
                                className="absolute -bottom-6 -right-4 md:-right-8 bg-white/95 backdrop-blur shadow-2xl rounded-2xl p-5 border border-orange-100"
                            >
                                <p className="font-black text-orange-600 text-2xl md:text-3xl leading-none">500+</p>
                                <p className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Stores Developed</p>
                            </motion.div>
                        </motion.div>

                        {/* CONTENT RIGHT */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2"
                        >
                            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-tight mb-8">
                                Best E-commerce Website Development Company – <span className="text-orange-600">Infotelia IT Solutions</span>
                            </h2>

                            <div className="space-y-6 text-[15px] md:text-[18px] text-slate-600 leading-relaxed">
                                <p>
                                    Infotelia IT Solutions is a leading e-commerce website development company in India,
                                    building high-converting online stores that increase sales and business growth.
                                </p>
                                <p>
                                    We create SEO optimized ecommerce websites with secure payment gateway,
                                    fast performance, mobile friendly design, and advanced admin dashboard.
                                </p>
                                <p className="font-medium text-slate-800 border-l-4 border-orange-500 pl-4 italic">
                                    Our ecommerce solutions help businesses rank higher on Google, attract customers, and grow revenue.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* GATEWAY SECTION - EXACT REPLICA OF IMAGE */}
                    <div className="mb-24 mt-16">
                        <motion.div className="mb-10 flex items-center gap-4">
                            <h3 className="inline-flex items-center text-xs font-bold uppercase tracking-[0.35em] whitespace-nowrap
text-orange-400 border border-orange-500/30 
bg-gradient-to-r from-orange-500/10 to-red-500/10 
px-5 py-2 rounded-full backdrop-blur-md shadow-lg shadow-orange-500/10">

                                Payment Gateway Integration

                            </h3>
                            <div className="h-[1px] w-full bg-slate-200" />
                        </motion.div>

                        <div className="flex flex-wrap gap-6 justify-center">
                            {[
                                { name: "Razorpay", img: razorpay },
                                { name: "Stripe", img: stripe },
                                { name: "PayPal", img: paypal },
                                { name: "PhonePe", img: phonepe },
                                { name: "Google Pay", img: gpay },
                            ].map((payment, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-10 px-10 py-8 bg-white rounded-[2rem] border-[2.5px] border-slate-900 min-w-[240px] shadow-sm"
                                >
                                    <div className="w-28">
                                        <img src={payment.img} alt={payment.name} className="w-full object-contain" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest leading-none mb-2">
                                            Gateway
                                        </p>
                                        <span className="text-4xl font-black text-slate-900">
                                            {payment.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FEATURES SECTION - Visual List */}
                    <div className="mt-24 grid  gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100"
                        >
                            <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center border-b-2 border-slate-100 ">Our E-commerce Website Features</h3>
                            <ul className="grid sm:grid-cols-2 gap-4">
                                {features.map((feature, index) => (
                                    <li key={index} className="flex gap-3 items-start p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                                        <CheckCircleIcon className="w-6 h-6 text-orange-600 shrink-0" />
                                        <span className="text-slate-700 font-medium leading-tight">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                    </div>

                    {/* PACKAGES SECTION */}
                    <div className="mt-32">
                        <h2 className="text-3xl md:text-5xl font-black text-center text-slate-900 mb-16 tracking-tight">
                            E-commerce Website Development Packages – <span className="text-orange-600">Infotelia IT Solutions</span>
                        </h2>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {packages.map((pkg, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -10 }}
                                    className={`relative bg-white shadow-2xl rounded-[2.5rem] p-8 md:p-10 border-2 transition-all duration-300 ${index === 1 ? 'border-orange-500' : 'border-slate-50'}`}
                                >
                                    <div className="mb-6">{pkg.icon}</div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-4">{pkg.name}</h3>
                                    <p className="text-4xl font-black text-orange-600 mb-8">{pkg.price}</p>

                                    <ul className="space-y-4 mb-10 border-t border-slate-50 pt-8">
                                        {pkg.features.map((f, i) => (
                                            <li key={i} className="flex gap-3 items-center text-slate-600 font-medium">
                                                <CheckCircleIcon className="w-5 h-5 text-orange-600 shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    <button className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-200 transition-all">
                                        Get Started
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* SEO FOOTER SECTION */}
                    <div className="mt-32 max-w-4xl mx-auto text-center">
                        <div className="inline-block p-1 bg-orange-100 rounded-full mb-6">
                            <div className="bg-white px-4 py-1 rounded-full text-sm font-bold text-orange-600 uppercase tracking-widest">Why Us?</div>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                            Why Choose Infotelia IT Solutions for E-commerce Website Development?
                        </h2>
                        <div className="space-y-6 text-[15px] md:text-[15px] text-slate-500 leading-relaxed">
                            <p>
                                Infotelia IT Solutions is one of the best e-commerce website development companies in India,
                                providing professional, affordable, and SEO optimized online stores.
                            </p>
                            <p>
                                We help startups, small businesses, and enterprises build scalable e-commerce platforms
                                that increase sales, improve customer engagement, and grow business online.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </ServiceLayout>
    );
};

export default EcommerceWebsite;

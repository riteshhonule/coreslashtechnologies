
import React from "react";
import { motion } from "framer-motion";
import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import ShoppingBagIcon from "@heroicons/react/24/outline/ShoppingBagIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import RocketLaunchIcon from "@heroicons/react/24/outline/RocketLaunchIcon";
import DevicePhoneMobileIcon from "@heroicons/react/24/outline/DevicePhoneMobileIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import razorpay from "../../img/e-commerce/InfoteliaITSolutions-razorpay.webp";
import stripe from "../../img/e-commerce/InfoteliaITSolutions-stripe.webp";
import paypal from "../../img/e-commerce/InfoteliaITSolutions-paypal.webp";
import phonepe from "../../img/e-commerce/InfoteliaITSolutions-phonepe.webp";
import gpay from "../../img/e-commerce/InfoteliaITSolutions-paytm.webp";

import ServiceLayout from "./ServicesLayout";



/* ================= FEATURES ================= */

const features = [
    {
        title: "Custom Shopify Stores",
        desc: "Fully custom Shopify websites tailored to your brand.",
        icon: ShoppingBagIcon,
        gradient: "from-green-500 to-emerald-500",
    },
    {
        title: "Payment Gateway Integration",
        desc: "Secure Razorpay, Stripe, PayPal integration.",
        icon: CreditCardIcon,
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        title: "High Conversion Design",
        desc: "Optimized store design to increase sales.",
        icon: ChartBarIcon,
        gradient: "from-purple-500 to-pink-500",
    },
    {
        title: "Mobile Optimized Store",
        desc: "Fully responsive Shopify websites.",
        icon: DevicePhoneMobileIcon,
        gradient: "from-orange-500 to-red-500",
    },
    {
        title: "Speed Optimized",
        desc: "Fast loading stores for better conversion.",
        icon: RocketLaunchIcon,
        gradient: "from-indigo-500 to-blue-500",
    },
];



/* ================= PRICING ================= */

const packages = [

    {
        name: "Basic Shopify Store",
        price: "₹15,000",
        features: [
            "Shopify Store Setup",
            "Premium Theme Setup",
            "Up to 10 Products Upload",
            "Payment Gateway Setup",
            "Mobile Responsive",
            "Basic SEO Setup",
            "1 Month Support",
        ],
    },

    {
        name: "Standard Shopify Store",
        price: "₹30,000",
        highlight: true,
        features: [
            "Custom Shopify Design",
            "Up to 50 Products Upload",
            "Payment Gateway Integration",
            "Shipping Setup",
            "Speed Optimization",
            "SEO Optimization",
            "3 Months Support",
        ],
    },

    {
        name: "Premium Shopify Store",
        price: "₹60,000",
        features: [
            "Fully Custom Shopify Store",
            "Unlimited Products",
            "Custom UI Design",
            "Conversion Optimization",
            "Advanced SEO",
            "Payment Integration",
            "6 Months Support",
        ],
    },

];



const ShopifyDevelopment: React.FC = () => {


    return (

        <ServiceLayout
            title="Shopify Website Development"
            subtitle="Launch powerful Shopify stores designed to increase conversions and sales."
            ctaText="Build Your Shopify Store"
            headerGradient="from-green-900 via-teal-900 to-emerald-900 mt-3"
        >



            {/* ================= HERO ================= */}

            <section className="container mx-auto px-6 py-20">

                <div className="grid md:grid-cols-2 gap-16 items-center">


                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >

                        <motion.div

                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-10"

                        >
                            <h2 className="text-4xl font-bold mb-6"> Build Shopify Stores <span className="text-green-600 block"> That Sell More Products </span> </h2> <p className="text-gray-600 text-lg"> Infotelia IT Solutions builds high-converting Shopify websites designed to increase your sales, automate your business, and grow faster. </p>

                            {/* Heading */}


                            <div className="mt-16 px-4">
                                {/* Professional Minimal Header */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="mb-10 flex items-center gap-4"
                                >
                                    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 whitespace-nowrap">
                                        Enterprise Grade Security
                                    </h3>
                                    <div className="h-[1px] w-full bg-slate-200" />
                                </motion.div>

                                {/* Payment Grid */}
                                <div className="flex flex-wrap gap-6">
                                    {[
                                        { name: "Razorpay", img: razorpay },
                                        { name: "Stripe", img: stripe },
                                        { name: "PayPal", img: paypal },
                                        { name: "PhonePe", img: phonepe },
                                        { name: "Google Pay", img: gpay },
                                    ].map((payment, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ y: -5 }}
                                            className="group relative flex items-center gap-6 px-8 py-5 bg-white rounded-xl transition-all duration-300"
                                        >
                                            {/* --- CLASSY SOLID ANIMATED BORDER --- */}
                                            {/* This creates a solid 2px border that feels like it's glowing/moving */}
                                            <div className="absolute inset-0 rounded-xl border-2 border-slate-100 group-hover:border-slate-900 transition-colors duration-500 z-0" />

                                            {/* Optional: Subtle corner accent that appears on hover */}
                                            <div className="absolute top-0 right-0 w-0 h-0 border-t-2 border-r-2 border-blue-600 rounded-tr-xl opacity-0 group-hover:w-4 group-hover:h-4 group-hover:opacity-100 transition-all duration-300" />

                                            {/* Logo - Size increased and centered */}
                                            <div className="relative z-10 w-12 h-12 flex items-center justify-center">
                                                <motion.img
                                                    src={payment.img}
                                                    alt={payment.name}
                                                    whileHover={{ scale: 1.15, rotate: 2 }}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>

                                            {/* Text Content */}
                                            <div className="relative z-10">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                                                    Gateway
                                                </p>
                                                <span className="text-lg font-black text-slate-800 group-hover:text-black transition-colors">
                                                    {payment.name}
                                                </span>
                                            </div>

                                            {/* Bottom "Progress" Border Animation */}
                                            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-slate-900 group-hover:w-full transition-all duration-500 rounded-b-xl" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                        </motion.div>

                    </motion.div>



                    <img
                        src="https://images.unsplash.com/photo-1557821552-17105176677c"
                        className="rounded-3xl shadow-xl"
                    />


                </div>

            </section>



            {/* ================= FEATURES ================= */}

            <section className="py-20 bg-gray-50">

                <div className="text-center mb-16">

                    <h2 className="text-4xl font-bold">

                        Shopify Store Features

                    </h2>

                </div>


                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">

                    {features.map((f, i) => (

                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="bg-white p-6 rounded-3xl shadow-md"
                        >

                            <div className={`w-14 h-14 mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br ${f.gradient}`}>

                                <f.icon className="w-7 h-7 text-white" />

                            </div>

                            <h3 className="font-bold">{f.title}</h3>

                            <p className="text-sm text-gray-500">{f.desc}</p>

                        </motion.div>

                    ))}

                </div>

            </section>




            {/* ================= PRICING ================= */}

            <section className="py-20 bg-white">

                <div className="text-center mb-16">

                    <h2 className="text-4xl font-bold">

                        Shopify Pricing Packages

                    </h2>

                </div>



                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">


                    {packages.map((pkg, index) => (

                        <motion.div
                            key={index}
                            whileHover={{ y: -10 }}
                            className={`p-8 border rounded-3xl shadow-sm
${pkg.highlight ? "border-green-600 scale-105" : ""}
`}
                        >


                            <h3 className="font-bold text-xl mb-3">

                                {pkg.name}

                            </h3>



                            <div className="text-3xl font-bold text-green-600 mb-6">

                                {pkg.price}

                            </div>



                            <ul className="space-y-3 mb-8">

                                {pkg.features.map((f, i) => (

                                    <li key={i} className="flex gap-2">

                                        <CheckCircleIcon className="w-5 text-green-600" />

                                        <span>{f}</span>

                                    </li>

                                ))}

                            </ul>



                            <button className="w-full bg-green-600 text-white py-3 rounded-xl">

                                Get Custom Quote

                            </button>



                        </motion.div>

                    ))}


                </div>


            </section>



        </ServiceLayout >

    );

};


export default ShopifyDevelopment;

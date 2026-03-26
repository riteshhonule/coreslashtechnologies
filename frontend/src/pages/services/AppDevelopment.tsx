
import React from "react";
import { motion } from "framer-motion";
import AppFeaturesSection from "../../components/AppFeaturesSection";

import ServiceLayout from "./ServicesLayout";
import { useModal } from "../../context/ModalContext";
import CoreslashTechnologies_app_development from "../../img/CoreslashTechnologies-app-development.png";



/* ================= PRICING PACKAGES ================= */

const packages = [

    {
        name: "Basic App Package",
        price: "?15,000",
        features: [
            "Android App Development",
            "Up to 5 Screens",
            "Basic UI/UX Design",
            "Firebase Integration",
            "Push Notifications",
            "App Icon & Splash Screen",
            "APK File Delivery",
            "1 Month Support"
        ]
    },

    {
        name: "Standard App Package",
        price: "?30,000",
        highlight: true,
        features: [
            "Android App Development",
            "Up to 10 Screens",
            "Advanced UI/UX Design",
            "Firebase Integration",
            "User Login System",
            "Admin Panel",
            "Push Notifications",
            "Play Store Upload",
            "3 Months Support"
        ]
    },

    {
        name: "Premium App Package",
        price: "?60,000",
        features: [
            "Android + iOS App",
            "Unlimited Screens",
            "Custom UI/UX Design",
            "Backend Development",
            "Admin Dashboard",
            "Payment Gateway Integration",
            "Play Store & App Store Upload",
            "6 Months Support"
        ]
    }

];



const AppDevelopment: React.FC = () => {

    const { openModal } = useModal();

    return (

        <ServiceLayout
            title="App Development"
            subtitle="Innovative Mobile Solutions"
            ctaText="Start Your App Journey"
            headerGradient="from-[#0f172a] via-[#1e293b] to-[#0f172a] mt-5"
        >


            {/* ================= HERO CONTENT ================= */}

            <div className="bg-[#fcfcfd]">

                <section className="container mx-auto px-6 lg:px-12 py-16">

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-8"
                        >
                            <div className="relative w-full overflow-hidden rounded-3xl shadow-xl aspect-video">

                                <img
                                    src={CoreslashTechnologies_app_development}
                                    alt="App Development"
                                    className="w-full h-full object-cover"
                                />

                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >

                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8">

                                Build Powerful Mobile Apps

                                <span className="text-blue-600 block">
                                    That Grow Your Business
                                </span>

                            </h2>


                            <p className="text-slate-600 text-lg mb-8">

                                Coreslash Technologies builds high-performance mobile applications
                                for startups, businesses, and enterprises. We develop scalable,
                                secure, and user-friendly apps that help you increase customers,
                                automate processes, and grow revenue.

                            </p>


                            <button
                                onClick={openModal}
                                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all"
                            >

                                Get Free Consultation

                            </button>

                        </motion.div>




                    </div>

                </section>

            </div>


            <AppFeaturesSection />

            {/* ================= PRICING SECTION ================= */}


            <section className="py-20 bg-white">


                <div className="text-center mb-14">

                    <h2 className="text-4xl font-bold">
                        App Development Packages
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Choose the best plan for your business
                    </p>

                </div>



                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">


                    {packages.map((pkg, index) => (

                        <motion.div
                            key={index}
                            whileHover={{ y: -10 }}
                            className={`p-8 rounded-3xl border shadow-sm 
                            ${pkg.highlight ? "border-blue-600 shadow-lg scale-105" : ""}
                            `}
                        >

                            <h3 className="text-xl font-bold mb-3">
                                {pkg.name}
                            </h3>


                            <div className="text-3xl font-black text-blue-600 mb-6">
                                {pkg.price}
                            </div>



                            <ul className="space-y-3 mb-8">

                                {pkg.features.map((f, i) => (
                                    <li key={i} className="text-gray-600 text-sm">
                                        ? {f}
                                    </li>
                                ))}

                            </ul>



                            <button
                                onClick={openModal}
                                className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
                            >

                                Get Custom Quote

                            </button>


                        </motion.div>

                    ))}


                </div>


            </section>



        </ServiceLayout>

    );

};


export default AppDevelopment;

import React from "react";
import { envConfig } from "../../config/env.config";
import { motion } from "framer-motion";
import ArrowRightIcon from "@heroicons/react/24/outline/ArrowRightIcon";
import SparklesIcon from "@heroicons/react/24/outline/SparklesIcon";

import ServiceLayout from "./ServicesLayout";
import SEO from "../../components/SEO";
import ContactForm from "../../components/ContactForm";

interface Feature {
    title: string;
    desc: string;
    icon?: string;
}

interface GenericServicePageProps {
    title: string;
    subtitle: string;
    description: string;
    features: Feature[];
    slug: string;
}

const GenericServicePage: React.FC<GenericServicePageProps> = ({ title, subtitle, description, features, slug }) => {

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": title,
        "description": description,
        "provider": {
            "@type": "Organization",
            "name": "CoreSlash Technologies",
            "url": "https://coreslashtechnologies.com"
        }
    };

    return (
        <ServiceLayout
            title={title}
            subtitle={subtitle}
            ctaText="Start Your Project"
        >
            <SEO 
                title={title}
                description={description}
                structuredData={structuredData}
            />
            <div className="bg-dark-black">
                {/* Intro Section */}
                <section className="container mx-auto px-6 lg:px-12 py-12 md:py-24 max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 1, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0, margin: "200px" }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
                            <span className="text-xs font-bold text-accent-cyan uppercase tracking-[0.2em]">
                                Engineering Excellence
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                            {title}
                        </h2>
                        <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-medium">
                            {description}
                        </p>
                    </motion.div>
                </section>

                {/* Capabilities Grid */}
                <section className="py-12 md:py-24 bg-dark-black/40 border-y border-white/5">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                                Service <span className="text-gradient-cyan">Capabilities</span>
                            </h3>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((f, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 1, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0, margin: "200px" }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    className="glass-card p-10 rounded-[2.5rem] border-white/5 hover:border-accent-cyan/20 group flex flex-col justify-between transition-all h-full"
                                >
                                    <div className="space-y-4">
                                        <h4 className="text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors">{f.title}</h4>
                                        <p className="text-white/40 text-sm leading-relaxed font-medium">{f.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Dedicated Consultation Section */}
                <section className="py-12 md:py-24 bg-dark-black">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <div className="glass-card p-10 md:p-16 rounded-[4rem] border-white/5 relative overflow-hidden">
                            <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-primary-purple/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="hidden md:block absolute bottom-0 left-0 w-64 h-64 bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none" />

                            <div className="text-center mb-12">
                                <h3 className="text-4xl font-bold text-white mb-4 tracking-tight">
                                    Book Your <span className="text-accent-cyan italic">Free</span> Consultation
                                </h3>
                                <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed">
                                    Get a customized technology strategy and development roadmap from our engineering specialists.
                                </p>
                            </div>

                            <ContactForm variant="glass" service={title} isSidebar={false} />
                        </div>
                    </div>
                </section>
            </div>
        </ServiceLayout>
    );
};

export default GenericServicePage;

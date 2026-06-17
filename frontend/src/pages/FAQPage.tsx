import React from "react";
import { motion } from "framer-motion";
import { SparklesIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import SEO from "../components/SEO";

const faqs = [
    {
        q: "What services does Coreslash Technologies provide in Belgaum?",
        a: "We offer complete IT solutions including Custom Web Development, Mobile App Development, Enterprise Software, and ROI-driven Digital Marketing services (SEO, PPC, Social Media) tailored for businesses in Belgaum and across India."
    },
    {
        q: "How long does it take to develop a custom website?",
        a: "A typical custom website takes between 4 to 8 weeks depending on the complexity, features, and required integrations. We follow an agile process to ensure timely delivery without compromising on quality."
    },
    {
        q: "Do you offer SEO services for local businesses in Karnataka?",
        a: "Yes! We specialize in Local SEO to help businesses in Belgaum, Bangalore, and Hubli dominate their local search results and attract more customers from their specific geographic area."
    },
    {
        q: "Can you help migrate my legacy software to the cloud?",
        a: "Absolutely. We have extensive experience in modernizing legacy systems and migrating them to secure, scalable cloud environments like AWS or Azure, ensuring minimal downtime for your business."
    },
    {
        q: "What makes Coreslash Technologies different from other IT agencies?",
        a: "We combine deep technical expertise with a business-first mindset. We don't just build software; we build solutions that drive revenue, improve efficiency, and scale your brand effectively."
    },
    {
        q: "Is digital marketing effective for B2B companies in Maharashtra?",
        a: "Yes, specifically through targeted LinkedIn marketing, high-intent SEO, and account-based advertising. We help B2B firms in Maharashtra reach decision-makers and generate qualified leads."
    }
];

const FAQPage: React.FC = () => {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24">
            <SEO 
                title="FAQ | Frequently Asked Questions"
                description="Find answers to common questions about CoreSlash Technologies' web development, AI solutions, SEO services, and enterprise IT solutions."
                structuredData={faqSchema}
            />
            <div className="max-w-4xl mx-auto px-6 py-20">
                <motion.div
                    initial={{ opacity: 1, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 border border-blue-200 mb-6">
                        <SparklesIcon className="w-5 h-5" />
                        <span className="text-xs font-black uppercase tracking-widest">Support</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
                        Frequently Asked <span className="text-blue-600">Questions</span>
                    </h1>
                    <p className="text-slate-500 text-lg font-medium">
                        Everything you need to know about our services and how we help your business grow.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.details
                            key={index}
                            initial={{ opacity: 1, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                <h3 className="text-lg font-bold text-slate-800 pr-4">{faq.q}</h3>
                                <ChevronDownIcon className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform duration-300" />
                            </summary>
                            <div className="px-6 pb-6 text-slate-600 leading-relaxed font-medium border-t border-slate-50 pt-4">
                                {faq.a}
                            </div>
                        </motion.details>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 1 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 p-10 bg-blue-600 rounded-[2.5rem] text-center text-white relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h2>
                        <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                            Can't find the answer you're looking for? Please chat to our friendly team.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block px-10 py-4 bg-white text-blue-600 font-black rounded-xl hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20"
                        >
                            Get in Touch
                        </a>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full -ml-20 -mb-20 blur-3xl" />
                </motion.div>
            </div>
        </div>
    );
};

export default FAQPage;

import { motion } from "framer-motion";
import { Star, CheckCircle } from "lucide-react";
import person1 from "../img/review/CoreslashTechnologies-om.png";
import CoreslashTechnologiesIcon from "../img/CoreslashTechnologies_icon.webp";

interface Review {
    id: number;
    name: string;
    businessName: string;
    location: string;
    rating: number;
    text: string;
    image: string;
}

const reviews: Review[] = [
    {
        id: 1,
        name: "Om Patil",
        businessName: "Om Patil Crane Service",
        location: "Belagavi, Karnataka",
        rating: 5,
        text: "Coreslash Technologies built our professional website and improved our online presence. Highly recommended IT solutions company in Belagavi.",
        image: person1
    },
    {
        id: 2,
        name: "Abhishek Patil",
        businessName: "Tax Consultant",
        location: "Belagavi, Karnataka",
        rating: 5,
        text: "They created a modern website for my tax consultancy. I am getting more client calls than before. Best website development company.",
        image: CoreslashTechnologiesIcon
    },
    {
        id: 3,
        name: "Yash Kangralkar",
        businessName: "Kangralkar Mess",
        location: "Belagavi, Karnataka",
        rating: 5,
        text: "More students are contacting us daily. Excellent digital marketing service and great support. Visibility improved significantly.",
        image: CoreslashTechnologiesIcon
    }
];

export default function ReviewSection() {
    return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-accent/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
                    >
                        <span className="text-xs font-bold text-accent-cyan uppercase tracking-widest">Client Testimonials</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Trusted by <span className="text-gradient-purple">Industry Leaders</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card p-8 border-white/5 group hover:border-white/10 transition-all"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 p-0.5">
                                    <img src={review.image} alt={review.name} className="w-full h-full object-cover rounded-[calc(1rem-2px)] grayscale group-hover:grayscale-0 transition-all duration-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white leading-tight">{review.name}</h3>
                                    <p className="text-xs text-white/40 uppercase tracking-widest font-bold">{review.businessName}</p>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-accent-cyan text-accent-cyan" />
                                ))}
                            </div>

                            <p className="text-white/60 leading-relaxed italic mb-8 h-24">
                                "{review.text}"
                            </p>

                            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-accent-cyan font-bold text-[10px] uppercase tracking-widest">
                                    <CheckCircle className="w-3 h-3" />
                                    <span>Verified Partnership</span>
                                </div>
                                <div className="opacity-20 group-hover:opacity-100 transition-opacity">
                                    <img src={CoreslashTechnologiesIcon} alt="Logo" className="w-5 h-5 grayscale" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}



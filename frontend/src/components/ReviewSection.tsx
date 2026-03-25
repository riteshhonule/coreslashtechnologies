import { motion } from "framer-motion";
import { Star, CheckCircle } from "lucide-react";
import { useModal } from "../context/ModalContext";
import person1 from "../img/review/InfoteliaITSolutions-om.png"
import InfoteliaITSolutionsIcon from "../img/InfoteliaITSolutions_icon.webp";


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
        text: "Infotelia IT Solutions built our professional website and improved our online presence. Now we receive regular crane service inquiries from Google. Highly recommended IT solutions company in Belagavi.",
        image: person1
    },
    {
        id: 2,
        name: "Abhishek Patil",
        businessName: "Abhishek Patil Tax Consultant",
        location: "Belagavi, Karnataka",
        rating: 5,
        text: "They created a modern website for my tax consultancy and helped my business rank on Google. I am getting more client calls than before. Best website development company in Belagavi.",
        image: InfoteliaITSolutionsIcon
    },
    {
        id: 3,
        name: "Yash Kangralkar",
        businessName: "Kangralkar Mess",
        location: "Belagavi, Karnataka",
        rating: 5,
        text: "Infotelia IT Solutions helped promote our mess service online and improved our visibility. More students are contacting us daily. Excellent digital marketing service and great support.",
        image: InfoteliaITSolutionsIcon
    },
    // {
    //     id: 4,
    //     name: "Priyanka Sharma",
    //     businessName: "Global Exports",
    //     location: "Bangalore, Karnataka",
    //     rating: 5,
    //     text: "Their PPC campaigns deliver instant results. We saw a consistent 40% growth in international sales within just three months. Truly a performance-driven agency.",
    //     image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop"
    // },
    // {
    //     id: 5,
    //     name: "Santosh Hegde",
    //     businessName: "Coastal Foods",
    //     location: "Mangalore, Karnataka",
    //     rating: 5,
    //     text: "The website they built is extremely fast and mobile-responsive. Our online orders have doubled since the launch. Great job, InfoteliaITSolutions team!",
    //     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop"
    // },
    // {
    //     id: 6,
    //     name: "Vikram Reddy",
    //     businessName: "Reddy Motors",
    //     location: "Tumkur, Karnataka",
    //     rating: 5,
    //     text: "Excellent service and transparent reporting. They keep us updated on every metric that matters. Best digital marketing partner for local businesses.",
    //     image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=200&auto=format&fit=crop"
    // }
];

export default function ReviewSection() {
    const { openModal } = useModal();

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-2 mb-4"
                    >
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <p className="text-sm font-bold text-slate-600">Join Happy Clients</p>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight"
                    >
                        What Our Clients <span className="text-blue-600 italic">Say About Us</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 text-lg max-w-2xl mx-auto"
                    >
                        Real results for real businesses. See how we've helped companies across Karnataka and India scale their digital presence.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full relative group"
                        >
                            <div className="absolute top-8 right-8 text-slate-100 group-hover:text-blue-50 transition-colors">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12M14.017 21H7.01701V12C7.01701 11.4477 7.46472 11 8.01701 11H11.017V9C11.017 7.89543 10.1216 7 9.01701 7H5.01701C4.46473 7 4.01701 7.44772 4.01701 8V15C4.01701 16.1046 4.91244 17 6.01701 17H7.01701V21" opacity="0.1" />
                                </svg>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl overflow-hidden ring-4 ring-blue-50">
                                    <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 leading-tight">{review.name}</h3>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{review.businessName}</p>
                                    <p className="text-[10px] text-blue-600 font-bold">{review.location}</p>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5 + (i * 0.1) }}
                                    >
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    </motion.div>
                                ))}
                            </div>

                            <p className="text-slate-600 font-medium leading-relaxed italic mb-8 flex-grow">
                                "{review.text}"
                            </p>

                            <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs bg-emerald-50 px-3 py-1.5 rounded-full">
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    <span>Verified Client</span>
                                </div>
                                <div className="opacity-40 grayscale group-hover:grayscale-0 transition-all">
                                    <svg viewBox="0 0 24 24" width="20" height="20">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center bg-slate-50 rounded-[3rem] p-12 border border-slate-100"
                >
                    <p className="text-xl font-bold text-slate-900 mb-8 tracking-tight">
                        Ready to become our <span className="text-blue-600">next success story?</span>
                    </p>
                    <button
                        onClick={openModal}
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-black transition-all duration-200 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
                    >
                        Get Free Consultation
                        <svg
                            className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </motion.div> */}
            </div>
        </section>
    );
}


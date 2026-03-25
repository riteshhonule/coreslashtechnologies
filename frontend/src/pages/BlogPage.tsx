import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { blogPosts } from "../data/blogData";
import BlogCard from "../components/blog/BlogCard";
import BlogSkeleton from "../components/blog/BlogSkeleton";
import BlogCTA from "../components/blog/BlogCTA";
import { MagnifyingGlassIcon, EnvelopeIcon, SparklesIcon } from "@heroicons/react/24/outline";

import ReviewSection from "../components/ReviewSection";

const BlogPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [displayCount, setDisplayCount] = useState(6);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const filteredPosts = blogPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const visiblePosts = filteredPosts.slice(0, displayCount);

    return (
        <div className="min-h-screen bg-white">
            <div className="h-24 md:h-32 bg-white w-full" />

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden bg-slate-50">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-50/50 to-transparent" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 border border-blue-100 mb-8 self-center">
                            <SparklesIcon className="w-5 h-5" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Our Blog</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
                            Insights, Blogs & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Industry Expertise</span>
                        </h1>
                        <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed mb-12">
                            Stay updated with the latest trends in digital marketing, SEO, and web development.
                            Our Bangalore-based experts share insights to help your business dominate the digital landscape.
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-2xl mx-auto group">
                            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-6 w-6 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search articles or categories..."
                                className="w-full pl-16 pr-8 py-6 bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-lg font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Blog Grid Section */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, idx) => <BlogSkeleton key={idx} />)
                    ) : (
                        visiblePosts.map((post, idx) => {
                            // Support for AdSense placeholder every 4 posts
                            const showAd = (idx + 1) === 4;
                            return (
                                <React.Fragment key={post.id}>
                                    <BlogCard post={post} index={idx} />
                                    {showAd && (
                                        <div className="md:col-span-1 lg:col-span-1 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Advertisement</span>
                                            <div className="h-48 w-full bg-slate-200 rounded-2xl flex items-center justify-center mb-6">
                                                <span className="text-slate-400 font-bold">Google AdSense</span>
                                            </div>
                                            <p className="text-slate-400 text-sm font-medium">Your ad could be here.</p>
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })
                    )}
                </div>
                {/* Load More */}
                {visiblePosts.length < filteredPosts.length && (
                    <div className="mt-20 text-center">
                        <button
                            onClick={() => setDisplayCount(filteredPosts.length)}
                            className="px-12 py-5 bg-white border-2 border-slate-200 text-slate-900 font-black rounded-2xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 shadow-xl shadow-slate-100 hover:-translate-y-1"
                        >
                            Load More Articles
                        </button>
                    </div>
                )}

                {/* Newsletter Box (Premium Highlight) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-12 rounded-[3.5rem] bg-slate-900 overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="flex-1 text-center lg:text-left">
                            <h3 className="text-3xl md:text-5xl font-black text-white mb-4">Subscribe to our newsletter</h3>
                            <p className="text-slate-400 text-lg font-medium">Get the latest industry news and SEO hacks delivered to your inbox.</p>
                        </div>
                        <div className="flex-1 w-full max-w-xl">
                            <form className="relative flex items-center p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl" onSubmit={(e) => e.preventDefault()}>
                                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                    <EnvelopeIcon className="h-6 w-6 text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-16 pr-4 py-5 bg-transparent border-none text-white placeholder-slate-400 focus:outline-none focus:ring-0 text-lg font-medium"
                                />
                                <button className="px-8 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-blue-600/30 whitespace-nowrap">
                                    Join Now
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.div>


            </section>

            <ReviewSection />
            <BlogCTA />
        </div>
    );
};

export default BlogPage;

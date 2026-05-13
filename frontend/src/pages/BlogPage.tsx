import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { blogPosts } from "../data/blogData";
import BlogCard from "../components/blog/BlogCard";
import BlogSkeleton from "../components/blog/BlogSkeleton";
import BlogCTA from "../components/blog/BlogCTA";
import { MagnifyingGlassIcon, EnvelopeIcon, SparklesIcon } from "@heroicons/react/24/outline";

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
        <div className="min-h-screen bg-dark-black pt-[100px] overflow-hidden">
            {/* GLOWS */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-purple/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Hero Section */}
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-5xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
                            <SparklesIcon className="w-4 h-4 text-accent-cyan" />
                            <span className="text-xs font-bold text-accent-cyan uppercase tracking-[0.3em]">Neural Insights</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-8xl font-bold text-white mb-10 leading-[1.1] tracking-tight">
                            Intelligence, <span className="text-gradient-purple">Strategy</span> & Growth Logic.
                        </h1>
                        
                        <p className="text-white/40 text-xl md:text-2xl max-w-3xl mx-auto mb-16 leading-relaxed">
                            Stay synchronized with the latest architectural shifts in digital marketing, 
                            SEO ecosystems, and high-velocity software development.
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-2xl mx-auto group">
                            <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-6 w-6 text-white/20 group-focus-within:text-accent-cyan transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search the matrix..."
                                className="w-full pl-20 pr-8 py-7 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] focus:outline-none focus:border-accent-cyan/50 transition-all text-white text-lg font-medium shadow-2xl"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Blog Grid Section */}
            <section className="py-24 container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, idx) => <BlogSkeleton key={idx} />)
                    ) : (
                        visiblePosts.map((post, idx) => {
                            const showAd = (idx + 1) === 4;
                            return (
                                <React.Fragment key={post.id}>
                                    <BlogCard post={post} index={idx} />
                                    {showAd && (
                                        <div className="glass-card rounded-[3rem] border-white/5 border-dashed flex flex-col items-center justify-center p-12 text-center relative overflow-hidden min-h-[400px]">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent" />
                                            <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mb-8">ADVERTISING_PROTOCOL</span>
                                            <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group hover:border-accent-cyan transition-colors">
                                                <SparklesIcon className="w-8 h-8 text-white/20 group-hover:text-accent-cyan transition-colors" />
                                            </div>
                                            <p className="text-white/40 text-sm font-medium tracking-wide">Reserved for Strategic Partnerships.</p>
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })
                    )}
                </div>

                {/* Load More */}
                {visiblePosts.length < filteredPosts.length && (
                    <div className="mt-24 text-center">
                        <button
                            onClick={() => setDisplayCount(filteredPosts.length)}
                            className="btn-pill btn-glass text-white px-16 text-lg"
                        >
                            Load More Intel
                        </button>
                    </div>
                )}

                {/* Newsletter Box */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 p-16 md:p-24 rounded-[4rem] glass-card border-white/5 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary-purple/10 to-transparent pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                        <div className="flex-1 text-center lg:text-left">
                            <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Sync your <span className="text-gradient-cyan">Logic.</span></h3>
                            <p className="text-white/40 text-xl font-medium max-w-md">Subscribe to receive high-frequency industry updates and engineering hacks.</p>
                        </div>
                        <div className="flex-1 w-full max-w-2xl">
                            <form className="relative flex flex-col sm:flex-row items-center p-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem]" onSubmit={(e) => e.preventDefault()}>
                                <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
                                    <EnvelopeIcon className="h-6 w-6 text-white/20" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-20 pr-4 py-6 bg-transparent border-none text-white placeholder-white/20 focus:outline-none focus:ring-0 text-lg font-medium"
                                />
                                <button className="w-full sm:w-auto px-12 py-5 btn-primary-glow text-white text-lg font-bold rounded-[1.8rem]">
                                    Join Protocol
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </section>

            <BlogCTA />
        </div>
    );
};

export default BlogPage;


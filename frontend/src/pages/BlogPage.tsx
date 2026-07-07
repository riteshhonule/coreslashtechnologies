import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { blogPosts } from "../data/blogData";
import BlogCard from "../components/blog/BlogCard";
import BlogSkeleton from "../components/blog/BlogSkeleton";
import BlogCTA from "../components/blog/BlogCTA";
import { useModal } from "../context/ModalContext";
import { MagnifyingGlassIcon, EnvelopeIcon, SparklesIcon } from "@heroicons/react/24/outline";

const BlogPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [displayCount, setDisplayCount] = useState(6);
    const [searchQuery, setSearchQuery] = useState("");
    const { openModal } = useModal();

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
        <div className="relative min-h-screen bg-[#F9FAFB] pt-0 overflow-hidden text-gray-900">
            {/* GLOWS */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-purple/3 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-indigo/2 rounded-full blur-[120px] pointer-events-none" />

            {/* Hero Section */}
            <section className="relative pt-20 pb-10 md:pt-28 md:pb-12 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 1, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-5xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-4">
                            <SparklesIcon className="w-4 h-4 text-secondary-indigo" />
                            <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.3em]">Neural Insights</span>
                        </div>
                        
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                            Intelligence, <span className="text-gradient-purple">Strategy</span> & Growth Logic.
                        </h1>
                        
                        <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
                            Stay synchronized with the latest architectural shifts in digital marketing, 
                            SEO ecosystems, and high-velocity software development.
                        </p>

                     </motion.div>
                </div>
            </section>

            {/* Blog Grid Section */}
            <section className="pt-0 pb-12 md:pt-0 md:pb-24 container mx-auto px-6 relative z-10">
                {/* Search Bar */}
                <div className="relative max-w-2xl mx-auto group mb-16 md:mb-20">
                    <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none z-10">
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 group-focus-within:text-secondary-indigo transition-colors" />
                    </div>
                    <div className="w-full flex items-center justify-center h-20 bg-white border border-gray-200 rounded-[2rem] shadow-md shadow-gray-200/20 focus-within:border-secondary-indigo/50 transition-all px-20">
                        <input
                            type="text"
                            placeholder="Search the matrix..."
                            className="w-full text-center bg-transparent focus:outline-none text-gray-900 text-lg font-medium placeholder-gray-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

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
                                        <div className="bg-[#0b081d] rounded-[3rem] border border-white/5 flex flex-col items-center justify-between p-10 text-center relative overflow-hidden min-h-[400px] shadow-2xl group text-white">
                                            {/* Ambient Background Glow */}
                                            <div className="absolute -inset-10 bg-primary-purple/10 blur-2xl rounded-full pointer-events-none animate-pulse" />
                                            
                                            <div className="relative z-10 flex flex-col items-center flex-1 justify-center">
                                                <span className="text-[10px] font-black text-secondary-indigo uppercase tracking-[0.4em] mb-6">Partner with CoreSlash</span>
                                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-secondary-indigo/20 transition-all duration-500">
                                                    <SparklesIcon className="w-7 h-7 text-secondary-indigo animate-pulse" />
                                                </div>
                                                <h3 className="text-2xl font-bold mb-4 tracking-tight leading-snug">
                                                    Ready to Scale Your Technology?
                                                </h3>
                                                <p className="text-white/60 text-sm leading-relaxed max-w-xs font-medium mb-6">
                                                    Collaborate with our engineering team to design custom software and high-impact digital systems.
                                                </p>
                                            </div>

                                            <button 
                                                onClick={openModal}
                                                className="relative z-10 w-full btn-pill btn-primary-glow text-white text-base py-3.5 shadow-2xl"
                                            >
                                                Book A Consultation
                                            </button>
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
                            className="btn-pill btn-glass text-secondary-indigo hover:text-white px-16 text-lg"
                        >
                            Load More Intel
                        </button>
                    </div>
                )}
            </section>

            <BlogCTA />
        </div>
    );
};

export default BlogPage;


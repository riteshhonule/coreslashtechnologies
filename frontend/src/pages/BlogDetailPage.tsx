import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../data/blogData";
import { motion } from "framer-motion";
import { CalendarIcon, ArrowLeftIcon, ShareIcon, UserIcon, SparklesIcon } from "@heroicons/react/24/outline";
import BlogCTA from "../components/blog/BlogCTA";

const BlogDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = blogPosts.find(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-dark-black text-white">
                <SparklesIcon className="w-16 h-16 text-accent-cyan mb-6 animate-pulse" />
                <h1 className="text-4xl font-bold mb-4 tracking-tight">Intelligence Not Found</h1>
                <Link to="/blog" className="text-accent-cyan font-bold hover:underline flex items-center gap-2">
                    <ArrowLeftIcon className="w-5 h-5" /> Back to Matrix
                </Link>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-dark-black pt-0 overflow-hidden">
            {/* GLOWS */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-purple/10 rounded-full blur-[140px] pointer-events-none" />
            
            <article className="max-w-5xl mx-auto px-6 pt-2 pb-12 relative z-10">
                {/* Back Link */}
                <Link to="/blog" className="inline-flex items-center gap-3 text-white/30 hover:text-accent-cyan font-bold text-xs uppercase tracking-[0.3em] mb-6 transition-all group">
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent-cyan/50 transition-colors">
                        <ArrowLeftIcon className="w-4 h-4" />
                    </div>
                    Return to Intelligence Feed
                </Link>

                {/* Header */}
                <motion.header
                    initial={{ opacity: 1, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                        <span className="text-accent-cyan text-xs font-bold uppercase tracking-[0.4em]">
                            {post.category}
                        </span>
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-10 py-10 border-y border-white/5 mb-16">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-primary-purple/20 border border-primary-purple/30 flex items-center justify-center text-accent-cyan font-bold text-xl">
                                {post.author[0]}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white tracking-wide uppercase">{post.author}</p>
                                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1 text-gradient-cyan">System Architect</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-white/40">
                            <CalendarIcon className="w-5 h-5 text-accent-cyan" />
                            <p className="text-xs font-bold uppercase tracking-widest">{post.date}</p>
                        </div>

                        <div className="flex items-center gap-3 text-white/40">
                            <UserIcon className="w-5 h-5 text-accent-cyan" />
                            <p className="text-xs font-bold uppercase tracking-widest">Verified Article</p>
                        </div>

                        <button className="ml-auto w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group">
                            <ShareIcon className="w-5 h-5 text-white/40 group-hover:text-accent-cyan" />
                        </button>
                    </div>
                </motion.header>

                {/* Featured Image */}
                <motion.div
                    initial={{ opacity: 1, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="rounded-[4rem] overflow-hidden mb-24 relative group"
                >
                    <div className="absolute inset-0 bg-primary-purple/10 blur-3xl rounded-[4rem] -z-10 group-hover:bg-primary-purple/20 transition-all duration-1000" />
                    <img src={post.image} alt={post.title} className="w-full h-auto transition-all duration-1000 scale-[1.01]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-black/60 to-transparent" />
                </motion.div>

                {/* Content Body */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-white/80 leading-relaxed font-medium space-y-12">
                        {post.content ? (
                            <>
                                <div className="text-2xl text-white font-bold mb-20 italic relative pl-12 py-4">
                                    <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-primary-purple to-accent-cyan rounded-full" />
                                    "{post.content.intro}"
                                </div>

                                {post.content.sections.map((section, idx) => (
                                    <motion.div 
                                        key={idx} 
                                        initial={{ opacity: 1, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0, margin: "200px" }}
                                        className="mb-20"
                                    >
                                        <h2 className="text-3xl md:text-5xl font-bold text-white mt-16 mb-10 tracking-tight">{section.title}</h2>
                                        {section.isBullet ? (
                                            <ul className="space-y-6">
                                                {(Array.isArray(section.content) ? section.content : [section.content]).map((item, i) => (
                                                    <li key={i} className="flex items-start gap-4 text-white/60 text-lg">
                                                        <div className="w-2 h-2 rounded-full bg-accent-cyan mt-3 shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="space-y-8 text-lg text-white/60">
                                                {(Array.isArray(section.content) ? section.content : [section.content]).map((para, i) => (
                                                    <p key={i} className="leading-relaxed">{para}</p>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}

                                {post.content.faqs && post.content.faqs.length > 0 && (
                                    <div className="mt-16 md:mt-32 p-6 md:p-20 glass-card rounded-[4rem] border-white/5 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-12 text-white/[0.02] text-9xl font-black">FAQ</div>
                                        <h2 className="text-4xl font-bold text-white mb-16 relative z-10 tracking-tight">Frequently Asked <span className="text-gradient-cyan">Intelligence</span></h2>
                                        <div className="space-y-10 relative z-10">
                                            {post.content.faqs.map((faq, idx) => (
                                                <div key={idx} className="group border-b border-white/5 pb-10 last:border-0">
                                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-4 group-hover:text-accent-cyan transition-colors">
                                                        <span className="text-accent-cyan/20 font-black">0{idx + 1}</span>
                                                        {faq.q}
                                                    </h3>
                                                    <p className="text-white/40 font-medium pl-10 leading-relaxed">{faq.a}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-lg text-white/60 space-y-12">
                                <div className="text-2xl text-white font-bold mb-16 italic relative pl-12 py-4">
                                    <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-primary-purple to-accent-cyan rounded-full" />
                                    "{post.description}"
                                </div>

                                <h2 className="text-3xl md:text-5xl font-bold text-white mt-16 tracking-tight">Strategic Framework by <span className="text-gradient-purple">CoreSlash</span></h2>
                                <p>
                                    CoreSlash Technologies, established at the convergence of engineering excellence and digital strategy, 
                                    operates as a global catalyst for enterprise transformation. Our laboratories in Bangalore, 
                                    Belagavi, and Hubli are dedicated to architecting high-velocity digital assets.
                                </p>

                                <div className="glass-card rounded-[3rem] p-6 md:p-12 border-white/5 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-primary-purple/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <h3 className="text-xl font-bold text-white mb-8 tracking-widest uppercase">Systemic Protocols:</h3>
                                    <ul className="space-y-6">
                                        {[
                                            "Bespoke Search Architecture Optimization",
                                            "Regional Market Logic Integration (Gadag, Belagavi, Hubli)",
                                            "Targeted PPC Velocity Scaling (Mysore, Mangalore, Tumkur)",
                                            "High-Authority Category Dominance Protocols"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-4 text-white/40 group-hover:text-white/60 transition-colors">
                                                <div className="w-6 h-6 rounded-full bg-accent-cyan/10 flex items-center justify-center shrink-0">
                                                    <SparklesIcon className="w-3 h-3 text-accent-cyan" />
                                                </div>
                                                <span className="font-bold text-sm tracking-wide">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <p className="pt-8 border-t border-white/5">
                                    Our telemetry confirms that consistent innovation across Karnataka's industrial hubs—including 
                                    Mysore, Tumkur, and Mangalore—is the primary driver of market authority.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </article>

            <BlogCTA />
        </div>
    );
};

export default BlogDetailPage;


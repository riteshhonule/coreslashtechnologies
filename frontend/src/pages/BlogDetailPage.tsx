import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../data/blogData";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon, ArrowLeftIcon, ShareIcon, UserIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { Copy, Linkedin, Twitter, Facebook, Check } from "lucide-react";
import BlogCTA from "../components/blog/BlogCTA";

const BlogDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = blogPosts.find(p => p.slug === slug);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [shareUrl, setShareUrl] = useState("");
    const shareDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setShareUrl(window.location.href);
        }
    }, [slug]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target as Node)) {
                setIsShareOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#F9FAFB] text-gray-900">
                <SparklesIcon className="w-16 h-16 text-secondary-indigo mb-6 animate-pulse" />
                <h1 className="text-4xl font-bold mb-4 tracking-tight">Intelligence Not Found</h1>
                <Link to="/blog" className="text-secondary-indigo font-bold hover:underline flex items-center gap-2">
                    <ArrowLeftIcon className="w-5 h-5" /> Back to Matrix
                </Link>
            </div>
        );
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy link: ", err);
        }
    };

    const shareLinkedIn = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank", "noopener,noreferrer");
    };

    const shareTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`, "_blank", "noopener,noreferrer");
    };

    const shareFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="relative min-h-screen bg-[#F9FAFB] pt-0 overflow-hidden text-gray-900">
            {/* GLOWS */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-purple/3 rounded-full blur-[140px] pointer-events-none" />
            
            <article className="max-w-5xl mx-auto px-6 pt-16 pb-12 relative z-10">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 1, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-secondary-indigo animate-pulse" />
                        <span className="text-secondary-indigo text-xs font-bold uppercase tracking-[0.4em]">
                            {post.category}
                        </span>
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 border-y border-gray-200/60 mb-16 relative">
                        {/* Left Side: Author */}
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-primary-purple/10 border border-primary-purple/20 flex items-center justify-center text-secondary-indigo font-bold text-xl shrink-0">
                                {post.author[0]}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900 tracking-wide uppercase">{post.author}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 text-gradient-cyan">System Architect</p>
                            </div>
                        </div>
                        
                        {/* Right Side: Date, Verified & Share button grouped together */}
                        <div className="flex flex-wrap items-center gap-6 md:gap-8 text-gray-500">
                            <div className="flex items-center gap-2.5">
                                <CalendarIcon className="w-4.5 h-4.5 text-secondary-indigo" />
                                <p className="text-xs font-bold uppercase tracking-widest">{post.date}</p>
                            </div>

                            <div className="flex items-center gap-2.5">
                                <UserIcon className="w-4.5 h-4.5 text-secondary-indigo" />
                                <p className="text-xs font-bold uppercase tracking-widest">Verified Article</p>
                            </div>

                            {/* Share button inline */}
                            <div className="relative shrink-0" ref={shareDropdownRef}>
                                <button
                                    onClick={() => setIsShareOpen(!isShareOpen)}
                                    className={`w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white border flex items-center justify-center transition-all group shadow-sm ${
                                        isShareOpen 
                                            ? "border-secondary-indigo bg-secondary-indigo/5 text-secondary-indigo scale-95" 
                                            : "border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-secondary-indigo"
                                    }`}
                                    aria-expanded={isShareOpen}
                                    aria-label="Share this article"
                                >
                                    <ShareIcon className="w-4.5 h-4.5 transition-transform group-hover:scale-110" />
                                </button>
                                
                                <AnimatePresence>
                                    {isShareOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 mt-2 w-56 bg-white border border-gray-200/80 rounded-2xl shadow-xl z-50 overflow-hidden py-1.5 focus:outline-none"
                                        >
                                            <button
                                                onClick={copyToClipboard}
                                                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors font-medium border-b border-gray-100 cursor-pointer"
                                            >
                                                {isCopied ? (
                                                    <>
                                                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                                                        <span className="text-emerald-600 font-semibold">Link Copied!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-4 h-4 text-gray-400 shrink-0" />
                                                        <span>Copy Link</span>
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                onClick={shareLinkedIn}
                                                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors font-medium cursor-pointer"
                                            >
                                                <Linkedin className="w-4 h-4 text-[#0A66C2] shrink-0" />
                                                <span>Share on LinkedIn</span>
                                            </button>
                                            <button
                                                onClick={shareTwitter}
                                                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors font-medium cursor-pointer"
                                            >
                                                <Twitter className="w-4 h-4 text-[#1DA1F2] shrink-0" />
                                                <span>Share on Twitter / X</span>
                                            </button>
                                            <button
                                                onClick={shareFacebook}
                                                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors font-medium cursor-pointer"
                                            >
                                                <Facebook className="w-4 h-4 text-[#1877F2] shrink-0" />
                                                <span>Share on Facebook</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </motion.header>

                {/* Featured Image */}
                <motion.div
                    initial={{ opacity: 1, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="max-w-3xl mx-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-16 relative group shadow-lg"
                >
                    <div className="absolute inset-0 bg-primary-purple/5 blur-3xl rounded-[3rem] -z-10 group-hover:bg-primary-purple/10 transition-all duration-1000" />
                    <img src={post.image} alt={post.title} className="w-full h-[300px] md:h-[450px] object-cover transition-all duration-1000 scale-[1.01]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
                </motion.div>

                {/* Content Body */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-gray-700 leading-relaxed font-medium space-y-12">
                        {post.content ? (
                            <>
                                <div className="text-2xl text-gray-900 font-bold mb-20 italic relative pl-12 py-4">
                                    <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-primary-purple to-secondary-indigo rounded-full" />
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
                                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-16 mb-10 tracking-tight">{section.title}</h2>
                                        {section.isBullet ? (
                                            <ul className="space-y-6">
                                                {(Array.isArray(section.content) ? section.content : [section.content]).map((item, i) => (
                                                    <li key={i} className="flex items-start gap-4 text-gray-600 text-lg">
                                                        <div className="w-2 h-2 rounded-full bg-secondary-indigo mt-3 shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="space-y-8 text-lg text-gray-600">
                                                {(Array.isArray(section.content) ? section.content : [section.content]).map((para, i) => (
                                                    <p key={i} className="leading-relaxed">{para}</p>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}

                                {post.content.faqs && post.content.faqs.length > 0 && (
                                    <div className="mt-16 md:mt-32 p-6 md:p-20 bg-white border border-gray-200/60 shadow-xl shadow-gray-200/30 rounded-[4rem] relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-12 text-gray-100 text-9xl font-black">FAQ</div>
                                        <h2 className="text-4xl font-bold text-gray-900 mb-16 relative z-10 tracking-tight">Frequently Asked <span className="text-gradient-cyan">Intelligence</span></h2>
                                        <div className="space-y-10 relative z-10">
                                            {post.content.faqs.map((faq, idx) => (
                                                <div key={idx} className="group border-b border-gray-100 pb-10 last:border-0">
                                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-4 group-hover:text-secondary-indigo transition-colors">
                                                        <span className="text-secondary-indigo/20 font-black">0{idx + 1}</span>
                                                        {faq.q}
                                                    </h3>
                                                    <p className="text-gray-500 font-medium pl-10 leading-relaxed">{faq.a}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-lg text-gray-600 space-y-12">
                                <div className="text-2xl text-gray-900 font-bold mb-16 italic relative pl-12 py-4">
                                    <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-primary-purple to-secondary-indigo rounded-full" />
                                    "{post.description}"
                                </div>

                                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-16 tracking-tight">Strategic Framework by <span className="text-gradient-purple">CoreSlash</span></h2>
                                <p>
                                    CoreSlash Technologies, established at the convergence of engineering excellence and digital strategy, 
                                    operates as a global catalyst for enterprise transformation. Our laboratories in 
                                    Belagavi and Hubli are dedicated to architecting high-velocity digital assets.
                                </p>

                                <div className="bg-white border border-gray-200/60 shadow-md shadow-gray-200/30 rounded-[3rem] p-6 md:p-12 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-primary-purple/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <h3 className="text-xl font-bold text-gray-900 mb-8 tracking-widest uppercase">Systemic Protocols:</h3>
                                    <ul className="space-y-6">
                                        {[
                                            "Bespoke Search Architecture Optimization",
                                            "Regional Market Logic Integration (Gadag, Belagavi, Hubli)",
                                            "Targeted PPC Velocity Scaling (Mysore, Mangalore, Tumkur)",
                                            "High-Authority Category Dominance Protocols"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-4 text-gray-500 group-hover:text-gray-750 transition-colors">
                                                <div className="w-6 h-6 rounded-full bg-secondary-indigo/10 flex items-center justify-center shrink-0">
                                                    <SparklesIcon className="w-3 h-3 text-secondary-indigo" />
                                                </div>
                                                <span className="font-bold text-sm tracking-wide">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <p className="pt-8 border-t border-gray-200/60 text-gray-500">
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


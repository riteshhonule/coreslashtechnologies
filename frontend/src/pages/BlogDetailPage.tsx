import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../data/blogData";
import { motion } from "framer-motion";
import { CalendarIcon, ArrowLeftIcon, ShareIcon } from "@heroicons/react/24/outline";
import BlogCTA from "../components/blog/BlogCTA";

import ReviewSection from "../components/ReviewSection";

const BlogDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = blogPosts.find(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                <Link to="/blog" className="text-blue-600 font-bold hover:underline flex items-center gap-2">
                    <ArrowLeftIcon className="w-5 h-5" /> Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="h-24 md:h-32 bg-white w-full" />

            <article className="max-w-4xl mx-auto px-6 py-12">
                {/* Back to Blog */}
                <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-black text-sm uppercase tracking-widest mb-12 transition-colors">
                    <ArrowLeftIcon className="w-5 h-5" /> Back to Insights
                </Link>

                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <span className="text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-4 block">
                        {post.category}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 py-8 border-y border-slate-100 mb-12">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                {post.author[0]}
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-900">{post.author}</p>
                                <p className="text-xs font-medium text-slate-400">Industry Expert</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-slate-400">
                            <CalendarIcon className="w-5 h-5" />
                            <p className="text-sm font-medium">{post.date}</p>
                        </div>
                        <button className="ml-auto w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-500">
                            <ShareIcon className="w-5 h-5" />
                        </button>
                    </div>
                </motion.header>

                {/* Featured Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-[3rem] overflow-hidden mb-16 shadow-2xl"
                >
                    <img src={post.image} alt={post.title} className="w-full h-auto" />
                </motion.div>

                {/* Dynamic Content */}
                <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed font-medium">
                    {post.content ? (
                        <>
                            <p className="text-xl text-slate-900 font-bold mb-12 italic border-l-4 border-blue-600 pl-6 leading-relaxed">
                                {post.content.intro}
                            </p>

                            {post.content.sections.map((section, idx) => (
                                <div key={idx} className="mb-12">
                                    <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">{section.title}</h2>
                                    {section.isBullet ? (
                                        <ul className="list-disc pl-6 space-y-3">
                                            {(Array.isArray(section.content) ? section.content : [section.content]).map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="space-y-4">
                                            {(Array.isArray(section.content) ? section.content : [section.content]).map((para, i) => (
                                                <p key={i}>{para}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {post.content.faqs && post.content.faqs.length > 0 && (
                                <div className="mt-20 p-8 md:p-12 bg-slate-50 rounded-[3rem] border border-slate-100">
                                    <h2 className="text-3xl font-black text-slate-900 mb-10">Frequently Asked Questions</h2>
                                    <div className="space-y-8">
                                        {post.content.faqs.map((faq, idx) => (
                                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                                <h3 className="text-lg font-black text-slate-900 mb-3">{faq.q}</h3>
                                                <p className="text-slate-600 font-medium">{faq.a}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <p className="text-xl text-slate-900 font-bold mb-8 italic border-l-4 border-blue-600 pl-6 leading-relaxed">
                                {post.description}
                            </p>

                            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Expert Insights from Infotelia IT Solutions</h2>
                            <p className="mb-8">
                                Infotelia IT Solutions, based in Bangalore, Belagavi, and Hubli, has been at the forefront of digital transformation.
                                As the best digital marketing company in Bangalore, we've seen how businesses in India are evolving to adopt newer technologies like AI and advanced SEO strategies.
                            </p>

                            <p className="mb-8">
                                Our approach as a leading web development company in Bangalore is to not just build a website, but to create a high-converting digital asset.
                                Whether you are looking for an SEO company in Bangalore or a digital marketing agency in India, the key is data-driven decision making.
                            </p>

                            <div className="bg-slate-50 rounded-3xl p-8 mb-12 border border-slate-100">
                                <h3 className="text-xl font-black text-slate-900 mb-4">Key Takeaways:</h3>
                                <ul className="list-disc pl-6 space-y-3 text-sm font-semibold">
                                    <li>Focus on location-based keywords like "Best Web Development Company in Bangalore".</li>
                                    <li>Optimize for regional markets including Gadag, Belagavi, and Hubli.</li>
                                    <li>Scale your reach in Mysore, Mangalore, and Tumkur with targeted PPC.</li>
                                    <li>Establish authority as the Best Digital Marketing Agency in Bangalore and beyond.</li>
                                </ul>
                            </div>

                            <p>
                                Stay tuned for more updates from our tech team. We continue to innovate and deliver excellence across Karnataka, including Mysore, Tumkur, and Mangalore.
                            </p>
                        </>
                    )}
                </div>
            </article>

            <ReviewSection />
            <BlogCTA />
        </div>
    );
};

export default BlogDetailPage;

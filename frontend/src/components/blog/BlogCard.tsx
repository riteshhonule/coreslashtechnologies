import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { type BlogPost } from "../../data/blogData";
import { CalendarIcon, UserIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group block bg-white rounded-[2.5rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.05)] border border-slate-100 hover:border-blue-500/30 transition-all duration-500 relative"
        >
            {/* Image Section */}
            <div className="relative aspect-[16/10] overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category Badge */}
                <span className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-sm border border-white/50">
                    {post.category}
                </span>
            </div>

            {/* Content Section */}
            <div className="p-8">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-slate-400 text-xs font-semibold mb-4">
                    <div className="flex items-center gap-1.5">
                        <UserIcon className="w-4 h-4" />
                        {post.author}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <CalendarIcon className="w-4 h-4" />
                        {post.date}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-snug">
                    {post.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                    {post.description}
                </p>

                <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest group/btn"
                >
                    Read More
                    <span className="relative w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-all duration-300">
                        <ArrowRightIcon className="w-4 h-4" />
                    </span>
                </Link>
            </div>

            {/* Hover Gradient Border Decoration */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-700 group-hover:w-full" />
        </motion.div>
    );
};

export default BlogCard;

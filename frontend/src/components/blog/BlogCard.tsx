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
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0, margin: "200px" }}
            transition={{ delay: index * 0.05 }}
            className="group block bg-white rounded-[3rem] overflow-hidden border border-gray-300 hover:border-secondary-indigo/30 shadow-md shadow-gray-200/10 hover:shadow-lg transition-all duration-700 relative"
        >
            <Link to={`/blog/${post.slug}`} className="block">
                {/* Image Section */}
                <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        width={800}
                        height={500}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent opacity-60" />

                    {/* Category Badge */}
                    <span className="absolute top-6 left-6 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-secondary-indigo border border-gray-200/50 shadow-sm">
                        {post.category}
                    </span>
                </div>

                {/* Content Section */}
                <div className="p-10">
                    {/* Meta Info */}
                    <div className="flex items-center gap-6 text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-secondary-indigo" />
                            {post.author}
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-secondary-indigo" />
                            {post.date}
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-secondary-indigo transition-colors duration-500 leading-tight tracking-tight">
                        {post.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed mb-10 line-clamp-2 font-medium">
                        {post.description}
                    </p>

                    <div className="inline-flex items-center gap-4 text-secondary-indigo font-black text-xs uppercase tracking-[0.2em] group/btn">
                        Explore Intelligence
                        <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover/btn:bg-secondary-indigo group-hover/btn:text-white transition-all duration-500 transform group-hover/btn:translate-x-2">
                            <ArrowRightIcon className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default BlogCard;


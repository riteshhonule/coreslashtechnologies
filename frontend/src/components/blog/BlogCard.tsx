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
            className="group block glass-card rounded-[3rem] overflow-hidden border-white/5 hover:border-accent-cyan/20 transition-all duration-700 relative"
        >
            <Link to={`/blog/${post.slug}`} className="block">
                {/* Image Section */}
                <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-transparent to-transparent opacity-60" />

                    {/* Category Badge */}
                    <span className="absolute top-6 left-6 px-4 py-2 bg-dark-black/60 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-accent-cyan border border-white/10">
                        {post.category}
                    </span>
                </div>

                {/* Content Section */}
                <div className="p-10">
                    {/* Meta Info */}
                    <div className="flex items-center gap-6 text-white/30 text-[10px] font-bold uppercase tracking-widest mb-6">
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-primary-purple" />
                            {post.author}
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-primary-purple" />
                            {post.date}
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 group-hover:text-accent-cyan transition-colors duration-500 leading-tight tracking-tight">
                        {post.title}
                    </h3>

                    <p className="text-white/40 text-sm leading-relaxed mb-10 line-clamp-2 font-medium">
                        {post.description}
                    </p>

                    <div className="inline-flex items-center gap-4 text-accent-cyan font-black text-xs uppercase tracking-[0.2em] group/btn">
                        Explore Intelligence
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:bg-accent-cyan group-hover/btn:text-dark-black transition-all duration-500 transform group-hover/btn:translate-x-2">
                            <ArrowRightIcon className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default BlogCard;


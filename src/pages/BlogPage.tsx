import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Search, Clock, ArrowRight, ChevronDown, X } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogData";
import { Input } from "@/components/ui/input";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Articles");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const categories = ["All Articles", "Web Development", "SEO Strategy", "Software Systems", "Tech Trends"];

  const featuredPost = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === "All Articles" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Helmet>
        <title>Blog & Tech Insights | CoreSlash Technologies</title>
        <meta 
          name="description" 
          content="Explore technical articles, web development guides, local SEO strategies, and software insights from CoreSlash Technologies." 
        />
        <link rel="canonical" href="https://www.coreslash.com/blog" />
      </Helmet>

      {/* 1. Hero Banner */}
      <section className="relative w-full pt-8 pb-12 md:pt-12 md:pb-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto overflow-hidden">
        <div className="relative z-10 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden">
          
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400 text-xs font-black tracking-widest uppercase shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>CORESLASH INSIGHTS & BLOG</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Engineering Insights & <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">Digital Strategy</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
              In-depth articles, web development guides, SEO strategies, and technology trends published by our engineering team.
            </p>

            {/* Instant Search Bar */}
            <div className="relative max-w-md pt-2">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-4 h-4 text-blue-400 pointer-events-none z-10" />
                <Input
                  type="text"
                  placeholder="Search articles by topic or keyword..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(6);
                  }}
                  className="h-12 pl-11 pr-10 rounded-full bg-slate-900/90 border-slate-800 text-white placeholder:text-slate-400 text-sm font-medium shadow-inner backdrop-blur-xl focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/50"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-10"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Featured Spotlight Article */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
        <div className="flex flex-col items-start gap-2 mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Featured Article</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative rounded-3xl bg-white dark:bg-slate-900 border border-border/80 shadow-xl hover:shadow-2xl hover:border-blue-500/40 transition-all duration-500 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        >
          <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-auto overflow-hidden bg-slate-950">
            <img 
              src={featuredPost.coverImage} 
              alt={featuredPost.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-extrabold uppercase shadow-md">
                {featuredPost.category}
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-semibold">
                <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                  <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                </span>
                <span>•</span>
                <span>{featuredPost.publishDate}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-foreground leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {featuredPost.title}
              </h3>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {featuredPost.summary}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-end border-t border-border/40">
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Category Filter & Blog Articles Grid */}
      <section className="w-full py-16 border-t border-border/40 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600/10 border-l-4 border-blue-600 text-blue-600 text-xs font-extrabold tracking-wider uppercase">
              LATEST ARTICLES
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">Explore Recent Posts</h2>
          </div>

          {/* Filter Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleCount(6);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {displayedPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 border border-border/80 shadow-md hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 p-6 overflow-hidden"
              >
                {/* Image Box */}
                <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-6 bg-slate-950 border border-border/40">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-md bg-slate-900/90 text-white text-[11px] font-black uppercase tracking-wider border border-white/10 backdrop-blur-md">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
                      <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime}
                      </span>
                      <span>{post.publishDate}</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  {/* Read Article Trigger */}
                  <div className="pt-4 border-t border-border/40 mt-auto flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">CORESLASH</span>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-xs font-black text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 group/btn"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {visibleCount < filteredPosts.length && (
          <div className="mt-12 text-center flex justify-center">
            <button
              onClick={() => setVisibleCount(filteredPosts.length)}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 group cursor-pointer"
            >
              <span>Load More Articles</span>
              <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}
      </section>

      {/* 4. Call to Action Banner */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[3rem] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-10 md:p-16 text-center text-white relative overflow-hidden border border-slate-800 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Need Custom Web Development or SEO Growth?</h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              Consult with our engineering team to design, build, and optimize high-performing software platforms.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-base hover:from-blue-700 hover:to-indigo-700 transition-all shadow-xl hover:shadow-2xl hover:shadow-blue-500/30">
              <span>Schedule Discovery Call</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

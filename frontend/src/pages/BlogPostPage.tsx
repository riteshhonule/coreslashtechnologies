import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Clock, Calendar, Share2, 
  Sparkles, CheckCircle2, ArrowRight, BookOpen, MessageSquare, Zap
} from "lucide-react";
import { BLOG_POSTS } from "@/data/blogData";
import { Button } from "@/components/ui/button";
import { OverlappingImageCard } from "@/components/ui/OverlappingImageCard";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="py-28 px-6 text-center max-w-[1200px] mx-auto space-y-6">
        <Helmet>
          <title>Blog Post Not Found | CoreSlash Technologies</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <h1 className="text-4xl font-black text-foreground">Blog Post Not Found</h1>
        <p className="text-muted-foreground text-base">The article you are looking for does not exist or has been moved.</p>
        <Link to="/blog">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold rounded-xl">
            Return to Blog Insights
          </Button>
        </Link>
      </div>
    );
  }

  const sameCategoryPosts = BLOG_POSTS.filter(p => p.id !== post.id && p.category === post.category);
  const otherCategoryPosts = BLOG_POSTS.filter(p => p.id !== post.id && p.category !== post.category);
  const relatedPosts = [...sameCategoryPosts, ...otherCategoryPosts].slice(0, 3);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "image": post.coverImage,
    "datePublished": post.publishDate,
    "author": {
      "@type": "Organization",
      "name": "CoreSlash Technologies",
      "url": "https://coreslashtechnologies.com/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CoreSlash Technologies",
      "logo": {
        "@type": "ImageObject",
        "url": "https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://coreslashtechnologies.com/blog/${post.slug}`
    }
  };

  return (
    <article className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-hidden">
      <Helmet>
        <title>{`${post.title} | CoreSlash Technologies`}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={`https://coreslashtechnologies.com/blog/${post.slug}`} />
        
        {/* Open Graph SEO */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:image" content={post.coverImage} />
        <meta property="og:url" content={`https://coreslashtechnologies.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="CoreSlash Technologies" />
        
        {/* Twitter Card SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={post.coverImage} />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
      </Helmet>

      {/* CORESLASH WATERMARK BACKGROUND TEXT */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-full max-w-[1600px] flex items-center justify-center pointer-events-none select-none opacity-5 dark:opacity-[0.03] z-0 overflow-hidden">
        <span className="text-[12rem] sm:text-[18rem] md:text-[22rem] font-black uppercase text-slate-900 dark:text-white tracking-tighter whitespace-nowrap">
          CORESLASH
        </span>
      </div>

      {/* 1. Full-Width Hero Section */}
      <section className="relative z-10 w-full pt-6 pb-12 md:pt-10 md:pb-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto overflow-hidden">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden">
          
          {/* Subtle Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Back Navigation Button */}
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-blue-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          <div className="space-y-6 max-w-4xl">
            {/* Meta Category & Timestamps */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400 text-xs font-black uppercase tracking-wider shadow-sm">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-300 font-semibold">
                <Clock className="w-3.5 h-3.5 text-blue-400" /> {post.readTime}
              </span>
              <span className="text-xs text-slate-300 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-blue-400 inline mr-1" /> {post.publishDate}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              {post.title}
            </h1>

            {/* Hero Share Action */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                CORESLASH ENGINEERING INSIGHTS
              </span>

              <button 
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Article link copied to clipboard!");
                  }
                }}
                className="p-2.5 rounded-xl border border-slate-700 bg-slate-900/80 text-slate-300 hover:text-white hover:border-blue-500 transition-colors inline-flex items-center gap-2 text-xs font-bold"
                title="Share Article"
              >
                <Share2 className="w-4 h-4 text-blue-400" />
                <span>Share Article</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Full-Width 2-Column Article Reader Layout */}
      <section className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Main Article Content Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* High-Res Featured Cover Image with Overlapping Dual Card Design */}
            <div className="w-full pb-6 sm:pb-8 flex justify-center">
              <OverlappingImageCard
                primaryImage={post.coverImage}
                secondaryImage="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&auto=format&fit=crop&q=80"
                altText={post.title}
                badgeText="CoreSlash Insights"
              />
            </div>

            {/* Intro Lead Paragraph Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-muted/30 border-l-4 border-blue-600 shadow-sm">
              <p className="text-lg sm:text-xl font-medium text-foreground dark:text-slate-100 leading-relaxed">
                {post.content.intro}
              </p>
            </div>

            {/* Article Content Sections */}
            <div className="space-y-8 text-base sm:text-lg text-foreground/90 dark:text-slate-200 leading-relaxed font-normal">
              {post.content.sections.map((section, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-border/70 shadow-sm space-y-4"
                >
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground dark:text-white tracking-tight flex items-center gap-2">
                    <span className="w-2 h-6 bg-blue-600 rounded-full inline-block" />
                    <span>{section.heading}</span>
                  </h2>
                  
                  <p className="text-muted-foreground dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                    {section.body}
                  </p>

                  {section.table && (
                    <div className="overflow-x-auto my-4 rounded-2xl border border-border/70 shadow-inner">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-slate-950 text-white font-extrabold">
                          <tr>
                            {section.table.headers.map((th, thIdx) => (
                              <th key={thIdx} className="px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-800">{th}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60 bg-muted/20">
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-muted/50 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-4 py-3 sm:px-6 sm:py-4 text-foreground/90 dark:text-slate-200 font-medium">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {section.bulletPoints && (
                    <div className="space-y-3 pt-3 pl-2 border-t border-border/40">
                      {section.bulletPoints.map((bp, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-3 text-sm sm:text-base text-foreground/90 dark:text-slate-200 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                          <span>{bp}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Related Service Internal Links Bar */}
              {post.content.relatedServices && post.content.relatedServices.length > 0 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-blue-500/10 border border-blue-500/20 space-y-4">
                  <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                    EXPLORE RELATED CORESLASH SERVICES
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {post.content.relatedServices.map((srv, sIdx) => (
                      <Link 
                        key={sIdx} 
                        to={srv.path}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-extrabold shadow-md transition-all"
                      >
                        <span>{srv.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Article FAQs Section */}
              {post.content.faqs && post.content.faqs.length > 0 && (
                <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-border/80 shadow-sm space-y-6">
                  <h3 className="text-2xl font-extrabold text-foreground dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span>Frequently Asked Questions</span>
                  </h3>
                  <div className="space-y-4">
                    {post.content.faqs.map((faq, fIdx) => (
                      <div key={fIdx} className="p-5 rounded-2xl bg-muted/30 border border-border/50 space-y-2">
                        <h4 className="text-base font-extrabold text-foreground dark:text-white">{faq.question}</h4>
                        <p className="text-sm text-muted-foreground dark:text-slate-300 font-normal leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Takeaway Box */}
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white space-y-4 shadow-2xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex items-center gap-2 text-xs font-black tracking-widest text-blue-400 uppercase">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>KEY TAKEAWAY & EXECUTIVE SUMMARY</span>
                </div>
                <p className="relative z-10 text-slate-200 text-base sm:text-xl leading-relaxed font-semibold">
                  "{post.content.keyTakeaway}"
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-8">
              
              {/* Talk to Engineers CTA Box */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white space-y-5 border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400 text-[11px] font-black uppercase">
                  <Zap className="w-3.5 h-3.5" />
                  <span>CUSTOM SOLUTIONS</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  Need Custom Software or SEO Strategy?
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Schedule a technical discovery session with our engineering architects to design your custom application.
                </p>

                <Link to="/contact" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all">
                  <MessageSquare className="w-4 h-4" />
                  <span>Book Free Consultation</span>
                </Link>
              </div>

              {/* Related Articles Widget */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-border/80 shadow-md space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-border/40">
                  <h3 className="text-base font-black text-foreground dark:text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Trending Articles
                  </h3>
                  <Link to="/blog" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                    View All
                  </Link>
                </div>

                <div className="space-y-4">
                  {relatedPosts.map(rel => (
                    <Link key={rel.id} to={`/blog/${rel.slug}`} className="group flex items-start gap-3 p-2 rounded-xl hover:bg-muted/40 transition-colors">
                      <img src={rel.coverImage} alt={rel.title} className="w-16 h-16 rounded-xl object-cover shrink-0 border bg-slate-950" />
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 block">{rel.category}</span>
                        <h4 className="text-xs font-bold text-foreground dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                          {rel.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. Full-Width Bottom Recommendations Grid */}
      <section className="relative z-10 w-full py-16 border-t border-border/40 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black text-foreground dark:text-white">More Recommended Reading</h3>
          <Link to="/blog" className="text-xs sm:text-sm font-extrabold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            <span>Explore All 34 Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPosts.map(rel => (
            <Link key={rel.id} to={`/blog/${rel.slug}`} className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-border/80 shadow-md hover:shadow-xl hover:border-blue-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-950 border border-border/40">
                  <img src={rel.coverImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400">{rel.category}</span>
                <h4 className="text-lg font-extrabold text-foreground dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">{rel.title}</h4>
              </div>
              <div className="pt-4 border-t border-border/40 mt-4 flex items-center justify-between text-xs text-muted-foreground dark:text-slate-400 font-semibold">
                <span>{rel.publishDate}</span>
                <span className="text-blue-600 dark:text-blue-400 font-black flex items-center gap-1">Read Post <ArrowRight className="w-3.5 h-3.5" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

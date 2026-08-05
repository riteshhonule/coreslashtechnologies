import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const AboutHeroSection: React.FC = () => {
  return (
    <section className="relative w-full pt-4 md:pt-6 pb-8 md:pb-12 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto overflow-hidden bg-background text-foreground">
      
      {/* Breadcrumb Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4 sm:mb-6 select-none"
      >
        <Link to="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span className="text-muted-foreground/60">&gt;</span>
        <span className="text-blue-600 font-semibold">
          About Us
        </span>
      </motion.div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Office Image inside sleek background frame */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 relative w-full flex justify-center"
        >
          {/* Background Card Frame Container */}
          <div className="relative w-full max-w-[540px] bg-slate-100 dark:bg-slate-900/60 rounded-[2.5rem] p-4 sm:p-5 border border-border/50 shadow-sm">
            
            {/* Top-Right Decorative Dot Matrix */}
            <div className="absolute -top-4 -right-4 w-24 h-24 pointer-events-none opacity-60 z-0 hidden sm:block">
              <svg width="100%" height="100%" fill="none">
                <pattern id="dot-pattern-about" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="2" className="fill-blue-600/40" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#dot-pattern-about)" />
              </svg>
            </div>

            {/* Main Image */}
            <div className="relative z-10 overflow-hidden rounded-[2rem] shadow-lg border border-border/40 aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/5] bg-muted">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&auto=format&fit=crop&q=80"
                alt="Modern IT office workspace"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </motion.div>

        {/* Right Column: Heading, About Tag & Detailed Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="lg:col-span-7 flex flex-col items-start space-y-5"
        >
          {/* About Us Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-blue-600/10 border-l-4 border-blue-600 text-blue-600 text-xs sm:text-sm font-semibold tracking-wide uppercase select-none">
            About Us
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold tracking-tight text-foreground leading-[1.2]">
            Empowering Businesses Through{" "}
            <span className="text-blue-600">Innovative Software</span>
          </h1>

          {/* Paragraph 1 */}
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-normal">
            As digital innovators, we have embraced technological advancement and modern business transformation, helping brands adapt to the evolving digital landscape. Since our beginning, we have focused on delivering innovative software solutions, strategic digital services, and performance-driven technologies that help businesses stay competitive and future-ready.
          </p>

          {/* Paragraph 2 */}
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-normal">
            Whether you need a high-performing eCommerce website, custom CMS development, or integrated digital marketing solutions to engage modern audiences, our experienced team delivers measurable results. Our design, development, and communication experts work collaboratively to help businesses increase sales, strengthen brand visibility, improve customer engagement, and drive meaningful business growth through innovative digital experiences.
          </p>

          {/* Call to Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/25 group text-center"
            >
              <span>Our Work Portfolio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border/80 text-foreground text-sm font-medium hover:border-foreground/40 hover:bg-muted/40 transition-all duration-300 text-center"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutHeroSection;

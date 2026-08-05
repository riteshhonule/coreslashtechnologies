import AnimatedMarqueeHero from "@/components/Hero";
import ExpandableGallery, { NINE_DEMO_IMAGES } from "@/components/ExpandableGallery";
import FanCarouselSection from "@/components/FanCarouselSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

import awsImg from "@/img/hero/CoreSlash Technologies  Aws.png";
import aiDevelopmentImg from "@/img/hero/CoreSlash Technologies AI Development.png";
import appDevelopmentImg from "@/img/hero/CoreSlash Technologies App Development.png";
import cloudImg from "@/img/hero/CoreSlash Technologies Cloud .png";
import cloudflareImg from "@/img/hero/CoreSlash Technologies Cloudflare.png";
import cyberSecurityImg from "@/img/hero/CoreSlash Technologies Cyber Security.png";
import digitalTransformationImg from "@/img/hero/CoreSlash Technologies Digital Transformation Framework.jpg";
import erpImg from "@/img/hero/CoreSlash Technologies ERP Development.png";
import iosDevelopmentImg from "@/img/hero/CoreSlash Technologies IOS Development.png";
import pythonDevelopmentImg from "@/img/hero/CoreSlash Technologies Python Development.jpg";
import softwareDevelopmentImg from "@/img/hero/CoreSlash Technologies Software Development.png";

import aboutTopImg from "@/img/about us/CoreSlash Technologies Team Working .avif";
import aboutBottomImg from "@/img/about us/Coreslash Technologies Team Work.jpg";

const heroImages = [
  awsImg,
  aiDevelopmentImg,
  appDevelopmentImg,
  cloudImg,
  cloudflareImg,
  cyberSecurityImg,
  digitalTransformationImg,
  erpImg,
  iosDevelopmentImg,
  pythonDevelopmentImg,
  softwareDevelopmentImg,
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CoreSlash Technologies",
  "url": "https://www.coreslash.com",
  "logo": "https://www.coreslash.com/vite.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9000000000",
    "contactType": "customer service"
  }
};

export default function Home() {
  return (
    <>
      <Helmet>
        <title>CoreSlash Technologies | Enterprise-grade digital solutions</title>
        <meta name="description" content="Top web development and IT solutions company in Belgaum." />
        <link rel="canonical" href="https://www.coreslash.com/" />
        <meta property="og:title" content="CoreSlash Technologies" />
        <meta property="og:description" content="Top web development and IT solutions company in Belgaum." />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      {/* Main Hero Section */}
      <section className="relative w-full">
        <AnimatedMarqueeHero
          tagline="CoreSlash AI & Software Engineering"
          title="AI-powered"
          smallTitle="solutions to Solve Complex Business Problems"
          description="We build intelligent AI solutions, high-scale web platforms, and futuristic SaaS applications for ambitious companies worldwide."
          ctaText="Get Started"
          secondaryCtaText="Book Demo"
          images={heroImages}
        />
      </section>

      {/* 9-Card Interactive Showcase Gallery Section */}
      <section className="py-24 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-border/40">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 mb-4">
            <Sparkles className="w-4 h-4 text-white" />
            <span>All Services</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground text-center">
            Explore Our Digital Services
          </h2>
        </div>

        <ExpandableGallery images={NINE_DEMO_IMAGES} />
      </section>

      {/* GSAP 3D Fanned Card Carousel Section */}
      <FanCarouselSection />

      {/* Technologies We Use Section */}
      <TechnologiesSection />

      {/* Stats and Trust Metrics Section */}
      <StatsSection />



      {/* Book a Free Session Contact Section */}
      <ContactSection />

      {/* About Section */}
      <section className="py-24 px-6 md:px-12 max-w-[1300px] mx-auto border-t border-border/40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Overlapping Dual Images */}
          <div className="relative flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
            {/* Background Top Image */}
            <div className="absolute top-0 left-0 w-[65%] h-[240px] sm:h-[280px] rounded-[24px] overflow-hidden shadow-lg border border-white/40">
              <img
                src={aboutBottomImg}
                alt="CoreSlash Team Space"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Foreground Overlapping Bottom Image */}
            <div className="absolute bottom-0 right-0 w-[70%] h-[250px] sm:h-[290px] rounded-[24px] overflow-hidden shadow-2xl border-4 border-white z-10">
              <img
                src={aboutTopImg}
                alt="CoreSlash Team Working"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Sparkle / Star accent icons */}
            <div className="absolute -top-4 right-12 text-blue-600 z-20 pointer-events-none">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#2563EB" fillOpacity="0.15" />
              </svg>
            </div>
            <div className="absolute -bottom-4 left-6 text-blue-600 z-20 pointer-events-none">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#2563EB" fillOpacity="0.15" />
              </svg>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col items-start text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-md bg-blue-50 border-l-4 border-blue-600 text-xs font-semibold text-blue-700 mb-6">
              About Us
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.25] mb-6">
              AI-Powered Software Company Delivering Scalable{" "}
              <span className="text-blue-600">Innovative Digital Solutions</span>
            </h2>

            {/* Subtext Paragraphs */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4 font-medium">
              AI-Powered Software Company Delivering Scalable Digital Solutions
            </p>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8">
              At CoreSlash Technologies, we help startups, enterprises, and organizations accelerate digital transformation through innovative technology. Our expertise spans <span className="text-slate-800 text-md text-semibold">Custom Software Development, AI Solutions, ERP Systems, Web Development, Mobile Applications, Cloud Solutions, UI/UX Design, SEO, Digital Marketing, and Business Automation.</span>  We build secure, scalable, and high-performance digital products that drive efficiency, growth, and long-term business success.
            </p>

            {/* Button */}
            <a
              href="/about"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300 group"
            >
              <span>Know More</span>
              <div className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}


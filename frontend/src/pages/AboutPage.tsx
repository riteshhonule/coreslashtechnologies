import { Helmet } from "react-helmet-async";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import MissionSection from "@/components/about/MissionSection";
import VisionSection from "@/components/about/VisionSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Helmet>
        <title>About Us | CoreSlash Technologies</title>
        <meta 
          name="description" 
          content="Learn about CoreSlash Technologies, our team, mission, and how we deliver cutting-edge software and web solutions." 
        />
        <link rel="canonical" href="https://coreslashtechnologies.com/about" />
        
        {/* Open Graph SEO */}
        <meta property="og:title" content="About Us | CoreSlash Technologies" />
        <meta property="og:description" content="Learn about CoreSlash Technologies, our team, mission, and how we deliver cutting-edge software and web solutions." />
        <meta property="og:url" content="https://coreslashtechnologies.com/about" />
        <meta property="og:type" content="website" />

        {/* Twitter Card SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | CoreSlash Technologies" />
        <meta name="twitter:description" content="Learn about CoreSlash Technologies, our team, mission, and how we deliver cutting-edge software and web solutions." />
      </Helmet>

      {/* 1. Hero Section */}
      <AboutHeroSection />

      {/* 2. Mission Section */}
      <MissionSection />

      {/* 3. Vision Section */}
      <VisionSection />
    </div>
  );
}

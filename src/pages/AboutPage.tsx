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
        <link rel="canonical" href="https://www.coreslash.com/about" />
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

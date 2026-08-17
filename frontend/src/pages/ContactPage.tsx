import { Helmet } from "react-helmet-async";
import { ContactSection } from "@/components/ui/contact";
import { SocialConnect } from "@/components/ui/connect-with-us";

export default function ContactPage() {
  const handleFormSubmit = (data: any) => {
    console.log("Contact form data submitted:", data);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Contact Us | CoreSlash Technologies</title>
        <meta name="description" content="Contact CoreSlash Technologies in Belagavi for web development, mobile apps, AI automation, software solutions, SEO, and digital services." />
        <link rel="canonical" href="https://coreslashtechnologies.com/contact" />
        
        {/* Open Graph SEO */}
        <meta property="og:title" content="Contact Us | CoreSlash Technologies" />
        <meta property="og:description" content="Contact CoreSlash Technologies in Belagavi for web development, mobile apps, AI automation, software solutions, SEO, and digital services." />
        <meta property="og:url" content="https://coreslashtechnologies.com/contact" />
        <meta property="og:type" content="website" />

        {/* Twitter Card SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | CoreSlash Technologies" />
        <meta name="twitter:description" content="Contact CoreSlash Technologies in Belagavi for web development, mobile apps, AI automation, software solutions, SEO, and digital services." />
      </Helmet>

      <ContactSection
        title="We can turn your dream project into reality"
        mainMessage="Let's talk! 👋"
        contactEmail="contact@coreslashtechnologies.com"
        onSubmit={handleFormSubmit}
      />

      <SocialConnect />
    </div>
  );
}

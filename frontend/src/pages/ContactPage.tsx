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
        <meta name="description" content="Get in touch with CoreSlash Technologies to discuss your next big digital project." />
        <link rel="canonical" href="https://coreslashtechnologies.com/contact" />
        
        {/* Open Graph SEO */}
        <meta property="og:title" content="Contact Us | CoreSlash Technologies" />
        <meta property="og:description" content="Get in touch with CoreSlash Technologies to discuss your next big digital project." />
        <meta property="og:url" content="https://coreslashtechnologies.com/contact" />
        <meta property="og:type" content="website" />

        {/* Twitter Card SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | CoreSlash Technologies" />
        <meta name="twitter:description" content="Get in touch with CoreSlash Technologies to discuss your next big digital project." />
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

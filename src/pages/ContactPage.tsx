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
        <link rel="canonical" href="https://www.coreslash.com/contact" />
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

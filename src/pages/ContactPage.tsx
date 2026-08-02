import { Helmet } from "react-helmet-async";

export default function Contact() {
  return (
    <div className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-[60vh]">
      <Helmet>
        <title>Contact Us | CoreSlash Technologies</title>
        <meta name="description" content="Get in touch with CoreSlash Technologies to discuss your next big digital project." />
        <link rel="canonical" href="https://www.coreslash.com/contact" />
      </Helmet>
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-muted-foreground">Placeholder content for the Contact page.</p>
    </div>
  );
}

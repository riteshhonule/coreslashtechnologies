import { Helmet } from "react-helmet-async";

export default function ServicesIndex() {
  return (
    <div className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-[60vh]">
      <Helmet>
        <title>Our Services | CoreSlash Technologies</title>
        <meta name="description" content="Discover our wide range of services including Web Development, App Development, and SEO." />
        <link rel="canonical" href="https://www.coreslash.com/services" />
      </Helmet>
      <h1 className="text-4xl font-bold mb-4">Our Services</h1>
      <p className="text-muted-foreground">Placeholder content for the Services Index page.</p>
    </div>
  );
}

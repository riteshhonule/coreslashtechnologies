import { Helmet } from "react-helmet-async";

export default function WebsiteDevelopment() {
  return (
    <div className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-[60vh]">
      <Helmet>
        <title>Website Development | CoreSlash Technologies</title>
        <meta name="description" content="Custom website development services built for performance and scale." />
        <link rel="canonical" href="https://www.coreslash.com/services/website-development" />
      </Helmet>
      <h1 className="text-4xl font-bold mb-4">Website Development</h1>
      <p className="text-muted-foreground">Placeholder content for the Website Development service page.</p>
    </div>
  );
}

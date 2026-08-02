import { Helmet } from "react-helmet-async";

export default function Portfolio() {
  return (
    <div className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-[60vh]">
      <Helmet>
        <title>Our Portfolio | CoreSlash Technologies</title>
        <meta name="description" content="Explore the digital innovations and enterprise products shipped by CoreSlash Technologies." />
        <link rel="canonical" href="https://www.coreslash.com/portfolio" />
      </Helmet>
      <h1 className="text-4xl font-bold mb-4">Our Portfolio</h1>
      <p className="text-muted-foreground">Placeholder content for the Portfolio page.</p>
    </div>
  );
}

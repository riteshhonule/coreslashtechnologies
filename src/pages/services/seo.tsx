import { Helmet } from "react-helmet-async";

export default function SEOOptimization() {
  return (
    <div className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-[60vh]">
      <Helmet>
        <title>SEO Optimization | CoreSlash Technologies</title>
        <meta name="description" content="Data-driven SEO optimization services to rank higher and drive traffic." />
        <link rel="canonical" href="https://www.coreslash.com/services/seo" />
      </Helmet>
      <h1 className="text-4xl font-bold mb-4">SEO Optimization</h1>
      <p className="text-muted-foreground">Placeholder content for the SEO Optimization service page.</p>
    </div>
  );
}

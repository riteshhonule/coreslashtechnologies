import { Helmet } from "react-helmet-async";

export default function EcommerceWebsite() {
  return (
    <div className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-[60vh]">
      <Helmet>
        <title>E-commerce Solutions | CoreSlash Technologies</title>
        <meta name="description" content="Comprehensive E-commerce website development for modern retail." />
        <link rel="canonical" href="https://www.coreslash.com/services/ecommerce" />
      </Helmet>
      <h1 className="text-4xl font-bold mb-4">E-commerce Solutions</h1>
      <p className="text-muted-foreground">Placeholder content for the E-commerce service page.</p>
    </div>
  );
}

import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  type?: string;
  image?: string;
  structuredData?: Record<string, any> | Record<string, any>[];
}

const defaultSEO = {
  title: 'CoreSlash Technologies | IT Solutions, Software Development & AI Systems Company in India',
  description: 'CoreSlash Technologies provides enterprise-grade IT solutions, custom software development, AI systems, web applications, and scalable digital solutions for businesses across India.',
  keywords: 'IT solutions, software development, AI systems, web development, custom software, SaaS development, AI automation, CoreSlash Technologies, Belgaum IT company, India software company',
  type: 'website',
  image: '/coreslash_technologies_url_image.png',
};

const SEO = ({
  title,
  description,
  keywords,
  type = defaultSEO.type,
  image = defaultSEO.image,
  structuredData,
}: SEOProps) => {
  const location = useLocation();
  const currentUrl = `${import.meta.env.VITE_APP_URL || 'https://coreslashtechnologies.com'}${location.pathname}`;

  const seoTitle = title ? `${title} | CoreSlash Technologies` : defaultSEO.title;
  const seoDescription = description || defaultSEO.description;
  const seoKeywords = keywords || defaultSEO.keywords;
  const seoImage = image.startsWith('http') ? image : `${import.meta.env.VITE_APP_URL || 'https://coreslashtechnologies.com'}${image}`;

  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:site_name" content="CoreSlash Technologies" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { envConfig } from '../config/env.config';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  type?: string;
  image?: string;
  structuredData?: Record<string, any> | Record<string, any>[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  noindex?: boolean;
}

const defaultSEO = {
  title: 'CoreSlash Technologies | IT Solutions, AI Systems & Software Development Company in India',
  description: 'CoreSlash Technologies provides enterprise-grade IT solutions, AI systems, custom software development, web applications, and scalable digital solutions for businesses across India.',
  keywords: 'IT solutions, AI systems, software development, web development, custom software, SaaS development, AI automation, CoreSlash Technologies, Belgaum IT company, India software company',
  type: 'website',
  image: '/coreslash_technologies_url_image.webp',
};

const SEO = ({
  title,
  description,
  keywords,
  type = defaultSEO.type,
  image = defaultSEO.image,
  structuredData,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogUrl,
  twitterTitle,
  twitterDescription,
  noindex = false,
}: SEOProps) => {
  const location = useLocation();
  const currentUrl = canonicalUrl || `${import.meta.env.VITE_APP_URL || 'https://coreslashtechnologies.com'}${location.pathname}`;

  const seoTitle = title || defaultSEO.title;
  const seoDescription = description || defaultSEO.description;
  const seoKeywords = keywords || defaultSEO.keywords;
  const seoImage = image.startsWith('http') ? image : `${import.meta.env.VITE_APP_URL || 'https://coreslashtechnologies.com'}${image}`;

  const finalOgTitle = ogTitle || seoTitle;
  const finalOgDescription = ogDescription || seoDescription;
  const finalOgUrl = ogUrl || currentUrl;
  const finalTwitterTitle = twitterTitle || seoTitle;
  const finalTwitterDescription = twitterDescription || seoDescription;

  const isHome = location.pathname === '/';
  const isContact = location.pathname === '/contact';

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CoreSlash Technologies",
    "legalName": "CoreSlash Technologies",
    "alternateName": "CoreSlash",
    "url": envConfig.appUrl,
    "logo": `${envConfig.appUrl}/CoreslashTechnologies-solutions-main-logo.png`,
    "description": seoDescription,
    "email": envConfig.contact.email,
    "telephone": `+${envConfig.social.whatsappPhone}`,
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Belgaum",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "sameAs": [
      envConfig.social.linkedin,
      envConfig.social.instagram,
      envConfig.social.facebook,
      envConfig.social.twitter
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": envConfig.appUrl,
    "name": "CoreSlash Technologies",
    "image": `${envConfig.appUrl}/CoreslashTechnologies-solutions-main-logo.png`,
    "url": envConfig.appUrl,
    "telephone": `+${envConfig.social.whatsappPhone}`,
    "email": envConfig.contact.email,
    "logo": `${envConfig.appUrl}/CoreslashTechnologies-solutions-main-logo.png`,
    "description": seoDescription,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Belgaum",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "India"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Belgaum"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Karnataka"
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CoreSlash Technologies",
    "alternateName": "CoreSlash",
    "url": envConfig.appUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${envConfig.appUrl}/blog?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalOgUrl} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:site_name" content="CoreSlash Technologies" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTwitterTitle} />
      <meta name="twitter:description" content={finalTwitterDescription} />
      <meta name="twitter:image" content={seoImage} />

      {/* Centralized Structured Data */}
      {isHome && (
        <>
          <script type="application/ld+json">
            {JSON.stringify(orgSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(localBusinessSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(websiteSchema)}
          </script>
        </>
      )}

      {isContact && (
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      )}

      {/* Page-Specific Custom Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

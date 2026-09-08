export interface DetectedTech {
  name: string;
  category: string;
  confidence: 'High' | 'Medium';
  evidence: string;
}

export function detectTechnologies(html: string, headers: Record<string, string>): DetectedTech[] {
  const detected: DetectedTech[] = [];
  const lowerHtml = html.toLowerCase();
  const serverHeader = (headers['server'] || '').toLowerCase();
  const poweredByHeader = (headers['x-powered-by'] || '').toLowerCase();

  // Helper to push without duplicates
  const addTech = (name: string, category: string, confidence: 'High' | 'Medium', evidence: string) => {
    if (!detected.some(t => t.name.toLowerCase() === name.toLowerCase())) {
      detected.push({ name, category, confidence, evidence });
    }
  };

  // Next.js
  if (lowerHtml.includes('__next') || lowerHtml.includes('/_next/static') || poweredByHeader.includes('next.js')) {
    addTech('Next.js', 'Web Framework', 'High', 'Detected Next.js build markers in DOM or response headers');
  }

  // React
  if (lowerHtml.includes('data-reactroot') || lowerHtml.includes('/_next/') || lowerHtml.includes('react-dom') || lowerHtml.includes('__next_data__')) {
    addTech('React', 'JavaScript Framework', 'High', 'Detected React DOM container markers or framework bundles');
  } else if (/src=["'][^"']*react[^"']*\.js["']/i.test(html)) {
    addTech('React', 'JavaScript Framework', 'Medium', 'Detected React JavaScript library script tag reference');
  }

  // Vite
  if (lowerHtml.includes('@vite/client') || lowerHtml.includes('/vite/') || lowerHtml.includes('__vite_plugin_react_preamble_installed__')) {
    addTech('Vite', 'Build Tool', 'High', 'Detected Vite development client or build bundle markers');
  } else if (/<script\s+type=["']module["']\s+src=["']\/(src|assets)\//i.test(html)) {
    addTech('Vite', 'Build Tool', 'Medium', 'Detected Vite ES module entry script reference');
  }

  // Tailwind CSS
  if (lowerHtml.includes('@tailwind') || lowerHtml.includes('tailwind.config')) {
    addTech('Tailwind CSS', 'UI Framework', 'High', 'Detected Tailwind CSS directive or configuration reference');
  } else {
    // Require at least 3 distinct utility class patterns to confirm Tailwind
    const twMatches = [
      /\b(bg|text|border|ring)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/i,
      /\b(sm|md|lg|xl|2xl):(flex|grid|hidden|block|px|py|p|m|text)\b/i,
      /\b(hover|focus|active|dark):(bg|text|border|ring|shadow)\b/i,
      /\bshadow-(sm|md|lg|xl|2xl|inner|none)\b/i,
    ].filter(regex => regex.test(html));

    if (twMatches.length >= 2) {
      addTech('Tailwind CSS', 'UI Framework', 'Medium', 'Detected characteristic Tailwind CSS utility class combinations');
    }
  }

  // WordPress
  if (lowerHtml.includes('wp-content') || lowerHtml.includes('wp-includes') || lowerHtml.includes('generator" content="wordpress')) {
    addTech('WordPress', 'CMS', 'High', 'Detected wp-content or WordPress generator tags');
  }

  // Shopify
  if (lowerHtml.includes('cdn.shopify.com') || lowerHtml.includes('shopify.theme') || lowerHtml.includes('shopify.shop')) {
    addTech('Shopify', 'E-Commerce Platform', 'High', 'Detected Shopify CDN assets and JS objects');
  }

  // WooCommerce
  if (lowerHtml.includes('woocommerce') || lowerHtml.includes('wc-api')) {
    addTech('WooCommerce', 'E-Commerce Plugin', 'High', 'Detected WooCommerce styles or scripts');
  }

  // Cloudflare
  if (headers['cf-ray'] || headers['cf-cache-status'] || serverHeader.includes('cloudflare')) {
    addTech('Cloudflare', 'CDN & Security', 'High', 'Detected Cloudflare CF-Ray headers');
  }

  // Vercel
  if (headers['x-vercel-id'] || serverHeader.includes('vercel')) {
    addTech('Vercel', 'Hosting & Cloud', 'High', 'Detected Vercel response headers');
  }

  // AWS / CloudFront
  if (headers['via']?.toLowerCase().includes('cloudfront') || headers['x-amz-cf-id']) {
    addTech('Amazon CloudFront', 'CDN', 'High', 'Detected AWS CloudFront headers');
  }

  // Google Analytics
  if (lowerHtml.includes('googletagmanager.com/gtag/js') || lowerHtml.includes('ga(') || lowerHtml.includes('gtag(')) {
    addTech('Google Analytics', 'Analytics', 'High', 'Detected gtag.js script references');
  }

  // Google Tag Manager
  if (lowerHtml.includes('googletagmanager.com/gtm.js')) {
    addTech('Google Tag Manager', 'Tag Management', 'High', 'Detected GTM script tags');
  }

  // Node.js / Express
  if (poweredByHeader.includes('express')) {
    addTech('Express.js', 'Backend Framework', 'High', 'Detected X-Powered-By: Express header');
  }

  // PHP
  if (poweredByHeader.includes('php') || lowerHtml.includes('.php')) {
    addTech('PHP', 'Programming Language', 'High', 'Detected PHP server header or endpoints');
  }

  return detected;
}

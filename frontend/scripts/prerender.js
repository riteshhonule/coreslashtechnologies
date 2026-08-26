import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const indexHtmlPath = path.resolve(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('Error: dist/index.html does not exist. Run vite build first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Load blog posts from blogData.ts
const blogDataPath = path.resolve(rootDir, 'src/data/blogData.ts');
const blogContent = fs.readFileSync(blogDataPath, 'utf8');
const rawPostsMatch = blogContent.match(/const rawPosts = (\[[\s\S]*?\]);/);
if (!rawPostsMatch) {
  console.error('Error parsing rawPosts in blogData.ts');
  process.exit(1);
}
const rawPosts = JSON.parse(rawPostsMatch[1]);

// Route Registry Mapping
const routes = [
  // Core Pages
  {
    path: '/',
    title: 'CoreSlash Technologies | AI, Web & Software Development',
    description: 'Accelerate digital growth with CoreSlash Technologies. We engineer custom software systems, scalable web platforms, mobile apps, and AI automation solutions.'
  },
  {
    path: '/about',
    title: 'About Us | CoreSlash Technologies',
    description: 'Discover CoreSlash Technologies, our engineering team, and core mission to deliver custom software, scalable web platforms, and AI innovation for businesses.'
  },
  {
    path: '/portfolio',
    title: 'Software Development Portfolio & Case Studies | CoreSlash Technologies',
    description: 'Explore client case studies and software solutions by CoreSlash Technologies, featuring enterprise web apps, SaaS platforms, and custom mobile applications.'
  },
  {
    path: '/contact',
    title: 'Contact Us | CoreSlash Technologies',
    description: 'Get in touch with CoreSlash Technologies to discuss your custom web, mobile app, software engineering, or AI automation project with senior technical leads.'
  },
  {
    path: '/partner',
    title: 'Partner With CoreSlash | CoreSlash Technologies Partner Program',
    description: 'Partner with CoreSlash Technologies for agency white-label software engineering, sub-contracting, and full-stack technical delivery capabilities.'
  },
  {
    path: '/partner-program',
    title: 'Partner With CoreSlash | CoreSlash Technologies Partner Program',
    description: 'Partner with CoreSlash Technologies for agency white-label software engineering, sub-contracting, and full-stack technical delivery capabilities.',
    canonical: 'https://coreslashtechnologies.com/partner'
  },
  {
    path: '/dealership',
    title: 'Partner With CoreSlash | CoreSlash Technologies Partner Program',
    description: 'Partner with CoreSlash Technologies for agency white-label software engineering, sub-contracting, and full-stack technical delivery capabilities.',
    canonical: 'https://coreslashtechnologies.com/partner'
  },
  {
    path: '/partner-form',
    title: 'Partner With Us | CoreSlash Technologies Partner Program',
    description: 'Apply to the CoreSlash Technologies Partner Program. Submit your agency details to collaborate on custom web, mobile, and software development projects.'
  },
  {
    path: '/partner/form',
    title: 'Partner With Us | CoreSlash Technologies Partner Program',
    description: 'Apply to the CoreSlash Technologies Partner Program. Submit your agency details to collaborate on custom web, mobile, and software development projects.',
    canonical: 'https://coreslashtechnologies.com/partner-form'
  },
  {
    path: '/enquiry-form',
    title: 'Quick Enquiry | CoreSlash Technologies',
    description: 'Submit a quick inquiry to CoreSlash Technologies to receive a detailed technical proposal and project estimate for your web, mobile, or AI application.'
  },
  {
    path: '/careers',
    title: 'Careers & Opportunities | CoreSlash Technologies',
    description: 'Explore career opportunities at CoreSlash Technologies. Join our engineering team to build modern web applications, cloud systems, and AI technologies.'
  },
  {
    path: '/blog',
    title: 'Blog & Tech Insights | CoreSlash Technologies',
    description: 'Read software engineering insights, full-stack web guides, local SEO strategies, and cloud architecture articles from the CoreSlash Technologies tech team.'
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | CoreSlash Technologies',
    description: 'Read the CoreSlash Technologies Privacy Policy to understand how client data, personal information, and website analytics are collected, secured, and managed.'
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service | CoreSlash Technologies',
    description: 'Review the CoreSlash Technologies Terms of Service covering custom software delivery agreements, intellectual property ownership, milestone payments, and SLAs.'
  },
  {
    path: '/cookie-policy',
    title: 'Cookie Policy | CoreSlash Technologies',
    description: 'Learn how CoreSlash Technologies uses essential, analytical, and performance cookies to optimize site navigation, user experience, and web service functionality.'
  },
  {
    path: '/top-it-companies-in-belagavi',
    title: 'Top IT Companies in Belagavi (Belgaum) | Software Development',
    description: 'Discover leading software development and IT services in Belagavi by CoreSlash Technologies, covering custom web apps, mobile solutions, and enterprise software.'
  },

  // Service Pages
  {
    path: '/services',
    title: 'Full-Stack Software Engineering & Digital Services | CoreSlash Technologies',
    description: 'Explore software engineering services by CoreSlash Technologies, spanning AI automation, web development, custom software, mobile apps, and cloud infrastructure.'
  },
  {
    path: '/services/ai-automation',
    title: 'AI Automation & Custom LLM Agent Development | CoreSlash Technologies',
    description: 'Automate business workflows with CoreSlash Technologies using custom LLM agents, RAG vector search, document processing, and enterprise AI integrations.'
  },
  {
    path: '/services/web-development',
    title: 'Custom Web Development Services | CoreSlash Technologies',
    description: 'Build high-performance React and Next.js web applications, corporate portals, and SaaS platforms with custom web development by CoreSlash Technologies.'
  },
  {
    path: '/services/app-development',
    title: 'Mobile App Development Services | CoreSlash Technologies',
    description: 'Engineer cross-platform mobile apps for iOS and Android using Flutter and React Native, featuring smooth UI, offline sync, and secure APIs by CoreSlash.'
  },
  {
    path: '/services/software-systems',
    title: 'Custom Software Systems & Enterprise Solutions | CoreSlash Technologies',
    description: 'Streamline enterprise operations with custom software systems from CoreSlash Technologies, including scalable ERP platforms, CRMs, and backend microservices.'
  },
  {
    path: '/services/ecommerce-solutions',
    title: 'Custom E-Commerce Development | CoreSlash Technologies',
    description: 'Launch high-converting online storefronts with custom e-commerce development from CoreSlash, featuring fast checkouts, payment APIs, and ERP integrations.'
  },
  {
    path: '/services/seo-solutions',
    title: 'SEO Optimization Services | CoreSlash Technologies',
    description: 'Drive organic search traffic with SEO optimization services from CoreSlash Technologies, focusing on technical audits, schema markup, and Core Web Vitals.'
  },
  {
    path: '/services/shopify-development',
    title: 'Shopify Development Services | CoreSlash Technologies',
    description: 'Scale online sales with custom Shopify Liquid themes, headless Hydrogen storefronts, and tailored app microservices engineered by CoreSlash Technologies.'
  },
  {
    path: '/services/cloud-infrastructure',
    title: 'Cloud Infrastructure & DevOps Engineering Services | CoreSlash Technologies',
    description: 'Optimize cloud operations with CoreSlash Technologies through resilient AWS architecture, Docker containers, automated CI/CD pipelines, and 24/7 DevOps support.'
  },
  {
    path: '/services/data-analytics',
    title: 'Data Analytics & Business Intelligence Services | CoreSlash Technologies',
    description: 'Transform complex operational data into actionable insights with real-time executive dashboards, automated ETL pipelines, and business intelligence solutions.'
  },
  {
    path: '/services/ppc',
    title: 'Google Ads & PPC Management Services | CoreSlash Technologies',
    description: 'Maximize return on ad spend with target-driven Google Ads and LinkedIn B2B PPC management campaigns optimized for conversions by CoreSlash Technologies.'
  }
];

// Add Blog Article Routes
rawPosts.forEach(post => {
  routes.push({
    path: `/blog/${post.slug}`,
    title: `${post.title} | CoreSlash Technologies`,
    description: post.metaDescription
  });
});

console.log(`Pre-rendering HTML files for ${routes.length} total discovered routes...`);

let processedCount = 0;

for (const route of routes) {
  const canonicalUrl = route.canonical || `https://coreslashtechnologies.com${route.path === '/' ? '' : route.path}`;

  // Construct route-specific head metadata block
  const headMeta = `
  <!-- Pre-rendered Route Metadata -->
  <title data-rh="true">${route.title}</title>
  <meta name="description" content="${route.description}" data-rh="true" />
  <link rel="canonical" href="${canonicalUrl}" data-rh="true" />
  
  <meta property="og:type" content="website" data-rh="true" />
  <meta property="og:title" content="${route.title}" data-rh="true" />
  <meta property="og:description" content="${route.description}" data-rh="true" />
  <meta property="og:url" content="${canonicalUrl}" data-rh="true" />
  <meta property="og:image" content="https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png" data-rh="true" />
  
  <meta name="twitter:card" content="summary_large_image" data-rh="true" />
  <meta name="twitter:title" content="${route.title}" data-rh="true" />
  <meta name="twitter:description" content="${route.description}" data-rh="true" />
  <meta name="twitter:image" content="https://coreslashtechnologies.com/CoreslashTechnologies-solutions-main-logo.png" data-rh="true" />
`;

  // Replace baseline metadata in templateHtml with route-specific headMeta
  let routeHtml = templateHtml;

  // Replace title
  routeHtml = routeHtml.replace(/<title[\s\S]*?<\/title>/i, `<title data-rh="true">${route.title}</title>`);

  // Replace existing meta description
  routeHtml = routeHtml.replace(/<meta\s+name="description"[\s\S]*?\/>/i, `<meta name="description" content="${route.description}" data-rh="true" />`);

  // Replace existing OG title & description
  routeHtml = routeHtml.replace(/<meta\s+property="og:title"[\s\S]*?\/>/i, `<meta property="og:title" content="${route.title}" data-rh="true" />`);
  routeHtml = routeHtml.replace(/<meta\s+property="og:description"[\s\S]*?\/>/i, `<meta property="og:description" content="${route.description}" data-rh="true" />`);

  // Replace existing Twitter title & description
  routeHtml = routeHtml.replace(/<meta\s+name="twitter:title"[\s\S]*?\/>/i, `<meta name="twitter:title" content="${route.title}" data-rh="true" />`);
  routeHtml = routeHtml.replace(/<meta\s+name="twitter:description"[\s\S]*?\/>/i, `<meta name="twitter:description" content="${route.description}" data-rh="true" />`);

  // Insert or update canonical tag
  if (routeHtml.includes('rel="canonical"')) {
    routeHtml = routeHtml.replace(/<link\s+rel="canonical"[\s\S]*?\/>/i, `<link rel="canonical" href="${canonicalUrl}" data-rh="true" />`);
  } else {
    routeHtml = routeHtml.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" data-rh="true" />\n</head>`);
  }

  // Save file to dist/<route>/index.html
  let filePath;
  if (route.path === '/') {
    filePath = path.resolve(distDir, 'index.html');
  } else {
    const routeFolder = path.resolve(distDir, route.path.replace(/^\//, ''));
    if (!fs.existsSync(routeFolder)) {
      fs.mkdirSync(routeFolder, { recursive: true });
    }
    filePath = path.resolve(routeFolder, 'index.html');
  }

  fs.writeFileSync(filePath, routeHtml, 'utf8');
  processedCount++;
}

console.log(`Successfully pre-rendered HTML for all ${processedCount} routes.`);

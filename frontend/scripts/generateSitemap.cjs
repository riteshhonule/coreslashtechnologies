const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://coreslashtechnologies.com';
const blogDataPath = path.join(__dirname, '..', 'src', 'data', 'blogData.ts');
const targetSitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

// Define static / core pages
const corePages = [
    { loc: '/', changefreq: 'weekly', priority: '1.0' },
    { loc: '/about', changefreq: 'monthly', priority: '0.8' },
    { loc: '/services', changefreq: 'weekly', priority: '0.9' },
    { loc: '/portfolio', changefreq: 'monthly', priority: '0.8' },
    { loc: '/blog', changefreq: 'weekly', priority: '0.8' },
    { loc: '/faq', changefreq: 'monthly', priority: '0.7' },
    { loc: '/contact', changefreq: 'monthly', priority: '0.8' },
    { loc: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
    { loc: '/terms-of-service', changefreq: 'yearly', priority: '0.3' },
    { loc: '/cookie-policy', changefreq: 'yearly', priority: '0.3' },
    { loc: '/careers', changefreq: 'monthly', priority: '0.8' }
];

// Define services (both static and new lazy routes)
const services = [
    '/services/website-development',
    '/services/shopify-development',
    '/services/seo',
    '/services/ecommerce',
    '/services/ppc',
    '/services/app-development',
    '/services/software-development',
    '/services/digital-marketing',
    '/services/ai-solutions',
    '/services/custom-software-development',
    '/services/enterprise-it-solutions',
    '/services/cloud-solutions',
    '/services/scada-industrial-automation',
    '/services/iot-solutions',
    '/services/business-automation',
    '/services/data-analytics'
];

const servicePages = services.map(srv => ({
    loc: srv,
    changefreq: 'monthly',
    priority: '0.8'
}));

function generateSitemap() {
    console.log('Generating sitemap...');
    let blogSlugs = [];

    // Parse blogData.ts for slugs using regex
    try {
        if (fs.existsSync(blogDataPath)) {
            const content = fs.readFileSync(blogDataPath, 'utf8');
            const regex = /slug:\s*["']([^"']+)["']/g;
            let match;
            while ((match = regex.exec(content)) !== null) {
                const slug = match[1];
                // Prevent duplicate slugs if any (e.g. types or repeated ids)
                if (slug && !blogSlugs.includes(slug)) {
                    blogSlugs.push(slug);
                }
            }
            console.log(`Found ${blogSlugs.length} blog posts in blogData.ts`);
        } else {
            console.warn(`Warning: blogData.ts not found at ${blogDataPath}`);
        }
    } catch (error) {
        console.error('Error reading blogData.ts:', error);
    }

    const blogPages = blogSlugs.map(slug => ({
        loc: `/blog/${slug}`,
        changefreq: 'monthly',
        priority: '0.8'
    }));

    // Combine all pages
    const allPages = [...corePages, ...servicePages, ...blogPages];

    // Build XML content
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    allPages.forEach(page => {
        xml += '  <url>\n';
        xml += `    <loc>${BASE_URL}${page.loc}</loc>\n`;
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;
        xml += '  </url>\n';
    });

    xml += '</urlset>\n';

    // Write to target destination
    try {
        fs.writeFileSync(targetSitemapPath, xml, 'utf8');
        console.log(`Sitemap generated successfully! Total URLs: ${allPages.length}`);
        console.log(`Saved to: ${targetSitemapPath}`);
    } catch (error) {
        console.error('Error writing sitemap.xml:', error);
        process.exit(1);
    }
}

generateSitemap();

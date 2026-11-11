import fs from 'fs';
import path from 'path';
import http from 'http';
import crypto from 'crypto';
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

// Keep a copy of the pristine template HTML before modifying any files
const pristineTemplateHtml = fs.readFileSync(indexHtmlPath, 'utf8')
  .replace(/<title[\s\S]*?<\/title>/gi, '')
  .replace(/<link\s+rel="canonical"[\s\S]*?>/gi, '')
  .replace(/<meta\s+name="description"[\s\S]*?>/gi, '');

/**
 * Safely and atomically writes content to a destination file.
 *
 * Guarantees:
 * 1. Writes payload to an isolated temporary file located in the target directory
 *    (ensuring same filesystem volume for atomic rename).
 * 2. Uses cryptographically secure random bytes (`crypto.randomBytes`) for collision resistance.
 * 3. Opens the temporary path exclusively via `fs.openSync(candidatePath, 'wx')`,
 *    guaranteeing atomic creation without overwriting an existing file.
 * 4. Immediately claims ownership of `tempPath` upon successful `openSync` so partial writes
 *    or mid-write failures can always identify and clean up the file.
 * 5. Writes via the file descriptor and manages descriptor lifecycle synchronously without leaks.
 * 6. Does not mark a descriptor as closed until `closeSync()` succeeds, and avoids blind retries
 *    when descriptor state is uncertain.
 * 7. Verifies non-zero byte size prior to filesystem commitment.
 * 8. Commits via `fs.renameSync()`, which is atomic on POSIX (Vercel/Linux) and Windows NTFS.
 * 9. Never falls back to non-atomic copying (`copyFileSync()`). If atomic replacement fails,
 *    it cleans up only its own temporary file and aborts safely, leaving existing files intact.
 * 10. Preserves primary write/rename errors while explicitly reporting any cleanup failures.
 */
function atomicWriteFileSync(outputPath, content, maxRetries = 3) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let tempPath = null;
  let fd = null;
  let attempts = 0;

  // Step 1, 2, 3: Exclusively open temporary file with unique entropy
  while (attempts < maxRetries) {
    attempts++;
    const entropy = crypto.randomBytes(8).toString('hex');
    const candidateTempPath = `${outputPath}.tmp.${process.pid}.${Date.now()}.${entropy}`;

    try {
      // Exclusive creation: fails with EEXIST if path already exists
      fd = fs.openSync(candidateTempPath, 'wx');
      // Immediately record ownership of candidateTempPath once openSync succeeds
      tempPath = candidateTempPath;
      break;
    } catch (err) {
      if (err.code === 'EEXIST' && attempts < maxRetries) {
        continue; // Collision on temp path: retry with fresh entropy
      }
      throw new Error(`Failed to create exclusive temporary file for atomic write (${outputPath}): ${err.message}`);
    }
  }

  try {
    // Step 4: Write payload using the file descriptor
    fs.writeFileSync(fd, content, 'utf8');

    // Step 5: Close file descriptor before rename or verification
    // Do not mark descriptor as closed until closeSync succeeds. If it throws,
    // clear fd reference so catch does not blindly retry on uncertain descriptor state.
    try {
      fs.closeSync(fd);
      fd = null;
    } catch (closeErr) {
      fd = null; // Do not attempt to re-close uncertain descriptor
      throw closeErr;
    }

    // Step 6: Verify written temporary file size
    const stat = fs.statSync(tempPath);
    if (stat.size === 0 && content.length > 0) {
      throw new Error(`Atomic write verification failed: temporary file ${tempPath} is 0 bytes`);
    }

    // Step 7: Atomic commitment via rename (with transient lock retry for concurrent replacement contention)
    let renameAttempts = 0;
    const maxRenameRetries = 10;
    while (true) {
      try {
        fs.renameSync(tempPath, outputPath);
        tempPath = null; // Successfully committed, no cleanup needed
        break;
      } catch (renameErr) {
        renameAttempts++;
        if (
          renameAttempts < maxRenameRetries &&
          (renameErr.code === 'EPERM' || renameErr.code === 'EBUSY' || renameErr.code === 'EACCES')
        ) {
          const delayMs = Math.floor(10 + Math.random() * 20);
          const end = Date.now() + delayMs;
          while (Date.now() < end) {}
          continue;
        }
        throw renameErr;
      }
    }
  } catch (err) {
    const cleanupFailures = [];

    // Ensure file descriptor is closed in error paths if closeSync was not yet attempted
    if (fd !== null) {
      const fdToClose = fd;
      fd = null; // Prevent duplicate close attempt
      try {
        fs.closeSync(fdToClose);
      } catch (closeErr) {
        cleanupFailures.push(`failed to close descriptor ${fdToClose} (${closeErr.message})`);
      }
    }

    // Step 8: Clean up ONLY the temporary file owned by this invocation
    if (tempPath) {
      try {
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
      } catch (unlinkErr) {
        cleanupFailures.push(`failed to remove temporary file ${tempPath} (${unlinkErr.message})`);
      }
    }

    const cleanupSuffix = cleanupFailures.length > 0
      ? ` [Cleanup warnings: ${cleanupFailures.join('; ')}]`
      : '';

    const finalError = new Error(`Atomic write failed for ${outputPath}: ${err.message}${cleanupSuffix}`);
    finalError.cause = err;
    throw finalError;
  }
}

/**
 * Normalizes captured HTML by stripping ephemeral preview server origins
 * (e.g. from Vite's dynamic modulepreload link tags) and strictly asserts
 * zero localhost / loopback address leakage in production output.
 */
function normalizeHtml(html, port) {
  // Strip ephemeral origins injected during browser rendering
  const ephemeralOriginPattern = new RegExp(`https?:\\/\\/(?:127\\.0\\.0\\.1|localhost):${port}`, 'g');
  let normalized = html.replace(ephemeralOriginPattern, '');

  // Strict build validation: Fail build if any 127.0.0.1 or localhost URLs remain in captured HTML
  const leakedOrigins = normalized.match(/https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?/gi);
  if (leakedOrigins && leakedOrigins.length > 0) {
    throw new Error(
      `Critical build validation failed: Ephemeral preview origins leaked into pre-rendered HTML: ${[...new Set(leakedOrigins)].join(', ')}`
    );
  }

  return normalized;
}

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
    title: 'Software Development Portfolio & Case Studies | CoreSlash',
    description: 'Explore verified software development case studies by CoreSlash. Review real-world architectures, client metrics, and results across SaaS, web, and mobile apps.'
  },
  {
    path: '/contact',
    title: 'Contact Us | CoreSlash Technologies',
    description: 'Get in touch with CoreSlash Technologies to discuss your custom web, mobile app, software engineering, or AI automation project with senior technical leads.'
  },
  {
    path: '/website-audit',
    title: 'Free AI Website Audit & Performance Analyzer | CoreSlash Technologies',
    description: 'Audit your website performance, SEO, mobile responsiveness, accessibility, security headers, technology stack, and AI readiness with CoreSlash Technologies.'
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
    title: 'Top IT & Software Companies in Belgaum (Guide) | CoreSlash',
    description: 'Looking for IT and software companies in Belgaum (Belagavi)? Explore local tech landscape categories, evaluation checklists, and custom engineering services.'
  },

  // Service Pages
  {
    path: '/services',
    title: 'Software Development Services | CoreSlash Technologies',
    description: 'Explore custom software development services by CoreSlash Technologies, spanning web platforms, mobile apps, enterprise systems, cloud, and AI automation.'
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
    title: 'Custom Software Development Services | CoreSlash',
    description: 'Scalable custom software development services by CoreSlash. We engineer enterprise SaaS platforms, microservices architecture, and cloud backends.'
  },
  {
    path: '/services/erp-crm-development',
    title: 'Custom ERP Software Development Company in India | CoreSlash',
    description: 'Top custom ERP software development company in India. We build scalable cloud ERP solutions, automate business processes, and integrate secure CRM systems.'
  },
  {
    path: '/services/ecommerce-solutions',
    title: 'Custom E-Commerce Development | CoreSlash Technologies',
    description: 'Launch high-converting online storefronts with custom e-commerce development from CoreSlash, featuring fast checkouts, payment APIs, and ERP integrations.'
  },
  {
    path: '/services/seo-solutions',
    title: 'Technical SEO & Digital Marketing Services | CoreSlash',
    description: 'Grow organic visibility with technical SEO, digital marketing, website audits, schema markup, content strategy and search performance optimization.'
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
  const titleSuffix = post.slug === 'best-react-js-development-company-in-bangalore'
    ? '| CoreSlash'
    : '| CoreSlash Technologies';

  routes.push({
    path: `/blog/${post.slug}`,
    title: `${post.title} ${titleSuffix}`,
    description: post.metaDescription
  });
});

// Phase 1 POC Target Routes Definition with Explicit SEO Acceptance Criteria
const SNAPSHOT_TARGET_ROUTES = [
  {
    path: '/',
    expectedH1Substrings: ['COMPLEX BUSINESS PROBLEMS', 'AI-Powered'],
    expectedTitleSubstring: 'CoreSlash Technologies',
    expectedCanonical: 'https://coreslashtechnologies.com/',
    minLinks: 20,
    expectedJsonLdCount: 1
  },
  {
    path: '/top-it-companies-in-belagavi',
    expectedH1Substrings: ['Top IT & Software Companies in Belgaum'],
    expectedTitleSubstring: 'Top IT & Software Companies in Belgaum',
    expectedCanonical: 'https://coreslashtechnologies.com/top-it-companies-in-belagavi',
    minLinks: 40,
    expectedJsonLdCount: 1
  },
  {
    path: '/services/web-development',
    expectedH1Substrings: ['Custom Web Development Services'],
    expectedTitleSubstring: 'Custom Web Development Services',
    expectedCanonical: 'https://coreslashtechnologies.com/services/web-development',
    minLinks: 30,
    expectedJsonLdCount: 2
  }
];

const snapshotPaths = new Set(SNAPSHOT_TARGET_ROUTES.map(r => r.path));

console.log(`Pre-rendering HTML files for ${routes.length} total discovered routes...`);
console.log(`[Phase 1 Scope] Browser-based static snapshot enabled for 3 target routes:`);
SNAPSHOT_TARGET_ROUTES.forEach(r => console.log(`  • ${r.path}`));

// Step 1: Pre-render metadata-only HTML for all non-snapshot routes (preserving existing pipeline)
let nonSnapshotCount = 0;
for (const route of routes) {
  if (snapshotPaths.has(route.path)) continue;

  const canonicalUrl = route.canonical || `https://coreslashtechnologies.com${route.path === '/' ? '' : route.path}`;

  let routeHtml = pristineTemplateHtml;

  // Insert or update title
  routeHtml = routeHtml.replace('</head>', `  <title data-rh="true">${route.title}</title>\n</head>`);
  routeHtml = routeHtml.replace('</head>', `  <meta name="description" content="${route.description}" data-rh="true" />\n</head>`);
  routeHtml = routeHtml.replace('</head>', `  <meta property="og:title" content="${route.title}" data-rh="true" />\n</head>`);
  routeHtml = routeHtml.replace('</head>', `  <meta property="og:description" content="${route.description}" data-rh="true" />\n</head>`);
  routeHtml = routeHtml.replace('</head>', `  <meta property="og:url" content="${canonicalUrl}" data-rh="true" />\n</head>`);
  routeHtml = routeHtml.replace('</head>', `  <meta name="twitter:title" content="${route.title}" data-rh="true" />\n</head>`);
  routeHtml = routeHtml.replace('</head>', `  <meta name="twitter:description" content="${route.description}" data-rh="true" />\n</head>`);
  routeHtml = routeHtml.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" data-rh="true" />\n</head>`);

  const routeFolder = path.resolve(distDir, route.path.replace(/^\//, ''));
  if (!fs.existsSync(routeFolder)) {
    fs.mkdirSync(routeFolder, { recursive: true });
  }
  const filePath = path.resolve(routeFolder, 'index.html');
  atomicWriteFileSync(filePath, routeHtml);
  nonSnapshotCount++;
}

console.log(`Pre-rendered metadata-only HTML for ${nonSnapshotCount} routes.`);

// Step 2: Browser Snapshotting for the 3 Target Routes
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const urlPath = req.url.split('?')[0];
        const filePath = path.join(distDir, urlPath);

        // Serve static assets from dist/
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const ext = path.extname(filePath).toLowerCase();
          res.writeHead(200, {
            'Content-Type': mimeTypes[ext] || 'application/octet-stream',
            'Access-Control-Allow-Origin': '*'
          });
          fs.createReadStream(filePath).pipe(res);
          return;
        }

        // Serve pristine HTML for client SPA route rendering
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(pristineTemplateHtml);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(err.message);
      }
    });

    server.listen(0, '127.0.0.1', () => {
      resolve({ server, port: server.address().port });
    });
    server.on('error', reject);
  });
}

async function launchCompatibleBrowser() {
  const { chromium } = await import('playwright');
  const launchArgs = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu'
  ];

  // 1. Custom executable path from environment variable (e.g. AWS Lambda / CI runner)
  const customExecutable = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || process.env.CHROMIUM_PATH;
  if (customExecutable && fs.existsSync(customExecutable)) {
    console.log(`[Browser Launch] Using custom Chromium executable: ${customExecutable}`);
    return await chromium.launch({
      executablePath: customExecutable,
      headless: true,
      args: launchArgs
    });
  }

  // 2. Check if default Playwright Chromium binary is installed
  let standardExecutable = null;
  try {
    standardExecutable = chromium.executablePath();
  } catch {}

  if (!standardExecutable || !fs.existsSync(standardExecutable)) {
    console.log('[Browser Launch] Playwright Chromium binary not found. Initiating non-privileged download (npx playwright install chromium)...');
    try {
      const { execSync } = await import('child_process');
      execSync('npx playwright install chromium', {
        cwd: rootDir,
        stdio: 'inherit',
        env: { ...process.env, PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: '0' }
      });
      console.log('[Browser Launch] Playwright Chromium download completed.');
    } catch (installErr) {
      console.warn('[Browser Launch] Auto-installation of Chromium failed or skipped:', installErr.message);
    }
  }

  // 3. Attempt launch with Playwright bundled Chromium
  try {
    return await chromium.launch({ headless: true, args: launchArgs });
  } catch (primaryErr) {
    console.warn(`[Browser Launch] Standard Chromium launch failed (${primaryErr.message}). Attempting fallback options...`);

    // 4. Fallback: On developer workstations, attempt system Chrome channel
    try {
      console.log('[Browser Launch] Attempting local system Chrome channel fallback...');
      return await chromium.launch({ channel: 'chrome', headless: true, args: launchArgs });
    } catch (channelErr) {
      console.error('[Browser Launch] All browser launch strategies failed.');
      throw new Error(`Failed to launch browser: Primary (${primaryErr.message}), Channel fallback (${channelErr.message})`);
    }
  }
}

async function runStaticSnapshots() {
  console.log('\nStarting local preview HTTP server on ephemeral port...');
  const { server, port } = await startPreviewServer();
  console.log(`Preview server active at http://127.0.0.1:${port}`);

  console.log('Launching headless browser instance for static snapshot generation...');
  const browser = await launchCompatibleBrowser();

  const auditResults = [];
  let criticalFailureCount = 0;

  try {
    for (const target of SNAPSHOT_TARGET_ROUTES) {
      console.log(`\n[Prerendering Snapshot] Capturing: ${target.path}`);
      const startTime = Date.now();
      const page = await browser.newPage({
        viewport: { width: 1440, height: 900 }
      });

      try {
        const response = await page.goto(`http://127.0.0.1:${port}${target.path}`, {
          waitUntil: 'domcontentloaded',
          timeout: 15000
        });

        const httpStatus = response ? response.status() : 0;
        if (httpStatus !== 200) {
          throw new Error(`Expected HTTP 200 from preview server, received ${httpStatus}`);
        }

        // 1. Wait for layout and primary H1 to render
        await page.waitForSelector('h1', { timeout: 10000 });

        // 2. Wait for page-specific JSON-LD to appear in head via React Helmet
        await page.waitForFunction(
          (minCount) => {
            const scripts = document.querySelectorAll('script[type="application/ld+json"]');
            return scripts.length >= minCount;
          },
          target.expectedJsonLdCount,
          { timeout: 8000 }
        );

        // 3. Short settle pass for Framer Motion initial render
        await page.waitForTimeout(300);

        // Extract metrics for validation
        const title = await page.title();
        const h1Text = await page.$eval('h1', el => el.innerText);
        const rootHtml = await page.$eval('#root', el => el.innerHTML);
        const canonicals = await page.$$eval('link[rel="canonical"]', els => els.map(e => e.getAttribute('href')));
        const jsonLdCount = await page.$$eval('script[type="application/ld+json"]', els => els.length);
        const internalLinks = await page.$$eval('a[href]', els => els.map(e => e.getAttribute('href')).filter(h => h && h.startsWith('/')));
        const noindexes = await page.$$eval('meta[name="robots"][content*="noindex"]', els => els.length);

        // Run Acceptance Criteria Validations
        if (!title.includes(target.expectedTitleSubstring)) {
          throw new Error(`Title mismatch: expected to contain "${target.expectedTitleSubstring}", got "${title}"`);
        }

        for (const sub of target.expectedH1Substrings) {
          if (!h1Text.includes(sub)) {
            throw new Error(`H1 mismatch: expected to contain "${sub}", got "${h1Text.replace(/\n/g, ' ')}"`);
          }
        }

        if (canonicals.length === 0) {
          throw new Error(`Missing canonical tag on route ${target.path}`);
        }
        if (canonicals.length > 1) {
          throw new Error(`Duplicate canonical tags detected (${canonicals.length}): ${canonicals.join(', ')}`);
        }
        if (canonicals[0] !== target.expectedCanonical) {
          throw new Error(`Canonical mismatch: expected "${target.expectedCanonical}", got "${canonicals[0]}"`);
        }

        if (rootHtml.length < 5000) {
          throw new Error(`#root content too short (${rootHtml.length} chars). Possible empty body.`);
        }

        if (internalLinks.length < target.minLinks) {
          throw new Error(`Insufficient internal links: expected at least ${target.minLinks}, found ${internalLinks.length}`);
        }

        if (jsonLdCount < target.expectedJsonLdCount) {
          throw new Error(`Insufficient JSON-LD scripts: expected at least ${target.expectedJsonLdCount}, found ${jsonLdCount}`);
        }

        if (noindexes > 0) {
          throw new Error(`Accidental noindex tag detected on critical route ${target.path}`);
        }

        // Capture full document HTML
        const fullHtml = await page.content();
        const duration = Date.now() - startTime;

        // Normalize captured HTML and assert zero ephemeral preview origin leakage
        const normalizedHtml = normalizeHtml(fullHtml, port);

        // Write snapshot to target destination atomically
        let outputPath;
        if (target.path === '/') {
          outputPath = path.resolve(distDir, 'index.html');
        } else {
          const folder = path.resolve(distDir, target.path.replace(/^\//, ''));
          if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
          }
          outputPath = path.resolve(folder, 'index.html');
        }

        atomicWriteFileSync(outputPath, normalizedHtml);

        auditResults.push({
          path: target.path,
          status: 'PASS',
          duration: `${duration}ms`,
          htmlSize: `${(normalizedHtml.length / 1024).toFixed(1)} KB`,
          rootLength: `${(rootHtml.length / 1024).toFixed(1)} KB`,
          h1: h1Text.replace(/\n/g, ' ').substring(0, 50) + '...',
          links: internalLinks.length,
          jsonLd: jsonLdCount,
          canonical: canonicals[0]
        });

        console.log(`  ✓ Snapshot validated & written: ${outputPath} (${(normalizedHtml.length / 1024).toFixed(1)} KB in ${duration}ms)`);
      } catch (routeErr) {
        criticalFailureCount++;
        auditResults.push({
          path: target.path,
          status: 'FAIL',
          error: routeErr.message
        });
        console.error(`  ✗ CRITICAL FAILURE for ${target.path}: ${routeErr.message}`);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
    console.log('Preview server and browser resources cleanly shut down.');
  }

  // Print Structured Audit Summary Table
  console.log('\n' + '='.repeat(90));
  console.log('CORESLASH STATIC PRERENDER AUDIT REPORT — PHASE 1 POC (3 ROUTES)');
  console.log('='.repeat(90));
  console.log(
    'Route'.padEnd(32) +
    'Status'.padEnd(8) +
    'Duration'.padEnd(12) +
    'HTML Size'.padEnd(12) +
    'Links'.padEnd(8) +
    'JSON-LD'.padEnd(10) +
    'Canonical'
  );
  console.log('-'.repeat(90));

  auditResults.forEach(r => {
    if (r.status === 'PASS') {
      console.log(
        r.path.padEnd(32) +
        r.status.padEnd(8) +
        r.duration.padEnd(12) +
        r.htmlSize.padEnd(12) +
        String(r.links).padEnd(8) +
        String(r.jsonLd).padEnd(10) +
        r.canonical
      );
    } else {
      console.log(r.path.padEnd(32) + r.status.padEnd(8) + `ERROR: ${r.error}`);
    }
  });

  console.log('='.repeat(90));
  console.log(`Target Routes: ${SNAPSHOT_TARGET_ROUTES.length} | Passed: ${SNAPSHOT_TARGET_ROUTES.length - criticalFailureCount} | Failed: ${criticalFailureCount}`);

  if (criticalFailureCount > 0) {
    console.error('\n[BUILD TERMINATED] Critical SEO route snapshot failed. Aborting build to prevent deployment of empty-body HTML.');
    process.exit(1);
  }

  console.log('\n[SUCCESS] Phase 1 static prerendering proof of concept successfully generated and verified.\n');
}

runStaticSnapshots().catch(err => {
  console.error('[FATAL PRERENDER EXCEPTION]:', err);
  process.exit(1);
});

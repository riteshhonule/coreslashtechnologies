import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// CLI options parsing: --target <dir> or --vercel-output
const args = process.argv.slice(2);
let targetDir = path.resolve(rootDir, 'dist');

if (args.includes('--vercel-output')) {
  targetDir = path.resolve(rootDir, '.vercel/output/static');
} else {
  const targetIndex = args.indexOf('--target');
  if (targetIndex !== -1 && args[targetIndex + 1]) {
    targetDir = path.resolve(rootDir, args[targetIndex + 1]);
  }
}

console.log(`\n======================================================`);
console.log(`[Validation Gate] Static Snapshot & Prerender Audit`);
console.log(`Auditing target directory: ${targetDir}`);
console.log(`======================================================\n`);

if (!fs.existsSync(targetDir)) {
  console.error(`❌ Critical: Target directory does not exist: ${targetDir}`);
  process.exit(1);
}

// 1. If auditing Vercel output, verify config.json exists
if (args.includes('--vercel-output')) {
  const configPath = path.resolve(rootDir, '.vercel/output/config.json');
  if (!fs.existsSync(configPath)) {
    console.error(`❌ Critical: .vercel/output/config.json is missing!`);
    process.exit(1);
  }
  try {
    const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    console.log(`✓ Vercel config.json is present and valid (version: ${configData.version || 'unknown'})`);
  } catch (err) {
    console.error(`❌ Critical: Failed to parse .vercel/output/config.json: ${err.message}`);
    process.exit(1);
  }
}

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

let failureCount = 0;
const snapshotSummary = [];

// 2. Exact Snapshot Target Definitions matching prerender.js
const SNAPSHOT_TARGETS = [
  {
    path: '/',
    relPath: 'index.html',
    expectedTitleSubstring: 'CoreSlash Technologies',
    expectedH1Substrings: ['AI-Powered', 'COMPLEX BUSINESS PROBLEMS'],
    expectedCanonical: 'https://coreslashtechnologies.com/',
    minBytes: 20000,
    minRootLength: 5000,
    minJsonLdCount: 1
  },
  {
    path: '/top-it-companies-in-belagavi',
    relPath: 'top-it-companies-in-belagavi/index.html',
    expectedTitleSubstring: 'Top IT & Software Companies in Belgaum',
    expectedH1Substrings: ['Top IT & Software Companies in Belgaum'],
    expectedCanonical: 'https://coreslashtechnologies.com/top-it-companies-in-belagavi',
    minBytes: 20000,
    minRootLength: 5000,
    minJsonLdCount: 1
  },
  {
    path: '/services/web-development',
    relPath: 'services/web-development/index.html',
    expectedTitleSubstring: 'Custom Web Development Services',
    expectedH1Substrings: ['Custom Web Development Services'],
    expectedCanonical: 'https://coreslashtechnologies.com/services/web-development',
    minBytes: 20000,
    minRootLength: 5000,
    minJsonLdCount: 2
  }
];

console.log(`Auditing 3 Full Static Snapshots...`);
for (const target of SNAPSHOT_TARGETS) {
  const filePath = path.resolve(targetDir, target.relPath);
  console.log(`Checking snapshot route: ${target.path} -> ${target.relPath}`);

  if (!fs.existsSync(filePath)) {
    console.error(`  ❌ Missing snapshot HTML file: ${filePath}`);
    failureCount++;
    continue;
  }

  let content;
  let stat;
  try {
    content = fs.readFileSync(filePath, 'utf8');
    stat = fs.statSync(filePath);
  } catch (readErr) {
    console.error(`  ❌ Failed to read HTML file ${filePath}: ${readErr.message}`);
    failureCount++;
    continue;
  }

  // File size check
  if (stat.size < target.minBytes) {
    console.error(`  ❌ Snapshot file size too small: ${stat.size} bytes (min: ${target.minBytes})`);
    failureCount++;
  }

  // #root content check
  const rootOpenTag = '<div id="root">';
  const rootIndex = content.indexOf(rootOpenTag);
  if (rootIndex === -1) {
    console.error(`  ❌ Missing <div id="root"> element in ${filePath}`);
    failureCount++;
  } else {
    const bodyCloseIndex = content.lastIndexOf('</body>');
    const rootPayload = content.slice(
      rootIndex + rootOpenTag.length,
      bodyCloseIndex !== -1 ? bodyCloseIndex : content.length
    );
    if (rootPayload.trim().length < target.minRootLength) {
      console.error(`  ❌ #root element content too short: ${rootPayload.trim().length} chars (min: ${target.minRootLength})`);
      failureCount++;
    }
  }

  // Title check (with HTML entity decode)
  const titleMatch = content.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decodeHtmlEntities(titleMatch[1].trim()) : '';
  if (!title.includes(target.expectedTitleSubstring)) {
    console.error(`  ❌ Title mismatch: expected to contain "${target.expectedTitleSubstring}", got "${title}"`);
    failureCount++;
  }

  // H1 check (with HTML entity decode)
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1Text = h1Match ? decodeHtmlEntities(h1Match[1].replace(/<[^>]+>/g, '').trim()) : '';
  for (const expectedSub of target.expectedH1Substrings) {
    if (!h1Text.includes(expectedSub)) {
      console.error(`  ❌ H1 mismatch: expected to contain "${expectedSub}", got "${h1Text}"`);
      failureCount++;
    }
  }

  // Canonical tag check
  const canonicalMatches = [...content.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"[^>]*>/gi)];
  if (canonicalMatches.length === 0) {
    console.error(`  ❌ Missing canonical tag in ${filePath}`);
    failureCount++;
  } else if (canonicalMatches.length > 1) {
    console.error(`  ❌ Duplicate canonical tags detected (${canonicalMatches.length}) in ${filePath}`);
    failureCount++;
  } else if (canonicalMatches[0][1] !== target.expectedCanonical) {
    console.error(`  ❌ Canonical mismatch: expected "${target.expectedCanonical}", got "${canonicalMatches[0][1]}"`);
    failureCount++;
  }

  // JSON-LD check
  const jsonLdMatches = [...content.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  if (jsonLdMatches.length < target.minJsonLdCount) {
    console.error(`  ❌ Insufficient JSON-LD blocks: found ${jsonLdMatches.length}, expected at least ${target.minJsonLdCount}`);
    failureCount++;
  }

  // Check for localhost / loopback leakage
  const localhostMatches = content.match(/https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?/gi);
  if (localhostMatches && localhostMatches.length > 0) {
    console.error(`  ❌ Leaked localhost/loopback origins detected: ${[...new Set(localhostMatches)].join(', ')}`);
    failureCount++;
  }

  // Check for accidental noindex
  if (/<meta\s+name="robots"\s+content="[^"]*noindex[^"]*"[^>]*>/i.test(content)) {
    console.error(`  ❌ Unintended noindex meta tag detected in ${filePath}`);
    failureCount++;
  }

  snapshotSummary.push({
    route: target.path,
    size: `${(stat.size / 1024).toFixed(1)} KB`,
    h1: h1Text.substring(0, 45) + (h1Text.length > 45 ? '...' : ''),
    jsonLdCount: jsonLdMatches.length,
    canonical: canonicalMatches[0] ? canonicalMatches[0][1] : 'NONE'
  });

  console.log(`  ✓ Snapshot verified: ${target.path} (${(stat.size / 1024).toFixed(1)} KB, JSON-LD: ${jsonLdMatches.length})`);
}

// 3. Derive Complete Route Inventory from Source Configuration using TypeScript AST
console.log(`\nIndependently deriving complete route inventory from source configuration...`);

function deriveExpectedRoutes() {
  // Extract static core and service routes from prerender.js AST
  const prerenderPath = path.resolve(__dirname, 'prerender.js');
  if (!fs.existsSync(prerenderPath)) {
    throw new Error(`Prerender script not found at ${prerenderPath}`);
  }
  const prerenderSrc = fs.readFileSync(prerenderPath, 'utf8');
  const prerenderAst = ts.createSourceFile('prerender.js', prerenderSrc, ts.ScriptTarget.Latest, true);

  const staticRoutes = [];
  ts.forEachChild(prerenderAst, node => {
    if (ts.isVariableStatement(node)) {
      node.declarationList.declarations.forEach(decl => {
        if (decl.name.text === 'routes' && decl.initializer && ts.isArrayLiteralExpression(decl.initializer)) {
          decl.initializer.elements.forEach(el => {
            if (ts.isObjectLiteralExpression(el)) {
              const r = {};
              el.properties.forEach(prop => {
                if (ts.isPropertyAssignment(prop)) {
                  const key = prop.name.text;
                  if (ts.isStringLiteral(prop.initializer)) {
                    r[key] = prop.initializer.text;
                  }
                }
              });
              if (r.path) staticRoutes.push(r);
            }
          });
        }
      });
    }
  });

  // Extract blog posts from blogData.ts AST
  const blogDataPath = path.resolve(rootDir, 'src/data/blogData.ts');
  if (!fs.existsSync(blogDataPath)) {
    throw new Error(`Blog data file not found at ${blogDataPath}`);
  }
  const blogDataSrc = fs.readFileSync(blogDataPath, 'utf8');
  const blogDataAst = ts.createSourceFile('blogData.ts', blogDataSrc, ts.ScriptTarget.Latest, true);

  const rawPosts = [];
  ts.forEachChild(blogDataAst, node => {
    if (ts.isVariableStatement(node)) {
      node.declarationList.declarations.forEach(decl => {
        if (decl.name.text === 'rawPosts' && decl.initializer && ts.isArrayLiteralExpression(decl.initializer)) {
          decl.initializer.elements.forEach(el => {
            if (ts.isObjectLiteralExpression(el)) {
              const post = {};
              el.properties.forEach(prop => {
                if (ts.isPropertyAssignment(prop)) {
                  const key = prop.name.text;
                  if (ts.isStringLiteral(prop.initializer)) {
                    post[key] = prop.initializer.text;
                  }
                }
              });
              if (post.slug) rawPosts.push(post);
            }
          });
        }
      });
    }
  });

  // Combine matching prerender.js route creation logic
  const allRoutes = [...staticRoutes];
  rawPosts.forEach(post => {
    const titleSuffix = post.slug === 'best-react-js-development-company-in-bangalore'
      ? '| CoreSlash'
      : '| CoreSlash Technologies';

    allRoutes.push({
      path: `/blog/${post.slug}`,
      title: `${post.title} ${titleSuffix}`,
      description: post.metaDescription
    });
  });

  return { staticRoutes, rawPosts, allRoutes };
}

const { staticRoutes, rawPosts, allRoutes } = deriveExpectedRoutes();

console.log(`Discovered static core/service routes from prerender.js: ${staticRoutes.length}`);
console.log(`Discovered blog article routes from blogData.ts: ${rawPosts.length}`);
console.log(`Total project routes inventory: ${allRoutes.length}`);

const snapshotPaths = new Set(SNAPSHOT_TARGETS.map(t => t.path));
const metadataOnlyRoutes = allRoutes.filter(r => !snapshotPaths.has(r.path));

console.log(`Full static snapshot routes: ${snapshotPaths.size}`);
console.log(`Expected metadata-only routes to validate: ${metadataOnlyRoutes.length}`);

// Strictly assert expected route count derived from source
if (allRoutes.length !== 63) {
  console.error(`❌ Critical route inventory error: expected 63 total routes, found ${allRoutes.length}`);
  failureCount++;
}

if (metadataOnlyRoutes.length !== 60) {
  console.error(`❌ Critical metadata-only count error: expected 60 metadata-only routes, found ${metadataOnlyRoutes.length}`);
  failureCount++;
}

// 4. Validate All 60 Metadata-Only Routes
console.log(`\nAuditing all ${metadataOnlyRoutes.length} metadata-only HTML routes on disk...`);
let metadataPassCount = 0;

for (const route of metadataOnlyRoutes) {
  const relFolder = route.path.replace(/^\//, '');
  const filePath = path.resolve(targetDir, relFolder, 'index.html');
  const expectedCanonical = route.canonical || `https://coreslashtechnologies.com${route.path === '/' ? '' : route.path}`;

  if (!fs.existsSync(filePath)) {
    console.error(`  ❌ [${route.path}] Missing metadata HTML file at ${filePath}`);
    failureCount++;
    continue;
  }

  let content;
  let stat;
  try {
    content = fs.readFileSync(filePath, 'utf8');
    stat = fs.statSync(filePath);
  } catch (err) {
    console.error(`  ❌ [${route.path}] Failed to read file ${filePath}: ${err.message}`);
    failureCount++;
    continue;
  }

  if (stat.size === 0) {
    console.error(`  ❌ [${route.path}] HTML file is 0 bytes (empty): ${filePath}`);
    failureCount++;
    continue;
  }

  let routeHasError = false;

  // Title check (assert presence and exact match against source-derived expected title)
  const titleMatch = content.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decodeHtmlEntities(titleMatch[1].trim()) : '';
  if (!title || title.length === 0) {
    console.error(`  ❌ [${route.path}] Missing or empty <title> tag in ${filePath}`);
    failureCount++;
    routeHasError = true;
  } else if (title !== route.title) {
    console.error(`  ❌ [${route.path}] Title mismatch:\n     expected: "${route.title}"\n     actual:   "${title}"`);
    failureCount++;
    routeHasError = true;
  }

  // Canonical tag check
  const canonicalMatches = [...content.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"[^>]*>/gi)];
  if (canonicalMatches.length === 0) {
    console.error(`  ❌ [${route.path}] Missing canonical tag in ${filePath}`);
    failureCount++;
    routeHasError = true;
  } else if (canonicalMatches.length > 1) {
    console.error(`  ❌ [${route.path}] Duplicate canonical tags (${canonicalMatches.length}) in ${filePath}`);
    failureCount++;
    routeHasError = true;
  } else if (canonicalMatches[0][1] !== expectedCanonical) {
    console.error(`  ❌ [${route.path}] Canonical mismatch: expected "${expectedCanonical}", got "${canonicalMatches[0][1]}"`);
    failureCount++;
    routeHasError = true;
  }

  // Meta description check (assert presence and exact match against source-derived expected description)
  const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]*)"[^>]*>/i);
  const description = descMatch ? decodeHtmlEntities(descMatch[1].trim()) : '';
  if (!description || description.length === 0) {
    console.error(`  ❌ [${route.path}] Missing or empty meta description in ${filePath}`);
    failureCount++;
    routeHasError = true;
  } else if (description !== route.description) {
    console.error(`  ❌ [${route.path}] Meta description mismatch:\n     expected: "${route.description}"\n     actual:   "${description}"`);
    failureCount++;
    routeHasError = true;
  }

  // Localhost / 127.0.0.1 leakage check
  const localhostMatches = content.match(/https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?/gi);
  if (localhostMatches && localhostMatches.length > 0) {
    console.error(`  ❌ [${route.path}] Leaked localhost/loopback origins: ${[...new Set(localhostMatches)].join(', ')}`);
    failureCount++;
    routeHasError = true;
  }

  // Unintended noindex check
  if (/<meta\s+name="robots"\s+content="[^"]*noindex[^"]*"[^>]*>/i.test(content)) {
    console.error(`  ❌ [${route.path}] Unintended noindex tag detected in ${filePath}`);
    failureCount++;
    routeHasError = true;
  }

  if (!routeHasError) {
    metadataPassCount++;
  }
}

console.log(`\n======================================================`);
console.log(`[Validation Summary]`);
console.log(`Snapshot Routes: ${SNAPSHOT_TARGETS.length} audited`);
console.table(snapshotSummary);
console.log(`Metadata Routes: ${metadataPassCount} / ${metadataOnlyRoutes.length} passed successfully`);
console.log(`======================================================`);

if (failureCount > 0) {
  console.error(`\n❌ Prerender validation gate failed with ${failureCount} error(s)! Aborting deployment.\n`);
  process.exit(1);
}

console.log(`\n✅ Prerender validation gate PASSED. All ${SNAPSHOT_TARGETS.length} snapshots and all ${metadataOnlyRoutes.length} metadata routes verified.\n`);
process.exit(0);

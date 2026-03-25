const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'src', 'img', 'blog');
const blogDataPath = path.join(__dirname, 'src', 'data', 'blogData.ts');

const images = fs.readdirSync(imgDir);
let blogData = fs.readFileSync(blogDataPath, 'utf-8');

const importStatements = [];
const imageMap = {};

images.forEach(img => {
    const slug = path.parse(img).name;
    const varName = 'img_' + slug.replace(/[^a-zA-Z0-9]/g, '_');
    importStatements.push(`import ${varName} from "../img/blog/${img}";`);
    imageMap[slug] = varName;
});

// also remove existing imports from other directories (like ../assets/blog)
blogData = blogData.replace(/import .* from .*assets\/blog.*\\n/g, '');

const regex = /slug: "([^"]+)",([\s\S]*?)image: "([^"]+)"/g;

const newContent = blogData.replace(regex, (m, slug, between, imageUrl) => {
    if (imageMap[slug]) {
        return `slug: "${slug}",${between}image: ${imageMap[slug]}`;
    }
    // If we have an image but it's not matched exactly by slug, maybe we fallback or leave as is.
    // Let's do a fallback lookup if possible.
    // For example, "seo-company-in-bangalore-guide" -> maybe there is "seo-company-in-bangalore-success.jpg"?
    if (!imageMap[slug]) {
        if (slug === 'seo-company-in-bangalore-guide' && imageMap['best-seo-company-in-bangalore-success']) {
            return `slug: "${slug}",${between}image: ${imageMap['best-seo-company-in-bangalore-success']}`;
        }
    }
    return m;
});

// Add imports below the last import statement or at the top
const contentLines = newContent.split('\n');
let lastImportIdx = -1;
for (let i = 0; i < contentLines.length; i++) {
    if (contentLines[i].startsWith('import')) {
        lastImportIdx = i;
    }
}

contentLines.splice(lastImportIdx + 1, 0, ...importStatements);

fs.writeFileSync(blogDataPath, contentLines.join('\n'));
console.log('Done!');

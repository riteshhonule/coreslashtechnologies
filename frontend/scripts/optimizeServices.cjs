const fs = require('fs');
const path = require('path');

const dir = 'd:/final/frontend/src/pages/services';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'ServicesLayout.tsx' && f !== 'WebsiteDevelopment.tsx');

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. viewport={{ once: true }} -> viewport={{ once: true, margin: "50px" }}
    content = content.replace(/viewport=\{\{\s*once:\s*true\s*\}\}/g, 'viewport={{ once: true, margin: "50px" }}');

    // 2. transition={{ delay: i * 0.1 }} -> transition={{ duration: 0.3, delay: i * 0.05 }}
    content = content.replace(/transition=\{\{\s*delay:\s*i\s*\*\s*0\.1\s*\}\}/g, 'transition={{ duration: 0.3, delay: i * 0.05 }}');

    // 3. transition={{ delay: idx * 0.1 }} -> transition={{ duration: 0.3, delay: idx * 0.05 }}
    content = content.replace(/transition=\{\{\s*delay:\s*idx\s*\*\s*0\.1\s*\}\}/g, 'transition={{ duration: 0.3, delay: idx * 0.05 }}');

    // 4. blur-3xl -> hidden md:block blur-3xl
    content = content.replace(/<div className="absolute top-0 right-0 w-32 h-32 bg-primary-purple\/10 rounded-full blur-3xl pointer-events-none" \/>/g, '<div className="hidden md:block absolute top-0 right-0 w-32 h-32 bg-primary-purple/10 rounded-full blur-3xl pointer-events-none" />');
    
    // 5. Add lazy loading to images inside bento features
    content = content.replace(/<img src=\{f\.icon\} alt=\{f\.title\} className="w-7 h-7 object-contain\s+transition-all" \/>/g, '<img src={f.icon} alt={f.title} loading="lazy" decoding="async" className="w-7 h-7 object-contain  transition-all" />');

    // 6. Add lazy loading to main image (match specific class pattern)
    // Looking for: className="w-full h-full object-contain transition-all duration-1000"
    content = content.replace(/className="w-full h-full object-contain transition-all duration-1000"(\s*\/>)/g, 'loading="lazy"\n                                        decoding="async"\n                                        className="w-full h-full object-contain transition-all duration-1000"$1');

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log("Processed files:", files);

const fs = require('fs');
const path = require('path');

const directories = [
    'd:/final/frontend/src/components',
    'd:/final/frontend/src/components/blog',
    'd:/final/frontend/src/pages',
    'd:/final/frontend/src/pages/services',
    'd:/final/frontend/src/pages/superadmin'
];

let processedCount = 0;

function processDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            // We are explicitly giving directories, but just in case
            // processDirectory(fullPath);
        } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // 1. Replace opacity: 0 with opacity: 1 in initial={{ ... }}
            // Loop because there could be multiple occurrences and the regex might match overlapping if we aren't careful, 
            // but the [^}]* ensures we stay within the object.
            content = content.replace(/initial=\{\{([^}]*)opacity:\s*0([^}]*)\}\}/g, 'initial={{$1opacity: 1$2}}');

            // 2. Globally set viewport margins to 200px and amount to 0
            content = content.replace(/viewport=\{\{[^}]*\}\}/g, 'viewport={{ once: true, amount: 0, margin: "200px" }}');

            // 3. Make sure any transition delay is small
            // E.g., delay: idx * 0.1 -> delay: idx * 0.05
            content = content.replace(/delay:\s*([a-zA-Z]+)\s*\*\s*0\.[1-9]+/g, 'delay: $1 * 0.05');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                processedCount++;
                console.log(`Updated: ${fullPath}`);
            }
        }
    });
}

directories.forEach(processDirectory);
console.log(`Finished processing. Updated ${processedCount} files.`);

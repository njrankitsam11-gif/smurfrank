const fs = require('fs');

let content = fs.readFileSync('components/CartDrawer.bun.test.js', 'utf8');

const replacerString = `
        const seen = new Set();
        const treeStr = JSON.stringify(result, (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        });
`;

content = content.replace(/const treeStr = JSON\.stringify\(result\);/g, replacerString.trim());
fs.writeFileSync('components/CartDrawer.bun.test.js', content);

const fs = require('fs');
let content = fs.readFileSync('components/CartDrawer.bun.test.js', 'utf8');

const replacer = `
const safeStringify = (obj) => {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    });
};
`;

content = content.replace('describe("CartDrawer Component", () => {', 'describe("CartDrawer Component", () => {\n' + replacer);
content = content.replace(/JSON\.stringify/g, 'safeStringify');

fs.writeFileSync('components/CartDrawer.bun.test.js', content);

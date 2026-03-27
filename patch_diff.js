const fs = require('fs');
const file = 'app/gta-v/page.js';
let content = fs.readFileSync(file, 'utf8');

const search = `export const metadata = {
  title: 'Buy GTA V Modded Accounts | $2B Cash & Level 500 | SmurfRank',
  description: 'Premium GTA V Modded accounts for PC and Console. Instant delivery on billions in cash, high levels, and rare modded outfits.',
};`;

const replace = `export const metadata = {
  title: "Buy GTA V Modded Accounts | $2B Cash & Level 500 | SmurfRank",
  description: "Premium GTA V Modded accounts for PC and Console. Instant delivery on billions in cash, high levels, and rare modded outfits.",
};`;

content = content.replace(search, replace);
fs.writeFileSync(file, content);

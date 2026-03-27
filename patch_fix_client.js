const fs = require('fs');
const file = 'app/gta-v/page.client.js';
let content = fs.readFileSync(file, 'utf8');

const search = `    <main style={{ background: '#0a0a0b', minHeight: '100vh', padding: '80px 20px', color: '#fff' }}>
      {/* 🚀 GTA V SEO */}
      <title>Buy GTA V Modded Accounts | $2B Cash & Level 500 | SmurfRank</title>
      <meta name="description" content="Premium GTA V Modded accounts for PC and Console. Instant delivery on billions in cash, high levels, and rare modded outfits." />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>`;

const replace = `    <main style={{ background: '#0a0a0b', minHeight: '100vh', padding: '80px 20px', color: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>`;

content = content.replace(search, replace);
fs.writeFileSync(file, content);

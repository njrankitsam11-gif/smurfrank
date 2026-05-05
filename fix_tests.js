const fs = require('fs');

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace findUnique with findFirst
  content = content.replace(/findUnique/g, 'findFirst');

  // Replace { where: { email: '...' } } with { where: { email: { equals: '...', mode: 'insensitive' } } }
  // Regex to match: where: { email: '<something>' } or where: { email: someVar }
  // Since test cases usually do something like: where: { email: 'test@example.com' }
  content = content.replace(/where:\s*{\s*email:\s*('[^']+'|"[^"]+"|[\w]+)\s*}/g, "where: { email: { equals: $1, mode: 'insensitive' } }");

  fs.writeFileSync(filePath, content);
}

const files = [
  '__tests__/api/auth.test.js',
  '__tests__/api/register/route.test.js',
  '__tests__/nextauth.test.js',
  'app/api/register/route.bun.test.js',
  'app/api/register/passwordValidation.bun.test.js',
  'app/api/register/errorHandling.bun.test.js',
  'app/api/register/emailValidation.bun.test.js',
  'app/api/register/rateLimit.bun.test.js'
];

files.forEach(updateFile);
console.log('Tests updated');

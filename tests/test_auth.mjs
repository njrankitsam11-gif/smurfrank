import { validatePassword } from '../lib/auth.js';

const testCases = [
  { password: 'short', expected: false, message: 'Password must be at least 8 characters long' },
  { password: 'alllowercase1!', expected: false, message: 'Password must contain at least one uppercase letter' },
  { password: 'ALLUPPERCASE1!', expected: false, message: 'Password must contain at least one lowercase letter' },
  { password: 'NoNumber!', expected: false, message: 'Password must contain at least one number' },
  { password: 'NoSpecial1', expected: false, message: 'Password must contain at least one special character' },
  { password: 'Valid1!Password', expected: true, message: 'Password is valid' },
  { password: 'Another1@Valid', expected: true, message: 'Password is valid' },
  { password: 'Valid_1-Plus+', expected: true, message: 'Password is valid' },
];

let failed = false;

testCases.forEach(({ password, expected, message }) => {
  const result = validatePassword(password);
  if (result.isValid !== expected) {
    console.error(`FAIL: Password "${password}" expected isValid=${expected}, got ${result.isValid}`);
    failed = true;
  } else if (!expected && result.message !== message) {
    console.error(`FAIL: Password "${password}" expected message "${message}", got "${result.message}"`);
    failed = true;
  } else {
    console.log(`PASS: Password "${password}" ${expected ? 'is valid' : 'is correctly rejected'}`);
  }
});

if (failed) {
  process.exit(1);
} else {
  console.log('All tests passed!');
}

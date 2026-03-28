const { test, expect } = require('@playwright/test');

test('Check GTA V SEO', async ({ page }) => {
  await page.goto('http://localhost:3000/gta-v');
  await expect(page).toHaveTitle('Buy GTA V Modded Accounts | $2B Cash & Level 500 | SmurfRank');
  const description = await page.locator('meta[name="description"]').getAttribute('content');
  expect(description).toBe('Premium GTA V Modded accounts for PC and Console. Instant delivery on billions in cash, high levels, and rare modded outfits.');
});

const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/gta-v');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'gta-v-page.png' });
  await browser.close();
})();

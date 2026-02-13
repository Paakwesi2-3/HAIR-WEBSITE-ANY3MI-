const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.on('console', msg => console.log(`PAGE LOG [${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => console.log('PAGE ERROR', err && err.message ? err.message : String(err)));

  const url = 'http://localhost:5178/';
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  // include both variants: menu item label and the desktop 'Book Now' button text
  const navItems = ['Services','Shop','Gallery','Book Now','Booking','About','Contact'];
  for (const item of navItems) {
    try {
      console.log('Clicking', item);
      // find button by text
      const btn = await page.locator(`button:has-text("${item}")`).first();
      if (await btn.count() === 0) {
        console.log('Button not found for', item);
        continue;
      }
      await btn.click();
      await page.waitForTimeout(700);
      const name = item.toLowerCase();
      const path = `/tmp/${name}.png`;
      await page.screenshot({ path, fullPage: true });
      console.log('Saved screenshot', path);
    } catch (e) {
      console.error('Error clicking', item, e.message || e);
    }
  }
  await browser.close();
})();

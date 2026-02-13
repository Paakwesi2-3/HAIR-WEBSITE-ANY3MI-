const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => {
    try { console.log(`PAGE LOG [${msg.type()}] ${msg.text()}`); } catch (e) { console.log('PAGE LOG (error reading message)'); }
  });
  page.on('pageerror', err => console.log('PAGE ERROR', err && err.message ? err.message : String(err)));
  page.on('requestfailed', req => console.log('REQUEST FAILED', req.url(), req.failure && req.failure().errorText));

  console.log('Opening http://localhost:5178/ ...');
  try {
    await page.goto('http://localhost:5178/', { waitUntil: 'networkidle' });
    // wait a bit for any console messages
    await page.waitForTimeout(3000);
    console.log('Done - captured logs.');
  } catch (err) {
    console.error('Navigation error:', err.message || err);
  }

  await browser.close();
})();

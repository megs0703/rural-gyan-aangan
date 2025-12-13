const { chromium } = require('playwright');

(async () => {
  const url = process.argv[2] || 'http://localhost:5173/';
  console.log('Opening', url);
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('[console]', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('[pageerror]', err && err.stack ? err.stack : String(err)));
  page.on('requestfailed', req => console.log('[requestfailed]', req.url(), req.failure() && req.failure().errorText));

  try {
    await page.goto(url, { waitUntil: 'load', timeout: 15000 });
    await page.waitForTimeout(1500);
    const html = await page.content();
    console.log('[result] html-length=', html.length);
  } catch (e) {
    console.error('[error]', e && e.stack ? e.stack : e);
    process.exitCode = 2;
  } finally {
    await browser.close();
  }
})();

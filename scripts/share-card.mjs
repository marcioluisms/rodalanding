import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.route('**/*', route => route.request().url().startsWith('file:') ? route.continue() : route.abort());
  await page.goto(new URL('./share-card.html', import.meta.url).href);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: fileURLToPath(new URL('../site/assets/share.png', import.meta.url)) });
} finally { await browser.close(); }

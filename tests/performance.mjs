import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = process.env.QA_OUTPUT || path.resolve(project, '../../Novo site Roda IA/execucao/site_p5_v01/evidencias');
const base = 'http://127.0.0.1:4173';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const report = { browser: browser.version(), profile: { viewport: '390x844', deviceScaleFactor: 1, cpuSlowdown: 4, latencyMs: 150, downloadBitsPerSecond: 1600000, uploadBitsPerSecond: 750000, coldCache: true }, runs: [], limits: 'Simulação local em Edge desktop. Não mede INP de visitantes nem desempenho da hospedagem. Interação: intervalo entre evento click e duas oportunidades de pintura.' };
try {
  for (let run = 0; run < 3; run++) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
    const page = await context.newPage();
    await page.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
    const cdp = await context.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1600000 / 8, uploadThroughput: 750000 / 8 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await page.addInitScript(() => {
      window.metrics = { lcpMs: null, cls: 0, menuPaintMs: null };
      new PerformanceObserver(list => { for (const entry of list.getEntries()) window.metrics.lcpMs = entry.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.metrics.cls += entry.value; }).observe({ type: 'layout-shift', buffered: true });
      document.addEventListener('click', event => {
        if (event.target.closest('#menu-toggle')) {
          const start = performance.now();
          requestAnimationFrame(() => requestAnimationFrame(() => window.metrics.menuPaintMs = performance.now() - start));
        }
      }, true);
    });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.locator('#menu-toggle').click();
    await page.waitForFunction(() => window.metrics.menuPaintMs !== null);
    const metrics = await page.evaluate(() => ({ ...window.metrics, transferBytes: [...performance.getEntriesByType('navigation'), ...performance.getEntriesByType('resource')].reduce((sum, entry) => sum + entry.transferSize, 0) }));
    report.runs.push(metrics);
    await context.close();
  }
  report.summary = {};
  for (const field of ['lcpMs', 'cls', 'menuPaintMs', 'transferBytes']) {
    const values = report.runs.map(run => run[field]).sort((a, b) => a - b);
    report.summary[field] = { median: values[1], min: values[0], max: values[2] };
  }
  report.passed = report.runs.every(run => run.lcpMs !== null && run.lcpMs <= 2500 && run.cls <= .1 && run.menuPaintMs <= 200 && run.transferBytes <= 450 * 1024);
} finally {
  await browser.close(); await mkdir(output, { recursive: true });
  await writeFile(path.join(output, 'performance-results.json'), JSON.stringify(report, null, 2));
}
console.log(JSON.stringify(report, null, 2));
assert.ok(report.passed, 'Orçamentos de desempenho não atingidos; consultar relatório');

import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, firefox } from 'playwright';

// Independent local QA. Start the reviewed local server before running this file.
// No external request is allowed and the WhatsApp link is never activated.
const require = createRequire(import.meta.url);
const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = new URL(process.env.QA_BASE_URL || 'http://127.0.0.1:4173');
assert.equal(base.hostname, '127.0.0.1', 'QA must target loopback only');
const engine = process.env.QA_BROWSER || 'chromium';
assert.ok(['chromium', 'firefox'].includes(engine));
const evidenceRoot = path.resolve(project, '../../Novo site Roda IA/execucao/site_p5_v01/evidencias');
const output = process.env.QA_OUTPUT || (engine === 'firefox' ? path.join(evidenceRoot, 'firefox') : evidenceRoot);
await mkdir(output, { recursive: true });
const expected = JSON.parse(await readFile(path.join(project, 'tests/copy-approved.json'), 'utf8'));
assert.ok(Array.isArray(expected), 'copy-approved.json must contain the approved pieces array');
assert.equal(expected.length, 11);
const axeSource = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
const report = { date: new Date().toISOString(), base: base.origin, channel: process.env.QA_BROWSER_CHANNEL || 'msedge', tests: [], externalRequests: [], pageErrors: [], screenshots: [], limits: ['Local server only; no provider, DNS, remote preview or real-device testing.', 'No screen reader or actual browser zoom test; viewport reflow is measured separately.', 'No WhatsApp navigation, login or message sent.', 'Automated accessibility findings are not WCAG certification.'] };
report.engine = engine;
if (engine === 'firefox') report.channel = 'playwright-local';
const browser = engine === 'firefox' ? await firefox.launch({ headless: true }) : await chromium.launch({ channel: report.channel, headless: true });
report.browserVersion = browser.version();
const normalize = text => text.replace(/\s+/g, ' ').trim();
const contexts = [];
async function context(options = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', serviceWorkers: 'block', ...options });
  contexts.push(ctx);
  await ctx.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.origin === base.origin) return route.continue();
    report.externalRequests.push({ url: url.origin + url.pathname, resource: route.request().resourceType() });
    return route.abort('blockedbyclient');
  });
  ctx.on('page', page => page.on('pageerror', error => report.pageErrors.push(error.message)));
  return ctx;
}
async function test(name, callback) {
  try { const detail = await callback(); report.tests.push({ name, passed: true, ...(detail ? { detail } : {}) }); }
  catch (error) { report.tests.push({ name, passed: false, error: error.message }); }
}
try {
  const ctx = await context();
  const page = await ctx.newPage();
  await page.goto(base.href, { waitUntil: 'networkidle' });
  await test('SEO: título e hero coerentes, metadados completos, dados estruturados e hierarquia', async () => {
    const slogan = 'Tecnologia para facilitar o dia a dia da sua empresa';
    const title = `Roda IA - ${slogan}`;
    assert.equal(await page.title(), title);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(normalize(await page.locator('h1').innerText()), slogan);
    assert.equal(await page.locator('html').getAttribute('lang'), 'pt-BR');
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://roda.ia.br/');
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    assert.ok(description.length > 60);
    for (const prefix of ['og', 'twitter']) {
      const attribute = prefix === 'og' ? 'property' : 'name';
      assert.equal(await page.locator(`meta[${attribute}="${prefix}:title"]`).getAttribute('content'), title);
      assert.equal(await page.locator(`meta[${attribute}="${prefix}:description"]`).getAttribute('content'), description);
      assert.equal(await page.locator(`meta[${attribute}="${prefix}:image"]`).getAttribute('content'), 'https://roda.ia.br/assets/share.png');
    }
    const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent())['@graph'];
    assert.equal(graph.find(item => item['@type'] === 'WebPage').name, title);
    assert.equal(graph.find(item => item['@type'] === 'Organization').name, 'Roda IA');
    assert.equal(await page.locator('#acompanhamento, a[href="#acompanhamento"]').count(), 0);
    assert.deepEqual(await page.locator('.example-number').allTextContents(), ['01', '02', '03']);
    assert.ok((await page.locator('.example h3').allTextContents()).every(text => !/^Exemplo \d/.test(text)));
    const headings = await page.locator('h1,h2,h3,h4,h5,h6').evaluateAll(nodes => nodes.map(node => Number(node.tagName.slice(1))));
    for (let i = 1; i < headings.length; i++) assert.ok(headings[i] <= headings[i - 1] + 1);
  });
  await test('11 approved pieces / 25 literal blocks, visible and in approved order', async () => {
    assert.deepEqual(await page.locator('[data-piece]').evaluateAll(nodes => nodes.map(node => node.dataset.piece)), expected.map(piece => piece.id));
    let blocks = 0;
    for (const piece of expected) {
      const section = page.locator(`[data-piece="${piece.id}"]`);
      for (const field of ['eyebrow', 'title', 'cta']) {
        const item = section.locator(`[data-copy="${field}"]`);
        if (piece[field]) { assert.equal(await item.count(), 1); const copy = await item.evaluate(node => { const clone = node.cloneNode(true); clone.querySelectorAll('[aria-hidden="true"]').forEach(child => child.remove()); return clone.textContent; }); assert.equal(normalize(copy), normalize(piece[field]), `${piece.id} ${field}`); assert.ok(await item.isVisible()); blocks++; }
        else assert.equal(await item.count(), 0, `${piece.id} unexpected ${field}`);
      }
      const paragraphs = section.locator('[data-copy="paragraph"]');
      assert.deepEqual((await paragraphs.allInnerTexts()).map(normalize), (piece.paragraphs || []).map(normalize), `${piece.id} paragraphs`);
      for (let index = 0; index < await paragraphs.count(); index++) assert.ok(await paragraphs.nth(index).isVisible());
      blocks += piece.paragraphs?.length || 0;
    }
    assert.equal(blocks, 25);
    return { pieces: expected.length, blocks };
  });
  await test('Local fonts and images decode', async () => {
    const result = await page.evaluate(async () => {
      await document.fonts.ready;
      return { fonts: [...document.fonts].map(font => ({ family: font.family, status: font.status })), images: [...document.images].map(image => ({ path: new URL(image.currentSrc).pathname, loaded: image.complete && image.naturalWidth > 0 })) };
    });
    assert.ok(result.fonts.some(font => font.family.includes('Hanken') && font.status === 'loaded'));
    assert.ok(result.fonts.some(font => font.family.includes('Schibsted') && font.status === 'loaded'));
    assert.ok(result.images.length > 0);
    assert.ok(result.images.every(image => image.loaded));
    return result;
  });
  await test('Anchors resolve; WhatsApp link has expected safe shape without navigation', async () => {
    const links = await page.locator('a[href]').evaluateAll(nodes => nodes.map(node => ({ href: node.getAttribute('href'), target: node.target, rel: node.rel })));
    let contact = 0;
    let brandLinks = 0;
    for (const link of links) {
      if (link.href.startsWith('#')) assert.equal(await page.locator(`[id="${link.href.slice(1)}"]`).count(), 1, `Anchor ${link.href}`);
      else {
        const url = new URL(link.href, base);
        if (url.origin === base.origin) continue;
        if (url.origin === 'https://roda.ia.br') {
          assert.equal(url.pathname, '/');
          assert.equal(url.search, '');
          assert.equal(url.hash, '');
          brandLinks++;
          continue;
        }
        assert.equal(url.origin, 'https://wa.me');
        assert.match(url.pathname, /^\/\d{10,15}$/);
        assert.equal(url.search, '');
        if (link.target === '_blank') assert.match(link.rel, /noopener/);
        contact++;
      }
    }
    assert.equal(contact, 1, 'One deliberate WhatsApp CTA');
    assert.equal(brandLinks, 2, 'Header and footer link to the canonical home');
    return { localAnchors: links.filter(link => link.href.startsWith('#')).length, contactLinks: contact, destinationNumber: 'Not repeated in evidence; compare with D-04 separately.' };
  });
  for (const width of [320, 390, 768, 1024, 1440]) {
    await test(`Responsive ${width}px: no overflow, visible copy and loaded assets`, async () => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(base.href, { waitUntil: 'networkidle' });
      const metrics = await page.evaluate(() => ({ viewport: innerWidth, width: document.documentElement.scrollWidth, clipped: [...document.querySelectorAll('[data-copy]')].filter(node => node.scrollWidth > node.clientWidth + 1 && getComputedStyle(node).overflowX !== 'visible').map(node => node.closest('[data-piece]')?.dataset.piece) }));
      assert.ok(metrics.width <= metrics.viewport + 1, JSON.stringify(metrics));
      assert.deepEqual(metrics.clipped, []);
      const screenshot = `pagina-${width}.png`;
      await page.screenshot({ path: path.join(output, screenshot), fullPage: true });
      report.screenshots.push(screenshot);
      return metrics;
    });
    if (width === 390 || width === 1440) await test(`axe WCAG 2.2 AA and contrast at ${width}px`, async () => {
      // Test-only evaluation deliberately avoids changing product CSP for axe injection.
      await page.evaluate(axeSource);
      const result = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } }));
      await writeFile(path.join(output, `axe-${width}.json`), JSON.stringify(result, null, 2));
      assert.deepEqual(result.violations.map(item => ({ id: item.id, impact: item.impact, targets: item.nodes.map(node => node.target) })), []);
      return { violations: 0, incomplete: result.incomplete.map(item => item.id), passes: result.passes.length };
    });
  }
  await test('Contato é o único item, visível no celular e acessível por teclado', async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base.href, { waitUntil: 'networkidle' });
    const nav = page.locator('#navigation');
    assert.equal(await nav.locator('a').count(), 1);
    assert.equal(await page.locator('#menu-toggle').count(), 0);
    assert.ok(await nav.isVisible());
    const contact = nav.locator('a[href="#contato"]');
    assert.ok(await contact.isVisible());
    await contact.focus();
    await page.keyboard.press('Enter');
    assert.equal(new URL(page.url()).hash, '#contato');
    assert.ok(await page.locator('#contato').evaluate(node => document.activeElement === node));
    await contact.focus();
    const focus = await contact.evaluate(node => { const css = getComputedStyle(node); return { style: css.outlineStyle, width: css.outlineWidth, color: css.outlineColor }; });
    assert.notEqual(focus.style, 'none');
    assert.ok(parseFloat(focus.width) >= 2);
    await contact.scrollIntoViewIfNeeded();
    await page.screenshot({ path: path.join(output, 'foco-contato-topo.png') });
    report.screenshots.push('foco-contato-topo.png');
    return { anchor: '#contato', focus };
  });
  await test('JavaScript off: essential copy, contact and mobile navigation remain available', async () => {
    const noJS = await context({ javaScriptEnabled: false, viewport: { width: 320, height: 844 } });
    const noJSPage = await noJS.newPage();
    await noJSPage.goto(base.href, { waitUntil: 'networkidle' });
    assert.ok(await noJSPage.locator('#navigation').isVisible());
    for (const link of await noJSPage.locator('#navigation a').all()) assert.ok(await link.isVisible());
    assert.equal(await noJSPage.locator('[data-piece]').count(), 11);
    assert.ok(await noJSPage.locator('[data-copy="cta"]').isVisible());
    assert.equal(await noJSPage.locator('#menu-toggle').isVisible(), false);
    await noJSPage.locator('#navigation a[href="#contato"]').click();
    assert.equal(new URL(noJSPage.url()).hash, '#contato');
    await noJSPage.goto(base.href, { waitUntil: 'networkidle' });
    await noJSPage.screenshot({ path: path.join(output, 'sem-javascript-320.png'), fullPage: true });
    report.screenshots.push('sem-javascript-320.png');
  });
  await test('Real local HTTP 404 for removed Bento variants and unknown URLs', async () => {
    const statuses = [];
    for (const route of ['/bentogastronomia', '/bentogastronomia/', '/bentogastronomia/index.html', '/__qa_missing__', '/assets/main-B5AZ-ynf.js']) {
      const response = await fetch(new URL(route, base), { redirect: 'manual' });
      assert.equal(response.status, 404, route);
      const body = await response.text();
      assert.ok(!body.includes('Refúgio em Penedo'), route);
      statuses.push({ route, status: response.status });
    }
    return statuses;
  });
  await test('Skip link reached by Tab transfers keyboard focus to main content', async () => {
    await page.goto(base.href, { waitUntil: 'networkidle' });
    await page.keyboard.press('Tab');
    assert.ok(await page.locator('.skip-link').evaluate(node => document.activeElement === node));
    assert.ok(await page.locator('.skip-link').isVisible());
    await page.keyboard.press('Enter');
    assert.equal(new URL(page.url()).hash, '#conteudo');
    assert.ok(await page.locator('#conteudo').evaluate(node => document.activeElement === node));
  });
  await test('Dark-section contact: text and keyboard-focus contrast', async () => {
    await page.goto(base.href, { waitUntil: 'networkidle' });
    const contact = page.locator('.contact-action');
    await page.keyboard.press('Tab');
    await contact.focus();
    await contact.scrollIntoViewIfNeeded();
    const colors = await contact.evaluate(node => { const css = getComputedStyle(node); return { text: css.color, fill: css.backgroundColor, outline: css.outlineColor, outlineWidth: css.outlineWidth, outlineStyle: css.outlineStyle, surrounding: getComputedStyle(node.closest('.surface-dark')).backgroundColor }; });
    const luminance = value => {
      const channels = value.match(/\d+(?:\.\d+)?/g).slice(0, 3).map(Number).map(channel => channel / 255).map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    };
    const contrast = (a, b) => { const x = luminance(a); const y = luminance(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    const textRatio = contrast(colors.text, colors.fill);
    const focusRatio = contrast(colors.outline, colors.surrounding);
    assert.ok(textRatio >= 4.5);
    assert.ok(focusRatio >= 3);
    assert.notEqual(colors.outlineStyle, 'none');
    assert.ok(parseFloat(colors.outlineWidth) >= 2);
    const target = await contact.boundingBox();
    assert.ok(target.height >= 48);
    await page.screenshot({ path: path.join(output, 'foco-contato-escuro.png') });
    report.screenshots.push('foco-contato-escuro.png');
    return { colors, textRatio, focusRatio, targetHeight: target.height };
  });
  await test('404 page at 390px: local status, no overflow, axe and screenshot', async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(new URL('/__qa_missing__', base).href, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 404);
    assert.equal(await page.locator('h1').innerText(), 'Página não encontrada');
    assert.ok(await page.locator('a.contact-action[href="/"]').isVisible());
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.evaluate(axeSource);
    const result = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } }));
    await writeFile(path.join(output, 'axe-404-390.json'), JSON.stringify(result, null, 2));
    assert.deepEqual(result.violations.map(item => ({ id: item.id, impact: item.impact, targets: item.nodes.map(node => node.target) })), []);
    await page.screenshot({ path: path.join(output, '404-390.png'), fullPage: true });
    report.screenshots.push('404-390.png');
    return { status: response.status(), violations: 0, incomplete: result.incomplete.map(item => item.id), passes: result.passes.length };
  });
  await test('No external browser requests and no uncaught JavaScript errors', async () => {
    assert.deepEqual(report.externalRequests, []);
    assert.deepEqual(report.pageErrors, []);
  });
} catch (error) {
  report.tests.push({ name: 'Test harness completed', passed: false, error: error.message });
} finally {
  await browser.close();
  report.passed = report.tests.every(result => result.passed);
  await writeFile(path.join(output, 'browser-results.json'), JSON.stringify(report, null, 2));
}
console.log(JSON.stringify({ passed: report.passed, tests: report.tests.map(({ name, passed, error }) => ({ name, passed, ...(error ? { error } : {}) })), output }, null, 2));
if (!report.passed) process.exitCode = 1;

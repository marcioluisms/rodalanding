import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import http from 'node:http';
import { createHash } from 'node:crypto';
import { build } from '../scripts/build.mjs';
import { createServer, csp } from '../scripts/server.mjs';

test('Pacote reproduzível contém apenas material público e respeita orçamento', async () => {
  const first = await build();
  assert.deepEqual(await build(), first);
  assert.ok(first.every(item => !/secret|\.env|package|tests|brief|maquete|bento/i.test(item.file)));
  const sizes = Object.fromEntries(first.map(item => [item.file, item.bytes]));
  assert.ok(sizes['assets/share.png'] <= 200 * 1024);
  assert.ok(sizes['index.html'] <= 40 * 1024);
  assert.ok(sizes['assets/navigation.js'] <= 8 * 1024);
  assert.ok(sizes['assets/site.css'] <= 24 * 1024);
  assert.ok(sizes['assets/fonts/hanken-grotesk.ttf'] + sizes['assets/fonts/schibsted-grotesk.ttf'] <= 320 * 1024);
  for (const file of ['index.html', '404.html']) {
    const html = await readFile(new URL(`../dist/${file}`, import.meta.url), 'utf8');
    assert.ok(!/\son\w+=|<script[^>]*src=["']https?:/i.test(html));
    if (file === '404.html') assert.match(html, /noindex/);
    else assert.doesNotMatch(html, /noindex/);
  }
});

test('Produção indexável e prévia bloqueada, sem contradições entre HTML, headers, robots e sitemap', async () => {
  const read = file => readFile(new URL(`../dist/${file}`, import.meta.url), 'utf8');
  await build({ mode: 'preview' });
  assert.match(await read('index.html'), /content="noindex, nofollow"/);
  assert.match(await read('_headers'), /^\/\*\n  X-Robots-Tag: noindex, nofollow/m);
  assert.match(await read('robots.txt'), /Disallow: \//);
  assert.doesNotMatch(await read('sitemap.xml'), /<loc>/);
  await build();
  const home = await read('index.html');
  assert.match(home, /content="index, follow, max-image-preview:large"/);
  const headers = await read('_headers');
  assert.doesNotMatch(headers.split('/404.html')[0], /noindex/);
  assert.match(headers, /\/404\.html\n  X-Robots-Tag: noindex, nofollow/);
  assert.match(await read('404.html'), /noindex/);
  const robots = await read('robots.txt');
  assert.doesNotMatch(robots, /Disallow: \//);
  assert.match(robots, /Sitemap: https:\/\/roda\.ia\.br\/sitemap\.xml/);
  const locations = [...(await read('sitemap.xml')).matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  assert.deepEqual(locations, ['https://roda.ia.br/']);
  const json = home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
  const data = JSON.parse(json);
  assert.equal(data['@context'], 'https://schema.org');
  assert.deepEqual(data['@graph'].map(item => item['@type']), ['Organization', 'WebSite', 'WebPage']);
  assert.ok(data['@graph'].every(item => item.url === locations[0]));
  const hash = createHash('sha256').update(json).digest('base64');
  assert.ok(csp.includes(`'sha256-${hash}'`), 'JSON-LD autorizado pelo hash exato, sem liberar scripts inline');
  assert.ok(headers.includes(csp));
  assert.doesNotMatch(csp, /unsafe-inline|unsafe-eval/);
  assert.equal(JSON.parse(await readFile(new URL('../artifacts/manifest.json', import.meta.url), 'utf8')).mode, 'production');
});

test('Servidor limita acesso ao pacote, devolve 404 real e impede indexação', async () => {
  const server = createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const request = (path, method = 'GET') => new Promise((resolve, reject) => {
    const req = http.request({ host: '127.0.0.1', port, path, method }, res => {
      let body = ''; res.setEncoding('utf8'); res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });
    req.on('error', reject); req.end();
  });
  try {
    const home = await request('/');
    assert.equal(home.status, 200);
    assert.equal(home.headers['content-security-policy'], csp);
    assert.equal(home.headers['x-robots-tag'], 'noindex, nofollow');
    assert.match(home.body, /data-piece/);
    for (const route of ['/bentogastronomia/', '/nao-existe', '/../package.json', '/%2e%2e/package.json', '/.git/config', '/_headers', '/assets/%5c..%5cpackage.json']) {
      const result = await request(route);
      assert.equal(result.status, 404, route);
      assert.match(result.body, /Página não encontrada/);
      assert.ok(!result.body.includes('devDependencies'));
    }
    assert.equal((await request('/%GG')).status, 400);
    assert.equal((await request('/', 'POST')).status, 405);
    assert.equal((await request('/', 'HEAD')).body, '');
    const headers = await readFile(new URL('../site/_headers', import.meta.url), 'utf8');
    assert.ok(headers.includes(csp));
  } finally { await new Promise(resolve => server.close(resolve)); }
});

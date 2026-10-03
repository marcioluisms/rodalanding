import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import http from 'node:http';
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
    assert.match(html, /noindex/);
  }
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

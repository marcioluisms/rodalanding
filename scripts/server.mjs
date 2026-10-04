import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ttf': 'font/ttf', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8' };
export const csp = "default-src 'self'; script-src 'self' 'sha256-v0Xf9W1QYfnweeaiK+MKZM3XutKvxTNmBCDeNz7FepI='; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'";

export function createServer() {
  return http.createServer(async (req, res) => {
    const headers = {
      'Content-Security-Policy': csp,
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store'
    };
    if (!['GET', 'HEAD'].includes(req.method)) {
      res.writeHead(405, { ...headers, Allow: 'GET, HEAD' }).end(); return;
    }
    try {
      const rawPath = (req.url || '/').split('?')[0];
      const decoded = decodeURIComponent(rawPath);
      const parts = decoded.split('/');
      const blocked = !decoded.startsWith('/') || decoded.includes('\\') || decoded.includes('\0') || parts.some(segment => segment === '..' || segment.startsWith('.') || segment.startsWith('_'));
      let relative = decoded === '/' ? 'index.html' : decoded.slice(1);
      if (relative.endsWith('/')) relative += 'index.html';
      const full = path.resolve(root, relative);
      const within = full.startsWith(path.resolve(root) + path.sep);
      let code = 404;
      let bytes;
      let extension = '.html';
      if (!blocked && within && (await stat(full).catch(() => null))?.isFile()) {
        bytes = await readFile(full); code = 200; extension = path.extname(full);
      } else {
        bytes = await readFile(path.join(root, '404.html'));
      }
      res.writeHead(code, { ...headers, 'Content-Type': types[extension] || 'application/octet-stream', 'Content-Length': bytes.length });
      res.end(req.method === 'HEAD' ? undefined : bytes);
    } catch (error) {
      res.writeHead(error instanceof URIError ? 400 : 500, headers).end();
    }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4173);
  createServer().listen(port, '127.0.0.1', () => console.log(`Prévia local: http://127.0.0.1:${port}`));
}

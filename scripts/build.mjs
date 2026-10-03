import { readFile, writeFile, mkdir, readdir, rm, copyFile, lstat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const publicFiles = Object.freeze([
  'index.html', '404.html', 'robots.txt', 'sitemap.xml', '_headers',
  'assets/site.css', 'assets/navigation.js',
  'assets/logo-light.svg', 'assets/logo-dark.svg',
  'assets/favicon-16.png', 'assets/favicon-32.png', 'assets/apple-touch-icon.png',
  'assets/icon-192.png', 'assets/icon-512.png', 'assets/share.png',
  'assets/fonts/hanken-grotesk.ttf', 'assets/fonts/schibsted-grotesk.ttf',
  'assets/licenses/hanken-OFL.txt', 'assets/licenses/schibsted-OFL.txt'
]);
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');

async function sourceFiles(directory, base = directory) {
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Link simbólico não permitido: ${entry.name}`);
    if (entry.isDirectory()) found.push(...await sourceFiles(full, base));
    else if (entry.isFile()) found.push(path.relative(base, full).split(path.sep).join('/'));
    else throw new Error(`Tipo de arquivo não permitido: ${entry.name}`);
  }
  return found;
}

export async function build() {
  const source = path.join(root, 'site');
  const dist = path.join(root, 'dist');
  const files = (await sourceFiles(source)).sort();
  if (JSON.stringify(files) !== JSON.stringify([...publicFiles].sort())) {
    throw new Error('A origem não corresponde à lista permitida de arquivos públicos.');
  }
  // Somente a saída gerada deste projeto pode ser substituída.
  if (path.dirname(dist) !== path.resolve(root) || path.basename(dist) !== 'dist') throw new Error('Destino inseguro');
  const existing = await lstat(dist).catch(error => { if (error.code !== 'ENOENT') throw error; });
  if (existing?.isSymbolicLink()) throw new Error('dist não pode ser link simbólico');
  await rm(dist, { recursive: true, force: true });
  const manifest = [];
  for (const file of files) {
    const from = path.join(source, file);
    const to = path.join(dist, file);
    await mkdir(path.dirname(to), { recursive: true });
    await copyFile(from, to);
    const bytes = await readFile(to);
    manifest.push({ file, bytes: bytes.length, sha256: sha256(bytes) });
  }
  const content = JSON.stringify({ mode: 'preview', files: manifest }, null, 2) + '\n';
  await mkdir(path.join(root, 'artifacts'), { recursive: true });
  await writeFile(path.join(root, 'artifacts', 'manifest.json'), content);
  console.log(`Artefato de prévia: ${files.length} arquivos; manifesto ${sha256(content)}`);
  return manifest;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();

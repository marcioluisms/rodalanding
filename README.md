# Roda IA — site institucional

Implementação estática nova, baseada na identidade B · Etiqueta e no design P3 v01 aprovados. O site funciona sem serviços externos, biblioteca de interface ou JavaScript obrigatório. O único destino externo é o contato de WhatsApp acionado pelo visitante.

## Prévia local

Node 24.21.0 e npm 11.19.0. A instalação portátil em `.tools/` é local, ignorada pelo Git. Com essas versões no PATH do processo:

```sh
npm ci --ignore-scripts
npm run build
npm test
npm start
```

Abrir `http://127.0.0.1:4173`. O servidor escuta apenas neste computador.

Com o servidor ativo e Microsoft Edge instalado:

```sh
npm run test:browser
node tests/performance.mjs
```

Os testes de navegador bloqueiam conexões externas e não acionam WhatsApp. Os relatórios vão para a pasta de evidências local; `QA_OUTPUT` permite escolher outro destino. Os resultados automatizados não substituem leitor de tela, dispositivo real ou validação no provedor.

## Organização

- `site/`: arquivos públicos originais desta implementação.
- `scripts/`: construção com lista explícita de arquivos e servidor local.
- `tests/`: verificações de conteúdo, navegação, artefato e desempenho.
- `dist/`: pacote gerado para **prévia**; não versionado.
- `artifacts/manifest.json`: tamanho e SHA-256 de cada arquivo gerado; não é publicado.

`node scripts/share-card.mjs` regenera a imagem de compartilhamento a partir de texto e identidade aprovados. Requer Edge e as dependências de desenvolvimento.

## Estado de publicação

Esta versão é exclusivamente de validação: HTML e cabeçalhos têm `noindex`, `robots.txt` bloqueia rastreamento e o sitemap está vazio. Não enviar a produção como está. Consulte [limites de entrega](docs/release.md) e [origem dos ativos](docs/assets.md).

Nenhuma credencial, token, variável de ambiente, plano comercial interno ou documento de estratégia faz parte do pacote público.

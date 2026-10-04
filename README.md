# Roda IA — site institucional

Implementação estática baseada na identidade B · Etiqueta e no design P3 v01 aprovados, com textos simplificados aprovados por Márcio e revisão de SEO em outubro de 2026. O site funciona sem serviços externos, biblioteca de interface ou JavaScript obrigatório. Os links externos são as logomarcas para o domínio oficial e o contato de WhatsApp acionado pelo visitante.

## Prévia local

Node 24.21.0 e npm 11.19.0. A instalação portátil em `.tools/` é local, ignorada pelo Git. Com essas versões no PATH do processo:

```sh
npm ci --ignore-scripts
npm run build:preview
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
- `dist/`: pacote gerado, não versionado. `npm run build` gera o candidato indexável; `npm run build:preview` gera uma prévia bloqueada para buscadores. Ambos substituem essa mesma pasta.
- `artifacts/manifest.json`: tamanho e SHA-256 de cada arquivo gerado; não é publicado.

`node scripts/share-card.mjs` regenera a imagem de compartilhamento a partir de texto e identidade aprovados. Requer Edge e as dependências de desenvolvimento.

## Estado de publicação

`npm run build` prepara o candidato local para publicação, com página inicial indexável, sitemap canônico e dados estruturados. Não faz upload ou deploy. A página 404 permanece com `noindex`. Para compartilhar uma prévia, use `npm run build:preview`: esse modo bloqueia indexação no HTML e nos cabeçalhos, bloqueia rastreamento e esvazia o sitemap. O servidor `npm start` sempre envia `noindex`, inclusive quando serve um candidato de produção. Os testes verificam ambos os modos e deixam `dist/` no modo de produção.

A publicação e a validação no domínio ainda dependem dos [limites de entrega](docs/release.md). Consulte também a [origem dos ativos](docs/assets.md) e a [revisão de SEO](docs/seo.md).

Nenhuma credencial, token, variável de ambiente, plano comercial interno ou documento de estratégia faz parte do pacote público.

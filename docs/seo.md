# Revisão de SEO — outubro de 2026

Escopo: arquivos locais do site institucional; nenhum acesso a Search Console, publicação, commit ou push.

## Implementado

- Título: **Roda IA - Tecnologia para facilitar o dia a dia da sua empresa**. O mesmo slogan é o único H1 da página e aparece na imagem de compartilhamento.
- Descrição específica sobre programas, sistemas sob medida e orientação; metadados Open Graph e Twitter completos e coerentes.
- Canonical absoluto `https://roda.ia.br/`; sitemap com apenas essa página pública; links das logomarcas para o domínio oficial.
- Página inicial indexável no candidato de produção. Página 404 com `noindex`. Prévias geradas com `build:preview` continuam bloqueadas.
- Dados estruturados `Organization`, `WebSite` e `WebPage` com identidade, logo, idioma e URL verificados nos materiais do projeto. Sem avaliações, endereço, produtos ou preços inventados.
- JSON-LD autorizado por hash na política de segurança, sem liberar scripts inline arbitrários. Uma mudança no JSON-LD exige atualizar o hash em `site/_headers` e `scripts/server.mjs`; o teste detecta divergências.
- Ícone PNG de 192 × 192 para buscadores; imagens com dimensões e texto alternativo; fontes locais; conteúdo disponível sem JavaScript; hierarquia de títulos e navegação preservadas.
- Menu reduzido a **Contato**, visível também no celular sem menu expansível. A seção de acompanhamento e seu link foram removidos.
- Fonte temporária dos títulos ajustada à largura da fonte oficial para reduzir o deslocamento do conteúdo durante o carregamento, sem alterar o visual final.

## Validação e limites

Os testes cobrem o conteúdo aprovado, indexação em ambos os modos, sitemap, dados estruturados, metadados, links, 404 e segurança. A revisão de navegador cobre telas de 320 a 1440 pixels e acessibilidade automatizada. A medição de desempenho é local e simulada, não substitui dados de visitantes.

Resultados locais: 3 testes de construção/servidor/SEO e 18 verificações de navegador aprovados, sem violações nas verificações automatizadas de acessibilidade. Na simulação de celular com rede limitada a 1,6 Mbps, CPU 4× mais lenta e cache frio (3 execuções), o LCP mediano foi 2,028 s e o CLS foi 0,0047. Antes do ajuste da fonte temporária, o CLS era 0,1182. Evidências e capturas ficam em `artifacts/copy-seo-qa/`, fora do pacote público e do versionamento.

Após uma publicação autorizada, ainda será necessário conferir os cabeçalhos reais do provedor, HTTPS, redirecionamentos entre `www` e o domínio principal, URLs antigas, rastreamento e indexação no Search Console. Nenhum código local garante indexação ou posição nas buscas. O servidor local sempre envia `noindex` por ser uma prévia.

## Referências oficiais consultadas

- [Títulos e links de título](https://developers.google.com/search/docs/appearance/title-link)
- [Descrições de resultados](https://developers.google.com/search/docs/appearance/snippet)
- [Controle de indexação](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Organização](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Nome do site](https://developers.google.com/search/docs/appearance/site-names)
- [Ícone nos resultados de busca](https://developers.google.com/search/docs/appearance/favicon-in-search)

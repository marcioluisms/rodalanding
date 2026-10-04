# Origem dos ativos

Identidade visual aprovada: **B · Etiqueta, P2**. Layout e conteúdo de referência: **P3 v01**. O HTML da maquete não foi promovido como implementação; a página, a navegação e os scripts foram escritos para esta entrega.

As duas assinaturas horizontais SVG e os ícones PNG foram copiados dos arquivos P2 aprovados, sem alteração. As fontes locais Hanken Grotesk e Schibsted Grotesk são acompanhadas de suas licenças SIL Open Font License em `site/assets/licenses/`.

`share.png` é composição nova com fundo e assinatura aprovados e o texto literal de A-01.1. Sua fonte editável está em `scripts/share-card.html`.

A revisão de copy aprovada em outubro de 2026 reúne 11 itens e 25 blocos públicos. A seção A-05 de acompanhamento foi removida por decisão de Márcio, assim como as explicações contratuais nos demais trechos. `tests/copy-approved.json` contém a referência pública atual, para detectar alterações involuntárias; não integra `dist/`. Os três caminhos de A-03 têm a mesma hierarquia. O novo slogan aparece no título, no hero e na imagem de compartilhamento.

O contato usa o destino aprovado em D-04, sem mensagem predefinida. Nenhum envio foi feito durante desenvolvimento ou testes.

O build gera o inventário de tamanhos e hashes em `artifacts/manifest.json`, fora do pacote público. O relatório de entrega registra a comparação com as fontes originais preservadas.

# Limites de entrega desta versão

P5 é uma construção local, em cópia isolada e branch `codex/novo-site-roda-ia-p5`, baseada no histórico de `marcioluisms/rodalanding`, main `052309845f50626db50801be3a977cb9cf88d499`.

O código anterior foi retirado somente desta cópia de implementação, para compor a substituição futura. O checkout original, o repositório remoto, o site publicado e suas rotas permanecem fora desta alteração. Respostas 404 para rotas antigas são evidências locais do candidato, não uma remoção em produção.

## Próxima passagem

1. Concluir revisão local e preservar manifesto/evidências do candidato.
2. Resolver identidade de autoria Git antes dos commits, caso não esteja configurada. Não usar identidade presumida.
3. Inspecionar e controlar integrações remotas que podem publicar automaticamente após um push, especialmente Vercel. Não enviar branch nem criar PR enquanto esse gate estiver aberto.
4. Preparar Cloudflare Pages Direct Upload com proteção de acesso verificada para a prévia. Não importar o repositório pela integração Git nativa como atalho. A proteção de previews não protege automaticamente o endereço principal Pages nem um domínio próprio.
5. Validar o mesmo pacote em prévia remota protegida, incluindo cabeçalhos, 404 real, fontes, WhatsApp, robots e ausência de material interno. Revalidar no provedor: servidor local não comprova comportamento Cloudflare.
6. Antes da transição pública, exigir política local de produção, gates P6/P7, inventário autenticado de DNS/DNSSEC e recuperação do site anterior. A migração de autoridade DNS e a troca do site são passos separados.

## Preparação de produção ainda pendente

- Remover `noindex` do HTML e dos cabeçalhos somente na versão autorizada para produção.
- Alterar `robots.txt` e preencher sitemap com URLs canônicas verificadas.
- Conferir canonical e URLs absolutas de compartilhamento no domínio definitivo.
- Repetir build/testes e gerar novo manifesto após essas mudanças.
- Validar política de cache/segurança, TLS, domínio principal e `www` no ambiente real.
- Guardar os valores DNS e a referência recuperável da hospedagem anterior. Sem deploy anterior no Pages, o primeiro retorno será à hospedagem anterior, não a um rollback presumido do Pages.

Nenhum workflow, upload, push, PR, alteração de hospedagem, DNS ou produção foi executado nesta construção local.

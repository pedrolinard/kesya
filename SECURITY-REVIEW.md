# Revisão de segurança (11/09/2026)

Escopo: arquivos atuais da landing page, workflow de publicação, histórico do repositório, configurações do repositório no GitHub e cabeçalhos do site publicado. Revisão de código, testes da verificação automática e conferência no navegador; não é um pentest da infraestrutura do GitHub, Instagram ou WhatsApp.

## Medidas aplicadas

### Páginas

- CSP no início do HTML: recursos locais, sem scripts inline/eval, conexões JavaScript, objetos incorporados ou envio de formulários; alteração da URL base bloqueada.
- Fontes do sistema. A página não carrega scripts, estilos, imagens ou fontes de terceiros.
- O único bloco inline da página principal são os dados estruturados (`application/ld+json`), que o navegador não executa. A verificação do deploy rejeita qualquer outro script inline e confere se o JSON é válido.
- A página 404 não tem JavaScript. Seu estilo interno é liberado na CSP apenas pelo hash SHA-256 do conteúdo, e a verificação falha se o hash ficar desatualizado.
- Links externos em HTTPS com `noopener noreferrer`; política de referência `no-referrer`.
- Mensagens de WhatsApp codificadas com `encodeURIComponent` e destino fixo. Nenhuma mensagem é enviada automaticamente.
- Sem formulários enviados, login, pagamentos, banco de dados, cookies, analytics ou armazenamento local. O atendimento acontece nos serviços externos após o clique.
- A ajuda na escolha usa opções e um campo de nome opcional apenas no navegador: o texto é limitado a 40 caracteres, exibido com `textContent` e incluído no link do WhatsApp com `encodeURIComponent`. O script não lê parâmetros da URL nem insere HTML dinâmico.

### Publicação

- Actions fixadas por commit nas versões oficiais mais recentes conferidas em 11/09/2026: `actions/checkout` v7.0.1, `actions/configure-pages` v6.0.0, `actions/upload-pages-artifact` v5.0.0 e `actions/deploy-pages` v5.0.1. Cada commit foi conferido contra a tag oficial.
- Workflow sem permissões por padrão; só o job de publicação recebe `contents: read`, `pages: write` e `id-token: write`. Credencial do checkout não persistida, tempo de execução limitado e gatilhos restritos a push na `main` e execução manual.
- O ambiente `github-pages` só aceita publicações da branch `main`.
- Artefato de publicação contém somente `index.html`, `404.html`, `sitemap.xml`, `styles.css`, `script.js` e `assets/`. Documentação, verificações, arquivos de prévia e documentos comerciais não são publicados; conferido no site que esses caminhos retornam 404.
- `scripts/check-site.cjs` roda em cada deploy e barra: CSP ausente ou insegura, código e scripts inline, `iframe`/`object`/`embed`/`form`/`base`, redirecionamento por `meta refresh`, recursos externos, links que não sejam HTTPS ou sem `noopener noreferrer`, destinos fora de WhatsApp, Instagram e o próprio site, hash desatualizado da 404 e ações do workflow sem fixação por commit. Esses bloqueios foram testados com versões propositalmente inseguras dos arquivos.

### Repositório e hospedagem

- GitHub Pages com HTTPS obrigatório, redirecionamento de HTTP para HTTPS e cabeçalho HSTS.
- Varredura de segredos e proteção contra envio de segredos ativas no repositório; nenhum alerta aberto.
- Histórico do Git revisado: nenhuma credencial, chave, token ou documento comercial encontrado. A pasta `documentos/` é ignorada pelo Git.
- Permissão padrão dos workflows somente leitura e sem aprovação de pull requests por workflows.
- Regra "Proteger main" (ruleset do GitHub) ativa na branch padrão: bloqueia force push e exclusão da `main`. Pushes normais continuam permitidos.
- Novos commits deste repositório usam o e-mail `noreply` do GitHub (configuração local do Git), sem expor e-mail pessoal.

## Limites

A CSP enviada por meta não aceita `frame-ancestors`, e o GitHub Pages não permite configurar cabeçalhos como `X-Frame-Options`. Portanto, outro site pode exibir a página dentro de um frame. O impacto é baixo, porque a página não tem login, formulários ou ações sensíveis e os contatos abrem em nova aba. Esse controle exige hospedagem ou proxy com cabeçalhos configuráveis.

O endereço `pedrolinard.github.io` é compartilhado por todos os sites do GitHub Pages dessa conta. Hoje só este projeto usa o endereço. Se outro repositório da conta publicar um site, os dois terão a mesma origem para o navegador, e `script-src 'self'` passaria a aceitar scripts do outro site. Um domínio próprio elimina esse compartilhamento.

Os commits feitos até 11/09/2026 exibem o e-mail pessoal do autor. Reescrever o histórico para removê-lo exigiria force push, agora bloqueado, e não compensa; os commits seguintes usam o endereço `noreply`. Em outro computador ou clone, é preciso repetir a configuração local do e-mail.

As verificações não garantem ausência de vulnerabilidades. Recursos futuros como formulários, carrinho, login ou integrações precisam de nova revisão. As versões das actions devem ser revisadas periodicamente.

Referências: [MDN: CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP), [MDN: frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors), [GitHub: uso seguro de Actions](https://docs.github.com/en/actions/reference/security/secure-use).

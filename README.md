# Kesya Joias

Landing page em HTML, CSS e JavaScript, sem instalação ou etapa de build.

Site: https://pedrolinard.github.io/kesya/

Abra `index.html` no navegador ou use o Live Server do VS Code.

## Conteúdo

- `index.html`: informações da loja, conversa de exemplo, categorias, escolha guiada, passos do atendimento e links de contato.
- `styles.css`: identidade visual, ilustrações em CSS, animações e layouts responsivos.
- `script.js`: menu, saudação por horário, mensagens de WhatsApp, escolha guiada, animações, perguntas frequentes e convite de contato.
- `404.html`: página exibida quando um endereço do site não existe. Tem estilo próprio, liberado na CSP por hash.
- `sitemap.xml`: endereço do site para enviar ao Google Search Console.
- `assets/kesya-logo.jpg`: logotipo original enviado pelo usuário, usado também nos dados estruturados.
- `assets/kesya-logo.webp` e `assets/kesya-monograma.webp`: versões recortadas, leves e com fundo transparente usadas na página.
- `assets/icone.png` e `assets/apple-touch-icon.png`: ícones da aba do navegador e da tela inicial do celular.
- `assets/compartilhar.jpg`: imagem de prévia (1200x630) exibida ao compartilhar o link no WhatsApp e redes sociais.

Os contatos, ouro 18k, parcelamento, cidade, envio e CNPJ foram transcritos das referências fornecidas. WhatsApp: `558698340636`. Nenhuma mensagem é enviada automaticamente. Os modelos e valores são consultados no atendimento; fotos reais das peças podem ser adicionadas quando disponíveis.

A página usa fontes do sistema e recursos locais. As ilustrações das categorias são feitas em CSS.

## Endereço do site

O endereço `https://pedrolinard.github.io/kesya/` aparece em `index.html` (link canônico, Open Graph e dados estruturados), `404.html`, `sitemap.xml` e `scripts/check-site.cjs`. Se o site ganhar domínio próprio, atualize todos esses pontos. Com domínio próprio, também passa a valer um `robots.txt` na raiz apontando para o sitemap; no endereço atual do GitHub Pages ele seria ignorado pelos buscadores.

Para aparecer melhor no Google, cadastre o site no Google Search Console e envie `sitemap.xml`. Para testar a prévia do link, use o Facebook Sharing Debugger ou envie o link numa conversa do WhatsApp; o WhatsApp pode manter a prévia antiga em cache por algum tempo.

## Validação e publicação

Execute `node --check script.js` e `node scripts/check-site.cjs`. Confira também o layout e as interações em celular e desktop.

Cada push na `main` executa `.github/workflows/deploy.yml`, valida os arquivos e publica HTML, página 404, sitemap, CSS, JavaScript e imagens no GitHub Pages. O fluxo solicitado pelo usuário é validar, fazer commit/push e acompanhar o deploy até a conclusão, conforme `AGENTS.md`.

Os controles e limites da revisão de segurança estão em `SECURITY-REVIEW.md`.

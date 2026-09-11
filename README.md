# Kesya Joias

Landing page da Kesya Joias, loja de joias em ouro 18k de Teresina (PI). Apresenta a loja e leva o cliente a conversar pelo WhatsApp, onde acontece o atendimento e a venda. Feita em HTML, CSS e JavaScript, sem instalação ou etapa de build.

Site: https://pedrolinard.github.io/kesya/

Para ver localmente, abra `index.html` no navegador ou use o Live Server do VS Code.

## Conteúdo

### Site publicado

- `index.html`: página única com as seções Início (saudação e conversa de exemplo), benefícios, Joias, Ajuda na escolha, Como funciona, Sobre a Kesya, Alianças, Dúvidas e Contato. No cabeçalho estão a CSP, as tags de compartilhamento (Open Graph), os dados estruturados para buscadores, o link canônico e os ícones.
- `styles.css`: identidade visual, ilustrações das categorias feitas em CSS, animações e layouts responsivos.
- `script.js`: menu lateral no celular, destaque da seção atual no menu, saudação conforme o horário, mensagens de WhatsApp, ajuda na escolha, aparição dos blocos ao rolar, perguntas frequentes e convite de contato.
- `404.html`: página exibida quando um endereço do site não existe. Não tem JavaScript e seu estilo interno é liberado na CSP por hash.
- `sitemap.xml`: endereço do site para enviar ao Google Search Console.
- `assets/kesya-logo.jpg`: logotipo original enviado pelo usuário, usado também nos dados estruturados.
- `assets/kesya-logo.webp` e `assets/kesya-monograma.webp`: versões recortadas e com fundo transparente usadas no cabeçalho e nos avatares.
- `assets/icone.png` e `assets/apple-touch-icon.png`: ícones da aba do navegador e da tela inicial do celular.
- `assets/compartilhar.jpg`: imagem de prévia (1200x630) exibida ao compartilhar o link no WhatsApp e redes sociais.

As imagens `.webp`, os ícones e `assets/compartilhar.jpg` foram gerados a partir de `assets/kesya-logo.jpg`. Ao substituir a imagem de prévia, mantenha 1200x630 e menos de 300 KB, tamanho recomendado para a prévia aparecer no WhatsApp.

### Apoio

- `scripts/check-site.cjs`: verificação automática rodada a cada deploy. Confere a CSP das duas páginas, a ausência de scripts inline (exceto os dados estruturados), os links externos, a imagem de prévia, o hash do estilo da 404 e o sitemap.
- `.github/workflows/deploy.yml`: valida e publica o site no GitHub Pages a cada push na `main`.
- `AGENTS.md`: fluxo de atualização combinado com o usuário.
- `SECURITY-REVIEW.md`: controles de segurança aplicados e seus limites.

## Conteúdo da loja

Os contatos, ouro 18k, parcelamento em até 12x, cidade, envio para todo o Brasil e CNPJ foram transcritos das referências fornecidas. WhatsApp: `558698340636`. Instagram: `@kesyajoias`.

Nenhuma mensagem é enviada automaticamente: os botões abrem o WhatsApp com o texto pronto e o cliente decide se envia. A conversa do topo é um exemplo e está identificada como tal. Modelos e valores são consultados no atendimento. Fotos reais das peças e depoimentos de clientes podem ser adicionados quando a loja fornecer.

A página usa fontes do sistema e apenas recursos locais.

## Endereço do site

O endereço `https://pedrolinard.github.io/kesya/` aparece em `index.html` (link canônico, Open Graph e dados estruturados), `404.html`, `sitemap.xml`, `scripts/check-site.cjs`, `AGENTS.md` e neste README. Se o site ganhar domínio próprio, atualize todos esses pontos. Com domínio próprio, também passa a valer um `robots.txt` na raiz apontando para o sitemap; no endereço atual do GitHub Pages ele seria ignorado pelos buscadores.

Para aparecer melhor no Google, cadastre o site no Google Search Console e envie `sitemap.xml`. Para testar a prévia do link, use o Facebook Sharing Debugger ou envie o link numa conversa do WhatsApp; o WhatsApp pode manter a prévia antiga em cache por algum tempo.

## Validação e publicação

Execute `node --check script.js` e `node scripts/check-site.cjs`. Confira também o layout e as interações em celular e desktop.

Cada push na `main` executa `.github/workflows/deploy.yml`, valida os arquivos e publica somente `index.html`, `404.html`, `sitemap.xml`, `styles.css`, `script.js` e `assets/` no GitHub Pages. O fluxo combinado com o usuário é validar, fazer commit e push a cada alteração e acompanhar o deploy até a conclusão, conforme `AGENTS.md`.

A pasta `documentos/` guarda materiais comerciais do projeto só no computador local. Ela é ignorada pelo Git porque este repositório é público. Quando uma mudança no site afeta o que esses materiais descrevem, eles são atualizados na mesma tarefa.

# Kesya Joias

Landing page em HTML, CSS e JavaScript, sem instalação ou etapa de build.

Site: https://pedrolinard.github.io/kesya/

Abra `index.html` no navegador ou use o Live Server do VS Code.

## Conteúdo

- `index.html`: informações da loja, categorias e links de atendimento.
- `styles.css`: identidade visual e layouts responsivos.
- `script.js`: menu, mensagens de WhatsApp, animações e perguntas frequentes.
- `assets/kesya-logo.jpg`: logotipo original enviado pelo usuário.

Os contatos, ouro 18k, parcelamento, cidade, envio e CNPJ foram transcritos das referências fornecidas. WhatsApp: `558698340636`. Nenhuma mensagem é enviada automaticamente. Os modelos e valores são consultados no atendimento; fotos reais das peças podem ser adicionadas quando disponíveis.

A página usa fontes do sistema e recursos locais. A imagem gerada da primeira versão e as ilustrações das categorias foram retiradas da publicação.

## Validação e publicação

Execute `node --check script.js` e `node scripts/check-site.cjs`. Confira também o layout e as interações em celular e desktop.

Cada push na `main` executa `.github/workflows/deploy.yml`, valida os arquivos e publica HTML, CSS, JavaScript e imagens no GitHub Pages. O fluxo solicitado pelo usuário é validar, fazer commit/push e acompanhar o deploy até a conclusão, conforme `AGENTS.md`.

Os controles e limites da revisão de segurança estão em `SECURITY-REVIEW.md`.

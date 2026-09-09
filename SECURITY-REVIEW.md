# Revisão de segurança — 09/09/2026

Escopo: arquivos atuais da landing page e workflow de publicação. Revisão de código e verificações no navegador; não é um pentest da infraestrutura do GitHub, Instagram ou WhatsApp.

## Medidas aplicadas

- CSP no início do HTML: recursos locais, sem scripts inline/eval, conexões JavaScript, objetos incorporados ou envio de formulários; alteração da URL base bloqueada.
- Fontes do sistema. A página não precisa carregar scripts, imagens ou fontes de terceiros.
- Links externos em HTTPS com `noopener noreferrer`; política de referência `no-referrer`.
- Mensagens de WhatsApp codificadas com `encodeURIComponent` e destino fixo. Nenhuma mensagem é enviada automaticamente.
- Sem formulários, login, pagamentos, banco de dados, cookies, analytics ou armazenamento local no código atual. O atendimento acontece nos serviços externos após o clique.
- Actions fixadas nos commits oficiais consultados; permissões restritas ao job de publicação, credencial do checkout não persistida e tempo de execução limitado.
- Artefato de publicação contém somente HTML, CSS, JavaScript e imagens públicas. Documentação, verificações e arquivos de prévia não são publicados.
- `scripts/check-site.cjs` verifica os controles estáticos principais em cada deploy.

## Limites

A CSP enviada por meta não aceita `frame-ancestors`. Portanto, não há proteção de enquadramento configurada pela aplicação; esse controle precisa de um cabeçalho HTTP, por exemplo em um proxy/hospedagem com cabeçalhos configuráveis. Não adicionamos diretivas inoperantes ao HTML. HSTS e outros cabeçalhos HTTP são responsabilidade da hospedagem.

As verificações não garantem ausência de vulnerabilidades. Recursos futuros como formulários, carrinho, login ou integrações precisam de nova revisão. Os pins das actions devem ser revisados quando houver atualizações.

Referências: [MDN — CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP), [MDN — frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors), [GitHub — uso seguro de Actions](https://docs.github.com/en/actions/reference/security/secure-use).

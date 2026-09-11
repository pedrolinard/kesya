# Fluxo de atualização

O usuário autorizou e solicitou este fluxo para todas as atualizações deste projeto:

1. Implementar a alteração e executar as verificações adequadas.
2. Criar um commit com as alterações da tarefa.
3. Fazer push para `main`, preservando alterações remotas e sem force push.
4. Acompanhar o deploy do GitHub Pages até a conclusão e conferir a página publicada.
5. Informar o resultado e o endereço do site ao usuário. Se houver bloqueio, informar o motivo sem afirmar que a publicação ocorreu.
6. Se a alteração mudar algo descrito na proposta comercial ou no contrato (escopo, seções, funcionalidades, integrações, SEO, hospedagem, domínio, pacotes, preços, prazos ou dados da cliente), ou for muito importante, atualizar os documentos na mesma tarefa: editar `documentos/gerar-documentos.cjs`, rodar `node documentos/gerar-documentos.cjs`, conferir os PDFs e informar o que mudou. A pasta `documentos/` é local e ignorada pelo Git, porque o repositório é público; nunca versionar esses arquivos.

Não usar travessões (traços longos entre frases) nos textos do site nem dos documentos. Hífens em palavras, como e-mail, são normais.

Publicação: https://pedrolinard.github.io/kesya/
Workflow: `.github/workflows/deploy.yml`.
Publicar apenas `index.html`, `404.html`, `sitemap.xml`, `styles.css`, `script.js` e `assets/`; não incluir `.preview/`, documentação interna ou credenciais no artefato do site.

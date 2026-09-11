const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const SITE = 'https://pedrolinard.github.io/kesya/';
const html = fs.readFileSync('index.html', 'utf8');
const notFound = fs.readFileSync('404.html', 'utf8');
const js = fs.readFileSync('script.js', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');

function checkPolicy(page, name) {
  const policy = page.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/);
  assert.ok(policy, `CSP ausente em ${name}`);
  for (const directive of ["default-src 'none'", "object-src 'none'", "base-uri 'none'", "form-action 'none'"]) {
    assert.ok(policy[1].includes(directive), `CSP de ${name} sem ${directive}`);
  }
  assert.ok(!/unsafe-inline|unsafe-eval/.test(policy[1]), `CSP de ${name} permite execução insegura`);
  assert.ok(!/\son[a-z]+\s*=|\sstyle\s*=/i.test(page), `Código inline encontrado em ${name}`);
  assert.ok(!/<(?:iframe|frame|object|embed|form|base)\b/i.test(page), `Elemento incorporado, formulário ou base encontrado em ${name}`);
  assert.ok(!/http-equiv="refresh"/i.test(page), `Redirecionamento automático encontrado em ${name}`);
  return policy[1];
}

function checkLinks(page, name) {
  for (const tag of page.matchAll(/<a\b[^>]*>/gi)) {
    const href = tag[0].match(/href="([^"]+)"/);
    if (!href || href[1].startsWith('#')) continue;
    const url = new URL(href[1]);
    assert.equal(url.protocol, 'https:');
    assert.ok(['wa.me', 'www.instagram.com', 'pedrolinard.github.io'].includes(url.hostname), `Destino externo inesperado em ${name}`);
    if (tag[0].includes('target="_blank"')) assert.ok(/rel="[^"]*noopener[^"]*noreferrer/.test(tag[0]), `Link sem proteção em ${name}`);
  }
}

// Página principal.
const policy = checkPolicy(html, 'index.html');
for (const directive of ["script-src 'self'", "style-src 'self'", "connect-src 'none'"]) {
  assert.ok(policy.includes(directive), `CSP sem ${directive}`);
}
// O único bloco inline permitido são os dados estruturados, que o navegador não executa.
for (const script of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
  if (/\bsrc=/.test(script[1])) continue;
  assert.ok(/type="application\/ld\+json"/.test(script[1]), 'Script inline encontrado');
  const data = JSON.parse(script[2]);
  assert.equal(data.url, SITE, 'Dados estruturados com endereço diferente do site');
}
assert.ok(!/innerHTML|outerHTML|insertAdjacentHTML|document\.write|\beval\s*\(|new Function/.test(js), 'Revisar ponto de execução/inserção dinâmica');
assert.ok(!/@import|https?:\/\//i.test(css), 'CSS carrega recurso externo');
for (const tag of html.matchAll(/<(?:script|img|link)\b[^>]*>/gi)) {
  const source = tag[0].match(/(?:src|href)="([^"]+)"/);
  if (!source) continue;
  if (/rel="canonical"/.test(tag[0])) {
    assert.equal(source[1], SITE, 'Endereço canônico inesperado');
    continue;
  }
  assert.ok(!/^(?:[a-z]+:|\/\/)/i.test(source[1]), 'Recurso externo encontrado');
  assert.ok(fs.existsSync(path.resolve(source[1])), `Arquivo ausente: ${source[1]}`);
}
for (const meta of html.matchAll(/<meta property="og:(url|image)" content="([^"]+)"/g)) {
  assert.ok(meta[2].startsWith(SITE), `og:${meta[1]} fora do site`);
  if (meta[1] === 'image') assert.ok(fs.existsSync(meta[2].slice(SITE.length)), 'Imagem de compartilhamento ausente');
}
checkLinks(html, 'index.html');

// Página 404: sem scripts e com o estilo interno liberado apenas pelo hash.
const notFoundPolicy = checkPolicy(notFound, '404.html');
assert.ok(!/<script\b/i.test(notFound), 'Script encontrado na página 404');
const style = notFound.match(/<style>([\s\S]*?)<\/style>/);
assert.ok(style, 'Estilo da página 404 ausente');
const hash = crypto.createHash('sha256').update(style[1]).digest('base64');
assert.ok(notFoundPolicy.includes(`style-src 'sha256-${hash}'`), 'Hash do estilo da página 404 desatualizado');
checkLinks(notFound, '404.html');

assert.ok(fs.readFileSync('sitemap.xml', 'utf8').includes(`<loc>${SITE}</loc>`), 'Sitemap sem o endereço do site');

// Deploy: toda ação externa precisa estar fixada em um commit completo.
const workflow = fs.readFileSync('.github/workflows/deploy.yml', 'utf8');
for (const use of workflow.matchAll(/uses:\s*(\S+)/g)) {
  assert.ok(/@[0-9a-f]{40}$/.test(use[1]), `Ação sem fixação por commit: ${use[1]}`);
}
console.log('OK: recursos locais, política CSP, links HTTPS, dados estruturados, página 404, sitemap e ações do deploy fixadas.');

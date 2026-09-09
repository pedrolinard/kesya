const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('script.js', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const policy = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/);
assert.ok(policy, 'CSP ausente');
for (const directive of ["default-src 'none'", "script-src 'self'", "style-src 'self'", "connect-src 'none'", "object-src 'none'", "base-uri 'none'", "form-action 'none'"]) {
  assert.ok(policy[1].includes(directive), `CSP sem ${directive}`);
}
assert.ok(!/unsafe-inline|unsafe-eval/.test(policy[1]), 'CSP permite execução insegura');
assert.ok(!/\son[a-z]+\s*=|\sstyle\s*=/i.test(html), 'Código inline encontrado');
assert.ok(!/<script\b(?![^>]*\bsrc=)[^>]*>/i.test(html), 'Script inline encontrado');
assert.ok(!/innerHTML|outerHTML|insertAdjacentHTML|document\.write|\beval\s*\(|new Function/.test(js), 'Revisar ponto de execução/inserção dinâmica');
assert.ok(!/@import|https?:\/\//i.test(css), 'CSS carrega recurso externo');
for (const tag of html.matchAll(/<(?:script|img|link)\b[^>]*>/gi)) {
  const source = tag[0].match(/(?:src|href)="([^"]+)"/);
  if (!source) continue;
  assert.ok(!/^(?:[a-z]+:|\/\/)/i.test(source[1]), 'Recurso externo encontrado');
  assert.ok(fs.existsSync(path.resolve(source[1])), `Arquivo ausente: ${source[1]}`);
}
for (const tag of html.matchAll(/<a\b[^>]*>/gi)) {
  const href = tag[0].match(/href="([^"]+)"/);
  if (!href || href[1].startsWith('#')) continue;
  const url = new URL(href[1]);
  assert.equal(url.protocol, 'https:');
  assert.ok(['wa.me', 'www.instagram.com'].includes(url.hostname), 'Destino externo inesperado');
  if (tag[0].includes('target="_blank"')) assert.ok(/rel="[^"]*noopener[^\"]*noreferrer/.test(tag[0]), 'Link sem proteção');
}
console.log('OK: recursos locais, política CSP, links HTTPS e ausência de execução dinâmica insegura.');

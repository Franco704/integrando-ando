import katex from 'katex';
import { h } from './h.js';

// Notación de la cátedra (en castellano) que KaTeX no trae.
const MACROS = {
  '\\sen': '\\operatorname{sen}', '\\arcsen': '\\operatorname{arcsen}', '\\tg': '\\operatorname{tg}',
  '\\arctg': '\\operatorname{arctg}', '\\cotg': '\\operatorname{cotg}', '\\cosec': '\\operatorname{cosec}',
  '\\senh': '\\operatorname{senh}', '\\rot': '\\operatorname{rot}',
  '\\Rg': '\\operatorname{Rg}', '\\Dom': '\\operatorname{Dom}',
};

// Fórmula suelta: tex('\\iint_R f\\,dA')
export function tex(fuente, { bloque = false } = {}) {
  const el = h(bloque ? 'div' : 'span', { class: bloque ? 'formula formula--bloque' : 'formula' });
  try {
    katex.render(fuente, el, { displayMode: bloque, throwOnError: false, strict: 'ignore', trust: false, macros: { ...MACROS } });
  } catch {
    el.textContent = fuente;
  }
  return el;
}

// Texto de teoría con un Markdown mínimo: párrafos, $inline$, $$bloque$$, **negrita**, *cursiva*,
// listas "- ", listas "1. ", subtítulos "### " y notas "> ". Los módulos de contenido escriben con String.raw.
export function texto(md) {
  const frag = document.createDocumentFragment();
  const bloques = String(md).trim().split(/\n\s*\n/);
  for (const bloque of bloques) {
    const b = bloque.trim();
    if (b.startsWith('$$') && b.endsWith('$$') && b.length > 4) frag.append(tex(b.slice(2, -2).trim(), { bloque: true }));
    else if (b.startsWith('### ')) frag.append(h('h4', { class: 'subtitulo' }, enLinea(b.slice(4))));
    else if (b.startsWith('> ')) frag.append(h('aside', { class: 'nota' }, ...parrafos(b.replace(/^> ?/gm, ''))));
    else if (/^- /.test(b)) frag.append(h('ul', {}, b.split(/\n(?=- )/).map((li) => h('li', {}, enLinea(li.slice(2))))));
    else if (/^\d+\. /.test(b)) frag.append(h('ol', {}, b.split(/\n(?=\d+\. )/).map((li) => h('li', {}, enLinea(li.replace(/^\d+\. /, ''))))));
    else frag.append(...parrafos(b));
  }
  return frag;
}

const parrafos = (b) => [h('p', {}, enLinea(b.replace(/\n/g, ' ')))];

// $$…$$ dentro de un párrafo también se respeta (se muestra en bloque).
export function enLinea(s) {
  const nodos = [];
  const re = /\$\$([^$]+)\$\$|\$([^$]+)\$|\*\*([^*]+)\*\*|\*([^*\s][^*]*)\*/g;
  let ultimo = 0, m;
  while ((m = re.exec(s))) {
    if (m.index > ultimo) nodos.push(s.slice(ultimo, m.index));
    if (m[1]) nodos.push(tex(m[1].trim(), { bloque: true }));
    else if (m[2]) nodos.push(tex(m[2]));
    else if (m[3]) nodos.push(h('strong', {}, enLinea(m[3])));
    else nodos.push(h('em', {}, m[4]));
    ultimo = re.lastIndex;
  }
  if (ultimo < s.length) nodos.push(s.slice(ultimo));
  return nodos;
}

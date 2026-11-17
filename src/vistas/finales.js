import { h } from '../ui/atomos/h.js';
import { texto } from '../ui/atomos/matematica.js';
import { boton, chip } from '../ui/atomos/controles.js';
import { FINALES } from '../estudio/finales.js';
import { MODELOS_PARCIAL } from '../estudio/modelos-parcial.js';
import { moduloPorId } from '../temario/indice.js';

const TIPOS = { teoria: 'Teoría', vf: 'Verdadero o falso', practica: 'Práctica' };

// Ítem de examen con la resolución oculta hasta que la pidas.
export function itemExamen(it, { abierto = false } = {}) {
  const m = moduloPorId(it.tema);
  const res = h('div', { class: 'item-examen__resolucion prosa', hidden: !abierto }, texto(it.resolucion || 'Sin resolución todavía.'));
  const ver = boton(abierto ? 'Ocultar resolución' : 'Ver resolución', () => {
    res.hidden = !res.hidden;
    ver.querySelector('span').textContent = res.hidden ? 'Ver resolución' : 'Ocultar resolución';
  });
  return h('article', { class: 'item-examen', id: `item-${it.n}`, dataset: { parcial: m?.parcial } },
    h('header', { class: 'item-examen__cabecera' },
      h('span', { class: 'item-examen__n' }, it.n),
      it.tipo && chip(TIPOS[it.tipo]),
      m && h('a', { class: 'chip chip--eje', href: `#/modulo/${m.id}` }, `TP ${m.tp}: ${m.titulo}`)),
    h('div', { class: 'item-examen__enunciado prosa' }, texto(it.enunciado)),
    ver, res,
    it.lab && h('a', { class: 'enlace-lab', href: `#/lab/${it.lab}` }, 'Verlo en el laboratorio'));
}

export function vistaFinales(raiz) {
  document.title = 'Finales resueltos · Integrando Ando';
  raiz.append(h('div', { class: 'pagina' },
    h('header', { class: 'pagina__cabecera' },
      h('h1', { class: 'pagina__titulo' }, 'Finales resueltos'),
      h('div', { class: 'prosa pagina__bajada' }, texto(`El final es escrito, se aprueba con 6 y siempre tiene tres bloques: **1)** derivación (límites, diferenciabilidad, extremos), **2)** integración (múltiples, cambio de variables, línea y superficie) y **3)** ecuaciones diferenciales. Pesan mucho las definiciones, los teoremas con hipótesis, tesis y demostración, y los verdadero o falso con justificación.`))),
    h('ul', { class: 'lista-finales' }, FINALES.map((f) =>
      h('li', {}, h('a', { class: 'lista-finales__item', href: `#/final/${f.id}` },
        h('span', { class: 'lista-finales__fecha' }, f.fecha),
        h('span', { class: 'lista-finales__temas' }, `${f.items.length} ítems`))))),
    h('section', { class: 'bloque', id: 'modelos' },
      h('h2', { class: 'bloque__titulo' }, 'Modelos de segundo parcial'),
      h('p', { class: 'bloque__bajada' }, `${MODELOS_PARCIAL.length} temas del segundo parcial de la cátedra. Los resueltos tienen su resolución completa.`),
      h('ul', { class: 'lista-finales' }, MODELOS_PARCIAL.map((t) =>
        h('li', {}, h('a', { class: 'lista-finales__item', href: `#/modelo/${t.id}` },
          h('span', { class: 'lista-finales__fecha' }, `Tema ${t.id}`),
          h('span', { class: 'lista-finales__temas' }, `${t.items.length} ejercicios${t.items.some((i) => i.resolucion) ? ', resuelto' : ''}`))))))));
  if (location.hash.includes('modelos')) requestAnimationFrame(() => document.getElementById('modelos')?.scrollIntoView());
}

export function vistaFinal(raiz, { id, consulta }) {
  const f = FINALES.find((x) => x.id === id);
  if (!f) { raiz.append(h('p', { class: 'vacio' }, 'No encontré ese final.')); return; }
  document.title = `Final del ${f.fecha} · Integrando Ando`;
  raiz.append(h('div', { class: 'pagina' },
    h('p', { class: 'modulo__contexto' }, h('a', { href: '#/finales' }, 'Finales resueltos')),
    h('h1', { class: 'pagina__titulo' }, `Final del ${f.fecha}`),
    f.nota && h('p', { class: 'pagina__bajada' }, f.nota),
    f.items.map((it) => itemExamen(it, { abierto: consulta.get('i') === it.n }))));
  const i = consulta.get('i');
  if (i) requestAnimationFrame(() => document.getElementById(`item-${i}`)?.scrollIntoView());
}

export function vistaModelo(raiz, { id }) {
  const t = MODELOS_PARCIAL.find((x) => String(x.id) === id);
  if (!t) { raiz.append(h('p', { class: 'vacio' }, 'No encontré ese tema.')); return; }
  document.title = `Segundo parcial, tema ${t.id} · Integrando Ando`;
  raiz.append(h('div', { class: 'pagina', dataset: { parcial: 2 } },
    h('p', { class: 'modulo__contexto' }, h('a', { href: '#/finales/modelos' }, 'Modelos de segundo parcial')),
    h('h1', { class: 'pagina__titulo' }, `Segundo parcial, tema ${t.id}`),
    t.items.map((it) => itemExamen(it))));
}

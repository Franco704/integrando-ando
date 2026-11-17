import { h, svg, ICONOS } from '../atomos/h.js';
import { texto, enLinea } from '../atomos/matematica.js';
import { boton, chip } from '../atomos/controles.js';

// Fila de la ruta de módulos: número de TP (es una secuencia real), título y estado.
export function filaModulo(m, { leido = false, actual = false } = {}) {
  return h('a', { class: ['fila-modulo', leido && 'fila-modulo--leido'], href: `#/modulo/${m.id}`, 'aria-current': actual ? 'page' : null, dataset: { parcial: m.parcial } },
    h('span', { class: 'fila-modulo__tp' }, String(m.tp).padStart(2, '0')),
    h('span', { class: 'fila-modulo__cuerpo' },
      h('span', { class: 'fila-modulo__titulo' }, m.titulo),
      m.resumen && h('span', { class: 'fila-modulo__resumen' }, m.resumen)),
    leido && h('span', { class: 'fila-modulo__estado', 'aria-label': 'leído' }, svg(ICONOS.ok, { tam: 16 })));
}

// Pregunta de opción múltiple. Al responder muestra la explicación; avisa el resultado con alResponder(ok).
export function pregunta(q, { previa = null, alResponder } = {}) {
  const explicacion = h('div', { class: 'pregunta__por', hidden: true }, texto(q.por || ''));
  const opciones = q.opciones.map((o, i) =>
    h('button', { type: 'button', class: 'pregunta__opcion', onclick: () => elegir(i) }, h('span', { class: 'pregunta__letra' }, 'abcdef'[i]), h('span', {}, enLinea(o))));
  const caja = h('article', { class: 'pregunta', id: q.id }, h('div', { class: 'pregunta__enunciado' }, texto(q.p)), h('div', { class: 'pregunta__opciones' }, opciones), explicacion);

  function elegir(i, silencioso = false) {
    opciones.forEach((b, k) => {
      b.disabled = true;
      b.classList.toggle('es-correcta', k === q.ok);
      b.classList.toggle('es-incorrecta', k === i && i !== q.ok);
    });
    explicacion.hidden = false;
    caja.dataset.resultado = i === q.ok ? 'bien' : 'mal';
    if (!silencioso) alResponder?.(i === q.ok);
  }
  if (previa) caja.append(h('p', { class: 'pregunta__previa' }, previa.ok ? 'La respondiste bien la última vez.' : 'La última vez la fallaste: probá de nuevo.'));
  return caja;
}

// Ejercicio resuelto que se revela paso a paso: primero intentás, después mirás.
export function ejercicio(ej, indice) {
  const pasos = (ej.pasos || []).map((p, i) => h('li', { class: 'ejercicio__paso', hidden: true }, texto(p)));
  const respuesta = ej.respuesta && h('div', { class: 'ejercicio__respuesta', hidden: true }, h('strong', {}, 'Resultado. '), enLinea(ej.respuesta));
  let visibles = 0;
  const siguiente = boton('Ver el primer paso', () => revelar(1), { variante: 'secundario' });
  const todo = boton('Ver todo', () => revelar(pasos.length), { variante: 'fantasma' });
  function revelar(k) {
    visibles = Math.min(pasos.length, visibles + k);
    pasos.forEach((p, i) => (p.hidden = i >= visibles));
    const fin = visibles >= pasos.length;
    if (respuesta) respuesta.hidden = !fin;
    siguiente.querySelector('span').textContent = 'Ver el paso siguiente';
    siguiente.hidden = fin;
    todo.hidden = fin;
    pasos[visibles - 1]?.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  if (!pasos.length && respuesta) { respuesta.hidden = false; siguiente.hidden = todo.hidden = true; }
  return h('article', { class: 'ejercicio', id: ej.id },
    h('header', { class: 'ejercicio__cabecera' },
      h('span', { class: 'ejercicio__numero' }, `Ejercicio ${indice + 1}`),
      ej.fuente && chip(ej.fuente)),
    h('div', { class: 'ejercicio__enunciado' }, texto(ej.enunciado)),
    h('ol', { class: 'ejercicio__pasos' }, pasos),
    respuesta,
    h('div', { class: 'ejercicio__acciones' }, siguiente, todo),
    ej.lab && h('a', { class: 'enlace-lab', href: `#/lab/${ej.lab}` }, svg(ICONOS.lab, { tam: 16 }), 'Verlo en el laboratorio'));
}

// Bloque de teoría con título y texto rico.
export const bloqueTeoria = (sec) =>
  h('section', { class: ['teoria', sec.clase && `teoria--${sec.clase}`], id: sec.id },
    h('h3', { class: 'teoria__titulo' }, sec.titulo),
    h('div', { class: 'prosa' }, texto(sec.texto)));

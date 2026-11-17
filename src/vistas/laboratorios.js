import { h } from '../ui/atomos/h.js';
import { marcoLaboratorio } from '../ui/organismos/laboratorio.js';
import { LABORATORIOS, cargarLaboratorio } from '../laboratorios/indice.js';
import { MODULOS, PARCIALES } from '../temario/indice.js';
import { progreso } from '../nucleo/almacen.js';

const modulosQueUsan = (id) => MODULOS.filter((m) => m.labs.includes(id));

export function vistaLaboratorios(raiz, _p, { almacen }) {
  document.title = 'Laboratorios · Integrando Ando';
  const hechos = almacen.leer().labs;
  raiz.append(h('div', { class: 'pagina' },
    h('header', { class: 'pagina__cabecera' },
      h('h1', { class: 'pagina__titulo' }, 'Laboratorios'),
      h('p', { class: 'pagina__bajada' }, 'Cada laboratorio muestra una idea de la materia en movimiento. Cambiá la función, mové el punto, girá la figura y mirá qué pasa con los números.')),
    PARCIALES.map((p) => h('section', { class: 'catalogo', dataset: { parcial: p.n } },
      h('h2', { class: 'catalogo__titulo' }, `${p.tema}`),
      h('ul', { class: 'catalogo__lista' },
        Object.entries(LABORATORIOS).filter(([, l]) => (l.eje === 'deriv') === (p.n === 1)).map(([id, l]) =>
          h('li', {}, h('a', { class: 'catalogo__item', href: `#/lab/${id}` },
            h('span', { class: 'catalogo__nombre' }, l.titulo),
            h('span', { class: 'catalogo__tps' }, modulosQueUsan(id).map((m) => `TP ${m.tp}`).join(', ')),
            hechos[id] && h('span', { class: 'chip chip--eje' }, 'abierto')))))))));
}

export function vistaLaboratorio(raiz, { id }, { almacen }) {
  let marco = null, vivo = true;
  cargarLaboratorio(id).then((lab) => {
    if (!vivo) return;
    if (!lab) { raiz.append(h('p', { class: 'vacio' }, 'Ese laboratorio no existe.')); return; }
    document.title = `${lab.titulo} · Integrando Ando`;
    progreso.marcarLab(almacen, id);
    marco = marcoLaboratorio(lab);
    const mods = modulosQueUsan(id);
    raiz.append(h('div', { class: 'pagina pagina--ancha', dataset: { parcial: lab.eje === 'integ' ? 2 : 1 } },
      h('p', { class: 'modulo__contexto' }, h('a', { href: '#/laboratorios' }, 'Laboratorios')),
      marco,
      mods.length && h('p', { class: 'pagina__relacion' }, 'Se usa en ', mods.map((m, i) => [i ? ', ' : '', h('a', { href: `#/modulo/${m.id}?s=laboratorio` }, `TP ${m.tp}: ${m.titulo}`)]), '.')));
  });
  return () => { vivo = false; marco?.destruir(); };
}

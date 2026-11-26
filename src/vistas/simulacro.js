import { h } from '../ui/atomos/h.js';
import { boton } from '../ui/atomos/controles.js';
import { pregunta } from '../ui/moleculas/moleculas.js';
import { modulosDe, cargarModulo, MODULOS, PARCIALES } from '../temario/indice.js';
import { FINALES, bloqueDe } from '../examenes/finales.js';
import { itemExamen } from './finales.js';
import { progreso } from '../nucleo/almacen.js';

const barajar = (xs) => xs.map((x) => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map(([, x]) => x);

// Simulacro de preguntas: del parcial elegido, o solo las que fallaste.
export function vistaSimulacro(raiz, { n }, { almacen }) {
  const falladas = n === 'falladas';
  const parcial = PARCIALES[+n - 1];
  document.title = `Simulacro · Integrando Ando`;
  const lista = h('div', { class: 'simulacro__preguntas' });
  const marcador = h('p', { class: 'cuestionario__marcador', 'aria-live': 'polite' });
  const pagina = h('div', { class: 'pagina', dataset: { parcial: parcial?.n || 1 } },
    h('header', { class: 'pagina__cabecera' },
      h('h1', { class: 'pagina__titulo' }, falladas ? 'Repaso de las que fallaste' : `Simulacro del ${parcial.titulo.toLowerCase()}`),
      h('p', { class: 'pagina__bajada' }, falladas ? 'Las preguntas que respondiste mal la última vez. Cuando las aciertes, salen de esta lista.' : 'Diez preguntas al azar de los módulos del parcial. Respondé sin mirar la teoría y fijate dónde flojeás.')),
    marcador, lista,
    h('div', { class: 'simulacro__acciones' }, boton('Otra tanda', () => armar(), { variante: 'primario', icono: 'reiniciar' }),
      !falladas && h('a', { class: 'boton boton--fantasma', href: '#/simulacro/falladas' }, h('span', {}, 'Repasar las que fallé'))));
  raiz.append(pagina);

  let banco = [];
  const mods = falladas ? MODULOS : modulosDe(+n);
  Promise.all(mods.map((m) => cargarModulo(m.id))).then((cargados) => {
    banco = cargados.flatMap((m) => (m.preguntas || []).map((q) => ({ ...q, modulo: m })));
    armar();
  });

  function armar() {
    const ids = new Set(progreso.falladas(almacen.leer()));
    const fuente = falladas ? banco.filter((q) => ids.has(q.id)) : banco;
    const tanda = barajar(fuente).slice(0, 10);
    let bien = 0, hechas = 0;
    const contar = () => marcador.replaceChildren(h('strong', {}, `${bien}/${hechas}`), h('span', {}, `de ${tanda.length} preguntas`));
    contar();
    lista.replaceChildren(...(tanda.length ? tanda.map((q) => h('div', { class: 'simulacro__item' },
      h('a', { class: 'simulacro__origen', href: `#/modulo/${q.modulo.id}?s=teoria` }, `TP ${q.modulo.tp}: ${q.modulo.titulo}`),
      pregunta(q, { alResponder: (ok) => { hechas++; bien += ok; contar(); progreso.responder(almacen, q.id, ok); } })))
      : [h('p', { class: 'vacio' }, falladas ? 'No tenés preguntas falladas. Hacé un simulacro de parcial para sumar práctica.' : 'Todavía no hay preguntas cargadas.')]));
  }
}

// Simulacro de final: un ítem por bloque, como en el examen real.
export function vistaSimulacroFinal(raiz) {
  document.title = 'Simulacro de final · Integrando Ando';
  const cuerpo = h('div', {});
  const pool = FINALES.flatMap((f) => f.items.map((i) => ({ ...i, final: f })));
  function armar() {
    const elegidos = [1, 2, 3].flatMap((b) => {
      const delBloque = barajar(pool.filter((i) => bloqueDe(i.tema) === b));
      const teoria = delBloque.find((i) => i.tipo === 'teoria');
      const otro = delBloque.find((i) => i.tipo !== 'teoria');
      return [teoria, otro].filter(Boolean).map((it, k) => ({ ...it, n: `${b}${'ab'[k]}`, origen: it.final.fecha }));
    });
    cuerpo.replaceChildren(...elegidos.map((it) => h('div', { class: 'simulacro__item' },
      h('p', { class: 'simulacro__origen' }, `Tomado el ${it.origen}`), itemExamen(it))));
  }
  raiz.append(h('div', { class: 'pagina' },
    h('header', { class: 'pagina__cabecera' },
      h('h1', { class: 'pagina__titulo' }, 'Simulacro de final'),
      h('p', { class: 'pagina__bajada' }, 'Seis ítems con la estructura del examen: dos de derivación, dos de integración y dos de ecuaciones diferenciales, cada par con una pregunta de teoría. Escribí la respuesta completa en papel, con hipótesis y tesis, y después compará con la resolución.')),
    cuerpo,
    h('div', { class: 'simulacro__acciones' }, boton('Armar otro simulacro', armar, { variante: 'primario', icono: 'reiniciar' }))));
  armar();
}

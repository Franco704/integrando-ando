import { h, svg, ICONOS } from '../ui/atomos/h.js';
import { texto, enLinea } from '../ui/atomos/matematica.js';
import { boton, chip } from '../ui/atomos/controles.js';
import { bloqueTeoria, ejercicio, pregunta } from '../ui/moleculas/moleculas.js';
import { marcoLaboratorio } from '../ui/organismos/laboratorio.js';
import { cargarModulo, MODULOS, UNIDADES, PARCIALES } from '../temario/indice.js';
import { cargarLaboratorio } from '../laboratorios/indice.js';
import { itemsDeModulo } from '../estudio/finales.js';
import { progreso } from '../nucleo/almacen.js';

export function vistaModulo(raiz, { id }, { almacen }) {
  const labs = [];
  let vivo = true;
  raiz.append(h('p', { class: 'cargando' }, 'Cargando el módulo…'));

  cargarModulo(id).then(async (mod) => {
    if (!vivo) return;
    if (!mod) { raiz.replaceChildren(h('p', { class: 'vacio' }, 'Ese módulo no existe. Elegí uno del índice.')); return; }
    document.title = `TP ${mod.tp}: ${mod.titulo} · Integrando Ando`;
    const parcial = PARCIALES[mod.parcial - 1];
    const enFinales = itemsDeModulo(id);
    const secciones = [
      ['teoria', 'Teoría', mod.teoria?.length],
      ['laboratorio', 'Laboratorio', mod.labs.length],
      ['ejercicios', 'Ejercicios resueltos', mod.ejercicios?.length],
      ['autoevaluacion', 'Autoevaluación', mod.preguntas?.length],
      ['finales', 'En los finales', enFinales.length],
    ].filter(([, , n]) => n);

    const i = MODULOS.findIndex((x) => x.id === id);
    const ant = MODULOS[i - 1], sig = MODULOS[i + 1];
    const leido = () => !!almacen.leer().leidos[id];
    const marcar = boton(leido() ? 'Estudiado' : 'Marcar como estudiado', () => {
      progreso.marcarLeido(almacen, id);
      marcar.querySelector('span').textContent = 'Estudiado';
      marcar.disabled = true;
    }, { variante: leido() ? 'secundario' : 'primario', icono: 'ok', disabled: leido() });

    const pagina = h('article', { class: 'modulo', dataset: { parcial: mod.parcial } },
      h('header', { class: 'modulo__cabecera' },
        h('p', { class: 'modulo__contexto' },
          h('a', { href: '#/' }, `${parcial.titulo}: ${parcial.tema.toLowerCase()}`), ' / ', `Unidad ${mod.unidad}: ${UNIDADES[mod.unidad]}`),
        h('div', { class: 'modulo__rotulo' },
          h('span', { class: 'modulo__tp', 'aria-hidden': 'true' }, String(mod.tp).padStart(2, '0')),
          h('div', {},
            h('p', { class: 'modulo__tp-texto' }, `Trabajo práctico ${mod.tp}`),
            h('h1', { class: 'modulo__titulo' }, mod.titulo))),
        mod.intro && h('div', { class: 'prosa modulo__intro' }, texto(mod.intro)),
        h('nav', { class: 'modulo__indice', 'aria-label': 'Secciones del módulo' },
          secciones.map(([sid, nombre]) => h('a', { href: `#/modulo/${id}?s=${sid}`, onclick: (e) => { e.preventDefault(); irA(sid); } }, nombre)))),

      mod.teoria?.length && h('section', { class: 'modulo__seccion', id: 'teoria' },
        h('h2', { class: 'modulo__h2' }, 'Teoría'),
        mod.teoria.map(bloqueTeoria)),

      mod.labs.length && h('section', { class: 'modulo__seccion modulo__seccion--ancha', id: 'laboratorio' },
        h('h2', { class: 'modulo__h2' }, mod.labs.length > 1 ? 'Laboratorios' : 'Laboratorio'),
        h('div', { class: 'modulo__labs' })),

      mod.ejercicios?.length && h('section', { class: 'modulo__seccion', id: 'ejercicios' },
        h('h2', { class: 'modulo__h2' }, 'Ejercicios resueltos'),
        h('p', { class: 'modulo__ayuda' }, 'Intentá cada uno en papel antes de abrir los pasos. Los pasos se revelan de a uno.'),
        mod.ejercicios.map((e, k) => ejercicio(e, k))),

      mod.preguntas?.length && h('section', { class: 'modulo__seccion', id: 'autoevaluacion' },
        h('h2', { class: 'modulo__h2' }, 'Autoevaluación'),
        mod.preguntas.map((q) => pregunta(q, {
          previa: almacen.leer().respuestas[q.id],
          alResponder: (ok) => progreso.responder(almacen, q.id, ok),
        }))),

      enFinales.length && h('section', { class: 'modulo__seccion', id: 'finales' },
        h('h2', { class: 'modulo__h2' }, 'Cómo lo toman en el final'),
        h('ul', { class: 'en-finales' }, enFinales.map((it) =>
          h('li', {}, h('a', { href: `#/final/${it.final.id}?i=${it.n}` },
            h('span', { class: 'en-finales__fecha' }, `${it.final.fecha}, ${it.n}`),
            h('span', { class: 'en-finales__enunciado' }, enLinea(recortar(it.enunciado)))))))),

      h('footer', { class: 'modulo__pie' },
        marcar,
        h('div', { class: 'modulo__vecinos' },
          ant && h('a', { class: 'vecino', href: `#/modulo/${ant.id}` }, svg(ICONOS.atras, { tam: 18 }), h('span', {}, h('small', {}, `TP ${ant.tp}`), ant.titulo)),
          sig && h('a', { class: 'vecino vecino--sig', href: `#/modulo/${sig.id}` }, h('span', {}, h('small', {}, `TP ${sig.tp}`), sig.titulo), svg(ICONOS.adelante, { tam: 18 })))));

    raiz.replaceChildren(pagina);
    const destinoLabs = pagina.querySelector('.modulo__labs');
    for (const labId of mod.labs) {
      const lab = await cargarLaboratorio(labId);
      if (!vivo || !lab) continue;
      const el = marcoLaboratorio(lab);
      labs.push(el);
      destinoLabs.append(el);
    }
    const s = new URLSearchParams(location.hash.split('?')[1]).get('s');
    if (s) irA(s);
  });

  function irA(sid) {
    document.getElementById(sid)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  return () => { vivo = false; labs.forEach((l) => l.destruir()); };
}

// Corta el enunciado sin dejar una fórmula abierta.
function recortar(s) {
  if (s.length <= 160) return s;
  let c = s.slice(0, s.lastIndexOf(' ', 150));
  if ((c.match(/\$/g) || []).length % 2) c = c.slice(0, c.lastIndexOf('$'));
  return c.trimEnd() + '…';
}

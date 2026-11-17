import { h, svg, ICONOS } from '../ui/atomos/h.js';
import { filaModulo } from '../ui/moleculas/moleculas.js';
import { portada } from '../ui/organismos/portada.js';
import { PARCIALES, modulosDe } from '../temario/indice.js';
import { FINALES, rankingTemas } from '../estudio/finales.js';
import { moduloPorId } from '../temario/indice.js';

const enlaceBoton = (href, texto, variante = 'primario', icono = null) =>
  h('a', { class: `boton boton--${variante}`, href }, icono && svg(ICONOS[icono], { tam: 18 }), h('span', {}, texto));

export function vistaInicio(raiz, _params, { almacen }) {
  const s = almacen.leer();
  const final = s.modo === 'final';
  const hero = portada(final
    ? {
      titulo: 'Preparar el final de Análisis II',
      bajada: 'El final es escrito y teórico-práctico: definiciones, teoremas con su demostración y verdadero o falso justificado. Acá están los finales tomados desde 2024, resueltos, y un simulacro armado con la misma estructura.',
      acciones: [enlaceBoton('#/simulacro/final', 'Hacer un simulacro', 'primario', 'examen'), enlaceBoton('#/finales', 'Ver finales resueltos', 'secundario')],
    }
    : {
      titulo: 'Análisis Matemático II, derivando e integrando',
      bajada: 'Teoría de la cátedra, los 24 trabajos prácticos y laboratorios para ver lo que en el pizarrón cuesta imaginar: superficies, planos tangentes, gradientes, volúmenes y campos.',
      acciones: [enlaceBoton(siguiente(s), s.leidos.m01 ? 'Seguir donde dejé' : 'Empezar por el TP 1', 'primario'), enlaceBoton('#/laboratorios', 'Ir a los laboratorios', 'secundario', 'lab')],
    });

  const cuerpo = final ? cuerpoFinal(s) : cuerpoCursada(s);
  raiz.append(hero, cuerpo);
  return () => hero.destruir();
}

function siguiente(s) {
  const pendiente = [...modulosDe(1), ...modulosDe(2)].find((m) => m.tp > 0 && !s.leidos[m.id]);
  return `#/modulo/${pendiente?.id || 'm01'}`;
}

const dias = (texto) => {
  const meses = { julio: 6, noviembre: 10 };
  const [, d, mes, a] = texto.match(/(\d+) de (\w+) de (\d+)/) || [];
  if (!d) return null;
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  return Math.round((new Date(+a, meses[mes], +d) - hoy) / 864e5);
};

function cuerpoCursada(s) {
  return h('div', { class: 'inicio__parciales' },
    PARCIALES.map((p) => {
      const mods = modulosDe(p.n);
      const faltan = dias(p.fecha);
      return h('section', { class: 'parcial', dataset: { parcial: p.n }, 'aria-labelledby': `parcial-${p.n}` },
        h('header', { class: 'parcial__cabecera' },
          h('p', { class: 'parcial__tema' }, p.tema),
          h('h2', { class: 'parcial__titulo', id: `parcial-${p.n}` }, p.titulo),
          h('p', { class: 'parcial__descripcion' }, p.descripcion),
          h('p', { class: 'parcial__fecha' }, faltan > 0 ? `Se toma el ${p.fecha}: faltan ${faltan} días.` : faltan === 0 ? `Se toma hoy, ${p.fecha}.` : `Se tomó el ${p.fecha}.`),
          h('div', { class: 'parcial__acciones' },
            enlaceBoton(`#/simulacro/parcial/${p.n}`, 'Simulacro de preguntas', 'secundario'),
            p.n === 2 ? enlaceBoton('#/finales/modelos', 'Modelos de segundo parcial', 'fantasma') : null)),
        h('div', { class: 'parcial__ruta' }, mods.map((m) => filaModulo(m, { leido: s.leidos[m.id] }))));
    }));
}

function cuerpoFinal(s) {
  const ranking = rankingTemas();
  const max = ranking[0]?.veces || 1;
  return h('div', { class: 'inicio__final' },
    h('section', { class: 'bloque' },
      h('h2', { class: 'bloque__titulo' }, 'Lo que más se toma'),
      h('p', { class: 'bloque__bajada' }, `Cuántas veces apareció cada tema en los ${FINALES.length} finales recopilados. Tocá un tema para estudiarlo.`),
      h('ol', { class: 'ranking' }, ranking.slice(0, 10).map(({ id, veces }) => {
        const m = moduloPorId(id);
        return h('li', { class: 'ranking__fila', dataset: { parcial: m.parcial } },
          h('a', { href: `#/modulo/${id}` }, h('span', { class: 'ranking__tp' }, `TP ${m.tp}`), h('span', { class: 'ranking__nombre' }, m.titulo)),
          h('span', { class: 'ranking__barra', style: { '--p': veces / max }, 'aria-hidden': 'true' }),
          h('span', { class: 'ranking__veces' }, `${veces}`));
      }))),
    h('section', { class: 'bloque' },
      h('h2', { class: 'bloque__titulo' }, 'Finales tomados'),
      h('ul', { class: 'lista-finales' }, FINALES.map((f) =>
        h('li', {}, h('a', { class: 'lista-finales__item', href: `#/final/${f.id}` },
          h('span', { class: 'lista-finales__fecha' }, f.fecha),
          h('span', { class: 'lista-finales__temas' }, temasDe(f))))))));
}

const temasDe = (f) => [...new Set(f.items.map((i) => moduloPorId(i.tema)?.titulo))].slice(0, 4).join(', ');

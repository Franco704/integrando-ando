import { h, svg, ICONOS } from '../atomos/h.js';
import { texto, tex } from '../atomos/matematica.js';
import * as controles from '../atomos/controles.js';
import { Lienzo2D } from '../../graficos/lienzo2d.js';

// Marco común de todo laboratorio (Template Method): el marco arma la estructura, maneja el ciclo de vida
// y libera lo que el laboratorio creó; cada laboratorio solo implementa montar(m).
// Contrato del laboratorio: { id, titulo, resumen, observa: [md], montar(m) -> (() => void)? }
export function marcoLaboratorio(lab, { compacto = false } = {}) {
  const vista = h('div', { class: 'lab__vista' });
  const panel = h('div', { class: 'lab__controles' });
  const lectura = h('div', { class: 'lab__lectura', 'aria-live': 'polite' });
  const raiz = h('section', { class: ['lab', compacto && 'lab--compacto'], 'aria-label': `Laboratorio: ${lab.titulo}` },
    !compacto && h('header', { class: 'lab__cabecera' },
      h('h3', { class: 'lab__titulo' }, svg(ICONOS.lab, { tam: 20 }), lab.titulo),
      lab.resumen && h('div', { class: 'prosa lab__resumen' }, texto(lab.resumen))),
    h('div', { class: 'lab__cuerpo' },
      vista,
      h('div', { class: 'lab__panel' }, panel, lectura,
        lab.observa?.length && h('details', { class: 'lab__observa', open: !compacto },
          h('summary', {}, 'Qué observar'),
          h('ul', {}, lab.observa.map((o) => h('li', {}, texto(o))))))));

  const recursos = [];
  const m = {
    vista, panel, h, tex, texto, ...controles,
    // Los gráficos que pide el laboratorio quedan registrados para liberarlos al salir.
    lienzo(opciones) { const l = new Lienzo2D(vista, opciones); recursos.push(l); return l; },
    async escena(opciones) {
      const { Escena3D } = await import('../../graficos/escena3d.js'); // Three.js solo se descarga si hace falta.
      const e = new Escena3D(vista, opciones);
      recursos.push(e);
      return e;
    },
    leer(...nodos) { lectura.replaceChildren(...nodos.flat().filter((x) => x != null && x !== false)); },
    dato(etiqueta, valor) { return h('div', { class: 'dato' }, h('span', { class: 'dato__etiqueta' }, etiqueta), h('span', { class: 'dato__valor' }, valor)); },
  };

  let limpiar = null;
  const montado = (async () => {
    try {
      limpiar = await lab.montar(m);
    } catch (e) {
      console.error(e);
      vista.replaceChildren(h('p', { class: 'lab__falla' }, 'Este laboratorio no pudo arrancar. Si estás sin conexión, la parte 3D necesita internet la primera vez.'));
    }
  })();

  raiz.destruir = async () => {
    await montado;
    limpiar?.();
    recursos.forEach((r) => r.destruir());
  };
  return raiz;
}

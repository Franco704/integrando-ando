import { h, svg, ICONOS } from '../atomos/h.js';
import { botonIcono } from '../atomos/controles.js';
import { filaModulo } from '../moleculas/moleculas.js';
import { PARCIALES, modulosDe } from '../../temario/indice.js';

// Barra superior: marca, modo de estudio (cursada / final), tema y menú.
export function barraSuperior(almacen, { alMenu }) {
  const modo = (valor, texto) => h('button', { type: 'button', 'aria-pressed': String(almacen.leer().modo === valor), onclick: () => cambiarModo(valor) }, texto);
  const grupoModo = h('div', { class: 'modo', role: 'group', 'aria-label': 'Modo de estudio' }, modo('cursada', 'Cursada'), modo('final', 'Final'));
  function cambiarModo(v) {
    almacen.actualizar({ modo: v });
    if (location.hash !== '#/' && location.hash !== '') location.hash = '#/';
  }
  const temaBtn = botonIcono('luna', 'Cambiar tema claro u oscuro', () => {
    const actual = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    almacen.actualizar({ tema: actual === 'dark' ? 'light' : 'dark' });
  });
  const menu = botonIcono('menu', 'Abrir el índice', alMenu, { class: 'boton-icono boton-menu', 'aria-controls': 'nav', 'aria-expanded': 'false' });
  almacen.suscribir((s) => grupoModo.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-pressed', String(s.modo === (i ? 'final' : 'cursada')))));
  return h('header', { class: 'barra' },
    menu,
    h('a', { class: 'marca', href: '#/' }, h('span', { class: 'marca__signo', 'aria-hidden': 'true' }, '∫'), h('span', { class: 'marca__texto' }, 'Integrando Ando')),
    grupoModo, temaBtn);
}

// Índice: los dos parciales con sus TP, más las herramientas de estudio.
export function navegacion(almacen) {
  const nav = h('nav', { class: 'nav', id: 'nav', 'aria-label': 'Índice de la materia', dataset: { abierta: 'false' } });
  const pintar = () => {
    const s = almacen.leer();
    nav.replaceChildren(
      h('div', { class: 'nav__grupo nav__enlaces' },
        suelto('#/', 'Inicio', 'integral'),
        suelto('#/laboratorios', 'Laboratorios', 'lab'),
        suelto('#/finales', 'Finales resueltos', 'examen'),
        suelto('#/formulario', 'Hoja de fórmulas', 'formula')),
      ...PARCIALES.map((p) => {
        const mods = modulosDe(p.n);
        const hechos = mods.filter((m) => s.leidos[m.id]).length;
        return h('div', { class: 'nav__grupo', dataset: { parcial: p.n } },
          h('p', { class: 'nav__titulo' }, `${p.titulo}: ${p.tema.toLowerCase()}`, h('small', {}, `${hechos} de ${mods.length}`)),
          h('div', { class: 'nav__enlaces' }, mods.map((m) => filaModulo(m, { leido: s.leidos[m.id] }))));
      }));
    marcarActual();
  };
  const suelto = (href, texto, icono) => h('a', { class: 'nav__suelto', href }, svg(ICONOS[icono], { tam: 18 }), texto);
  function marcarActual() {
    const ruta = location.hash || '#/';
    nav.querySelectorAll('a').forEach((a) => a.setAttribute('aria-current', a.getAttribute('href') === ruta ? 'page' : 'false'));
  }
  nav.marcarActual = marcarActual;
  almacen.suscribir(pintar);
  pintar();
  return nav;
}

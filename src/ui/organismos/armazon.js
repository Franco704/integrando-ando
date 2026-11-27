import { h, svg, ICONOS } from '../atomos/h.js';
import { botonIcono } from '../atomos/controles.js';
import { filaModulo } from '../moleculas/moleculas.js';
import { PARCIALES, MODULOS, modulosDe } from '../../temario/indice.js';
import { progreso } from '../../nucleo/almacen.js';

// Mobile-first: en el celular todo se alcanza desde el dock y el cajón (buscador, herramientas e índice);
// desde 1024 px el índice queda fijo al costado y las herramientas pasan a la barra.
const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

// El simulacro que conviene: el final en modo final; si no, el del parcial del primer TP sin estudiar
const simulacro = (s) => (s.modo === 'final' ? '#/simulacro/final' : `#/simulacro/${(MODULOS.find((m) => !s.leidos[m.id]) || MODULOS[0]).parcial}`);
const herramientas = (s) => [
  ['#/laboratorios', 'Laboratorios', 'lab'],
  ['#/finales', 'Finales resueltos', 'examen'],
  ['#/formulario', 'Hoja de fórmulas', 'formula'],
  [simulacro(s), 'Simulacro', 'simulacro'],
  ['#/simulacro/falladas', 'Repasar', 'reiniciar'],
];
const contador = (n) => h('span', { class: 'contador', hidden: !n }, String(n));

// Marca el enlace de la ruta actual (el simulacro cuenta para cualquier parcial)
function marcar(raiz) {
  const ruta = (location.hash || '#/').split('?')[0];
  raiz.querySelectorAll('a').forEach((a) => {
    const href = a.getAttribute('href');
    const activa = href === ruta || (href !== '#/' && href.startsWith('#/simulacro/') && ruta.startsWith('#/simulacro/') && (href === '#/simulacro/falladas') === (ruta === '#/simulacro/falladas'));
    a.setAttribute('aria-current', activa ? 'page' : 'false');
  });
}

// Barra superior: menú (móvil y tablet), marca, herramientas (escritorio), modo de estudio y tema.
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
  const enlaces = h('nav', { class: 'barra__enlaces', 'aria-label': 'Herramientas de estudio' });
  const pintar = (s) => {
    grupoModo.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-pressed', String(s.modo === (i ? 'final' : 'cursada'))));
    enlaces.replaceChildren(...herramientas(s).map(([href, texto]) => h('a', { href }, texto, href === '#/simulacro/falladas' && contador(progreso.falladas(s).length))));
    marcar(enlaces);
  };
  almacen.suscribir(pintar);
  pintar(almacen.leer());
  const barra = h('header', { class: 'barra' },
    menu,
    h('a', { class: 'marca', href: '#/' }, h('span', { class: 'marca__signo', 'aria-hidden': 'true' }, '∫'), h('span', { class: 'marca__texto' }, 'Integrando Ando')),
    enlaces, grupoModo,
    // Volver al hub UTN Ando desde la barra superior
    h('a', { class: 'ir-hub', href: 'https://utn-ando.github.io/', title: 'Volver a UTN Ando: las guías de todas las materias' }, svg('M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z'), h('span', {}, 'UTN Ando')),
    temaBtn);
  barra.marcarActual = () => marcar(enlaces);
  return barra;
}

// Cajón: buscador, todas las herramientas y el índice de los dos parciales con sus TP.
export function navegacion(almacen) {
  const nav = h('nav', { class: 'nav', id: 'nav', 'aria-label': 'Índice de la materia', dataset: { abierta: 'false' } });
  const buscar = h('input', { type: 'search', class: 'nav__buscar', placeholder: 'Buscar: gradiente, Lagrange, jacobiano…', autocomplete: 'off', 'aria-label': 'Buscar un tema' });
  const contenido = h('div', { class: 'nav__contenido' });
  const pintar = () => {
    const s = almacen.leer();
    const q = norm(buscar.value.trim());
    const grupos = PARCIALES.map((p) => {
      const mods = modulosDe(p.n);
      const visibles = mods.filter((m) => !q || norm(`${m.titulo} ${m.resumen || ''} TP ${m.tp}`).includes(q));
      if (!visibles.length) return null;
      const hechos = mods.filter((m) => s.leidos[m.id]).length;
      return h('div', { class: 'nav__grupo', dataset: { parcial: p.n } },
        h('p', { class: 'nav__titulo' }, `${p.titulo}: ${p.tema.toLowerCase()}`, h('small', {}, `${hechos} de ${mods.length}`)),
        h('div', { class: 'nav__enlaces' }, visibles.map((m) => filaModulo(m, { leido: s.leidos[m.id] }))));
    }).filter(Boolean);
    // Con una búsqueda en curso, solo los temas que coinciden
    const herr = q ? [] : [h('div', { class: 'nav__grupo nav__herramientas' },
      suelto('#/', 'Inicio', 'inicio'),
      ...herramientas(s).map(([href, texto, icono]) => suelto(href, texto, icono, href === '#/simulacro/falladas' && contador(progreso.falladas(s).length))))];
    contenido.replaceChildren(...herr, ...(grupos.length ? grupos : [h('p', { class: 'nav__vacio' }, `No hay temas con “${buscar.value}”. Probá con otra palabra.`)]));
    marcar(nav);
  };
  const suelto = (href, texto, icono, extra) => h('a', { class: 'nav__suelto', href }, svg(ICONOS[icono], { tam: 18 }), texto, extra);
  buscar.addEventListener('input', pintar);
  nav.append(h('label', { class: 'nav__busqueda' }, buscar), contenido, h('a', { class: 'nav__hub', href: 'https://utn-ando.github.io/' }, 'Ver las otras materias en UTN Ando'));
  nav.marcarActual = () => marcar(nav);
  nav.enfocarBusqueda = () => buscar.focus();
  almacen.suscribir(pintar);
  pintar();
  return nav;
}

// Dock inferior (celular y tablet): cinco accesos al alcance del pulgar; Índice abre el cajón.
export function dock(almacen, { alIndice }) {
  const raiz = h('nav', { class: 'dock', 'aria-label': 'Accesos rápidos' });
  const pintar = (s) => {
    const n = progreso.falladas(s).length;
    raiz.replaceChildren(
      h('a', { href: '#/' }, svg(ICONOS.inicio, { tam: 22 }), h('span', {}, 'Inicio')),
      h('button', { type: 'button', class: 'dock__indice', 'aria-controls': 'nav', 'aria-expanded': 'false', onclick: alIndice }, svg(ICONOS.indice, { tam: 22 }), h('span', {}, 'Índice')),
      h('a', { href: '#/laboratorios' }, svg(ICONOS.lab, { tam: 22 }), h('span', {}, 'Labs')),
      h('a', { href: simulacro(s) }, svg(ICONOS.simulacro, { tam: 22 }), h('span', {}, 'Simulacro')),
      h('a', { href: '#/simulacro/falladas', 'aria-label': n ? `Repasar, ${n} preguntas falladas` : 'Repasar' }, svg(ICONOS.reiniciar, { tam: 22 }), h('span', {}, 'Repasar'), contador(n)));
    marcar(raiz);
  };
  almacen.suscribir(pintar);
  pintar(almacen.leer());
  raiz.marcarActual = () => marcar(raiz);
  return raiz;
}

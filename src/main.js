// Raíz de composición: el único lugar que conoce todas las piezas y las conecta.
import { crearAlmacen } from './nucleo/almacen.js';
import { crearRouter } from './nucleo/router.js';
import { h } from './ui/atomos/h.js';
import { barraSuperior, navegacion } from './ui/organismos/armazon.js';
import { vistaInicio } from './vistas/inicio.js';
import { vistaModulo } from './vistas/modulo.js';
import { vistaLaboratorios, vistaLaboratorio } from './vistas/laboratorios.js';
import { vistaFinales, vistaFinal, vistaModelo } from './vistas/finales.js';
import { vistaSimulacro, vistaSimulacroFinal } from './vistas/simulacro.js';
import { vistaFormulario } from './vistas/formulario.js';

const almacen = crearAlmacen();
const ctx = { almacen };

const aplicarTema = ({ tema }) => {
  if (tema === 'auto') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = tema;
};
aplicarTema(almacen.leer());

const nav = navegacion(almacen);
const principal = h('main', { class: 'principal', id: 'contenido', tabindex: '-1' });
const menuAbierto = (abrir) => {
  nav.dataset.abierta = String(abrir);
  document.querySelector('.boton-menu')?.setAttribute('aria-expanded', String(abrir));
  document.body.classList.toggle('sin-scroll', abrir);
};
const barra = barraSuperior(almacen, { alMenu: () => menuAbierto(nav.dataset.abierta !== 'true') });

document.body.append(
  h('a', { class: 'saltar', href: '#contenido', onclick: (e) => { e.preventDefault(); principal.focus(); } }, 'Saltar al contenido'),
  barra, nav, principal);
addEventListener('keydown', (e) => { if (e.key === 'Escape') menuAbierto(false); });

// Cada vista recibe (raíz, parámetros, contexto) y puede devolver una función de limpieza.
const con = (vista) => (raiz, params) => vista(raiz, params, ctx);
const router = crearRouter(principal, [
  { patron: '/', vista: con(vistaInicio) },
  { patron: '/modulo/:id', vista: con(vistaModulo) },
  { patron: '/laboratorios', vista: con(vistaLaboratorios) },
  { patron: '/lab/:id', vista: con(vistaLaboratorio) },
  { patron: '/finales', vista: con(vistaFinales) },
  { patron: '/finales/modelos', vista: con(vistaFinales) },
  { patron: '/final/:id', vista: con(vistaFinal) },
  { patron: '/modelo/:id', vista: con(vistaModelo) },
  { patron: '/simulacro/final', vista: con(vistaSimulacroFinal) },
  { patron: '/simulacro/parcial/:n', vista: con(vistaSimulacro) },
  { patron: '/simulacro/:n', vista: con(vistaSimulacro) },
  { patron: '/formulario', vista: con(vistaFormulario) },
], {
  alCambiar(ruta) {
    if (ruta === '/') document.title = 'Integrando Ando · Análisis Matemático II';
    menuAbierto(false);
    nav.marcarActual();
    if (!location.hash.includes('?')) scrollTo(0, 0);
  },
});

// Cambiar el tema o el modo vuelve a pintar la vista actual (los gráficos leen los colores al dibujarse).
let previo = almacen.leer();
almacen.suscribir((s) => {
  if (s.tema !== previo.tema) { aplicarTema(s); router.iniciar(); }
  else if (s.modo !== previo.modo && (location.hash || '#/') === '#/') router.iniciar();
  previo = s;
});
router.iniciar();

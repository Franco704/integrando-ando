import { simpson } from '../../matematica/calculo.js';

const { cos, sin, PI } = Math;
const CAMPOS = {
  rot: { n: 'F = (−y, x)', F: (x, y) => [-y, x], cons: false },
  grad: { n: 'F = ∇(xy) = (y, x), conservativo', F: (x, y) => [y, x], cons: true },
  mix: { n: 'F = (x², xy)', F: (x, y) => [x * x, x * y], cons: false },
};
const CAMINOS = {
  circ: { n: 'Circunferencia unitaria (cerrada)', r: (t) => [cos(2 * PI * t), sin(2 * PI * t)] },
  recta: { n: 'Recta de (0,0) a (1,1)', r: (t) => [t, t] },
  parab: { n: 'Parábola y = x² de (0,0) a (1,1)', r: (t) => [t, t * t] },
  quebrada: { n: 'Quebrada (0,0) → (1,0) → (1,1)', r: (t) => (t < 0.5 ? [2 * t, 0] : [1, 2 * t - 1]) },
};
const d = (r, t, h = 1e-5) => r(Math.min(1, t + h)).map((v, i) => (v - r(Math.max(0, t - h))[i]) / (Math.min(1, t + h) - Math.max(0, t - h)));

export default {
  resumen: String.raw`El **trabajo** de un campo de fuerzas sobre una partícula que recorre $C$ es $W=\int_C\vec F\cdot d\vec r$. En cada instante suma la componente de $\vec F$ en la dirección del movimiento. Mové el punto: la flecha ciruela es $\vec F$, la azul la velocidad; abajo se acumula $\vec F\cdot\vec r\,{}'$ y su área es el trabajo.`,
  observa: [
    String.raw`Con $\vec F=(-y,x)$ sobre la circunferencia, $\vec F$ y la velocidad son siempre paralelos: el trabajo de una vuelta es $2\pi$, que por Green es $2\cdot$área.`,
    String.raw`Con el campo conservativo $\nabla(xy)$, los tres caminos de $(0,0)$ a $(1,1)$ dan **el mismo** trabajo, $f(1,1)-f(0,0)=1$, y la vuelta cerrada da $0$.`,
    String.raw`Con $(x^2,xy)$ los caminos abiertos dan resultados distintos: no es conservativo ($Q_x=y\neq0=P_y$).`,
  ],
  async montar(m) {
    m.vista.closest('.lab')?.classList.add('lab--doble');
    const L = m.lienzo({ x: [-1.6, 1.6], y: [-1.6, 1.6], etiqueta: 'Campo vectorial y curva de integración' });
    const G = m.lienzo({ x: [0, 1], y: [-2, 2], proporcional: false, etiqueta: 'F·r′ a lo largo del camino' });
    let campo = 'rot', camino = 'circ', t = 0.3;
    m.panel.append(
      m.selector({ etiqueta: 'Campo', valor: campo, opciones: Object.entries(CAMPOS).map(([k, c]) => [k, c.n]), alCambiar: (v) => { campo = v; dibujar(); } }),
      m.selector({ etiqueta: 'Camino', valor: camino, opciones: Object.entries(CAMINOS).map(([k, c]) => [k, c.n]), alCambiar: (v) => { camino = v; dibujar(); } }),
      m.deslizador({ etiqueta: 'Parámetro t', min: 0, max: 1, paso: 0.005, valor: t, alCambiar: (v) => { t = v; dibujar(); } }));

    function dibujar() {
      const { F } = CAMPOS[campo], { r } = CAMINOS[camino];
      const integrando = (s) => { const p = r(s), v = d(r, s), f = F(...p); return f[0] * v[0] + f[1] * v[1]; };
      const W = simpson(integrando, 0, 1, 400), Wt = simpson(integrando, 0, t, 200);
      L.alDibujar((Lz) => {
        Lz.ejes({ marcas: false });
        Lz.campo(F, { densidad: 14, color: Lz.c.tintaSuave });
        Lz.parametrica(r, 0, 1, { color: Lz.c.deriv, ancho: 3 });
        const p = r(t), v = d(r, t), f = F(...p), nv = Math.hypot(...v) || 1, nf = Math.hypot(...f) || 1;
        Lz.flecha(p, [(v[0] / nv) * 0.5, (v[1] / nv) * 0.5], { color: Lz.c.deriv, ancho: 2.5 });
        Lz.flecha(p, [(f[0] / nf) * 0.5, (f[1] / nf) * 0.5], { color: Lz.c.integ, ancho: 2.5 });
        Lz.punto(p, { color: Lz.c.tinta });
      });
      let lim = 0.5;
      for (let k = 0; k <= 100; k++) lim = Math.max(lim, Math.abs(integrando(k / 100)));
      G.rango.y = [-lim * 1.2, lim * 1.2];
      G.alDibujar((Lz) => {
        const pts = [[0, 0]];
        for (let k = 0; k <= 120; k++) { const s = (t * k) / 120; pts.push([s, integrando(s)]); }
        pts.push([t, 0]);
        Lz.trazo(pts, { color: Lz.c.integ, ancho: 0, relleno: Lz.c.integ + '44', cerrar: true });
        Lz.ejes();
        Lz.funcion((s) => (s >= 0 && s <= 1 ? integrando(s) : NaN), { color: Lz.c.integ, ancho: 2.5 });
        Lz.texto('t', [0.97, 0], { dy: -6, color: Lz.c.tintaSuave });
      });
      m.leer(m.tex(String.raw`W=\int_C\vec F\cdot d\vec r=\int_0^1\vec F(\vec r(t))\cdot\vec r\,{}'(t)\,dt`, { bloque: true }),
        m.dato('Trabajo acumulado hasta t', Wt.toFixed(4)), m.dato('Trabajo total', W.toFixed(4)),
        CAMPOS[campo].cons ? m.h('p', { class: 'lab__pista' }, 'Campo conservativo: el trabajo solo depende de los extremos.') : null);
    }
    dibujar();
  },
};

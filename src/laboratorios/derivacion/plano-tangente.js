import { intentarCompilar } from '../../matematica/expresion.js';
import { gradiente } from '../../matematica/calculo.js';

const FUNCIONES = [
  ['x^2+y^2', 'Paraboloide z = x² + y² (TP 10, II)'],
  ['sqrt(17-x^2-y^2)', 'Esfera x² + y² + z² = 17, hoja superior (TP 10, 1 b)'],
  ['x^2-y^2', 'Silla z = x² − y²'],
  ['sen(x)cos(y)', 'z = sen x · cos y'],
];
const n = (v) => (Math.abs(v) < 5e-4 ? '0' : v.toFixed(3));
const sig = (v) => (v < 0 ? `- ${n(-v)}` : `+ ${n(v)}`);

export default {
  resumen: String.raw`En un punto donde $f$ es diferenciable, la superficie $z=f(x,y)$ se parece a un plano: el **plano tangente**

$$z-z_0=f_x(x_0,y_0)(x-x_0)+f_y(x_0,y_0)(y-y_0)$$

Su normal es $\vec n=(f_x,f_y,-1)$, que es $\nabla F$ para $F=f(x,y)-z$. La flecha ciruela es la **recta normal**.`,
  observa: [
    'Al acercarte (rueda o pellizco), la superficie y el plano se vuelven indistinguibles cerca del punto: eso es ser diferenciable.',
    'En la silla, el plano tangente en el origen es horizontal pero corta a la superficie: tangente no significa "de un solo lado".',
    String.raw`En la esfera, la recta normal pasa siempre por el centro: la normal tiene la dirección de $\vec{OP_0}$.`,
  ],
  async montar(m) {
    const e = await m.escena({ rango: 3, etiqueta: 'Superficie con plano tangente y recta normal' });
    let f, x0 = 1, y0 = 0.6, sup = null, marcas = [];
    const campo = m.campoFuncion({ etiqueta: 'f(x, y) =', valor: FUNCIONES[0][0], alCambiar: (s) => cargar(s) });
    m.panel.append(campo,
      m.selector({ etiqueta: 'Superficies', opciones: FUNCIONES, valor: FUNCIONES[0][0], alCambiar: (v) => campo.fijar(v) }),
      m.deslizador({ etiqueta: 'x₀', min: -2.5, max: 2.5, valor: x0, alCambiar: (v) => { x0 = v; dibujar(); } }),
      m.deslizador({ etiqueta: 'y₀', min: -2.5, max: 2.5, valor: y0, alCambiar: (v) => { y0 = v; dibujar(); } }));

    function cargar(s) {
      const { f: g, error } = intentarCompilar(s, ['x', 'y']);
      if (error) return error;
      f = (x, y) => { const z = g(x, y); return Number.isFinite(z) && Math.abs(z) < 30 ? z : NaN; };
      e.quitar(sup);
      sup = e.superficie(f, [-3, 3], [-3, 3], { n: 90, opacidad: 0.9, recortarZ: [-3.5, 4.5] });
      dibujar();
      return null;
    }
    function dibujar() {
      marcas.forEach((o) => e.quitar(o));
      marcas = [];
      const z0 = f(x0, y0);
      if (!Number.isFinite(z0)) { m.leer(m.h('p', { class: 'lab__pista' }, 'Ese punto está fuera del dominio.')); return; }
      const [fx, fy] = gradiente(f, [x0, y0]);
      const nor = [-fx, -fy, 1], k = 0.9 / Math.hypot(...nor);
      marcas = [
        e.plano([x0, y0, z0], nor, { tam: 2.4, token: 'deriv', opacidad: 0.35 }),
        e.flecha([x0, y0, z0], nor.map((c) => c * k * 1.4), { token: 'integ' }),
        e.segmento([x0, y0, z0], nor.map((c, i) => [x0, y0, z0][i] - c * k * 1.4), { token: 'integ' }),
        e.punto([x0, y0, z0], { token: 'integ' }),
      ].filter(Boolean);
      m.leer(
        m.dato('P₀', `(${n(x0)}, ${n(y0)}, ${n(z0)})`),
        m.dato('f_x(P₀), f_y(P₀)', `${n(fx)}, ${n(fy)}`),
        m.h('p', { class: 'lab__pista' }, 'Plano tangente:'),
        m.tex(`z ${sig(-z0)} = ${n(fx)}\\,(x ${sig(-x0)}) ${sig(fy)}\\,(y ${sig(-y0)})`, { bloque: true }),
        m.h('p', { class: 'lab__pista' }, 'Recta normal:'),
        m.tex(`\\frac{x ${sig(-x0)}}{${n(fx)}}=\\frac{y ${sig(-y0)}}{${n(fy)}}=\\frac{z ${sig(-z0)}}{-1}`, { bloque: true }));
    }
    cargar(FUNCIONES[0][0]);
  },
};

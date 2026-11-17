import { intentarCompilar } from '../../matematica/expresion.js';
import { gradiente } from '../../matematica/calculo.js';

const FUNCIONES = [
  ['(3x^2+2x*y-y^2)/6', '(3x² + 2xy − y²)/6'],
  ['x*y', 'z = xy'],
  ['sqrt(x^2+y^2)', 'Cono (no diferenciable en el origen)'],
  ['sen(x)+cos(y)', 'sen x + cos y'],
];
const n = (v) => (Number.isFinite(v) ? v.toFixed(4) : '—');

export default {
  resumen: String.raw`Desde $P_0$ te movés $(\Delta x,\Delta y)$. La superficie sube $\Delta z$ (segmento ciruela); el plano tangente sube $dz=f_x\,dx+f_y\,dy$ (segmento azul). Ser **diferenciable** significa que la diferencia entre los dos es despreciable **frente al tamaño del paso**: $\frac{\Delta z-dz}{\sqrt{\Delta x^2+\Delta y^2}}\to0$.`,
  observa: [
    'Achicá los dos deslizadores juntos: el error Δz − dz se achica mucho más rápido que el paso. Eso justifica usar dz para aproximar.',
    String.raw`Con el cono en el origen no hay plano tangente: el cociente error/paso **no** tiende a cero. No es diferenciable aunque sea continua.`,
    'El cálculo aproximado del TP es esto mismo: f(P₀ + Δ) ≈ f(P₀) + dz.',
  ],
  async montar(m) {
    const e = await m.escena({ rango: 2.5, etiqueta: 'Incremento total y diferencial sobre la superficie' });
    let f, x0 = 1, y0 = 0.5, dx = 0.6, dy = 0.5, sup = null, marcas = [];
    const campo = m.campoFuncion({ etiqueta: 'f(x, y) =', valor: FUNCIONES[0][0], alCambiar: (s) => cargar(s) });
    const px = m.deslizador({ etiqueta: 'x₀', min: -2, max: 2, valor: x0, alCambiar: (v) => { x0 = v; dibujar(); } });
    const py = m.deslizador({ etiqueta: 'y₀', min: -2, max: 2, valor: y0, alCambiar: (v) => { y0 = v; dibujar(); } });
    m.panel.append(campo,
      m.selector({ etiqueta: 'Funciones', opciones: FUNCIONES, valor: FUNCIONES[0][0], alCambiar: (v) => { campo.fijar(v); if (v.startsWith('sqrt')) { x0 = 0; y0 = 0; px.fijar(0); py.fijar(0); } } }),
      px, py,
      m.deslizador({ etiqueta: 'Δx = dx', min: -1, max: 1, paso: 0.005, valor: dx, formato: (v) => v.toFixed(3), alCambiar: (v) => { dx = v; dibujar(); } }),
      m.deslizador({ etiqueta: 'Δy = dy', min: -1, max: 1, paso: 0.005, valor: dy, formato: (v) => v.toFixed(3), alCambiar: (v) => { dy = v; dibujar(); } }));

    function cargar(s) {
      const { f: g, error } = intentarCompilar(s, ['x', 'y']);
      if (error) return error;
      f = g;
      e.quitar(sup);
      sup = e.superficie(f, [-2.5, 2.5], [-2.5, 2.5], { n: 80, opacidad: 0.8, recortarZ: [-3, 3] });
      dibujar();
      return null;
    }
    function dibujar() {
      marcas.forEach((o) => e.quitar(o));
      const z0 = f(x0, y0), x1 = x0 + dx, y1 = y0 + dy;
      // En el cono el gradiente en el vértice no existe: la diferencia central da 0 y el "plano" queda horizontal.
      const [fx, fy] = gradiente(f, [x0, y0]);
      const Dz = f(x1, y1) - z0, dz = fx * dx + fy * dy;
      const paso = Math.hypot(dx, dy);
      marcas = [
        e.plano([x0, y0, z0], [-fx, -fy, 1], { tam: 2.6, token: 'deriv', opacidad: 0.25 }),
        e.punto([x0, y0, z0], { token: 'tinta' }),
        e.punto([x1, y1, z0 + Dz], { token: 'integ' }),
        e.punto([x1, y1, z0 + dz], { token: 'deriv' }),
        e.segmento([x0, y0, z0], [x1, y1, z0], { token: 'tintaSuave' }),
        e.curva((t) => [x1, y1, z0 + Dz * t], 0, 1, { token: 'integ', grosor: 0.012, n: 4 }),
        e.curva((t) => [x1 + 0.03, y1, z0 + dz * t], 0, 1, { token: 'deriv', grosor: 0.012, n: 4 }),
      ].filter(Boolean);
      m.leer(
        m.dato('Δz = f(P₀ + Δ) − f(P₀)', n(Dz)),
        m.dato('dz = f_x dx + f_y dy', n(dz)),
        m.dato('Error Δz − dz', n(Dz - dz)),
        m.dato('Error / tamaño del paso', paso > 1e-9 ? n((Dz - dz) / paso) : '—'),
        m.dato('Aproximación f(P₀) + dz', n(z0 + dz)));
    }
    cargar(FUNCIONES[0][0]);
  },
};

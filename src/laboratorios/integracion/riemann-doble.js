import { riemann2D, integralDoble } from '../../matematica/calculo.js';

// Cada caso: función, rectángulo que contiene la región, región como tipo I (g1 ≤ y ≤ g2) y su fórmula.
const CASOS = [
  { n: 'Paraboloide 4 − x² − y² sobre [0,1]×[0,1]', f: (x, y) => 4 - x * x - y * y, a: 0, b: 1, g1: () => 0, g2: () => 1, tex: String.raw`\int_0^1\!\!\int_0^1(4-x^2-y^2)\,dy\,dx=\tfrac{10}{3}` },
  { n: '12x²eʸ entre y = x³ e y = x (TP 13, 12 g)', f: (x, y) => 12 * x * x * Math.exp(y) / 6, a: 0, b: 1, g1: (x) => x ** 3, g2: (x) => x, tex: String.raw`\tfrac16\int_0^1\!\!\int_{x^3}^{x}12x^2e^y\,dy\,dx=\tfrac{8e-20}{6}`, escala: 6 },
  { n: 'x + y sobre el triángulo 0 ≤ y ≤ x ≤ 2', f: (x, y) => x + y, a: 0, b: 2, g1: () => 0, g2: (x) => x, tex: String.raw`\int_0^2\!\!\int_0^{x}(x+y)\,dy\,dx=4` },
  { n: 'Semiesfera √(4 − x² − y²) sobre el disco', f: (x, y) => Math.sqrt(Math.max(0, 4 - x * x - y * y)), a: -2, b: 2, g1: (x) => -Math.sqrt(4 - x * x), g2: (x) => Math.sqrt(4 - x * x), tex: String.raw`\iint_{x^2+y^2\le4}\sqrt{4-x^2-y^2}\,dA=\tfrac{16\pi}{3}` },
];

export default {
  resumen: String.raw`La integral doble es el **volumen** bajo la superficie. Se parte la región en $n\times n$ rectángulos, sobre cada uno se levanta un prisma de altura $f(x_i^*,y_j^*)$ y se suman los volúmenes. Subí $n$ y mirá cómo la suma se acerca al valor exacto: ese límite es $\iint_Rf\,dA$.`,
  observa: [
    'Con el punto medio el error baja muy rápido; con la esquina inferior izquierda, bastante más lento.',
    'En regiones no rectangulares solo cuentan los rectángulos cuyo punto de muestra cae adentro: el borde dentado desaparece al refinar.',
    'Si f fuera negativa, el prisma "colgaría" debajo del plano xy y restaría.',
  ],
  async montar(m) {
    const e = await m.escena({ rango: 2.5, camara: [1.6, -2.2, 1.5], etiqueta: 'Prismas de una suma de Riemann bajo una superficie' });
    let caso = CASOS[0], n = 6, regla = 'medio', objetos = [];
    m.panel.append(
      m.selector({ etiqueta: 'Integral', valor: caso.n, opciones: CASOS.map((c) => [c.n, c.n]), alCambiar: (v) => { caso = CASOS.find((c) => c.n === v); dibujar(); } }),
      m.deslizador({ etiqueta: 'Subdivisiones por lado n', min: 1, max: 40, paso: 1, valor: n, formato: (v) => `${v} × ${v} = ${v * v}`, alCambiar: (v) => { n = v; dibujar(); } }),
      m.selector({ etiqueta: 'Punto de muestra', valor: regla, opciones: [['medio', 'Punto medio'], ['esquina', 'Esquina']], alCambiar: (v) => { regla = v; dibujar(); } }));

    function dibujar() {
      objetos.forEach((o) => e.quitar(o));
      const { f, a, b, g1, g2 } = caso;
      let c = Infinity, d = -Infinity;
      for (let k = 0; k <= 50; k++) { const x = a + ((b - a) * k) / 50; c = Math.min(c, g1(x)); d = Math.max(d, g2(x)); }
      const dentro = (x, y) => y >= g1(x) && y <= g2(x);
      const { suma, celdas } = riemann2D(f, { a, b, c, d }, n, n, dentro, regla);
      const exacto = integralDoble(f, a, b, g1, g2, 120);
      const zmax = Math.max(...celdas.map((q) => q.z), 1e-9);
      // Escala solo visual: la región ocupa ~3 unidades y la altura ~2, para que se lean los prismas.
      const kxy = 3 / Math.max(b - a, d - c), kz = 2 / zmax, cx = (a + b) / 2, cy = (c + d) / 2;
      const V = (x, y, z) => [(x - cx) * kxy, (y - cy) * kxy, z * kz];
      objetos = [
        e.cajas(celdas.map((q) => ({ x: (q.x0 - cx) * kxy, y: (q.y0 - cy) * kxy, z: 0, dx: q.dx * kxy, dy: q.dy * kxy, dz: q.z * kz })), {
          opacidad: 0.92,
          colorPor: (q, col) => col.copy(e.color('deriv')).lerp(e.color('integ'), q.dz / 2),
        }),
        e.parametrizada((u, v) => { const y = g1(u) + (g2(u) - g1(u)) * v; return V(u, y, f(u, y)); }, [a, b], [0, 1], { n: 50, opacidad: 0.35, alambre: true }),
      ];
      const esc = caso.escala || 1;
      m.leer(
        m.tex(caso.tex, { bloque: true }),
        m.dato('Suma de Riemann', (suma).toFixed(5)),
        m.dato('Valor de la integral', exacto.toFixed(5)),
        m.dato('Error', Math.abs(suma - exacto).toExponential(2)),
        m.h('p', { class: 'lab__pista' }, `La figura está escalada para que se lea: base × ${kxy.toFixed(2)}, altura × ${kz.toFixed(2)}.${esc !== 1 ? ` La función está dividida por ${esc}.` : ''}`));
    }
    dibujar();
  },
};

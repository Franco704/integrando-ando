import { gradiente, niveles } from '../../matematica/calculo.js';

// Cada familia se da como curvas de nivel G(x,y) = c; su ortogonal, como H(x,y) = k.
const FAMILIAS = [
  { n: 'x² + y² = c y las rectas y = kx (final mayo 2025)', G: (x, y) => x * x + y * y, H: (x, y) => Math.atan2(y, x), ec: String.raw`x^2+y^2=c\ \perp\ y=kx`, rG: [0.2, 12], rH: [-Math.PI, Math.PI] },
  { n: 'cy = x² y las elipses x²/2 + y² = k (2° parcial, tema 12)', G: (x, y) => y / (x * x), H: (x, y) => x * x / 2 + y * y, ec: String.raw`cy=x^2\ \perp\ \tfrac{x^2}{2}+y^2=k`, rG: [-3, 3], rH: [0.1, 9] },
  { n: 'y² − x² = c y las hipérbolas xy = k (2° parcial, tema 14)', G: (x, y) => y * y - x * x, H: (x, y) => x * y, ec: String.raw`y^2-x^2=c\ \perp\ xy=k`, rG: [-8, 8], rH: [-8, 8] },
  { n: '2cx = y² y las elipses 2x² + y² = k (2° parcial, tema 13)', G: (x, y) => (y * y) / x, H: (x, y) => 2 * x * x + y * y, ec: String.raw`2cx=y^2\ \perp\ 2x^2+y^2=k`, rG: [-8, 8], rH: [0.2, 20] },
];

export default {
  resumen: String.raw`Dos familias de curvas son **ortogonales** si cada curva de una corta a cada curva de la otra en ángulo recto. Se encuentran derivando la familia, eliminando $c$ para obtener $y'=f(x,y)$ y resolviendo $y'=-\frac{1}{f(x,y)}$. Tocá el plano: en ese punto se ven las dos tangentes, siempre perpendiculares.`,
  observa: [
    'Las rectas por el origen cortan a todas las circunferencias centradas en el origen en ángulo recto: son sus radios.',
    'Las hipérbolas y² − x² = c y xy = k son la misma forma girada 45°.',
    String.raw`El producto de las pendientes en el punto de cruce es siempre $-1$.`,
  ],
  async montar(m) {
    const L = m.lienzo({ x: [-3, 3], y: [-3, 3], etiqueta: 'Familia de curvas y sus trayectorias ortogonales' });
    let fam = FAMILIAS[0], P = [1.2, 0.8];
    m.panel.append(m.selector({ etiqueta: 'Familias', valor: fam.n, opciones: FAMILIAS.map((f) => [f.n, f.n]), alCambiar: (v) => { fam = FAMILIAS.find((f) => f.n === v); dibujar(); } }));
    L.alPuntero((q) => { P = q; dibujar(); });

    function dibujar() {
      const gG = gradiente(fam.G, P), gH = gradiente(fam.H, P);
      // La tangente a una curva de nivel es perpendicular a su gradiente.
      const m1 = -gG[0] / gG[1], m2 = -gH[0] / gH[1];
      L.alDibujar((Lz) => {
        Lz.ejes({ marcas: false });
        Lz.contornos(fam.G, niveles(...fam.rG, 16), { colores: () => Lz.c.deriv, ancho: 1.6, resolucion: 140, salto: 4 });
        Lz.contornos(fam.H, niveles(...fam.rH, 16), { colores: () => Lz.c.integ, ancho: 1.6, resolucion: 140, salto: 2 });
        const seg = (mm) => { const d = 0.6 / Math.hypot(1, Number.isFinite(mm) ? mm : 1e6); return Number.isFinite(mm) ? [[P[0] - d, P[1] - mm * d], [P[0] + d, P[1] + mm * d]] : [[P[0], P[1] - 0.6], [P[0], P[1] + 0.6]]; };
        Lz.trazo(seg(m1), { color: Lz.c.deriv, ancho: 4 });
        Lz.trazo(seg(m2), { color: Lz.c.integ, ancho: 4 });
        Lz.punto(P, { color: Lz.c.tinta });
      });
      const f = (v) => (Number.isFinite(v) && Math.abs(v) < 1e6 ? v.toFixed(3) : '∞');
      m.leer(m.tex(fam.ec, { bloque: true }),
        m.dato('Pendiente de la familia', f(m1)), m.dato('Pendiente de la ortogonal', f(m2)),
        m.dato('Producto', Number.isFinite(m1 * m2) && Math.abs(m1) < 1e6 && Math.abs(m2) < 1e6 ? (m1 * m2).toFixed(3) : 'una tangente vertical'));
    }
    dibujar();
  },
};

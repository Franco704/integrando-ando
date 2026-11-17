import { integralTriple } from '../../matematica/calculo.js';

// Sólido = { a ≤ x ≤ b, g1(x) ≤ y ≤ g2(x), h1(x,y) ≤ z ≤ h2(x,y) }
const SOLIDOS = [
  { n: 'Tetraedro 3x + 2y + z = 6 (TP 14, 4 b)', a: 0, b: 2, g1: () => 0, g2: (x) => 3 - 1.5 * x, h1: () => 0, h2: (x, y) => 6 - 3 * x - 2 * y, tex: String.raw`\int_0^2\!\!\int_0^{3-\frac32x}\!\!\int_0^{6-3x-2y}dz\,dy\,dx=6` },
  { n: 'Bajo z = x² + y², sobre x + y ≤ 1 (TP 14, 6 c)', a: 0, b: 1, g1: () => 0, g2: (x) => 1 - x, h1: () => 0, h2: (x, y) => x * x + y * y, tex: String.raw`\int_0^1\!\!\int_0^{1-x}\!\!\int_0^{x^2+y^2}dz\,dy\,dx=\tfrac16` },
  { n: 'Cilindro x² + y² = 9 bajo x + z = 4 (final feb. 2025)', a: -3, b: 3, g1: (x) => -Math.sqrt(9 - x * x), g2: (x) => Math.sqrt(9 - x * x), h1: () => 0, h2: (x) => 4 - x, tex: String.raw`\int_0^{2\pi}\!\!\int_0^3\!\!\int_0^{4-r\cos\theta}r\,dz\,dr\,d\theta=36\pi` },
  { n: 'Entre z = 0, x² + 2z = 4 y x² + y² = 4, 1er octante (TP 14, 2 a)', a: 0, b: 2, g1: () => 0, g2: (x) => Math.sqrt(4 - x * x), h1: () => 0, h2: (x) => (4 - x * x) / 2, tex: String.raw`\int_0^2\!\!\int_0^{\sqrt{4-x^2}}\!\!\int_0^{\frac{4-x^2}{2}}dz\,dy\,dx=\tfrac{3\pi}{2}` },
];

export default {
  resumen: String.raw`La integral triple suma $f\,\Delta V$ sobre cajitas que llenan el sólido. Con $f=1$ da el **volumen**. Acá el sólido se describe como en la cátedra: se proyecta sobre el plano $xy$ (región $D$) y $z$ va del "piso" $h_1(x,y)$ al "techo" $h_2(x,y)$. Subí $n$ para ver cómo los vóxeles llenan el sólido.`,
  observa: [
    'Los límites de z son las dos superficies que encierran al sólido por abajo y por arriba; los de x e y salen de la sombra del sólido en el plano xy.',
    'Con pocas cajitas la suma es grosera; al refinar se acerca al volumen exacto.',
    'En el cilindro, el plano inclinado hace que el sólido sea más alto del lado de x negativo.',
  ],
  async montar(m) {
    const e = await m.escena({ rango: 3, camara: [1.7, -2.1, 1.4], etiqueta: 'Sólido aproximado por cajitas' });
    let s = SOLIDOS[0], n = 8, objs = [];
    m.panel.append(
      m.selector({ etiqueta: 'Sólido', valor: s.n, opciones: SOLIDOS.map((q) => [q.n, q.n]), alCambiar: (v) => { s = SOLIDOS.find((q) => q.n === v); dibujar(); } }),
      m.deslizador({ etiqueta: 'Cajitas por lado n', min: 2, max: 24, paso: 1, valor: n, formato: (v) => `${v}`, alCambiar: (v) => { n = v; dibujar(); } }));

    function dibujar() {
      objs.forEach((o) => e.quitar(o));
      let c = Infinity, d = -Infinity, zmax = 0;
      for (let k = 0; k <= 60; k++) {
        const x = s.a + ((s.b - s.a) * k) / 60;
        c = Math.min(c, s.g1(x)); d = Math.max(d, s.g2(x));
        for (let j = 0; j <= 20; j++) zmax = Math.max(zmax, s.h2(x, s.g1(x) + ((s.g2(x) - s.g1(x)) * j) / 20));
      }
      const k = 3.4 / Math.max(s.b - s.a, d - c, zmax), cx = (s.a + s.b) / 2, cy = (c + d) / 2;
      const dx = (s.b - s.a) / n, dy = (d - c) / n, dz = zmax / n;
      const cajas = [];
      let suma = 0;
      for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++) {
          const x = s.a + (i + 0.5) * dx, y = c + (j + 0.5) * dy;
          if (y < s.g1(x) || y > s.g2(x)) continue;
          for (let q = 0; q < n; q++) {
            const z = (q + 0.5) * dz;
            if (z < s.h1(x, y) || z > s.h2(x, y)) continue;
            suma += dx * dy * dz;
            cajas.push({ x: (x - dx / 2 - cx) * k, y: (y - dy / 2 - cy) * k, z: (z - dz / 2) * k - 1.5, dx: dx * k, dy: dy * k, dz: dz * k });
          }
        }
      const V = (x, y, z) => [(x - cx) * k, (y - cy) * k, z * k - 1.5];
      const tapa = (h) => e.parametrizada((u, v) => { const y = s.g1(u) + (s.g2(u) - s.g1(u)) * v; return V(u, y, h(u, y)); }, [s.a, s.b], [0, 1], { n: 40, opacidad: 0.3 });
      objs = [e.cajas(cajas, { opacidad: 0.85, colorPor: (b, col) => col.copy(e.color('deriv')).lerp(e.color('integ'), (b.z + 1.5) / 3.4) }), tapa(s.h2), tapa(s.h1)];
      const exacto = integralTriple(() => 1, s.a, s.b, s.g1, s.g2, s.h1, s.h2, 50);
      m.leer(m.tex(s.tex, { bloque: true }),
        m.dato('Cajitas dentro del sólido', String(cajas.length)),
        m.dato('Suma de sus volúmenes', suma.toFixed(4)),
        m.dato('Volumen exacto', exacto.toFixed(4)));
    }
    dibujar();
  },
};

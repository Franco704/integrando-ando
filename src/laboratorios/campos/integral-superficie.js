import { gradiente } from '../../matematica/calculo.js';

const { sqrt, PI, cos, sin } = Math;
const CASOS = [
  { n: 'Cono z = √(x² + y²) entre z = 1 y z = 2 (final ago. 2024)', f: (x, y) => sqrt(x * x + y * y), r: [1, 2], exacto: 3 * sqrt(2) * PI, tex: String.raw`\int_0^{2\pi}\!\!\int_1^2\sqrt2\,r\,dr\,d\theta=3\sqrt2\,\pi` },
  { n: 'z = 9 − x² − y² entre z = 1 y z = 5 (final 25/11)', f: (x, y) => 9 - x * x - y * y, r: [2, sqrt(8)], exacto: (PI / 6) * (33 ** 1.5 - 17 ** 1.5), tex: String.raw`\int_0^{2\pi}\!\!\int_2^{\sqrt8}\sqrt{1+4r^2}\,r\,dr\,d\theta=\tfrac\pi6\left(33^{3/2}-17^{3/2}\right)` },
  { n: 'Semiesfera z = √(4 − x² − y²)', f: (x, y) => sqrt(Math.max(0, 4 - x * x - y * y)), r: [0, 1.999], exacto: 8 * PI, tex: String.raw`2\pi R^2=8\pi` },
];

export default {
  resumen: String.raw`Para medir el área de $z=f(x,y)$ se parte la sombra $R$ en rectangulitos $\Delta A$. Sobre cada uno, la superficie se parece a un trozo de su plano tangente, de área $\Delta S\approx\sqrt{1+f_x^2+f_y^2}\,\Delta A$. Ese factor es mayor donde la superficie está más inclinada.`,
  observa: [
    String.raw`En el cono el factor vale $\sqrt2$ en todas partes: la pendiente es constante.`,
    'En el paraboloide el factor crece con la distancia al eje: los trozos de afuera son más empinados.',
    String.raw`En la semiesfera el factor $\frac{2}{\sqrt{4-r^2}}$ explota en el borde, pero la integral converge a $8\pi$.`,
  ],
  async montar(m) {
    const e = await m.escena({ rango: 3, etiqueta: 'Superficie con un elemento de área' });
    let caso = CASOS[0], ang = 0.6, rad = 0.5, objs = [], mov = [];
    m.panel.append(
      m.selector({ etiqueta: 'Superficie', valor: caso.n, opciones: CASOS.map((c) => [c.n, c.n]), alCambiar: (v) => { caso = CASOS.find((c) => c.n === v); escena(); } }),
      m.deslizador({ etiqueta: 'Elemento: posición radial', min: 0, max: 1, paso: 0.01, valor: rad, formato: (v) => `${Math.round(v * 100)} %`, alCambiar: (v) => { rad = v; mover(); } }),
      m.deslizador({ etiqueta: 'Elemento: ángulo', min: 0, max: 2 * PI, paso: 0.01, valor: ang, formato: (v) => `${Math.round((v * 180) / PI)}°`, alCambiar: (v) => { ang = v; mover(); } }));

    const desplaz = () => (caso.f(0, 0) > 5 ? -3 : 0); // bajamos el paraboloide para que entre en la escena
    function escena() {
      objs.forEach((o) => e.quitar(o));
      const [r0, r1] = caso.r, dz = desplaz();
      objs = [
        e.parametrizada((r, t) => [r * cos(t), r * sin(t), caso.f(r * cos(t), r * sin(t)) + dz], [r0, r1], [0, 2 * PI], { n: 60, opacidad: 0.8 }),
        e.parametrizada((r, t) => [r * cos(t), r * sin(t), -2.5], [r0, r1], [0, 2 * PI], { n: 30, opacidad: 0.25, colores: ['deriv', 'deriv'], alambre: false }),
      ];
      mover();
    }
    function mover() {
      mov.forEach((o) => e.quitar(o));
      const [r0, r1] = caso.r, dz = desplaz();
      const r = r0 + (r1 - r0) * Math.min(0.92, rad), x = r * cos(ang), y = r * sin(ang), h = 0.35;
      const [fx, fy] = gradiente(caso.f, [x, y]);
      const factor = sqrt(1 + fx * fx + fy * fy), z = caso.f(x, y) + dz;
      const esquina = (a, b) => [x + a, y + b, z + fx * a + fy * b];
      mov = [
        e.cajas([{ x, y, z: -2.5, dx: h, dy: h, dz: 0.02 }], { token: 'deriv', opacidad: 1 }),
        e.parametrizada((a, b) => esquina(a, b), [0, h], [0, h], { n: 2, colores: ['integ', 'integ'], opacidad: 0.95, alambre: false }),
        ...[[0, 0], [h, 0], [0, h], [h, h]].map(([a, b]) => e.segmento([x + a, y + b, -2.5], esquina(a, b), { token: 'tintaSuave', opacidad: 0.6 })),
      ];
      // Área por Simpson en polares: ∫∫ √(1+fx²+fy²) r dr dθ (simetría de revolución).
      const n = 400, dr = (r1 - r0) / n;
      let area = 0;
      for (let k = 0; k < n; k++) { const rr = r0 + (k + 0.5) * dr; const [gx, gy] = gradiente(caso.f, [rr, 0]); area += sqrt(1 + gx * gx + gy * gy) * rr * dr; }
      area *= 2 * PI;
      m.leer(m.tex(caso.tex, { bloque: true }),
        m.dato('Factor √(1 + f_x² + f_y²) en el elemento', factor.toFixed(4)),
        m.dato('ΔS / ΔA', factor.toFixed(4)),
        m.dato('Área (numérica)', area.toFixed(4)), m.dato('Área exacta', caso.exacto.toFixed(4)));
    }
    escena();
  },
};

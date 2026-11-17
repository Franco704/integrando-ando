import { integralDoble } from '../../matematica/calculo.js';

// Cada región se describe de las dos maneras. Tipo II puede necesitar varias subregiones.
const REGIONES = [
  {
    n: 'Entre y = x³ e y = x (TP 13, 12 g)', v: { x: [-0.2, 1.3], y: [-0.2, 1.3] },
    t1: [{ a: 0, b: 1, g1: (x) => x ** 3, g2: (x) => x }],
    t2: [{ c: 0, d: 1, h1: (y) => y, h2: (y) => Math.cbrt(y) }],
    tex1: String.raw`\int_0^1\!\!\int_{x^3}^{x}f\,dy\,dx`, tex2: String.raw`\int_0^1\!\!\int_{y}^{\sqrt[3]{y}}f\,dx\,dy`,
  },
  {
    n: 'y = eˣ, x + y = 1, x = 1 (TP 13, 4 d)', v: { x: [-0.3, 1.5], y: [-0.2, 2.9] },
    t1: [{ a: 0, b: 1, g1: (x) => 1 - x, g2: (x) => Math.exp(x) }],
    t2: [{ c: 0, d: 1, h1: (y) => 1 - y, h2: () => 1 }, { c: 1, d: Math.E, h1: (y) => Math.log(y), h2: () => 1 }],
    tex1: String.raw`\int_0^1\!\!\int_{1-x}^{e^x}f\,dy\,dx`, tex2: String.raw`\int_0^1\!\!\int_{1-y}^{1}f\,dx\,dy+\int_1^e\!\!\int_{\ln y}^{1}f\,dx\,dy`,
  },
  {
    n: 'y = x − 6 e y² = x (2° parcial, tema 6)', v: { x: [-1, 10], y: [-3, 3.5] },
    t1: [{ a: 0, b: 4, g1: (x) => -Math.sqrt(x), g2: (x) => Math.sqrt(x) }, { a: 4, b: 9, g1: (x) => x - 6, g2: (x) => Math.sqrt(x) }],
    t2: [{ c: -2, d: 3, h1: (y) => y * y, h2: (y) => y + 6 }],
    tex1: String.raw`\int_0^4\!\!\int_{-\sqrt x}^{\sqrt x}f\,dy\,dx+\int_4^9\!\!\int_{x-6}^{\sqrt x}f\,dy\,dx`, tex2: String.raw`\int_{-2}^{3}\!\!\int_{y^2}^{y+6}f\,dx\,dy`,
  },
];

export default {
  resumen: String.raw`Una misma región se puede barrer con **franjas verticales** (tipo I: primero $dy$, $x$ entre constantes) o **horizontales** (tipo II: primero $dx$, $y$ entre constantes). Mové la franja: sus extremos son los límites de la integral interior. A veces una de las dos formas obliga a partir la región.`,
  observa: [
    'Los límites de la integral de afuera siempre son números; los de la de adentro son funciones de la variable de afuera.',
    'Si al barrer cambia la curva que hace de "techo" o de "piso", hay que partir la región en ese punto.',
    String.raw`Las dos integrales dan lo mismo (Fubini): el número de abajo se calcula de las dos maneras con $f=1$, o sea el área.`,
  ],
  async montar(m) {
    const L = m.lienzo({ x: [-0.2, 1.3], y: [-0.2, 1.3], etiqueta: 'Región de integración con una franja' });
    let reg = REGIONES[0], tipo = 'I', pos = 0.5;
    m.panel.append(
      m.selector({ etiqueta: 'Región', valor: reg.n, opciones: REGIONES.map((r) => [r.n, r.n]), alCambiar: (v) => { reg = REGIONES.find((r) => r.n === v); dibujar(); } }),
      m.selector({ etiqueta: 'Barrido', valor: tipo, opciones: [['I', 'Tipo I: franjas verticales'], ['II', 'Tipo II: franjas horizontales']], alCambiar: (v) => { tipo = v; dibujar(); } }),
      m.deslizador({ etiqueta: 'Posición de la franja', min: 0, max: 1, paso: 0.005, valor: pos, formato: (v) => `${Math.round(v * 100)} %`, alCambiar: (v) => { pos = v; dibujar(); } }));

    function dibujar() {
      L.rango = { ...reg.v };
      const area1 = reg.t1.reduce((s, p) => s + integralDoble(() => 1, p.a, p.b, p.g1, p.g2, 80), 0);
      const area2 = reg.t2.reduce((s, p) => s + integralDoble(() => 1, p.c, p.d, p.h1, p.h2, 80), 0);
      const a0 = reg.t1[0].a, b0 = reg.t1.at(-1).b, c0 = reg.t2[0].c, d0 = reg.t2.at(-1).d;
      L.alDibujar((Lz) => {
        Lz.ejes();
        for (const p of reg.t1) {
          const pts = [];
          for (let k = 0; k <= 80; k++) { const x = p.a + ((p.b - p.a) * k) / 80; pts.push([x, p.g2(x)]); }
          for (let k = 80; k >= 0; k--) { const x = p.a + ((p.b - p.a) * k) / 80; pts.push([x, p.g1(x)]); }
          Lz.trazo(pts, { color: Lz.c.integ, ancho: 2, cerrar: true, relleno: Lz.c.integ + '33' });
        }
        if (tipo === 'I') {
          const x = a0 + (b0 - a0) * pos, p = reg.t1.find((q) => x >= q.a && x <= q.b);
          const y1 = p.g1(x), y2 = p.g2(x), w = (b0 - a0) / 60;
          Lz.rect(x - w / 2, y1, w, y2 - y1, { relleno: Lz.c.deriv + 'aa', borde: Lz.c.deriv });
          Lz.punto([x, y1], { color: Lz.c.deriv, radio: 4, texto: `y = ${y1.toFixed(2)}` });
          Lz.punto([x, y2], { color: Lz.c.deriv, radio: 4, texto: `y = ${y2.toFixed(2)}` });
        } else {
          const y = c0 + (d0 - c0) * pos, p = reg.t2.find((q) => y >= q.c && y <= q.d);
          const x1 = p.h1(y), x2 = p.h2(y), w = (d0 - c0) / 60;
          Lz.rect(x1, y - w / 2, x2 - x1, w, { relleno: Lz.c.deriv + 'aa', borde: Lz.c.deriv });
          Lz.punto([x1, y], { color: Lz.c.deriv, radio: 4, texto: `x = ${x1.toFixed(2)}` });
          Lz.punto([x2, y], { color: Lz.c.deriv, radio: 4, texto: `x = ${x2.toFixed(2)}` });
        }
      });
      m.leer(
        m.h('p', { class: 'lab__pista' }, 'Tipo I (dy dx):'), m.tex(reg.tex1, { bloque: true }),
        m.h('p', { class: 'lab__pista' }, 'Tipo II (dx dy):'), m.tex(reg.tex2, { bloque: true }),
        m.dato('Área con tipo I', area1.toFixed(5)), m.dato('Área con tipo II', area2.toFixed(5)));
    }
    dibujar();
  },
};

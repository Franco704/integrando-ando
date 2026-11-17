import { integralDoble } from '../../matematica/calculo.js';
import { intentarCompilar } from '../../matematica/expresion.js';

const LAMINAS = [
  { n: 'x = 1 − y², ejes, δ = y (TP 17, ej. 17)', d: 'y', a: 0, b: 1, tipo: 'II', h1: () => 0, h2: (y) => 1 - y * y, v: [-0.2, 1.2] },
  { n: 'Semicírculo de radio 1, δ = √(x² + y²) (TP 17, ej. 22)', d: 'sqrt(x^2+y^2)', a: -1, b: 1, tipo: 'I', h1: () => 0, h2: (x) => Math.sqrt(1 - x * x), v: [-1.2, 1.2] },
  { n: '3y = 4x, y = 0, x = 3, δ = x (2° parcial, tema 2)', d: 'x', a: 0, b: 3, tipo: 'I', h1: () => 0, h2: (x) => (4 * x) / 3, v: [-0.3, 4.3] },
  { n: 'y = 0, y = x, y = √(25 − x²), δ = √(x² + y²) (2° parcial, tema 1)', d: 'sqrt(x^2+y^2)', a: 0, b: 5, tipo: 'I', h1: () => 0, h2: (x) => Math.min(x, Math.sqrt(Math.max(0, 25 - x * x))), v: [-0.5, 5.5] },
];

export default {
  resumen: String.raw`Una lámina con densidad variable $\delta(x,y)$: lo oscuro pesa más. El **centro de masa** (ciruela) es el punto donde se equilibraría sobre un alfiler; el **centroide** geométrico (gris) es el de densidad constante. Cambiá la densidad y mirá cómo el centro de masa se corre hacia donde hay más masa.`,
  observa: [
    String.raw`Con $\delta=y$ la parte de arriba pesa más: $\bar y$ sube respecto del centroide.`,
    'Si la lámina y la densidad son simétricas respecto de un eje, el centro de masa está sobre ese eje: en el semicírculo, x̄ = 0 sin hacer cuentas.',
    String.raw`$\bar x=\frac{M_y}{M}$ usa el momento respecto del **eje y**, que se calcula con $x\,\delta$.`,
  ],
  async montar(m) {
    const L = m.lienzo({ x: [-0.2, 1.2], y: [-0.2, 1.2], etiqueta: 'Lámina con su densidad y su centro de masa' });
    let lam = LAMINAS[0], delta;
    const campo = m.campoFuncion({ etiqueta: 'Densidad δ(x, y) =', valor: lam.d, alCambiar: (s) => cargar(s) });
    m.panel.append(m.selector({ etiqueta: 'Láminas', valor: lam.n, opciones: LAMINAS.map((q) => [q.n, q.n]), alCambiar: (v) => { lam = LAMINAS.find((q) => q.n === v); campo.fijar(lam.d); } }), campo);

    // Las integrales se escriben siempre como tipo I en (s,t); para tipo II s = y, t = x.
    const integrar = (g) => (lam.tipo === 'I' ? integralDoble(g, lam.a, lam.b, lam.h1, lam.h2, 120) : integralDoble((y, x) => g(x, y), lam.a, lam.b, lam.h1, lam.h2, 120));
    const dentro = (x, y) => (lam.tipo === 'I' ? x >= lam.a && x <= lam.b && y >= lam.h1(x) && y <= lam.h2(x) : y >= lam.a && y <= lam.b && x >= lam.h1(y) && x <= lam.h2(y));

    function cargar(s) {
      const { f, error } = intentarCompilar(s, ['x', 'y']);
      if (error) return error;
      delta = f;
      dibujar();
      return null;
    }
    function dibujar() {
      const M = integrar(delta), My = integrar((x, y) => x * delta(x, y)), Mx = integrar((x, y) => y * delta(x, y));
      const A = integrar(() => 1), cxg = integrar((x) => x) / A, cyg = integrar((x, y) => y) / A;
      const cm = [My / M, Mx / M];
      L.rango = { x: lam.v, y: lam.v };
      L.alDibujar((Lz) => {
        let dmax = 0;
        const paso = 5, celdas = [];
        for (let px = 0; px < Lz.w; px += paso)
          for (let py = 0; py < Lz.h; py += paso) {
            const [x, y] = Lz.mundo(px + paso / 2, py + paso / 2);
            if (!dentro(x, y)) continue;
            const d = delta(x, y);
            if (Number.isFinite(d)) { dmax = Math.max(dmax, d); celdas.push([px, py, d]); }
          }
        const ctx = Lz.ctx;
        for (const [px, py, d] of celdas) { ctx.globalAlpha = 0.15 + 0.85 * Math.max(0, d / (dmax || 1)); ctx.fillStyle = Lz.c.integ; ctx.fillRect(px, py, paso, paso); }
        ctx.globalAlpha = 1;
        Lz.ejes();
        Lz.punto([cxg, cyg], { color: Lz.c.tintaSuave, texto: 'centroide' });
        Lz.punto(cm, { color: Lz.c.integ, radio: 7, texto: 'centro de masa' });
      });
      const f = (v) => v.toFixed(4);
      m.leer(m.dato('Masa M = ∬ δ dA', f(M)), m.dato('M_y = ∬ x δ dA', f(My)), m.dato('M_x = ∬ y δ dA', f(Mx)),
        m.dato('Centro de masa (x̄, ȳ)', `(${f(cm[0])}, ${f(cm[1])})`), m.dato('Centroide (δ = 1)', `(${f(cxg)}, ${f(cyg)})`));
    }
    cargar(lam.d);
  },
};

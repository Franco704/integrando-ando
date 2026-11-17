import { intentarCompilar } from '../../matematica/expresion.js';
import { gradiente, niveles } from '../../matematica/calculo.js';

const CASOS = [
  { n: 'Final dic. 2024: 50 − (x² + y²) con x + 3y = 10', f: '50-(x^2+y^2)', g: 'x+3y-10', v: [-1, 6] },
  { n: 'xy sobre la elipse x²/4 + y² = 1', f: 'x*y', g: 'x^2/4+y^2-1', v: [-2.5, 2.5] },
  { n: 'x + y sobre la circunferencia x² + y² = 2', f: 'x+y', g: 'x^2+y^2-2', v: [-2.5, 2.5] },
];

export default {
  resumen: String.raw`Buscamos el máximo y el mínimo de $f$ **sobre la curva** $g(x,y)=0$. Arrastrá el punto por la curva roja: en los extremos condicionados la curva de nivel de $f$ es **tangente** a la restricción, o sea $\nabla f\parallel\nabla g$:

$$\nabla f+\lambda\nabla g=\vec0,\qquad g=0$$`,
  observa: [
    String.raw`Lejos de los extremos, $\nabla f$ (ciruela) y $\nabla g$ (azul) forman un ángulo; en los extremos quedan alineados.`,
    'En el caso del final, el único extremo condicionado es (1, 3) con f = 40: el punto de la recta más cercano al origen.',
    String.raw`El cociente entre los módulos de los gradientes en el extremo es $|\lambda|$.`,
  ],
  async montar(m) {
    const L = m.lienzo({ x: [-2.5, 2.5], y: [-2.5, 2.5], etiqueta: 'Curvas de nivel de f y la restricción g = 0' });
    let caso = CASOS[0], f, g, P = [0, 0], extremos = [];
    const cf = m.campoFuncion({ etiqueta: 'f(x, y) =', valor: caso.f, alCambiar: (s) => cargar('f', s) });
    const cg = m.campoFuncion({ etiqueta: 'g(x, y) = 0 con g =', valor: caso.g, alCambiar: (s) => cargar('g', s) });
    m.panel.append(m.selector({ etiqueta: 'Casos', opciones: CASOS.map((c) => [c.n, c.n]), valor: caso.n, alCambiar: (n) => { caso = CASOS.find((c) => c.n === n); L.rango = { x: caso.v, y: caso.v }; cf.fijar(caso.f); cg.fijar(caso.g); } }),
      cf, cg, m.h('p', { class: 'lab__pista' }, 'Tocá o arrastrá cerca de la curva roja.'));
    L.rango = { x: caso.v, y: caso.v };
    L.alPuntero((q) => { P = proyectar(q); dibujar(); });

    function proyectar(q) {
      let p = [...q];
      for (let k = 0; k < 40; k++) {
        const v = g(...p), d = gradiente(g, p), n2 = d[0] ** 2 + d[1] ** 2;
        if (!Number.isFinite(v) || n2 < 1e-12) break;
        p = [p[0] - (v * d[0]) / n2, p[1] - (v * d[1]) / n2];
        if (Math.abs(v) < 1e-12) break;
      }
      return p;
    }
    // Extremos condicionados: donde ∇f × ∇g = 0 sobre la curva (muestreo + proyección).
    function buscarExtremos() {
      const [a, b] = L.rango.x, hallados = [];
      const cruz = (p) => { const u = gradiente(f, p), w = gradiente(g, p); return u[0] * w[1] - u[1] * w[0]; };
      const muestras = [];
      for (let i = 0; i <= 60; i++) for (let j = 0; j <= 60; j++) muestras.push(proyectar([a + ((b - a) * i) / 60, a + ((b - a) * j) / 60]));
      const sobre = muestras.filter((p) => p.every(Number.isFinite) && Math.abs(g(...p)) < 1e-8 && p[0] >= a && p[0] <= b && p[1] >= a && p[1] <= b);
      for (const p of sobre) {
        if (Math.abs(cruz(p)) > 1e-3 * (1 + Math.abs(f(...p)))) continue;
        if (!hallados.some((q) => Math.hypot(q[0] - p[0], q[1] - p[1]) < 0.05)) hallados.push(p);
      }
      return hallados;
    }
    function cargar(cual, s) {
      const { f: h, error } = intentarCompilar(s, ['x', 'y']);
      if (error) return error;
      if (cual === 'f') f = h; else g = h;
      if (f && g) { P = proyectar([caso.v[0] + 1, caso.v[1] - 1]); extremos = buscarExtremos(); dibujar(); }
      return null;
    }
    function dibujar() {
      const gf = gradiente(f, P), gg = gradiente(g, P);
      const nf = Math.hypot(...gf) || 1, ng = Math.hypot(...gg) || 1;
      const ang = (Math.acos(Math.max(-1, Math.min(1, (gf[0] * gg[0] + gf[1] * gg[1]) / (nf * ng)))) * 180) / Math.PI;
      L.alDibujar((Lz) => {
        Lz.ejes();
        let lo = Infinity, hi = -Infinity;
        const [a, b] = L.rango.x;
        for (let i = 0; i <= 20; i++) for (let j = 0; j <= 20; j++) { const v = f(a + ((b - a) * i) / 20, a + ((b - a) * j) / 20); lo = Math.min(lo, v); hi = Math.max(hi, v); }
        Lz.contornos(f, niveles(lo, hi, 16), { colores: () => Lz.c.tintaSuave, ancho: 0.7 });
        Lz.contornos(f, [f(...P)], { colores: () => Lz.c.integ, ancho: 1.6 });
        Lz.contornos(g, [0], { colores: () => Lz.c.error, ancho: 3, resolucion: 160 });
        const s = (b - a) / 7;
        Lz.flecha(P, [(gf[0] / nf) * s, (gf[1] / nf) * s], { color: Lz.c.integ, ancho: 2.5 });
        Lz.flecha(P, [(gg[0] / ng) * s * 0.8, (gg[1] / ng) * s * 0.8], { color: Lz.c.deriv, ancho: 2.5 });
        extremos.forEach((q) => Lz.punto(q, { color: Lz.c.tinta, radio: 4, texto: `f = ${f(...q).toFixed(2)}` }));
        Lz.punto(P, { color: Lz.c.integ });
      });
      m.leer(
        m.dato('P sobre la restricción', `(${P[0].toFixed(3)}, ${P[1].toFixed(3)})`),
        m.dato('f(P)', f(...P).toFixed(4)),
        m.dato('Ángulo entre ∇f y ∇g', `${ang.toFixed(1)}°`),
        m.h('p', { class: 'lab__pista' }, ang < 1 || ang > 179 ? `Gradientes paralelos: P es un punto crítico condicionado (λ ≈ ${(-(gf[0] / gg[0] || gf[1] / gg[1])).toFixed(3)}).` : 'Seguí moviendo el punto hasta que los gradientes queden alineados.'));
    }
    cargar('f', caso.f); cargar('g', caso.g);
  },
};

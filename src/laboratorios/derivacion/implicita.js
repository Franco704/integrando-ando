import { intentarCompilar } from '../../matematica/expresion.js';
import { gradiente } from '../../matematica/calculo.js';

const CURVAS = [
  ['x^3+y^3-2x*y', 'Folium x³ + y³ − 2xy = 0 (TP 8, 7 iii)'],
  ['x^2+y^2-4', 'Circunferencia x² + y² − 4 = 0'],
  ['ln(x^2+y^2)-atan(x*y)', 'ln(x² + y²) = arctg(xy) (TP 8, 1 a)'],
  ['y^2-x^3+x', 'Cúbica y² = x³ − x'],
];

export default {
  resumen: String.raw`La ecuación $F(x,y)=0$ dibuja una curva. Cerca de un punto donde $F_y\neq0$, la curva es la gráfica de una función $y(x)$ aunque no se pueda despejar, y su pendiente es

$$y'=-\frac{F_x}{F_y}$$

Tocá la curva para mover $P_0$. El vector $\nabla F$ (ciruela) es normal a la curva; la recta punteada es la tangente.`,
  observa: [
    String.raw`Donde la tangente es vertical, $F_y=0$: ahí falla la condición de Cauchy y la curva no es gráfica de $y(x)$ (pero puede ser de $x(y)$, si $F_x\neq0$).`,
    String.raw`En el folium, en $(1,1)$ la pendiente es $-1$. En el origen se anulan $F_x$ y $F_y$: la curva se cruza a sí misma.`,
    String.raw`$\nabla F$ siempre es perpendicular a la curva de nivel. Es la misma idea que vas a usar en el TP 9.`,
  ],
  async montar(m) {
    const L = m.lienzo({ x: [-2.5, 2.5], y: [-2.5, 2.5], etiqueta: 'Curva implícita con recta tangente y gradiente' });
    let F, P = [1, 1];
    const campo = m.campoFuncion({ etiqueta: 'F(x, y) =', valor: CURVAS[0][0], ayuda: 'La curva es F(x, y) = 0', alCambiar: (s) => cargar(s) });
    m.panel.append(campo, m.selector({ etiqueta: 'Curvas', opciones: CURVAS, valor: CURVAS[0][0], alCambiar: (v) => campo.fijar(v) }),
      m.h('p', { class: 'lab__pista' }, 'Tocá o arrastrá sobre el gráfico: el punto se pega a la curva más cercana.'));
    L.alPuntero((q) => { P = proyectar(q); dibujar(); });

    // Newton sobre F=0 en la dirección del gradiente: lleva un punto cualquiera a la curva.
    function proyectar(q) {
      let p = [...q];
      for (let k = 0; k < 30; k++) {
        const v = F(...p), g = gradiente(F, p), n2 = g[0] ** 2 + g[1] ** 2;
        if (!Number.isFinite(v) || n2 < 1e-12) break;
        p = [p[0] - (v * g[0]) / n2, p[1] - (v * g[1]) / n2];
        if (Math.abs(v) < 1e-10) break;
      }
      return p;
    }
    function cargar(s) {
      const { f, error } = intentarCompilar(s, ['x', 'y']);
      if (error) return error;
      F = f;
      P = proyectar([1.1, 0.9]);
      dibujar();
      return null;
    }
    function dibujar() {
      const [Fx, Fy] = gradiente(F, P);
      const pend = -Fx / Fy;
      L.alDibujar((Lz) => {
        Lz.ejes();
        Lz.contornos(F, [0], { colores: () => Lz.c.deriv, ancho: 2.5, resolucion: 160 });
        const vertical = Math.abs(Fy) < 1e-6;
        if (vertical) Lz.trazo([[P[0], -10], [P[0], 10]], { color: Lz.c.tinta, ancho: 1.5, guiones: [6, 5] });
        else Lz.funcion((x) => P[1] + pend * (x - P[0]), { color: Lz.c.tinta, ancho: 1.5, guiones: [6, 5] });
        const n = Math.hypot(Fx, Fy) || 1;
        Lz.flecha(P, [(Fx / n) * 0.8, (Fy / n) * 0.8], { color: Lz.c.integ, ancho: 2.5 });
        Lz.texto('∇F', [P[0] + (Fx / n) * 0.9, P[1] + (Fy / n) * 0.9], { color: Lz.c.integ });
        Lz.punto(P, { color: Lz.c.integ, texto: 'P₀' });
      });
      const f = (v) => (Number.isFinite(v) ? v.toFixed(4) : '—');
      m.leer(
        m.dato('P₀', `(${f(P[0])}, ${f(P[1])})`),
        m.dato('F_x(P₀)', f(Fx)), m.dato('F_y(P₀)', f(Fy)),
        Math.abs(Fy) < 1e-6
          ? m.h('p', { class: 'lab__pista' }, 'F_y = 0: no se cumple Cauchy para y(x). La tangente es vertical.')
          : m.tex(`y'=-\\frac{F_x}{F_y}=${f(pend)}`, { bloque: true }));
    }
    cargar(CURVAS[0][0]);
  },
};

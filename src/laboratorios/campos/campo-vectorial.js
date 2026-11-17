import { intentarCompilar } from '../../matematica/expresion.js';
import { divergencia, rotor2D } from '../../matematica/calculo.js';

const CAMPOS = [
  { n: 'Fuente F = (x, y)', P: 'x', Q: 'y' },
  { n: 'Rotación F = (−y, x)', P: '-y', Q: 'x' },
  { n: 'Gradiente de xy: F = (y, x)', P: 'y', Q: 'x' },
  { n: 'TP 19, 1 c: (−y, x)/√(x² + y²)', P: '-y/sqrt(x^2+y^2)', Q: 'x/sqrt(x^2+y^2)' },
  { n: 'Cuadrático inverso (x, y)/(x² + y²)^(3/2)', P: 'x/(x^2+y^2)^1.5', Q: 'y/(x^2+y^2)^1.5' },
];

export default {
  resumen: String.raw`Un campo vectorial $\vec F=P\,\vec i+Q\,\vec j$ asigna una flecha a cada punto. El fondo muestra la **divergencia** $P_x+Q_y$ (cuánto "brota" el campo: ciruela fuente, azul sumidero) o el **rotor** $Q_x-P_y$ (cuánto hace girar una ruedita: ciruela antihorario, azul horario). Tocá el plano para medir en un punto.`,
  observa: [
    'La fuente tiene divergencia 2 en todas partes y rotor nulo; la rotación, al revés.',
    String.raw`El gradiente de $xy$ tiene rotor nulo: es **conservativo** ($\operatorname{rot}\nabla f=\vec0$).`,
    String.raw`El cuadrático inverso tiene divergencia $-\frac{1}{r^3}$ en el plano (en el espacio sería 0 fuera del origen) y rotor nulo.`,
  ],
  async montar(m) {
    const L = m.lienzo({ x: [-3, 3], y: [-3, 3], etiqueta: 'Campo vectorial con su divergencia o rotor de fondo' });
    let P, Q, modo = 'div', punto = [1, 0.5];
    const cp = m.campoFuncion({ etiqueta: 'P(x, y) =', valor: CAMPOS[0].P, alCambiar: (s) => cargar('P', s) });
    const cq = m.campoFuncion({ etiqueta: 'Q(x, y) =', valor: CAMPOS[0].Q, alCambiar: (s) => cargar('Q', s) });
    m.panel.append(
      m.selector({ etiqueta: 'Campos', valor: CAMPOS[0].n, opciones: CAMPOS.map((c) => [c.n, c.n]), alCambiar: (v) => { const c = CAMPOS.find((q) => q.n === v); cp.fijar(c.P); cq.fijar(c.Q); } }),
      cp, cq,
      m.selector({ etiqueta: 'Fondo', valor: modo, opciones: [['div', 'Divergencia'], ['rot', 'Rotor']], alCambiar: (v) => { modo = v; dibujar(); } }));
    L.alPuntero((q) => { punto = q; dibujar(); });

    function cargar(cual, s) {
      const { f, error } = intentarCompilar(s, ['x', 'y']);
      if (error) return error;
      if (cual === 'P') P = f; else Q = f;
      if (P && Q) dibujar();
      return null;
    }
    const escalar = (x, y) => (modo === 'div' ? divergencia([P, (a, b) => Q(a, b)], [x, y]) : rotor2D([P, Q], [x, y]));

    function dibujar() {
      L.alDibujar((Lz) => {
        const ctx = Lz.ctx, paso = 6;
        const neg = Lz.c.deriv, pos = Lz.c.integ;
        for (let px = 0; px < Lz.w; px += paso)
          for (let py = 0; py < Lz.h; py += paso) {
            const v = escalar(...Lz.mundo(px + paso / 2, py + paso / 2));
            if (!Number.isFinite(v) || Math.abs(v) < 1e-6) continue;
            ctx.globalAlpha = Math.min(0.55, Math.abs(v) / 4);
            ctx.fillStyle = v > 0 ? pos : neg;
            ctx.fillRect(px, py, paso, paso);
          }
        ctx.globalAlpha = 1;
        Lz.ejes({ marcas: false });
        Lz.campo((x, y) => [P(x, y), Q(x, y)], { densidad: 16, color: Lz.c.tinta });
        Lz.punto(punto, { color: Lz.c.acento3 });
      });
      const [x, y] = punto, f = (v) => (Number.isFinite(v) ? v.toFixed(4) : 'no definido');
      m.leer(m.dato('Punto', `(${x.toFixed(2)}, ${y.toFixed(2)})`),
        m.dato('F en el punto', `(${f(P(x, y))}, ${f(Q(x, y))})`),
        m.dato('div F = P_x + Q_y', f(divergencia([P, Q], [x, y]))),
        m.dato('rot F · k = Q_x − P_y', f(rotor2D([P, Q], [x, y]))));
    }
    cargar('P', CAMPOS[0].P); cargar('Q', CAMPOS[0].Q);
  },
};

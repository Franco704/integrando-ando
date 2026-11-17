import { intentarCompilar } from '../../matematica/expresion.js';
import { gradiente } from '../../matematica/calculo.js';

const CASOS = [
  { n: 'Paraboloide y circunferencia', f: 'x^2+y^2/2', x: '1.5cos(t)', y: '1.5sen(t)' },
  { n: 'Silla y recta', f: '(x^2-y^2)/2', x: 't-1.5', y: '0.5t-0.75' },
  { n: 'Montaña y espiral', f: '2exp(-(x^2+y^2)/2)', x: '0.4t cos(2t)', y: '0.4t sen(2t)' },
];
const d = (g, t, h = 1e-4) => (g(t + h) - g(t - h)) / (2 * h);

export default {
  resumen: String.raw`Un punto recorre en el plano el camino $(x(t),y(t))$ y, arriba, la superficie $z=f(x,y)$. La altura $z(t)=f(x(t),y(t))$ es una función compuesta y la regla de la cadena la deriva sin armar la fórmula:

$$\frac{dz}{dt}=\frac{\partial f}{\partial x}\frac{dx}{dt}+\frac{\partial f}{\partial y}\frac{dy}{dt}$$`,
  observa: [
    String.raw`Cada sumando es un aporte: cuánto sube por moverse en $x$ y cuánto por moverse en $y$. Pueden tener signos opuestos y compensarse.`,
    String.raw`En el paraboloide con la circunferencia, $dz/dt$ cambia de signo cuatro veces por vuelta: el camino sube y baja aunque esté a radio fijo.`,
    'El valor de la regla de la cadena coincide con derivar numéricamente z(t): no es una aproximación.',
  ],
  async montar(m) {
    const e = await m.escena({ rango: 2.5, etiqueta: 'Camino sobre una superficie' });
    const graf = m.lienzo({ x: [0, 6.3], y: [-3, 3], proporcional: false, etiqueta: 'Altura z(t) a lo largo del camino' });
    let f, X, Y, caso = CASOS[0], t = 1, fijos = [], mov = [];
    const cf = m.campoFuncion({ etiqueta: 'f(x, y) =', valor: caso.f, alCambiar: (s) => cargar('f', s) });
    const cx = m.campoFuncion({ etiqueta: 'x(t) =', valor: caso.x, alCambiar: (s) => cargar('x', s) });
    const cy = m.campoFuncion({ etiqueta: 'y(t) =', valor: caso.y, alCambiar: (s) => cargar('y', s) });
    m.panel.append(
      m.selector({ etiqueta: 'Casos', valor: caso.n, opciones: CASOS.map((c) => [c.n, c.n]), alCambiar: (n) => { caso = CASOS.find((c) => c.n === n); cf.fijar(caso.f); cx.fijar(caso.x); cy.fijar(caso.y); } }),
      cf, cx, cy,
      m.deslizador({ etiqueta: 't', min: 0, max: 6.28, paso: 0.01, valor: t, alCambiar: (v) => { t = v; mover(); } }));

    function cargar(cual, s) {
      const { f: g, error } = intentarCompilar(s, cual === 'f' ? ['x', 'y'] : ['t']);
      if (error) return error;
      if (cual === 'f') f = g; else if (cual === 'x') X = g; else Y = g;
      if (f && X && Y) escena();
      return null;
    }
    function escena() {
      [...fijos, ...mov].forEach((o) => e.quitar(o));
      mov = [];
      fijos = [
        e.superficie(f, [-2.5, 2.5], [-2.5, 2.5], { n: 70, opacidad: 0.75 }),
        e.curva((s) => [X(s), Y(s), -0.02], 0, 6.28, { token: 'deriv', grosor: 0.01 }),
        e.curva((s) => [X(s), Y(s), f(X(s), Y(s))], 0, 6.28, { token: 'integ', grosor: 0.012 }),
      ];
      mover();
    }
    function mover() {
      mov.forEach((o) => e.quitar(o));
      const p = [X(t), Y(t)], z = f(...p);
      const [fx, fy] = gradiente(f, p);
      const xp = d(X, t), yp = d(Y, t);
      const cadena = fx * xp + fy * yp;
      const directa = d((s) => f(X(s), Y(s)), t);
      mov = [e.punto([...p, z], { token: 'integ' }), e.punto([...p, 0], { token: 'deriv', radio: 0.03 }), e.segmento([...p, 0], [...p, z], { token: 'tintaSuave' })];
      graf.alDibujar((L) => {
        L.ejes();
        L.funcion((s) => f(X(s), Y(s)), { color: L.c.integ, ancho: 2.5 });
        L.funcion((s) => z + directa * (s - t), { color: L.c.deriv, ancho: 1.5, guiones: [6, 5] });
        L.punto([t, z], { color: L.c.integ });
        L.texto('t', [6.1, 0], { dy: -6, color: L.c.tintaSuave });
      });
      const n = (v) => v.toFixed(3);
      m.leer(
        m.tex(`\\underbrace{${n(fx)}}_{f_x}\\cdot\\underbrace{${n(xp)}}_{x'}+\\underbrace{${n(fy)}}_{f_y}\\cdot\\underbrace{${n(yp)}}_{y'}=${n(cadena)}`, { bloque: true }),
        m.dato('Aporte de x', n(fx * xp)), m.dato('Aporte de y', n(fy * yp)),
        m.dato('dz/dt por regla de la cadena', n(cadena)),
        m.dato('dz/dt derivando z(t) directamente', n(directa)));
    }
    cargar('f', caso.f); cargar('x', caso.x); cargar('y', caso.y);
  },
};

import { intentarCompilar } from '../../matematica/expresion.js';
import { parcial } from '../../matematica/calculo.js';

const FUNCIONES = [
  ['sqrt(49-x^2-y^2)/2.5', 'Semiesfera (TP 5, apl. 5 a, escalada)'],
  ['9x^2-y^2', '9x² − y² (TP 5, apl. 5 b)'],
  ['sen(x)+x^2/4+y^2/4', 'sen x + (x² + y²)/4'],
  ['60/(1+x^2+y^2)/20', 'Temperatura 60/(1+x²+y²), escalada'],
];

export default {
  resumen: String.raw`El plano $y=y_0$ corta la superficie en una curva; $f_x(x_0,y_0)$ es la **pendiente de su recta tangente** en $P_0$. Con el plano $x=x_0$ se obtiene $f_y$. Abajo ves el mismo corte de perfil, como una función de una sola variable.`,
  observa: [
    'Al cambiar la variable cambia el plano de corte: la derivada parcial ignora lo que pasa en la otra dirección.',
    String.raw`En la cima de la semiesfera las dos parciales son cero: las dos tangentes son horizontales.`,
    String.raw`En $9x^2-y^2$, sobre el eje $x$ la tangente sube cada vez más rápido ($f_x=18x$) y la del eje $y$ baja ($f_y=-2y$).`,
  ],
  async montar(m) {
    const e = await m.escena({ rango: 3, etiqueta: 'Superficie cortada por un plano vertical con la recta tangente' });
    const perfil = m.lienzo({ x: [-3, 3], y: [-3, 3], proporcional: false, etiqueta: 'Perfil de la curva de corte con su tangente' });
    let f, eje = 'x', x0 = 0.8, y0 = 0.6, sup = null, marcas = [];

    const campo = m.campoFuncion({ etiqueta: 'f(x, y) =', valor: FUNCIONES[2][0], alCambiar: (t) => cargar(t) });
    m.panel.append(
      campo,
      m.selector({ etiqueta: 'Funciones', opciones: FUNCIONES, valor: FUNCIONES[2][0], alCambiar: (v) => campo.fijar(v) }),
      m.selector({ etiqueta: 'Derivar respecto de', opciones: [['x', 'x  (corte y = y₀)'], ['y', 'y  (corte x = x₀)']], valor: eje, alCambiar: (v) => { eje = v; dibujar(); } }),
      m.deslizador({ etiqueta: 'x₀', min: -2.5, max: 2.5, valor: x0, alCambiar: (v) => { x0 = v; dibujar(); } }),
      m.deslizador({ etiqueta: 'y₀', min: -2.5, max: 2.5, valor: y0, alCambiar: (v) => { y0 = v; dibujar(); } }));

    function cargar(t) {
      const { f: g, error } = intentarCompilar(t, ['x', 'y']);
      if (error) return error;
      f = (x, y) => { const z = g(x, y); return Number.isFinite(z) && Math.abs(z) < 40 ? z : NaN; };
      e.quitar(sup);
      sup = e.superficie(f, [-3, 3], [-3, 3], { n: 80, opacidad: 0.85, recortarZ: [-3.5, 3.5] });
      dibujar();
      return null;
    }

    function dibujar() {
      marcas.forEach((o) => e.quitar(o));
      const z0 = f(x0, y0);
      const enX = eje === 'x';
      const pend = parcial(f, [x0, y0], enX ? 0 : 1);
      const corte = (s) => (enX ? [s, y0, f(s, y0)] : [x0, s, f(x0, s)]);
      const dir = enX ? [1, 0, pend] : [0, 1, pend];
      const k = 1.3 / Math.hypot(1, pend);
      marcas = Number.isFinite(z0) ? [
        e.plano(enX ? [0, y0, 0] : [x0, 0, 0], enX ? [0, 1, 0] : [1, 0, 0], { tam: 6, token: 'deriv', opacidad: 0.12 }),
        e.curva(corte, -3, 3, { token: 'deriv', grosor: 0.012 }),
        e.curva((s) => [x0 + dir[0] * s, y0 + dir[1] * s, z0 + dir[2] * s], -k, k, { token: 'integ', grosor: 0.01, n: 4 }),
        e.punto([x0, y0, z0], { token: 'integ' }),
      ].filter(Boolean) : [];

      const c0 = enX ? x0 : y0;
      perfil.alDibujar((L) => {
        L.ejes();
        L.funcion((s) => (enX ? f(s, y0) : f(x0, s)), { color: L.c.deriv, ancho: 2.5 });
        if (Number.isFinite(z0)) {
          L.funcion((s) => z0 + pend * (s - c0), { color: L.c.integ, ancho: 1.8, guiones: [6, 5] });
          L.punto([c0, z0], { color: L.c.integ, texto: `pendiente ${pend.toFixed(3)}` });
        }
        L.texto(enX ? 'x' : 'y', [2.8, 0], { dy: -6, color: L.c.tintaSuave });
      });
      const nombre = enX ? 'f_x' : 'f_y';
      m.leer(
        m.dato('P₀', `(${x0.toFixed(2)}, ${y0.toFixed(2)}, ${Number.isFinite(z0) ? z0.toFixed(3) : 'fuera del dominio'})`),
        m.tex(`${nombre}(${x0.toFixed(2)},${y0.toFixed(2)})\\approx ${Number.isFinite(pend) ? pend.toFixed(4) : '\\nexists'}`, { bloque: true }),
        m.h('p', { class: 'lab__pista' }, `Ángulo de la tangente con el eje ${eje}: ${(Math.atan(pend) * 180 / Math.PI).toFixed(1)}°`));
    }
    cargar(FUNCIONES[2][0]);
  },
};

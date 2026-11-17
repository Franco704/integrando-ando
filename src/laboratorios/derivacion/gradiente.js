import { intentarCompilar } from '../../matematica/expresion.js';
import { gradiente, niveles } from '../../matematica/calculo.js';

const FUNCIONES = [
  ['x^2+y^2', 'z = x² + y² (TP 9, ej. 9)'],
  ['x^2-3x*y', 'z = x² − 3xy (TP 9, ej. 13)'],
  ['x^2*y-6x+4y-1', 'x²y − 6x + 4y − 1 (TP 9, ej. 18)'],
  ['3exp(-((x-1)^2+y^2)/2)+2exp(-((x+1.5)^2+(y-1)^2))', 'Dos cerros'],
];

export default {
  resumen: String.raw`El mapa muestra las curvas de nivel de $f$. En el punto $P$ (tocá el mapa para moverlo), la flecha azul es una dirección $\vec u$ y la ciruela es $\nabla f(P)$. Abajo, la derivada direccional $D_{\vec u}f=\nabla f\cdot\vec u=|\nabla f|\cos\theta$ para todos los ángulos: una cosenoide cuyo máximo está justo en la dirección del gradiente.`,
  observa: [
    String.raw`El gradiente siempre es **perpendicular** a la curva de nivel que pasa por $P$.`,
    String.raw`$D_{\vec u}f$ es máxima ($=|\nabla f|$) en la dirección de $\nabla f$, mínima ($=-|\nabla f|$) en la opuesta y nula en las dos tangentes a la curva de nivel.`,
    String.raw`Para un valor de $D_{\vec u}f$ entre $-|\nabla f|$ y $|\nabla f|$ hay **dos** direcciones: por eso el ejercicio 18 tiene dos respuestas.`,
  ],
  async montar(m) {
    m.vista.closest('.lab')?.classList.add('lab--doble');
    const mapa = m.lienzo({ x: [-3, 3], y: [-3, 3], etiqueta: 'Curvas de nivel con gradiente y dirección elegida' });
    const polar = m.lienzo({ x: [0, 360], y: [-5, 5], proporcional: false, etiqueta: 'Derivada direccional en función del ángulo' });
    let f, P = [1, 0.5], alfa = 30, rangoZ = [0, 1];
    const campo = m.campoFuncion({ etiqueta: 'f(x, y) =', valor: FUNCIONES[0][0], alCambiar: (s) => cargar(s) });
    m.panel.append(campo,
      m.selector({ etiqueta: 'Funciones', opciones: FUNCIONES, valor: FUNCIONES[0][0], alCambiar: (v) => campo.fijar(v) }),
      m.deslizador({ etiqueta: 'Ángulo α de la dirección (grados)', min: 0, max: 360, paso: 1, valor: alfa, formato: (v) => `${v}°`, alCambiar: (v) => { alfa = v; dibujar(); } }));
    mapa.alPuntero((q) => { P = q; dibujar(); });

    function cargar(s) {
      const { f: g, error } = intentarCompilar(s, ['x', 'y']);
      if (error) return error;
      f = g;
      let lo = Infinity, hi = -Infinity;
      for (let i = 0; i <= 30; i++) for (let j = 0; j <= 30; j++) { const v = f(-3 + i / 5, -3 + j / 5); if (Number.isFinite(v)) { lo = Math.min(lo, v); hi = Math.max(hi, v); } }
      rangoZ = [lo, hi];
      dibujar();
      return null;
    }
    function dibujar() {
      const g = gradiente(f, P), ng = Math.hypot(...g);
      const a = (alfa * Math.PI) / 180, u = [Math.cos(a), Math.sin(a)];
      const D = g[0] * u[0] + g[1] * u[1];
      const angGrad = ((Math.atan2(g[1], g[0]) * 180) / Math.PI + 360) % 360;
      mapa.alDibujar((L) => {
        L.ejes({ marcas: false });
        const vals = niveles(rangoZ[0], rangoZ[1], 14);
        L.contornos(f, vals, { colores: (k, n) => mezclar(L.c.deriv, L.c.integ, k / n), ancho: 1.3 });
        L.flecha(P, [u[0] * 1.1, u[1] * 1.1], { color: L.c.deriv, ancho: 3 });
        if (ng > 1e-9) L.flecha(P, [(g[0] / ng) * 1.1, (g[1] / ng) * 1.1], { color: L.c.integ, ancho: 3 });
        L.punto(P, { color: L.c.tinta, texto: 'P' });
        L.texto('u', [P[0] + u[0] * 1.25, P[1] + u[1] * 1.25], { color: L.c.deriv });
        if (ng > 1e-9) L.texto('∇f', [P[0] + (g[0] / ng) * 1.3, P[1] + (g[1] / ng) * 1.3], { color: L.c.integ });
      });
      const tope = Math.max(1, ng * 1.25);
      polar.rango.y = [-tope, tope];
      polar.alDibujar((L) => {
        L.ejes({ marcas: true });
        L.funcion((th) => ng * Math.cos(((th - angGrad) * Math.PI) / 180), { color: L.c.integ, ancho: 2.5 });
        L.punto([alfa, D], { color: L.c.deriv, texto: `D = ${D.toFixed(3)}` });
        L.punto([angGrad, ng], { color: L.c.integ, radio: 4 });
        L.texto('α (grados)', [345, 0], { dy: -6, alinear: 'right', color: L.c.tintaSuave });
      });
      const n = (v) => v.toFixed(3);
      m.leer(
        m.tex(`\\nabla f(P)=(${n(g[0])},\\ ${n(g[1])}),\\quad |\\nabla f|=${n(ng)}`, { bloque: true }),
        m.tex(`D_{\\vec u}f=${n(g[0])}\\cos${alfa}^\\circ+${n(g[1])}\\operatorname{sen}${alfa}^\\circ=${n(D)}`, { bloque: true }),
        m.dato('Dirección de máximo crecimiento', `${angGrad.toFixed(1)}°`),
        m.dato('Direcciones de derivada nula', `${((angGrad + 90) % 360).toFixed(1)}° y ${((angGrad + 270) % 360).toFixed(1)}°`));
    }
    cargar(FUNCIONES[0][0]);
  },
};

function mezclar(a, b, t) {
  const p = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(',')})`;
}

import { intentarCompilar } from '../../matematica/expresion.js';
import { simpson } from '../../matematica/calculo.js';

const CURVAS = [
  { n: 'Elipse', x: '2cos(t)', y: 'sen(t)', t: [0, 6.2832] },
  { n: 'Involuta (TP 4, 15 a)', x: 'cos(t)+t*sen(t)', y: 'sen(t)-t*cos(t)', t: [0.2, 9] },
  { n: 'Cicloide', x: 't-sen(t)', y: '1-cos(t)', t: [0, 12.566] },
  { n: 'Parábola (TP 4, 2 c)', x: 't', y: '-t^2', t: [-2, 2] },
  { n: 'Astroide', x: '2cos(t)^3', y: '2sen(t)^3', t: [0, 6.2832] },
];

const d = (f, t, h = 1e-4) => (f(t + h) - f(t - h)) / (2 * h);
const d2 = (f, t, h = 1e-3) => (f(t + h) - 2 * f(t) + f(t - h)) / (h * h);

export default {
  resumen: String.raw`Una partícula recorre $\vec r(t)=x(t)\,\vec i+y(t)\,\vec j$. Mové $t$ y mirá la **velocidad** $\vec r\,{}'(t)$ (siempre tangente), la **aceleración** $\vec r\,{}''(t)$ (apunta hacia donde la curva dobla) y la **longitud de arco** acumulada desde el inicio.`,
  observa: [
    'En la elipse, la rapidez cambia: es mayor en los extremos del eje menor. La aceleración apunta siempre hacia adentro.',
    String.raw`En la involuta la rapidez es $|\vec r\,{}'|=t$ y la curvatura $K=\frac1t$: cuanto más avanza, más se abre.`,
    String.raw`En la cicloide, cuando $y=0$ la velocidad se anula: la curva no es suave ahí (tiene un pico).`,
  ],
  async montar(m) {
    const L = m.lienzo({ x: [-3.5, 3.5], y: [-3, 3], etiqueta: 'Curva paramétrica con vectores velocidad y aceleración' });
    let X, Y, curva = CURVAS[0], t = 1;
    const cx = m.campoFuncion({ etiqueta: 'x(t) =', valor: curva.x, alCambiar: (s) => cargar(s, 'x') });
    const cy = m.campoFuncion({ etiqueta: 'y(t) =', valor: curva.y, alCambiar: (s) => cargar(s, 'y') });
    const dt = m.deslizador({ etiqueta: 'Instante t', min: curva.t[0], max: curva.t[1], paso: 0.01, valor: t, alCambiar: (v) => { t = v; dibujar(); } });
    const rango = dt.querySelector('input');
    m.panel.append(
      m.selector({ etiqueta: 'Curvas', valor: curva.n, opciones: CURVAS.map((c) => [c.n, c.n]), alCambiar: (n) => {
        curva = CURVAS.find((c) => c.n === n);
        rango.min = curva.t[0]; rango.max = curva.t[1];
        t = (curva.t[0] + curva.t[1]) / 3; dt.fijar(t);
        cx.fijar(curva.x); cy.fijar(curva.y);
      } }),
      cx, cy, dt);

    function cargar(s, eje) {
      const { f, error } = intentarCompilar(s, ['t']);
      if (error) return error;
      if (eje === 'x') X = f; else Y = f;
      if (X && Y) encuadrar();
      return null;
    }
    function encuadrar() {
      let mx = 1;
      for (let k = 0; k <= 200; k++) { const s = curva.t[0] + ((curva.t[1] - curva.t[0]) * k) / 200; mx = Math.max(mx, Math.abs(X(s)), Math.abs(Y(s))); }
      if (Number.isFinite(mx)) { L.rango.x = [-mx * 1.25, mx * 1.25]; L.rango.y = [-mx * 1.25, mx * 1.25]; }
      dibujar();
    }

    function dibujar() {
      if (!X || !Y) return;
      const p = [X(t), Y(t)];
      const v = [d(X, t), d(Y, t)];
      const a = [d2(X, t), d2(Y, t)];
      const rap = Math.hypot(...v);
      const K = Math.abs(v[0] * a[1] - v[1] * a[0]) / rap ** 3;
      const s = simpson((u) => Math.hypot(d(X, u), d(Y, u)), curva.t[0], t, 200);
      const escala = (L.v ? (L.v.x1 - L.v.x0) : 6) / 10;
      L.alDibujar((Lz) => {
        Lz.ejes();
        Lz.parametrica((u) => [X(u), Y(u)], curva.t[0], curva.t[1], { color: Lz.c.tintaSuave, ancho: 1.5 });
        Lz.parametrica((u) => [X(u), Y(u)], curva.t[0], t, { color: Lz.c.tinta, ancho: 3 });
        const nv = rap || 1, na = Math.hypot(...a) || 1;
        Lz.flecha(p, [(v[0] / nv) * escala * 2, (v[1] / nv) * escala * 2], { color: Lz.c.deriv, ancho: 2.5 });
        Lz.flecha(p, [(a[0] / na) * escala * 1.5, (a[1] / na) * escala * 1.5], { color: Lz.c.integ, ancho: 2.5 });
        Lz.punto(p, { color: Lz.c.tinta });
        Lz.texto('v', [p[0] + (v[0] / nv) * escala * 2.2, p[1] + (v[1] / nv) * escala * 2.2], { color: Lz.c.deriv });
        Lz.texto('a', [p[0] + (a[0] / na) * escala * 1.7, p[1] + (a[1] / na) * escala * 1.7], { color: Lz.c.integ });
      });
      const f = (n) => (Number.isFinite(n) ? n.toFixed(3) : '—');
      m.leer(
        m.dato('Posición r(t)', `(${f(p[0])}, ${f(p[1])})`),
        m.dato('Velocidad r′(t)', `(${f(v[0])}, ${f(v[1])})`),
        m.dato('Rapidez |r′(t)|', f(rap)),
        m.dato('Aceleración r″(t)', `(${f(a[0])}, ${f(a[1])})`),
        m.dato('Curvatura K', f(K)),
        m.dato('Longitud de arco recorrida', f(s)),
        m.h('p', { class: 'lab__pista' }, 'Las flechas se dibujan con largo fijo para que se vean siempre; los números dan el tamaño real.'),
      );
    }
    cargar(curva.x, 'x');
    cargar(curva.y, 'y');
  },
};

import { intentarCompilar } from '../../matematica/expresion.js';
import { puntosCriticos } from '../../matematica/calculo.js';

const FUNCIONES = [
  ['(x^3+y^2-6x^2+y-1)/12', 'TP 12, 1 a (escalada ÷12)'],
  ['x^2-y^2', 'Silla x² − y²'],
  ['x^4+y^4', 'x⁴ + y⁴ (el hessiano no decide)'],
  ['x*y*exp(-(x^2+y^2)/2)', 'xy·e^(−(x²+y²)/2)'],
  ['sen(x)*sen(y)', 'sen x · sen y'],
];
const COLOR = { 'mínimo relativo': 'deriv', 'máximo relativo': 'integ', 'punto de silla': 'acento3', 'el criterio no decide': 'tintaSuave' };

export default {
  resumen: String.raw`El laboratorio busca los puntos donde $\nabla f=\vec0$ y los clasifica con el **hessiano** $D=f_{xx}f_{yy}-f_{xy}^2$. Azul: mínimo; ciruela: máximo; ocre: silla. Girá la superficie para ver por qué una silla no es extremo: sube en una dirección y baja en otra.`,
  observa: [
    String.raw`En la silla $x^2-y^2$, $D=-4<0$: el origen es crítico pero no es extremo.`,
    String.raw`En $x^4+y^4$ el hessiano vale $0$ en el origen y el criterio no decide; mirando la función ($\ge0$) se ve que es mínimo absoluto.`,
    'Las curvas de nivel alrededor de un extremo son óvalos cerrados; alrededor de una silla, cruces como hipérbolas.',
  ],
  async montar(m) {
    const e = await m.escena({ rango: 3, etiqueta: 'Superficie con sus puntos críticos clasificados' });
    let objetos = [];
    const campo = m.campoFuncion({ etiqueta: 'f(x, y) =', valor: FUNCIONES[0][0], alCambiar: (s) => cargar(s) });
    m.panel.append(campo, m.selector({ etiqueta: 'Funciones', opciones: FUNCIONES, valor: FUNCIONES[0][0], alCambiar: (v) => campo.fijar(v) }));

    function cargar(s) {
      const { f: g, error } = intentarCompilar(s, ['x', 'y']);
      if (error) return error;
      const f = (x, y) => { const z = g(x, y); return Number.isFinite(z) && Math.abs(z) < 30 ? z : NaN; };
      objetos.forEach((o) => e.quitar(o));
      // Se busca en [-5,5]² (el TP tiene críticos en x = 4) y se dibuja escalado a la escena.
      const ventana = 5, k = 3 / ventana;
      const F = (x, y) => f(x / k, y / k);
      const sup = e.superficie(F, [-3, 3], [-3, 3], { n: 90, opacidad: 0.88, recortarZ: [-3, 3] });
      const pcs = puntosCriticos(f, { a: -ventana, b: ventana, c: -ventana, d: ventana });
      objetos = [sup, e.curvasDeNivel(F, Array.from({ length: 15 }, (_, i) => -3 + i * 0.4), { altura: -3, token: 'tintaSuave' }),
        ...pcs.flatMap((q) => [e.punto([q.p[0] * k, q.p[1] * k, q.valor], { token: COLOR[q.tipo], radio: 0.05 }), e.punto([q.p[0] * k, q.p[1] * k, -3], { token: COLOR[q.tipo], radio: 0.03 })])];
      const f3 = (v) => (Math.abs(v) < 5e-5 ? '0' : v.toFixed(3));
      m.leer(pcs.length ? m.h('div', {}, pcs.map((q) => m.h('div', { class: 'dato' },
        m.h('span', { class: 'dato__etiqueta' }, `(${f3(q.p[0])}, ${f3(q.p[1])})  D = ${f3(q.D)}`),
        m.h('span', { class: 'dato__valor', style: { color: `var(--${COLOR[q.tipo] === 'tintaSuave' ? 'tinta-suave' : COLOR[q.tipo]})` } }, q.tipo))))
        : m.h('p', { class: 'lab__pista' }, 'No hay puntos críticos con gradiente nulo en la ventana.'));
      return null;
    }
    cargar(FUNCIONES[0][0]);
  },
};

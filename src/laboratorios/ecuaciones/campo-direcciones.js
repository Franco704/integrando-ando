import { intentarCompilar } from '../../matematica/expresion.js';
import { rk4 } from '../../matematica/calculo.js';

const ECUACIONES = [
  ['y', "y′ = y (crecimiento, final dic. 2024)"],
  ['-x/y', "y′ = −x/y (final 25/11)"],
  ['(2y+x+1)/x', "y′ = (2y + x + 1)/x (final feb. 2025)"],
  ['x-y', "y′ = x − y"],
  ['y/x+exp(y/x)', "y′ = y/x + e^(y/x) (TP 22, 5 d)"],
];

export default {
  resumen: String.raw`Una ecuación $y'=F(x,y)$ dice la **pendiente** de la solución en cada punto. El campo de direcciones dibuja esas pendientes; cada solución es una curva que las sigue. **Tocá el plano** para elegir una condición inicial $y(x_0)=y_0$: la curva que pasa por ahí es la **solución particular** (calculada con Runge-Kutta). Todas juntas forman la solución general.`,
  observa: [
    String.raw`En $y'=y$ las soluciones son $Ce^x$: una para cada $C$, y ninguna se cruza con otra.`,
    String.raw`En $y'=-\frac xy$ las soluciones son circunferencias, pero cada una se corta donde $y=0$: ahí la ecuación no está definida (por eso el intervalo $-2<x<2$ del final).`,
    String.raw`En la del final de febrero, la curva que pasa por $(1,0)$ es $y=\frac32x^2-x-\frac12$, no la propuesta en el enunciado.`,
  ],
  async montar(m) {
    const L = m.lienzo({ x: [-4, 4], y: [-4, 4], etiqueta: 'Campo de direcciones con curvas solución' });
    let F, puntos = [[1, 0.5]];
    const campo = m.campoFuncion({ etiqueta: "y′ = F(x, y) =", valor: ECUACIONES[0][0], alCambiar: (s) => cargar(s) });
    m.panel.append(campo,
      m.selector({ etiqueta: 'Ecuaciones', opciones: ECUACIONES, valor: ECUACIONES[0][0], alCambiar: (v) => { puntos = v.startsWith('(2y') ? [[1, 0]] : [[1, 0.5]]; campo.fijar(v); } }),
      m.boton('Borrar curvas', () => { puntos = []; dibujar(); }, { variante: 'secundario', icono: 'reiniciar' }));
    L.alPuntero((p, e) => { if (e.type === 'pointerdown') { puntos = [...puntos.slice(-5), p]; dibujar(); } });

    function cargar(s) {
      const { f, error } = intentarCompilar(s, ['x', 'y']);
      if (error) return error;
      F = f;
      dibujar();
      return null;
    }
    function dibujar() {
      L.alDibujar((Lz) => {
        Lz.ejes();
        Lz.campo((x, y) => { const s = F(x, y); return Number.isFinite(s) ? [1, s] : [NaN, NaN]; }, { densidad: 22, color: Lz.c.tintaSuave, escala: 0.7 });
        for (const [x0, y0] of puntos) {
          const adelante = rk4(F, x0, y0, 0.01, 500), atras = rk4(F, x0, y0, -0.01, 500);
          const corta = (pts) => { const k = pts.findIndex(([, y], i) => i && (Math.abs(y) > 50 || Math.abs(y - pts[i - 1][1]) > 1)); return k > 0 ? pts.slice(0, k) : pts; };
          Lz.trazo([...corta(atras).reverse(), ...corta(adelante)], { color: Lz.c.integ, ancho: 2.5 });
          Lz.punto([x0, y0], { color: Lz.c.integ, radio: 4 });
        }
      });
      const ult = puntos.at(-1);
      m.leer(ult ? m.dato('Última condición inicial', `y(${ult[0].toFixed(2)}) = ${ult[1].toFixed(2)}`) : null,
        ult ? m.dato("Pendiente ahí, y′", Number.isFinite(F(...ult)) ? F(...ult).toFixed(4) : 'no definida') : null,
        m.h('p', { class: 'lab__pista' }, 'Tocá el gráfico para agregar soluciones particulares (se guardan las últimas seis).'));
    }
    cargar(ECUACIONES[0][0]);
  },
};

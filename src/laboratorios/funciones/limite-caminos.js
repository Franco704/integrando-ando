import { intentarCompilar } from '../../matematica/expresion.js';

const FUNCIONES = [
  ['x*y/(x^2+y^2)', 'xy/(x²+y²)'],
  ['6x*y^2/(x^2+y^4)', '6xy²/(x²+y⁴)'],
  ['8x^2*y/(x^2+y^2)', '8x²y/(x²+y²)'],
  ['x^3*y/(x^6+y^2)', 'x³y/(x⁶+y²)'],
  ['(x^2-y^2)/(x^2+y^2)', '(x²−y²)/(x²+y²)'],
];
// Familias de caminos que pasan por el origen, parametrizadas por t → 0.
const CAMINOS = {
  recta: { nombre: 'y = m·x', r: (t, m) => [t, m * t] },
  parabola: { nombre: 'y = m·x²', r: (t, m) => [t, m * t * t] },
  parabolaX: { nombre: 'x = m·y²', r: (t, m) => [m * t * t, t] },
  cubica: { nombre: 'y = m·x³', r: (t, m) => [t, m * t ** 3] },
};

export default {
  resumen: String.raw`El límite doble existe solo si $f$ se acerca al mismo valor **por todos los caminos**. Arriba ves el mapa de colores de $f$ cerca del origen (azul negativo, ciruela positivo) y un camino; abajo, los valores de $f$ a lo largo de ese camino a medida que $t\to0$. Cambiá $m$: si el valor de llegada se mueve, el límite no existe.`,
  observa: [
    String.raw`En $\frac{xy}{x^2+y^2}$ el color depende de la dirección: cada recta $y=mx$ llega a $\frac{m}{1+m^2}$.`,
    String.raw`En $\frac{6xy^2}{x^2+y^4}$ todas las rectas dan $0$, pero la parábola $x=y^2$ da $3$. Con rectas no alcanza.`,
    String.raw`En $\frac{8x^2y}{x^2+y^2}$ todos los caminos dan $0$, y además $|f|\le8|y|$: el límite existe y vale $0$.`,
  ],
  async montar(m) {
    m.vista.closest('.lab')?.classList.add('lab--doble');
    const mapa = m.lienzo({ x: [-1, 1], y: [-1, 1], etiqueta: 'Mapa de colores de f cerca del origen con el camino elegido' });
    const corte = m.lienzo({ x: [-1, 1], y: [-2, 2], proporcional: false, etiqueta: 'Valores de f a lo largo del camino' });
    let f = null, camino = 'recta', pend = 1, escala = 1;

    const campo = m.campoFuncion({ etiqueta: 'f(x, y) =', valor: FUNCIONES[0][0], alCambiar: (t) => cargar(t) });
    m.panel.append(
      campo,
      m.selector({ etiqueta: 'Funciones del TP', opciones: FUNCIONES, valor: FUNCIONES[0][0], alCambiar: (v) => campo.fijar(v) }),
      m.selector({ etiqueta: 'Familia de caminos', opciones: Object.entries(CAMINOS).map(([k, c]) => [k, c.nombre]), valor: camino, alCambiar: (v) => { camino = v; redibujar(); } }),
      m.deslizador({ etiqueta: 'Parámetro m del camino', min: -3, max: 3, paso: 0.05, valor: pend, alCambiar: (v) => { pend = v; redibujar(); } }));

    function cargar(t) {
      const { f: g, error } = intentarCompilar(t, ['x', 'y']);
      if (error) return error;
      f = g;
      // Escala de color robusta: el percentil 95 de |f| en la ventana.
      const muestras = [];
      for (let i = 0; i < 40; i++) for (let j = 0; j < 40; j++) { const v = f(-1 + i / 20 + 0.01, -1 + j / 20 + 0.013); if (Number.isFinite(v)) muestras.push(Math.abs(v)); }
      muestras.sort((a, b) => a - b);
      escala = muestras[Math.floor(muestras.length * 0.95)] || 1;
      redibujar();
      return null;
    }

    function redibujar() {
      mapa.alDibujar((L) => {
        pintarMapa(L, f, escala);
        L.ejes({ marcas: false });
        const r = (t) => CAMINOS[camino].r(t, pend);
        L.parametrica(r, -1.2, 1.2, { color: L.c.tinta, ancho: 2.5 });
        L.punto([0, 0], { color: L.c.tinta, radio: 4 });
      });
      const r = (t) => CAMINOS[camino].r(t, pend);
      const g = (t) => f(...r(t));
      const llegada = [1e-3, -1e-3].map((t) => g(t));
      corte.rango.y = [-(Math.max(2, escala * 1.3)), Math.max(2, escala * 1.3)];
      corte.alDibujar((L) => {
        L.ejes();
        L.funcion(g, { color: L.c.integ, ancho: 2.5 });
        L.texto('t', [0.92, 0], { dy: -6, color: L.c.tintaSuave });
        if (llegada.every(Number.isFinite)) L.punto([0, (llegada[0] + llegada[1]) / 2], { color: L.c.integ, texto: `→ ${((llegada[0] + llegada[1]) / 2).toFixed(3)}` });
      });
      const ok = llegada.every(Number.isFinite);
      m.leer(
        m.dato('Camino', CAMINOS[camino].nombre.replace('m', pend.toFixed(2))),
        m.dato('f al llegar al origen', ok ? (Math.abs(llegada[0] - llegada[1]) < 1e-2 ? llegada[0].toFixed(4) : 'distinto por izquierda y derecha') : 'no tiende a un número'),
      );
    }
    cargar(FUNCIONES[0][0]);
  },
};

// Mapa de colores: azul (negativo) a papel (cero) a ciruela (positivo).
function pintarMapa(L, f, escala) {
  const { ctx } = L;
  const neg = hex(L.c.deriv), pos = hex(L.c.integ), cero = hex(L.c.papel);
  const paso = 4;
  for (let px = 0; px < L.w; px += paso)
    for (let py = 0; py < L.h; py += paso) {
      const [x, y] = L.mundo(px + paso / 2, py + paso / 2);
      const v = f?.(x, y);
      if (!Number.isFinite(v)) continue;
      const t = Math.max(-1, Math.min(1, v / escala));
      const c = t < 0 ? mezcla(cero, neg, -t) : mezcla(cero, pos, t);
      ctx.fillStyle = `rgb(${c.join(',')})`;
      ctx.fillRect(px, py, paso, paso);
    }
}
const hex = (s) => { const n = parseInt(s.replace('#', ''), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const mezcla = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

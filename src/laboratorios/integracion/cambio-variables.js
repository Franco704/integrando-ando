import { jacobiano2D } from '../../matematica/calculo.js';

const { cos, sin, exp, PI } = Math;
const TRANSF = [
  { n: 'Polares', X: (r, t) => r * cos(t), Y: (r, t) => r * sin(t), u: [0, 2], v: [0, 2 * PI], nu: 'r', nv: 'θ', J: 'r', vista: 2.6 },
  { n: 'Polares elípticas (2r cos θ, 3r sen θ)', X: (r, t) => 2 * r * cos(t), Y: (r, t) => 3 * r * sin(t), u: [0, 1], v: [0, 2 * PI], nu: 'r', nv: 'θ', J: '6r', vista: 3.4 },
  { n: 'Lineal x = u + v, y = 2v (TP 15, 2 b)', X: (u, v) => u + v, Y: (u, v) => 2 * v, u: [0, 1], v: [0, 2], nu: 'u', nv: 'v', J: '2', vista: 4.5 },
  { n: 'x = eᵘ sen v, y = eᵘ cos v (final dic. 2024)', X: (u, v) => exp(u) * sin(v), Y: (u, v) => exp(u) * cos(v), u: [-0.5, 0.8], v: [0, 2 * PI], nu: 'u', nv: 'v', J: '-e^{2u}', vista: 2.6 },
];

export default {
  resumen: String.raw`Una transformación $T(u,v)=(x,y)$ lleva la grilla del plano $uv$ (izquierda) a una grilla deformada en el plano $xy$ (derecha). Un rectangulito de área $\Delta u\,\Delta v$ se convierte en casi un paralelogramo de área $|J|\,\Delta u\,\Delta v$: por eso aparece el jacobiano en la integral.`,
  observa: [
    String.raw`En polares, los rectangulitos de la izquierda son todos iguales pero sus imágenes crecen al alejarse del origen: $|J|=r$.`,
    String.raw`En la lineal el jacobiano es constante: todas las celdas cambian de área en el mismo factor 2.`,
    'Si J es negativo, la transformación invierte la orientación (la celda se "da vuelta"); en la integral se usa |J|.',
  ],
  async montar(m) {
    m.vista.closest('.lab')?.classList.add('lab--doble');
    const uv = m.lienzo({ x: [0, 2], y: [0, 6.3], proporcional: false, etiqueta: 'Región en el plano uv con una celda resaltada' });
    const xy = m.lienzo({ x: [-2.6, 2.6], y: [-2.6, 2.6], etiqueta: 'Imagen de la región en el plano xy' });
    let T = TRANSF[0], s = 0.6, t = 0.4;
    m.panel.append(
      m.selector({ etiqueta: 'Transformación', valor: T.n, opciones: TRANSF.map((q) => [q.n, q.n]), alCambiar: (v) => { T = TRANSF.find((q) => q.n === v); dibujar(); } }),
      m.deslizador({ etiqueta: 'Celda: posición en u', min: 0.05, max: 0.95, paso: 0.01, valor: s, formato: (v) => `${Math.round(v * 100)} %`, alCambiar: (v) => { s = v; dibujar(); } }),
      m.deslizador({ etiqueta: 'Celda: posición en v', min: 0.05, max: 0.95, paso: 0.01, valor: t, formato: (v) => `${Math.round(v * 100)} %`, alCambiar: (v) => { t = v; dibujar(); } }));

    function dibujar() {
      const [u0, u1] = T.u, [v0, v1] = T.v, N = 10;
      const du = (u1 - u0) / N, dv = (v1 - v0) / N;
      const cu = u0 + (u1 - u0) * s, cv = v0 + (v1 - v0) * t;
      const celda = [[cu, cv], [cu + du, cv], [cu + du, cv + dv], [cu, cv + dv]];
      const P = ([u, v]) => [T.X(u, v), T.Y(u, v)];
      uv.rango = { x: [u0 - 0.1 * (u1 - u0), u1 + 0.1 * (u1 - u0)], y: [v0 - 0.1 * (v1 - v0), v1 + 0.1 * (v1 - v0)] };
      xy.rango = { x: [-T.vista, T.vista], y: [-T.vista, T.vista] };
      uv.alDibujar((L) => {
        L.ejes();
        for (let i = 0; i <= N; i++) {
          L.trazo([[u0 + i * du, v0], [u0 + i * du, v1]], { color: L.c.deriv, ancho: 1 });
          L.trazo([[u0, v0 + i * dv], [u1, v0 + i * dv]], { color: L.c.integ, ancho: 1 });
        }
        L.trazo(celda, { cerrar: true, relleno: L.c.acento3 + 'cc', color: L.c.acento3, ancho: 2 });
        L.texto(T.nu, [u1, v0], { dy: 16, color: L.c.deriv });
        L.texto(T.nv, [u0, v1], { dx: -14, color: L.c.integ });
      });
      xy.alDibujar((L) => {
        L.ejes();
        for (let i = 0; i <= N; i++) {
          L.parametrica((w) => P([u0 + i * du, w]), v0, v1, { color: L.c.deriv, ancho: 1 }, 120);
          L.parametrica((w) => P([w, v0 + i * dv]), u0, u1, { color: L.c.integ, ancho: 1 }, 60);
        }
        const borde = [];
        for (let k = 0; k <= 12; k++) borde.push(P([cu + (du * k) / 12, cv]));
        for (let k = 0; k <= 12; k++) borde.push(P([cu + du, cv + (dv * k) / 12]));
        for (let k = 12; k >= 0; k--) borde.push(P([cu + (du * k) / 12, cv + dv]));
        for (let k = 12; k >= 0; k--) borde.push(P([cu, cv + (dv * k) / 12]));
        L.trazo(borde, { cerrar: true, relleno: L.c.acento3 + 'cc', color: L.c.acento3, ancho: 2 });
      });
      // Área real de la imagen (fórmula del polígono) contra |J|·Δu·Δv.
      let area = 0;
      const pts = [];
      for (let k = 0; k < 40; k++) pts.push(P([cu + (du * k) / 40, cv]));
      for (let k = 0; k < 40; k++) pts.push(P([cu + du, cv + (dv * k) / 40]));
      for (let k = 40; k > 0; k--) pts.push(P([cu + (du * k) / 40, cv + dv]));
      for (let k = 40; k > 0; k--) pts.push(P([cu, cv + (dv * k) / 40]));
      pts.forEach((p, i) => { const q = pts[(i + 1) % pts.length]; area += p[0] * q[1] - q[0] * p[1]; });
      area = Math.abs(area) / 2;
      const J = jacobiano2D(T.X, T.Y, cu + du / 2, cv + dv / 2);
      m.leer(m.tex(`J=\\frac{\\partial(x,y)}{\\partial(${T.nu},${T.nv})}=${T.J}`, { bloque: true }),
        m.dato('Área de la celda en uv', (du * dv).toFixed(4)),
        m.dato('Área de su imagen en xy', area.toFixed(4)),
        m.dato('|J| × área de la celda', (Math.abs(J) * du * dv).toFixed(4)),
        m.dato('J en el centro de la celda', J.toFixed(4)));
    }
    dibujar();
  },
};

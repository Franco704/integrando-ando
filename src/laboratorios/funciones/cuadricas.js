const { sin, cos, sinh, cosh } = Math;
const PI = Math.PI;

// Cada cuádrica: ecuación canónica y una o más parametrizaciones S(u,v) con sus rangos.
const CUADRICAS = {
  elipsoide: {
    nombre: 'Elipsoide', ec: String.raw`\frac{x^2}{a^2}+\frac{y^2}{b^2}+\frac{z^2}{c^2}=1`,
    trazas: 'Las tres trazas son elipses.',
    hojas: (a, b, c) => [[(u, v) => [a * sin(u) * cos(v), b * sin(u) * sin(v), c * cos(u)], [0, PI], [0, 2 * PI]]],
  },
  hiper1: {
    nombre: 'Hiperboloide de una hoja', ec: String.raw`\frac{x^2}{a^2}+\frac{y^2}{b^2}-\frac{z^2}{c^2}=1`,
    trazas: 'Cortes z = k: elipses (nunca vacías). Cortes x = k o y = k: hipérbolas. Un solo signo menos.',
    hojas: (a, b, c) => [[(u, v) => [a * cosh(u) * cos(v), b * cosh(u) * sin(v), c * sinh(u)], [-1.3, 1.3], [0, 2 * PI]]],
  },
  hiper2: {
    nombre: 'Hiperboloide de dos hojas', ec: String.raw`-\frac{x^2}{a^2}-\frac{y^2}{b^2}+\frac{z^2}{c^2}=1`,
    trazas: 'Cortes z = k: vacíos si |k| < c, elipses si |k| > c. Dos signos menos: dos hojas.',
    hojas: (a, b, c) => [1, -1].map((s) => [(u, v) => [a * sinh(u) * cos(v), b * sinh(u) * sin(v), s * c * cosh(u)], [0, 1.4], [0, 2 * PI]]),
  },
  cono: {
    nombre: 'Cono elíptico', ec: String.raw`\frac{x^2}{a^2}+\frac{y^2}{b^2}=\frac{z^2}{c^2}`,
    trazas: 'Cortes z = k: elipses que se achican hasta el vértice. Cortes x = 0 o y = 0: pares de rectas.',
    hojas: (a, b, c) => [[(u, v) => [a * u * cos(v), b * u * sin(v), c * u], [-1.6, 1.6], [0, 2 * PI]]],
  },
  paraboloide: {
    nombre: 'Paraboloide elíptico', ec: String.raw`\frac{z}{c}=\frac{x^2}{a^2}+\frac{y^2}{b^2}`,
    trazas: 'Cortes z = k > 0: elipses. Cortes x = k o y = k: parábolas que abren hacia arriba.',
    hojas: (a, b, c) => [[(u, v) => [a * u * cos(v), b * u * sin(v), c * u * u], [0, 1.6], [0, 2 * PI]]],
  },
  silla: {
    nombre: 'Paraboloide hiperbólico', ec: String.raw`\frac{z}{c}=\frac{x^2}{a^2}-\frac{y^2}{b^2}`,
    trazas: 'Cortes z = k: hipérbolas (dos rectas si k = 0). Cortes x = k: parábolas hacia abajo; y = k: hacia arriba.',
    hojas: (a, b, c) => [[(u, v) => [u, v, c * ((u * u) / (a * a) - (v * v) / (b * b))], [-2.5, 2.5], [-2.5, 2.5]]],
  },
  cilindro: {
    nombre: 'Cilindro elíptico', ec: String.raw`\frac{x^2}{a^2}+\frac{y^2}{b^2}=1`,
    trazas: 'Falta una variable (z): la superficie es paralela a ese eje. Todos los cortes z = k son la misma elipse.',
    hojas: (a, b) => [[(u, v) => [a * cos(v), b * sin(v), u], [-2.5, 2.5], [0, 2 * PI]]],
  },
};

export default {
  resumen: String.raw`Las cuádricas son las superficies de segundo grado. Se reconocen por la cantidad de signos menos de la ecuación canónica y por la variable que aparece a la primera potencia. Elegí una, cambiá los semiejes $a$, $b$, $c$ y mirá cómo se deforma.`,
  observa: [
    'Un signo menos: una hoja. Dos signos menos: dos hojas. Ningún signo menos e igualado a 1: elipsoide.',
    'Si una variable aparece a la primera potencia (sin cuadrado), es un paraboloide y esa variable es su eje.',
    'Si una variable no aparece, es un cilindro paralelo al eje de esa variable.',
  ],
  async montar(m) {
    const e = await m.escena({ rango: 3, etiqueta: 'Superficie cuádrica' });
    let tipo = 'elipsoide', a = 2, b = 1.5, c = 1, mallas = [];
    const ecuacion = m.h('div', {});
    const dibujar = () => {
      mallas.forEach((o) => e.quitar(o));
      const q = CUADRICAS[tipo];
      mallas = q.hojas(a, b, c).map(([S, U, V]) => e.parametrizada(S, U, V, { n: 70, recortarZ: [-3, 3] }));
      ecuacion.replaceChildren(m.tex(q.ec, { bloque: true }));
      m.leer(m.dato('Superficie', q.nombre), m.h('p', { class: 'lab__pista' }, q.trazas));
    };
    const des = (et, val, set) => m.deslizador({ etiqueta: et, min: 0.5, max: 2.5, paso: 0.1, valor: val, alCambiar: (v) => { set(v); dibujar(); } });
    m.panel.append(
      m.selector({ etiqueta: 'Cuádrica', valor: tipo, opciones: Object.entries(CUADRICAS).map(([k, q]) => [k, q.nombre]), alCambiar: (v) => { tipo = v; dibujar(); } }),
      ecuacion,
      des('Semieje a', a, (v) => (a = v)), des('Semieje b', b, (v) => (b = v)), des('Semieje c', c, (v) => (c = v)));
    dibujar();
  },
};

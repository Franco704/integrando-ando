// Cálculo numérico de varias variables. Funciones puras: f recibe números y devuelve un número.

const H = 1e-4;

export const parcial = (f, p, i, h = H) => {
  const a = [...p], b = [...p];
  a[i] += h;
  b[i] -= h;
  return (f(...a) - f(...b)) / (2 * h);
};

export const gradiente = (f, p, h = H) => p.map((_, i) => parcial(f, p, i, h));

export function hessiano(f, p, h = 1e-3) {
  const n = p.length;
  const m = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      const q = (di, dj) => {
        const r = [...p];
        r[i] += di;
        r[j] += dj;
        return f(...r);
      };
      m[i][j] = (q(h, h) - q(h, -h) - q(-h, h) + q(-h, -h)) / (4 * h * h);
    }
  return m;
}

// Derivada direccional: ∇f · u con u unitario.
export function direccional(f, p, u) {
  const n = Math.hypot(...u);
  return gradiente(f, p).reduce((s, g, i) => s + (g * u[i]) / n, 0);
}

// Criterio del hessiano para z = f(x, y).
export function clasificarCritico(f, p) {
  const [[fxx, fxy], [, fyy]] = hessiano(f, p);
  const D = fxx * fyy - fxy * fxy;
  const eps = 1e-6;
  let tipo;
  if (D > eps) tipo = fxx > 0 ? 'mínimo relativo' : 'máximo relativo';
  else if (D < -eps) tipo = 'punto de silla';
  else tipo = 'el criterio no decide';
  return { fxx, fxy, fyy, D, tipo };
}

// Puntos críticos de f(x,y) en [a,b]×[c,d]: semillas en una grilla + Newton sobre ∇f = 0.
export function puntosCriticos(f, { a = -3, b = 3, c = -3, d = 3 } = {}, semillas = 14) {
  const hallados = [];
  for (let i = 0; i <= semillas; i++)
    for (let j = 0; j <= semillas; j++) {
      let p = [a + ((b - a) * i) / semillas, c + ((d - c) * j) / semillas];
      for (let k = 0; k < 40; k++) {
        const g = gradiente(f, p), [[A, B], [, C]] = hessiano(f, p);
        const det = A * C - B * B;
        if (!Number.isFinite(det) || Math.abs(det) < 1e-12) break;
        const paso = [(C * g[0] - B * g[1]) / det, (A * g[1] - B * g[0]) / det];
        p = [p[0] - paso[0], p[1] - paso[1]];
        if (Math.hypot(...paso) < 1e-10) break;
      }
      const dentro = p[0] >= a && p[0] <= b && p[1] >= c && p[1] <= d;
      if (dentro && Math.hypot(...gradiente(f, p)) < 1e-5 && !hallados.some((q) => Math.hypot(q[0] - p[0], q[1] - p[1]) < 1e-3)) hallados.push(p);
    }
  return hallados.map((p) => ({ p, valor: f(...p), ...clasificarCritico(f, p) }));
}

// Simpson compuesto (n par).
export function simpson(f, a, b, n = 200) {
  if (n % 2) n++;
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let k = 1; k < n; k++) s += (k % 2 ? 4 : 2) * f(a + k * h);
  return (s * h) / 3;
}

// ∫_a^b ∫_{g1(x)}^{g2(x)} f(x, y) dy dx  (región de tipo I)
export const integralDoble = (f, a, b, g1, g2, n = 80) =>
  simpson((x) => simpson((y) => f(x, y), g1(x), g2(x), n), a, b, n);

// ∫_a^b ∫_{g1}^{g2} ∫_{h1(x,y)}^{h2(x,y)} f dz dy dx
export const integralTriple = (f, a, b, g1, g2, h1, h2, n = 30) =>
  simpson((x) => simpson((y) => simpson((z) => f(x, y, z), h1(x, y), h2(x, y), n), g1(x), g2(x), n), a, b, n);

// Suma de Riemann sobre [a,b]×[c,d] recortada a una región. Devuelve las celdas para dibujarlas.
export function riemann2D(f, { a, b, c, d }, nx, ny, dentro = () => true, regla = 'medio') {
  const dx = (b - a) / nx, dy = (d - c) / ny;
  const off = regla === 'medio' ? 0.5 : 0;
  const celdas = [];
  let suma = 0;
  for (let i = 0; i < nx; i++)
    for (let j = 0; j < ny; j++) {
      const x = a + (i + off) * dx, y = c + (j + off) * dy;
      if (!dentro(x, y)) continue;
      const z = f(x, y);
      suma += z * dx * dy;
      celdas.push({ x0: a + i * dx, y0: c + j * dy, dx, dy, z });
    }
  return { suma, celdas };
}

// Runge-Kutta 4 para y' = F(x, y).
export function rk4(F, x0, y0, h, pasos) {
  const pts = [[x0, y0]];
  let x = x0, y = y0;
  for (let k = 0; k < pasos; k++) {
    const k1 = F(x, y), k2 = F(x + h / 2, y + (h * k1) / 2), k3 = F(x + h / 2, y + (h * k2) / 2), k4 = F(x + h, y + h * k3);
    y += (h * (k1 + 2 * k2 + 2 * k3 + k4)) / 6;
    x += h;
    if (!Number.isFinite(y)) break;
    pts.push([x, y]);
  }
  return pts;
}

// Integral de línea ∫_C F·dr con r(t), t∈[a,b]; F y r devuelven arreglos.
export function integralLineaVectorial(F, r, a, b, n = 400) {
  const dr = (t) => r(t + 1e-5).map((v, i) => (v - r(t - 1e-5)[i]) / 2e-5);
  return simpson((t) => F(...r(t)).reduce((s, Fi, i) => s + Fi * dr(t)[i], 0), a, b, n);
}

// ∫_C f ds
export function integralLineaEscalar(f, r, a, b, n = 400) {
  const rapidez = (t) => Math.hypot(...r(t + 1e-5).map((v, i) => (v - r(t - 1e-5)[i]) / 2e-5));
  return simpson((t) => f(...r(t)) * rapidez(t), a, b, n);
}

export const divergencia = (campo, p) => campo.reduce((s, Fi, i) => s + parcial(Fi, p, i), 0);

// Rotor 2D (componente k): ∂Q/∂x − ∂P/∂y
export const rotor2D = ([P, Q], p) => parcial(Q, p, 0) - parcial(P, p, 1);

// Jacobiano de (u,v) -> (x(u,v), y(u,v))
export function jacobiano2D(X, Y, u, v) {
  const p = [u, v];
  return parcial(X, p, 0) * parcial(Y, p, 1) - parcial(X, p, 1) * parcial(Y, p, 0);
}

// Niveles "lindos" para curvas de nivel entre min y max.
export function niveles(min, max, cantidad = 10) {
  const paso = (max - min) / cantidad;
  return Array.from({ length: cantidad - 1 }, (_, k) => min + paso * (k + 1));
}

export const redondear = (v, d = 4) => (Number.isFinite(v) ? +v.toFixed(d) : v);

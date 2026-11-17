import { paleta } from './colores.js';

// Plano cartesiano sobre <canvas>. Trabaja en coordenadas matemáticas; la conversión a píxeles queda adentro.
export class Lienzo2D {
  constructor(contenedor, { x = [-4, 4], y = [-4, 4], proporcional = true, etiqueta = 'Gráfico interactivo' } = {}) {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'lienzo';
    this.canvas.setAttribute('role', 'img');
    this.canvas.setAttribute('aria-label', etiqueta);
    contenedor.append(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.rango = { x, y };
    this.proporcional = proporcional;
    this.dibujar = () => {};
    this.obs = new ResizeObserver(() => this.redibujar());
    this.obs.observe(this.canvas);
  }

  // El laboratorio entrega su función de dibujo; el lienzo decide cuándo llamarla (resize, tema).
  alDibujar(fn) {
    this.dibujar = fn;
    this.redibujar();
  }

  redibujar() {
    const r = this.canvas.getBoundingClientRect();
    if (!r.width) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(r.width * dpr);
    this.canvas.height = Math.round(r.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.w = r.width;
    this.h = r.height;
    this.ajustarEscala();
    this.c = paleta();
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.dibujar(this);
  }

  ajustarEscala() {
    let [x0, x1] = this.rango.x, [y0, y1] = this.rango.y;
    if (this.proporcional) {
      // Misma escala en ambos ejes: un círculo se ve círculo.
      const ex = this.w / (x1 - x0), ey = this.h / (y1 - y0);
      if (ex > ey) { const m = (x0 + x1) / 2, a = this.w / ey / 2; x0 = m - a; x1 = m + a; }
      else { const m = (y0 + y1) / 2, a = this.h / ex / 2; y0 = m - a; y1 = m + a; }
    }
    this.v = { x0, x1, y0, y1 };
  }

  px(x) { return ((x - this.v.x0) / (this.v.x1 - this.v.x0)) * this.w; }
  py(y) { return this.h - ((y - this.v.y0) / (this.v.y1 - this.v.y0)) * this.h; }
  mundo(px, py) {
    return [this.v.x0 + (px / this.w) * (this.v.x1 - this.v.x0), this.v.y0 + ((this.h - py) / this.h) * (this.v.y1 - this.v.y0)];
  }

  ejes({ marcas = true } = {}) {
    const { ctx, c, v } = this;
    const paso = pasoLindo((v.x1 - v.x0) / 8), pasoY = this.proporcional ? paso : pasoLindo((v.y1 - v.y0) / 8);
    ctx.lineWidth = 1;
    ctx.strokeStyle = c.cuadricula;
    ctx.beginPath();
    for (let x = Math.ceil(v.x0 / paso) * paso; x <= v.x1; x += paso) { ctx.moveTo(this.px(x), 0); ctx.lineTo(this.px(x), this.h); }
    for (let y = Math.ceil(v.y0 / pasoY) * pasoY; y <= v.y1; y += pasoY) { ctx.moveTo(0, this.py(y)); ctx.lineTo(this.w, this.py(y)); }
    ctx.stroke();
    ctx.strokeStyle = c.tintaSuave;
    ctx.beginPath();
    ctx.moveTo(0, this.py(0)); ctx.lineTo(this.w, this.py(0));
    ctx.moveTo(this.px(0), 0); ctx.lineTo(this.px(0), this.h);
    ctx.stroke();
    if (!marcas) return;
    ctx.fillStyle = c.tintaSuave;
    ctx.font = '11px "Schibsted Grotesk", system-ui, sans-serif';
    ctx.textAlign = 'center';
    for (let x = Math.ceil(v.x0 / paso) * paso; x <= v.x1; x += paso)
      if (Math.abs(x) > 1e-9) ctx.fillText(fmt(x), this.px(x), Math.min(this.h - 4, Math.max(12, this.py(0) + 14)));
    ctx.textAlign = 'right';
    for (let y = Math.ceil(v.y0 / pasoY) * pasoY; y <= v.y1; y += pasoY)
      if (Math.abs(y) > 1e-9) ctx.fillText(fmt(y), Math.max(26, Math.min(this.w - 4, this.px(0) - 5)), this.py(y) + 4);
  }

  trazo(puntos, { color = this.c.tinta, ancho = 2, guiones = null, cerrar = false, relleno = null } = {}) {
    const { ctx } = this;
    ctx.beginPath();
    let abierto = false;
    for (const p of puntos) {
      if (!p || !Number.isFinite(p[0]) || !Number.isFinite(p[1]) || Math.abs(p[1]) > 1e6) { abierto = false; continue; }
      const X = this.px(p[0]), Y = this.py(p[1]);
      abierto ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
      abierto = true;
    }
    if (cerrar) ctx.closePath();
    if (relleno) { ctx.fillStyle = relleno; ctx.fill(); }
    ctx.setLineDash(guiones || []);
    ctx.strokeStyle = color;
    ctx.lineWidth = ancho;
    ctx.lineJoin = 'round';
    ctx.stroke();
    ctx.setLineDash([]);
  }

  funcion(f, opciones) {
    const n = Math.max(200, Math.round(this.w));
    const pts = [];
    for (let k = 0; k <= n; k++) { const x = this.v.x0 + ((this.v.x1 - this.v.x0) * k) / n; pts.push([x, f(x)]); }
    this.trazo(pts, opciones);
  }

  parametrica(r, t0, t1, opciones, n = 400) {
    const pts = [];
    for (let k = 0; k <= n; k++) pts.push(r(t0 + ((t1 - t0) * k) / n));
    this.trazo(pts, opciones);
  }

  punto([x, y], { color = this.c.tinta, radio = 5, texto = null, borde = true } = {}) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.arc(this.px(x), this.py(y), radio, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    if (borde) { ctx.strokeStyle = this.c.papel; ctx.lineWidth = 2; ctx.stroke(); }
    if (texto) this.texto(texto, [x, y], { dx: radio + 4, dy: -radio - 2, color });
  }

  texto(t, [x, y], { color = this.c.tinta, dx = 0, dy = 0, alinear = 'left', tam = 13 } = {}) {
    const { ctx } = this;
    ctx.font = `600 ${tam}px "Schibsted Grotesk", system-ui, sans-serif`;
    ctx.textAlign = alinear;
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.c.papel;
    ctx.strokeText(t, this.px(x) + dx, this.py(y) + dy);
    ctx.fillStyle = color;
    ctx.fillText(t, this.px(x) + dx, this.py(y) + dy);
  }

  // Flecha en coordenadas del mundo, de `desde` a `desde + v`.
  flecha(desde, v, { color = this.c.tinta, ancho = 2, cabeza = 9 } = {}) {
    const { ctx } = this;
    const X0 = this.px(desde[0]), Y0 = this.py(desde[1]);
    const X1 = this.px(desde[0] + v[0]), Y1 = this.py(desde[1] + v[1]);
    const ang = Math.atan2(Y1 - Y0, X1 - X0), largo = Math.hypot(X1 - X0, Y1 - Y0);
    if (largo < 0.5) return;
    const k = Math.min(cabeza, largo * 0.5);
    ctx.strokeStyle = ctx.fillStyle = color;
    ctx.lineWidth = ancho;
    ctx.beginPath(); ctx.moveTo(X0, Y0); ctx.lineTo(X1 - Math.cos(ang) * k * 0.6, Y1 - Math.sin(ang) * k * 0.6); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(X1, Y1);
    ctx.lineTo(X1 - k * Math.cos(ang - 0.42), Y1 - k * Math.sin(ang - 0.42));
    ctx.lineTo(X1 - k * Math.cos(ang + 0.42), Y1 - k * Math.sin(ang + 0.42));
    ctx.closePath(); ctx.fill();
  }

  rect(x0, y0, dx, dy, { relleno, borde, ancho = 1 } = {}) {
    const X = this.px(x0), Y = this.py(y0 + dy), W = this.px(x0 + dx) - X, H = this.py(y0) - Y;
    if (relleno) { this.ctx.fillStyle = relleno; this.ctx.fillRect(X, Y, W, H); }
    if (borde) { this.ctx.strokeStyle = borde; this.ctx.lineWidth = ancho; this.ctx.strokeRect(X, Y, W, H); }
  }

  // Curvas de nivel f(x,y)=c por marching squares.
  contornos(f, valores, { colores, ancho = 1.4, resolucion = 90, salto = Infinity } = {}) {
    const { v } = this;
    const n = resolucion, m = Math.round((resolucion * this.h) / this.w) || n;
    const dx = (v.x1 - v.x0) / n, dy = (v.y1 - v.y0) / m;
    const G = [];
    for (let i = 0; i <= n; i++) { G[i] = []; for (let j = 0; j <= m; j++) G[i][j] = f(v.x0 + i * dx, v.y0 + j * dy); }
    valores.forEach((c, k) => {
      const ctx = this.ctx;
      ctx.beginPath();
      for (let i = 0; i < n; i++)
        for (let j = 0; j < m; j++) {
          const a = G[i][j] - c, b = G[i + 1][j] - c, d = G[i][j + 1] - c, e = G[i + 1][j + 1] - c;
          if (![a, b, d, e].every(Number.isFinite)) continue;
          if (Math.max(a, b, d, e) - Math.min(a, b, d, e) > salto) continue; // discontinuidad (corte de rama), no es curva
          const x = v.x0 + i * dx, y = v.y0 + j * dy;
          const cortes = [];
          if (a * b < 0) cortes.push([x + (dx * a) / (a - b), y]);
          if (b * e < 0) cortes.push([x + dx, y + (dy * b) / (b - e)]);
          if (d * e < 0) cortes.push([x + (dx * d) / (d - e), y + dy]);
          if (a * d < 0) cortes.push([x, y + (dy * a) / (a - d)]);
          for (let q = 0; q + 1 < cortes.length; q += 2) {
            ctx.moveTo(this.px(cortes[q][0]), this.py(cortes[q][1]));
            ctx.lineTo(this.px(cortes[q + 1][0]), this.py(cortes[q + 1][1]));
          }
        }
      ctx.strokeStyle = colores ? colores(k, valores.length) : this.c.deriv;
      ctx.lineWidth = ancho;
      ctx.stroke();
    });
  }

  // Campo de direcciones o vectorial: F(x,y) -> [u,v]
  campo(F, { densidad = 18, color = this.c.tintaSuave, normalizar = true, escala = 0.8 } = {}) {
    const { v } = this;
    const paso = (v.x1 - v.x0) / densidad;
    let maximo = 0;
    const flechas = [];
    for (let x = v.x0 + paso / 2; x < v.x1; x += paso)
      for (let y = v.y0 + paso / 2; y < v.y1; y += paso) {
        const [a, b] = F(x, y);
        if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
        const n = Math.hypot(a, b);
        maximo = Math.max(maximo, n);
        flechas.push([x, y, a, b, n]);
      }
    for (const [x, y, a, b, n] of flechas) {
      if (!n) continue;
      const k = normalizar ? (paso * escala) / n : (paso * escala) / (maximo || 1);
      this.flecha([x - (a * k) / 2, y - (b * k) / 2], [a * k, b * k], { color, ancho: 1.3, cabeza: 6 });
    }
  }

  alPuntero(fn) {
    this.canvas.style.touchAction = 'none'; // en el celular, arrastrar sobre el gráfico mueve el punto y no la página
    this.canvas.style.cursor = 'crosshair';
    const manejar = (e) => {
      const r = this.canvas.getBoundingClientRect();
      fn(this.mundo(e.clientX - r.left, e.clientY - r.top), e);
    };
    this.canvas.addEventListener('pointerdown', (e) => { this.canvas.setPointerCapture(e.pointerId); manejar(e); });
    this.canvas.addEventListener('pointermove', (e) => { if (e.buttons) manejar(e); });
  }

  destruir() {
    this.obs.disconnect();
    this.canvas.remove();
  }
}

function pasoLindo(bruto) {
  const p = 10 ** Math.floor(Math.log10(bruto));
  const r = bruto / p;
  return (r < 1.5 ? 1 : r < 3.5 ? 2 : r < 7.5 ? 5 : 10) * p;
}
const fmt = (v) => (Math.abs(v) >= 1000 || (Math.abs(v) < 0.01 && v) ? v.toExponential(0) : +v.toFixed(2)).toString();

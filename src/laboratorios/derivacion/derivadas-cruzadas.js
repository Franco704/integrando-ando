// Derivadas cruzadas numéricas respetando el orden de los límites: primero la derivada interior (paso δ muy chico),
// después la exterior (paso h). Así se reproduce el contraejemplo de Schwarz en el origen.
const f = (x, y) => (x === 0 && y === 0 ? 0 : (x ** 3 * y - x * y ** 3) / (x * x + y * y));
const g = (x, y) => x * x * Math.sin(y) + Math.exp(x * y) / 3; // suave: Schwarz se cumple

const FUNCIONES = {
  contra: { f, nombre: String.raw`\frac{x^3y-xy^3}{x^2+y^2}`, texto: 'Contraejemplo (TP 6, apl. 2)' },
  suave: { f: g, nombre: String.raw`x^2\operatorname{sen}y+\tfrac13e^{xy}`, texto: 'Función de clase C²' },
};

const DELTA = 1e-7;
const fx = (F, x, y) => (F(x + DELTA, y) - F(x - DELTA, y)) / (2 * DELTA);
const fy = (F, x, y) => (F(x, y + DELTA) - F(x, y - DELTA)) / (2 * DELTA);

export default {
  resumen: String.raw`El teorema de Schwarz dice que $f_{xy}=f_{yx}$ **si las derivadas cruzadas son continuas**. Acá las calculás numéricamente en un punto y ves qué pasa cuando esa hipótesis falla: en el origen, el contraejemplo del TP da $f_{xy}=-1$ y $f_{yx}=1$.`,
  observa: [
    'Lejos del origen las dos cruzadas coinciden para las dos funciones.',
    String.raw`Con el contraejemplo, al acercar el punto a $(0,0)$ las cruzadas se separan: $-1$ y $1$. Las derivadas segundas no son continuas ahí.`,
    'La superficie se ve suave a simple vista: la falla está en las derivadas segundas, no en la forma.',
  ],
  async montar(m) {
    const e = await m.escena({ rango: 2, etiqueta: 'Superficie de la función elegida' });
    let clave = 'contra', x0 = 0, y0 = 0, h = 0.01, sup = null, pt = null;
    m.panel.append(
      m.selector({ etiqueta: 'Función', valor: clave, opciones: Object.entries(FUNCIONES).map(([k, v]) => [k, v.texto]), alCambiar: (v) => { clave = v; superficie(); } }),
      m.deslizador({ etiqueta: 'x₀', min: -1.5, max: 1.5, paso: 0.01, valor: x0, alCambiar: (v) => { x0 = v; calcular(); } }),
      m.deslizador({ etiqueta: 'y₀', min: -1.5, max: 1.5, paso: 0.01, valor: y0, alCambiar: (v) => { y0 = v; calcular(); } }),
      m.deslizador({ etiqueta: 'Paso h de la derivada exterior', min: 0.001, max: 0.3, paso: 0.001, valor: h, formato: (v) => v.toFixed(3), alCambiar: (v) => { h = v; calcular(); } }));

    function superficie() {
      e.quitar(sup);
      sup = e.superficie(FUNCIONES[clave].f, [-2, 2], [-2, 2], { n: 70 });
      calcular();
    }
    function calcular() {
      const F = FUNCIONES[clave].f;
      // f_xy = (f_x)_y : primero x, después y.  f_yx = (f_y)_x.
      const fxy = (fx(F, x0, y0 + h) - fx(F, x0, y0 - h)) / (2 * h);
      const fyx = (fy(F, x0 + h, y0) - fy(F, x0 - h, y0)) / (2 * h);
      e.quitar(pt);
      pt = e.punto([x0, y0, F(x0, y0)], { token: 'integ' });
      m.leer(
        m.tex(`f=${FUNCIONES[clave].nombre}`, { bloque: true }),
        m.dato('f_xy en P₀ (primero x, después y)', fxy.toFixed(4)),
        m.dato('f_yx en P₀ (primero y, después x)', fyx.toFixed(4)),
        m.dato('Diferencia', Math.abs(fxy - fyx).toFixed(4)),
        m.h('p', { class: 'lab__pista' }, Math.abs(fxy - fyx) > 0.05 ? 'Las cruzadas no coinciden: no se cumplen las hipótesis de Schwarz en este punto.' : 'Las cruzadas coinciden, como asegura Schwarz para derivadas continuas.'));
    }
    superficie();
  },
};

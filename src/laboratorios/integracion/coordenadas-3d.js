const { sin, cos, PI } = Math;

export default {
  resumen: String.raw`En **cilíndricas** $(r,\theta,z)$ y **esféricas** $(\rho,\varphi,\theta)$ muchos sólidos son "cajas": basta fijar el rango de cada coordenada. Elegí el sistema y mové los límites; la figura es el sólido $\{a\le\rho\le b,\ 0\le\varphi\le\varphi_1,\ 0\le\theta\le\theta_1\}$ (o su equivalente cilíndrico) y el volumen se calcula con el jacobiano.`,
  observa: [
    String.raw`En esféricas, $\varphi$ se mide desde el eje $z$: $\varphi=\frac\pi4$ es el cono $z=\sqrt{x^2+y^2}$ y $\varphi=\frac\pi2$ es el plano $xy$.`,
    String.raw`El sólido del final de julio 2024 (entre las esferas de radio 2 y 3, dentro del cono) es $2\le\rho\le3$, $0\le\varphi\le\frac\pi4$, $0\le\theta\le2\pi$.`,
    String.raw`El volumen no es "largo × ancho × alto" en las nuevas variables: hay que multiplicar por $r$ o por $\rho^2\operatorname{sen}\varphi$.`,
  ],
  async montar(m) {
    const e = await m.escena({ rango: 3, camara: [1.7, -2.1, 1.3], etiqueta: 'Sólido descripto en coordenadas cilíndricas o esféricas' });
    const p = { sis: 'esf', a: 2, b: 3, ang: PI / 4, th: 2 * PI, h: 2 };
    let objs = [];
    const controles = m.h('div', { class: 'lab__controles' });
    m.panel.append(m.selector({ etiqueta: 'Sistema', valor: p.sis, opciones: [['esf', 'Esféricas (ρ, φ, θ)'], ['cil', 'Cilíndricas (r, θ, z)']], alCambiar: (v) => { p.sis = v; armar(); } }), controles);

    function armar() {
      const esf = p.sis === 'esf';
      controles.replaceChildren(
        m.deslizador({ etiqueta: esf ? 'ρ desde' : 'r desde', min: 0, max: 2.5, paso: 0.05, valor: p.a, alCambiar: (v) => { p.a = Math.min(v, p.b - 0.05); dibujar(); } }),
        m.deslizador({ etiqueta: esf ? 'ρ hasta' : 'r hasta', min: 0.2, max: 3, paso: 0.05, valor: p.b, alCambiar: (v) => { p.b = Math.max(v, p.a + 0.05); dibujar(); } }),
        esf
          ? m.deslizador({ etiqueta: 'φ hasta (desde el eje z)', min: 0.1, max: PI, paso: 0.01, valor: p.ang, formato: (v) => `${(v * 180 / PI).toFixed(0)}°`, alCambiar: (v) => { p.ang = v; dibujar(); } })
          : m.deslizador({ etiqueta: 'z hasta', min: 0.2, max: 3, paso: 0.05, valor: p.h, alCambiar: (v) => { p.h = v; dibujar(); } }),
        m.deslizador({ etiqueta: 'θ hasta', min: 0.2, max: 2 * PI, paso: 0.01, valor: p.th, formato: (v) => `${(v * 180 / PI).toFixed(0)}°`, alCambiar: (v) => { p.th = v; dibujar(); } }));
      dibujar();
    }

    function dibujar() {
      objs.forEach((o) => e.quitar(o));
      const { a, b, ang, th, h } = p, op = { n: 48, opacidad: 0.55 };
      if (p.sis === 'esf') {
        const S = (rho) => (ph, t) => [rho * sin(ph) * cos(t), rho * sin(ph) * sin(t), rho * cos(ph)];
        objs = [
          e.parametrizada(S(b), [0, ang], [0, th], op),
          a > 0.01 ? e.parametrizada(S(a), [0, ang], [0, th], { ...op, colores: ['integ', 'integ'] }) : null,
          e.parametrizada((rho, t) => S(rho)(ang, t), [a, b], [0, th], { ...op, colores: ['acento3', 'acento3'] }),
        ];
        if (th < 2 * PI - 0.01) objs.push(...[0, th].map((t) => e.parametrizada((rho, ph) => S(rho)(ph, t), [a, b], [0, ang], { ...op, colores: ['tintaSuave', 'tintaSuave'] })));
        const V = ((b ** 3 - a ** 3) / 3) * (1 - cos(ang)) * th;
        m.leer(m.tex(String.raw`x=\rho\operatorname{sen}\varphi\cos\theta,\ y=\rho\operatorname{sen}\varphi\operatorname{sen}\theta,\ z=\rho\cos\varphi`, { bloque: true }),
          m.tex(String.raw`V=\int_0^{${th.toFixed(2)}}\!\!\int_0^{${ang.toFixed(2)}}\!\!\int_{${a.toFixed(2)}}^{${b.toFixed(2)}}\rho^2\operatorname{sen}\varphi\,d\rho\,d\varphi\,d\theta`, { bloque: true }),
          m.dato('Volumen', V.toFixed(4)));
      } else {
        const C = (r) => (t, z) => [r * cos(t), r * sin(t), z];
        objs = [
          e.parametrizada(C(b), [0, th], [0, h], op),
          a > 0.01 ? e.parametrizada(C(a), [0, th], [0, h], { ...op, colores: ['integ', 'integ'] }) : null,
          e.parametrizada((r, t) => [r * cos(t), r * sin(t), h], [a, b], [0, th], { ...op, colores: ['acento3', 'acento3'] }),
          e.parametrizada((r, t) => [r * cos(t), r * sin(t), 0], [a, b], [0, th], { ...op, colores: ['acento3', 'acento3'] }),
        ];
        const V = ((b * b - a * a) / 2) * th * h;
        m.leer(m.tex(String.raw`x=r\cos\theta,\ y=r\operatorname{sen}\theta,\ z=z`, { bloque: true }),
          m.tex(String.raw`V=\int_0^{${th.toFixed(2)}}\!\!\int_{${a.toFixed(2)}}^{${b.toFixed(2)}}\!\!\int_0^{${h.toFixed(2)}}r\,dz\,dr\,d\theta`, { bloque: true }),
          m.dato('Volumen', V.toFixed(4)));
      }
      objs = objs.filter(Boolean);
    }
    armar();
  },
};

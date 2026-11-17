import { intentarCompilar } from '../../matematica/expresion.js';
import { niveles } from '../../matematica/calculo.js';

const EJEMPLOS = [
  ['sqrt(4-x^2-y^2)', 'Semiesfera'],
  ['y^2-x^2', 'Silla de montar'],
  ['sqrt(x^2+y^2)', 'Cono'],
  ['x^2/4+y^2/9', 'Paraboloide elíptico'],
  ['sqrt(x^2-y^2-1)', 'Hiperboloide (TP 1, 1 vi)'],
  ['ln(4y-x)', 'Logaritmo (TP 1, 2 d)'],
];

export default {
  resumen: String.raw`Escribí $f(x,y)$ y mirá su gráfica, la superficie $z=f(x,y)$. Donde la función no está definida la superficie queda **vacía**: el agujero es el complemento del dominio. Con el deslizador movés un plano horizontal $z=k$; su corte con la superficie, proyectado al piso, es la curva de nivel $f(x,y)=k$.`,
  observa: [
    'En la semiesfera, las curvas de nivel son circunferencias que se juntan cerca del borde: ahí la superficie es casi vertical.',
    'En el cono las circunferencias quedan equiespaciadas: la pendiente es la misma en todas partes.',
    String.raw`En $\sqrt{x^2-y^2-1}$ el hueco entre las dos hojas es la región $x^2-y^2<1$, que no pertenece al dominio.`,
  ],
  async montar(m) {
    const e = await m.escena({ rango: 3, etiqueta: 'Superficie z = f(x,y) con curvas de nivel' });
    let f = null, texto = EJEMPLOS[0][0], k = 1, objetos = [];
    let rango = { min: 0, max: 1 };

    const campo = m.campoFuncion({ etiqueta: 'f(x, y) =', valor: texto, ayuda: 'Ejemplos: x^2+y^2, sen(x)cos(y), exp(-x^2-y^2), ln(xy)', alCambiar: (t) => cargar(t) });
    const nivel = m.deslizador({ etiqueta: 'Altura del corte k', min: -3, max: 3, paso: 0.05, valor: k, alCambiar: (v) => { k = v; dibujarCorte(); } });
    const ejemplos = m.selector({ etiqueta: 'Funciones del TP', opciones: EJEMPLOS, valor: texto, alCambiar: (v) => campo.fijar(v) });
    m.panel.append(campo, ejemplos, nivel, m.h('p', { class: 'lab__pista' }, 'Arrastrá para girar, pellizcá o usá la rueda para acercar.'));

    let corte = [];
    function cargar(t) {
      const { f: g, error } = intentarCompilar(t, ['x', 'y']);
      if (error) return error;
      f = (x, y) => { const z = g(x, y); return Number.isFinite(z) && Math.abs(z) < 50 ? z : NaN; };
      objetos.forEach((o) => e.quitar(o));
      const sup = e.superficie(f, [-3, 3], [-3, 3], { n: 110, recortarZ: [-3.2, 3.2] });
      rango = { min: Math.max(-3, sup.userData.zmin), max: Math.min(3, sup.userData.zmax) };
      objetos = [sup, e.curvasDeNivel(f, niveles(rango.min, rango.max, 10), { altura: -3, token: 'deriv' })];
      dibujarCorte();
      return null;
    }

    function dibujarCorte() {
      corte.forEach((o) => e.quitar(o));
      corte = [
        e.plano([0, 0, k], [0, 0, 1], { tam: 6, token: 'integ', opacidad: 0.12 }),
        e.curvasDeNivel(f, [k], { sobreSuperficie: true, token: 'integ' }),
        e.curvasDeNivel(f, [k], { altura: -2.99, token: 'integ' }),
      ];
      const fuera = k < rango.min || k > rango.max;
      m.leer(
        m.dato('Valores de z en la ventana', `${rango.min.toFixed(2)} a ${rango.max.toFixed(2)}`),
        m.dato('Curva de nivel', fuera ? `k = ${k.toFixed(2)}: no hay puntos (fuera del rango)` : `f(x, y) = ${k.toFixed(2)}`),
      );
    }

    cargar(texto);
  },
};

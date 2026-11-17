import { h } from '../atomos/h.js';
import { tex } from '../atomos/matematica.js';
import { gradiente, niveles } from '../../matematica/calculo.js';

// Una montaña con dos cumbres: el mismo relieve sirve para derivar (pendiente, plano tangente)
// y para integrar (volumen bajo la superficie). Es el "alpinista" que aparece en los finales.
export const montana = (x, y) =>
  1.5 * Math.exp(-((x - 0.7) ** 2 + (y - 0.4) ** 2) / 1.3) + 0.95 * Math.exp(-((x + 1.2) ** 2 + (y + 0.9) ** 2) / 0.7) - 0.35 * Math.exp(-((x + 0.2) ** 2 + (y + 2) ** 2) / 1.5);

export function portada({ titulo, bajada, acciones }) {
  const lectura = h('p', { class: 'portada__lectura', 'aria-live': 'off' });
  const lienzo = h('div', { class: 'portada__escena' });
  const raiz = h('section', { class: 'portada' },
    h('div', { class: 'portada__texto' },
      h('h1', { class: 'portada__titulo' }, titulo),
      h('p', { class: 'portada__bajada' }, bajada),
      h('div', { class: 'portada__acciones' }, acciones)),
    h('figure', { class: 'portada__figura' }, lienzo,
      h('figcaption', { class: 'portada__pie' }, 'Arrastrá para girar la montaña. Pasá el dedo o el mouse por la ladera: el plano tangente y el gradiente te siguen.', lectura)));

  let escena = null, cancelar = null, vivo = true;
  import('../../graficos/escena3d.js').then(({ Escena3D }) => {
    if (!vivo) return;
    escena = new Escena3D(lienzo, { rango: 3, camara: [1.25, -1.75, 1.05], etiqueta: 'Superficie con forma de montaña, sus curvas de nivel y un plano tangente', ejes: false });
    const sup = escena.superficie(montana, [-3, 3], [-3, 3], { n: 90 });
    escena.curvasDeNivel(montana, niveles(-0.35, 1.6, 12), { altura: -0.6, token: 'deriv' });
    escena.curvasDeNivel(montana, niveles(-0.35, 1.6, 12), { sobreSuperficie: true, token: 'tinta' });
    let marcas = [];
    const mostrar = ([x, y]) => {
      marcas.forEach((o) => escena.quitar(o));
      const z = montana(x, y);
      const [fx, fy] = gradiente(montana, [x, y]);
      marcas = [
        escena.plano([x, y, z], [-fx, -fy, 1], { tam: 1.6, token: 'deriv', opacidad: 0.3 }),
        escena.punto([x, y, z], { token: 'integ', radio: 0.025 }),
        escena.flecha([x, y, -0.6], [fx * 0.6, fy * 0.6, 0], { token: 'integ', grosor: 0.01 }),
        escena.segmento([x, y, -0.6], [x, y, z], { token: 'tintaSuave', opacidad: 0.6 }),
      ];
      lectura.replaceChildren(tex(`\\nabla f(${x.toFixed(2)},\\,${y.toFixed(2)}) = (${fx.toFixed(2)},\\ ${fy.toFixed(2)})`));
    };
    mostrar([0.2, -0.6]);
    const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let t = 0, tocado = false;
    // Sin interacción, el punto recorre la ladera solo; al primer toque se queda con el usuario.
    if (!quieto) escena.alCuadro = () => {
      if (tocado) return;
      t += 0.006;
      mostrar([1.6 * Math.cos(t) - 0.2, 1.3 * Math.sin(1.3 * t) - 0.2]);
    };
    cancelar = escena.alApuntar(sup, (p) => { if (p) { tocado = true; mostrar(p); } });
  });

  raiz.destruir = () => { vivo = false; cancelar?.(); escena?.destruir(); };
  return raiz;
}

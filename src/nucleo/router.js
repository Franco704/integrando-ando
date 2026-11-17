// Router por hash (GitHub Pages no reescribe rutas). Cada ruta es "/modulo/:id" -> vista(params).

export function crearRouter(raiz, rutas, { alCambiar } = {}) {
  const compiladas = rutas.map(({ patron, vista }) => {
    const nombres = [];
    const re = new RegExp('^' + patron.replace(/:(\w+)/g, (_, n) => (nombres.push(n), '([^/]+)')) + '/?$');
    return { re, nombres, vista };
  });
  let desmontar = null;

  function resolver() {
    const camino = decodeURI(location.hash.slice(1) || '/');
    const [ruta, consulta = ''] = camino.split('?');
    for (const { re, nombres, vista } of compiladas) {
      const m = ruta.match(re);
      if (!m) continue;
      const params = Object.fromEntries(nombres.map((n, i) => [n, m[i + 1]]));
      params.consulta = new URLSearchParams(consulta);
      desmontar?.();
      raiz.replaceChildren();
      desmontar = vista(raiz, params) || null;
      alCambiar?.(ruta);
      return;
    }
    location.hash = '#/';
  }

  addEventListener('hashchange', resolver);
  return { iniciar: resolver };
}

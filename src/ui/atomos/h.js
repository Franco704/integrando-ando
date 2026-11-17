// Factoría de elementos: h('button', { class: 'boton', onclick }, 'Texto'). Todo el DOM de la app nace acá,
// con textContent (nunca innerHTML) para que ningún contenido pueda inyectar HTML.
export function h(etiqueta, atributos = {}, ...hijos) {
  const el = document.createElement(etiqueta);
  for (const [k, v] of Object.entries(atributos || {})) {
    if (v == null || v === false) continue;
    if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
    else if (k === 'class') el.className = Array.isArray(v) ? v.filter(Boolean).join(' ') : v;
    else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
    else if (k === 'dataset') Object.assign(el.dataset, v);
    else if (v === true) el.setAttribute(k, '');
    else el.setAttribute(k, v);
  }
  agregar(el, hijos);
  return el;
}

function agregar(el, hijos) {
  for (const hijo of hijos.flat(Infinity)) {
    if (hijo == null || hijo === false) continue;
    el.append(hijo instanceof Node ? hijo : document.createTextNode(String(hijo)));
  }
}

export const svg = (d, { tam = 20, trazo = 1.8, clase = 'icono' } = {}) => {
  const ns = 'http://www.w3.org/2000/svg';
  const s = document.createElementNS(ns, 'svg');
  s.setAttribute('viewBox', '0 0 24 24');
  s.setAttribute('width', tam);
  s.setAttribute('height', tam);
  s.setAttribute('aria-hidden', 'true');
  s.setAttribute('class', clase);
  const p = document.createElementNS(ns, 'path');
  p.setAttribute('d', d);
  p.setAttribute('fill', 'none');
  p.setAttribute('stroke', 'currentColor');
  p.setAttribute('stroke-width', trazo);
  p.setAttribute('stroke-linecap', 'round');
  p.setAttribute('stroke-linejoin', 'round');
  s.append(p);
  return s;
};

export const ICONOS = {
  menu: 'M4 7h16M4 12h16M4 17h16',
  cerrar: 'M6 6l12 12M18 6L6 18',
  sol: 'M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4M12 8a4 4 0 100 8 4 4 0 000-8z',
  luna: 'M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z',
  atras: 'M15 6l-6 6 6 6',
  adelante: 'M9 6l6 6-6 6',
  ok: 'M5 12.5l4.5 4.5L19 7',
  reiniciar: 'M4 12a8 8 0 108-8 8 8 0 00-6 2.7M4 4v4h4',
  integral: 'M15 3c-2.5 0-3 1.5-3 4v10c0 2.5-.5 4-3 4',
  derivada: 'M3 19C8 19 9 5 21 5M14 5h7v7',
  lab: 'M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3',
  examen: 'M7 3h10l2 2v16H5V5zM9 9h6M9 13h6M9 17h3',
  formula: 'M5 5h8M9 5v8a3 3 0 01-3 3M14 12l5 6M19 12l-5 6',
};

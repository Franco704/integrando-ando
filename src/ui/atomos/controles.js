import { h, svg, ICONOS } from './h.js';

let secuencia = 0;
const idUnico = (p) => `${p}-${++secuencia}`;

export const boton = (etiqueta, onclick, { variante = 'secundario', icono = null, ...resto } = {}) =>
  h('button', { type: 'button', class: `boton boton--${variante}`, onclick, ...resto }, icono && svg(ICONOS[icono], { tam: 18 }), etiqueta && h('span', {}, etiqueta));

export const botonIcono = (icono, etiqueta, onclick, resto = {}) =>
  h('button', { type: 'button', class: 'boton-icono', 'aria-label': etiqueta, title: etiqueta, onclick, ...resto }, svg(ICONOS[icono]));

export const chip = (texto, { tono = 'neutro' } = {}) => h('span', { class: `chip chip--${tono}` }, texto);

// Deslizador con su etiqueta y valor visible. Devuelve el contenedor; el valor se lee con .valor
export function deslizador({ etiqueta, min, max, paso = 0.01, valor, formato = (v) => (+v).toFixed(2), alCambiar }) {
  const id = idUnico('d');
  const salida = h('output', { for: id, class: 'deslizador__valor' }, formato(valor));
  const input = h('input', { id, type: 'range', min, max, step: paso, value: valor, class: 'deslizador__rango' });
  const caja = h('div', { class: 'deslizador' }, h('label', { for: id, class: 'deslizador__etiqueta' }, etiqueta), salida, input);
  input.addEventListener('input', () => {
    salida.textContent = formato(+input.value);
    alCambiar?.(+input.value);
  });
  caja.leer = () => +input.value;
  caja.fijar = (v) => { input.value = v; salida.textContent = formato(v); };
  return caja;
}

// Campo de texto para escribir una función; muestra el error de sintaxis debajo.
export function campoFuncion({ etiqueta, valor, alCambiar, ayuda = null }) {
  const id = idUnico('f');
  const error = h('p', { class: 'campo__error', 'aria-live': 'polite' });
  const input = h('input', { id, class: 'campo__entrada', value: valor, spellcheck: 'false', autocomplete: 'off', autocapitalize: 'off', inputmode: 'text' });
  const caja = h('div', { class: 'campo' }, h('label', { for: id, class: 'campo__etiqueta' }, etiqueta), input, ayuda && h('p', { class: 'campo__ayuda' }, ayuda), error);
  let espera;
  input.addEventListener('input', () => {
    clearTimeout(espera);
    espera = setTimeout(() => {
      const msg = alCambiar(input.value);
      error.textContent = msg || '';
      input.toggleAttribute('aria-invalid', !!msg);
    }, 250);
  });
  caja.fijar = (v) => { input.value = v; input.dispatchEvent(new Event('input')); };
  return caja;
}

// Grupo de opciones excluyentes (radio con aspecto de segmentos).
export function selector({ etiqueta, opciones, valor, alCambiar }) {
  const nombre = idUnico('s');
  return h('fieldset', { class: 'selector' },
    h('legend', { class: 'selector__etiqueta' }, etiqueta),
    h('div', { class: 'selector__opciones' },
      opciones.map(([v, texto]) => h('label', { class: 'selector__opcion' },
        h('input', { type: 'radio', name: nombre, value: v, checked: v === valor, onchange: () => alCambiar(v) }),
        h('span', {}, texto)))));
}

// Lee los tokens de color del CSS en el momento de dibujar: así el modo oscuro llega a los gráficos sin duplicar valores.
const nombres = ['papel', 'tinta', 'tinta-suave', 'cuadricula', 'deriv', 'integ', 'ok', 'error', 'acento3', 'superficie-1', 'superficie-2'];

export function paleta(el = document.documentElement) {
  const cs = getComputedStyle(el);
  return Object.fromEntries(nombres.map((n) => [n.replace(/-(\w)/g, (_, c) => c.toUpperCase()), cs.getPropertyValue(`--${n}`).trim() || '#888']));
}

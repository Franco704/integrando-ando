// Registro de laboratorios (Registry + carga perezosa). Para sumar uno nuevo: crear el archivo y agregar una línea.
// Nada más en la app cambia (abierto a extensión, cerrado a modificación).

export const LABORATORIOS = {
  cuadricas: { titulo: 'Galería de cuádricas', eje: 'deriv', carga: () => import('./funciones/cuadricas.js') },
  superficie: { titulo: 'Superficie y curvas de nivel', eje: 'deriv', carga: () => import('./funciones/superficie.js') },
  'limite-caminos': { titulo: 'Límite por caminos', eje: 'deriv', carga: () => import('./funciones/limite-caminos.js') },
  'curva-parametrica': { titulo: 'Velocidad y aceleración sobre una curva', eje: 'deriv', carga: () => import('./funciones/curva-parametrica.js') },
  'corte-parcial': { titulo: 'La derivada parcial como corte', eje: 'deriv', carga: () => import('./derivacion/corte-parcial.js') },
  'derivadas-cruzadas': { titulo: 'Derivadas cruzadas: cuándo fallan', eje: 'deriv', carga: () => import('./derivacion/derivadas-cruzadas.js') },
  'regla-cadena': { titulo: 'Regla de la cadena sobre un camino', eje: 'deriv', carga: () => import('./derivacion/regla-cadena.js') },
  implicita: { titulo: 'Derivada de una función implícita', eje: 'deriv', carga: () => import('./derivacion/implicita.js') },
  gradiente: { titulo: 'Gradiente y derivada direccional', eje: 'deriv', carga: () => import('./derivacion/gradiente.js') },
  'plano-tangente': { titulo: 'Plano tangente y recta normal', eje: 'deriv', carga: () => import('./derivacion/plano-tangente.js') },
  diferencial: { titulo: 'Incremento contra diferencial', eje: 'deriv', carga: () => import('./derivacion/diferencial.js') },
  extremos: { titulo: 'Puntos críticos y hessiano', eje: 'deriv', carga: () => import('./derivacion/extremos.js') },
  lagrange: { titulo: 'Multiplicadores de Lagrange', eje: 'deriv', carga: () => import('./derivacion/lagrange.js') },
  'riemann-doble': { titulo: 'Sumas de Riemann en 3D', eje: 'integ', carga: () => import('./integracion/riemann-doble.js') },
  'orden-integracion': { titulo: 'Cambiar el orden de integración', eje: 'integ', carga: () => import('./integracion/orden-integracion.js') },
  'region-triple': { titulo: 'Sólidos y sumas triples', eje: 'integ', carga: () => import('./integracion/region-triple.js') },
  'cambio-variables': { titulo: 'Transformaciones y jacobiano', eje: 'integ', carga: () => import('./integracion/cambio-variables.js') },
  'coordenadas-3d': { titulo: 'Coordenadas cilíndricas y esféricas', eje: 'integ', carga: () => import('./integracion/coordenadas-3d.js') },
  'centro-masa': { titulo: 'Masa y centro de masa de una lámina', eje: 'integ', carga: () => import('./integracion/centro-masa.js') },
  'campo-vectorial': { titulo: 'Divergencia y rotor de un campo', eje: 'integ', carga: () => import('./campos/campo-vectorial.js') },
  'integral-linea': { titulo: 'Trabajo a lo largo de una curva', eje: 'integ', carga: () => import('./campos/integral-linea.js') },
  'integral-superficie': { titulo: 'Área de una superficie', eje: 'integ', carga: () => import('./campos/integral-superficie.js') },
  'campo-direcciones': { titulo: 'Campo de direcciones de una EDO', eje: 'integ', carga: () => import('./ecuaciones/campo-direcciones.js') },
  trayectorias: { titulo: 'Trayectorias ortogonales', eje: 'integ', carga: () => import('./ecuaciones/trayectorias.js') },
};

export async function cargarLaboratorio(id) {
  const meta = LABORATORIOS[id];
  if (!meta) return null;
  const lab = (await meta.carga()).default;
  return { id, titulo: meta.titulo, eje: meta.eje, ...lab };
}

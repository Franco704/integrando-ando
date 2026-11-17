// Estado del estudiante (Observer). Persiste en localStorage; si el navegador lo bloquea, sigue en memoria.

const CLAVE = 'integrando-ando:v1';
const INICIAL = { modo: 'cursada', tema: 'auto', leidos: {}, labs: {}, respuestas: {} };

export function crearAlmacen(storage = globalThis.localStorage) {
  let estado = { ...INICIAL };
  try {
    estado = { ...INICIAL, ...JSON.parse(storage?.getItem(CLAVE) || '{}') };
  } catch { /* storage vacío o bloqueado: arrancamos de cero */ }
  const oyentes = new Set();

  return {
    leer: () => estado,
    actualizar(cambio) {
      estado = { ...estado, ...(typeof cambio === 'function' ? cambio(estado) : cambio) };
      try {
        storage?.setItem(CLAVE, JSON.stringify(estado));
      } catch { /* sin persistencia, no es crítico */ }
      oyentes.forEach((fn) => fn(estado));
    },
    suscribir(fn) {
      oyentes.add(fn);
      return () => oyentes.delete(fn);
    },
  };
}

// Casos de uso del progreso: viven acá para que las vistas no conozcan la forma del estado.
export const progreso = {
  marcarLeido: (a, id) => a.actualizar((s) => ({ leidos: { ...s.leidos, [id]: true } })),
  marcarLab: (a, id) => a.actualizar((s) => ({ labs: { ...s.labs, [id]: true } })),
  responder: (a, id, ok) => a.actualizar((s) => ({ respuestas: { ...s.respuestas, [id]: { ok, t: Date.now() } } })),
  falladas: (s) => Object.entries(s.respuestas).filter(([, r]) => !r.ok).map(([id]) => id),
};

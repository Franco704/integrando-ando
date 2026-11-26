// Mapa de la materia. Los metadatos viven acá (livianos) y el contenido de cada módulo se carga al entrar.

export const PARCIALES = [
  {
    n: 1, eje: 'deriv', titulo: 'Primer parcial', tema: 'Derivación',
    descripcion: 'Funciones de varias variables, límites, cálculo vectorial, derivadas parciales y sus aplicaciones, diferenciales, máximos y mínimos.',
    fecha: 'jueves 2 de julio de 2026',
  },
  {
    n: 2, eje: 'integ', titulo: 'Segundo parcial', tema: 'Integración',
    descripcion: 'Integrales dobles y triples, cambio de variables, aplicaciones físicas, campos vectoriales, integrales de línea y de superficie, ecuaciones diferenciales.',
    fecha: 'jueves 19 de noviembre de 2026',
  },
];

export const UNIDADES = {
  0: 'Repaso: recta, plano y cuádricas',
  1: 'Funciones de varias variables. Límites y continuidad',
  2: 'Cálculo vectorial',
  3: 'Derivación parcial y aplicaciones geométricas',
  4: 'Diferenciales',
  5: 'Máximos y mínimos',
  6: 'Integrales múltiples',
  7: 'Campos vectoriales. Integrales de línea y de superficie',
  8: 'Ecuaciones diferenciales ordinarias',
};

// id = mNN: es la ruta (#/modulo/m09) y la clave del progreso guardado, así que no cambia; archivo = el tema
const ARCHIVOS = { "m00": "recta-plano-y-cuadricas", "m01": "funciones-de-varias-variables", "m02": "limites", "m03": "continuidad", "m04": "calculo-vectorial", "m05": "derivadas-parciales", "m06": "derivadas-de-orden-superior", "m07": "funciones-compuestas-y-homogeneas", "m08": "funciones-implicitas", "m09": "derivada-direccional-y-gradiente", "m10": "aplicaciones-geometricas", "m11": "diferenciales", "m12": "maximos-y-minimos", "m13": "integrales-dobles", "m14": "integrales-triples", "m15": "cambio-de-variables-en-integrales-dobles", "m16": "cambio-de-variables-en-integrales-triples", "m17": "aplicaciones-de-las-integrales-dobles", "m18": "aplicaciones-de-las-integrales-triples", "m19": "campos-escalares-y-vectoriales", "m20": "integrales-de-linea", "m21": "integrales-de-superficie", "m22": "ecuaciones-diferenciales-de-primer-orden", "m23": "lineales-bernoulli-y-trayectorias-ortogonales" };
const m = (tp, parcial, unidad, titulo, resumen, labs = []) => { const id = `m${String(tp).padStart(2, '0')}`; return { id, archivo: ARCHIVOS[id], tp, parcial, unidad, titulo, resumen, labs }; };

export const MODULOS = [
  m(0, 1, 0, 'Recta, plano y cuádricas', 'El vocabulario geométrico de todo el año', ['cuadricas']),
  m(1, 1, 1, 'Funciones de varias variables', 'Dominio, rango, superficies y curvas de nivel', ['superficie']),
  m(2, 1, 1, 'Límites', 'Límites dobles, sucesivos y por caminos', ['limite-caminos']),
  m(3, 1, 1, 'Continuidad', 'Las tres condiciones y cómo romperlas', ['limite-caminos']),
  m(4, 1, 2, 'Cálculo vectorial', 'Curvas paramétricas, velocidad, aceleración y longitud de arco', ['curva-parametrica']),
  m(5, 1, 3, 'Derivadas parciales', 'La pendiente en la dirección de un eje', ['corte-parcial']),
  m(6, 1, 3, 'Derivadas de orden superior', 'Derivadas cruzadas y el teorema de Schwarz', ['derivadas-cruzadas']),
  m(7, 1, 3, 'Funciones compuestas y homogéneas', 'Regla de la cadena y teorema de Euler', ['regla-cadena']),
  m(8, 1, 3, 'Funciones implícitas', 'Derivar sin despejar', ['implicita']),
  m(9, 1, 3, 'Derivada direccional y gradiente', 'Hacia dónde sube más rápido', ['gradiente']),
  m(10, 1, 3, 'Aplicaciones geométricas', 'Plano tangente, recta normal y curvas en el espacio', ['plano-tangente']),
  m(11, 1, 4, 'Diferenciales', 'Diferenciabilidad, aproximación lineal y errores', ['diferencial']),
  m(12, 1, 5, 'Máximos y mínimos', 'Hessiano, extremos absolutos y Lagrange', ['extremos', 'lagrange']),
  m(13, 2, 6, 'Integrales dobles', 'Volumen bajo una superficie y orden de integración', ['riemann-doble', 'orden-integracion']),
  m(14, 2, 6, 'Integrales triples', 'Integrar sobre sólidos', ['region-triple']),
  m(15, 2, 6, 'Cambio de variables en integrales dobles', 'Jacobiano y coordenadas polares', ['cambio-variables']),
  m(16, 2, 6, 'Cambio de variables en integrales triples', 'Coordenadas cilíndricas y esféricas', ['coordenadas-3d']),
  m(17, 2, 6, 'Aplicaciones de las integrales dobles', 'Área, masa, centro de masa e inercia de láminas', ['centro-masa']),
  m(18, 2, 6, 'Aplicaciones de las integrales triples', 'Volumen, masa, centro de masa e inercia de sólidos', ['region-triple']),
  m(19, 2, 7, 'Campos escalares y vectoriales', 'Gradiente, divergencia, rotor y campos conservativos', ['campo-vectorial']),
  m(20, 2, 7, 'Integrales de línea', 'Masa de alambres, trabajo y teorema de Green', ['integral-linea']),
  m(21, 2, 7, 'Integrales de superficie', 'Área de superficies y flujo', ['integral-superficie']),
  m(22, 2, 8, 'Ecuaciones diferenciales de primer orden', 'Separables, homogéneas y exactas', ['campo-direcciones']),
  m(23, 2, 8, 'Lineales, Bernoulli y trayectorias ortogonales', 'Factor integrante y familias de curvas', ['trayectorias']),
];

export const moduloPorId = (id) => MODULOS.find((x) => x.id === id);
export const modulosDe = (parcial) => MODULOS.filter((x) => x.parcial === parcial);

// Carga perezosa del contenido (Virtual Proxy): el primer parcial no descarga el texto del segundo.
export async function cargarModulo(id) {
  const meta = moduloPorId(id);
  if (!meta) return null;
  const carpeta = meta.parcial === 1 ? 'primer-parcial' : 'segundo-parcial';
  const contenido = (await import(`./${carpeta}/${meta.archivo}.js`)).default;
  return { ...meta, ...contenido };
}

# Integrando Ando

Guía de estudio de **Análisis Matemático II (UTN-FRT, 2026)**, armada con la teoría de la cátedra, los 24 trabajos prácticos, las resoluciones de clase y los finales tomados desde 2024. Sirve para la cursada (por parcial y por TP) y para preparar el final.

- **Primer parcial (derivación):** TP 0 a 12. Repaso de recta, plano y cuádricas; funciones de varias variables, límites, continuidad, cálculo vectorial, derivadas parciales, cadena, implícitas, gradiente, aplicaciones geométricas, diferenciales, máximos y mínimos con Lagrange.
- **Segundo parcial (integración):** TP 13 a 23. Integrales dobles y triples, cambio de variables (polares, cilíndricas, esféricas), masa y centro de masa, campos vectoriales, integrales de línea y de superficie, ecuaciones diferenciales de primer orden.
- **24 laboratorios** interactivos, 13 de ellos en 3D: superficies y curvas de nivel, límite por caminos, plano tangente, gradiente, incremento contra diferencial, hessiano, Lagrange, sumas de Riemann con prismas, sólidos con vóxeles, transformaciones y jacobiano, campos con divergencia y rotor, trabajo sobre una curva, área de superficies, campos de direcciones y trayectorias ortogonales.
- **Modo final:** los 10 finales recopilados (2024-2025), resueltos ítem por ítem; ranking de los temas que más se toman; simulacro con la estructura del examen (derivación, integración y ecuaciones, con teoría en cada bloque).
- **Modelos de segundo parcial:** los 16 temas de la cátedra, con resolución de los temas 1, 2, 5 y 6.
- Teoría, ejercicios resueltos paso a paso, autoevaluación con explicación, simulacro por parcial, repaso de falladas y hoja de fórmulas.

Las cuentas de las resoluciones se verificaron numéricamente con el mismo motor que usan los laboratorios. Donde una resolución de clase tiene un error de signo, la guía lo señala y da la versión corregida (TP 9, ej. 1 b; TP 15, ej. 6; TP 23, ej. 2 b).

Sitio en GitHub Pages: [franco704.github.io/integrando-ando](https://franco704.github.io/integrando-ando/)

## Cómo está hecha

HTML, CSS y JavaScript con módulos ES, sin build. Como los navegadores no cargan módulos desde `file://`, para verla en tu compu levantá un servidor estático en la carpeta (por ejemplo `python3 -m http.server`) y abrí `http://localhost:8000`. Three.js y KaTeX se cargan desde jsDelivr con versión fija. El progreso se guarda en el navegador (clave `integrando-ando:v1`). Los módulos se identifican por su TP (`#/modulo/m09`): esos ids son las rutas y las claves del progreso, así que no cambian aunque cambie el nombre del archivo.

```
src/
  main.js            raíz de composición: conecta almacén, router y vistas
  nucleo/            router por hash y almacén observable del progreso
  matematica/        parser de expresiones (sin eval) y cálculo numérico
  graficos/          Lienzo2D (canvas) y Escena3D (fachada sobre Three.js)
  ui/atomos|moleculas|organismos/   componentes en atomic design
  temario/           índice de la materia y un archivo por tema, separados por parcial (primer-parcial/, segundo-parcial/)
  laboratorios/      un archivo por laboratorio, agrupados por tema, más su registro
  examenes/          finales resueltos, ranking de temas y modelos de segundo parcial
  estudio/           hoja de fórmulas y otras guías
  vistas/            páginas: inicio, módulo, laboratorios, finales, simulacros, fórmulas
styles/              tokens, base y una hoja por nivel de atomic design
```

El diseño es *mobile-first*: en el celular todo se alcanza desde el dock inferior (Inicio, Índice, Labs, Simulacro, Repasar) y el cajón, con el buscador, todas las herramientas y el índice de los dos parciales; desde 1024 px el índice queda fijo al costado y las herramientas pasan a la barra superior, y desde 1280 px el índice de secciones de cada módulo queda fijo a la derecha y marca la sección que se está leyendo. La portada abre con la montaña en 3D: el plano tangente y el gradiente se calculan en vivo con `src/matematica/`. Tipografía: Bricolage Grotesque para títulos e interfaz, Literata para la teoría y KaTeX para las fórmulas.

Para sumar un laboratorio: crear el archivo con `{ resumen, observa, montar(m) }` y agregar una línea en `src/laboratorios/indice.js`. El marco común (`ui/organismos/laboratorio.js`) arma la estructura y libera los gráficos al salir.

## Pruebas

```
npm test
```

`tests/matematica.test.js` prueba el parser y el cálculo numérico contra resultados de los TP y los finales. `tests/contenido.test.js` revisa que cada módulo tenga teoría, ejercicios y preguntas, que todas las referencias a laboratorios y módulos existan, y que ninguna fórmula quede abierta.

## También probá

### 2.º año

- [Operando Ando](https://franco704.github.io/operando-ando/): Sistemas Operativos ([repositorio](https://github.com/Franco704/operando-ando))
- [Induciendo Ando](https://franco704.github.io/induciendo-ando/): Física II ([repositorio](https://github.com/Franco704/induciendo-ando))

### 3.er año

- [Consultando Ando](https://franco704.github.io/consultando-ando/): Gestión de Datos ([repositorio](https://github.com/Franco704/consultando-ando))
- [Backeando Ando](https://franco704.github.io/backeando-ando/): Desarrollo de Software, backend ([repositorio](https://github.com/Franco704/backeando-ando))
- [Fronteando Ando](https://franco704.github.io/fronteando-ando/): Desarrollo de Software, frontend ([repositorio](https://github.com/Franco704/fronteando-ando))
- [Diseñando Ando](https://franco704.github.io/disenando-ando/): Diseño de Sistemas de Información ([repositorio](https://github.com/Franco704/disenando-ando))
- [Iterando Ando](https://franco704.github.io/iterando-ando/): Matemática Superior ([repositorio](https://github.com/Franco704/iterando-ando))
- [Modulando Ando](https://franco704.github.io/modulando-ando/): Comunicación de Datos ([repositorio](https://github.com/Franco704/modulando-ando))
- [Probando Ando](https://franco704.github.io/probando-ando/): Probabilidad y Estadística ([repositorio](https://github.com/Franco704/probando-ando))
- [Economizando Ando](https://franco704.github.io/economizando-ando/): Economía ([repositorio](https://github.com/Franco704/economizando-ando))

const r = String.raw;

export default {
  intro: r`Continuidad es que el límite y el valor coincidan. Con la técnica de límites del TP 2 ya tenés casi todo; lo nuevo es clasificar la discontinuidad y decidir si se puede "arreglar" redefiniendo la función en un punto.`,
  teoria: [
    {
      id: 'definicion', titulo: 'Las tres condiciones',
      texto: r`$f$ es **continua en** $P_0$ si:

1. $f(P_0)$ existe ($P_0$ está en el dominio).
2. $\lim_{P\to P_0}f(P)$ existe.
3. $\lim_{P\to P_0}f(P)=f(P_0)$.

Con $\varepsilon$ y $\delta$: $\forall\varepsilon>0\ \exists\delta>0:\ d(P,P_0)<\delta\Rightarrow|f(P)-f(P_0)|<\varepsilon$ (ahora sin el "$0<$": el punto se incluye). $f$ es continua en una región si lo es en cada punto de ella.`,
    },
    {
      id: 'tipos', titulo: 'Tipos de discontinuidad',
      texto: r`- **Evitable:** el límite existe pero $f(P_0)$ no existe o es distinto del límite. Se **redefine** $f(P_0)=\lim f$ y la función queda continua.
- **Esencial (no evitable):** el límite no existe. Ninguna redefinición la arregla.

> En las funciones por partes hay que mirar dos cosas: el punto especial (comparar límite con valor) y las **fronteras** entre las regiones, donde las fórmulas pueden no empalmar (salto).

Ejemplo: $g=x^2+4y^2$ si $x^2+4y^2\le5$, $g=3$ si $x^2+4y^2>5$. Por dentro, sobre la elipse, $g\to5$; por fuera $g=3$. Es discontinua en todos los puntos de la elipse $x^2+4y^2=5$ y continua en el resto.`,
    },
    {
      id: 'propiedades', titulo: 'Propiedades de las funciones continuas',
      texto: r`**Teorema.** Si $f$ y $g$ son continuas en $P_0$, entonces también lo son:

1. $f\pm g$.
2. $f\cdot g$ (en particular $k\,f$).
3. $\frac fg$, si $g(P_0)\neq0$.
4. $h\circ f$, si $h$ es una función de una variable continua en $f(P_0)$.

**Demostración (producto).** Por hipótesis $\lim f=f(P_0)$ y $\lim g=g(P_0)$. Por la propiedad del límite de un producto, $\lim(f\cdot g)=f(P_0)\,g(P_0)=(f\cdot g)(P_0)$: se cumplen las tres condiciones. Las demás se prueban igual con la propiedad de límite correspondiente.

Consecuencia: los polinomios en $x,y$ son continuos en todo $\mathbb R^2$; las racionales, donde el denominador no se anula; $e^{u}$, $\operatorname{sen}u$, $\cos u$ compuestas con continuas, en todo su dominio; $\ln u$ y $\sqrt u$, donde $u>0$ (o $u\ge0$). En esos puntos el límite se calcula por **sustitución directa**.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 3, ej. 1 e',
      enunciado: r`Estudie la continuidad en el origen de $f(x,y)=\begin{cases}\operatorname{arctg}(1+xy)&(x,y)\neq(0,0)\\ \frac{e^{x+y}-e^{x-y}}{2}&(x,y)=(0,0)\end{cases}$. Si es discontinua, clasifique y redefina.`,
      pasos: [
        r`**Valor:** $f(0,0)=\frac{e^0-e^0}{2}=0$.`,
        r`**Límite:** $\operatorname{arctg}(1+xy)$ es composición de continuas: $\lim=\operatorname{arctg}(1)=\frac\pi4$.`,
        r`El límite existe pero es distinto del valor: discontinuidad **evitable**. Se redefine $f(0,0)=\frac\pi4$.`,
      ],
      respuesta: r`Evitable; redefinir $f(0,0)=\pi/4$.`,
    },
    {
      fuente: 'TP 3, ej. 1 g',
      enunciado: r`Estudie la continuidad en el origen de $h(x,y,z)=\sqrt{x^2+y^2+z^2}+2^{xy}$ si $(x,y,z)\neq\vec0$, $h(0,0,0)=\ln(x^2+z^2+2)$ evaluado en el origen.`,
      pasos: [
        r`$h(0,0,0)=\ln2\approx0{,}693$.`,
        r`$\lim h=\sqrt0+2^0=1$ (suma y composición de continuas).`,
        r`$1\neq\ln2$: **evitable**. Redefinir $h(0,0,0)=1$.`,
      ],
    },
    {
      fuente: 'TP 3, ej. 2 c',
      enunciado: r`Estudie la continuidad de $f(x,y)=\frac{x\operatorname{sen}(4y-1)}{16y^2-1}$ en $\left(9,\frac14\right)$.`,
      pasos: [
        r`En $y=\frac14$ el denominador se anula: $f(9,\frac14)$ **no existe**. Ya es discontinua; falta ver de qué tipo.`,
        r`$16y^2-1=(4y-1)(4y+1)$, así que $f=x\cdot\frac{\operatorname{sen}(4y-1)}{4y-1}\cdot\frac{1}{4y+1}$.`,
        r`Con $u=4y-1\to0$, $\frac{\operatorname{sen}u}{u}\to1$. Entonces $\lim f=9\cdot1\cdot\frac12=\frac92$.`,
        r`El límite existe: discontinuidad **evitable**, se redefine $f(9,\frac14)=\frac92$.`,
      ],
    },
    {
      fuente: 'TP 3, ej. 2 g',
      enunciado: r`Estudie la continuidad de $h(x,y,z)=\operatorname{arctg}(xy^2z)+\ln(x^2+z^2)$ si $(x,y,z)\neq\left(0,\frac\pi2,\sqrt e\right)$ y $h=\operatorname{sen}(x+y)$ en ese punto.`,
      pasos: [
        r`Valor: $\operatorname{sen}\left(0+\frac\pi2\right)=1$.`,
        r`Límite (continuas, $x^2+z^2=e>0$): $\operatorname{arctg}(0)+\ln(0+e)=0+1=1$.`,
        r`Límite igual al valor: **continua** en el punto.`,
      ],
    },
    {
      fuente: 'TP 3, ej. 3 c y g',
      enunciado: r`Determine dónde son continuas: c) $f=\frac{x}{\sqrt[3]{9x^2+4y^2-1}}$; g) $f=\frac{\operatorname{tg}(x^2y)}{x^2y}$ si $x^2y\neq0$, $f=1$ si $x^2y=0$.`,
      pasos: [
        r`**c)** La raíz cúbica es continua siempre; solo molesta el denominador nulo: $9x^2+4y^2=1$. Continua en $\mathbb R^2$ menos la elipse $\frac{x^2}{1/9}+\frac{y^2}{1/4}=1$.`,
        r`**g)** Donde $x^2y\neq0$ es cociente de continuas, salvo donde $\operatorname{tg}$ no existe: $x^2y=\frac\pi2+k\pi$.`,
        r`Sobre los ejes ($x^2y=0$): con $u=x^2y\to0$, $\frac{\operatorname{tg}u}{u}\to1=f$. Continua ahí.`,
        r`Conclusión: continua en todo $\mathbb R^2$ salvo las curvas $x^2y=\frac\pi2+k\pi$.`,
      ],
    },
    {
      fuente: 'TP 3, ej. 4 iii 2',
      enunciado: r`Estudie la continuidad de $f(x,y)=\frac{\sqrt x-\sqrt3}{y-2}$ en $(3,2)$.`,
      pasos: [
        r`$f(3,2)$ no existe (denominador nulo).`,
        r`Por $x=3$ (con $y\neq2$): $f=0$. Por las rectas $y-2=m(x-3)$: $\frac{\sqrt x-\sqrt3}{m(x-3)}=\frac{1}{m(\sqrt x+\sqrt3)}\to\frac{1}{2\sqrt3\,m}$, que depende de $m$.`,
        r`El límite no existe: discontinuidad **esencial**.`,
      ],
    },
    {
      fuente: 'TP 3, ej. 6 a',
      enunciado: r`¿Dónde es continua $f(x,y,z)=xyz+\ln(x^2+1)$ si $(x,y,z)\neq\vec0$, $f(\vec0)=100$?`,
      pasos: [
        r`Fuera del origen es suma de continuas ($x^2+1>0$ siempre): continua.`,
        r`En el origen: $\lim f=0+\ln1=0\neq100$. Discontinuidad **evitable**.`,
      ],
      respuesta: r`Continua en $\mathbb R^3\setminus\{\vec0\}$.`,
    },
  ],
  preguntas: [
    {
      id: 'm03-q1', p: r`Si $\lim_{P\to P_0}f$ existe pero $f(P_0)$ no está definido, la discontinuidad es:`,
      opciones: ['Esencial', 'Evitable', 'De salto', 'No hay discontinuidad'],
      ok: 1, por: r`Alcanza con definir $f(P_0)$ igual al límite.`,
    },
    {
      id: 'm03-q2', p: r`$f(x,y)=\frac{xy}{x^2+y^2}$ con $f(0,0)=0$ en el origen es:`,
      opciones: ['Continua', 'Discontinua evitable', 'Discontinua esencial', 'No se puede saber'],
      ok: 2, por: r`El límite no existe (depende de la pendiente $m$): no hay valor que la arregle.`,
    },
    {
      id: 'm03-q3', p: r`¿Cuál de estas condiciones **no** es necesaria para la continuidad en $P_0$?`,
      opciones: ['Que exista f(P₀)', 'Que exista el límite en P₀', 'Que el límite valga f(P₀)', 'Que existan las derivadas parciales en P₀'],
      ok: 3, por: r`La continuidad no pide derivadas. (Al revés tampoco: tener derivadas parciales no garantiza continuidad, lo vas a ver en el TP 5.)`,
    },
    {
      id: 'm03-q4', p: r`El cociente $f/g$ de dos funciones continuas en $P_0$ es continuo en $P_0$…`,
      opciones: ['siempre', 'si g(P₀) ≠ 0', 'si f(P₀) ≠ 0', 'nunca'],
      ok: 1, por: r`Es la única hipótesis extra del teorema de propiedades.`,
    },
  ],
};

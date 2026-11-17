const r = String.raw;

export default {
  intro: r`Una **función vectorial** recibe un número $t$ (el tiempo) y devuelve un vector: la posición de una partícula. Todo lo que sabías de funciones de una variable (límite, continuidad, derivada, integral) se aplica componente a componente. Lo nuevo es la geometría: la derivada es la velocidad, tangente a la trayectoria.`,
  teoria: [
    {
      id: 'definicion', titulo: 'Funciones vectoriales',
      texto: r`En el plano: $\vec r(t)=f(t)\,\vec i+g(t)\,\vec j$. En el espacio: $\vec r(t)=f(t)\,\vec i+g(t)\,\vec j+h(t)\,\vec k$. Las $f,g,h$ son funciones reales llamadas **componentes**.

- **Dominio:** la intersección de los dominios de las componentes.
- **Gráfica:** la curva que dibuja el extremo de $\vec r(t)$ cuando $t$ recorre el dominio, con un **sentido** (el de $t$ creciente). Eliminando $t$ se obtiene la ecuación cartesiana: $\vec r=t\,\vec i-t^2\,\vec j$ es la parábola $y=-x^2$.`,
    },
    {
      id: 'limite', titulo: 'Límite y continuidad',
      texto: r`$\lim_{t\to a}\vec r(t)=\Big(\lim_{t\to a}f(t)\Big)\vec i+\Big(\lim_{t\to a}g(t)\Big)\vec j+\Big(\lim_{t\to a}h(t)\Big)\vec k$, siempre que existan los tres límites.

**Propiedades** (con $\lim\vec u=\vec A$, $\lim\vec v=\vec B$, $\lim\varphi=c$): el límite de $\vec u\pm\vec v$ es $\vec A\pm\vec B$; el de $\varphi\,\vec u$ es $c\vec A$; el de $\vec u\cdot\vec v$ es $\vec A\cdot\vec B$; el de $\vec u\times\vec v$ es $\vec A\times\vec B$.

*Demostración del producto escalar* (la pidieron en el final de marzo 2025): $\vec u\cdot\vec v=u_1v_1+u_2v_2$ es una función real; por las propiedades del límite de sumas y productos de funciones reales, su límite es $A_1B_1+A_2B_2=\vec A\cdot\vec B$.

$\vec r$ es **continua** en $t=a$ si $\vec r(a)$ existe y $\lim_{t\to a}\vec r(t)=\vec r(a)$; equivale a que cada componente sea continua en $a$.`,
    },
    {
      id: 'derivada', titulo: 'Derivada y su interpretación',
      texto: r`$$\vec r\,{}'(t)=\lim_{\Delta t\to0}\frac{\vec r(t+\Delta t)-\vec r(t)}{\Delta t}=f'(t)\,\vec i+g'(t)\,\vec j+h'(t)\,\vec k$$

La fórmula sale de aplicar la definición de límite componente a componente: el cociente incremental vectorial tiene por componentes los cocientes incrementales de $f$, $g$ y $h$.

**Interpretación geométrica.** $\vec r(t+\Delta t)-\vec r(t)$ es un vector secante a la curva; al dividirlo por $\Delta t$ y tomar el límite queda un vector **tangente** a la curva en $\vec r(t)$, que apunta en el sentido de recorrido. La curva es **suave** si $\vec r\,{}'$ es continua y nunca nula.

**Propiedades:** $(\vec u\pm\vec v)'=\vec u\,{}'\pm\vec v\,{}'$; $(\varphi\vec u)'=\varphi'\vec u+\varphi\vec u\,{}'$; $(\vec u\cdot\vec v)'=\vec u\,{}'\cdot\vec v+\vec u\cdot\vec v\,{}'$; $(\vec u\times\vec v)'=\vec u\,{}'\times\vec v+\vec u\times\vec v\,{}'$. Si $|\vec r(t)|$ es constante, $\vec r\cdot\vec r\,{}'=0$.`,
    },
    {
      id: 'movimiento', titulo: 'Velocidad, aceleración y rapidez',
      texto: r`Si $\vec r(t)$ es la posición de una partícula:

- **Velocidad:** $\vec v(t)=\vec r\,{}'(t)$.
- **Rapidez:** $|\vec v(t)|$, un escalar.
- **Aceleración:** $\vec a(t)=\vec r\,{}''(t)$.

**Vector tangente unitario:** $\vec T=\dfrac{\vec r\,{}'}{|\vec r\,{}'|}$. **Normal principal:** $\vec N=\dfrac{\vec T\,{}'}{|\vec T\,{}'|}$, perpendicular a $\vec T$ y hacia el lado donde dobla la curva. **Curvatura:** $K=\dfrac{|\vec T\,{}'(t)|}{|\vec r\,{}'(t)|}$; en el plano también $K=\dfrac{|x'y''-y'x''|}{(x'^2+y'^2)^{3/2}}$.`,
    },
    {
      id: 'integral', titulo: 'Integral y longitud de arco',
      texto: r`La **integral indefinida** se calcula componente a componente y lleva un **vector** constante: $\int\vec r\,dt=\left(\int f\right)\vec i+\left(\int g\right)\vec j+\left(\int h\right)\vec k+\vec C$.

**Teorema fundamental:** si $\vec R\,{}'=\vec r$, entonces $\int_a^b\vec r(t)\,dt=\vec R(b)-\vec R(a)$.

Así se reconstruye el movimiento: de $\vec a$ se integra $\vec v$ (usando $\vec v(0)$) y de $\vec v$ se integra $\vec r$ (usando $\vec r(0)$).

**Longitud de arco** de una curva suave entre $t=a$ y $t=b$:

$$s=\int_a^b|\vec r\,{}'(t)|\,dt=\int_a^b\sqrt{f'(t)^2+g'(t)^2+h'(t)^2}\;dt$$

Es la integral de la rapidez: la distancia recorrida.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 4, ej. 1 b y 4 b',
      enunciado: r`Halle el dominio y diga dónde es continua $\vec r(t)=\ln(5t+1)\,\vec i-\frac{1}{\sqrt{t^2-9}}\,\vec j+\cos t\,\vec k$.`,
      pasos: [
        r`$\ln(5t+1)$: $5t+1>0\Rightarrow t>-\frac15$.`,
        r`$\frac{1}{\sqrt{t^2-9}}$: $t^2-9>0\Rightarrow t<-3$ o $t>3$.`,
        r`$\cos t$: todo $\mathbb R$. Intersección: $t>3$.`,
        r`Cada componente es continua en su dominio, así que $\vec r$ es continua en todo su dominio $(3,+\infty)$.`,
      ],
      respuesta: r`$\operatorname{Dom}=(3,+\infty)$, continua en todo él.`,
    },
    {
      fuente: 'TP 4, ej. 3 c',
      enunciado: r`Calcule $\lim_{t\to0}\vec r(t)$ con $\vec r(t)=\frac{\operatorname{sen}t}{2t}\,\vec i-5t\,\vec j+\frac{\operatorname{tg}3t}{t}\,\vec k$.`,
      pasos: [
        r`$\frac{\operatorname{sen}t}{2t}=\frac12\cdot\frac{\operatorname{sen}t}{t}\to\frac12$.`,
        r`$-5t\to0$.`,
        r`$\frac{\operatorname{tg}3t}{t}=3\cdot\frac{\operatorname{tg}3t}{3t}\to3$.`,
      ],
      respuesta: r`$\frac12\,\vec i+3\,\vec k$.`,
    },
    {
      fuente: 'TP 4, ej. 7',
      enunciado: r`a ii) $\int\big[(t+1)\,\vec i-t^3\,\vec j\big]dt$. b vi) $\int_0^1\left[\frac{1}{\sqrt{1-t^2}}\,\vec i+\frac{\sqrt3}{1+t^2}\,\vec k\right]dt$.`,
      pasos: [
        r`**a ii)** Componente a componente: $\left(\frac{t^2}{2}+t\right)\vec i-\frac{t^4}{4}\,\vec j+\vec C$.`,
        r`**b vi)** $\int_0^1\frac{dt}{\sqrt{1-t^2}}=\arcsen t\Big|_0^1=\frac\pi2$.`,
        r`$\int_0^1\frac{\sqrt3}{1+t^2}dt=\sqrt3\operatorname{arctg}t\Big|_0^1=\frac{\sqrt3\pi}{4}$.`,
      ],
      respuesta: r`a) $\left(\frac{t^2}2+t\right)\vec i-\frac{t^4}4\vec j+\vec C$; b) $\frac\pi2\,\vec i+\frac{\sqrt3\pi}4\,\vec k$.`,
    },
    {
      fuente: 'TP 4, ej. 8 b',
      enunciado: r`$\vec r(t)=4\cos t\,\vec i-3\operatorname{sen}t\,\vec j+2t\,\vec k$. Calcule velocidad, aceleración y rapidez en $t=\frac\pi3$.`,
      pasos: [
        r`$\vec v=-4\operatorname{sen}t\,\vec i-3\cos t\,\vec j+2\,\vec k$. En $\frac\pi3$: $\vec v=-2\sqrt3\,\vec i-\frac32\,\vec j+2\,\vec k$.`,
        r`$\vec a=-4\cos t\,\vec i+3\operatorname{sen}t\,\vec j$. En $\frac\pi3$: $\vec a=-2\,\vec i+\frac{3\sqrt3}{2}\,\vec j$.`,
        r`Rapidez: $|\vec v|=\sqrt{12+\frac94+4}=\sqrt{\frac{73}4}=\frac{\sqrt{73}}2\approx4{,}27$.`,
      ],
    },
    {
      fuente: 'TP 4, ej. 12 c',
      enunciado: r`Para $\vec r(t)=3t\cos t\,\vec i-3t\operatorname{sen}t\,\vec j+4t\,\vec k$ halle $\vec T$, la rapidez y la longitud de la curva desde $t=0$ hasta $t=\pi$.`,
      pasos: [
        r`$\vec r\,{}'=(3\cos t-3t\operatorname{sen}t)\,\vec i-(3\operatorname{sen}t+3t\cos t)\,\vec j+4\,\vec k$.`,
        r`$|\vec r\,{}'|^2=9(\cos t-t\operatorname{sen}t)^2+9(\operatorname{sen}t+t\cos t)^2+16=9(1+t^2)+16$, porque los productos cruzados se cancelan. Rapidez: $\sqrt{25+9t^2}$.`,
        r`$\vec T=\dfrac{\vec r\,{}'}{\sqrt{25+9t^2}}$.`,
        r`$s=\int_0^\pi\sqrt{25+9t^2}\,dt$. Con $u=3t$: $\frac13\int_0^{3\pi}\sqrt{25+u^2}\,du=\frac13\left[\frac u2\sqrt{25+u^2}+\frac{25}2\ln\!\left(u+\sqrt{25+u^2}\right)\right]_0^{3\pi}$.`,
        r`Numéricamente $s\approx22{,}6$.`,
      ],
    },
    {
      fuente: 'TP 4, ej. 15 a',
      enunciado: r`Halle $\vec T$, $K$ y $\vec N$ para $\vec r(t)=(\cos t+t\operatorname{sen}t)\,\vec i+(\operatorname{sen}t-t\cos t)\,\vec j$, $t>0$.`,
      pasos: [
        r`$\vec r\,{}'=(-\operatorname{sen}t+\operatorname{sen}t+t\cos t)\,\vec i+(\cos t-\cos t+t\operatorname{sen}t)\,\vec j=t\cos t\,\vec i+t\operatorname{sen}t\,\vec j$.`,
        r`$|\vec r\,{}'|=t$, así que $\vec T=\cos t\,\vec i+\operatorname{sen}t\,\vec j$.`,
        r`$\vec T\,{}'=-\operatorname{sen}t\,\vec i+\cos t\,\vec j$, de módulo $1$: $\vec N=-\operatorname{sen}t\,\vec i+\cos t\,\vec j$.`,
        r`$K=\frac{|\vec T\,{}'|}{|\vec r\,{}'|}=\frac1t$.`,
      ],
      lab: 'curva-parametrica',
    },
    {
      fuente: 'TP 4, ej. 16 c',
      enunciado: r`$\vec a(t)=3t\,\vec i-4\,\vec j+\vec k$, con $\vec v(0)=4\,\vec i$ y $\vec r(0)=5\,\vec j$. Halle $\vec v(t)$ y $\vec r(t)$.`,
      pasos: [
        r`$\vec v=\int\vec a\,dt=\frac{3t^2}{2}\,\vec i-4t\,\vec j+t\,\vec k+\vec C_1$. Con $\vec v(0)=4\vec i$: $\vec C_1=4\vec i$.`,
        r`$\vec v(t)=\left(\frac{3t^2}2+4\right)\vec i-4t\,\vec j+t\,\vec k$.`,
        r`$\vec r=\int\vec v\,dt=\left(\frac{t^3}2+4t\right)\vec i-2t^2\,\vec j+\frac{t^2}2\,\vec k+\vec C_2$. Con $\vec r(0)=5\vec j$: $\vec C_2=5\vec j$.`,
      ],
      respuesta: r`$\vec r(t)=\left(\frac{t^3}2+4t\right)\vec i+(5-2t^2)\,\vec j+\frac{t^2}2\,\vec k$.`,
    },
  ],
  preguntas: [
    {
      id: 'm04-q1', p: r`El vector $\vec r\,{}'(t_0)$, si no es nulo, es…`,
      opciones: ['perpendicular a la curva en r(t₀)', 'tangente a la curva en r(t₀), en el sentido de recorrido', 'el vector posición', 'siempre unitario'],
      ok: 1, por: r`Es el límite de los vectores secantes divididos por $\Delta t$.`,
    },
    {
      id: 'm04-q2', p: r`La longitud de arco de $\vec r(t)$ entre $a$ y $b$ es:`,
      opciones: [r`$|\vec r(b)-\vec r(a)|$`, r`$\int_a^b|\vec r\,{}'(t)|\,dt$`, r`$\int_a^b\vec r(t)\,dt$`, r`$|\vec r\,{}'(b)|-|\vec r\,{}'(a)|$`],
      ok: 1, por: r`Se integra la rapidez. $|\vec r(b)-\vec r(a)|$ es la distancia en línea recta, que solo coincide si el camino es un segmento recorrido sin volver.`,
    },
    {
      id: 'm04-q3', p: r`Si $|\vec r(t)|$ es constante para todo $t$, entonces:`,
      opciones: [r`$\vec r\,{}'=\vec0$`, r`$\vec r\cdot\vec r\,{}'=0$`, r`$\vec r\times\vec r\,{}'=\vec0$`, r`la rapidez es constante`],
      ok: 1, por: r`Derivando $\vec r\cdot\vec r=c$: $2\,\vec r\cdot\vec r\,{}'=0$. La posición es perpendicular a la velocidad (movimiento sobre una circunferencia o esfera).`,
    },
    {
      id: 'm04-q4', p: r`La integral indefinida de una función vectorial lleva como constante:`,
      opciones: ['un número C', 'un vector C', 'nada', 'la rapidez inicial'],
      ok: 1, por: r`Una constante por componente: $\vec C=C_1\vec i+C_2\vec j+C_3\vec k$.`,
    },
    {
      id: 'm04-q5', p: r`¿Cuál es el dominio de $\vec r(t)=\sqrt t\,\vec i+\ln(1-t)\,\vec j$?`,
      opciones: [r`$[0,1)$`, r`$(0,1)$`, r`$[0,+\infty)$`, r`$(-\infty,1)$`],
      ok: 0, por: r`$\sqrt t$ pide $t\ge0$ y $\ln(1-t)$ pide $t<1$.`,
    },
  ],
};

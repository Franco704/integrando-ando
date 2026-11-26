const r = String.raw;

export default {
  intro: r`La integral de superficie es a las superficies lo que la integral de línea es a las curvas: suma una función sobre un trozo de superficie curva. Su caso más pedido es el **área** de una superficie, y el truco central es el factor $\sqrt{1+f_x^2+f_y^2}$ que compara un pedacito de superficie con su sombra.`,
  teoria: [
    {
      id: 'definicion', titulo: 'Definición en cuatro pasos',
      texto: r`Sea $S$ la superficie $z=g(x,y)$ con proyección $R$ (cerrada y acotada) sobre el plano $xy$, y $f(x,y,z)$ definida sobre $S$.

1. Se divide $R$ en $n$ rectángulos $\Delta A_i$; cada uno determina un trozo $\Delta S_i$ de la superficie.
2. En cada $\Delta S_i$ se elige un punto $(x_i,y_i,z_i)$.
3. Se forma $\sum f(x_i,y_i,z_i)\,\Delta S_i$.
4. $\displaystyle\iint_Sf\,dS=\lim_{\|\Delta\|\to0}\sum_{i=1}^nf(x_i,y_i,z_i)\,\Delta S_i$.

**Por qué aparece la raíz.** El trozo $\Delta S_i$ es casi un paralelogramo del plano tangente, generado por $(\Delta x,0,g_x\Delta x)$ y $(0,\Delta y,g_y\Delta y)$. Su área es la norma del producto vectorial: $\sqrt{1+g_x^2+g_y^2}\,\Delta A_i$.`,
    },
    {
      id: 'evaluacion', titulo: 'Teorema de evaluación',
      texto: r`Si $g$ tiene derivadas parciales continuas en $R$ y $f$ es continua sobre $S$:

$$\iint_Sf(x,y,z)\,dS=\iint_Rf\big(x,y,g(x,y)\big)\sqrt{1+g_x^2+g_y^2}\;dA$$

Si conviene proyectar sobre otro plano: con $S:y=g(x,z)$ sobre $R_{xz}$, el factor es $\sqrt{1+g_x^2+g_z^2}$; con $S:x=g(y,z)$, $\sqrt{1+g_y^2+g_z^2}$.

**Área de una superficie:** $A(S)=\iint_R\sqrt{1+g_x^2+g_y^2}\,dA$ (con $f=1$).

**Superficies paramétricas** $\vec r(u,v)$: $dS=|\vec r_u\times\vec r_v|\,du\,dv$. Por ejemplo, en la esfera de radio $a$, $dS=a^2\operatorname{sen}\varphi\,d\varphi\,d\theta$; en el cilindro $x^2+y^2=a^2$, $dS=a\,d\theta\,dz$.

> Hay que verificar la hipótesis: en el cono $z=\sqrt{x^2+y^2}$ las derivadas no existen en el origen, así que el teorema vale solo si el origen no está en $R$ (final de agosto 2024).`,
    },
    {
      id: 'flujo', titulo: 'Flujo y teoremas integrales',
      texto: r`Si $\vec n$ es la normal unitaria de una superficie orientada, el **flujo** de $\vec F$ a través de $S$ es $\iint_S\vec F\cdot\vec n\,dS$. Para $z=g(x,y)$ con normal hacia arriba, $\vec n\,dS=(-g_x,-g_y,1)\,dA$.

**Teorema de Stokes:** $\oint_C\vec F\cdot d\vec r=\iint_S(\operatorname{rot}\vec F)\cdot\vec n\,dS$, donde $C$ es el borde de $S$ con orientación compatible. Green es el caso plano.

**Teorema de Gauss (divergencia):** $\iint_S\vec F\cdot\vec n\,dS=\iiint_Q\operatorname{div}\vec F\,dV$, con $S$ la superficie cerrada que encierra a $Q$ y $\vec n$ exterior.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 21, ej. 1 a y final de agosto 2024',
      enunciado: r`Área de la porción del cono $x^2+y^2=z^2$ entre $z=1$ y $z=2$.`,
      pasos: [
        r`$z=\sqrt{x^2+y^2}$: $g_x=\frac xr$, $g_y=\frac yr$, $\sqrt{1+g_x^2+g_y^2}=\sqrt2$.`,
        r`Proyección: el anillo $1\le r\le2$ (no contiene al origen, se cumplen las hipótesis).`,
        r`$A=\int_0^{2\pi}\!\int_1^2\sqrt2\,r\,dr\,d\theta=\sqrt2\cdot2\pi\cdot\frac32=3\sqrt2\pi$.`,
      ],
      lab: 'integral-superficie',
    },
    {
      fuente: 'TP 21, ej. 1 b',
      enunciado: r`Área de la porción del plano $x+2y+3z=6$ en el primer octante.`,
      pasos: [
        r`$z=\frac{6-x-2y}3$: $g_x=-\frac13$, $g_y=-\frac23$; factor $\sqrt{1+\frac19+\frac49}=\frac{\sqrt{14}}3$.`,
        r`Proyección: triángulo $x+2y\le6$ en el primer cuadrante, de área $\frac{6\cdot3}2=9$.`,
        r`$A=9\cdot\frac{\sqrt{14}}3=3\sqrt{14}$.`,
      ],
    },
    {
      fuente: 'TP 21, ej. 2 c',
      enunciado: r`$\iint_S\sqrt{x^2+y^2+z^2}\,dS$, $S$ la porción del cono $z^2=2(x^2+y^2)$ sobre el plano $xy$ e interior al paraboloide $z-4=-(x^2+y^2)$.`,
      pasos: [
        r`Cono: $z=\sqrt2\,r$. Corte con $z=4-r^2$: $r^2+\sqrt2r-4=0\Rightarrow r=\sqrt2$.`,
        r`Sobre el cono $\sqrt{x^2+y^2+z^2}=\sqrt{r^2+2r^2}=\sqrt3\,r$ y $\sqrt{1+g_x^2+g_y^2}=\sqrt{1+2}=\sqrt3$.`,
        r`$\int_0^{2\pi}\!\int_0^{\sqrt2}\sqrt3r\cdot\sqrt3\cdot r\,dr\,d\theta=3\cdot2\pi\cdot\frac{2\sqrt2}{3}=4\sqrt2\pi$.`,
      ],
    },
    {
      fuente: 'TP 21, ej. 2 e',
      enunciado: r`$\iint_Sy(1+z^2)\,dS$, $S$ la porción del cilindro $x^2+y^2=\frac14$ con $0\le z\le1$, $y\ge0$.`,
      pasos: [
        r`Parametrización: $x=\frac12\cos\theta$, $y=\frac12\operatorname{sen}\theta$, $z=z$, con $0\le\theta\le\pi$. $dS=\frac12\,d\theta\,dz$.`,
        r`$\int_0^\pi\!\int_0^1\frac12\operatorname{sen}\theta(1+z^2)\cdot\frac12\,dz\,d\theta=\frac14\cdot2\cdot\frac43=\frac23$.`,
      ],
    },
    {
      fuente: 'TP 21, ej. 5',
      enunciado: r`$\iint_Sz\,dS$, $S$ el paraboloide $z=1-x^2-y^2$ sobre el plano $xy$.`,
      pasos: [
        r`$\sqrt{1+4x^2+4y^2}=\sqrt{1+4r^2}$; proyección: disco $r\le1$.`,
        r`$\int_0^{2\pi}\!\int_0^1(1-r^2)\sqrt{1+4r^2}\,r\,dr\,d\theta$. Con $u=1+4r^2$: $\frac{2\pi}{32}\int_1^5(5-u)\sqrt u\,du$.`,
        r`$=\frac{\pi}{16}\left[\frac{10}3u^{3/2}-\frac25u^{5/2}\right]_1^5=\frac{\pi(25\sqrt5-11)}{60}\approx2{,}35$.`,
      ],
    },
    {
      fuente: 'TP 21, ej. 6',
      enunciado: r`$\iint_Sz^2\,dS$, $S$ el hemisferio $x^2+y^2+z^2=a^2$, $z\ge0$.`,
      pasos: [
        r`En esféricas sobre la esfera: $z=a\cos\varphi$, $dS=a^2\operatorname{sen}\varphi\,d\varphi\,d\theta$, $0\le\varphi\le\frac\pi2$.`,
        r`$\int_0^{2\pi}\!\int_0^{\pi/2}a^2\cos^2\varphi\cdot a^2\operatorname{sen}\varphi\,d\varphi\,d\theta=a^4\cdot2\pi\cdot\frac13$.`,
      ],
      respuesta: r`$\frac{2\pi a^4}{3}$.`,
    },
  ],
  preguntas: [
    {
      id: 'm21-q1', p: r`Para $S:z=g(x,y)$, $dS$ es:`,
      opciones: [r`$dA$`, r`$\sqrt{1+g_x^2+g_y^2}\,dA$`, r`$(1+g_x+g_y)\,dA$`, r`$|g|\,dA$`],
      ok: 1, por: r`Es el área del trozo de plano tangente sobre $dA$.`,
    },
    {
      id: 'm21-q2', p: r`¿Qué vale $\iint_S1\,dS$?`,
      opciones: ['El volumen bajo S', 'El área de S', 'El área de la proyección de S', 'El flujo de S'],
      ok: 1, por: r`Con $f=1$ se suma solo $dS$.`,
    },
    {
      id: 'm21-q3', p: r`Para una superficie $y=g(x,z)$ conviene proyectar sobre:`,
      opciones: ['el plano xy', 'el plano xz', 'el plano yz', 'cualquiera da igual sin cambiar nada'],
      ok: 1, por: r`$y$ es función de $x$ y $z$; el factor es $\sqrt{1+g_x^2+g_z^2}$.`,
    },
    {
      id: 'm21-q4', p: r`El teorema de Gauss relaciona el flujo a través de una superficie cerrada con:`,
      opciones: ['la integral de línea sobre el borde', 'la integral triple de la divergencia', 'el rotor sobre la superficie', 'el área de la superficie'],
      ok: 1, por: r`$\oiint_S\vec F\cdot\vec n\,dS=\iiint_Q\operatorname{div}\vec F\,dV$.`,
    },
  ],
};

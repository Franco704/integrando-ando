const r = String.raw;

export default {
  intro: r`Hasta ahora se integraba sobre segmentos, regiones y sólidos. La integral de línea integra **a lo largo de una curva**. Hay dos clases: la de un campo escalar respecto de la longitud de arco (masa de un alambre, área de una "cortina") y la de un campo vectorial (trabajo de una fuerza). En los finales se pide la definición en cuatro pasos y las condiciones para evaluarla.`,
  teoria: [
    {
      id: 'escalar', titulo: 'Integral de línea de un campo escalar',
      texto: r`Sea $f$ definida sobre una curva suave $C$.

1. Se divide $C$ en $n$ subarcos de longitud $\Delta s_i$.
2. Se elige un punto $(x_i^*,y_i^*)$ en cada uno.
3. Se forma $\sum f(x_i^*,y_i^*)\,\Delta s_i$.
4. Se toma el límite cuando la norma de la partición tiende a cero:

$$\int_Cf(x,y)\,ds=\lim_{\|\Delta\|\to0}\sum_{i=1}^nf(x_i^*,y_i^*)\,\Delta s_i$$

**Evaluación.** Si $f$ es continua en una región que contiene a $C$ y $C$ es suave, dada por $\vec r(t)$, $a\le t\le b$:

$$\int_Cf\,ds=\int_a^bf\big(\vec r(t)\big)\,|\vec r\,{}'(t)|\,dt$$

En el espacio, igual con tres componentes. **Interpretaciones:** con $f=1$, la longitud de $C$; con $f=\delta$, la **masa** del alambre; si $f\ge0$, el **área** de la superficie vertical entre $C$ y la gráfica de $f$ (final de septiembre 2024).

**Centro de masa de un alambre:** $\bar x=\frac1M\int_Cx\,\delta\,ds$, etc. **Inercia:** $I_z=\int_C(x^2+y^2)\delta\,ds$.`,
    },
    {
      id: 'vectorial', titulo: 'Integral de línea de un campo vectorial: trabajo',
      texto: r`Si $\vec F$ es una fuerza y la partícula recorre $C$, el trabajo es

$$W=\int_C\vec F\cdot d\vec r=\int_C\vec F\cdot\vec T\,ds=\int_a^b\vec F\big(\vec r(t)\big)\cdot\vec r\,{}'(t)\,dt$$

Con componentes: $\int_CP\,dx+Q\,dy+R\,dz$, reemplazando $dx=x'(t)\,dt$, etc.

**Propiedades:** si se invierte el sentido de $C$ la integral cambia de signo (la escalar no); si $C=C_1\cup C_2$, se suman.`,
    },
    {
      id: 'conservativos', titulo: 'Teorema fundamental e independencia del camino',
      texto: r`**Teorema fundamental.** Si $\vec F=\nabla f$ con $f$ de clase $C^1$ y $C$ va de $A$ a $B$:

$$\int_C\nabla f\cdot d\vec r=f(B)-f(A)$$

*Demostración:* $\nabla f(\vec r(t))\cdot\vec r\,{}'(t)=\frac{d}{dt}f(\vec r(t))$ por la regla de la cadena; se integra y se aplica Barrow.

Consecuencias, equivalentes entre sí en una región conexa: $\vec F$ es conservativo $\Leftrightarrow$ la integral es **independiente del camino** $\Leftrightarrow$ la integral sobre toda curva **cerrada** es cero.`,
    },
    {
      id: 'green', titulo: 'Teorema de Green',
      texto: r`Si $C$ es una curva cerrada simple, suave por tramos, recorrida en **sentido antihorario**, que encierra la región $R$, y $P$, $Q$ tienen derivadas continuas en una región que contiene a $R$:

$$\oint_CP\,dx+Q\,dy=\iint_R\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)dA$$

Convierte una integral de línea cerrada en una doble. Con $P=-\frac y2$, $Q=\frac x2$ da el área: $A=\frac12\oint_Cx\,dy-y\,dx$.

> Ejemplo: $\oint_C-y\,dx+x\,dy$ sobre la circunferencia unitaria vale $\iint_R2\,dA=2\pi$.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 20, ej. 1 b',
      enunciado: r`$\int_C8xyz\,ds$, $C:\vec r(t)=3\,\vec i+12t\,\vec j+5t\,\vec k$, $0\le t\le2$.`,
      pasos: [
        r`$\vec r\,{}'=(0,12,5)$, $|\vec r\,{}'|=13$.`,
        r`$\int_0^28\cdot3\cdot12t\cdot5t\cdot13\,dt=18720\int_0^2t^2dt=18720\cdot\frac83=49920$.`,
      ],
    },
    {
      fuente: 'TP 20, ej. 2',
      enunciado: r`$\int_C(x^2-y^2)\,ds$: a) por $x^2+y^2=1$ de $(1,0)$ a $(0,1)$ en sentido antihorario; c) por la recta de $(0,0)$ a $(3,9)$.`,
      pasos: [
        r`**a)** $\vec r=(\cos t,\operatorname{sen}t)$, $ds=dt$: $\int_0^{\pi/2}\cos2t\,dt=\frac{\operatorname{sen}2t}{2}\Big|_0^{\pi/2}=0$.`,
        r`**c)** $\vec r=(3t,9t)$, $|\vec r\,{}'|=3\sqrt{10}$: $\int_0^1(9t^2-81t^2)\,3\sqrt{10}\,dt=-72\cdot3\sqrt{10}\cdot\frac13=-72\sqrt{10}$.`,
      ],
    },
    {
      fuente: 'TP 20, ej. 4 a',
      enunciado: r`Longitud de $\vec r(t)=t\,\vec i+2t^2\,\vec j$, $0\le t\le1$.`,
      pasos: [
        r`$|\vec r\,{}'|=\sqrt{1+16t^2}$.`,
        r`$\int_0^1\sqrt{1+16t^2}\,dt=\left[\frac t2\sqrt{1+16t^2}+\frac18\ln\left(4t+\sqrt{1+16t^2}\right)\right]_0^1=\frac{\sqrt{17}}2+\frac18\ln(4+\sqrt{17})$.`,
      ],
      respuesta: r`$\approx2{,}323$.`,
    },
    {
      fuente: 'TP 20, ej. 9',
      enunciado: r`$\int_Cxy\,dx+z\,dy+zy\,dz$, $C:\vec r(t)=(t+1)\,\vec i+t^2\,\vec j+(2t-1)\,\vec k$, $0\le t\le2$.`,
      pasos: [
        r`$dx=dt$, $dy=2t\,dt$, $dz=2\,dt$.`,
        r`Integrando: $(t+1)t^2+(2t-1)2t+(2t-1)t^2\cdot2=5t^3+3t^2-2t$.`,
        r`$\int_0^2(5t^3+3t^2-2t)\,dt=20+8-4=24$.`,
      ],
      respuesta: r`$24$.`,
      lab: 'integral-linea',
    },
    {
      fuente: 'TP 20, ej. 13',
      enunciado: r`Una partícula sigue $\vec f(t)=\left(1-t^3,\ t^2,\ \frac{t^3}3\right)$. Velocidad y rapidez en $t=0{,}5$. ¿Cuándo pasa por $\left(1-\frac{1}{2\sqrt2},\frac12,\frac{1}{6\sqrt2}\right)$ y qué longitud recorrió?`,
      pasos: [
        r`$\vec v=(-3t^2,2t,t^2)$; en $0{,}5$: $(-0{,}75;\ 1;\ 0{,}25)$, rapidez $\sqrt{1{,}625}\approx1{,}275$.`,
        r`$t^2=\frac12\Rightarrow t=\frac{1}{\sqrt2}$ (y se verifica $t^3=\frac{1}{2\sqrt2}$).`,
        r`$|\vec v|=\sqrt{10t^4+4t^2}=t\sqrt{10t^2+4}$. $s=\int_0^{1/\sqrt2}t\sqrt{10t^2+4}\,dt=\frac{(10t^2+4)^{3/2}}{30}\Big|_0^{1/\sqrt2}=\frac{27-8}{30}=\frac{19}{30}$.`,
      ],
    },
    {
      fuente: 'TP 20, ej. 14',
      enunciado: r`Masa y centro de masa de un alambre en forma de cuarto de circunferencia $x^2+y^2=a^2$ (primer cuadrante) con $\delta=x+y$.`,
      pasos: [
        r`$\vec r=(a\cos t,a\operatorname{sen}t)$, $ds=a\,dt$, $0\le t\le\frac\pi2$.`,
        r`$M=\int_0^{\pi/2}a(\cos t+\operatorname{sen}t)\,a\,dt=2a^2$.`,
        r`$M_y=\int x\,\delta\,ds=a^3\int_0^{\pi/2}(\cos^2t+\cos t\operatorname{sen}t)\,dt=a^3\left(\frac\pi4+\frac12\right)$.`,
        r`$\bar x=\frac{a(\pi+2)}{8}$ y, por simetría, $\bar y=\bar x$.`,
      ],
    },
  ],
  preguntas: [
    {
      id: 'm20-q1', p: r`Si se invierte el sentido de recorrido de $C$:`,
      opciones: [r`$\int_Cf\,ds$ cambia de signo`, r`$\int_C\vec F\cdot d\vec r$ cambia de signo`, 'ambas cambian de signo', 'ninguna cambia'],
      ok: 1, por: r`$ds=|\vec r\,{}'|dt$ es siempre positivo; $d\vec r$ cambia de sentido.`,
    },
    {
      id: 'm20-q2', p: r`Si $\vec F=\nabla f$, $\int_C\vec F\cdot d\vec r$ de $A$ a $B$ vale:`,
      opciones: [r`$0$ siempre`, r`$f(B)-f(A)$`, r`$|\vec F(B)-\vec F(A)|$`, 'depende del camino'],
      ok: 1, por: r`Teorema fundamental de las integrales de línea.`,
    },
    {
      id: 'm20-q3', p: r`El teorema de Green transforma $\oint_CP\,dx+Q\,dy$ en:`,
      opciones: [r`$\iint_R(P_x+Q_y)\,dA$`, r`$\iint_R(Q_x-P_y)\,dA$`, r`$\iint_R(P_y-Q_x)\,dA$`, r`$\int_C(P+Q)\,ds$`],
      ok: 1, por: r`Con $C$ recorrida en sentido antihorario.`,
    },
    {
      id: 'm20-q4', p: r`La masa de un alambre de densidad $\delta$ con forma $C$ es:`,
      opciones: [r`$\int_C\delta\,ds$`, r`$\int_C\delta\,dx$`, r`$\iint\delta\,dA$`, r`$\int_C\vec\delta\cdot d\vec r$`],
      ok: 0, por: r`Densidad lineal por longitud de cada pedacito.`,
    },
  ],
};

const r = String.raw;

export default {
  intro: r`Con la integral doble ya sabés sumar sobre una región. Las aplicaciones solo cambian **qué** se suma: $1$ para el área, la altura para el volumen, la densidad para la masa, la densidad por la distancia para los momentos. Todas las fórmulas salen del mismo razonamiento: partir la lámina, aproximar en cada pedacito y sumar.`,
  teoria: [
    {
      id: 'area-volumen', titulo: 'Área y volumen',
      texto: r`- **Área** de $R$: $A=\iint_RdA$.
- **Volumen** del sólido entre $z=g(x,y)$ (abajo) y $z=f(x,y)$ (arriba) sobre $R$: $V=\iint_R\big[f(x,y)-g(x,y)\big]dA$.

Para volúmenes, la región $R$ es la **sombra** del sólido en el plano $xy$; si el sólido está entre dos superficies que se cortan, se igualan para encontrar el borde de la sombra.`,
    },
    {
      id: 'masa', titulo: 'Masa, momentos estáticos y centro de masa',
      texto: r`Una lámina ocupa $R$ y tiene densidad superficial $\delta(x,y)$. Partiéndola en rectangulitos, la masa de cada uno es $\Delta m_i\approx\delta(x_i,y_i)\Delta A_i$; sumando y pasando al límite:

$$M=\iint_R\delta(x,y)\,dA$$

El **momento estático** respecto de un eje es masa por distancia (con signo) a ese eje:

$$M_x=\iint_Ry\,\delta\,dA\ (\text{respecto del eje }x),\qquad M_y=\iint_Rx\,\delta\,dA\ (\text{respecto del eje }y)$$

**Centro de masa:** $\bar x=\dfrac{M_y}{M}$, $\bar y=\dfrac{M_x}{M}$. Si $\delta$ es constante se llama **centroide** y solo depende de la forma.

> Usá la simetría: si la región y la densidad son simétricas respecto del eje $y$, $\bar x=0$ sin calcular.

El **peso** es $P=gM$.`,
    },
    {
      id: 'inercia', titulo: 'Momentos de inercia',
      texto: r`Masa por distancia **al cuadrado** al eje:

$$I_x=\iint_Ry^2\delta\,dA,\qquad I_y=\iint_Rx^2\delta\,dA,\qquad I_0=\iint_R(x^2+y^2)\delta\,dA=I_x+I_y$$

$I_0$ es el **momento polar** (respecto del origen). Mide la resistencia a girar: cuanto más lejos del eje está la masa, mayor es.

**Radio de giro:** $\bar{\bar x}=\sqrt{I_y/M}$, la distancia a la que habría que concentrar toda la masa para tener el mismo momento.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 17, ej. 2',
      enunciado: r`Con una transformación adecuada, área de la región limitada por $x-2y=4$, $x-2y=0$, $x+y=4$, $x+y=1$.`,
      pasos: [
        r`$u=x-2y\in[0,4]$, $v=x+y\in[1,4]$: la región es un rectángulo en $uv$.`,
        r`$\frac{\partial(u,v)}{\partial(x,y)}=\begin{vmatrix}1&-2\\1&1\end{vmatrix}=3$, así que $J=\frac13$.`,
        r`$A=\int_1^4\!\int_0^4\frac13\,du\,dv=\frac{4\cdot3}{3}=4$.`,
      ],
      respuesta: r`$4$.`,
    },
    {
      fuente: 'TP 17, ej. 4',
      enunciado: r`Volumen del sólido limitado por el cono $x^2+y^2=4z^2$ y la esfera $x^2+y^2+z^2=5$, con $z\ge0$.`,
      pasos: [
        r`En polares el cono es $z=\frac r2$ y la esfera $z=\sqrt{5-r^2}$. Se cortan en $\frac{r^2}{4}=5-r^2\Rightarrow r=2$.`,
        r`$V=\int_0^{2\pi}\!\int_0^2\left(\sqrt{5-r^2}-\frac r2\right)r\,dr\,d\theta$.`,
        r`$\int_0^2r\sqrt{5-r^2}\,dr=\frac{5\sqrt5-1}{3}$ y $\int_0^2\frac{r^2}2dr=\frac43$.`,
        r`$V=2\pi\cdot\frac{5\sqrt5-5}{3}=\frac{10\pi}{3}(\sqrt5-1)\approx12{,}94$.`,
      ],
    },
    {
      fuente: 'TP 17, ej. 5',
      enunciado: r`Área dentro de la cardioide $r=a(1+\cos\theta)$ y fuera de la circunferencia $r=a$.`,
      pasos: [
        r`Se cortan donde $1+\cos\theta=1$: $\theta=\pm\frac\pi2$. Entre esos ángulos la cardioide está afuera.`,
        r`$A=\int_{-\pi/2}^{\pi/2}\!\int_a^{a(1+\cos\theta)}r\,dr\,d\theta=\frac{a^2}2\int_{-\pi/2}^{\pi/2}(2\cos\theta+\cos^2\theta)\,d\theta$.`,
        r`$=\frac{a^2}2\left(4+\frac\pi2\right)=a^2\left(2+\frac\pi4\right)$.`,
      ],
    },
    {
      fuente: 'TP 17, ej. 13',
      enunciado: r`Momento de inercia de una lámina triangular isósceles rectángula de cateto $a$, densidad constante $k$, respecto del vértice del ángulo recto.`,
      pasos: [
        r`Se ubica el ángulo recto en el origen: $0\le x\le a$, $0\le y\le a-x$. Se pide $I_0$.`,
        r`$I_0=k\int_0^a\!\int_0^{a-x}(x^2+y^2)\,dy\,dx$. Por simetría, $=2k\int_0^a\!\int_0^{a-x}x^2\,dy\,dx=2k\int_0^ax^2(a-x)\,dx$.`,
        r`$=2k\left(\frac{a^4}3-\frac{a^4}4\right)=\frac{k\,a^4}{6}$.`,
      ],
    },
    {
      fuente: 'TP 17, ej. 17',
      enunciado: r`Lámina limitada por $x=1-y^2$ y los ejes en el primer cuadrante, con $\delta=y$. Centro de masa.`,
      pasos: [
        r`Tipo II: $0\le y\le1$, $0\le x\le1-y^2$.`,
        r`$M=\int_0^1y(1-y^2)\,dy=\frac14$.`,
        r`$M_y=\int_0^1\!\int_0^{1-y^2}xy\,dx\,dy=\int_0^1\frac{y(1-y^2)^2}{2}dy=\frac1{12}$; $M_x=\int_0^1y^2(1-y^2)\,dy=\frac{2}{15}$.`,
        r`$\bar x=\frac{1/12}{1/4}=\frac13$, $\bar y=\frac{2/15}{1/4}=\frac8{15}$.`,
      ],
      respuesta: r`$\left(\frac13,\frac8{15}\right)$.`,
      lab: 'centro-masa',
    },
    {
      fuente: 'TP 17, ej. 22',
      enunciado: r`Centro de masa de la lámina semicircular $y\ge0$, $x^2+y^2\le R^2$, con $\delta=a\sqrt{x^2+y^2}$.`,
      pasos: [
        r`Simetría respecto del eje $y$: $\bar x=0$.`,
        r`$M=\int_0^\pi\!\int_0^Ra\rho\cdot\rho\,d\rho\,d\theta=\frac{a\pi R^3}3$.`,
        r`$M_x=\int_0^\pi\!\int_0^R\rho\operatorname{sen}\theta\cdot a\rho\cdot\rho\,d\rho\,d\theta=a\cdot2\cdot\frac{R^4}4=\frac{aR^4}2$.`,
        r`$\bar y=\frac{aR^4/2}{a\pi R^3/3}=\frac{3R}{2\pi}$.`,
      ],
      respuesta: r`$\left(0,\frac{3R}{2\pi}\right)$.`,
    },
  ],
  preguntas: [
    {
      id: 'm17-q1', p: r`$\bar x$ del centro de masa de una lámina es:`,
      opciones: [r`$\frac{1}{M}\iint y\,\delta\,dA$`, r`$\frac1M\iint x\,\delta\,dA$`, r`$\iint x\,dA$`, r`$\frac{1}{A}\iint\delta\,dA$`],
      ok: 1, por: r`$\bar x=M_y/M$, y $M_y$ (momento respecto del eje $y$) usa la distancia a ese eje, que es $x$.`,
    },
    {
      id: 'm17-q2', p: r`$I_0$ (momento polar) es igual a:`,
      opciones: [r`$I_x\cdot I_y$`, r`$I_x+I_y$`, r`$\sqrt{I_x^2+I_y^2}$`, r`$M_x+M_y$`],
      ok: 1, por: r`$x^2+y^2$ es la distancia al cuadrado al origen.`,
    },
    {
      id: 'm17-q3', p: r`Una lámina simétrica respecto del eje $y$ con densidad $\delta=y^2$ tiene:`,
      opciones: [r`$\bar x=0$`, r`$\bar y=0$`, r`$\bar x=\bar y$`, 'centro en el origen'],
      ok: 0, por: r`$\delta=y^2$ no cambia al reflejar $x\to-x$; la simetría se conserva.`,
    },
    {
      id: 'm17-q4', p: r`El volumen entre $z=g$ y $z=f$ (con $f\ge g$) sobre $R$ es:`,
      opciones: [r`$\iint_R(f+g)\,dA$`, r`$\iint_R(f-g)\,dA$`, r`$\iint_Rf\,dA\cdot\iint_Rg\,dA$`, r`$\iint_R|f|\,dA$`],
      ok: 1, por: r`Altura del sólido sobre cada punto: techo menos piso.`,
    },
  ],
};

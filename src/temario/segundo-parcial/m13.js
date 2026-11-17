const r = String.raw;

export default {
  intro: r`Empieza el segundo parcial. La integral doble generaliza la integral de Análisis I: en lugar de sumar rectángulos bajo una curva, se suman **prismas bajo una superficie**. La técnica de cálculo es sencilla (dos integrales simples, una adentro de la otra); lo difícil, y lo que se evalúa, es **plantear los límites** a partir del dibujo de la región.`,
  teoria: [
    {
      id: 'definicion', titulo: 'Definición: sumas de Riemann',
      texto: r`Sea $f$ definida en una región cerrada y acotada $R$ del plano.

1. Se cubre $R$ con una red de rectángulos y se toman los $n$ que quedan dentro, de áreas $\Delta A_i$. La **norma** $\|\Delta\|$ es la mayor diagonal.
2. En cada rectángulo se elige un punto $(x_i,y_i)$.
3. Se forma la suma $\sum_{i=1}^nf(x_i,y_i)\,\Delta A_i$.
4. Si el límite existe cuando $\|\Delta\|\to0$:

$$\iint_Rf(x,y)\,dA=\lim_{\|\Delta\|\to0}\sum_{i=1}^nf(x_i,y_i)\,\Delta A_i$$

Si $f$ es continua en $R$, el límite existe ($f$ es integrable).

**Interpretación:** si $f\ge0$, es el **volumen** del sólido entre $R$ y la superficie $z=f(x,y)$. Con $f=1$ da el **área** de $R$.`,
    },
    {
      id: 'propiedades', titulo: 'Propiedades y teorema del valor medio',
      texto: r`Con $f$, $g$ continuas en $R$:

- $\iint_Rk\,f\,dA=k\iint_Rf\,dA$ y $\iint_R(f\pm g)\,dA=\iint_Rf\,dA\pm\iint_Rg\,dA$.
- Si $f\ge0$ en $R$, $\iint_Rf\,dA\ge0$. Si $f\le g$, $\iint f\le\iint g$.
- Si $R=R_1\cup R_2$ sin superposición, $\iint_R=\iint_{R_1}+\iint_{R_2}$.

**Teorema del valor medio.** Si $f$ es continua en $R$ (cerrada, acotada, conexa) de área $A$, existe $(x_0,y_0)\in R$ con

$$\iint_Rf\,dA=f(x_0,y_0)\cdot A$$

El número $\frac1A\iint_Rf\,dA$ es el **valor medio** de $f$ en $R$: la altura del prisma de base $R$ con el mismo volumen.`,
    },
    {
      id: 'iteradas', titulo: 'Cálculo: integrales iteradas (Fubini)',
      texto: r`**Región tipo I** (vertical): $a\le x\le b$, $g_1(x)\le y\le g_2(x)$.

$$\iint_Rf\,dA=\int_a^b\!\!\int_{g_1(x)}^{g_2(x)}f(x,y)\,dy\,dx$$

**Región tipo II** (horizontal): $c\le y\le d$, $h_1(y)\le x\le h_2(y)$.

$$\iint_Rf\,dA=\int_c^d\!\!\int_{h_1(y)}^{h_2(y)}f(x,y)\,dx\,dy$$

Se integra de adentro hacia afuera; en la integral interior la otra variable es constante.

**Cómo plantear:**
1. Dibujar la región y hallar los puntos de intersección de las curvas.
2. Elegir el tipo. Para tipo I, trazar una recta vertical que atraviese la región: donde **entra** está $g_1$, donde **sale** está $g_2$. Los límites de $x$ son los extremos de la región.
3. Si la curva de entrada o de salida cambia, partir la región.

**Cambiar el orden** es redescribir la misma región con el otro tipo. Sirve cuando la integral interior no tiene primitiva elemental (por ejemplo $\int e^{x^2}dx$) o cuando un orden obliga a partir la región y el otro no.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 13, ej. 4 d (resuelto en clase)',
      enunciado: r`Represente la región acotada por $y=e^x$, $x+y=1$, $x=1$. Exprese $\iint_Rf\,dA$ como integral iterada y cambie el orden.`,
      pasos: [
        r`Las tres curvas encierran la región entre la recta $y=1-x$ (abajo) y la exponencial (arriba), para $0\le x\le1$. La recta y la exponencial se cortan en $(0,1)$.`,
        r`**Tipo I:** $\displaystyle\int_0^1\!\!\int_{1-x}^{e^x}f\,dy\,dx$.`,
        r`**Tipo II:** una recta horizontal entra por la recta $x=1-y$ si $0\le y\le1$, y por la exponencial $x=\ln y$ si $1\le y\le e$; siempre sale por $x=1$. Hay que partir:`,
        r`$\displaystyle\int_0^1\!\!\int_{1-y}^{1}f\,dx\,dy+\int_1^e\!\!\int_{\ln y}^{1}f\,dx\,dy$.`,
      ],
      lab: 'orden-integracion',
    },
    {
      fuente: 'TP 13, ej. 9 d (resuelto en clase)',
      enunciado: r`Evalúe $\int_0^1\!\int_0^y\sqrt{1-y^2}\,dx\,dy$.`,
      pasos: [
        r`Interior (en $x$, con $y$ constante): $\sqrt{1-y^2}\cdot x\Big|_0^y=y\sqrt{1-y^2}$.`,
        r`Exterior: $\int_0^1y\sqrt{1-y^2}\,dy=-\frac13(1-y^2)^{3/2}\Big|_0^1=\frac13$.`,
      ],
      respuesta: r`$\frac13$.`,
    },
    {
      fuente: 'TP 13, ej. 11 f (resuelto en clase)',
      enunciado: r`Calcule $\iint_Ry\operatorname{sen}(xy)\,dA$ con $R=[1,2]\times[0,\pi]$.`,
      pasos: [
        r`En el orden $dy\,dx$ la integral interior pide partes. En el orden $dx\,dy$ es directa: $\int_1^2y\operatorname{sen}(xy)\,dx=-\cos(xy)\Big|_{x=1}^{x=2}=\cos y-\cos2y$.`,
        r`$\int_0^\pi(\cos y-\cos2y)\,dy=\left[\operatorname{sen}y-\frac{\operatorname{sen}2y}{2}\right]_0^\pi=0$.`,
        r`Elegir bien el orden ahorra trabajo: el factor $y$ es justo la derivada interna respecto de $x$.`,
      ],
      respuesta: r`$0$.`,
    },
    {
      fuente: 'TP 13, ej. 12 g (resuelto en clase)',
      enunciado: r`Calcule $\iint_R12x^2e^y\,dA$, con $R$ la región del primer cuadrante limitada por $y=x^3$ e $y=x$.`,
      pasos: [
        r`Se cortan en $x=0$ y $x=1$; en ese intervalo $x^3\le x$. Tipo I: $\int_0^1\!\int_{x^3}^{x}12x^2e^y\,dy\,dx$.`,
        r`Interior: $12x^2(e^x-e^{x^3})$.`,
        r`$\int_0^112x^2e^x\,dx=12\big[e^x(x^2-2x+2)\big]_0^1=12(e-2)$ y $\int_0^112x^2e^{x^3}dx=4e^{x^3}\Big|_0^1=4(e-1)$.`,
        r`Resultado: $12e-24-4e+4=8e-20\approx1{,}75$. (En clase se hizo en el orden $dx\,dy$ y da lo mismo.)`,
      ],
      respuesta: r`$8e-20$.`,
      lab: 'riemann-doble',
    },
    {
      fuente: 'TP 13, valor medio 1 a (resuelto en clase)',
      enunciado: r`Valor medio de $f(x,y)=x\sqrt{1+y^3}$ sobre la región limitada por $y=x$, $y=2$, $x=0$.`,
      pasos: [
        r`Es el triángulo de vértices $(0,0)$, $(0,2)$, $(2,2)$, de área $A=2$.`,
        r`En el orden $dx\,dy$ (el otro no tiene primitiva): $\int_0^2\!\int_0^yx\sqrt{1+y^3}\,dx\,dy=\int_0^2\frac{y^2}{2}\sqrt{1+y^3}\,dy$.`,
        r`Con $u=1+y^3$: $\frac12\cdot\frac29(1+y^3)^{3/2}\Big|_0^2=\frac19(27-1)=\frac{26}9$.`,
        r`Valor medio: $\frac{1}{2}\cdot\frac{26}9=\frac{13}9$.`,
      ],
      respuesta: r`$\frac{13}9\approx1{,}44$.`,
    },
  ],
  preguntas: [
    {
      id: 'm13-q1', p: r`$\iint_R1\,dA$ representa:`,
      opciones: ['el volumen de R', 'el área de R', 'el perímetro de R', 'el valor medio de 1'],
      ok: 1, por: r`Es el volumen de un prisma de altura 1, numéricamente igual al área de la base.`,
    },
    {
      id: 'm13-q2', p: r`En $\int_a^b\!\int_{g_1(x)}^{g_2(x)}f\,dy\,dx$, los límites $g_1$ y $g_2$:`,
      opciones: ['son constantes', 'pueden depender de x', 'pueden depender de y', 'pueden depender de x y de y'],
      ok: 1, por: r`La integral interior es en $y$ con $x$ fija: sus límites solo pueden depender de $x$.`,
    },
    {
      id: 'm13-q3', p: r`Para calcular $\int_0^1\!\int_x^1e^{y^2}dy\,dx$ conviene:`,
      opciones: ['integrar por partes', r'cambiar el orden: $\int_0^1\!\int_0^ye^{y^2}dx\,dy$', 'usar polares', 'no tiene solución'],
      ok: 1, por: r`$e^{y^2}$ no tiene primitiva elemental en $y$. Cambiando el orden la interior da $y\,e^{y^2}$, que sí se integra: el resultado es $\frac{e-1}{2}$.`,
    },
    {
      id: 'm13-q4', p: r`Una recta horizontal que atraviesa la región entra por $x=y^2$ y sale por $x=y+6$, para $-2\le y\le3$. La integral es:`,
      opciones: [r`$\int_{-2}^{3}\!\int_{y^2}^{y+6}f\,dx\,dy$`, r`$\int_{y^2}^{y+6}\!\int_{-2}^{3}f\,dy\,dx$`, r`$\int_{-2}^{3}\!\int_{y+6}^{y^2}f\,dx\,dy$`, r`$\int_{0}^{9}\!\int_{-2}^{3}f\,dy\,dx$`],
      ok: 0, por: r`Tipo II: $y$ entre números, $x$ desde la curva de entrada hasta la de salida.`,
    },
  ],
};

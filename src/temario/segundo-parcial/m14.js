const r = String.raw;

export default {
  intro: r`La integral triple suma sobre un **sólido**. Ya no se puede dibujar como "volumen bajo algo" (haría falta una cuarta dimensión); se interpreta como volumen cuando $f=1$ y como masa cuando $f$ es una densidad. La clave para plantearla es la misma que en la doble, con un paso más: **proyectar** el sólido sobre un plano coordenado.`,
  teoria: [
    {
      id: 'definicion', titulo: 'Definición y propiedades',
      texto: r`Sea $f$ continua en un sólido $Q$ cerrado y acotado. Se lo encierra en una caja, se la divide en cajitas y se conservan las $n$ que están dentro de $Q$, de volumen $\Delta V_i$; se elige un punto en cada una:

$$\iiint_Qf(x,y,z)\,dV=\lim_{\|\Delta\|\to0}\sum_{i=1}^nf(x_i,y_i,z_i)\,\Delta V_i$$

Con $f=1$ se obtiene el **volumen** de $Q$; si $f=\delta$ es una densidad, la **masa**.

**Propiedades** (las piden en los finales): con $f$, $g$ continuas en $Q$,
1. $\iiint_Qk\,f\,dV=k\iiint_Qf\,dV$.
2. $\iiint_Q(f\pm g)\,dV=\iiint_Qf\,dV\pm\iiint_Qg\,dV$.
3. Si $Q=Q_1\cup Q_2$ sin puntos interiores comunes, $\iiint_Q=\iiint_{Q_1}+\iiint_{Q_2}$.

*Demostración de 2:* para cualquier partición y elección de puntos, $\sum(f\pm g)(P_i)\Delta V_i=\sum f(P_i)\Delta V_i\pm\sum g(P_i)\Delta V_i$; al tender la norma a cero cada suma tiende a su integral. Por ejemplo, $\iiint_Q(g+7)\,dV=\iiint_Qg\,dV+7V$ (final de diciembre 2024).`,
    },
    {
      id: 'iteradas', titulo: 'Integrales iteradas: cómo plantear',
      texto: r`Si $Q=\{(x,y)\in D,\ h_1(x,y)\le z\le h_2(x,y)\}$, donde $D$ es la **proyección** de $Q$ sobre el plano $xy$:

$$\iiint_Qf\,dV=\iint_D\left[\int_{h_1(x,y)}^{h_2(x,y)}f(x,y,z)\,dz\right]dA$$

y la doble sobre $D$ se plantea como en el TP 13. Por ejemplo, con $D$ de tipo I:

$$\int_a^b\!\!\int_{g_1(x)}^{g_2(x)}\!\!\int_{h_1(x,y)}^{h_2(x,y)}f\,dz\,dy\,dx$$

**Receta:**
1. Identificar las superficies que limitan el sólido.
2. Elegir el eje "vertical" (no siempre es $z$): una recta paralela a él debe entrar al sólido por una sola superficie ($h_1$) y salir por una sola ($h_2$).
3. La proyección $D$ sobre el plano perpendicular a ese eje se obtiene igualando $h_1=h_2$ (donde se cortan) o con las paredes verticales (cilindros).
4. Plantear la doble sobre $D$.

Hay **seis órdenes** posibles; todos dan lo mismo (Fubini) y se elige el que simplifique.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 14, ej. 2 a (resuelto en clase)',
      enunciado: r`Plantee $\iiint f\,dV$ sobre el sólido formado por $x^2+y^2=4$, $x^2+2z=4$ y los tres planos coordenados (primer octante).`,
      pasos: [
        r`El techo es $z=\frac{4-x^2}{2}$ (cilindro parabólico) y el piso $z=0$.`,
        r`La pared lateral es el cilindro $x^2+y^2=4$: la proyección sobre $xy$ es el cuarto de disco $0\le x\le2$, $0\le y\le\sqrt{4-x^2}$.`,
        r`$\displaystyle\int_0^2\!\!\int_0^{\sqrt{4-x^2}}\!\!\int_0^{\frac{4-x^2}{2}}f(x,y,z)\,dz\,dy\,dx$. Con $f=1$, el volumen es $\frac{3\pi}{2}$.`,
      ],
      lab: 'region-triple',
    },
    {
      fuente: 'TP 14, ej. 3 b (resuelto en clase)',
      enunciado: r`Calcule $\int_0^1\!\int_0^x\!\int_0^{x+y}(x+y+z)\,dz\,dy\,dx$.`,
      pasos: [
        r`Interior: $\left[(x+y)z+\frac{z^2}2\right]_0^{x+y}=\frac32(x+y)^2=\frac32x^2+3xy+\frac32y^2$.`,
        r`En $y$ de $0$ a $x$: $\frac32x^3+\frac32x^3+\frac12x^3=\frac72x^3$.`,
        r`En $x$: $\frac72\cdot\frac14=\frac78$.`,
      ],
      respuesta: r`$\frac78$.`,
    },
    {
      fuente: 'TP 14, ej. 4 b (resuelto en clase)',
      enunciado: r`$\iiint_Rx^3z\,dV$ con $R$: $3x+2y+z\le6$, $x,y,z\ge0$.`,
      pasos: [
        r`Tetraedro. Techo: $z=6-3x-2y$. Sombra en $xy$: el triángulo bajo $3x+2y=6$, o sea $0\le x\le2$, $0\le y\le3-\frac32x$.`,
        r`$\displaystyle\int_0^2\!\!\int_0^{3-\frac32x}\!\!\int_0^{6-3x-2y}x^3z\,dz\,dy\,dx=\int_0^2\!\!\int_0^{3-\frac32x}\frac{x^3}{2}(6-3x-2y)^2\,dy\,dx$.`,
        r`Con $u=6-3x-2y$: $\int_0^{3-\frac32x}(6-3x-2y)^2dy=\frac{(6-3x)^3}{6}$. Queda $\int_0^2\frac{x^3(6-3x)^3}{12}\,dx=\frac{27}{12}\int_0^2x^3(2-x)^3dx$.`,
        r`$\int_0^2x^3(2-x)^3dx=\frac{2^7\cdot3!\,3!}{7!}=\frac{128\cdot36}{5040}=\frac{32}{35}$. Resultado: $\frac{27}{12}\cdot\frac{32}{35}=\frac{72}{35}$.`,
      ],
      respuesta: r`$\frac{72}{35}\approx2{,}06$.`,
    },
    {
      fuente: 'TP 14, ej. 6 c y h (resueltos en clase)',
      enunciado: r`c) Volumen bajo $z=x^2+y^2$, sobre el triángulo $x+y\le1$ del primer cuadrante. h) $\iiint_Rz\,dV$, $R$ en el primer octante limitada por $y^2+z=1$ y $x^2+z=1$.`,
      pasos: [
        r`**c)** $\int_0^1\!\int_0^{1-x}(x^2+y^2)\,dy\,dx=\int_0^1\left[x^2(1-x)+\frac{(1-x)^3}{3}\right]dx=\frac13-\frac14+\frac1{12}=\frac16$.`,
        r`**h)** Conviene integrar primero en $x$ y en $y$: para cada altura $z$, $0\le x\le\sqrt{1-z}$ y $0\le y\le\sqrt{1-z}$ (un cuadrado).`,
        r`$\int_0^1z\cdot\sqrt{1-z}\cdot\sqrt{1-z}\,dz=\int_0^1(z-z^2)\,dz=\frac16$.`,
      ],
      respuesta: r`c) $\frac16$; h) $\frac16$.`,
    },
    {
      fuente: 'TP 14, ej. 7 (resuelto en clase)',
      enunciado: r`$\iiint_R\frac{dV}{x+y+z+1}$, $R$ limitada por los planos coordenados y $x+y+z=1$.`,
      pasos: [
        r`$\int_0^{1-x-y}\frac{dz}{x+y+z+1}=\ln2-\ln(x+y+1)$.`,
        r`$\int_0^{1-x}[\ln2-\ln(x+y+1)]\,dy=(1-x)\ln2-\big[2\ln2-2-(x+1)\ln(x+1)+(x+1)\big]$.`,
        r`Integrando en $x$ de $0$ a $1$ y simplificando queda $\frac12\ln2-\frac14$.`,
      ],
      respuesta: r`$\frac12\ln2-\frac14\approx0{,}0966$.`,
    },
    {
      fuente: 'TP 14, ej. 8 h (resuelto en clase)',
      enunciado: r`$\iiint_Rz\,dV$, $R$ interior a $x^2+y^2=9$, sobre $z=0$, bajo $x+z=4$, en el primer octante.`,
      pasos: [
        r`Techo $z=4-x$; sombra: el cuarto de disco de radio 3. $\int_0^{4-x}z\,dz=\frac{(4-x)^2}2$.`,
        r`$\frac12\iint_D(16-8x+x^2)\,dA$ con $\iint_DdA=\frac{9\pi}4$, $\iint_Dx\,dA=\frac{r^3}3=9$, $\iint_Dx^2dA=\frac{\pi r^4}{16}=\frac{81\pi}{16}$ (en polares).`,
        r`$\frac12\left[36\pi-72+\frac{81\pi}{16}\right]=\frac{657\pi}{32}-36\approx28{,}5$.`,
      ],
    },
  ],
  preguntas: [
    {
      id: 'm14-q1', p: r`En $\int\!\int\!\int_{h_1(x,y)}^{h_2(x,y)}f\,dz\,dy\,dx$, ¿qué representan $h_1$ y $h_2$?`,
      opciones: ['Las curvas que limitan la sombra del sólido', 'Las superficies por donde entra y sale una recta paralela al eje z', 'Los límites de x', 'Las densidades'],
      ok: 1, por: r`Son el piso y el techo del sólido sobre cada punto de la proyección.`,
    },
    {
      id: 'm14-q2', p: r`$\iiint_Q1\,dV$ es:`,
      opciones: ['el área de la proyección', 'el volumen de Q', 'la masa de Q siempre', 'cero'],
      ok: 1, por: r`Es la masa solo si la densidad es 1.`,
    },
    {
      id: 'm14-q3', p: r`¿Cuántos órdenes de integración distintos tiene una integral triple?`,
      opciones: ['3', '6', '8', '9'],
      ok: 1, por: r`$3!=6$ permutaciones de $dx$, $dy$, $dz$.`,
    },
    {
      id: 'm14-q4', p: r`El sólido entre $z=x^2+y^2$ y $z=8-x^2-y^2$ se proyecta sobre el plano $xy$ en:`,
      opciones: [r`el disco $x^2+y^2\le4$`, r`el disco $x^2+y^2\le8$`, 'todo el plano', r`la circunferencia $x^2+y^2=4$`],
      ok: 0, por: r`Las superficies se cortan donde $x^2+y^2=8-x^2-y^2$, o sea $x^2+y^2=4$; la sombra es el disco que esa curva encierra.`,
    },
  ],
};

const r = String.raw;

export default {
  intro: r`Muchas regiones son incómodas en cartesianas (discos, anillos, elipses, paralelogramos inclinados) y muchos integrandos se simplifican en otras variables. Cambiar de variables es reemplazar la región por otra más simple; el precio es un factor de escala local: **el jacobiano**.`,
  teoria: [
    {
      id: 'jacobiano', titulo: 'Transformación y jacobiano',
      texto: r`Una **transformación** $T(u,v)=\big(x(u,v),\,y(u,v)\big)$ lleva una región $S$ del plano $uv$ a una región $R$ del plano $xy$. Su **jacobiano** es

$$J=\frac{\partial(x,y)}{\partial(u,v)}=\begin{vmatrix}x_u&x_v\\y_u&y_v\end{vmatrix}=x_uy_v-x_vy_u$$

**Por qué aparece.** Un rectangulito de lados $\Delta u$, $\Delta v$ se transforma en casi un paralelogramo de lados $\vec r_u\Delta u$ y $\vec r_v\Delta v$, con $\vec r_u=(x_u,y_u)$, $\vec r_v=(x_v,y_v)$. Su área es $|\vec r_u\times\vec r_v|\,\Delta u\,\Delta v=|J|\,\Delta u\,\Delta v$.

Si se conoce la inversa $u(x,y)$, $v(x,y)$ es más fácil calcular $\frac{\partial(u,v)}{\partial(x,y)}$ y usar $J=\dfrac{1}{\partial(u,v)/\partial(x,y)}$.`,
    },
    {
      id: 'teorema', titulo: 'Teorema del cambio de variables',
      texto: r`**Hipótesis:** $T$ tiene derivadas parciales continuas, es inyectiva en el interior de $S$ y $J\neq0$ en el interior de $S$; $f$ es continua en $R=T(S)$.

**Tesis:**

$$\iint_Rf(x,y)\,dx\,dy=\iint_Sf\big(x(u,v),y(u,v)\big)\,|J|\,du\,dv$$

**Cómo hallar $S$:** se reemplaza cada curva del borde de $R$ por su ecuación en $u$, $v$. Con $u=\frac{2x-y}{2}$, $v=\frac y2$, la recta $x=\frac y2$ se vuelve $u=0$ y $y=4$ se vuelve $v=2$: el paralelogramo pasa a ser un rectángulo.`,
    },
    {
      id: 'polares', titulo: 'Coordenadas polares',
      texto: r`$x=r\cos\theta$, $y=r\operatorname{sen}\theta$, con $x^2+y^2=r^2$:

$$J=\begin{vmatrix}\cos\theta&-r\operatorname{sen}\theta\\\operatorname{sen}\theta&r\cos\theta\end{vmatrix}=r,\qquad dA=r\,dr\,d\theta$$

Convienen cuando la región tiene circunferencias o rectas por el origen, o el integrando tiene $x^2+y^2$.

- Disco $x^2+y^2\le a^2$: $0\le r\le a$, $0\le\theta\le2\pi$.
- Circunferencia que pasa por el origen, $(x-1)^2+y^2=1$: $r^2=2r\cos\theta$, o sea $0\le r\le2\cos\theta$, $-\frac\pi2\le\theta\le\frac\pi2$.

**Polares elípticas** para $\frac{x^2}{a^2}+\frac{y^2}{b^2}\le1$: $x=a\,r\cos\theta$, $y=b\,r\operatorname{sen}\theta$, con $J=ab\,r$ y $0\le r\le1$. (Final de mayo 2025.)

> Recordá: $\int_0^{2\pi}\!\int_0^ae^{-r^2}r\,dr\,d\theta=\pi(1-e^{-a^2})$; la $r$ del jacobiano es la que hace posible la primitiva.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 15, ej. 2 b (resuelto en clase)',
      enunciado: r`Calcule $\int_0^4\!\int_{y/2}^{y/2+1}\frac{2x-y}{2}\,dx\,dy$ con $u=\frac{2x-y}{2}$, $v=\frac y2$.`,
      pasos: [
        r`Despejando: $y=2v$ y $x=u+v$. $J=\begin{vmatrix}1&1\\0&2\end{vmatrix}=2$.`,
        r`Bordes: $y=0\to v=0$; $y=4\to v=2$; $x=\frac y2\to u=0$; $x=\frac y2+1\to u=1$. $S=[0,1]\times[0,2]$.`,
        r`$\int_0^1\!\int_0^2u\cdot2\,dv\,du=2\cdot\int_0^1 2u\,du=2$.`,
      ],
      respuesta: r`$2$.`,
      lab: 'cambio-variables',
    },
    {
      fuente: 'TP 15, ej. 4 (resuelto en clase)',
      enunciado: r`Con polares, $\iint_R(x^2+y^2)\,dA$, $R:(x-1)^2+y^2\le1$.`,
      pasos: [
        r`$x^2+y^2\le2x\Rightarrow r\le2\cos\theta$, con $-\frac\pi2\le\theta\le\frac\pi2$.`,
        r`$\int_{-\pi/2}^{\pi/2}\!\int_0^{2\cos\theta}r^2\cdot r\,dr\,d\theta=\int_{-\pi/2}^{\pi/2}4\cos^4\theta\,d\theta$.`,
        r`$\int_{-\pi/2}^{\pi/2}\cos^4\theta\,d\theta=\frac{3\pi}8$, así que el resultado es $\frac{3\pi}2$.`,
      ],
      respuesta: r`$\frac{3\pi}{2}$.`,
    },
    {
      fuente: 'TP 15, ej. 6 (resuelto en clase)',
      enunciado: r`$\iint_R(x^2+y^2)\,dA$, con $R$ entre $x^2+y^2=1$ y $x^2+y^2=9$ en el primer cuadrante.`,
      pasos: [
        r`$1\le r\le3$ y, en el primer cuadrante, $0\le\theta\le\frac\pi2$.`,
        r`$\int_0^{\pi/2}\!\int_1^3r^3\,dr\,d\theta=\frac\pi2\cdot\frac{81-1}{4}=10\pi$.`,
        r`En la resolución de clase se tomó $0\le\theta\le2\pi$ y dio $40\pi$: ese es el valor para el anillo completo.`,
      ],
      respuesta: r`$10\pi$ (primer cuadrante); $40\pi$ (anillo completo).`,
    },
    {
      fuente: 'TP 15, ej. 8 (resuelto en clase)',
      enunciado: r`Área de la región del primer cuadrante limitada por $\frac{x^2}9+\frac{y^2}4=1$.`,
      pasos: [
        r`Polares elípticas: $x=3r\cos\theta$, $y=2r\operatorname{sen}\theta$, $J=6r$.`,
        r`$\int_0^{\pi/2}\!\int_0^16r\,dr\,d\theta=\frac\pi2\cdot3=\frac{3\pi}2$.`,
        r`Control: un cuarto del área de la elipse, $\frac{\pi\cdot3\cdot2}{4}$.`,
      ],
    },
    {
      fuente: 'Final de diciembre 2024 y 2° parcial, tema 7',
      enunciado: r`a) $x=e^u\operatorname{sen}v$, $y=e^u\cos v$: ¿es $J=-e^{2u}$? b) Con $x=u$, $y=uv$, calcule $\iint_R\frac{\sqrt{x+y}}{x^2}\,dA$, $R$ el triángulo de vértices $(0,0)$, $(4,0)$, $(4,4)$.`,
      pasos: [
        r`**a)** $J=\begin{vmatrix}e^u\operatorname{sen}v&e^u\cos v\\e^u\cos v&-e^u\operatorname{sen}v\end{vmatrix}=-e^{2u}(\operatorname{sen}^2v+\cos^2v)=-e^{2u}$. Verdadero.`,
        r`**b)** $J=\begin{vmatrix}1&0\\v&u\end{vmatrix}=u$. La región $0\le y\le x$, $0\le x\le4$ pasa a $0\le u\le4$, $0\le v\le1$ (porque $v=y/x$).`,
        r`$\frac{\sqrt{u+uv}}{u^2}\cdot u=\frac{\sqrt{1+v}}{\sqrt u}$. $\int_0^4u^{-1/2}du\cdot\int_0^1\sqrt{1+v}\,dv=4\cdot\frac23(2\sqrt2-1)$.`,
      ],
      respuesta: r`b) $\frac83(2\sqrt2-1)\approx4{,}88$.`,
    },
  ],
  preguntas: [
    {
      id: 'm15-q1', p: r`En polares, $dA$ es:`,
      opciones: [r`$dr\,d\theta$`, r`$r\,dr\,d\theta$`, r`$r^2\,dr\,d\theta$`, r`$\frac1r\,dr\,d\theta$`],
      ok: 1, por: r`El jacobiano de $(r\cos\theta,r\operatorname{sen}\theta)$ es $r$.`,
    },
    {
      id: 'm15-q2', p: r`¿Qué hipótesis pide el teorema de cambio de variables sobre $T$?`,
      opciones: ['Que sea lineal', 'Derivadas continuas, inyectiva en el interior y J ≠ 0 en el interior', 'Que J = 1', 'Que lleve rectángulos en rectángulos'],
      ok: 1, por: r`Por eso las polares sirven aunque $J=r$ se anule en el origen: es un punto del borde.`,
    },
    {
      id: 'm15-q3', p: r`Si $T$ tiene $J=-3$, en la integral se multiplica por:`,
      opciones: ['−3', '3', '1/3', '9'],
      ok: 1, por: r`Se usa $|J|$: el área no puede ser negativa.`,
    },
    {
      id: 'm15-q4', p: r`La circunferencia $x^2+y^2=4y$ en polares es:`,
      opciones: [r`$r=4$`, r`$r=4\operatorname{sen}\theta$`, r`$r=4\cos\theta$`, r`$r=2$`],
      ok: 1, por: r`$r^2=4r\operatorname{sen}\theta$. Es la circunferencia de centro $(0,2)$ y radio 2, con $0\le\theta\le\pi$.`,
    },
  ],
};

const r = String.raw;

export default {
  intro: r`Lo mismo que en el TP 15 pero en el espacio: la transformación tiene tres variables y el jacobiano es un determinante de $3\times3$. Las dos transformaciones estrella son las **cilíndricas** (cilindros, paraboloides y conos de eje $z$) y las **esféricas** (esferas y conos con vértice en el origen). En los finales aparece en casi todos los exámenes.`,
  teoria: [
    {
      id: 'teorema', titulo: 'Transformación, jacobiano y teorema',
      texto: r`$T(u,v,w)=\big(x(u,v,w),\,y(u,v,w),\,z(u,v,w)\big)$ lleva una región $S$ del espacio $uvw$ a $R$ en el espacio $xyz$.

$$J=\frac{\partial(x,y,z)}{\partial(u,v,w)}=\begin{vmatrix}x_u&x_v&x_w\\y_u&y_v&y_w\\z_u&z_v&z_w\end{vmatrix}$$

$|J|$ es el factor por el que se multiplica el volumen de una cajita.

**Teorema.** Si $T$ tiene derivadas parciales continuas, es inyectiva en el interior de $S$, $J\neq0$ en el interior de $S$ y $f$ es continua en $R$:

$$\iiint_Rf(x,y,z)\,dx\,dy\,dz=\iiint_Sf\big(T(u,v,w)\big)\,|J|\,du\,dv\,dw$$

Ejemplo (final de marzo 2025): $x=u^2$, $y=v^2$, $z=w^2$ tiene $J=8uvw$ y convierte $\sqrt x+\sqrt y+\sqrt z\le1$ en el tetraedro $u+v+w\le1$.`,
    },
    {
      id: 'cilindricas', titulo: 'Coordenadas cilíndricas',
      texto: r`$x=r\cos\theta$, $y=r\operatorname{sen}\theta$, $z=z$. Son polares en el plano $xy$ y $z$ queda igual.

$$J=r,\qquad dV=r\,dz\,dr\,d\theta$$

- $x^2+y^2=a^2$ es $r=a$ (cilindro).
- $z=x^2+y^2$ es $z=r^2$ (paraboloide); $z^2=x^2+y^2$ es $z=r$ (cono).
- Las circunferencias que pasan por el eje, $x^2+y^2=2ax$, son $r=2a\cos\theta$.

**Cilíndricas elípticas** (final de diciembre 2024): $x=a\,r\cos\theta$, $y=b\,r\operatorname{sen}\theta$, $z=z$, con $J=ab\,r$. Convierten $\frac{x^2}{a^2}+\frac{y^2}{b^2}$ en $r^2$.

Si el eje del sólido no es $z$ (por ejemplo $y^2+z^2=2y$), se usan cilíndricas alrededor de ese eje.`,
    },
    {
      id: 'esfericas', titulo: 'Coordenadas esféricas',
      texto: r`$x=\rho\operatorname{sen}\varphi\cos\theta$, $y=\rho\operatorname{sen}\varphi\operatorname{sen}\theta$, $z=\rho\cos\varphi$, con $\rho\ge0$, $0\le\varphi\le\pi$ (medido desde el eje $z$ positivo) y $0\le\theta\le2\pi$.

$$J=\rho^2\operatorname{sen}\varphi,\qquad dV=\rho^2\operatorname{sen}\varphi\,d\rho\,d\varphi\,d\theta$$

- $x^2+y^2+z^2=a^2$ es $\rho=a$.
- El cono $z=\sqrt{x^2+y^2}$ es $\varphi=\frac\pi4$; en general $z=k\sqrt{x^2+y^2}$ es $\operatorname{tg}\varphi=\frac1k$.
- $x^2+y^2+z^2=2az$ (esfera apoyada en el origen) es $\rho=2a\cos\varphi$.

> El error más común (final de mayo 2024): olvidarse el $\rho^2$. $\int_0^{\pi/2}\!\int_0^{\pi/2}\!\int_0^2\operatorname{sen}\varphi\,d\rho\,d\varphi\,d\theta=\pi$, pero el volumen del octante de esfera es $\frac{4\pi}{3}$.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 16, ej. 1 b',
      enunciado: r`Jacobiano de $x=e^{au}$, $y=e^{bv}$, $z=e^{cw}$.`,
      pasos: [
        r`Cada variable depende de una sola: la matriz es diagonal.`,
        r`$J=\begin{vmatrix}ae^{au}&0&0\\0&be^{bv}&0\\0&0&ce^{cw}\end{vmatrix}=abc\,e^{au+bv+cw}$.`,
      ],
    },
    {
      fuente: 'TP 16, ej. 2 b',
      enunciado: r`Pase a cilíndricas y evalúe $\int_0^1\!\int_0^x\!\int_0^{\sqrt{x^2+y^2}}\frac{dz\,dy\,dx}{\sqrt{x^2+y^2}}$.`,
      pasos: [
        r`La sombra es el triángulo $0\le y\le x\le1$: $0\le\theta\le\frac\pi4$ y, como $x=1$ es $r=\sec\theta$, $0\le r\le\sec\theta$. Además $0\le z\le r$.`,
        r`$\int_0^{\pi/4}\!\int_0^{\sec\theta}\!\int_0^r\frac1r\cdot r\,dz\,dr\,d\theta=\int_0^{\pi/4}\!\int_0^{\sec\theta}r\,dr\,d\theta$.`,
        r`$=\int_0^{\pi/4}\frac{\sec^2\theta}{2}d\theta=\frac12\operatorname{tg}\frac\pi4=\frac12$.`,
      ],
      respuesta: r`$\frac12$.`,
    },
    {
      fuente: 'TP 16, ej. 3',
      enunciado: r`Con esféricas, evalúe $\int_{-1}^1\!\int_{-\sqrt{1-x^2}}^{\sqrt{1-x^2}}\!\int_{-\sqrt{1-x^2-y^2}}^{\sqrt{1-x^2-y^2}}\sqrt{x^2+y^2+z^2}\,dz\,dy\,dx$.`,
      pasos: [
        r`La región es la bola unitaria completa: $0\le\rho\le1$, $0\le\varphi\le\pi$, $0\le\theta\le2\pi$. El integrando es $\rho$.`,
        r`$\int_0^{2\pi}\!\int_0^\pi\!\int_0^1\rho\cdot\rho^2\operatorname{sen}\varphi\,d\rho\,d\varphi\,d\theta=2\pi\cdot2\cdot\frac14=\pi$.`,
      ],
      respuesta: r`$\pi$.`,
      lab: 'coordenadas-3d',
    },
    {
      fuente: 'TP 16, ej. 11',
      enunciado: r`$\iiint_Re^x\sqrt{y^2+z^2}\,dV$, $R$ entre $x=1$, $x=2$, $y^2+z^2=4$ y $y^2+z^2=9$.`,
      pasos: [
        r`Los cilindros tienen eje $x$: cilíndricas alrededor de $x$, $y=r\cos\theta$, $z=r\operatorname{sen}\theta$, $x=x$, $J=r$.`,
        r`$\int_1^2e^xdx\int_0^{2\pi}\!\int_2^3r\cdot r\,dr\,d\theta=(e^2-e)\cdot2\pi\cdot\frac{27-8}{3}$.`,
      ],
      respuesta: r`$\frac{38\pi}{3}(e^2-e)\approx185{,}9$.`,
    },
    {
      fuente: 'TP 16, ej. 13',
      enunciado: r`Volumen limitado por $x^2+y^2=2x$, $x^2+y^2=4x$ y los planos $z=-1$, $z=3$.`,
      pasos: [
        r`En polares las circunferencias son $r=2\cos\theta$ y $r=4\cos\theta$, con $-\frac\pi2\le\theta\le\frac\pi2$.`,
        r`$\int_{-\pi/2}^{\pi/2}\!\int_{2\cos\theta}^{4\cos\theta}\!\int_{-1}^{3}r\,dz\,dr\,d\theta=4\int_{-\pi/2}^{\pi/2}6\cos^2\theta\,d\theta=24\cdot\frac\pi2$.`,
        r`Control: altura 4 por el área entre los discos de radios 2 y 1, $4(4\pi-\pi)$.`,
      ],
      respuesta: r`$12\pi$.`,
    },
    {
      fuente: 'TP 16, ej. 16',
      enunciado: r`$\iiint_R\left(\frac{x^2}{a^2}+\frac{y^2}{b^2}+\frac{z^2}{c^2}\right)dV$, con $R$ el elipsoide $\frac{x^2}{a^2}+\frac{y^2}{b^2}+\frac{z^2}{c^2}\le1$.`,
      pasos: [
        r`Esféricas elípticas: $x=a\rho\operatorname{sen}\varphi\cos\theta$, $y=b\rho\operatorname{sen}\varphi\operatorname{sen}\theta$, $z=c\rho\cos\varphi$, con $J=abc\,\rho^2\operatorname{sen}\varphi$. El integrando es $\rho^2$ y la región, $\rho\le1$.`,
        r`$abc\int_0^{2\pi}\!\int_0^\pi\!\int_0^1\rho^4\operatorname{sen}\varphi\,d\rho\,d\varphi\,d\theta=abc\cdot2\pi\cdot2\cdot\frac15$.`,
      ],
      respuesta: r`$\frac{4\pi abc}{5}$.`,
    },
  ],
  preguntas: [
    {
      id: 'm16-q1', p: r`En esféricas, $dV$ es:`,
      opciones: [r`$\rho\,d\rho\,d\varphi\,d\theta$`, r`$\rho^2\operatorname{sen}\varphi\,d\rho\,d\varphi\,d\theta$`, r`$\rho^2\cos\varphi\,d\rho\,d\varphi\,d\theta$`, r`$d\rho\,d\varphi\,d\theta$`],
      ok: 1, por: r`Es el jacobiano de la transformación esférica (con $\varphi$ medido desde el eje $z$).`,
    },
    {
      id: 'm16-q2', p: r`El cono $z=\sqrt{x^2+y^2}$ en esféricas es:`,
      opciones: [r`$\rho=1$`, r`$\varphi=\frac\pi4$`, r`$\theta=\frac\pi4$`, r`$\varphi=\frac\pi2$`],
      ok: 1, por: r`$\rho\cos\varphi=\rho\operatorname{sen}\varphi\Rightarrow\operatorname{tg}\varphi=1$.`,
    },
    {
      id: 'm16-q3', p: r`¿Qué coordenadas convienen para el sólido entre $z=x^2+y^2$ y $z=4$?`,
      opciones: ['Esféricas', 'Cilíndricas', 'Cartesianas', 'Polares elípticas'],
      ok: 1, por: r`$z=r^2$ y $z=4$: $0\le r\le2$, $r^2\le z\le4$, $0\le\theta\le2\pi$.`,
    },
    {
      id: 'm16-q4', p: r`El jacobiano de $x=2r\cos\theta$, $y=3r\operatorname{sen}\theta$, $z=z$ es:`,
      opciones: [r`$r$`, r`$6r$`, r`$6$`, r`$5r$`],
      ok: 1, por: r`El bloque de $x,y$ es el de polares elípticas ($ab\,r$) y $z_z=1$.`,
    },
  ],
};

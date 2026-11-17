const r = String.raw;

export default {
  intro: r`Optimizar es el objetivo práctico de todo el primer parcial: el gradiente da los candidatos, el hessiano los clasifica y, cuando hay una restricción, Lagrange encuentra los extremos sin despejar. Es el tema que **más se toma en los finales**.`,
  teoria: [
    {
      id: 'definiciones', titulo: 'Extremos relativos y absolutos',
      texto: r`$f$ tiene un **máximo relativo** en $P_0$ si $f(P_0)\ge f(P)$ para todo $P$ de algún entorno de $P_0$; **mínimo relativo** si $f(P_0)\le f(P)$. Es **absoluto** si la desigualdad vale en todo el dominio.

La definición solo compara valores: no pide continuidad ni derivadas. En el final de diciembre 2024: $f=-(x^2+y^2)$ con $f(0,0)=4$ tiene en el origen un máximo absoluto, aunque sea discontinua.`,
    },
    {
      id: 'criticos', titulo: 'Condición necesaria: puntos críticos',
      texto: r`**Teorema.** Si $f$ tiene un extremo relativo en un punto interior $P_0$ y existen sus derivadas parciales, entonces $f_x(P_0)=f_y(P_0)=0$.

*Demostración:* $g(x)=f(x,y_0)$ tiene un extremo en $x_0$, así que $g'(x_0)=f_x(P_0)=0$; igual con $y$.

Por eso los candidatos (**puntos críticos**) son los puntos interiores del dominio donde:
- $\nabla f(P_0)=\vec0$ (puntos estacionarios), **o**
- alguna derivada parcial **no existe**.

> Final de mayo 2024: "si alguna derivada no existe, $P_0$ no es crítico" es **falso**. $\sqrt{x^2+y^2}$ no tiene derivadas en el origen y ahí tiene su mínimo.

No todo punto crítico es extremo: en un **punto de silla** (ensilladura) la función crece en unas direcciones y decrece en otras.`,
    },
    {
      id: 'hessiano', titulo: 'Condición suficiente: el hessiano',
      texto: r`Si $f$ tiene derivadas segundas continuas cerca de un punto estacionario $P_0$, sea

$$D=H(P_0)=\begin{vmatrix}f_{xx}&f_{xy}\\f_{yx}&f_{yy}\end{vmatrix}=f_{xx}f_{yy}-f_{xy}^2$$

- $D>0$ y $f_{xx}>0$: **mínimo relativo**.
- $D>0$ y $f_{xx}<0$: **máximo relativo**.
- $D<0$: **punto de silla**.
- $D=0$: el criterio **no decide**; hay que estudiar la función cerca del punto.

*Por qué:* cerca de $P_0$, $\Delta f\approx\frac12\big(f_{xx}h^2+2f_{xy}hk+f_{yy}k^2\big)$ (el diferencial segundo). Si $D>0$ esa forma cuadrática no cambia de signo; si $D<0$, toma ambos signos.`,
    },
    {
      id: 'absolutos', titulo: 'Extremos absolutos en una región cerrada y acotada',
      texto: r`**Teorema de Weierstrass:** una función continua en una región cerrada y acotada $R$ alcanza un máximo y un mínimo absolutos en $R$.

Método:
1. Puntos críticos **interiores** a $R$.
2. Puntos críticos **sobre la frontera**: se parametriza o se reemplaza cada borde en $f$ y se buscan los extremos de la función de una variable (o se usa Lagrange).
3. Los **vértices** de la frontera.
4. Se evalúa $f$ en todos los candidatos: el mayor valor es el máximo absoluto y el menor el mínimo.`,
    },
    {
      id: 'lagrange', titulo: 'Extremos condicionados: multiplicadores de Lagrange',
      texto: r`Para extremos de $f(x,y,z)$ sujetos a $\varphi(x,y,z)=0$ se arma la **función de Lagrange** $F=f+\lambda\varphi$ y se resuelve

$$F_x=0,\quad F_y=0,\quad F_z=0,\quad\varphi=0$$

**Idea geométrica.** Sobre la restricción, $f$ es extrema donde su curva (o superficie) de nivel es tangente a la restricción: ahí $\nabla f$ y $\nabla\varphi$ son paralelos, $\nabla f=-\lambda\nabla\varphi$.

**Deducción** (final de mayo 2024): con $w=w(u,v)$ despejada de $\varphi=0$, la condición $z_u=f_u+f_ww_u=0$ y $w_u=-\varphi_u/\varphi_w$ dan $f_u-\frac{f_w}{\varphi_w}\varphi_u=0$; llamando $\lambda=-\frac{f_w}{\varphi_w}$ salen las cuatro ecuaciones.

**Dos restricciones** $g_1=0$, $g_2=0$ (final de diciembre 2024): $F=f+\lambda_1g_1+\lambda_2g_2$ y cinco ecuaciones $F_x=F_y=F_z=0$, $g_1=g_2=0$. Geométricamente $\nabla f$ está en el plano de $\nabla g_1$ y $\nabla g_2$.

Para **clasificar** un punto hallado con Lagrange, la cátedra despeja una variable de la restricción, la reemplaza en $f$ y aplica el hessiano a la función de dos variables que queda. Muchas veces el contexto (distancia mínima, volumen máximo) ya lo decide.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 12, ej. 1 a (resuelto en clase)',
      enunciado: r`Encuentre y clasifique los puntos críticos de $f(x,y)=x^3+y^2-6x^2+y-1$.`,
      pasos: [
        r`$f_x=3x^2-12x=3x(x-4)=0\Rightarrow x=0$ o $x=4$. $f_y=2y+1=0\Rightarrow y=-\frac12$.`,
        r`Críticos: $P_1\left(0,-\frac12\right)$ y $P_2\left(4,-\frac12\right)$.`,
        r`$f_{xx}=6x-12$, $f_{xy}=0$, $f_{yy}=2$. $D=(6x-12)\cdot2=12x-24$.`,
        r`$D(P_1)=-24<0$: **silla**. $D(P_2)=24>0$ con $f_{xx}=12>0$: **mínimo relativo**, $f(P_2)=-33{,}25$.`,
      ],
      lab: 'extremos',
    },
    {
      fuente: 'TP 12, ej. 2 a (resuelto en clase)',
      enunciado: r`Máximo y mínimo absolutos de $f(x,y)=2x-x^2+3y-y^2$ en el rectángulo $0\le x\le2$, $0\le y\le3$.`,
      pasos: [
        r`$f$ es continua y $R$ cerrada y acotada: existen los extremos absolutos.`,
        r`Interior: $f_x=2-2x=0$, $f_y=3-2y=0$: $P_1\left(1,\frac32\right)$.`,
        r`Bordes: en $x=0$ y en $x=2$ queda $3y-y^2$, crítico en $y=\frac32$: $\left(0,\frac32\right)$, $\left(2,\frac32\right)$. En $y=0$ y en $y=3$ queda $2x-x^2$, crítico en $x=1$: $(1,0)$, $(1,3)$. Vértices: $(0,0)$, $(0,3)$, $(2,3)$, $(2,0)$.`,
        r`Valores: $f\left(1,\frac32\right)=\frac{13}4$; $f\left(0,\frac32\right)=f\left(2,\frac32\right)=\frac94$; $f(1,0)=f(1,3)=1$; en los cuatro vértices, $0$.`,
      ],
      respuesta: r`Máximo absoluto $\frac{13}4$ en $\left(1,\frac32\right)$; mínimo absoluto $0$ en los cuatro vértices.`,
    },
    {
      fuente: 'TP 12, ej. 3 b (resuelto en clase)',
      enunciado: r`Extremos absolutos de $f(x,y)=x^2+2y^2-2x+3$ en $x^2+y^2\le10$.`,
      pasos: [
        r`Interior: $f_x=2x-2=0$, $f_y=4y=0$: $(1,0)$, $f=2$.`,
        r`Frontera: $y^2=10-x^2$ con $-\sqrt{10}\le x\le\sqrt{10}$. $g(x)=x^2+2(10-x^2)-2x+3=-x^2-2x+23$; $g'=0\Rightarrow x=-1$, $y=\pm3$: $f=24$.`,
        r`Extremos del intervalo: $x=\pm\sqrt{10}$, $y=0$: $f=13\mp2\sqrt{10}$, o sea $6{,}68$ y $19{,}32$.`,
      ],
      respuesta: r`Mínimo absoluto $2$ en $(1,0)$; máximo absoluto $24$ en $(-1,\pm3)$.`,
    },
    {
      fuente: 'TP 12, ej. 4 b (resuelto en clase)',
      enunciado: r`Puntos críticos de $f=x^2+y^2+z^2$ sujeta a $3x-2y+z-4=0$.`,
      pasos: [
        r`$F=x^2+y^2+z^2+\lambda(3x-2y+z-4)$: $2x+3\lambda=0$, $2y-2\lambda=0$, $2z+\lambda=0$.`,
        r`$x=-\frac{3\lambda}2$, $y=\lambda$, $z=-\frac\lambda2$. En la restricción: $-\frac92\lambda-2\lambda-\frac\lambda2-4=0\Rightarrow\lambda=-\frac47$.`,
        r`$P\left(\frac67,-\frac47,\frac27\right)$, $f(P)=\frac{36+16+4}{49}=\frac87$.`,
        r`Clasificación: con $z=4-3x+2y$, $f(x,y)=x^2+y^2+(4-3x+2y)^2$ tiene $f_{xx}=20$, $f_{yy}=10$, $f_{xy}=-12$: $D=56>0$, **mínimo**. Es el cuadrado de la distancia del origen al plano.`,
      ],
    },
    {
      fuente: 'TP 12, ej. 7 (resuelto en clase)',
      enunciado: r`Punto del plano $x+2y+3z=13$ más próximo a $(1,1,1)$.`,
      pasos: [
        r`Se minimiza el cuadrado de la distancia: $f=(x-1)^2+(y-1)^2+(z-1)^2$ con $\varphi=x+2y+3z-13$.`,
        r`$2(x-1)+\lambda=0$, $2(y-1)+2\lambda=0$, $2(z-1)+3\lambda=0$: $x=1-\frac\lambda2$, $y=1-\lambda$, $z=1-\frac{3\lambda}2$.`,
        r`En el plano: $6-7\lambda=13\Rightarrow\lambda=-1$. Punto $\left(\frac32,2,\frac52\right)$.`,
        r`Distancia mínima: $\sqrt{\frac14+1+\frac94}=\sqrt{\frac72}$, que coincide con $\frac{|1+2+3-13|}{\sqrt{14}}=\frac{7}{\sqrt{14}}$.`,
      ],
    },
    {
      fuente: 'TP 12, ej. 16 (resuelto en clase)',
      enunciado: r`Mayor volumen de una caja de lados paralelos a los ejes inscripta en $6x^2+4y^2+4z^2=36$.`,
      pasos: [
        r`Con el vértice $(x,y,z)$ en el primer octante, $V=8xyz$ y $\varphi=6x^2+4y^2+4z^2-36$.`,
        r`$8yz+12\lambda x=0$, $8xz+8\lambda y=0$, $8xy+8\lambda z=0$. Multiplicando por $x$, $y$, $z$ e igualando: $12x^2=8y^2=8z^2$, o sea $y^2=z^2=\frac32x^2$.`,
        r`En la restricción: $6x^2+6x^2+6x^2=36\Rightarrow x^2=2$: $x=\sqrt2$, $y=z=\sqrt3$.`,
        r`$V=8\sqrt2\cdot3=24\sqrt2$. El hessiano de la función reducida confirma el máximo.`,
      ],
      respuesta: r`$24\sqrt2\approx33{,}9$ unidades cúbicas.`,
    },
    {
      fuente: 'TP 12, ej. 26 (dos restricciones)',
      enunciado: r`Extremos relativos de $f(x,y,z)=xz+yz$ sobre la intersección de $x^2+z^2=2$ e $yz=2$.`,
      pasos: [
        r`Sobre la curva, $yz=2$, así que $f=xz+2$. Basta estudiar $xz$ con $x^2+z^2=2$ (y luego $y=\frac2z$).`,
        r`Con $x=\sqrt2\cos t$, $z=\sqrt2\operatorname{sen}t$: $xz=\operatorname{sen}2t$, entre $-1$ y $1$.`,
        r`Máximo $xz=1$ en $x=z=\pm1$: puntos $(1,2,1)$ y $(-1,-2,-1)$, con $f=3$.`,
        r`Mínimo $xz=-1$ en $x=-z$: puntos $(1,-2,-1)$ y $(-1,2,1)$, con $f=1$. Con Lagrange de dos multiplicadores se llega a los mismos puntos.`,
      ],
    },
  ],
  preguntas: [
    {
      id: 'm12-q1', p: r`En un punto estacionario, $f_{xx}=2$, $f_{yy}=2$, $f_{xy}=3$. Es:`,
      opciones: ['mínimo relativo', 'máximo relativo', 'punto de silla', 'el criterio no decide'],
      ok: 2, por: r`$D=4-9=-5<0$. Aunque $f_{xx}>0$, el término cruzado domina.`,
    },
    {
      id: 'm12-q2', p: r`¿Cuáles son los candidatos a extremo absoluto en una región cerrada y acotada?`,
      opciones: ['Solo los puntos con gradiente nulo', 'Los críticos interiores, los críticos de la frontera y los vértices', 'Solo los vértices', 'Los puntos donde D > 0'],
      ok: 1, por: r`El extremo puede estar en el borde, donde el gradiente no tiene por qué anularse.`,
    },
    {
      id: 'm12-q3', p: r`Si $D=0$ en un punto estacionario:`,
      opciones: ['es un punto de silla', 'no es extremo', 'hay que estudiar la función directamente', 'es un extremo absoluto'],
      ok: 2, por: r`$x^4+y^4$ (mínimo), $-x^4-y^4$ (máximo) y $x^4-y^4$ (silla) tienen $D=0$ en el origen.`,
    },
    {
      id: 'm12-q4', p: r`En el método de Lagrange, en un extremo condicionado:`,
      opciones: [r`$\nabla f=\vec0$`, r`$\nabla f$ es paralelo a $\nabla\varphi$`, r`$\nabla f$ es perpendicular a $\nabla\varphi$`, r`$\lambda=0$`],
      ok: 1, por: r`$\nabla f+\lambda\nabla\varphi=\vec0$. Si además $\lambda=0$, el punto ya era crítico sin restricción.`,
    },
    {
      id: 'm12-q5', p: r`Para optimizar con dos restricciones en $\mathbb R^3$, ¿cuántas ecuaciones e incógnitas tiene el sistema de Lagrange?`,
      opciones: ['3 y 3', '4 y 4', '5 y 5', '6 y 6'],
      ok: 2, por: r`Incógnitas $x,y,z,\lambda_1,\lambda_2$; ecuaciones $F_x,F_y,F_z$ y las dos restricciones.`,
    },
  ],
};

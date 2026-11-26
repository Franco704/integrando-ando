const r = String.raw;

export default {
  intro: r`Todo este TP sale de una sola idea del TP 9: **el gradiente es perpendicular a las superficies de nivel**. Con un vector normal se escribe el plano tangente; con dos normales (dos superficies que se cortan) se obtiene la dirección de la curva intersección. El resto es geometría del TP 0.`,
  teoria: [
    {
      id: 'plano', titulo: 'Plano tangente y recta normal a una superficie',
      texto: r`**Superficie implícita** $F(x,y,z)=0$. Si $F$ es diferenciable en $P_0$ y $\nabla F(P_0)\neq\vec0$, toda curva sobre la superficie que pase por $P_0$ tiene su tangente perpendicular a $\nabla F(P_0)$. Todas esas tangentes forman el **plano tangente**:

$$F_x(P_0)(x-x_0)+F_y(P_0)(y-y_0)+F_z(P_0)(z-z_0)=0$$

**Recta normal:** pasa por $P_0$ con dirección $\nabla F(P_0)$:

$$\frac{x-x_0}{F_x(P_0)}=\frac{y-y_0}{F_y(P_0)}=\frac{z-z_0}{F_z(P_0)}$$

**Superficie explícita** $z=f(x,y)$: se toma $F=f(x,y)-z$, con $\nabla F=(f_x,f_y,-1)$:

$$z-z_0=f_x(x_0,y_0)(x-x_0)+f_y(x_0,y_0)(y-y_0)$$`,
    },
    {
      id: 'curvas', titulo: 'Recta tangente y plano normal a una curva',
      texto: r`**Curva paramétrica** $x=x(t)$, $y=y(t)$, $z=z(t)$: la dirección tangente en $t_0$ es $\vec r\,{}'(t_0)$.

$$\frac{x-x_0}{x'(t_0)}=\frac{y-y_0}{y'(t_0)}=\frac{z-z_0}{z'(t_0)},\qquad x'(t_0)(x-x_0)+y'(t_0)(y-y_0)+z'(t_0)(z-z_0)=0$$

(recta tangente y plano normal).

**Curva intersección** de $F=0$ y $G=0$: la tangente está en los dos planos tangentes, así que es perpendicular a ambas normales. Su dirección es

$$\nabla F\times\nabla G=\left(\frac{\partial(F,G)}{\partial(y,z)},\ \frac{\partial(F,G)}{\partial(z,x)},\ \frac{\partial(F,G)}{\partial(x,y)}\right)$$

Los tres jacobianos son los menores del producto vectorial. Si no son todos nulos, la curva tiene tangente en $P_0$.

**Curva en un plano coordenado.** Si la curva es $z=f(x,y)$ cortada con $y=y_0$, la dirección es $(1,0,f_x)$ y la tangente es $z-z_0=f_x(x_0,y_0)(x-x_0)$, $y=y_0$.`,
    },
    {
      id: 'superficies', titulo: 'Superficies tangentes, ortogonales y ángulo entre superficies',
      texto: r`El **ángulo entre dos superficies** en un punto común es el ángulo entre sus normales:

$$\cos\varphi=\frac{\nabla F\cdot\nabla G}{|\nabla F|\,|\nabla G|}$$

- **Tangentes** en $P_0$: normales paralelas, $\nabla F(P_0)=\lambda\nabla G(P_0)$. Comparten el plano tangente.
- **Ortogonales** en $P_0$: normales perpendiculares, $\nabla F\cdot\nabla G=0$.

> Final de noviembre: si $z=g(x,y)$ y $z=h(x,y)$ se cortan ortogonalmente, con normales $(g_x,g_y,-1)$ y $(h_x,h_y,-1)$ el producto escalar nulo da $g_xh_x+g_yh_y+1=0$.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 10, ej. II (resuelto en clase)',
      enunciado: r`Pendiente de la recta tangente a la curva intersección de $z=x^2+y^2$ con el plano $y=1$ en $(2,1,5)$. Vector dirección y ecuación de la recta.`,
      pasos: [
        r`Con $y$ fija, la pendiente es $z_x=2x$; en $x=2$ vale $4$. Es la interpretación geométrica de la derivada parcial.`,
        r`Dirección: $(1,0,f_x)=(1,0,4)$.`,
        r`Recta: $z-5=4(x-2)$, $y=1$. Paramétrica: $x=2+t$, $y=1$, $z=5+4t$.`,
      ],
      lab: 'corte-parcial',
    },
    {
      fuente: 'TP 10, ej. 1 b (resuelto en clase)',
      enunciado: r`Plano tangente y recta normal a $x^2+y^2+z^2=17$ en $P_0(2,-2,3)$.`,
      pasos: [
        r`$F=x^2+y^2+z^2-17$, $\nabla F=(2x,2y,2z)$; en $P_0$: $(4,-4,6)$.`,
        r`Plano: $4(x-2)-4(y+2)+6(z-3)=0\Rightarrow4x-4y+6z=34$ (o $2x-2y+3z=17$).`,
        r`Normal: $\frac{x-2}{4}=\frac{y+2}{-4}=\frac{z-3}{6}$. Pasa por el origen, el centro de la esfera.`,
      ],
      lab: 'plano-tangente',
    },
    {
      fuente: 'TP 10, ej. 5 (resuelto en clase)',
      enunciado: r`Determine $c>0$ para que el plano tangente a $xyz=c^3$ en $(1,c,c^2)$ forme con los planos coordenados un tetraedro de volumen 36.`,
      pasos: [
        r`$\nabla F=(yz,xz,xy)$; en el punto: $(c^3,c^2,c)$.`,
        r`Plano: $c^3(x-1)+c^2(y-c)+c(z-c^2)=0\Rightarrow c^3x+c^2y+cz=3c^3$.`,
        r`Forma segmentaria: $\frac{x}{3}+\frac{y}{3c}+\frac{z}{3c^2}=1$. Las intersecciones con los ejes son $3$, $3c$ y $3c^2$.`,
        r`$V=\frac16\cdot3\cdot3c\cdot3c^2=\frac92c^3=36\Rightarrow c^3=8\Rightarrow c=2$.`,
      ],
      respuesta: r`$c=2$.`,
    },
    {
      fuente: 'TP 10, ej. 14 a (resuelto en clase)',
      enunciado: r`Pruebe que $x^2+y^2+z^2=18$ y $xy=9$ son tangentes en $(3,3,0)$.`,
      pasos: [
        r`$\nabla F=(2x,2y,2z)=(6,6,0)$ y $\nabla G=(y,x,0)=(3,3,0)$ en el punto.`,
        r`$\nabla F=2\,\nabla G$: normales paralelas, mismo plano tangente $x+y=6$. Son tangentes.`,
      ],
    },
    {
      fuente: 'TP 10, ej. 18 (resuelto en clase)',
      enunciado: r`Recta tangente y plano normal a la curva intersección de $3x^2+2y^2+z^2=49$ y $x^2+y^2-2z^2=10$ en $(3,-3,2)$.`,
      pasos: [
        r`$\nabla F=(6x,4y,2z)=(18,-12,4)$; $\nabla G=(2x,2y,-4z)=(6,-6,-8)$.`,
        r`$\frac{\partial(F,G)}{\partial(y,z)}=\begin{vmatrix}-12&4\\-6&-8\end{vmatrix}=120$; $\frac{\partial(F,G)}{\partial(z,x)}=\begin{vmatrix}4&18\\-8&6\end{vmatrix}=168$; $\frac{\partial(F,G)}{\partial(x,y)}=\begin{vmatrix}18&-12\\6&-6\end{vmatrix}=-36$.`,
        r`Dirección $(120,168,-36)=12\,(10,14,-3)$. Recta: $\frac{x-3}{10}=\frac{y+3}{14}=\frac{z-2}{-3}$.`,
        r`Plano normal: $10(x-3)+14(y+3)-3(z-2)=0\Rightarrow10x+14y-3z=-18$.`,
      ],
    },
    {
      fuente: 'TP 10, ej. 20 (resuelto en clase)',
      enunciado: r`Ángulo de intersección de $x^2y+z=3$ y $x\ln z-y^2=-4$ en $(-1,2,1)$.`,
      pasos: [
        r`$\nabla F=(2xy,x^2,1)=(-4,1,1)$; $\nabla G=\left(\ln z,-2y,\frac xz\right)=(0,-4,-1)$.`,
        r`$\cos\varphi=\frac{0-4-1}{\sqrt{18}\sqrt{17}}=-\frac{5}{\sqrt{306}}\approx-0{,}286$.`,
        r`$\varphi\approx106{,}6°$; el ángulo agudo entre las superficies es su suplemento, $\approx73{,}4°$.`,
      ],
    },
  ],
  preguntas: [
    {
      id: 'm10-q1', p: r`El vector normal al plano tangente de $z=f(x,y)$ en $P_0$ es:`,
      opciones: [r`$(f_x,f_y,1)$`, r`$(f_x,f_y,-1)$`, r`$(x_0,y_0,z_0)$`, r`$(1,1,f_x+f_y)$`],
      ok: 1, por: r`Es $\nabla F$ con $F=f(x,y)-z$. También sirve su opuesto $(-f_x,-f_y,1)$.`,
    },
    {
      id: 'm10-q2', p: r`La dirección de la recta tangente a la curva intersección de $F=0$ y $G=0$ es:`,
      opciones: [r`$\nabla F+\nabla G$`, r`$\nabla F\cdot\nabla G$`, r`$\nabla F\times\nabla G$`, r`$\nabla F$`],
      ok: 2, por: r`Perpendicular a las dos normales a la vez.`,
    },
    {
      id: 'm10-q3', p: r`Dos superficies son ortogonales en $P_0$ si:`,
      opciones: [r`$\nabla F(P_0)=\lambda\nabla G(P_0)$`, r`$\nabla F(P_0)\cdot\nabla G(P_0)=0$`, r`$\nabla F(P_0)\times\nabla G(P_0)=\vec0$`, r`$F(P_0)=G(P_0)$`],
      ok: 1, por: r`Normales perpendiculares. Si fueran paralelas, serían tangentes.`,
    },
    {
      id: 'm10-q4', p: r`La recta normal a una esfera centrada en el origen en cualquiera de sus puntos…`,
      opciones: ['es tangente a la esfera', 'pasa por el origen', 'es paralela al eje z', 'no existe en el ecuador'],
      ok: 1, por: r`$\nabla F=(2x,2y,2z)$ es paralelo a $\vec{OP_0}$.`,
    },
  ],
};

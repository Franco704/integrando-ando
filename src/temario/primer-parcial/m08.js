const r = String.raw;

export default {
  intro: r`Muchas curvas y superficies vienen dadas por una ecuación que no se puede despejar: $x^3+y^3=2xy$ no tiene un "$y=$" cómodo. El teorema de Cauchy dice cuándo esa ecuación define igual una función, y la regla de la cadena da su derivada **sin despejar nada**.`,
  teoria: [
    {
      id: 'definicion', titulo: 'Funciones explícitas e implícitas',
      texto: r`**Explícita:** la variable dependiente está despejada, $y=f(x)$ o $z=f(x,y)$.

**Implícita:** la relación es una ecuación $F(x,y)=0$ (o $F(x,y,z)=0$) y la dependencia queda "escondida". Una misma ecuación puede definir varias funciones: $x^2+y^2-4=0$ define $y=\sqrt{4-x^2}$ e $y=-\sqrt{4-x^2}$. Por eso el teorema es **local**: habla de lo que pasa cerca de un punto.`,
    },
    {
      id: 'cauchy', titulo: 'Condiciones de Cauchy y derivada',
      texto: r`**Teorema (Cauchy-Dini).** Sea $P_0(x_0,y_0)$ tal que:

1. $F(x_0,y_0)=0$.
2. $F$, $F_x$ y $F_y$ son continuas en un entorno de $P_0$.
3. $F_y(x_0,y_0)\neq0$.

Entonces existe un entorno de $x_0$ donde $F(x,y)=0$ define una única función derivable $y=y(x)$ con $y(x_0)=y_0$, y

$$y'(x)=-\frac{F_x(x,y)}{F_y(x,y)}$$

**Demostración de la fórmula.** Como $F(x,y(x))=0$ para todo $x$ del entorno, la derivada total respecto de $x$ es cero. Por la regla de la cadena: $F_x\cdot1+F_y\cdot y'=0$, y como $F_y\neq0$ se despeja $y'$.

Para $x=x(y)$ se pide $F_x\neq0$ y $x'(y)=-\frac{F_y}{F_x}$.

**Tres variables.** $F(x,y,z)=0$ con $F_z(P_0)\neq0$ define $z=z(x,y)$, y

$$z_x=-\frac{F_x}{F_z},\qquad z_y=-\frac{F_y}{F_z}$$

En general, si $F(x_1,\dots,x_n,u)=0$ con $F_u\neq0$: $u_{x_j}=-F_{x_j}/F_u$.`,
    },
    {
      id: 'sistemas', titulo: 'Sistemas de ecuaciones',
      texto: r`El sistema $F(x,y,u,v)=0$, $G(x,y,u,v)=0$ define $u=u(x,y)$, $v=v(x,y)$ cerca de $P_0$ si $F(P_0)=G(P_0)=0$, $F$ y $G$ tienen derivadas parciales continuas, y el **jacobiano** respecto de las variables dependientes no se anula:

$$J=\frac{\partial(F,G)}{\partial(u,v)}=\begin{vmatrix}F_u&F_v\\G_u&G_v\end{vmatrix}\neq0$$

Derivando las dos ecuaciones respecto de $x$ se obtiene un sistema lineal en $u_x$, $v_x$; por Cramer:

$$u_x=-\frac{\partial(F,G)/\partial(x,v)}{\partial(F,G)/\partial(u,v)},\qquad v_x=-\frac{\partial(F,G)/\partial(u,x)}{\partial(F,G)/\partial(u,v)}$$

En la práctica conviene **derivar las ecuaciones y resolver el sistema**, en lugar de memorizar los cocientes.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 8, ej. 1 a (resuelto en clase)',
      enunciado: r`Para $\ln(x^2+y^2)=\operatorname{arctg}(xy)$, establezca las condiciones de Cauchy y calcule $\frac{dy}{dx}$ y $\frac{dx}{dy}$.`,
      pasos: [
        r`$F(x,y)=\ln(x^2+y^2)-\operatorname{arctg}(xy)$. Condiciones: $F(P_0)=0$; $F$, $F_x$, $F_y$ continuas cerca de $P_0$ (vale fuera del origen); $F_y(P_0)\neq0$ para $y(x)$, o $F_x(P_0)\neq0$ para $x(y)$.`,
        r`$F_x=\frac{2x}{x^2+y^2}-\frac{y}{1+x^2y^2}$, $F_y=\frac{2y}{x^2+y^2}-\frac{x}{1+x^2y^2}$.`,
        r`Con denominador común $(x^2+y^2)(1+x^2y^2)$, que se cancela en el cociente:`,
        r`$\dfrac{dy}{dx}=-\dfrac{2x+2x^3y^2-x^2y-y^3}{2y+2x^2y^3-x^3-xy^2}$ y $\dfrac{dx}{dy}$ es la recíproca.`,
      ],
    },
    {
      fuente: 'TP 8, ej. 2 b (resuelto en clase)',
      enunciado: r`$z=e^x\cos(y+z)$. Calcule $z_x$, $z_y$, $x_y$ y $x_z$.`,
      pasos: [
        r`$F=e^x\cos(y+z)-z$. $F_x=e^x\cos(y+z)$, $F_y=-e^x\operatorname{sen}(y+z)$, $F_z=-e^x\operatorname{sen}(y+z)-1$.`,
        r`$z_x=-\frac{F_x}{F_z}=\dfrac{e^x\cos(y+z)}{1+e^x\operatorname{sen}(y+z)}$; $z_y=-\frac{F_y}{F_z}=-\dfrac{e^x\operatorname{sen}(y+z)}{1+e^x\operatorname{sen}(y+z)}$. Requiere $F_z\neq0$.`,
        r`$x_y=-\frac{F_y}{F_x}=\operatorname{tg}(y+z)$; $x_z=-\frac{F_z}{F_x}=\dfrac{1+e^x\operatorname{sen}(y+z)}{e^x\cos(y+z)}$. Requiere $F_x\neq0$.`,
      ],
    },
    {
      fuente: 'TP 8, ej. 3 a',
      enunciado: r`Si $F\!\left(x+\frac zy,\;y+\frac zx\right)=0$ define $z=z(x,y)$, demuestre que $xz_x+yz_y=z-xy$.`,
      pasos: [
        r`Con $u=x+\frac zy$, $v=y+\frac zx$: $F_x=F_u-F_v\frac{z}{x^2}$, $F_y=-F_u\frac{z}{y^2}+F_v$, $F_z=\frac{F_u}{y}+\frac{F_v}{x}$.`,
        r`$xz_x+yz_y=-\dfrac{xF_x+yF_y}{F_z}=-\dfrac{F_u\left(x-\frac zy\right)+F_v\left(y-\frac zx\right)}{\frac{F_u}y+\frac{F_v}x}$.`,
        r`El numerador es $-(xy-z)\left(\frac{F_u}y+\frac{F_v}x\right)$: se cancela con el denominador y queda $z-xy$.`,
      ],
    },
    {
      fuente: 'TP 8, ej. 7 iii',
      enunciado: r`$x^3+y^3-2xy=0$. ¿Define $y=y(x)$ cerca de $(1,1)$? Calcule $y'$ e $y''$ en ese punto.`,
      pasos: [
        r`$F(1,1)=1+1-2=0$; $F$ es polinómica (continua con derivadas continuas); $F_y=3y^2-2x$ vale $1\neq0$ en $(1,1)$. Se cumplen las condiciones.`,
        r`$y'=-\frac{3x^2-2y}{3y^2-2x}$. En $(1,1)$: $y'=-\frac11=-1$.`,
        r`Para $y''$ se deriva $3x^2+3y^2y'-2y-2xy'=0$ otra vez: $6x+6y\,y'^2+3y^2y''-4y'-2xy''=0$.`,
        r`En $(1,1)$ con $y'=-1$: $6+6+4+(3-2)y''=0\Rightarrow y''=-16$.`,
      ],
      respuesta: r`$y'(1)=-1$, $y''(1)=-16$.`,
      lab: 'implicita',
    },
    {
      fuente: 'TP 8, ej. 8 a',
      enunciado: r`El sistema $u=x^2+y^2$, $uv=y^2$ define $x$, $y$ como funciones de $u$, $v$. Halle $x_u$, $x_v$, $y_u$, $y_v$.`,
      pasos: [
        r`$F=x^2+y^2-u$, $G=y^2-uv$. Jacobiano respecto de las dependientes: $\frac{\partial(F,G)}{\partial(x,y)}=\begin{vmatrix}2x&2y\\0&2y\end{vmatrix}=4xy\neq0$ si $x,y\neq0$.`,
        r`Derivando respecto de $u$: $2x\,x_u+2y\,y_u=1$ y $2y\,y_u=v$. Entonces $y_u=\frac{v}{2y}$ y $x_u=\frac{1-v}{2x}$.`,
        r`Derivando respecto de $v$: $2x\,x_v+2y\,y_v=0$ y $2y\,y_v=u$. Entonces $y_v=\frac{u}{2y}$ y $x_v=-\frac{u}{2x}$.`,
        r`Control: despejando, $y^2=uv$ y $x^2=u(1-v)$; derivando directamente salen los mismos resultados.`,
      ],
    },
    {
      fuente: 'TP 8, ej. 13 c',
      enunciado: r`$t-x+u+2=0$, $4\cos v-x+4=0$, $3t-\operatorname{sen}u-6=0$ cerca de $P_0(x,t,u,v)=\left(4,2,0,\frac\pi2\right)$. Establezca Cauchy y calcule $\frac{dt}{dx}$, $\frac{du}{dx}$, $\frac{dv}{dx}$.`,
      pasos: [
        r`$P_0$ cumple las tres: $2-4+0+2=0$; $0-4+4=0$; $6-0-6=0$. Las funciones son continuas con derivadas continuas.`,
        r`Jacobiano respecto de $(t,u,v)$ en $P_0$: $\begin{vmatrix}1&1&0\\0&0&-4\operatorname{sen}v\\3&-\cos u&0\end{vmatrix}=\begin{vmatrix}1&1&0\\0&0&-4\\3&-1&0\end{vmatrix}=-16\neq0$.`,
        r`Derivando respecto de $x$: $t'+u'=1$; $-4\operatorname{sen}v\,v'=1$; $3t'-\cos u\,u'=0$.`,
        r`En $P_0$: $v'=-\frac14$; $u'=3t'$ y $t'+3t'=1\Rightarrow t'=\frac14$, $u'=\frac34$.`,
      ],
      respuesta: r`$t'=\frac14$, $u'=\frac34$, $v'=-\frac14$.`,
    },
  ],
  preguntas: [
    {
      id: 'm08-q1', p: r`¿Cuál de estas condiciones de Cauchy garantiza que $F(x,y)=0$ define $y(x)$ cerca de $P_0$?`,
      opciones: [r`$F_x(P_0)\neq0$`, r`$F_y(P_0)\neq0$`, r`$F(P_0)\neq0$`, r`$F_x(P_0)=F_y(P_0)$`],
      ok: 1, por: r`Se necesita poder despejar $y'$ de $F_x+F_yy'=0$.`,
    },
    {
      id: 'm08-q2', p: r`Si $F(x,y,z)=0$ define $z(x,y)$, entonces $z_y$ es:`,
      opciones: [r`$-\frac{F_z}{F_y}$`, r`$\frac{F_y}{F_z}$`, r`$-\frac{F_y}{F_z}$`, r`$-\frac{F_x}{F_y}$`],
      ok: 2, por: r`Derivando $F(x,y,z(x,y))=0$ respecto de $y$: $F_y+F_zz_y=0$.`,
    },
    {
      id: 'm08-q3', p: r`En la circunferencia $x^2+y^2=4$, ¿en qué puntos falla la condición para $y(x)$?`,
      opciones: [r`$(0,\pm2)$`, r`$(\pm2,0)$`, 'En ninguno', 'En todos'],
      ok: 1, por: r`$F_y=2y=0$ en $(\pm2,0)$, donde la tangente es vertical y cerca hay dos valores de $y$ por cada $x$.`,
    },
    {
      id: 'm08-q4', p: r`Para un sistema $F(x,y,u,v)=0$, $G(x,y,u,v)=0$ que define $u(x,y)$ y $v(x,y)$, se pide que no se anule:`,
      opciones: [r`$\frac{\partial(F,G)}{\partial(x,y)}$`, r`$\frac{\partial(F,G)}{\partial(u,v)}$`, r`$F_u$`, r`$G_v$`],
      ok: 1, por: r`El jacobiano respecto de las variables **dependientes** es el determinante del sistema lineal en $u_x$, $v_x$.`,
    },
  ],
};

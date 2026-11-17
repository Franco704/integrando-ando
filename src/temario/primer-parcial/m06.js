const r = String.raw;

export default {
  intro: r`Las derivadas parciales son funciones de $x$ e $y$, así que se pueden volver a derivar. Con dos variables hay cuatro derivadas segundas, y la pregunta central del TP es cuándo las dos **cruzadas** dan lo mismo.`,
  teoria: [
    {
      id: 'definicion', titulo: 'Derivadas de segundo orden y superiores',
      texto: r`Para $z=f(x,y)$:

$$f_{xx}=\frac{\partial^2f}{\partial x^2},\quad f_{yy}=\frac{\partial^2f}{\partial y^2},\quad f_{xy}=(f_x)_y=\frac{\partial^2f}{\partial y\,\partial x},\quad f_{yx}=(f_y)_x=\frac{\partial^2f}{\partial x\,\partial y}$$

Ojo con el orden: en la notación con subíndices se deriva **de izquierda a derecha** ($f_{xy}$: primero $x$, después $y$); en la de cocientes, **de derecha a izquierda**.

Un diagrama de árbol muestra que con dos variables hay $2^n$ derivadas de orden $n$ (8 de tercer orden), aunque muchas coinciden si se cumple Schwarz. Con $n$ variables se generaliza igual: $\frac{\partial^2f}{\partial x_j\partial x_i}$.`,
    },
    {
      id: 'schwarz', titulo: 'Teorema de Schwarz (Clairaut)',
      texto: r`**Hipótesis:** $f$, $f_x$, $f_y$, $f_{xy}$ y $f_{yx}$ existen y son **continuas** en un entorno de $P_0$.

**Tesis:** $f_{xy}(P_0)=f_{yx}(P_0)$.

**Idea de la demostración.** Se considera la "diferencia segunda" $\Delta=f(x_0+h,y_0+k)-f(x_0+h,y_0)-f(x_0,y_0+k)+f(x_0,y_0)$. Agrupándola de dos maneras y aplicando dos veces el teorema del valor medio se obtiene

$$\Delta=hk\,f_{xy}(x_0+\theta_1h,\,y_0+\theta_2k)=hk\,f_{yx}(x_0+\theta_3h,\,y_0+\theta_4k)$$

Dividiendo por $hk$ y haciendo tender $h,k\to0$, la **continuidad** de las cruzadas permite pasar al límite y concluir la igualdad en $P_0$.

Para $n$ variables vale lo mismo para cada par $x_i,x_j$, y para órdenes superiores: si $f$ es de clase $C^k$, el orden de derivación no importa hasta orden $k$.`,
    },
    {
      id: 'contraejemplo', titulo: 'Cuando la hipótesis falla',
      texto: r`$$f(x,y)=\begin{cases}\dfrac{x^3y-xy^3}{x^2+y^2}&(x,y)\neq(0,0)\\0&(x,y)=(0,0)\end{cases}$$

Fuera del origen $f_x=\dfrac{y(x^4+4x^2y^2-y^4)}{(x^2+y^2)^2}$, así que $f_x(0,k)=-k$, y $f_y=\dfrac{x(x^4-4x^2y^2-y^4)}{(x^2+y^2)^2}$, así que $f_y(h,0)=h$. Por definición $f_x(0,0)=f_y(0,0)=0$. Entonces

$$f_{xy}(0,0)=\lim_{k\to0}\frac{f_x(0,k)-f_x(0,0)}{k}=-1,\qquad f_{yx}(0,0)=\lim_{h\to0}\frac{f_y(h,0)-f_y(0,0)}{h}=1$$

**No contradice a Schwarz:** las derivadas cruzadas no son continuas en el origen, así que no se cumplen las hipótesis.`,
    },
    {
      id: 'ecuaciones', titulo: 'Ecuaciones con derivadas parciales',
      texto: r`Muchos ejercicios piden verificar que una función cumple una ecuación:

- **Laplace:** $f_{xx}+f_{yy}=0$ (funciones armónicas, como $\ln(x^2+y^2)$ o $e^x\operatorname{sen}y$).
- **Onda:** $f_{tt}=c^2f_{xx}$.
- **Calor o difusión:** $C_t=k\,C_{xx}$.

El método es siempre el mismo: calcular las derivadas que aparecen y reemplazarlas.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 6, ej. 1 d',
      enunciado: r`$f(u,v)=\ln\big(\operatorname{sen}(uv)\big)$. Calcule $\frac{\partial^2f}{\partial v\,\partial u}$ y $\frac{\partial^3f}{\partial u\,\partial v\,\partial u}$.`,
      pasos: [
        r`$f_u=\frac{v\cos(uv)}{\operatorname{sen}(uv)}=v\operatorname{cotg}(uv)$.`,
        r`$\frac{\partial^2f}{\partial v\partial u}=(f_u)_v=\operatorname{cotg}(uv)-uv\operatorname{cosec}^2(uv)$.`,
        r`Derivando respecto de $u$: $-v\operatorname{cosec}^2(uv)-v\operatorname{cosec}^2(uv)-uv\cdot\frac{\partial}{\partial u}\operatorname{cosec}^2(uv)$.`,
        r`$\frac{\partial}{\partial u}\operatorname{cosec}^2(uv)=-2v\operatorname{cosec}^2(uv)\operatorname{cotg}(uv)$. Queda:`,
        r`$\frac{\partial^3f}{\partial u\partial v\partial u}=-2v\operatorname{cosec}^2(uv)+2uv^2\operatorname{cosec}^2(uv)\operatorname{cotg}(uv)$.`,
      ],
    },
    {
      fuente: 'TP 6, ej. 4 b',
      enunciado: r`Pruebe que $u=\Phi\big(x+\Psi(y)\big)$ satisface $u_x\,u_{xy}=u_y\,u_{xx}$.`,
      pasos: [
        r`Con $w=x+\Psi(y)$: $u_x=\Phi'(w)$, $u_y=\Phi'(w)\Psi'(y)$.`,
        r`$u_{xx}=\Phi''(w)$, $u_{xy}=\Phi''(w)\Psi'(y)$.`,
        r`$u_xu_{xy}=\Phi'\Phi''\Psi'$ y $u_yu_{xx}=\Phi'\Psi'\Phi''$: son iguales.`,
      ],
    },
    {
      fuente: 'TP 6, ej. 8 a',
      enunciado: r`Verifique que $f=\ln(x^2+y^2)$ satisface la ecuación de Laplace.`,
      pasos: [
        r`$f_x=\frac{2x}{x^2+y^2}$; $f_{xx}=\frac{2(x^2+y^2)-2x\cdot2x}{(x^2+y^2)^2}=\frac{2(y^2-x^2)}{(x^2+y^2)^2}$.`,
        r`Por simetría $f_{yy}=\frac{2(x^2-y^2)}{(x^2+y^2)^2}$.`,
        r`$f_{xx}+f_{yy}=0$.`,
      ],
    },
    {
      fuente: 'TP 6, ej. 9 b',
      enunciado: r`$f=x^2\operatorname{arctg}\frac yx-y^2\operatorname{arctg}\frac xy$ si $xy\neq0$, $f=0$ si $xy=0$. Calcule $f_{xy}(0,0)$ y $f_{yx}(0,0)$.`,
      pasos: [
        r`$f_x(0,k)$ con $k\neq0$: $\lim_{h\to0}\frac{f(h,k)-0}{h}=\lim\left[h\operatorname{arctg}\frac kh-\frac{k^2}{h}\operatorname{arctg}\frac hk\right]$.`,
        r`$h\operatorname{arctg}\frac kh\to0$ (arctg acotada) y $\frac{k^2}{h}\operatorname{arctg}\frac hk\to\frac{k^2}{h}\cdot\frac hk=k$. Así $f_x(0,k)=-k$. Además $f_x(0,0)=\lim\frac{f(h,0)}{h}=0$.`,
        r`$f_{xy}(0,0)=\lim_{k\to0}\frac{-k-0}{k}=-1$.`,
        r`Análogamente $f_y(h,0)=\lim_{k\to0}\frac{f(h,k)}{k}=h$, y $f_{yx}(0,0)=\lim\frac{h}{h}=1$.`,
      ],
      respuesta: r`$f_{xy}(0,0)=-1$, $f_{yx}(0,0)=1$: las cruzadas no son continuas en el origen.`,
      lab: 'derivadas-cruzadas',
    },
    {
      fuente: 'TP 6, aplicación 3',
      enunciado: r`Verifique que $C(x,t)=t^{-1/2}e^{-x^2/(kt)}$ satisface la ecuación de difusión $\frac k4C_{xx}=C_t$.`,
      pasos: [
        r`$C_x=t^{-1/2}e^{-x^2/kt}\cdot\left(-\frac{2x}{kt}\right)$.`,
        r`$C_{xx}=t^{-1/2}e^{-x^2/kt}\left[\frac{4x^2}{k^2t^2}-\frac{2}{kt}\right]$, así que $\frac k4C_{xx}=t^{-1/2}e^{-x^2/kt}\left[\frac{x^2}{kt^2}-\frac1{2t}\right]$.`,
        r`$C_t=-\frac12t^{-3/2}e^{-x^2/kt}+t^{-1/2}e^{-x^2/kt}\cdot\frac{x^2}{kt^2}=t^{-1/2}e^{-x^2/kt}\left[-\frac{1}{2t}+\frac{x^2}{kt^2}\right]$. Coinciden.`,
      ],
    },
  ],
  preguntas: [
    {
      id: 'm06-q1', p: r`En la notación $\frac{\partial^2f}{\partial y\,\partial x}$, ¿en qué orden se deriva?`,
      opciones: ['Primero respecto de y, después de x', 'Primero respecto de x, después de y', 'Da igual siempre', 'Es la derivada segunda respecto de y'],
      ok: 1, por: r`Se lee de derecha a izquierda: es $(f_x)_y=f_{xy}$.`,
    },
    {
      id: 'm06-q2', p: r`¿Qué exige el teorema de Schwarz para asegurar $f_{xy}=f_{yx}$ en $P_0$?`,
      opciones: ['Que existan las derivadas cruzadas', 'Que las derivadas cruzadas sean continuas en un entorno de P₀', 'Que f sea continua', 'Que f sea polinómica'],
      ok: 1, por: r`Existir no alcanza; el contraejemplo $\frac{x^3y-xy^3}{x^2+y^2}$ tiene cruzadas que existen y valen $-1$ y $1$ en el origen.`,
    },
    {
      id: 'm06-q3', p: r`¿Cuántas derivadas parciales de tercer orden tiene $f(x,y)$, sin usar Schwarz?`,
      opciones: ['3', '4', '6', '8'],
      ok: 3, por: r`Cada derivada tiene 2 opciones: $2^3=8$. Con Schwarz quedan 4 distintas ($f_{xxx}$, $f_{xxy}$, $f_{xyy}$, $f_{yyy}$).`,
    },
    {
      id: 'm06-q4', p: r`$f(x,y)=e^x\operatorname{sen}y$. ¿Cuánto vale $f_{xx}+f_{yy}$?`,
      opciones: [r`$2e^x\operatorname{sen}y$`, r`$0$`, r`$e^x\cos y$`, r`$-2e^x\operatorname{sen}y$`],
      ok: 1, por: r`$f_{xx}=e^x\operatorname{sen}y$ y $f_{yy}=-e^x\operatorname{sen}y$: es armónica.`,
    },
  ],
};

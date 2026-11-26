const r = String.raw;

export default {
  intro: r`Derivar parcialmente es derivar **mirando una sola variable**: las demás se congelan como constantes. Geométricamente, es medir la pendiente de la superficie caminando paralelo a un eje. Es la pieza con la que se construye todo lo que sigue: gradiente, plano tangente, diferencial, extremos.`,
  teoria: [
    {
      id: 'incrementos', titulo: 'Incremento total e incrementos parciales',
      texto: r`Para $z=f(x,y)$ en $P_0(x_0,y_0)$:

- **Incremento total:** $\Delta z=f(x_0+\Delta x,\,y_0+\Delta y)-f(x_0,y_0)$. Se mueven las dos variables.
- **Incremento parcial respecto de $x$:** $\Delta_xz=f(x_0+\Delta x,\,y_0)-f(x_0,y_0)$. Solo se mueve $x$.
- **Incremento parcial respecto de $y$:** $\Delta_yz=f(x_0,\,y_0+\Delta y)-f(x_0,y_0)$.

Para $n$ variables, el incremento parcial respecto de $x_i$ mueve solo la coordenada $i$.`,
    },
    {
      id: 'definicion', titulo: 'Derivada parcial',
      texto: r`$$f_x(x_0,y_0)=\frac{\partial f}{\partial x}(x_0,y_0)=\lim_{\Delta x\to0}\frac{f(x_0+\Delta x,y_0)-f(x_0,y_0)}{\Delta x}$$

$$f_y(x_0,y_0)=\frac{\partial f}{\partial y}(x_0,y_0)=\lim_{\Delta y\to0}\frac{f(x_0,y_0+\Delta y)-f(x_0,y_0)}{\Delta y}$$

si los límites existen. Para $n$ variables, $\frac{\partial f}{\partial x_i}$ es el límite del cociente entre el incremento parcial respecto de $x_i$ y $\Delta x_i$.

**Regla práctica:** para $f_x$ se trata a $y$ como constante y se deriva con las reglas de una variable; para $f_y$, al revés.

> En puntos "especiales" (funciones por partes, el origen de un cociente que no está definido) **hay que usar la definición**. Por ejemplo, si $f=\frac{xy^2}{x^3+y^3}$ con $f(0,0)=0$, entonces $f_x(0,0)=\lim\frac{f(h,0)-0}{h}=\lim\frac0h=0$.`,
    },
    {
      id: 'geometria', titulo: 'Interpretación geométrica y como razón de cambio',
      texto: r`El plano $y=y_0$ corta la superficie $z=f(x,y)$ en la curva $C_1$: $\{y=y_0,\ z=f(x,y_0)\}$. En ese plano $C_1$ es la gráfica de la función de una variable $g(x)=f(x,y_0)$, y

$$f_x(x_0,y_0)=g'(x_0)=\operatorname{tg}\alpha$$

es la **pendiente de la recta tangente a $C_1$** en $P_0$. Análogamente $f_y(x_0,y_0)$ es la pendiente de la tangente a la curva de corte con el plano $x=x_0$.

Como **razón de cambio**: $f_x$ dice cuánto cambia $z$ por unidad de aumento de $x$, con $y$ fija. Si $T(x,y)$ es la temperatura de una placa, $T_x(2,1)=-\frac{20}{3}$ °C/m significa que, avanzando en la dirección del eje $x$ desde $(2,1)$, la temperatura baja unos $6{,}7$ °C por metro.`,
    },
    {
      id: 'tvm', titulo: 'Teorema del valor medio',
      texto: r`**Hipótesis:** $f(x,y)$ tiene derivadas parciales en un entorno de $(x_0,y_0)$ que contiene el rectángulo de vértices $(x_0,y_0)$ y $(x_0+h,y_0+k)$.

**Tesis:** existen $\theta_1,\theta_2\in(0,1)$ con

$$f(x_0+h,y_0+k)-f(x_0,y_0)=h\,f_x(x_0+\theta_1h,\,y_0+k)+k\,f_y(x_0,\,y_0+\theta_2k)$$

**Demostración:** se suma y resta $f(x_0,y_0+k)$ y se aplica el teorema de Lagrange de una variable a cada diferencia (en la primera solo varía $x$; en la segunda solo $y$). Para tres variables se suman y restan dos términos intermedios y aparecen tres sumandos.`,
    },
    {
      id: 'cuidado', titulo: 'Derivadas parciales no garantizan continuidad',
      texto: r`En una variable, derivable implica continua. En varias variables **no**: las derivadas parciales miran solo dos direcciones, y la función puede comportarse mal en las demás.

$f(x,y)=\frac{xy^2}{x^3+y^3}$, $f(0,0)=0$: tiene $f_x(0,0)=f_y(0,0)=0$, pero por $y=x$ vale $\frac12$ cerca del origen. No es continua. La condición correcta (diferenciabilidad) llega en el TP 11.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 5, ej. 1 b',
      enunciado: r`Aplicando la definición, obtenga $f_x(x,y)$ para $f(x,y)=3xy-6x-y^2$.`,
      pasos: [
        r`$f(x+h,y)-f(x,y)=\big[3(x+h)y-6(x+h)-y^2\big]-\big[3xy-6x-y^2\big]=3hy-6h$.`,
        r`$\frac{f(x+h,y)-f(x,y)}{h}=3y-6$.`,
        r`El límite cuando $h\to0$ es $3y-6$. Coincide con la regla práctica: derivar $3xy-6x-y^2$ con $y$ constante.`,
      ],
      respuesta: r`$f_x=3y-6$.`,
    },
    {
      fuente: 'TP 5, ej. 2 g',
      enunciado: r`Calcule las derivadas parciales de $f(x,y)=\operatorname{arctg}\frac yx+\operatorname{arctg}\frac xy$. ¿Qué condición debe cumplir el punto?`,
      pasos: [
        r`$f_x=\dfrac{-y/x^2}{1+y^2/x^2}+\dfrac{1/y}{1+x^2/y^2}=-\dfrac{y}{x^2+y^2}+\dfrac{y}{x^2+y^2}=0$.`,
        r`$f_y=\dfrac{1/x}{1+y^2/x^2}+\dfrac{-x/y^2}{1+x^2/y^2}=\dfrac{x}{x^2+y^2}-\dfrac{x}{x^2+y^2}=0$.`,
        r`Condición: $x\neq0$ e $y\neq0$. Tiene sentido: $\operatorname{arctg}u+\operatorname{arctg}\frac1u=\pm\frac\pi2$, así que $f$ es constante en cada cuadrante.`,
      ],
      respuesta: r`$f_x=f_y=0$ para $xy\neq0$.`,
    },
    {
      fuente: 'TP 5, ej. 2 j y 3 f',
      enunciado: r`j) $f=\ln\big(\cos(x+y+z)\big)$. f) $f(x,y,z)=e^{xy^2}+\ln(x+y+z)$. Calcule las derivadas parciales.`,
      pasos: [
        r`**j)** Regla de la cadena: $f_x=\frac{-\operatorname{sen}(x+y+z)}{\cos(x+y+z)}=-\operatorname{tg}(x+y+z)$, y lo mismo para $f_y$ y $f_z$. Condición: $\cos(x+y+z)>0$.`,
        r`**f)** $f_x=y^2e^{xy^2}+\frac{1}{x+y+z}$; $f_y=2xy\,e^{xy^2}+\frac{1}{x+y+z}$; $f_z=\frac{1}{x+y+z}$, con $x+y+z>0$.`,
      ],
    },
    {
      fuente: 'TP 5, ej. 4 b y 6',
      enunciado: r`Con $\varphi$ derivable: b) $z=y\,\varphi(x^2-y^2)$ cumple $y^2z_x+xy\,z_y=xz$. 6) $z=y\,f(x^2-y^2)$ cumple $\frac1xz_x+\frac1yz_y=\frac{z}{y^2}$.`,
      pasos: [
        r`Con $u=x^2-y^2$: $z_x=y\,\varphi'(u)\cdot2x=2xy\varphi'$ y $z_y=\varphi+y\,\varphi'\cdot(-2y)=\varphi-2y^2\varphi'$.`,
        r`**b)** $y^2z_x+xy\,z_y=2xy^3\varphi'+xy\varphi-2xy^3\varphi'=xy\varphi=x\,z$.`,
        r`**6)** $\frac1xz_x=2y\varphi'$ y $\frac1yz_y=\frac\varphi y-2y\varphi'$. Sumando: $\frac\varphi y=\frac{y\varphi}{y^2}=\frac{z}{y^2}$.`,
      ],
    },
    {
      fuente: 'TP 5, ej. 9',
      enunciado: r`Estudie la continuidad y la existencia de las derivadas parciales en el origen de $f=\frac{xy^2}{x^3+y^3}$, $f(0,0)=0$.`,
      pasos: [
        r`$f_x(0,0)=\lim_{h\to0}\frac{f(h,0)-0}{h}=\lim\frac{0}{h}=0$. $f_y(0,0)=\lim_{k\to0}\frac{f(0,k)}{k}=0$. **Existen.**`,
        r`Continuidad: por $y=x$, $f(x,x)=\frac{x^3}{2x^3}=\frac12\not\to0$. **No es continua** en el origen.`,
        r`Es el ejemplo de que derivadas parciales no implican continuidad. (Lo tomaron en el final de agosto de 2024.)`,
      ],
    },
    {
      fuente: 'TP 5, aplicación 1',
      enunciado: r`La temperatura de una placa es $T(x,y)=\frac{60}{1+x^2+y^2}$ (°C, metros). Calcule la razón de cambio en $(2,1)$ en la dirección a) del eje $x$; b) del eje $y$.`,
      pasos: [
        r`$T_x=-\frac{60\cdot2x}{(1+x^2+y^2)^2}=-\frac{120x}{(1+x^2+y^2)^2}$. En $(2,1)$: $-\frac{240}{36}=-\frac{20}3$.`,
        r`$T_y=-\frac{120y}{(1+x^2+y^2)^2}$. En $(2,1)$: $-\frac{120}{36}=-\frac{10}3$.`,
      ],
      respuesta: r`a) $-\frac{20}3\approx-6{,}67$ °C/m; b) $-\frac{10}3\approx-3{,}33$ °C/m.`,
      lab: 'corte-parcial',
    },
    {
      fuente: 'TP 5, aplicación 5 b',
      enunciado: r`Halle la pendiente de la curva intersección de $z=9x^2-y^2$ con el plano $y=3$ en $(1,3,6)$.`,
      pasos: [
        r`Con $y=3$ fija, la pendiente es $z_x=18x$.`,
        r`En $x=1$: $18$.`,
      ],
      respuesta: r`$18$.`,
    },
  ],
  preguntas: [
    {
      id: 'm05-q1', p: r`$f_y(x_0,y_0)$ es la pendiente de la tangente a la curva que resulta de cortar la superficie con el plano…`,
      opciones: [r`$y=y_0$`, r`$x=x_0$`, r`$z=f(x_0,y_0)$`, r`$x=y$`],
      ok: 1, por: r`Para derivar respecto de $y$ se congela $x$: el plano de corte es $x=x_0$.`,
    },
    {
      id: 'm05-q2', p: r`Si $f$ tiene derivadas parciales en $P_0$, entonces:`,
      opciones: ['f es continua en P₀', 'f es diferenciable en P₀', 'no se puede asegurar que sea continua', 'f tiene un extremo en P₀'],
      ok: 2, por: r`Contraejemplo: $\frac{xy^2}{x^3+y^3}$ en el origen.`,
    },
    {
      id: 'm05-q3', p: r`¿Cuánto vale $\frac{\partial}{\partial y}\left(x^2e^{xy}\right)$?`,
      opciones: [r`$2xe^{xy}$`, r`$x^3e^{xy}$`, r`$x^2ye^{xy}$`, r`$2xe^{xy}+x^2ye^{xy}$`],
      ok: 1, por: r`$x^2$ es constante; la derivada de $e^{xy}$ respecto de $y$ es $x\,e^{xy}$.`,
    },
    {
      id: 'm05-q4', p: r`Para calcular $f_x(0,0)$ de una función definida por partes con $f(0,0)$ especial, conviene:`,
      opciones: ['derivar la fórmula general y reemplazar (0,0)', 'usar la definición como límite', 'usar el teorema del valor medio', 'calcular el límite doble'],
      ok: 1, por: r`La fórmula general no vale en el origen; la derivada en ese punto depende del valor asignado ahí.`,
    },
    {
      id: 'm05-q5', p: r`En el teorema del valor medio para $f(x,y)$, ¿qué se aplica para obtener cada sumando?`,
      opciones: ['El teorema de Rolle en dos variables', 'El teorema de Lagrange de una variable, una vez por cada variable', 'La regla de la cadena', 'El teorema de Schwarz'],
      ok: 1, por: r`Sumando y restando $f(x_0,y_0+k)$ quedan dos diferencias donde varía una sola variable.`,
    },
  ],
};

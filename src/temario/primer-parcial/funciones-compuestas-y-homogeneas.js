const r = String.raw;

export default {
  intro: r`Casi nunca las variables de una fórmula son independientes de verdad: $x$ e $y$ dependen del tiempo, o de otras coordenadas. La **regla de la cadena** dice cómo se propagan las derivadas a través de esa cadena de dependencias. Las **funciones homogéneas** son una familia con una propiedad que vuelve en el TP 22 (ecuaciones diferenciales homogéneas).`,
  teoria: [
    {
      id: 'cadena', titulo: 'Regla de la cadena',
      texto: r`**Caso 1 (derivada total).** $z=f(x,y)$ con $x=x(t)$, $y=y(t)$. Si $f$ es diferenciable y $x,y$ derivables:

$$\frac{dz}{dt}=\frac{\partial f}{\partial x}\frac{dx}{dt}+\frac{\partial f}{\partial y}\frac{dy}{dt}$$

**Caso 2.** $z=f(u,v)$ con $u=u(x,y)$, $v=v(x,y)$:

$$\frac{\partial z}{\partial x}=\frac{\partial f}{\partial u}\frac{\partial u}{\partial x}+\frac{\partial f}{\partial v}\frac{\partial v}{\partial x},\qquad\frac{\partial z}{\partial y}=\frac{\partial f}{\partial u}\frac{\partial u}{\partial y}+\frac{\partial f}{\partial v}\frac{\partial v}{\partial y}$$

**Regla práctica (diagrama árbol).** Se dibuja $z$ arriba, las variables intermedias en el medio y las finales abajo. Para $\frac{\partial z}{\partial x}$ se recorren **todos los caminos** de $z$ a $x$; en cada camino se **multiplican** las derivadas de cada tramo y después se **suman** los caminos.

**General.** $z=f(u_1,\dots,u_n)$ con $u_i=u_i(x_1,\dots,x_m)$: $\dfrac{\partial z}{\partial x_j}=\sum_{i=1}^n\dfrac{\partial f}{\partial u_i}\dfrac{\partial u_i}{\partial x_j}$.`,
    },
    {
      id: 'demostracion', titulo: 'Demostración del caso 2',
      texto: r`**Hipótesis:** $f(u,v)$ diferenciable; $u(x,y)$, $v(x,y)$ con derivadas parciales. **Tesis:** la fórmula de $z_x$.

Se da a $x$ un incremento $\Delta x$ con $y$ fijo. Eso produce incrementos $\Delta u$ y $\Delta v$, y como $f$ es diferenciable:

$$\Delta z=f_u\,\Delta u+f_v\,\Delta v+\varepsilon_1\Delta u+\varepsilon_2\Delta v,\qquad\varepsilon_1,\varepsilon_2\to0\text{ si }\Delta u,\Delta v\to0$$

Dividiendo por $\Delta x$:

$$\frac{\Delta z}{\Delta x}=f_u\frac{\Delta u}{\Delta x}+f_v\frac{\Delta v}{\Delta x}+\varepsilon_1\frac{\Delta u}{\Delta x}+\varepsilon_2\frac{\Delta v}{\Delta x}$$

Cuando $\Delta x\to0$, $\frac{\Delta u}{\Delta x}\to u_x$ y $\frac{\Delta v}{\Delta x}\to v_x$, y por eso $\Delta u,\Delta v\to0$ y los $\varepsilon\to0$. Queda $z_x=f_uu_x+f_vv_x$.`,
    },
    {
      id: 'homogeneas', titulo: 'Funciones homogéneas y teorema de Euler',
      texto: r`$f(x_1,\dots,x_n)$ es **homogénea de grado $k$** si $f(tx_1,\dots,tx_n)=t^kf(x_1,\dots,x_n)$ para todo $t>0$.

Ejemplos: $x^3y^{-5}-9xy^{-3}$ tiene grado $-2$; $\frac{\sqrt{x+y+z}}{3y^2}$ tiene grado $\frac12-2=-\frac32$; $\frac1{x^2}-\frac1y+\frac1z$ **no** es homogénea (mezcla grados $-2$ y $-1$).

**Teorema de Euler.** Si $f$ es homogénea de grado $k$ y diferenciable:

$$x_1\frac{\partial f}{\partial x_1}+\dots+x_n\frac{\partial f}{\partial x_n}=k\,f$$

**Demostración.** Se deriva $f(tx_1,\dots,tx_n)=t^kf(x_1,\dots,x_n)$ respecto de $t$. A la izquierda, por la regla de la cadena con $u_i=tx_i$: $\sum f_{u_i}(tx)\,x_i$. A la derecha: $kt^{k-1}f(x)$. Con $t=1$ queda la tesis.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 7, ej. 1 f',
      enunciado: r`$u=\arcsen(3x+y)$ con $x=r^2e^s$, $y=\operatorname{sen}(rs)$. Halle $u_r$ y $u_s$.`,
      pasos: [
        r`Árbol: $u\to(x,y)\to(r,s)$. $u_x=\frac{3}{\sqrt{1-(3x+y)^2}}$, $u_y=\frac{1}{\sqrt{1-(3x+y)^2}}$.`,
        r`$x_r=2re^s$, $y_r=s\cos(rs)$; $x_s=r^2e^s$, $y_s=r\cos(rs)$.`,
        r`$u_r=u_xx_r+u_yy_r=\dfrac{6re^s+s\cos(rs)}{\sqrt{1-(3x+y)^2}}$.`,
        r`$u_s=u_xx_s+u_yy_s=\dfrac{3r^2e^s+r\cos(rs)}{\sqrt{1-(3x+y)^2}}$, con $x$, $y$ reemplazadas en función de $r$, $s$.`,
      ],
    },
    {
      fuente: 'TP 7, ej. 2 c',
      enunciado: r`Halle la derivada total de $u=\frac{t+e^x}{y-e^x}$ con $x=3\operatorname{sen}t$, $y=\ln t$.`,
      pasos: [
        r`Aquí $t$ aparece directamente y a través de $x$ e $y$: $\frac{du}{dt}=u_t+u_x\frac{dx}{dt}+u_y\frac{dy}{dt}$.`,
        r`$u_t=\frac{1}{y-e^x}$; $u_x=\frac{e^x(y-e^x)+(t+e^x)e^x}{(y-e^x)^2}=\frac{e^x(y+t)}{(y-e^x)^2}$; $u_y=-\frac{t+e^x}{(y-e^x)^2}$.`,
        r`$\frac{dx}{dt}=3\cos t$, $\frac{dy}{dt}=\frac1t$.`,
        r`$\dfrac{du}{dt}=\dfrac{1}{y-e^x}+\dfrac{3e^x(y+t)\cos t}{(y-e^x)^2}-\dfrac{t+e^x}{t\,(y-e^x)^2}$.`,
      ],
    },
    {
      fuente: 'TP 7, ej. 5 c',
      enunciado: r`$w=f(x,y)$ con $x=r\cos\theta$, $y=r\operatorname{sen}\theta$. Pruebe que $w_r=f_x\cos\theta+f_y\operatorname{sen}\theta$ y $w_\theta=-r(f_x\operatorname{sen}\theta-f_y\cos\theta)$.`,
      pasos: [
        r`$x_r=\cos\theta$, $y_r=\operatorname{sen}\theta$: $w_r=f_x\cos\theta+f_y\operatorname{sen}\theta$.`,
        r`$x_\theta=-r\operatorname{sen}\theta$, $y_\theta=r\cos\theta$: $w_\theta=-rf_x\operatorname{sen}\theta+rf_y\cos\theta=-r(f_x\operatorname{sen}\theta-f_y\cos\theta)$.`,
      ],
    },
    {
      fuente: 'TP 7, ej. 6',
      enunciado: r`En un tanque cilíndrico entra agua a $0{,}8\pi$ m³/min y el radio crece a $0{,}2$ cm/min. ¿Con qué rapidez sube el agua cuando el radio es 2 m y el volumen $20\pi$ m³?`,
      pasos: [
        r`$V=\pi r^2h$. Regla de la cadena en $t$: $\frac{dV}{dt}=2\pi rh\frac{dr}{dt}+\pi r^2\frac{dh}{dt}$.`,
        r`Con $r=2$ y $V=20\pi$: $h=\frac{20\pi}{4\pi}=5$ m. $\frac{dr}{dt}=0{,}002$ m/min.`,
        r`$0{,}8\pi=2\pi\cdot2\cdot5\cdot0{,}002+4\pi\frac{dh}{dt}=0{,}04\pi+4\pi\frac{dh}{dt}$.`,
        r`$\frac{dh}{dt}=\frac{0{,}76}{4}=0{,}19$ m/min.`,
      ],
      respuesta: r`$19$ cm/min.`,
      lab: 'regla-cadena',
    },
    {
      fuente: 'TP 7, ej. 12 b',
      enunciado: r`$u=x\,e^{-y}$ con $x=\operatorname{arctg}(rst)$, $y=\ln(3rs+5st)$. Halle $u_t$, $u_s$, $u_r$.`,
      pasos: [
        r`$u_x=e^{-y}$, $u_y=-xe^{-y}$. Además $e^{-y}=\frac{1}{3rs+5st}$.`,
        r`$x_t=\frac{rs}{1+r^2s^2t^2}$, $y_t=\frac{5s}{3rs+5st}=\frac{5}{3r+5t}$.`,
        r`$u_t=\dfrac{1}{3rs+5st}\left[\dfrac{rs}{1+(rst)^2}-\operatorname{arctg}(rst)\dfrac{5}{3r+5t}\right]$.`,
        r`Igual para las otras: $x_s=\frac{rt}{1+(rst)^2}$, $y_s=\frac1s$; $x_r=\frac{st}{1+(rst)^2}$, $y_r=\frac{3}{3r+5t}$. $u_s=e^{-y}(x_s-x\,y_s)$ y $u_r=e^{-y}(x_r-x\,y_r)$.`,
      ],
    },
    {
      fuente: 'TP 7, ej. 13 c',
      enunciado: r`¿Es homogénea $f(x,y)=\ln\left(\frac{10^{x+y}}{3^{x-y}}\right)$? Si lo es, verifique la identidad de Euler.`,
      pasos: [
        r`Propiedades del logaritmo: $f=(x+y)\ln10-(x-y)\ln3$, que es lineal.`,
        r`$f(tx,ty)=t\big[(x+y)\ln10-(x-y)\ln3\big]=t\,f$: homogénea de **grado 1**.`,
        r`$f_x=\ln10-\ln3$, $f_y=\ln10+\ln3$. $xf_x+yf_y=(x+y)\ln10-(x-y)\ln3=1\cdot f$.`,
      ],
    },
  ],
  preguntas: [
    {
      id: 'm07-q1', p: r`$z=f(x,y)$, $x=x(t)$, $y=y(t)$. ¿Cuál es $\frac{dz}{dt}$?`,
      opciones: [r`$f_x+f_y$`, r`$f_x\,x'+f_y\,y'$`, r`$f_x\,y'+f_y\,x'$`, r`$f_x\,x'\cdot f_y\,y'$`],
      ok: 1, por: r`Un camino por cada variable intermedia: se multiplica a lo largo del camino y se suman los caminos.`,
    },
    {
      id: 'm07-q2', p: r`¿De qué grado es homogénea $f(x,y)=\frac{x^2-y^2}{x+y}$?`,
      opciones: ['0', '1', '2', 'No es homogénea'],
      ok: 1, por: r`Numerador de grado 2 sobre denominador de grado 1: $f(tx,ty)=\frac{t^2}{t}f=t\,f$.`,
    },
    {
      id: 'm07-q3', p: r`Si $f(x,y)$ es homogénea de grado 3, el teorema de Euler dice que $xf_x+yf_y$ es igual a:`,
      opciones: [r`$0$`, r`$f$`, r`$3f$`, r`$f^3$`],
      ok: 2, por: r`$\sum x_if_{x_i}=k\,f$ con $k=3$.`,
    },
    {
      id: 'm07-q4', p: r`¿Qué hipótesis sobre $f(u,v)$ se usa en la demostración de la regla de la cadena?`,
      opciones: ['Que tenga derivadas parciales', 'Que sea diferenciable', 'Que sea homogénea', 'Que sea continua'],
      ok: 1, por: r`Se escribe $\Delta z=f_u\Delta u+f_v\Delta v+\varepsilon_1\Delta u+\varepsilon_2\Delta v$, que es la definición de diferenciable.`,
    },
  ],
};

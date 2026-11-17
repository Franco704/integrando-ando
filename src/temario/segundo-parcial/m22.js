const r = String.raw;

export default {
  intro: r`Una ecuación diferencial relaciona una función desconocida con sus derivadas. En este TP se resuelven las de primer orden que se pueden llevar a **integrar directamente**: separables, homogéneas (que se vuelven separables con un cambio) y exactas (que son el diferencial total de algo, como en el TP 11). Es el tercer bloque de todos los finales.`,
  teoria: [
    {
      id: 'definiciones', titulo: 'Definiciones y clasificación',
      texto: r`Una **ecuación diferencial** vincula una variable independiente, una función incógnita y sus derivadas. Es **ordinaria** (EDO) si hay una sola variable independiente y **en derivadas parciales** si hay varias.

- **Orden:** el de la derivada más alta.
- **Grado:** el exponente de la derivada de mayor orden, cuando la ecuación es polinómica en las derivadas.
- **Lineal:** la incógnita y sus derivadas aparecen a la primera potencia, sin productos entre ellas.

Ejemplo (final de septiembre 2024): $\sqrt{1-y}\,(y''')^3+2xy'=0$ es ordinaria, de orden 3, grado 3, no lineal.

**Soluciones.** Una función que al reemplazarla verifica la ecuación. La **general** de una EDO de primer orden es una familia con una constante arbitraria, $F(x,y,C)=0$; la **particular** sale de fijar $C$ (por ejemplo con $y(x_0)=y_0$); una **singular** verifica la ecuación pero no sale de la general. Una relación $G(x,y)=0$ es **solución implícita** en un intervalo si define allí funciones derivables que la verifican (por ejemplo $x^2+y^2=4$ para $y'=-\frac xy$ en $-2<x<2$).`,
    },
    {
      id: 'separables', titulo: 'Variables separables',
      texto: r`Si la ecuación se puede escribir $g(y)\,dy=f(x)\,dx$, se integra cada miembro:

$$\int g(y)\,dy=\int f(x)\,dx+C$$

Ejemplo: $\frac{dx}{dt}=kx\Rightarrow\frac{dx}{x}=k\,dt\Rightarrow x=Ce^{kt}$ (crecimiento o decaimiento exponencial). Con $x(0)=5$ queda $x=5e^{kt}$.

> Al dividir por una expresión en $y$ se pueden perder soluciones constantes (las que la anulan): conviene revisarlas.`,
    },
    {
      id: 'homogeneas', titulo: 'Ecuaciones con coeficientes homogéneos',
      texto: r`$M(x,y)\,dx+N(x,y)\,dy=0$ con $M$ y $N$ **homogéneas del mismo grado** $n$.

**Teorema 1.** Si $M$ es homogénea de grado $n$: $M(x,y)=x^nM\!\left(1,\frac yx\right)$. *(Tomar $t=\frac1x$ en $M(tx,ty)=t^nM(x,y)$.)*

**Teorema 2.** $M(x,y)=y^nM\!\left(\frac xy,1\right)$. *(Tomar $t=\frac1y$.)*

**Solución.** Con $y=ux$, $dy=u\,dx+x\,du$, y el teorema 1:

$$x^n\big[M(1,u)\,dx+N(1,u)(u\,dx+x\,du)\big]=0\;\Rightarrow\;\frac{dx}{x}+\frac{N(1,u)}{M(1,u)+uN(1,u)}\,du=0$$

que es separable. Se integra y se vuelve a $u=\frac yx$. Si $N$ es más simple, conviene $x=uy$ con el teorema 2.`,
    },
    {
      id: 'exactas', titulo: 'Ecuaciones exactas y factor integrante',
      texto: r`$M\,dx+N\,dy=0$ es **exacta** si existe $U(x,y)$ con $U_x=M$ y $U_y=N$. Entonces la ecuación es $dU=0$ y la solución general es $U(x,y)=C$.

**Criterio:** con $M$, $N$, $M_y$, $N_x$ continuas en una región simplemente conexa, es exacta $\Leftrightarrow M_y=N_x$.

**Cómo hallar $U$:** $U=\int M\,dx+g(y)$; se deriva respecto de $y$, se iguala a $N$ y se despeja $g'(y)$.

**Reducibles a exactas.** Si no es exacta, se busca un **factor integrante** $F$ tal que $FM\,dx+FN\,dy=0$ sea exacta:
- Si $\frac{M_y-N_x}{N}=h(x)$ depende solo de $x$: $F(x)=e^{\int h(x)\,dx}$.
- Si $\frac{N_x-M_y}{M}=g(y)$ depende solo de $y$: $F(y)=e^{\int g(y)\,dy}$.

*Deducción de $F(y)$* (final del 25/11): $(FM)_y=(FN)_x\Rightarrow F'M+FM_y=FN_x\Rightarrow\frac{F'}{F}=\frac{N_x-M_y}{M}$, que tiene sentido solo si el segundo miembro depende únicamente de $y$.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 22, ej. 2 a (resuelto en clase)',
      enunciado: r`Compruebe que $y=e^{ax}\operatorname{sen}bx$ es solución de $y''-2ay'+(a^2+b^2)y=0$. ¿Es general o particular?`,
      pasos: [
        r`$y'=e^{ax}(a\operatorname{sen}bx+b\cos bx)$; $y''=e^{ax}\big((a^2-b^2)\operatorname{sen}bx+2ab\cos bx\big)$.`,
        r`$y''-2ay'=e^{ax}\big((a^2-b^2-2a^2)\operatorname{sen}bx+(2ab-2ab)\cos bx\big)=-(a^2+b^2)e^{ax}\operatorname{sen}bx$.`,
        r`Sumando $(a^2+b^2)y$ da $0$. Es **particular**: no tiene constantes arbitrarias (una de segundo orden necesitaría dos).`,
      ],
    },
    {
      fuente: 'TP 22, ej. 4 b (resuelto en clase)',
      enunciado: r`Resuelva $\operatorname{tg}x\cos y=-y'\operatorname{tg}y$.`,
      pasos: [
        r`Separando: $\operatorname{tg}x\,dx=-\frac{\operatorname{sen}y}{\cos^2y}\,dy$.`,
        r`$\int\operatorname{tg}x\,dx=-\ln|\cos x|$ y $\int\frac{\operatorname{sen}y}{\cos^2y}dy=\frac{1}{\cos y}$.`,
        r`$-\ln|\cos x|=-\sec y+C$, o sea $\sec y=\ln|\cos x|+C$.`,
      ],
      lab: 'campo-direcciones',
    },
    {
      fuente: 'TP 22, ej. 5 d (resuelto en clase)',
      enunciado: r`Resuelva $xy'=y+xe^{y/x}$.`,
      pasos: [
        r`$(y+xe^{y/x})\,dx-x\,dy=0$: $M$ y $N$ son homogéneas de grado 1.`,
        r`$y'=\frac yx+e^{y/x}$. Con $y=vx$, $y'=v+xv'$: $v+xv'=v+e^v\Rightarrow e^{-v}dv=\frac{dx}x$.`,
        r`$-e^{-v}=\ln|x|+C$. Volviendo: $-e^{-y/x}=\ln|x|+C$.`,
      ],
    },
    {
      fuente: 'TP 22, ej. 7 d (resuelto en clase)',
      enunciado: r`Resuelva $(\operatorname{tg}y-\operatorname{sen}x)\,dx+x\sec^2y\,dy=0$.`,
      pasos: [
        r`$M_y=\sec^2y=N_x$: exacta.`,
        r`$U=\int(\operatorname{tg}y-\operatorname{sen}x)\,dx=x\operatorname{tg}y+\cos x+g(y)$.`,
        r`$U_y=x\sec^2y+g'(y)=x\sec^2y\Rightarrow g=C$.`,
      ],
      respuesta: r`$x\operatorname{tg}y+\cos x=C$.`,
    },
    {
      fuente: 'TP 22, ej. 12 b (resuelto en clase)',
      enunciado: r`Resuelva $(y+x\cos x)\,dx+(x\ln x+xe^y)\,dy=0$.`,
      pasos: [
        r`$M_y=1$, $N_x=\ln x+1+e^y$: no es exacta.`,
        r`$\frac{M_y-N_x}{N}=\frac{-(\ln x+e^y)}{x(\ln x+e^y)}=-\frac1x$, solo de $x$. $F=e^{-\ln x}=\frac1x$.`,
        r`Multiplicando: $\left(\frac yx+\cos x\right)dx+(\ln x+e^y)\,dy=0$, ahora exacta.`,
        r`$U=y\ln x+\operatorname{sen}x+g(y)$; $U_y=\ln x+g'=\ln x+e^y\Rightarrow g=e^y$.`,
      ],
      respuesta: r`$y\ln x+\operatorname{sen}x+e^y=C$.`,
    },
    {
      fuente: '2° parcial, temas 1 y 5',
      enunciado: r`a) Pruebe que $F=\frac1{xy}$ es factor integrante de $y\,dx=x\,dy$ y resuelva. b) Resuelva $(y^2-2xy+6x)\,dx-(x^2-2xy+2)\,dy=0$.`,
      pasos: [
        r`**a)** $\frac{y\,dx-x\,dy}{xy}=\frac{dx}x-\frac{dy}y$, que es exacta ($M=\frac1x$, $N=-\frac1y$, $M_y=0=N_x$). $\ln|x|-\ln|y|=C\Rightarrow y=kx$.`,
        r`**b)** $M_y=2y-2x$ y $N=-(x^2-2xy+2)\Rightarrow N_x=-2x+2y$. Exacta.`,
        r`$U=\int(y^2-2xy+6x)\,dx=xy^2-x^2y+3x^2+g(y)$; $U_y=2xy-x^2+g'=-x^2+2xy-2\Rightarrow g=-2y$.`,
      ],
      respuesta: r`b) $xy^2-x^2y+3x^2-2y=C$.`,
    },
    {
      fuente: 'TP 22, ej. 11 (resuelto en clase)',
      enunciado: r`Un auto a $100$ km/h frena con desaceleración constante de $10$ m/s². ¿Cuánto avanza antes de detenerse?`,
      pasos: [
        r`$v_0=100$ km/h $\approx27{,}8$ m/s. $\frac{dv}{dt}=-10\Rightarrow v=-10t+27{,}8$.`,
        r`$\frac{dx}{dt}=v\Rightarrow x=-5t^2+27{,}8t$ (con $x(0)=0$).`,
        r`Se detiene en $t=2{,}78$ s; $x(2{,}78)\approx38{,}6$ m.`,
      ],
    },
  ],
  preguntas: [
    {
      id: 'm22-q1', p: r`¿De qué orden y grado es $(y'')^3+5(y')^4=x$?`,
      opciones: ['Orden 2, grado 3', 'Orden 4, grado 2', 'Orden 2, grado 4', 'Orden 3, grado 2'],
      ok: 0, por: r`El orden lo da $y''$ y el grado es el exponente de esa derivada.`,
    },
    {
      id: 'm22-q2', p: r`$M\,dx+N\,dy=0$ es exacta si:`,
      opciones: [r`$M_x=N_y$`, r`$M_y=N_x$`, r`$M=N$`, r`$M_y+N_x=0$`],
      ok: 1, por: r`Por Schwarz, si $U_x=M$ y $U_y=N$, entonces $M_y=U_{xy}=U_{yx}=N_x$.`,
    },
    {
      id: 'm22-q3', p: r`En una ecuación con coeficientes homogéneos, la sustitución $y=ux$ la convierte en:`,
      opciones: ['lineal', 'exacta', 'de variables separables', 'de Bernoulli'],
      ok: 2, por: r`Gracias a los teoremas 1 y 2 se factoriza $x^n$ y quedan separadas $x$ y $u$.`,
    },
    {
      id: 'm22-q4', p: r`Existe un factor integrante que solo depende de $x$ cuando:`,
      opciones: [r`$\frac{M_y-N_x}{N}$ depende solo de $x$`, r`$\frac{M_y-N_x}{M}$ depende solo de $x$`, r`$M_y=N_x$`, r`$N=0$`],
      ok: 0, por: r`$(FM)_y=(FN)_x$ con $F(x)$ da $\frac{F'}{F}=\frac{M_y-N_x}{N}$.`,
    },
    {
      id: 'm22-q5', p: r`¿Cuántas constantes arbitrarias tiene la solución general de una EDO de orden 2?`,
      opciones: ['0', '1', '2', 'Depende del grado'],
      ok: 2, por: r`Una por cada integración necesaria.`,
    },
  ],
};

const r = String.raw;

export default {
  intro: r`En una variable, $x$ se acerca a $a$ solo por dos lados. En el plano, $(x,y)$ puede llegar a $(x_0,y_0)$ por **infinitos caminos**: rectas, parábolas, espirales. El límite existe solo si todos coinciden. Por eso en este TP hay dos tareas distintas: **probar que no existe** (alcanza con dos caminos que difieran) y **probar que existe** (hace falta un argumento que valga para todos).`,
  teoria: [
    {
      id: 'definicion', titulo: 'Definición de límite doble',
      texto: r`Sea $f$ definida en un entorno reducido de $P_0(x_0,y_0)$. Se dice que $\lim_{(x,y)\to(x_0,y_0)}f(x,y)=L$ si

$$\forall\varepsilon>0\ \exists\delta>0:\ 0<\sqrt{(x-x_0)^2+(y-y_0)^2}<\delta\Rightarrow|f(x,y)-L|<\varepsilon$$

En términos de entornos: para todo entorno de $L$ existe un **entorno reducido** de $P_0$ (un disco sin su centro) cuyos puntos van a parar dentro del entorno de $L$. El punto $P_0$ no tiene por qué pertenecer al dominio: el límite mira **cerca**, no **en** el punto.

Para $n$ variables es igual, con la distancia euclídea en $\mathbb R^n$. Si el límite existe, es único.`,
    },
    {
      id: 'propiedades', titulo: 'Propiedades y sustitución directa',
      texto: r`Si $\lim f=L$ y $\lim g=M$ (en el mismo punto), entonces el límite de $f\pm g$ es $L\pm M$, el de $f\cdot g$ es $L\cdot M$, el de $f/g$ es $L/M$ si $M\neq0$, y el de $k\,f$ es $kL$.

**Sustitución directa.** Si $f$ es continua en $P_0$ (polinomios en todo $\mathbb R^2$; racionales donde el denominador no se anula; composiciones de funciones continuas), el límite es simplemente $f(P_0)$. Es lo primero que hay que probar.

Si la sustitución da $\frac00$ se intenta **reducir**: factorizar y simplificar, racionalizar, o usar límites conocidos como $\lim_{u\to0}\frac{\operatorname{sen}u}{u}=1$ con $u=u(x,y)\to0$.

> Ejemplo: $\lim_{(x,y)\to(1,13)}\frac{4-\sqrt{3x+y}}{16-3x-y}$. Con $u=3x+y\to16$: $\frac{4-\sqrt u}{(4-\sqrt u)(4+\sqrt u)}=\frac{1}{4+\sqrt u}\to\frac18$.`,
    },
    {
      id: 'caminos', titulo: 'Límites por caminos',
      texto: r`Si el límite doble es $L$, entonces $f$ tiende a $L$ por **cualquier** curva que llegue a $P_0$. La contrarrecíproca es la herramienta práctica:

> Si dos caminos dan valores distintos (o uno no tiene límite), el límite doble **no existe**.

Caminos típicos hacia el origen: los ejes ($x=0$, $y=0$), las rectas $y=mx$, las parábolas $y=kx^2$ o $x=ky^2$. Si el resultado depende de $m$ o de $k$, se terminó: no existe.

Lo que **no** vale es la recíproca: que muchos caminos (incluso todas las rectas) den lo mismo no prueba nada. El ejemplo clásico es $f=\frac{6xy^2}{x^2+y^4}$: por cualquier recta da $0$, pero por $x=y^2$ da $\frac{6y^4}{2y^4}=3$.`,
    },
    {
      id: 'sucesivos', titulo: 'Límites sucesivos (iterados)',
      texto: r`Se calcula primero un límite simple y después el otro:

$$L_{12}=\lim_{x\to x_0}\Big[\lim_{y\to y_0}f(x,y)\Big],\qquad L_{21}=\lim_{y\to y_0}\Big[\lim_{x\to x_0}f(x,y)\Big]$$

**Teorema.** Si existe el límite doble $L$ y existen los límites simples interiores, entonces $L_{12}=L_{21}=L$.

Consecuencias prácticas:
- Si $L_{12}\neq L_{21}$, el límite doble **no existe**.
- Si $L_{12}=L_{21}$, solo hay un **candidato**. ($\frac{xy}{x^2+y^2}$ tiene ambos iterados iguales a $0$ y no tiene límite doble.)
- Puede existir el doble sin que exista algún iterado.`,
    },
    {
      id: 'existencia', titulo: 'Cómo probar que el límite existe',
      texto: r`Una vez que se tiene el candidato $L$:

1. **Acotar** $|f(x,y)-L|$ por algo que tienda a cero (regla del sándwich). Desigualdades útiles: $|x|\le\sqrt{x^2+y^2}$, $\frac{x^2}{x^2+y^2}\le1$, $|\operatorname{sen}u|\le|u|$.
2. **Coordenadas polares** (para el origen): $x=r\cos\theta$, $y=r\operatorname{sen}\theta$. Si $|f-L|\le g(r)$ con $g(r)\to0$ independientemente de $\theta$, el límite es $L$.

> Ejemplo: $f=\frac{8x^2y}{x^2+y^2}$. Como $\frac{x^2}{x^2+y^2}\le1$, $|f|\le8|y|\to0$. El límite es $0$.

**Límites infinitos y en el infinito.** También se definen $\lim f=+\infty$ (por ejemplo $\lim_{(x,y)\to(0,0)}\frac{9}{x^2+y^2}=+\infty$) y $\lim_{(x,y)\to(+\infty,+\infty)}f=L$ (por ejemplo $\frac{1}{x^2+y^2}\to0$).`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 2, ej. 2 a',
      enunciado: r`Analice la existencia de $\lim_{(x,y)\to(0,0)}\frac{5x^3-3y^2}{x^3+y^3}$ por los caminos i) $y=x$; ii) $x=0$; iii) $y=0$; iv) $y=x^2$.`,
      pasos: [
        r`**i)** $y=x$: $\frac{5x^3-3x^2}{2x^3}=\frac{5x-3}{2x}$, que tiende a $\infty$ cuando $x\to0$ (el $-3$ del numerador no se cancela).`,
        r`**ii)** $x=0$: $\frac{-3y^2}{y^3}=-\frac3y\to\infty$.`,
        r`**iii)** $y=0$: $\frac{5x^3}{x^3}=5$.`,
        r`**iv)** $y=x^2$: $\frac{5x^3-3x^4}{x^3+x^6}=\frac{5-3x}{1+x^3}\to5$.`,
        r`Hay caminos que dan $5$ y otros donde $f$ no tiene límite finito: el límite doble **no existe**.`,
      ],
      respuesta: r`No existe.`,
    },
    {
      fuente: 'TP 2, ej. 2 e',
      enunciado: r`Analice $\lim_{(x,y)\to(0,0)}\frac{8x^2y}{y^2+x^2}$ por i) $y=\frac14x$; ii) $y=\sqrt x$; iii) $y=|x|$; iv) $y=\operatorname{sen}x$. ¿Existe el límite?`,
      pasos: [
        r`**i)** $\frac{8x^2\cdot x/4}{x^2/16+x^2}=\frac{2x^3}{\frac{17}{16}x^2}=\frac{32}{17}x\to0$.`,
        r`**ii)** $\frac{8x^2\sqrt x}{x+x^2}=\frac{8x\sqrt x}{1+x}\to0$. **iii)** $\frac{8x^2|x|}{2x^2}=4|x|\to0$.`,
        r`**iv)** El numerador es del orden de $8x^3$ y el denominador de $2x^2$: tiende a $0$.`,
        r`Todos dan $0$, que es solo un candidato. Para probarlo: $\left|\frac{8x^2y}{x^2+y^2}\right|=8|y|\cdot\frac{x^2}{x^2+y^2}\le8|y|\to0$.`,
      ],
      respuesta: r`El límite existe y vale $0$.`,
      lab: 'limite-caminos',
    },
    {
      fuente: 'TP 2, ej. 3 a y b',
      enunciado: r`Demuestre que no existen: a) $\lim_{(x,y)\to(0,0)}\frac{6xy}{x^2+y^2}$; b) $\lim_{(x,y)\to(1,-1)}\frac{4(x+y)}{y^2-x}$.`,
      pasos: [
        r`**a)** Por $y=mx$: $\frac{6mx^2}{x^2(1+m^2)}=\frac{6m}{1+m^2}$, que depende de $m$ (vale $0$ con $m=0$ y $3$ con $m=1$). No existe.`,
        r`**b)** En $(1,-1)$ numerador y denominador se anulan. Se trasladan rectas al punto: $x=1+h$, $y=-1+mh$ con $h\to0$.`,
        r`Numerador: $4(h+mh)=4h(1+m)$. Denominador: $(-1+mh)^2-(1+h)=-h(2m+1)+m^2h^2$.`,
        r`Cociente: $\frac{4(1+m)}{-(2m+1)+m^2h}\to-\frac{4(1+m)}{2m+1}$, que depende de $m$ ($-4$ si $m=0$, $0$ si $m=-1$). No existe.`,
      ],
    },
    {
      fuente: 'TP 2, ej. 5 b',
      enunciado: r`Compruebe con límites sucesivos que no existe $\lim_{(x,y)\to(0,1)}\frac{y-\cos x}{x+1-y}$.`,
      pasos: [
        r`$L_{12}$: primero $y\to1$: $\frac{1-\cos x}{x}$; después $x\to0$: $\frac{1-\cos x}{x}\to0$.`,
        r`$L_{21}$: primero $x\to0$: $\frac{y-1}{1-y}=-1$; después $y\to1$: $-1$.`,
        r`$L_{12}=0\neq-1=L_{21}$: el límite doble no existe.`,
      ],
      respuesta: r`No existe ($L_{12}=0$, $L_{21}=-1$).`,
    },
    {
      fuente: 'TP 2, ej. 6 iii',
      enunciado: r`Con límites sucesivos muestre que no existe $\lim_{(x,y)\to(0,0)}\frac{10x^3-2y^3}{(x-1)^3+y^3+1}$.`,
      pasos: [
        r`$L_{12}$: con $y\to0$ queda $\frac{10x^3}{(x-1)^3+1}$. Como $(x-1)^3+1=x^3-3x^2+3x$, el cociente es $\frac{10x^2}{x^2-3x+3}\to0$.`,
        r`$L_{21}$: con $x\to0$ queda $\frac{-2y^3}{-1+y^3+1}=\frac{-2y^3}{y^3}=-2$.`,
        r`$0\neq-2$: no existe.`,
      ],
    },
    {
      fuente: 'TP 2, ej. 7 d y f',
      enunciado: r`Calcule d) $\lim_{(x,y)\to(0,-2)}\frac{xy-x+5}{y^2}$; f) $\lim_{(x,y)\to(1,13)}\frac{4-\sqrt{3x+y}}{16-3x-y}$.`,
      pasos: [
        r`**d)** Es racional y el denominador en el punto vale $4\neq0$: sustitución directa, $\frac{0-0+5}{4}=\frac54$.`,
        r`**f)** Sustituyendo da $\frac{4-4}{0}$. Con $u=3x+y\to16$: $\frac{4-\sqrt u}{16-u}=\frac{4-\sqrt u}{(4-\sqrt u)(4+\sqrt u)}=\frac{1}{4+\sqrt u}\to\frac18$.`,
      ],
      respuesta: r`d) $\frac54$; f) $\frac18$.`,
    },
    {
      fuente: 'TP 2, ej. 9 g y 11 f',
      enunciado: r`g) $\lim_{(x,y)\to(0,0)}\frac{6xy^2}{x^2+y^4}$; f) $\lim_{(x,y,z)\to(0,0,0)}\frac{(y-x)(z-x)(z+y)}{yz-xy-xz+x^2}$.`,
      pasos: [
        r`**g)** Por $y=mx$: $\frac{6m^2x^3}{x^2+m^4x^4}=\frac{6m^2x}{1+m^4x^2}\to0$ para todo $m$. Pero por $x=y^2$: $\frac{6y^4}{2y^4}=3$. **No existe.**`,
        r`**f)** El denominador factoriza: $yz-xy-xz+x^2=(y-x)(z-x)$.`,
        r`Donde está definida, $f=z+y\to0$. El límite es $0$.`,
      ],
      respuesta: r`g) No existe; f) $0$.`,
    },
  ],
  preguntas: [
    {
      id: 'm02-q1', p: r`Si $f$ tiende a $0$ por todas las rectas $y=mx$ que pasan por el origen, entonces…`,
      opciones: ['el límite doble es 0', 'el límite doble no existe', '0 es solo un candidato: hay que probarlo de otra forma', 'los límites sucesivos son distintos'],
      ok: 2, por: r`Otros caminos pueden dar otro valor, como $x=y^2$ en $\frac{6xy^2}{x^2+y^4}$. La existencia se prueba acotando o con polares.`,
    },
    {
      id: 'm02-q2', p: r`Los límites sucesivos de $f$ en $(0,0)$ dan $L_{12}=L_{21}=0$. ¿Qué se puede concluir?`,
      opciones: ['Que el límite doble es 0', 'Que el límite doble no existe', 'Nada definitivo: 0 es candidato', 'Que f es continua'],
      ok: 2, por: r`$\frac{xy}{x^2+y^2}$ tiene iterados iguales a $0$ y no tiene límite doble. Solo si los iterados **difieren** se concluye algo (que no existe).`,
    },
    {
      id: 'm02-q3', p: r`¿Cuánto vale $\lim_{(x,y)\to(0,0)}\frac{xy}{x^2+y^2}$ por la recta $y=2x$?`,
      opciones: [r`$0$`, r`$\frac25$`, r`$\frac12$`, r`$2$`],
      ok: 1, por: r`$\frac{2x^2}{x^2+4x^2}=\frac25$. Con otra pendiente da otro número: el límite doble no existe.`,
    },
    {
      id: 'm02-q4', p: r`Para que el límite en $P_0$ exista, ¿$f$ tiene que estar definida en $P_0$?`,
      opciones: ['Sí, siempre', 'No: alcanza con que esté definida en un entorno reducido de P₀', 'Solo si f es racional', 'Solo si el límite es cero'],
      ok: 1, por: r`La definición usa $0<d(P,P_0)<\delta$: el punto mismo queda afuera.`,
    },
    {
      id: 'm02-q5', p: r`En polares, $\frac{x^2y}{x^2+y^2}=r\cos^2\theta\operatorname{sen}\theta$. ¿Qué se concluye?`,
      opciones: ['El límite no existe porque depende de θ', 'El límite es 0, porque |r cos²θ sen θ| ≤ r → 0', 'El límite es 1', 'Hay que probar con parábolas'],
      ok: 1, por: r`La cota $r$ no depende de $\theta$ y tiende a cero: el límite es $0$ por cualquier camino.`,
    },
  ],
};

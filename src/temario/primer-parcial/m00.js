const r = String.raw;

export default {
  intro: r`Antes de derivar e integrar en varias variables hace falta el vocabulario geométrico del espacio: rectas, planos y superficies cuádricas. Aparecen en todos los TP: el plano tangente es un plano, la recta normal es una recta, y casi todos los sólidos que se integran están limitados por cuádricas.`,
  teoria: [
    {
      id: 'recta', titulo: 'La recta en el espacio',
      texto: r`Una recta queda determinada por un punto $P_0(x_0,y_0,z_0)$ y un **vector director** $\vec d=(a,b,c)$.

- **Vectorial:** $\vec r(t)=\vec{OP_0}+t\,\vec d$.
- **Paramétrica:** $x=x_0+at,\ y=y_0+bt,\ z=z_0+ct$.
- **Simétrica:** $\dfrac{x-x_0}{a}=\dfrac{y-y_0}{b}=\dfrac{z-z_0}{c}$ (si $a,b,c\neq0$).

El **ángulo entre dos rectas** es el de sus directores: $\cos\alpha=\dfrac{|\vec d_1\cdot\vec d_2|}{|\vec d_1|\,|\vec d_2|}$. Son paralelas si los directores son proporcionales y perpendiculares si su producto escalar es cero.`,
    },
    {
      id: 'plano', titulo: 'El plano',
      texto: r`Un plano queda determinado por un punto $P_0$ y un **vector normal** $\vec n=(A,B,C)$, perpendicular a todo vector del plano:

$$A(x-x_0)+B(y-y_0)+C(z-z_0)=0\quad\Longleftrightarrow\quad Ax+By+Cz+D=0$$

- Dos planos son **paralelos** si sus normales son proporcionales, y **perpendiculares** si $\vec n_1\cdot\vec n_2=0$.
- Una recta es **perpendicular** a un plano si su director es paralelo a la normal; es **paralela** al plano si $\vec d\cdot\vec n=0$.
- Distancia de un punto al plano: $d=\dfrac{|Ax_1+By_1+Cz_1+D|}{\sqrt{A^2+B^2+C^2}}$.

Esta forma "punto y normal" es exactamente la del **plano tangente** del TP 10, donde la normal sale del gradiente.`,
    },
    {
      id: 'cuadricas', titulo: 'Superficies cuádricas',
      texto: r`Son las superficies de ecuación de segundo grado en $x$, $y$, $z$. Llevadas a la forma canónica (completando cuadrados si hace falta) se reconocen así:

- **Elipsoide:** $\frac{x^2}{a^2}+\frac{y^2}{b^2}+\frac{z^2}{c^2}=1$. Si $a=b=c$ es una esfera.
- **Hiperboloide de una hoja:** $\frac{x^2}{a^2}+\frac{y^2}{b^2}-\frac{z^2}{c^2}=1$. Un signo menos; el eje es la variable con signo menos.
- **Hiperboloide de dos hojas:** $-\frac{x^2}{a^2}-\frac{y^2}{b^2}+\frac{z^2}{c^2}=1$. Dos signos menos; el eje es la variable positiva.
- **Cono elíptico:** $\frac{x^2}{a^2}+\frac{y^2}{b^2}=\frac{z^2}{c^2}$. Igualado a cero.
- **Paraboloide elíptico:** $\frac{z}{c}=\frac{x^2}{a^2}+\frac{y^2}{b^2}$. Una variable lineal: es el eje.
- **Paraboloide hiperbólico:** $\frac{z}{c}=\frac{x^2}{a^2}-\frac{y^2}{b^2}$. La silla de montar.
- **Cilindros:** falta una variable; la superficie es paralela al eje de esa variable (por ejemplo, $2x^2+z^2=4$ es un cilindro elíptico paralelo al eje $y$).

### El método de las trazas
Para graficar se corta con planos paralelos a los coordenados ($z=k$, $y=k$, $x=k$) y se reconocen las curvas de corte: elipses, hipérbolas, parábolas o rectas. Con dos o tres familias de trazas la forma queda clara.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 0, ej. 1 h',
      enunciado: r`Identifique y dé los elementos de la curva $4x^2+y^2-8x+4y-8=0$.`,
      pasos: [
        r`Se agrupa y completa cuadrados: $4(x^2-2x)+(y^2+4y)=8$.`,
        r`$4\big[(x-1)^2-1\big]+\big[(y+2)^2-4\big]=8\Rightarrow4(x-1)^2+(y+2)^2=16$.`,
        r`Dividiendo por 16: $\dfrac{(x-1)^2}{4}+\dfrac{(y+2)^2}{16}=1$.`,
        r`Es una **elipse** de centro $(1,-2)$, semieje mayor $a=4$ vertical (en la dirección de $y$) y semieje menor $b=2$. Vértices $(1,2)$ y $(1,-6)$; $c=\sqrt{16-4}=2\sqrt3$, focos $(1,-2\pm2\sqrt3)$.`,
      ],
      respuesta: r`Elipse $\frac{(x-1)^2}{4}+\frac{(y+2)^2}{16}=1$, centro $(1,-2)$.`,
    },
    {
      fuente: 'TP 0, ej. 6',
      enunciado: r`Identifique las superficies: d) $4x^2+9y^2+36z^2=36$; f) $25y^2+z^2=100+4x^2$; g) $9x^2-y^2-z^2=9$; k) $x^2+4z^2-y=0$; l) $16x^2=y^2+4z^2$.`,
      pasos: [
        r`**d)** Dividiendo por 36: $\frac{x^2}{9}+\frac{y^2}{4}+z^2=1$. **Elipsoide** de semiejes $3$, $2$ y $1$.`,
        r`**f)** $-4x^2+25y^2+z^2=100\Rightarrow-\frac{x^2}{25}+\frac{y^2}{4}+\frac{z^2}{100}=1$. Un signo menos: **hiperboloide de una hoja** con eje $x$.`,
        r`**g)** $x^2-\frac{y^2}{9}-\frac{z^2}{9}=1$. Dos signos menos: **hiperboloide de dos hojas** con eje $x$ (de revolución, porque $y$ y $z$ tienen el mismo denominador).`,
        r`**k)** $y=x^2+4z^2$: $y$ está a la primera potencia. **Paraboloide elíptico** de eje $y$, abre hacia $y>0$.`,
        r`**l)** $16x^2=y^2+4z^2$, igualado a cero si se pasa todo de un lado: **cono elíptico** con eje $x$.`,
      ],
      lab: 'cuadricas',
    },
    {
      fuente: 'TP 0, ej. 7',
      enunciado: r`Encuentre la ecuación del plano que pasa por $(5,-2,7)$ y es paralelo a $2x+3y-2z+4=0$.`,
      pasos: [
        r`Planos paralelos tienen la misma normal: $\vec n=(2,3,-2)$.`,
        r`Punto y normal: $2(x-5)+3(y+2)-2(z-7)=0$.`,
        r`$2x-10+3y+6-2z+14=0\Rightarrow2x+3y-2z+10=0$.`,
      ],
      respuesta: r`$2x+3y-2z+10=0$.`,
    },
    {
      fuente: 'TP 0, ej. 8 y 10',
      enunciado: r`Encuentre la recta que pasa por $(3,1,-2)$ y es perpendicular al plano $x-y-5z=6$. Luego halle su intersección con el plano $5x-y+4z=0$.`,
      pasos: [
        r`Perpendicular al plano: el director es la normal, $\vec d=(1,-1,-5)$. Simétrica: $\dfrac{x-3}{1}=\dfrac{y-1}{-1}=\dfrac{z+2}{-5}$.`,
        r`Paramétrica: $x=3+t$, $y=1-t$, $z=-2-5t$. Se reemplaza en el segundo plano: $5(3+t)-(1-t)+4(-2-5t)=0$.`,
        r`$15+5t-1+t-8-20t=0\Rightarrow6-14t=0\Rightarrow t=\frac37$.`,
        r`Punto: $x=3+\frac37=\frac{24}7$, $y=1-\frac37=\frac47$, $z=-2-\frac{15}7=-\frac{29}7$. Verificación: $\frac{120-4-116}{7}=0$.`,
      ],
      respuesta: r`Recta $\frac{x-3}{1}=\frac{y-1}{-1}=\frac{z+2}{-5}$; intersección $\left(\frac{24}7,\frac47,-\frac{29}7\right)$.`,
    },
    {
      fuente: 'TP 0, ej. 9',
      enunciado: r`Determine el ángulo entre las rectas $\{x=3+2t,\ y=-1+t,\ z=3-t\}$ y $\{x=-2+t,\ y=7+2t,\ z=t\}$.`,
      pasos: [
        r`Directores: $\vec d_1=(2,1,-1)$ y $\vec d_2=(1,2,1)$.`,
        r`$\vec d_1\cdot\vec d_2=2+2-1=3$; $|\vec d_1|=|\vec d_2|=\sqrt6$.`,
        r`$\cos\alpha=\frac{3}{6}=\frac12\Rightarrow\alpha=60^\circ$.`,
      ],
      respuesta: r`$60^\circ$ ($\pi/3$).`,
    },
  ],
  preguntas: [
    {
      id: 'm00-q1', p: r`¿Qué superficie es $x^2+y^2-z^2=1$?`,
      opciones: ['Cono', 'Hiperboloide de una hoja', 'Hiperboloide de dos hojas', 'Paraboloide hiperbólico'],
      ok: 1, por: r`Un solo signo menos e igualado a $1$: una hoja. Si estuviera igualado a $0$ sería un cono.`,
    },
    {
      id: 'm00-q2', p: r`¿Qué representa $2x^2+z^2=4$ en $\mathbb R^3$?`,
      opciones: ['Una elipse', 'Un elipsoide', 'Un cilindro elíptico paralelo al eje y', 'Un cilindro paralelo al eje z'],
      ok: 2, por: r`En el espacio, la ausencia de $y$ significa que $y$ es libre: la elipse $2x^2+z^2=4$ se repite para cada $y$.`,
    },
    {
      id: 'm00-q3', p: r`El vector normal del plano $3x-y+2z=7$ es:`,
      opciones: [r`$(3,-1,2)$`, r`$(3,-1,2,7)$`, r`$(-1,2,7)$`, r`$(7,0,0)$`],
      ok: 0, por: r`Los coeficientes de $x$, $y$, $z$ forman la normal.`,
    },
    {
      id: 'm00-q4', p: r`Una recta de director $\vec d$ es paralela a un plano de normal $\vec n$ cuando:`,
      opciones: [r`$\vec d=k\,\vec n$`, r`$\vec d\cdot\vec n=0$`, r`$\vec d\times\vec n=\vec0$`, r`$|\vec d|=|\vec n|$`],
      ok: 1, por: r`Si la recta es paralela al plano, su director es perpendicular a la normal. Si $\vec d=k\vec n$, la recta es **perpendicular** al plano.`,
    },
    {
      id: 'm00-q5', p: r`$y=x^2+4z^2$ es:`,
      opciones: ['Un paraboloide elíptico de eje y', 'Un cono de eje y', 'Un paraboloide hiperbólico', 'Un cilindro parabólico'],
      ok: 0, por: r`$y$ aparece a la primera potencia y los otros dos cuadrados tienen el mismo signo.`,
    },
  ],
};

const r = String.raw;

export default {
  intro: r`En varias variables, tener derivadas parciales no alcanza para que una función se "porte bien". La condición correcta es la **diferenciabilidad**: que cerca del punto la función se parezca a su plano tangente. De ahí sale el diferencial total, la herramienta para aproximar valores y acotar errores de medición.`,
  teoria: [
    {
      id: 'definicion', titulo: 'Función diferenciable',
      texto: r`$z=f(x,y)$ es **diferenciable** en $P_0$ si su incremento total puede escribirse

$$\Delta z=A\,\Delta x+B\,\Delta y+\varepsilon_1\Delta x+\varepsilon_2\Delta y,\qquad\varepsilon_1,\varepsilon_2\to0\text{ cuando }(\Delta x,\Delta y)\to(0,0)$$

con $A$ y $B$ que no dependen de los incrementos. Para $n$ variables: $\Delta u=\sum A_i\Delta x_i+\sum\varepsilon_i\Delta x_i$.

**Teorema.** Si $f$ es diferenciable en $P_0$, entonces $A=f_x(P_0)$ y $B=f_y(P_0)$. *(Se toma $\Delta y=0$, se divide por $\Delta x$ y se pasa al límite.)*

Consecuencias de ser diferenciable:
- Existen las derivadas parciales.
- $f$ es **continua** en $P_0$ (si $\Delta x,\Delta y\to0$, $\Delta z\to0$).
- Existe la derivada en **todas** las direcciones y vale $\nabla f\cdot\vec u$.

**Condición suficiente.** Si $f_x$ y $f_y$ existen en un entorno de $P_0$ y son **continuas** en $P_0$, $f$ es diferenciable en $P_0$. (No es necesaria: hay funciones diferenciables con parciales discontinuas.)

> Para probar que **no** es diferenciable, lo más rápido suele ser mostrar que no es continua: $\frac{3x^2y}{x^4+y^2}$ por $y=x^2$ vale $\frac32$, así que en el origen no es continua y no es diferenciable.`,
    },
    {
      id: 'diferencial', titulo: 'Diferencial total e interpretación geométrica',
      texto: r`La parte lineal del incremento es el **diferencial total**:

$$dz=f_x(P_0)\,dx+f_y(P_0)\,dy\qquad(dx=\Delta x,\ dy=\Delta y)$$

Para tres variables $du=f_x\,dx+f_y\,dy+f_z\,dz$.

**Geometría.** $\Delta z$ es lo que sube la **superficie** al pasar de $(x_0,y_0)$ a $(x_0+\Delta x,y_0+\Delta y)$; $dz$ es lo que sube el **plano tangente**. Su diferencia $\varepsilon_1\Delta x+\varepsilon_2\Delta y$ es un infinitésimo de orden superior al paso. Por eso, con incrementos chicos:

$$f(x_0+\Delta x,\,y_0+\Delta y)\approx f(x_0,y_0)+dz$$

que es la **aproximación lineal** (la función reemplazada por su plano tangente).

**Invariancia de la forma.** Si $x$ e $y$ dependen de otras variables, igual vale $dz=f_x\,dx+f_y\,dy$, ahora con $dx$ y $dy$ diferenciales. Se demuestra con la regla de la cadena (lo tomaron en el final de septiembre 2024).

**Diferencial segundo:** $d^2z=f_{xx}dx^2+2f_{xy}\,dx\,dy+f_{yy}dy^2$ (si se cumple Schwarz). Simbólicamente, $d^2z=\left(dx\frac{\partial}{\partial x}+dy\frac{\partial}{\partial y}\right)^2f$.

**Diferencial exacta:** $P\,dx+Q\,dy$ es el diferencial de alguna $f$ si y solo si $P_y=Q_x$ (con derivadas continuas en una región simplemente conexa). Vuelve en las ecuaciones exactas del TP 22.`,
    },
    {
      id: 'errores', titulo: 'Cálculo aproximado y errores',
      texto: r`**Cálculo aproximado** (método de la cátedra):
1. Elegir la función. 2. Tomar $P_0$ con valores "redondos" cercanos. 3. Los incrementos son la diferencia con el valor real (los ángulos, en radianes). 4. Derivadas parciales en $P_0$. 5. $dz$. 6. $f(P_0+\Delta)\approx f(P_0)+dz$.

**Errores.** Si las variables se midieron con errores $dx$, $dy$:
- **Error absoluto:** $E_a\approx|dz|$. Para el **máximo** error posible se suman los valores absolutos: $|f_x|\,|dx|+|f_y|\,|dy|$.
- **Error relativo:** $E_r=\frac{dz}{z}$. **Porcentual:** $E_\%=\frac{dz}{z}\cdot100\%$.

Truco con productos y potencias: si $V=x^ay^b$, entonces $\frac{dV}{V}=a\frac{dx}{x}+b\frac{dy}{y}$. Si el radio y la altura de un cono tienen error del 1 %, el volumen $V=\frac13\pi r^2h$ tiene error del $2\cdot1\%+1\cdot1\%=3\%$.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 11, ej. 1 a',
      enunciado: r`Halle $\Delta z$ y $dz$ para $z=3x^2+2xy-y^2$ en $x=1$, $y=4$ con $\Delta x=0{,}03$, $\Delta y=-0{,}02$.`,
      pasos: [
        r`$f(1,4)=3+8-16=-5$; $f(1{,}03;\ 3{,}98)=3{,}1827+8{,}1988-15{,}8404=-4{,}4589$. $\Delta z=0{,}5411$.`,
        r`$f_x=6x+2y=14$, $f_y=2x-2y=-6$ en $(1,4)$.`,
        r`$dz=14\cdot0{,}03+(-6)(-0{,}02)=0{,}42+0{,}12=0{,}54$.`,
        r`La diferencia $\Delta z-dz=0{,}0011$ es mucho menor que el paso ($\approx0{,}036$).`,
      ],
      respuesta: r`$\Delta z=0{,}5411$, $dz=0{,}54$.`,
      lab: 'diferencial',
    },
    {
      fuente: 'TP 11, ej. 3',
      enunciado: r`Demuestre que $f(x,y)=\frac{3x^2y}{x^4+y^2}$, $f(0,0)=0$, no es diferenciable en $(0,0)$.`,
      pasos: [
        r`Por $y=x^2$: $f(x,x^2)=\frac{3x^4}{2x^4}=\frac32\not\to0=f(0,0)$.`,
        r`No es continua en el origen. Como diferenciable implica continua, **no es diferenciable**.`,
        r`Observación: las parciales sí existen, $f_x(0,0)=f_y(0,0)=0$, porque $f(h,0)=f(0,k)=0$.`,
      ],
    },
    {
      fuente: 'TP 11, ej. 9 a',
      enunciado: r`Use el diferencial para aproximar $1{,}002\cdot(2{,}003)^2\cdot(3{,}004)^3$.`,
      pasos: [
        r`$f=x\,y^2z^3$, $P_0=(1,2,3)$, $dx=0{,}002$, $dy=0{,}003$, $dz=0{,}004$. $f(P_0)=1\cdot4\cdot27=108$.`,
        r`$f_x=y^2z^3=108$, $f_y=2xyz^3=108$, $f_z=3xy^2z^2=108$ (casualidad linda).`,
        r`$df=108\,(0{,}002+0{,}003+0{,}004)=0{,}972$.`,
        r`$f\approx108+0{,}972=108{,}972$. El valor exacto es $108{,}9756\ldots$`,
      ],
      respuesta: r`$\approx108{,}972$.`,
    },
    {
      fuente: 'TP 11, ej. 14',
      enunciado: r`El ángulo de elevación al extremo de una torre es $30°$ con error de $0{,}5°$, y la distancia a la base es $100$ m con error de $0{,}1$ m. Calcule el error posible en la altura.`,
      pasos: [
        r`$h=d\operatorname{tg}\theta$. Con $\theta=30°$, $d=100$: $h=\frac{100}{\sqrt3}\approx57{,}74$ m.`,
        r`$dh=\operatorname{tg}\theta\,dd+d\sec^2\theta\,d\theta$. El ángulo en radianes: $d\theta=0{,}5\cdot\frac{\pi}{180}=\frac{\pi}{360}$.`,
        r`$dh=\frac{1}{\sqrt3}(0{,}1)+100\cdot\frac43\cdot\frac{\pi}{360}=0{,}058+1{,}164\approx1{,}22$ m.`,
        r`Casi todo el error viene del ángulo: medir bien la distancia no alcanza.`,
      ],
      respuesta: r`$\approx1{,}22$ m (un $2{,}1\%$).`,
    },
    {
      fuente: 'TP 11, ej. 16',
      enunciado: r`$R=\frac EI$. Hay un error de $\frac1{10}$ A en $I$ y de $\frac1{20}$ V en $E$. a) Error aproximado de $R$ si $I=15$ A y $E=110$ V. b) Error porcentual.`,
      pasos: [
        r`$dR=\frac1I\,dE-\frac{E}{I^2}\,dI$. Para el error máximo se suman los módulos.`,
        r`$|dR|\le\frac{0{,}05}{15}+\frac{110\cdot0{,}1}{225}=0{,}0033+0{,}0489=0{,}0522\ \Omega$.`,
        r`$R=\frac{110}{15}=7{,}33\ \Omega$; $E_\%=\frac{0{,}0522}{7{,}33}\cdot100\approx0{,}71\%$.`,
      ],
    },
    {
      fuente: 'TP 11, ej. 17',
      enunciado: r`Una caja mide $10$, $12$ y $15$ cm, con error de $0{,}02$ cm en cada medida. Error máximo y porcentual del volumen.`,
      pasos: [
        r`$V=xyz=1800$ cm³. $dV=yz\,dx+xz\,dy+xy\,dz$.`,
        r`$dV=(180+150+120)\cdot0{,}02=9$ cm³.`,
        r`$E_\%=\frac{9}{1800}\cdot100=0{,}5\%$. Con el truco: $\frac{0{,}02}{10}+\frac{0{,}02}{12}+\frac{0{,}02}{15}=0{,}005$.`,
      ],
    },
  ],
  preguntas: [
    {
      id: 'm11-q1', p: r`¿Cuál de estas implicaciones es **verdadera** para $f(x,y)$ en $P_0$?`,
      opciones: ['Si existen las parciales, f es diferenciable', 'Si f es diferenciable, f es continua', 'Si f es continua, f es diferenciable', 'Si f es continua, existen las parciales'],
      ok: 1, por: r`Diferenciable ⇒ continua y ⇒ existen las parciales. Ninguna de las recíprocas vale.`,
    },
    {
      id: 'm11-q2', p: r`Una condición **suficiente** para que $f$ sea diferenciable en $P_0$ es:`,
      opciones: ['que sea continua en P₀', 'que tenga derivadas parciales en P₀', 'que sus derivadas parciales sean continuas en P₀', 'que f(P₀) = 0'],
      ok: 2, por: r`Parciales que existen en un entorno y son continuas en $P_0$ garantizan la diferenciabilidad.`,
    },
    {
      id: 'm11-q3', p: r`Geométricamente, $dz$ es:`,
      opciones: ['lo que sube la superficie', 'lo que sube el plano tangente', 'la pendiente máxima', 'el área del rectángulo dx·dy'],
      ok: 1, por: r`$dz=f_x\,dx+f_y\,dy$ es el incremento de la función lineal cuyo gráfico es el plano tangente.`,
    },
    {
      id: 'm11-q4', p: r`Si el radio de un cilindro tiene error del 2 % y la altura del 1 %, el error del volumen $\pi r^2h$ es aproximadamente:`,
      opciones: ['3 %', '4 %', '5 %', '2 %'],
      ok: 2, por: r`$\frac{dV}{V}=2\frac{dr}{r}+\frac{dh}{h}=4\%+1\%$.`,
    },
    {
      id: 'm11-q5', p: r`¿Es $y\,dx+x\,dy$ un diferencial exacto?`,
      opciones: [r`Sí, es $d(xy)$`, 'No, porque no es homogéneo', r`Sí, es $d(x+y)$`, 'No se puede saber'],
      ok: 0, por: r`$P=y$, $Q=x$: $P_y=1=Q_x$. Y efectivamente $d(xy)=y\,dx+x\,dy$.`,
    },
  ],
};

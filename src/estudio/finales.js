// Finales de Análisis Matemático II (UTN-FRT) transcriptos de las fotos de la carpeta "Finales AM2" y resueltos.
// tema = módulo del temario donde se estudia; tipo = teoria | vf | practica.
const r = String.raw;

export const FINALES = [
  {
    id: '2024-05-24', fecha: '24 de mayo de 2024',
    items: [
      {
        n: '1a', tema: 'm12', tipo: 'vf',
        enunciado: r`Sea $f$ una función de $n$ variables independientes y $P_0$ un punto de su dominio. ¿Es cierto que si alguna de las derivadas parciales $\frac{\partial f}{\partial x_i}(P_0)$ **no existe**, entonces $P_0$ no es punto crítico de $f$? Justifique.`,
        resolucion: r`**Falso.** Un punto interior $P_0$ del dominio es **punto crítico** cuando todas las derivadas parciales se anulan **o cuando alguna no existe**. Los dos casos son candidatos a extremo.

Contraejemplo: $f(x,y)=\sqrt{x^2+y^2}$ en el origen. $f_x(0,0)=\lim_{h\to 0}\frac{|h|}{h}$ no existe (los laterales dan $1$ y $-1$), y sin embargo $(0,0)$ es punto crítico: de hecho es el mínimo absoluto, porque $f\ge 0=f(0,0)$.`,
      },
      {
        n: '1b', tema: 'm12', tipo: 'teoria',
        enunciado: r`Desarrolle el método de los multiplicadores de Lagrange para determinar los puntos críticos de $z=f(u,v,w)$ cuando las variables están relacionadas por $\varphi(u,v,w)=0$, donde suponemos que $w=w(u,v)$.`,
        resolucion: r`Como $w=w(u,v)$, la función queda $z=f(u,v,w(u,v))$, de dos variables independientes. Condición necesaria de extremo (regla de la cadena):

$$z_u = f_u + f_w\,w_u = 0,\qquad z_v = f_v + f_w\,w_v = 0$$

Derivando implícitamente $\varphi(u,v,w(u,v))=0$, con $\varphi_w\neq 0$:

$$w_u=-\frac{\varphi_u}{\varphi_w},\qquad w_v=-\frac{\varphi_v}{\varphi_w}$$

Reemplazando: $f_u-\frac{f_w}{\varphi_w}\varphi_u=0$ y $f_v-\frac{f_w}{\varphi_w}\varphi_v=0$. Se define el multiplicador $\lambda=-\frac{f_w}{\varphi_w}$, que además cumple $f_w+\lambda\varphi_w=0$. Queda el sistema de 4 ecuaciones con 4 incógnitas $(u,v,w,\lambda)$:

$$f_u+\lambda\varphi_u=0,\quad f_v+\lambda\varphi_v=0,\quad f_w+\lambda\varphi_w=0,\quad \varphi(u,v,w)=0$$

Es lo mismo que pedir $\nabla F=0$ para la **función de Lagrange** $F=f+\lambda\varphi$. Geométricamente: en el punto crítico $\nabla f$ es paralelo a $\nabla\varphi$.`,
      },
      {
        n: '2a', tema: 'm16', tipo: 'vf',
        enunciado: r`¿Es cierto que $\int_0^{\pi/2}\int_0^{\pi/2}\int_0^{2}\operatorname{sen}\varphi\;d\rho\,d\varphi\,d\theta$ representa el volumen de la esfera centrada en el origen, de radio 2, en el primer octante? Justifique.`,
        resolucion: r`**Falso.** Los límites están bien ($0\le\rho\le 2$, $0\le\varphi\le\pi/2$ y $0\le\theta\le\pi/2$ describen el primer octante), pero falta el jacobiano completo de las esféricas: $dV=\rho^2\operatorname{sen}\varphi\,d\rho\,d\varphi\,d\theta$.

La integral propuesta vale $2\cdot 1\cdot\frac{\pi}{2}=\pi$, mientras que el volumen pedido es

$$\int_0^{\pi/2}\!\!\int_0^{\pi/2}\!\!\int_0^{2}\rho^2\operatorname{sen}\varphi\,d\rho\,d\varphi\,d\theta=\frac{8}{3}\cdot 1\cdot\frac{\pi}{2}=\frac{4\pi}{3}$$

que coincide con $\frac18\cdot\frac43\pi\,2^3$.`,
      },
      {
        n: '2b', tema: 'm18', tipo: 'teoria',
        enunciado: r`Deduzca una fórmula para el momento de inercia de un sólido de densidad variable respecto del eje $y$.`,
        resolucion: r`1. Se encierra el sólido $Q$ en una caja y se la divide en $n$ cajitas; se conservan las $n$ que están dentro de $Q$, de volumen $\Delta V_i$.
2. En cada una se elige un punto $(x_i,y_i,z_i)$. Si la cajita es chica, la densidad es casi constante y su masa es $\Delta m_i\approx\delta(x_i,y_i,z_i)\,\Delta V_i$.
3. La distancia de ese punto al eje $y$ es $\sqrt{x_i^2+z_i^2}$, así que su momento de inercia (masa por distancia al cuadrado) es $(x_i^2+z_i^2)\,\delta(x_i,y_i,z_i)\,\Delta V_i$.
4. Se suma y se toma el límite cuando la norma de la partición tiende a cero:

$$I_y=\lim_{\|\Delta\|\to 0}\sum_{i=1}^{n}(x_i^2+z_i^2)\,\delta(x_i,y_i,z_i)\,\Delta V_i=\iiint_Q (x^2+z^2)\,\delta(x,y,z)\,dV$$`,
      },
      {
        n: '3a', tema: 'm23', tipo: 'teoria',
        enunciado: r`Defina ecuación diferencial lineal de primer orden.`,
        resolucion: r`Es la que puede escribirse como $\frac{dy}{dx}+P(x)\,y=Q(x)$, con $P$ y $Q$ continuas en un intervalo. Es lineal porque $y$ e $y'$ aparecen a la primera potencia y no se multiplican entre sí. Si $Q(x)=0$ es **homogénea**; si no, **no homogénea**.`,
      },
      {
        n: '3b', tema: 'm23', tipo: 'practica',
        enunciado: r`Identifique la ecuación $dy+(y-1)\left[p(x)-\frac{q(x)}{y-1}\right]dx=0$ y deduzca su solución general.`,
        resolucion: r`Distribuyendo: $dy+\big[(y-1)p(x)-q(x)\big]dx=0$, o sea

$$y'+p(x)\,y=p(x)+q(x)$$

Es **lineal de primer orden** no homogénea. Factor integrante $\mu=e^{\int p\,dx}$:

$$y=e^{-\int p\,dx}\left[\int (p+q)\,e^{\int p\,dx}dx+C\right]$$

Como $\int p\,e^{\int p}dx=e^{\int p}$, se simplifica a

$$y=1+e^{-\int p\,dx}\left[\int q(x)\,e^{\int p\,dx}dx+C\right]$$

Atajo: con $u=y-1$ la ecuación queda $u'+p\,u=q$, lineal en $u$.`,
      },
    ],
  },
  {
    id: '2024-07-26', fecha: '26 de julio de 2024',
    items: [
      {
        n: '1a', tema: 'm02', tipo: 'teoria',
        enunciado: r`Dada $f$ de dos variables, explique los procedimientos para calcular el límite de $f$ cuando $(x,y)\to(x_0,y_0)$ usando caminos y límites sucesivos.`,
        resolucion: r`**Límites sucesivos (iterados).** Se calcula $L_{12}=\lim_{x\to x_0}\left[\lim_{y\to y_0}f(x,y)\right]$ y $L_{21}=\lim_{y\to y_0}\left[\lim_{x\to x_0}f(x,y)\right]$. Si existen y son **distintos**, el límite doble **no existe**. Si son iguales, el límite doble puede existir o no: solo se tiene un candidato.

**Caminos.** Se acerca $(x,y)$ a $(x_0,y_0)$ por curvas que pasen por el punto: rectas $y-y_0=m(x-x_0)$, parábolas $y-y_0=k(x-x_0)^2$, etc. Si el resultado depende del camino (por ejemplo de $m$), el límite **no existe**. Si todos los caminos probados dan lo mismo, ese valor es solo candidato: hay que probarlo con la definición $\varepsilon$-$\delta$, o con coordenadas polares acotando $|f-L|$ por algo que solo dependa de $r$ y tienda a cero.

Teorema que los vincula: si existe el límite doble $L$ y existen los límites simples interiores, entonces los sucesivos existen y valen $L$.`,
      },
      {
        n: '1b', tema: 'm05', tipo: 'teoria',
        enunciado: r`Enuncie, establezca hipótesis y tesis y demuestre el teorema del valor medio del cálculo diferencial para una función de dos variables.`,
        resolucion: r`**Hipótesis.** $f(x,y)$ tiene derivadas parciales $f_x$ y $f_y$ en un entorno del punto $(x_0,y_0)$ que contiene al rectángulo de vértices $(x_0,y_0)$ y $(x_0+h,\,y_0+k)$.

**Tesis.** Existen $\theta_1,\theta_2\in(0,1)$ tales que

$$f(x_0+h,y_0+k)-f(x_0,y_0)=h\,f_x(x_0+\theta_1h,\;y_0+k)+k\,f_y(x_0,\;y_0+\theta_2k)$$

**Demostración.** Se suma y resta $f(x_0,y_0+k)$:

$$\Delta f=\big[f(x_0+h,y_0+k)-f(x_0,y_0+k)\big]+\big[f(x_0,y_0+k)-f(x_0,y_0)\big]$$

En el primer corchete $y=y_0+k$ está fijo: es una función de una variable $x$, derivable (existe $f_x$), y por el teorema de Lagrange vale $h\,f_x(x_0+\theta_1h,\,y_0+k)$. En el segundo, $x=x_0$ fijo: por Lagrange en $y$ vale $k\,f_y(x_0,\,y_0+\theta_2k)$. Sumando se obtiene la tesis.`,
      },
      {
        n: '2a', tema: 'm16', tipo: 'practica',
        enunciado: r`Deduzca una fórmula para la masa del sólido limitado por $x^2+y^2+z^2=4$, $x^2+y^2+z^2=9$, $z^2=x^2+y^2$ con $z\ge 0$, cuya densidad es proporcional a la distancia al origen. Sin resolverla, plantee la integral iterada en las coordenadas adecuadas. Justifique.`,
        resolucion: r`Esferas y cono centrados en el origen: corresponden **coordenadas esféricas**, donde cada superficie es una coordenada constante.

- $x^2+y^2+z^2=4\Rightarrow\rho=2$ y $x^2+y^2+z^2=9\Rightarrow\rho=3$.
- Cono $z=\sqrt{x^2+y^2}$: $\rho\cos\varphi=\rho\operatorname{sen}\varphi\Rightarrow\varphi=\pi/4$. El sólido (la cáscara dentro del cono) cumple $0\le\varphi\le\pi/4$.
- Da toda la vuelta: $0\le\theta\le 2\pi$.
- Densidad: $\delta=k\sqrt{x^2+y^2+z^2}=k\rho$. Jacobiano: $\rho^2\operatorname{sen}\varphi$.

$$M=\iiint_Q\delta\,dV=\int_0^{2\pi}\!\!\int_0^{\pi/4}\!\!\int_2^{3}k\rho\cdot\rho^2\operatorname{sen}\varphi\;d\rho\,d\varphi\,d\theta$$

(Si se resuelve: $M=k\cdot 2\pi\left(1-\tfrac{\sqrt2}{2}\right)\tfrac{65}{4}=\tfrac{65\pi k}{4}(2-\sqrt2)$.)`,
      },
      {
        n: '2b', tema: 'm14', tipo: 'teoria',
        enunciado: r`Enuncie dos propiedades de las integrales triples y demuestre una de ellas.`,
        resolucion: r`Con $f$ y $g$ continuas en la región cerrada y acotada $Q$:

1. **Linealidad:** $\iiint_Q [a f+b g]\,dV=a\iiint_Q f\,dV+b\iiint_Q g\,dV$.
2. **Aditividad:** si $Q=Q_1\cup Q_2$ sin puntos interiores comunes, $\iiint_Q f\,dV=\iiint_{Q_1}f\,dV+\iiint_{Q_2}f\,dV$.

**Demostración de la linealidad.** Para cualquier partición de $Q$ y cualquier elección de puntos,

$$\sum_i\big[af(P_i)+bg(P_i)\big]\Delta V_i=a\sum_i f(P_i)\Delta V_i+b\sum_i g(P_i)\Delta V_i$$

Como $f$ y $g$ son continuas, son integrables: cuando $\|\Delta\|\to0$ cada suma de la derecha tiende a su integral. Por álgebra de límites, la de la izquierda también converge y su límite es la combinación lineal.`,
      },
      {
        n: '3a', tema: 'm22', tipo: 'teoria',
        enunciado: r`Defina ecuación diferencial exacta.`,
        resolucion: r`$M(x,y)\,dx+N(x,y)\,dy=0$ es **exacta** en una región $R$ si existe una función $F(x,y)$ cuyo diferencial total es el primer miembro: $F_x=M$ y $F_y=N$. Entonces la solución general es $F(x,y)=C$.

Criterio: si $M$, $N$, $M_y$ y $N_x$ son continuas en una región simplemente conexa, la ecuación es exacta si y solo si $\frac{\partial M}{\partial y}=\frac{\partial N}{\partial x}$.`,
      },
      {
        n: '3b', tema: 'm23', tipo: 'vf',
        enunciado: r`¿Es cierto que $\frac{dy}{dx}+p(x)y=q(x)y^n$ es exacta para $n=1$? Justifique. Si la respuesta es positiva resuélvala; si es negativa clasifíquela y resuélvala.`,
        resolucion: r`Con $n=1$: $y'+(p-q)\,y=0$, o sea $(p-q)\,y\,dx+dy=0$. Entonces $M=(p-q)y$ y $N=1$:

$$M_y=p(x)-q(x),\qquad N_x=0$$

**No es exacta** (salvo el caso trivial $p=q$). Es una **lineal homogénea**, que también es de **variables separables**:

$$\frac{dy}{y}=\big(q(x)-p(x)\big)dx\;\Rightarrow\;\ln|y|=\int(q-p)\,dx+C\;\Rightarrow\;y=C\,e^{\int (q-p)\,dx}$$

Para $n=1$ la Bernoulli deja de serlo: queda lineal.`,
      },
    ],
  },
  {
    id: '2024-08-02', fecha: '2 de agosto de 2024',
    items: [
      {
        n: '1a', tema: 'm02', tipo: 'vf',
        enunciado: r`Sea $f:\mathbb R^2\to\mathbb R$. Si $\lim_{x\to0}f(x,x^2)=0$ y $\lim_{x\to0}f(x,x)=0$, entonces $\lim_{(x,y)\to(0,0)}f(x,y)=0$.`,
        resolucion: r`**Falso.** Que dos caminos den lo mismo no prueba la existencia del límite. Contraejemplo:

$$f(x,y)=\frac{x^3y}{x^6+y^2}$$

Por $y=x$: $\frac{x^4}{x^6+x^2}=\frac{x^2}{x^4+1}\to0$. Por $y=x^2$: $\frac{x^5}{x^6+x^4}=\frac{x}{x^2+1}\to0$. Pero por $y=x^3$: $\frac{x^6}{2x^6}=\frac12$. El límite doble no existe.`,
      },
      {
        n: '1b', tema: 'm11', tipo: 'vf',
        enunciado: r`$f(x,y)=\frac{xy^2}{x^3+y^3}$ si $(x,y)\neq(0,0)$, $f(0,0)=0$, admite $f_x(0,0)$ y $f_y(0,0)$. ¿Es diferenciable en $(0,0)$?`,
        resolucion: r`**Falso.** Las parciales existen: $f(h,0)=0$ y $f(0,k)=0$, así que $f_x(0,0)=f_y(0,0)=0$.

Pero $f$ no es continua en el origen: por $y=x$, $f(x,x)=\frac{x^3}{2x^3}=\frac12\neq f(0,0)$. Como **diferenciable implica continua**, no es diferenciable. Moraleja: la existencia de las derivadas parciales no alcanza para la diferenciabilidad.`,
      },
      {
        n: '1c', tema: 'm06', tipo: 'vf',
        enunciado: r`Sabiendo que $f(x,y)$ admite derivadas parciales de tercer orden, da lo mismo calcular en cualquier orden $\frac{\partial^3 f}{\partial x^2\partial y}$ y $\frac{\partial^3 f}{\partial y\,\partial x^2}$.`,
        resolucion: r`**Falso en general.** Que las derivadas existan no alcanza: el teorema de Schwarz exige que las derivadas cruzadas sean **continuas** en un entorno del punto. Con esa hipótesis (que $f$ sea de clase $C^3$), las derivadas mixtas que solo difieren en el orden coinciden. Sin continuidad pueden ser distintas, como en el ejemplo clásico $f=\frac{xy(x^2-y^2)}{x^2+y^2}$, donde $f_{xy}(0,0)=-1$ y $f_{yx}(0,0)=1$.`,
      },
      {
        n: '1d', tema: 'm09', tipo: 'practica',
        enunciado: r`Un alpinista desciende por una ladera y $f(x,y)$ es la altitud. Indique la dirección que debe adoptar para bajar por la trayectoria de máxima pendiente y a qué razón descenderá.`,
        resolucion: r`La derivada direccional es $D_{\vec u}f=\nabla f\cdot\vec u=|\nabla f|\cos\alpha$. Es mínima (la bajada más empinada) cuando $\alpha=\pi$, es decir en la dirección de **menos el gradiente**:

$$\vec u=-\frac{\nabla f(x_0,y_0)}{|\nabla f(x_0,y_0)|}$$

La razón de cambio de la altura en esa dirección es $D_{\vec u}f=-|\nabla f(x_0,y_0)|$: desciende a razón $|\nabla f|$ por unidad de distancia horizontal.`,
      },
      {
        n: '2a', tema: 'm20', tipo: 'teoria',
        enunciado: r`Dado un alambre delgado de densidad variable, deduzca las fórmulas de las coordenadas de su centro de masa.`,
        resolucion: r`El alambre es una curva $C$ con densidad lineal $\delta(x,y,z)$. Se divide $C$ en $n$ arcos de longitud $\Delta s_i$ y se elige un punto $(x_i,y_i,z_i)$ en cada uno. La masa del arco es $\Delta m_i\approx\delta(x_i,y_i,z_i)\Delta s_i$ y su momento respecto del plano $yz$ es $x_i\,\Delta m_i$. Sumando y tomando límite:

$$M=\int_C\delta\,ds,\qquad M_{yz}=\int_C x\,\delta\,ds,\quad M_{xz}=\int_C y\,\delta\,ds,\quad M_{xy}=\int_C z\,\delta\,ds$$

$$\bar x=\frac{M_{yz}}{M},\qquad \bar y=\frac{M_{xz}}{M},\qquad \bar z=\frac{M_{xy}}{M}$$

Con $C$ dada por $\vec r(t)$, $a\le t\le b$: $ds=|\vec r\,'(t)|\,dt$.`,
      },
      {
        n: '2b', tema: 'm21', tipo: 'practica',
        enunciado: r`Para la porción de $z^2=x^2+y^2$ comprendida entre $z=1$ y $z=2$, escriba el teorema de evaluación del área justificando las hipótesis. Plantee la integral iterada e indique en qué coordenadas la resolvería.`,
        resolucion: r`**Teorema.** Si $S$ es la gráfica de $z=f(x,y)$ con $f$ de derivadas parciales continuas sobre una región $R$ cerrada y acotada del plano $xy$, entonces $A(S)=\iint_R\sqrt{1+f_x^2+f_y^2}\;dA$.

Acá $f=\sqrt{x^2+y^2}$ (rama $z\ge0$). Sus derivadas $f_x=\frac{x}{\sqrt{x^2+y^2}}$ y $f_y=\frac{y}{\sqrt{x^2+y^2}}$ son continuas salvo en el origen, que **no** pertenece a $R$: la proyección es el anillo $1\le x^2+y^2\le4$. Se cumplen las hipótesis.

$\sqrt{1+f_x^2+f_y^2}=\sqrt2$. En **polares** el anillo es un rectángulo:

$$A=\int_0^{2\pi}\!\!\int_1^{2}\sqrt2\,r\,dr\,d\theta=\sqrt2\cdot2\pi\cdot\frac32=3\sqrt2\,\pi$$`,
      },
      {
        n: '3a', tema: 'm22', tipo: 'teoria',
        enunciado: r`Defina solución general y solución particular de una ecuación diferencial de primer orden.`,
        resolucion: r`**Solución general:** una familia de funciones $y=\varphi(x,C)$ (o $F(x,y,C)=0$) con una constante arbitraria, que satisface la ecuación para cada valor de $C$. Geométricamente es una familia de curvas.

**Solución particular:** la que se obtiene dando a $C$ un valor concreto, en general a partir de una condición inicial $y(x_0)=y_0$. Es una curva de la familia.

(Las soluciones **singulares** satisfacen la ecuación pero no salen de la general para ningún $C$.)`,
      },
      {
        n: '3b', tema: 'm22', tipo: 'teoria',
        enunciado: r`Defina ecuación diferencial con coeficientes homogéneos y deduzca su solución general.`,
        resolucion: r`$M(x,y)\,dx+N(x,y)\,dy=0$ tiene coeficientes homogéneos si $M$ y $N$ son homogéneas **del mismo grado** $n$: $M(tx,ty)=t^nM(x,y)$, ídem $N$.

Con $y=ux$, $dy=u\,dx+x\,du$ y por homogeneidad $M(x,ux)=x^nM(1,u)$, $N(x,ux)=x^nN(1,u)$:

$$x^n\big[M(1,u)\,dx+N(1,u)(u\,dx+x\,du)\big]=0$$

$$\big[M(1,u)+uN(1,u)\big]dx+xN(1,u)\,du=0\;\Rightarrow\;\frac{dx}{x}+\frac{N(1,u)}{M(1,u)+uN(1,u)}\,du=0$$

Es de variables separables. Se integra y se vuelve a $u=y/x$.`,
      },
    ],
  },
  {
    id: '2024-09-30', fecha: '30 de septiembre de 2024',
    items: [
      {
        n: '1a', tema: 'm11', tipo: 'teoria',
        enunciado: r`Dada $f$ de $n$ variables independientes, defina función diferenciable.`,
        resolucion: r`$f$ es diferenciable en el punto interior $P_0$ si su incremento puede escribirse

$$\Delta f=A_1\Delta x_1+\dots+A_n\Delta x_n+\varepsilon_1\Delta x_1+\dots+\varepsilon_n\Delta x_n$$

con $A_i$ constantes (no dependen de los $\Delta x_i$) y $\varepsilon_i\to0$ cuando todos los $\Delta x_i\to0$. La parte lineal $\sum A_i\Delta x_i$ es el diferencial total $df$.`,
      },
      {
        n: '1b', tema: 'm11', tipo: 'teoria',
        enunciado: r`Enuncie un teorema, establezca hipótesis y tesis, y demuestre que las constantes $A_i$ de la definición son las derivadas parciales de $f$ en $P_0$.`,
        resolucion: r`**Hipótesis:** $f$ diferenciable en $P_0$. **Tesis:** existen las derivadas parciales en $P_0$ y $A_i=\frac{\partial f}{\partial x_i}(P_0)$.

**Demostración.** Se toma un incremento solo en $x_i$: $\Delta x_j=0$ para $j\neq i$. La definición queda $\Delta_i f=A_i\Delta x_i+\varepsilon_i\Delta x_i$. Dividiendo por $\Delta x_i$:

$$\frac{\Delta_i f}{\Delta x_i}=A_i+\varepsilon_i\;\xrightarrow[\Delta x_i\to0]{}\;A_i$$

El primer miembro es el cociente incremental parcial, así que su límite es $\frac{\partial f}{\partial x_i}(P_0)$, que existe y vale $A_i$.`,
      },
      {
        n: '1c', tema: 'm11', tipo: 'vf',
        enunciado: r`$u=f(x,y,z)$ donde $x,y,z$ están vinculadas por $\varphi(x,y,z)=0$, con $z=z(x,y)$. ¿Es cierto que $du_{x,y}=du_{x,y,z}$? Justifique.`,
        resolucion: r`**Verdadero** (si $f$ y $z(x,y)$ son diferenciables). Mirando $u$ como función de las tres variables:

$$du=f_x\,dx+f_y\,dy+f_z\,dz$$

Como $z=z(x,y)$, $dz=z_x\,dx+z_y\,dy$. Reemplazando:

$$du=(f_x+f_zz_x)\,dx+(f_y+f_zz_y)\,dy$$

que es exactamente el diferencial de $u$ como función compuesta de $x,y$ (regla de la cadena: $u_x=f_x+f_zz_x$). Es la **invariancia de la forma del diferencial total**: no importa si las variables son independientes o dependientes. Con $\varphi_z\neq0$, $z_x=-\varphi_x/\varphi_z$ y $z_y=-\varphi_y/\varphi_z$.`,
      },
      {
        n: '2a', tema: 'm20', tipo: 'teoria',
        enunciado: r`Dé la definición de integral de línea en el plano $xy$ (solo la definición donde se resumen los cuatro pasos).`,
        resolucion: r`Sea $f(x,y)$ definida sobre una curva suave $C$ de longitud finita.

1. **Partición:** se divide $C$ con puntos $P_0,P_1,\dots,P_n$ en $n$ subarcos de longitud $\Delta s_i$; la norma $\|\Delta\|$ es el mayor $\Delta s_i$.
2. **Elección:** en cada subarco se elige un punto $(x_i^*,y_i^*)$.
3. **Suma:** se forma $\sum_{i=1}^n f(x_i^*,y_i^*)\,\Delta s_i$.
4. **Límite:** si existe independientemente de la partición y de los puntos elegidos,

$$\int_C f(x,y)\,ds=\lim_{\|\Delta\|\to0}\sum_{i=1}^n f(x_i^*,y_i^*)\,\Delta s_i$$`,
      },
      {
        n: '2b', tema: 'm20', tipo: 'teoria',
        enunciado: r`Enuncie las condiciones y establezca la fórmula para evaluar la integral de línea en el plano.`,
        resolucion: r`Si $f$ es continua en una región que contiene a $C$, y $C$ es suave, dada por $\vec r(t)=x(t)\,\vec i+y(t)\,\vec j$, $a\le t\le b$, con $x'$, $y'$ continuas y no simultáneamente nulas, entonces

$$\int_C f(x,y)\,ds=\int_a^b f\big(x(t),y(t)\big)\sqrt{x'(t)^2+y'(t)^2}\;dt$$

Si $C$ es $y=g(x)$, $a\le x\le b$: $ds=\sqrt{1+g'(x)^2}\,dx$.`,
      },
      {
        n: '2c', tema: 'm20', tipo: 'vf',
        enunciado: r`¿Es cierto que $\int_C xy\,ds$ a lo largo de $x^2+y^2=1$ desde $(1,0)$ hasta $(0,1)$ da el área de la superficie lateral sobre $C$ y bajo $f(x,y)=xy$?`,
        resolucion: r`**Verdadero.** La integral de línea de $f$ respecto de la longitud de arco es el área de la "cortina" entre $C$ y la gráfica de $f$, siempre que $f\ge0$ sobre $C$. En el arco del primer cuadrante $x\ge0$ e $y\ge0$, así que $xy\ge0$.

Con $\vec r(t)=(\cos t,\operatorname{sen}t)$, $0\le t\le\pi/2$, $ds=dt$:

$$\int_0^{\pi/2}\cos t\operatorname{sen}t\,dt=\left[\frac{\operatorname{sen}^2t}{2}\right]_0^{\pi/2}=\frac12$$`,
      },
      {
        n: '3a', tema: 'm22', tipo: 'teoria',
        enunciado: r`Defina ecuación diferencial.`,
        resolucion: r`Es una ecuación que vincula una variable independiente, una función incógnita y una o más de sus derivadas. Es **ordinaria** si la incógnita depende de una sola variable, y **en derivadas parciales** si depende de varias. El **orden** es el de la derivada más alta; el **grado**, el exponente de esa derivada cuando la ecuación es polinómica en las derivadas.`,
      },
      {
        n: '3b', tema: 'm22', tipo: 'vf',
        enunciado: r`Dada $\sqrt{1-y}\left(\frac{d^3y}{dx^3}\right)^3+2x\frac{dy}{dx}=0$, ¿es una ecuación diferencial? Justifique.`,
        resolucion: r`**Sí.** Vincula la variable independiente $x$, la función incógnita $y(x)$ y sus derivadas $y'$ e $y'''$.`,
      },
      {
        n: '3c', tema: 'm22', tipo: 'practica',
        enunciado: r`Clasifique la ecuación del apartado anterior.`,
        resolucion: r`- **Ordinaria:** una sola variable independiente.
- **Orden 3:** la derivada más alta es $y'''$.
- **Grado 3:** es polinómica en las derivadas y $y'''$ aparece al cubo ($\sqrt{1-y}$ es un coeficiente que depende de $y$, no de una derivada).
- **No lineal:** $y'''$ está elevada al cubo y el coeficiente $\sqrt{1-y}$ depende de $y$.`,
      },
    ],
  },
  {
    id: '2024-12-06', fecha: '6 de diciembre de 2024',
    items: [
      {
        n: '1a', tema: 'm03', tipo: 'teoria',
        enunciado: r`Enuncie las propiedades de las funciones continuas en un punto y demuestre una de ellas.`,
        resolucion: r`Si $f$ y $g$ son continuas en $P_0$:

1. $f\pm g$ es continua en $P_0$.
2. $f\cdot g$ es continua en $P_0$.
3. $f/g$ es continua en $P_0$ si $g(P_0)\neq0$.
4. Si $h$ (de una variable) es continua en $f(P_0)$, $h\circ f$ es continua en $P_0$.

**Demostración de la suma.** Por continuidad, $\lim_{P\to P_0}f(P)=f(P_0)$ y $\lim_{P\to P_0}g(P)=g(P_0)$. Por el límite de una suma,

$$\lim_{P\to P_0}(f+g)(P)=f(P_0)+g(P_0)=(f+g)(P_0)$$

Existe el valor, existe el límite y coinciden: se cumplen las tres condiciones.`,
      },
      {
        n: '1b', tema: 'm12', tipo: 'vf',
        enunciado: r`Dada $f(x,y)=-(x^2+y^2)$ si $(x,y)\neq(0,0)$ y $f(0,0)=4$, ¿es cierto que $f(0,0)=4$ es un máximo relativo y absoluto? Justifique.`,
        resolucion: r`**Verdadero.** Para todo $(x,y)\neq(0,0)$, $f(x,y)=-(x^2+y^2)<0<4=f(0,0)$. Entonces $f(0,0)\ge f(x,y)$ en todo el dominio: es **máximo absoluto**, y en particular **relativo** (vale en cualquier entorno).

La definición de extremo solo compara valores: no pide continuidad ni derivabilidad. Aquí $f$ es discontinua en el origen y el criterio del hessiano no se puede usar; hay que razonar con la definición.`,
      },
      {
        n: '2a', tema: 'm14', tipo: 'teoria',
        enunciado: r`Enuncie un teorema, establezca hipótesis y tesis y demuestre que $\iiint_R\big(g(x,y,z)+7\big)dV=\iiint_R g\,dV+7V$, donde $g$ es continua en $R$ y $V$ es el volumen de $R$.`,
        resolucion: r`**Hipótesis:** $R$ región cerrada y acotada de $\mathbb R^3$; $g$ continua en $R$. **Tesis:** la igualdad del enunciado.

**Demostración.** $g$ continua es integrable, y la constante $7$ también. Para cualquier partición de $R$ en celdas $\Delta V_i$ y puntos $P_i$:

$$\sum_i\big(g(P_i)+7\big)\Delta V_i=\sum_i g(P_i)\Delta V_i+7\sum_i\Delta V_i$$

Al tender a cero la norma, la primera suma de la derecha tiende a $\iiint_R g\,dV$ y $\sum\Delta V_i$ tiende a $\iiint_R dV=V$. Por álgebra de límites el primer miembro tiende a la suma. Es un caso de la linealidad: $\iiint(g+7)=\iiint g+7\iiint 1$.`,
      },
      {
        n: '2b', tema: 'm15', tipo: 'vf',
        enunciado: r`Defina jacobiano de una transformación $T$ de $\mathbb R^2$ en $\mathbb R^2$. Si $x=e^u\operatorname{sen}v$, $y=e^u\cos v$, ¿es cierto que $J\!\left(\frac{x,y}{u,v}\right)=-e^{2u}$?`,
        resolucion: r`Para $T(u,v)=(x(u,v),y(u,v))$ con derivadas continuas, el jacobiano es el determinante

$$J=\frac{\partial(x,y)}{\partial(u,v)}=\begin{vmatrix}x_u&x_v\\y_u&y_v\end{vmatrix}=x_uy_v-x_vy_u$$

Aquí: $x_u=e^u\operatorname{sen}v$, $x_v=e^u\cos v$, $y_u=e^u\cos v$, $y_v=-e^u\operatorname{sen}v$.

$$J=-e^{2u}\operatorname{sen}^2v-e^{2u}\cos^2v=-e^{2u}$$

**Verdadero.** En una integral se usa su valor absoluto, $|J|=e^{2u}$.`,
      },
      {
        n: '3a', tema: 'm22', tipo: 'practica',
        enunciado: r`$x(t)$ es la población de una especie, con $\frac{dx}{dt}=kx$ y $x(0)=5$. Demuestre que $x(t)=5e^{kt}$.`,
        resolucion: r`Variables separables: $\frac{dx}{x}=k\,dt\Rightarrow\ln|x|=kt+C_1\Rightarrow x=Ce^{kt}$ (solución general). Con $x(0)=5$: $C\,e^0=5$, entonces $C=5$ y $x(t)=5e^{kt}$.

Verificación: $x'=5ke^{kt}=k\,x$ y $x(0)=5$.`,
      },
      {
        n: '3b', tema: 'm23', tipo: 'teoria',
        enunciado: r`Defina trayectorias ortogonales y describa el procedimiento para determinarlas.`,
        resolucion: r`Dada una familia uniparamétrica de curvas $F(x,y,c)=0$, sus **trayectorias ortogonales** son otra familia cuyas curvas cortan a cada curva de la primera en ángulo recto.

1. Derivar $F(x,y,c)=0$ respecto de $x$ y eliminar $c$, para obtener la ecuación diferencial de la familia: $y'=f(x,y)$.
2. Cambiar la pendiente por su recíproca opuesta: $y'=-\dfrac{1}{f(x,y)}$ (pendientes perpendiculares: $m_1m_2=-1$).
3. Resolver esa nueva ecuación. Su solución general es la familia ortogonal.`,
      },
    ],
  },
  {
    id: '2024-12-20', fecha: '20 de diciembre de 2024',
    items: [
      {
        n: '1a', tema: 'm12', tipo: 'practica',
        enunciado: r`Dada $z=50-(x^2+y^2)$: i) ¿$f(0,0)=50$ es máximo absoluto? ¿Relativo? ii) Si se agrega la condición $x+3y-10=0$, ¿qué tipo de máximo se obtiene?`,
        resolucion: r`**i)** $f_x=-2x$, $f_y=-2y$: único punto crítico $(0,0)$. $f_{xx}=-2$, $f_{yy}=-2$, $f_{xy}=0$, $D=4>0$ con $f_{xx}<0$: **máximo relativo**. Además $x^2+y^2\ge0\Rightarrow f\le50$ en todo $\mathbb R^2$: también **absoluto**.

**ii)** Es un **máximo condicionado** (vinculado). Lagrange con $F=50-x^2-y^2+\lambda(x+3y-10)$:

$$-2x+\lambda=0,\quad -2y+3\lambda=0,\quad x+3y=10$$

$x=\lambda/2$, $y=3\lambda/2$, entonces $\frac{\lambda}{2}+\frac{9\lambda}{2}=10\Rightarrow\lambda=2$. Punto $(1,3)$, $f(1,3)=40$. Sobre la recta, $f$ es máxima donde $x^2+y^2$ es mínima (el punto de la recta más cercano al origen), así que $40$ es el máximo condicionado.`,
        lab: 'lagrange',
      },
      {
        n: '1b', tema: 'm12', tipo: 'teoria',
        enunciado: r`Desarrolle el método de los multiplicadores de Lagrange para los puntos críticos de $v=f(x,y,z)$ cuando las variables están vinculadas por $g_1(x,y,z)=0$ y $g_2(x,y,z)=0$.`,
        resolucion: r`Las dos ligaduras definen (si $\nabla g_1\times\nabla g_2\neq\vec0$) una curva, con vector tangente $\vec T=\nabla g_1\times\nabla g_2$. En un extremo condicionado la derivada de $f$ a lo largo de la curva se anula: $\nabla f\cdot\vec T=0$. Entonces $\nabla f$ es perpendicular a $\vec T$ y está en el plano generado por $\nabla g_1$ y $\nabla g_2$:

$$\nabla f+\lambda_1\nabla g_1+\lambda_2\nabla g_2=\vec0$$

Con la función de Lagrange $F=f+\lambda_1g_1+\lambda_2g_2$ se plantea el sistema de 5 ecuaciones y 5 incógnitas:

$$F_x=0,\quad F_y=0,\quad F_z=0,\quad g_1=0,\quad g_2=0$$

Sus soluciones $(x,y,z)$ son los puntos críticos condicionados.`,
      },
      {
        n: '2a', tema: 'm16', tipo: 'teoria',
        enunciado: r`Enuncie el teorema de integración con cambio de variables de $\mathbb R^3$ en $\mathbb R^3$.`,
        resolucion: r`Sea $T(u,v,w)=\big(x(u,v,w),y(u,v,w),z(u,v,w)\big)$ una transformación con derivadas parciales continuas, inyectiva en el interior de una región $S$ del espacio $uvw$, que lleva $S$ sobre la región $R$ del espacio $xyz$, y con jacobiano $J=\frac{\partial(x,y,z)}{\partial(u,v,w)}\neq0$ en el interior de $S$. Si $f$ es continua en $R$:

$$\iiint_R f(x,y,z)\,dx\,dy\,dz=\iiint_S f\big(x(u,v,w),y(u,v,w),z(u,v,w)\big)\,|J|\;du\,dv\,dw$$`,
      },
      {
        n: '2b', tema: 'm16', tipo: 'practica',
        enunciado: r`Dada $\iiint_R x^2\,dV$, con $R$ definida por $\frac{x^2}{4}+\frac{y^2}{9}=1$, $0\le z\le\frac{x^2}{4}+\frac{y^2}{9}$. ¿Se puede resolver en cartesianas? Si no, indique el cambio de variables, deduzca el jacobiano y deje planteada la integral iterada.`,
        resolucion: r`En cartesianas se puede plantear, pero los límites $y=\pm3\sqrt{1-x^2/4}$ dejan integrales muy engorrosas. Conviene adaptar las cilíndricas a la elipse:

$$x=2r\cos\theta,\quad y=3r\operatorname{sen}\theta,\quad z=z$$

Así $\frac{x^2}{4}+\frac{y^2}{9}=r^2$: el cilindro elíptico es $r=1$ y el techo es $z=r^2$.

$$J=\begin{vmatrix}2\cos\theta&-2r\operatorname{sen}\theta&0\\3\operatorname{sen}\theta&3r\cos\theta&0\\0&0&1\end{vmatrix}=6r\cos^2\theta+6r\operatorname{sen}^2\theta=6r$$

$$\iiint_R x^2\,dV=\int_0^{2\pi}\!\!\int_0^{1}\!\!\int_0^{r^2}4r^2\cos^2\theta\cdot6r\;dz\,dr\,d\theta$$

(Resolviendo: $\int_0^1 24r^5dr\cdot\int_0^{2\pi}\cos^2\theta\,d\theta=4\cdot\pi=4\pi$.)`,
      },
      {
        n: '3a', tema: 'm22', tipo: 'teoria',
        enunciado: r`Enuncie y demuestre los teoremas 1 y 2, de apoyo para demostrar la solución general de una ecuación diferencial con coeficientes homogéneos.`,
        resolucion: r`**Teorema 1.** Si $M(x,y)$ es homogénea de grado $n$, entonces $M(x,y)=x^n\,M\!\left(1,\frac yx\right)$.

*Demostración:* por definición $M(tx,ty)=t^nM(x,y)$ para todo $t$. Con $t=\frac1x$: $M\!\left(1,\frac yx\right)=\frac{1}{x^n}M(x,y)$, y se despeja.

**Teorema 2.** Si $M(x,y)$ es homogénea de grado $n$, entonces $M(x,y)=y^n\,M\!\left(\frac xy,1\right)$.

*Demostración:* igual, con $t=\frac1y$.

Consecuencia: $M(x,ux)=x^nM(1,u)$, que es lo que permite factorizar $x^n$ y separar variables con la sustitución $y=ux$ (o $x=uy$ usando el teorema 2).`,
      },
      {
        n: '3b', tema: 'm22', tipo: 'teoria',
        enunciado: r`Dada $M(x,y)\,dx+N(x,y)\,dy=0$ con coeficientes homogéneos de igual grado, demuestre que se transforma en una de variables separables con la sustitución $x=uy$.`,
        resolucion: r`Con $x=uy$: $dx=u\,dy+y\,du$. Por el teorema 2, $M(uy,y)=y^nM(u,1)$ y $N(uy,y)=y^nN(u,1)$:

$$y^n\big[M(u,1)(u\,dy+y\,du)+N(u,1)\,dy\big]=0$$

$$\big[uM(u,1)+N(u,1)\big]dy+y\,M(u,1)\,du=0$$

Dividiendo por $y\,[uM(u,1)+N(u,1)]$:

$$\frac{dy}{y}+\frac{M(u,1)}{uM(u,1)+N(u,1)}\,du=0$$

que es de variables separables.`,
      },
    ],
  },
  {
    id: '2025-02-21', fecha: '21 de febrero de 2025',
    items: [
      {
        n: '1a', tema: 'm11', tipo: 'vf',
        enunciado: r`Dada $u=x\,y\ln z$, indique dominio y rango. ¿Es cierto que es diferenciable en todo punto del espacio tridimensional?`,
        resolucion: r`**Dominio:** $\{(x,y,z)\in\mathbb R^3: z>0\}$, el semiespacio sobre el plano $xy$. **Rango:** todo $\mathbb R$ (con $x=y=1$, $\ln z$ toma cualquier valor real).

**Falso.** No puede ser diferenciable donde no está definida ($z\le0$). En su dominio sí lo es: $u_x=y\ln z$, $u_y=x\ln z$, $u_z=\frac{xy}{z}$ son continuas para $z>0$, y derivadas parciales continuas es condición suficiente de diferenciabilidad.`,
      },
      {
        n: '1b', tema: 'm10', tipo: 'teoria',
        enunciado: r`Enuncie un teorema y deduzca la ecuación de la recta tangente a la curva $C$ de $\mathbb R^3$ dada por la intersección de $z=f(x,y)$ y $G(x,y,z)=0$.`,
        resolucion: r`Se escribe la primera superficie como $F(x,y,z)=f(x,y)-z=0$. **Teorema:** si $F$ y $G$ son diferenciables en $P_0\in C$ y $\nabla F(P_0)\times\nabla G(P_0)\neq\vec0$, la curva tiene recta tangente en $P_0$ con dirección $\nabla F\times\nabla G$.

*Por qué:* $C$ está sobre las dos superficies, así que su tangente es perpendicular a las dos normales $\nabla F=(f_x,f_y,-1)$ y $\nabla G=(G_x,G_y,G_z)$. El vector perpendicular a ambas es su producto vectorial:

$$\vec d=\nabla F\times\nabla G=\begin{vmatrix}\vec i&\vec j&\vec k\\f_x&f_y&-1\\G_x&G_y&G_z\end{vmatrix}_{P_0}=(a,b,c)$$

$$\frac{x-x_0}{a}=\frac{y-y_0}{b}=\frac{z-z_0}{c}$$

El plano normal a $C$ en $P_0$ es $a(x-x_0)+b(y-y_0)+c(z-z_0)=0$.`,
      },
      {
        n: '2a', tema: 'm14', tipo: 'teoria',
        enunciado: r`Defina integrales iteradas para una función de tres variables independientes.`,
        resolucion: r`Si $Q=\{a\le x\le b,\;g_1(x)\le y\le g_2(x),\;h_1(x,y)\le z\le h_2(x,y)\}$ y $f$ es continua en $Q$:

$$\int_a^b\!\!\int_{g_1(x)}^{g_2(x)}\!\!\int_{h_1(x,y)}^{h_2(x,y)}f(x,y,z)\,dz\,dy\,dx$$

Se calcula de adentro hacia afuera: primero se integra en $z$ con $x$, $y$ fijos (queda una función de $x,y$); después en $y$ con $x$ fijo (queda una función de $x$); por último en $x$, obteniendo un número. Los límites de cada integral solo pueden depender de las variables que todavía no se integraron. Hay seis órdenes posibles.`,
      },
      {
        n: '2b', tema: 'm18', tipo: 'vf',
        enunciado: r`Indique una integral iterada para el volumen del sólido homogéneo limitado por $x^2+y^2=9$, encima de $z=0$ y debajo de $x+z=4$. Sabiendo que el volumen es $36\pi$, ¿es cierto que su masa es $K\cdot36\pi$?`,
        resolucion: r`En cilíndricas, el techo es $z=4-r\cos\theta$ (positivo, porque $|x|\le3<4$):

$$V=\int_0^{2\pi}\!\!\int_0^{3}\!\!\int_0^{4-r\cos\theta}r\,dz\,dr\,d\theta=\int_0^{2\pi}\!\!\int_0^3(4r-r^2\cos\theta)\,dr\,d\theta=4\cdot\frac92\cdot2\pi-0=36\pi$$

**Verdadero.** Homogéneo significa densidad constante $\delta=K$, así que $M=\iiint K\,dV=K\,V=36\pi K$.`,
      },
      {
        n: '3a', tema: 'm23', tipo: 'teoria',
        enunciado: r`Defina ecuación diferencial lineal de primer orden.`,
        resolucion: r`$y'+P(x)\,y=Q(x)$, con $P$ y $Q$ continuas en un intervalo. Lineal en $y$ y en $y'$. Se resuelve con el factor integrante $\mu=e^{\int P\,dx}$: $y=\frac1\mu\left[\int\mu\,Q\,dx+C\right]$.`,
      },
      {
        n: '3b', tema: 'm23', tipo: 'vf',
        enunciado: r`¿Es cierto que la curva que pasa por $(1,0)$ con pendiente $\frac{2y+x+1}{x}$ en cada punto es $y=x^2\left(x^{-1}-\frac12x^{-2}-\frac12\right)$? Justifique.`,
        resolucion: r`La condición es $y'=\frac{2y+x+1}{x}$, o sea $y'-\frac2xy=1+\frac1x$: **lineal**. Factor integrante $\mu=e^{-2\ln x}=x^{-2}$:

$$\left(\frac{y}{x^2}\right)'=x^{-2}+x^{-3}\Rightarrow\frac{y}{x^2}=-\frac1x-\frac{1}{2x^2}+C\Rightarrow y=Cx^2-x-\frac12$$

Con $(1,0)$: $C=\frac32$. La curva es $y=\frac32x^2-x-\frac12$.

La propuesta es $y=x-\frac12-\frac{x^2}{2}$. Pasa por $(1,0)$, pero $y'=1-x$, mientras que $\frac{2y+x+1}{x}=\frac{3x-x^2}{x}=3-x$. **Falso:** no cumple la ecuación.`,
      },
    ],
  },
  {
    id: '2025-03-10', fecha: '10 de marzo de 2025',
    items: [
      {
        n: '1a', tema: 'm05', tipo: 'teoria',
        enunciado: r`Dada $z=f(x,y)$ y $P_0(x_0,y_0)$ del dominio, desarrolle la interpretación geométrica de la derivada parcial $f_y(P_0)$.`,
        resolucion: r`El plano $x=x_0$ corta a la superficie $z=f(x,y)$ en la curva $C$: $\{x=x_0,\;z=f(x_0,y)\}$, que es la gráfica de una función de una sola variable $g(y)=f(x_0,y)$. Por definición

$$f_y(x_0,y_0)=\lim_{k\to0}\frac{f(x_0,y_0+k)-f(x_0,y_0)}{k}=g'(y_0)$$

Es la **pendiente de la recta tangente a $C$** en $P_0(x_0,y_0,f(x_0,y_0))$, medida dentro del plano $x=x_0$: $f_y(P_0)=\tan\beta$, con $\beta$ el ángulo que forma esa tangente con la dirección positiva del eje $y$. Mide cuánto sube la superficie por unidad de avance en $y$, con $x$ quieta.`,
        lab: 'corte-parcial',
      },
      {
        n: '1b', tema: 'm04', tipo: 'teoria',
        enunciado: r`Enuncie un teorema, establezca hipótesis y tesis, y demuestre que $\lim_{t\to a}[\vec u(t)\cdot\vec v(t)]=\lim_{t\to a}\vec u(t)\cdot\lim_{t\to a}\vec v(t)$, con $\vec u$ y $\vec v$ funciones vectoriales del plano con límite para $t\to a$.`,
        resolucion: r`**Hipótesis:** $\vec u(t)=(u_1(t),u_2(t))$ y $\vec v(t)=(v_1(t),v_2(t))$ con $\lim_{t\to a}\vec u=\vec A=(A_1,A_2)$ y $\lim_{t\to a}\vec v=\vec B=(B_1,B_2)$. **Tesis:** $\lim_{t\to a}\vec u\cdot\vec v=\vec A\cdot\vec B$.

**Demostración.** Una función vectorial tiene límite si y solo si cada componente lo tiene, y el límite es el vector de los límites: $u_i\to A_i$, $v_i\to B_i$. El producto escalar es una función real:

$$\vec u\cdot\vec v=u_1v_1+u_2v_2$$

Por las propiedades del límite de funciones reales (suma y producto):

$$\lim_{t\to a}(u_1v_1+u_2v_2)=A_1B_1+A_2B_2=\vec A\cdot\vec B$$`,
      },
      {
        n: '2a', tema: 'm16', tipo: 'teoria',
        enunciado: r`Defina transformación y jacobiano de una transformación de $\mathbb R^3$ en $\mathbb R^3$.`,
        resolucion: r`Una **transformación** $T:S\subset\mathbb R^3\to\mathbb R^3$ asigna a cada $(u,v,w)$ un punto $(x,y,z)=\big(x(u,v,w),y(u,v,w),z(u,v,w)\big)$. Si es inyectiva, cada punto de la imagen proviene de uno solo.

El **jacobiano** es el determinante de las derivadas parciales:

$$J=\frac{\partial(x,y,z)}{\partial(u,v,w)}=\begin{vmatrix}x_u&x_v&x_w\\y_u&y_v&y_w\\z_u&z_v&z_w\end{vmatrix}$$

$|J|$ mide en cuánto se agranda o achica el volumen localmente: $dV_{xyz}=|J|\,du\,dv\,dw$.`,
      },
      {
        n: '2b', tema: 'm16', tipo: 'practica',
        enunciado: r`Plantee una integral iterada para $\iiint_R dV$ con la transformación $x=u^2$, $y=v^2$, $z=w^2$, donde $R$ está acotada por $\sqrt x+\sqrt y+\sqrt z=1$ y los planos coordenados.`,
        resolucion: r`Con $u,v,w\ge0$: $\sqrt x=u$, $\sqrt y=v$, $\sqrt z=w$. La superficie pasa a ser el plano $u+v+w=1$ y los planos coordenados siguen siendo $u=0$, $v=0$, $w=0$: la región $S$ es un tetraedro.

$$J=\begin{vmatrix}2u&0&0\\0&2v&0\\0&0&2w\end{vmatrix}=8uvw$$

$$V=\int_0^1\!\!\int_0^{1-u}\!\!\int_0^{1-u-v}8uvw\;dw\,dv\,du$$

(Resolviendo, $V=\frac{1}{90}$.)`,
      },
      {
        n: '3a', tema: 'm22', tipo: 'teoria',
        enunciado: r`Defina función homogénea.`,
        resolucion: r`$f(x,y)$ es homogénea de grado $n$ si $f(tx,ty)=t^n f(x,y)$ para todo $t$ (en el dominio). Por ejemplo, $x^2-3xy$ es homogénea de grado 2 y $\frac{x}{y}$ de grado 0.`,
      },
      {
        n: '3b', tema: 'm22', tipo: 'teoria',
        enunciado: r`Enuncie y demuestre los dos teoremas que dan las propiedades de las funciones homogéneas necesarias para la solución general de la ecuación con coeficientes homogéneos.`,
        resolucion: r`**Teorema 1.** Si $M$ es homogénea de grado $n$, $M(x,y)=x^nM\!\left(1,\frac yx\right)$. Se demuestra tomando $t=\frac1x$ en $M(tx,ty)=t^nM(x,y)$.

**Teorema 2.** Si $M$ es homogénea de grado $n$, $M(x,y)=y^nM\!\left(\frac xy,1\right)$. Se toma $t=\frac1y$.

Con ellos, al sustituir $y=ux$ (o $x=uy$) se factoriza $x^n$ (o $y^n$) en ambos coeficientes y la ecuación queda de variables separables.`,
      },
    ],
  },
  {
    id: '2025-05', fecha: 'mayo de 2025 (manuscrito)',
    nota: 'Copiado a mano por un estudiante; algunas palabras no se leen del todo.',
    items: [
      {
        n: '1a', tema: 'm10', tipo: 'teoria',
        enunciado: r`Recta tangente cuando la curva está determinada por la intersección de la superficie $z=f(x,y)$ y el plano $y=y_0$.`,
        resolucion: r`La curva es $C:\{y=y_0,\;z=f(x,y_0)\}$, una curva plana dentro del plano $y=y_0$. Su pendiente en $P_0(x_0,y_0,z_0)$ es $f_x(x_0,y_0)$, así que la recta tangente es

$$\begin{cases}z-z_0=f_x(x_0,y_0)\,(x-x_0)\\ y=y_0\end{cases}\qquad\text{o bien}\qquad\frac{x-x_0}{1}=\frac{z-z_0}{f_x(x_0,y_0)},\;y=y_0$$

con vector director $(1,0,f_x(x_0,y_0))$. Es la interpretación geométrica de la derivada parcial respecto de $x$.`,
        lab: 'corte-parcial',
      },
      {
        n: '1b', tema: 'm08', tipo: 'teoria',
        enunciado: r`Dado el sistema $F_1(x,y,z,u,v)=0$, $F_2(x,y,z,u,v)=0$, establezca las condiciones de Cauchy y calcule las derivadas parciales de las funciones que define (por ejemplo, $u_x$).`,
        resolucion: r`**Condiciones de Cauchy** en $P_0=(x_0,y_0,z_0,u_0,v_0)$:

1. $F_1(P_0)=0$ y $F_2(P_0)=0$.
2. $F_1$, $F_2$ tienen derivadas parciales continuas en un entorno de $P_0$.
3. El jacobiano respecto de las variables dependientes no se anula: $\frac{\partial(F_1,F_2)}{\partial(u,v)}\Big|_{P_0}\neq0$.

Entonces el sistema define $u=u(x,y,z)$, $v=v(x,y,z)$ en un entorno, y derivando ambas ecuaciones respecto de $x$ y resolviendo por Cramer:

$$u_x=-\frac{\dfrac{\partial(F_1,F_2)}{\partial(x,v)}}{\dfrac{\partial(F_1,F_2)}{\partial(u,v)}},\qquad v_x=-\frac{\dfrac{\partial(F_1,F_2)}{\partial(u,x)}}{\dfrac{\partial(F_1,F_2)}{\partial(u,v)}}$$

Para $y$ o $z$ se reemplaza $x$ por esa variable en el numerador.`,
      },
      {
        n: '2a', tema: 'm15', tipo: 'teoria',
        enunciado: r`Enuncie el teorema de integración con cambio de variables de $\mathbb R^2$ en $\mathbb R^2$.`,
        resolucion: r`Sea $T(u,v)=(x(u,v),y(u,v))$ con derivadas parciales continuas, inyectiva en el interior de la región $S$ del plano $uv$, que transforma $S$ en $R$, y con $J=\frac{\partial(x,y)}{\partial(u,v)}\neq0$ en el interior de $S$. Si $f$ es continua en $R$:

$$\iint_R f(x,y)\,dx\,dy=\iint_S f\big(x(u,v),y(u,v)\big)\,|J|\,du\,dv$$`,
      },
      {
        n: '2b', tema: 'm15', tipo: 'practica',
        enunciado: r`$\iint_R\left(\frac{x^2}{4}+\frac{y^2}{9}\right)dA$ sobre la elipse $\frac{x^2}{4}+\frac{y^2}{9}\le1$. ¿Se puede resolver en cartesianas? Si no, ¿qué coordenadas usaría? Deduzca $J\!\left(\frac{x,y}{u,v}\right)$ y escriba la integral iterada.`,
        resolucion: r`En cartesianas los límites son $-3\sqrt{1-x^2/4}\le y\le3\sqrt{1-x^2/4}$: se puede, pero es muy laborioso. Conviene usar **polares elípticas**: $x=2r\cos\theta$, $y=3r\operatorname{sen}\theta$, con $0\le r\le1$, $0\le\theta\le2\pi$.

$$J=\begin{vmatrix}2\cos\theta&-2r\operatorname{sen}\theta\\3\operatorname{sen}\theta&3r\cos\theta\end{vmatrix}=6r$$

El integrando vale $r^2$:

$$\int_0^{2\pi}\!\!\int_0^1r^2\cdot6r\;dr\,d\theta=2\pi\cdot\frac64=3\pi$$`,
        lab: 'cambio-variables',
      },
      {
        n: '3a', tema: 'm23', tipo: 'teoria',
        enunciado: r`Defina familia de curvas y trayectorias ortogonales.`,
        resolucion: r`Una **familia uniparamétrica de curvas** es un conjunto de curvas $F(x,y,c)=0$ donde cada valor del parámetro $c$ da una curva (por ejemplo, $x^2+y^2=c$ son las circunferencias centradas en el origen). Sus **trayectorias ortogonales** son otra familia cuyas curvas cortan a cada una de la primera formando ángulo recto en los puntos de intersección.`,
        lab: 'trayectorias',
      },
      {
        n: '3b', tema: 'm23', tipo: 'teoria',
        enunciado: r`Describa el procedimiento para calcular trayectorias ortogonales.`,
        resolucion: r`1. Derivar la familia $F(x,y,c)=0$ y eliminar $c$: se obtiene $y'=f(x,y)$.
2. Reemplazar $y'$ por $-\frac{1}{y'}$: la familia ortogonal cumple $y'=-\frac{1}{f(x,y)}$.
3. Resolver la nueva ecuación diferencial.

Ejemplo: $x^2+y^2=c\Rightarrow y'=-\frac xy$. Ortogonales: $y'=\frac yx\Rightarrow y=kx$, las rectas por el origen.`,
      },
    ],
  },
  {
    id: 'xx-11-25', fecha: '25 de noviembre (año sin dato, manuscrito)',
    nota: 'Copiado a mano por un estudiante.',
    items: [
      {
        n: '1a', tema: 'm10', tipo: 'teoria',
        enunciado: r`Sabiendo que las superficies $z=g(x,y)$ y $z=h(x,y)$ se cortan ortogonalmente en $P_0(x_0,y_0,z_0)$, enuncie un teorema y demuestre que $g_x(P_0)h_x(P_0)+g_y(P_0)h_y(P_0)+1=0$.`,
        resolucion: r`**Teorema.** Dos superficies se cortan ortogonalmente en un punto común si sus vectores normales en ese punto son perpendiculares.

Se escriben como $G=g(x,y)-z=0$ y $H=h(x,y)-z=0$. Sus normales son

$$\vec n_1=\nabla G=(g_x,\,g_y,\,-1),\qquad\vec n_2=\nabla H=(h_x,\,h_y,\,-1)$$

Perpendiculares significa producto escalar nulo:

$$\vec n_1\cdot\vec n_2=g_xh_x+g_yh_y+(-1)(-1)=g_xh_x+g_yh_y+1=0$$

todo evaluado en $P_0$.`,
      },
      {
        n: '1b', tema: 'm11', tipo: 'vf',
        enunciado: r`Dada $f(x,y)=\frac{xy}{x^2+y^2}$ si $(x,y)\neq(0,0)$, $f(0,0)=0$: i) ¿Existe $f_y(0,0)$? En caso afirmativo, encuéntrela. ii) ¿$f$ es diferenciable en $(0,0)$?`,
        resolucion: r`**i) Sí.** $f(0,k)=0$ para todo $k$:

$$f_y(0,0)=\lim_{k\to0}\frac{f(0,k)-f(0,0)}{k}=\lim_{k\to0}\frac{0}{k}=0$$

**ii) Falso.** Por $y=mx$: $f(x,mx)=\frac{m}{1+m^2}$, que depende de $m$. El límite en el origen no existe, $f$ no es continua y entonces no es diferenciable (aunque tenga las dos derivadas parciales).`,
        lab: 'limite-caminos',
      },
      {
        n: '2a', tema: 'm21', tipo: 'teoria',
        enunciado: r`Defina mediante cuatro pasos la integral de superficie de $f(x,y,z)$ sobre una superficie $S$ de $\mathbb R^3$ cuya proyección es una región $R$ cerrada y acotada del plano $xy$.`,
        resolucion: r`Sea $S$: $z=g(x,y)$ sobre $R$, y $f$ definida sobre $S$.

1. **Partición:** se divide $R$ en $n$ rectángulos $\Delta A_i$; cada uno se levanta a un trozo $\Delta S_i$ de la superficie.
2. **Elección:** en cada $\Delta S_i$ se elige un punto $(x_i,y_i,z_i)$, con $z_i=g(x_i,y_i)$.
3. **Suma:** $\sum_{i=1}^nf(x_i,y_i,z_i)\,\Delta S_i$.
4. **Límite:** $\iint_Sf\,dS=\lim_{\|\Delta\|\to0}\sum f(x_i,y_i,z_i)\,\Delta S_i$.

Se evalúa con $\Delta S_i\approx\sqrt{1+g_x^2+g_y^2}\,\Delta A_i$:

$$\iint_Sf\,dS=\iint_Rf\big(x,y,g(x,y)\big)\sqrt{1+g_x^2+g_y^2}\;dA$$`,
      },
      {
        n: '2b', tema: 'm21', tipo: 'vf',
        enunciado: r`¿Es cierto que el área de la porción de $z=9-x^2-y^2$ acotada entre los planos $z=1$ y $z=5$ es $\pi\left(\sqrt{33^3}-\sqrt{17^3}\right)$? (Así se lee en la copia.)`,
        resolucion: r`$z=9-r^2$: con $z=5$, $r=2$; con $z=1$, $r=\sqrt8$. La proyección es el anillo $2\le r\le\sqrt8$. $\sqrt{1+z_x^2+z_y^2}=\sqrt{1+4r^2}$.

$$A=\int_0^{2\pi}\!\!\int_2^{\sqrt8}\sqrt{1+4r^2}\;r\,dr\,d\theta=2\pi\left[\frac{(1+4r^2)^{3/2}}{12}\right]_2^{\sqrt8}=\frac{\pi}{6}\left(33^{3/2}-17^{3/2}\right)\approx62{,}6$$

Tal como está escrito es **falso**: falta el factor $\frac16$. (Es probable que el original dijera $\frac\pi6$.)`,
        lab: 'integral-superficie',
      },
      {
        n: '3a', tema: 'm22', tipo: 'vf',
        enunciado: r`¿Es cierto que la relación $x^2+y^2-4=0$ es una solución implícita de $\frac{dy}{dx}=-\frac xy$ en el intervalo $-2<x<2$? Justifique.`,
        resolucion: r`**Verdadero.** Derivando implícitamente: $2x+2y\,y'=0\Rightarrow y'=-\frac xy$, que es la ecuación. Además, en $-2<x<2$ la relación define dos funciones derivables, $y=\sqrt{4-x^2}$ e $y=-\sqrt{4-x^2}$, con $y\neq0$ en todo el intervalo abierto, así que la ecuación tiene sentido en cada punto. Por ejemplo, con la rama positiva: $y'=\frac{-x}{\sqrt{4-x^2}}=-\frac xy$.`,
      },
      {
        n: '3b', tema: 'm22', tipo: 'teoria',
        enunciado: r`Dada $M(x,y)\,dx+N(x,y)\,dy=0$, deduzca el factor integrante $F(y)$. Indique las condiciones de existencia.`,
        resolucion: r`Se busca $F(y)$ tal que $FM\,dx+FN\,dy=0$ sea exacta:

$$\frac{\partial(FM)}{\partial y}=\frac{\partial(FN)}{\partial x}\;\Rightarrow\;F'(y)M+F\,M_y=F\,N_x$$

$$\frac{F'(y)}{F(y)}=\frac{N_x-M_y}{M}$$

**Condición de existencia:** el segundo miembro debe depender **solo de $y$**: $\frac{N_x-M_y}{M}=g(y)$. Entonces

$$F(y)=e^{\int g(y)\,dy}$$

(Análogamente existe $F(x)$ si $\frac{M_y-N_x}{N}$ depende solo de $x$.)`,
      },
    ],
  },
];

// Cuántas veces aparece cada módulo en los finales, de mayor a menor.
export function rankingTemas() {
  const cuenta = {};
  for (const f of FINALES) for (const it of f.items) cuenta[it.tema] = (cuenta[it.tema] || 0) + 1;
  return Object.entries(cuenta).map(([id, veces]) => ({ id, veces })).sort((a, b) => b.veces - a.veces || a.id.localeCompare(b.id));
}

export const itemsDeModulo = (id) => FINALES.flatMap((f) => f.items.filter((i) => i.tema === id).map((i) => ({ ...i, final: f })));

// Los finales tienen tres bloques: 1) derivación, 2) integración, 3) ecuaciones diferenciales.
export const bloqueDe = (tema) => (tema <= 'm12' ? 1 : tema <= 'm21' ? 2 : 3);

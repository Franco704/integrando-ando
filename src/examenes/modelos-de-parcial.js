// Temas del segundo parcial de la cátedra (archivo EXTRA/Segundo Parcial.pdf).
// Los temas 1, 2, 5 y 6 están resueltos; el resto enlaza con el módulo donde se estudia cada ejercicio.
const r = String.raw;
const it = (n, tema, enunciado, resolucion = null, lab = null) => ({ n: String(n), tema, tipo: 'practica', enunciado, resolucion, lab });

export const MODELOS_PARCIAL = [
  {
    id: 1, items: [
      it(1, 'm17', r`Hallar la masa y las coordenadas del centro de gravedad de la lámina limitada por $y=0$, $y=x$, $y=\sqrt{25-x^2}$, con densidad $\delta=k\sqrt{x^2+y^2}$.`,
        r`Es un sector circular de radio 5 entre $\theta=0$ y $\theta=\frac\pi4$. En polares $\delta=kr$:

$M=\int_0^{\pi/4}\!\int_0^5kr\cdot r\,dr\,d\theta=\frac{125\pi k}{12}$.

$M_y=\int_0^{\pi/4}\!\int_0^5r\cos\theta\cdot kr\cdot r\,dr\,d\theta=k\,\frac{625}{4}\cdot\frac{\sqrt2}{2}$ y $M_x=k\,\frac{625}4\left(1-\frac{\sqrt2}2\right)$.

$$\bar x=\frac{15\sqrt2}{2\pi}\approx3{,}38,\qquad\bar y=\frac{15(2-\sqrt2)}{2\pi}\approx1{,}40$$`, 'centro-masa'),
      it(2, 'm14', r`Use una integral triple para calcular el volumen del sólido limitado por $y=4-x^2$, $y=0$, $z=0$, $z-y=6$.`,
        r`Sombra en $xy$: bajo la parábola, $-2\le x\le2$, $0\le y\le4-x^2$. Techo $z=y+6$.

$V=\int_{-2}^2\!\int_0^{4-x^2}\!\int_0^{y+6}dz\,dy\,dx=\int_{-2}^2\left[\frac{(4-x^2)^2}2+6(4-x^2)\right]dx=\frac{256}{15}+64=\frac{1216}{15}\approx81{,}07$.`),
      it(3, 'm22', r`Dada $y\,dx=x\,dy$, probar que $F(x,y)=\frac{1}{xy}$ es un factor integrante.`,
        r`$\frac{y\,dx-x\,dy}{xy}=\frac{dx}{x}-\frac{dy}{y}=0$: $M=\frac1x$, $N=-\frac1y$, $M_y=0=N_x$. Es exacta, así que $F$ es factor integrante. Solución: $\ln|x|-\ln|y|=C$, o sea $y=kx$.`),
      it(4, 'm23', r`Solución general y particular de $y'+y-e^x=0$ con $y(0)=1$.`,
        r`$y'+y=e^x$, lineal. $\mu=e^x$: $(ye^x)'=e^{2x}\Rightarrow ye^x=\frac{e^{2x}}2+C\Rightarrow y=\frac{e^x}{2}+Ce^{-x}$. Con $y(0)=1$: $C=\frac12$, y $y=\frac{e^x+e^{-x}}2=\cosh x$.`),
    ],
  },
  {
    id: 2, items: [
      it(1, 'm17', r`Una lámina limitada por $3y=4x$, $y=0$, $x=3$ tiene densidad $\delta=kx$. Encuentre el centro de gravedad.`,
        r`$0\le x\le3$, $0\le y\le\frac{4x}3$. $M=\int_0^3kx\cdot\frac{4x}3dx=12k$; $M_y=\int_0^3kx^2\frac{4x}3dx=27k$; $M_x=\int_0^3kx\frac{1}{2}\left(\frac{4x}3\right)^2dx=18k$.

$\bar x=\frac{27}{12}=\frac94$, $\bar y=\frac{18}{12}=\frac32$.`, 'centro-masa'),
      it(2, 'm14', r`Use una integral triple para el volumen limitado por $x=y^2$, $4-x=y^2$, $z=0$, $z=3$.`,
        r`Las parábolas se cortan en $y^2=2$. Para $-\sqrt2\le y\le\sqrt2$, $y^2\le x\le4-y^2$; $0\le z\le3$.

$V=\int_{-\sqrt2}^{\sqrt2}\!\int_{y^2}^{4-y^2}\!\int_0^3dz\,dx\,dy=3\int_{-\sqrt2}^{\sqrt2}(4-2y^2)\,dy=3\cdot\frac{16\sqrt2}{3}=16\sqrt2$.`),
      it(3, 'm22', r`Dada $y\,dx=x\,dy$, probar que $F=\frac{1}{x^2+y^2}$ es un factor integrante.`,
        r`$\frac{y\,dx-x\,dy}{x^2+y^2}$: $M=\frac{y}{x^2+y^2}$, $N=\frac{-x}{x^2+y^2}$. $M_y=\frac{x^2-y^2}{(x^2+y^2)^2}=N_x$. Es exacta: es $d\left(\operatorname{arctg}\frac xy\right)$, y la solución vuelve a ser $y=kx$.`),
      it(4, 'm23', r`Solución general y particular de $y'+2xy=x$ con $y(0)=1$.`,
        r`$\mu=e^{x^2}$: $(ye^{x^2})'=xe^{x^2}\Rightarrow y=\frac12+Ce^{-x^2}$. Con $y(0)=1$: $y=\frac12+\frac12e^{-x^2}$.`),
    ],
  },
  { id: 3, items: [
    it(1, 'm17', r`Masa de una lámina circular de radio $R$ con densidad proporcional a la distancia al centro.`),
    it(2, 'm16', r`Con integrales triples, volumen limitado por $x^2+z^2=9$, $x^2+z^2=y^2$, $y\ge0$.`),
    it(3, 'm21', r`$\iint_S(x^2+y^2+z^2)\,dS$, con $S$ el hemisferio $z=\sqrt{4-x^2-y^2}$.`),
    it(4, 'm22', r`Resolver $2x(3x+y-ye^{-x^2})\,dx+(x^2+3y^2+e^{-x^2})\,dy=0$.`),
  ] },
  { id: 4, items: [
    it(1, 'm17', r`Lámina cuadrada de lado $a$ con densidad proporcional a la distancia a uno de sus vértices: momento de inercia respecto de un lado que pasa por ese vértice.`),
    it(2, 'm16', r`Volumen limitado por el plano $xy$ y las superficies $x^2+z^2=16$, $x^2+z^2=y$, $y=0$.`),
    it(3, 'm21', r`$\iint_Sz^2\,dS$, con $S$ el cono $z=\sqrt{x^2+y^2}$ sobre el rectángulo $0\le x\le2$, $-1\le y\le2$.`),
    it(4, 'm22', r`Resolver $\left(x-y\operatorname{tg}\frac yx\right)dx+x\operatorname{tg}\frac yx\,dy=0$.`),
  ] },
  {
    id: 5, items: [
      it(1, 'm13', r`Integral doble de $f(x,y)=x^3\cos(xy)$ sobre la región acotada por $y=x^2$, $y=0$, $x=2$.`,
        r`Conviene el orden $dy\,dx$: $\int_0^{x^2}x^3\cos(xy)\,dy=x^2\operatorname{sen}(xy)\Big|_0^{x^2}=x^2\operatorname{sen}(x^3)$.

$\int_0^2x^2\operatorname{sen}(x^3)\,dx=-\frac{\cos(x^3)}3\Big|_0^2=\frac{1-\cos8}{3}\approx0{,}382$.`, 'orden-integracion'),
      it(2, 'm20', r`Integral curvilínea de $f(x,y)=x+y$ sobre $\vec r(t)=4t\,\vec i+3t\,\vec j$, $0\le t\le3$.`,
        r`$|\vec r\,{}'|=5$. $\int_0^3(4t+3t)\cdot5\,dt=35\cdot\frac92=157{,}5$.`),
      it(3, 'm22', r`Resolver $(y^2-2xy+6x)\,dx-(x^2-2xy+2)\,dy=0$.`,
        r`$M_y=2y-2x=N_x$: exacta. $U=xy^2-x^2y+3x^2+g(y)$ con $g=-2y$. Solución: $xy^2-x^2y+3x^2-2y=C$.`),
    ],
  },
  {
    id: 6, items: [
      it(1, 'm13', r`Integral doble de $f(x,y)=4y^3$ sobre la región acotada por $y=x-6$, $y^2=x$.`,
        r`Tipo II (el otro orden obliga a partir la región): $-2\le y\le3$, $y^2\le x\le y+6$.

$\int_{-2}^3\!\int_{y^2}^{y+6}4y^3\,dx\,dy=4\int_{-2}^3(y^4+6y^3-y^5)\,dy=\frac{500}{3}$.`, 'orden-integracion'),
      it(2, 'm20', r`Integral curvilínea de $f=2+x$ sobre $\vec r(t)=t\,\vec i+\frac43t^{3/2}\,\vec j+\frac12t^2\,\vec k$, $0\le t\le2$.`),
      it(3, 'm23', r`Resolver $2y\,dx=(x^2-1)(dx-dy)$.`,
        r`$(x^2-1)\,dy=(x^2-1-2y)\,dx\Rightarrow y'+\frac{2}{x^2-1}y=1$: lineal. $\mu=e^{\int\frac{2}{x^2-1}dx}=\frac{x-1}{x+1}$.

$\left(y\frac{x-1}{x+1}\right)'=1-\frac{2}{x+1}\Rightarrow y=\frac{x+1}{x-1}\big(x-2\ln|x+1|+C\big)$.`),
    ],
  },
  { id: 7, items: [
    it(1, 'm15', r`Con $x=u$, $y=uv$, calcular $\iint_R\frac{\sqrt{x+y}}{x^2}\,dA$, $R$ el triángulo de vértices $(0,0)$, $(4,0)$, $(4,4)$.`),
    it(2, 'm18', r`Masa del sólido interior a una esfera de radio $2a$ y exterior al cilindro de radio $a$ cuyo eje es un diámetro de la esfera, con densidad proporcional al cuadrado de la distancia al centro.`),
    it(3, 'm21', r`$\iint_S\frac{xz}{y}\,dS$, con $S$ limitada por $y=x^2+z^2$, $4\le x^2+z^2\le16$.`),
    it(4, 'm22', r`Resolver $(x^2\cos x+y)\,dx-x\,dy=0$.`),
  ] },
  { id: 8, items: [
    it(1, 'm15', r`Con $x=\frac uv$, $y=v$, calcular $\iint_Ry\operatorname{sen}(xy)\,dA$, $R$ entre $xy=1$, $xy=4$, $y=1$, $y=4$.`),
    it(2, 'm18', r`Momento de inercia respecto de un diámetro de la bola $x^2+y^2+z^2\le R^2$ de masa $M$, con densidad proporcional a la distancia al centro.`),
    it(3, 'm21', r`$\iint_S\sqrt{x^2+y^2+z^2}\,dS$, con $S$: $y=\sqrt{x^2+z^2}$, $(x-1)^2+z^2\le1$.`),
    it(4, 'm22', r`Resolver $\operatorname{tg}y\,dx+(y-\operatorname{sen}x)\,dy=0$.`),
  ] },
  { id: 9, items: [
    it(1, 'm15', r`Con $u=\frac y2$, $v=x-2y$, calcular $\iint_R\left[\sqrt{x-2y}+\frac{y^2}4\right]dA$, $R$ el triángulo $(0,0)$, $(4,0)$, $(4,2)$.`),
    it(2, 'm18', r`Momento de inercia respecto del eje de simetría del sólido limitado por $y-x^2-z^2=0$ e $y=4$, con densidad proporcional a la distancia al eje.`),
    it(3, 'm21', r`$\iint_S\sqrt{y^2+z^2+1}\,dS$, $S$ la parte de $2x=y^2+z^2$ dentro de $y^2+z^2=2z$.`),
    it(4, 'm22', r`Resolver $(x^2y-1)\,dx+x^3\,dy=0$.`),
  ] },
  { id: 10, items: [
    it(1, 'm17', r`Masa y centro de masa de la lámina $y=0$, $y=x$, $y=\sqrt{25-x^2}$ con $\delta=k\sqrt{x^2+y^2}$ (igual al tema 1).`),
    it(2, 'm21', r`$\iint_Sz\,dS$, $S$ la superficie limitada por $x^2+y^2=1$, $z=0$ y la parte del plano $z=x+1$ sobre $x^2+y^2=1$.`),
    it(3, 'm23', r`Resolver $y'+y\operatorname{cotg}x=2\cos x$.`),
  ] },
  { id: 11, items: [
    it(1, 'm16', r`Por integrales triples, volumen limitado por $x^2+y^2+z^2=a^2$, $x^2=y^2+z^2$, que contiene a $(a,0,0)$.`),
    it(2, 'm21', r`$\iint_S(x^2+y^2+1)\,dS$, $S$ la parte de $z=\frac12x^2-\frac12y^2$ cortada por $x^2+y^2=1$.`),
    it(3, 'm20', r`Masa de un alambre $x=2\operatorname{sen}t$, $y=2\cos t$, $z=3t$, $0\le t\le2\pi$, con densidad proporcional a la distancia al plano $xy$.`),
    it(4, 'm23', r`Trayectorias ortogonales de $c=x^2+y^2$.`, r`Son las rectas por el origen, $y=kx$ (ver el módulo 23).`, 'trayectorias'),
  ] },
  { id: 12, items: [
    it(1, 'm16', r`Volumen limitado por $x=y^2+z^2$ y $x=5-4y^2-4z^2$.`),
    it(2, 'm21', r`$\iint_S\sqrt{1+4x^2+4y^2}\,dS$, $S$ la parte de $z=x^2+y^2$ cortada por $x^2+y^2=9$.`),
    it(3, 'm20', r`Masa de la hélice $x=t$, $y=\cos t$, $z=\operatorname{sen}t$, $0\le t\le2\pi$, con densidad proporcional al cuadrado de la distancia al origen.`),
    it(4, 'm23', r`Trayectorias ortogonales de $cy=x^2$.`, r`$y'=\frac{2y}x$; ortogonales $y'=-\frac x{2y}$: las elipses $\frac{x^2}2+y^2=k$.`, 'trayectorias'),
  ] },
  { id: 13, items: [
    it(1, 'm16', r`Volumen limitado por $x^2+y^2+z^2=2$, dentro de $x=z^2+y^2$.`),
    it(2, 'm21', r`$\iint_Sxyz\,dS$, $S$ la parte de $y^2=x^2+z^2$ cortada por $y=1$ e $y=2$.`),
    it(3, 'm20', r`Masa del alambre $x=2t$, $y=\cos t$, $z=\operatorname{sen}t$, $0\le t\le2\pi$, densidad proporcional al cuadrado de la distancia al origen.`),
    it(4, 'm23', r`Trayectorias ortogonales de $2cx=y^2$.`, r`$y'=\frac{y}{2x}$; ortogonales $y'=-\frac{2x}y$: $2x^2+y^2=k$.`, 'trayectorias'),
  ] },
  { id: 14, items: [
    it(1, 'm12', r`Demuestre que el rectángulo de área máxima con perímetro dado $p$ es un cuadrado.`),
    it(2, 'm17', r`Masa y centro de masa de la lámina $y=0$, $y=x$, $y=\sqrt{25-x^2}$ con $\delta=k\sqrt{x^2+y^2}$.`),
    it(3, 'm14', r`Volumen limitado por $x=y^2$, $4-x=y^2$, $z=-2$, $z=3$.`),
    it(4, 'm23', r`Trayectorias ortogonales de $y^2-x^2=c$.`, r`$y'=\frac xy$; ortogonales $y'=-\frac yx$: las hipérbolas $xy=k$.`, 'trayectorias'),
  ] },
  { id: 15, items: [
    it(1, 'm12', r`Área máxima de un triángulo rectángulo si el doble de la suma de sus catetos es 5.`),
    it(2, 'm17', r`Lámina $3y=4x$, $y=0$, $x=3$, densidad $\delta=kx$: masa y centro de masa.`),
    it(3, 'm14', r`Volumen limitado por $x=z^2$, $4-x=z^2$, $y=0$, $y=3$.`),
    it(4, 'm23', r`Trayectorias ortogonales de $y=\frac cx$.`, r`$y'=-\frac yx$; ortogonales $y'=\frac xy$: $y^2-x^2=k$.`, 'trayectorias'),
  ] },
  { id: 16, items: [
    it(1, 'm17', r`Por integrales dobles, volumen limitado por $x^2+y^2+z^2=25$, $y^2+z^2=1$, $x\ge0$.`),
    it(2, 'm21', r`Área de la parte del plano $x+2y+z=4$ dentro de $x^2+z^2=4$.`),
    it(3, 'm20', r`$\int_C2y\,dx+x\,dy+z^2\,dz$ sobre $\vec r(t)=2\cos t\,\vec i+2\operatorname{sen}t\,\vec j+2t\,\vec k$, $0\le t\le2\pi$.`),
    it(4, 'm23', r`Resolver $y\,dx-(x+6y^2)\,dy=0$.`),
  ] },
];

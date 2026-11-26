const r = String.raw;

export default {
  intro: r`Las mismas ideas del TP 17, ahora para **sólidos** con densidad volumétrica $\delta(x,y,z)$. Los momentos estáticos pasan a ser respecto de **planos** y los de inercia respecto de **ejes**. La dificultad está en plantear la región y elegir las coordenadas; las fórmulas son siempre "integrar densidad por algo".`,
  teoria: [
    {
      id: 'formulas', titulo: 'Volumen, masa y centro de masa',
      texto: r`$$V=\iiint_QdV,\qquad M=\iiint_Q\delta(x,y,z)\,dV$$

**Momentos estáticos respecto de los planos coordenados** (distancia con signo al plano):

$$M_{yz}=\iiint_Qx\,\delta\,dV,\qquad M_{xz}=\iiint_Qy\,\delta\,dV,\qquad M_{xy}=\iiint_Qz\,\delta\,dV$$

**Centro de masa:** $\bar x=\dfrac{M_{yz}}{M}$, $\bar y=\dfrac{M_{xz}}{M}$, $\bar z=\dfrac{M_{xy}}{M}$.

Si el sólido es **homogéneo** ($\delta=k$), $M=kV$ (final de febrero 2025: si $V=36\pi$, $M=36\pi k$).`,
    },
    {
      id: 'inercia', titulo: 'Momentos de inercia',
      texto: r`La distancia al cuadrado de $(x,y,z)$ al eje $x$ es $y^2+z^2$; al eje $y$, $x^2+z^2$; al eje $z$, $x^2+y^2$:

$$I_x=\iiint_Q(y^2+z^2)\,\delta\,dV,\quad I_y=\iiint_Q(x^2+z^2)\,\delta\,dV,\quad I_z=\iiint_Q(x^2+y^2)\,\delta\,dV$$

Respecto del origen: $I_0=\iiint_Q(x^2+y^2+z^2)\,\delta\,dV$.

**Deducción** (final de mayo 2024, eje $y$): se divide el sólido en cajitas de volumen $\Delta V_i$; cada una tiene masa $\approx\delta(P_i)\Delta V_i$ y está a distancia $\sqrt{x_i^2+z_i^2}$ del eje $y$; su momento es $(x_i^2+z_i^2)\delta(P_i)\Delta V_i$. Sumando y tomando el límite queda $I_y$.

**Densidades típicas:**
- proporcional a la distancia al origen: $\delta=k\sqrt{x^2+y^2+z^2}=k\rho$;
- a la distancia al eje $z$: $\delta=k\sqrt{x^2+y^2}=kr$;
- a la distancia al plano $xy$: $\delta=k|z|$.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 18, ej. 1 e',
      enunciado: r`Volumen limitado por $z=5x^2$, $z=3-x^2$, $y+z=4$, $y=0$.`,
      pasos: [
        r`Conviene proyectar sobre el plano $xz$: entre las dos parábolas, que se cortan en $5x^2=3-x^2\Rightarrow x=\pm\frac{1}{\sqrt2}$. La variable $y$ va de $0$ al plano $y=4-z$.`,
        r`$V=\int_{-1/\sqrt2}^{1/\sqrt2}\!\int_{5x^2}^{3-x^2}\!\int_0^{4-z}dy\,dz\,dx=\int\!\!\int(4-z)\,dz\,dx$.`,
        r`El integrando en $x$ queda $\frac{15}2-21x^2+12x^4$. Integrando de $-\frac{1}{\sqrt2}$ a $\frac1{\sqrt2}$: $\frac{2}{\sqrt2}\left(\frac{15}2-\frac{7}{2}+\frac{3}{5}\right)=\frac{23\sqrt2}{5}$.`,
      ],
      respuesta: r`$\frac{23\sqrt2}{5}\approx6{,}51$.`,
      lab: 'region-triple',
    },
    {
      fuente: 'TP 18, ej. 4',
      enunciado: r`Masa del sólido limitado por $y^2+z^2=2y$, $x=0$, $x^2=y^2+z^2$, con densidad proporcional a la distancia al eje $x$.`,
      pasos: [
        r`Todo tiene eje $x$: cilíndricas alrededor de $x$, $y=r\cos\theta$, $z=r\operatorname{sen}\theta$. El cilindro es $r=2\cos\theta$ ($-\frac\pi2\le\theta\le\frac\pi2$) y el cono $x=r$.`,
        r`$\delta=kr$. $M=\int_{-\pi/2}^{\pi/2}\!\int_0^{2\cos\theta}\!\int_0^rkr\cdot r\,dx\,dr\,d\theta=k\int\!\!\int r^3\,dr\,d\theta$.`,
        r`$=k\int_{-\pi/2}^{\pi/2}4\cos^4\theta\,d\theta=4k\cdot\frac{3\pi}8=\frac{3\pi k}2$.`,
      ],
    },
    {
      fuente: 'TP 18, ej. 5',
      enunciado: r`Masa del sólido $x^2+y^2+z^2\le10$, $z\ge2$, con densidad proporcional a la distancia al plano $xy$.`,
      pasos: [
        r`$\delta=kz$. Cilíndricas: $2\le z\le\sqrt{10-r^2}$; la sombra se obtiene con $z=2$: $r\le\sqrt6$.`,
        r`$M=k\int_0^{2\pi}\!\int_0^{\sqrt6}\frac{(10-r^2)-4}{2}\,r\,dr\,d\theta=k\pi\int_0^{\sqrt6}(6-r^2)r\,dr$.`,
        r`$=k\pi\left[3r^2-\frac{r^4}4\right]_0^{\sqrt6}=k\pi(18-9)=9\pi k$.`,
      ],
    },
    {
      fuente: 'TP 18, ej. 6',
      enunciado: r`Momento de inercia respecto del eje $z$ del sólido $x^2+y^2\le1$, $1\le z\le2$, con $\delta=(x^2+y^2)z^2$.`,
      pasos: [
        r`$I_z=\iiint(x^2+y^2)\delta\,dV=\int_0^{2\pi}\!\int_0^1\!\int_1^2r^2\cdot r^2z^2\cdot r\,dz\,dr\,d\theta$.`,
        r`$=2\pi\cdot\frac16\cdot\frac{8-1}3=\frac{7\pi}9$.`,
      ],
    },
    {
      fuente: 'TP 18, ej. 7 y final de julio 2024',
      enunciado: r`Masa del sólido limitado por $x^2+y^2+z^2=4$, $x^2+y^2+z^2=9$, $z^2=x^2+y^2$, con densidad proporcional a la distancia al origen.`,
      pasos: [
        r`Esféricas: $2\le\rho\le3$, $\delta=k\rho$, $dV=\rho^2\operatorname{sen}\varphi\,d\rho\,d\varphi\,d\theta$.`,
        r`El cono es $\varphi=\frac\pi4$. Si el sólido es la cáscara **dentro** del cono ($z\ge0$): $0\le\varphi\le\frac\pi4$. Si además lo limita el plano $z=0$ (como en el TP), es la parte **entre el cono y el plano**: $\frac\pi4\le\varphi\le\frac\pi2$.`,
        r`$\int_2^3k\rho^3d\rho=\frac{65k}{4}$. Dentro del cono: $M=2\pi\left(1-\frac{\sqrt2}2\right)\frac{65k}4$. Entre cono y plano: $M=2\pi\cdot\frac{\sqrt2}2\cdot\frac{65k}4=\frac{65\sqrt2\pi k}{4}$.`,
      ],
    },
  ],
  preguntas: [
    {
      id: 'm18-q1', p: r`$\bar z$ del centro de masa de un sólido es:`,
      opciones: [r`$\frac{1}{M}\iiint z\,\delta\,dV$`, r`$\frac1M\iiint(x+y)\,\delta\,dV$`, r`$\iiint z\,dV$`, r`$\frac1V\iiint\delta\,dV$`],
      ok: 0, por: r`$M_{xy}$, el momento respecto del plano $xy$, usa la distancia a ese plano, que es $z$.`,
    },
    {
      id: 'm18-q2', p: r`El momento de inercia respecto del eje $y$ usa el factor:`,
      opciones: [r`$y^2$`, r`$x^2+z^2$`, r`$x^2+y^2$`, r`$y^2+z^2$`],
      ok: 1, por: r`La distancia de $(x,y,z)$ al eje $y$ es $\sqrt{x^2+z^2}$.`,
    },
    {
      id: 'm18-q3', p: r`Densidad proporcional a la distancia al eje $z$, en cilíndricas:`,
      opciones: [r`$k\rho$`, r`$kr$`, r`$kz$`, r`$k\,r^2$`],
      ok: 1, por: r`$\sqrt{x^2+y^2}=r$.`,
    },
  ],
};

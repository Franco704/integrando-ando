const r = String.raw;

export default {
  intro: r`Las ecuaciones **lineales** de primer orden son las más importantes de la ingeniería (circuitos, mezclas, enfriamiento) y tienen un método que funciona siempre: el factor integrante. La de **Bernoulli** es una no lineal que se vuelve lineal con un cambio de variable. Y las **trayectorias ortogonales** son una aplicación geométrica que se toma en casi todos los finales.`,
  teoria: [
    {
      id: 'lineal', titulo: 'Ecuación lineal de primer orden',
      texto: r`$$\frac{dy}{dx}+P(x)\,y=Q(x)$$

con $P$ y $Q$ continuas. Es **homogénea** si $Q=0$ (y entonces también es separable).

**Deducción de la solución.** Se multiplica por $\mu(x)=e^{\int P\,dx}$. Como $\mu'=P\mu$, el primer miembro es la derivada de un producto:

$$\mu y'+\mu Py=(\mu y)'=\mu Q\;\Rightarrow\;\mu y=\int\mu Q\,dx+C$$

$$y=e^{-\int P\,dx}\left[\int Q\,e^{\int P\,dx}dx+C\right]$$

Antes de aplicar la fórmula hay que llevar la ecuación a la forma normal (coeficiente 1 en $y'$).

**¿Es exacta la lineal?** Escrita como $(Py-Q)\,dx+dy=0$: $M_y=P$, $N_x=0$. Solo es exacta si $P=0$; por eso hace falta el factor $\mu(x)$, que es justamente el factor integrante del TP 22 ($\frac{M_y-N_x}{N}=P(x)$).`,
    },
    {
      id: 'bernoulli', titulo: 'Ecuación de Bernoulli',
      texto: r`$$\frac{dy}{dx}+P(x)\,y=Q(x)\,y^n,\qquad n\neq0,1$$

Se divide por $y^n$: $y^{-n}y'+P\,y^{1-n}=Q$. Con $z=y^{1-n}$, $z'=(1-n)y^{-n}y'$, y queda **lineal en $z$**:

$$z'+(1-n)P(x)\,z=(1-n)\,Q(x)$$

Se resuelve con el factor integrante y se vuelve a $y=z^{1/(1-n)}$.

Si $n=0$ es lineal; si $n=1$ es lineal homogénea (separable): $y'+(P-Q)y=0$ (final de julio 2024).`,
    },
    {
      id: 'trayectorias', titulo: 'Familias de curvas y trayectorias ortogonales',
      texto: r`Una **familia uniparamétrica** de curvas es $F(x,y,c)=0$: una curva por cada valor de $c$. Sus **trayectorias ortogonales** son otra familia cuyas curvas cortan a cada una de la primera en ángulo recto.

**Procedimiento:**
1. Derivar $F(x,y,c)=0$ respecto de $x$ y **eliminar $c$** entre las dos ecuaciones: se obtiene la ecuación diferencial de la familia, $y'=f(x,y)$.
2. Reemplazar $y'$ por $-\frac1{y'}$ (pendientes perpendiculares: $m_1m_2=-1$): $y'=-\frac{1}{f(x,y)}$.
3. Resolver esa ecuación: su solución general es la familia ortogonal.

Ejemplo: $x^2+y^2=c\Rightarrow2x+2yy'=0\Rightarrow y'=-\frac xy$. Ortogonales: $y'=\frac yx\Rightarrow y=kx$.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 23, ej. 1 e (resuelto en clase)',
      enunciado: r`Solución general y particular de $(1+x^2)y'+2xy=3\sqrt x$, $y(0)=2$.`,
      pasos: [
        r`Forma normal: $y'+\frac{2x}{1+x^2}y=\frac{3\sqrt x}{1+x^2}$. $\mu=e^{\ln(1+x^2)}=1+x^2$.`,
        r`$\big[(1+x^2)y\big]'=3\sqrt x\Rightarrow(1+x^2)y=2x^{3/2}+C$.`,
        r`General: $y=\frac{2x^{3/2}+C}{1+x^2}$. Con $y(0)=2$: $C=2$.`,
      ],
      respuesta: r`$y=\frac{2x^{3/2}+2}{1+x^2}$.`,
    },
    {
      fuente: 'TP 23, ej. 2 b (resuelto en clase)',
      enunciado: r`Resuelva la ecuación de Bernoulli $xy'-y=y^2\ln x$.`,
      pasos: [
        r`$y'-\frac1xy=\frac{\ln x}{x}y^2$, con $n=2$. Se multiplica por $y^{-2}$ y se toma $z=y^{-1}$, $z'=-y^{-2}y'$.`,
        r`$z'+\frac1xz=-\frac{\ln x}{x}$, lineal. $\mu=x$: $(xz)'=-\ln x$.`,
        r`$xz=-(x\ln x-x)+C\Rightarrow z=1-\ln x+\frac Cx$.`,
      ],
      respuesta: r`$\frac1y=1-\ln x+\frac Cx$. (En la resolución de clase quedó $\ln x-1+Cx$ por un signo en el paso $-z'$; derivando se comprueba que la correcta es esta.)`,
    },
    {
      fuente: 'TP 23, ej. 4 (resuelto en clase)',
      enunciado: r`Un circuito RL cumple $L\frac{di}{dt}+Ri=V$ ($V$ constante, $i(0)=0$). Pruebe que $i(t)=\frac VR\left(1-e^{-Rt/L}\right)$.`,
      pasos: [
        r`$i'+\frac RLi=\frac VL$: lineal. $\mu=e^{Rt/L}$.`,
        r`$\left(ie^{Rt/L}\right)'=\frac VLe^{Rt/L}\Rightarrow ie^{Rt/L}=\frac VRe^{Rt/L}+C$.`,
        r`$i=\frac VR+Ce^{-Rt/L}$; con $i(0)=0$, $C=-\frac VR$.`,
      ],
    },
    {
      fuente: 'TP 23, ej. 8 (resuelto en clase)',
      enunciado: r`Un tanque cilíndrico de radio 8 dm y altura 10 dm se vacía por un orificio de radio 0,1 dm; el agua sale a $v=4{,}8\sqrt h$ dm/s. ¿Cuánto tarda en vaciarse?`,
      pasos: [
        r`Balance de volumen: $\pi\cdot8^2\frac{dh}{dt}=-\pi\cdot0{,}1^2\cdot4{,}8\sqrt h\Rightarrow\frac{dh}{dt}=-0{,}00075\sqrt h$.`,
        r`Separable: $h^{-1/2}dh=-0{,}00075\,dt\Rightarrow2\sqrt h=-0{,}00075\,t+2\sqrt{10}$.`,
        r`$h=0$ cuando $t=\frac{2\sqrt{10}}{0{,}00075}\approx8433$ s, unas 2 h 20 min.`,
      ],
    },
    {
      fuente: 'Final de febrero 2025',
      enunciado: r`¿Es $y=x^2\left(x^{-1}-\frac12x^{-2}-\frac12\right)$ la curva que pasa por $(1,0)$ con pendiente $\frac{2y+x+1}{x}$?`,
      pasos: [
        r`$y'-\frac2xy=1+\frac1x$. $\mu=x^{-2}$: $\left(\frac y{x^2}\right)'=x^{-2}+x^{-3}$.`,
        r`$\frac{y}{x^2}=-\frac1x-\frac1{2x^2}+C\Rightarrow y=Cx^2-x-\frac12$; con $(1,0)$: $C=\frac32$.`,
        r`La propuesta, $y=x-\frac12-\frac{x^2}2$, pasa por $(1,0)$ pero no cumple la ecuación. **Falso.**`,
      ],
      lab: 'campo-direcciones',
    },
    {
      fuente: '2° parcial, temas 12, 13 y 15',
      enunciado: r`Trayectorias ortogonales de: a) $cy=x^2$; b) $2cx=y^2$; c) $y=\frac cx$.`,
      pasos: [
        r`**a)** $c=\frac{x^2}{y}$ y $cy'=2x\Rightarrow y'=\frac{2y}{x}$. Ortogonales: $y'=-\frac{x}{2y}\Rightarrow2y\,dy=-x\,dx\Rightarrow\frac{x^2}2+y^2=k$ (elipses).`,
        r`**b)** $2c=2yy'$ y $2c=\frac{y^2}x\Rightarrow y'=\frac{y}{2x}$. Ortogonales: $y'=-\frac{2x}{y}\Rightarrow2x^2+y^2=k$.`,
        r`**c)** $xy=c\Rightarrow y'=-\frac yx$. Ortogonales: $y'=\frac xy\Rightarrow y^2-x^2=k$ (hipérbolas).`,
      ],
      lab: 'trayectorias',
    },
  ],
  preguntas: [
    {
      id: 'm23-q1', p: r`El factor integrante de $y'+P(x)y=Q(x)$ es:`,
      opciones: [r`$e^{\int Q\,dx}$`, r`$e^{\int P\,dx}$`, r`$e^{-\int P\,dx}$`, r`$\int P\,dx$`],
      ok: 1, por: r`Con $\mu=e^{\int P}$, $\mu'=P\mu$ y el primer miembro es $(\mu y)'$.`,
    },
    {
      id: 'm23-q2', p: r`En la ecuación de Bernoulli con exponente $n$, la sustitución es:`,
      opciones: [r`$z=y^n$`, r`$z=y^{1-n}$`, r`$z=y^{n-1}$`, r`$z=\frac yx$`],
      ok: 1, por: r`Con $z=y^{1-n}$ la ecuación queda lineal en $z$.`,
    },
    {
      id: 'm23-q3', p: r`Si la familia cumple $y'=f(x,y)$, sus trayectorias ortogonales cumplen:`,
      opciones: [r`$y'=f(x,y)$`, r`$y'=-f(x,y)$`, r`$y'=-\frac{1}{f(x,y)}$`, r`$y'=\frac{1}{f(x,y)}$`],
      ok: 2, por: r`Pendientes perpendiculares: $m_1m_2=-1$.`,
    },
    {
      id: 'm23-q4', p: r`Las trayectorias ortogonales de las circunferencias $x^2+y^2=c$ son:`,
      opciones: ['otras circunferencias', 'rectas por el origen', 'parábolas', 'hipérbolas'],
      ok: 1, por: r`$y'=-\frac xy\to y'=\frac yx\Rightarrow y=kx$: los radios.`,
    },
  ],
};

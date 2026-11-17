const r = String.raw;

export default {
  intro: r`Las derivadas parciales miden la pendiente en dos direcciones privilegiadas. La **derivada direccional** la mide en cualquier dirección, y el **gradiente** resume toda esa información en un solo vector: hacia dónde sube más rápido la función y cuánto.`,
  teoria: [
    {
      id: 'definicion', titulo: 'Derivada direccional',
      texto: r`Sea $\vec u=(\cos\alpha,\operatorname{sen}\alpha)$ un vector **unitario**. La derivada direccional de $f$ en $P_0$ en la dirección $\vec u$ es

$$D_{\vec u}f(x_0,y_0)=\lim_{\rho\to0}\frac{f(x_0+\rho\cos\alpha,\;y_0+\rho\operatorname{sen}\alpha)-f(x_0,y_0)}{\rho}$$

Para $n$ variables, $\vec u=(\cos\alpha_1,\dots,\cos\alpha_n)$ con los cosenos directores, y se avanza $\rho$ en esa dirección.

Casos particulares: con $\alpha=0$ se obtiene $f_x$; con $\alpha=\frac\pi2$, $f_y$.

**Interpretación geométrica.** El plano vertical que pasa por $P_0$ en la dirección $\vec u$ corta la superficie en una curva; $D_{\vec u}f$ es la pendiente de su recta tangente en $P_0$.

> Si te dan un vector que no es unitario (por ejemplo $\vec{PQ}$), **primero se normaliza**: $\vec u=\frac{\vec v}{|\vec v|}$.`,
    },
    {
      id: 'formula', titulo: 'Cálculo con el gradiente',
      texto: r`El **gradiente** de $f$ es el vector de sus derivadas parciales: $\nabla f=f_x\,\vec i+f_y\,\vec j\ (+f_z\,\vec k)$.

**Teorema.** Si $f$ es diferenciable en $P_0$:

$$D_{\vec u}f(P_0)=f_x(P_0)\cos\alpha+f_y(P_0)\operatorname{sen}\alpha=\nabla f(P_0)\cdot\vec u$$

**Demostración.** Se define $g(\rho)=f(x_0+\rho\cos\alpha,\;y_0+\rho\operatorname{sen}\alpha)$. Por definición $D_{\vec u}f(P_0)=g'(0)$. Por la regla de la cadena, con $x=x_0+\rho\cos\alpha$, $y=y_0+\rho\operatorname{sen}\alpha$: $g'(\rho)=f_x\cos\alpha+f_y\operatorname{sen}\alpha$. Evaluando en $\rho=0$ queda la tesis. Para tres variables es igual con tres cosenos directores.`,
    },
    {
      id: 'maxima', titulo: 'Direcciones de derivada máxima, mínima y nula',
      texto: r`Como $\vec u$ es unitario, $D_{\vec u}f=\nabla f\cdot\vec u=|\nabla f|\cos\theta$, donde $\theta$ es el ángulo entre $\nabla f$ y $\vec u$. Entonces:

- **Máxima** cuando $\theta=0$: la dirección de $\nabla f$. Valor máximo: $|\nabla f(P_0)|$.
- **Mínima** cuando $\theta=\pi$: la dirección de $-\nabla f$. Valor mínimo: $-|\nabla f(P_0)|$.
- **Nula** cuando $\theta=\pm\frac\pi2$: las direcciones perpendiculares al gradiente, que son las tangentes a la curva de nivel.

**El gradiente es normal a las curvas de nivel.** Si $\vec r(t)$ recorre la curva $f(x,y)=k$, derivando $f(\vec r(t))=k$ queda $\nabla f\cdot\vec r\,'(t)=0$. En tres variables, $\nabla f$ es normal a las superficies de nivel: es la base del TP 10.

> El alpinista del final de agosto 2024: para bajar por la máxima pendiente debe ir en la dirección $-\nabla f$, y desciende a razón $|\nabla f|$.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 9, ej. 1 b (resuelto en clase)',
      enunciado: r`Calcule por definición la derivada direccional de $z=\sqrt{x^2+1}-y$ con $\alpha=\frac{5\pi}3$ en $Q(0,0)$ y verifique con la fórmula.`,
      pasos: [
        r`$\cos\frac{5\pi}3=\frac12$ y $\operatorname{sen}\frac{5\pi}3=-\frac{\sqrt3}2$ (300° está en el cuarto cuadrante). Se avanza $\rho$: $x=\frac\rho2$, $y=-\frac{\sqrt3}2\rho$.`,
        r`$f\!\left(\frac\rho2,-\frac{\sqrt3}2\rho\right)=\sqrt{\frac{\rho^2}4+1}-\left(-\frac{\sqrt3}2\rho\right)=\sqrt{\frac{\rho^2}4+1}+\frac{\sqrt3}2\rho$, y $f(0,0)=1$.`,
        r`$D=\lim_{\rho\to0}\left[\frac{\sqrt{\rho^2/4+1}-1}{\rho}+\frac{\sqrt3}2\right]$. Racionalizando, el primer término es $\frac{\rho/4}{\sqrt{\rho^2/4+1}+1}\to0$. Queda $D=\frac{\sqrt3}2$.`,
        r`**Con la fórmula:** $f_x=\frac{x}{\sqrt{x^2+1}}\Rightarrow f_x(Q)=0$ y $f_y=-1$. $D=0\cdot\frac12+(-1)\left(-\frac{\sqrt3}2\right)=\frac{\sqrt3}2$. Coinciden.`,
      ],
      respuesta: r`$\frac{\sqrt3}{2}$. Ojo: en la resolución de clase sale $-\frac{\sqrt3}2$ porque se escribió $-y_0+\rho\operatorname{sen}\alpha$ en lugar de $-(y_0+\rho\operatorname{sen}\alpha)$. Moviéndose hacia $y$ negativo, $-y$ crece, así que la derivada es positiva.`,
    },
    {
      fuente: 'TP 9, ej. 3 b (resuelto en clase)',
      enunciado: r`$f(x,y,z)=x^2+y^2+z^2$ en $P(1,0,1)$, en la dirección de $\vec{PQ}$ con $Q(2,1,0)$.`,
      pasos: [
        r`$\vec{PQ}=Q-P=(1,1,-1)$, $|\vec{PQ}|=\sqrt3$: $\vec u=\left(\frac1{\sqrt3},\frac1{\sqrt3},-\frac1{\sqrt3}\right)$.`,
        r`$\nabla f=(2x,2y,2z)$; en $P$: $(2,0,2)$.`,
        r`$D_{\vec u}f=\frac{2+0-2}{\sqrt3}=0$. Por definición: el numerador queda $\frac{\rho^2}{1}\cdot1$, que dividido $\rho$ tiende a $0$.`,
      ],
      respuesta: r`$0$: $\vec u$ es tangente a la esfera $x^2+y^2+z^2=2$ en $P$.`,
    },
    {
      fuente: 'TP 9, ej. 9 (resuelto en clase)',
      enunciado: r`Pendiente de la tangente a la curva intersección de $z=x^2+y^2$ con el plano vertical que pasa por $P(2,1,0)$ y forma $60°$ con el plano $x=0$.`,
      pasos: [
        r`El plano forma $60°$ con el plano $yz$, así que su dirección horizontal forma $30°$ con el eje $x$: $\vec u=(\cos30°,\cos60°)=\left(\frac{\sqrt3}2,\frac12\right)$.`,
        r`$\nabla f(2,1)=(4,2)$.`,
        r`$D_{\vec u}f=4\cdot\frac{\sqrt3}{2}+2\cdot\frac12=2\sqrt3+1\approx4{,}46$.`,
      ],
      respuesta: r`$2\sqrt3+1$.`,
      lab: 'gradiente',
    },
    {
      fuente: 'TP 9, ej. 13 (resuelto en clase)',
      enunciado: r`Derivada direccional de $z=x^2-3xy$ en la dirección de la tangente a $y=x^2-x+2$ en $(1,2)$.`,
      pasos: [
        r`$\nabla z=(2x-3y,\,-3x)$; en $(1,2)$: $(-4,-3)$.`,
        r`Pendiente de la curva: $y'=2x-1=1$, así que $\alpha=45°$ y $\vec u=\left(\frac{\sqrt2}2,\frac{\sqrt2}2\right)$.`,
        r`$D=-4\frac{\sqrt2}2-3\frac{\sqrt2}2=-\frac{7\sqrt2}{2}$.`,
      ],
      respuesta: r`$-\frac{7\sqrt2}{2}\approx-4{,}95$.`,
    },
    {
      fuente: 'TP 9, ej. 17 b (resuelto en clase)',
      enunciado: r`Derivada direccional de $f=x^2z+y^3-9$ a lo largo de $x=-\cos t$, $y=e^{-t}$, $z=\operatorname{sen}(2t)-1$ en $t=0$.`,
      pasos: [
        r`Punto: $P_0=(-1,1,-1)$. $\nabla f=(2xz,\,3y^2,\,x^2)$; en $P_0$: $(2,3,1)$.`,
        r`Dirección: la tangente a la curva. $\vec r\,'(t)=(\operatorname{sen}t,-e^{-t},2\cos2t)$; en $t=0$: $(0,-1,2)$, de módulo $\sqrt5$.`,
        r`$D=(2,3,1)\cdot\frac{(0,-1,2)}{\sqrt5}=\frac{-3+2}{\sqrt5}=-\frac{1}{\sqrt5}$.`,
      ],
      respuesta: r`$-\frac{1}{\sqrt5}=-\frac{\sqrt5}{5}$.`,
    },
    {
      fuente: 'TP 9, ej. 18 (resuelto en clase)',
      enunciado: r`Halle un vector unitario $\vec u$ tal que la derivada direccional de $f=x^2y-6x+4y-1$ en $(2,-1)$ valga $-\frac{52}{\sqrt{20}}$. ¿Es único?`,
      pasos: [
        r`$\nabla f=(2xy-6,\,x^2+4)$; en $(2,-1)$: $(-10,8)$.`,
        r`Condiciones: $-10u_1+8u_2=-\frac{52}{\sqrt{20}}=-\frac{26}{\sqrt5}$ y $u_1^2+u_2^2=1$.`,
        r`Despejando $u_2$ y reemplazando sale la cuadrática $205u_1^2-130\sqrt5\,u_1+89=0$, con dos raíces.`,
        r`$\vec u_1=\left(\frac{89\sqrt5}{205},-\frac{22\sqrt5}{205}\right)$ y $\vec u_2=\left(\frac{\sqrt5}5,-\frac{2\sqrt5}5\right)$.`,
        r`**No es único:** $|\nabla f|=\sqrt{164}\approx12{,}8$ y el valor pedido ($\approx-11{,}6$) está entre $-|\nabla f|$ y $|\nabla f|$, así que hay dos ángulos simétricos respecto de $-\nabla f$.`,
      ],
    },
  ],
  preguntas: [
    {
      id: 'm09-q1', p: r`¿En qué dirección es máxima la derivada direccional de $f$ en $P_0$, y cuánto vale?`,
      opciones: [r`En la de $\nabla f$; vale $|\nabla f|$`, r`En la del eje $x$; vale $f_x$`, r`En la de $-\nabla f$; vale $|\nabla f|$`, r`Perpendicular a $\nabla f$; vale $0$`],
      ok: 0, por: r`$D_{\vec u}f=|\nabla f|\cos\theta$ es máxima con $\theta=0$.`,
    },
    {
      id: 'm09-q2', p: r`Para usar $D_{\vec u}f=\nabla f\cdot\vec u$ con la dirección del vector $(3,4)$, hay que tomar $\vec u=$`,
      opciones: [r`$(3,4)$`, r`$\left(\frac35,\frac45\right)$`, r`$(4,-3)$`, r`$\left(\frac34,1\right)$`],
      ok: 1, por: r`La fórmula pide $\vec u$ unitario: se divide por $|(3,4)|=5$.`,
    },
    {
      id: 'm09-q3', p: r`El gradiente de $f(x,y)$ en un punto es:`,
      opciones: ['tangente a la curva de nivel', 'perpendicular a la curva de nivel', 'paralelo al eje z', 'siempre unitario'],
      ok: 1, por: r`Derivando $f(\vec r(t))=k$ sobre la curva de nivel: $\nabla f\cdot\vec r\,'=0$.`,
    },
    {
      id: 'm09-q4', p: r`Si $\nabla f(P_0)=\vec0$, la derivada direccional en $P_0$ es:`,
      opciones: ['máxima en todas las direcciones', 'cero en todas las direcciones', 'no existe', 'igual a 1'],
      ok: 1, por: r`$\vec 0\cdot\vec u=0$ (si $f$ es diferenciable). Es la condición de punto crítico del TP 12.`,
    },
    {
      id: 'm09-q5', p: r`$\nabla f(P)=(4,2)$. ¿Cuál es la menor derivada direccional posible en $P$?`,
      opciones: [r`$0$`, r`$-6$`, r`$-2\sqrt5$`, r`$-4$`],
      ok: 2, por: r`$-|\nabla f|=-\sqrt{16+4}=-2\sqrt5$, en la dirección de $-\nabla f$.`,
    },
  ],
};

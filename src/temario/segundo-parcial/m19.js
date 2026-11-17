const r = String.raw;

export default {
  intro: r`Un **campo vectorial** asigna un vector a cada punto: la velocidad de un fluido, una fuerza, un campo eléctrico. El operador $\nabla$ produce tres herramientas para estudiarlos: el gradiente (de un campo escalar), la divergencia (cuánto brota) y el rotor (cuánto gira). Son el lenguaje de las integrales de línea y de superficie que siguen.`,
  teoria: [
    {
      id: 'campos', titulo: 'Campos escalares y vectoriales',
      texto: r`- **Campo escalar:** $f:D\subset\mathbb R^n\to\mathbb R$ (temperatura, presión, potencial).
- **Campo vectorial en el plano:** $\vec F(x,y)=P(x,y)\,\vec i+Q(x,y)\,\vec j$.
- **En el espacio:** $\vec F(x,y,z)=P\,\vec i+Q\,\vec j+R\,\vec k$.

Se representan dibujando flechas en algunos puntos. **Operador nabla:** $\nabla=\frac{\partial}{\partial x}\vec i+\frac{\partial}{\partial y}\vec j+\frac{\partial}{\partial z}\vec k$.`,
    },
    {
      id: 'operadores', titulo: 'Gradiente, divergencia y rotor',
      texto: r`**Gradiente** (de un campo escalar, da un campo vectorial): $\nabla f=(f_x,f_y,f_z)$.

**Divergencia** (de un campo vectorial, da un escalar):

$$\operatorname{div}\vec F=\nabla\cdot\vec F=\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}$$

Mide el flujo neto que sale por unidad de volumen: $>0$ fuente, $<0$ sumidero, $=0$ incompresible.

**Rotor** (de un campo vectorial, da un campo vectorial):

$$\operatorname{rot}\vec F=\nabla\times\vec F=\begin{vmatrix}\vec i&\vec j&\vec k\\\partial_x&\partial_y&\partial_z\\P&Q&R\end{vmatrix}=(R_y-Q_z)\,\vec i+(P_z-R_x)\,\vec j+(Q_x-P_y)\,\vec k$$

Mide la tendencia a hacer girar: una ruedita con paletas puesta en el campo gira alrededor de $\operatorname{rot}\vec F$. En el plano solo queda la componente $(Q_x-P_y)\,\vec k$.`,
    },
    {
      id: 'identidades', titulo: 'Identidades (invariantes de segundo orden)',
      texto: r`Con $f$, $\vec F$ de clase $C^2$:

1. $\operatorname{rot}(\nabla f)=\vec0$.
2. $\operatorname{div}(\operatorname{rot}\vec F)=0$.
3. $\operatorname{div}(\nabla f)=f_{xx}+f_{yy}+f_{zz}=\nabla^2f$ (laplaciano).
4. $\operatorname{div}(f\vec F)=f\operatorname{div}\vec F+\nabla f\cdot\vec F$.
5. $\operatorname{rot}(f\vec F)=f\operatorname{rot}\vec F+\nabla f\times\vec F$.

*Demostración de 1:* la componente $\vec i$ de $\operatorname{rot}\nabla f$ es $f_{zy}-f_{yz}=0$ por Schwarz; igual las otras.

*Demostración de 4:* $\frac{\partial(fP)}{\partial x}=f_xP+fP_x$; sumando las tres componentes queda $\nabla f\cdot\vec F+f\operatorname{div}\vec F$.`,
    },
    {
      id: 'conservativos', titulo: 'Campos conservativos',
      texto: r`$\vec F$ es **conservativo** si existe un campo escalar $f$ (potencial) con $\vec F=\nabla f$.

**Criterio.** Si $\vec F$ es de clase $C^1$ en una región simplemente conexa (sin agujeros), $\vec F$ es conservativo si y solo si $\operatorname{rot}\vec F=\vec0$. En el plano: $\frac{\partial P}{\partial y}=\frac{\partial Q}{\partial x}$.

**Cómo hallar el potencial:** integrar $P$ respecto de $x$ (la constante es una función $g(y,z)$), derivar respecto de $y$ e igualar a $Q$ para hallar $g$, y repetir con $z$.

**Cuadrático inverso:** $\vec F=\frac{k\,\vec r}{|\vec r|^3}$ (gravedad, Coulomb). Es conservativo, con potencial $-\frac{k}{|\vec r|}$, y $\operatorname{div}\vec F=0$ fuera del origen.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 19, ej. 3 g',
      enunciado: r`Gradiente de $f(x,y,z)=x\operatorname{sen}y\,e^{5z}$.`,
      pasos: [r`$\nabla f=\big(\operatorname{sen}y\,e^{5z},\ x\cos y\,e^{5z},\ 5x\operatorname{sen}y\,e^{5z}\big)$.`],
    },
    {
      fuente: 'TP 19, ej. 4',
      enunciado: r`Si $\nabla f=(\operatorname{sen}y,\ x\cos y+\operatorname{sen}z,\ y\cos z)$ y $f\left(0,2,\frac\pi2\right)=3$, pruebe que $f=x\operatorname{sen}y+y\operatorname{sen}z+1$.`,
      pasos: [
        r`$f_x=\operatorname{sen}y\Rightarrow f=x\operatorname{sen}y+g(y,z)$.`,
        r`$f_y=x\cos y+g_y=x\cos y+\operatorname{sen}z\Rightarrow g=y\operatorname{sen}z+h(z)$.`,
        r`$f_z=y\cos z+h'(z)=y\cos z\Rightarrow h=C$. Entonces $f=x\operatorname{sen}y+y\operatorname{sen}z+C$.`,
        r`$f\left(0,2,\frac\pi2\right)=0+2+C=3\Rightarrow C=1$.`,
      ],
    },
    {
      fuente: 'TP 19, ej. 5 e y g',
      enunciado: r`¿Son conservativos? e) $\vec F=e^y\,\vec i+xe^y\,\vec j+(z+1)e^z\,\vec k$; g) $\vec F=(2xy,\ x^2+z^2,\ 2xy)$. Si lo son, halle el potencial.`,
      pasos: [
        r`**e)** $\operatorname{rot}\vec F=(0-0)\,\vec i+(0-0)\,\vec j+(e^y-e^y)\,\vec k=\vec0$ en todo $\mathbb R^3$: conservativo.`,
        r`$f=\int e^ydx=xe^y+g(y,z)$; $f_y=xe^y+g_y=xe^y\Rightarrow g=g(z)$; $g'(z)=(z+1)e^z\Rightarrow g=ze^z$. Potencial: $f=xe^y+ze^z+C$.`,
        r`**g)** $R_y-Q_z=2x-2z$, que no es idénticamente nulo: **no** es conservativo.`,
      ],
    },
    {
      fuente: 'TP 19, ej. 6 d',
      enunciado: r`Rotor y divergencia de $\vec F=e^x\operatorname{sen}y\,\vec i+e^x\cos y\,\vec j+z\,\vec k$.`,
      pasos: [
        r`$\operatorname{div}\vec F=e^x\operatorname{sen}y-e^x\operatorname{sen}y+1=1$.`,
        r`$\operatorname{rot}\vec F=(0-0)\vec i+(0-0)\vec j+(e^x\cos y-e^x\cos y)\vec k=\vec0$. Es el gradiente de $e^x\operatorname{sen}y+\frac{z^2}2$.`,
      ],
      lab: 'campo-vectorial',
    },
    {
      fuente: 'TP 19, ej. 7 d y 8 c',
      enunciado: r`Demuestre: d) $\operatorname{div}(f\vec F)=f\operatorname{div}\vec F+\nabla f\cdot\vec F$; c) $\operatorname{rot}(f\vec F)=f\operatorname{rot}\vec F+\nabla f\times\vec F$.`,
      pasos: [
        r`**d)** $\operatorname{div}(f\vec F)=(fP)_x+(fQ)_y+(fR)_z=(f_xP+f_yQ+f_zR)+f(P_x+Q_y+R_z)$.`,
        r`**c)** Componente $\vec i$: $(fR)_y-(fQ)_z=f(R_y-Q_z)+(f_yR-f_zQ)$. El primer término es la componente $\vec i$ de $f\operatorname{rot}\vec F$ y el segundo la de $\nabla f\times\vec F$. Las otras dos componentes son análogas.`,
      ],
    },
    {
      fuente: 'TP 19, ej. 10',
      enunciado: r`Invente un campo $\vec F(x,y)$ cuya divergencia sea $x^2+y^2$.`,
      pasos: [
        r`Basta que $P_x+Q_y=x^2+y^2$. Con $P=\frac{x^3}3$, $Q=\frac{y^3}3$ funciona.`,
        r`Otra opción: $P=xy^2$, $Q=yx^2$. Hay infinitas: se puede sumar cualquier campo de divergencia nula.`,
      ],
    },
  ],
  preguntas: [
    {
      id: 'm19-q1', p: r`¿Cuál de estas expresiones **no** tiene sentido?`,
      opciones: [r`$\operatorname{div}(\nabla f)$`, r`$\operatorname{rot}(\nabla f)$`, r`$\nabla(\operatorname{div}\vec F)$`, r`$\operatorname{div}(\operatorname{div}\vec F)$`],
      ok: 3, por: r`$\operatorname{div}\vec F$ es un escalar, y la divergencia se aplica a campos vectoriales.`,
    },
    {
      id: 'm19-q2', p: r`En el plano, $\vec F=P\vec i+Q\vec j$ es conservativo (en una región simplemente conexa) si:`,
      opciones: [r`$P_x=Q_y$`, r`$P_y=Q_x$`, r`$P_x+Q_y=0$`, r`$P=Q$`],
      ok: 1, por: r`Es $\operatorname{rot}\vec F\cdot\vec k=Q_x-P_y=0$, que equivale a la igualdad de las derivadas cruzadas del potencial.`,
    },
    {
      id: 'm19-q3', p: r`$\operatorname{div}(\operatorname{rot}\vec F)$ vale:`,
      opciones: ['|F|', '0', 'rot F', '1'],
      ok: 1, por: r`Por Schwarz los términos se cancelan de a pares.`,
    },
    {
      id: 'm19-q4', p: r`Un campo con divergencia positiva en un punto se comporta ahí como:`,
      opciones: ['un sumidero', 'una fuente', 'un remolino', 'un campo constante'],
      ok: 1, por: r`Sale más de lo que entra: el flujo neto hacia afuera es positivo.`,
    },
  ],
};

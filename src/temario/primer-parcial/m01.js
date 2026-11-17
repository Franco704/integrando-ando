const r = String.raw;

export default {
  intro: r`Hasta Análisis I una función recibía un número y devolvía otro. Ahora recibe un **punto** del plano o del espacio. La gráfica deja de ser una curva y pasa a ser una superficie, y aparece una herramienta que vas a usar todo el año: las curvas de nivel.`,
  teoria: [
    {
      id: 'definicion', titulo: 'Función de varias variables',
      texto: r`Una **función de dos variables** es una regla que a cada par ordenado $(x,y)$ de un conjunto $D\subset\mathbb R^2$ le asigna un único número real $z=f(x,y)$. $x$ e $y$ son las **variables independientes** y $z$ la **dependiente**.

- **Dominio** $D$: el conjunto de pares donde la regla tiene sentido. Si no se aclara, es el mayor subconjunto de $\mathbb R^2$ donde la fórmula se puede calcular (dominio natural).
- **Rango** (o imagen): el conjunto de valores que efectivamente toma $z$.

La idea se generaliza: $w=f(x,y,z)$ es de tres variables, con dominio en $\mathbb R^3$, y $u=f(x_1,\dots,x_n)$ es de $n$ variables, con dominio en el espacio euclídeo $\mathbb R^n$, donde la distancia entre dos puntos es $d(P,Q)=\sqrt{\sum (x_i-y_i)^2}$.`,
    },
    {
      id: 'dominio', titulo: 'Cómo se halla el dominio',
      texto: r`Se anotan todas las restricciones de la fórmula y se toma la intersección:

- Denominador distinto de cero.
- Raíz de índice par: radicando $\ge0$. (La raíz cúbica no restringe.)
- Logaritmo: argumento $>0$.
- $\arcsen u$ y $\arccos u$: $-1\le u\le1$.
- $\operatorname{tg}u$: $u\neq\frac\pi2+k\pi$.

Después se **grafica**: cada restricción es una región del plano limitada por una curva. La frontera se dibuja con línea llena si pertenece al dominio ($\ge$) y punteada si no ($>$, $\neq$).

> Ejemplo: $f(x,y)=\frac{\ln(4-x^2-y^2/4)}{\sqrt{x^2+y^2-4}}$ pide $\frac{x^2}{4}+\frac{y^2}{16}<1$ (interior de una elipse) y $x^2+y^2>4$ (exterior de una circunferencia). El dominio es la "medialuna doble" entre las dos curvas, sin los bordes.`,
    },
    {
      id: 'grafica', titulo: 'La gráfica es una superficie',
      texto: r`La gráfica de $f(x,y)$ es el conjunto de puntos $(x,y,z)$ de $\mathbb R^3$ con $z=f(x,y)$: una **superficie** que está "arriba" (o abajo) del dominio. Las que más aparecen son cuádricas:

- $z=\sqrt{4-x^2-y^2}$: elevando al cuadrado, $x^2+y^2+z^2=4$ con $z\ge0$, la **semiesfera** superior de radio 2.
- $z=\sqrt{x^2+y^2}$: la hoja superior de un **cono**.
- $z=\frac{x^2}{4}+\frac{y^2}{9}$: **paraboloide elíptico**.
- $z=y^2-x^2$: **paraboloide hiperbólico** (silla de montar).

Una función de **tres** variables tendría su gráfica en $\mathbb R^4$, que no se puede dibujar. Para "verla" se usan sus **superficies de nivel** $f(x,y,z)=k$.`,
    },
    {
      id: 'niveles', titulo: 'Curvas y superficies de nivel',
      texto: r`La **curva de nivel** $k$ de $f(x,y)$ es el conjunto de puntos del dominio donde $f$ vale $k$: $\{(x,y): f(x,y)=k\}$. Se obtiene cortando la superficie con el plano horizontal $z=k$ y proyectando el corte sobre el plano $xy$.

Dibujar varias curvas de nivel con valores equiespaciados da un **mapa topográfico**: donde las curvas están juntas, la superficie sube rápido (mucha pendiente); donde están separadas, es casi plana. Este dibujo vuelve en el TP 9: el gradiente es siempre perpendicular a las curvas de nivel.

Para $w=f(x,y,z)$, las **superficies de nivel** $f(x,y,z)=k$ cumplen el mismo papel. Por ejemplo, las de $w=x^2+y^2+z^2$ son esferas concéntricas.`,
    },
  ],
  ejercicios: [
    {
      fuente: 'TP 1, ej. 1 vi',
      enunciado: r`Dé dominio y rango de $f(x,y)=\sqrt{x^2-y^2-1}$, diga qué superficie representa y grafique.`,
      pasos: [
        r`**Dominio.** Radicando $\ge0$: $x^2-y^2\ge1$. Es la región "exterior" a la hipérbola $x^2-y^2=1$ (la que contiene a los ejes $x$ lejanos), con la hipérbola incluida: $D=\{(x,y): x^2-y^2\ge1\}$.`,
        r`**Rango.** La raíz da valores $\ge0$, y sobre la hipérbola vale $0$; al alejarse crece sin cota. $\operatorname{Rg}=[0,+\infty)$.`,
        r`**Superficie.** $z=\sqrt{x^2-y^2-1}\Rightarrow z^2=x^2-y^2-1\Rightarrow x^2-y^2-z^2=1$, con $z\ge0$.`,
        r`Un término positivo y dos negativos igualados a $1$: es un **hiperboloide de dos hojas** con eje en el eje $x$. La función es la mitad superior ($z\ge0$) de cada hoja.`,
      ],
      respuesta: r`$D=\{x^2-y^2\ge1\}$, $\operatorname{Rg}=[0,\infty)$; mitad superior del hiperboloide de dos hojas $x^2-y^2-z^2=1$.`,
      lab: 'superficie',
    },
    {
      fuente: 'TP 1, ej. 2 c, d, j',
      enunciado: r`Determine dominio y rango: c) $f(x,y)=\cos(x-5y)$; d) $f(x,y)=\ln(4y-x)$; j) $f(x,y,z)=\frac{xy+zx}{yz}$.`,
      pasos: [
        r`**c)** El coseno acepta cualquier número: $D=\mathbb R^2$. Como $x-5y$ toma todos los valores reales, $\cos(x-5y)$ recorre $[-1,1]$: $\operatorname{Rg}=[-1,1]$.`,
        r`**d)** Argumento del logaritmo positivo: $4y-x>0\Leftrightarrow y>\frac x4$. Es el semiplano **sobre** la recta $y=\frac x4$, sin la recta (se dibuja punteada). Como $4y-x$ toma todos los valores positivos, $\ln$ toma todos los reales: $\operatorname{Rg}=\mathbb R$.`,
        r`**j)** Denominador no nulo: $yz\neq0\Leftrightarrow y\neq0$ y $z\neq0$. $D=\{(x,y,z)\in\mathbb R^3: y\neq0,\ z\neq0\}$: todo el espacio menos el plano $y=0$ (el plano $xz$) y el plano $z=0$ (el plano $xy$).`,
        r`Rango de j): $f=\frac{x(y+z)}{yz}$. Fijando $y=z=1$ queda $f=2x$, que toma cualquier real: $\operatorname{Rg}=\mathbb R$.`,
      ],
      respuesta: r`c) $\mathbb R^2$, $[-1,1]$; d) $y>x/4$, $\mathbb R$; j) $\mathbb R^3$ sin los planos $y=0$ y $z=0$, $\mathbb R$.`,
    },
    {
      fuente: 'TP 1, ej. 3 c',
      enunciado: r`Dada $f(x,y,z)=\sqrt[3]{x^2-y^2-z^2}$, calcule i) $f(1,1,-2)$; ii) $f(a+b,\,a-b,\,b-a)$.`,
      pasos: [
        r`**i)** $f(1,1,-2)=\sqrt[3]{1-1-4}=\sqrt[3]{-4}=-\sqrt[3]4$. La raíz cúbica de un negativo existe.`,
        r`**ii)** Se reemplaza cada variable por su expresión: $x^2-y^2-z^2=(a+b)^2-(a-b)^2-(b-a)^2$.`,
        r`$(a+b)^2-(a-b)^2=4ab$ y $(b-a)^2=a^2-2ab+b^2$. Entonces $4ab-a^2+2ab-b^2=6ab-a^2-b^2$.`,
      ],
      respuesta: r`i) $-\sqrt[3]{4}$; ii) $\sqrt[3]{6ab-a^2-b^2}$.`,
    },
    {
      fuente: 'TP 1, ej. 4 d',
      enunciado: r`¿Qué condiciones deben cumplir $x$ e $y$ para que $f(x,y)=\arcsen(2x-3y)$ verifique i) $f=0$; ii) $f=\frac\pi4$; iii) $f=-\frac\pi6$?`,
      pasos: [
        r`Primero el dominio: $-1\le2x-3y\le1$, una franja entre dos rectas paralelas.`,
        r`**i)** $\arcsen u=0\Leftrightarrow u=0$: $2x-3y=0$, la recta $y=\frac23x$ (pasa por el origen).`,
        r`**ii)** $\arcsen u=\frac\pi4\Leftrightarrow u=\operatorname{sen}\frac\pi4=\frac{\sqrt2}{2}$: la recta $2x-3y=\frac{\sqrt2}2$.`,
        r`**iii)** $u=\operatorname{sen}\left(-\frac\pi6\right)=-\frac12$: la recta $2x-3y=-\frac12$. Las tres son **curvas de nivel** de $f$: rectas paralelas dentro de la franja del dominio.`,
      ],
      respuesta: r`Rectas paralelas $2x-3y=0$, $2x-3y=\frac{\sqrt2}2$ y $2x-3y=-\frac12$.`,
    },
    {
      fuente: 'TP 1, ej. 5 c',
      enunciado: r`Halle dominio y rango de $f(x,y)=\begin{cases}\ln(xy)&\text{si }xy>0\ \wedge\ x<0\\ y+\cos x&\text{si }y\ge|x|\end{cases}$`,
      pasos: [
        r`Una función por partes está definida donde vale **alguna** de las condiciones: el dominio es la unión de las regiones.`,
        r`Primera rama: $x<0$ y $xy>0$ obligan a $y<0$: es el **tercer cuadrante** abierto.`,
        r`Segunda rama: $y\ge|x|$ es la región sobre la "V" formada por $y=x$ e $y=-x$, bordes incluidos. Está en $y\ge0$, así que no se superpone con la primera.`,
        r`Rango: en la primera rama $xy$ toma cualquier valor positivo, y $\ln(xy)$ cualquier real. Ya con eso el rango es todo $\mathbb R$.`,
      ],
      respuesta: r`$D=\{x<0,\,y<0\}\cup\{y\ge|x|\}$; $\operatorname{Rg}=\mathbb R$.`,
    },
    {
      fuente: 'TP 1, ej. 6 p',
      enunciado: r`Halle el dominio de $f(x,y,z)=\frac{\sqrt{9-x^2-y^2-z^2}}{\ln(xyz)}$.`,
      pasos: [
        r`Radicando: $x^2+y^2+z^2\le9$, la **bola cerrada** de radio 3 centrada en el origen.`,
        r`Logaritmo: $xyz>0$. Pasa en los octantes donde hay 0 o 2 coordenadas negativas: cuatro de los ocho octantes (el primero, y los que tienen exactamente dos signos menos).`,
        r`Denominador: $\ln(xyz)\neq0\Leftrightarrow xyz\neq1$. Se quita la superficie $xyz=1$.`,
      ],
      respuesta: r`$D=\{x^2+y^2+z^2\le9,\ xyz>0,\ xyz\neq1\}$.`,
    },
    {
      fuente: 'TP 1, Aplicación 4',
      enunciado: r`Un sólido rectangular del primer octante tiene un vértice en el origen, tres caras en los planos coordenados y el vértice opuesto $(x,y,z)$ en el plano $x+3y+2z=6$. I) Exprese el volumen en función de las dimensiones de la base y dé su dominio. II) ¿Cuál es el volumen si la base es un cuadrado de lado 1,25?`,
      pasos: [
        r`El volumen de la caja es $V=x\,y\,z$. La altura sale del plano: $z=\frac{6-x-3y}{2}$.`,
        r`$V(x,y)=\frac{xy\,(6-x-3y)}{2}$.`,
        r`Dominio físico: dimensiones positivas, $x>0$, $y>0$, y altura positiva, $6-x-3y>0$. Es el interior del triángulo de vértices $(0,0)$, $(6,0)$ y $(0,2)$.`,
        r`II) $V(1{,}25;\,1{,}25)=\frac{1{,}5625\,(6-1{,}25-3{,}75)}{2}=\frac{1{,}5625\cdot1}{2}=0{,}78125$.`,
      ],
      respuesta: r`$V=\frac{xy(6-x-3y)}2$, $D=\{x>0,\ y>0,\ x+3y<6\}$; $V\approx0{,}781$ unidades cúbicas.`,
    },
  ],
  preguntas: [
    {
      id: 'm01-q1', p: r`¿Cuál es el dominio de $f(x,y)=\ln(4y-x)$?`,
      opciones: [r`El semiplano $y>\frac x4$, sin la recta`, r`El semiplano $y\ge\frac x4$`, r`Todo $\mathbb R^2$ menos la recta $y=\frac x4$`, r`El semiplano $y<\frac x4$`],
      ok: 0, por: r`El logaritmo pide argumento **estrictamente** positivo: $4y-x>0$. La recta no entra (se dibuja punteada).`,
    },
    {
      id: 'm01-q2', p: r`La gráfica de una función de tres variables $w=f(x,y,z)$…`,
      opciones: ['es una superficie de R³', 'está en R⁴ y no se puede dibujar; se estudian sus superficies de nivel', 'es un sólido de R³', 'es una familia de curvas del plano'],
      ok: 1, por: r`Necesita tres coordenadas para el punto y una más para el valor: vive en $\mathbb R^4$. Por eso se usan las superficies de nivel $f(x,y,z)=k$, que sí están en $\mathbb R^3$.`,
    },
    {
      id: 'm01-q3', p: r`$f(x,y)=\sqrt{4-x^2-y^2}$ representa:`,
      opciones: ['Una esfera de radio 2', 'La semiesfera superior de radio 2', 'Un cono', 'Un paraboloide que abre hacia abajo'],
      ok: 1, por: r`$z^2=4-x^2-y^2\Rightarrow x^2+y^2+z^2=4$, pero la raíz obliga a $z\ge0$: solo la mitad de arriba. Una esfera completa no es gráfica de una función (a cada $(x,y)$ le corresponderían dos $z$).`,
    },
    {
      id: 'm01-q4', p: r`En un mapa de curvas de nivel equiespaciadas, una zona donde las curvas están muy juntas indica que…`,
      opciones: ['la función no está definida', 'la superficie es casi plana', 'la superficie tiene mucha pendiente', 'hay un máximo'],
      ok: 2, por: r`Para subir la misma diferencia de altura alcanza con moverse poco: la pendiente es grande. Lo vas a cuantificar con el gradiente (TP 9).`,
    },
    {
      id: 'm01-q5', p: r`¿Cuál es el rango de $f(x,y)=1-\operatorname{sen}(3xy)$?`,
      opciones: [r`$[-1,1]$`, r`$[0,2]$`, r`$[1,2]$`, r`$\mathbb R$`],
      ok: 1, por: r`$\operatorname{sen}(3xy)$ recorre $[-1,1]$ (porque $3xy$ toma cualquier real), así que $1-\operatorname{sen}(3xy)$ recorre $[0,2]$.`,
    },
    {
      id: 'm01-q6', p: r`Las curvas de nivel de $f(x,y)=x^2+y^2$ son:`,
      opciones: ['Rectas paralelas', 'Parábolas', 'Circunferencias concéntricas (y el origen para k = 0)', 'Hipérbolas'],
      ok: 2, por: r`$x^2+y^2=k$ es una circunferencia de radio $\sqrt k$ para $k>0$, el punto $(0,0)$ para $k=0$ y vacía para $k<0$.`,
    },
  ],
};

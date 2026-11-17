// Hoja de fórmulas por módulo: [nombre, LaTeX].
export const FORMULARIO = [
  { modulo: 'm00', formulas: [
    ['Plano por $P_0$ con normal $(A,B,C)$', String.raw`A(x-x_0)+B(y-y_0)+C(z-z_0)=0`],
    ['Recta simétrica', String.raw`\frac{x-x_0}{a}=\frac{y-y_0}{b}=\frac{z-z_0}{c}`],
    ['Distancia punto-plano', String.raw`d=\frac{|Ax_1+By_1+Cz_1+D|}{\sqrt{A^2+B^2+C^2}}`],
  ] },
  { modulo: 'm02', formulas: [
    ['Límite doble', String.raw`\forall\varepsilon>0\ \exists\delta>0:\ 0<\|P-P_0\|<\delta\Rightarrow|f(P)-L|<\varepsilon`],
    ['Sucesivos', String.raw`L_{12}=\lim_{x\to x_0}\lim_{y\to y_0}f,\quad L_{21}=\lim_{y\to y_0}\lim_{x\to x_0}f`],
    ['Polares en el origen', String.raw`x=r\cos\theta,\ y=r\operatorname{sen}\theta,\ |f-L|\le g(r)\to0`],
  ] },
  { modulo: 'm04', formulas: [
    ['Velocidad, rapidez, aceleración', String.raw`\vec v=\vec r\,{}',\quad|\vec v|,\quad\vec a=\vec r\,{}''`],
    ['Tangente y normal unitarios', String.raw`\vec T=\frac{\vec r\,{}'}{|\vec r\,{}'|},\quad\vec N=\frac{\vec T\,{}'}{|\vec T\,{}'|}`],
    ['Curvatura', String.raw`K=\frac{|\vec T\,{}'|}{|\vec r\,{}'|}=\frac{|x'y''-y'x''|}{(x'^2+y'^2)^{3/2}}`],
    ['Longitud de arco', String.raw`s=\int_a^b|\vec r\,{}'(t)|\,dt`],
  ] },
  { modulo: 'm05', formulas: [
    ['Derivada parcial', String.raw`f_x(x_0,y_0)=\lim_{h\to0}\frac{f(x_0+h,y_0)-f(x_0,y_0)}{h}`],
    ['Valor medio', String.raw`\Delta f=h\,f_x(x_0+\theta_1h,y_0+k)+k\,f_y(x_0,y_0+\theta_2k)`],
  ] },
  { modulo: 'm07', formulas: [
    ['Regla de la cadena', String.raw`\frac{\partial z}{\partial x}=\frac{\partial f}{\partial u}\frac{\partial u}{\partial x}+\frac{\partial f}{\partial v}\frac{\partial v}{\partial x}`],
    ['Euler (homogénea de grado k)', String.raw`x f_x+y f_y=k\,f`],
  ] },
  { modulo: 'm08', formulas: [
    ['Implícita en dos variables', String.raw`y'=-\frac{F_x}{F_y}`],
    ['Implícita en tres variables', String.raw`z_x=-\frac{F_x}{F_z},\quad z_y=-\frac{F_y}{F_z}`],
    ['Sistemas (Cramer)', String.raw`u_x=-\frac{\partial(F,G)/\partial(x,v)}{\partial(F,G)/\partial(u,v)}`],
  ] },
  { modulo: 'm09', formulas: [
    ['Derivada direccional', String.raw`D_{\vec u}f=\nabla f\cdot\vec u=f_x\cos\alpha+f_y\operatorname{sen}\alpha`],
    ['Máxima y mínima', String.raw`\max D_{\vec u}f=|\nabla f|,\qquad\min D_{\vec u}f=-|\nabla f|`],
  ] },
  { modulo: 'm10', formulas: [
    ['Plano tangente a $F=0$', String.raw`F_x(P_0)(x-x_0)+F_y(P_0)(y-y_0)+F_z(P_0)(z-z_0)=0`],
    ['Plano tangente a $z=f(x,y)$', String.raw`z-z_0=f_x(x-x_0)+f_y(y-y_0)`],
    ['Tangente a $F=0\cap G=0$', String.raw`\vec d=\nabla F\times\nabla G`],
    ['Ángulo entre superficies', String.raw`\cos\varphi=\frac{\nabla F\cdot\nabla G}{|\nabla F|\,|\nabla G|}`],
  ] },
  { modulo: 'm11', formulas: [
    ['Diferencial total', String.raw`dz=f_x\,dx+f_y\,dy`],
    ['Aproximación lineal', String.raw`f(x_0+\Delta x,y_0+\Delta y)\approx f(x_0,y_0)+dz`],
    ['Error relativo de un producto', String.raw`V=x^ay^b\Rightarrow\frac{dV}{V}=a\frac{dx}{x}+b\frac{dy}{y}`],
  ] },
  { modulo: 'm12', formulas: [
    ['Hessiano', String.raw`D=f_{xx}f_{yy}-f_{xy}^2`],
    ['Lagrange', String.raw`\nabla f+\lambda\nabla\varphi=\vec0,\quad\varphi=0`],
  ] },
  { modulo: 'm13', formulas: [
    ['Tipo I', String.raw`\int_a^b\!\!\int_{g_1(x)}^{g_2(x)}f\,dy\,dx`],
    ['Tipo II', String.raw`\int_c^d\!\!\int_{h_1(y)}^{h_2(y)}f\,dx\,dy`],
    ['Valor medio', String.raw`\bar f=\frac1A\iint_Rf\,dA`],
  ] },
  { modulo: 'm15', formulas: [
    ['Cambio de variables', String.raw`\iint_Rf\,dx\,dy=\iint_Sf(x(u,v),y(u,v))\left|\frac{\partial(x,y)}{\partial(u,v)}\right|du\,dv`],
    ['Polares', String.raw`dA=r\,dr\,d\theta`],
    ['Polares elípticas', String.raw`x=ar\cos\theta,\ y=br\operatorname{sen}\theta,\ J=ab\,r`],
  ] },
  { modulo: 'm16', formulas: [
    ['Cilíndricas', String.raw`dV=r\,dz\,dr\,d\theta`],
    ['Esféricas', String.raw`dV=\rho^2\operatorname{sen}\varphi\,d\rho\,d\varphi\,d\theta`],
  ] },
  { modulo: 'm17', formulas: [
    ['Masa y momentos (lámina)', String.raw`M=\iint\delta\,dA,\ M_x=\iint y\delta\,dA,\ M_y=\iint x\delta\,dA`],
    ['Centro de masa', String.raw`\bar x=\frac{M_y}{M},\quad\bar y=\frac{M_x}{M}`],
    ['Inercia', String.raw`I_x=\iint y^2\delta,\ I_y=\iint x^2\delta,\ I_0=I_x+I_y`],
  ] },
  { modulo: 'm18', formulas: [
    ['Momentos estáticos (sólido)', String.raw`M_{yz}=\iiint x\delta,\ M_{xz}=\iiint y\delta,\ M_{xy}=\iiint z\delta`],
    ['Inercia respecto de los ejes', String.raw`I_x=\iiint(y^2+z^2)\delta,\ I_y=\iiint(x^2+z^2)\delta,\ I_z=\iiint(x^2+y^2)\delta`],
  ] },
  { modulo: 'm19', formulas: [
    ['Divergencia', String.raw`\nabla\cdot\vec F=P_x+Q_y+R_z`],
    ['Rotor', String.raw`\nabla\times\vec F=(R_y-Q_z,\ P_z-R_x,\ Q_x-P_y)`],
    ['Conservativo (plano)', String.raw`P_y=Q_x`],
  ] },
  { modulo: 'm20', formulas: [
    ['Escalar', String.raw`\int_Cf\,ds=\int_a^bf(\vec r(t))\,|\vec r\,{}'(t)|\,dt`],
    ['Trabajo', String.raw`\int_C\vec F\cdot d\vec r=\int_a^b\vec F(\vec r(t))\cdot\vec r\,{}'(t)\,dt`],
    ['Teorema fundamental', String.raw`\int_C\nabla f\cdot d\vec r=f(B)-f(A)`],
    ['Green', String.raw`\oint_CP\,dx+Q\,dy=\iint_R(Q_x-P_y)\,dA`],
  ] },
  { modulo: 'm21', formulas: [
    ['Integral de superficie', String.raw`\iint_Sf\,dS=\iint_Rf(x,y,g)\sqrt{1+g_x^2+g_y^2}\,dA`],
    ['Paramétrica', String.raw`dS=|\vec r_u\times\vec r_v|\,du\,dv`],
    ['Gauss', String.raw`\oiint_S\vec F\cdot\vec n\,dS=\iiint_Q\nabla\cdot\vec F\,dV`],
  ] },
  { modulo: 'm22', formulas: [
    ['Exacta', String.raw`M_y=N_x\Rightarrow U(x,y)=C`],
    ['Factor integrante $F(x)$', String.raw`\frac{M_y-N_x}{N}=h(x)\Rightarrow F=e^{\int h\,dx}`],
    ['Factor integrante $F(y)$', String.raw`\frac{N_x-M_y}{M}=g(y)\Rightarrow F=e^{\int g\,dy}`],
    ['Homogénea', String.raw`y=ux,\ dy=u\,dx+x\,du`],
  ] },
  { modulo: 'm23', formulas: [
    ['Lineal', String.raw`y=e^{-\int P}\left[\int Q\,e^{\int P}dx+C\right]`],
    ['Bernoulli', String.raw`z=y^{1-n}:\ z'+(1-n)Pz=(1-n)Q`],
    ['Trayectorias ortogonales', String.raw`y'=f(x,y)\ \to\ y'=-\frac{1}{f(x,y)}`],
  ] },
];

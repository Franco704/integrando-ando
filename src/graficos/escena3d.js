import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { paleta } from './colores.js';

// Fachada sobre Three.js. Los laboratorios hablan en el idioma de la materia (superficie, plano tangente,
// prismas de Riemann) y nunca tocan Three directamente: si cambia el motor, cambia solo este archivo.
// Convención del pizarrón: el eje z apunta hacia arriba.
export class Escena3D {
  constructor(contenedor, { rango = 3, camara = [1.8, -2.4, 1.6], etiqueta = 'Escena 3D interactiva', ejes = true, piso = true } = {}) {
    this.c = paleta();
    this.rango = rango;
    this.envoltura = document.createElement('div');
    this.envoltura.className = 'escena3d';
    contenedor.append(this.envoltura);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    const lienzo = this.renderer.domElement;
    lienzo.setAttribute('role', 'img');
    lienzo.setAttribute('aria-label', etiqueta);
    this.envoltura.append(lienzo);

    this.escena = new THREE.Scene();
    this.camara = new THREE.PerspectiveCamera(40, 1, 0.05, 200);
    this.camara.up.set(0, 0, 1);
    this.camara.position.set(...camara.map((v) => v * rango));
    this.controles = new OrbitControls(this.camara, lienzo);
    this.controles.enableDamping = true;
    this.controles.dampingFactor = 0.12;
    this.controles.enablePan = false;
    this.controles.minDistance = rango * 0.8;
    this.controles.maxDistance = rango * 8;

    this.escena.add(new THREE.HemisphereLight(0xffffff, 0x445066, 1.6));
    const sol = new THREE.DirectionalLight(0xffffff, 1.6);
    sol.position.set(2, -3, 6);
    this.escena.add(sol);

    this.fijos = new THREE.Group();
    this.contenido = new THREE.Group();
    this.escena.add(this.fijos, this.contenido);
    if (piso) this.grillaPiso();
    if (ejes) this.ejes();

    this.sucio = true;
    this.controles.addEventListener('change', () => (this.sucio = true));
    this.obs = new ResizeObserver(() => this.ajustar());
    this.obs.observe(this.envoltura);
    // Solo renderiza si está en pantalla y algo cambió: cuida la batería del celular.
    this.visible = true;
    this.io = new IntersectionObserver(([e]) => (this.visible = e.isIntersecting));
    this.io.observe(this.envoltura);
    this.renderer.setAnimationLoop(() => {
      if (!this.visible) return;
      this.alCuadro?.();
      this.controles.update();
      if (this.sucio) {
        this.renderer.render(this.escena, this.camara);
        this.sucio = false;
      }
    });
  }

  ajustar() {
    const { width, height } = this.envoltura.getBoundingClientRect();
    if (!width || !height) return;
    this.renderer.setSize(width, height, false);
    this.camara.aspect = width / height;
    this.camara.updateProjectionMatrix();
    this.sucio = true;
  }

  marcar() { this.sucio = true; }

  color(token) { return new THREE.Color(this.c[token] || token); }

  grillaPiso() {
    const r = this.rango;
    const g = new THREE.GridHelper(2 * r, 12, this.color('cuadricula'), this.color('cuadricula'));
    g.rotation.x = Math.PI / 2;
    g.material.transparent = true;
    g.material.opacity = 0.7;
    this.fijos.add(g);
  }

  ejes() {
    const r = this.rango * 1.15;
    const tinta = this.color('tintaSuave');
    [[r, 0, 0, 'x'], [0, r, 0, 'y'], [0, 0, r, 'z']].forEach(([x, y, z, nombre]) => {
      const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-x * 0.15, -y * 0.15, -z * 0.15), new THREE.Vector3(x, y, z)]);
      this.fijos.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: tinta })));
      this.fijos.add(this.etiqueta(nombre, [x * 1.07, y * 1.07, z * 1.07], 'tintaSuave'));
    });
  }

  etiqueta(texto, [x, y, z], token = 'tinta', tam = 0.32) {
    const cv = document.createElement('canvas');
    const ctx = cv.getContext('2d');
    const fuente = '600 64px "Schibsted Grotesk", system-ui, sans-serif';
    ctx.font = fuente;
    cv.width = Math.ceil(ctx.measureText(texto).width) + 24;
    cv.height = 84;
    ctx.font = fuente;
    ctx.fillStyle = this.c[token] || token;
    ctx.textBaseline = 'middle';
    ctx.fillText(texto, 12, 44);
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }));
    sp.position.set(x, y, z);
    sp.scale.set((tam * this.rango * cv.width) / cv.height / 3, (tam * this.rango) / 3, 1);
    sp.renderOrder = 10;
    return sp;
  }

  // Superficie paramétrica S(u,v) -> [x,y,z]. La explícita z=f(x,y) es el caso S(u,v)=(u,v,f(u,v)).
  parametrizada(S, [u0, u1], [v0, v1], { n = 64, colores = ['superficie1', 'superficie2'], opacidad = 1, alambre = true, recortarZ = null } = {}) {
    const pos = [], col = [], idx = [];
    const ca = this.color(colores[0]), cb = this.color(colores[1]);
    let zmin = Infinity, zmax = -Infinity;
    const pts = [];
    for (let i = 0; i <= n; i++)
      for (let j = 0; j <= n; j++) {
        const p = S(u0 + ((u1 - u0) * i) / n, v0 + ((v1 - v0) * j) / n);
        const ok = p.every(Number.isFinite) && (!recortarZ || (p[2] >= recortarZ[0] && p[2] <= recortarZ[1]));
        pts.push(ok ? p : null);
        if (ok) { zmin = Math.min(zmin, p[2]); zmax = Math.max(zmax, p[2]); }
      }
    const k = (i, j) => i * (n + 1) + j;
    pts.forEach((p) => {
      const q = p || [0, 0, 0];
      pos.push(...q);
      const t = zmax > zmin ? (q[2] - zmin) / (zmax - zmin) : 0.5;
      const c = ca.clone().lerp(cb, t);
      col.push(c.r, c.g, c.b);
    });
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++) {
        const a = k(i, j), b = k(i + 1, j), c = k(i + 1, j + 1), d = k(i, j + 1);
        if (pts[a] && pts[b] && pts[c]) idx.push(a, b, c);
        if (pts[a] && pts[c] && pts[d]) idx.push(a, c, d);
      }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true, side: THREE.DoubleSide, roughness: 0.65, metalness: 0.05,
      transparent: opacidad < 1, opacity: opacidad, depthWrite: opacidad >= 1,
      polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1,
    });
    const grupo = new THREE.Group();
    grupo.add(new THREE.Mesh(geo, mat));
    if (alambre) {
      // Líneas de parámetro constante cada 8 celdas: dan lectura de la forma sin ensuciar.
      const seg = [];
      const paso = Math.max(1, Math.round(n / 8));
      for (let i = 0; i <= n; i += paso) for (let j = 0; j < n; j++) { const a = pts[k(i, j)], b = pts[k(i, j + 1)]; if (a && b) seg.push(...a, ...b); }
      for (let j = 0; j <= n; j += paso) for (let i = 0; i < n; i++) { const a = pts[k(i, j)], b = pts[k(i + 1, j)]; if (a && b) seg.push(...a, ...b); }
      const lg = new THREE.BufferGeometry();
      lg.setAttribute('position', new THREE.Float32BufferAttribute(seg, 3));
      grupo.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: this.color('tinta'), transparent: true, opacity: 0.18 })));
    }
    grupo.userData = { zmin, zmax };
    return this.agregar(grupo);
  }

  superficie(f, x = [-this.rango, this.rango], y = [-this.rango, this.rango], opciones = {}) {
    return this.parametrizada((u, v) => [u, v, f(u, v)], x, y, opciones);
  }

  // Curvas de nivel de f proyectadas en el plano z = altura (el "mapa topográfico").
  curvasDeNivel(f, valores, { x = [-this.rango, this.rango], y = [-this.rango, this.rango], altura = 0, n = 90, token = 'deriv', sobreSuperficie = false } = {}) {
    const seg = [];
    const dx = (x[1] - x[0]) / n, dy = (y[1] - y[0]) / n;
    const G = [];
    for (let i = 0; i <= n; i++) { G[i] = []; for (let j = 0; j <= n; j++) G[i][j] = f(x[0] + i * dx, y[0] + j * dy); }
    for (const c of valores)
      for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++) {
          const a = G[i][j] - c, b = G[i + 1][j] - c, d = G[i][j + 1] - c, e = G[i + 1][j + 1] - c;
          if (![a, b, d, e].every(Number.isFinite)) continue;
          const X = x[0] + i * dx, Y = y[0] + j * dy, z = sobreSuperficie ? c : altura;
          const cortes = [];
          if (a * b < 0) cortes.push([X + (dx * a) / (a - b), Y, z]);
          if (b * e < 0) cortes.push([X + dx, Y + (dy * b) / (b - e), z]);
          if (d * e < 0) cortes.push([X + (dx * d) / (d - e), Y + dy, z]);
          if (a * d < 0) cortes.push([X, Y + (dy * a) / (a - d), z]);
          for (let q = 0; q + 1 < cortes.length; q += 2) seg.push(...cortes[q], ...cortes[q + 1]);
        }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(seg, 3));
    return this.agregar(new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: this.color(token) })));
  }

  // Curva gruesa (tubo): r(t) -> [x,y,z]
  curva(r, t0, t1, { token = 'tinta', grosor = 0.025, n = 200 } = {}) {
    const pts = [];
    for (let k = 0; k <= n; k++) { const p = r(t0 + ((t1 - t0) * k) / n); if (p.every(Number.isFinite)) pts.push(new THREE.Vector3(...p)); }
    if (pts.length < 2) return null;
    const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), Math.min(400, n * 2), grosor * this.rango, 8, false);
    return this.agregar(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: this.color(token), roughness: 0.4 })));
  }

  segmento(a, b, { token = 'tinta', opacidad = 1 } = {}) {
    const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...a), new THREE.Vector3(...b)]);
    return this.agregar(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: this.color(token), transparent: opacidad < 1, opacity: opacidad })));
  }

  punto(p, { token = 'tinta', radio = 0.045 } = {}) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(radio * this.rango, 20, 14), new THREE.MeshStandardMaterial({ color: this.color(token) }));
    m.position.set(...p);
    return this.agregar(m);
  }

  // Flecha sólida (cilindro + cono): se ve en el celular, a diferencia de las líneas de 1 px.
  flecha(origen, v, { token = 'tinta', grosor = 0.014 } = {}) {
    const dir = new THREE.Vector3(...v);
    const largo = dir.length();
    if (largo < 1e-9) return null;
    const r = grosor * this.rango, cabeza = Math.min(largo * 0.35, 0.12 * this.rango);
    const mat = new THREE.MeshStandardMaterial({ color: this.color(token) });
    const g = new THREE.Group();
    const tallo = new THREE.Mesh(new THREE.CylinderGeometry(r, r, largo - cabeza, 10), mat);
    tallo.position.y = (largo - cabeza) / 2;
    const punta = new THREE.Mesh(new THREE.ConeGeometry(r * 2.8, cabeza, 14), mat);
    punta.position.y = largo - cabeza / 2;
    g.add(tallo, punta);
    g.position.set(...origen);
    g.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    return this.agregar(g);
  }

  // Cuadrado de lado `tam` centrado en p con normal n (plano tangente, plano de corte).
  plano(p, n, { tam = 2, token = 'deriv', opacidad = 0.35 } = {}) {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(tam, tam),
      new THREE.MeshStandardMaterial({ color: this.color(token), transparent: true, opacity: opacidad, side: THREE.DoubleSide, depthWrite: false }),
    );
    m.position.set(...p);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), new THREE.Vector3(...n).normalize());
    const borde = new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry), new THREE.LineBasicMaterial({ color: this.color(token) }));
    m.add(borde);
    return this.agregar(m);
  }

  // Cajas {x,y,z,dx,dy,dz}: prismas de Riemann (2D) o vóxeles (3D) en una sola llamada de dibujo.
  cajas(lista, { token = 'integ', opacidad = 0.9, colorPor = null } = {}) {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: opacidad < 1, opacity: opacidad, roughness: 0.55 });
    const im = new THREE.InstancedMesh(geo, mat, Math.max(1, lista.length));
    const m = new THREE.Matrix4(), base = this.color(token), color = new THREE.Color();
    lista.forEach((c, i) => {
      m.makeScale(c.dx * 0.94, c.dy * 0.94, Math.abs(c.dz) || 1e-4);
      m.setPosition(c.x + c.dx / 2, c.y + c.dy / 2, c.z + c.dz / 2);
      im.setMatrixAt(i, m);
      im.setColorAt(i, colorPor ? colorPor(c, color) : base);
    });
    im.count = lista.length;
    return this.agregar(im);
  }

  // Llama fn([x,y,z]) con el punto de `objeto` bajo el puntero (o null si no hay).
  alApuntar(objeto, fn) {
    const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
    ray.params.Line.threshold = 0.001; // apuntar a la malla, no a las líneas de ayuda
    const lienzo = this.renderer.domElement;
    const manejar = (e) => {
      const r = lienzo.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, this.camara);
      const [hit] = ray.intersectObject(objeto, true);
      fn(hit ? hit.point.toArray() : null);
    };
    lienzo.addEventListener('pointermove', manejar);
    return () => lienzo.removeEventListener('pointermove', manejar);
  }

  agregar(obj) {
    this.contenido.add(obj);
    this.sucio = true;
    return obj;
  }

  quitar(obj) {
    if (!obj) return;
    obj.parent?.remove(obj);
    liberar(obj);
    this.sucio = true;
  }

  limpiar() {
    [...this.contenido.children].forEach((o) => this.quitar(o));
  }

  destruir() {
    this.renderer.setAnimationLoop(null);
    this.obs.disconnect();
    this.io.disconnect();
    this.controles.dispose();
    liberar(this.escena);
    this.renderer.dispose();
    this.envoltura.remove();
  }
}

function liberar(obj) {
  obj.traverse?.((o) => {
    o.geometry?.dispose();
    [].concat(o.material || []).forEach((m) => { m.map?.dispose(); m.dispose(); });
  });
}

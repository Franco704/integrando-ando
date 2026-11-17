import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compilar, intentarCompilar } from '../src/matematica/expresion.js';
import * as C from '../src/matematica/calculo.js';

const cerca = (a, b, tol = 1e-4) => assert.ok(Math.abs(a - b) < tol, `${a} ≉ ${b}`);

test('parser: precedencia, potencia derecha, multiplicación implícita', () => {
  cerca(compilar('2+3*4')(), 14);
  cerca(compilar('2^3^2')(), 512);
  cerca(compilar('-x^2', ['x'])(3), -9);
  cerca(compilar('x^2y', ['x', 'y'])(2, 3), 12);
  cerca(compilar('2xy', ['x', 'y'])(2, 3), 12);
  cerca(compilar('sen(pi/2) + ln(e)')(), 2);
  cerca(compilar('sqrt(x^2+y^2)', ['x', 'y'])(3, 4), 5);
  cerca(compilar('(x+1)(x-1)', ['x'])(3), 8);
  cerca(compilar('x**2', ['x'])(4), 16);
});

test('parser: errores claros sin lanzar en intentarCompilar', () => {
  assert.match(intentarCompilar('2+', ['x']).error, /termina/);
  assert.match(intentarCompilar('foo(x)', ['x']).error, /no es una variable/);
  assert.match(intentarCompilar('(x+1', ['x']).error, /Falta/);
  assert.equal(intentarCompilar('alert(1)', ['x']).f, null);
});

test('derivadas: gradiente, hessiano, direccional', () => {
  const f = (x, y) => x * x * y + Math.sin(y);
  const [fx, fy] = C.gradiente(f, [1, 0]);
  cerca(fx, 0);
  cerca(fy, 2);
  cerca(C.direccional(f, [1, 0], [3, 4]), 1.6);
  assert.equal(C.clasificarCritico((x, y) => x * x + y * y, [0, 0]).tipo, 'mínimo relativo');
  assert.equal(C.clasificarCritico((x, y) => x * x - y * y, [0, 0]).tipo, 'punto de silla');
  assert.equal(C.clasificarCritico((x, y) => 50 - x * x - y * y, [0, 0]).tipo, 'máximo relativo');
});

test('integrales: simple, doble y triple', () => {
  cerca(C.simpson(Math.sin, 0, Math.PI), 2);
  // TP 13: ∫0^1∫x^2^x (x+y) dy dx = 3/20... verificado: ∫0^1 (x^2+x^2/2 - x^3 - x^4/2) dx = 1/3+1/6-1/4-1/10 = 3/20
  cerca(C.integralDoble((x, y) => x + y, 0, 1, (x) => x * x, (x) => x), 3 / 20);
  // Volumen de la esfera unitaria en el 1er octante = π/6
  cerca(
    C.integralTriple(() => 1, 0, 1, () => 0, (x) => Math.sqrt(1 - x * x), () => 0, (x, y) => Math.sqrt(Math.max(0, 1 - x * x - y * y)), 60),
    Math.PI / 6, 2e-3,
  );
  const { suma } = C.riemann2D((x, y) => x * y, { a: 0, b: 1, c: 0, d: 1 }, 40, 40);
  cerca(suma, 0.25);
});

test('EDO, integrales de línea, campos y jacobiano', () => {
  const pts = C.rk4((x, y) => y, 0, 1, 0.01, 100);
  cerca(pts.at(-1)[1], Math.E, 1e-6);
  // Final 2024-09: ∫ xy ds sobre el cuarto de circunferencia = 1/2
  cerca(C.integralLineaEscalar((x, y) => x * y, (t) => [Math.cos(t), Math.sin(t)], 0, Math.PI / 2), 0.5);
  // Trabajo de F = (-y, x) en la circunferencia unitaria = 2π
  cerca(C.integralLineaVectorial((x, y) => [-y, x], (t) => [Math.cos(t), Math.sin(t)], 0, 2 * Math.PI), 2 * Math.PI);
  cerca(C.divergencia([(x) => x, (x, y) => y, (x, y, z) => z], [1, 2, 3]), 3);
  cerca(C.rotor2D([(x, y) => -y, (x) => x], [0.3, 0.7]), 2);
  // Final 2024-12-06: x = e^u sen v, y = e^u cos v → J = −e^{2u}
  cerca(C.jacobiano2D((u, v) => Math.exp(u) * Math.sin(v), (u, v) => Math.exp(u) * Math.cos(v), 0.5, 1), -Math.exp(1), 1e-3);
});

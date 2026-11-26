import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MODULOS, cargarModulo, moduloPorId } from '../src/temario/indice.js';
import { LABORATORIOS, cargarLaboratorio } from '../src/laboratorios/indice.js';
import { FINALES } from '../src/examenes/finales.js';
import { MODELOS_PARCIAL } from '../src/examenes/modelos-de-parcial.js';
import { FORMULARIO } from '../src/estudio/formulario.js';

const modulos = await Promise.all(MODULOS.map((m) => cargarModulo(m.id)));

// Junta todos los textos con fórmulas para revisar que no quede un $ sin cerrar.
const textos = [];
const juntar = (donde, ...xs) => xs.flat().filter(Boolean).forEach((t) => textos.push([donde, t]));

test('cada módulo tiene teoría, ejercicios y preguntas bien formadas', () => {
  const ids = new Set();
  for (const m of modulos) {
    assert.ok(m.teoria?.length >= 2, `${m.id}: falta teoría`);
    assert.ok(m.ejercicios?.length >= 3, `${m.id}: faltan ejercicios`);
    assert.ok(m.preguntas?.length >= 3, `${m.id}: faltan preguntas`);
    for (const q of m.preguntas) {
      assert.ok(!ids.has(q.id), `pregunta repetida ${q.id}`);
      ids.add(q.id);
      assert.ok(q.ok >= 0 && q.ok < q.opciones.length, `${q.id}: respuesta fuera de rango`);
      juntar(q.id, q.p, q.opciones, q.por);
    }
    for (const e of m.ejercicios) {
      assert.ok(e.enunciado && (e.pasos?.length || e.respuesta), `${m.id}: ejercicio sin resolución`);
      if (e.lab) assert.ok(LABORATORIOS[e.lab], `${m.id}: laboratorio inexistente ${e.lab}`);
      juntar(`${m.id} ${e.fuente}`, e.enunciado, e.pasos, e.respuesta);
    }
    for (const l of m.labs) assert.ok(LABORATORIOS[l], `${m.id}: laboratorio inexistente ${l}`);
    juntar(m.id, m.intro, m.teoria.map((s) => s.texto));
  }
});

test('cada laboratorio exporta resumen y montar', async () => {
  for (const id of Object.keys(LABORATORIOS)) {
    const lab = await cargarLaboratorio(id);
    assert.equal(typeof lab.montar, 'function', `${id} sin montar`);
    assert.ok(lab.resumen, `${id} sin resumen`);
    juntar(`lab ${id}`, lab.resumen, lab.observa);
    assert.ok(MODULOS.some((m) => m.labs.includes(id)), `${id} no está en ningún módulo`);
  }
});

test('finales, modelos de parcial y fórmulas apuntan a módulos reales', () => {
  for (const f of FINALES)
    for (const it of f.items) {
      assert.ok(moduloPorId(it.tema), `${f.id} ${it.n}: tema ${it.tema}`);
      assert.ok(it.resolucion, `${f.id} ${it.n}: sin resolución`);
      if (it.lab) assert.ok(LABORATORIOS[it.lab]);
      juntar(`final ${f.id} ${it.n}`, it.enunciado, it.resolucion);
    }
  for (const t of MODELOS_PARCIAL)
    for (const it of t.items) {
      assert.ok(moduloPorId(it.tema), `tema ${t.id}.${it.n}`);
      juntar(`modelo ${t.id}.${it.n}`, it.enunciado, it.resolucion);
    }
  for (const g of FORMULARIO) {
    assert.ok(moduloPorId(g.modulo), g.modulo);
    juntar(`fórmulas ${g.modulo}`, g.formulas.map(([n]) => n));
  }
});

test('ningún texto deja una fórmula abierta', () => {
  for (const [donde, t] of textos) assert.equal((t.match(/\$/g) || []).length % 2, 0, `$ sin cerrar en ${donde}: ${t.slice(0, 80)}`);
});

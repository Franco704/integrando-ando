// Parser de expresiones matemáticas sin eval: lo que escribe el estudiante nunca se ejecuta como código.
// Gramática: suma -> producto (('+'|'-') producto)* ; producto -> unario (('*'|'/'|implícito) unario)* ;
// unario -> ('-'|'+') unario | potencia ; potencia -> atomo ('^' unario)?

const FUNCIONES = {
  sin: Math.sin, sen: Math.sin, cos: Math.cos, tan: Math.tan, tg: Math.tan,
  asin: Math.asin, acos: Math.acos, atan: Math.atan, arcsen: Math.asin, arccos: Math.acos, arctg: Math.atan,
  sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
  exp: Math.exp, ln: Math.log, log: Math.log10, sqrt: Math.sqrt, raiz: Math.sqrt,
  abs: Math.abs, sign: Math.sign, cot: (v) => 1 / Math.tan(v), cotg: (v) => 1 / Math.tan(v),
  sec: (v) => 1 / Math.cos(v), csc: (v) => 1 / Math.sin(v), cosec: (v) => 1 / Math.sin(v),
  atan2: Math.atan2, min: Math.min, max: Math.max,
};
const CONSTANTES = { pi: Math.PI, 'π': Math.PI, e: Math.E };

function tokenizar(texto) {
  const tokens = [];
  const re = /\s*(?:(\d+\.?\d*(?:e[+-]?\d+)?|\.\d+)|([a-zA-Zπθφρ_][a-zA-Z0-9_]*)|(\*\*|[-+*/^(),]))/y;
  let m;
  re.lastIndex = 0;
  while (re.lastIndex < texto.length) {
    const inicio = re.lastIndex;
    if (/^\s*$/.test(texto.slice(inicio))) break;
    m = re.exec(texto);
    if (!m) throw new SyntaxError(`No entiendo "${texto.slice(inicio).trim()[0]}" en la posición ${inicio + 1}`);
    if (m[1] !== undefined) tokens.push({ t: 'num', v: parseFloat(m[1]) });
    else if (m[2] !== undefined) tokens.push({ t: 'id', v: m[2] });
    else tokens.push({ t: 'op', v: m[3] === '**' ? '^' : m[3] });
  }
  return tokens;
}

// Separa "xy" en x*y cuando todas las letras son variables declaradas (así se escribe a mano).
function partirIdentificador(id, variables) {
  if (id in FUNCIONES || id in CONSTANTES || variables.includes(id)) return [id];
  const letras = [...id];
  if (letras.every((c) => variables.includes(c) || c in CONSTANTES)) return letras;
  throw new SyntaxError(`"${id}" no es una variable ni una función conocida`);
}

export function compilar(texto, variables = ['x', 'y']) {
  const crudos = tokenizar(String(texto));
  const tokens = [];
  for (const tk of crudos) {
    if (tk.t === 'id') for (const v of partirIdentificador(tk.v, variables)) tokens.push({ t: 'id', v });
    else tokens.push(tk);
  }
  let i = 0;
  const ver = () => tokens[i];
  const es = (v) => ver() && ver().t === 'op' && ver().v === v;
  const esperar = (v) => {
    if (!es(v)) throw new SyntaxError(`Falta "${v}"`);
    i++;
  };
  const empiezaAtomo = () => ver() && (ver().t !== 'op' || ver().v === '(');

  function suma() {
    let izq = producto();
    while (es('+') || es('-')) {
      const op = tokens[i++].v;
      const a = izq, b = producto();
      izq = op === '+' ? (s) => a(s) + b(s) : (s) => a(s) - b(s);
    }
    return izq;
  }
  function producto() {
    let izq = unario();
    for (;;) {
      if (es('*') || es('/')) {
        const op = tokens[i++].v;
        const a = izq, b = unario();
        izq = op === '*' ? (s) => a(s) * b(s) : (s) => a(s) / b(s);
      } else if (empiezaAtomo()) {
        const a = izq, b = potencia();
        izq = (s) => a(s) * b(s);
      } else return izq;
    }
  }
  function unario() {
    if (es('-')) { i++; const a = unario(); return (s) => -a(s); }
    if (es('+')) { i++; return unario(); }
    return potencia();
  }
  function potencia() {
    const base = atomo();
    if (es('^')) {
      i++;
      const exp = unario();
      return (s) => Math.pow(base(s), exp(s));
    }
    return base;
  }
  function atomo() {
    const tk = tokens[i++];
    if (!tk) throw new SyntaxError('La expresión termina antes de tiempo');
    if (tk.t === 'num') return () => tk.v;
    if (tk.t === 'op' && tk.v === '(') {
      const dentro = suma();
      esperar(')');
      return dentro;
    }
    if (tk.t === 'id') {
      if (tk.v in FUNCIONES && es('(')) {
        i++;
        const args = [suma()];
        while (es(',')) { i++; args.push(suma()); }
        esperar(')');
        const fn = FUNCIONES[tk.v];
        if (args.length === 1) { const a = args[0]; return (s) => fn(a(s)); }
        return (s) => fn(...args.map((a) => a(s)));
      }
      if (variables.includes(tk.v)) return (s) => s[tk.v];
      if (tk.v in CONSTANTES) return () => CONSTANTES[tk.v];
      throw new SyntaxError(`"${tk.v}" necesita paréntesis: ${tk.v}(…)`);
    }
    throw new SyntaxError(`Sobra "${tk.v}"`);
  }

  const raiz = suma();
  if (i < tokens.length) throw new SyntaxError(`Sobra "${tokens[i].v}"`);
  // Devuelve f(...valores) en el orden de `variables`.
  return (...valores) => {
    const s = {};
    for (let k = 0; k < variables.length; k++) s[variables[k]] = valores[k];
    return raiz(s);
  };
}

// Variante que no lanza: útil para campos de texto en vivo.
export function intentarCompilar(texto, variables) {
  try {
    return { f: compilar(texto, variables), error: null };
  } catch (e) {
    return { f: null, error: e.message };
  }
}

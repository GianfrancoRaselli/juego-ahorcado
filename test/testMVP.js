const assert = require("assert").strict;
const expect = require('chai').expect;
const Juego = require("../src/models/Juego");

let juego = null;
let palabraAAdivinar = "xyz";


beforeEach(() => {
  juego = new Juego();
  juego.definirPalabraAAdivinar("xyz");
});


describe("Configuraciones iniciales del juego", () => {
  it("validar correcta instanciacion (creacion) del juego", () => {
    assert.notEqual(null, juego);
  });

  it("validar guardado de palabra a adivinar", () => {
    assert.equal(palabraAAdivinar, juego.palabraAAdivinar);
  });
});

describe("Arriesgar una letra", () => {
  it("arriesgar letra que se encuentre en la palabra a adivinar", () => {
    const correcto = juego.arriesgarLetra('x');
    assert(correcto);
  });

  it("arriesgar letra que NO se encuentre en la palabra a adivinar", () => {
    const correcto = juego.arriesgarLetra('a');
    assert(!correcto);
  });
});

describe("Juego perdido", () => {
  it("validar juego perdido (supera errores maximos permitidos)", () => {
    juego.arriesgarLetra('a');
    juego.arriesgarLetra('b');
    juego.arriesgarLetra('c');
    juego.arriesgarLetra('d');
    juego.arriesgarLetra('e');
    juego.arriesgarLetra('f');
    juego.arriesgarLetra('g');

    assert(juego.perdido);
  });

  it("validar juego NO perdido (NO supera errores maximos permitidos)", () => {
    juego.arriesgarLetra('a');
    juego.arriesgarLetra('b');
    juego.arriesgarLetra('x');
    juego.arriesgarLetra('y');
    juego.arriesgarLetra('e');
    juego.arriesgarLetra('f');
    juego.arriesgarLetra('g');
    juego.arriesgarLetra('h');

    assert(!juego.perdido);
  });
});

describe("Juego ganado", () => {
  it("validar juego ganado (se completa la totalidad de letras de la palabra adivinar)", () => {
    juego.arriesgarLetra('x');
    juego.arriesgarLetra('y');
    juego.arriesgarLetra('z');

    assert(juego.ganado);
  });

  it("validar juego NO ganado (aun quedan letras NO adivinadas)", () => {
    juego.arriesgarLetra('x');
    juego.arriesgarLetra('y');

    assert(!juego.ganado);
  });
});

describe("Letras acertadas", () => {
  it("validar devolucion de letras acertadas hasta el momento", () => {
    juego.arriesgarLetra('y');

    expect(juego.letrasAcertadas).deep.to.equal([undefined, 'y', undefined]);
  });
});

describe("Juego terminado", () => {
  it("validar que una vez terminado el juego (ganado) no se pueda seguir jugando", () => {
    juego.arriesgarLetra('x');
    juego.arriesgarLetra('y');
    juego.arriesgarLetra('z');
    const letraAcertada = juego.arriesgarLetra('z');

    expect(letraAcertada).equal(undefined);
  });

  it("validar que una vez terminado el juego (perdido) no se pueda seguir jugando", () => {
    juego.arriesgarLetra('a');
    juego.arriesgarLetra('b');
    juego.arriesgarLetra('c');
    juego.arriesgarLetra('d');
    juego.arriesgarLetra('e');
    juego.arriesgarLetra('f');
    juego.arriesgarLetra('g');
    const letraAcertada = juego.arriesgarLetra('h');

    expect(letraAcertada).equal(undefined);
  });
});

describe("Arriesgar palabra", () => {
  it("validar juego ganado al arriesgar una palabra correcta", () => {
    const palabraAcertada = juego.arriesgarPalabra(palabraAAdivinar);

    expect(juego.letrasAcertadas).deep.to.equal(['x', 'y', 'z']);
    assert.notEqual(undefined, palabraAcertada);
    assert(juego.ganado);
  });

  it("validar juego perdido al arriesgar una palabra incorrecta", () => {
    const palabraAcertada = juego.arriesgarPalabra('xy');

    assert.notEqual(undefined, palabraAcertada);
    assert(juego.perdido);
  });
});

describe("Palabra a adivinar seteada", () => {
  it("validar que no se pueda cambiar la palabra a adivinar una vez definida", () => {
    const nuevaPalabra = 'nueva';
    juego.definirPalabraAAdivinar(nuevaPalabra);

    assert.notEqual(nuevaPalabra, juego.palabraAAdivinar);
    assert.equal(palabraAAdivinar, juego.palabraAAdivinar);
  });

  it("validar que no se pueda arriesgar una letra si la palabra a adivinar no fue definida", () => {
    const juego = new Juego();
    const letraAcertada = juego.arriesgarLetra('a');

    assert.equal(undefined, letraAcertada);
  });

  it("validar que no se pueda arriesgar una palabra si la palabra a adivinar no fue definida", () => {
    const juego = new Juego();
    const palabraAcertada = juego.arriesgarPalabra('a');

    assert.equal(undefined, palabraAcertada);
  });
});

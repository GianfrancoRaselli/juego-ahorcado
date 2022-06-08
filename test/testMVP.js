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
    assert.notEqual(juego, null);
  });

  it("validar guardado de palabra a adivinar", () => {
    assert.equal(juego.palabraAAdivinar, palabraAAdivinar);
  });
});

describe("Funciones auxiliares del juego", () => {
  it("validar ingreso de una letra que se encuentre en la palabra a adivinar", () => {
    const correcto = juego.validarLetraEnPalabraAAdivinar('x');
    assert(correcto);
  });

  it("validar ingreso de una letra que NO se encuentre en la palabra a adivinar", () => {
    const correcto = juego.validarLetraEnPalabraAAdivinar('a');
    assert(!correcto);
  });
  
  it("validar letra arriesgada repetida (ya ingresada previamente)", () => {
    juego.arriesgarLetra('a');

    const correcto = juego.validarLetraArriesgada('a');
    assert(correcto);
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
  it("validar que una vez terminado el juego (ganado o perdido) no se pueda seguir jugando", () => {
    juego.arriesgarLetra('x');
    juego.arriesgarLetra('y');
    juego.arriesgarLetra('z');
    const letraAcertada = juego.arriesgarLetra('z');

    expect(letraAcertada).equal(undefined);
  });
});

describe("Arriesgar palabra", () => {
  it("validar juego ganado al arriesgar una palabra correcta", () => {
    juego.arriesgarPalabra(palabraAAdivinar);

    assert(juego.ganado);
  });

  it("validar juego perdido al arriesgar una palabra incorrecta", () => {
    juego.arriesgarPalabra('xy');

    assert(juego.perdido);
  });
});

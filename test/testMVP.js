const assert = require("assert").strict;
const expect = require('chai').expect;
const Juego = require("../src/models/Juego");

let juego = null;
let palabraAAdivinar = "XYZ";


beforeEach(() => {
  juego = new Juego();
  juego.definirPalabraAAdivinar(palabraAAdivinar);
});


describe("Configuraciones iniciales del juego", () => {
  it("validar correcta instanciacion (creacion) del juego", () => {
    assert.notEqual(juego, null);
  });

  it("validar guardado de palabra a adivinar", () => {
    assert.equal(juego.palabraAAdivinar, palabraAAdivinar);
  });
});

describe("Arriesgar una letra", () => {
  it("arriesgar letra que se encuentre en la palabra a adivinar", () => {
    const correcto = juego.arriesgarLetra('X');
    assert(correcto);
  });

  it("arriesgar letra que NO se encuentre en la palabra a adivinar", () => {
    const correcto = juego.arriesgarLetra('A');
    assert(!correcto);
  });
});

describe("Juego perdido", () => {
  it("validar juego perdido (supera errores maximos permitidos)", () => {
    juego.arriesgarLetra('A');
    juego.arriesgarLetra('B');
    juego.arriesgarLetra('C');
    juego.arriesgarLetra('D');
    juego.arriesgarLetra('E');
    juego.arriesgarLetra('F');
    juego.arriesgarLetra('G');

    assert(juego.perdido);
  });

  it("validar juego NO perdido (NO supera errores maximos permitidos)", () => {
    juego.arriesgarLetra('A');
    juego.arriesgarLetra('B');
    juego.arriesgarLetra('X');
    juego.arriesgarLetra('Y');
    juego.arriesgarLetra('E');
    juego.arriesgarLetra('F');
    juego.arriesgarLetra('G');
    juego.arriesgarLetra('H');

    assert(!juego.perdido);
  });
});

describe("Juego ganado", () => {
  it("validar juego ganado (se completa la totalidad de letras de la palabra adivinar)", () => {
    juego.arriesgarLetra('X');
    juego.arriesgarLetra('Y');
    juego.arriesgarLetra('Z');

    assert(juego.ganado);
  });

  it("validar juego NO ganado (aun quedan letras NO adivinadas)", () => {
    juego.arriesgarLetra('X');
    juego.arriesgarLetra('Y');

    assert(!juego.ganado);
  });
});

describe("Letras acertadas", () => {
  it("validar devolucion de letras acertadas hasta el momento", () => {
    juego.arriesgarLetra('Y');

    expect(juego.letrasAcertadas).deep.to.equal([undefined, 'Y', undefined]);
  });
});

describe("Juego terminado", () => {
  it("validar que una vez terminado el juego (ganado) no se pueda seguir jugando", () => {
    juego.arriesgarLetra('X');
    juego.arriesgarLetra('Y');
    juego.arriesgarLetra('Z');
    const letraAcertada = juego.arriesgarLetra('Z');

    expect(letraAcertada).equal(undefined);
  });

  it("validar que una vez terminado el juego (perdido) no se pueda seguir jugando", () => {
    juego.arriesgarLetra('A');
    juego.arriesgarLetra('B');
    juego.arriesgarLetra('C');
    juego.arriesgarLetra('D');
    juego.arriesgarLetra('E');
    juego.arriesgarLetra('F');
    juego.arriesgarLetra('G');
    const letraAcertada = juego.arriesgarLetra('H');

    expect(letraAcertada).equal(undefined);
  });
});

describe("Arriesgar palabra", () => {
  it("validar juego ganado al arriesgar una palabra correcta", () => {
    const palabraAcertada = juego.arriesgarPalabra(palabraAAdivinar);

    expect(juego.letrasAcertadas).deep.to.equal(['X', 'Y', 'Z']);
    assert.notEqual(palabraAcertada, undefined);
    assert(juego.ganado);
  });

  it("validar juego perdido al arriesgar una palabra incorrecta", () => {
    const palabraAcertada = juego.arriesgarPalabra('XY');

    assert.notEqual(palabraAcertada, undefined);
    assert(juego.perdido);
  });
});

describe("Palabra a adivinar seteada", () => {
  it("validar que no se pueda cambiar la palabra a adivinar una vez definida", () => {
    const nuevaPalabra = 'NUEVA';
    juego.definirPalabraAAdivinar(nuevaPalabra);

    assert.notEqual(juego.palabraAAdivinar, nuevaPalabra);
    assert.equal(juego.palabraAAdivinar, palabraAAdivinar);
  });

  it("validar que no se pueda arriesgar una letra si la palabra a adivinar no fue definida", () => {
    const juego = new Juego();
    const letraAcertada = juego.arriesgarLetra('A');

    assert.equal(letraAcertada, undefined);
  });

  it("validar que no se pueda arriesgar una palabra si la palabra a adivinar no fue definida", () => {
    const juego = new Juego();
    const palabraAcertada = juego.arriesgarPalabra('A');

    assert.equal(palabraAcertada, undefined);
  });
});

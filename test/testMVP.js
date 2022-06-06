const assert = require("assert").strict;
const Juego = require("../Models/Juego");

let juego = null;
const palabraAAdivinar = "testing";

beforeEach(() => {
  juego = new Juego();
});

describe("Juego", () => {
  it("validar correcta instanciacion del juego", () => {
    assert.notEqual(juego, null);
  });

  it("validar guardado de palabra a adivinar", () => {
    juego.definirPalabra(palabraAAdivinar);
    assert.equal(juego.palabra, palabraAAdivinar);
  });

  it("validar ingreso de letra correcta", () => {
    juego.definirPalabra(palabraAAdivinar);

    const correcto = juego.validarLetraEnPalabra('t');
    assert(correcto);
  });

  it("validar ingreso de letra incorrecta", () => {
    juego.definirPalabra(palabraAAdivinar);

    const correcto = juego.validarLetraEnPalabra('a');
    assert(!correcto);
  });
  
  it("validar letra seleccionada repetida", () => {
    juego.definirPalabra(palabraAAdivinar);
    juego.arriesgarLetra('a');

    const correcto = juego.validarLetraSeleccionada('a');
    assert(correcto);
  });

  it("arriesgar letra correcta", () => {
    juego.definirPalabra(palabraAAdivinar);

    const correcto = juego.arriesgarLetra('t');
    assert(correcto);
  });

  it("arriesgar letra incorrecta", () => {
    juego.definirPalabra(palabraAAdivinar);

    const correcto = juego.arriesgarLetra('a');
    assert(!correcto);
  });

  it("validar juego perdido (superar errores maximos)", () => {
    juego.definirPalabra('xyz');

    juego.arriesgarLetra('a');
    juego.arriesgarLetra('b');
    juego.arriesgarLetra('c');
    juego.arriesgarLetra('d');
    juego.arriesgarLetra('e');
    juego.arriesgarLetra('f');
    juego.arriesgarLetra('g');

    assert(juego.perdido);
  });

  it("validar juego no perdido (no superar errores maximos)", () => {
    juego.definirPalabra('xyz');

    juego.arriesgarLetra('a');
    juego.arriesgarLetra('b');
    juego.arriesgarLetra('x');
    juego.arriesgarLetra('y');
    juego.arriesgarLetra('e');
    juego.arriesgarLetra('f');
    juego.arriesgarLetra('g');

    assert(!juego.perdido);
  });

  it("validar juego ganado", () => {
    juego.definirPalabra('xyz');

    juego.arriesgarLetra('x');
    juego.arriesgarLetra('y');
    juego.arriesgarLetra('z');

    assert(juego.ganado);
  });

  it("validar juego no ganado", () => {
    juego.definirPalabra('xyz');

    juego.arriesgarLetra('x');
    juego.arriesgarLetra('y');

    assert(!juego.ganado);
  });
});

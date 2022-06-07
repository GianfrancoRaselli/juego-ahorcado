const assert = require("assert").strict;
const expect = require('chai').expect;
const Juego = require("../Models/Juego");

let juego = null;
let palabraAAdivinar = "xyz";

beforeEach(() => {
  juego = new Juego();
  juego.definirPalabraAAdivinar("xyz");
});

describe("Juego", () => {
  it("validar correcta instanciacion del juego", () => {
    assert.notEqual(juego, null);
  });

  it("validar guardado de palabra a adivinar", () => {
    assert.equal(juego.palabraAAdivinar, palabraAAdivinar);
  });

  it("validar ingreso de letra correcta", () => {
    const correcto = juego.validarLetraEnPalabraAAdivinar('x');
    assert(correcto);
  });

  it("validar ingreso de letra incorrecta", () => {
    const correcto = juego.validarLetraEnPalabraAAdivinar('a');
    assert(!correcto);
  });
  
  it("validar letra seleccionada repetida", () => {
    juego.arriesgarLetra('a');

    const correcto = juego.validarLetraArriesgada('a');
    assert(correcto);
  });

  it("arriesgar letra correcta", () => {
    const correcto = juego.arriesgarLetra('x');
    assert(correcto);
  });

  it("arriesgar letra incorrecta", () => {
    const correcto = juego.arriesgarLetra('a');
    assert(!correcto);
  });

  it("validar juego perdido (superar errores maximos)", () => {
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
    juego.arriesgarLetra('x');
    juego.arriesgarLetra('y');
    juego.arriesgarLetra('z');

    assert(juego.ganado);
  });

  it("validar juego no ganado", () => {
    juego.arriesgarLetra('x');
    juego.arriesgarLetra('y');

    assert(!juego.ganado);
  });

  it("validar devolucion de letras acertadas", () => {
    juego.arriesgarLetra('y');

    expect(juego.letrasAcertadas).deep.to.equal([undefined, 'y', undefined]);
  });
});

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

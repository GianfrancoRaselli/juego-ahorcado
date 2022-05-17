module.exports = class Juego {
  constructor() {
    this.puntos = 0;
  }

  definirPalabra(palabra) {
    this.palabra = palabra;
  }

  validarLetra(letra) {
    for (let i = 0; i < this.palabra.length; i++) {
      if (this.palabra.charAt(i) === letra) return true;
    }
    return false;
  }
};

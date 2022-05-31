module.exports = class Juego {
  constructor() {
    this.puntos = 0;
    this.letrasSeleccionadas = [];
  }

  definirPalabra(palabra) {
    this.palabra = palabra;
  }

  arriesgarLetra(letra) {
    this.letrasSeleccionadas.push(letra);
  }

  validarLetraSeleccionada(letra) {
    let letraIngresada = false;
    this.letrasSeleccionadas.forEach(l => {
      if (l === letra) {
        letraIngresada = true;
      }
    });
    return letraIngresada;
  }

  validarLetraEnPalabra(letra) {
    for (let i = 0; i < this.palabra.length; i++) {
      if (this.palabra.charAt(i) === letra) return true;
    }
    return false;
  }
};

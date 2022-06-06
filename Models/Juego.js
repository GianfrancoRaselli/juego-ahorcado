module.exports = class Juego {
  constructor() {
    this.puntos = 0;
    this.erroresPermitidos = 6; // cabeza, cuerpo, brazos, piernas
    this.errores = 0;
    this.letrasSeleccionadas = [];
  }

  definirPalabra(palabra) {
    this.palabra = palabra;
    this.letrasAcertadas = new Array(this.palabra.length);
  }

  arriesgarLetra(letra) {
    if (!this.validarLetraSeleccionada(letra)) {
      this.letrasSeleccionadas.push(letra);

      if (this.validarLetraEnPalabra(letra)) {
        for (let i = 0; i < this.palabra.length; i++) {
          if (this.palabra.charAt(i) === letra) this.letrasAcertadas[i] = letra;
          return true;
        }
      } else {
        this.errores++;
        if (this.errores >= this.erroresPermitidos) this.perdido = true;
        return false;
      }
    }
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

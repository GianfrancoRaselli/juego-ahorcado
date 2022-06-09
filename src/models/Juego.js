module.exports = class Juego {
  constructor() {
    this.id = 1;
    this.idUsuario = 1;
    this.puntos = 0;
    this.erroresPermitidos = 6; // cabeza, cuerpo, brazos, piernas
    this.erroresAcumulados = 0;
    this.letrasArriesgadas = [];
  }

  definirPalabraAAdivinar(palabra) {
    if (!this.palabraAAdivinar) {
      this.palabraAAdivinar = palabra;
      this.letrasAcertadas = new Array(this.palabraAAdivinar.length);
    }
  }

  arriesgarPalabra(palabra) {
    if (this.palabraAAdivinar) {
      if (!(this.ganado || this.perdido)) {
        if (this.palabraAAdivinar === palabra) {
          this.ganado = true;
          return true;
        } else {
          this.perdido = true;
          return false;
        }
      }
    }
  }

  arriesgarLetra(letra) {
    if (this.palabraAAdivinar) {
      if (!(this.ganado || this.perdido)) {
        if (!this.#validarLetraArriesgada(letra)) {
          this.letrasArriesgadas.push(letra);

          if (this.#validarLetraEnPalabraAAdivinar(letra)) {
            for (let i = 0; i < this.palabraAAdivinar.length; i++) {
              if (this.palabraAAdivinar.charAt(i) === letra) this.letrasAcertadas[i] = letra;
            }

            let gano = true;
            for (let i = 0; i < this.letrasAcertadas.length; i++) {
              if (!this.letrasAcertadas[i]) gano = false;
            }
            if (gano) this.ganado = true;

            return true;
          } else {
            this.erroresAcumulados++;

            if (this.erroresAcumulados > this.erroresPermitidos) this.perdido = true;

            return false;
          }
        }
      }
    }
  }

  #validarLetraArriesgada(letra) {
    let letraIngresadaPreviamente = false;
    this.letrasArriesgadas.forEach(l => {
      if (l === letra) {
        letraIngresadaPreviamente = true;
      }
    });
    return letraIngresadaPreviamente;
  }

  #validarLetraEnPalabraAAdivinar(letra) {
    for (let i = 0; i < this.palabraAAdivinar.length; i++) {
      if (this.palabraAAdivinar.charAt(i) === letra) return true;
    }
    return false;
  }
};
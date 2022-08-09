module.exports = class Juego {
  constructor () {
    this.erroresPermitidos = 6; // cabeza, cuerpo, brazos, piernas
    this.erroresAcumulados = 0;
    this.letrasArriesgadas = [];
    this.ganado = false;
    this.perdido = false;
  }

  definirPalabraAAdivinar (palabra) {
    if (!this.palabraAAdivinar) {
      this.palabraAAdivinar = palabra.toUpperCase();
      this.letrasAcertadas = new Array(this.palabraAAdivinar.length);
    }
  }

  arriesgarPalabra (palabra) {
    const palabraMayusculas = palabra.toUpperCase();
    if (this.palabraAAdivinar) {
      if (!(this.ganado || this.perdido)) {
        if (this.palabraAAdivinar === palabraMayusculas) {
          for (let i = 0; i < this.letrasAcertadas.length; i++) {
            this.letrasAcertadas[i] = palabraMayusculas.charAt(i);
          }
          this.ganado = true;
          return true;
        } else {
          this.perdido = true;
          return false;
        }
      }
    }
  }

  arriesgarLetra (letra) {
    const letraMayuscula = letra.toUpperCase();
    if (this.palabraAAdivinar) {
      if (!(this.ganado || this.perdido)) {
        if (!this.#validarLetraArriesgada(letraMayuscula)) {
          this.letrasArriesgadas.push(letraMayuscula);

          if (this.#validarLetraEnPalabraAAdivinar(letraMayuscula)) {
            for (let i = 0; i < this.palabraAAdivinar.length; i++) {
              if (this.palabraAAdivinar.charAt(i) === letraMayuscula) this.letrasAcertadas[i] = letraMayuscula;
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

  #validarLetraArriesgada (letra) {
    const letraMayuscula = letra.toUpperCase();
    let letraIngresadaPreviamente = false;
    this.letrasArriesgadas.forEach(l => {
      if (l === letraMayuscula) letraIngresadaPreviamente = true;
    });
    return letraIngresadaPreviamente;
  }

  #validarLetraEnPalabraAAdivinar (letra) {
    const letraMayuscula = letra.toUpperCase();
    for (let i = 0; i < this.palabraAAdivinar.length; i++) {
      if (this.palabraAAdivinar.charAt(i) === letraMayuscula) return true;
    }
    return false;
  }
};

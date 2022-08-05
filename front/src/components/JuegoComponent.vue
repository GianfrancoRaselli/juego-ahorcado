<template>
  <div class="vista1" v-if="vista == 1">
    <b-container fluid>
      <b-form-group
        id="definirPalabra"
        class="m-4"
        label-size="lg"
        label="Ingrese una palabra "
        label-for="palabraAdivinar"
        :invalid-feedback="mensajeInvalido"
        :state="chequeoVacio"
      >
        <b-row>
          <b-col cols="4">
            <b-form-input
              id="palabraAdivinar"
              class="my-2"
              v-model="palabraAAdivinar"
              placeholder="Palabra a adivinar"
              type="password"
              :state="chequeoVacio"
              trim
              v-on:keyup="palabraAAdivinar = palabraAAdivinar.toUpperCase()"
            ></b-form-input>
          </b-col>
          <b-col>
            <b-button
              id="buttonEnviar"
              @click="definirPalabra"
              class="m-2"
              variant="primary"
              :disabled="!chequeoVacio"
              >Enviar</b-button
            >
          </b-col>
        </b-row>
      </b-form-group>
    </b-container>
  </div>

  <div id="vista2" v-else-if="vista == 2">
    <b-container fluid>
      <b-row class="my-4 mx-1">
        <b-col cols="3">
          <canvas id="ahorcado" width="200" height="250"></canvas>
        </b-col>
        <b-col>
          <div class="h-25">
            <span id="label"
              >Letras Arriesgadas: &nbsp; &nbsp; &nbsp; &nbsp;</span
            >
            <div
              class="col-1 d-inline-block"
              v-for="(letra, index) in juego.arriesgadas"
              :key="index"
            >
              <p class="arriesgada">{{ letra }}</p>
            </div>
          </div>
          <div class="h-25"></div>
          <div id="acertadas" class="h-25">
            <div
              class="col-1 d-inline-block"
              v-for="(letra, index) in juego.acertadas"
              :key="index"
            >
              <p>{{ letra }}</p>
            </div>
          </div>
          <div id="guiones" class="h-25">
            <div
              class="col-1 d-inline-block"
              v-for="index in juego.palabra.length"
              :key="index"
            >
              <span>_</span>
            </div>
          </div>
        </b-col>
      </b-row>

      <!-- Arriesgar letra -->
      <b-row>
        <b-form-group
          id="letra"
          class="m-4"
          label-size="lg"
          label="Ingrese una letra"
          label-for="letra"
          :invalid-feedback="mensajeInvalido2"
          :state="chequeoLetra"
        >
          <b-form-input
            id="letra"
            class="my-2"
            v-model="letra"
            placeholder="Ingrese una letra"
            v-on:keyup="letra = letra.toUpperCase()"
          ></b-form-input>
          <b-button
            id="buttonLetra"
            @click="arriesgarLetra"
            variant="primary"
            :state="chequeoVacio"
            :disabled="!chequeoLetra"
            >Enviar</b-button
          >
        </b-form-group>

        <!-- Arriesgar palabra -->
        <b-form-group
          id="arriesgar"
          class="m-4"
          label-size="lg"
          label="Ingrese una palabra"
          label-for="arriesgar"
          :state="chequeoVacio2"
        >
          <b-form-input
            id="arriesgar"
            class="my-2"
            v-model="arriesgar"
            placeholder="Ingrese una palabra"
            v-on:keyup="arriesgar = arriesgar.toUpperCase()"
          ></b-form-input>
          <b-button
            id="buttonArriesgar"
            @click="arriesgarPalabra"
            variant="primary"
            :state="chequeoVacio"
            :disabled="!chequeoVacio2"
            >Enviar</b-button
          >
        </b-form-group>
      </b-row>
    </b-container>
  </div>

  <div id="vista3" v-else-if="juego.gano || juego.perdio">
    <div v-if="juego.gano">
      <h1>Ganaste</h1>
    </div>
    <div v-else-if="juego.perdio">
      <h1>Perdiste</h1>
    </div>
    <b-button
      class="btn-nuevo-juego"
      @click="iniciarNuevaPartida"
      variant="primary"
      >Iniciar nuevo juego</b-button
    >
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "JuegoComponent",
  data() {
    return {
      palabraAAdivinar: "",
      letra: "",
      arriesgar: "",
      juego: {
        palabra: "",
        gano: false,
        perdio: false,
        acertadas: [],
        arriesgadas: [],
      },
      partes: [
        "cabeza",
        "cuerpo",
        "brazoDerecho",
        "brazoIzquierdo",
        "piernaDerecha",
        "piernaIzquierda",
      ],
      step: 0,
      ctx: null,
    };
  },
  computed: {
    vista() {
      let vista = 1;
      if (this.juego.palabra) vista = 2;
      if (this.juego.gano || this.juego.perdio) vista = 3;
      return vista;
    },
    chequeoVacio() {
      return this.palabraAAdivinar.length !== 0;
    },
    chequeoVacio2() {
      return this.arriesgar.length !== 0;
    },
    mensajeInvalido() {
      if (this.palabraAAdivinar.length === 0) {
        return "Ingrese alguna palabra";
      }
      return "";
    },
    chequeoLetra() {
      return this.letra.length === 1;
    },
    mensajeInvalido2() {
      if (this.letra.length > 1) {
        return "Ingrese solo una letra";
      } else if (this.letra.length === 0) {
        return "";
      }
      return "";
    },
  },
  watch: {
    step(newValue, oldValue) {
      switch (this.partes[oldValue]) {
        case "cabeza":
          this.ctx.lineWidth = 5;
          this.ctx.beginPath();
          this.ctx.arc(100, 50, 25, 0, Math.PI * 2, true);
          this.ctx.closePath();
          this.ctx.stroke();
          break;
        case "cuerpo":
          this.ctx.beginPath();
          this.ctx.moveTo(100, 75);
          this.ctx.lineTo(100, 140);
          this.ctx.stroke();
          break;
        case "brazoDerecho":
          this.ctx.beginPath();
          this.ctx.moveTo(100, 85);
          this.ctx.lineTo(60, 100);
          this.ctx.stroke();
          break;
        case "brazoIzquierdo":
          this.ctx.beginPath();
          this.ctx.moveTo(100, 85);
          this.ctx.lineTo(140, 100);
          this.ctx.stroke();
          break;
        case "piernaDerecha":
          this.ctx.beginPath();
          this.ctx.moveTo(100, 140);
          this.ctx.lineTo(80, 190);
          this.ctx.stroke();
          break;
        case "piernaIzquierda":
          this.ctx.beginPath();
          this.ctx.moveTo(100, 140);
          this.ctx.lineTo(125, 190);
          this.ctx.stroke();
          break;
      }
    },
  },
  methods: {
    async iniciarNuevaPartida() {
      await axios.post("/juego/iniciarNuevaPartida");
      this.palabraAAdivinar = "";
      this.letra = "";
      this.arriesgar = "";
      this.juego = {
        palabra: "",
        gano: false,
        perdio: false,
        acertadas: [],
        arriesgadas: [],
      };
      this.step = 0;
      this.ctx = null;
    },
    async definirPalabra() {
      const res = await axios.post("/juego/definirPalabraAAdivinar", {
        palabra: this.palabraAAdivinar,
      });
      this.juego.palabra = res.data.palabraAAdivinar;
      setTimeout(() => {
        this.cargarCanvas();
      }, 100);
    },
    cargarCanvas() {
      const canvas = document.getElementById("ahorcado");
      this.ctx = canvas.getContext("2d");
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx.strokeStyle = "#444";
      this.ctx.lineWidth = 10;
      this.ctx.beginPath();
      this.ctx.moveTo(175, 225);
      this.ctx.lineTo(5, 225);
      this.ctx.moveTo(40, 225);
      this.ctx.lineTo(25, 5);
      this.ctx.lineTo(100, 5);
      this.ctx.lineTo(100, 25);
      this.ctx.stroke();
    },
    arriesgarLetra() {
      axios.post("/juego/arriesgarLetra", { letra: this.letra }).then((res) => {
        (this.step = res.data.errores),
          (this.juego.acertadas = res.data.letrasAcertadas),
          (this.juego.gano = res.data.gano),
          (this.juego.perdio = res.data.perdio),
          this.juego.arriesgadas.push(this.letra);
      });
    },
    arriesgarPalabra() {
      axios
        .post("/juego/arriesgarPalabra", { palabra: this.arriesgar })
        .then((res) => {
          (this.step = 7),
            (this.juego.acertadas = res.data.letrasAcertadas),
            (this.juego.gano = res.data.gano),
            (this.juego.perdio = res.data.perdio);
        });
    },
  },
  async mounted() {
    const res = await axios.get("/juego/juegoActual");
    const juegoActual = res.data.juegoActual;

    if (!juegoActual) {
      this.iniciarNuevaPartida();
    } else {
      this.juego = {
        palabra: juegoActual.palabraAAdivinar,
        gano: juegoActual.ganado,
        perdio: juegoActual.perdido,
        acertadas: juegoActual.letrasAcertadas,
        arriesgadas: juegoActual.letrasArriesgadas,
      };
      if (this.vista === 2)
        setTimeout(() => {
          this.cargarCanvas();
          for (let i = 0; i <= juegoActual.erroresAcumulados; i++) {
            setTimeout(() => {
              this.step = i;
            }, 100);
          }
        }, 100);
    }
  },
};
</script>

<style scoped>
span {
  font-size: 60px;
  font-weight: bold;
}
#label {
  font-size: 30px;
}
p {
  font-size: 40px;
  font-weight: bold;
}
#acertadas {
  margin-bottom: -120px;
}
#guiones {
  margin-top: 40px;
}
h1 {
  margin-top: 20%;
  text-align: center;
}
#vista3 {
  display: flex;
  flex-direction: column;
  align-content: center;
}
.btn-nuevo-juego {
  margin: auto;
  margin-top: 50px;
  width: 220px;
}
</style>

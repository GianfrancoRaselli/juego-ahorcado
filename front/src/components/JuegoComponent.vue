<template>

  <div class="vista1" v-if="vista == 1">
    <div>
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
          <b-col cols="3">
            <b-form-input
              id="palabraAdivinar"
              class="my-2"
              v-model="palabraAAdivinar"
              placeholder="Palabra a adivinar"
              :state="chequeoVacio" trim
            ></b-form-input>
          </b-col>
          <b-col>
            <b-button @click="definirPalabra" class="m-2" variant="primary" :disabled="!chequeoVacio">Enviar</b-button>
          </b-col>
        </b-row>
      </b-form-group>
    </div>
  </div>
      
  <div id="vista2" v-else-if="vista == 2">
  
    <canvas id="ahorcado" width="200" height="300"></canvas>
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
        ></b-form-input>
        <b-button @click="arriesgarLetra" variant="primary" :state="chequeoVacio" :disabled="!chequeoLetra">Enviar</b-button>
      </b-form-group>

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
        ></b-form-input>
        <b-button @click="arriesgarPalabra" variant="primary" :state="chequeoVacio" :disabled="!chequeoVacio2">Enviar</b-button>
      </b-form-group>

  </div>

  <div id="vista3" v-else-if="gano || perdio">
    <div v-if="gano">
      <h1> Ganaste </h1>
    </div> 
    <div v-else-if="perdio">
      <h1>Perdiste</h1>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'JuegoComponent',
  data(){
    return{
      vista: 1,
      palabraAAdivinar: '',
      arriesgar: '',
      letra: '',
      adivinar: '',
      gano: false,
      perdio: false,
      acertadas: [],
      partes: [ 'cabeza', 'cuerpo', 'brazoDerecho', 'brazoIzquierdo', 'piernaDerecha', 'piernaIzquierda' ],
      step: 0,
      ctx: null,
    }
  },
  mounted(){
    this.iniciarNuevaPartida();
  },
  methods:{
    iniciarNuevaPartida(){
      axios.post('http://localhost/juego/iniciarNuevaPartida');
    },
    definirPalabra(){
      this.vista++;
      setTimeout( () => {this.cargarCanvas()}, 100);
      axios.post('http://localhost/juego/definirPalabraAAdivinar', { 'palabra': this.palabraAAdivinar })
    },
    cargarCanvas(){
      const canvas = document.getElementById('ahorcado');
      this.ctx = canvas.getContext("2d");
      this.ctx.clearRect(0, 0, canvas.width, canvas.height)
      this.ctx.strokeStyle = '#444';
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
    arriesgarLetra(){
      axios.post('http://localhost/juego/arriesgarLetra', { 'letra': this.letra } )
        .then( res => { this.step = res.data.errores, this.acertadas = res.data.letrasAcertadas, this.gano = res.data.gano, this.perdio = res.data.perdio });
    },
    arriesgarPalabra(){
      axios.post('http://localhost/juego/arriesgarPalabra', { 'palabra': this.arriesgar })
        .then(res => { this.step = 7, this.acertadas = res.data.letrasAcertadas, this.gano = res.data.gano, this.perdio = res.data.perdio });
    }
  },
  watch: {
    step(newValue, oldValue) {
      switch (this.partes[oldValue]) {
        case 'cabeza':
          this.ctx.lineWidth = 5;
          this.ctx.beginPath();
          this.ctx.arc(100, 50, 25, 0, Math.PI*2, true);
          this.ctx.closePath();
          this.ctx.stroke();
          break;
        case 'cuerpo':
          this.ctx.beginPath();
          this.ctx.moveTo(100, 75);
          this.ctx.lineTo(100, 140);
          this.ctx.stroke();
          break;
        case 'brazoDerecho':
          this.ctx.beginPath();
          this.ctx.moveTo(100, 85);
          this.ctx.lineTo(60, 100);
          this.ctx.stroke();
          break;
        case 'brazoIzquierdo':
          this.ctx.beginPath();
          this.ctx.moveTo(100, 85);
          this.ctx.lineTo(140, 100);
          this.ctx.stroke();
          break;
        case 'piernaDerecha':
          this.ctx.beginPath();
          this.ctx.moveTo(100, 140);
          this.ctx.lineTo(80, 190);
          this.ctx.stroke();
          break;
        case 'piernaIzquierda':
          this.ctx.beginPath();
          this.ctx.moveTo(100, 140);
          this.ctx.lineTo(125, 190);
          this.ctx.stroke();
          break;
      }
    },
    gano(){
      this.vista++;
    },
    perdio(){
      this.vista++;
    }
  },
  computed:{
    chequeoVacio(){
      return this.palabraAAdivinar.length !== 0;
    },
    chequeoVacio2(){
      return this.arriesgar.length !== 0;
    },
    mensajeInvalido(){
      if(this.palabraAAdivinar.length === 0){
        return 'Ingrese alguna palabra';
      }
      return '';
    },
    chequeoLetra(){
      return this.letra.length === 1;
    },
    mensajeInvalido2(){
      if(this.letra.length > 1){
        return 'Ingrese solo una letra';
      }else if(this.letra.length === 0){
        return '';
      }
      return '';
    }
  }
    
}

</script>

<style scoped>
canvas{
  margin: 20px;
}
</style>

<template>
  <div id="app">
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-brand class="px-4">Ahorcado</b-navbar-brand>
      </b-navbar>
      <juego-component></juego-component>
    </div>
  </div>
</template>

<script>
import JuegoComponent from './components/JuegoComponent.vue'

export default {
  name: 'App',
  components: {
    JuegoComponent
  }
}
</script>

<style>
@import'~bootstrap/dist/css/bootstrap.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>

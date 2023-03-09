<template>
  <ComponenteMenuVue numero="0" />
  <div class="container">
    <div class="row">
      <div class="margen">
                
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <h1><p class="text-center">e-GOVF</p></h1>
        <h4><p class="text-center">Facultad de Humanidades y Ciencias de la Educación</p></h4>
        <h5><p class="text-center">Universidad Mayor de San Andrés</p></h5>
      </div>
      <div class="col-md-6">
        <img alt="Logo Tic Facultativo" class="img-fluid" src="../assets/logoticjpg.jpg">
        <img alt="Logo Tic Facultativo" class="img-fluid" src="../assets/header.jpg">
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 margen">
        <h1><p class="text-center">Recursos y Sistemas de Información</p></h1>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ComponenteMenuVue from '@/components/ComponenteMenu.vue'

export default {
  name: 'HomeView',
  components: {
    ComponenteMenuVue
  }
}
</script>

<template>
  <componente-menu-vue/>
  <router-view/>
</template>
<script>
import ComponenteMenuVue from '@/components/ComponenteMenu.vue'
export default {
  name:"App",
  components : {
    ComponenteMenuVue
  }
}
</script>

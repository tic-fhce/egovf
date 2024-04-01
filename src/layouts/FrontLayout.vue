<template>
    <div>
        <ComponenteMenu />
        <router-view />
    </div>
</template>

<script>
import ComponenteMenu from '@/components/Front/ComponenteMenu.vue'
export default {
    name: 'FrontLayout',
    components: {
        ComponenteMenu
    }
  }
</script>
  
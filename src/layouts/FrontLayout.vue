<template>
    <div>
        <HeaderNavigation />
        <router-view />
    </div>
</template>

<script>
// import ComponenteMenu from '@/components/Front/ComponenteMenu.vue'
import HeaderNavigation from '@/modules/home/components/HeaderNavigation.vue';
export default {
    name: 'FrontLayout',
    components: {
        // ComponenteMenu
        HeaderNavigation
    }
  }
</script>
  
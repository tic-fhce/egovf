<template>
    <div>
        <HeaderNavigation />
        <router-view />
    </div>
</template>

<script>
import HeaderNavigation from '@/components/Front/HeaderNavigation.vue';

export default {
    name: 'FrontLayout',
    components: {
        HeaderNavigation
    }
  }
</script>
  
  
<template>
    <div>
        <HeaderNavigation />
        <router-view />
    </div>
</template>

<script>
import HeaderNavigation from '@/modules/home/components/HeaderNavigation.vue';
export default {
    name: 'FrontLayout',
    components: {
        HeaderNavigation
    }
  }
</script>
  
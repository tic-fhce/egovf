<template>
  <router-link :to="redirectUrl">
    <div class="stat-card bg-white p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <div class="flex items-center">
        <h3 class="text-lg font-semibold text-gray-700 mr-3">{{ title }}</h3>
        <CIcon :icon="icon" class="text-2xl" />
      </div>
      <p :class="['h2 text-3xl font-bold', color]">{{ value }}</p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { CIcon } from '@coreui/icons-vue'
import { defineProps } from 'vue'

defineProps<{
  title: string;
  value: number;
  color: string;
  icon: string;
  redirectUrl: string;
}>();

</script>

<style scoped>
@import '../../styles/tailwind.css';
</style>

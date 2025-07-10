<template>
  <section class="py-5 bg-gray-100">
    <div class="mx-auto max-w-6xl px-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <EjemplarCard v-for="(ejem) in Ejemplars" :key="ejem.codigo" :ejemplar="ejem" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { Ejemplar } from '../services/ejemplarService';
import EjemplarCard from './EjemplarCard.vue';



interface Props {
  Ejemplars: Ejemplar[];
}

defineProps<Props>();
</script>
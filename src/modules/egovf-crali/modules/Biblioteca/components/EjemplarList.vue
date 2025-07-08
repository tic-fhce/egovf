<template>
  <section class="py-10 bg-gray-100">
    <div class="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
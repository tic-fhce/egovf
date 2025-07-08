<template>
  <div class="bg-white rounded-lg shadow p-5 hover:shadow-lg transition duration-300">
    <div class="mb-3">
      <img
        v-if="ejemplar.portada"
        :src="`/${ejemplar.portada}`"
        alt="Portada"
        class="w-full h-40 object-cover rounded-md"
      />
      <div v-else class="w-full h-40 flex items-center justify-center bg-gray-200 rounded-md text-gray-500">
        Sin portada
      </div>
    </div>
    <div class="text-sm text-gray-800">
      <p><span class="font-semibold">Código:</span> {{ ejemplar.codigo }}</p>
      <p><span class="font-semibold">portada:</span> {{ ejemplar.portada }}</p>
      <p><span class="font-semibold">Estado:</span> <span :class="estadoClass">{{ ejemplar.estado }}</span></p>
      <p><span class="font-semibold">Dirección:</span> {{ ejemplar.direccion }}</p>
      <p><span class="font-semibold">ID Libro:</span> {{ ejemplar.id_libro }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Ejemplar } from '../services/ejemplarService'

const props = defineProps<{ ejemplar: Ejemplar }>()

const estadoClass = computed(() => {
  switch (props.ejemplar.estado.toLowerCase()) {
    case 'disponible':
      return 'text-green-600 font-semibold'
    case 'prestado':
      return 'text-red-600 font-semibold'
    default:
      return 'text-gray-600'
  }
})
</script>

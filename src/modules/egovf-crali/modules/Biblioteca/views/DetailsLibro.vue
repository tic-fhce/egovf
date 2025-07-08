<template>
  <div class="pt-32 bg-white">
    <h1 class="text-center text-2xl font-bold text-gray-800">Detalles del Libro</h1>

    <div v-if="!libro" class="text-center h-[200px] mt-10">
      <h2 class="text-lg font-semibold">Cargando información del libro...</h2>
      <p>Espere por favor</p>
    </div>

    <div v-else class="max-w-4xl mx-auto mt-8 px-4">
      <h2 class="text-xl font-bold mb-4 text-blue-700">{{ libro.titulo }}</h2>
      <p><strong>Autor:</strong> {{ libro.autor }}</p>
      <p><strong>Año:</strong> {{ libro.anio }}</p>
      <p><strong>Idioma:</strong> {{ libro.idioma }}</p>
      <p><strong>Signatura Topográfica:</strong> {{ libro.signatura_topografica }}</p>
      <p><strong>Ejemplares:</strong> {{ libro.ejemplares }}</p>
      <p><strong>ID Biblioteca:</strong> {{ libro.id_biblioteca }}</p>
    </div>

    <!-- Lista de Ejemplares -->
    <div class="mt-10">
      <h2 class="text-xl font-semibold text-gray-800 text-center mb-4">Ejemplares</h2>

      <div v-if="!ejemplares.length" class="text-center">
        <p class="text-gray-500">No se encontraron ejemplares.</p>
      </div>

      <EjemplarList v-else :Ejemplars="ejemplares" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import EjemplarList from '../components/EjemplarList.vue'
import { getEjemplaresByLibroId } from '../services/ejemplarService'
import { getLibroById } from '../services/libroService'
import type { Libro } from '../services/libroService'
import type { Ejemplar } from '../services/ejemplarService'

interface Props {
  idLibro: number
  // idBiblioteca: number
}

const props = defineProps<Props>()
console.log({props})
const libro = ref<Libro | null>(null)
const ejemplares = ref<Ejemplar[]>([])

onMounted(async () => {
  try {
    // libro.value = await getLibroById(props.idLibro, props.idBiblioteca)
    libro.value = await getLibroById(props.idLibro)
    if (libro.value?.id_libro) {
      ejemplares.value = await getEjemplaresByLibroId(libro.value.id_libro)
    }
  } catch (error) {
    console.error('Error al cargar libro o ejemplares:', error)
  }
})
</script>

<style scoped>
@import 'datatables.net-dt';
@import '../../../styles/tailwind.css';
</style>

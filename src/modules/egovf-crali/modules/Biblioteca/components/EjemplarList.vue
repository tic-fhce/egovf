<template>
  <section class="py-5 bg-gray-100">
    <div class="mx-auto max-w-6xl px-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <EjemplarCard v-for="(ejem) in Ejemplars" :key="ejem.codigo" :ejemplar="ejem" @edit="abrirModalEditar" @ejemplarEliminado="ejemplarCreado"/>
    </div>
  </section>
  
  <!-- Modal: Editar Ejemplar -->
  <AgregarEjemplarModal
    :visible="modalVisible"
    :idLibro="props.idLibro"
    :portadaLibro="props.portadaLibro"
    :ejemplarEditar="ejemplarEditar"
    @close="cerrarModal"
    @ejemplarCreado="ejemplarCreado"
  />
</template>

<script setup lang="ts">
import { Ejemplar } from '../services/ejemplarService';
import EjemplarCard from './EjemplarCard.vue';
import AgregarEjemplarModal from './AgregarEjemplarModal.vue'
import { ref } from 'vue';



interface Props {
  Ejemplars: Ejemplar[];
  idLibro: number,
  portadaLibro: string
}

const props = defineProps<Props>();
const emit = defineEmits(['ejemplarCreado'])
const modalVisible = ref(false)
const ejemplarEditar = ref<Ejemplar>()

const abrirModalEditar = (ejemplar: Ejemplar) => {
  ejemplarEditar.value = ejemplar
  modalVisible.value = true
}

const cerrarModal = () => {
  modalVisible.value = false
  ejemplarEditar.value = undefined
}

const ejemplarCreado = async () => {
  emit('ejemplarCreado')
}
</script>
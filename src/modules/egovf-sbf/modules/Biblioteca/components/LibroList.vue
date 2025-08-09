<template>
  <section class="py-5 bg-gray-100">
    <div class="mx-auto max-w-6xl px-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <LibroCard v-for="(lib) in Libros" :key="lib.id_libro" :libro="lib" @edit="abrirModalEditar" @view-pdf="abrirModalPdf" @ejemplarEliminado="libroCreado"/>
    </div>
  </section>
  
  <!-- Modal: Editar Ejemplar -->
  <AddUpdateLibro
    :visible="modalVisible"
    :id_biblioteca="props.idBiblioteca"
    :libroEditar="libroEditar"
    @close="cerrarModal"
    @libroCreado="libroCreado"
  />
  <PdfViewerModal
    :visible="mostrarModalPdf"
    :pdfUrl="ejemplarPdfUrl"
    @close="cerrarModalPdf"
  />
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { Libro } from '../services/libroService';
import LibroCard from './LibroCard.vue';
import AddUpdateLibro from './AddUpdateLibro.vue';
import PdfViewerModal from './PdfViewerModal.vue';
interface Props {
  Libros: Libro[];
  idBiblioteca: number,
}

const props = defineProps<Props>();
const emit = defineEmits(['libroCreado'])
const modalVisible = ref(false)
const libroEditar = ref<Libro>()

const mostrarModalPdf = ref(false)
const ejemplarPdfUrl = ref<string | null>(null)

const cerrarModalPdf = () => {
  mostrarModalPdf.value = false
  ejemplarPdfUrl.value = null
}

const abrirModalEditar = (ejemplar: Libro) => {
  libroEditar.value = ejemplar
  modalVisible.value = true
}

const abrirModalPdf = (pdfUrl: string) => {
  ejemplarPdfUrl.value = pdfUrl;
  mostrarModalPdf.value = true;
};

const cerrarModal = () => {
  modalVisible.value = false
  libroEditar.value = undefined
}

const libroCreado = async () => {
  emit('libroCreado')
}
</script>
<template>

   <div v-if="!biblioteca" class="text-center h-[200px] mt-10">
    <h2 class="text-lg font-semibold">Cargando información de la Biblioteca...</h2>
    <p>Espere por favor</p>
  </div>

  <div v-else class="bg-white relative   flex items-center  justify-center overflow-hidden  ">
    <div
      class="relative mx-auto h-full px-4  pb-20   md:pb-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
      <div class="flex flex-col items-center justify-between lg:flex-row">
        <div class=" relative ">
          <div class="lg:max-w-xl lg:pr-5 relative z-40">
            <h2
              class="mb-1 max-w-lg text-3xl font-light leading-snug tracking-tight text-g1 sm:text-5xl sm:leading-snug">
              {{ biblioteca?.nombre }}
              <span class="my-1 inline-block border-b-8 border-g4 bg-white px-4 font-bold text-g4">{{
                biblioteca?.horario_atencion }}</span>
            </h2>
            <p class="text-base text-gray-700">Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque it.</p>

            <div class="mt-10 flex flex-col items-center md:flex-row">
              <CButton @click="abrirModal"
                class=" inline-flex h-12 w-full items-center justify-center rounded bg-green-600 px-6 font-medium tracking-wide text-white shadow-md transition hover:bg-green-700 focus:outline-none md:mr-4 md:mb-0 md:w-auto">
                Agregar Libro</CButton>

              <CButton @click="editarLibro"
                class="inline-flex h-12 w-full items-center justify-center rounded bg-yellow-600 px-6 font-medium tracking-wide text-white shadow-md transition hover:bg-yellow-700 focus:outline-none md:mr-4 md:mb-0 md:w-auto">
                Volver</CButton>

            </div>
          </div>

        </div>
        <div class="relative hidden lg:ml-2  lg:block lg:w-1/2">
          <div class="abg-orange-400 mx-auto w-fit overflow-hidden rounded-[6rem] rounded-br-none rounded-tl-none">
            <img :src="`/ruta/portadas/mapa.png`">
          </div>
        </div>
      </div>
    </div>

  </div>


    <!-- Lista de Libros -->
    <div class="mt-2">
      <h2 class="text-xl font-semibold text-gray-800 text-center mb-1">Libros</h2>

      <div v-if="!libros.length" class="text-center">
        <p class="text-gray-500">No se encontraron Libros.</p>
      </div>

      <LibroList v-else :Libros="libros" :id-biblioteca="props.idBiblioteca"  @libro-creado="libroCreado"/>
    </div>

     <!-- Modal: Agregar Libro -->
     <AddUpdateLibro
      :visible="modalVisible"
      :id_biblioteca="props.idBiblioteca"
      @close="cerrarModal"
      @libroCreado="libroCreado"
    />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import Swal from 'sweetalert2'
import { CButton } from '@coreui/vue'
import { type Biblioteca, getBibliotecaById } from '../services/bibliotecaService'
import { getLibrosByIdBiblioteca, type Libro } from '../services/libroService'
import LibroList from '../components/LibroList.vue'
import AddUpdateLibro from '../components/AddUpdateLibro.vue'

interface Props {
  idBiblioteca: number
}

const props = defineProps<Props>()
const router = useRouter()

const biblioteca = ref<Biblioteca | null>(null)
const libros = ref<Libro[]>([])

// Modal control
const modalVisible = ref(false)
const abrirModal = () => (modalVisible.value = true)
const cerrarModal = () => (modalVisible.value = false)
// Recargar datos después de agregar
const libroCreado = async () => {
  await cargarDatos()
}

// Cargar libro y ejemplares
const cargarDatos = async () => {
  try {
    biblioteca.value = await getBibliotecaById(props.idBiblioteca)
    if (biblioteca.value?.id_biblioteca) {
      libros.value = await getLibrosByIdBiblioteca(biblioteca.value.id_biblioteca)
    }
  } catch (error) {
    console.error('Error al cargar datos:', error)
    Swal.fire('Error', 'No se pudo cargar la información de la Biblioteca.', 'error')
  }
}

const editarLibro = () => {
  // if (libro.value) {
  //   router.push({ name: 'EditarLibro', params: { idLibro: libro.value.id_libro } })
  // }
  router.go(-1)
  // router.push('/libros')
}

onMounted(cargarDatos);

</script>

<style scoped>
@import 'datatables.net-dt';
@import '../../../styles/tailwind.css';
</style>

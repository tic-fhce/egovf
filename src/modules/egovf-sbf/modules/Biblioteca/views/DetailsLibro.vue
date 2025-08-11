<template>

  <h2 class="mb-1 max-w-lg text-2xl font-semibold leading-snug tracking-tight text-g1 sm:text-2xl sm:leading-snug">
    Detalles del Libro
  </h2>

  <div v-if="!libro" class="text-center h-[200px] mt-10">
    <h2 class="text-lg font-semibold">Cargando información del libro...</h2>
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
              {{ libro?.titulo }}
              <span class="my-1 inline-block border-b-8 border-g4 bg-white px-4 font-bold text-g4">{{
                libro?.autor }}</span>
            </h2>
            <p class="text-base text-gray-700">Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque it.</p>

            <div class="mt-10 flex flex-row items-center md:flex-row">

              <CButton @click="abrirModal" v-if="isAdmin"
              title="Agregar ejemplar"
                class=" inline-flex h-12  items-center justify-center rounded bg-green-600 px-6 font-medium tracking-wide text-white shadow-md transition hover:bg-green-700 focus:outline-none md:mr-1 md:mb-0 md:w-auto">
                <AddEjemplarIcon class="w-8 h-8"/>
              </CButton>

              <CButton @click="editarLibro"
                title="Volver Atras"
                class="inline-flex h-12 items-center justify-center rounded bg-blue-600 px-6 font-medium tracking-wide text-white shadow-md transition hover:bg-blue-700 focus:outline-none md:mr-1 md:mb-0 md:w-auto">
                <BackIcon class="w-8 h-8"/>
              </CButton>
              <CButton v-if="ejemplarDisponible?.contenido_pdf"
              title="Ver Pdf"
                @click="viewPdf(ejemplarDisponible)"
                class="inline-flex h-12 items-center justify-center rounded bg-blue-100 px-6 font-medium tracking-wide text-white shadow-md transition hover:bg-blue-200 focus:outline-none md:mr-1 md:mb-0 md:w-auto">
                <PdfIcon class="w-8 h-8"/>
              </CButton>
            
            </div>
          </div>

        </div>
        <div class="relative hidden lg:ml-2  lg:block lg:w-1/2">
          <div class="abg-orange-400 mx-auto w-fit overflow-hidden rounded-[6rem] rounded-br-none rounded-tl-none ">
            <img
              :src="`${portada}`"
              class="max-w-[300px] max-h-[400px] object-contain"
              alt="Portada"
            >
          </div>
        </div>
      </div>
    </div>

  </div>


    <!-- Lista de Ejemplares -->
    <div class="mt-2">
      <h2 class="text-xl font-semibold text-gray-800 text-center mb-1">Ejemplares</h2>

      <div v-if="!ejemplares.length" class="text-center">
        <p class="text-gray-500">No se encontraron ejemplares.</p>
      </div>

      <EjemplarList v-else :Ejemplars="ejemplares" :id-libro="props.idLibro" :portada-libro="portada" @ejemplar-creado="ejemplarCreado"/>
    </div>

     <!-- Modal: Agregar Ejemplar -->
    <AgregarEjemplarModal
      :visible="modalVisible"
      :idLibro="props.idLibro"
      :portadaLibro="portada"
      @close="cerrarModal"
      @ejemplarCreado="ejemplarCreado"
    />

    <PdfViewerModal
      :visible="mostrarModalPdf"
      :pdfUrl="ejemplarPdfUrl"
      @close="cerrarModalPdf"
    />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import EjemplarList from '../components/EjemplarList.vue'
import AgregarEjemplarModal from '../components/AgregarEjemplarModal.vue'

import { type Ejemplar, EstadoEjemplar, getEjemplaresByLibroId, verPdf } from '../services/ejemplarService'
import { type Libro, getLibroById } from '../services/libroService'
import Swal from 'sweetalert2'
import { CButton } from '@coreui/vue'

interface Props {
  idLibro: number
  // idBiblioteca: number
}

const props = defineProps<Props>()
const router = useRouter()
import { useCookies } from '../../../utils/cookiesManager';
import { AddEjemplarIcon, BackIcon, PdfIcon } from '../../components'
import PdfViewerModal from '../components/PdfViewerModal.vue'
const { isAdmin } = useCookies()

const libro = ref<Libro | null>(null)
const ejemplares = ref<Ejemplar[]>([])
const ejemplarDisponible = ref<Ejemplar | null>(null)
const portada = ref('');

// Modal control
const modalVisible = ref(false)
const abrirModal = () => (modalVisible.value = true)
const cerrarModal = () => (modalVisible.value = false)

const mostrarModalPdf = ref(false)
const ejemplarPdfUrl = ref<string | null>(null)

const cerrarModalPdf = () => {
  mostrarModalPdf.value = false
  ejemplarPdfUrl.value = null
}

// Recargar datos después de agregar
const ejemplarCreado = async () => {
  await cargarDatos()
}

// Cargar libro y ejemplares
const cargarDatos = async () => {
  try {
    libro.value = await getLibroById(props.idLibro)
    if (libro.value?.id_libro) {
      ejemplares.value = await getEjemplaresByLibroId(libro.value.id_libro)
      ejemplares.value.forEach(ej => {
        ej.estado = Number(ej.estado)
      })
      ejemplarDisponible.value = ejemplares.value.find(
        e => [EstadoEjemplar.Disponible, EstadoEjemplar.Reservado].includes(e.estado) && e.portada
      ) || null;
      portada.value = ejemplarDisponible.value?.portada || '/ruta/portadas/bookCover.png'
      // portada.value = ejemplares.value.find(e => e.portada)?.portada || '/uploads/portadas/bookCover.png'
    }
  } catch (error) {
    console.error('Error al cargar datos:', error)
    Swal.fire('Error', 'No se pudo cargar la información del libro.', 'error')
  }
}

const editarLibro = () => {
  // if (libro.value) {
  //   router.push({ name: 'EditarLibro', params: { idLibro: libro.value.id_libro } })
  // }
  // router.go(-1)
  router.push('/libros')
}

const viewPdf = async (ejemplar: Ejemplar) => {
  const urlpdf = verPdf(ejemplar);
  if(urlpdf){
    ejemplarPdfUrl.value = urlpdf || '';
    mostrarModalPdf.value = true
  }

}

onMounted(cargarDatos);

</script>

<style scoped>
@import 'datatables.net-dt';
@import '../../../styles/tailwind.css';
</style>

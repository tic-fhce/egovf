<template>
  <article class="bg-white p-3 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">

    <a href="#" @click.prevent>
      <div class="relative overflow-hidden rounded-xl">
        <img v-if="ejemplar.portada" :src="getImageSrc(ejemplar.portada)" alt="Portada" class="h-64 w-full object-cover"
          @error="handleImageError" />
        <div v-else class="w-full h-40 flex items-center justify-center bg-gray-200 rounded-md text-gray-500">
          Sin portada
        </div>
      </div>
      <div class="mt-3 px-1">
        <p><span class="font-semibold">Código Ejemplar:</span> {{ ejemplar.codigo }}</p>
        <!-- <p><span class="font-semibold">portada:</span> {{ ejemplar.portada }}</p> -->
        <p> <span :class="estadoClass">{{ ejemplar.estado }}</span></p>
        <p>{{ ejemplar.direccion }}</p>
        <!-- <p><span class="font-semibold">ID Libro:</span> {{ ejemplar.id_libro }}</p> -->
        <!-- <div class="mt-3 flex items-end justify-between"> -->
        <div v-if="isAdmin" class="mt-3 flex flex-row items-center md:flex-row">
          <template v-if="isAdmin">

            <button @click="emitEdit" title="Modificar ejemplar"
              class="inline-flex items-center  rounded-lg bg-orange-500 px-2 py-1.5 text-white duration-100 hover:bg-orange-600 focus:outline-none">
              <EditIcon class="w-6 h-6" />
            </button>

            <button @click="eliminarEjemplar(ejemplar.codigo)" title="Eliminar ejemplar"
              class="inline-flex  items-center  rounded-lg  bg-red-500 px-1 py-1.5 text-white duration-100  hover:bg-red-600 focus:outline-none">
              <DeleteIcon class="w-6 h-6" />
            </button>

            <button v-if="ejemplar.contenido_pdf" @click="verPdf(ejemplar)" title="Ver Pdf"
              class="inline-flex items-center  rounded-lg bg-gray-400 px-2 py-1.5 text-white duration-100 hover:bg-gray-500 focus:outline-none">
              <PdfIcon class="w-8 h-8" />
            </button>

          </template>

        </div>
      </div>
    </a>
  </article>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { deleteEjemplar, verPdf, type Ejemplar } from '../services/ejemplarService'
import Swal from 'sweetalert2'

const props = defineProps<{ ejemplar: Ejemplar }>()
const emit = defineEmits(['edit', 'ejemplarEliminado'])
import { useCookies } from '../../../utils/cookiesManager';
import { DeleteIcon, EditIcon, PdfIcon } from '../../components';
const { isAdmin } = useCookies()

const defaultImage = '/ruta/portadas/bookCover.png'
const imageFailed = ref(false)

const getImageSrc = (portada: string) => {
  if (!portada || imageFailed.value) {
    return defaultImage
  }
  const hasExtension = /\.(jpg|jpeg|png|gif|webp)$/i.test(portada)
  if (!hasExtension) {
    return defaultImage
  }
  return portada;
}

// Handle image load error
const handleImageError = () => {
  imageFailed.value = true
}

const estadoClass = computed(() => {
  switch (props.ejemplar.estado.toLowerCase()) {
    case 'disponible':
      return 'text-green-600 font-semibold'
    case 'prestado':
      return 'text-red-600 font-semibold'
    default:
      return 'text-red-600'
  }
})

const eliminarEjemplar = async (codigo: number) => {
  const confirm = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'bg-red-600 text-white px-4 py-2 rounded-md mr-2',
      cancelButton: 'bg-gray-200 text-black px-4 py-2 rounded-md'
    },
    buttonsStyling: false
  })
  if (!confirm.isConfirmed) return

  try {
    await deleteEjemplar(codigo);
    // libros.value = libros.value.filter(l => l.id_libro !== id_libro)
    showToast('success', 'Ejemplar eliminado correctamente')
    emit('ejemplarEliminado')
    // await cargarDatos()
  } catch {
    showToast('error', 'Error al eliminar el Ejemplar')
  }
}

const emitEdit = () => {
  // console.log(props.ejemplar)
  emit('edit', props.ejemplar)
}


const showToast = (icon: 'success' | 'error' | 'info' | 'warning', message: string) => {
  Swal.fire({
    icon,
    title: message,
    toast: true,
    position: 'top-end',
    timer: 2000,
    showConfirmButton: false,
  })
}
</script>

<template>
  <article class="bg-white p-3 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">

    <a href="#" >
      <div class="relative overflow-hidden rounded-xl">
        <img v-if="portada && !imageFailed" :src="getImageSrc(portada)" alt="Portada" class="h-64 w-full object-cover"
          />
        <div v-else class="w-full h-40 flex items-center justify-center bg-gray-200 rounded-md text-gray-500">
          Sin portada
        </div>
      </div>
      <div class="mt-3 px-1">
        <p><span class="font-semibold">Titulo:</span> {{ libro.titulo }}</p>
        <p><span class="font-semibold">Autor:</span> {{ libro.autor }}</p>
        <p><span class="font-semibold">Idioma:</span> {{ libro.idioma }}</p>
        <p><span class="font-semibold">Ejemplares:</span> {{ libro.ejemplares }}</p>
        <p><span class="font-semibold">Disponible:</span> {{ disponible }}</p>
        <p v-if="ejemplar">
          <span class="font-semibold">Estado: </span>
          <span :class="estadoClass">{{ ejemplar.estado }}</span>
        </p>
          <div class="mt-10 flex flex-row items-center md:flex-row">

          <button @click="verLibro(libro.id_libro)"
            title="Ver Libro"  
            class="inline-flex  items-center  rounded-lg bg-blue-500 px-2 py-1.5 text-white duration-100 hover:bg-blue-600 focus:outline-none md:mr-1 md:mb-0 md:w-auto">
            <VerIcon class="w-6 h-6"/>
          </button>

          <button @click="emitEdit" v-if="isAdmin"
            title="Editar Libro"
            class="inline-flex  items-center  rounded-lg  bg-orange-500 px-2 py-1.5 text-white duration-100  hover:bg-orange-600 focus:outline-none md:mr-1 md:mb-0 md:w-auto">
            <EditIcon class="w-6 h-6"/>
            
          </button>

        </div>
      </div>
    </a>
  </article>

</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { type Ejemplar, EstadoEjemplar, getEjemplaresByLibroId } from '../services/ejemplarService'
// import Swal from 'sweetalert2'
import { type Libro } from '../services/libroService';
import { useRouter } from 'vue-router';

const router = useRouter()
import { useCookies } from '../../../utils/cookiesManager';
import { EditIcon, VerIcon } from '../../components';
const { isAdmin } = useCookies()

const props = defineProps<{ libro: Libro }>()
const emit = defineEmits(['edit','libroEliminado'])
const defaultImage = '/ruta/portadas/bookCover.png'
const imageFailed = ref(false)
const portada = ref<string>('')
const disponible = ref<number>(0)
const ejemplar = ref<Ejemplar | null>(null)

onMounted(async () => {
  await cargarDatos()
})

async function cargarDatos() {
  try {
    const ejemplares = await getEjemplaresByLibroId(props.libro.id_libro)
    if (ejemplares && ejemplares.length > 0) {
      ejemplar.value = ejemplares[0] 
      portada.value = ejemplares[0].portada 
      disponible.value = ejemplares.filter(ejemplar => ejemplar.estado === EstadoEjemplar.Disponible).length
      ejemplar.value.estado = (disponible.value > 0) ? EstadoEjemplar.Disponible : EstadoEjemplar.SinEstado
    }else{
      portada.value = defaultImage
    }
  } catch (error) {
    console.error('Error al obtener ejemplares:', error)
  }
}

const getImageSrc = (portada: string) => {
  if (!portada || imageFailed.value) {
    return defaultImage
  }
  const hasExtension = /\.(jpg|jpeg|png|gif|webp)$/i.test(portada)
  if (!hasExtension) {
    return defaultImage
  }
  return `${portada}`
}

// Handle image load error
// const handleImageError = () => {
//   imageFailed.value = true
// }

const estadoClass = computed(() => {
  if (!ejemplar.value) return 'text-gray-600'
  switch (ejemplar.value.estado.toLowerCase()) {
    case 'disponible':
      return 'text-green-600 font-semibold'
    case 'prestado':
      return 'text-red-600 font-semibold'
    default:
      return 'text-red-600 font-semibold'
  }
})

const verLibro = async (codigo: number) => {
    
  router.push({
    name: 'DetallesLibro', // Cambia a 'DetallesLibro'
    params: { idLibro: codigo }, // Pasa el código como idLibro
  });
}

const emitEdit = () => {
  // console.log(props.ejemplar)
  emit('edit', props.libro)
}


// const showToast = (icon: 'success' | 'error' | 'info' | 'warning', message: string) => {
//   Swal.fire({
//     icon,
//     title: message,
//     toast: true,
//     position: 'top-end',
//     timer: 2000,
//     showConfirmButton: false,
//   })
// }
</script>

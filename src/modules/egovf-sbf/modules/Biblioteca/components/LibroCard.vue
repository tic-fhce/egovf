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
          <div class="mt-10 flex flex-col items-center md:flex-row">

          <div @click="verLibro(libro.id_libro)"
            class="inline-flex w-full items-center  rounded-lg bg-orange-500 px-4 py-1.5 text-white duration-100 hover:bg-orange-600 focus:outline-none md:mr-4 md:mb-0 md:w-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0"
              stroke="currentColor" class="h-4 w-4">
              <g id="SVGRepo_iconCarrier">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M17.7 5.12758L19.266 6.37458C19.4172 6.51691 19.5025 6.71571 19.5013 6.92339C19.5002 7.13106 19.4128 7.32892 19.26 7.46958L18.07 8.89358L14.021 13.7226C13.9501 13.8037 13.8558 13.8607 13.751 13.8856L11.651 14.3616C11.3755 14.3754 11.1356 14.1751 11.1 13.9016V11.7436C11.1071 11.6395 11.149 11.5409 11.219 11.4636L15.193 6.97058L16.557 5.34158C16.8268 4.98786 17.3204 4.89545 17.7 5.12758Z"
                  stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path
                  d="M12.033 7.61865C12.4472 7.61865 12.783 7.28287 12.783 6.86865C12.783 6.45444 12.4472 6.11865 12.033 6.11865V7.61865ZM9.23301 6.86865V6.11865L9.23121 6.11865L9.23301 6.86865ZM5.50001 10.6187H6.25001L6.25001 10.617L5.50001 10.6187ZM5.50001 16.2437L6.25001 16.2453V16.2437H5.50001ZM9.23301 19.9937L9.23121 20.7437H9.23301V19.9937ZM14.833 19.9937V20.7437L14.8348 20.7437L14.833 19.9937ZM18.566 16.2437H17.816L17.816 16.2453L18.566 16.2437ZM19.316 12.4937C19.316 12.0794 18.9802 11.7437 18.566 11.7437C18.1518 11.7437 17.816 12.0794 17.816 12.4937H19.316ZM15.8863 6.68446C15.7282 6.30159 15.2897 6.11934 14.9068 6.2774C14.5239 6.43546 14.3417 6.87397 14.4998 7.25684L15.8863 6.68446ZM18.2319 9.62197C18.6363 9.53257 18.8917 9.13222 18.8023 8.72777C18.7129 8.32332 18.3126 8.06792 17.9081 8.15733L18.2319 9.62197ZM8.30001 16.4317C7.8858 16.4317 7.55001 16.7674 7.55001 17.1817C7.55001 17.5959 7.8858 17.9317 8.30001 17.9317V16.4317ZM15.767 17.9317C16.1812 17.9317 16.517 17.5959 16.517 17.1817C16.517 16.7674 16.1812 16.4317 15.767 16.4317V17.9317ZM12.033 6.11865H9.23301V7.61865H12.033V6.11865ZM9.23121 6.11865C6.75081 6.12461 4.7447 8.13986 4.75001 10.6203L6.25001 10.617C6.24647 8.96492 7.58269 7.62262 9.23481 7.61865L9.23121 6.11865ZM4.75001 10.6187V16.2437H6.25001V10.6187H4.75001ZM4.75001 16.242C4.7447 18.7224 6.75081 20.7377 9.23121 20.7437L9.23481 19.2437C7.58269 19.2397 6.24647 17.8974 6.25001 16.2453L4.75001 16.242ZM9.23301 20.7437H14.833V19.2437H9.23301V20.7437ZM14.8348 20.7437C17.3152 20.7377 19.3213 18.7224 19.316 16.242L17.816 16.2453C17.8195 17.8974 16.4833 19.2397 14.8312 19.2437L14.8348 20.7437ZM19.316 16.2437V12.4937H17.816V16.2437H19.316ZM14.4998 7.25684C14.6947 7.72897 15.0923 8.39815 15.6866 8.91521C16.2944 9.44412 17.1679 9.85718 18.2319 9.62197L17.9081 8.15733C17.4431 8.26012 17.0391 8.10369 16.6712 7.7836C16.2897 7.45165 16.0134 6.99233 15.8863 6.68446L14.4998 7.25684ZM8.30001 17.9317H15.767V16.4317H8.30001V17.9317Z"
                  fill="#ffffff"></path>
              </g>
            </svg>
            <button class="text-sm">ver</button>
          </div>

          <div @click="emitEdit" v-if="isAdmin"
            class="inline-flex w-full items-center  rounded-lg  bg-red-500 px-1 py-1.5 text-white duration-100  hover:bg-red-600 focus:outline-none md:mr-4 md:mb-0 md:w-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0"
              stroke="currentColor" class="h-4 w-4">
              <g id="SVGRepo_bgCarrier" stroke-width="1.5"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M10 11V17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                </path>
                <path d="M14 11V17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                </path>
                <path d="M4 7H20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                </path>
                <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#ffffff"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ffffff"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </g>
            </svg>
            <button class="text-sm">Modificar</button>
          </div>

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

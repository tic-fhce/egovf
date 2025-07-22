<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">
      {{ isEditMode ? 'Editar Libro:' : 'Crear Libro:' }}
      <small v-if="isEditMode" class="text-blue-500">{{ libro?.titulo || '...' }}</small>
    </h1>
    <hr class="my-4" />
  </div>

  <form @submit.prevent="" class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-5">
    <!-- Columna izquierda -->
    <div class="first-col">
      <div class="mb-3">
        <label class="form-label">Título</label>
        <input v-model="form.titulo" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Autor</label>
        <input v-model="form.autor" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Año</label>
        <input type="number" v-model.number="form.anio" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Idioma</label>
        <select v-model="form.idioma" class="form-control" required>
          <option value="">Seleccione</option>
          <option value="Español">Español</option>
          <option value="Inglés">Inglés</option>
          <option value="Francés">Francés</option>
          <option value="Alemán">Alemán</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Signatura Topográfica</label>
        <input v-model="form.signatura_topografica" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Número de Ejemplares</label>
        <input type="number" v-model.number="form.ejemplares" class="form-control" required min="0"/>
      </div>

      <div  class="mb-4">
        <label class="form-label">Biblioteca</label>
        <select v-model="form.id_biblioteca" class="form-control" required>
          <option value="">Seleccione una biblioteca</option>
          <option v-for="biblioteca in bibliotecas" :key="biblioteca.id_biblioteca" :value="biblioteca.id_biblioteca">
            {{ biblioteca.nombre }}
          </option>
        </select>
      </div>
    </div>

    <!-- Columna derecha -->
    <div class="first-col">
      <div class="mb-4">
        <label class="form-label">Portada Actual</label>
        <div class="abg-orange-400 mx-auto w-fit overflow-hidden rounded-br-none rounded-tl-none">
          <!-- <img :src="`/${portada}`" alt="Portada" class="object-cover rounded" /> -->
             <!-- Previsualización de la imagen (base64) -->
          <img v-if="isBase64" :src="previewPortada" alt="Portada" class="object-cover rounded" />
          <!-- Imagen cargada en el servidor -->
          <img v-if="!isBase64" :src="`${portada}`" alt="Portada" class="object-cover rounded" />
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label">Subir Nueva Portada</label>
        <input type="file" accept="image/*" class="form-control" @change="onFileChanged" ref="imageInput"/>
      </div>

      <div class="mb-4">
        <label class="form-label">Contenido (PDF)</label>
        <input type="file" class="form-control" accept="application/pdf" @change="handlePdfChange" ref="pdfInput" />
        <p v-if="previewPdf" class="text-sm mt-1 text-gray-500">Archivo seleccionado: {{ previewPdf }}</p>
      </div>

      <div class="my-4 text-right">
        <button  @click="guardar"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {{ isEditMode ? 'Guardar Cambios' : 'Crear Libro' }}
        </button>
        <button @click="volver" type="submit"
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Volver
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { type Libro, getLibroById, updateLibro, createLibroFile } from '../services/libroService'
import { type Biblioteca, getBibliotecas } from '../services/bibliotecaService'
import { type Ejemplar, getEjemplaresByLibroId } from '../services/ejemplarService'

interface Props {
  idLibro?: number
}
const props = defineProps<Props>()
const router = useRouter()
import { useCookies } from '../../../utils/cookiesManager';
const { cif } = useCookies()

const idBiblioteca = window.history.state?.idBiblioteca;
const isEditMode = computed(() => !!props.idLibro)
const libro = ref<Libro | null>(null)
const bibliotecas = ref<Biblioteca[]>([])
const ejemplares = ref<Ejemplar[]>([])
const imageInput = ref<HTMLInputElement | null>(null)
const pdfInput = ref<HTMLInputElement | null>(null)
const imageFile = ref<File>();
const pdfFile = ref<File>();
const portada = ref('')
const nameFileImg = ref<string>('')
const isBase64 = ref<boolean>(false)
const previewPortada = ref<string>('')
const previewPdf = ref<string>('')

const form = ref<Partial<Libro>>({
  titulo: '',
  autor: '',
  anio: undefined,
  idioma: '',
  signatura_topografica: '',
  ejemplares: undefined,
  contenido_pdf: '',
  id_usuario: cif.value || 0, 
  id_biblioteca: 0 
})

onMounted(async () => {
  if (isEditMode.value && props.idLibro) {
    try {
      const data = await getLibroById(props.idLibro)
      libro.value = data
      if (data) {
        form.value = { ...data }
        previewPdf.value = data.contenido_pdf || ''
      }
      ejemplares.value = await getEjemplaresByLibroId(props.idLibro)
      // portada.value = ejemplares.value.find(e => e.portada)?.portada || 'ruta/portadas/bookCover.png'
      const disponibles = ejemplares.value.filter(ejemplar => ejemplar.estado === 'Disponible');
      // const cantidadDisponibles = disponibles.length;
      portada.value = disponibles[0]?.portada || '/ruta/portadas/bookCover.png';
      const dataB = await getBibliotecas()
      bibliotecas.value = dataB
    } catch (err) {
      console.error(err)
      Swal.fire('Error', 'No se pudo cargar la información del libro.', 'error')
    }
  } else {
    try {
      const data = await getBibliotecas()
      bibliotecas.value = data
      if(idBiblioteca)
        form.value.id_biblioteca = idBiblioteca
      portada.value = '/ruta/portadas/bookCover.png';
    } catch (err) {
      console.error(err)
      Swal.fire('Error', 'No se pudieron cargar las bibliotecas.', 'error')
    }
  }
})

const handlePdfChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !file.type.includes('pdf')) {
    Swal.fire('Archivo inválido', 'Solo se permiten archivos PDF.', 'warning')
    return
  }
  pdfFile.value = file
  
  // form.value.contenido_pdf = `ruta/pdfs/${file.name}`
  previewPdf.value = file.name
}

const onFileChanged = (event: Event) => {
  const input = event.target as HTMLInputElement
  const imgFile = input.files?.[0]
  if (!imgFile || !imgFile.type.startsWith('image/')) {
    Swal.fire('Archivo inválido', 'Solo se permiten imágenes.', 'warning')
    return
  }
  imageFile.value = imgFile 
  const reader = new FileReader()
  reader.onload = (event) => {
    const result = event.target?.result
    if (typeof result === 'string') {
      previewPortada.value = result
      isBase64.value = true

      nameFileImg.value = imgFile.name
    }
  }
  reader.onerror = (error) => {
    console.error('Error leyendo imagen:', error)
    Swal.fire('Error', 'No se pudo cargar la imagen.', 'error')
  }
  reader.readAsDataURL(imgFile)
}

const guardar = async () => {
  try {
    isBase64.value = false

    if (!form.value.titulo || !form.value.autor || !form.value.anio || !form.value.idioma) {
      Swal.fire('Campos incompletos', 'Llene todos los campos requeridos.', 'warning')
      return
    }

    if (isEditMode.value && props.idLibro) {
      await updateLibro(form.value, pdfFile.value as File)
      Swal.fire('Éxito', 'Libro actualizado correctamente.', 'success')
    } else {
      // await createLibro(form.value as Libro)
      await createLibroFile(form.value as Libro, imageFile.value as File, pdfFile.value as File)
      Swal.fire('Éxito', 'Libro creado correctamente.', 'success')
    }
    // router.push('/libros')
    router.go(-1)
  } catch (err) {
    console.error(err)
    Swal.fire('Error', 'No se pudo guardar el libro.', 'error')
  }
}

const volver = () => {
   router.go(-1)
}

</script>

<style scoped>
@import '../../../styles/tailwind.css';

.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

.form-control {
  @apply shadow appearance-none border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>

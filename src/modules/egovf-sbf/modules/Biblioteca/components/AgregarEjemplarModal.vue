<template>
  <CModal :visible="visible" @close="cerrar">
    <form @submit.prevent="guardar">
      <CModalHeader class="headercolor" dismiss @close="cerrar">
        <CModalTitle>
          <h4>{{ isEdit ? 'Editar Ejemplar' : 'Agregar Ejemplar' }}</h4>
        </CModalTitle>
      </CModalHeader>

      <CModalBody>
        <div class="mb-3">
          <label class="form-label">Estado</label>
          <select class="form-control" v-model="form.estado" required>
            <option value="">Seleccione</option>
            <option v-for="estado in estados" :key="estado.value" :value="estado.value">{{ estado.label }}</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Dirección</label>
          <input type="text" class="form-control" v-model="form.direccion" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Portada (Imagen)</label>
          <input type="file" class="form-control" accept="image/*" @change="handleFileChange" />
        </div>

        <div v-if="previewPortada" class="text-center">
          <p class="text-sm text-gray-500">Vista previa:</p>
          <!-- Previsualización de la imagen (base64) -->
          <img v-if="isBase64" :src="previewPortada" class="max-h-40 mx-auto rounded border" alt="Vista previa" />
          <!-- Imagen cargada en el servidor -->
          <img v-if="!isBase64" :src="`${form.portada}`" class="max-h-40 mx-auto rounded border" alt="Portada" />
          
        </div>
        <div class="mb-4">
          <label class="form-label">Contenido (PDF)</label>
          <input type="file" class="form-control" accept="application/pdf" @change="handlePdfChange" ref="pdfInput"/>
          <p v-if="previewPdf" class="text-sm mt-1 text-gray-500">Archivo seleccionado: {{ previewPdf }}</p>
        </div>

      </CModalBody>

      <CModalFooter>
        <CButton color="danger" class="text-white"  @click="cerrar">Cancelar</CButton>
        <CButton color="success" class="text-white" type="submit">{{ isEdit ? 'Actualizar' : 'Guardar' }}</CButton>
        <CButton v-if="props.ejemplarEditar?.contenido_pdf"
          @click="verPdf(props.ejemplarEditar)"
          class="bg-blue-600 tracking-wide text-white shadow-md transition hover:bg-blue-700 focus:outline-none">
          Ver PDF
        </CButton>
      </CModalFooter>
    </form>
  </CModal>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import Swal from 'sweetalert2'
import { type Ejemplar, EstadoEjemplar, createEjemplar, updateEjemplar, verPdf } from '../services/ejemplarService'

const previewPortada = ref<string>('')
const nameFileImg = ref<string>('')
const isBase64 = ref<boolean>(false)
const isEdit = ref<boolean>(false)
const imageFile = ref<File>();
const pdfFile = ref<File>();
const previewPdf = ref<string>('')

const props = defineProps<{
  visible: boolean
  idLibro: number
  portadaLibro?: string
  ejemplarEditar?: Ejemplar 
}>()
// const estados = Object.values(EstadoEjemplar).slice(0, -1);
const estados = Object.entries(EstadoEjemplar)
  .filter(([key, value]) => typeof value === 'number' && key !== 'SinEstado')
  .map(([key, value]) => ({ label: key, value }))

const emit = defineEmits(['close', 'ejemplarCreado'])

const form = ref<Partial<Ejemplar>>({
  estado: EstadoEjemplar.SinEstado,
  direccion: '',
  portada: '',
  contenido_pdf: '',
  id_libro: props.idLibro,
})

watch(() => props.visible, (newVal) => {
  if (newVal) {
    // console.log(props)
    if (props.ejemplarEditar) {
      // Si hay un ejemplar pasado como prop, significa que estamos editando
      isEdit.value = true
      form.value = {
        ...props.ejemplarEditar, // Cargar los datos del ejemplar
        id_libro: props.idLibro, // Asegurar que el id del libro sea el correcto
      }
      previewPortada.value = props.ejemplarEditar.portada || '/uploads/portadas/bookCover.png'
      previewPdf.value = props.ejemplarEditar.contenido_pdf;
    } else {
      // Si no hay ejemplar, estamos creando uno nuevo
      isEdit.value = false
      form.value = {
        estado: EstadoEjemplar.SinEstado,
        direccion: '',
        portada: props.portadaLibro || '',
        contenido_pdf: '',
        id_libro: props.idLibro,
      }
      previewPortada.value = props.portadaLibro || '/uploads/portadas/bookCover.png'
    }
  }
})
// Maneja la imagen seleccionada
const handleFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  if (!file.type.startsWith('image/')) {
    Swal.fire('Archivo inválido', 'Solo se permiten imágenes.', 'warning')
    return
  }
  imageFile.value = file 
  const reader = new FileReader()
  reader.onload = (event) => {
    const result = event.target?.result
    if (typeof result === 'string') {
      previewPortada.value = result
      form.value.portada = result
      isBase64.value = true
      nameFileImg.value = file.name
    }
  }

  reader.onerror = (error) => {
    console.error('Error leyendo el archivo:', error)
    Swal.fire('Error', 'No se pudo cargar la imagen.', 'error')
  }

  reader.readAsDataURL(file)
}

const handlePdfChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !file.type.includes('pdf')) {
    Swal.fire('Archivo inválido', 'Solo se permiten archivos PDF.', 'warning')
    return
  }
  pdfFile.value = file
  
  form.value.contenido_pdf = `nuevo`
  previewPdf.value = file.name
}

const cerrar = () => {
  isBase64.value = false
  nameFileImg.value = ''
  emit('close')
}

const guardar = async () => {
  if (!form.value.estado || !form.value.direccion) {
    Swal.fire('Campos incompletos', 'Debe llenar todos los campos obligatorios.', 'warning')
    return
  }
  try {
    form.value.portada = (isBase64.value) ? `/uploads/portadas/${nameFileImg.value}`: form.value.portada
    if (isEdit.value) {
      // Si es edición, actualizamos el ejemplar
      await updateEjemplar(form.value, imageFile.value as File, pdfFile.value)
      Swal.fire('Éxito', 'Ejemplar actualizado correctamente.', 'success')
    } else {
      // Si es creación, agregamos el ejemplar
      await createEjemplar(form.value, imageFile.value as File, pdfFile.value)
      Swal.fire('Éxito', 'Ejemplar agregado correctamente.', 'success')
    }
    pdfFile.value = undefined;
    imageFile.value = undefined;
    previewPdf.value = ''
    
    emit('ejemplarCreado')
    cerrar()
  } catch (error) {
    console.error(error)
    Swal.fire('Error', 'No se pudo agregar el ejemplar.', 'error')
  }
}
</script>

<template>
  <CModal :visible="visible" @close="cerrar">
    <form @submit.prevent="guardar">
      <CModalHeader class="headercolor" dismiss @close="cerrar">
        <CModalTitle>
          <h4>{{ isEdit ? 'Editar Libro' : 'Agregar Libro' }}</h4>
        </CModalTitle>
      </CModalHeader>

      <CModalBody>
        <div class="mb-3">
          <label class="form-label">Título</label>
          <input type="text" class="form-control" v-model="form.titulo" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Autor</label>
          <input type="text" class="form-control" v-model="form.autor" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Año</label>
          <input type="number" class="form-control" v-model.number="form.anio" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Idioma</label>
          <select class="form-control" v-model="form.idioma" required>
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
          <input type="text" class="form-control" v-model="form.signatura_topografica" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Número de Ejemplares</label>
          <input type="number" class="form-control" v-model.number="form.ejemplares" min="0" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Contenido (PDF)</label>
          <input type="file" class="form-control" accept="application/pdf" @change="handleFileChange" />
        </div>

        <div v-if="previewPdf" class="text-center">
          <p class="text-sm text-gray-500">Archivo seleccionado: {{ previewPdf }}</p>
        </div>
      </CModalBody>

      <CModalFooter>
        <CButton color="danger" @click="cerrar">Cancelar</CButton>
        <CButton color="success" type="submit">{{ isEdit ? 'Actualizar' : 'Guardar' }}</CButton>
      </CModalFooter>
    </form>
  </CModal>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import Swal from 'sweetalert2'
import { type Libro, createLibro, updateLibro } from '../services/libroService'

const previewPdf = ref<string>('')
const isEdit = ref<boolean>(false)

const props = defineProps<{
  visible: boolean
  id_usuario?: number
  id_biblioteca: number
  libroEditar?: Libro
}>()

const emit = defineEmits(['close', 'libroCreado'])

const form = ref<Partial<Libro>>({
  titulo: '',
  autor: '',
  anio: 0,
  idioma: '',
  signatura_topografica: '',
  ejemplares: 0,
  contenido_pdf: '',
  id_usuario: props.id_usuario,
  id_biblioteca: props.id_biblioteca,
})

watch(() => props.visible, (newVal) => {
  if (newVal) {
    if (props.libroEditar) {
      // Editing mode
      isEdit.value = true
      form.value = {
        ...props.libroEditar,
        id_usuario: props.id_usuario,
        id_biblioteca: props.id_biblioteca,
      }
      previewPdf.value = props.libroEditar.contenido_pdf || ''
    } else {
      // Creation mode
      isEdit.value = false
      form.value = {
        titulo: '',
        autor: '',
        anio: 0,
        idioma: '',
        signatura_topografica: '',
        ejemplares: 0,
        contenido_pdf: '',
        id_usuario: props.id_usuario,
        id_biblioteca: props.id_biblioteca,
      }
      previewPdf.value = ''
    }
  }
})

const handleFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  if (!file.type.startsWith('application/pdf')) {
    Swal.fire('Archivo inválido', 'Solo se permiten archivos PDF.', 'warning')
    return
  }

  const reader = new FileReader()
  reader.onload = (event) => {
    const result = event.target?.result
    if (typeof result === 'string') {
      form.value.contenido_pdf = `ruta/pdfs/${file.name}`
      previewPdf.value = file.name
    }
  }

  reader.onerror = (error) => {
    console.error('Error leyendo el archivo:', error)
    Swal.fire('Error', 'No se pudo cargar el archivo PDF.', 'error')
  }

  reader.readAsDataURL(file)
}

const cerrar = () => {
  previewPdf.value = ''
  emit('close')
}

const guardar = async () => {
  if (!form.value.titulo || !form.value.autor || !form.value.anio || !form.value.idioma || !form.value.signatura_topografica || form.value.ejemplares === undefined) {
    Swal.fire('Campos incompletos', 'Debe llenar todos los campos obligatorios.', 'warning')
    return
  }

  try {
    if (isEdit.value) {
      await updateLibro(form.value)
      Swal.fire('Éxito', 'Libro actualizado correctamente.', 'success')
    } else {
      await createLibro(form.value)
      Swal.fire('Éxito', 'Libro agregado correctamente.', 'success')
    }

    emit('libroCreado')
    cerrar()
  } catch (error) {
    console.error(error)
    Swal.fire('Error', 'No se pudo guardar el libro.', 'error')
  }
}
</script>
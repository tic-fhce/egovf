<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor">
          <CRow>
            <CCol :lg="6">{{ titulo }}</CCol>
            <CCol :lg="6" class="text-end">
              <CButton @click="abrirModal(true)" color="success" class="font" size="sm">
                <CIcon icon="cil-book" class="me-2" />Agregar Libro
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <div class="table-responsive">
            <table v-if="tablaCargada" id="librosTabla" class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Nro.</th>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Año</th>
                  <th>Idioma</th>
                  <th>Ejemplares</th>
                  <th>Biblioteca</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(libro, index) in libros" :key="libro.id_libro">
                  <td>{{ index + 1 }}</td>
                  <td>{{ libro.titulo }}</td>
                  <td>{{ libro.autor }}</td>
                  <td>{{ libro.anio }}</td>
                  <td>{{ libro.idioma }}</td>
                  <td>{{ libro.ejemplares }}</td>
                  <td>{{ getNombreBiblioteca(libro.id_biblioteca) }}</td>
                  <td>
                    <CButton class="font me-1" color="warning" size="sm" @click="editarLibro(libro)">
                      <CIcon icon="cil-pencil" class="me-1" />Editar
                    </CButton>
                    <CButton class="font" color="danger" size="sm" @click="eliminarLibro(libro.id_libro)">
                      <CIcon icon="cil-trash" class="me-1" />Eliminar
                    </CButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>

  <!-- Modal Libro -->
  <CModal :visible="modalVisible" @close="abrirModal(false)">
    <form @submit.prevent="guardarLibro">
      <CModalHeader class="headercolor" dismiss @close="abrirModal(false)">
        <CModalTitle>
          <h4><CIcon icon="cil-book" size="xl" /> {{ esEdicion ? 'Editar' : 'Agregar' }} Libro</h4>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="mb-3 row" v-for="(label, field) in camposFormulario" :key="field">
          <label class="col-4 col-form-label">{{ label }}</label>
          <div class="col-8">
            <input
              v-if="field !== 'id_biblioteca' && field !== 'contenido_pdf'"
              :type="field === 'anio' || field === 'ejemplares' ? 'number' : 'text'"
              class="form-control"
              v-model="libroForm[field]"
              :required="field !== 'contenido_pdf'"
            />
            <textarea
              v-else-if="field === 'contenido_pdf'"
              class="form-control"
              v-model="libroForm.contenido_pdf"
              rows="3"
              placeholder="Contenido PDF (URL o base64)"
            ></textarea>
            <select v-else class="form-control" v-model="libroForm.id_biblioteca" required>
              <option disabled value="">Seleccione una biblioteca</option>
              <option v-for="biblio in bibliotecas" :key="biblio.id_biblioteca" :value="biblio.id_biblioteca">
                {{ biblio.nombre }}
              </option>
            </select>
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton @click="abrirModal(false)" color="danger" class="font">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <button class="btn btn-success font">
          <CIcon icon="cil-book" class="me-2" />{{ btnEdit }}
        </button>
      </CModalFooter>
    </form>
  </CModal>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'
import {
  Libro, getLibros, createLibro,
  updateLibro, deleteLibro
} from '../services/libroService'
import { Biblioteca, getBibliotecas } from '../../Biblioteca/services/bibliotecaService'
import Swal from 'sweetalert2'

import $ from 'jquery'
import 'datatables.net'

const titulo = 'Gestión de Libros'

const libros = ref<Libro[]>([])
const bibliotecas = ref<Biblioteca[]>([])
const modalVisible = ref(false)
const esEdicion = ref(false)
const btnEdit = ref('Agregar')
const tablaCargada = ref(false)

type LibroFormFields = {
  [key: string]: string | number
}

const libroForm = ref<LibroFormFields>({
  id_libro: 0,
  titulo: '',
  autor: '',
  anio: new Date().getFullYear(),
  idioma: '',
  signatura_topografica: '',
  ejemplares: 1,
  contenido_pdf: '',
  id_usuario: 0, // Aquí puedes setear según tu lógica de usuario
  id_biblioteca: 0,
})

const camposFormulario: Record<string, string> = {
  titulo: 'Título',
  autor: 'Autor',
  anio: 'Año',
  idioma: 'Idioma',
  signatura_topografica: 'Signatura Topográfica',
  ejemplares: 'Ejemplares',
  contenido_pdf: 'Contenido PDF',
  id_biblioteca: 'Biblioteca'
}

onMounted(async () => {
  await cargarDatos()
})

async function cargarDatos() {
  try {
    destruirDataTable()
    tablaCargada.value = false
    libros.value = await getLibros()
    bibliotecas.value = await getBibliotecas()
    await nextTick()
    tablaCargada.value = true
    await nextTick()
    inicializarDataTable()
  } catch (error) {
    console.error('Error al obtener libros:', error)
  }
}

const getNombreBiblioteca = (id: number) => {
  const biblio = bibliotecas.value.find(b => b.id_biblioteca === id)
  return biblio ? biblio.nombre : 'N/D'
}

const inicializarDataTable = () => {
  const tableEl = document.getElementById('librosTabla')
  if (!tableEl) return
  $('#librosTabla').DataTable({ destroy: true })
}

const destruirDataTable = () => {
  const table = $('#librosTabla').DataTable()
  if (table) table.destroy()
}

function abrirModal(estado: boolean) {
  modalVisible.value = estado
  if (!estado) {
    libroForm.value = {
      id_libro: 0,
      titulo: '',
      autor: '',
      anio: new Date().getFullYear(),
      idioma: '',
      signatura_topografica: '',
      ejemplares: 1,
      contenido_pdf: '',
      id_usuario: 0,
      id_biblioteca: 0
    }
    esEdicion.value = false
    btnEdit.value = 'Agregar'
  }
}

function editarLibro(libro: Libro) {
  libroForm.value = { ...libro }
  esEdicion.value = true
  btnEdit.value = 'Actualizar'
  abrirModal(true)
}

const eliminarLibro = async (id_libro: number) => {
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
    await deleteLibro(id_libro)
    libros.value = libros.value.filter(l => l.id_libro !== id_libro)
    showToast('success', 'Libro eliminado correctamente')
    await cargarDatos()
  } catch {
    showToast('error', 'Error al eliminar el libro')
  }
}

const guardarLibro = async () => {
  try {
    if (esEdicion.value) {
      await updateLibro(libroForm.value)
      showToast('success', 'Libro actualizado correctamente')
    } else {
      await createLibro(libroForm.value)
      showToast('success', 'Libro agregado correctamente')
    }
    abrirModal(false)
    await cargarDatos()
  } catch (error) {
    console.error(error)
    showToast('error', 'Error al guardar el libro')
  }
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

<style scoped>
@import 'datatables.net-dt';
@import '../../../styles/tailwind.css';
</style>

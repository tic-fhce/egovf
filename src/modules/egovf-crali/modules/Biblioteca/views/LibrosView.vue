<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor">
          <CRow>
            <CCol :lg="6">{{ titulo }}</CCol>
            <CCol :lg="6" class="text-end">
              <CButton @click="crearLibro" color="success" class="font" size="sm">
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
                    <CButton class="font me-1" color="info" size="sm" @click="verDetalles(libro)">
                      <CIcon icon="cil-magnifying-glass" class="me-1" />Detalles
                    </CButton>
                    <CButton v-if="libro?.contenido_pdf" class="font me-1" color="success" size="sm" @click="verPdf(libro)">
                      <CIcon icon="cil-file" class="me-1" />Ver PDF
                    </CButton>
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

</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import {
  Libro, getLibros, deleteLibro
} from '../services/libroService'
import { Biblioteca, getBibliotecas } from '../services/bibliotecaService'
import Swal from 'sweetalert2'

import $ from 'jquery'
import 'datatables.net'
import { API_URL_EGOVF_SBF_FL } from '@/env'

const router = useRouter()

const titulo = 'Gestión de Libros'

const libros = ref<Libro[]>([])
const bibliotecas = ref<Biblioteca[]>([])
const tablaCargada = ref(false)

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

const crearLibro = () => {
  router.push({
    name: 'libro',
    params: { idLibro: 0 },

  })
}

const verDetalles = (libro: Libro) => {

  router.push({
    name: 'DetallesLibro',
    params: { idLibro: libro.id_libro},
  })

}

function editarLibro(libro: Libro) {
   router.push({
    name: 'libro',
    params: { idLibro: libro.id_libro},
  })
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
const verPdf = (libro: Libro) => {
  if (libro?.contenido_pdf) {
    const fullUrl = libro?.contenido_pdf.startsWith('http')
    ? libro?.contenido_pdf
    : `${API_URL_EGOVF_SBF_FL}${libro?.contenido_pdf.startsWith('/') ? '' : '/'}${libro.contenido_pdf}`
    window.open(fullUrl, '_blank')
  } else {
    Swal.fire('Sin PDF', 'Este libro no tiene un PDF disponible.', 'info')
  }
}

</script>

<style scoped>
@import 'datatables.net-dt';
@import '../../../styles/tailwind.css';
</style>

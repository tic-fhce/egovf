<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor">
          <CRow>
            <CCol :lg="6">{{ titulo }}</CCol>
            <CCol :lg="6" class="text-end">
              <CButton v-if="isAdmin" title="Agregar Libro" @click="crearLibro" color="success" class="font" size="sm">
                <!-- <CIcon icon="cil-book" class="me-2" />Agregar Libro -->
                <AddIcon class="w-6 h-6" />
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
                    <CButton title="Detalles" class="font me-1" color="info" size="sm" @click="verDetalles(libro)">
                      <!-- <CIcon icon="cil-magnifying-glass" class="me-1" />Detalles -->
                      <VerIcon class="w-6 h-6" />
                    </CButton>
                    <CButton v-if="isAdmin" title="Ver Pdf" class="font me-1" color="secondary" size="sm"
                      @click="viewPdf(libro)">
                      <!-- <CIcon icon="cil-file" class="me-1" />Ver PDF -->
                      <PdfIcon class="w-6 h-6" />
                    </CButton>
                    <template v-if="isAdmin">
                      <CButton title="Editar Libro" class="font me-1" color="warning" size="sm"
                        @click="editarLibro(libro)">
                        <!-- <CIcon icon="cil-pencil" class="me-1" />Editar -->
                        <EditIcon class="w-6 h-6" />
                      </CButton>
                      <CButton title="Eliminar Libro" class="font" color="danger" size="sm"
                        @click="eliminarLibro(libro.id_libro)">
                        <!-- <CIcon icon="cil-trash" class="me-1" />Eliminar -->
                        <DeleteIcon class="w-6 h-6" />
                      </CButton>
                    </template>
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
  Libro, getLibros, deleteLibro,
  getLibrosByIdBiblioteca
} from '../services/libroService'
import { Biblioteca, getBibliotecaByUser, getBibliotecas } from '../services/bibliotecaService'
import Swal from 'sweetalert2'

import $ from 'jquery'
import 'datatables.net'

const router = useRouter()
import { useCookies } from '../../../utils/cookiesManager';
import { AddIcon, DeleteIcon, EditIcon, PdfIcon, VerIcon } from '../../components'
import { Ejemplar, EstadoEjemplar, getEjemplaresByLibroId, verPdf } from '../services/ejemplarService'
const { isAdmin, isSuperAdmin, isLector, cif } = useCookies()
const titulo = 'Gestión de Libros'

const libros = ref<Libro[]>([])
const bibliotecas = ref<Biblioteca[]>([])
const ejemplar = ref<Ejemplar | null>(null)
const tablaCargada = ref(false)

onMounted(async () => {
  await cargarDatos()
})

async function cargarDatos() {
  try {
    destruirDataTable()
    tablaCargada.value = false
    let dataLibro: Libro[] = [];
    let dataBibliotecas: Biblioteca[] = [];
    if (isSuperAdmin.value || isLector.value) {   
      [dataLibro, dataBibliotecas] = await Promise.all([
        getLibros(),
        getBibliotecas(),
      ]);
    }else{
      const dataBibliotecas = await getBibliotecaByUser(+cif.value);
        if (dataBibliotecas.length > 0) {
        const librosPorBiblioteca = await Promise.all(
          dataBibliotecas.map(b => getLibrosByIdBiblioteca(b.id_biblioteca))
        );
        dataLibro = librosPorBiblioteca.flat();
      }
    }

    libros.value = dataLibro
    bibliotecas.value = dataBibliotecas

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
    params: { idLibro: libro.id_libro },
  })

}

function editarLibro(libro: Libro) {
  router.push({
    name: 'libro',
    params: { idLibro: libro.id_libro },
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
const viewPdf = async (libro: Libro) => {
  const EjemplarData = await getEjemplaresByLibroId(libro.id_libro);
  if (EjemplarData.length < 0) return

  EjemplarData.forEach(ej => {
    ej.estado = Number(ej.estado)
  })
  const estadosPermitidos = [EstadoEjemplar.Disponible, EstadoEjemplar.Prestado];

  const ejemplarDisponible = EjemplarData.find(
    e =>
      estadosPermitidos.includes(e.estado) &&
      e.contenido_pdf && e.contenido_pdf.trim() !== ""
  ) || null;

  ejemplar.value = ejemplarDisponible;
  verPdf(ejemplar.value!);

}

</script>

<style scoped>
@import 'datatables.net-dt';
@import '../../../styles/tailwind.css';
</style>

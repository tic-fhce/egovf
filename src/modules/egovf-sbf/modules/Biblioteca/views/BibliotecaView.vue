<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor">
          <CRow>
            <CCol :lg="6">{{ titulo }}</CCol>
            <CCol :lg="6" class="text-end">
              <CButton v-if="isAdmin" @click="abrirModal(true)" color="success" class="font" size="sm">
                <CIcon icon="cil-library" class="me-2" />Agregar Biblioteca
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <div class="table-responsive">
            <table v-if="tablaCargada" id="bibliotecasTabla" class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Nro.</th>
                  <th>Nombre</th>
                  <th>Dirección</th>
                  <th>Horario</th>
                  <th>Facultad</th>
                  <th v-if="isAdmin">Nro. Libros</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(biblio, index) in bibliotecas" :key="biblio.id_biblioteca">
                  <td>{{ index + 1 }}</td>
                  <td>{{ biblio.nombre }}</td>
                  <td>{{ biblio.direccion }}</td>
                  <td>{{ biblio.horario_atencion }}</td>
                  <td>{{ getNombreFacultad(biblio.id_facultad) }}</td>
                  <td v-if="isAdmin">{{ numerosLibros[biblio.id_biblioteca] || 0 }}</td>
                  <td>
                    <CButton v-if="numerosLibros[biblio.id_biblioteca]" class="font me-1" color="info" size="sm" @click="verLibros(biblio)">
                      <CIcon icon="cil-magnifying-glass" class="me-1" />Ver Libros
                    </CButton>
                    <template v-if="isAdmin">
                      <CButton class="font me-1" color="warning" size="sm" @click="editarBiblioteca(biblio)">
                        <CIcon icon="cil-pencil" class="me-1" />Editar
                      </CButton>
                      <CButton class="font" color="danger" size="sm" @click="eliminarBiblioteca(biblio.id_biblioteca)">
                        <CIcon icon="cil-trash" class="me-1" />Eliminar
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

  <!-- Modal Biblioteca -->
  <CModal :visible="modalVisible" @close="abrirModal(false)">
    <form @submit.prevent="guardarBiblioteca">
      <CModalHeader class="headercolor" dismiss @close="abrirModal(false)">
        <CModalTitle>
          <h4><CIcon icon="cil-library" size="xl" /> {{ esEdicion ? 'Editar' : 'Agregar' }} Biblioteca</h4>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="mb-3 row" v-for="(label, field) in camposFormulario" :key="field">
          <label class="col-4 col-form-label">{{ label }}</label>
          <div class="col-8">
            <input
              v-if="field !== 'id_facultad'"
              type="text"
              class="form-control"
              v-model="bibliotecaForm[field]"
              required
            />
            <select v-else class="form-control" v-model="bibliotecaForm.id_facultad" required>
              <option disabled value="">Seleccione una facultad</option>
              <option v-for="facu in facultades" :key="facu.id_facultad" :value="facu.id_facultad">
                {{ facu.nombre }}
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
          <CIcon icon="cil-library" class="me-2" />{{ btnEdit }}
        </button>
      </CModalFooter>
    </form>
  </CModal>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'
import {
  Biblioteca, getBibliotecas, createBiblioteca,
  updateBiblioteca, deleteBiblioteca
} from '../services/bibliotecaService'
import { Facultad, getFacultades } from '../../Facultad/services/facultadService'
import Swal from 'sweetalert2'

import $ from 'jquery'
import 'datatables.net'
import { getLibrosByIdBiblioteca } from '../services/libroService'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useCookies } from '../../../utils/cookiesManager';
const { isAdmin } = useCookies()

const titulo = 'Gestión de Bibliotecas'

const bibliotecas = ref<Biblioteca[]>([])
const numerosLibros = ref<Record<number, number>>({}) 
const facultades = ref<Facultad[]>([])
const modalVisible = ref(false)
const esEdicion = ref(false)
const btnEdit = ref('Agregar')
const tablaCargada = ref(false)

type BibliotecaFormFields = {
  [key: string]: string | number
}
const bibliotecaForm = ref<BibliotecaFormFields>({
  id_biblioteca: 0,
  nombre: '',
  direccion: '',
  latitud: 0,
  longitud: 0,
  horario_atencion: '',
  id_facultad: 0,
})

const camposFormulario: Record<string, string> = {
  nombre: 'Nombre',
  direccion: 'Dirección',
  horario_atencion: 'Horario de Atención',
  latitud: 'Latitud',
  longitud: 'Longitud',
  id_facultad: 'Facultad'
}

onMounted(async () => {
  await cargarDatos()
})

async function cargarDatos() {
  try {
    destruirDataTable()
    tablaCargada.value = false 
    bibliotecas.value = await getBibliotecas()
    for (const biblio of bibliotecas.value) {
      numerosLibros.value[biblio.id_biblioteca] = await getNroLibros(biblio.id_biblioteca)
    }

    facultades.value = await getFacultades()
    await nextTick()

    tablaCargada.value = true 
    await nextTick()
    inicializarDataTable()
  } catch (error) {
    console.error('Error al obtener bibliotecas:', error)
  }
}

const getNroLibros = async(id: number) =>{
  const data = await getLibrosByIdBiblioteca(id);
  return data.length;
}

const getNombreFacultad = (id: number) => {
  const facultad = facultades.value.find(f => f.id_facultad === id)
  return facultad ? facultad.nombre : 'N/D'
}

const inicializarDataTable = () => {
  const tableEl = document.getElementById('bibliotecasTabla')
  if (!tableEl) return 
  $('#bibliotecasTabla').DataTable({ destroy: true })
}

const destruirDataTable = () => {
  const table = $('#bibliotecasTabla').DataTable()
  if (table) table.destroy()
}

function abrirModal(estado: boolean) {
  modalVisible.value = estado
  if (!estado) {
    bibliotecaForm.value = {
      id_biblioteca: 0,
      nombre: '',
      direccion: '',
      latitud: 0,
      longitud: 0,
      horario_atencion: '',
      id_facultad: 0
    }
    esEdicion.value = false
    btnEdit.value = 'Agregar'
  }
}

const verLibros = (biblioteca: Biblioteca) => {
  router.push({
    name: 'DetallesBiblioteca',
    params: { idBiblioteca: biblioteca.id_biblioteca},
  })
}

function editarBiblioteca(biblio: Biblioteca) {
  bibliotecaForm.value = { ...biblio }
  esEdicion.value = true
  btnEdit.value = 'Actualizar'
  abrirModal(true)
}

const eliminarBiblioteca = async (id_biblioteca: number) => {
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
    await deleteBiblioteca(id_biblioteca)
    bibliotecas.value = bibliotecas.value.filter(b => b.id_biblioteca !== id_biblioteca)
    showToast('success', 'Biblioteca eliminada correctamente')
    await cargarDatos()
    // location.reload()
  } catch {
    showToast('error', 'Error al eliminar la biblioteca')
  }
}

const guardarBiblioteca = async () => {
  try {
    if (esEdicion.value) {
      await updateBiblioteca(bibliotecaForm.value)
      showToast('success', 'Biblioteca actualizada correctamente')
    } else {
      await createBiblioteca(bibliotecaForm.value)
      showToast('success', 'Biblioteca agregada correctamente')
    }
    abrirModal(false)
    await cargarDatos()
    // location.reload()
  } catch(error) {
    console.log(error)
    showToast('error', 'Error al guardar la biblioteca')
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

<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor">
          <CRow>
            <CCol :lg="6">{{ titulo }}</CCol>
            <CCol :lg="6" class="text-end">
              <CButton @click="abrirModal(true)" color="success" class="font" size="sm">
                <CIcon icon="cil-library" class="me-2" />Agregar Unidad
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <div class="table-responsive">
            <table id="unidadesTabla" class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Nro.</th>
                  <th>Nombre</th>
                  <th>Facultad</th>
                  <th>Tipo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(unidad, index) in unidades" :key="unidad.id_unidad">
                  <td>{{ index + 1 }}</td>
                  <td>{{ unidad.nombre }}</td>
                  <td>{{ obtenerNombreFacultad(unidad.id_facultad) }}</td>
                  <td>{{ unidad.tipo }}</td>
                  <td>
                    <CButton class="font me-1" color="warning" size="sm" @click="editarUnidad(unidad)">
                      <CIcon icon="cil-pencil" class="me-1" /> Editar
                    </CButton>
                    <CButton class="font" color="danger" size="sm" @click="eliminarUnidad(unidad.id_unidad)">
                      <CIcon icon="cil-trash" class="me-1" /> Eliminar
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

  <!-- Modal Unidad -->
  <CModal :visible="modalVisible" @close="abrirModal(false)">
    <form @submit.prevent="guardarUnidad">
      <CModalHeader class="headercolor" dismiss @close="abrirModal(false)">
        <CModalTitle>
          <h4>
            <CIcon icon="cil-library" size="xl" /> {{ esEdicion ? 'Editar Unidad' : 'Agregar Nueva Unidad' }}
          </h4>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="mb-3 row">
          <label for="nombre" class="col-4 col-form-label">Nombre</label>
          <div class="col-8">
            <input
              type="text"
              class="form-control"
              v-model="unidadForm.nombre"
              required
              placeholder="Nombre de la unidad"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="facultad" class="col-4 col-form-label">Facultad</label>
          <div class="col-8">
            <select v-model="unidadForm.id_facultad" class="form-select" required>
              <option value="" disabled>Seleccione facultad</option>
              <option v-for="facultad in facultades" :key="facultad.id_facultad" :value="facultad.id_facultad">
                {{ facultad.nombre }}
              </option>
            </select>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="tipo" class="col-4 col-form-label">Tipo</label>
          <div class="col-8">
            <select v-model="unidadForm.tipo" class="form-select" required>
              <option value="" disabled>Seleccione tipo</option>
              <option value="Carrera">Carrera</option>
              <option value="Instituto">Instituto</option>
              <option value="Centro">Centro</option>
              <option value="Laboratorio">Laboratorio</option>
              <!-- Agrega otros tipos que uses -->
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
import { ref, onMounted } from 'vue'
import {
  Unidad, getUnidades, createUnidad,
  updatedUnidad, deleteUnidad
} from '../service/unidadService'
import { Facultad, getFacultades } from '../../Facultad/services/facultadService'
import Swal from 'sweetalert2'

const titulo = 'Gestión de Unidades'

const unidades = ref<Unidad[]>([])
const facultades = ref<Facultad[]>([])
const modalVisible = ref(false)
const esEdicion = ref(false)
const btnEdit = ref('Agregar')

const unidadForm = ref<Unidad>({
  id_unidad: 0,
  id_facultad: 0,
  nombre: '',
  tipo: ''
})

onMounted(async () => {
  await cargarDatos()
})

async function cargarDatos() {
  try {
    facultades.value = await getFacultades()
    unidades.value = await getUnidades()
  } catch (error) {
    console.error('Error al cargar datos:', error)
  }
}

function abrirModal(estado: boolean) {
  modalVisible.value = estado
  if (!estado) {
    unidadForm.value = {
      id_unidad: 0,
      id_facultad: 0,
      nombre: '',
      tipo: ''
    }
    esEdicion.value = false
    btnEdit.value = 'Agregar'
  }
}

function editarUnidad(unidad: Unidad) {
  unidadForm.value = { ...unidad }
  esEdicion.value = true
  btnEdit.value = 'Actualizar'
  abrirModal(true)
}

const eliminarUnidad = async (id_unidad: number) => {
  const confirm = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton:
        'bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition mr-5',
      cancelButton:
        'bg-gray-700 text-black px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition'
    },
    buttonsStyling: false
  })

  if (!confirm.isConfirmed) return

  try {
    await deleteUnidad(id_unidad)
    unidades.value = unidades.value.filter(u => u.id_unidad !== id_unidad)
    showToast('success', 'Unidad eliminada correctamente')
  } catch (error) {
    showToast('error', 'Error al eliminar la unidad')
  }
}

const guardarUnidad = async () => {
  if (esEdicion.value) {
    await updatedUnidad(unidadForm.value)
    showToast('success', 'Unidad actualizada correctamente')
  } else {
    await createUnidad(unidadForm.value)
    showToast('success', 'Unidad agregada correctamente')
  }
  await cargarDatos()
  abrirModal(false)
}

const showToast = (icon: 'success' | 'error' | 'info' | 'warning', message: string) => {
  Swal.fire({
    icon,
    title: message,
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: 'top-end'
  })
}

// Función para obtener nombre de facultad por id
function obtenerNombreFacultad(id_facultad: number): string {
  const facultad = facultades.value.find(f => f.id_facultad === id_facultad)
  return facultad ? facultad.nombre : 'Desconocida'
}
</script>

<style scoped>
@import 'datatables.net-dt';
@import '../../../styles/tailwind.css';
</style>

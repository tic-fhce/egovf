<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor">
          <CRow>
            <CCol :lg="6">{{ titulo }}</CCol>
            <CCol :lg="6" class="text-end">
              <CButton @click="abrirModal(true)" color="success" class="font" size="sm">
                <CIcon icon="cil-library" class="me-2" />Agregar Facultad
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <div class="table-responsive">
            <table id="facultadesTabla" class="table table-striped table-hover">
              <thead>
                <tr>
                  <!-- <th>ID</th> -->
                  <th>Nro.</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(facultad, index) in facultades" :key="facultad.id_facultad">
                  <!-- <td>{{ facultad.id_facultad }}</td> -->
                  <td>{{ index+1 }}</td>
                  <td>{{ facultad.nombre }}</td>
                  <td>
                    <CButton class="font me-1" color="warning" size="sm" @click="editarFacultad(facultad)">
                      <CIcon icon="cil-pencil" class="me-1" /> Editar
                    </CButton>
                    <CButton class="font" color="danger" size="sm" @click="eliminarFacultad(facultad.id_facultad)">
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

  <!-- Modal Facultad -->
  <CModal :visible="modalVisible" @close="abrirModal(false)">
    <form @submit.prevent="guardarFacultad">
      <CModalHeader class="headercolor" dismiss @close="abrirModal(false)">
        <CModalTitle>
          <h4>
            <CIcon icon="cil-library" size="xl" /> Agregar Nueva Facultad
          </h4>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="mb-3 row">
          <label for="nombre" class="col-4 col-form-label">Nombre</label>
          <div class="col-8">
            <input type="text" class="form-control" v-model="facultadForm.nombre" required
              placeholder="Nombre de la facultad" />
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
import { ref, onMounted, nextTick  } from 'vue'
import {
  Facultad, getFacultades, createFacultad,
  updatedFacultad, deleteFacultad
} from '../services/facultadService'
import Swal from 'sweetalert2'

// DataTables y jQuery
import $ from 'jquery'
import 'datatables.net'

const titulo = 'Gestión de Facultades'

const facultades = ref<Facultad[]>([])
const modalVisible = ref(false)
const esEdicion = ref(false)
const btnEdit = ref('Agregar')

const facultadForm = ref<Facultad>({
  id_facultad: 0,
  nombre: '',
})

// Cargar datos al montar el componente
onMounted(async () => {
  await cargarFacultades()
})

async function cargarFacultades() {
  try {
    facultades.value = await getFacultades()
    await nextTick() // Espera al DOM
    destruirDataTable()
    inicializarDataTable()
  } catch (error) {
    console.error('Error al obtener facultades:', error)
  }
}

const inicializarDataTable = () => {
  $('#facultadesTabla').DataTable({
    destroy: true,
  })
}

const destruirDataTable =() => {
  const table = $('#facultadesTabla').DataTable()
  if (table) {
    table.destroy()
  }
}

function abrirModal(estado: boolean) {
  modalVisible.value = estado
  if (!estado) {
    facultadForm.value = { id_facultad: 0, nombre: '' }
    esEdicion.value = false
    btnEdit.value = 'Agregar'
  }
}

function editarFacultad(facultad: Facultad) {
  facultadForm.value = { ...facultad }
  esEdicion.value = true
  btnEdit.value = 'Actualizar'
  abrirModal(true)
}

const eliminarFacultad = async(id_facultad: number) => {
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
    await deleteFacultad(id_facultad)
    facultades.value = facultades.value.filter(f => f.id_facultad !== id_facultad)
    showToast('success', 'Facultad eliminada correctamente')
    await cargarFacultades();
    location.reload()
  } catch (error) {
    showToast('error', 'Error al eliminar la facultad')
  }
}
const guardarFacultad = async () => {
  if (esEdicion.value) {
    await updatedFacultad(facultadForm.value);
    showToast('success', 'Facultad actualizada correctamente')
  } else {
    await createFacultad(facultadForm.value);
    showToast('success', 'Facultad agregada correctamente')
  }
  abrirModal(false)
  await cargarFacultades();
  location.reload()
}

const showToast = (icon: 'success' | 'error' | 'info' | 'warning', message: string) => {
  Swal.fire({
    icon,
    title: message,
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: 'top-end',
  })
}

</script>

<style scoped>
@import 'datatables.net-dt';
@import '../../../styles/tailwind.css';
</style>

<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor">
          <CRow>
            <CCol :lg="6">{{ titulo }}</CCol>
            <CCol :lg="6" class="text-end">
              <CButton @click="abrirModal(true)" color="success" class="font" size="sm">
                <CIcon icon="cil-user" class="me-2" />Agregar Lector
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <div class="table-responsive">
            <table v-if="tablaCargada" id="lectoresTabla" class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Nro.</th>
                  <th>Nombre Completo</th>
                  <th>CI</th>
                  <th>RU</th>
                  <th>Celular</th>
                  <th>Carrera</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(lector, index) in lectores" :key="lector.id_lector">
                  <td>{{ index + 1 }}</td>
                  <td>{{ lector.nombre }} {{ lector.apellido_pat }} {{ lector.apellido_mat }}</td>
                  <td>{{ lector.ci }}</td>
                  <td>{{ lector.ru }}</td>
                  <td>{{ lector.celular }}</td>
                  <td>{{ lector.carrera }}</td>
                  <td>
                    <CButton class="font me-1" color="warning" size="sm" @click="editarLector(lector)">
                      <CIcon icon="cil-pencil" class="me-1" /> Editar
                    </CButton>
                    <CButton class="font" color="danger" size="sm" @click="eliminarLector(lector.id_lector)">
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

  <!-- Modal Lector -->
  <CModal :visible="modalVisible" @close="abrirModal(false)">
    <form @submit.prevent="guardarLector">
      <CModalHeader class="headercolor" dismiss @close="abrirModal(false)">
        <CModalTitle>
          <h4>
            <CIcon icon="cil-user" size="xl" /> {{ esEdicion ? 'Editar Lector' : 'Agregar Nuevo Lector' }}
          </h4>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="mb-3 row">
          <label class="col-4 col-form-label">Nombre</label>
          <div class="col-8">
            <input type="text" class="form-control" v-model="lectorForm.nombre" required placeholder="Nombre" />
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-4 col-form-label">Apellido Paterno</label>
          <div class="col-8">
            <input type="text" class="form-control" v-model="lectorForm.apellido_pat" required placeholder="Apellido Paterno" />
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-4 col-form-label">Apellido Materno</label>
          <div class="col-8">
            <input type="text" class="form-control" v-model="lectorForm.apellido_mat" required placeholder="Apellido Materno" />
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-4 col-form-label">CI</label>
          <div class="col-8">
            <input type="number" class="form-control" v-model.number="lectorForm.ci" required placeholder="Carnet de Identidad" />
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-4 col-form-label">RU</label>
          <div class="col-8">
            <input type="number" class="form-control" v-model.number="lectorForm.ru" required placeholder="Registro Único" />
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-4 col-form-label">Dirección</label>
          <div class="col-8">
            <input type="text" class="form-control" v-model="lectorForm.direccion" required placeholder="Dirección" />
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-4 col-form-label">Celular</label>
          <div class="col-8">
            <input type="number" class="form-control" v-model.number="lectorForm.celular" required placeholder="Celular" />
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-4 col-form-label">Carrera</label>
          <div class="col-8">
            <input type="text" class="form-control" v-model="lectorForm.carrera" required placeholder="Carrera" />
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton @click="abrirModal(false)" color="danger" class="font">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <button type="submit" class="btn btn-success font">
          <CIcon icon="cil-user" class="me-2" />{{ btnEdit }}
        </button>
      </CModalFooter>
    </form>
  </CModal>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'
import Swal from 'sweetalert2'
import $ from 'jquery'
import 'datatables.net'
import { type Lector, getLectors, createLector, updateLector, deleteLector } from '../services/lectorService'

const titulo = 'Gestión de Lectores'

const lectores = ref<Lector[]>([])
const modalVisible = ref(false)
const esEdicion = ref(false)
const btnEdit = ref('Agregar')
const tablaCargada = ref(false)

const lectorForm = ref<Lector>({
  id_lector: 0,
  nombre: '',
  apellido_pat: '',
  apellido_mat: '',
  ci: 0,
  ru: 0,
  direccion: '',
  celular: 0,
  carrera: ''
})

onMounted(async () => {
  await cargarLectores()
})

async function cargarLectores() {
  try {
    destruirDataTable()
    tablaCargada.value = false
    lectores.value = await getLectors()
    await nextTick()
    tablaCargada.value = true
    await nextTick()
    inicializarDataTable()
  } catch (error) {
    console.error('Error al cargar lectores:', error)
    showToast('error', 'Error al cargar los lectores')
  }
}

const inicializarDataTable = () => {
  $('#lectoresTabla').DataTable({ destroy: true })
}

const destruirDataTable = () => {
  const table = $('#lectoresTabla').DataTable()
  if (table) table.destroy()
}

function abrirModal(estado: boolean) {
  modalVisible.value = estado
  if (!estado) {
    lectorForm.value = {
      id_lector: 0,
      nombre: '',
      apellido_pat: '',
      apellido_mat: '',
      ci: 0,
      ru: 0,
      direccion: '',
      celular: 0,
      carrera: ''
    }
    esEdicion.value = false
    btnEdit.value = 'Agregar'
  }
}

function editarLector(lector: Lector) {
  lectorForm.value = { ...lector }
  esEdicion.value = true
  btnEdit.value = 'Actualizar'
  abrirModal(true)
}

const eliminarLector = async (id_lector: number) => {
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
    await deleteLector(id_lector)
    lectores.value = lectores.value.filter(l => l.id_lector !== id_lector)
    showToast('success', 'Lector eliminado correctamente')
    await cargarLectores()
  } catch (error) {
    showToast('error', 'Error al eliminar el lector')
  }
}

const guardarLector = async () => {
  try {
    if (esEdicion.value) {
      await updateLector(lectorForm.value)
      showToast('success', 'Lector actualizado correctamente')
    } else {
      await createLector(lectorForm.value)
      showToast('success', 'Lector creado correctamente')
    }
    abrirModal(false)
    await cargarLectores()
  } catch {
    showToast('error', 'Error al guardar el lector')
  }
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
</script>

<style scoped>
@import 'datatables.net-dt';
@import '../../../styles/tailwind.css';
</style>

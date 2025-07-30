<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor">
          <CRow>
            <CCol :lg="6">{{ titulo }}</CCol>
            <CCol :lg="6" class="text-end">
              <CButton title="Agregar User" @click="abrirModal(true)" color="success" class="font" size="sm">
                <CIcon icon="cilUserFollow" class="me-2" />
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <div class="table-responsive">
            <table v-if="tablaCargada" id="usuariosTabla" class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Nro.</th>
                  <th>ID Usuario</th>
                  <th>Nombre</th>
                  <!-- <th>Contraseña</th> -->
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(usuario, index) in usuarios" :key="usuario.id_usuario">
                  <td>{{ index + 1 }}</td>
                  <td>{{ usuario.id_usuario }}</td>
                  <td>{{ usuario.nombre_usuario }}</td>
                  <!-- <td>{{ usuario.contrasena }}</td> -->
                  <td>{{ usuario.rol }}</td>
                  <td>
                    <CButton title="Editar" class="font me-1" color="warning" size="sm" @click="editarUsuario(usuario)">
                      <CIcon icon="cil-pencil" class="me-1" />
                    </CButton>
                    <CButton title="Eliminar" class="font" color="danger" size="sm" @click="eliminarUsuario(usuario.id_usuario)">
                      <CIcon icon="cil-trash" class="me-1" />
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

  <!-- Modal Usuario -->
  <CModal :visible="modalVisible" @close="abrirModal(false)">
    <form @submit.prevent="guardarUsuario">
      <CModalHeader class="headercolor" dismiss @close="abrirModal(false)">
        <CModalTitle>
          <h4>
            <CIcon icon="cil-user" size="xl" /> {{ esEdicion ? 'Editar Usuario' : 'Agregar Nuevo Usuario' }}
          </h4>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="mb-3 row">
          <label class="col-4 col-form-label">Nombre Usuario</label>
          <div class="col-8">
            <input
              type="text"
              class="form-control"
              v-model="usuarioForm.nombre_usuario"
              required
              placeholder="Ingrese el nombre de usuario"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-4 col-form-label">Contraseña</label>
          <div class="col-8">
            <input
              type="password"
              class="form-control"
              v-model="usuarioForm.contrasena"
              required
              placeholder="Ingrese la contraseña"
            />
          </div>
        </div>
       <div class="mb-3 row">
        <label class="col-4 col-form-label">Roles</label>
        <div class="col-8">
          <select class="form-select" @change="agregarRol($event)">
            <option value="">Seleccione un rol</option>
            <option
              v-for="rol in rolesDisponibles"
              :key="rol"
              :value="rol"
              :disabled="usuarioForm.roles.includes(rol)"
            >
              {{ formatRol(rol) }}
            </option>
          </select>

          <!-- Roles seleccionados con opción para quitar -->
          <div class="mt-2 d-flex flex-wrap gap-2">
            <span
              v-for="rol in usuarioForm.roles"
              :key="rol"
              class="badge bg-primary d-flex align-items-center"
            >
              {{ formatRol(rol) }}
              <CIcon
                icon="cil-x"
                class="ms-2 cursor-pointer"
                @click="quitarRol(rol)"
              />
            </span>
          </div>
        </div>
      </div>
      </CModalBody>
      <CModalFooter>
        <CButton title="Cancelar" @click="abrirModal(false)" color="danger" class="font">
          <CIcon icon="cil-x" class="me-2" />
        </CButton>
        <button  :title="btnEdit" class="btn btn-success font">
          <CIcon icon="cilUserFollow" class="me-2" />
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
import { type User, getUsers, createUser, updateUser, deleteUser, Rol } from '../services/userService'

const titulo = 'Gestión de Usuarios'

const usuarios = ref<User[]>([])
const rolesDisponibles = Object.values(Rol)
const modalVisible = ref(false)
const esEdicion = ref(false)
const btnEdit = ref('Agregar')
const tablaCargada = ref(false)

const usuarioForm = ref({
  id_usuario: 0,
  nombre_usuario: '',
  contrasena: '',
  // rol: Rol.lector,
  roles: [] as Rol[],
})

onMounted(async () => {
  await cargarUsuarios()
})
function agregarRol(event: Event) {
  const select = event.target as HTMLSelectElement
  const valor = select.value as Rol
  if (valor && !usuarioForm.value.roles.includes(valor)) {
    usuarioForm.value.roles.push(valor)
  }
  select.value = ''
}

function quitarRol(rol: Rol) {
  usuarioForm.value.roles = usuarioForm.value.roles.filter(r => r !== rol)
}

function formatRol(rol: Rol): string {
  return rol.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase())
}
async function cargarUsuarios() {
  try {
    destruirDataTable()
    tablaCargada.value = false
    usuarios.value = await getUsers()
    await nextTick()
    tablaCargada.value = true
    await nextTick()
    inicializarDataTable()
  } catch (error) {
    console.error('Error al cargar usuarios:', error)
    showToast('error', 'Error al cargar los usuarios')
  }
}

const inicializarDataTable = () => {
  $('#usuariosTabla').DataTable({ destroy: true })
}

const destruirDataTable = () => {
  const table = $('#usuariosTabla').DataTable()
  if (table) table.destroy()
}

function abrirModal(estado: boolean) {
  modalVisible.value = estado
  if (!estado) {
    usuarioForm.value = {
      id_usuario: 0,
      nombre_usuario: '',
      contrasena: '',
      roles: [] as Rol[],
    }
    esEdicion.value = false
    btnEdit.value = 'Agregar'
  }
}

function editarUsuario(usuario: User) {
  const rolesArray =  (usuario.rol || '')
    .split(',') 
    .map(r => r.trim()) 
    .filter(r => Object.values(Rol).includes(r as Rol)) as Rol[] 

  usuarioForm.value = {
    ...usuario,
    roles: rolesArray
  }
  esEdicion.value = true
  btnEdit.value = 'Actualizar'
  abrirModal(true)
}

const eliminarUsuario = async (id_usuario: number) => {
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
    await deleteUser(id_usuario)
    usuarios.value = usuarios.value.filter(u => u.id_usuario !== id_usuario)
    showToast('success', 'Usuario eliminado correctamente')
    await cargarUsuarios()
  } catch (error) {
    showToast('error', 'Error al eliminar el usuario')
  }
}

const guardarUsuario = async () => {
  try {
    const { roles, ...rest } = usuarioForm.value
    const usuarioAEnviar = {
       ...rest,
      rol: roles.join(', '),
    }

    if (esEdicion.value) {
      await updateUser(usuarioAEnviar as User)
      showToast('success', 'Usuario actualizado correctamente')
    } else {
      // console.log(usuarioAEnviar)
      await createUser(usuarioAEnviar as User)
      showToast('success', 'Usuario creado correctamente')
    }
    abrirModal(false)
    await cargarUsuarios()
  } catch {
    showToast('error', 'Error al guardar el usuario')
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

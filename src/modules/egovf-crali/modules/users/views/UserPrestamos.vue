<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor">
          <CRow>
            <CCol :lg="6">{{ titulo }}</CCol>
            <CCol :lg="6" class="text-end">
              <CButton @click="crearPrestamo" color="success" class="font" size="sm">
                <CIcon icon="cil-book" class="me-2" />Agregar Préstamo
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <div class="table-responsive">
            <table v-if="tablaCargada" id="prestamosTabla" class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Nro.</th>
                  <th>ID Préstamo</th>
                  <th>Lector ID</th>
                  <th>Fecha Préstamo</th>
                  <th>Fecha Devolución</th>
                  <th>Libros</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(prestamo, index) in prestamos" :key="prestamo.id_prestamo">
                  <td>{{ index + 1 }}</td>
                  <td>{{ prestamo.id_prestamo }}</td>
                  <td>{{ prestamo.id_lector }}</td>
                  <td>{{ formatDate(prestamo.fecha_pres) }}</td>
                  <td>{{ formatDate(prestamo.fecha_dev) }}</td>
                  <td>
                    <ul>
                      <li
                        v-for="libroId in getLibrosPrestamo(prestamo.id_prestamo)"
                        :key="libroId"
                      >
                        {{ getLibroTitulo(libroId) }}
                      </li>
                    </ul>
                  </td>
                  <td>
                    <CButton class="font me-1" color="info" size="sm" @click="verDetalles(prestamo)">
                      <CIcon icon="cil-magnifying-glass" class="me-1" />Detalles
                    </CButton>
                    <CButton class="font me-1" color="warning" size="sm" @click="editarPrestamo(prestamo)">
                      <CIcon icon="cil-pencil" class="me-1" />Editar
                    </CButton>
                    <CButton class="font" color="danger" size="sm" @click="eliminarPrestamo(prestamo.id_prestamo)">
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
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import $ from 'jquery';
import 'datatables.net';
import { CRow, CCol, CCard, CCardHeader, CCardBody, CButton } from '@coreui/vue';

// Interfaces
interface Prestamo {
  id_prestamo: number;
  fecha_pres: string;
  fecha_dev: string;
  id_lector: number;
}


interface EstaEn {
  id_prestamo: number;
  id_libro: number;
}

// Servicios (asumidos, deben implementarse)
import { getPrestamos, deletePrestamo } from '../services/prestamoService';
import { type Libro, getLibros } from '../../Biblioteca/services/libroService';

const router = useRouter();
const titulo = 'Gestión de Préstamos';

const prestamos = ref<Prestamo[]>([]);
const libros = ref<Libro[]>([]);
const esta_en = ref<EstaEn[]>([]);
const tablaCargada = ref(false);

onMounted(async () => {
  await cargarDatos();
});

async function cargarDatos() {
  try {
    destruirDataTable();
    tablaCargada.value = false;
    const [prestamosData, librosData, ] = await Promise.all([
      getPrestamos(),
      getLibros(),
    ]);
    prestamos.value = prestamosData;
    libros.value = librosData;
    await nextTick();
    tablaCargada.value = true;
    await nextTick();
    inicializarDataTable();
  } catch (error) {
    console.error('Error al obtener datos:', error);
    showToast('error', 'Error al cargar los datos');
  }
}

const inicializarDataTable = () => {
  const tableEl = document.getElementById('prestamosTabla');
  if (!tableEl) return;
  $('#prestamosTabla').DataTable({ destroy: true });
};

const destruirDataTable = () => {
  const table = $('#prestamosTabla').DataTable();
  if (table) table.destroy();
};

const crearPrestamo = () => {
  router.push({
    name: 'prestamo',
    params: { idPrestamo: 0 },
  });
};

const verDetalles = (prestamo: Prestamo) => {
  router.push({
    name: 'DetallesPrestamo',
    params: { idPrestamo: prestamo.id_prestamo },
  });
};

const editarPrestamo = (prestamo: Prestamo) => {
  router.push({
    name: 'prestamo',
    params: { idPrestamo: prestamo.id_prestamo },
  });
};

const eliminarPrestamo = async (id_prestamo: number) => {
  const confirm = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'bg-red-600 text-white px-4 py-2 rounded-md mr-2',
      cancelButton: 'bg-gray-200 text-black px-4 py-2 rounded-md',
    },
    buttonsStyling: false,
  });
  if (!confirm.isConfirmed) return;

  try {
    await Promise.all([
      deletePrestamo(id_prestamo),
      fetch(`/api/esta_en/${id_prestamo}`, { method: 'DELETE' }),
    ]);
    prestamos.value = prestamos.value.filter(p => p.id_prestamo !== id_prestamo);
    showToast('success', 'Préstamo eliminado correctamente');
    await cargarDatos();
  } catch {
    showToast('error', 'Error al eliminar el préstamo');
  }
};

const getLibrosPrestamo = (id_prestamo: number): number[] => {
  return esta_en.value
    .filter(rel => rel.id_prestamo === id_prestamo)
    .map(rel => rel.id_libro);
};

const getLibroTitulo = (id_libro: number): string => {
  const libro = libros.value.find(l => l.id_libro === id_libro);
  return libro ? libro.titulo : 'N/D';
};

const formatDate = (date: string): string => {
  return date ? new Date(date).toLocaleDateString() : 'N/D';
};

const showToast = (icon: 'success' | 'error' | 'info' | 'warning', message: string) => {
  Swal.fire({
    icon,
    title: message,
    toast: true,
    position: 'top-end',
    timer: 2000,
    showConfirmButton: false,
  });
};
</script>

<style scoped>
@import 'datatables.net-dt';
@import '../../../styles/tailwind.css';
</style>
<!-- 
{
  path: '/prestamo/:idPrestamo',
  name: 'prestamo',
  component: PrestamoForm,
},
{
  path: '/prestamo/detalles/:idPrestamo',
  name: 'DetallesPrestamo',
  component: PrestamoDetalles,
}, -->
<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor">
          <CRow>
            <CCol :lg="6">{{ titulo }}</CCol>
            <CCol :lg="6" class="text-end">
              <CButton v-if="isAdmin" title="Agregar Prestamo" @click="crearPrestamo" color="success" class="font"
                size="sm">
                <!-- <CIcon icon="cilNotes" class="me-2" /> -->
                <AddIcon class="w-6 h-6" />
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
                  <!-- <th>ID Préstamo</th> -->
                  <th>Lector</th>
                  <th>Fecha Préstamo</th>
                  <th>Fecha Devolución</th>
                  <th>Estado</th>
                  <th>Libros</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(prestamo, index) in prestamos" :key="prestamo.id_prestamo">
                  <td>{{ index + 1 }}</td>
                  <!-- <td>{{ prestamo.id_prestamo }}</td> -->
                  <td>{{ prestamo.id_lector }}</td>
                  <td>{{ formatDate(prestamo.fecha_pres) }}</td>
                  <td>
                    <span :class="{
                      'text-red-500': isFechaAtrasada(prestamo.fecha_dev) && getEstadoPrestamo(librosPorPrestamo[prestamo.id_prestamo] || [], prestamo.fecha_dev) === 'Sin devolver',
                      'text-green-500': !isFechaAtrasada(prestamo.fecha_dev) && estadoPrestamo(prestamo) !== 'Devuelto'
                    }">
                      {{ formatDate(prestamo.fecha_dev) }}
                    </span>
                  </td>
                  <td>
                    <span :class="{
                       'text-yellow-500': estadoPrestamo(prestamo) === 'Prestado',
                      'text-green-500': estadoPrestamo(prestamo) === 'Devuelto',
                      'text-red-500': estadoPrestamo(prestamo) === 'Sin devolver'
                    }">
                      {{ getEstadoPrestamo(librosPorPrestamo[prestamo.id_prestamo] || [], prestamo.fecha_dev) }}
                    </span>
                  </td>
                  <td>
                    <div class="flex flex-wrap gap-2">
                      <div v-for="libro in librosPorPrestamo[prestamo.id_prestamo] || []" :key="libro.id"
                        class="w-12 h-16">
                        <img :src="libro.portada || '/ruta/portadas/bookCover.png'" :alt="libro.titulo"
                          :title="libro.titulo" class="object-cover w-full h-full rounded shadow" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <CButton title="Detalles" class="font me-1" color="info" size="sm" @click="verDetalles(prestamo)">
                      <CIcon icon="cil-magnifying-glass" class="me-1" />
                    </CButton>
                    <template v-if="isAdmin">
                      <CButton v-if="estadoPrestamo(prestamo) !== 'Devuelto'" title="Editar" class="font me-1" color="warning" size="sm"
                        @click="editarPrestamo(prestamo)">
                        <CIcon icon="cil-pencil" class="me-1" />
                      </CButton>
                      <CButton title="Eliminar" class="font me-1" color="danger" size="sm"
                        @click="eliminarPrestamo(prestamo.id_prestamo)">
                        <CIcon icon="cil-trash" class="me-1" />
                      </CButton>
                       <CButton v-if="estadoPrestamo(prestamo) !== 'Devuelto'"
                        title="Devolver Libro" class="font" color="success" size="sm"
                        @click="devolverLibro(prestamo.id_prestamo)">
                        <CalendarIcon class="w-5 h-5" />
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
import { ref, onMounted, nextTick, computed } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import $ from 'jquery';
import 'datatables.net';
import { CRow, CCol, CCard, CCardHeader, CCardBody, CButton } from '@coreui/vue';

import { getPrestamos, deletePrestamo, getPrestamoByIdLector, getPrestamoByIdAdmin, Prestamo } from '../services/prestamoService';
import { type Libro, getLibros } from '../../Biblioteca/services/libroService';

const router = useRouter();
import { useCookies } from '../../../utils/cookiesManager';
import { AddIcon, CalendarIcon } from '../../components';
import { deleteEstaEn, getEstaEnByPrestamoEjemplar } from '../services/estaEnService';
import { EstadoEjemplar, getEjemplarById, updateStateEjemplar } from '../../Biblioteca/services/ejemplarService';
const { isAdmin, isSuperAdmin, isLector, cif } = useCookies()

const titulo = 'Gestión de Préstamos';

const prestamos = ref<Prestamo[] | [] | null>([]);
const librosPorPrestamo = ref<Record<number, { id: number; estado: string; portada: string; dir: string; titulo: string }[]>>({});
const libros = ref<Libro[]>([]);
const tablaCargada = ref(false);

const estadoPrestamo = computed(() => {
  return (prestamo: Prestamo) => {
    const libros = librosPorPrestamo.value[prestamo.id_prestamo] || [];
    return getEstadoPrestamo(libros, prestamo.fecha_dev);
  };
});

onMounted(async () => {
  await cargarDatos();
});

async function cargarDatos() {
  try {
    destruirDataTable();
    tablaCargada.value = false;
    const [prestamosData, librosData,] = await Promise.all([
      getPrestamosUser(),
      getLibros(),
    ]);
    prestamos.value = prestamosData;
    libros.value = librosData;
    // Pre-cargar libros por préstamo
    if (prestamos.value) {
      for (const prestamo of prestamos.value) {
        await verDetalles(prestamo);
      }
    }
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

const getPrestamosUser = async (): Promise<Prestamo[] | [] | null> => {
  if (isLector.value) {
    if (!cif.value) throw new Error('No se encontró el ID del lector')
    return await getPrestamoByIdLector(+cif.value)
  } else if (isSuperAdmin.value) {
    return await getPrestamos()
  } else if (isAdmin.value) {
    return await getPrestamoByIdAdmin(+cif.value)
  } else {
    throw new Error('Rol de usuario no reconocido')
  }
}

const crearPrestamo = () => {
  router.push({
    name: 'prestamo',
    params: { idPrestamo: 0 },
  });
};

const verDetallesPrestamo = async (prestamo: Prestamo) => {
  await getEstaEnByPrestamoEjemplar(prestamo.id_prestamo)
  // router.push({
  // name: 'DetallesPrestamo',
  // params: { idPrestamo: prestamo.id_prestamo },
  //});
};

const getEstadoPrestamo = (libros: { estado: string }[], fechaDevolucion: string): string => {
  // Obtener la fecha de hoy en formato UTC
  const today = new Date(new Date().toISOString().split('T')[0]); // Solo la fecha, sin hora
  // Asegurarnos de que la fecha de devolución esté también en UTC
  const [year, month, day] = fechaDevolucion.split('-');
  const fechaDevolucionDate = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));

  // Si la fecha de devolución ya pasó (es menor que la fecha actual en UTC)
  // console.log({
  //   today,
  //   fechaDevolucion,
  //   fechaDevolucionDate
  // })
  if (today > fechaDevolucionDate) {
    // Si algún libro está en estado "Prestado", el préstamo sigue siendo "Prestado"
    const hayPrestado = libros.some(libro => libro.estado === EstadoEjemplar.Prestado.toString());
    return hayPrestado ? 'Sin devolver' : 'Devuelto';
  } 
  // Si todos los libros están "Disponible", el préstamo se considera "Devuelto"
  const todosDevueltos = libros.every(libro => libro.estado === EstadoEjemplar.Disponible.toString());
  return todosDevueltos ? 'Devuelto' : 'Prestado'; // Si hay algún libro prestado, se marca como "Prestado"
};


const verDetalles = async (prestamo: Prestamo) => {
  try {
    const data = await getEstaEnByPrestamoEjemplar(prestamo.id_prestamo);

    if (Array.isArray(data)) {
      librosPorPrestamo.value[prestamo.id_prestamo] = data.map((lib: any) => ({
        id: lib[0],
        estado: lib[1],
        portada: lib[2],
        dir: lib[3],
        titulo: lib[4]
      }));
    } else {
      console.warn('Formato de datos inesperado:', data);
    }
  } catch (err) {
    console.error('Error al obtener detalles del préstamo:', err);
    showToast('error', 'No se pudieron cargar los libros del préstamo');
  }
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
    const ejemplar = librosPorPrestamo.value[id_prestamo];
    if (ejemplar) {
      for (const ejem of ejemplar) {
        console.log(ejem.id);
        await deleteEstaEn(ejem.id, id_prestamo);
      }
    }
    await deletePrestamo(id_prestamo);
    // console.log({id_prestamo})
    prestamos.value = prestamos.value?.filter(p => p.id_prestamo !== id_prestamo) || [] || null;
    showToast('success', 'Préstamo eliminado correctamente');
    await cargarDatos();
  } catch {
    showToast('error', 'Error al eliminar el préstamo');
  }
};

const devolverLibro = async (id_prestamo: number) => {
  // Confirmar la acción de devolución con un mensaje más claro
  const confirm = await Swal.fire({
    title: '¿Estás seguro de devolver el libro?',
    text: 'Una vez devuelto, el estado del libro será marcado como "Disponible".',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, devolver',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'bg-green-600 text-white px-4 py-2 rounded-md mr-2',
      cancelButton: 'bg-gray-200 text-black px-4 py-2 rounded-md',
    },
    buttonsStyling: false,
  });

  // Si no se confirma, terminamos la ejecución
  if (!confirm.isConfirmed) return;

  try {
    // Obtener los libros del préstamo para marcar como devueltos
    const ejemplar = librosPorPrestamo.value[id_prestamo];
    if (ejemplar && ejemplar.length > 0) {
      for (const ejem of ejemplar) {
        console.log(`Devolviendo libro con ID: ${ejem.id}`);
        // Aquí podrías actualizar el estado de los libros en lugar de eliminarlos
        // Actualizar el estado del libro a "Disponible"
        const data = await getEjemplarById(ejem.id)
        // console.log(data)
        await updateStateEjemplar(data, EstadoEjemplar.Disponible);
      }

      // Mostrar un mensaje de éxito
      showToast('success', 'Libro(s) devuelto(s) correctamente');
    } else {
      showToast('error', 'No se encontraron libros en este préstamo.');
    }

    // Recargar datos después de la devolución
    prestamos.value = prestamos.value?.filter(p => p.id_prestamo !== id_prestamo) || [] || null;
    await cargarDatos();

  } catch (error) {
    // Mostrar error en caso de que algo falle
    console.error('Error al devolver el libro:', error);
    showToast('error', 'Error al devolver el libro');
  }
};

const formatDate = (date: string): string => {
  if (date) {
    // Crear la fecha con el formato YYYY-MM-DD sin modificación de zona horaria
    const dateObj = new Date(date + "T00:00:00Z"); // El 'T00:00:00Z' asegura que la fecha esté en UTC.

    // Obtener el año, mes y día de la fecha en UTC
    const year = dateObj.getUTCFullYear();
    const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0'); // +1 porque getUTCMonth() devuelve 0-11
    const day = dateObj.getUTCDate().toString().padStart(2, '0');

    // Devolver la fecha formateada en formato dd/mm/yyyy
    return `${day}/${month}/${year}`;
  } else {
    return 'N/D';
  }
};

const isFechaAtrasada = (fechaDevolucion: string): boolean => {
  const today = new Date().toISOString().split('T')[0]; // Solo la fecha (sin hora)
  return fechaDevolucion < today;
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

<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">Detalles del Préstamo</h1>
    <hr class="my-4" />
  </div>

  <form class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-5">
    <!-- Columna izquierda -->
    <div class="first-col">
      <!-- Datos del lector seleccionado -->
      <div v-if="selectedLector" class="mb-3">
        <h3 class="text-lg font-bold">Datos del Lector</h3>
        <p><strong>Nombre:</strong> {{ selectedLector.nombre }} {{ selectedLector.apellido_pat }} {{ selectedLector.apellido_mat }}</p>
        <p><strong>CI:</strong> {{ selectedLector.ci }}</p>
        <p><strong>RU:</strong> {{ selectedLector.ru }}</p>
        <p><strong>Dirección:</strong> {{ selectedLector.direccion }}</p>
        <p><strong>Celular:</strong> {{ selectedLector.celular }}</p>
        <p><strong>Carrera:</strong> {{ selectedLector.carrera }}</p>
      </div>

      <!-- Datos del libro seleccionado -->
      <div v-if="selectedLibro" class="mb-3">
        <h3 class="text-lg font-bold">Datos del Libro</h3>
        <p><strong>Título:</strong> {{ selectedLibro.titulo }}</p>
        <p><strong>Autor:</strong> {{ selectedLibro.autor }}</p>
        <p><strong>Año:</strong> {{ selectedLibro.anio }}</p>
        <p><strong>Idioma:</strong> {{ selectedLibro.idioma }}</p>
        <p><strong>Signatura Topográfica:</strong> {{ selectedLibro.signatura_topografica }}</p>
        <p><strong>Ejemplares Totales:</strong> {{ selectedLibro.ejemplares }}</p>
      </div>

    </div>

    <!-- Columna derecha -->
    <div class="first-col">
      <!-- Ejemplar -->
      <div v-if="ejemplaresDisponibles.length" class="mb-3">
        <label class="form-label">Ejemplar Disponible</label>
        <select
          v-model="formEsta.idEjemplar"
          class="form-control"
          disabled
        >
          <option value="">Seleccione un ejemplar</option>
          <option
            v-for="ejemplar in ejemplaresDisponibles"
            :key="ejemplar.codigo"
            :value="ejemplar.codigo"
          >
            Ejemplar {{ ejemplar.codigo }} (Estado: {{ estadoNombre(ejemplar.estado) }})
          </option>
        </select>
      </div>

      <!-- Portada del libro -->
      <div class="mb-4">
        <label class="form-label">Portada del Libro</label>
        <div class="mx-auto w-fit overflow-hidden rounded-br-none rounded-tl-none">
          <img
            v-if="selectedEjemplar?.portada"
            :src="selectedEjemplar.portada"
            alt="Portada"
            class="object-cover rounded max-w-[200px] max-h-[200px]"
          />
          <img
            v-else
            src="/ruta/portadas/bookCover.png"
            alt="Portada por defecto"
            class="object-cover rounded"
          />
        </div>
      </div>


      <!-- Fechas de préstamo y devolución -->
     <div class="mb-6">
      <!-- Fecha de Préstamo -->
      <label for="fecha_pres" class="block text-sm font-medium text-gray-700">Fecha de Préstamo</label>
      <input
        id="fecha_pres"
        v-model="form.fecha_pres"
        type="date"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        disabled
      />
      <p v-if="form.fecha_pres && form.fecha_pres > form.fecha_dev" class="text-red-500 text-xs mt-1">La fecha de préstamo no puede ser posterior a la de devolución.</p>
    </div>

    <div class="mb-6">
      <!-- Fecha de Devolución -->
      <label for="fecha_dev" class="block text-sm font-medium text-gray-700">Fecha de Devolución</label>
      <input
        id="fecha_dev"
        v-model="form.fecha_dev"
        type="date"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        disabled
      />
      <p v-if="form.fecha_dev && form.fecha_dev < form.fecha_pres" class="text-red-500 text-xs mt-1">La fecha de devolución no puede ser anterior a la de préstamo.</p>
    </div>

      <!-- Botones -->
      <div class="my-4 text-right">
        <button
          title="Volver"
          @click="volver"
          type="button"
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          <BackIcon class="w-8 h-8"/>
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { type Libro, getLibros } from '../../Biblioteca/services/libroService';
import { type Ejemplar, EstadoEjemplar, getEjemplaresByLibroId } from '../../Biblioteca/services/ejemplarService';
import { type Lector, getLectors } from '../../users/services/lectorService';
import { type Prestamo, getPrestamoById} from '../services/prestamoService';
import { getEstaEnByPrestamo, type EstaEn } from '../services/estaEnService';
import { BackIcon } from '../../components';

interface Props {
  idPrestamo?: number;
}
const props = defineProps<Props>();
const router = useRouter();
const isEditMode = computed(() => !!props.idPrestamo);
const lectores = ref<Lector[]>([]);
const libros = ref<Libro[]>([]);
const filteredLectors = ref<Lector[]>([]);
const filteredLibros = ref<Libro[]>([]);
const selectedLector = ref<Lector | null>(null);
const selectedLibro = ref<Libro | null>(null);
const ejemplaresDisponibles = ref<Ejemplar[]>([]);
const selectedEjemplar = ref<Ejemplar | null>(null);
const selectedEjemplarBefore = ref<Ejemplar | null>(null);

const form = ref<Prestamo>({
  id_lector: 0,
  id_prestamo: 0,
  fecha_pres: '',
  fecha_dev: ''
});
const formEsta = ref<EstaEn>({
  idLibro: 0,
  idPrestamo: 0,
  idEjemplar: 0
})

onMounted(async () => {
  try {
    if (isEditMode.value && props.idPrestamo) {
      // Cargar lectores
      lectores.value = await getLectors();
      filteredLectors.value = lectores.value;
      libros.value = await getLibros()
      filteredLibros.value = libros.value
      const [prestamo, estaEn] = await Promise.all([
        getPrestamoById(props.idPrestamo),
        getEstaEnByPrestamo(props.idPrestamo)
      ]);

      form.value = prestamo!;
      formEsta.value = estaEn;
      // Cargar lector y libro asociados
      selectedLector.value = lectores.value.find(l => l.id_lector === prestamo?.id_lector) || null;
      selectedLibro.value = libros.value.find(l => l.id_libro === estaEn.idLibro) || null;
      ejemplaresDisponibles.value = await getEjemplaresByLibroId(estaEn.idLibro);
      selectedEjemplar.value = ejemplaresDisponibles.value.find(e => e.codigo === estaEn.idEjemplar) || null;
      // para cambiar el estado del anterior ejemplar
      selectedEjemplarBefore.value = selectedEjemplar.value 
      // ejemplaresDisponibles.value = ejemplaresDisponibles.value.filter(
      //   (e) => e.estado === 'Disponible'
      // );
    }else{
      router.go(-1);
    }
  } catch (err) {
    console.error(err);
    Swal.fire('Error', 'No se pudo cargar la información.', 'error');
  }
});

const estadoNombre = (estado: number | string | null | undefined): string => {
  const num = Number(estado ?? EstadoEjemplar.SinEstado)
  return EstadoEjemplar[num] ?? 'Desconocido'
}

const volver = () => {
  router.replace({ name: 'prestamos' });
};
</script>

<style scoped>
@import '../../../styles/tailwind.css';

.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

.form-control {
  @apply shadow appearance-none border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
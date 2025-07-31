<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">
      {{ isEditMode ? 'Editar Préstamo' : 'Crear Préstamo' }}
    </h1>
    <hr class="my-4" />
  </div>

  <form @submit.prevent="guardar" class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-5">
    <!-- Columna izquierda -->
    <div class="first-col">
      
      <!-- Autocompletado de lectores -->
      <div class="mb-3 relative">
        <label class="form-label">Buscar Lector (CI, RU o Nombre)</label>
        <input
          v-model="lectorSearch"
          @input="searchLectors"
          class="form-control"
          placeholder="Ingrese CI, RU o nombre"
          @focus="showLectorDropdown = true"
          @blur="hideDropdownWithDelay"
        />
        <ul
          v-if="showLectorDropdown && filteredLectors.length"
          class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto"
        >
          <li
            v-for="lector in filteredLectors"
            :key="lector.id_lector"
            @mousedown.prevent="selectLectorFromDropdown(lector)"
            class="px-4 py-2 hover:bg-blue-100 cursor-pointer"
          >
            {{ lector.nombre }} {{ lector.apellido_pat }} {{ lector.apellido_mat }} (CI: {{ lector.ci }})
          </li>
        </ul>
      </div>

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

      <!-- Autocompletado de libros -->
      <div class="mb-3 relative">
        <label class="form-label">Buscar Libro (Título o Signatura Topográfica)</label>
        <input
          v-model="libroSearch"
          @input="searchLibros"
          class="form-control"
          placeholder="Ingrese título o signatura topográfica"
          @focus="showLibroDropdown = true"
          @blur="hideLibroDropdownWithDelay"
        />
        <ul
          v-if="showLibroDropdown && filteredLibros.length"
          class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto"
        >
          <li
            v-for="libro in filteredLibros"
            :key="libro.id_libro"
            @mousedown.prevent="selectLibroFromDropdown(libro)"
            class="px-4 py-2 hover:bg-blue-100 cursor-pointer"
          >
            {{ libro.titulo }} (Signatura: {{ libro.signatura_topografica }})
          </li>
        </ul>
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
            <!-- Selección de ejemplar -->
      <div v-if="ejemplaresDisponibles.length" class="mb-3">
        <label class="form-label">Ejemplar Disponible</label>
        <select
          v-model="formEsta.idEjemplar"
          @change="selectEjemplar"
          class="form-control"
          required
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
            class="object-cover rounded"
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
        required
        :max="form.fecha_dev ? form.fecha_dev : undefined" 
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
        required
        :min="form.fecha_pres ? form.fecha_pres : undefined" 
      />
      <p v-if="form.fecha_dev && form.fecha_dev < form.fecha_pres" class="text-red-500 text-xs mt-1">La fecha de devolución no puede ser anterior a la de préstamo.</p>
    </div>

      <!-- Botones -->
      <div class="my-4 text-right">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {{ isEditMode ? 'Guardar Cambios' : 'Crear Préstamo' }}
        </button>
        <button
          @click="volver"
          type="button"
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Volver
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
import { type Prestamo, createPrestamo, getPrestamoById, updatePrestamo } from '../services/prestamoService';
import { getEstaEnByPrestamo, type EstaEn } from '../services/estaEnService';

interface Props {
  idPrestamo?: number;
}
const props = defineProps<Props>();
const router = useRouter();
const isEditMode = computed(() => !!props.idPrestamo);
const lectorSearch = ref<string>('');
const libroSearch = ref<string>('');
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
    // Cargar lectores
    lectores.value = await getLectors();
    filteredLectors.value = lectores.value;
    libros.value = await getLibros()
    filteredLibros.value = libros.value
    if (isEditMode.value && props.idPrestamo) {

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
    }
  } catch (err) {
    console.error(err);
    Swal.fire('Error', 'No se pudo cargar la información.', 'error');
  }
});

const searchLectors = () => {
  const query = lectorSearch.value.toLowerCase();
  filteredLectors.value = lectores.value.filter(
    (lector) =>
      lector.ci.toString().includes(query) ||
      lector.ru.toString().includes(query) ||
      `${lector.nombre} ${lector.apellido_pat} ${lector.apellido_mat}`
        .toLowerCase()
        .includes(query)
  );
};

const showLectorDropdown = ref(false);
let hideDropdownTimeout: number | null = null;

const hideDropdownWithDelay = () => {
  // Esto da tiempo a que el usuario haga clic en una opción
  hideDropdownTimeout = window.setTimeout(() => {
    showLectorDropdown.value = false;
  }, 150);
};

const selectLectorFromDropdown = (lector: Lector) => {
  form.value.id_lector = lector.id_lector;
  selectedLector.value = lector;
  lectorSearch.value = `${lector.nombre} ${lector.apellido_pat} ${lector.apellido_mat}`;
  showLectorDropdown.value = false;
  if (hideDropdownTimeout) {
    clearTimeout(hideDropdownTimeout);
  }
};

const searchLibros = async () => {
  try {
    const query = libroSearch.value.toLowerCase();
    filteredLibros.value = libros.value.filter(
    (libro) =>
      libro.titulo.toString().includes(query) ||
      libro.signatura_topografica.toString().includes(query) ||
      `${libro.titulo} ${libro.signatura_topografica} ${libro.ejemplares}`
        .toLowerCase()
        .includes(query)
    );
  } catch (err) {
    console.error(err);
    Swal.fire('Error', 'No se pudo buscar libros.', 'error');
  }
};

const showLibroDropdown = ref(false);
let hideLibroDropdownTimeout: number | null = null;

const hideLibroDropdownWithDelay = () => {
  hideLibroDropdownTimeout = window.setTimeout(() => {
    showLibroDropdown.value = false;
  }, 150);
};

const selectLibroFromDropdown = async (libro: Libro) => {
  formEsta.value.idLibro = libro.id_libro;
  selectedLibro.value = libro;
  libroSearch.value = `${libro.titulo}`;
  showLibroDropdown.value = false;
  if (hideLibroDropdownTimeout) {
    clearTimeout(hideLibroDropdownTimeout);
  }

  try {
    ejemplaresDisponibles.value = (await getEjemplaresByLibroId(libro.id_libro)).filter(
      (e) => Number(e.estado) === EstadoEjemplar.Disponible
    );
    ejemplaresDisponibles.value.forEach(ej => {
      ej.estado = Number(ej.estado);
    });
    selectedEjemplar.value = null;
    formEsta.value.idEjemplar = 0;
  } catch (err) {
    console.error(err);
    Swal.fire('Error', 'No se pudo cargar los ejemplares.', 'error');
  }
};

const selectEjemplar = () => {
  selectedEjemplar.value =
    ejemplaresDisponibles.value.find((e) => e.codigo === formEsta.value.idEjemplar) || null;
};

const estadoNombre = (estado: number | string | null | undefined): string => {
  const num = Number(estado ?? EstadoEjemplar.SinEstado)
  return EstadoEjemplar[num] ?? 'Desconocido'
}
const guardar = async () => {
  try {
    if (!form.value.id_lector || !formEsta.value.idLibro || !formEsta.value.idEjemplar || !form.value.fecha_pres || !form.value.fecha_dev ) {
      Swal.fire('Campos incompletos', 'Seleccione un lector, libro, ejemplar. y fechas', 'warning');
      return;
    }

    // if (selectedEjemplar.value!.estado !== EstadoEjemplar.Disponible) {
    //   Swal.fire('Campos incompletos', 'Seleccion un ejemplar Disponible');
    //   return;
    // }
    if (isEditMode.value && props.idPrestamo) {
      await updatePrestamo(form.value, formEsta.value, selectedEjemplarBefore.value!, selectedEjemplar.value!);
      Swal.fire('Éxito', 'Préstamo actualizado correctamente.', 'success');
    } else {
      // console.log(form.value)
      await createPrestamo(form.value, formEsta.value, selectedEjemplar.value!);
      Swal.fire('Éxito', 'Préstamo creado correctamente.', 'success');
    }
    router.go(-1);
  } catch (err) {
    console.error(err);
    Swal.fire('Error', 'No se pudo guardar el préstamo.', 'error');
  }
};

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
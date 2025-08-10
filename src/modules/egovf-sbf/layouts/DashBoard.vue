<template>
  <div class="main-content bg-gray-100min-h-screen">
    <div class="container-fluid">
      <div id="dashboardView">
        <h2 class="mb-6 text-2xl font-bold text-gray-800">Dashboard</h2>
        <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div v-for="i in 4" :key="i" class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md animate-pulse">
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          </div>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <DashboardCard title="Libros Totales" :value="stats.totalLibros" color="text-blue-600" icon="cilFolderOpen"
            redirectUrl="/libros" />
          <DashboardCard title="Libros Prestados" :value="stats.librosPrestados" color="text-green-600" icon="cilBasket"
            redirectUrl="/prestamos" />
          <DashboardCard v-if="isAdmin" :title="isSuperAdmin ? 'Usuarios Activos' : 'Lectores Activos'" :value="stats.usuariosActivos" color="text-purple-600" icon="cilUser"
            :redirectUrl="isSuperAdmin ? '/usuarios' : '/lectores'" />
          <DashboardCard title="Préstamos del Mes" :value="stats.prestamosMes" color="text-orange-600"
            icon="cilCalendar" redirectUrl="/prestamos-mes" />
        </div>
        <div v-if="error" class="text-red-500 text-center mb-6">{{ error }}</div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- <ChartCard
            :canvasRef="prestamosChartRef"
            chartId="prestamosChart"
            title="Préstamos por Mes"
            description="Bar chart showing the number of book loans per month"
            :config="prestamosChartConfig"
          /> -->
          <!-- <ChartCard
            :canvasRef="librosChartRef"
            chartId="librosChart"
            title="Libros Añadidos"
            description="Line chart showing the number of books added per month"
            :config="librosChartConfig"
            class="md:col-span-2"
          /> -->
          <!-- <ChartCard
            :canvasRef="estadoPrestamosChartRef"
            chartId="estadoPrestamosChart"
            title="Estado de Préstamos"
            description="Doughnut chart showing the distribution of active, returned, and overdue loans"
            :config="estadoPrestamosChartConfig"
          /> -->
          <!-- <ChartCard
            :canvasRef="idiomasChartRef"
            chartId="idiomasChart"
            title="Distribución de Libros por Idioma"
            description="Horizontal bar chart showing the distribution of books by language"
            :config="idiomasChartConfig"
            class="md:col-span-2"
          /> -->
          <div class="chart-container bg-white p-4 rounded-lg shadow-md">
            <canvas ref="prestamosChartRef"></canvas>
          </div>
          <div class="chart-container bg-white p-4 rounded-lg shadow-md md:col-span-2">
            <canvas ref="librosChartRef"></canvas>
          </div>
          <div class="chart-container bg-white p-4 rounded-lg shadow-md">
            <canvas ref="estadoPrestamosChartRef"></canvas>
          </div>
          <div class="chart-container bg-white p-4 rounded-lg shadow-md md:col-span-2">
            <canvas ref="idiomasChartRef"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Ref } from 'vue';
import Chart from 'chart.js/auto';
import type { ChartConfiguration } from 'chart.js';
import DashboardCard from './components/DashboardCard.vue';
import ChartCard from './components/ChartCard.vue';
import { getLibros, getLibrosContarUserAdmin, Idioma } from '../modules/Biblioteca/services/libroService';
import { useCookies } from '../utils/cookiesManager';
import { getPrestamoByIdAdminFrontend, getPrestamoByIdLector, getPrestamos, Prestamo } from '../modules/Prestamo/services/prestamoService';
import { getUsers } from '../modules/users/services/userService';
import { getLectors } from '../modules/users/services/lectorService';
const { isAdmin, isSuperAdmin, isLector, cif } = useCookies()

// Interface for stats
interface DashboardStats {
  totalLibros: number;
  librosPrestados: number;
  usuariosActivos: number;
  prestamosMes: number;
  estadoPrestamos: { activos: number; devueltos: number; atrasados: number };
  idiomas: Partial<Record<Idioma, number>>;
}

// Reactive stats
const stats: Ref<DashboardStats> = ref({
  totalLibros: 0,
  librosPrestados: 0,
  usuariosActivos: 0,
  prestamosMes: 0,
  estadoPrestamos: { activos: 0, devueltos: 0, atrasados: 0 },
  idiomas: Object.values(Idioma).reduce((acc, lang) => ({ ...acc, [lang]: 0 }), {} as Partial<Record<Idioma, number>>)
});
const isLoading = ref(true);
const error = ref<string | null>(null);

// Chart references
const prestamosChartRef: Ref<HTMLCanvasElement | null> = ref(null);
const librosChartRef: Ref<HTMLCanvasElement | null> = ref(null);
const estadoPrestamosChartRef: Ref<HTMLCanvasElement | null> = ref(null);
const idiomasChartRef: Ref<HTMLCanvasElement | null> = ref(null);

// Simulated API call to fetch stats
const fetchStats = async (): Promise<void> => {
  try {
    isLoading.value = true;
    // Replace with actual API call

    // Inicializamos las variables
    let totalLibros: number = 0;
    let librosPrestados: number = 0;
    let usuariosActivos: number = 0;
    let prestamosMes: number;

    // Lógica para obtener el total de libros, libros prestados y prestamos del mes según el rol
    if (isSuperAdmin.value || isLector.value) {
      // Si es superAdmin o lector
      const libros = await getLibros();
      totalLibros = libros.length;

      // Obtener libros prestados y prestamos del mes para superAdmin o lector
      const prestamos = await getPrestamosUser(); // Obtenemos los préstamos según el rol
      librosPrestados = prestamos ? prestamos.length : 0

      usuariosActivos = (await getUsers())?.length ?? 0;
      // prestamosMes = await getPrestamosMes();
    } else if (isAdmin.value) {
      // Si es admin
      totalLibros = await getLibrosContarUserAdmin(cif.value);

      // Obtener libros prestados y prestamos del mes para admin
      const prestamos = await getPrestamosUser(); // También llamamos a getPrestamosUser para el admin
      librosPrestados = prestamos ? prestamos.length : 0;

      usuariosActivos = (await getLectors())?.length ?? 0;

      // prestamosMes = await getPrestamosMesByUserAdmin(cif.value);
    }


    stats.value = {
      totalLibros: totalLibros,
      librosPrestados: librosPrestados,
      usuariosActivos: usuariosActivos,
      prestamosMes: 45,
      estadoPrestamos: { activos: 200, devueltos: 100, atrasados: 20 },
      idiomas: {
        [Idioma.Ingles]: 300,
        [Idioma.Frances]: 150,
        [Idioma.Aymara]: 50,
        [Idioma.Quechua]: 30,
        [Idioma.Espanol]: 500,
        [Idioma.Portugues]: 100,
        [Idioma.Coreano]: 20,
        [Idioma.Aleman]: 80,
        [Idioma.Otro]: 10,
        [Idioma.SinEstado]: 0
      },
    };
  } catch (err) {
    error.value = 'Failed to fetch dashboard data';
    console.error('API error:', err);
  } finally {
    isLoading.value = false;
  }
};

const getPrestamosUser = async (): Promise<Prestamo[] | [] | null> => {
  if (isLector.value) {
    if (!cif.value) throw new Error('No se encontró el ID del lector')
    return await getPrestamoByIdLector(+cif.value)
  } else if (isSuperAdmin.value) {
    return await getPrestamos()
  } else if (isAdmin.value) {
    const data = await getPrestamoByIdAdminFrontend(+cif.value)
    return data
    // return await getPrestamoByIdAdmin(+cif.value)
  } else {
    throw new Error('Rol de usuario no reconocido')
  }
}


// Initialize charts
const initCharts = (): void => {
  // Prestamos Chart (Bar)
  if (prestamosChartRef.value) {
    new Chart(prestamosChartRef.value, {
      type: 'bar',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
          label: 'Préstamos por Mes',
          data: [30, 45, 28, 50, 65, 45],
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Libros Chart (Line)
  if (librosChartRef.value) {
    new Chart(librosChartRef.value, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
          label: 'Libros Añadidos',
          data: [100, 150, 120, 180, 200, 170],
          fill: false,
          borderColor: 'rgba(16, 185, 129, 1)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Estado Prestamos Chart (Doughnut)
  if (estadoPrestamosChartRef.value) {
    new Chart(estadoPrestamosChartRef.value, {
      type: 'doughnut',
      data: {
        labels: ['Activos', 'Devueltos', 'Atrasados'],
        datasets: [{
          label: 'Estado de Préstamos',
          data: [
            stats.value.estadoPrestamos.activos,
            stats.value.estadoPrestamos.devueltos,
            stats.value.estadoPrestamos.atrasados
          ],
          backgroundColor: [
            'rgba(59, 130, 246, 0.5)',
            'rgba(16, 185, 129, 0.5)',
            'rgba(239, 68, 68, 0.5)'
          ],
          borderColor: [
            'rgba(59, 130, 246, 1)',
            'rgba(16, 185, 129, 1)',
            'rgba(239, 68, 68, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });
  }

  // Idiomas Chart (Horizontal Bar)
  if (idiomasChartRef.value) {
    new Chart(idiomasChartRef.value, {
      type: 'bar',
      data: {
        labels: Object.values(Idioma).filter(idioma => idioma !== Idioma.SinEstado),
        datasets: [{
          label: 'Distribución de Libros por Idioma',
          data: Object.values(Idioma)
            .filter(idioma => idioma !== Idioma.SinEstado)
            .map(idioma => stats.value.idiomas[idioma as Idioma]),
          backgroundColor: 'rgba(124, 58, 237, 0.5)',
          borderColor: 'rgba(124, 58, 237, 1)',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
};
onMounted(() => {
  fetchStats();
  initCharts();
});
</script>

<style scoped>
@import '../styles/tailwind.css';
</style>
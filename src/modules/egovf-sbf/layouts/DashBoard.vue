<template>
  <div class="main-content bg-gray-100 min-h-screen">
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
          <DashboardCard v-if="isAdmin" :title="isSuperAdmin ? 'Usuarios Activos' : 'Lectores Activos'"
            :value="stats.usuariosActivos" color="text-purple-600" icon="cilUser"
            :redirectUrl="isSuperAdmin ? '/usuarios' : '/lectores'" />
          <DashboardCard title="Préstamos del Mes" :value="stats.prestamosMes" color="text-orange-600"
            icon="cilCalendar" redirectUrl="/prestamos" />
        </div>

        <div v-if="error" class="text-red-500 text-center mb-6">{{ error }}</div>

        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- <div class="chart-container bg-white p-4 rounded-lg shadow-md">
            <canvas ref="prestamosChartRef"></canvas>
          </div>
          <div class="chart-container bg-white p-4 rounded-lg shadow-md md:col-span-2">
            <canvas ref="librosChartRef"></canvas>
          </div> -->
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
import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import Chart from 'chart.js/auto';
import DashboardCard from './components/DashboardCard.vue';
import { getLibros, getLibrosByIdBiblioteca, getLibrosContarUserAdmin, Idioma, Libro } from '../modules/Biblioteca/services/libroService';
import { useCookies } from '../utils/cookiesManager';
import { getPrestamoByIdAdminFrontend, getPrestamoByIdLector, getPrestamos, Prestamo } from '../modules/Prestamo/services/prestamoService';
import { getUsers } from '../modules/users/services/userService';
import { getLectors } from '../modules/users/services/lectorService';
import { Biblioteca, getBibliotecaByUser, getBibliotecas } from '../modules/Biblioteca/services/bibliotecaService';
const { isAdmin, isSuperAdmin, isLector, cif } = useCookies()
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getEstaEnByPrestamoEjemplar } from '../modules/Prestamo/services/estaEnService';
import { EstadoEjemplar } from '../modules/Biblioteca/services/ejemplarService';

Chart.register(ChartDataLabels);
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
let idiomasChart: Chart | null = null;
const librosPorPrestamo = ref<Record<number, { id: number; estado: string; portada: string; dir: string; titulo: string }[]>>({});
let estadoPrestamos = { activos: 0, devueltos: 0, atrasados: 0 };

// Simulated API call to fetch stats
const fetchStats = async (): Promise<void> => {
  try {
    isLoading.value = true;

    // Inicializamos las variables
    let totalLibros: number = 0;
    let librosPrestados: number = 0;
    let usuariosActivos: number = 0;
    let prestamosMes: number = 0;
    let idiomasCount: Partial<Record<Idioma, number>> = Object.values(Idioma).reduce((acc, lang) => {
      acc[lang] = 0; // Inicializamos con 0 para cada idioma
      return acc;
    }, {} as Partial<Record<Idioma, number>>);

    let dataLibro: Libro[] = [];
    let dataBibliotecas: Biblioteca[] = [];
    let prestamos: Prestamo[] | null = null;
    // Lógica para obtener el total de libros, libros prestados y prestamos del mes según el rol
    if (isSuperAdmin.value || isLector.value) {
      const [libros, fetchedPrestamos, users, bibliotecas] = await Promise.all([
        getLibros(),
        getPrestamosUser(),
        getUsers(),
        getBibliotecas(),
      ]);
      totalLibros = libros.length;
      prestamos = fetchedPrestamos;
      librosPrestados = prestamos?.length ?? 0
      usuariosActivos = users?.length ?? 0;
      prestamosMes = getPrestamosDelMes(prestamos ?? []);
      dataLibro = libros;
      dataBibliotecas = bibliotecas;

    } else if (isAdmin.value) {
      const [total, fetchedPrestamos, lectors, bibliotecas] = await Promise.all([
        getLibrosContarUserAdmin(cif.value),
        getPrestamosUser(),
        getLectors(),
        getBibliotecaByUser(+cif.value)
      ]);
      totalLibros = total;
      prestamos = fetchedPrestamos;
      librosPrestados = prestamos?.length ?? 0;
      usuariosActivos = lectors?.length ?? 0;
      prestamosMes = getPrestamosDelMes(prestamos ?? []);
      dataBibliotecas = bibliotecas;
      if (dataBibliotecas.length > 0) {
        const librosPorBiblioteca = await Promise.all(
          dataBibliotecas.map(b => getLibrosByIdBiblioteca(b.id_biblioteca))
        );
        dataLibro = librosPorBiblioteca.flat();
      }
    }
    if (prestamos) {
      for (const prestamo of prestamos) {
        await detallesPrestamo(prestamo);
      }
    }

    // Contamos los libros por idioma
    dataLibro.forEach(libro => {
      const idioma = libro.idioma;
      if (idiomasCount[idioma] !== undefined) {
        idiomasCount[idioma] += 1; // Incrementamos el contador de ese idioma
      }
    });

    stats.value = {
      totalLibros,
      librosPrestados,
      usuariosActivos,
      prestamosMes,
      estadoPrestamos,
      idiomas: idiomasCount,
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
    return await getPrestamoByIdAdminFrontend(+cif.value)
    // return await getPrestamoByIdAdmin(+cif.value)
  } else {
    throw new Error('Rol de usuario no reconocido')
  }
}

const getPrestamosDelMes = (prestamos: Prestamo[]): number => {
  const currentDate = new Date(); // Fecha actual
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // Mes actual (0-11)

  // Filtrar los préstamos para obtener solo los del mes actual
  const prestamosDelMes = prestamos.filter(prestamo => {
    const fechaPres = new Date(prestamo.fecha_pres); // Convertir fecha_pres a un objeto Date
    return fechaPres.getFullYear() === currentYear && fechaPres.getMonth() === currentMonth;
  });

  return prestamosDelMes.length; // Contar la cantidad de préstamos del mes
};
const detallesPrestamo = async (prestamo: Prestamo) => {
  try {
    const data = await getEstaEnByPrestamoEjemplar(prestamo.id_prestamo);

    if (Array.isArray(data)) {
      const libros = data.map((lib: any) => ({
        id: lib[0],
        estado: lib[1],
        portada: lib[2],
        dir: lib[3],
        titulo: lib[4]
      }));

      // Almacena los libros en el objeto
      librosPorPrestamo.value[prestamo.id_prestamo] = libros;

      // Determina el estado del préstamo usando la función proporcionada
      const estado = getEstadoPrestamo(libros, prestamo.fecha_dev);
      if (estado === 'Sin devolver') {
        estadoPrestamos.atrasados++;
      } else if (estado === 'Devuelto') {
        estadoPrestamos.devueltos++;
      } else {
        estadoPrestamos.activos++;
      }
    } else {
      console.warn('Formato de datos inesperado:', data);
    }
  } catch (err) {
    console.error('Error al obtener detalles del préstamo:', err);
    // showToast('error', 'No se pudieron cargar los libros del préstamo');
  }
};
const getEstadoPrestamo = (libros: { estado: string }[], fechaDevolucion: string): string => {
  // Obtener la fecha de hoy en formato UTC
  const today = new Date(new Date().toISOString().split('T')[0]); // Solo la fecha, sin hora
  // Asegurarnos de que la fecha de devolución esté también en UTC
  const [year, month, day] = fechaDevolucion.split('-');
  const fechaDevolucionDate = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));

  if (today > fechaDevolucionDate) {
    // Si algún libro está en estado "Prestado", el préstamo sigue siendo "Prestado"
    const hayPrestado = libros.some(libro => libro.estado === EstadoEjemplar.Prestado.toString());
    return hayPrestado ? 'Sin devolver' : 'Devuelto';
  }
  // Si todos los libros están "Disponible", el préstamo se considera "Devuelto"
  const todosDevueltos = libros.every(libro => libro.estado === EstadoEjemplar.Disponible.toString());
  return todosDevueltos ? 'Devuelto' : 'Prestado'; // Si hay algún libro prestado, se marca como "Prestado"
};

// Initialize charts
const initCharts = (): void => {
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#1f2937', // text-gray-800
        },
      },
      title: {
        display: true,
        color: '#1f2937',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#1f2937' },
        grid: { color: '#e5e7eb' }, // gray-200
      },
      y: {
        ticks: { color: '#1f2937' },
        grid: { color: '#e5e7eb' },
        beginAtZero: true,
      },
    },
    // animation: {
    //   duration: 1000,
    //   easing: 'easeOutQuart',
    // },
  };
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
      // type: 'doughnut',
      type: 'pie',
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
          borderWidth: 1,
          hoverOffset: 5,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            ...commonOptions.plugins.title,
            text: 'Estado de Préstamos',
          },
          legend: {
            position: 'top',
          },
          datalabels: {
            color: '#1f2937',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 4,
            padding: 4,
            formatter: (value, context) => {
              // const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
              // const percentage = ((value / total) * 100).toFixed(1);
              const data = (context.dataset.data as (number | null | undefined)[]).filter((v): v is number => v != null);
              const total = data.reduce((sum, val) => sum + val, 0);
              const percentage = total ? ((value / total) * 100).toFixed(1) : "0.0";
              return `${value} (${percentage}%)`;
            },
            font: {
              size: 10,
              weight: 'bold'
            }
          }
        },
      },
      plugins: [ChartDataLabels]
    });
  }

  // Idiomas Chart (Horizontal Bar)
  if (idiomasChartRef.value) {
    idiomasChart = new Chart(idiomasChartRef.value, {
      type: 'bar',
      data: {
        labels: Object.values(Idioma).filter(idioma => idioma !== Idioma.SinEstado),
        datasets: [{
          label: 'Distribución de Libros por Idioma',
          data: Object.values(Idioma)
            .filter(idioma => idioma !== Idioma.SinEstado)
            .map(idioma => stats.value.idiomas[idioma as Idioma] || 0),
          backgroundColor: 'rgba(124, 58, 237, 0.5)',
          borderColor: 'rgba(124, 58, 237, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(124, 58, 237, 0.8)',
        }]
      },
      options: {
        ...commonOptions,
        indexAxis: 'y',
        plugins: {
          ...commonOptions.plugins,
          title: {
            ...commonOptions.plugins.title,
            text: 'Distribución de Libros por Idioma',
          },
          legend: {
            display: false,
          },
          datalabels: {
            color: '#1f2937',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 4,
            padding: 4,
            formatter: (value) => {
              return value;
            },
            font: {
              size: 12,
              weight: 'bold'
            },
            anchor: 'end',
            align: 'end',
            offset: 4,
          }
        },
      },
      plugins: [ChartDataLabels]
    });
  }
};
onMounted(async () => {
  await fetchStats();
  initCharts();
});

onUnmounted(() => {
  // if (estadoPrestamosChart) estadoPrestamosChart.destroy();
  if (idiomasChart) idiomasChart.destroy();
});
</script>

<style scoped>
@import '../styles/tailwind.css';

.chart-container {
  min-height: 250px;
}

@media (max-width: 768px) {
  .chart-container {
    min-height: 200px;
  }
}
</style>
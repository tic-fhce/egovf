<template>
  <nav v-if="sw == 0" aria-label="breadcrumb">
    <ol class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item active" aria-current="page">Inventario</li>
      <li class="breadcrumb-item active" aria-current="page">
        <CIcon @click="irCiudadano(cifCiudadano)" class="breadcrumb-link menuicon" icon="cil-user"/>
      </li>
      <li class="breadcrumb-item active" aria-current="page">
        <label @click="irInventario(cifCiudadano)" class="breadcrumb-link">{{ cifCiudadano }}</label>
      </li>
      <li class="breadcrumb-item active" aria-current="page">
        <label>Listado de Equipos ></label>
      </li>
    </ol>
  </nav>
    <nav v-else aria-label="breadcrumb">
        <ol class="breadcrumb custom-breadcrumb">
        
        <li class="breadcrumb-item active" aria-current="page">
        <label @click="irInventario2()" class="breadcrumb-link">    
            Inventario
        </label>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
         Listado de Equipos 
        </li>
    </ol>
    </nav>


  <div class="d-flex justify-content-between align-items-start mb-4">
    <h1 class="fw-bold" style="color: #00222f;">Equipos de {{ cifCiudadano }}</h1>
    <div class="d-flex gap-2 flex-wrap">
      <!-- Filtro por Tipo -->
      <CDropdown>
        <CDropdownToggle class="dropdown-bandeja">Tipo: {{ tipoSeleccionado }}</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem @click="filtrarPorTipo(null)">Todos los Tipos</CDropdownItem>
          <CDropdownItem
            v-for="tipo in listaTipo"
            :key="tipo.idTipo"
            @click="filtrarPorTipo(tipo.idTipo, tipo.nombre)"
          >
            {{ tipo.nombre }}
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>

      <!-- Filtro por Estado -->
      <CDropdown>
        <CDropdownToggle class="dropdown-bandeja">{{ title }}</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem @click="filtrarPorEstado('ACTIVO')">Equipos Activos</CDropdownItem>
          <CDropdownItem @click="filtrarPorEstado('INACTIVO')">Equipos Inactivos</CDropdownItem>
          <CDropdownItem @click="filtrarPorEstado('EN ESPERA')">Equipos en Mantenimiento</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>

    </div>
  </div>

  <!-- Vista por secciones (acordeón por tipo) -->
  <!-- Vista por secciones (acordeón por tipo) -->
<div v-if="listaTipo.length > 0">
  <template v-for="tipo in listaTipo" :key="tipo.idTipo">
    <!-- Mostrar solo si estamos en 'todos' o si coincide con el tipo filtrado -->
    <CCard class="mb-3 accordion-section" v-if="!filtroTipo || filtroTipo === tipo.idTipo">
      <!-- Encabezado del acordeón -->
      <CCardHeader
        role="button"
        class="d-flex justify-content-between align-items-center p-3"
        style="background-color: #f8f9fa; border-bottom: 1px solid #dee2e6; cursor: pointer;"
        @click="toggleSeccion(tipo.idTipo)"
      >
        <h5 class="mb-0 d-flex align-items-center" style="color: #00222f;">
          <CIcon :icon="getIconByTipo(tipo.nombre)" class="me-2 fs-5" />
          {{ tipo.nombre }}
          <span class="badge bg-secondary ms-2">{{ getEquiposPorTipoYEstado(tipo.idTipo).length }}</span>
        </h5>
        <CIcon
          :icon="seccionesAbiertas[tipo.idTipo] ? 'cil-chevron-bottom' : 'cil-chevron-right'"
          class="fs-5"
        />
      </CCardHeader>

      <!-- Contenido desplegable -->
      <CCollapse :visible="seccionesAbiertas[tipo.idTipo]">
        <CCardBody class="px-4">
          <CRow>
            <CCol
              v-for="equipo in getEquiposPorTipoYEstado(tipo.idTipo)"
              :key="equipo.idEquipo"
            :lg="3"
              class="mb-4"
            >
              <CCard
                class="h-100 shadow-sm hover-card mt-2 ml-2"
                @click="getLista(equipo.idEquipo)"
              >
                <CCardBody class="d-flex flex-column p-3">
                  <div class="d-flex justify-content-between align-items-start mb-3">
                    <h6 class="fw-semibold text-success">{{ equipo.modelo }}</h6>
                    <CIcon
                      :icon="getIconByEstado(equipo.estado)"
                      :class="`fs-5 ${getEstadoColor(equipo.estado)}`"
                    />
                  </div>
                  <div class="mb-2">
                    <small style="font-weight: bold;">ID:</small>
                    <p class="mb-1 fw-medium">{{ equipo.idEquipo }}</p>
                  </div>
                  <div class="mb-2">
                    <small style="font-weight: bold;">Código:</small>
                    <p class="mb-1 fw-semibold">{{ equipo.codigo }}</p>
                  </div>
                  <div class="mb-2">
                    <small style="font-weight: bold;">Mac/Serie:</small>
                    <p class="mb-1">{{ equipo.macSerie }}</p>
                  </div>
                  <div class="mb-2">
                    <small style="font-weight: bold;">Marca:</small>
                    <p class="mb-1">{{ equipo.marca }}</p>
                  </div>
                  <div class="mb-3 flex-grow-1">
                    <small style="font-weight: bold;">Detalle:</small>
                    <p class="text-truncate" style="max-height: 2.4em; line-height: 1.2em;">
                      {{ equipo.detalle || 'Sin detalles' }}
                    </p>
                  </div>
                  <div class="d-flex justify-content-end">
                    <CButton size="sm" color="light" variant="ghost">
                      Ver más
                      <CIcon icon="cil-chevron-right" class="ms-1" />
                    </CButton>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCollapse>
    </CCard>
  </template>
</div>
  <!-- Mensaje si no hay tipos -->
  <CCard v-else class="text-center py-5">
    <CCardBody>
      <CIcon icon="cil-inbox" class="fs-1 text-muted mb-3" />
      <h5 class="text-muted">No hay tipos de equipo definidos</h5>
    </CCardBody>
  </CCard>

  <!-- Mensaje si no hay equipos visibles -->
  <CCard v-if="listaTipo.length > 0 && !hayEquiposVisibles()" class="text-center py-5 mt-4">
    <CCardBody>
      <CIcon icon="cil-filter" class="fs-1 text-muted mb-3" />
      <h5 class="text-muted">No hay equipos que coincidan con los filtros</h5>
      <p class="text-secondary">Intenta cambiar el estado o el tipo.</p>
    </CCardBody>
  </CCard>
</template>

<script>
import InventarioService from '@/modules/egovf-inv/services/inventarioService';

export default {
  data() {
  return {
    title: 'Todos los Estados',
    cifCiudadano: this.$route.params.cifCiudadano,
    inventarioService: null,
    usuario: {
      token: '',
      cif: '',
      correo: '',
      celular: '',
      pass: '',
      unidad: '',
      sigla: '',
      foto: '',
    },
    listaPertenece: [],
    listaEquipo: [],
    listaTipo: [],
    filtroEstado: null,
    filtroTipo: null, // null = todos
    tipoSeleccionado: 'Todos',
      seccionesAbiertas: {}, // estado abierto/cerrado por idTipo
    sw: this.$route.params.sw || 0, // Parámetro para controlar la apertura de secciones
  };
},
async mounted() {
    this.getDatos();
  this.inventarioService = new InventarioService();
  await this.getPertenece();
  await this.getEquipoTipo();
  await this.cargarTodosLosEquipos();
  this.aplicarFiltros();

  // Inicializar todas las secciones como cerradas
  const openState = {};
  this.listaTipo.forEach(tipo => {
    openState[tipo.idTipo] = false;
  });
  this.seccionesAbiertas = openState;
},
methods: {
  openform() {
    this.$router.push({
      name: 'AgregarEquipoView',
      params: { id: null },
    });
  },
  getDatos() {
    if (this.$cookies.get('cif') != null) {
      this.usuario.token = this.$cookies.get('token');
      this.usuario.cif = this.$cookies.get('cif');
      this.usuario.correo = this.$cookies.get('correo');
      this.usuario.celular = this.$cookies.get('celular');
      this.usuario.pass = this.$cookies.get('pass');
      this.usuario.unidad = this.$cookies.get('unidad');
      this.usuario.sigla = this.$cookies.get('sigla');
      this.usuario.foto = this.$cookies.get('foto');
    }
  },
  async getPertenece() {
    await this.inventarioService.getPerteneceCif(this.cifCiudadano).then(response => {
      this.listaPertenece = response.data;
    });
  },
  async getEquipoTipo() {
    await this.inventarioService.getTipo().then(response => {
      this.listaTipo = response.data.sort((a, b) => a.idTipo - b.idTipo);
    });
  },
  async cargarTodosLosEquipos() {
    const equipos = [];
    for (const pertenece of this.listaPertenece) {
      try {
        const response = await this.inventarioService.getEquipoById(pertenece.idEquipo);
        equipos.push({
          ...response.data,
          estado: pertenece.estado,
          idTipo: pertenece.idTipo,
        });
      } catch (error) {
        console.warn(`Error al cargar equipo ${pertenece.idEquipo}`, error);
      }
    }
    this.listaEquipo = equipos;
  },

  // === FILTROS ===
  filtrarPorTipo(idTipo, nombre = 'Todos') {
    this.filtroTipo = idTipo;
    this.tipoSeleccionado = nombre;

    // Si se selecciona un tipo específico, abrir automáticamente su sección
    if (idTipo) {
      this.$nextTick(() => {
        this.seccionesAbiertas[idTipo] = true;
      });
    }

    this.aplicarFiltros();
  },

  filtrarPorEstado(estado) {
    this.filtroEstado = estado;
    this.title = {
      ACTIVO: 'Equipos Activos',
      INACTIVO: 'Equipos Inactivos',
      'EN ESPERA': 'Equipos en Mantenimiento',
      null: 'Todos los Estados',
    }[estado] || 'Todos los Estados';
    this.aplicarFiltros();
  },

  aplicarFiltros() {
    // No hace nada aquí, solo se usa para disparar re-render
  },

  getEquiposPorTipoYEstado(idTipo) {
    return this.listaEquipo.filter(equipo => {
      const coincideTipo = this.filtroTipo ? equipo.idTipo === this.filtroTipo : equipo.idTipo === idTipo;
      const coincideEstado = this.filtroEstado ? equipo.estado.toUpperCase() === this.filtroEstado : true;
      return coincideTipo && coincideEstado;
    });
  },

  hayEquiposVisibles() {
    return this.listaTipo.some(tipo => this.getEquiposPorTipoYEstado(tipo.idTipo).length > 0);
  },

  toggleSeccion(idTipo) {
    // Aseguramos que la propiedad exista
    if (!(idTipo in this.seccionesAbiertas)) {
      this.seccionesAbiertas = { ...this.seccionesAbiertas, [idTipo]: true };
    } else {
      this.seccionesAbiertas[idTipo] = !this.seccionesAbiertas[idTipo];
    }
  },

  getLista(id) {
    this.$router.push({
      name: 'DetallesEquipoView',
        params: {
            id: id,
            cifCiudadano: this.cifCiudadano,
            sw: this.sw
        },
    });
  },
    irInventario2() {
          this.$router.push({
            name: 'ModuloInvView',
            params: { cifCiudadano: this.cif }
          });
        },
  getIconByEstado(estado) {
    const map = {
      ACTIVO: 'cil-check-circle',
      INACTIVO: 'cil-ban',
      'EN ESPERA': 'cil-clock',
    };
    return map[estado.toUpperCase()] || 'cil-question-circle';
  },
  getEstadoColor(estado) {
    const map = {
      ACTIVO: 'text-success',
      INACTIVO: 'text-danger',
      'EN ESPERA': 'text-warning',
    };
    return map[estado.toUpperCase()] || 'text-secondary';
  },
  getIconByTipo(nombre) {
    const lower = nombre.toLowerCase();
    if (lower.includes('computadora') || lower.includes('pc')) return 'cil-laptop';
    if (lower.includes('impresora')) return 'cil-print';
    if (lower.includes('monitor')) return 'cil-monitor';
    if (lower.includes('teclado') || lower.includes('mouse')) return 'cil-input-power';
    if (lower.includes('router') || lower.includes('switch')) return 'cil-network-locked';
    return 'cil-devices';
    },
  async irInventario(cifCiudadano) {
    this.$router.push({
      name: 'inventario',
      params: { cifCiudadano: cifCiudadano },
    });
    },
  irCiudadano(cifCiudadano){
          this.$router.push({
              name: "PerfilCiudadanoView",
              params: {
                  cifCiudadano:cifCiudadano
              },
          });
        },
}
};
</script>

<style scoped>
.accordion-section {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.transition-icon {
  transition: transform 0.3s ease;
}

.hover-card {
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: #00222f;
  color: white;
  
}

.hover-card:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 15px rgba(9, 255, 0, 0.253);
  border-color: green;
}

/* Breadcrumb */
.custom-breadcrumb {
  background-color: transparent;
  padding: 0;
  margin-bottom: 1rem;
}

.breadcrumb-link {
  text-decoration: none;
  color: #00222f;
  font-weight: 500;
  transition: color 0.3s ease;
}

.breadcrumb-link:hover {
  color: white;
  text-shadow: 0 0 10px rgba(7, 26, 59, 0.941);
}

.breadcrumb-item + .breadcrumb-item::before {
  color: #00222f;
}

/* Dropdown y botones */
.dropdown-bandeja {
  background-color: #00222f;
  color: white;
  padding: 0.5rem 1rem;
  border: solid 1px #00222f;
  transition: all 0.3s ease;
  min-width: 180px;
  text-align: center;
}

.dropdown-bandeja:hover {
  background-color: white;
  color: #00222f;
}

.botoncito {
  background-color: #00222f;
  color: white;
  border: solid 1px #ffffff;
  padding: 0.5rem 1rem;
  font-size: 15px;
  cursor: pointer;
  width: auto;
  transition: all 0.3s ease;
}

.botoncito:hover {
  background-color: white;
  color: #00222f;
  border-color: #00222f;
}
.breadcrumb-link {
    text-decoration: none;
    color: #00222f;
    font-weight: 500;
    transition: color 0.3s ease, text-shadow 0.3s ease;
    cursor: pointer;
  }
  .breadcrumb-link:hover {
    color: white;
    text-shadow: 0 0 10px rgba(7, 26, 59, 0.941);
  }

  .breadcrumb-item + .breadcrumb-item::before {
    color: #bbb;
  }
</style>
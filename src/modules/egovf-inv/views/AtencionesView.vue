<template>
    <nav aria-label="breadcrumb">
  <ol class="breadcrumb custom-breadcrumb">
    <li class="breadcrumb-item">
      <router-link to="/inventario" class="breadcrumb-link">Inventario</router-link>
    </li>
    <li class="breadcrumb-item active" aria-current="page">
      Atenciones >
    </li>
  </ol>
</nav>
<div class="container mt-4">
    <div style="display: flex; align-items:center; gap: 12px; justify-content: space-between;">
        <div class="d-flex align-items-center gap-2">
          <CIcon icon="cil-bell" class="mb-3" size=" xl" style="color: #00222f;" />
          <h4 class="mb-4" style="color: #00222f;">{{title}}</h4>
        </div>
        <CNavbarNav >
        <CDropdown >
          <CDropdownToggle class="dropdown-bandeja" :navLink="false">{{title}}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem @click="cargarTodas()">Todas las Solicitudes</CDropdownItem>
            <CDropdownItem @click="cargarAtendidas()">Solicitudes Atendidas</CDropdownItem>
            <CDropdownItem @click="cargarEnEspera()">Solicitudes en Espera</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CNavbarNav>


    </div>

    <div v-for="(solicitud, index) in listaAtenciones" :key="index" :class="[solicitud.estado == 0 ? 'atencion-card' : 'solicitud-card']" class="mb-3 p-3 border-left">
          
      <h5 :style="[{ 'color': solicitud.estado == 0 ? 'red' : 'green', 'font-weight': 'bold' }]" >Detalles del Equipo: </h5>
      <div class="data-item">
        <CIcon icon="cil-laptop" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'green'}]" />
        <strong>ID Equipo:</strong>
        <span>{{ solicitud.idEquipo }}</span>
      </div>
  
      <div class="data-item">
        <CIcon icon="cil-barcode" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'green'}]" />
        <strong>Codigo Equipo:</strong>
        <span>{{ solicitud.codigoEquipo }}</span>
      </div>
      
      <div class="data-item">
        <CIcon icon="cil-notes" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'green'}]" />
        <strong>Descripción:</strong>
        <span>{{ solicitud.equipoDescripcion }}</span>
      </div>
      
      <div class="data-item">
        <CIcon icon="cil-account-logout" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'green'}]" />
        <strong>CIF Solicitante:</strong>
        <span>{{ solicitud.cifSolicitante }}</span>
      </div>
      
      <div class="data-item">
        <CIcon icon="cil-laptop" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'green'}]" />
        <strong>Tipo Equipo:</strong>
        <span>{{ solicitud.tipoEquipo }}</span>
      </div>
      <h5 :style="[{ 'color': solicitud.estado == 0 ? 'red' : 'green', 'font-weight': 'bold' }]" >Detalles de la Solicitud: </h5>

      <div class="data-item">
        <CIcon icon="cil-user" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'green'}]" />
        <strong>ID Solicitud:</strong>
        <span>{{ solicitud.idSolicitud }}</span>
      </div>
      <div class="data-item">
        <CIcon icon="cil-calendar" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'green'}]" />
        <strong>Fecha Solicitud:</strong>
        <span>{{ solicitud.fechaSolicitud }}</span>
      </div>
      <div class="data-item">
        <CIcon icon="cil-clock" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'green'}]" />
        <strong>Hora Solicitud:</strong>
        <span>{{ solicitud.horaSolicitud }}</span>
      </div>
      <div class="data-item">
        <CIcon icon="cil-notes" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'green'}]" />
        <strong>Especificacion:</strong>
        <span>{{ solicitud.especificacion }}</span>
      </div>
      <div class="data-item">
        <CIcon icon="cil-bug" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'green'}]" />
        <strong>Error:</strong>
        <span>{{ solicitud.error }}</span>
      </div>
      
      <div class="data-item">
        <CIcon icon="cil-check-circle" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'green'}]" />
        <strong>Estado:</strong>
        <span :class="solicitud.estado == 0 ? 'text-danger' : 'text-success'">
        {{ solicitud.estado == 0 ? 'Sin atender' : 'Atendida' }}
        </span>
      </div>

      <div v-if="solicitud.idAtencion != null" >
      <h5 :style="[{ 'color': solicitud.estado == 0 ? 'red' : 'green', 'font-weight': 'bold' }]" >Detalles de la Atención: </h5>
      <div class="data-item">
        <CIcon icon="cil-sign-language" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'green'}]" />
        <strong>ID Atención:</strong>
        <span>{{ solicitud.idAtencion }}</span>
      </div>
      <div class="data-item">
        <CIcon icon="cil-notes" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'green'}]" />
        <strong>Solución:</strong>
        <span>{{ solicitud.solucion }}</span>
      </div>
      <div class="data-item">
        <CIcon icon="cil-calendar" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'green'}]" />
        <strong>Fecha Atención:</strong>
        <span>{{ solicitud.fechaAtencion }}</span>
      </div>
      <div class="data-item">
        <CIcon icon="cil-clock" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'green'}]" />
        <strong>Hora Atención:</strong>
        <span>{{ solicitud.horaAtencion }}</span>
      </div>
      <div class="data-item">
        <CIcon icon="cil-notes" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'green'}]" />
        <strong>Observaciones:</strong>
        <span>{{ solicitud.observaciones }}</span>
      </div>
      <div class="data-item">
        <CIcon icon="cil-location-pin" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'green'}]" />
        <strong>Ubicación Actual:</strong>
        <span>{{ solicitud.ubicacionActual }}</span>
      </div>
      </div>
      <div v-else>
      <CButton color="danger" style="width: 100%;" variant="ghost" @click="atenderSolicitud(solicitud.idSolicitud, solicitud.idEquipo)">Atender</CButton>
      </div>

    </div>
  </div>
</template>
<script setup>

import InventarioService from '@/modules/egovf-inv/services/inventarioService';
import CIcon from '@coreui/icons-vue';
import router from '@/router';


const atenderSolicitud = async (idSolicitud, idEquipo) => {

  router.push({
    name: 'AtenderSolicitudViewTodas',
    params: {
      idEquipo: idEquipo,
      idSolicitud: idSolicitud
    }
    });

}


</script>

<script>

export default {
  data() {
    return {
      inventarioService: null,
      solicitudes: [],
      listaAtenciones: [],
      title: 'Todas las Solicitudes',
    }
  },
  async created() {
    this.inventarioService = new InventarioService();
    await this.cargarTodas();
  },
  methods: {
    async cargarTodas() {
      this.title = 'Todas las Solicitudes';
      const response = await this.inventarioService.getSolicitudes()
      this.solicitudes = response.data
      this.listaAtenciones = this.solicitudes.map(solicitud => ({
        ...solicitud,
        estado: solicitud.estado || 0, // Aseguramos que el estado tenga un valor por defecto
      }));
    },
    async cargarAtendidas() {
      this.title = 'Solicitudes Atendidas';
      const response = await this.inventarioService.getSolicitudesAtendidas()
      this.solicitudes = response.data
      this.listaAtenciones = this.solicitudes.map(solicitud => ({
        ...solicitud,
        estado: solicitud.estado || 0, // Aseguramos que el estado tenga un valor por defecto
      }));
    },
    async cargarEnEspera() {
      this.title = 'Solicitudes en Espera';
      const response = await this.inventarioService.getSolicitudesEnEspera()
      this.solicitudes = response.data
      this.listaAtenciones = this.solicitudes.map(solicitud => ({
        ...solicitud,
        estado: solicitud.estado || 0, // Aseguramos que el estado tenga un valor por defecto
      }));
    }
  }
  
}
  
</script>



<style>
.border-left {
  border-left: 5px solid var(--color-primary);
}
.list-unstyled li {
  line-height: 1.2;
}
    .custom-breadcrumb {
  background-color: transparent;
  padding: 0;
  margin-bottom: 1rem;
}

.breadcrumb-link {
  text-decoration: none;
  color: #00222f;
  font-weight: 500;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

.breadcrumb-link:hover {
  color: white; /* verde suave */
  text-shadow: 0 0 10px rgba(7, 26, 59, 0.941); /* brillo sutil */
}

.breadcrumb-item + .breadcrumb-item::before {
  color: #bbb;
}

.atencion-card {
    background-color: #fff9e6;
    border-left: 4px solid red;

  }
  .solicitud-card {
    background-color: #e6f7ff;
    border-left: 4px solid green;
  }
  .data-item {
    color: black;
    background-color: rgba(255, 255, 255, 0.226);
    display: flex;
    padding: 8px 12px;
    border-radius: 5px;
    font-size: 0.9rem;
    align-items: center;

  }

  .data-item strong {
    min-width: 160px;
  }

  .data-item span {
    flex-grow: 1;
    font-weight: 500;
  }
  .botoncito
  {
    background-color: #00222f;
    color: white;
    border: solid 1px;
    padding: 5px;
    font-size: 15px;
    cursor: pointer;
    border-color: #ffffff;
    transition: background-color 0.3s ease, color 0.3s ease;
    width: 100%;
    height: fit-content;
  }
  .botoncito:hover {
    background-color: white;
    color: #00222f;
    border-color: #00222f;
  }

  .dropdown-bandeja{
    background-color: #00222f;
    color: white;
    padding-left: 20px;
  }
  .dropdown-bandeja:hover {
    background-color: white;
    color: #00222f;
    border-color: #00222f;
  }
  .dropdown-item {
    color: #00222f;
    cursor: pointer;
  } 
</style>
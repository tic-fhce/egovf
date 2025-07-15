<template>
    <div v-for="(ubicacion, index) in listaUbicaciones" :key="index" class="ubicacion-card mb-3 p-3">
        <div class="data-item">

            <CIcon icon="cil-map" size="lg" class="me-2" style="color:green"/>
            <strong class="mb-0">Ambiente:</strong>
            <span> {{ ubicacion.ambiente }}</span>
            </div>

            <div class="data-item">
            <CIcon icon="cil-calendar" size="lg" class="me-2" style="color:green"/>
            <strong>Fecha:</strong>
            <span> {{ ubicacion.fecha }}</span>
            </div>

            <div class="data-item">
            <CIcon icon="cil-check-circle" size="lg" class="me-2" style="color:green"/>
            <strong>Estado:</strong>
            <span :class="{
                'text-success': ubicacion.estado === 1,
                'text-danger': ubicacion.estado === 0
            }"> {{ubicacion.estado == 1 ? 'Activo' : 'Inactivo'}} </span>

            <div v-if="ubicacion.estado === 0" class="mt-2">

                <CButton color="success" variant="ghost" @click="verActivarUbicacion(ubicacion.idUbicacion)">Activar Ubicación</CButton>
            </div>
            <div v-else class="mt-2">
                <CButton color="danger" variant="ghost" @click="verDesactivarUbicacion(ubicacion.idUbicacion)">Desactivar Ubicación</CButton>
            </div>
        </div>
        
            <div class="data-item">
            <CIcon icon="cil-location-pin" size="lg" class="me-2" style="color:green"/>
            <strong>Ubicación GPS:</strong>
            <span> {{ ubicacion.latitud }}, {{ ubicacion.longitud }}</span>
        </div>
        
    </div>
    <div style="display: flex; gap: 10px;">
        <CButton class="botoncito" color="dark" variant="outline" @click="volver()">Volver</CButton>
        <CButton class="botoncito" color="success"  @click="nuevaUbicacion()">Registrar Nueva Ubicación</CButton>
        
    </div>
    
    
    
    <CModal
        scrollable
        :visible="verUbicacion"
        @close="() => { verUbicacion = false }"
        aria-labelledby="añadir-asignacion"
    >
        <CModalHeader style="background-color: green; color: white;">
        <CModalTitle id="añadir-asignacion">Modificar Estado de Ubicación</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <div class="text-center">
            <p>¿Seguro que quiere activar la ubicación?</p>
            <div class="d-flex justify-content-center gap-3 mt-4">
            <c-button color="secondary" variant="outline" @click="verUbicacion = false">No, cerrar</c-button>
            <c-button color="success" @click="activarUbicacion(idUbicacion)">Sí, Activar</c-button>
            </div>
        </div>
        </CModalBody>
    </CModal>

          <CModal
              scrollable
              :visible="verUbicacion1"
              @close="() => { verUbicacion1 = false }"
              aria-labelledby="añadir-asignacion"
          >
              <CModalHeader style="background-color: green; color: white;">
              <CModalTitle id="añadir-asignacion">Modificar Estado de Ubicación</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <div class="text-center">
                  <p>¿Seguro que quiere desactivar la ubicación?</p>
                  <div class="d-flex justify-content-center gap-3 mt-4">
                  <c-button color="secondary" variant="outline" @click="verUbicacion = false">No, cerrar</c-button>
                  <c-button color="danger" @click="desactivarUbicacion(idUbicacion)">Sí, desactivar</c-button>
                  </div>
              </div>
              </CModalBody>
          </CModal>
</template>
<script>
import { ref } from 'vue';

import InventarioService from '../services/inventarioService';

export default {
    data() {
        return {
            verUbicacion: ref(false),
            verUbicacion1: ref(false),
            idUbicacion: null,
            inventarioService: null,
            listaUbicaciones: []
        };
    },
    created() {
        this.idEquipo = this.$route.params.id; // Obtener el ID del equipo desde los parámetros de la ruta
        this.inventarioService = new InventarioService(); // Instanciar el servicio de
        this.fetchHistorialUbicaciones();

    },
    methods: {
        verActivarUbicacion(idUbicacion) {
            this.verUbicacion = true;
            this.idUbicacion = idUbicacion;
        },
        verDesactivarUbicacion(idUbicacion) {
            this.verUbicacion1 = true;
            this.idUbicacion = idUbicacion;
        },
        volver() {
            this.$router.push({
                name: "DetallesEquipoView",
                params: {
                    id: this.idEquipo
                }
            });
        },
        nuevaUbicacion() {
            this.$router.push({
                name: "UbicacionEquipoView",
                params: {
                    id: this.idEquipo
                }
            });
        },
        async desactivarUbicacion(idUbi) {
            try {
                await this.inventarioService.desactivarUbicacion(idUbi);
                this.verUbicacion = false; // Cerrar el modal después de desactivar la ubicación
                window.location.reload(); // Recargar la página para reflejar los cambios
            } catch (error) {
                console.error("Error desactivating location:", error);
            }
        },
        async activarUbicacion(idUbi) {
            try {
                await this.inventarioService.activarUbicacion(idUbi);
                this.verUbicacion = false; // Cerrar el modal después de activar la ubicación
                window.location.reload(); // Recargar la página para reflejar los cambios
            } catch (error) {
                console.error("Error activating location:", error);
            }
        },
        async fetchHistorialUbicaciones() {
            try {
                await this.inventarioService.gethistorialUbicaciones(this.idEquipo).then(response => {
                this.listaUbicaciones = response.data;
            });
            } catch (error) {
                console.error("Error fetching historial de Ubicaciones:", error);
            }
        }
    }
};
</script>
<style>
.ubicacion-card {
    background-color: #e6f7ff;
    border-left: 4px solid #00ec20;
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
</style>

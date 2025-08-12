<template>
    <div v-for="(Red, index) in listaRedes" :key="index" class="network-card mb-3 p-3">


        <div class="data-item">
            <CIcon icon="cil-barcode" class="me-2" :style="{'--ci-primary-color': 'blue'}"/>
            <strong>ID Red:</strong>
            <span>{{ Red.idRed }}</span>
        </div>

        <div class="data-item">
            <CIcon icon="cil-router"  class="me-2" :style="{'--ci-primary-color': 'blue'}"/>
            <strong class="mb-0">IP:</strong>
            <span> {{ Red.ip }}</span>
        </div>
        <div class="data-item">
            <CIcon icon="cil-lan" class="me-2" :style="{'--ci-primary-color': 'blue'}"/>
            <strong>Segmento:</strong>
            <span>{{ Red.segmento }}</span>
        </div>
        <div class="data-item">
            <CIcon icon="cil-globe-alt" class="me-2" :style="{'--ci-primary-color': 'blue'}"/>
            <strong>DNS:</strong>
            <span>{{ Red.dns }}</span>
        </div>
        <div class="data-item">
            <CIcon icon="cil-lan" class="me-2" :style="{'--ci-primary-color': 'blue'}"/>
            <strong>VLAN:</strong>
            <span>{{ Red.vlan }}</span>
        </div>
        <div class="data-item">
            <CIcon icon="cil-router" class="me-2" :style="{'--ci-primary-color': 'blue'}"/>
            <strong>Switch:</strong>
            <span>{{ Red.switchRed }}</span>
        </div>
        <div class="data-item">
            <CIcon icon="cil-memory" class="me-2" :style="{'--ci-primary-color': 'blue'}"/>
            <strong>Puerto:</strong>
            <span>{{ Red.puerto }}</span>
        </div>
        <div class="data-item">
            <CIcon icon="cil-clock" class="me-2" :style="{'--ci-primary-color': 'blue'}"/>
            <strong>Registro:</strong>
            <span>{{ Red.fechaRegistro }}</span>
        </div>

        <div class="data-item">
            <CIcon icon="cil-check-circle" class="me-2" :style="{'--ci-primary-color': 'blue'}"/>
            <strong>Estado:</strong>
            <span :class="{
                'text-primary': Red.estado === 1,
                'text-danger': Red.estado === 0
            }">{{ Red.estado === 1 ? 'Activo' : 'Inactivo' }}</span>
            <div v-if="Red.estado == 0" class="mt-2">
                <CButton color="primary" variant="ghost" @click="verActivarRed(Red.idRed)">Activar Red</CButton>
                


            </div>
            <div v-else class="mt-2">
                <CButton color="danger" variant="ghost" @click="verDesactivarRed(Red.idRed)">Desactivar Red</CButton>

            </div>
        </div>
    </div>
    
    <div style="display: flex; gap: 10px;">
        <CButton class="botoncito" color="dark" variant="outline" @click="volver()">Volver</CButton>
        <CButton class="botoncito" color="primary"  @click="nuevaRed()">Registrar Nueva Red</CButton>

    </div>

    <CModal
    scrollable
        :visible="verRed"
        @close="() => { verRed = false }"
        aria-labelledby="añadir-asignacion"
    >
        <CModalHeader style="background-color: blue; color: white;">
        <CModalTitle id="añadir-asignacion">Modificar Estado de Red</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <div class="text-center">
            <p>¿Seguro que quiere activar la red?</p>
            <div class="d-flex justify-content-center gap-3 mt-4">
            <CButton color="secondary" variant="outline" @click="verRed = false">No, cerrar</CButton>
            <CButton color="primary" @click="activarRed(idRed)">Sí, activar</CButton>
        </div>
    </div>
</CModalBody>
</CModal>
<CModal
    scrollable
    :visible="verRed1"
    @close="() => { verRed1 = false }"
    aria-labelledby="añadir-asignacion"
>
    <CModalHeader style="background-color: blue; color: white;">
    <CModalTitle id="añadir-asignacion">Modificar Estado de Red</CModalTitle>
    </CModalHeader>
    <CModalBody>
    <div class="text-center">
        <p>¿Seguro que quiere desactivar la red?</p>
        <div class="d-flex justify-content-center gap-3 mt-4">
        <CButton color="secondary" variant="outline" @click="verRed1 = false">No, cerrar</CButton>
        <CButton color="danger" @click="desactivarRed(idRed)">Sí, desactivar</CButton>
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
            idRed: null,
            verRed: ref(false),
            verRed1: ref(false),
            listaRedes: []
        };
    },
    created() {
        this.idEquipo = this.$route.params.id; // Obtener el ID del equipo desde los parámetros de la ruta
        this.inventarioService = new InventarioService(); // Instanciar el servicio de
        this.fetchHistorialRedes();

    },
    methods: {
        
        volver() {
            this.$router.push({
                name: "DetallesEquipoView",
                params: {
                    id: this.idEquipo
                }
            });
        },
        nuevaRed() {
            this.$router.push({
                name: "RedEquipoView",
                params: {
                    id: this.idEquipo
                }
            });
        },
        verActivarRed(idRed) {
            this.verRed = true;
            this.idRed = idRed; // Guardar el ID de la red para usarlo en la activación
        },
        verDesactivarRed(idRed) {
            this.verRed1 = true;
            this.idRed = idRed; // Guardar el ID de la red para usarlo en la desactivación
        },
        async activarRed(idRed) {
            try {
                console.log("Activando red con ID:", idRed);
                await this.inventarioService.activarRed(idRed);
                window.location.reload();
            } catch (error) {
                console.error("Error activating network:", error);
            }
        },
        async desactivarRed(idRed) {
            try {
                console.log("Desactivando red con ID:", idRed);
                await this.inventarioService.desactivarRed(idRed);
                window.location.reload();
            } catch (error) {
                console.error("Error deactivating network:", error);
            }
        },
        async fetchHistorialRedes() {
            try {
                await this.inventarioService.getHistorialRedes(this.idEquipo).then(response => {
                    this.listaRedes = response.data;
                });
            } catch (error) {
                console.error("Error fetching historial de Redes:", error);
            }
        }
    }
};
</script>
<style>
.network-card {
    background-color: #f1f1f1;
    border-left: 4px solid #3f51b5;
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
<template>
    <div v-for="(software, index) in listaSoftware" :key="index" class="software-card mb-3 p-3 border rounded bg-light">
              <div class="d-flex align-items-center mb-2">
                <CIcon icon="cib-microsoft" size="lg" class="me-2 text-primary" />
                <h6 class="mb-0">{{ software.nombre }}</h6>
              </div>
              <p><strong>Versión:</strong> {{ software.version }}</p>
              <p><strong>Tipo:</strong> {{ software.tipo }}</p>
              <p><strong>Licencia:</strong> {{ software.estadoLicencia }}</p>
              <small class="text-muted">
                <CIcon icon="cil-calendar" class="me-1" />
                Fecha instalación: {{ software.fecha }}
              </small>
            </div>
</template>

<script>
import InventarioService from '../services/inventarioService';

export default {
    data() {
        return {
            listaSoftware: []
        };
    },
    created() {
        this.idEquipo = this.$route.params.id; // Obtener el ID del equipo desde los parámetros de la ruta
        this.inventarioService = new InventarioService(); // Instanciar el servicio de
        this.fetchHistorialUbicaciones();

    },
    methods: {
        async fetchHistorialUbicaciones() {
            try {
                await this.inventarioService.getSoftwarePorEquipo(this.idEquipo).then(response => {
                this.listaSoftware = response.data;
            });
            } catch (error) {
                console.error("Error fetching historial de Software:", error);
            }
        }
    }
};
</script>
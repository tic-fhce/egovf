<template>
    <div v-for="(pertenecea, index) in pertenece" :key="index" class="location-card mb-3 p-3">
                <div class="data-card">
                    <div class="data-item">
                        <CIcon icon="cil-sign-language" class="me-2" style="color: #04bcd4;" />
                        <strong>ID Asignación:</strong>
                        <span>{{ pertenecea.idPertenece }}</span>
                    </div>
                    <div class="data-item">
                        <CIcon icon="cil-account-logout" class="me-2" style="color: #04bcd4;" />
                        <strong>CIF:</strong>
                        <span>{{ pertenecea.cif }}</span>
                    </div>
                <div class="data-item">
                <CIcon icon="cil-laptop" class="me-2" style="color: #04bcd4;" />
                <strong>ID Equipo:</strong>
                <span>{{ pertenecea.idEquipo }}</span>
                </div>
                <div class="data-item">
                <CIcon icon="cil-calendar" class="me-2" style="color: #04bcd4;" />
                <strong>Fecha de asignación:</strong>
                <span>{{ pertenecea.fechaAdd }}</span>
                </div>
                <div class="data-item">
                <CIcon icon="cil-calendar-check" class="me-2" style="color: #04bcd4;" />
                <strong>Fecha devuelto:</strong>
                <span>{{ pertenecea.fechaDel || 'No devuelto' }}</span>
                </div>
                <div class="data-item">
                <CIcon icon="cil-check-circle" class="me-2" style="color: #04bcd4;" />
                <strong>Estado:</strong>
                <span :class="{
                    'text-success': pertenecea.estado === 'ACTIVO',
                    'text-danger': pertenecea.estado === 'Devuelto',
                    'text-info': pertenece.estado === 'INACTIVO'
                }">{{ pertenecea.estado }}</span>
                <CButton color="info" variant="ghost" @click="verEditarEstado(pertenecea.idPertenece)">Editar Estado</CButton>

                </div>
            </div>
        </div>
        <div style="display: flex; gap: 10px;">
            <CButton class="botoncito" color="dark" variant="outline" @click="volver()">Volver</CButton>
            <CButton class="botoncito" color="info" @click="nuevaAsignacion()">Registrar Nueva Asignación</CButton>
        </div>
        <CModal
            scrollable
            :visible="verPertenece"
            @close="() => { verPertenece = false }"
            aria-labelledby="añadir-asignacion"
  >
    <CModalHeader style="background-color: #007bff; color: white;">
      <CModalTitle id="añadir-asignacion">Añadir registro de Asignación</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <c-form @submit.prevent="submitPertenece(idPertenece)">
  
  
  
      <div class="mb-3">
        <strong>Estado:</strong>
        <c-form-select v-model="formDataPertenece.estado" required>
          <option value="Activo">Activo</option>
          <option value="Devuelto">Devuelto</option>
          <option value="En préstamo">En préstamo</option>
        </c-form-select>
      </div>


      <c-button type="submit" color="info" variant="ghost">Guardar</c-button>
    </c-form>
    </CModalBody>
  </CModal>
</template>
<script>
import { ref } from 'vue';
import InventarioService from '../services/inventarioService';



  
export default {
    data() {
        return {
            idPertenece: null,
            formDataPertenece: {
                estado: 'Activo'
            },
            verPertenece: ref(false),
            pertenece: []
            
        };
    },
    created() {
        this.idEquipo = this.$route.params.id; // Obtener el ID del equipo desde los parámetros de la ruta
        this.inventarioService = new InventarioService(); // Instanciar el servicio de
        this.fetchHistorialAsignaciones();

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
        nuevaAsignacion() {
            this.$router.push({
                name: "AsignacionEquipoView",
                params: {
                    id: this.idEquipo
                }
            });
        },
        verEditarEstado(idPertenece) {
            this.idPertenece = idPertenece;
            this.verPertenece = true;
        },
        async submitPertenece(idPertenece) {
            try {
                console.log('Datos a guardar:', this.formDataPertenece);
                const inventarioService = new InventarioService();
                await inventarioService.editarPertenece(this.formDataPertenece, idPertenece);
                alert('✅ Registro guardado correctamente');
                window.location.reload();
            } catch (error) {
                console.error("Error updating assignment:", error);
            }
        },
        
        
        async fetchHistorialAsignaciones() {
            try {
                await this.inventarioService.getPertenecePorEquipo(this.idEquipo).then(response => {
                this.pertenece = response.data;
                });
            } catch (error) {
                console.error("Error fetching historial de asignaciones:", error);
            }
        }
    }
};
</script>

<style>

.location-card {
    background-color: #e6f7ff;
    border-left: 4px solid #00bcd4;
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
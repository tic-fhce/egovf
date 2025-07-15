<template>
    <h3 class="text-center mb-4" style="color: black; font-weight: bold;">
      Atendiendo Solicitud.
    </h3>
  
    <c-form @submit.prevent="submitPertenece">
      <!-- Campo Id Solicitud -->
      <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon1" style="background-color: black;">
          <CIcon icon="cil-user" style="font-weight: bold; color: white;" />
        </CInputGroupText>
        <CFormInput
          floatingLabel="Id Solicitud:"
          type="number"
          id="idSolicitud"
          v-model.number="formDataAtencion.idSolicitud"
          readonly
          disabled
        />
      </CInputGroup>
  
      
      <!-- Campo Fecha Atención -->
      <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon1" style="background-color: black;">
          <CIcon icon="cil-calendar" style="font-weight: bold; color: white;" />
        </CInputGroupText>
        <CFormInput
          floatingLabel="Fecha Atención:"
          :value="formattedDate"
          type="text"
          id="cif"
          readonly
          disabled
        />
      </CInputGroup>
  
      <!-- Campo Hora Atención -->
      <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon1" style="background-color: black;">
          <CIcon icon="cil-clock" style="font-weight: bold; color: white;" />
        </CInputGroupText>
        <CFormInput
          floatingLabel="Hora Atención:"
          type="time"
          id="horaAtencion"
          :value="horaActual"
          readonly
          disabled
          />
        </CInputGroup>
        
        <!-- Campo Solución -->
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1" style="background-color: black;">
            <CIcon icon="cil-user" style="font-weight: bold; color: white;" />
          </CInputGroupText>
          <CFormInput
            floatingLabel="Solución:"
            type="text"
            id="solucion"
            v-model="formDataAtencion.solucion"
            required
            
            />
        </CInputGroup>
        <!-- Campo Observaciones -->
        <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon1" style="background-color: black;">
          <CIcon icon="cil-notes" style="font-weight: bold; color: white;" />
        </CInputGroupText>
        <CFormInput
          floatingLabel="Observaciones:"
          type="text"
          id="observaciones"
          v-model="formDataAtencion.observaciones"
          required

        />
      </CInputGroup>
  
      <!-- Botones -->
      <CButtonGroup style="display: flex; justify-content: space-between; width: 100%;">
        <CButton type="button" class="botoncito" @click="volver()">Volver</CButton>
        <c-button type="submit" class="botoncito">Guardar</c-button>
      </CButtonGroup>
    </c-form>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router'; // Importamos useRouter también
  import InventarioService from '../services/inventarioService';
  
  export default {
    setup() {
      const route = useRoute();
      const router = useRouter(); // Usamos useRouter para navegar
  
      const formDataAtencion = ref({
        idSolicitud: 0,
        solucion: '',
        fechaAtencion: '',
        horaAtencion: '',
        observaciones: ''
      });
  
      const formattedDate = ref('');
      const horaActual = ref('');
      const idEquipo = parseInt(route.params.idEquipo); // Lo usamos directamente
  
      console.log('ID del equipo:', idEquipo);
  
      onMounted(() => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeFormatted = `${hours}:${minutes}`;
  
        horaActual.value = timeFormatted;
        formattedDate.value = now.toLocaleDateString();
        const isoDate = now.toISOString().split('T')[0];
        formDataAtencion.value.idSolicitud = parseInt(route.params.idSolicitud);
        formDataAtencion.value.fechaAtencion = isoDate;
        formDataAtencion.value.horaAtencion = timeFormatted;
      });
  
    const submitPertenece = async () => {
        if (!this.formDataAtencion.solucion || !this.formDataAtencion.observaciones) {
            alert('Por favor, complete todos los campos.');
            return;
        }
        try {
          console.log('Datos a guardar:', formDataAtencion.value);
          const inventarioService = new InventarioService();
          await inventarioService.añadirAtencion1(formDataAtencion.value);
          alert('✅ Registro guardado correctamente');
          volver();
        } catch (error) {
          console.error('Error al guardar:', error);
          alert('❌ El Cif no puede ser el mismo.');
        }
      };
  
      // Función para volver
      const volver = () => {
        router.push({
          name: "DetallesEquipoView",
          params: {
            id: idEquipo
          }
        });
      };
  
      return {
        formDataAtencion,
        formattedDate,
        submitPertenece,
        horaActual,
        volver // Exponemos la función para usarla en el template
      };
    },
  };
  </script>
  
  <style>
.botoncito
  {
    background-color: black;
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
    color: black;
    border-color: black;
  }
  </style>
<template>
    <h3 class="text-center mb-4" style="color: black; font-weight: bold;">
      Creando Solicitud.
    </h3>
  
    <c-form @submit.prevent="submitPertenece">
      <!-- Campo Id Solicitud -->
      <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon1" style="background-color: black;">
          <CIcon icon="cil-user" style="font-weight: bold; color: white;" />
        </CInputGroupText>
        <CFormInput
          floatingLabel="Id Equipo:"
          type="number"
          id="idSolicitud"
          v-model.number="formDataSolicitud.idEquipo"
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
          floatingLabel="Fecha de la Solicitud:"
          :value="formattedDate"
          type="text"
          id="fechaAtencion"
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
          floatingLabel="Hora de la Solicitud:"
          type="text"
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
          floatingLabel="Especificación de la solicitud:"
          type="text"
          id="solucion"
          v-model="formDataSolicitud.especificacion"
          required
        />
      </CInputGroup>
  
      <!-- Campo Observaciones -->
      <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon1" style="background-color: black;">
          <CIcon icon="cil-notes" style="font-weight: bold; color: white;" />
        </CInputGroupText>
        <CFormInput
          floatingLabel="Especificación del Error:"
          type="text"
          id="observaciones"
          v-model="formDataSolicitud.error"
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
  
      const formDataSolicitud = ref({
        idEquipo: 0,
        fechaSolicitud: '',
        horaSolicitud: '',
          especificacion: '',
          error: ''
        
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
        formDataSolicitud.value.idEquipo = idEquipo; // Asignamos el ID del equipo
        formDataSolicitud.value.fechaSolicitud = isoDate;
        formDataSolicitud.value.horaSolicitud = timeFormatted;
      });
  
      const submitPertenece = async () => {
        try {
          console.log('Datos a guardar:', formDataSolicitud.value);
          const inventarioService = new InventarioService();
          await inventarioService.añadirSolicitud(formDataSolicitud.value);
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
        formDataSolicitud,
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
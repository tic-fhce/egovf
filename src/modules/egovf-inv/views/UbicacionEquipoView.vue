<template>
  <h3 class="text-center mb-4" style="color: black; font-weight: bold;">
    Nueva Ubicación.
  </h3>
  <c-form @submit.prevent="submitUbicacion">
    <CInputGroup class="mb-3">
      <CInputGroupText style="background-color: black;">
        <CIcon icon="cil-layers" style="font-weight: bold; color: white;" />
      </CInputGroupText>
      <CFormInput
        floatingLabel="ID del Equipo"
        type="number"
        id="idEquipo"
        :value="formDataUbicacion.idEquipo"
        readonly
        disabled
      />
    </CInputGroup>

    <CInputGroup class="mb-3">
      <CInputGroupText style="background-color: black;">
        <CIcon icon="cil-home" style="font-weight: bold; color: white;" />
      </CInputGroupText>
      <CFormInput
        floatingLabel="Ambiente"
        id="ambiente"
        v-model="formDataUbicacion.ambiente"
        required
      />
    </CInputGroup>

    <CInputGroup class="mb-3">
      <CInputGroupText style="background-color: black;">
        <CIcon icon="cil-location-pin" style="font-weight: bold; color: white;" />
      </CInputGroupText>
      <CFormInput
        floatingLabel="Latitud"
        id="latitud"
        v-model="formDataUbicacion.latitud"
        required
      />
    </CInputGroup>

    <CInputGroup class="mb-3">
      <CInputGroupText style="background-color: black;">
        <CIcon icon="cil-location-pin" style="font-weight: bold; color: white;" />
      </CInputGroupText>
      <CFormInput
        floatingLabel="Longitud"
        id="longitud"
        v-model="formDataUbicacion.longitud"
        required
      />
    </CInputGroup>

    <CInputGroup class="mb-3">
      <CInputGroupText style="background-color: black;">
        <CIcon icon="cil-calendar" style="font-weight: bold; color: white;" />
      </CInputGroupText>
      <CFormInput
        floatingLabel="Fecha Actual"
        type="text"
        :value="formattedDate"
        readonly
        disabled
      />
    </CInputGroup>

    <div class="mb-3">
      <c-form-label style="color: black;">Seleccione el Estado Inicial.</c-form-label>
      <CFormSelect v-model="formDataUbicacion.estado" required>
        <option class="select" value="activo">Activo</option>
        <option class="select" value="inactivo">Inactivo</option>
      </CFormSelect>
    </div>

    <CButtonGroup style="display: flex; justify-content: space-between; width: 100%;">
      <CButton type="button" class="botoncito" @click="volver()">
        Volver
      </CButton>
      <c-button type="submit" class="botoncito">Guardar</c-button>
    </CButtonGroup>
  </c-form>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // Para acceder a $route.params.id
import InventarioService from '../services/inventarioService';
import router from '@/router';

export default {
  methods: {
    volver() {
      this.$router.push({
        name: "DetallesEquipoView",
        params: {
          id: this.idEquipo
        }
      });
    }
  },
  setup() {
    const route = useRoute(); // Acceso al router

    const formDataUbicacion = ref({

        idEquipo: null,
        ambiente: '',
        latitud: '',
        longitud: '',
        fecha: '',
        estado: 0

    });

    const formattedDate = ref('');

    // Esto equivale a "onCreate"
        onMounted(() => {
      const now = new Date();
      formattedDate.value = now.toLocaleDateString();
        const isoDate = now.toISOString().split('T')[0];
      formDataUbicacion.value.idEquipo = parseInt(route.params.id);
      formDataUbicacion.value.fecha = isoDate;
    });

    const submitUbicacion = async () => {
        try {
      
            console.log('Datos a guardar:', formDataUbicacion.value);
            const inventarioService = new InventarioService();
            await inventarioService.añadirUbicacion(formDataUbicacion.value);
            alert('✅ Ubicación guardada correctamente');
            router.push({
            name: "DetallesEquipoView",
            params: {
                id: formDataUbicacion.value.idEquipo
            }
            });
        } catch (error) {
            console.error('Error al guardar:', error)
            alert('❌ Error al guardar la ubicación.')
        }

    };

    return {
      formDataUbicacion,
      formattedDate,
      submitUbicacion,
    };
  },
};
</script>
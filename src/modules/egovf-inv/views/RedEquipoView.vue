<template>

    <label for=""><strong>Por alguna razon no permite ingresar numeros en los datos....</strong></label>
  <h3 class="text-center mb-4" style="color: black; font-weight: bold;">
    Nueva Asignación de Red.
  </h3>
  <CForm @submit.prevent="submitRed">
    <CInputGroup class="mb-3">
      <CInputGroupText style="background-color: black;">
        <CIcon icon="cil-laptop" style="font-weight: bold; color: white;" />
      </CInputGroupText>
      <CFormInput
        floatingLabel="ID del Equipo"
        type="text"
        :value="formDataRed.idEquipo"
        readonly
      />
    </CInputGroup>
    <CInputGroup class="mb-3">
      <CInputGroupText style="background-color: black;">
        <CIcon icon="cil-network" style="font-weight: bold; color: white;" />
      </CInputGroupText>
      <CFormInput
        floatingLabel="IP"
        type="text"
        v-model="formDataRed.ip"
        required
      />
    </CInputGroup>
    <CInputGroup class="mb-3">
      <CInputGroupText style="background-color: black;">
        <CIcon icon="cil-lan" style="font-weight: bold; color: white;" />
      </CInputGroupText>
      <CFormInput
        floatingLabel="Segmento"
        type="text"
        v-model="formDataRed.segmento"
        required
      />
    </CInputGroup>
    <CInputGroup class="mb-3">
      <CInputGroupText style="background-color: black;">
        <CIcon icon="cil-globe-alt" style="font-weight: bold; color: white;" />
      </CInputGroupText>
      <CFormInput
        floatingLabel="DNS"
        type="text"
        v-model="formDataRed.dns"
        required
      />
    </CInputGroup>
    <CInputGroup class="mb-3">
      <CInputGroupText style="background-color: black;">
        <CIcon icon="cil-storage" style="font-weight: bold; color: white;" />
      </CInputGroupText>
      <CFormInput
        floatingLabel="VLAN"
        type="text"
        v-model="formDataRed.vlan"
        required
      />
    </CInputGroup>
    <CInputGroup class="mb-3">
      <CInputGroupText style="background-color: black;">
        <CIcon icon="cil-lan" style="font-weight: bold; color: white;" />
      </CInputGroupText>
      <CFormInput
        floatingLabel="Switch de Red"
        type="text"
        v-model="formDataRed.switchRed"
        required
      />
    </CInputGroup>
    <CInputGroup class="mb-3">
      <CInputGroupText style="background-color: black;">
        <CIcon icon="cil-transfer" style="font-weight: bold; color: white;" />
      </CInputGroupText>
      <CFormInput
        floatingLabel="Puerto"
        type="text"
        v-model="formDataRed.puerto"
        required
      />
    </CInputGroup>
    <CInputGroup class="mb-3">
      <CInputGroupText style="background-color: black;">
        <CIcon icon="cil-calendar" style="font-weight: bold; color: white;" />
      </CInputGroupText>
      <CFormInput
        floatingLabel="Fecha de Registro"
        type="text"
        :value="formattedDate"
        readonly
        disabled
      />
    </CInputGroup>
    <div class="mb-3">
      <c-form-label style="color: black;">Seleccione el Estado Inicial.</c-form-label>
      <CFormSelect v-model="formDataRed.estado" required>
        <option value="1">Activo</option>
        <option value="0">Inactivo</option>
      </CFormSelect>
    </div>
    <CButtonGroup style="display: flex; justify-content: space-between; width: 100%;">
      <CButton type="button" class="botoncito" @click="volver">
        Volver
      </CButton>
      <CButton type="submit" class="botoncito">Guardar</CButton>
    </CButtonGroup>
  </CForm>

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

    const formDataRed = ref({
        idEquipo: 0,
        ip: '',
        segmento: '',
        dns: '',
        vlan: '',
        switchRed: '',
        puerto: '',
        fechaRegistro: '',
        estado: 0
    });

    const formattedDate = ref('');

    // Esto equivale a "onCreate"
        onMounted(() => {
      const now = new Date();
      formattedDate.value = now.toLocaleDateString();
        const isoDate = now.toISOString().split('T')[0];
      formDataRed.value.idEquipo = parseInt(route.params.id);
      formDataRed.value.fechaRegistro = isoDate;
    });

    const submitRed = async () => {
        try {
      
            console.log('Datos a guardar:', formDataRed.value);
            const inventarioService = new InventarioService();
            await inventarioService.añadirRed(formDataRed.value);
            alert('✅ Red guardada correctamente');
            router.push({
            name: "DetallesEquipoView",
            params: {
                id: formDataRed.value.idEquipo
            }
            });
        } catch (error) {
            console.error('Error al guardar:', error)
            alert('❌ Error al guardar la red.')
        }

    };

    return {
      formDataRed,
      formattedDate,
      submitRed,
    };
  },
};
</script>
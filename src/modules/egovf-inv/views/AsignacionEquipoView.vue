<template>
  <h3 class="text-center mb-4" style="color: black; font-weight: bold;">
    Nueva Asignación.
  </h3>
  <c-form @submit.prevent="submitPertenece">
    <CInputGroup class="mb-3">
      <CInputGroupText id="basic-addon1" style="background-color: black;">
        <CIcon icon="cil-user" style="font-weight: bold; color: white;"/> 
      </CInputGroupText>        
      <CFormInput
        floatingLabel="Ingrese el CIF:"
        type="number"
        id="cif"
        v-model.number="formDataPertenece.cif"
        required
      />
    </CInputGroup>
    <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon1" style="background-color: black;">
          <CIcon icon="cil-calendar" style="font-weight: bold; color: white;"/> 
        </CInputGroupText>        
        <CFormInput
        floatingLabel="Fecha Actual:"
          :value="formattedDate"
          type="text"
          id="cif"
          v-model.number="formattedDate"
          readonly
          dislabled
        />
      </CInputGroup>
    <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon1" style="background-color: black;">
          <CIcon icon="cil-calendar" style="font-weight: bold; color: white;"/> 
        </CInputGroupText>        
        <CFormInput
        floatingLabel="Fecha Actual:"
          :value="formattedDate"
          type="text"
          id="cif"
          v-model.number="formattedDate"
          readonly
          dislabled
        />
    </CInputGroup>  

    <div class="mb-3">
      <c-form-label style="color: black;">Seleccione el Estado Inicial.</c-form-label>
      <CFormSelect v-model="formDataPertenece.estado" required>
        <option class="select" value="activo">Activo</option>
        <option class="select" value="inactivo">Inactivo</option>
      </CFormSelect>
    </div>

    <CButtonGroup style="display: flex; justify-content: space-between; width: 100%;">
      <CButton  type="button" class="botoncito" @click="volver()">
        Volver
      </CButton>
      <c-button  type="submit" class="botoncito">Guardar</c-button>

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

    const formDataPertenece = ref({
      cif: null,
      idEquipo: null,
      fechaAdd: '',
      fechaDel: '',
      estado: 'activo',
    });

    const formattedDate = ref('');

    // Esto equivale a "onCreate"
    onMounted(() => {
      const now = new Date();
      formattedDate.value = now.toLocaleDateString();
      const isoDate = now.toISOString().split('T')[0];
      formDataPertenece.value.idEquipo = parseInt(route.params.id);
      formDataPertenece.value.fechaAdd = isoDate;
      formDataPertenece.value.fechaDel = isoDate; 
    });

    const submitPertenece = async () => {
      try {
        console.log('Datos a guardar:', formDataPertenece.value);
        const inventarioService = new InventarioService();
        await inventarioService.añadirPertenece(formDataPertenece.value);
        alert('✅ Registro guardado correctamente');
        router.push({
          name: "DetallesEquipoView",
          params: {
            id: formDataPertenece.value.idEquipo
          }
        });
      } catch (error) {
        console.error('Error al guardar:', error);
        alert('❌ El Cif no puede ser el mismo.');
      }
    };

    return {
      formDataPertenece,
      formattedDate,
      submitPertenece,
    };
  },
};
</script>
<style lang="scss">
$form-select-bg: black;
$form-select-color: white;
$form-select-focus-bg: black;
$form-select-focus-color: white;

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
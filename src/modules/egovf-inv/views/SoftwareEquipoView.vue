<template>
    <c-form @submit.prevent="submitSoftware">
  
  <div class="mb-3">
    <c-form-label for="nombre">Nombre del Software</c-form-label>
    <c-form-input v-model="formDataSoftware.nombre" id="nombre" required />
  </div>


  <div class="mb-3">
    <c-form-label for="version">Versión</c-form-label>
    <c-form-input v-model="formDataSoftware.version" id="version" required />
  </div>


  <div class="mb-3">
    <c-form-label>Estado de la Licencia</c-form-label>
    <c-form-select v-model="formDataSoftware.estadoLicencia" required>
      <option value="" disabled selected>Selecciona una opción</option>
      <option value="vigente">Vigente</option>
      <option value="vencida">Vencida</option>
      <option value="por_vencer">Por Vencer</option>
    </c-form-select>
  </div>


  <div class="mb-3">
    <c-form-label>Tipo de Software</c-form-label>
    <c-form-select v-model="formDataSoftware.tipo" required>
      <option value="" disabled selected>Selecciona una opción</option>
      <option value="oficina">Oficina</option>
      <option value="seguridad">Seguridad</option>
      <option value="desarrollo">Desarrollo</option>
      <option value="otros">Otros</option>
    </c-form-select>
  </div>


  <div class="mb-3">
    <c-form-label>Fecha de Registro</c-form-label>
    <p class="form-control">{{ formattedDate }}</p>
  </div>


  <div class="mb-3">
    <c-form-label>Estado</c-form-label>
    <c-form-check
      label="Activo / Inactivo"
      :checked="formDataSoftware.estado === 1"
      @update:checked="toggleEstado"
    />
  </div>


  <c-button type="submit" class="botoncito">Enviar Solicitud</c-button>
</c-form>
</template>
<script>
    import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // Para acceder a $route.params.id
import InventarioService from '../services/inventarioService';
import router from '@/router';

export default {
  setup() {
    const route = useRoute(); // Acceso al router

    const formDataSoftware = ref({
        nombre: '',
        version: '',
        estadoLicencia: '',
        tipo: '',
        fecha: '', 
        estado: 0
    });

    const formattedDate = ref('');

    // Esto equivale a "onCreate"
        onMounted(() => {
      const now = new Date();
      formattedDate.value = now.toLocaleDateString();
        const isoDate = now.toISOString().split('T')[0];
      formDataSoftware.value.idEquipo = parseInt(route.params.id);
      formDataSoftware.value.fechaRegistro = isoDate;
    });

    const submitSoftware = async () => {
        try {
      
            console.log('Datos a guardar:', formDataSoftware.value);
            const inventarioService = new InventarioService();
            await inventarioService.añadirSoftware(formDataSoftware.value);
            alert('✅ Software guardado correctamente');
            router.push({
            name: "DetallesEquipoView",
            params: {
                id: formDataSoftware.value.idEquipo
            }
            });
        } catch (error) {
            console.error('Error al guardar:', error)
            alert('❌ Error al guardar el Software.')
        }

    };

    return {
      formDataSoftware,
      formattedDate,
      submitSoftware,
    };
  },
};

</script>
<template>
  <!-- Componente de Datos de la Persona -->
  <ComponenteDatosPersonalesVue :cifCiudadano="cifCiudadano" :egovfp="egovf" />

  <!-- Componente de Control de Personal -->
  <br />
  <ComponenteMSccVue :mscc="egovf" :empleado="empleado" />
</template>

<script>
// Importamos los Componentes
import ComponenteDatosPersonalesVue from '@/modules/egovf/components/Ciudadano/ComponenteDatosPersonalesVue.vue';
import ComponenteMSccVue from "@/modules/egovf-scc/components/ComponenteMScc.vue";

// End

// Declaramos los Servicios
import EgovfService from "@/modules/egovf/services/egovfService";
import EmpleadoService from "@/modules/egovf-emp/services/empleadoService";
// End

export default {
  name: "ModuloSccView",
  components: {
    ComponenteDatosPersonalesVue,
    ComponenteMSccVue
  },
  props:{
    cifCiudadano:{type:[Number,String], required: true}
  },
  data() {
    return {
      egovfService: null,
      empleadoService: null,

      usuario: {...this.$models.usuarioModel},
      
      egovf: {...this.$models.egovfModel},
      
      empleado: {...this.$models.empleadoModel},
    };
  },
  beforeCreate() {
    if (this.$cookies.get("cif") == null) {
       window.location.href = '/';
    }
  },
  created() {
    this.egovfService = new EgovfService();
    this.empleadoService = new EmpleadoService();
  },
  mounted() {
    this.getDatos();
    this.getEgovf();
    this.getEmpleado();
  },
  methods: {
    getDatos() {
      //cargamos datos del Usuario
      if (this.$cookies.get("cif") != null) {
        this.usuario.token = this.$cookies.get("token");
        this.usuario.cif = this.$cookies.get("cif");
        this.usuario.correo = this.$cookies.get("correo");
        this.usuario.celular = this.$cookies.get("celular");
        this.usuario.pass = this.$cookies.get("pass");
        this.usuario.unidad = this.$cookies.get("unidad");
        this.usuario.sigla = this.$cookies.get("sigla");
        this.usuario.foto = this.$cookies.get("foto");

      }
    },
    async getEgovf() {
      this.egovfService.headersUsuario(this.usuario.token);
      await this.egovfService.getEgovf(this.cifCiudadano).then((response) => {
        this.egovf = response.data;
      });
    },
    async getEmpleado() {
      this.egovfService.headersUsuario(this.usuario.token);
      await this.empleadoService.getEmpleado(this.cifCiudadano).then((response) => {
          this.empleado = response.data;
        });
    },
  },
};
</script>

<template>
  <!-- Componente de Reporte -->
  <ComponenteReporteVue :reporte="reporte" :uri="uri" />
  <!-- Componente de Reporte -->
</template>
<script>
// Importamos los Componentes

import ComponenteReporteVue from "@scc/components/ComponenteReporte.vue";
// End

// Declaramos los Servicios
import EgovfService from "@/services/egovf/egovfService";
import BiometricoService from "@/services/biometricoService";

// End
export default {
  name: "UReporteView",
  components: {
    ComponenteReporteVue,
  },
  data() {
    return {
      titulo: "Reporte de Asistencia",
      biometricoService: null,
      egovfService: null,
      uri: "",
      cifCiudadano: "",
      usuario: {
        token: "",
        cif: "",
        correo: "",
        celular: "",
        pass: "",
        unidad: "",
        sigla: "",
      },
      reporte: {
        cif: 0,
        sigla: "",
        gestion: 0,
        mes: 0,
        di: 0,
        df: 0,
        listaPerfil: [],
        listaHorario: [],
        persona: {
          id: null,
          ci: "",
          nombre: "",
          paterno: "",
          materno: "",
          celular: "",
          correo: "",
          foto: "",
        },
      },
      egovf: {
        idPersona: 0,
        nombre: "",
        paterno: "",
        materno: "",
        fecha: "",
        sexo: 0,
        idUsuario: 0,
        cif: 0,
        matricula: 0,
        ci: "",
        ci_com: 0,
        complemento: "",
        correo: "",
        celular: "",
        pass: "",
        unidad: "",
        dependiente: "",
        sigla: "",
        foto: "",
      },
    };
  },

  mounted() {
    this.uri = this.$route.params.uri;
    this.cifCiudadano = this.$cookies.get("cif");
    this.reporte.cif = this.uri.substring(0, 11);
    this.reporte.gestion = this.uri.substring(12, 16);
    this.reporte.mes = this.uri.substring(17, 19);
    this.reporte.di = this.uri.substring(20, 22);
    this.reporte.df = this.uri.slice(23);
    this.reporte.uri = this.uri;
    this.getDatos();
    this.getEgovf();
    this.getReporteBiometrico();
  },
  beforeCreate() {
    if (this.$cookies.get("cif") == null) {
      this.$router.push("/");
    }
  },
  created() {
    this.biometricoService = new BiometricoService();
    this.egovfService = new EgovfService();
  },
  methods: {
    getDatos() {
      if (this.$cookies.get("cif") != null) {
        this.usuario.token = this.$cookies.get("token");
        this.usuario.cif = this.$cookies.get("cif");
        this.usuario.correo = this.$cookies.get("correo");
        this.usuario.celular = this.$cookies.get("celular");
        this.usuario.pass = this.$cookies.get("pass");
        this.usuario.unidad = this.$cookies.get("unidad");
        this.usuario.sigla = this.$cookies.get("sigla");

        this.titulo = this.usuario.correo + "> " + this.titulo;
      }
    },
    async getEgovf() {
      this.egovfService.headersUsuario(this.usuario.token);
      await this.egovfService.getEgovf(this.cifCiudadano).then((response) => {
        this.egovf = response.data;
      });
      this.reporte.sigla = this.egovf.sigla;

      this.reporte.persona.id = this.egovf.idPersona;
      this.reporte.persona.ci = this.egovf.ci;
      this.reporte.persona.nombre = this.egovf.nombre;
      this.reporte.persona.paterno = this.egovf.paterno;
      this.reporte.persona.materno = this.egovf.materno;
      this.reporte.persona.celular = this.egovf.celular;
      this.reporte.persona.correo = this.egovf.correo;
      this.reporte.persona.foto = this.egovf.foto;
    },
    async getReporteBiometrico() {
      await this.biometricoService
        .getPerfil(this.reporte.cif)
        .then((response) => {
          this.reporte.listaPerfil = response.data;
        });
      this.getListaHorario();
    },
    async getListaHorario() {
      await this.biometricoService
        .getListaHorario(this.cifCiudadano, this.reporte.gestion)
        .then((response) => {
          this.reporte.listaHorario = response.data;
        });
    },
  },
};
</script>

<template>
  <div>
    <ComponenteSidebar :modulo="modulo" />
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <ComponenteHeader :cif="usuario.cif" :foto="usuario.foto" />
      <div class="body flex-grow-1 px-3">
        <CContainer lg>
          <router-view />
        </CContainer>
      </div>
      <ComponenteFooter />
    </div>
  </div>
</template>


<script >
import ModuloService from '@/modules/egovf/services/moduloService'

// Importamos Herramientas
import { CContainer } from '@coreui/vue'
import ComponenteFooter from '@/components/Escritorio/ComponenteFooter.vue'
import ComponenteHeader from '@/components/Escritorio/ComponenteHeader.vue'
import ComponenteSidebar from '@/components/Escritorio/ComponenteSidebar.vue'

export default {
  name: 'EscritorioLayout',
  components: {
    ComponenteFooter,
    ComponenteHeader,
    ComponenteSidebar,
    CContainer
  },
  data() {
    return {
      titulo: 'Escritorio',
      modulo: [
        {
          "id": 1,
          "titulo": "Biblioteca",
          "descripcion": "Módulo principal de biblioteca",
          "icono": "cil-folder-open",
          "importancia": 1,
          "menuDtoObj": [
            {
              "id": 1,
              "titulo": "Biblioteca",
              "ruta": "/biblioteca",
              "icono": "icon",
              "idModulo": 1
            },
            {
              "id": 2,
              "titulo": "Libros",
              "ruta": "/libros",
              "icono": "icon",
              // "idModulo": 1
            },
            {
              "id": 3,
              "titulo": "Préstamos",
              "ruta": "/prestamos",
              "icono": "icon",
              "idModulo": 1
            },
            {
              "id": 4,
              "titulo": "Historial",
              "ruta": "/historial",
              "icono": "cil-settings",
              "idModulo": 1
            }
          ]
        },
        {
          "id": 2,
          "titulo": "Usuarios",
          "descripcion": "Módulo principal de Usuarios",
          "icono": "cil-clipboard",
          "importancia": 1,
          "menuDtoObj": [
            {
              "id": 1,
              "titulo": "Usuarios",
              "ruta": "/usuarios",
              "icono": "icon",
              "idModulo": 1
            },
            {
              "id": 2,
              "titulo": "Lectores",
              "ruta": "/lectores",
              "icono": "icon",
              "idModulo": 1
            },

          ]
        },
        {
          "id": 3,
          "titulo": "UNIDAD",
          "descripcion": "Módulo de unidad",
          "icono": "cil-clipboard",
          "importancia": 1,
          "menuDtoObj": [
            {
              "id": 1,
              "titulo": "Unidad",
              "ruta": "/unidad",
              "icono": "icon",
              "idModulo": 1
            },
            {
              "id": 2,
              "titulo": "Facultad",
              "ruta": "/facultad",
              "icono": "icon",
              "idModulo": 1
            },

          ]
        },
      ],
      moduloService: null,
      usuario: {
        token: '',
        cif: 0,
        correo: '',
        celular: '',
        pass: '',
        unidad: '',
        sigla: '',
        foto: ''
      }
    }
  },
  created() {
    this.moduloService = new ModuloService();
  },
  mounted() {
    this.usuario.token = this.$cookies.get('token');
    this.usuario.cif = this.$cookies.get('cif');
    this.usuario.correo = this.$cookies.get('correo');
    this.usuario.celular = this.$cookies.get('celular');
    this.usuario.pass = this.$cookies.get('pass');
    this.usuario.unidad = this.$cookies.get('unidad');
    this.usuario.sigla = this.$cookies.get('sigla');
    this.usuario.foto = this.$cookies.get('foto');

    this.moduloService.headersUsuario(this.usuario.token);

    // this.getModuloCif();
  },
  methods: {
    async getModuloCif() {
      await this.moduloService.getModuloCif(this.usuario.cif).then((response) => {
        console.log({ response })
        console.log(response.data)
        this.modulo = response.data;
      });
      console.log(this.modulo);
    }
  }
}
</script>

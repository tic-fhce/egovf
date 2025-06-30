<template>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb custom-breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/inventario" class="breadcrumb-link">Inventario</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ titulo }}
        </li>
      </ol>
    </nav>
  
    <h1>{{ titulo }}</h1>
  
    <CRow>
      <CCol :lg="12">
        <CCard>
          <CCardHeader class="headercolor"></CCardHeader>
          <CCardBody>
            <div class="table-responsive">
              <table id="tipoTabla" class="table table-hover align-middle rounded-3 overflow-hidden">
                <thead class="table-p">
                  <tr>
                    <th>ID</th>
                    <th>Código</th>
                    <th>Mac - Serie</th>
                    <th>Detalle</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="equipo in listaEquipo" :key="equipo.id">
                    <td>{{ equipo.id }}</td>
                    <td>{{ equipo.codigo }}</td>
                    <td>{{ equipo.macserie }}</td>
                    <td>{{ equipo.detalle }}</td>
                    <td>
                      <!-- Botones u opciones aquí -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </template>
  
  <script>
  import InventarioService from '@/modules/egovf-inv/services/inventarioService';
  import DataTable from 'datatables.net-vue3';
  import DataTablesLib from 'datatables.net';
  import $ from 'jquery';
  DataTable.use(DataTablesLib);
  
  export default {
    name: 'ListaEquiposView',
    data() {
      return {
        inventarioService: null,
        idEquipo: 0,
        usuario: {
          token: '',
          cif: '',
          correo: '',
          celular: '',
          pass: '',
          unidad: '',
          sigla: '',
          foto: ''
        },
        listaEquipo: [],
        listaTipo: []
      };
    },
    computed: {
      titulo() {
        const tipo = this.listaTipo.find(t => t.id == this.idEquipo);
        return tipo ? tipo.sigla : 'Título por Defecto';
      }
    },
    async mounted() {
      this.idEquipo = this.$route.params.id;
      this.getDatos();
      await this.getInventario();
      await this.getEquipoTipo();
      //this.tablaTipo();
    },
    created() {
      this.inventarioService = new InventarioService();
    },
    beforeCreate() {
      if (this.$cookies.get('cif') == null) {
        this.$router.push('/');
      }
    },
    methods: {
      tablaTipo() {
        this.$nextTick(() => {
          $('#tipoTabla').DataTable({
            destroy: true, // en caso de recarga
            ordering: true,
            searching: true,
            language: {
              url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json"
            }
          });
        });
      },
      getDatos() {
        if (this.$cookies.get('cif') != null) {
          this.usuario.token = this.$cookies.get('token');
          this.usuario.cif = this.$cookies.get('cif');
          this.usuario.correo = this.$cookies.get('correo');
          this.usuario.celular = this.$cookies.get('celular');
          this.usuario.pass = this.$cookies.get('pass');
          this.usuario.unidad = this.$cookies.get('unidad');
          this.usuario.sigla = this.$cookies.get('sigla');
          this.usuario.foto = this.$cookies.get('foto');
        }
      },
      async getEquipoTipo() {
        await this.inventarioService.getEquipoTipo(this.idEquipo).then(response => {
          this.listaEquipo = response.data;
        });
      },
      async getInventario() {
        await this.inventarioService.getTipo().then(response => {
          this.listaTipo = response.data;
        });
      }
    }
  };
  </script>
  
  <style scoped>
  @import 'datatables.net-dt';
  
  ::v-deep .dataTable thead th {
    background-color: #00222f !important;
    color: white !important;
  }
  
  .custom-breadcrumb {
    background-color: transparent;
    padding: 0;
    margin-bottom: 1rem;
  }
  
  .breadcrumb-link {
    text-decoration: none;
    color: #00222f;
    font-weight: 500;
    transition: color 0.3s ease, text-shadow 0.3s ease;
  }
  
  .breadcrumb-link:hover {
    color: white;
    text-shadow: 0 0 10px rgba(7, 26, 59, 0.941);
  }
  
  .breadcrumb-item + .breadcrumb-item::before {
    color: #bbb;
  }
  </style>
  
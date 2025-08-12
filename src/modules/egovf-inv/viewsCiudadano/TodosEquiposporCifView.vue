<template>
<nav aria-label="breadcrumb">
  <ol class="breadcrumb custom-breadcrumb">
    
    <li class="breadcrumb-item active" aria-current="page">
      Inventario
    </li>
    <li class="breadcrumb-item active" aria-current="page">
        <CIcon @click="irCiudadano(cifCiudadano)" class="breadcrumb-link menuicon" icon="cil-user"/>

    </li>
    <li class="breadcrumb-item active" aria-current="page">
        <label @click="irInventario(cifCiudadano)" class="breadcrumb-link">{{ cifCiudadano }} </label>
        
    </li>
    <li>
        <label>Listado de Equipos ></label>
    </li>
  </ol>
</nav>
  
 <div class="d-flex justify-content-between align-items-start mb-3"> 
   <h1>{{ titulo }}</h1>
 <CButton class="boton-agregar" @click="openform(idEquipo)">Agregar Equipo</CButton>
  
 </div>   
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
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="equipo in listaEquipo" :key="equipo.id" @click="getLista(equipo.idEquipo)">
                    <td>{{ equipo.idEquipo }}</td>
                    <td>{{ equipo.codigo }}</td>
                    <td>{{ equipo.macSerie }}</td>
                    <td>{{ equipo.marca }}</td>
                    <td>{{ equipo.modelo }}</td>
                    <td>{{ equipo.detalle }}</td>
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
        const tipo = this.listaTipo.find(t => t.idTipo == this.idEquipo);
        return tipo ? tipo.sigla : 'Título por Defecto';
      }
    },
    async mounted() {
      this.idEquipo = this.$route.params.id;
      this.getDatos();
      await this.getInventario();
      await this.getEquipoTipo();
      this.tablaTipo();
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
      openform(id) {
        this.$router.push({
          name: "AgregarEquipoView",
          params: {
            id: id
          }
        });
      },
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
      },
      getLista(id) {
        this.$router.push({
          name: "DetallesEquipoView",
          params: {
            id: id
          }
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
  ::v-deep .dataTable tbody {cursor: pointer;
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
  .boton-agregar
  {
    background-color: #00222f;
    color: white;
    border: solid 1px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-color: #00222f;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  .boton-agregar:hover {
    background-color: white;
    color: #00222f;
    border-color: #00222f;
  }
  </style>
  
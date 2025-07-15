<template>
    <nav aria-label="breadcrumb">
  <ol class="breadcrumb custom-breadcrumb">
    <li class="breadcrumb-item">
      <router-link to="/inventario" class="breadcrumb-link">Inventario</router-link>
    </li>
    <li class="breadcrumb-item active" aria-current="page">
      Tipos de Equipos >
    </li>
  </ol>
</nav>
    <CRow>
      <CCol :xs="12">
        <CCard class="shadow-sm border-0 rounded-4">
          <CCardHeader class="headercolor d-flex justify-content-between align-items-center rounded-top-4">
            <div class="d-flex align-items-center">
              <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
              <label class="mb-0 fs-5 text-white">{{ titulo }}</label>
            </div>
            <CDropdown variant="btn-group">
              <CDropdownToggle color="dark" class="font border-0 fw-bold shadow-sm" size="sm">
                <CIcon icon="cil-menu" color="dark" class="me-2 text-success" />Opciones
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>
                  <CButton @click="clickModalTipo(true)" size="sm" color="black" class="w-100">➕ Agregar Tipo de Equipo</CButton>
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CCardHeader>
    
          <CCardBody class="bg-light rounded-bottom-4">
            <div class="table-responsive">
              <table id="tipoTabla" class="table table-hover align-middle rounded-3 overflow-hidden">
                <thead class="table-p">
                  <tr>
                    <th class="text-center">ID</th>
                    <th>Sigla</th>
                    <th>Nombre</th>
                    <th>Detalle</th>
                    <th class="text-center">Icono</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="tipo in listaTipo" :key="tipo.id" @click="getLista(tipo.idTipo)">
                    <th class="text-center">{{ tipo.idTipo }}</th>
                    <td>{{ tipo.sigla }}</td>
                    <td>{{ tipo.nombre }}</td>
                    <td>{{ tipo.detalle }}</td>
                   <td class="text-center">
                      <CIcon :icon="tipo.icono" size="lg" />
                    </td> 
                  </tr>
                </tbody>
              </table>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    
    
    <!-- Modal  Tipo de Equipos-->
    <CModal :visible="modalTipo" @close="clickModalTipo(false)">
        <form @submit.prevent="addTipo()">
            <CModalHeader class="headercolor" dismiss @close="clickModalTipo(false)">
                <CModalTitle>
                    <h5>Agregar Tipo de Equipo</h5>
                </CModalTitle>
            </CModalHeader> 
    
            <CModalBody>
    
                <div class="mb-3 row">
                    <label for="datos" class="col-sm-4 col-form-label">Sigla</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="tipo.sigla" required="true">
                    </div>
                </div>
    
                <div class="mb-3 row">
                    <label for="datos" class="col-sm-4 col-form-label">Nombre</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="tipo.nombre" required="true">
                    </div>
                </div>
    
                <div class="mb-3 row">
                    <label for="datos" class="col-sm-4 col-form-label">Icono</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="tipo.icono" required="true">
                    </div>
                </div>
    
                <div class="mb-3 row">
                    <label for="datos" class="col-sm-4 col-form-label">Detalle</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="tipo.detalle" required="true">
                    </div>
                </div>
    
            </CModalBody>
            <CModalFooter>
                <CButton @click="clickModalTipo(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
                <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Agregar Tipo de Equipo</button>
            </CModalFooter>
        </form>
    </CModal>
    <!-- END Modal  Tipo de Equipos-->
    
    
    </template>
    
    <script>
    
    import InventarioService from '@/modules/egovf-inv/services/inventarioService';
    
    
    //Importamos Herramientas 
    import DataTable from 'datatables.net-vue3';
    import DataTablesLib from 'datatables.net';
    import $ from 'jquery';
    
    DataTable.use(DataTablesLib); 
    
    export default {
        name:'EquiposView',
        components:{
            
        },
        data(){
            return {
                titulo:'Tipo de Equipos',
                modalTipo:false,
                inventarioService:null,
                listaTipo:[],
                usuario:{
                    token:'',
                    cif:'',
                    correo:'',
                    celular:'',
                    pass:'',
                    unidad:'',
                    sigla:'',
                    foto:''
                },
                tipo:{
                    sigla:'',
                    nombre:'',
                    icono:'',
                    detalle:''
                }
            }
        },
        beforeCreate(){        
            if(this.$cookies.get('cif')==null){
                this.$router.push('/');
            }
        },
        created(){
            this.inventarioService = new InventarioService();
        },
        mounted(){
            this.getDatos();
            this.getTipo();
            
        },
        methods:{
            
            tablaTipo() {
                this.$nextTick(() => {
                    $('#tipoTabla').DataTable({
                    language: {
                        url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json"
                    }
                    });
                });
            },
            getDatos(){//cargamos datos del Usuario
                if(this.$cookies.get('cif')!=null){
                    this.usuario.token=this.$cookies.get('token');
                    this.usuario.cif=this.$cookies.get('cif');
                    this.usuario.correo=this.$cookies.get('correo');
                    this.usuario.celular=this.$cookies.get('celular');
                    this.usuario.pass=this.$cookies.get('pass');
                    this.usuario.unidad = this.$cookies.get('unidad');
                    this.usuario.sigla = this.$cookies.get('sigla');
                    this.usuario.foto = this.$cookies.get('foto');
                }
            },
            async getTipo(){
                await this.inventarioService.getTipo().then((response) =>{
                    this.listaTipo = response.data;
                    this.tablaTipo();
                });
            },
    
            async addTipo(){ //Funcion para registrar una Observacion del Usuario
                this.$swal.fire({
                    title: 'Desea agregar eL Nuevo tipo de Equipo?',
                    showDenyButton: true,
                    icon:'info',
                    confirmButtonText: 'Aceptar',
                    denyButtonText: 'Cancelar',
                    }).then((result) => {
                    if (result.isConfirmed) {
                        this.inventarioService.addTipo(this.tipo).then(response =>{
                            if(response.status == 201){
                                this.$swal.fire('el Equipo Fue Agregado Corectamente ','', 'success').then((res)=>{
                                    if(res)
                                        location.reload();
                                });
                            }
                            else{
                                this.$swal.fire('El Tipo de Equipo No pudo ser Registrado'+ response.status, '', 'error');
                            }
                        });
    
                    } else if (result.isDenied) {
                        this.$swal.fire('Datos Cancelados', '', 'info');
                    }
                });
                
            },
            clickModalTipo(tipo){
                this.modalTipo = tipo;
          },
          getLista(id){
            this.$router.push({
                name: "ListaEquiposView",
                params: {
                    id:id
                },
            });
        },
    
        }
    }
    </script>
    
    <style scoped>
    @import 'datatables.net-dt';
    ::v-deep .dataTable thead th {
        background-color: #00222f;
        color: white;
    }
    ::v-deep .dataTable tbody tr {
        cursor: pointer ;
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
  color: white; /* verde suave */
  text-shadow: 0 0 10px rgba(7, 26, 59, 0.941); /* brillo sutil */
}

.breadcrumb-item + .breadcrumb-item::before {
  color: #bbb;
}


    </style>
    
<template>
    <CRow>
        <CCol :xs="12">
            <CCard>
                <CCardHeader class="headercolor">
                    <CRow>
                        <CCol :lg="6"><label class="d-none d-md-flex me-auto">{{ titulo }}</label></CCol>
                        <CCol :lg="6" class="text-end">
                            <CDropdown variant="btn-group">
                                <CDropdownToggle  color="success" class="font" size="sm"><CIcon icon="cil-menu" class="me-2"/>Opciones</CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem><CButton @click="clickModalTipo(true)" size="sm">Agregar Tipo de Equipo</CButton></CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <div class="table-responsive">
                        <table id="tipoTabla" class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th><th>Sigla</th><th>Nombre</th><th>Detalle</th><th>Icono</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="tipo in listaTipo" :key="tipo.id">
                                    <th scope="row">{{tipo.id}}</th>
                                    <td>{{tipo.sigla}}</td>
                                    <td>{{tipo.nombre}}</td>
                                    <td>{{ tipo.detalle}}</td>
                                    <td>{{ tipo.icono }}</td>
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
        
        tablaTipo(){
            this.$nextTick(()=>{
                $('#tipoTabla').DataTable();
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
        async getTipo(){// Funcion que regresa una lista de tipos de Empleados 
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

    }
}
</script>

<style scoped>
@import 'datatables.net-dt';
</style>

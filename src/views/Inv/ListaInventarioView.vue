<template>
    <CRow>
        <CCol :xs="12">
            <CCard>
                <CCardHeader class="headercolor">
                    <CRow>
                        <CCol :lg="6"><label class="d-none d-md-flex me-auto">{{ titulo }}</label></CCol>
                        <CCol :lg="6" class="text-end">
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <div class="table-responsive">
                        <table id="inventarioTabla" class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th><th>Datos</th><th>Inventario</th><th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="inventario in listaInventario" :key="inventario.idEquipo">
                                    <th scope="row">{{inventario.idEquipo}}</th>
                                    <td>
                                        {{inventario.nombre}} {{inventario.paterno}} {{inventario.materno}}<br>
                                        {{inventario.ci}}
                                    </td>
                                    <td>
                                        Tipo : {{ inventario.tipo }}<br>Codigo : {{ inventario.codigo }} <br>
                                        <label class="fontabla">{{ inventario.unidad }}</label>
                                    </td>
                                    <td>
                                        <CButton color="success" class="font" @click="getEquipoDetalle(inventario.idEquipo)" size="sm"><CIcon icon="cil-clipboard" class="me-2"/></CButton>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>

<!-- Modal  Equipo Detalle-->
<CModal :visible="modalEquipoDetalle" @close="clickModalEquipoDetalle(false)" size="lg">
    <CModalHeader class="headercolor" dismiss @close="clickModalEquipoDetalle(false)">
        <CModalTitle>
            <h5>Detalle</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <div class="mb-3 row">
            <div class="col-6">
              <h2>Datos del Propietario</h2>
              <img :src="equipoDetalle.foto" width="50%"/>
              <hr>
              <ul>
                <li>CIF : {{ equipoDetalle.cif }}</li>
                <li>Nombre : {{ equipoDetalle.nombre }} {{ equipoDetalle.paterno }} {{ equipoDetalle.materno }}</li>
                <li>C.I. : {{ equipoDetalle.ci }}</li>
                <li>Correo : {{ equipoDetalle.correo }}</li>
                <li>Unidad : {{ equipoDetalle.sigla }}</li>
              </ul>
            </div>
            <div class="col-6">
              <h2>Equipo - {{ equipoDetalle.tipo }}</h2>
              <label>Codigo : {{ equipoDetalle.codigo }}</label><hr>
              <ul v-for="r in equipoDetalle.resumen" :key="r.id">
                <li>{{ r }}</li>
              </ul>
            </div>
        </div>

    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalEquipoDetalle(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
        <CButton @click="getModuloInv(equipoDetalle.cif)" color="success" class="font"><CIcon icon="cil-devices" class="me-2"/>Ver Inventario</CButton>
    </CModalFooter>
</CModal>
<!-- END Modal  Obserbasiones-->

</template>

<script>

import EgovfService from '@/services/egovf/egovfService';
import InventarioService from '@/services/inv/inventarioService';

//Importamos Herramientas 
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import $ from 'jquery';

DataTable.use(DataTablesLib); 

export default {
    name:'ListaInventarioView',
    components:{
        
    },
    data(){
        return {
            titulo:'Inventario',
            modalEquipoDetalle:false,
            empleadoService:null,
            egovfService:null,
            inventarioService:null,
            idtipo:0,
            listaEmpleado:[],
            listaCiudadanos:[],
            listaCiudadanoEmpleado:[],
            listaInventario:[],
            tipoEmpleadoObj:'',
            usuario:{
                token:'',
                cif:'',
                correo:'',
                celular:'',
                pass:'',
                unidad:'',
                sigla:''
            },
            tipoEmpleado:{
                id:0,
                detalle:'',
                corto:'',
                foto:''
            },
            equipoDetalle:{
                idPersona : 0,
                cif : 0,
                nombre : '',
                paterno : '',
                materno : '',
                ci : '',
                correo : '',
                celular : '',
                sigla : '',
                unidad : '',
                foto : '',
                idEquipo : 0,
                tipo : '',
                codigo : 0,
                resumen : []
            }
        }
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
        this.egovfService = new EgovfService();
        this.inventarioService = new InventarioService();
    },
    mounted(){
        this.idtipo = this.$route.params.idtipo; //resivimos el id del tipo de empleado
        this.getDatos();
        this.getListaEquipo();
    },
    methods:{
        tablaInventario(){
            this.$nextTick(()=>{
                $('#inventarioTabla').DataTable();
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

                this.egovfService.headersUsuario(this.usuario.token);
            }
        },
        async getListaEquipo(){ // Funcion que regresa una lista de Ciudadanos que son Empleados del ModuloEgovf
            await this.inventarioService.getListaEquipo(this.idtipo).then(response => {
                this.listaEquipo = response.data;
                this.getListaEmpleado();
            });
        },
        async getListaEmpleado(){ // Funcion que regresa una lista de Ciudadanos que son Empleados del ModuloEgovf
            await this.egovfService.getListaEmpleado().then(response => {
                this.listaEmpleado = response.data;
                this.getListaInventario();
            });
        },
        getListaInventario(){//Funcion que una las listas listaEmpelado y listaCiudadanoEmpleado
            this.listaInventario = [];
            this.listaEmpleado.forEach(empleado =>{
                this.listaEquipo.forEach(equipo =>{
                    var e ={
                        idPersona:0,
                        cif:0,
                        nombre:'',
                        paterno:'',
                        materno:'',
                        ci:'',
                        correo:'',
                        celular:'',
                        sigla:'',
                        unidad:'',
                        foto:'',
                        idEquipo:0,
                        tipo:'',
                        codigo:'',
                        resumen:[]
                    };
                    if(equipo.cif == empleado.cif){
                        e.idPersona = empleado.idPersona;
                        e.cif = empleado.cif;
                        e.nombre = empleado.nombre;
                        e.paterno = empleado.paterno;
                        e.materno = empleado.materno;
                        e.ci = empleado.ci;
                        e.correo = empleado.correo;
                        e.celular = empleado.celular;
                        e.sigla = empleado.sigla;
                        e.unidad = empleado.unidad;
                        e.foto = empleado.foto;
                        e.idEquipo = equipo.id;
                        e.tipo = equipo.tipo;
                        e.codigo = equipo.codigo;
                        e.resumen = equipo.resumen;
                        console.log(e.resumen);
                        this.listaInventario.push(e);
                        return false;
                    }
                    return true;
                })
            });
            this.tablaInventario();
        },
        // Funcion El tipo de Empleado {adminsitrativo, docente, etc.}
        async getTipoEmpleado() {
            await this.empleadoService.getTipoEmpleado(this.id_empleado).then((response) => {
                this.tipoEmpleadoObj = response.data;
            });
            this.titulo = this.tipoEmpleadoObj.detalle;
        },
        getEquipoDetalle(id){
            this.listaInventario.forEach(inventario => {
                if(inventario.idEquipo == id){
                    this.equipoDetalle = inventario;
                }
            });
            this.clickModalEquipoDetalle(true);
        },
        clickModalEquipoDetalle(cio){
            this.modalEquipoDetalle = cio;
        },
        
        getModuloInv(cif){
            this.clickModalEquipoDetalle(false);
            this.$router.push({
                name: "ModuloInvView",
                params:{
                    cifCiudadano:cif
                }
            });
        }
    }
}
</script>

<style scoped>
@import 'datatables.net-dt';
</style>

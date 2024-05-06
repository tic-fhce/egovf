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
                                        {{inventario.ci}}<br>
                                        {{inventario.celular}}
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

<!-- Modal  Obserbasiones-->
<CModal :visible="modalObs" @close="clickModalObs(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalObs(false)">
        <CModalTitle>
            <h5>Agregar Observaciones de Asistencia</h5>
        </CModalTitle>
    </CModalHeader>

    <CModalBody>
        <form @submit.prevent="addObsAll()" enctype="multipart/form-data">
            <div class="mb-3 row">
                <label for="sexo" class="col-sm-4 col-form-label">Caracteristica</label>
                <div class="col-sm-8">
                <select class="form-control" v-model="obsall.sexo" required="true">
                    <option value="0">Todos</option>
                    <option value="1">Femenino</option>
                    <option value="2">Masculino</option>
                </select>
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-sm-4 col-form-label">UID - OBS</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="obsall.uidobs" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-sm-4 col-form-label">Fecha de Inicio</label>
                <div class="col-sm-8">
                    <input type="date" class="form-control" v-model="obsall.fechainicio" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-sm-4 col-form-label">Fecha Fin</label>
                <div class="col-sm-8">
                    <input type="date" class="form-control" v-model="obsall.fechafin" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-sm-4 col-form-label">Detalle</label>
                <div class="col-sm-8">
                    <textarea class="form-control" v-model="obsall.detalle" required="true"></textarea>
                </div>
            </div>

            <div class="mb-3 row">
                <label for="tipo" class="col-sm-4 col-form-label">Tipo</label>
                <div class="col-sm-8">
                    <select class="form-control" v-model="obsall.tipo" required="true">
                        <option value="Entrada M.">Entrada Mañana</option>
                        <option value="Salida M.">Salida Mañana</option>
                        <option value="Entrada T.">Entrada Tarde</option>
                        <option value="Salida T.">Salida Tarde</option>
                        <option value="continuo">Continuo</option>
                        <option value="horas">Horas de Servicio</option>
                        <option value="extraordinario">Horario Extraordinario</option>
                        <option value="comision">Comisión</option>
                        <option value="permiso">Permiso</option>
                        <option value="asueto">Asueto</option>
                    </select>
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-sm-4 col-form-label">Hora</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="obsall.hora">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="archivo" class="col-sm-4 col-form-label">Documento</label>
                <div class="col-sm-8">
                    <input type="file" ref="obsfile" class="form-control" @change="selectFile()" required="true">
                </div>
            </div>
            <hr> 

            <div class="mb-3 row text-center" >
                <div class="col-sm-12 ">
                    <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Agregar Observaciones</button>
                </div>
            </div>

        </form>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalObs(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
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
            modalObs:false,
            modalRecord:false,
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
        clickModalObs(cio){
            this.modalObs = cio;
        },
        clickModalRecord(modal){
            this.modalRecord = modal;
        },
        moduloScc(cif){
            this.$router.push({
                name: "ModuloSccView",
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

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
                        <table id="atencionTabla" class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th><th>Datos</th><th>Resumen</th><th>Datos de Solicitud</th><th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="atencion in listaAtencion" :key="atencion.idAtencion">
                                    <th scope="row">{{atencion.idAtencion}}</th>
                                    <td>
                                        {{atencion.nombre}} {{atencion.paterno}} {{atencion.materno}}<br>
                                        {{ atencion.cif }}<br>
                                        {{atencion.ci}}
                                    </td>
                                    <td>
                                        {{ atencion.equipo }}<br>{{ atencion.codigo }}<br>
                                        <label class="fontabla">{{ atencion.unidad }}</label>
                                    </td>
                                    <td>Fecha : {{ atencion.fechasolicitud }}<br>Hora : {{ atencion.horasolicitud }}</td>
                                    <td>
                                        <CButtonGroup role="group">
                                            <CButton color="success" class="font" size="sm" @click="getAtencionDetalle(atencion.idAtencion)"><CIcon icon="cil-featured-playlist"></CIcon></CButton>
                                            <CButton color="warning" class="font" size="sm" @click="getUpdateAtencion(atencion.idAtencion)"><CIcon icon="cil-pencil"></CIcon></CButton>
                                        </CButtonGroup> 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>

<!-- Modal  Registro Atencion-->
<CModal :visible="modalRegistroAtencion" @close="clickModalRegistroAtencion(false)">
    <form @submit.prevent="updateRegistroAtencion()">
        <CModalHeader class="headercolor" dismiss @close="clickModalRegistroAtencion(false)">
            <CModalTitle>
                <h5>Registrar Atencion de Empleado</h5>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <div class="mb-3 row">
                <div class="col-12">
                    <ul>
                        <li><strong>ID : </strong>{{ updateAtencion.idAtencion }}</li>
                        <li><strong>Codigo : </strong>{{ updateAtencion.codigo }}</li>
                        <li><strong>Fecha de Solicitud : </strong>{{ updateAtencion.fechasolicitud }}</li>
                        <li><strong>Hora : </strong>{{ updateAtencion.horasolicitud }}</li>
                        <li><strong>Caracteristica : </strong>{{ updateAtencion.caracteristica }}</li>
                        <li><strong>Especificacion : </strong>{{ updateAtencion.especificacion }}</li>
                    </ul>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="error" class="col-4 col-form-label">Error Encontrado : </label>
                <div class="col-8">
                    <textarea  cols="30" rows="3" class="form-control" v-model="updateAtencion.error" required="true"></textarea>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="error" class="col-4 col-form-label">Solucion : </label>
                <div class="col-8">
                    <textarea  cols="30" rows="3" class="form-control" v-model="updateAtencion.detalle" required="true"></textarea>
                </div>
            </div>
        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalRegistroAtencion(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
            <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Registrar Asistencia Tecnica</button>
        </CModalFooter>
    </form>
</CModal>
<!-- END Modal  Registro Atencion-->

<!-- Modal  Atencion Detalle-->
<CModal :visible="modalAtencionDetalle" @close="clickModalAtencionDetalle(false)" size='lg'>
    <CModalHeader class="headercolor" dismiss @close="clickModalAtencionDetalle(false)">
        <CModalTitle>
            <h5>Detalle Solicitud de Asistencia Tecnica</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        
        <CRow>
            <CCol :lg="12">
                <div class="mb-3 row">
                    <div class="col-6">
                        <label for="cif"><strong>CIF : </strong> {{ atencionDetalle.cif }}</label><br>
                        <label for="datos"><strong>Empleado : </strong>{{ atencionDetalle.nombre }} {{ atencionDetalle.paterno }} {{ atencionDetalle.materno }}</label>
                        <label for="datos"><strong>C.I. : </strong>{{ atencionDetalle.ci }}</label><br>
                        <label for="datos"><strong>Celular. : </strong>{{ atencionDetalle.celular }}</label><br>
                        <label for="datos"><strong>Unidad : </strong>{{ atencionDetalle.unidad }}</label>
                    </div>
                    <div class="col-6">
                        <img :src="atencionDetalle.foto" width="30%"/>
                    </div>
                </div>

                <CAlert color="success" v-if="atencionDetalle.estado === 1">Atendido</CAlert>
                <CAlert color="warning" v-else>En Espera</CAlert>

                <div class="mb-3 row">
                    <label for="id" class="col-4 col-form-label"><strong>ID : </strong> {{ atencionDetalle.idAtencion }}</label>
                    <label for="tipo" class="col-4 col-form-label"><strong>Tipo : </strong>{{ atencionDetalle.equipo }}</label>
                    <label for="tipo" class="col-4 col-form-label"><strong>Codigo : </strong>{{ atencionDetalle.codigo}}</label>
                </div>
                <hr>
                <div class="mb-3 row">
                    <label for="fecha" class="col-6 col-form-label"><strong>Fecha de Solicitud : </strong></label>
                    <label for="fecha" class="col-6 col-form-label">{{ atencionDetalle.fechasolicitud }} {{ atencionDetalle.horasolicitud }}</label>                    
                </div>
                
                <div class="mb-3 row">
                    <div class="col-4">
                        <ul>
                            <li v-for="resumen in atencionDetalle.resumen" :key="resumen.id">{{ resumen }}</li>                            
                        </ul>
                    </div>
                    <div class="col-8">
                        <ul>
                            <li>Caracteristica : {{ atencionDetalle.caracteristica }}</li>
                            <li>Detalle : {{ atencionDetalle.especificacion }}</li>                            
                        </ul>
                    </div>
                </div>

                <hr>
                <div class="mb-3 row">
                    <label for="fecha" class="col-6 col-form-label"><strong>Fecha de Atencion : </strong></label>
                    <label for="fecha" class="col-6 col-form-label">{{ atencionDetalle.fechaatencion }} {{ atencionDetalle.horaatencion }}</label>                    
                </div>
                
                <div class="mb-3 row">
                    <label for="fecha" class="col-6 col-form-label">Error Encontrado : {{atencionDetalle.error}}</label>
                    <label for="fecha" class="col-6 col-form-label">Solucion : {{atencionDetalle.detalle}}</label>
                </div>
            </CCol>
        </CRow>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalAtencionDetalle(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
    </CModalFooter>
</CModal>
<!-- END Modal  Atencion Detalle-->

</template>

<script>

import EgovfService from '@/modules/egovf/services/egovfService';
import InventarioService from '@/services/inv/inventarioService';

//Importamos Herramientas 
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import $ from 'jquery';

DataTable.use(DataTablesLib); 

export default {
    name:'AtEsperaInvView',
    components:{
        
    },
    data(){
        return {
            titulo:'Atencion Tecnica En Espera',
            modalAtencionDetalle:false,
            modalRegistroAtencion:false,
            empleadoService:null,
            egovfService:null,
            inventarioService:null,
            idtipo:0,
            listaEmpleado:[],
            listaCiudadanos:[],
            listaCiudadanoEmpleado:[],
            listaAtencion:[],
            listaAtencionEspera:[],
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
            atencionDetalle:{
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
                idAtencion:0,
                codigo:'',
                fechasolicitud:'',
                horasolicitud:'',
                equipo:'',
                idTipo:0,
                idCaracteristica:0,
                resumen:[],
                caracteristica:'',
                especificacion:'',
                error :'',
                detalle:'',
                fechaatencion:'',
                horaatencion:'',
                estado:0,
            },
            updateAtencion:{
                idAtencion:0,
                cif:0,
                codigo:'',
                fechasolicitud:'',
                horasolicitud:'',
                equipo:'',
                idTipo:0,
                idCaracteristica:0,
                resumen:[],
                caracteristica:'',
                especificacion:'',
                error :'',
                detalle:'',
                fechaatencion:'',
                horaatencion:'',
                estado:0,
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
        this.getDatos();
        this.getAtencionEspera();
    },
    methods:{
        tablaAtencion(){
            this.$nextTick(()=>{
                $('#atencionTabla').DataTable();
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
        async getAtencionEspera(){ // Funcion que regresa una lista de Ciudadanos que son Empleados del ModuloEgovf
            await this.inventarioService.getAtencionEspera().then(response => {
                this.listaAtencionEspera = response.data;
                this.getListaEmpleado();
            });
        },
        async getListaEmpleado(){ // Funcion que regresa una lista de Ciudadanos que son Empleados del ModuloEgovf
            await this.egovfService.getListaEmpleado().then(response => {
                this.listaEmpleado = response.data;
                this.getListaAtencionEspera();
            });
        },
        async updateRegistroAtencion(){// funcion para Agregar  Una Atencion
            this.clickModalRegistroAtencion(false);
            await this.$swal.fire({
                title: 'Desea Registrar la Asistencia Tecnica ?',
                showDenyButton: true,
                icon:'info',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.inventarioService.updateRegistroAtencion(this.updateAtencion).then(response =>{
                        if(response.status == 200){
                            this.$swal.fire('La Atencion Tecnica fue Registrada Correctamente.','', 'success').then((res)=>{
                                if(res)
                                    location.reload();
                            });
                        }
                        else{
                            this.$swal.fire('Los Datos no fueron Guardados Error', ''+ response.status, 'error');
                        }
                    });
                    
                } else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });
        },
        getListaAtencionEspera(){//Funcion que una las listas listaEmpelado y listaCiudadanoEmpleado
            this.listaAtencion = [];
            this.listaEmpleado.forEach(empleado =>{
                this.listaAtencionEspera.forEach(atencion =>{
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
                        idAtencion:0,
                        codigo:'',
                        fechasolicitud:'',
                        horasolicitud:'',
                        equipo:'',
                        idTipo:0,
                        idCaracteristica:0,
                        resumen:[],
                        caracteristica:'',
                        especificacion:'',
                        error :'',
                        detalle:'',
                        fechaatencion:'',
                        horaatencion:'',
                        estado:0,
                    };
                    if(atencion.cif == empleado.cif){
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
                        e.idAtencion = atencion.id,
                        e.codigo = atencion.codigo,
                        e.fechasolicitud = atencion.fechasolicitud,
                        e.horasolicitud  = atencion.horasolicitud,
                        e.equipo = atencion.equipo,
                        e.idTipo = atencion.idtipo,
                        e.idCaracteristica = atencion.idcaracteristica,
                        e.resumen = atencion.resumen,
                        e.caracteristica = atencion.caracteristica,
                        e.especificacion = atencion.especificacion,
                        e.error  = atencion.error,
                        e.detalle = atencion.detalle,
                        e.fechaatencion = atencion.fechaatencion,
                        e.horaatencion = atencion.horaatencion,
                        e.estado = atencion.estado,
                        this.listaAtencion.push(e);
                        return false;
                    }
                    return true;
                })
            });
            this.tablaAtencion();
        },
        clickModalRegistroAtencion(cio){
            this.modalRegistroAtencion = cio;
        },
        clickModalAtencionDetalle(detalle){
            this.modalAtencionDetalle = detalle;
        },        
        getAtencionDetalle(id){// Funcion que Muestra el detalle de las Atenciones del Empleado
            this.listaAtencion.forEach(atencion =>{
                if(atencion.idAtencion === id){
                    this.atencionDetalle.idPersona = atencion.idPersona,
                    this.atencionDetalle.cif = atencion.cif,
                    this.atencionDetalle.nombre = atencion.nombre,
                    this.atencionDetalle.paterno = atencion.paterno,
                    this.atencionDetalle.materno = atencion.materno,
                    this.atencionDetalle.ci = atencion.ci,
                    this.atencionDetalle.correo = atencion.correo,
                    this.atencionDetalle.celular = atencion.celular,
                    this.atencionDetalle.sigla = atencion.sigla,
                    this.atencionDetalle.unidad = atencion.unidad,
                    this.atencionDetalle.foto = atencion.foto,
                    this.atencionDetalle.idAtencion = atencion.idAtencion,
                    this.atencionDetalle.codigo = atencion.codigo,
                    this.atencionDetalle.fechasolicitud = atencion.fechasolicitud,
                    this.atencionDetalle.horasolicitud = atencion.horasolicitud,
                    this.atencionDetalle.equipo = atencion.equipo,
                    this.atencionDetalle.idTipo = atencion.idTipo,
                    this.atencionDetalle.idCaracteristica = atencion.idCaracteristica,
                    this.atencionDetalle.resumen = atencion.resumen,
                    this.atencionDetalle.caracteristica = atencion.caracteristica,
                    this.atencionDetalle.especificacion = atencion.especificacion,
                    this.atencionDetalle.error  = atencion.error,
                    this.atencionDetalle.detalle = atencion.detalle,
                    this.atencionDetalle.fechaatencion = atencion.fechaatencion,
                    this.atencionDetalle.horaatencion = atencion.horaatencion,
                    this.atencionDetalle.estado = atencion.estado
                }
            });
            this.clickModalAtencionDetalle(true);
        },
        getUpdateAtencion(id){
            this.listaAtencion.forEach(atencion =>{
                if(atencion.idAtencion == id){
                    this.updateAtencion.idAtencion = atencion.idAtencion,
                    this.updateAtencion.cif = atencion.cif,
                    this.updateAtencion.codigo = atencion.codigo,
                    this.updateAtencion.fechasolicitud = atencion.fechasolicitud,
                    this.updateAtencion.horasolicitud = atencion.horasolicitud,
                    this.updateAtencion.equipo = atencion.equipo,
                    this.updateAtencion.idTipo = atencion.idTipo,
                    this.updateAtencion.idCaracteristica = atencion.idCaracteristica,
                    this.updateAtencion.resumen = atencion.resumen,
                    this.updateAtencion.caracteristica = atencion.caracteristica,
                    this.updateAtencion.especificacion = atencion.especificacion,
                    this.updateAtencion.error  = atencion.error,
                    this.updateAtencion.detalle = atencion.detalle,
                    this.updateAtencion.fechaatencion = atencion.fechaatencion,
                    this.updateAtencion.horaatencion = atencion.horaatencion,
                    this.updateAtencion.estado = atencion.estado
                }
            });
            this.clickModalRegistroAtencion(true);
        }
    }
}
</script>

<style scoped>
@import 'datatables.net-dt';
</style>

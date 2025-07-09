<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb custom-breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/tipoempleado" class="breadcrumb-link">Tipo Empleado</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                {{titulo}} >
            </li>
        </ol>
    </nav>
    <CRow>
        <CCol :xs="12">
            <CCard>
                <CCardHeader class="headercolor d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                        <label class="mb-0 fs-5 text-white">{{ titulo }}</label>
                    </div>
                    <CDropdown variant="btn-group">
                        <CDropdownToggle  color="dark" class="font border-0 shadow-sm" size="sm"><CIcon icon="cil-menu" class="me-2 text-success"/>Opciones</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem><CButton @click="clickModalObs(true)" size="sm" ><CIcon icon="cil-medical-cross" size="lg" class="me-2" /> Agregar Observaciones</CButton></CDropdownItem>
                            <CDropdownDivider/>
                            <CDropdownItem><CButton @click="clickModalRecord(true)" size="sm"><CIcon icon="cil-cloud-download" size="lg" class="me-2" /> Extraer Record</CButton></CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </CCardHeader>

                <CCardBody>
                    <div class="table-responsive">
                        <table id="ciudadanoTabla" class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th><th>Foto</th><th>CIF</th><th>Datos</th><th>Unidad</th><th>Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="ciudadano in listaCiudadanos" :key="ciudadano.idPersona">
                                    <th scope="row">{{ciudadano.idPersona}}</th>
                                    <td><CImage :src="'https://fhcevirtual.umsa.bo/egovf-img/imagenes/200/'+ ciudadano.foto"  width="70" height="70"/></td>
                                    <td>
                                        {{ciudadano.cif}}
                                        <CProgress>
                                            <CProgressBar :key="ciudadano.idPersona" :color="ciudadano.color" :value="ciudadano.total">{{ ciudadano.total }} %</CProgressBar>
                                        </CProgress>
                                    </td>
                                    <td>
                                        {{ciudadano.nombre}} {{ciudadano.paterno}} {{ciudadano.materno}}<br>
                                        {{ciudadano.ci}}<br>
                                        {{ciudadano.celular}}
                                    </td>
                                    <td>
                                        {{ ciudadano.sigla }}<br> 
                                        <label class="fontabla">{{ ciudadano.unidad }}</label>
                                    </td>
                                    <td>
                                        <CButtonGroup role="group">
                                            <CButton v-if="ciudadano.modulo.toLowerCase() === 'modulo scc'" color="success" class="font" @click="moduloScc(ciudadano.cif)" size="sm"><CIcon icon="cil-clipboard"/></CButton>
                                            <CButton v-if="ciudadano.total === 100" color="danger" class="font" @click="moduloEmp(ciudadano.cif)" size="sm"><CIcon icon="cil-trash"/></CButton>
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

<!-- Modal  Obserbasiones-->
<CModal :visible="modalObs" @close="clickModalObs(false)">
    <form @submit.prevent="addObsAll()" enctype="multipart/form-data">
        <CModalHeader class="headercolor" dismiss @close="clickModalObs(false)">
            <CModalTitle>
                <h6><CIcon icon="cil-medical-cross" size="lg" class="me-2"/> Agregar Observaciones de Asistencia</h6>
            </CModalTitle>
        </CModalHeader>

        <CModalBody>
        
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
                    <select class="form-control" v-model="obsall.tipo" required="true" @change="getTipo()">
                        <option value="Entrada M.">Entrada Mañana</option>
                        <option value="Salida M.">Salida Mañana</option>
                        <option value="Entrada T.">Entrada Tarde</option>
                        <option value="Salida T.">Salida Tarde</option>
                        <option value="continuo">Continuo</option>
                        <option value="continuoingreso">Continuo e Ingreso</option>
                        <option value="horas">Horas de Servicio</option>
                        <option value="extraordinario">Horario Extraordinario</option>
                        <option value="comision">Comisión</option>
                        <option value="permiso">Permiso</option>
                        <option value="asueto">Asueto</option>
                    </select>
                </div>
            </div>

            <div class="mb-3 row" v-if="mostrarHoraIngreso()"  >
                <label for="datos" class="col-sm-4 col-form-label">Hora Ingreso</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="obsall.horaEntrada">
                </div>
            </div>

            <div class="mb-3 row" v-if="mostrarHoraSalida()">
                <label for="datos" class="col-sm-4 col-form-label">Hora Salida</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="obsall.horaSalida">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="archivo" class="col-sm-4 col-form-label">Documento</label>
                <div class="col-sm-8">
                    <input type="file" ref="obsfile" class="form-control" @change="selectFile()" required="true">
                </div>
            </div>
        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalObs(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
            <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Agregar Observaciones</button>
        </CModalFooter>
    </form>
</CModal>
<!-- END Modal  Obserbasiones-->


<!-- Modal  Record-->
<CModal :visible="modalRecord" @close="clickModalRecord(false)">
    <form @submit.prevent="getRecord()">
        <CModalHeader class="headercolor" dismiss @close="clickModalRecord(false)">
            <CModalTitle>
                <h6><CIcon icon="cil-cloud-download" size="lg" class="me-2" /> Extraer Record de Asistencias</h6>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
        
            <div class="mb-3 row">
                <label for="gestiones" class="col-sm-6 col-form-label">Gestion</label>
                <div class="col-sm-6">
                    <select v-model="record.gestion" class="form-control">
                        <option v-for="y  in listaGestion" :key="y" :value="y">{{y}}</option>
                    </select>
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-sm-6 col-form-label">Mes</label>
                <div class="col-sm-6">
                    <select class="form-control" v-model="record.mes">
                        <option v-for = "mes in listaMes" :key = "mes" :value = "mes.m">{{ mes.mes }}</option>
                    </select>
                </div>
            </div>
        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalRecord(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
            <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Record</button>
        </CModalFooter>
    </form>
</CModal>
<!-- END Modal  Record-->


</template>

<script>

import EgovfService from '@/modules/egovf/services/egovfService';
import EmpleadoService from '@/modules/egovf-emp/services/empleadoService';
import UploadService from '@/services/upload/uploadService';
import SccService from '@/modules/egovf-scc/services/sccService';

//Importamos Herramientas 
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import $ from 'jquery';

DataTable.use(DataTablesLib); 

export default {
    name:'ListaEmpleadoView',
    components:{
        
    },
    data(){
        return {
            titulo:'Tipo Empleado',
            modalObs:false,
            modalRecord:false,
            empleadoService:null,
            egovfService:null,
            uploadService:null,
            sccService:null,
            id_empleado:0,
            listaEmpleado:[],
            listaCiudadanos:[],
            listaCiudadanoEmpleado:[],
            listaGestion:[],
            listaMes:[{m:"01",mes:"Enero"},{m:"02",mes:"Febrero"},{m:"03",mes:"Marzo"},{m:"04",mes:"Abril"},{m:"05",mes:"Mayo"},{m:"06",mes:"Junio"},{m:"07",mes:"Julio"},{m:"08",mes:"Agosto"},{m:"09",mes:"Septiembre"},{m:"10",mes:"Octubre"},{m:"11",mes:"Noviembre"},{m:"12",mes:"Diciembre"}],
            archivo:'',
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
            obsall:{
                cif:null,
                sexo:'',
                uidobs:'',
                fechainicio:'',
                fechafin:'',
                detalle:'',
                tipo:'Seleccionar Tipo',
                horaEntrada:'08:30',
                horaSalida:'18:30',
                imagen:'',
                url:''
            },
            record:{
                gestion:2023,
                mes:0,
                tipo:0
            }
        }
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
        this.empleadoService = new EmpleadoService();
        this.egovfService = new EgovfService();
        this.sccService = new SccService();
        this.uploadService = new UploadService();
    },
    mounted(){
        this.id_empleado = this.$route.params.id; //resivimos el id del tipo de empleado
        this.getDatos();
        this.getTipoEmpleado();
        this.getListaEmpleado();
        this.getGestion();
    },
    methods:{
        selectFile(){// Funcion que permite cambiar los datos del archivo
            this.archivo = this.$refs.obsfile.files[0];
        },
        tablaEmpleado(){
            this.$nextTick(()=>{
                $('#ciudadanoTabla').DataTable();
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
                this.usuario.foto = this.$cookies.get("foto");

                this.egovfService.headersUsuario(this.usuario.token);
            }
        },
        async getListaEmpleado(){// Funcion que regresa una lista de Empleados del ModuloEMP 
            await this.empleadoService.getListaEmpleado(this.id_empleado).then((response) =>{
                this.listaEmpleado = response.data;
                this.getListaCiudadanoEmpleado();
            });
        },
        async getListaCiudadanoEmpleado(){ // Funcion que regresa una lista de Ciudadanos que son Empleados del ModuloEgovf
            await this.egovfService.getListaEmpleado().then(response => {
                this.listaCiudadanoEmpleado = response.data;
                this.getListaCiudadano();
            });
        },
        getListaCiudadano(){//Funcion que una las listas listaEmpelado y listaCiudadanoEmpleado
            this.listaCiudadanos = [];
            this.listaEmpleado.forEach(empleado =>{
                this.listaCiudadanoEmpleado.forEach(ciudadano =>{
                    var ce ={
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
                        modulo:'',
                        total:0,
                        color:''
                    };
                    if(empleado.cif == ciudadano.cif){
                        ce.idPersona = ciudadano.idPersona;
                        ce.cif = empleado.cif;
                        ce.nombre = ciudadano.nombre;
                        ce.paterno = ciudadano.paterno;
                        ce.materno = ciudadano.materno;
                        ce.ci = ciudadano.ci;
                        ce.correo = ciudadano.correo;
                        ce.celular = ciudadano.celular;
                        ce.sigla = ciudadano.sigla;
                        ce.unidad = ciudadano.unidad;
                        ce.foto = ciudadano.foto;
                        ce.modulo = empleado.empleado;
                        ce.color = this.esFechaPasada(empleado.salida);
                        ce.total = this.calcularDiasRestantes(empleado.fecha,empleado.salida);
                        this.listaCiudadanos.push(ce);
                        return false;
                    }
                    return true;
                })
            });
            this.tablaEmpleado();
        },
        async addObsAll(){ //Funcion para registrar una Observacion del Usuario
            const fromData = new FormData();
            fromData.append('archivo',this.archivo);
            try{
                //primero subimos el archivo
                await this.uploadService.addImagen(fromData).then((response)=>{
                    if(response.status == 200){
                        this.obsall.url = this.uploadService.getUrl()+ response.data.nombre;
                        this.obsall.imagen = response.data.nombre;
                        this.obsall.cif = this.id_empleado;
                        this.$swal.fire({
                            title: 'Desea agregar la Observacione de Asistencia a los Empleados?',
                            showDenyButton: true,
                            icon:'info',
                            confirmButtonText: 'Aceptar',
                            denyButtonText: 'Cancelar',
                            }).then((result) => {
                            if (result.isConfirmed) {
                                this.sccService.addObsAll(this.obsall).then(response =>{
                                    if(response.status == 200){
                                        this.$swal.fire('Las Observaciones fueron Agregados Corectamente ','', 'success').then((res)=>{
                                            if(res)
                                                location.reload();
                                        });
                                    }
                                    else{
                                        this.$swal.fire('Las Observaciones no fueron Guardados Error'+ response.status, '', 'error');
                                    }
                                });
                                
                            } else if (result.isDenied) {
                                this.$swal.fire('Datos Cancelados', '', 'info');
                            }
                        });

                    }
                    else {
                        this.$swal.fire('El archivo no pudo ser Guardado  ','', 'error');
                    }
                });
            }catch(err){
                this.$swal.fire('El archivo no pudo ser Guardado  '+ err, 'error');
            }
        },
        getGestion(){ // funcion que crea una lista de gestiones desde el 2021
            var lgestion=[];
            const fecha = new Date();
            var rgestion = fecha.getFullYear();
            this.record.gestion = rgestion;
            for(var i=2021; i<= rgestion; i++){
                lgestion.push(i);
            }
            this.listaGestion = lgestion;
        },
        async getTipoEmpleado() {
            // Funcion El tipo de Empleado {adminsitrativo, docente, etc.}
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
        },
        moduloEmp(cif){
            this.$router.push({
                name: "ModuloEmpView",
                params:{
                    cifCiudadano:cif
                }
            });
        },
        getRecord(){
            this.record.tipo=this.id_empleado;
            this.clickModalRecord(false);
            this.$router.push({
                name: "RecordView",
                params:{
                    uri:this.record.gestion+'j'+this.record.mes+'m'+this.record.tipo
                }
            });
        },
        getTipo(){
            if(this.obsall.tipo == 'Entrada M.')
                this.obsall.horaEntrada = '08:30';
            if(this.obsall.tipo == 'Salida M.')
                this.obsall.horaSalida = '12:30';
            if(this.obsall.tipo == 'Entrada T.')
                this.obsall.horaEntrada = '14:30';
            if(this.obsall.tipo == 'Salida T.')
                this.obsall.horaSalida = '18:30';
            if(this.obsall.tipo == 'continuo')
                this.obsall.horaSalida = '16:30';
            if(this.obsall.tipo == 'continuoingreso'){
                this.obsall.horaEntrada = '08:30';
                this.obsall.horaSalida = '16:30';
            }
            if(this.obsall.tipo == 'asueto')
                this.obsall.horaEntrada = '08:30';
        },
        mostrarHoraIngreso() {
            const tiposPermitidos = ["continuoingreso", "Entrada M.", "Entrada T.","horas","extraordinario","comision","permiso"];
            return tiposPermitidos.includes(this.obsall.tipo);
        },
        mostrarHoraSalida() {
            const tiposPermitidos = ["continuoingreso","continuo", "Salida M.", "Salida T."];
            return tiposPermitidos.includes(this.obsall.tipo);
        },
        esFechaPasada(fechaSalida) {
        if (!fechaSalida) return 'warning';
        
            const fechaTermino = new Date(fechaSalida);
            const hoy = new Date();
            
            // Normalizar fechas (ignorar horas)
            fechaTermino.setHours(0, 0, 0, 0);
            hoy.setHours(0, 0, 0, 0);
            
            return fechaTermino < hoy ? 'danger' : 'success';
        },
        calcularDiasRestantes(fi,fs) {
            const fechaInicio = new Date(fi);
            const fechaSalida = new Date(fs);
            const diasTotales = Math.floor((fechaSalida - fechaInicio) / (1000 * 60 * 60 * 24));
            const fechaActual = new Date();
            if (!fechaSalida) return 0;
            
            if (fechaActual >= fechaSalida) return 100;

            const diasPasados = Math.floor((fechaActual - fechaInicio) / (1000 * 60 * 60 * 24));
            const progreso = (diasPasados / diasTotales) * 100;
            return parseInt(progreso < 0 ? 0 : progreso.toFixed(2));
        }
    }
}
</script>

<style scoped>
@import 'datatables.net-dt';
</style>

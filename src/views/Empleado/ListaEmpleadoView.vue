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
                                    <CDropdownItem><CButton @click="clickModalObs(true)" size="sm">Agregar Observaciones</CButton></CDropdownItem>
                                    <CDropdownDivider/>
                                    <CDropdownItem><CButton @click="clickModalRecord(true)" size="sm">Extraer Record</CButton></CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </CCol>
                    </CRow>
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
                                    <td><CAvatar :src="ciudadano.foto" size="md"/></td>
                                    <td>{{ciudadano.cif}}</td>
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
                                        <CButton color="success" class="font" @click="moduloScc(ciudadano.cif)" size="sm"><CIcon icon="cil-clipboard" class="me-2"/>MSCC</CButton>
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


<!-- Modal  Record-->
<CModal :visible="modalRecord" @close="clickModalRecord(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalRecord(false)">
        <CModalTitle>
            <h5>Extraer Record de Asistencias</h5>
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
        <CButton @click="getRecord()" color="success" class="font"><CIcon icon="cil-clipboard" class="me-2"/>Record</CButton>
    </CModalFooter>
</CModal>
<!-- END Modal  Record-->


</template>

<script>

import EgovfService from '@/services/egovf/egovfService';
import EmpleadoService from '@/services/emp/empleadoService';
import UploadService from '@/services/upload/uploadService';
import BiometricoService from '@/services/biometricoService';

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
            biometricoService:null,
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
                uidobs:'',
                sexo:'',
                fechainicio:'',
                fechafin:'',
                detalle:'',
                tipo:'Seleccionar Tipo',
                hora:'08:30',
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
        this.biometricoService = new BiometricoService();
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
            console.log(this.archivo);
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
                        foto:''
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
                                this.biometricoService.addObsAll(this.obsall).then(response =>{
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
        }
    }
}
</script>

<style scoped>
@import 'datatables.net-dt';
</style>

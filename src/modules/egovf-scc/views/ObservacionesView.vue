<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb custom-breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/menumoduloscc" class="breadcrumb-link">Modulo M-SCC</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                {{titulo}} >
            </li>
        </ol>
    </nav>
    <CRow>
        <CCol :lg="12">
            <CCard>
                <CCardHeader class="headercolor d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                        <label class="mb-0 fs-5 text-white">{{ titulo }}</label>
                    </div>
                    <CDropdown variant="btn-group">
                        <CDropdownToggle  color="dark" class="font border-0 shadow-sm" size="sm"><CIcon icon="cil-menu" class="me-2 text-success"/>Opciones</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem><CButton @click="clickModalObs(true)" size="sm" ><CIcon icon="cil-medical-cross" class="me-2" /> Agregar Observaciones</CButton></CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol :lg="2">Gestion :</CCol>
                        <CCol :lg="2">
                            <select v-model="obsgestion"  class="form-control">
                                <option v-for="y  in listaGestion" :key="y" :value="y">{{y}}</option>
                            </select>                                                    
                        </CCol>
                        <CCol :lg="2">Mes :</CCol>
                        <CCol :lg="2">
                            <select v-model="obsmes" class="form-control">
                                <option v-for = "mes in listaMes" :key = "mes" :value = "mes.m">{{ mes.mes }}</option>
                            </select>
                            <br>
                        </CCol>
                        <CCol :lg="4" class="text-center">
                            <CButton color="success" class="font" size="sm" @click="getObsUsuario()"><CIcon icon="cil-featured-playlist"></CIcon> Cargar Observaciones</CButton>
                        </CCol>
                    </CRow>
                </CCardBody>
                <CCardFooter class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th><th>UidObs</th><th>Tipo</th><th>Detalle</th><th>Estado</th><th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="lsobs in listaObs" :key="lsobs.id">
                                <td>{{ lsobs.id }}</td>
                                <td>{{ lsobs.uidobs }}</td>
                                <td>
                                    <div>{{ lsobs.tipo }}</div>
                                    <div class="small text-medium-emphasis">
                                        <span>{{ lsobs.horaEntrada }}</span> | {{ lsobs.horaSalida }}
                                    </div>
                                </td>
                                <td>
                                    <div>{{ lsobs.detalle }}</div>
                                    <div class="small text-medium-emphasis">
                                        <span>{{ lsobs.fechainicio }}</span> | {{ lsobs.fechafin }}
                                    </div>
                                </td>
                                <td>
                                    <CBadge color="success" v-if="lsobs.estado === 1">Aprobado</CBadge>
                                    <CBadge color="warning" v-if="lsobs.estado === 0">En Espera</CBadge>
                                </td>
                                <td>
                                    <CButtonGroup role="group">
                                        <CButton color="success" class="font" size="sm" @click="getObsDetalle(lsobs.id)"><CIcon icon="cil-featured-playlist"></CIcon></CButton>
                                        <CButton v-if="lsobs.estado == 0" color="warning" class="font" size="sm" @click="setObs(lsobs.id)"><CIcon icon="cil-pencil"></CIcon></CButton>
                                        <CButton v-if="lsobs.estado == 0" color="danger" class="font" size="sm" @click="deleteObs(lsobs.id)"><CIcon icon="cil-trash"></CIcon></CButton>
                                    </CButtonGroup>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                            </tr>
                        </tfoot>
                    </table>
                    
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>

<!-- Modal  Detalles de OBS-->
<CModal size="lg" :visible="modalDetalleObs" @close="clickModalDetalleObs(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalDetalleObs(false)">
        <CModalTitle>
            <h6><CIcon icon="cil-medical-cross" size="lg" class="me-2"/>Detalles de la Observacion</h6>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <CRow>
            <CCol :lg="6">
                <ComponenteNombres :datos="datos" />
                <br>
                <CAlert :color="this.color">{{this.estado}}</CAlert>
                <CWidgetStatsB class="mb-3" :progress="{ color:this.color, value: 100}">
                    <template #text>
                    {{ obsDetalle.detalle }}<br>
                    <strong>Tipo de Obs. :</strong> {{ obsDetalle.tipo }}<br> 
                    <strong>Fechas: </strong> {{ obsDetalle.fechainicio }} | {{ obsDetalle.fechafin }}<br>
                    <strong>Horas: </strong> 
                    <span class="small text-medium-emphasis">{{ obsDetalle.horaEntrada }}</span> | 
                    <span class="small text-medium-emphasis">{{ obsDetalle.horaSalida }}</span> 
                    </template>
                    <template #title><strong>ID:</strong> {{ obsDetalle.id }} | <strong>IDOBS : </strong> {{ obsDetalle.idObs }}</template>
                    <template #value>UID: {{ obsDetalle.uidobs }}</template>
                </CWidgetStatsB>
            </CCol>
            <CCol :lg="6">
                <img :src="obsDetalle.url" alt="" class="img-fluid">
            </CCol>
        </CRow>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalDetalleObs(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
        <CButton @click="downloadImg(obsDetalle.url,obsDetalle.imagen)" color="success" class="font"><CIcon icon="cil-cloud-download" class="me-2"/>Descargar Documento</CButton>
    </CModalFooter>
</CModal>
<!-- END Modal  Detalles de Obs-->

<!-- Modal  Obserbasiones-->
<CModal :visible="modalObs" @close="clickModalObs(false)">
    <form @submit.prevent="addObs()" enctype="multipart/form-data">
        <CModalHeader class="headercolor text-center" dismiss @close="clickModalObs(false)">
            <CModalTitle>
                <h6><CIcon icon="cil-medical-cross" size="lg" class="me-2"/>Registrar una Observacion de Asistencia</h6>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <ComponenteNombres :datos="datos" />
            <hr>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">UID - OBS :</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="obs.uidobs" required="true" placeholder="Ej. FHCE - # de hoja de Ruta">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Fecha de Inicio :</label>
                <div class="col-8">
                    <input type="date" class="form-control" v-model="obs.fechainicio" required="true">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Fecha Fin :</label>
                <div class="col-8">
                    <input type="date" class="form-control" v-model="obs.fechafin" required="true">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Detalle :</label>
                <div class="col-8">
                    <textarea class="form-control" v-model="obs.detalle" required="true"></textarea>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="tipo" class="col-4 col-form-label">Tipo :</label>
                <div class="col-8">
                    <select class="form-control" v-model="obs.tipo" required="true" @change="getTipo()">
                        <option value="Entrada M.">Entrada Mañana</option>
                        <option value="Salida M.">Salida Mañana</option>
                        <option value="Entrada T.">Entrada Tarde</option>
                        <option value="Salida T.">Salida Tarde</option>
                        <option value="continuo">Continuo</option>
                        <option value="continuoingreso">Continuo e Ingreso</option>
                        <option value="asueto">Asueto</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row" v-if="mostrarHoraIngreso()"  >
                <label for="datos" class="col-sm-4 col-form-label">Hora Ingreso :</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="obs.horaEntrada">
                </div>
            </div>

            <div class="mb-3 row" v-if="mostrarHoraSalida()">
                <label for="datos" class="col-sm-4 col-form-label">Hora Salida :</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="obs.horaSalida">
                </div>
            </div>
            <div 
            class="mb-3 row">
                <label for="archivo" class="col-4 col-form-label">Documento :</label>
                <div class="col-8">
                    <input type="file" ref="file" class="form-control" accept="image/png,image/jpeg" @change="selectFile()" required="true">
                </div>
            </div>
        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalObs(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
            <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Agregar Observacion</button>
        </CModalFooter>
    </form>
</CModal>

<!-- Modal Editar Obserbasiones-->
<CModal :visible="modalObsEditar" @close="clickModalObsEditar(false)">
    <form @submit.prevent="updateObs()" enctype="multipart/form-data">
        <CModalHeader class="headercolor text-center" dismiss @close="clickModalObsEditar(false)">
            <CModalTitle>
                <h6><CIcon icon="cil-pencil" size="lg" class="me-2"/>Actualizar la Observacion de Asistencia</h6>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <ComponenteNombres :datos="datos" />
            <hr>
            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">UID - OBS</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="uobs.uidobs" required="true" placeholder="FHCE - Numero Hoja de Ruta">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Fecha de Inicio</label>
                <div class="col-8">
                    <input type="date" class="form-control" v-model="uobs.fechainicio" required="true">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Fecha Fin</label>
                <div class="col-8">
                    <input type="date" class="form-control" v-model="uobs.fechafin" required="true">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Detalle</label>
                <div class="col-8">
                    <textarea class="form-control" v-model="uobs.detalle" required="true"></textarea>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="tipo" class="col-4 col-form-label">Tipo</label>
                <div class="col-8">
                    <select class="form-control" v-model="uobs.tipo" required="true" @change="getUTipo()">
                        <option value="Entrada M.">Entrada Mañana</option>
                        <option value="Salida M.">Salida Mañana</option>
                        <option value="Entrada T.">Entrada Tarde</option>
                        <option value="Salida T.">Salida Tarde</option>
                        <option value="continuo">Continuo</option>
                        <option value="continuoingreso">Continuo e Ingreso</option>
                        <option value="asueto">Asueto</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row" v-if="mostrarUHoraIngreso()"  >
                <label for="datos" class="col-sm-4 col-form-label">Hora Ingreso</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="uobs.horaEntrada">
                </div>
            </div>

            <div class="mb-3 row" v-if="mostrarUHoraSalida()">
                <label for="datos" class="col-sm-4 col-form-label">Hora Salida{{ uobs.horaEntrada }}</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="uobs.horaSalida">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="archivo" class="col-4 col-form-label">Documento</label>
                <div class="col-8">
                    <input type="file" ref="file" class="form-control" accept="image/png,image/jpeg" @change="selectFile()" required="true">
                </div>
            </div>

        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalObsEditar(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
            <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Actualizar Observacion</button>
        </CModalFooter>
    </form>
</CModal>
<!-- END Modal Editar Obserbasiones-->

</template>
<script>
// Importamos Componentes
import ComponenteNombres from '@/modules/egovf/components/Ciudadano/ComponenteNombres.vue';

//Importamos Servicios
import SccService from '@/modules/egovf-scc/services/sccService';
import EgovfService from '@/modules/egovf/services/egovfService';
import UploadService from '@/services/upload/uploadService';

export default {
    name:'ObservacionesView',
    components:{
        ComponenteNombres
    },
    data(){
        return {
            titulo:'Observaciones',
            archivo:'',
            sccService:null,
            egovfService :null,
            uploadService:null,
            modalDetalleObs:false,
            modalObsEditar:false,
            listaGestion:[],
            color:'',
            estado:'',
            listaMes:[{m:"01",mes:"Enero"},{m:"02",mes:"Febrero"},{m:"03",mes:"Marzo"},{m:"04",mes:"Abril"},{m:"05",mes:"Mayo"},{m:"06",mes:"Junio"},{m:"07",mes:"Julio"},{m:"08",mes:"Agosto"},{m:"09",mes:"Septiembre"},{m:"10",mes:"Octubre"},{m:"11",mes:"Noviembre"},{m:"12",mes:"Diciembre"}],
            usuario:{
                token:'',
                cif:'',
                correo:'',
                celular:'',
                pass:'',
                unidad:'',
                sigla:''
            },
            obsgestion:0,
            obsmes:0,
            listaObs:[],
            obsDetalle:{
                id:0,
                idObs:"",
                cif:0,
                sexo:0,
                uidobs:"",
                fechainicio:"",
                fechafin:"",
                gestion:0,
                mes:0,
                di:0,
                df:0,
                detalle:"",
                imagen:"",
                tipo:"",
                horaEntrada:0,
                hEntrada:0,
                mEntrada:0,
                horaSalida:0,
                hSalida:0,
                mSalida:0,
                url:"",
                estado:0
            },
            datos:{
                cif:0,
                nombre:'',
                apellido:''
            },
            egovf:{
                idPersona:0,
                nombre:'',
                paterno:'',
                materno:'',
                fecha:'',
                sexo:0,
                idUsuario:0,
                cif:0,
                matricula:0,
                ci:'',
                ci_com:0,
                complemento:'',
                correo:'',
                celular:'',
                pass:'',
                unidad:'',
                dependiente:'',
                sigla:''
            },
            modalObs:false,
            obs:{
                cif:null,
                uidobs:'',
                fechainicio:'',
                fechafin:'',
                detalle:'Referencia por la que pide su Observación',
                imagen:'',
                tipo:'Seleccionar Tipo',
                horaEntrada:'08:30',
                horaSalida:'16:30',
                url:'',
                estado:0
            },
            uobs:{
                id:0,
                idObs:0,
                cif:null,
                sexo:0,
                uidobs:'',
                fechainicio:'',
                fechafin:'',
                detalle:'',
                imagen:'',
                tipo:'',
                horaEntrada:'',
                horaSalida:'',
                url:'',
                estado:0
            },
        }
    },
    mounted(){
        this.cifCiudadano = this.$cookies.get('cif');
        this.getDatos();
        this.getGestion();
        this.getEgovf();
    },
    created(){
        //Creamos los Sercicios
        this.sccService = new SccService();
        this.egovfService = new EgovfService();
        this.uploadService = new UploadService();
    },
    methods:{
        selectFile(){// Funcion que permite cambiar los datos del archivo
            this.archivo = this.$refs.file.files[0];
        },
        getDatos(){
            //cargamos datos del Usuario
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
        getGestion(){ // funcion que crea una lista de gestiones desde el 2021
            var lgestion=[];
            const fecha = new Date();
            this.obsgestion = fecha.getFullYear();
            for(var i=2021; i<= this.obsgestion; i++){
                lgestion.push(i);
            }
            this.listaGestion = lgestion;
        },
        async getObsUsuario(){ // Funcion que llama una lista de Observaciones del usuario 
            await this.sccService.getObsUsuario(this.usuario.cif,this.obsgestion,this.obsmes).then(response=>{
                this.listaObs = response.data;
            });
            if(this.listaObs.length == 0){
                this.$swal.fire('No se encontro ninguna Observacion', '', 'info');
            }
        },
        getObsDetalle(id){// Funcion que Muestra el detalle de las Observaciones del Usuario
            this.listaObs.forEach(obs =>{
                if(obs.id === id){
                    this.obsDetalle.id = obs.id;
                    this.obsDetalle.idObs= obs.idObs;
                    this.obsDetalle.cif= obs.cif;
                    this.obsDetalle.sexo= obs.sexo;
                    this.obsDetalle.uidobs= obs.uidobs;
                    this.obsDetalle.fechainicio= obs.fechainicio;
                    this.obsDetalle.fechafin= obs.fechafin;
                    this.obsDetalle.gestion= obs.gestion;
                    this.obsDetalle.mes= obs.mes;
                    this.obsDetalle.di= obs.di;
                    this.obsDetalle.df= obs.df;
                    this.obsDetalle.detalle= obs.detalle;
                    this.obsDetalle.imagen= obs.imagen;
                    this.obsDetalle.tipo= obs.tipo;
                    this.obsDetalle.horaEntrada= obs.horaEntrada;
                    this.obsDetalle.hEntrada= obs.hEntrada;
                    this.obsDetalle.mEntrada= obs.mEntrada;
                    this.obsDetalle.horaSalida= obs.horaSalida;
                    this.obsDetalle.hSalida= obs.hSalida;
                    this.obsDetalle.mSalida= obs.mSalida;
                    this.obsDetalle.url= obs.url;
                    this.obsDetalle.estado= obs.estado;

                    if(this.obsDetalle.estado==1){
                        this.color='success';
                        this.estado='Aprobado';
                    }
                    else{
                        this.color='warning';
                        this.estado='En Espera';
                    }
                    return true;
                }
            });
            this.clickModalDetalleObs(true);
        },
        clickModalDetalleObs(Obs){
            this.modalDetalleObs = Obs;
        },
        async getEgovf(){
            this.egovfService.headersUsuario(this.usuario.token);
            await this.egovfService.getEgovf(this.usuario.cif).then((response) =>{
                this.egovf = response.data;
                this.datos.cif = this.egovf.cif;
                this.datos.nombre = this.egovf.nombre;
                this.datos.apellido = this.egovf.paterno +" " +this.egovf.materno;
            });
        },
        async downloadImg(Url,nombre) {// Funcion que permite Descargar imagen o documento
            const blob = await (await fetch(Url)).blob();
            const url = URL.createObjectURL(blob);
            Object.assign(document.createElement('a'), { href: url, download: nombre }).click();
            URL.revokeObjectURL(url);
        },
        clickModalObs(cio){
            this.modalObs = cio;
        },
        getTipo(){
            if(this.obs.tipo == 'Entrada M.')
                this.obs.horaEntrada = '08:30';
            if(this.obs.tipo == 'Salida M.')
                this.obs.horaSalida = '12:30';
            if(this.obs.tipo == 'Entrada T.')
                this.obs.horaEntrada = '14:30';
            if(this.obs.tipo == 'Salida T.')
                this.obs.horaSalida = '18:30';
            if(this.obs.tipo == 'continuo')
                this.obs.horaSalida = '16:30';
            if(this.obs.tipo == 'continuoingreso'){
                this.obs.horaEntrada = '08:30';
                this.obs.horaSalida = '16:30';
            }
            if(this.obs.tipo == 'asueto')
                this.obs.horaEntrada = '08:30';
        },
        mostrarHoraIngreso() {
            const tiposPermitidos = ["continuoingreso", "Entrada M.", "Entrada T.","horas","extraordinario","comision","permiso"];
            return tiposPermitidos.includes(this.obs.tipo);
        },
        mostrarHoraSalida() {
            const tiposPermitidos = ["continuoingreso","continuo", "Salida M.", "Salida T."];
            return tiposPermitidos.includes(this.obs.tipo);
        },

        getUTipo(){
            if(this.uobs.tipo == 'Entrada M.')
                this.uobs.horaEntrada = '08:30';
            if(this.uobs.tipo == 'Salida M.')
                this.uobs.horaSalida = '12:30';
            if(this.uobs.tipo == 'Entrada T.')
                this.uobs.horaEntrada = '14:30';
            if(this.uobs.tipo == 'Salida T.')
                this.uobs.horaSalida = '18:30';
            if(this.uobs.tipo == 'continuo'){
                this.uobs.horaEntrada = '08:30';
                this.uobs.horaSalida = '16:30';
            }
            if(this.uobs.tipo == 'continuoingreso'){
                this.uobs.horaEntrada = '08:30';
                this.uobs.horaSalida = '16:30';
            }
            if(this.uobs.tipo == 'asueto')
                this.uobs.horaEntrada = '08:30';
        },
        mostrarUHoraIngreso() {
            const tiposPermitidos = ["continuoingreso", "Entrada M.", "Entrada T.","horas","extraordinario","comision","permiso"];
            return tiposPermitidos.includes(this.uobs.tipo);
        },
        mostrarUHoraSalida() {
            const tiposPermitidos = ["continuoingreso","continuo", "Salida M.", "Salida T."];
            return tiposPermitidos.includes(this.uobs.tipo);
        },

        async addObs(){ //Funcion para registrar una Observacion del Usuario
            const fromData = new FormData();
            fromData.append('archivo',this.archivo);
            try{
                //primero subimos el archivo
                await this.uploadService.addImagen(fromData).then((response)=>{
                if(response.status == 200){
                    this.obs.url = this.uploadService.getUrl()+ response.data.nombre;
                    this.obs.imagen = response.data.nombre;
                    this.obs.cif = this.usuario.cif;
                    this.$swal.fire({
                        title: 'Deseas Agregar la Observacion de Tu Asistencia ?',
                        showDenyButton: true,
                        icon:'info',
                        confirmButtonText: 'Aceptar',
                        denyButtonText: 'Cancelar',
                        }).then((result) => {
                        if (result.isConfirmed) {
                            this.sccService.addObsEmpleado(this.obs).then(response =>{
                                if(response.status == 201){
                                    this.$swal.fire('La Observacion fue Agregada Corectamente','Recuerda que para que tenga efecto debe de ser aprobada por tu inmediato superior', 'success').then((res)=>{
                                        if(res)
                                            location.reload();
                                    });
                                }
                                else{
                                    this.$swal.fire('La Observacion no pudo ser Registrada', ''+ response.status, 'error');
                                }
                            });
                            
                        } else if (result.isDenied) {
                            this.$swal.fire('Datos Cancelados', '', 'info');
                        }
                    });

                }
                else {
                    this.$swal.fire('El archivo no pudo ser Guardado  ', '','error');
                }
            });
            }catch(err){
                this.$swal.fire('El archivo no pudo ser Guardado  '+ err,'', 'error');
            }
        },
        async updateObs(){ //Funcion actualizar una Observacion del Usuario
            const fromData = new FormData();
            fromData.append('archivo',this.archivo);
            try{
                //primero subimos el archivo
                await this.uploadService.addImagen(fromData).then((response)=>{
                if(response.status == 200){
                    this.uobs.url = this.uploadService.getUrl()+ response.data.nombre;
                    this.uobs.imagen = response.data.nombre;
                    this.$swal.fire({
                        title: 'Deseas Actualizar la Observacion de Tu Asistencia ?',
                        showDenyButton: true,
                        icon:'info',
                        confirmButtonText: 'Aceptar',
                        denyButtonText: 'Cancelar',
                        }).then((result) => {
                        if (result.isConfirmed) {
                            this.sccService.updateObsEmpleado(this.uobs).then(response =>{
                                if(response.status == 200){
                                    this.$swal.fire('La Observacion fue Actualizada Corectamente','Recuerda que para que tenga efecto debe de ser aprobada por tu inmediato superior', 'success').then((res)=>{
                                        if(res)
                                            location.reload();
                                    });
                                }
                                else{
                                    this.$swal.fire('La Observacion no pudo ser Actualizada', ''+ response.status, 'error');
                                }
                            });
                            
                        } else if (result.isDenied) {
                            this.$swal.fire('Datos Cancelados', '', 'info');
                        }
                    });

                }
                else {
                    this.$swal.fire('El archivo no pudo ser Guardado  ', '','error');
                }
            });
            }catch(err){
                this.$swal.fire('El archivo no pudo ser Guardado  '+ err,'', 'error');
            }
        },
        clickModalObsEditar(cio){
            this.modalObsEditar = cio;
        },
        setObs(id){// Funcion que carga los datos de las Observaciones del Usuario
            this.listaObs.forEach(obs =>{
                if(obs.id === id){
                    this.uobs.id = id;
                    this.uobs.idObs = obs.idObs;
                    this.uobs.cif = obs.cif;
                    this.uobs.sexo = obs.sexo;
                    this.uobs.uidobs = obs.uidobs;
                    this.uobs.fechainicio = obs.fechainicio;
                    this.uobs.fechafin = obs.fechafin;
                    this.uobs.detalle = obs.detalle;
                    this.uobs.imagen = obs.imagen;
                    this.uobs.tipo = obs.tipo;
                    this.uobs.horaEntrada = obs.horaEntrada;
                    this.uobs.horaSalida = obs.horaSalida;
                    this.uobs.url = obs.url;
                    this.uobs.estado = obs.estado;
                }
            });
            this.clickModalObsEditar(true);
        },
        async deleteObs(id){ //Funcion eliminar una Observacion del Usuario
            var dObs={
                id:0,
                idObs:"",
                cif:0,
                sexo:0,
                uidobs:"",
                fechainicio:"",
                fechafin:"",
                gestion:0,
                mes:0,
                di:0,
                df:0,
                detalle:"",
                imagen:"",
                tipo:"",
                horaEntrada:0,
                hEntrada:0,
                mEntrada:0,
                horaSalida:0,
                hSalida:0,
                mSalida:0,
                url:"",
                estado:0
            };
            this.listaObs.forEach(obs => {
                if(obs.id == id){
                    dObs=obs;
                    dObs.estado=2;
                }
            });
            await this.$swal.fire({
                title: 'Desea Eliminar la Observacion ? ',
                showDenyButton: true,
                icon:'error',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.sccService.updateObsEmpleado(dObs).then(response=>{
                        if(response.status == 200){
                            this.$swal.fire('Observacion Eliminada Corectamente', '', 'success').then((res)=>{
                                if(res)
                                    location.reload();
                            });
                        }
                        else{
                            this.$swal.fire('Los Datos no fueron Guardados Error'+ response.status, '', 'error');
                        }
                    });
                    
                } else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });  
        }
    }

}
</script>
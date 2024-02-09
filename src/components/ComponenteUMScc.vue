<template>
    <div class="row">
        <div class="card col-md-12">
            <div class="row">
                <div class="card-header headercolor">
                    <div class="row">
                        <nav class="navbar navbar-expand-lg navbar-dark">
                            <div class="container-fluid">
                                <label class="navbar-brand">Modulo SCC</label>
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mscc" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse" id="mscc">
                                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li class="nav-item dropdown">
                                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Mis Reportes
                                            </a>
                                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#reportemensualModal">Reporte Mensual</a></li>
                                                <li><a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#reportemensualsegmentadoModal">Reporte Segmentado</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>

                <div class="card-body">
                    <div class="row">
                        <ul class="nav nav-tabs" id="myTabBiometrico" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="user-tab" data-bs-toggle="tab" data-bs-target="#datosUsuario" type="button" role="tab"  aria-selected="true">Biometrico</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="user-tab" data-bs-toggle="tab" data-bs-target="#horarioUsuario" type="button" role="tab"  aria-selected="true">Horarios</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="user-tab" data-bs-toggle="tab" data-bs-target="#observacionesUsuario" type="button" role="tab"  aria-selected="true">Obs</button>
                            </li>
                        </ul><!--termina Ul-->

                        <div class="tab-content" id="myTabContentBiometricoUsuario">
                            <!--Datos del Biometrico-->
                            <div class="tab-pane fade show active" id="datosUsuario" role="tabpanel" aria-labelledby="datos-tab">
                                <div class ="row">
                                    <div class="col-md-3 espace" v-for="perfil in listaPerfilUsuario" :key="perfil.id">
                                        <div class="card">
                                            <div class="card-header headercolor">UID : {{perfil._01user_id}}</div>
                                            <div class="card-body">
                                                <label>ID Biometrico : {{perfil.id}}</label><br>
                                                <label>UID : {{perfil._01user_id}}</label><br>
                                                <label>Nombre : {{perfil._02nombre}}</label><br>
                                                <label v-if="perfil._04estado == 0">Estado : <button class="badge bg-success" @click="estadoInactibo(perfil)">Activo</button></label>
                                                <label v-else>Estado : <button class="badge bg-danger" @click="estadoActibo(perfil)">Inactivo</button></label><br>
                                                <label>Lugar : {{perfil._06lugar}}</label><br>
                                                        
                                            </div>
                                            <div class="card-footer">
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--END Datos del Biometrico-->

                            <!--Horario-->
                            <div class="tab-pane fade" id="horarioUsuario" role="tabpanel" aria-labelledby="mensula-tab">
                                <!--Horario Actual -->
                                <div class="row">
                                    <div class="col-md-12 table-responsive">
                                        <h1>Horario Actual</h1>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>Horario</th>
                                                    <th>Lunes</th>
                                                    <th>Martes</th>
                                                    <th>Miercoles</th>
                                                    <th>Jueves</th>
                                                    <th>Viernes</th>
                                                    <th>Sabado</th>
                                                    <th>Domingo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>Ingreso Mañana</th>
                                                    <td>{{horarioPerfilUsuario._02lem}}</td>
                                                    <td>{{horarioPerfilUsuario._06mem}}</td>
                                                    <td>{{horarioPerfilUsuario._10miem}}</td>
                                                    <td>{{horarioPerfilUsuario._14jem}}</td>
                                                    <td>{{horarioPerfilUsuario._18vem}}</td>
                                                    <td>{{horarioPerfilUsuario._22sem}}</td>
                                                    <td>{{horarioPerfilUsuario._26dem}}</td>
                                                </tr>
                                                <tr>
                                                    <th>Salida Mañana</th>
                                                    <td>{{horarioPerfilUsuario._03lsm}}</td>
                                                    <td>{{horarioPerfilUsuario._07msm}}</td>
                                                    <td>{{horarioPerfilUsuario._11mism}}</td>
                                                    <td>{{horarioPerfilUsuario._15jsm}}</td>
                                                    <td>{{horarioPerfilUsuario._19vsm}}</td>
                                                    <td>{{horarioPerfilUsuario._23ssm}}</td>
                                                    <td>{{horarioPerfilUsuario._27dsm}}</td>
                                                </tr>
                                                <tr>
                                                    <th>Ingreso Tarde</th>
                                                    <td>{{horarioPerfilUsuario._04let}}</td>
                                                    <td>{{horarioPerfilUsuario._08met}}</td>
                                                    <td>{{horarioPerfilUsuario._12miet}}</td>
                                                    <td>{{horarioPerfilUsuario._16jet}}</td>
                                                    <td>{{horarioPerfilUsuario._20vet}}</td>
                                                    <td>{{horarioPerfilUsuario._24set}}</td>
                                                    <td>{{horarioPerfilUsuario._28det}}</td>
                                                </tr>
                                                <tr>
                                                    <th>Salida Tarde</th>
                                                    <td>{{horarioPerfilUsuario._05lst}}</td>
                                                    <td>{{horarioPerfilUsuario._09mst}}</td>
                                                    <td>{{horarioPerfilUsuario._13mist}}</td>
                                                    <td>{{horarioPerfilUsuario._17jst}}</td>
                                                    <td>{{horarioPerfilUsuario._21vst}}</td>
                                                    <td>{{horarioPerfilUsuario._25sst}}</td>
                                                    <td>{{horarioPerfilUsuario._29dst}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <!--End Horario Actual -->
                                <br>
                                <br>
                                <hr> 
                                <!--Horario Actual -->
                                <div class="row">
                                    <h1>Otros Horarios</h1>
                                    <div class="col-md-3">
                                        <div class="card">
                                            <div class="card-header headercolor">
                                                Horarios
                                            </div>
                                            <div class="card-body">
                                                <div class="mb-12 row">
                                                    <label for="gestion" class="col-sm-6 col-form-label">Gestion :</label>
                                                    <div class="col-sm-6">
                                                        <select v-model="obsgestion" class="form-control">
                                                            <option v-for="y  in listaGestion" :key="y" :value="y">{{y}}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <br>
                                                <div class="mb-12 row">
                                                    <button type="button" class="btn btn-success" @click="getListaHorario()">Cargar Horarios</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-9 table-responsive">
                                        <div class="row">
                                            <div class="col-md-12" v-for="horario in listaHorarios" :key="horario.historial_id">
                                                <div class="card">
                                                    <div class="card-header headercolor">
                                                        ID : {{horario.historial_id  }} Fecha : {{ horario.fecha }} valido hasta {{ horario.valido }}
                                                    </div>
                                                    <div class="card-body">
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Horario</th>
                                                                    <th>L</th>
                                                                    <th>M</th>
                                                                    <th>M</th>
                                                                    <th>J</th>
                                                                    <th>V</th>
                                                                    <th>S</th>
                                                                    <th>D</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th>I. Mañana</th>
                                                                    <td>{{horario.lem}}</td>
                                                                    <td>{{horario.mem}}</td>
                                                                    <td>{{horario.miem}}</td>
                                                                    <td>{{horario.jem}}</td>
                                                                    <td>{{horario.vem}}</td>
                                                                    <td>{{horario.sem}}</td>
                                                                    <td>{{horario.dem}}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>S. Mañana</th>
                                                                    <td>{{horario.lsm}}</td>
                                                                    <td>{{horario.msm}}</td>
                                                                    <td>{{horario.mism}}</td>
                                                                    <td>{{horario.jsm}}</td>
                                                                    <td>{{horario.vsm}}</td>
                                                                    <td>{{horario.ssm}}</td>
                                                                    <td>{{horario.dsm}}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>I. Tarde</th>
                                                                    <td>{{horario.let}}</td>
                                                                    <td>{{horario.met}}</td>
                                                                    <td>{{horario.miet}}</td>
                                                                    <td>{{horario.jet}}</td>
                                                                    <td>{{horario.vet}}</td>
                                                                    <td>{{horario.set}}</td>
                                                                    <td>{{horario.det}}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>S. Tarde</th>
                                                                    <td>{{horario.lst}}</td>
                                                                    <td>{{horario.mst}}</td>
                                                                    <td>{{horario.mist}}</td>
                                                                    <td>{{horario.jst}}</td>
                                                                    <td>{{horario.vst}}</td>
                                                                    <td>{{horario.sst}}</td>
                                                                    <td>{{horario.dst}}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>          
                                                    </div>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--END Horario-->

                            <!--Observaciones del Biometrico-->
                            <div class="tab-pane fade" id="observacionesUsuario" role="tabpanel" aria-labelledby="datos-tab">
                                <br>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="card">
                                            <div class="card-header headercolor">
                                                OBS
                                            </div>
                                            <div class="card-body">
                                                <div class="mb-12 row">
                                                    <label for="gestion" class="col-sm-6 col-form-label">Gestion :</label>
                                                    <div class="col-sm-6">
                                                        <select v-model="obsgestion" class="form-control">
                                                            <option v-for="y  in listaGestion" :key="y" :value="y">{{y}}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <br>
                                                <div class="mb-12 row">
                                                    <label for="mes" class="col-sm-6 col-form-label">Mes :</label>
                                                    <div class="col-sm-6">
                                                        <select v-model="obsmes" class="form-control">
                                                            <option value="01">Enero</option>
                                                            <option value="02">Febrero</option>
                                                            <option value="03">Marzo</option>
                                                            <option value="04">Abril</option>
                                                            <option value="05">Mayo</option>
                                                            <option value="06">Junio</option>
                                                            <option value="07">Julio</option>
                                                            <option value="08">Agosto</option>
                                                            <option value="09">Septiembre</option>
                                                            <option value="10">Octubre</option>
                                                            <option value="11">Noviembre</option>
                                                            <option value="12">Diciembre</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <br>
                                                <div class="mb-12 row">
                                                    <button type="button" class="btn btn-success" @click="getObsUsuario()">Cargar Observaciones</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th><th>Detalle</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="lsobs in listaObsUsuario" :key="lsobs.id">
                                                    <td>{{ lsobs.id }}</td>
                                                    <td>
                                                        {{ lsobs._02uidobs }}<br>
                                                        <strong>Fecha : </strong>{{ lsobs._03fechainicio }}<br>
                                                        <strong>Tipo: </strong>{{ lsobs._11tipo }}   <strong>Hora: </strong>{{ lsobs._12hora }} <br>
                                                        <strong><a href="#" data-bs-toggle="modal" data-bs-target="#detalleModal" @click="getObsDetalle(lsobs.id)">Ver Detalles</a></strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <!--END Observaciones del Biometrico-->

                        </div><!--Termina el content del TAB-->

                    </div><!--termina row-->
                </div><!--Termina card-body-->

                <div class="card-footer"></div><!--Termina Card Footer-->
            </div>
        </div>
    </div>

<!-- Modal Reporte Mensual-->
<div class="modal fade" id="reportemensualModal" tabindex="-1" aria-labelledby="biometricoModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header headercolor">
        <h5 class="modal-title">Reporte Mensual</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-12 row">
            <label for="gestion" class="col-sm-6 col-form-label">Gestion :</label>
            <div class="col-sm-6">
                <select v-model="reporteMesUsuario.gestion" class="form-control">
                    <option v-for="y  in listaGestion" :key="y" :value="y">{{y}}</option>
                </select>
            </div>
        </div>
        <br>
        <div class="mb-12 row">
            <label for="mes" class="col-sm-6 col-form-label">Mes :</label>
            <div class="col-sm-6">
                <select v-model="reporteMesUsuario.mes" class="form-control">
                    <option value="01">Enero</option>
                    <option value="02">Febrero</option>
                    <option value="03">Marzo</option>
                    <option value="04">Abril</option>
                    <option value="05">Mayo</option>
                    <option value="06">Junio</option>
                    <option value="07">Julio</option>
                    <option value="08">Agosto</option>
                    <option value="09">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
                </select>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="getReporteMesUsuario()">Ver Reporte</button>
      </div>
    </div>
  </div>
</div>
<!-- END Modal Reporte Mensual-->

<!-- Modal Reporte Mensual Segmentado-->
<div class="modal fade" id="reportemensualsegmentadoModal" tabindex="-1" aria-labelledby="biometricoModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header headercolor">
        <h5 class="modal-title">Reporte Mensual Segmentado</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-12 row">
            <label for="gestion" class="col-sm-6 col-form-label">Gestion :</label>
            <div class="col-sm-6">
                <select v-model="reporteMesUsuario.gestion" class="form-control">
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                </select>
            </div>
        </div>
        <br>
        <div class="mb-12 row">
            <label for="mes" class="col-sm-6 col-form-label">Mes :</label>
            <div class="col-sm-6">
                <select v-model="reporteMesUsuario.mes" class="form-control">
                    <option value="01">Enero</option>
                    <option value="02">Febrero</option>
                    <option value="03">Marzo</option>
                    <option value="04">Abril</option>
                    <option value="05">Mayo</option>
                    <option value="06">Junio</option>
                    <option value="07">Julio</option>
                    <option value="08">Agosto</option>
                    <option value="09">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
                </select>
            </div>
        </div>
        <br>
        <div class="mb-12 row">
            <label for="inicio" class="col-sm-6 col-form-label">Inicio :</label>
            <div class="col-sm-6">
                <select  class="form-control" v-model="reporteMesUsuario.di">
                    <option v-for="i=1 in 31" :key="i" :value="i">{{i}}</option>
                </select>
            </div>
        </div>
        <br>
        <div class="mb-12 row">
            <label for="fin" class="col-sm-6 col-form-label">Fin :</label>
            <div class="col-sm-6">
                <select  class="form-control" v-model="reporteMesUsuario.df">
                    <option v-for="j=1 in 31" :key="j" :value="j">{{j}}</option>
                </select>
            </div>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="getReporteMesUsuario()">Ver Reporte</button>
      </div>
    </div>
  </div>
</div>
<!-- END Modal Reporte Mensual Segmentado-->

<!-- Modal  Detalles de OBS-->
<div class="modal fade" id="detalleModal" tabindex="-1" aria-labelledby="biometricoModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header headercolor">
        <h5 class="modal-title">Detalles de la Observacion</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        <div class="row">
            <div class="col-md-12">
                <strong>ID: </strong>{{ obsDetalle.id }}<br>
                <strong>Fecha Inicio: </strong>{{ obsDetalle.fechainicio }}<br>
                <strong>Fecha Fin: </strong> {{ obsDetalle.fechafin }}<br>
                <strong>Detalle: </strong>{{ obsDetalle.detalle }}<br>
                <strong>Tipo de Obs. : </strong>{{ obsDetalle.tipo }} <br>
                <strong>Hora: </strong>{{ obsDetalle.hora }} <br>
            </div>
            <div class="col-md-12">
                <img :src="obsDetalle.url" alt="" class="img-fluid">
            </div>
        </div>

      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"  @click="downloadImg(obsDetalle.url,obsDetalle.imagen)">Descargar Documento </button>
      </div>

    </div>
  </div>
</div>
<!-- END Modal  documento-->

</template>
<script>
import BiometricoServiceUsuario from '@/services/biometricoService';

export default {
    name:'ComponenteUMSccVue',
    props:['egovfp'],
    data(){
        return{
            biometricoServiceUsuario:null,
            listaBiometricoUsuario:[],
            listaPerfilUsuario:[],
            listaGestion:[],
            listaObsUsuario:[],
            listaHorarios:[],
            id_horarioUsuario:0,
            getPBUsuario:true,
            reporteJson:'',
            obsgestion :0,
            obsmes:0,
            reporteMesUsuario:{
                id_horario:'',
                cif:'',
                gestion:2023,
                mes:0,
                di:0,
                df:0,
                listaPerfil:[]
            },
            biometricoUsuario:{
                id:null,
                _01user_id:0,
                _02nombre:'',
                _03cif:0,
                _04estado:0,
                _05horario:0,
                _06lugar:'',
                _07id_tipo:1
            },
            horarioPerfilUsuario:{
                id:0,
                _01cif:this.egovfp.cif,
                _02lem:'08:30',_03lsm:'12:30',_04let:'14:30',_05lst:'18:30',
                _06mem:'08:30',_07msm:'12:30',_08met:'14:30',_09mst:'18:30',
                _10miem:'08:30',_11mism:'12:30',_12miet:'14:30',_13mist:'18:30',
                _14jem:'08:30',_15jsm:'12:30',_16jet:'14:30',_17jst:'18:30',
                _18vem:'08:30',_19vsm:'12:30',_20vet:'14:30',_21vst:'18:30',
                _22sem:'08:30',_23ssm:'12:30',_24set:'14:30',_25sst:'18:30',
                _26dem:'08:30',_27dsm:'12:30',_28det:'14:30',_29dst:'18:30'
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
                sigla:'',
                foto:''
            },
            obsDetalle:{
                id:0,
                uidobs:'',
                fechainicio:'',
                fechafin:'',
                detalle:'',
                imagen:'',
                tipo:'',
                hora:'',
                url:''
            }
        }
    },
    created(){
        this.biometricoServiceUsuario = new BiometricoServiceUsuario();
    },
    mounted(){
        //this.getListaUsuario();
    },
    updated(){
        this.egovf = this.egovfp;
        if(this.egovf.cif > 0 && this.getPBUsuario)
        {
            this.getPerfilBiometricoUsuario();
            this.getGestion();
            this.getPBUsuario=false;
        }
    },
    methods:{
        async getListaUsuario(){
            await this.biometricoServiceUsuario.getListarCifCero().then(response => {
                this.listaBiometricoUsuario = response.data;
            });
        },
        async getPerfilBiometricoUsuario(){
            await this.biometricoServiceUsuario.getPerfil(this.egovf.cif).then(response=>{
                this.listaPerfilUsuario = response.data;
                if(this.listaPerfilUsuario.length>0){
                    this.id_horarioUsuario = this.listaPerfilUsuario[0]._05horario_id;
                    this.getHorarioUsuario();
                }
            });
        },
        async getHorarioUsuario(){
            await this.biometricoServiceUsuario.getHorario(this.id_horarioUsuario,this.egovf.cif).then(response=>{
                this.horarioPerfilUsuario = response.data;
                //this.getObsUsuario();
            });
        },
        async getObsUsuario(){ // Funcion que llama una lista de Observaciones del usuario 
            await this.biometricoServiceUsuario.getObs(this.egovf.cif,this.obsgestion,this.obsmes).then(response=>{
                this.listaObsUsuario = response.data;
            });
        },
        getReporteMesUsuario(){
            this.reporteMesUsuario.cif = this.egovf.cif;
            if(this.reporteMesUsuario.di < 10){
                this.reporteMesUsuario.di = '0'+this.reporteMesUsuario.di;
            }
            if(this.reporteMesUsuario.df < 10){
                this.reporteMesUsuario.df = '0'+this.reporteMesUsuario.df;
            }
            this.$router.push({
                name: "usuarioReporte",
                params:{
                    uriu:this.reporteMesUsuario.gestion+'m'+this.reporteMesUsuario.mes+'m'+this.reporteMesUsuario.di+'k'+this.reporteMesUsuario.df
                }
            });
        },
        getGestion(){ // funcion que crea una lista de gestiones desde el 2021
            var lgestion=[];
            const fecha = new Date();
            this.obsgestion = fecha.getFullYear();
            for(var i=2021; i<= this.obsgestion; i++){
                lgestion.push(i);
            }
            this.listaGestion = lgestion;
            this.reporteMesUsuario.gestion = this.obsgestion;
            //this.reporteMes.mes = fecha.getMonth();
        },
        async getListaHorario(){ // Funcion que llama una lista de Horarios del usuario deacuerdo a la gestion
            await this.biometricoServiceUsuario.getListaHorario(this.egovf.cif,this.obsgestion).then(response=>{
                this.listaHorarios = response.data;
                console.log(this.listaHorarios);
            });
        },
        getObsDetalle(id){// Funcion que Muestra el detalle de las Observaciones del Usuario
            console.log(id);
            this.listaObsUsuario.forEach(obs =>{
                if(obs.id === id){
                    this.obsDetalle.id = obs.id;
                    this.obsDetalle.uidobs = obs._02uidobs;
                    this.obsDetalle.fechainicio = obs._03fechainicio;
                    this.obsDetalle.fechafin = obs._04fechafin;
                    this.obsDetalle.detalle = obs._09detalle;
                    this.obsDetalle.imagen = obs._10imagen;
                    this.obsDetalle.tipo = obs._11tipo;
                    this.obsDetalle.hora = obs._12hora;
                    this.obsDetalle.url = obs._15url;
                }
            });
        },
    }
}
</script>


<style scoped>
.material-icons{
    
    color: white;
    font-size: 1em;
    border-top: 0ch;
    border-bottom: 0ch;
}
</style>
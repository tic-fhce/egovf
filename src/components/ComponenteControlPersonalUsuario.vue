<template>
    <div class="row">
        <div class="card col-md-12">
            <div class="row">
                <div class="card-header">
                    <div class="row">
                        <div class=" col col-md-6 col-sm-6">
                            <h3>Control de Personal Biometrico</h3>
                        </div>
                        <div class=" col col-md-2 col-sm-2">
                            <a href="#" class="form-control btn btn-primary" data-bs-toggle="modal" data-bs-target=#biometricoModal><span class="material-icons">&#xe145;</span>Biometrico</a>
                        </div>
                        <div class="col col-md-2 col-sm-2">
                            <a href="#" class="form-control btn btn-warning" data-bs-toggle="modal" data-bs-target=#horarioModal><span class="material-icons">&#xe145;</span>Horario</a>
                        </div>
                        <div class="col col-md-2 col-sm-2">
                            <a href="#" class="form-control btn btn-success" data-bs-toggle="modal" data-bs-target=#obsModal><span class="material-icons">&#xe145;</span>Obs</a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <ul class="nav nav-tabs" id="myTabBiometrico" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="user-tab" data-bs-toggle="tab" data-bs-target="#datos" type="button" role="tab"  aria-selected="true">Datos Biometrico</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="user-tab" data-bs-toggle="tab" data-bs-target="#horario" type="button" role="tab"  aria-selected="true">Horarios</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="user-tab" data-bs-toggle="tab" data-bs-target="#observaciones" type="button" role="tab"  aria-selected="true">Obserbaciones</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="actualizar-tab" data-bs-toggle="tab" data-bs-target="#mensual" type="button" role="tab"  aria-selected="false">Reporte Mensual</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#dias" type="button" role="tab" aria-controls="contact" aria-selected="false">Reporte Segmentado</button>
                            </li>
                        </ul>

                        <div class="tab-content" id="myTabContentBiometrico">
                            <!--Datos del Biometrico-->
                            <div class="tab-pane fade show active" id="datos" role="tabpanel" aria-labelledby="datos-tab">
                                <br>
                                <ul v-for="perfil in listaPerfil" :key="perfil.id">
                                    <li>ID Biometrico : {{perfil.id}}</li>
                                    <li>UID : {{perfil._01user_id}}</li>
                                    <li>Nombre : {{perfil._02nombre}}</li>
                                    <li>Estado : {{perfil._04estado}}</li>
                                    <li>Lugar : {{perfil._06lugar}}</li>
                                    <li v-if="perfil._07id_tipo===1">Tipo : Administrador</li>
                                    <li v-else>Tipo : Docente/Aux</li>
                                    <hr>
                                </ul>
                            </div>
                            <!--Datos del Biometrico-->

                            <!--Horario-->
                            <div class="tab-pane fade" id="horario" role="tabpanel" aria-labelledby="mensula-tab">
                                <br>
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
                                            <td>{{horarioPerfil._02lem}}</td>
                                            <td>{{horarioPerfil._06mem}}</td>
                                            <td>{{horarioPerfil._10miem}}</td>
                                            <td>{{horarioPerfil._14jem}}</td>
                                            <td>{{horarioPerfil._18vem}}</td>
                                            <td>{{horarioPerfil._22sem}}</td>
                                            <td>{{horarioPerfil._26dem}}</td>
                                        </tr>
                                        <tr>
                                            <th>Salida Mañana</th>
                                            <td>{{horarioPerfil._03lsm}}</td>
                                            <td>{{horarioPerfil._07msm}}</td>
                                            <td>{{horarioPerfil._11mism}}</td>
                                            <td>{{horarioPerfil._15jsm}}</td>
                                            <td>{{horarioPerfil._19vsm}}</td>
                                            <td>{{horarioPerfil._23ssm}}</td>
                                            <td>{{horarioPerfil._27dsm}}</td>
                                        </tr>
                                        <tr>
                                            <th>Ingreso Tarde</th>
                                            <td>{{horarioPerfil._04let}}</td>
                                            <td>{{horarioPerfil._08met}}</td>
                                            <td>{{horarioPerfil._12miet}}</td>
                                            <td>{{horarioPerfil._16jet}}</td>
                                            <td>{{horarioPerfil._20vet}}</td>
                                            <td>{{horarioPerfil._24set}}</td>
                                            <td>{{horarioPerfil._28det}}</td>
                                        </tr>
                                        <tr>
                                            <th>Salida Tarde</th>
                                            <td>{{horarioPerfil._05lst}}</td>
                                            <td>{{horarioPerfil._09mst}}</td>
                                            <td>{{horarioPerfil._13mist}}</td>
                                            <td>{{horarioPerfil._17jst}}</td>
                                            <td>{{horarioPerfil._21vst}}</td>
                                            <td>{{horarioPerfil._25sst}}</td>
                                            <td>{{horarioPerfil._29dst}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!--Horario-->

                            <!--Observaciones del Biometrico-->
                            <div class="tab-pane fade" id="observaciones" role="tabpanel" aria-labelledby="datos-tab">
                                <br>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>#</th><th>Uid</th><th>Fecha Inicio</th><th>Fecha Fin</th><th>Detalle</th><th>Tipo</th><th>Hora</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="lsobs in listaObs" :key="lsobs.id">
                                            <td>{{ lsobs.id }}</td><td>{{ lsobs._02uidobs }}</td><td>{{ lsobs._03fechainicio }}</td><td>{{ lsobs._04fechafin }}</td><td>{{ lsobs._09detalle }}</td><td>{{ lsobs._11tipo }}</td><td>{{ lsobs._12hora }}</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <!--Observaciones del Biometrico-->

                            <div class="tab-pane fade" id="mensual" role="tabpanel" aria-labelledby="mensula-tab">
                                <br>
                                <div class="row">
                                    <div class="col col-md-6 col-sm-6">
                                        <ul v-for="perfil in listaPerfil" :key="perfil.id">
                                            <li>ID Biometrico : {{perfil.id}}</li>
                                            <li>User ID : {{perfil._01user_id}}</li>
                                            <li>Nombre : {{perfil._02nombre}}</li>
                                            <li>Estado : {{perfil._04estado}}</li>
                                            <li>Lugar : {{perfil._06lugar}}</li>
                                            <hr>
                                        </ul>
                                    </div>
                                    <div class="col col-md-6 col-sm-6">
                                        <h3>Datos del Reporte</h3>
                                        <br>
                                        <div class="mb-12 row">
                                            <label for="correo" class="col-sm-6 col-form-label">
                                                Gestion :
                                            </label>
                                            <div class="col-sm-6">
                                                <select v-model="reporteMes.gestion" class="form-control">
                                                    <option value="2021">2021</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2023">2023</option>
                                                </select>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="mb-12 row">
                                            <label for="correo" class="col-sm-6 col-form-label">
                                                Mes :
                                            </label>
                                            <div class="col-sm-6">
                                                <select v-model="reporteMes.mes" class="form-control">
                                                    <option value="1">Enero</option>
                                                    <option value="2">Febrero</option>
                                                    <option value="3">Marzo</option>
                                                    <option value="4">Abril</option>
                                                    <option value="5">Mayo</option>
                                                    <option value="6">Junio</option>
                                                    <option value="7">Julio</option>
                                                    <option value="8">Agosto</option>
                                                    <option value="9">Septiembre</option>
                                                    <option value="10">Octubre</option>
                                                    <option value="11">Noviembre</option>
                                                    <option value="12">Diciembre</option>
                                                </select>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="mb-12 row">
                                            <button class="form-control btn btn-success" @click="getReporteMes()">Ver Reporte</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="tab-pane fade" id="dias" role="tabpanel" aria-labelledby="dias-tab">
                                <br>
                                <div class="row">
                                    <div class="col col-md-6 col-sm-6">
                                        <ul v-for="perfil in listaPerfil" :key="perfil.id">
                                            <li>ID Biometrico : {{perfil.id}}</li>
                                            <li>User ID : {{perfil._01user_id}}</li>
                                            <li>Nombre : {{perfil._02nombre}}</li>
                                            <li>Estado : {{perfil._04estado}}</li>
                                            <li>Lugar : {{perfil._06lugar}}</li>
                                            <hr>
                                        </ul>
                                    </div>
                                    <div class="col col-md-6 col-sm-6">
                                        <h3>Datos del Reporte</h3>
                                        <br>
                                        <div class="mb-12 row">
                                            <label for="correo" class="col-sm-6 col-form-label">
                                                Gestion :
                                            </label>
                                            <div class="col-sm-6">
                                                <select v-model="reporteMes.gestion" class="form-control">
                                                    <option value="2021">2021</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2023">2023</option>
                                                </select>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="mb-12 row">
                                            <label for="correo" class="col-sm-6 col-form-label">
                                                Mes :
                                            </label>
                                            <div class="col-sm-6">
                                                <select v-model="reporteMes.mes" class="form-control">
                                                    <option value="1">Enero</option>
                                                    <option value="2">Febrero</option>
                                                    <option value="3">Marzo</option>
                                                    <option value="4">Abril</option>
                                                    <option value="5">Mayo</option>
                                                    <option value="6">Junio</option>
                                                    <option value="7">Julio</option>
                                                    <option value="8">Agosto</option>
                                                    <option value="9">Septiembre</option>
                                                    <option value="10">Octubre</option>
                                                    <option value="11">Noviembre</option>
                                                    <option value="12">Diciembre</option>
                                                </select>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="mb-12 row">
                                            <label for="correo" class="col-sm-6 col-form-label">
                                                Inicio :
                                            </label>
                                            <div class="col-sm-6">
                                                <select  class="form-control" v-model="reporteMes.di">
                                                    <option v-for="i in 31" :key="i">{{i}}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <br>
                                        <div class="mb-12 row">
                                            <label for="correo" class="col-sm-6 col-form-label">
                                                Fin :
                                            </label>
                                            <div class="col-sm-6">
                                                <select  class="form-control" v-model="reporteMes.df">
                                                    <option v-for="i in 31" :key="i">{{i}}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <br>
                                        <div class="mb-12 row">
                                            <button class="form-control btn btn-success" @click="getReporteMes()">Ver Reporte</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-footer"></div>
            </div>
        </div>
    </div>
    <br>




</template>
<script>
import BiometricoService from '@/services/biometricoService';

export default {
    name:'ComponenteControlPersonalUsuarioVue',
    props:['persona'],
    data(){
        return{
            biometricoService:null,
            listaBiometrico:[],
            listaPerfil:[],
            id_bio:0,
            id_horario:0,
            getPB:true,
            id_tipo:1,
            reporteMes:{
                id_horario:'',
                cif:'',
                gestion:2023,
                mes:1,
                di:0,
                df:0,
                listaPerfil:[],
                persona:{
                    id:null,
                    _01cif:'',
                    _02ci:'',
                    _03complemento:'',
                    _04nombre:'',
                    _05paterno:'',
                    _06materno:'',
                    _07fecha:'',
                    _08sexo:'',
                    _09cel:'',
                    _10correo:''
                },
            },
            biometrico:{
                id:null,
                _01user_id:0,
                _02nombre:'',
                _03cif:0,
                _04estado:0,
                _05horario:0,
                _06lugar:'',
                _07id_tipo:1
            },
            horarioPerfil:{
                id:0,
                _01cif:this.persona._01cif,
                _02lem:'08:30',
                _03lsm:'12:30',
                _04let:'14:30',
                _05lst:'18:30',
                _06mem:'08:30',
                _07msm:'12:30',
                _08met:'14:30',
                _09mst:'18:30',
                _10miem:'08:30',
                _11mism:'12:30',
                _12miet:'14:30',
                _13mist:'18:30',
                _14jem:'08:30',
                _15jsm:'12:30',
                _16jet:'14:30',
                _17jst:'18:30',
                _18vem:'08:30',
                _19vsm:'12:30',
                _20vet:'14:30',
                _21vst:'18:30',
                _22sem:'08:30',
                _23ssm:'12:30',
                _24set:'14:30',
                _25sst:'18:30',
                _26dem:'08:30',
                _27dsm:'12:30',
                _28det:'14:30',
                _29dst:'18:30'
            },
            reporteFinal:[],
            listaObs:[]
        }
    },
    created(){
        this.biometricoService= new BiometricoService();
    },
    mounted(){
        this.getLista();
    },
    updated(){
        if(this.persona._01cif>0 && this.getPB)
        {
            this.getPerfilBiometrico();
            this.getPB=false;
        }
    },
    methods:{
        async getLista(){
            await this.biometricoService.getListarCifCero().then(response => {
                this.listaBiometrico = response.data;
            });
        },
        async getPerfilBiometrico(){
            await this.biometricoService.getPerfil(this.persona._01cif).then(response=>{
                this.listaPerfil=response.data;
                if(this.listaPerfil.length>0){
                    this.id_horario=this.listaPerfil[0]._05horario_id;
                    this.getHorario();
                }
            });
        },
        async getHorario(){
            await this.biometricoService.getHorario(this.id_horario,this.persona._01cif).then(response=>{
                this.horarioPerfil=response.data;
                this.getObs();
            });
        },
        async getObs(){
            await this.biometricoService.getObs(this.persona._01cif).then(response=>{
                this.listaObs=response.data;
            });
        },
        getReporteMes(){
            this.reporteMes.cif=this.persona._01cif;
            this.reporteMes.id_horario=this.id_horario;
            this.reporteMes.listaPerfil=this.listaPerfil;
            this.reporteMes.persona=this.persona;
            
            this.$router.push({
                name: "reportePerfil",
                params:{
                    reporte:JSON.stringify(this.reporteMes)
                }
            });            
        }
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
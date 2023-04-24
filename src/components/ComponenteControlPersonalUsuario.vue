<template>
    <div class="row">
        <div class="card col-md-12">
            <div class="row">
                <div class="card-header">
                    <div class="row">
                        <div class=" col col-md-12 col-sm-12">
                            <h3>Control de Asistencia</h3>
                        </div>
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
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="actualizar-tab" data-bs-toggle="tab" data-bs-target="#mensualUsuario" type="button" role="tab"  aria-selected="false">Reporte Mensual</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#diasUsuario" type="button" role="tab" aria-controls="contact" aria-selected="false">Reporte Segmentado</button>
                            </li>
                        </ul><!--termina Ul-->

                        <div class="tab-content" id="myTabContentBiometricoUsuario">
                            <!--Datos del Biometrico-->
                            <div class="tab-pane fade show active" id="datosUsuario" role="tabpanel" aria-labelledby="datos-tab">
                                <br>
                                <ul v-for="perfil in listaPerfilUsuario" :key="perfil.id">
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
                            <div class="tab-pane fade" id="horarioUsuario" role="tabpanel" aria-labelledby="mensula-tab">
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
                            <!--Horario-->

                            <!--Observaciones del Biometrico-->
                            <div class="tab-pane fade" id="observacionesUsuario" role="tabpanel" aria-labelledby="datos-tab">
                                <br>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>#</th><th>Uid</th><th>Fecha Inicio</th><th>Fecha Fin</th><th>Detalle</th><th>Tipo</th><th>Hora</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="lsobs in listaObsUsuario" :key="lsobs.id">
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

                            <!--Formulario Por mes -->
                            <div class="tab-pane fade" id="mensualUsuario" role="tabpanel" aria-labelledby="mensula-tab">
                                <br>
                                <div class="row">
                                    <div class="col col-md-6 col-sm-6">
                                        <ul v-for="perfil in listaPerfilUsuario" :key="perfil.id">
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
                                                <select v-model="reporteMesUsuario.gestion" class="form-control">
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
                                                <select v-model="reporteMesUsuario.mes" class="form-control">
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
                                            <button class="form-control btn btn-success" @click="getReporteMesUsuario()">Ver Reporte</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--Termina Formulario por  Mes-->

                            <!--Formulario por dias -->
                            <div class="tab-pane fade" id="diasUsuario" role="tabpanel" aria-labelledby="dias-tab">
                                <br>
                                <div class="row">
                                    <div class="col col-md-6 col-sm-6">
                                        <ul v-for="perfil in listaPerfilUsuario" :key="perfil.id">
                                            <li>ID Biometrico : {{perfil.id}}</li>
                                            <li>User ID : {{perfil._01user_id}}</li>
                                            <li>Nombre : {{perfil._02nombre}}</li>
                                            <li>Estado : {{perfil._04estado}}</li>
                                            <li>Lugar : {{perfil._06lugar}}</li>
                                            <hr>
                                        </ul>
                                    </div><!--Termina col6 Perfil Biometrico-->
                                    
                                    <div class="col col-md-6 col-sm-6">
                                        <h3>Datos del Reporte</h3>
                                        <br>
                                        <div class="mb-12 row">
                                            <label for="correo" class="col-sm-6 col-form-label">
                                                Gestion :
                                            </label>
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
                                            <label for="correo" class="col-sm-6 col-form-label">
                                                Mes :
                                            </label>
                                            <div class="col-sm-6">
                                                <select v-model="reporteMesUsuario.mes" class="form-control">
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
                                                <select  class="form-control" v-model="reporteMesUsuario.di">
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
                                                <select  class="form-control" v-model="reporteMesUsuario.df">
                                                    <option v-for="i in 31" :key="i">{{i}}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <br>
                                        <div class="mb-12 row">
                                            <button class="form-control btn btn-success" @click="getReporteMesUsuario()">Ver Reporte</button>
                                        </div>

                                    </div> <!--Termina col6 Formulario diasUsuario-->
                                </div><!---Termina row diasUsuario-->
                            </div>
                            <!--Termina Formulario por dias-->

                        </div><!--Termina el content del TAB-->

                    </div><!--termina row-->
                </div><!--Termina card-body-->

                <div class="card-footer"></div><!--Termina Card Footer-->

            </div><!--Termina el ROW-->
        </div><!--Termina card-->
    </div><!--termina row-->
</template>
<script>
import BiometricoServiceUsuario from '@/services/biometricoService';

export default {
    name:'ComponenteControlPersonalUsuarioVue',
    props:['personaUsuario'],
    data(){
        return{
            biometricoServiceUsuario:null,
            listaBiometricoUsuario:[],
            listaPerfilUsuario:[],
            id_horarioUsuario:0,
            getPBUsuario:true,
            reporteJson:'',
            reporteMesUsuario:{
                id_horario:'',
                cif:'',
                gestion:2023,
                mes:1,
                di:0,
                df:0,
                listaPerfil:[],
                personaUsuario:{
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
                }
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
                _01cif:this.personaUsuario._01cif,
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
            listaObsUsuario:[],
            james:{
                nombre:'james'
            }
        }
    },
    created(){
        this.biometricoServiceUsuario= new BiometricoServiceUsuario();
    },
    mounted(){
        this.getListaUsuario();
    },
    updated(){
        if(this.personaUsuario._01cif>0 && this.getPBUsuario)
        {
            this.getPerfilBiometricoUsuario();
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
            await this.biometricoServiceUsuario.getPerfil(this.personaUsuario._01cif).then(response=>{
                this.listaPerfilUsuario=response.data;
                if(this.listaPerfilUsuario.length>0){
                    this.id_horarioUsuario=this.listaPerfilUsuario[0]._05horario_id;
                    this.getHorarioUsuario();
                }
            });
        },
        async getHorarioUsuario(){
            await this.biometricoServiceUsuario.getHorario(this.id_horarioUsuario,this.personaUsuario._01cif).then(response=>{
                this.horarioPerfilUsuario=response.data;
                this.getObsUsuario();
            });
        },
        async getObsUsuario(){
            await this.biometricoServiceUsuario.getObs(this.personaUsuario._01cif).then(response=>{
                this.listaObsUsuario=response.data;
            });
        },
        getReporteMesUsuario(){
            this.reporteMesUsuario.cif=this.personaUsuario._01cif;
            this.reporteMesUsuario.id_horario=this.id_horarioUsuario;
            this.reporteMesUsuario.listaPerfil=this.listaPerfilUsuario;
            this.reporteMesUsuario.personaUsuario=this.personaUsuario;
            this.reporteJson=JSON.stringify(this.reporteMesUsuario);
            this.$router.push({
                name: "reporteUsuario",
                params:{
                    reporteusuario:this.reporteJson
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
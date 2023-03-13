<template>
    <ComponenteMenuVue :cif="usuario.cif" :menu="usuario.menu" />
    <div class="container">
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <div class="row">
            <div class="card col-sm-12 col-md-12">
                <div class="row">
                    <div class="card-header">
                        <h3>Datos Personales</h3>
                    </div>
                    <div class="col-sm-4">
                        <img src="../assets/logo.png" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-sm-8">
                        <div class="card-body">
                            <div class="row">
                                <div class="col col-sm-6 col-md-6">
                                    <h4 class="card-title">CIF : {{persona._01cif}}</h4>
                                    <br>
                                    <label for="nombre" class="col-md-4">Nombre : </label>
                                    <label for="nombre" class="col-md-8">{{persona._04nombre}}</label>

                                    <label for="apellido" class="col-md-4">Apellidos : </label>
                                    <label for="nombre" class="col-md-8">{{persona._05paterno}} {{persona._06materno}}</label>
                                </div>
                                <div class="col col-sm-6 col-md-6">
                                    <ul>
                                        <li>ID app : {{persona.id}}</li>
                                        <li>CIF : {{persona._01cif}}</li>
                                        <li>C.I. : {{persona._02ci}} {{persona._03complemento}}</li>
                                        <li>Correo : {{persona._10correo}}</li>
                                        <li>Celular : {{persona._09cel}}</li>
                                        <li>Fecha N : {{persona._07fecha}}</li>
                                        <li v-if="persona._08sexo == 1">Sexo : Femenino</li>
                                        <li v-if="persona._08sexo == 2">Sexo : Masculino</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="card col-sm-12 col-md-12">
                <div class="row">
                    <div class="card-header">
                        <div class="row">
                            <h3>Reporte Personal</h3>
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
                                    <button class="nav-link" id="actualizar-tab" data-bs-toggle="tab" data-bs-target="#mensual" type="button" role="tab"  aria-selected="false">Reporte Mensual</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#dias" type="button" role="tab" aria-controls="contact" aria-selected="false">Reporte Segmentado</button>
                                </li>
                            </ul>
                            <div class="tab-content" id="myTabContentBiometrico">

                                <!--Tab para la lista de Biometricos Registrados-->
                                <div class="tab-pane fade show active" id="datos" role="tabpanel" aria-labelledby="datos-tab">
                                    <br>
                                    <ul v-for="perfil in listaPerfil" :key="perfil.id">
                                        <li>ID Biometrico : {{perfil.id}}</li>
                                        <li>UID : {{perfil._01user_id}}</li>
                                        <li>Nombre : {{perfil._02nombre}}</li>
                                        <li>Estado : {{perfil._04estado}}</li>
                                        <li>Lugar : {{perfil._06lugar}}</li>
                                        <hr>
                                    </ul>
                                </div>
                                <!--Tab para la lista de Biometricos Registrados-->

                                <!--Tab para el detalle del Horaraio-->
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
                                <!--Tab para el detalle del Horaraio-->

                                <!--Tab para el reporte de MES-->
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
                                <!--Tab para el reporte de MES-->

                                <!--Tab para el reporte de mes por dias-->
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
                                <!--Tab para el reporte de mes por dias-->
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <ComponenteFooterVue />
</template>

<script>
import ComponenteMenuVue from '@/components/ComponenteMenu.vue'
import UsuarioService from '@/services/usuarioServices';
import BiometricoService from '@/services/biometricoService';
import ComponenteFooterVue from '@/components/ComponenteFooter.vue';
export default {
    name:'ReporteUsuarioView',
    components:{
        ComponenteMenuVue,
        ComponenteFooterVue
    },
    data(){
        return {
            usuarioService:null,
            usuario:{
                token:'',
                cif:'',
                correo:'',
                celular:'',
                pass:'',
                menu:[]
            },
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
            listaPerfil:[],
            id_horario:0,
            horarioPerfil:{
                id:0,
                _01cif:0,
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
            }
        }
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
        this.usuarioService= new UsuarioService();
        this.biometricoService= new BiometricoService();
    },
    mounted(){
        this.getDatos();
        this.getPerfilBiometrico();
    },
    methods:{
        getDatos(){
            if(this.$cookies.get('cif')!=null){
                this.usuario.token=this.$cookies.get('token');
                this.usuario.cif=this.$cookies.get('cif');
                this.usuario.correo=this.$cookies.get('correo');
                this.usuario.celular=this.$cookies.get('celular');
                this.usuario.pass=this.$cookies.get('pass');
                this.usuario.menu=this.$cookies.get('menu');
                // Cargamos los datos de la persona atraves del UsuarioService
                
                this.usuarioService.headersUsuario(this.usuario.token);
                this.usuarioService.getPerfil(this.usuario.cif).then(response => {
                this.persona = response.data;
                });
            }
        },
        getPerfilBiometrico(){
            this.biometricoService.getPerfil(this.usuario.cif).then(response=>{
                this.listaPerfil=response.data;
                if(this.listaPerfil.length>0){
                    this.id_horario=this.listaPerfil[0]._05horario_id;
                    this.getHorario();
                }
            });  
        },
        getHorario(){
            this.biometricoService.getHorario(this.id_horario,this.usuario.cif).then(response=>{
                this.horarioPerfil=response.data;
            });
        },
        getReporteMes(){
            this.reporteMes.cif=this.usuario.cif;
            this.reporteMes.id_horario=this.id_horario;
            this.reporteMes.listaPerfil=this.listaPerfil;
            this.reporteMes.persona=this.persona;
            this.$router.push({
                name: "reportePerfilUsuario",
                params:{
                    reporte:JSON.stringify(this.reporteMes)
                }
            });            
        }
    }
}
</script>

<style scoped>
.margen{
    margin-top: 100px;
}
</style>
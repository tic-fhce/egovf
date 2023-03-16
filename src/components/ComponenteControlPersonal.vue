<template>
    <div class="row">
        <div class="card col-md-12">
            <div class="row">
                <div class="card-header">
                    <div class="row">
                        <div class=" col col-md-6 col-sm-6">
                            <h3>Control de Personal Biometrico</h3>
                        </div>
                        <div class=" col col-md-3 col-sm-3">
                            <a href="#" class="form-control btn btn-primary" data-bs-toggle="modal" data-bs-target=#biometricoModal><span class="material-icons">&#xe145;</span>Biometrico</a>
                        </div>
                        <div class="col col-md-3 col-sm-3">
                            <a href="#" class="form-control btn btn-warning" data-bs-toggle="modal" data-bs-target=#horarioModal><span class="material-icons">&#xe145;</span>Horario</a>
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
                                <button class="nav-link" id="actualizar-tab" data-bs-toggle="tab" data-bs-target="#mensual" type="button" role="tab"  aria-selected="false">Reporte Mensual</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#dias" type="button" role="tab" aria-controls="contact" aria-selected="false">Reporte Segmentado</button>
                            </li>
                        </ul>

                        <div class="tab-content" id="myTabContentBiometrico">
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

    <!-- Modal  Biometrico-->
<div class="modal fade" id="biometricoModal" tabindex="-1" aria-labelledby="biometricoModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Agregar Biometrico</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3 row">
            <label for="datos" class="col-sm-6 col-form-label">Datos del Biometrico</label>
            <div class="col-sm-6">
                <select v-model="id_bio" class="form-control" @change="datosChange()">
                    <option v-for="lista in listaBiometrico" :value="lista.id" :key="lista.id">{{lista._02nombre}} {{lista._06lugar}}</option>
                </select>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"  @click="updateBiometrico()">Agregar Datos </button>
      </div>
    </div>
  </div>
</div>

<!-- Modal  Biometrico-->
<div class="modal fade" id="horarioModal" tabindex="-1" aria-labelledby="biometricoModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Agregar Nuevo Horario</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3 row">
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
                        <td><input type="text" v-model="horario._02lem" size="5"></td>
                        <td><input type="text" v-model="horario._06mem" size="5"></td>
                        <td><input type="text" v-model="horario._10miem" size="5"></td>
                        <td><input type="text" v-model="horario._14jem" size="5"></td>
                        <td><input type="text" v-model="horario._18vem" size="5"></td>
                        <td><input type="text" v-model="horario._22sem" size="5"></td>
                        <td><input type="text" v-model="horario._26dem" size="5"></td>
                    </tr>
                    <tr>
                        <th>Salida Mañana</th>
                        <td><input type="text" v-model="horario._03lsm" size="5"></td>
                        <td><input type="text" v-model="horario._07msm" size="5"></td>
                        <td><input type="text" v-model="horario._11mism" size="5"></td>
                        <td><input type="text" v-model="horario._15jsm" size="5"></td>
                        <td><input type="text" v-model="horario._19vsm" size="5"></td>
                        <td><input type="text" v-model="horario._23ssm" size="5"></td>
                        <td><input type="text" v-model="horario._27dsm" size="5"></td>
                    </tr>
                    <tr>
                        <th>Ingreso Tarde</th>
                        <td><input type="text" v-model="horario._04let" size="5"></td>
                        <td><input type="text" v-model="horario._08met" size="5"></td>
                        <td><input type="text" v-model="horario._12miet" size="5"></td>
                        <td><input type="text" v-model="horario._16jet" size="5"></td>
                        <td><input type="text" v-model="horario._20vet" size="5"></td>
                        <td><input type="text" v-model="horario._24set" size="5"></td>
                        <td><input type="text" v-model="horario._28det" size="5"></td>
                    </tr>
                    <tr>
                        <th>Salida Tarde</th>
                        <td><input type="text" v-model="horario._05lst" size="5"></td>
                        <td><input type="text" v-model="horario._09mst" size="5"></td>
                        <td><input type="text" v-model="horario._13mist" size="5"></td>
                        <td><input type="text" v-model="horario._17jst" size="5"></td>
                        <td><input type="text" v-model="horario._21vst" size="5"></td>
                        <td><input type="text" v-model="horario._25sst" size="5"></td>
                        <td><input type="text" v-model="horario._29dst" size="5"></td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"  @click="addHorario()">Agregar Datos </button>
      </div>
    </div>
  </div>
</div>


    <!-- Modal  Reporte-->
<div class="modal fade" id="reporteModal" tabindex="-1" aria-labelledby="reporteModalLabel" aria-hidden="true">
  <div class="modal-dialog-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Reporte de Asistencia</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"  @click="updateBiometrico()">Agregar Datos </button>
      </div>
    </div>
  </div>
</div>

</template>
<script>
import BiometricoService from '@/services/biometricoService';

export default {
    name:'ComponenteControlPersonalVue',
    props:['persona'],
    data(){
        return{
            biometricoService:null,
            listaBiometrico:[],
            listaPerfil:[],
            id_bio:0,
            id_horario:0,
            getPB:true,
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
                _06lugar:''
            },
            horario:{
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
            reporteFinal:[]
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
                    console.log("hola horario" +this.id_horario);
                    this.getHorario();
                }
            });
            
        },
        datosChange(){
            this.listaBiometrico.forEach(element => {
                if (element.id== this.id_bio)
                {
                    this.biometrico=element;
                    this.biometrico._03cif=this.persona._01cif;
                }
            });
        },
        addHorario(){
            this.horario._01cif=this.persona._01cif;
            this.$swal.fire({
                title: 'Desea Agregar los datos del Biometrico al Ciudadano ?',
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.biometricoService.addHorario(this.horario).then(response=>{
                        console.log("esta es la respuesta =====================");
                        console.log(response.status);
                        if(response.status==200){
                            this.$swal.fire('Los Horarios fueron Agregados al Ciudadano Corectamente', '', 'success');
                        }
                        else{
                            this.$swal.fire('Los Datos no fueron Guardados Error'+ response.status, '', 'error');
                        }
                    });
                    
                } else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });
        },
        getHorario(){
            this.biometricoService.getHorario(this.id_horario,this.persona._01cif).then(response=>{
                this.horarioPerfil=response.data;
            });
        },
        updateBiometrico(){
            this.$swal.fire({
                title: 'Desea Agregar el Nuevo Horario al Ciudadano ?'+this.biometrico._02nombre,
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.biometricoService.updateBiometrico(this.biometrico).then(response=>{
                        console.log("esta es la respuesta =====================");
                        console.log(response.status);
                        if(response.status==200){
                            this.$swal.fire('Datos del Biometrico Agregados al Ciudadano Corectamente', '', 'success');
                        }
                        else{
                            this.$swal.fire('Los Datos no fueron Guardados Error'+ response.status, '', 'error');
                        }
                    });
                    
                } else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
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
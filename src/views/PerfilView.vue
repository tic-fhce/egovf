<template>
    <ComponenteMenuVue :cif="usuario.cif" :menu="usuario.menu" />
    <div class="container">
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <div class="row">
            <div class="card col-sm-6">
                <div class="row">
                    <div class="card-header headercolor">
                        <h3>Datos Personales</h3>
                    </div>
                    <div class="col-sm-4">
                        <br>
                        <img src="../assets/user.png" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-sm-8">
                        <div class="card-body">
                            <div class="row">
                                <h4 class="card-title">CIF : {{persona._01cif}}</h4>
                                <label for="nombre" class="col-md-6">Nombre : </label>
                                <label for="nombre" class="col-md-6">{{persona._04nombre}}</label>

                                <label for="apellido" class="col-md-6">Apellidos : </label>
                                <label for="nombre" class="col-md-6">{{persona._05paterno}} {{persona._06materno}}</label>
                            </div>
                            <hr>
                            <ul>
                                <li>ID app : {{persona.id}}</li>
                                <li>CIF : {{persona._01cif}}</li>
                                <li>C.I. : {{persona._02ci}} {{persona._03complemento}}</li>
                                <li>Correo : {{persona._10correo}}</li>
                                <li>Unidad : {{ usuario.sigla }}</li>
                                <li>Celular : {{persona._09cel}}</li>
                                <li>Fecha N : {{persona._07fecha}}</li>
                                <li v-if="persona._08sexo == 1">Sexo : Femenino</li>
                                <li v-if="persona._08sexo == 2">Sexo : Masculino</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-1">
            </div>
            <div class="card col-sm-5">
                <div class="row">
                    <div class="card-header headercolor">
                        <h3>Datos E-govf</h3>
                    </div>
                    <div class="card-body">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="user-tab" data-bs-toggle="tab" data-bs-target="#user" type="button" role="tab"  aria-selected="true">Datos Usuario</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="actualizar-tab" data-bs-toggle="tab" data-bs-target="#actualizar" type="button" role="tab"  aria-selected="false">Actualizar</button>
                            </li>
                        </ul>
                        
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="user" role="tabpanel" aria-labelledby="home-tab">
                                <ul>
                                    <li>ID app : {{egovf.id}}</li>
                                    <li>CIF : {{egovf._01cif}}</li>
                                    <li>Matricula : {{egovf._02matricula}} {{usuario._03complemento}}</li>
                                    <li>C.I. : {{egovf._03ci}} {{egovf._04complemento}}</li>
                                    <li>Correo : {{egovf._05correo}}</li>
                                    <li>Celular : {{egovf._06celular}}</li>
                                    <li>Unidad : {{ usuario.sigla }}</li>
                                </ul>
                            </div>
                            <div class="tab-pane fade" id="actualizar" role="tabpanel" aria-labelledby="profile-tab">
                                <!-- Button trigger modal -->
                                <ul>
                                    <li>ID app : {{egovf.id}}</li>
                                    <li>CIF : {{egovf._01cif}}</li>
                                    <li>Matricula : <a href="#" data-bs-toggle="modal" data-bs-target=#matriculamodal>{{egovf._02matricula}}</a></li>
                                    <li>C.I. : {{egovf._03ci}} {{egovf._04complemento}}</li>
                                    <li>Correo : {{egovf._05correo}}</li>
                                    <li>Unidad : {{ usuario.sigla }}</li>
                                    <li>Celular : <a href="#" data-bs-toggle="modal" data-bs-target=#celularmodal> {{egovf._06celular}}</a></li>
                                    <li>Contraseña : <a href="#" data-bs-toggle="modal" data-bs-target=#passmodal> Actualizar Contraseña</a></li>
                                </ul>
                            </div>
                            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<!-- Modal  Celular-->
<div class="modal fade" id="celularmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Actualizar Numero de Celular</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3 row">
            <label for="celular" class="col-sm-6 col-form-label">Nuevo Numero de Celular</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" v-model="persona._09cel">
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"  @click="updatePersona()">Guardar Cambios</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Matricula-->
<div class="modal fade" id="matriculamodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Actualizar Matricula Universitaria</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3 row">
            <label for="celular" class="col-sm-6 col-form-label">Matricula</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" v-model="egovf._02matricula">
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"  @click="updateUsuario()">Guardar Cambios</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal  Contraseña-->
<div class="modal fade" id="passmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Actualizar Contraseña</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3 row">
            <label for="actual" class="col-sm-6 col-form-label">Contraseña Actual</label>
            <div class="col-sm-6">
                <input type="password" class="form-control" v-model="contra" @keyup="botonesFuncion()">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="nueva" class="col-sm-6 col-form-label">Nueva Contraseña </label>
            <div class="col-sm-6">
                <input type="password" class="form-control" v-model="pass._08pass" @keyup="botonesFuncion()">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="confirmar" class="col-sm-6 col-form-label">Confirmar Nueva Contraseña </label>
            <div class="col-sm-6">
                <input type="password" class="form-control" v-model="pass._09pass" @keyup="botonesFuncion()">
            </div>
        </div>
        <div class="mb-3 row text-center">
            <div class="col-sm-12 col-form-label" v-if="pass._08pass!=pass._09pass">
                <div class="alert alert-danger" role="alert">
                    Las Contraseñas no Coinciden
                </div>
            </div>
        </div>
      </div>
      <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button v-if="botones" type="button" class="btn btn-primary" data-bs-dismiss="modal"  @click="updatePass()">Guardar Cambios</button>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import ComponenteMenuVue from '@/components/ComponenteMenu.vue'
import UsuarioService from '@/services/usuarioServices';

export default {
    name:'PerfilView',
    data(){
        return {
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
            usuario:{
                token:'',
                cif:'',
                correo:'',
                celular:'',
                pass:'',
                menu:[],
                unidad:'',
                sigla:''
            },
            egovf:{
                id:null,
                _01cif:'',
                _02matricula:'',
                _03ci:'',
                _04complemento:'',
                _05correo:'',
                _06celular:'',
                _07pass:''
            },
            pass:{
                id:null,
                _01cif:'',
                _02matricula:'',
                _03ci:'',
                _04complemento:'',
                _05correo:'',
                _06celular:'',
                _07pass:'',
                _08pass:'',
                _09pass:''
            },
            contra:'',
            botones:false
        }
    },
    components:{
        ComponenteMenuVue
    },
    computed:{

    },
    created(){
        if(this.$cookies.get('cif')!=null){
            this.usuario.token=this.$cookies.get('token');
            this.usuario.cif=this.$cookies.get('cif');
            this.usuario.correo=this.$cookies.get('correo');
            this.usuario.celular=this.$cookies.get('celular');
            this.usuario.pass=this.$cookies.get('pass');
            this.usuario.menu=this.$cookies.get('menu');
            this.usuario.unidad = this.$cookies.get('unidad');
            this.usuario.sigla = this.$cookies.get('sigla');

            this.usuarioService= new UsuarioService();
            this.usuarioService.headersUsuario(this.usuario.token);

            this.usuarioService.getPerfil(this.usuario.cif).then(response => {
                this.persona = response.data;
                });
            this.usuarioService.getUsuario(this.usuario.cif).then(response=>{
                this.egovf=response.data;
            });
        }
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    methods:{
        updatePersona(){
            this.egovf._06celular=this.persona._09cel;
            this.$swal.fire({
                title: 'Desea Realizar los Cambios',
                showDenyButton: true,
                confirmButtonText: 'Actualizar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.usuarioService.updatePersona(this.persona).then(response=>{
                        if(response.status==200){
                            this.$swal.fire('Datos Guardados Corectamente', '', 'success');
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
        updateUsuario(){
            this.$swal.fire({
                title: 'Desea Realizar los Cambios',
                showDenyButton: true,
                confirmButtonText: 'Actualizar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.usuarioService.updateUsuario(this.egovf).then(response=>{
                        console.log("esta es la respuesta =====================");
                        console.log(response.status);
                        if(response.status==200){
                            this.$swal.fire('Datos Guardados Corectamente', '', 'success');
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
        updatePass(){
            this.pass.id=this.egovf.id;
            this.pass._01cif=this.egovf._01cif;
            this.pass._02matricula=this.egovf._02matricula;
            this.pass._03ci=this.egovf._03ci;
            this.pass._04complemento=this.egovf._04complemento;
            this.pass._05correo=this.egovf._05correo;
            this.pass._06celular=this.egovf._06celular;
            this.pass._07pass=this.egovf._07pass;
            this.pass._08pass=this.contra;
            this.$swal.fire({
                title: 'Desea Realizar los Cambios',
                showDenyButton: true,
                confirmButtonText: 'Actualizar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.usuarioService.updatePass(this.pass).then(response=>{
                        if(response.data==true){
                            this.$swal.fire('Datos Guardados Corectamente', '', 'success');
                            this.$cookies.remove('token');
                            this.$cookies.remove('cif');
                            this.$cookies.remove('correo');
                            this.$cookies.remove('celular');
                            this.$cookies.remove('pass');
                            this.$cookies.remove('menu');
                            this.$router.push('/');
                        }
                        else{
                            this.$swal.fire('La Contraseña Actual no es Correcta Verifique e intente Nuevamente', '', 'error');
                        }
                    });
                    
                } else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });
        },
        botonesFuncion(){
            if((this.contra!='') && (this.pass._08pass!='') && (this.pass._08pass==this.pass._09pass))
                this.botones=true;
            else
                this.botones=false;
        }
    }
}
</script>

<style scoped>
.margen{
    margin-top: 100px;
}
</style>
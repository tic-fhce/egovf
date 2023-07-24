<template>
<div class="row">
    <div class="card col-sm-6">
        <div class="row">
            <div class="card-header headercolor">
                <h3>Datos Personales</h3>
            </div>
            <div class="col-sm-4">
                <br>
                <img src="../assets/user.png" class="img-fluid rounded-start" alt="...">
                <br>
            </div>
            <div class="col-sm-8">
                <div class="card-body">
                    <div class="row">
                        <h4 class="card-title">CIF : {{persona._01cif}}</h4>
                        <h4>Unidad : {{ egovf._10sigla }}</h4>
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
                        <li>Celular : <a :href=what+persona._09cel target="_blank">{{persona._09cel}}</a></li>
                        <li>Unidad : {{ egovf._10sigla }}</li>
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
                            <li>Unidad : {{ egovf._10sigla }}</li>
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
                            <li>Celular : <a href="#" data-bs-toggle="modal" data-bs-target=#celularmodal> {{egovf._06celular}}</a></li>
                            <li>Unidad : <a href="#" data-bs-toggle="modal" data-bs-target=#unidadmodal>UN {{ egovf._10sigla }} </a></li>
                            <li>Contraseña : <a href="#" data-bs-toggle="modal" data-bs-target=#passmodalUsuario> Actualizar Contraseña</a></li>
                        </ul>
                    </div>
                    <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">

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
<div class="modal fade" id="passmodalUsuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Actualizar Contraseña</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3 row">
            <label for="nueva" class="col-sm-6 col-form-label">Nueva Contraseña </label>
            <div class="col-sm-6">
                <input type="password" class="form-control" v-model="contra">
            </div>
        </div>
      </div>
      <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"  @click="updatePassAdmin()">Guardar Cambios</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Unidad-->
<div class="modal fade" id="unidadmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Actualizar Unidad Facultativa</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3 row">
            <label for="celular" class="col-sm-6 col-form-label">Unidad</label>
            <div class="col-sm-6">
                <select class="form-control" v-model="unidad.sigla">
                    <option v-for="lu in listaUnidad" :value="lu._03sigla" :key="lu.id">{{lu._01unidad}}</option>
                </select>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"  @click="updateUnidad()">Guardar Cambios</button>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import UsuarioService from '@/services/usuarioServices';
import PersonaService from '@/services/personaService';
import UnidadService from '@/services/unidadService';
export default {
    name:'ComponenteDatosPersonalesVue',
    props:['cifCiudadano'],
    data(){
        return{
            usuarioService:null,
            personaService:null,
            unidadService:null,
            listaUnidad:[],
            what:"https://api.whatsapp.com/send?phone=591",
            getPB:true,
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
            egovf:{
                id:null,
                _01cif:'',
                _02matricula:'',
                _03ci:'',
                _04complemento:'',
                _05correo:'',
                _06celular:'',
                _07pass:'',
                _08unidad:'',
                _09dependiente:'',
                _10sigla:''
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
            unidad:{
                id:0,
                unidad:'',
                dependencia:'',
                sigla:''
            }
        }
    },
    mounted(){
        //this.getDatosComponenteDatosPersona();
        this.getListaUnidades();
    },
    created(){
        this.usuarioService= new UsuarioService();
        this.personaService = new PersonaService();
        this.unidadService= new UnidadService();
    },
    updated(){
        if(this.cifCiudadano>0 && this.getPB)
        {
            this.getDatosComponenteDatosPersona();
            this.getPB=false;
        }
    },
    methods:{
        getDatosComponenteDatosPersona(){
            this.usuario.token=this.$cookies.get('token');
            this.usuario.cif=this.$cookies.get('cif');
            this.usuario.correo=this.$cookies.get('correo');
            this.usuario.celular=this.$cookies.get('celular');
            this.usuario.pass=this.$cookies.get('pass');
            this.usuario.menu=this.$cookies.get('menu');
            this.usuario.unidad = this.$cookies.get('unidad');
            this.usuario.sigla = this.$cookies.get('sigla');

            // Creamos datos de Usuario
            
            this.usuarioService.headersUsuario(this.usuario.token);
            this.usuarioService.getUsuario(this.cifCiudadano).then((response) =>{
                this.egovf=response.data;
            });

            // creamos los datos del Ciudadano
            
            this.personaService.headersUsuario(this.usuario.token);
            this.personaService.getPersona(this.cifCiudadano).then((response) =>{
                this.persona=response.data;
            });
            this.what+this.persona._09cel;
            
        },
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
        updatePassAdmin(){
            this.pass.id=this.persona.id;
            this.pass._01cif=this.persona._01cif;
            this.pass._02matricula=this.egovf._02matricula;
            this.pass._03ci=this.persona._02ci;
            this.pass._04complemento=this.persona._03complemento;
            this.pass._05correo=this.persona._10correo;
            this.pass._06celular=this.persona._09cel;
            this.pass._07pass=this.contra;
            this.pass._08pass=this.contra;
            this.pass._09pass=this.contra;

            this.$swal.fire({
                title: 'Desea Realizar los Cambios',
                showDenyButton: true,
                confirmButtonText: 'Actualizar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.usuarioService.updatePassAdmin(this.pass).then(response=>{
                        if(response.data==true){
                            this.$swal.fire('Datos Guardados Corectamente', '', 'success');
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
        async getListaUnidades(){
            await this.unidadService.getListaUnidad().then((response)=>{
                this.listaUnidad = response.data;
            });
        },
        updateUnidad(){
            this.listaUnidad.forEach(element => {
                if(element._03sigla == this.unidad.sigla){
                    this.unidad.id = element.id; 
                    this.unidad.unidad = element._01unidad;
                    this.unidad.dependiente = element._02dependiente;
                    return false;
                }
            });
            this.$swal.fire({
                title: 'Desea Realizar los Cambios',
                showDenyButton: true,
                confirmButtonText: 'Actualizar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.usuarioService.updateUnidad(this.egovf,this.unidad).then(response=>{
                        if(response.status==200){
                            this.unidadService.registrarPertenece(this.egovf,this.unidad).then(r =>{
                                if(r.status==200){
                                    this.$swal.fire('Datos Guardados Corectamente', '', 'success').then((result) => {
                                        if(result)
                                            location.reload();
                                    });
                                }
                                else{
                                    this.$swal.fire('Los Datos no fueron Guardados Error'+ r.status, '', 'error');
                                }
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
        },
    }
}
</script>
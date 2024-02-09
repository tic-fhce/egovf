<template>
    <div class="row">
        <!--Datos personales del Ciudadano-->
        <div class="card col-sm-6">
            <div class="row">
                <div class="card-header headercolor">
                    <h3>Datos Personales</h3>
                </div>
                <div class="col-sm-4">
                    <br>
                        <img :src="egovf.foto" class="img-fluid rounded-start" alt="...">
                    <br>
                    <a href="#" data-bs-toggle="modal" data-bs-target=#fotomodal><span class="material-icons-dark">&#xe412;</span> Actualizar Foto</a>
                </div>
                <div class="col-sm-8">
                    <div class="card-body">
                        <div class="row">
                            <h4 class="card-title">CIF : {{egovf.cif}}</h4>
                            <h4>Unidad : {{ egovf.sigla }}</h4>
                            <label for="nombre" class="col-md-6">Nombre : </label>
                            <label for="nombre" class="col-md-6">{{egovf.nombre}}</label>

                            <label for="apellido" class="col-md-6">Apellidos : </label>
                            <label for="nombre" class="col-md-6">{{egovf.paterno}} {{egovf.materno}}</label>
                        </div>
                        <hr>
                        <ul>
                            <li>ID app : {{egovf.idPersona}}</li>
                            <li>CIF : {{egovf.cif}}</li>
                            <li>C.I. : {{egovf.ci}} </li>
                            <li>Correo : {{egovf.correo}}</li>
                            <li>Celular : <a :href=what+egovf.celular target="_blank">{{egovf.celular}}</a></li>
                            <li>Unidad : {{ egovf.sigla }}</li>
                            <li>Fecha N : {{egovf.fecha}}</li>
                            <li v-if="egovf.sexo == 1">Sexo : Femenino</li>
                            <li v-if="egovf.sexo == 2">Sexo : Masculino</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!--End Datos personales del Ciudadano-->

        <div class="col-sm-1">
        </div>
        
        <!--Datos del Usuario-->
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
                                <li>ID app : {{egovf.idPersona}}</li>
                                <li>CIF : {{egovf.cif}}</li>
                                <li>Matricula : {{egovf.matricula}}</li>
                                <li>C.I. : {{egovf.ci}} </li>
                                <li>Correo : {{egovf.correo}}</li>
                                <li>Celular : {{egovf.celular}}</li>
                                <li>Unidad : {{ egovf.sigla }}</li>
                            </ul>
                        </div>
                        <div class="tab-pane fade" id="actualizar" role="tabpanel" aria-labelledby="profile-tab">
                            <ul>
                                <li>ID app : {{egovf.idPersona}}</li>
                                <li>CIF : {{egovf.cif}}</li>
                                <li>Matricula : <a href="#" data-bs-toggle="modal" data-bs-target=#matriculamodal>{{egovf.matricula}}</a></li>
                                <li>C.I. : {{egovf.ci}}</li>
                                <li>Correo : {{egovf.correo}}</li>
                                <li>Celular : <a href="#" data-bs-toggle="modal" data-bs-target=#celularmodal> {{egovf.celular}}</a></li>
                                <li>Unidad : <a href="#" data-bs-toggle="modal" data-bs-target=#unidadmodal>{{ egovf.sigla }} </a></li>
                                <li>Contraseña : <a href="#" data-bs-toggle="modal" data-bs-target=#passmodalUsuario> Actualizar Contraseña</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--End Datos del Usuario-->
    </div>

<!-- Modal  Celular-->
<div class="modal fade" id="celularmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header headercolor">
        <h5 class="modal-title">Actualizar Numero de Celular</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3 row">
            <label for="celular" class="col-sm-6 col-form-label">Nuevo Numero de Celular</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" v-model="egovf.celular">
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
<!--End Modal  Celular-->

<!-- Modal Matricula-->
<div class="modal fade" id="matriculamodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header headercolor">
        <h5 class="modal-title">Actualizar Matricula Universitaria</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3 row">
            <label for="celular" class="col-sm-6 col-form-label">Matricula</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" v-model="egovf.matricula">
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
<!-- End Modal Matricula-->


<!-- Modal  Contraseña-->
<div class="modal fade" id="passmodalUsuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header headercolor">
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
<!-- End Modal  Contraseña-->

<!-- Modal Unidad-->
<div class="modal fade" id="unidadmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header headercolor">
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

<!--Modal Foto-->
<div class="modal fade" id="fotomodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header headercolor">
        <h5 class="modal-title">Actualizar Foto de Perfil</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="updateFoto()" enctype="multipart/form-data">
            <div class="mb-3 row">
                <label for="archivo" class="col-sm-4 col-form-label">Foto de Perfil</label>
                <div class="col-sm-8">
                    <input type="file" ref="file" class="form-control" accept="image/png,image/jpeg" @change="selectFile()">
                </div>
            </div>
            <br>
            <div class="md-3 row text-center">
                <img :src="egovf.foto" class="img-fluid">
            </div>
            <br>

            <div class="mb-3 row">
                <div class="col-md-4"></div>
                <div class="col-md-4"><button class="btn btn-success"><span class="material-icons-button">&#xe412;</span>Actualizar Foto</button></div>
                <div class="col-md-4"></div>
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        </div>
    </div>
  </div>
</div>
<!--End Modal Foto-->

</template>

<script>
// Declaramos los servicios
import UsuarioService from '@/services/usuarioServices';
import PersonaService from '@/services/personaService';
import UnidadService from '@/services/unidadService';
import UploadService from '@/services/upload/uploadService';

export default {
    name:'ComponenteDatosPersonalesVue',
    props:['cifCiudadano','egovfp'],
    data(){
        return{
            usuarioService:null,
            personaService:null,
            unidadService:null,
            uploadService:null,
            listaUnidad:[],
            what:"https://api.whatsapp.com/send?phone=591",
            getPB:true,
            archivo:'',
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
            },
            pass:{
                id:null,
                cif:'',
                pass1:'',
                pass2:'',
                pass3:''
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
        this.getListaUnidades();
        
    },
    created(){
        this.usuarioService= new UsuarioService();
        this.personaService = new PersonaService();
        this.unidadService = new UnidadService();
        this.uploadService = new UploadService();
    },
    updated(){
        this.egovf = this.egovfp;

        if(this.cifCiudadano>0 && this.getPB)
        {
            this.getDatosComponenteDatosPersona();
            
            this.getPB = false;
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

            this.what+this.egovf.celular;
        },
        updatePersona(){//Funcion para actualizar los datosde la persona
            this.$swal.fire({
                title: 'Desea Realizar los Cambios',
                showDenyButton: true,
                confirmButtonText: 'Actualizar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.usuarioService.updatePersona(this.egovf).then(response=>{
                        if(response.status == 200){
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
                        if(response.status == 200){
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
        updatePassAdmin(){ // Funcion para actualizar la contraceña del usuaruio
            this.pass.id=this.egovf.idUsuario;
            this.pass.cif=this.egovf.cif;
            this.pass.pass1=this.contra;
            this.pass.pass2=this.contra;
            this.pass.pass3=this.contra;

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
                        if(response.status == 200){
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
        selectFile(){//Funncion que cambia los datosde la imagen 
            this.archivo = this.$refs.file.files[0];
        },
        async updateFoto(){//Funcion para actualizar la foto de perfil
            const fromData = new FormData();
            fromData.append('archivo',this.archivo);
            try{
                this.uploadService.addImagen(fromData).then((response)=>{
                    if(response.status == 200){
                        this.egovf.foto = this.uploadService.getUrl()+ response.data.nombre;
                        this.$swal.fire({
                            title: 'Desea Subir la foto de perfil del Ciudadano ?'  +this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno,
                            showDenyButton: true,
                            confirmButtonText: 'Aceptar',
                            denyButtonText: 'Cancelar',
                            }).then((result) => {
                            if (result.isConfirmed) {
                                this.usuarioService.updateUsuario(this.egovf).then(response =>{
                                    if(response.status == 200){
                                        this.$swal.fire('La Foto de Perfil del Ciudadano',+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno+' Fue guardado correctamente', 'success').then((res)=>{
                                            if(res)
                                                location.reload();
                                        });
                                    }
                                    else{
                                        this.$swal.fire('La Foto de Perfil no pudo ser Guardado, intente mas tarde'+ response.status, '', 'error');
                                    }
                                });
                                
                            } else if (result.isDenied) {
                                this.$swal.fire('Datos Cancelados', '', 'info');
                            }
                        });
                    }
                    else {
                        this.$swal.fire('La foto de Perfil No puede ser guardado Intente mas tarde','', 'error');
                    }
            });
            }catch(err){
                console.log(err);
            }
        }
    }
}
</script>
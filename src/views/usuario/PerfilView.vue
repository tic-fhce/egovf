<template>
    <ComponenteBarra :titulo="titulo"/>
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
                            <img :src="egovf.foto" class="img-fluid rounded-start" alt="...">
                        <br>
                        <a href="#" data-bs-toggle="modal" data-bs-target=#fotomodal><span class="material-i-dark">&#xe412;</span> Actualizar Foto</a>
                    </div>
                    <div class="col-sm-8">
                        <div class="card-body">
                            <div class="row">
                                <h4 class="card-title">CIF : {{egovf.cif}}</h4>
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
                                <li>Unidad : {{ egovf.sigla }}</li>
                                <li>Celular : {{egovf.celular}}</li>
                                <li>Fecha N : {{egovf.fecha}}</li>
                                <li v-if="egovf.sexo == 1">Sexo : Femenino</li>
                                <li v-else >Sexo : Masculino</li>
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
                                    <li>ID app : {{egovf.idUsuario}}</li>
                                    <li>CIF : {{egovf.cif}}</li>
                                    <li>Matricula : {{egovf.matricula}}</li>
                                    <li>C.I. : {{egovf.ci}} {{egovf.complemento}}</li>
                                    <li>Correo : {{egovf.correo}}</li>
                                    <li>Celular : {{egovf.celular}}</li>
                                    <li>Unidad : {{ egovf.sigla }}</li>
                                </ul>
                            </div>
                            <div class="tab-pane fade" id="actualizar" role="tabpanel" aria-labelledby="profile-tab">
                                <!-- Button trigger modal -->
                                <ul>
                                    <li>ID app : {{egovf.idUsuario}}</li>
                                    <li>CIF : {{egovf.cif}}</li>
                                    <li>Matricula :{{egovf.matricula}}</li>
                                    <li>C.I. : {{egovf.ci}} </li>
                                    <li>Correo : {{egovf.correo}}</li>
                                    <li>Unidad : {{ egovf.sigla }}</li>
                                    <li>Celular : <a href="#" data-bs-toggle="modal" data-bs-target=#celularmodal> {{egovf.celular}}</a></li>
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

    <ComponenteFooter/>

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
            <h4 class="card-title">CIF : {{egovf.cif}}</h4>
        </div>
        <div class="mb-3 row">
            <label for="nombre" class="col-md-6">Nombre : </label>
            <label for="nombre" class="col-md-6">{{egovf.nombre}}</label>
        </div>
        <div class="mb-3 row">
            <label for="apellido" class="col-md-6">Apellidos : </label>
            <label for="nombre" class="col-md-6">{{egovf.paterno}} {{egovf.materno}}</label>
        </div>

        <div class="mb-3 row">
            <label for="celular" class="col-sm-6 col-form-label">Nuevo Numero de Celular : </label>
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

<!-- Modal  Contraseña-->
<div class="modal fade" id="passmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header headercolor">
        <h5 class="modal-title">Actualizar Contraseña</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3 row">
            <h4 class="card-title">CIF : {{egovf.cif}}</h4>
        </div>
        <div class="mb-3 row">
            <label for="nombre" class="col-md-6">Nombre : </label>
            <label for="nombre" class="col-md-6">{{egovf.nombre}}</label>
        </div>
        <div class="mb-3 row">
            <label for="apellido" class="col-md-6">Apellidos : </label>
            <label for="nombre" class="col-md-6">{{egovf.paterno}} {{egovf.materno}}</label>
        </div>
        <div class="mb-3 row">
            <label for="actual" class="col-sm-6 col-form-label">Contraseña Actual :</label>
            <div class="col-sm-6">
                <input type="password" class="form-control" v-model="pass.pass1" @keyup="botonesFuncion()">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="nueva" class="col-sm-6 col-form-label">Nueva Contraseña :</label>
            <div class="col-sm-6">
                <input type="password" class="form-control" v-model="pass.pass2" @keyup="botonesFuncion()">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="confirmar" class="col-sm-6 col-form-label">Confirmar Nueva Contraseña :</label>
            <div class="col-sm-6">
                <input type="password" class="form-control" v-model="pass.pass3" @keyup="botonesFuncion()">
            </div>
        </div>
        <div class="mb-3 row text-center">
            <div class="col-sm-12 col-form-label" v-if="pass.pass2 !=pass.pass3">
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
// Importamos Componetes 
import ComponenteMenuVue from '@/components/ComponenteMenu.vue';
import ComponenteBarra from '@/components/ComponenteBarra.vue';
import ComponenteFooter from '@/components/ComponenteFooter.vue';

//Importamos Servicios
import UsuarioService from '@/services/usuarioServices';
import EgovfService from '@/services/egovf/egovfService';
import UploadService from '@/services/upload/uploadService';

export default {
    name:'PerfilView',
    components:{
        ComponenteMenuVue,
        ComponenteBarra,
        ComponenteFooter
    },
    data(){
        return {
            titulo : 'Perfil de Usuario',
            egovfService : null,
            uploadService :null,
            usuarioService: null,
            botones:false,
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
                foto:''
            },
            pass:{
                id:null,
                cif:'',
                pass1:'',
                pass2:'',
                pass3:''
            }
        }
    },
    computed:{

    },
    created(){
        this.usuarioService = new UsuarioService();
        this.egovfService = new EgovfService();
        this.uploadService = new UploadService();
    },
    mounted(){
        this.getDatos();// Llamamos la funcion para recuperar los Datos
        this.getEgovf();// Llamamos los datos del ciudadano
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    methods:{
        getDatos(){// Funcion que guarda los datos del Usuario en la View
            if(this.$cookies.get('cif')!=null){
                this.usuario.token = this.$cookies.get('token');
                this.usuario.cif = this.$cookies.get('cif');
                this.usuario.correo = this.$cookies.get('correo');
                this.usuario.celular = this.$cookies.get('celular');
                this.usuario.pass = this.$cookies.get('pass');
                this.usuario.menu = this.$cookies.get('menu');
                this.usuario.unidad = this.$cookies.get('unidad');
                this.usuario.sigla = this.$cookies.get('sigla');
                this.titulo=this.usuario.correo+'> '+this.titulo;

                this.usuarioService.headersUsuario(this.usuario.token);
            }
        },
        async getEgovf(){//Funcion que debuelve los datos del ciudadano 
            this.egovfService.headersUsuario(this.usuario.token);
            await this.egovfService.getEgovf(this.usuario.cif).then((response) =>{
                this.egovf = response.data;
            });
        },
        updatePersona(){//funcion para actualizar los datos de la persona
            this.$swal.fire({
                title: 'Desea Realizar los Cambios',
                showDenyButton: true,
                confirmButtonText: 'Actualizar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.usuarioService.updatePersona(this.egovf).then(response=>{
                        if(response.status==200){
                            this.$swal.fire('Tus Datos Guardados Corectamente', '', 'success');
                        }
                        else{
                            this.$swal.fire('Los Datos no fueron Guardados Error',response.status, 'error');
                        }
                    });
                    
                } else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });  
        },
        updatePass(){// Funcion que cambia la contraseña del usuario
            this.pass.id = this.egovf.id;
            this.pass.cif = this.egovf.cif;
            this.$swal.fire({
                title: 'Desea Actualizar la contraseña ?',
                showDenyButton: true,
                confirmButtonText: 'Actualizar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.usuarioService.updatePass(this.pass).then(response=>{
                        if(response.data==true){
                            this.$swal.fire('Datos Guardados Corectamente', 'Inicie secion nuevamente', 'success');
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
        botonesFuncion(){// Funcion que habilita los botnes para la actualizacion del pass
            if((this.pass.pass1 != '') && (this.pass.pass2 !='') && (this.pass.pass2 == this.pass.pass3))
                this.botones=true;
            else
                this.botones=false;
        },
        selectFile(){//Funcion que cambia los datos del archivp
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
                                        this.$swal.fire('La Foto de Perfil del Ciudadano'+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno +' Fue guardado correctamente', '','success').then((res)=>{
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
                        this.$swal.fire('La foto de Perfil No puede ser guardado Intente mas tarde', 'error');
                    }
            });
            }catch(err){
                console.log(err);
            }
        }
    }
}
</script>

<style scoped>
.margen{
    margin-top: 100px;
}
</style>
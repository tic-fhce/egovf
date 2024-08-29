<template>
    <div class="container">
        <div class="margen">
        </div>
        <div class="row">
            <div class="col-md-6">
                <img alt="Logo Tic Facultativo" class="img-fluid" src="@/assets/img/logoticjpg.jpg">
            </div>
            <div class="col-md-6">

                <div class="card">
                    <div class="card-body">
                        <form>
                            <div class="mb-3 mt-2">
                                <select class="form-control" v-model="selector" v-on:change="seleccionar()">
                                    <option value="0">Seleccionar Metodo de Identificacion</option>
                                    <option value="1">CIF</option>
                                    <option value="2">Matricula</option>
                                    <option value="3">C.I.</option>
                                    <option value="4">Correo Electronico</option>
                                    <option value="5">Celular</option>
                                </select>
                            </div>

                            <div v-if="selector==1" class="mb-3 mt-2">
                                <p>{{textnick}}</p>
                                <input type="text" v-model="loginnes.cif" class="form-control" placeholder="Ingrese CIF" required>
                            </div>

                            <div v-if="selector==2" class="mb-3 mt-2">
                                <p>{{textnick}}</p>
                                <input type="text" v-model="loginnes.matricula" class="form-control" placeholder="Matricula Universitaria" required>
                            </div>

                            <div v-if="selector == 3" class="mb-3 mt-2">
                                <div class="row">
                                    <p>{{textnick}}</p>
                                    <div class="col-md-8">
                                        <input type="text" v-model="loginnes.ci" class="form-control" placeholder="Ingrese su Carnet de Identidad" required>
                                    </div>
                                    <div class="col-md-4">
                                        <select class="form-control" v-model="loginnes.complemento" required>
                                            <option>{{textnick}}</option>
                                            <option value="lp">lp</option>
                                            <option value="sc">sc</option>
                                            <option value="cb">cb</option>
                                            <option value="or">or</option>
                                            <option value="pt">pt</option>
                                            <option value="tr">tr</option>
                                            <option value="ch">ch</option>
                                            <option value="bn">bn</option>
                                            <option value="pd">pd</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div v-if="selector==4" class="mb-3 mt-2">
                                <p>{{textnick}}</p>
                                <input type="email" v-model="loginnes.correo" class="form-control" placeholder="Correo Electronico" required>
                            </div>
                            <div v-if="selector==5" class="mb-3 mt-2">
                                <p>{{textnick}}</p>
                                <input type="text" v-model="loginnes.celular" class="form-control" placeholder="Numero de Celular" required>
                            </div>

                            <div class="mb-3 mt-2">
                                <input type="password" v-model="loginnes.pass" class="form-control"  placeholder="Contraseña" v-on:keyup.enter="ingresar()" required>
                            </div>
                        </form>
                        
                    </div>
                    <div class="card-footer d-grid gap-2">
                        <button class="btn btn-success" v-on:click="ingresar()">Iniciar Sesión</button>
                        <button class="btn">¿Olvidaste tu Contraseña?</button>
                        <button class="btn btn-primary">Crear Cuenta</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
</template>
<script>
import UsuarioService from '@/services/usuarioServices';
import '@styles/stylesFront.css'
export default {
    name:'SesionView',
    usuarioService:null,
    components:{
    },
    data(){
        return {
            selector:0,
            nick:'',
            pass:'',
            textnick:'Ingrese Usuario y Contraseña',
            region:'0',
            carga:0,
            loginnes:{
                cif:0,
                matricula:0,
                ci:0,
                complemento:"lp",
                correo:null,
                celular:0,
                pass:""
            }
        }
    },
    created(){
        this.usuarioService= new UsuarioService();
        this.carga = 0;
    },
    beforeCreate(){
      if(this.carga == 0){
        location.reload();
        this.carga = 1;
      }
    },
    computed:{
    },
    methods:{
        seleccionar(){
            if(this.selector==0){
                this.textnick='Ingrese su Usuario y Contraseña'
            }
            if(this.selector==1){
                this.textnick='Ingrese su Codigo de Identificacion Facultativa'
            }
            if(this.selector==3){
                this.textnick='Complemento C.I.'
            }
            if(this.selector==2){
                this.textnick='Ingrese su Matricula Universitaria'
            }
            if(this.selector==4){
                this.textnick='Correo Electronico'
            }
            if(this.selector==5){
                this.textnick='Ingrese su Numero de celular'
            }
            console.log(this.selector+' : '+this.textnick)
        },
        async ingresar(){
            var payload={
                "id":this.selector,
                "cif":this.loginnes.cif,
                "matricula":this.loginnes.matricula,
                "ci":this.loginnes.ci,
                "complemento":this.loginnes.complemento,
                "correo":this.loginnes.correo,
                "celular":this.loginnes.celular,
                "pass":this.loginnes.pass
            };
            console.log(payload);
            await this.usuarioService.getToken(payload).then(response=>{
                if(response.data!=""){
                    this.usuarioService.headersUsuario(response.data.token);
                    this.$cookies.set('token',response.data.token);
                    this.$cookies.set('cif',response.data.cif);
                    this.$cookies.set('correo',response.data.correo);
                    this.$cookies.set('celular',response.data.celular);
                    this.$cookies.set('pass',response.data.pass);
                    this.$cookies.set('unidad',response.data.unidad);
                    this.$cookies.set('sigla',response.data.sigla);
                    this.$cookies.set('foto',response.data.foto);
                    this.$cookies.set('titulo','Escritorio');
                    this.$router.push('/egovf');
                }
                else{
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Los datos Ingresados son Incorrectos, verifique e intente Nuevamente, o comuníquese con el administrador.',
                        footer: '<a href="https://svfhce.umsa.bo">Porque pasa esto?</a>'
                    }).then((result)=>{
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                }
            })
            .catch(error=>{
                error.response.data;
            })
        }
    },
}
</script>

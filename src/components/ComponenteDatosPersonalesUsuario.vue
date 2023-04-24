<template>
<div class="row">
    <div class="card col col-sm-12 col-md-12">
        <div class="row">
            <div class="card-header">
                <h3>Datos Personales</h3>
            </div>
            <div class="col col-sm-4 col-md-4">
                <br>
                <img src="../assets/user.png" class="img-fluid rounded-start" alt="...">
                <br>
            </div>
            <div class="col col-sm-8 col-md-8">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <h4 class="card-title">CIF : {{persona._01cif}}</h4>
                            <label for="nombre" class="col-md-6">Nombre : </label>
                            <label for="nombre" class="col-md-6">{{persona._04nombre}}</label>

                            <label for="apellido" class="col-md-6">Apellidos : </label>
                            <label for="nombre" class="col-md-6">{{persona._05paterno}} {{persona._06materno}}</label>
                        </div>
                        <div class="col">
                            <ul>
                                <li>ID app : {{persona.id}}</li>
                                <li>CIF : {{persona._01cif}}</li>
                                <li>C.I. : {{persona._02ci}} {{persona._03complemento}}</li>
                                <li>Correo : {{persona._10correo}}</li>
                                <li>Celular : <a href="" target="_blank">{{persona._09cel}}</a></li>
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

</template>

<script>
import UsuarioService from '@/services/usuarioServices';
import PersonaService from '@/services/personaService';

export default {
    name:'ComponenteDatosPersonalesUsuarioVue',
    props:['cifCiudadano'],
    data(){
        return{
            usuarioService:null,
            personaService:null,
            what:"https://api.whatsapp.com/send?phone=591",
            getPB:true,
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
            }
        }
    },
    mounted(){
        //this.getDatosComponenteDatosPersona();
    },
    created(){
        this.usuarioService= new UsuarioService();
        this.personaService = new PersonaService();
    },
    updated(){
        if(this.cifCiudadano>0 && this.getPB)
        {
            this.getDatosComponenteDatosPersonaUsuario();
            this.getPB=false;
        }
    },
    methods:{
        getDatosComponenteDatosPersonaUsuario(){
            this.usuario.token=this.$cookies.get('token');
            this.usuario.cif=this.$cookies.get('cif');
            this.usuario.correo=this.$cookies.get('correo');
            this.usuario.celular=this.$cookies.get('celular');
            this.usuario.pass=this.$cookies.get('pass');
            this.usuario.menu=this.$cookies.get('menu');

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
            
        }
        
    }
}
</script>
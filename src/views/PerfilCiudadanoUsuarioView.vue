<template>
    <ComponenteBarra :titulo="titulo"/>
    <div class="container">
        <div class="row">
            <ComponenteMenuVue :cif="usuario.cif" :menu="usuario.menu" />
        </div>
        
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <!--Construccion de Componentes-->
        <!-- Componente de Datos de Persona -->
        <br>
        <ComponenteDatosPersonalesUsuarioVue :cifCiudadano="usuario.cif"/>
        
        <!-- Componente de Reporte de Personal -->
        <br>
        <ComponenteControlPersonalUsuarioVue :personaUsuario="personaUsuario" />
        <!-- Componente de Permisos en el Menu -->

        <br>
        <div class="row">
            <ComponenteFooterVue />
        </div>
    </div>
    
</template>

<script>
//Importamos Componentes
import ComponenteMenuVue from '@/components/ComponenteMenu.vue';
import ComponenteBarra from '@/components/ComponenteBarra.vue';
import ComponenteFooterVue from '@/components/ComponenteFooter.vue';
import ComponenteDatosPersonalesUsuarioVue from '@/components/ComponenteDatosPersonalesUsuario.vue';
import ComponenteControlPersonalUsuarioVue from '@/components/ComponenteControlPersonalUsuario.vue';


import PersonaServiceUsuario from '@/services/personaService';

export default {
    name:'PerfilCiudadanoUsuarioView',
    components:{
        ComponenteMenuVue,
        ComponenteBarra,
        ComponenteDatosPersonalesUsuarioVue,
        ComponenteControlPersonalUsuarioVue,
        ComponenteFooterVue
    },
    data(){
        return {
            personaServiceUsuario:null,
            titulo:'Perfil de Ciudadano',
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
        }
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
        this.personaServiceUsuario= new PersonaServiceUsuario();
    },
    mounted(){
        this.getDatosUsuario();
    },
    methods:{
        getDatosUsuario(){
            if(this.$cookies.get('cif')!=null){
                this.usuario.token=this.$cookies.get('token');
                this.usuario.cif=this.$cookies.get('cif');
                this.usuario.correo=this.$cookies.get('correo');
                this.usuario.celular=this.$cookies.get('celular');
                this.usuario.pass=this.$cookies.get('pass');
                this.usuario.menu=this.$cookies.get('menu');
                this.usuario.unidad = this.$cookies.get('unidad');
                this.usuario.sigla = this.$cookies.get('sigla');

                this.titulo=this.usuario.correo+'> '+this.titulo;

                this.getDatosPersonaUsuario();
            }
        },
        getDatosPersonaUsuario(){
            this.personaServiceUsuario.headersUsuario(this.usuario.token);
            this.personaServiceUsuario.getPersona(this.usuario.cif).then((response) =>{
                this.personaUsuario=response.data;
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
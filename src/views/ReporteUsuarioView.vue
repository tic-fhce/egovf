<template>
    <ComponenteMenuVue :cif="usuario.cif" :menu="usuario.menu" />
    <div class="container">
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <!--Construccion de Componentes-->
        <!-- Componente de Datos de Persona -->
        <br>
        <ComponenteDatosPersonalesUsuarioVue :cifCiudadano="usuario.cif"/>
        
        <!-- Componente de Reporte de Personal 
        <ComponenteControlPersonalUsuarioVue :persona="persona" /> -->
        <!-- Componente de Permisos en el Menu -->

        <br>
    </div>    
    <ComponenteFooterVue />
</template>

<script>
import ComponenteMenuVue from '@/components/ComponenteMenu.vue';
//import ComponenteControlPersonalUsuarioVue from '@/components/ComponenteControlPersonalUsuario.vue';
import ComponenteDatosPersonalesUsuarioVue from '@/components/ComponenteDatosPersonalesUsuario.vue';
import ComponenteFooterVue from '@/components/ComponenteFooter.vue';

import PersonaService from '@/services/personaService';

export default {
    name:'ReporteUsuarioView',
    components:{
        ComponenteMenuVue,
        //ComponenteControlPersonalUsuarioVue,
        ComponenteDatosPersonalesUsuarioVue,
        ComponenteFooterVue
    },
    data(){
        return {
            personaService:null,
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
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
        this.personaService= new PersonaService();
    },
    mounted(){
        this.getDatosUsuario();
        this.getDatosPersonaUsuario();
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
            }
        },
        getDatosPersonaUsuario(){
            this.personaService.headersUsuario(this.usuario.token);
            this.personaService.getPersona(this.cifCiudadano).then((response) =>{
                this.persona=response.data;
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
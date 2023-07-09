<template>
    <div class="container">
        <div class="row">
            <ComponenteMenuVue :cif="usuarioUsuario.cif" :menu="usuarioUsuario.menu" />
        </div>
        
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <!--Construccion de Componentes-->
        <!-- Componente de Datos de Persona -->
        <br>
        <ComponenteDatosPersonalesUsuarioVue :cifCiudadano="usuarioUsuario.cif"/>
        
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
import ComponenteMenuVue from '@/components/ComponenteMenu.vue';
import ComponenteFooterVue from '@/components/ComponenteFooter.vue';
import ComponenteDatosPersonalesUsuarioVue from '@/components/ComponenteDatosPersonalesUsuario.vue';
import ComponenteControlPersonalUsuarioVue from '@/components/ComponenteControlPersonalUsuario.vue';


import PersonaServiceUsuario from '@/services/personaService';

export default {
    name:'ReporteUsuarioView',
    components:{
        ComponenteMenuVue,
        ComponenteDatosPersonalesUsuarioVue,
        ComponenteControlPersonalUsuarioVue,
        ComponenteFooterVue
    },
    data(){
        return {
            personaServiceUsuario:null,
            usuarioUsuario:{
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
                this.usuarioUsuario.token=this.$cookies.get('token');
                this.usuarioUsuario.cif=this.$cookies.get('cif');
                this.usuarioUsuario.correo=this.$cookies.get('correo');
                this.usuarioUsuario.celular=this.$cookies.get('celular');
                this.usuarioUsuario.pass=this.$cookies.get('pass');
                this.usuarioUsuario.menu=this.$cookies.get('menu');
                this.usuarioUsuario.unidad = this.$cookies.get('unidad');
                this.usuarioUsuario.sigla = this.$cookies.get('sigla');
                this.getDatosPersonaUsuario();
            }
        },
        getDatosPersonaUsuario(){
            this.personaServiceUsuario.headersUsuario(this.usuarioUsuario.token);
            this.personaServiceUsuario.getPersona(this.usuarioUsuario.cif).then((response) =>{
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
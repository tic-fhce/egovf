<template>
    <ComponenteMenuVue :cif="usuario.cif" :menu="usuario.menu"/>
    <div class="container">
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <!--Construccion de Componentes-->
        <!-- Componente de Datos de Persona -->
        <br>
        <ComponenteDatosPersonaVue :cifCiudadano="cifCiudadano"/>
        <!-- Componente de Control de Personal -->
        <br>
        <ComponenteControlPersonalVue :persona="persona" />
        <!-- Componente de Permisos en el Menu -->
        <br>
        <ComponentePernicionVue :persona="persona" />
    </div>
    <ComponenteFooterVue/>
</template>

<script>
import ComponenteMenuVue from '@/components/ComponenteMenu.vue';
import ComponenteControlPersonalVue from '@/components/ComponenteControlPersonal.vue';
import ComponenteDatosPersonaVue from '@/components/ComponenteDatosPersonales.vue';
import ComponentePernicionVue from '@/components/ComponentePernicion.vue';
import PersonaService from '@/services/personaService';
import ComponenteFooterVue from '@/components/ComponenteFooter.vue';

export default {
    name:'PerfilCiudadanoView',
    components:{
        ComponenteMenuVue,
        ComponenteControlPersonalVue,
        ComponenteDatosPersonaVue,
        ComponentePernicionVue,
        ComponenteFooterVue
    },
    data(){
        return {
            personaService:null,
            cifCiudadano:'',
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
    created(){
        this.personaService = new PersonaService();
    },
    mounted(){
        this.cifCiudadano = this.$route.params.cifCiudadano;
        console.log(this.cifCiudadano);
        this.getDatos();
        this.getDatosPersona();
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    methods:{
        getDatos(){
            if(this.$cookies.get('cif')!=null){
                this.usuario.token=this.$cookies.get('token');
                this.usuario.cif=this.$cookies.get('cif');
                this.usuario.correo=this.$cookies.get('correo');
                this.usuario.celular=this.$cookies.get('celular');
                this.usuario.pass=this.$cookies.get('pass');
                this.usuario.menu=this.$cookies.get('menu');
            }
        },
        getDatosPersona(){
            
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
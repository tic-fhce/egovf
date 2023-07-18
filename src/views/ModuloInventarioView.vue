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
        <ComponenteDatosPersonalesVue :cifCiudadano="cifCiudadano"/>
                
        <!-- Componente Inventario -->
        <br>
        <ComponenteInventarioVue :persona="persona" />
        
    </div>
    <ComponenteFooterVue/>
</template>

<script>
import ComponenteMenuVue from '@/components/ComponenteMenu.vue';
import ComponenteDatosPersonalesVue from '@/components/ComponenteDatosPersonales.vue';
import ComponenteInventarioVue from '@/components/ComponenteInventario.vue';
import ComponenteFooterVue from '@/components/ComponenteFooter.vue';

import PersonaService from '@/services/personaService';

export default {
    name:'ModuloInventarioView',
    components:{
        ComponenteMenuVue,
        ComponenteDatosPersonalesVue,
        ComponenteInventarioVue,
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
            }
        }
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
        this.personaService = new PersonaService();
    },
    mounted(){
        this.cifCiudadano = this.$route.params.cifCiudadano;
        this.getDatos();
        this.getDatosPersona();
    },
    methods:{
        getDatos(){
            //cargamos datos del Usuario
            if(this.$cookies.get('cif')!=null){
                this.usuario.token=this.$cookies.get('token');
                this.usuario.cif=this.$cookies.get('cif');
                this.usuario.correo=this.$cookies.get('correo');
                this.usuario.celular=this.$cookies.get('celular');
                this.usuario.pass=this.$cookies.get('pass');
                this.usuario.menu=this.$cookies.get('menu');
                this.usuario.unidad = this.$cookies.get('unidad');
                this.usuario.sigla = this.$cookies.get('sigla');
            }
        },
        async getDatosPersona(){
            //cargamos datos del Ciudadano
            this.personaService.headersUsuario(this.usuario.token);
            await this.personaService.getPersona(this.cifCiudadano).then((response) =>{
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
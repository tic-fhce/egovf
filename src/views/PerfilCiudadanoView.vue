<template>
    <ComponenteBarra :titulo="titulo"/>
    <ComponenteMenuVue :cif="usuario.cif" :menu="usuario.menu"/>
    <div class="container">
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <!--Construccion de Componentes-->
        
        <!-- Componente de Datos de la Persona -->
        <br>
        <ComponenteDatosPersonalesVue :cifCiudadano="cifCiudadano" :egovfp="egovf"/>
        
        <!-- Componente de Modulos para el Ciudadano -->
        <br>
        <ComponenteModulosVue :cif="cifCiudadano"/>
        
    </div>
    <ComponenteFooterVue/>
</template>

<script>
// Importamos los Componentes
import ComponenteMenuVue from '@/components/ComponenteMenu.vue';
import ComponenteBarra from '@/components/ComponenteBarra.vue';
import ComponenteDatosPersonalesVue from '@/components/ComponenteDatosPersonales.vue';
import ComponenteModulosVue from '@/components/ComponenteModulos.vue';
import ComponenteFooterVue from '@/components/ComponenteFooter.vue';
// End 

// Declaramos los Servicios
import EgovfService from '@/services/egovf/egovfService';
// End

export default {
    name:'PerfilCiudadanoView',
    components:{
        ComponenteMenuVue,
        ComponenteBarra,
        ComponenteDatosPersonalesVue,
        ComponenteModulosVue,
        ComponenteFooterVue
    },
    data(){
        return {
            titulo:'Modulos del Ciudadano',
            egovfService:null,
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
            }
        }
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
        this.egovfService = new EgovfService();
    },
    mounted(){
        this.cifCiudadano = this.$route.params.cifCiudadano; //resivimos el cif del ciudadano
        this.getDatos(); // Llamamos los datos del Usuario
        this.getEgovf(); //llamamos los datos del ciudadano

    },
    methods:{
        getDatos(){// Funcion que guarda los datos del Usuario en la View
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
            }
        },
        async getEgovf(){//Funcion que debuelve los datos del ciudadano 
            this.egovfService.headersUsuario(this.usuario.token);
            await this.egovfService.getEgovf(this.cifCiudadano).then((response) =>{
                this.egovf = response.data;
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
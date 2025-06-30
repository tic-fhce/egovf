<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb custom-breadcrumb">
        <li class="breadcrumb-item">
            <router-link to="/listadeciudadanos" class="breadcrumb-link">Lista de Ciudadanos</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
            {{titulo}} : {{ cifCiudadano }} >
        </li>
        </ol>
    </nav>
    <!-- Componente de Datos de la Persona -->
    <ComponenteDatosPersonalesVue :cifCiudadano="cifCiudadano" :egovfp="egovf"/>
        
    <!-- Componente de Modulos para el Ciudadano -->
    <br>
    <ComponenteModulosVue :cif="cifCiudadano" :egovf="egovf"/>

</template>

<script>
// Importamos los Componentes
import ComponenteDatosPersonalesVue from '@/modules/egovf/components/Ciudadano/ComponenteDatosPersonalesVue.vue';
import ComponenteModulosVue from '@/modules/egovf/components/Ciudadano/ComponenteModulosVue.vue';
// End 

// Declaramos los Servicios
import EgovfService from '@/modules/egovf/services/egovfService';
// End

export default {
    name:'PerfilCiudadanoView',
    components:{
        ComponenteDatosPersonalesVue,
        ComponenteModulosVue
    },
    data(){
        return {
            titulo:'Perfil del Ciudadano',
            egovfService:null,
            cifCiudadano:'',
            usuario:{
                token:'',
                cif:'',
                correo:'',
                celular:'',
                pass:'',
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
                this.usuario.unidad = this.$cookies.get('unidad');
                this.usuario.sigla = this.$cookies.get('sigla');
                this.usuario.foto = this.$cookies.get("foto");
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
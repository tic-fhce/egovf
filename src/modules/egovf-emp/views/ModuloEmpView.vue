<template>
    <!-- Componente de Datos de la Persona -->
    <ComponenteDatosPersonalesVue :cifCiudadano="cifCiudadano" :egovfp="egovf"/>
        
    <!-- Componente de Modulos para el Ciudadano -->
    <br>
    <ComponenteMEmpVue :emp="egovf"/> 
</template>

<script>
// Importamos los Componentes
import ComponenteDatosPersonalesVue from '@/modules/egovf/components/Ciudadano/ComponenteDatosPersonalesVue.vue';
import ComponenteMEmpVue from '@/modules/egovf-emp/components/ComponenteMEmpVue.vue';
// End

// Declaramos los Servicios
import EgovfService from '@/modules/egovf/services/egovfService';
// End

export default {
    name:'ModuloEmpView',
    components:{
        ComponenteDatosPersonalesVue,
        ComponenteMEmpVue
    },
    props: {
        cifCiudadano: { type: [Number, String], required: true }
    },
    data(){
        return {
            egovfService:null,
            usuario:{...this.$models.usuarioModel},
            egovf:{...this.$models.egovfModel}
        }
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            window.location.href = '/';
        }
    },
    created(){
        this.egovfService = new EgovfService();
    },
    mounted(){
        this.getDatos();
        this.getEgovf();
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
                this.usuario.unidad = this.$cookies.get('unidad');
                this.usuario.sigla = this.$cookies.get('sigla');
                this.usuario.foto = this.$cookies.get("foto");
            }
        },
        async getEgovf(){
            this.egovfService.headersUsuario(this.usuario.token);
            await this.egovfService.getEgovf(this.cifCiudadano).then((response) =>{
                this.egovf = response.data;
            });
        }
    }
}
</script>

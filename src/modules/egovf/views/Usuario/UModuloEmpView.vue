<template>
    <!-- Componente de Modulos para el Ciudadano -->
    <br>
    <ComponenteMEmpVue :emp="egovf"/> 
</template>

<script>
// Importamos los Componentes
import ComponenteMEmpVue from '@/components/Usuario/ComponenteMEmpVue.vue';
// End

// Declaramos los Servicios
import EgovfService from '@/services/egovf/egovfService';
// End

export default {
    name:'UModuloEmpView',
    components:{
        ComponenteMEmpVue
    },
    data(){
        return {
            titulo:'Modulos del Empleado',
            egovfService:null,
            cifCiudadano:'',
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
        this.cifCiudadano = this.$cookies.get('cif');
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
                this.usuario.foto = this.$cookies.get('foto');
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

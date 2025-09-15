<template>
    <!-- Componente de Datos de la Persona -->
    <ComponenteDatosPersonalesVue :cifCiudadano="cifCiudadano" :egovfp="egovf" />
        
    <!-- Componente de Modulos para el Ciudadano -->
    <br>
    <ComponenteModulosVue :cif="cifCiudadano" :egovf="egovf" :datos="datos"/>

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
    props: {
        cifCiudadano: { type: [Number, String], required: true }
    },
    data(){
        return {
            titulo:'Perfil del Ciudadano',
            egovfService:null,
            usuario:{...this.$models.usuarioModel},
            egovf:{...this.$models.egovfModel},
            datos:{...this.$models.datosModel},
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
                this.datos.cif = this.egovf.cif;
                this.datos.nombre = this.egovf.nombre;
                this.datos.apellido = this.egovf.paterno +" " +this.egovf.materno;
            });
        }
    }
}
</script>
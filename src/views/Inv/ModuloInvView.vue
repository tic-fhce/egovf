<template>
    <!-- Componente de Datos de la Persona -->
    <ComponenteDatosPersonalesVue :cifCiudadano="cifCiudadano" :egovfp="egovf"/>

    <!-- Componente de Control de Personal -->
    <br>
    <ComponenteMInvVue :minv="egovf" :empleado="empleado"/>

</template>

<script>
// Importamos los Componentes
import ComponenteDatosPersonalesVue from '@/components/Ciudadano/ComponenteDatosPersonalesVue.vue';
import ComponenteMInvVue from '@/components/Inv/ComponenteMInv.vue';

// End

// Declaramos los Servicios
import EgovfService from '@/modules/egovf/services/egovfService';
import EmpleadoService from '@/modules/egovf-emp/services/empleadoService';
// End

export default {
    name:'ModuloInvView',
    components:{
        ComponenteDatosPersonalesVue,
        ComponenteMInvVue
    },
    data(){
        return {
            titulo:'Modulo INV',
            egovfService:null,
            empleadoService:null,
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
                sigla:''
            },
            empleado:{
                id:0,
                cif:0,
                empleado:'',
                tipoempleado_id:0,
                fecha:'',
                estado:0,
                salida:'',
                contratos:[]
            },
        }
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
        this.egovfService = new EgovfService();
        this.empleadoService = new EmpleadoService();
    },
    mounted(){
        this.cifCiudadano = this.$route.params.cifCiudadano;
        this.getDatos();
        this.getEgovf();
        this.getEmpleado();
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
            }
        },
        async getEgovf(){
            this.egovfService.headersUsuario(this.usuario.token);
            await this.egovfService.getEgovf(this.cifCiudadano).then((response) =>{
                this.egovf = response.data;
            });
        },
        async getEmpleado(){
            this.egovfService.headersUsuario(this.usuario.token);
            await this.empleadoService.getEmpleado(this.cifCiudadano).then((response) =>{
                this.empleado = response.data;
            });
        }
    }
}
</script>
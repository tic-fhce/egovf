<template>
    <ComponenteBarra :titulo="titulo"/>
    <ComponenteMenuVue :cif="usuario.cif" :menu="usuario.menu"/>
    <div class="container">
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <!--Construccion de Componentes-->
        
        <!-- Componente de Datos de Persona -->
        <br>
        <ComponenteDatosPersonalesVue :cifCiudadano="cifCiudadano" :egovfp="egovf"/>
                
        <!-- Componente de Control de Personal -->
        <br>
        <ComponenteMSccVue :mscc="egovf" :empleado="empleado"/>
        
    </div>
    <ComponenteFooterVue/>
</template>

<script>
// Importamos los Componentes
import ComponenteMenuVue from '@/components/ComponenteMenu.vue';
import ComponenteBarra from '@/components/ComponenteBarra.vue';
import ComponenteMSccVue from '@/components/ComponenteMScc.vue';
import ComponenteDatosPersonalesVue from '@/components/ComponenteDatosPersonales.vue';
import ComponenteFooterVue from '@/components/ComponenteFooter.vue';
// End

// Declaramos los Servicios
import EgovfService from '@/services/egovf/egovfService';
import EmpleadoService from '@/services/emp/empleadoService';
// End

export default {
    name:'ModuloSccView',
    components:{
        ComponenteMenuVue,
        ComponenteBarra,
        ComponenteDatosPersonalesVue,
        ComponenteMSccVue,
        ComponenteFooterVue
    },
    data(){
        return {
            titulo:'Modulos MSCC',
            egovfService:null,
            empleadoService:null,
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
                this.usuario.menu=this.$cookies.get('menu');
                this.usuario.unidad = this.$cookies.get('unidad');
                this.usuario.sigla = this.$cookies.get('sigla');

                this.titulo=this.usuario.correo+'> '+this.titulo;
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
                console.log(this.empleado);
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
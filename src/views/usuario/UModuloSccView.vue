<template>
    <div class="container">
        <div class="row">
            <ComponenteMenuVue :cif="usuario.cif" :menu="usuario.menu" :titulo="titulo"/>
        </div>
        
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <!--Construccion de Componentes-->
        <!-- Componente de Datos de Persona -->
        <br>
        <ComponenteDatosPersonalesUsuarioVue :cifCiudadano="usuario.cif" :egovfp="egovf"/>
        
        <!-- Componente de Reporte de Personal -->
        <br>
        <ComponenteUMSccVue :egovfp = "egovf" /> 
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
import ComponenteUMSccVue from '@/components/ComponenteUMScc.vue';

import EgovfService from '@/services/egovf/egovfService';

export default {
    name:'UModuloSccView',
    components:{
        ComponenteMenuVue,
        ComponenteDatosPersonalesUsuarioVue,
        ComponenteUMSccVue,
        ComponenteFooterVue
    },
    data(){
        return {
            titulo:'Modulo SCC ',
            egovfService :null,
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
        this.getDatosUsuario();
        this.getEgovf();
    },
    methods:{
        getDatosUsuario(){
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
        async getEgovf(){//Funcion que debuelve los datos del ciudadano 
            this.egovfService.headersUsuario(this.usuario.token);
            await this.egovfService.getEgovf(this.usuario.cif).then((response) =>{
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
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
        <!-- Componente de Reporte de Personal -->
        <br>
        <ComponenteReporteVue :reporte="reporte"/>
    </div>
    <ComponenteFooterVue/>
</template>

<script>
import ComponenteMenuVue from '@/components/ComponenteMenu.vue';
import ComponenteFooterVue from '@/components/ComponenteFooter.vue';
import ComponenteDatosPersonaVue from '@/components/ComponenteDatosPersonales.vue';
import ComponenteReporteVue from '@/components/ComponenteReporte.vue';

export default {
    name:'ReportePerfilView',
    components:{
        ComponenteMenuVue,
        ComponenteDatosPersonaVue,
        ComponenteReporteVue,
        ComponenteFooterVue
    },
    data(){
        return {
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
            reporte:{
                id_horario:'',
                cif:'',
                gestion:'',
                mes:'',
                di:'',
                df:''
            }
        }
    },
    mounted(){
        this.reporte=JSON.parse(this.$route.params.reporte);
        this.cifCiudadano=this.reporte.cif;
        this.getDatos();
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
            this.usuario.unidad = this.$cookies.get('unidad');
            this.usuario.sigla = this.$cookies.get('sigla');
        }
      }
    }
}
</script>
<style scoped>
.margen{
    margin-top: 100px;
}
</style>
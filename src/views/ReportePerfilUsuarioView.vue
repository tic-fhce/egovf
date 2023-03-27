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
        <ComponenteDatosPersonalesUsuarioVue :cifCiudadano="cifCiudadano"/>
        <!-- Componente de Reporte de Personal -->
        <br>
        <ComponenteReporteUsuarioVue :reporteUsuario="reporteUsuario"/>
    </div>
    <ComponenteFooterVue/>
</template>

<script>
import ComponenteMenuVue from '@/components/ComponenteMenu.vue';
import ComponenteFooterVue from '@/components/ComponenteFooter.vue';
import ComponenteDatosPersonalesUsuarioVue from '@/components/ComponenteDatosPersonalesUsuario.vue';
import ComponenteReporteUsuarioVue from '@/components/ComponenteReporteUsuario.vue';

export default {
    name:'ReportePerfilUsuarioView',
    components:{
        ComponenteMenuVue,
        ComponenteDatosPersonalesUsuarioVue,
        ComponenteReporteUsuarioVue,
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
                menu:[]
            },
            reporteUsuario:{
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
        this.reporteUsuario=JSON.parse(this.$route.params.reporteUsuario);
        this.cifCiudadano=this.reporteUsuario.cif;
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
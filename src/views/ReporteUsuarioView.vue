<template>
    <ComponenteMenuVue :cif="usuarioUsuario.cif" :menu="usuarioUsuario.menu"/>
    <div class="container">
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <!--Construccion de Componentes-->
        <!-- Componente de Datos de Persona -->
        <br>
        <ComponenteDatosPersonalesUsuarioVue :cifCiudadano="usuarioUsuario.cif"/>
        <!-- Componente de Reporte de Personal -->
        <br>
        <!-- Componente de Reportes del Usuario -->
        <ComponenteReporteUsuarioVue :reporteUsuario="reporteUsuario"/>
        <!-- Componente de Reportes del Usuario -->
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
            usuarioUsuario:{
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
                df:'',
                listaPerfil:[],
                personaUsuario:{
                    id:null,
                    _01cif:'',
                    _02ci:'',
                    _03complemento:'',
                    _04nombre:'',
                    _05paterno:'',
                    _06materno:'',
                    _07fecha:'',
                    _08sexo:'',
                    _09cel:'',
                    _10correo:''
                }
            }
        }
    },
    mounted(){
        this.reporteUsuario=JSON.parse(this.$route.params.reporteusuario);
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
            this.usuarioUsuario.token=this.$cookies.get('token');
            this.usuarioUsuario.cif=this.$cookies.get('cif');
            this.usuarioUsuario.correo=this.$cookies.get('correo');
            this.usuarioUsuario.celular=this.$cookies.get('celular');
            this.usuarioUsuario.pass=this.$cookies.get('pass');
            this.usuarioUsuario.menu=this.$cookies.get('menu');
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
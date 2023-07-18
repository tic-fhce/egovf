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
        <!-- Componente de Reporte -->
        <ComponenteReporteVue :reporte="reporte"/>
        <!-- Componente de Reporte -->
    </div>
    <ComponenteFooterVue/>
</template>

<script>
import ComponenteMenuVue from '@/components/ComponenteMenu.vue';
import ComponenteFooterVue from '@/components/ComponenteFooter.vue';
import ComponenteDatosPersonaVue from '@/components/ComponenteDatosPersonales.vue';
import ComponenteReporteVue from '@/components/ComponenteReporte.vue';
import BiometricoService from '@/services/biometricoService';
import PersonaService from '@/services/personaService';
import UsuarioService from '@/services/usuarioServices';
export default {
    name:'ReporteView',
    components:{
        ComponenteMenuVue,
        ComponenteDatosPersonaVue,
        ComponenteReporteVue,
        ComponenteFooterVue
    },
    data(){
        return {
            biometricoService:null,
            personaService:null,
            usuarioService:null,
            uri:'',
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
                id_horario:0,
                cif:0,
                sigla:'',
                gestion:0,
                mes:0,
                di:0,
                df:0,
                listaPerfil:[],
                persona:{
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
        this.uri=this.$route.params.uri;
        this.cifCiudadano = this.uri.substring(0,11);
        this.reporte.cif=this.uri.substring(0,11);
        this.reporte.gestion = this.uri.substring(12,16);
        this.reporte.mes = this.uri.substring(17,19);
        this.reporte.di = this.uri.substring(20,22);
        this.reporte.df = this.uri.slice(23);
        this.getDatos();
        this.getReporteBiometrico();
        this.getReportePersona();
        this.getReporteUsuario();
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
        this.biometricoService = new BiometricoService();
        this.personaService = new PersonaService();
        this.usuarioService = new UsuarioService();
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
      },
      async getReportePersona(){
        this.personaService.headersUsuario(this.usuario.token);
        await this.personaService.getPersona(this.reporte.cif).then((response) =>{
            this.reporte.persona=response.data;
        });
      },
      async getReporteUsuario(){
        this.usuarioService.headersUsuario(this.usuario.token);
        await this.usuarioService.getUsuario(this.reporte.cif).then((response) => {
            this.reporte.sigla = response.data._10sigla;
            console.log(this.reporte.sigla);
        });
      },
      async getReporteBiometrico(){
        await this.biometricoService.getPerfil(this.reporte.cif).then(response=>{
            this.reporte.listaPerfil=response.data;
            if(this.reporte.listaPerfil.length>0){
                this.reporte.id_horario=this.reporte.listaPerfil[0]._05horario_id;
            }
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
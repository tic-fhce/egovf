<template>
    <ComponenteMenuVue :cif="usuario.cif" :menu="usuario.menu" :titulo="titulo"/>
    <div class="container">
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
import BiometricoService from '@/services/biometricoService';
import PersonaService from '@/services/personaService';
import EgovfService from '@/services/egovf/egovfService';

export default {
    name:'ReporteUsuarioView',
    components:{
        ComponenteMenuVue,
        ComponenteDatosPersonalesUsuarioVue,
        ComponenteReporteUsuarioVue,
        ComponenteFooterVue
    },
    data(){
        return {
            titulo:'Reporte de Asistencia',
            biometricoService:null,
            personaService:null,
            egovfService:null,
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
            reporteUsuario:{
                id_horario:0,
                cif:0,
                gestion:0,
                mes:0,
                di:0,
                df:0,
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
    mounted(){
        this.uriu=this.$route.params.uriu;
        this.reporteUsuario.gestion = this.uriu.substring(0,4);
        this.reporteUsuario.mes = this.uriu.substring(5,7);
        this.reporteUsuario.di = this.uriu.substring(8,10);
        this.reporteUsuario.df = this.uriu.slice(11);
        this.getDatosUsuario();
        this.getReportePersonaUsuario();
        this.getReporteBiometricoUsuario();
        
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
        this.biometricoService = new BiometricoService();
        this.personaService = new PersonaService();
        this.egovfService = new EgovfService();
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

                this.reporteUsuario.cif = this.usuario.cif;
            }
        },
        async getReportePersonaUsuario(){
            this.personaService.headersUsuario(this.usuario.token);
            await this.personaService.getPersona(this.usuario.cif).then((response) =>{
                this.reporteUsuario.personaUsuario=response.data;
            });
        },
        async getReporteBiometricoUsuario(){
            await this.biometricoService.getPerfil(this.usuario.cif).then(response=>{
                this.reporteUsuario.listaPerfil=response.data;
                if(this.reporteUsuario.listaPerfil.length>0){
                    this.reporteUsuario.id_horario=this.reporteUsuario.listaPerfil[0]._05horario_id;
                }
            });
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
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
import ComponenteBarra from '@/components/ComponenteBarra.vue';
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
        ComponenteBarra,
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
                cif:0,
                sigla:'',
                gestion:0,
                mes:0,
                di:0,
                df:0,
                listaPerfil:[],
                listaHorario:[],
                uri:'',
                personaUsuario:{
                    id:null,
                    ci:'',
                    nombre:'',
                    paterno:'',
                    materno:'',
                    celular:'',
                    correo:'',
                    foto:''
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
        this.getEgovf();

        //this.getReportePersonaUsuario();
        this.getReporteBiometricoUsuario();
        this.reporteUsuario.uri = this.usuario.cif+'j'+this.uriu;
        
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
                this.titulo=this.usuario.correo+'> '+this.titulo;
            }
        },
        async getReporteBiometricoUsuario(){
            await this.biometricoService.getPerfil(this.usuario.cif).then(response=>{
                this.reporteUsuario.listaPerfil=response.data;
                if(this.reporteUsuario.listaPerfil.length>0){
                    this.reporteUsuario.id_horario=this.reporteUsuario.listaPerfil[0]._05horario_id;
                }
            });
            this.getListaHorario();
        },
        async getListaHorario(){
            await this.biometricoService.getListaHorario(this.usuario.cif,this.reporteUsuario.gestion).then(response=>{
                this.reporteUsuario.listaHorario = response.data;
            });
        },
        async getEgovf(){//Funcion que debuelve los datos del ciudadano 
            this.egovfService.headersUsuario(this.usuario.token);
            await this.egovfService.getEgovf(this.usuario.cif).then((response) =>{
                this.egovf = response.data;
            });
            this.reporteUsuario.sigla =  this.egovf.sigla;

            this.reporteUsuario.personaUsuario.id = this.egovf.idPersona;
            this.reporteUsuario.personaUsuario.ci = this.egovf.ci;
            this.reporteUsuario.personaUsuario.nombre = this.egovf.nombre;
            this.reporteUsuario.personaUsuario.paterno = this.egovf.paterno;
            this.reporteUsuario.personaUsuario.materno = this.egovf.materno;
            this.reporteUsuario.personaUsuario.celular = this.egovf.celular;
            this.reporteUsuario.personaUsuario.correo = this.egovf.correo;
            this.reporteUsuario.personaUsuario.foto = this.egovf.foto;
        }
    }
}
</script>
<style scoped>
.margen{
    margin-top: 100px;
}
</style>
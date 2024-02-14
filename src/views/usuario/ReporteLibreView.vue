<template>
    <ComponenteMenuVue cif="0" />
    <div class="container">
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <!-- Componente de Reporte -->
        <ComponenteReporteLibreVue :reporteUsuario="reporte"/>
        <!-- Componente de Reporte -->
    </div>
    <ComponenteFooterVue/>

</template>

<script>

// Importamos los Componentes
import ComponenteMenuVue from '@/components/ComponenteMenu.vue'
import ComponenteFooterVue from '@/components/ComponenteFooter.vue';
import ComponenteReporteLibreVue from '@/components/ComponenteReporteLibre.vue';

// Declaramos los Servicios
import BiometricoService from '@/services/biometricoService';

export default {
    name:'ReporteLibreView',
    components:{
        ComponenteMenuVue,
        ComponenteReporteLibreVue,
        ComponenteFooterVue
    },
    data(){
        return{
            titulo:'Reporte de Asistencia',
            biometricoService:null,
            uri:'',
            cifCiudadano:'',
            reporte:{
                cif:0,
                sigla:'',
                gestion:0,
                mes:0,
                di:0,
                df:0,
                listaPerfil:[],
                listaHorario:[]
            }
        }
    },
    mounted(){
        this.uri = this.$route.params.uriu;
        
        this.cifCiudadano = this.uri.substring(0,11);
        this.reporte.cif=this.uri.substring(0,11);
        this.reporte.gestion = this.uri.substring(12,16);
        this.reporte.mes = this.uri.substring(17,19);
        this.reporte.di = this.uri.substring(20,22);
        this.reporte.df = this.uri.slice(23);
        this.reporte.uri = this.uri;
        console.log(this.uri);
        console.log(this.reporte.cif);
        console.log(this.reporte.gestion);
        console.log(this.reporte.mes);
        console.log(this.reporte.di);
        console.log(this.reporte.cif);
        this.getReporteBiometrico();
    },
    created(){
        this.biometricoService = new BiometricoService();
    },
    methods:{
        async getReporteBiometrico(){
            await this.biometricoService.getPerfil(this.reporte.cif).then(response=>{
                this.reporte.listaPerfil = response.data;
            });
            this.getListaHorario();
        },
        async getListaHorario(){
            await this.biometricoService.getListaHorario(this.cifCiudadano,this.reporte.gestion).then(response=>{
                this.reporte.listaHorario = response.data;
            });
        }
    }
}
</script>
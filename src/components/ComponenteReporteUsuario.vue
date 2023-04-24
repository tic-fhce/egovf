<template>
<div class="row">
    <div class="card">
        <div class="row">
            <div class="card-header">
                <div class="row">
                    <div class="col-md-6">
                        <h2 id="titulo">Reporte de Asistencia</h2>
                </div>
                    <div class="col-md-6">
                        <h2>{{mes}} de {{reporteUsuario.gestion}} </h2>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive-sm">
                    <table class="table" id="printDatos">
                        <tr><td colspan="4" class="text-center"><h4>Datos de Usuario Registrado en Biometricos</h4></td></tr>
                        <tr v-for="perfil in reporteUsuario.listaPerfil" :key="perfil.id">
                            <td>ID Biometrico : {{perfil.id}}</td>
                            <td>User ID : {{perfil._01user_id}}</td>
                            <td>Nombre : {{perfil._02nombre}}</td>
                            <td>Lugar : {{perfil._06lugar}}</td>
                        </tr>
                    </table>
                </div>
                <hr>
                <div class="table-responsive-sm">
                    <table class="table table-striped table-hover" id="printMarcado">
                        <thead>
                            <tr>
                                <th>#</th><th>Detalle</th><th>Lugar</th><th>Turno</th><th>Hora M.</th><th>Min. R.</th><th>Obs.</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="value in listaReporte" :key="value.id">
                                <td>{{value.id}}</td>
                                <td>{{value.dia}} {{value.day}} <br>{{value.fecha}}<br></td>
                                <td>
                                    {{value.lugar[0]}}<br>{{value.lugar[1]}}<br>{{value.lugar[2]}}<br>{{value.lugar[3]}}
                                </td>
                                <td>
                                    {{value.turno[0]}}<br>{{value.turno[1]}}<br>{{value.turno[2]}}<br>{{value.turno[3]}}
                                </td>
                                <td>
                                    {{value.hora[0]}}<br>{{value.hora[1]}}<br>{{value.hora[2]}}<br>{{value.hora[3]}}
                                </td>
                                <td>
                                    {{value.retraso[0]}}<br>{{value.retraso[1]}}<br>{{value.retraso[2]}}<br>{{value.retraso[3]}}
                                </td>
                                <td>
                                    <div class="obserbaciones" v-for="listobs in value.obserModel" :key="listobs.id">{{ listobs.uidobs }} {{ listobs.tipo }} {{ listobs.hora }}<br></div>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th><th></th><th></th><th></th><th>Total Retraso</th><th><h2>{{sumaRetraso}}</h2></th><th>min.</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <br>
            </div>
            <div class="card-footer">

            </div>
        </div>
    </div>
</div>
</template>

<script>
import BiometricoService from '@/services/biometricoService';

export default {
    name:'ComponenteReporteUsuarioVue',
    props:['reporteUsuario'],
    data(){
        return{
            biometricoService:null,
            listaReporte:[],
            getPB:true,
            totalretraso:0,
            mes:''
        }
    },
    created(){
        this.biometricoService= new BiometricoService();
    },
    updated(){
        if(this.reporteUsuario.cif>0 && this.getPB)
        {
            this.getMes();
            if(this.reporteUsuario.di>0 && this.reporteUsuario.df>0)
                this.getReporteMesDia();
            else
                this.getReporteMes();
            this.getPB=false;
        }
    },
    methods:{
        getReporteMes(){
            this.biometricoService.getReporteMes(this.reporteUsuario).then((result) => {
                this.listaReporte=result.data;
                this.sumaRetraso();
            }).catch((err) => {
                console.log(err);
            });
        },
        getReporteMesDia(){
            this.biometricoService.getReporteMesDia(this.reporteUsuario).then((result) => {
                this.listaReporte=result.data;
                this.sumaRetraso();
            }).catch((err) => {
                console.log(err);
            });
        },
        sumaRetraso(){
            let sum = 0;
            this.listaReporte.forEach(element => {
                for (let i = 0; i < element.retraso.length; i++) {
                    sum +=parseInt(element.retraso[i],10);
                }
            });
            this.sumaRetraso=sum;
        },
        getMes(){
            if(this.reporteUsuario.mes==1){this.mes='Enero';}
            if(this.reporteUsuario.mes==2){this.mes='Febrero';}
            if(this.reporteUsuario.mes==3){this.mes='Marzo';}
            if(this.reporteUsuario.mes==4){this.mes='Abril';}
            if(this.reporteUsuario.mes==5){this.mes='Mayo';}
            if(this.reporteUsuario.mes==6){this.mes='Junio';}
            if(this.reporteUsuario.mes==7){this.mes='Julio';}
            if(this.reporteUsuario.mes==8){this.mes='Agosto';}
            if(this.reporteUsuario.mes==9){this.mes='Septiembre';}
            if(this.reporteUsuario.mes==10){this.mes='Octubre';}
            if(this.reporteUsuario.mes==11){this.mes='Noviembre';}
            if(this.reporteUsuario.mes==12){this.mes='Diciembre';}
        }
    }
}

</script>

<style scoped>
.report{
    font-size:8px;
}
.material-icons{
    
    color: white;
    font-size: 1em;
    border-top: 0ch;
    border-bottom: 0ch;
}
.obserbaciones{
    font-size: 0.9em;
}
</style>
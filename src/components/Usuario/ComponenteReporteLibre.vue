<template>
<div class="row">
    <div class="col col-md-12">
        <h4>CIF : {{reporteUsuario.cif}}</h4>
        <p>Total Minutos de Retraso : {{totalretraso}} min</p>
        <p>Total Minutos de salida Anticipada : {{ totalanticipado }} min</p>
    </div>
</div>
<br>
<div class="row">
    <div class="card col-md-12">
        <div class="row">

            <!-- Card Header -->
            <div class="card-header headercolor">
                <div class="row">
                    <div class="col-md-12 col-sm-12 text-center">
                        <h3 id="titulo">Verificacion QR - Reporte de Asistencia {{mes}} de {{reporteUsuario.gestion}}</h3>
                    </div>
                </div>
            </div>
            <!-- End Card Header -->
            
            <!-- Card body -->
            <div class="card-body">
                <!-- Tabla Lista de Biometricos-->
                <div class="text-center"><h4>Datos de Usuario Registrado en Biometricos</h4></div>
                <div class="table-responsive">

                    <table class="tama">
                        <thead>
                            <tr><td colspan="4" class="text-center"></td></tr>
                        </thead>
                        <tbody>
                            <tr v-for="perfil in reporteUsuario.listaPerfil" :key="perfil.id">
                                <td><strong>ID Biometrico : </strong>{{perfil.id}}</td>
                                <td><strong>User ID : </strong>{{perfil.user_id}}</td>
                                <td><strong>Nombre : </strong>{{perfil.nombre}}</td>
                                <td><strong>Lugar : </strong>{{perfil.lugar}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- End Tabla Lista de Biometricos-->
                <hr>

                <!-- Tabla Lista de Horarios-->
                <div class="text-center"><h4>Horarios del Usuario</h4></div>
                <div class="table-responsive">
                    <table class="tama">
                        <tr v-for="horario in reporteUsuario.listaHorario" :key="horario.horario_id">
                            <td><strong>ID Horario : </strong>{{horario.horario_id}}</td>
                            <td><strong>Valido del : </strong>{{horario.fecha}}</td>
                            <td><strong>Hasta </strong>{{horario.valido}}</td>
                        </tr>
                    </table>
                </div>
                <!-- End Tabla Lista de Horarios-->
                <hr>

                <!-- Tabla Marcados -->
                <div class="table-responsive">
                    <table class="marcado table">
                        <thead>
                            <tr>
                                <th class="numeral">#</th><th class="detalle">Detalle</th><th class="lugar">Lugar</th><th class="detalle">Turno</th><th class="detalle">Hora M.</th><th class="detalle">Min. R.</th><th class="obs">Obs.</th>
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
                                    <span v-if="value.hora[0]=='Sin Marcar'" class="badge bg-danger">{{value.hora[0]}}</span>
                                    <span v-else>{{value.hora[0]}}</span><br>
                                    <span v-if="value.hora[1]=='Sin Marcar'" class="badge bg-danger">{{value.hora[1]}}</span>
                                    <span v-else>{{value.hora[1]}}</span><br>
                                    <span v-if="value.hora[2]=='Sin Marcar'" class="badge bg-danger">{{value.hora[2]}}</span>
                                    <span v-else>{{value.hora[2]}}</span><br>
                                    <span v-if="value.hora[3]=='Sin Marcar'" class="badge bg-danger">{{value.hora[3]}}</span>
                                    <span v-else>{{value.hora[3]}}</span>
                                </td>
                                <td>
                                    {{value.retraso[0]}}<br>{{value.retraso[1]}}<br>{{value.retraso[2]}}<br>{{value.retraso[3]}}
                                </td>
                                <td>
                                    <div class="obserbaciones" v-for="listobs in value.obsDtoReporte" :key="listobs.id">{{ listobs.uidobs }} {{ listobs.tipo }} {{ listobs.hora }}<br></div>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="5">Total Retraso</th><th><h2>{{totalretraso}}</h2></th><th>min.</th>
                            </tr>
                            <tr>
                                <th colspan="5">Total Salidas Anticipadas</th><th><h2>{{totalanticipado}}</h2></th><th>min.</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <!-- End Tabla Marcados -->
                <br>
            </div>
            <div class="card-footer">
            </div>
        </div>
    </div>
</div>
</template>

<script>

//Importamos Servicios
import BiometricoService from '@/services/biometricoService';


export default {
    name:'ComponenteReporteLibreVue',
    props:['reporteUsuario'],
    components:{
        
    },
    data(){
        return{
            biometricoService:null,
            listaReporte:[],
            getPB:true,
            totalretraso:0,
            totalanticipado:0,
            mes:'',
            sms:'',
            size:300
        }
    },
    created(){
        this.biometricoService= new BiometricoService();
    },
    updated(){
        if(this.reporteUsuario.cif>0 && this.getPB)
        {
            this.getMesUsuario();
            if(this.reporteUsuario.di>0 && this.reporteUsuario.df>0)
                this.getReporteMesUsuario();
            else
                this.getReporteMesUsuario();
            this.getPB=false;
        }
    },
    methods:{
        getReporteMesUsuario(){
            this.biometricoService.getReporteMes(this.reporteUsuario).then((result) => {
                this.listaReporte=result.data;
                console.log(this.listaReporte);
                this.sumaRetraso();
            }).catch((err) => {
                console.log(err);
            });
        },
        sumaRetraso(){
            let sum = 0;
            let res=0;
            this.listaReporte.forEach(element => {
                for (let i = 0; i < element.retraso.length; i++) {
                    if(i==0 || i==2)
                        sum +=parseInt(element.retraso[i],10);
                    else
                        res+=parseInt(element.retraso[i],10);
                }
            });
            this.totalretraso=sum;
            this.totalanticipado=res;

            this.sms='Cif:'+this.reporteUsuario.cif+' TR: '+this.totalretraso+'min' + ' TA: '+this.totalanticipado+'min '+'http://192.168.31.45:8080/#/libreReporte'+this.reporteUsuario.uri;
        },
        getMesUsuario(){
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
.tama{
    width: 600px;
    
}
.marcado{
    width: 1000px;
}
.detalle{
    width: 150px;
}
.obs{
    width: 200px;
}
.numeral{
    width: 50px;
}
.lugar{
    width: 150px;
}

</style>
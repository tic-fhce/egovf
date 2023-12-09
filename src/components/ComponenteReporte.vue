<template>
<div class="row">
    <div class="card col-md-12">
        <div class="row">
            <div class="card-header headercolor">
                <div class="row">
                    <div class="col col-md-6 col-sm-6">
                        <h2 id="titulo">Reporte de Asistencia</h2>
                    </div>
                    <div class="col col-md-4 col-sm-4">
                        <h2>{{mes}} de {{reporte.gestion}}</h2>
                    </div>
                    <div class="col col-md-2 col-sm-2">
                        <button class="form-control btn btn-success" @click="pdf()"><span class="material-icons">&#xe8ad;</span>Imprimir</button>
                    </div>
                </div>
                
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped table-hover" id="printDatos">
                        <tr><td colspan="4" class="text-center"><h4>Datos de Usuario Registrado en Biometricos</h4></td></tr>
                        <tr v-for="perfil in reporte.listaPerfil" :key="perfil.id">
                            <td>ID Biometrico : {{perfil.id}}</td>
                            <td>User ID : {{perfil._01user_id}}</td>
                            <td>Nombre : {{perfil._02nombre}}</td>
                            <td>Lugar : {{perfil._06lugar}}</td>
                        </tr>
                    </table>
                </div>
                    <hr>
                <div class="table-responsive">
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
                                    <div class="obserbaciones" v-for="listobs in value.obserModel" :key="listobs.id">{{ listobs.uidobs }} {{ listobs.tipo }} {{ listobs.hora }}<br></div>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th><th></th><th></th><th></th><th>Total Retraso</th><th><h2>{{totalretraso}}</h2></th><th>min.</th>
                            </tr>
                            <tr>
                                <th></th><th></th><th></th><th></th><th>Total Salidas Anticipadas</th><th><h2>{{totalanticipado}}</h2></th><th>min.</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div class="table-responsive">
                    <table id="firma">
                        <tr>
                            <td>
                                <p class="text-center">Lic. Jaime Montecinos Marquez<br>Responsable Unidad TIC</p>
                            </td>
                            <td>
                                <p class="text-center">Vo.Bo<br>Inmediato Superior</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center"><img src="../assets/header.jpg" width="150px" height="40px"></td><td></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="card-footer">

            </div>
        </div>
    </div>
</div>
</template>

<script>
import BiometricoService from '@/services/biometricoService';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default {
    name:'ComponenteReporteVue',
    props:['reporte'],
    data(){
        return{
            biometricoService:null,
            listaReporte:[],
            getPB:true,
            totalretraso:0,
            totalanticipado:0,
            mes:''
        }
    },
    created(){
        this.biometricoService= new BiometricoService();
    },
    updated(){
        if(this.reporte.cif>0 && this.getPB && this.reporte.id_horario>0)
        {
            this.getMes();
            if(this.reporte.di>0 && this.reporte.df>0)
                this.getReporteMesDia();
            else
                this.getReporteMes();
            this.getPB=false;
        }
    },
    methods:{
        async getReporteMes(){
            await this.biometricoService.getReporteMes(this.reporte).then((result) => {
                this.listaReporte=result.data;
                this.sumaRetraso();
            }).catch((err) => {
                console.log(err);
            });
        },
        getReporteMesDia(){
            this.biometricoService.getReporteMesDia(this.reporte).then((result) => {
                this.listaReporte=result.data;
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
        },
        getMes(){
            if(this.reporte.mes==1){this.mes='Enero';}
            if(this.reporte.mes==2){this.mes='Febrero';}
            if(this.reporte.mes==3){this.mes='Marzo';}
            if(this.reporte.mes==4){this.mes='Abril';}
            if(this.reporte.mes==5){this.mes='Mayo';}
            if(this.reporte.mes==6){this.mes='Junio';}
            if(this.reporte.mes==7){this.mes='Julio';}
            if(this.reporte.mes==8){this.mes='Agosto';}
            if(this.reporte.mes==9){this.mes='Septiembre';}
            if(this.reporte.mes==10){this.mes='Octubre';}
            if(this.reporte.mes==11){this.mes='Noviembre';}
            if(this.reporte.mes==12){this.mes='Diciembre';}
        },
        pdf(){
            var img = new Image();
            img.src='/img/header.d2def491.jpg';
            //const doc = new jsPDF('p','mm','letter');
            const doc = new jsPDF('p','mm','legal');
            doc.setFontSize(10);
            doc.addImage(img,'JPEG', 15, 7);
            doc.text("Universidad Mayor de San Andrés",65,18);
            doc.text("Facultad de Humanidades y Ciencias de la Educación",65,23);
            doc.text("Datos de Personales",20,45);
            doc.text("CIF : "+this.reporte.persona._01cif,30,50);
            doc.text("Nombre : "+this.reporte.persona._04nombre,30,55);
            doc.text("Apellidos : "+this.reporte.persona._05paterno+" "+this.reporte.persona._06materno,30,60);
            doc.text("Celular : "+this.reporte.persona._09cel,30,65);
            doc.text("Unidad : "+this.reporte.sigla,30,70);
            doc.text("ID app : "+this.reporte.persona.id,120,50);
            doc.text("C.I. : "+this.reporte.persona._02ci+" "+this.reporte.persona._03complemento,120,55);
            doc.text("Correo : "+this.reporte.persona._10correo,120,60);
            doc.setFontSize(15);
            doc.text("Retraso : "+this.totalretraso+" min.",120,75);
            doc.text("Salida Anticipada : "+this.totalanticipado+" min.",120,85);
            doc.setFontSize(10);
            var finalY=95;
            autoTable(doc, {
                theme: 'plain',
                startY:finalY+25,
                margin: {left:30 },
                styles:{fontSize:10},
                html:'#firma'

            });
            finalY = doc.lastAutoTable.finalY;
            autoTable(doc, {
                startY:finalY,
                margin: {left:20 },
                styles:{fontSize:8},
                html:'#printDatos',
                showFoot: 'lastPage'
            });
            finalY = doc.lastAutoTable.finalY;
            doc.setFontSize(15);
            doc.text("Reporte de Asistencia " + this.mes +" "+this.reporte.gestion,20,finalY+10);
            autoTable(doc, {
                startY:finalY+15,
                margin: {left:15 },
                styles:{fontSize:7.5},
                html:'#printMarcado',
                showFoot: 'lastPage'
            });
            doc.save(this.reporte.persona._01cif+'reporte.pdf');
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
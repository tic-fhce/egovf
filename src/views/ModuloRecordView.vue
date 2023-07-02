<template>
    <ComponenteMenuVue :cif="usuario.cif" :menu="usuario.menu"/>
    <div class="container">
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <div class="row">
            <div class="card">
                <div class="row">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-md-6">
                                <h2>Record de Asistencia</h2>
                            </div>
                            <div class="col col-md-4 col-sm-4">
                                <h2>{{mes}} de {{record.gestion}} </h2>
                            </div>
                            <div class="col col-md-2 col-sm-2">
                                <button class="form-control btn btn-success" @click="pdfRecord()"><span class="material-icons">&#xe8ad;</span>Imprimir</button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <h2 class="text-center">Estadisticas de Asistencia</h2>
                        <div class="table-responsive">
                            <table class="table table-striped table-hover" id="printAsistencia">
                                <thead>
                                    <tr>
                                        <th>#</th><th>Detalle</th><th>Cantidad</th><th>%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>1</td><td>Excelente</td><td>{{ stadist.excelente }}</td><td>{{ (stadist.excelente/ln * 100).toFixed(2) }}%</td></tr>
                                    <tr><td>2</td><td>Regular</td><td>{{ stadist.regular }}</td><td>{{ (stadist.regular/ln * 100).toFixed(2) }}%</td></tr>
                                    <tr><td>3</td><td>En Linea Roja</td><td>{{ stadist.roja }}</td><td>{{ (stadist.roja/ln * 100).toFixed(2) }}%</td></tr>
                                    <tr><td>4</td><td>Llamada de Atencion</td><td>{{ stadist.atencion }}</td><td>{{ (stadist.atencion/ln * 100).toFixed(2) }}%</td></tr>
                                    <tr></tr>
                                </tbody>
                            </table>
                        </div>
                        <br>
                        <br>
                        <h2 class="text-center">Ranking de Asistencias</h2>
                        <hr>
                        <div class="table-responsive">
                            <table class="table table-striped table-hover" id="printRecord">
                                <thead>
                                    <tr>
                                        <th>#</th><th>CIF</th><th>C.I.</th><th>Nombres y Apellidos</th><th>Min. R</th><th>Min. S.A.</th><th>Total P.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="ciudadano in listaR" :key="ciudadano.id">
                                        <td>{{ciudadano.id}}</td>
                                        <td>{{ciudadano.cif}}</td>
                                        <td>{{ ciudadano.ci }}</td>
                                        <td>{{ ciudadano.nombre }}</td>
                                        <td>{{ ciudadano.retraso }}</td>
                                        <td>{{ ciudadano.antisipado }}</td>
                                        <td>{{ ciudadano.pena }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr>
                        <br>
                        

                        <div class="table-responsive">
                            <table id="printFirma">
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
                </div>
            </div>
        </div>
        <br>
    </div>
    <ComponenteFooterVue/>
</template>

<script>
import ComponenteMenuVue from '@/components/ComponenteMenu.vue';
import ComponenteFooterVue from '@/components/ComponenteFooter.vue';
import PersonaService from '@/services/personaService';
import BiometricoService from '@/services/biometricoService';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
export default {
    name:'ModuloRecordView',
    personaService:null,
    biometricoService:null,
    components:{
        ComponenteMenuVue,
        ComponenteFooterVue
    },
    data(){
        return {
            listaPersona:[],
            listaR:null,
            ln:0,
            mes:'',
            usuario:{
                token:'',
                cif:'',
                correo:'',
                celular:'',
                pass:'',
                menu:[]
            },
            record:{
                gestion:2023,
                mes:0,
                tipo:0
            },
            stadist:{
                excelente:0,
                regular:0,
                roja:0,
                atencion:0
            }
        }
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
        this.personaService = new PersonaService();
        this.biometricoService = new BiometricoService();
    },
    mounted(){
        this.record.gestion = this.$route.params.gestion;
        this.record.mes = this.$route.params.mes;
        this.record.tipo = this.$route.params.tipo;
        this.getMes();
        this.getDatos();
        this.getCiudadanos();
        this.getRecord();
    },
    methods:{
        getDatos(){
            //cargamos datos del Usuario
            if(this.$cookies.get('cif')!=null){
                this.usuario.token=this.$cookies.get('token');
                this.usuario.cif=this.$cookies.get('cif');
                this.usuario.correo=this.$cookies.get('correo');
                this.usuario.celular=this.$cookies.get('celular');
                this.usuario.pass=this.$cookies.get('pass');
                this.usuario.menu=this.$cookies.get('menu');
            }
        },
        getMes(){
            if(this.record.mes==1){this.mes='Enero';}
            if(this.record.mes==2){this.mes='Febrero';}
            if(this.record.mes==3){this.mes='Marzo';}
            if(this.record.mes==4){this.mes='Abril';}
            if(this.record.mes==5){this.mes='Mayo';}
            if(this.record.mes==6){this.mes='Junio';}
            if(this.record.mes==7){this.mes='Julio';}
            if(this.record.mes==8){this.mes='Agosto';}
            if(this.record.mes==9){this.mes='Septiembre';}
            if(this.record.mes==10){this.mes='Octubre';}
            if(this.record.mes==11){this.mes='Noviembre';}
            if(this.record.mes==12){this.mes='Diciembre';}
        },
        async getCiudadanos(){
            // creamos los datos del Ciudadano
            
            this.personaService.headersUsuario(this.usuario.token);
            await this.personaService.getListaCiudadanos().then((response) =>{
                this.listaPersona=response.data;
                console.log(this.listaPersona);
            });
        },
        async getRecord(){
            await  this.biometricoService.getRecord(this.record).then((response)=>{
                this.listaRecord = response.data;
                console.log(this.listaRecord);
            });
            var auxid=1;
            this.listaR=[];
            this.listaRecord.forEach(cif => {
                this.listaPersona.forEach(persona => {
                    var report={
                        id:0,
                        cif:0,
                        ci:'',
                        nombre:'',
                        retraso:0,
                        antisipado:0,
                        pena:0
                    };
                    if(persona._01cif == cif.cif){
                        report.id=auxid;
                        report.cif=persona._01cif;
                        report.ci=persona._02ci+' '+persona._03complemento;
                        report.nombre=persona._04nombre+' '+persona._05paterno+' '+persona._06materno;
                        report.retraso=cif.retraso;
                        report.antisipado=cif.antisipado;
                        report.pena= cif.pena;
                        if(cif.pena==0){
                            this.stadist.excelente=this.stadist.excelente+1;
                        }
                        if( cif.pena>=1 && cif.pena<=25){
                            this.stadist.regular=this.stadist.regular+1;
                        }
                        if (cif.pena>=26 && cif.pena<=59){
                            this.stadist.roja=this.stadist.roja+1;
                        }
                        if(cif.pena>=60){
                            this.stadist.atencion=this.stadist.atencion+1;
                        }
                        auxid=auxid+1;
                        this.listaR.push(report);
                        return false;
                    }
                    return true;
                });
                this.ln=this.ln+1;
            });
        },
        pdfRecord(){
            var img = new Image();
            img.src='/img/header.d2def491.jpg';
            //const doc = new jsPDF('p','mm','letter');
            const doc = new jsPDF('p','mm','legal');
            doc.setFontSize(10);
            doc.addImage(img,'JPEG', 15, 7);
            doc.text("Universidad Mayor de San Andrés",65,18);
            doc.text("Facultad de Humanidades y Ciencias de la Educación",65,23);
            doc.text("Récord de Asistencia del personal contratado de la",20,60);
            doc.text("Facultad de Humanidades y Ciencias de la Educación",20,65);
            doc.setFontSize(12);
            doc.text("Mes de "+this.mes+" del " + this.record.gestion,20,73);
            doc.setFontSize(10);
            var finalY=90;
            autoTable(doc, {
                theme: 'plain',
                startY:finalY+25,
                margin: {left:30 },
                styles:{fontSize:10},
                html:'#printFirma'

            });
            finalY = doc.lastAutoTable.finalY;
            autoTable(doc, {
                startY:finalY,
                margin: {left:20 },
                styles:{fontSize:8},
                html:'#printAsistencia',
                showFoot: 'lastPage'
            });
            finalY = doc.lastAutoTable.finalY;
            doc.setFontSize(15);
            autoTable(doc, {
                startY:finalY+15,
                margin: {left:20 },
                styles:{fontSize:8},
                html:'#printRecord',
                showFoot: 'lastPage'
            });
            doc.save(this.mes+this.record.gestion+'record.pdf');
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
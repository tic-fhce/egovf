<template>
    <div class="oculto">
        {{ reporte.cif }}
    </div>
    <CRow>
        <CCol :lg="12">
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <CRow>
                        <CCol :lg="6">
                            <div class="align-items-center">
                                <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                                <label class="mb-0 fs-6 text-white">Reporte de Asistencia del mes de {{mes}} de {{reporte.gestion}}</label>
                            </div>
                        </CCol>
                        <CCol :lg="6" class="text-end">
                            <CDropdown variant="btn-group">
                                <CDropdownToggle  color="dark" class="font border-0 shadow-sm" size="sm"><CIcon icon="cil-menu" class="me-2 text-success"/>Opciones</CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem>
                                        <CButton @click="pdf()" size="sm"><CIcon icon="cil-cloud-download" class="me-2"/>Descargar Reporte</CButton>
                                    </CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <!-- Tabla Lista de Biometricos-->
                    <CRow>
                        <CCol :lg="12" class="table-responsive">
                            <table class="table table-striped table-hover" id="printDatos">
                                <tr><td colspan="5" class="text-center"><h4>Datos de Usuario Registrado en Biometricos</h4></td></tr>
                                <tr v-for="perfil in reporte.listaPerfil" :key="perfil.id">
                                    <td><CBadge color="light">ID-B : {{perfil.id}}</CBadge></td>
                                    <td><CBadge color="light">User ID : {{perfil.user_id}}</CBadge></td>
                                    <td><CBadge color="light">Nombre : {{perfil.nombre}}</CBadge></td>
                                    <td><CBadge color="light">Lugar : {{perfil.detalle}}</CBadge></td>
                                    <td><CBadge color="light">Sigla : {{perfil.lugar}}</CBadge></td>
                                </tr>
                            </table>
                        </CCol>
                    </CRow>
                    <!-- End Tabla Lista de Biometricos-->

                    <!-- Tabla Lista de Horarios-->
                    <CRow>
                        <CCol :lg="12" class="table-responsive">
                            <table class="table table-striped table-hover" id="printHorario">
                                <tr><td colspan="4" class="text-center"><h4>Horarios del Usuario</h4></td></tr>
                                <tr v-for="horario in reporte.listaHorario" :key="horario.horario_id">
                                    <td><CBadge color="light">ID Horario : {{horario.horario_id}}</CBadge></td>
                                    <td><CBadge color="light">Valido del : {{horario.fecha}}</CBadge></td>
                                    <td><CBadge color="light">Hasta {{horario.valido}}</CBadge></td>
                                </tr>
                            </table>
                        </CCol>
                    </CRow>
                    <!-- End Tabla Lista de Horarios-->

                    <!-- Tabla Marcados -->
                    <CRow>
                        <CCol :lg="12" class="table-responsive">
                            <table class="table table-striped table-hover" id="printMarcado" >
                                <thead>
                                    <tr>
                                        <th>#</th><th>Detalle</th><th>Lugar</th><th>Turno</th><th>Hora M.</th><th>Min. R.</th><th>Obs.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="value in listaReporte" :key="value.id">
                                        <td >{{value.id}}</td>
                                        <td >{{value.dia}} {{value.day}}<br><CBadge color="dark">{{value.fecha}}</CBadge><br></td>
                                        <td >
                                            <CBadge color="success">{{value.lugar[0]}}</CBadge><br><CBadge color="success">{{value.lugar[1]}}</CBadge><br><CBadge color="success">{{value.lugar[2]}}</CBadge><br><CBadge color="success">{{value.lugar[3]}}</CBadge>
                                        </td>
                                        <td >
                                            <CBadge color="success">{{value.turno[0]}}</CBadge><br>{{value.turno[1]}}<br>{{value.turno[2]}}<br>{{value.turno[3]}}
                                        </td>
                                        <td >
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
                                            <CBadge :color="value.retraso[0] > 0 ? 'danger' : 'success'" class="retraso-badge">
                                                {{ value.retraso[0] }}
                                            </CBadge><br>
                                            <CBadge :color="value.retraso[1] > 0 ? 'danger' : 'success'" class="retraso-badge">
                                                {{ value.retraso[1] }}
                                            </CBadge><br>
                                            <CBadge :color="value.retraso[2] > 0 ? 'danger' : 'success'" class="retraso-badge">
                                                {{ value.retraso[2] }}
                                            </CBadge><br>
                                            <CBadge :color="value.retraso[3] > 0 ? 'danger' : 'success'" class="retraso-badge">
                                                {{ value.retraso[3] }}
                                            </CBadge>
                                        </td>
                                        
                                        <td>
                                            <div class="obserbaciones" v-for="listobs in value.obsDtoReporte" :key="listobs.id">
                                                <CBadge color="info">{{ listobs.uidobs }} | {{ listobs.tipo }}</CBadge><br>
                                                
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th colspan="5">Total Minutos de Retraso</th><th><h2>{{totalretraso}}</h2></th><th>min.</th>
                                    </tr>
                                    <tr>
                                        <th colspan="5">Total Minutos de Salidas Anticipadas</th><th><h2>{{totalanticipado}}</h2></th><th>min.</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </CCol>
                    </CRow>
                    <!-- End Tabla Marcados -->
                </CCardBody>
                <CCardFooter>
                    <div class="oculto">
                        <QrcodeVue :value="sms" :size="size" level="H" ref="qr"/>
                    </div>
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>
</template>
<script>
// Importamos Componentes
import QrcodeVue from 'qrcode.vue';

// Importamos los Servicios
import SccService from '@/modules/egovf-scc/services/sccService';
import UploadService from '@/services/upload/uploadService';

//Importamos Herramientas
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default {
    name:'ComponenteReporteVue',
    props:['reporte','uri'],
    components:{
        QrcodeVue
    },
    data(){
        return{
            sccService:null,
            uploadService:null,
            listaReporte:[],
            getPB:true,
            totalretraso:0,
            totalanticipado:0,
            totalsin:0,
            mes:'',
            sms:'',
            size:300
        }
    },
    created(){
        this.sccService = new SccService(); //Instanciamos el Servicio
        this.uploadService = new UploadService();
    },
    updated(){
        
        if(this.reporte.cif > 0 && this.getPB)
        {
            this.getMes(); // Funcion que Debuelbe el mes Literal
            this.getReporteMes(); // Funcion que Contruye los Repostes del mes
            this.getPB=false; // Valor que cambia para no actualizar constante mente 
        }
    },
    methods:{
        async getReporteMes(){// Funcion que construye los reportes del mes
            await this.sccService.getReporteMes(this.reporte).then((result) => {
                this.listaReporte=result.data;
                this.sumaRetraso(); // Funcion que suma los retrasos
            }).catch((err) => {
                console.log(err);
            });
        },
        sumaRetraso(){ //Funcion que suma los retrasos y los minutos de salida adelantada
            let sum = 0;
            let res = 0;
            let sin = 0;
            this.listaReporte.forEach(element => {
                // Verificar si hay retraso o "Sin Marcar"
                const tieneRetraso = element.retraso.some(valor => valor > 0);
                const tieneSinMarcar = element.hora.includes("Sin Marcar");

                if (tieneRetraso || tieneSinMarcar) {
                    sin += 1;
                }
                // Sumar retrasos según índice par o impar
                element.retraso.forEach((valor, i) => {
                    if (i % 2 === 0) {
                        sum += parseInt(valor, 10);
                    } else {
                        res += parseInt(valor, 10);
                    }
                });
            });
            this.totalretraso = sum;
            this.totalanticipado = res;
            this.totalsin = sin;
            const dir = '/libreReporte'+this.uri;
            this.sms='Cif:'+this.reporte.cif+' TR: '+this.totalretraso+'min' + ' TA: '+this.totalanticipado+'min '+'http://192.168.31.34:8080'+dir;
        },
        getMes(){// Funcion para colocar el Mes en formato Literal
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
        pdf(){ //Funcion que Constuye el PDF del reporte
            var img = new Image();
            const fecha = new Date();
            const doc = new jsPDF('p','mm','letter');
            const contentHtml = this.$refs.qr.$el;
            const qr = contentHtml.toDataURL("image/jpeg",0.8);

            //const doc = new jsPDF('p','mm','legal');
            doc.setFontSize(10);
            img.src ='https://fhcevirtual.umsa.bo/egovf-img/imagenes/logoticjpg.jpg';
            doc.addImage(img,'JPEG', (215/5), 14,15,10);

            img.src ='https://fhcevirtual.umsa.bo/egovf-img/imagenes/logofhce.jpg';
            doc.addImage(img,'JPEG', (215/7.8), 14,15,10);
            
            img.src ='https://fhcevirtual.umsa.bo/egovf-img/imagenes/logoumsa.jpg';
            doc.addImage(img,'JPEG', (215/10), 12,6,12);

            doc.addImage(qr,'JPEG',160,12,40,40);
            
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text("Universidad Mayor de San Andrés",(215/2),18,{align:"center"});
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.text("Facultad de Humanidades y Ciencias de la Educación",(215/2),23,{align:"center"});
            doc.setFontSize(8);
            doc.text("Unidad de Tecnologías de la Información y la Comunicación  UMSA-FHCE",(215/2),28,{align:"center"});

            doc.setFontSize(15);
            doc.text("Datos de Personales :",20,40);
            
            doc.setFontSize(10);

            img.src = 'https://fhcevirtual.umsa.bo/egovf-img/imagenes/200/'+this.reporte.persona.foto;
            doc.addImage(img,'JPEG', 20,47,30,30);

            doc.text("CIF : "+this.reporte.cif,52,50);
            doc.text("Nombre : "+this.reporte.persona.nombre,52,55);
            doc.text("Apellidos : "+this.reporte.persona.paterno+" "+this.reporte.persona.materno,52,60);
            doc.text("Celular : "+this.reporte.persona.celular,52,65);
            doc.text("Unidad : "+this.reporte.sigla,52,70);
            doc.text("ID app : "+this.reporte.persona.id,120,50);
            doc.text("C.I. : "+this.reporte.persona.ci,120,55);
            doc.text("Correo : "+this.reporte.persona.correo,120,60);
            doc.setFontSize(15);
            
            doc.text("Retraso  : "+this.totalretraso+" min.",120,70);
            doc.text("Salida Anticipada : "+this.totalanticipado+" min.",120,80);
            doc.setFontSize(6);
            doc.text("Fecha de Imprecion : "+fecha,120,86);
            doc.setFontSize(10);
            var finalY=95;
            
            if(this.reporte.cif != 20903198600){
                doc.text("Lic. Jaime A. Montecinos Marquez",(215/4),finalY+25,{align:"center"});
                doc.text("Responsable Unidad TIC.",(215/4),finalY+30,{align:"center"});

                doc.text("Vo. Bo.",(162),finalY+25,{align:"center"});
                doc.text("Inmediato Superior",(162),finalY+30,{align:"center"});
            }
            else{
                doc.text("Vo. Bo.",(215/2),finalY+25,{align:"center"});
                doc.text("Inmediato Superior",(215/2),finalY+30,{align:"center"});
            }

            finalY = finalY+45;
            autoTable(doc, {
                theme:'striped',
                startY:finalY,
                margin: {left:20 },
                styles:{fontSize:8},
                html:'#printDatos',
                showFoot: 'lastPage'
            });
            finalY = doc.lastAutoTable.finalY;
            finalY = finalY+10;
            autoTable(doc, {
                startY:finalY,
                margin: {left:20 },
                styles:{fontSize:8},
                html:'#printHorario',
                showFoot: 'lastPage'
            });
            finalY = doc.lastAutoTable.finalY;
            doc.setFontSize(15);
            doc.text("Reporte de Asistencia del mes de " + this.mes +" del "+this.reporte.gestion,(215/2),finalY+10,{align:"center"});
            autoTable(doc, {
                startY:finalY+15,
                margin: {left:15 },
                styles:{fontSize:7.5},
                html:'#printMarcado',
                showFoot: 'lastPage'
            });
            doc.save(this.reporte.cif+this.mes+'reporte.pdf');
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
    font-size: 0.8em;
}
.oculto{
    display: none;
}

</style>

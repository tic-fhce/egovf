<template>
    <CRow>
        <CCol :xs="12">
            <CCard>
                <CCardHeader class="headercolor">
                    <CRow>
                        <CCol :lg="8" class="text-center">Record De Asistencias mes de {{ mes }} del {{ record.gestion
                            }}</CCol>
                        <CCol :lg="4" class="text-end">
                            <CButton color="success" class="font" @click="pdfRecord()" size="sm">
                                <CIcon icon="cil-cloud-download" class="me-2" />Descargar PDF
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol :lg="6">
                            <CCard>
                                <CCardHeader class="headercolor"> Estadisticas de Asistencia </CCardHeader>
                                <CCardBody>
                                    <div class="table-responsive">
                                        <table class="table table-striped table-hover" id="printAsistencia">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Detalle</th>
                                                    <th>Cantidad</th>
                                                    <th>%</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Excelente</td>
                                                    <td>{{ stadist.excelente }}</td>
                                                    <td>{{ (stadist.excelente / ln * 100).toFixed(2) }}%</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Regular</td>
                                                    <td>{{ stadist.regular }}</td>
                                                    <td>{{ (stadist.regular / ln * 100).toFixed(2) }}%</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>En Linea Roja</td>
                                                    <td>{{ stadist.roja }}</td>
                                                    <td>{{ (stadist.roja / ln * 100).toFixed(2) }}%</td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>Llamada de Atencion</td>
                                                    <td>{{ stadist.atencion }}</td>
                                                    <td>{{ (stadist.atencion / ln * 100).toFixed(2) }}%</td>
                                                </tr>
                                                <tr></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCol>

                        <CCol :lg="6">
                            <CCard>
                                <CCardHeader class="headercolor"> Grafico de Asistencia</CCardHeader>
                                <CCardBody>

                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                    <CRow><br></CRow>
                    <CRow>
                        <br>
                        <h2 class="text-center">Ranking de Asistencias</h2>
                        <hr>
                        <div class="table-responsive">
                            <table class="table table-striped table-hover" id="printRecord">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>CIF</th>
                                        <th>C.I.</th>
                                        <th>Nombres y Apellidos</th>
                                        <th>Minutos de Retraso</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="ciudadano in listaR" :key="ciudadano.id">
                                        <td>{{ ciudadano.id }}</td>
                                        <td>
                                            <CButton color="success" class="font" size="sm"
                                                @click="getReporteMes(ciudadano.cif)">{{ ciudadano.cif }}</CButton>
                                        </td>
                                        <td>{{ ciudadano.ci }}</td>
                                        <td>
                                            <div>{{ ciudadano.nombre }}<br></div>
                                            <div class="small text-medium-emphasis">
                                                <span>Unidad</span> | {{ ciudadano.unidad }} -> [ {{ ciudadano.retraso
                                                }} | {{ ciudadano.antisipado }} | {{ ciudadano.pena }} ]
                                            </div>
                                        </td>
                                        <td>{{ ciudadano.retraso }} min.</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>

import SccService from '@/modules/egovf-scc/services/sccService';
import EgovfService from '@/modules/egovf/services/egovfService';


import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
export default {
    name: 'RecordView',
    components: {

    },
    props: {
        gestion: { type: [Number, String], required: true },
        m: { type: [Number, String], required: true },
        tipo: { type: [Number, String], required: true },
    },
    data() {
        return {
            sccService: null,
            listaPersona: [],
            listaCiudadanoEmpleado: [],
            listaR: null,
            ln: 0,
            mes: '',
            uri: '',
            usuario: {
                token: '',
                cif: '',
                correo: '',
                celular: '',
                pass: '',
                unidad: '',
                sigla: ''
            },
            record: {
                gestion: 2023,
                mes: 0,
                tipo: 0,
                di: '00',
                df: '00'
            },
            stadist: {
                excelente: 0,
                regular: 0,
                roja: 0,
                atencion: 0
            }
        }
    },
    beforeCreate() {
        if (this.$cookies.get('cif') == null) {
            this.$router.push('/');
        }
    },
    created() {
        this.sccService = new SccService();
        this.egovfService = new EgovfService();
    },
    mounted() {
        this.record.gestion = this.gestion;
        this.record.mes = this.m;
        this.record.tipo = this.tipo;
        this.getMes();
        this.getDatos();
        this.getListaCiudadanoEmpleado();
    },
    methods: {
        getDatos() {
            //cargamos datos del Usuario
            if (this.$cookies.get('cif') != null) {
                this.usuario.token = this.$cookies.get('token');
                this.usuario.cif = this.$cookies.get('cif');
                this.usuario.correo = this.$cookies.get('correo');
                this.usuario.celular = this.$cookies.get('celular');
                this.usuario.pass = this.$cookies.get('pass');
                this.usuario.unidad = this.$cookies.get('unidad');
                this.usuario.sigla = this.$cookies.get('sigla');
                this.usuario.foto = this.$cookies.get('foto');
                this.egovfService.headersUsuario(this.usuario.token);

            }
        },
        getMes() {
            if (this.record.mes == 1) { this.mes = 'Enero'; }
            if (this.record.mes == 2) { this.mes = 'Febrero'; }
            if (this.record.mes == 3) { this.mes = 'Marzo'; }
            if (this.record.mes == 4) { this.mes = 'Abril'; }
            if (this.record.mes == 5) { this.mes = 'Mayo'; }
            if (this.record.mes == 6) { this.mes = 'Junio'; }
            if (this.record.mes == 7) { this.mes = 'Julio'; }
            if (this.record.mes == 8) { this.mes = 'Agosto'; }
            if (this.record.mes == 9) { this.mes = 'Septiembre'; }
            if (this.record.mes == 10) { this.mes = 'Octubre'; }
            if (this.record.mes == 11) { this.mes = 'Noviembre'; }
            if (this.record.mes == 12) { this.mes = 'Diciembre'; }
        },
        async getListaCiudadanoEmpleado() { // Funcion que regresa una lista de Ciudadanos que son Empleados del ModuloEgovf
            await this.egovfService.getListaEmpleado().then(response => {
                this.listaCiudadanoEmpleado = response.data;
                this.getRecord();
            });
        },
        getReporteMes(cif) {
            window.open(this.$router.resolve({
                name: "ReporteView",
                params: {
                    cifCiudadano: cif,
                    gestion: this.record.gestion,
                    m: this.record.mes,
                    di: this.record.di,
                    df: this.record.df
                }
            }).href, '_blank');
            //window.open(routerData.href,'_blank');
        },
        async getRecord() {
            let loadingAlert = null;

            try {
                // Mostrar SweetAlert de carga
                loadingAlert = this.$swal.fire({
                    title: 'Cargando Record de Asistencias',
                    html: 'Procesando datos, por favor espere...',
                    allowOutsideClick: false,
                    didOpen: () => {
                        this.$swal.showLoading();
                    }
                });

                this.$nprogress.start();

                // Obtener datos del servicio
                const response = await this.sccService.getRecord(this.record);
                this.listaRecord = response.data;

                // Procesar datos
                this.procesarDatos();

                // Cerrar alert de carga
                this.$swal.close();

                // Mostrar éxito
                this.$swal.fire({
                    icon: 'success',
                    title: '¡Completado!',
                    text: `Se procesaron ${this.listaR.length} registros`,
                    timer: 2000,
                    showConfirmButton: false
                });

            } catch (error) {
                // Cerrar alert si existe
                if (loadingAlert) {
                    this.$swal.close();
                }

                // Mostrar error
                this.$swal.fire({
                    icon: 'error',
                    title: 'Error en la carga',
                    text: error.message || 'Ocurrió un error al procesar los datos',
                    confirmButtonText: 'Reintentar'
                });

            } finally {
                this.$nprogress.done();
            }


        },

        // Método separado para procesar datos
        procesarDatos() {
            var auxid = 1;
            this.listaR = [];
            this.stadist = { excelente: 0, regular: 0, roja: 0, atencion: 0 }; // Resetear estadísticas

            this.listaRecord.forEach(cif => {
                this.listaCiudadanoEmpleado.forEach(ciudadano => {
                    if (ciudadano.cif == cif.cif) {
                        const report = {
                            id: auxid,
                            cif: ciudadano.cif,
                            ci: ciudadano.ci,
                            nombre: `${ciudadano.nombre} ${ciudadano.paterno} ${ciudadano.materno}`,
                            unidad: ciudadano.sigla,
                            retraso: cif.retraso,
                            antisipado: cif.antisipado,
                            pena: cif.pena
                        };

                        // Actualizar estadísticas
                        this.actualizarEstadisticas(cif.retraso);

                        this.listaR.push(report);
                        auxid++;
                        return false; // Break del forEach
                    }
                    return true;
                });
                this.ln++;
            });
        },

        // Método para actualizar estadísticas
        actualizarEstadisticas(retraso) {
            if (retraso == 0) {
                this.stadist.excelente++;
            } else if (retraso >= 1 && retraso <= 25) {
                this.stadist.regular++;
            } else if (retraso >= 26 && retraso <= 59) {
                this.stadist.roja++;
            } else if (retraso >= 60) {
                this.stadist.atencion++;
            }
        },
        pdfRecord() {
            var img = new Image();

            const doc = new jsPDF('p', 'mm', 'letter');
            //const doc = new jsPDF('p','mm','legal');

            img.src = 'https://fhcevirtual.umsa.bo/egovf-img/imagenes/logoticjpg.jpg';
            doc.addImage(img, 'JPEG', (215 / 5), 14, 15, 10);

            img.src = 'https://fhcevirtual.umsa.bo/egovf-img/imagenes/logofhce.jpg';
            doc.addImage(img, 'JPEG', (215 / 7.8), 14, 15, 10);

            img.src = 'https://fhcevirtual.umsa.bo/egovf-img/imagenes/logoumsa.jpg';
            doc.addImage(img, 'JPEG', (215 / 10), 12, 6, 12);

            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text("Universidad Mayor de San Andrés", (215 / 2), 18, { align: "center" });
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.text("Facultad de Humanidades y Ciencias de la Educación", (215 / 2), 23, { align: "center" });
            doc.setFontSize(8);
            doc.text("Unidad de Tecnologías de la Información y la Comunicación  UMSA-FHCE", (215 / 2), 28, { align: "center" });

            doc.setFontSize(12);
            doc.text("Record de Asistencias Mes de " + this.mes + " del " + this.record.gestion, (215 / 2), 45, { align: "center" });
            doc.setFontSize(10);
            var finalY = 50;
            doc.text("Lic. Jaime A. Montecinos Marquez", (215 / 4), finalY + 25, { align: "center" });
            doc.text("Responsable Unidad TIC.", (215 / 4), finalY + 30, { align: "center" });

            doc.text("Vo. Bo.", (162), finalY + 25, { align: "center" });
            doc.text("Inmediato Superior", (162), finalY + 30, { align: "center" });

            finalY = finalY + 45;

            doc.text("Estadisticas de Asistencia", (215 / 2), finalY, { align: "center" });
            finalY = finalY + 5;

            autoTable(doc, {
                startY: finalY,
                margin: { left: 20 },
                styles: { fontSize: 8 },
                html: '#printAsistencia',
                showFoot: 'lastPage'
            });
            finalY = doc.lastAutoTable.finalY;
            doc.setFontSize(15);
            autoTable(doc, {
                startY: finalY + 15,
                margin: { left: 20 },
                styles: { fontSize: 8 },
                html: '#printRecord',
                showFoot: 'lastPage'
            });
            doc.save(this.mes + this.record.gestion + 'record.pdf');
        }
    }
}
</script>
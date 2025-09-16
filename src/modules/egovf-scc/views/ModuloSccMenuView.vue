<template>
    <CRow>
        <!--Card para observaciones-->
        <CCol :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">Observaciones</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-featured-playlist" class="menuicon" />
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" @click="getOpciones(direcciones[0])" size="sm">Ingresar
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <!--Card para reporte mensual-->
        <CCol :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">Reporte Mensual</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-clipboard" class="menuicon" />
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" @click="clickModalMes(true)" size="sm">Ingresar</CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <!--Card para reporte segmentado-->
        <CCol :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">R. Segmentado</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-clipboard" class="menuicon" />
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" @click="clickModalDias(true)" size="sm">Ingresar</CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <!--Card para reporte Datos del biometricos-->
        <CCol :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">Biometricos</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-monitor" class="menuicon" />
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" @click="getOpciones(direcciones[1])" size="sm">Ingresar
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <!--Card para reporte Datos del Horarios-->
        <CCol :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">Horarios</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-calendar" class="menuicon" />
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" @click="getOpciones(direcciones[2])" size="sm">Ingresar
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>

    <!-- Modal Reporte Mensual-->
    <CModal :visible="modalMes" @close="clickModalMes(false)">
        <form @submit.prevent="getReporteMes()">
            <CModalHeader class="headercolor" dismiss @close="clickModalMes(false)">
                <CModalTitle>
                    <h6>
                        <CIcon icon="cil-description" size="lg" class="me-2" /> Reporte Mensual
                    </h6>
                </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Gestion </CInputGroupText>
                    <CFormSelect v-model="reporteMes.gestion" :model-value="String(reporteMes.gestion)"
                        @update:model-value="reporteMes.gestion = Number($event)" required="true">
                        <option v-for="y in listaGestion" :key="y" :value="y">
                            {{ y }}
                        </option>
                    </CFormSelect>
                </CInputGroup>

                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Mes </CInputGroupText>
                    <CFormSelect v-model="reporteMes.mes" :model-value="String(reporteMes.mes)" required="true">
                        <option v-for="mes in listaMes" :value="mes.m" :key="mes.m">
                            {{ mes.mes }}
                        </option>
                    </CFormSelect>
                </CInputGroup>

            </CModalBody>
            <CModalFooter>
                <CButton @click="clickModalMes(false)" color="danger" class="font">
                    <CIcon icon="cil-x" class="me-2" />Cancelar
                </CButton>
                <button class="btn btn-success font">
                    <CIcon icon="cil-file" class="me-2" />Ver Reporte
                </button>
            </CModalFooter>
        </form>
    </CModal>
    <!-- End Modal Reporte Mensual-->

    <!-- Modal Reporte Mensual Segmentado-->
    <CModal :visible="modalDias" @close="clickModalDias(false)">
        <form @submit.prevent="getReporteMes()">
            <CModalHeader class="headercolor" dismiss @close="clickModalDias(false)">
                <CModalTitle>
                    <h6>
                        <CIcon icon="cil-description" size="lg" class="me-2" /> Reporte Mensual Segmentado
                    </h6>
                </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Gestion </CInputGroupText>
                    <CFormSelect v-model="reporteMes.gestion" :model-value="String(reporteMes.gestion)"
                        @update:model-value="reporteMes.gestion = Number($event)" required="true">
                        <option v-for="y in listaGestion" :key="y" :value="y">
                            {{ y }}
                        </option>
                    </CFormSelect>
                </CInputGroup>

                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Mes </CInputGroupText>
                    <CFormSelect v-model="reporteMes.mes" :model-value="String(reporteMes.mes)" required="true">
                        <option v-for="mes in listaMes" :value="mes.m" :key="mes.m">
                            {{ mes.mes }}
                        </option>
                    </CFormSelect>
                </CInputGroup>

                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Inicio </CInputGroupText>
                    <CFormSelect v-model="reporteMes.di" :model-value="String(reporteMes.di)"
                        @update:model-value="reporteMes.di = Number($event)" required="true">
                        <option value=""></option>
                        <option v-for="i = 1 in 31" :key="i" :value="i">{{ i }}</option>
                    </CFormSelect>
                </CInputGroup>

                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Fin </CInputGroupText>
                    <CFormSelect v-model="reporteMes.df" :model-value="String(reporteMes.df)"
                        @update:model-value="reporteMes.df = Number($event)" required="true">
                        <option v-for="j = 1 in 31" :key="j" :value="j">{{ j }}</option>
                    </CFormSelect>
                </CInputGroup>

            </CModalBody>
            <CModalFooter>
                <CButton @click="clickModalDias(false)" color="danger" class="font">
                    <CIcon icon="cil-x" class="me-2" />Cancelar
                </CButton>
                <button class="btn btn-success font">
                    <CIcon icon="cil-file" class="me-2" />Ver Reporte
                </button>
            </CModalFooter>
        </form>
    </CModal>
    <!-- End Modal Reporte Mensual Segmentado-->

</template>
<script>
//Importamos Servicios
import SccService from '@/modules/egovf-scc/services/sccService';
import UploadService from '@/services/upload/uploadService';
export default {
    name: 'ModuloSccMenuView',
    components: {
    },
    data() {
        return {
            titulo: 'Modulo M-SCC',
            sccService: null,
            egovfService: null,
            empleadoService: null,
            cifCiudadano: '',
            modalMes: false,
            modalDias: false,
            listaGestion: [],
            listaMes: [],
            usuario: {
                token: '',
                cif: '',
                correo: '',
                celular: '',
                pass: '',
                unidad: '',
                sigla: '',
                foto: ''
            },
            empleado: {
                id: 0,
                cif: 0,
                empleado: '',
                tipoempleado_id: 0,
                fecha: '',
                estado: 0,
                salida: '',
                contratos: []
            },
            direcciones: ["/observaciones", "/biometricos", "/horarios"],
            reporteMes: {
                cif: '',
                gestion: 0,
                mes: 1,
                di: 0,
                df: 0,
            },
        }
    },
    created() {
        //Creamos los Sercicios
        this.sccService = new SccService();
        this.uploadService = new UploadService();
        this.getAbiso();
    },
    mounted() {
        this.cifCiudadano = this.$cookies.get('cif');
        this.getDatos();
        const gestion = this.$functions.getGestion();
        this.obsgestion = gestion.gestion;
        this.reporteMes.gestion = gestion.gestion;
        this.listaGestion = gestion.lgestion;
        this.listaMes = this.$functions.listaMes();
    },
    beforeCreate() {
        if (this.$cookies.get('cif') == null) {
            window.location.href = '/';
        }
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
            }
        },
        async getAbiso() {
            const steps = [];
            var x = 0;
            var c = 0;
            await this.sccService.getAviso().then(response => {
                this.listaAviso = response.data;
            });
            this.listaAviso.forEach(aviso => {
                steps.push(x + 1);
                x = x + 1;
                c = aviso.id;
            });

            const Queue = this.$swal.mixin({
                progressSteps: steps,
                confirmButtonText: 'Siguiente >',
                // optional classes to avoid backdrop blinking between steps
                showClass: { backdrop: 'swal2-noanimation' },
                hideClass: { backdrop: 'swal2-noanimation' },
            })
                ; (async () => {
                    if (this.listaAviso.length > 0) {
                        x = 0;
                        c = c + 1;
                        while (x < this.listaAviso.length) {
                            await Queue.fire({
                                title: this.listaAviso[x].titulo,
                                icon: this.listaAviso[x].icon,
                                text: this.listaAviso[x].detalle,
                                currentProgressStep: x,
                            })
                            x = x + 1;
                        }
                    }
                })()
        },
        getOpciones(direccion) {
            this.$router.push(direccion);
        },
        clickModalMes(rmes) {
            if (this.usuario.foto == 'user.png')
                this.getFotoPerfil();
            else {
                this.modalMes = rmes;
            }

        },
        clickModalDias(dias) {
            if (this.usuario.foto == 'user.png')
                this.getFotoPerfil();
            else {
                this.modalDias = dias;
            }

        },
        getFotoPerfil() { //Funcion que verifica su foto de perfil
            this.$swal.fire({
                title: 'Para obtener tu Reporte Debes de cambiar tu foto de perfil',
                showDenyButton: true,
                icon: 'info',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$router.push('/perfil');
                } else if (result.isDenied) {
                    location.reload();
                }
            });
        },
        getReporteMes() {//Funcion que muestra los Reportes de Usuario
            this.clickModalMes(false);
            this.clickModalDias(false);
            this.$router.push({
                name: 'UsuarioReporteView',
                params:{
                    cif: this.usuario.cif,
                    gestion: this.reporteMes.gestion,
                    m:this.reporteMes.mes,
                    di:this.reporteMes.di,
                    df:this.reporteMes.df
                }
            });
        },
    }
}
</script>
<style scoped>
.menuicon {
    width: 100px;
    /* Ajusta el tamaño según necesites */
    height: 100px;
}
</style>
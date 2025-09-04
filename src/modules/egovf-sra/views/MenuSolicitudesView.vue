<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb custom-breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">
                {{ titulo }} >
            </li>
        </ol>
    </nav>

    <CRow>

        <CCol :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">L.S.A.</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-check" class="menuicon"/>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CTooltip
                        content="Ver todas las solicitudes aprobadas. Haz clic aquí para acceder al listado completo de solicitudes y sus eventos"
                        placement="bottom">
                        <template #toggler="{ id, on }">
                            <CButton :aria-describedby="id" v-on="on" color="success" size="sm" class="font"
                                @click="getListaSolicitud(1, 0, 'Solicitudes Aprobadas')">
                                Ingresar
                            </CButton>
                        </template>
                    </CTooltip>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">L.S.E.E.</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-clipboard" class="menuicon"/>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CTooltip
                        content="Ver todas las solicitudes que se encuentran pendientes de revisión o aprobación. Haz clic aquí para acceder al listado completo de solicitudes en espera"
                        placement="bottom">
                        <template #toggler="{ id, on }">
                            <CButton :aria-describedby="id" v-on="on" color="success" size="sm" class="font"
                                @click="getListaSolicitud(0, 0, 'Solicitudes En Espera')">
                                Ingresar
                            </CButton>
                        </template>
                    </CTooltip>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">L.S.R.</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-trash" class="menuicon" />
                </CCardBody>
                <CCardFooter class="text-center">
                    <CTooltip content="Solicitudes Rechazadas" placement="bottom">
                        <template #toggler="{ id, on }">
                            <CButton :aria-describedby="id" v-on="on" color="success" size="sm" class="font"
                                @click="getListaSolicitud(2, 0, 'Solicitudes Rechazadas')">
                                Ingresar
                            </CButton>
                        </template>
                    </CTooltip>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">L.T.S.</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-code" class="menuicon"/>

                </CCardBody>
                <CCardFooter class="text-center">
                    <CTooltip content="Todas las Solicitudes" placement="bottom">
                        <template #toggler="{ id, on }">
                            <CButton :aria-describedby="id" v-on="on" color="success" size="sm" class="font"
                                @click="clickModalSolicitud(true)">
                                Ingresar
                            </CButton>
                        </template>
                    </CTooltip>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">G.S.A.</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-check"  class="menuicon"/>

                </CCardBody>
                <CCardFooter class="text-center">
                    <CTooltip content="Generar Solicitud" placement="bottom">
                        <template #toggler="{ id, on }">
                            <CButton :aria-describedby="id" v-on="on" color="success" size="sm" class="font"
                                @click="getListaSolicitud(405, 0, 'Genrar Solicitudes')">
                                Ingresar
                            </CButton>
                        </template>
                    </CTooltip>

                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>

    <!-- Modal  Solicitud -->
    <CModal :visible="modalSolicitud" @close="clickModalSolicitud(false)">
        <CModalHeader class="headercolor" dismiss @close="clickModalSolicitud(false)">
            <CModalTitle>
                <h6>
                    <CIcon icon="cil-calendar" size="lg" class="me-2" />Solicitudes
                </h6>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CInputGroup class="mb-3">
                <CInputGroupText as="label">Gestion </CInputGroupText>
                <CFormSelect v-model="gestion" :model-value="String(gestion)"
                    @update:model-value="gestion = Number($event)" required="true">
                    <option v-for="y in listaGestion" :key="y" :value="y">
                        {{ y }}
                    </option>
                </CFormSelect>
            </CInputGroup>

            <CInputGroup class="mb-3">
                <CInputGroupText as="label">Mes </CInputGroupText>
                <CFormSelect v-model="mes" :model-value="String(mes)" required="true">
                    <option v-for="mes in listaMes" :value="mes.m" :key="mes.m">
                        {{ mes.mes }}
                    </option>
                </CFormSelect>
            </CInputGroup>

        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalSolicitud(false)" color="danger" class="font" size="sm">
                <CIcon icon="cil-x" class="me-2" />Cancelar
            </CButton>
            <CButton @click="getLista()" color="success" class="font" size="sm">
                <CIcon icon="cil-check" class="me-2" />Ver Solicitudes
            </CButton>
        </CModalFooter>
    </CModal>
    <!-- END Modal  Solicitud  -->
</template>

<script>

export default {
    name: 'MenuSolicitudesView',
    components: {

    },
    data() {
        return {
            titulo: 'Solicitudes',
            empleadoService: null,
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
            modalSolicitud: false,
            listaMes: [{ m: "01", mes: "Enero" }, { m: "02", mes: "Febrero" }, { m: "03", mes: "Marzo" }, { m: "04", mes: "Abril" }, { m: "05", mes: "Mayo" }, { m: "06", mes: "Junio" }, { m: "07", mes: "Julio" }, { m: "08", mes: "Agosto" }, { m: "09", mes: "Septiembre" }, { m: "10", mes: "Octubre" }, { m: "11", mes: "Noviembre" }, { m: "12", mes: "Diciembre" }],
            listaGestion: [],
            gestion: 0,
            mes: 0
        }
    },
    beforeCreate() {
        if (this.$cookies.get('cif') == null) {
            this.$router.push('/');
        }
    },
    created() {
    },
    mounted() {
        this.getDatos();
        this.getGestion();
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
                this.usuario.foto = this.$cookies.get("foto");
            }
        },
        getListaSolicitud(estado, idEvento, titulo) {
            var vista = 'ListaSolicitudesUsuarioView';
            if (this.usuario.sigla == 'UTIC' || this.usuario.sigla == 'ADM') {
                vista = 'ListaSolicitudesView';
            }
            this.$router.push({
                name: vista,
                params: {
                    estado: estado,
                    idEvento: idEvento,
                    titulo: titulo
                }
            });
        },
        getLista() {
            var vista = 'SolicitudesUsuarioView';
            if (this.usuario.sigla == 'UTIC' || this.usuario.sigla == 'ADM') {
                vista = 'SolicitudesView';
            }
            this.clickModalSolicitud(false);
            this.$router.push({
                name: vista,
                params: {
                    gestion: this.gestion,
                    mes: this.mes
                }
            });
        },
        clickModalSolicitud(solicitud) {
            this.modalSolicitud = solicitud;
        },
        getGestion() { // funcion que crea una lista de gestiones desde el 2021
            var lgestion = [];
            const fecha = new Date();
            this.obsgestion = fecha.getFullYear();
            for (var i = 2021; i <= this.obsgestion; i++) {
                lgestion.push(i);
            }
            this.listaGestion = lgestion;
        },


    }
}
</script>

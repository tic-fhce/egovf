<template>
    <CRow>
        <CCol :lg="12">
            <CCard>
                <CCardHeader class="headercolor">
                    <CRow>
                        <CCol :lg="12">Modulos Del Empleado</CCol>
                    </CRow>
                </CCardHeader>

                <CCardBody>
                    <CCol :xs="12" class="table-responsive">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td><CBadge color="dark">Tipo : {{ empleado.empleado }}</CBadge></td>
                                    <td><CBadge color="dark">Ingreso : {{ empleado.fecha }}</CBadge></td>
                                    <td><CBadge color="dark">Salida : {{ empleado.salida }}</CBadge></td>
                                    <td>
                                        <CBadge v-if="empleado.estado==1" color="success" >Estado : Activo</CBadge>
                                        <CBadge v-else color="danger">Estado : Inactivo</CBadge>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </CCol>

                    <!-- Modulos del Empleado-->
                    <CCol :xs="12">
                        <CRow>
                            <CCol :lg="2" class="text-center " v-for="l in listaModuloCif" :key="l.id">
                                <br>
                                <CCard>
                                    <CCardImage orientation="top" :src=egovf.foto></CCardImage>
                                    <CCardBody>
                                        {{ l._01nombre }}
                                    </CCardBody>
                                    <CCardFooter class="text-center">
                                        <CButton color="success" class="font">{{ l._01nombre}}</CButton>
                                    </CCardFooter>
                                </CCard>
                            </CCol>    
                        </CRow>
                    </CCol>
                    <!-- End Modulos del Empleado-->
                    
                    <hr>
                    <!-- Contratos del Empleado-->
                    <CCol :xs="12" class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>#</th><th>N° Contrato</th><th>Servicio</th><th>Fechas</th><th>Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="contrato in contratos" :key="contrato.id">
                                    <td>{{ contrato.id }}</td>
                                    <td>
                                        {{ contrato.numeroContrato}}<br>
                                        {{ contrato.unidad }}
                                    </td>
                                    <td>{{ contrato.servicio }}</td>
                                    <td>
                                        <CBadge color="dark">Fecha Inicio: {{ contrato.inicio }}</CBadge>
                                        <CBadge color="dark">Fecha Fin:{{ contrato.fin }}</CBadge>
                                        <CBadge color="dark">Gestion: {{ contrato.gestion }}</CBadge>
                                    </td>
                                    <td>{{ contrato.detalle }}</td>
                                </tr>
                                        
                            </tbody>
                            <tfoot>
                                <tr></tr>
                            </tfoot>
                        </table>
                    </CCol>
                    <!--End Contratos del Empleado-->

                </CCardBody>
            </CCard>
        </CCol>
    </CRow>


</template>

<script>

// Importamos  los Servicios
import EmpleadoService from '@/modules/egovf-emp/services/empleadoService';

// End

export default {
    name: 'ComponenteMEmpVue',
    props: ['emp'],
    components:{
    },
    data() {
        return {
            empleadoService: null,
            listaModulo: [],
            listaModuloCif: [],
            contratos: [],
            getPB: true,
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
            usuario: {
                token: '',
                cif: '',
                correo: '',
                celular: '',
                pass: '',
                unidad: '',
                sigla: ''
            },
            empleado_modulo: {
                cif: 0,
                id_modulo: 0
            },
            egovf: {
                idPersona: 0,
                nombre: '',
                paterno: '',
                materno: '',
                fecha: '',
                sexo: 0,
                idUsuario: 0,
                cif: 0,
                matricula: 0,
                ci: '',
                ci_com: 0,
                complemento: '',
                correo: '',
                celular: '',
                pass: '',
                unidad: '',
                dependiente: '',
                sigla: '',
            }
        };
    },
    beforeCreate() {
        if (this.$cookies.get('cif') == null) {
            this.$router.push('/');
        }
    },
    created() {
        this.empleadoService = new EmpleadoService();
    },
    mounted() {
        this.getDatos();
    },
    updated() {
        this.egovf = this.emp;
        if (this.egovf.cif > 0 && this.getPB) {
            this.getEmpleado();
            this.getListarEmpleadoModuloCif();
            this.getPB = false;
        }
    },
    methods: {
        // Funcion par arecuperar informacion del Usuaario de las Cokkies
        getDatos() {
            if (this.$cookies.get('cif') != null) {
                this.usuario.token = this.$cookies.get('token');
                this.usuario.cif = this.$cookies.get('cif');
                this.usuario.correo = this.$cookies.get('correo');
                this.usuario.celular = this.$cookies.get('celular');
                this.usuario.pass = this.$cookies.get('pass');
                this.usuario.unidad = this.$cookies.get('unidad');
                this.usuario.sigla = this.$cookies.get('sigla');

            }
        },
        //Funcion para listar Los Datos del empleado
        async getEmpleado() {
            await this.empleadoService.getEmpleado(this.egovf.cif).then((response) => {
                this.empleado = response.data;
                this.verificado = this.empleado.id;
                this.contratos = this.empleado.contratos;
            });
        },
        async getListarEmpleadoModuloCif() {// Funcion que lista los Modulos del Empleado
            await this.empleadoService.getListarEmpleadoModuloCif(this.egovf.cif).then((response) => {
                this.listaModuloCif = response.data;
            });
        },
        // Funcion para ingresar a otros modulos del Empleado
        getModulo(ruta) {
            this.$router.push({
                name: ruta,
                params: {
                    cifCiudadano: this.egovf.cif,
                }
            });
        }
    }
}
</script>
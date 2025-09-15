<template>
    <CRow>
        <CCol :lg="3" v-for="tipo in listaTipo" :key="tipo.id">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">{{ tipo.corto }}</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" :icon="tipo.imagen" class="menuicon" />
                </CCardBody>
                <CCardFooter class="text-center">
                    <CTooltip :content="tipo.detalle" placement="bottom">
                        <template #toggler="{ id, on }">
                            <CButton :aria-describedby="id" v-on="on" color="success" size="sm" class="font"
                                @click="getEmpleado(tipo.id, tipo.detalle)">Ingresar</CButton>
                        </template>
                    </CTooltip>
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>

import EmpleadoService from '@/modules/egovf-emp/services/empleadoService';

export default {
    name: 'TipoEmpleadoView',
    components: {

    },
    data() {
        return {
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
            listaTipo: []
        }
    },
    beforeCreate() {
        if (this.$cookies.get('cif') == null) {
            window.location.href = '/';
        }
    },
    created() {
        this.empleadoService = new EmpleadoService();
    },
    mounted() {
        this.getDatos();
        this.getTipoEmpleado();
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
        async getTipoEmpleado() {
            await this.empleadoService.getListaTipoEmpleado().then((response) => {
                this.listaTipo = response.data;
            });
        },
        getEmpleado(id, detalle) {
            this.$router.push({
                name: 'ListaEmpleadoView',
                params: {
                    idEmpleado: id,
                    titulo: detalle
                }
            });
        }
    }
}
</script>

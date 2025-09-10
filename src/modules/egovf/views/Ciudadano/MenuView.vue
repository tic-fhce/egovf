<template>
    <!-- Componente de Datos de la Persona -->
    <ComponenteDatosPersonalesVue :cifCiudadano="cifCiudadano" :egovfp="egovf" />

    <br>
    <CRow>
        <CCol :lg="12">
            <CCard>
                <CCardHeader class="headercolor d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                        <label class="mb-0 fs-6 text-white">{{ titulo }}</label>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <div class="table-responsive">
                        <table id="menuTabla" class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Menu</th>
                                    <th>Tipo</th>
                                    <th>Detalle</th>
                                    <th>Ruta</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="menu in moduloMenu.menuObj" :key="menu.idMenu">
                                    <td>{{ menu.idMenu }}</td>
                                    <td><strong>{{ menu.titulo }}</strong></td>
                                    <td>{{ menu.icono }}</td>
                                    <td>{{ menu.descripcion }}</td>
                                    <td>{{ menu.ruta }}</td>
                                    <td>
                                        <CFormSwitch :checked="check(menu.estado)"
                                            @change="updateMenuUsuario(menu.idMenuUsuario, menu.idMenu, menu.estado)" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>

</template>


<script>
//Importamos Componentes
import ComponenteDatosPersonalesVue from '@/modules/egovf/components/Ciudadano/ComponenteDatosPersonalesVue.vue';

//Importamos Servicios
import EgovfService from '@/modules/egovf/services/egovfService';
import ModuloService from '@/modules/egovf/services/moduloService';
import MenuService from '@/modules/egovf/services/menuService';
//Importamos Herramientas 
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import $ from 'jquery';

DataTable.use(DataTablesLib);

export default {
    name: 'MenuView',
    props: {
        cifCiudadano: { type: [Number, String], required: true },
        idModulo: { type: [Number, String], required: true },
        titulo: { type: String, required: true }
    },
    components: {
        ComponenteDatosPersonalesVue
    },
    data() {
        return {
            egovfService: null,
            moduloService: null,
            menuService: null,
            moduloMenu: {
                id: 0,
                titulo: '',
                icono: '',
                importancia: 0,
                menuObj: []
            },
            listaEmpleado: [],
            modalMenu: false,
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
                foto: ''
            },
            datos: {
                cif: 0,
                nombre: '',
                apellido: ''
            },
            menuUsuario: {
                id: 0,
                cif: 0,
                idMenu: 0,
                estado: 0
            }
        }
    },
    beforeCreate() {
        if (this.$cookies.get('cif') == null) {
            this.$router.push('/');
        }
    },
    created() {
        this.egovfService = new EgovfService();
        this.moduloService = new ModuloService();
        this.menuService = new MenuService();
    },
    mounted() {
        this.getDatos(); // Llamamos los datos del Usuario
        this.getEgovf(); //llamamos los datos del ciudadano
        this.getModuloMenu(); // Funcion que debuelve una lista de ciudadanos 
    },
    methods: {
        tabla() {
            this.$nextTick(() => {
                $('#menuTabla').DataTable();
            });
        },
        getDatos() {// Funcion que guarda los datos del Usuario en la View
            if (this.$cookies.get('cif') != null) {
                this.usuario.token = this.$cookies.get('token');
                this.usuario.cif = this.$cookies.get('cif');
                this.usuario.correo = this.$cookies.get('correo');
                this.usuario.celular = this.$cookies.get('celular');
                this.usuario.pass = this.$cookies.get('pass');
                this.usuario.unidad = this.$cookies.get('unidad');
                this.usuario.sigla = this.$cookies.get('sigla');
                this.usuario.foto = this.$cookies.get("foto");
                this.egovfService.headersUsuario(this.usuario.token);
                this.moduloService.headersUsuario(this.usuario.token);
                this.menuService.headersUsuario(this.usuario.token);
            }
        },
        async getEgovf() {//Funcion que debuelve los datos del ciudadano 
            await this.egovfService.getEgovf(this.cifCiudadano).then((response) => {
                this.egovf = response.data;
                this.datos.cif = this.egovf.cif;
                this.datos.nombre = this.egovf.nombre;
                this.datos.apellido = this.egovf.paterno + " " + this.egovf.materno;
            });
        },
        async getModuloMenu() { // Funcion que muestra el menu del modulo para los usuarios 
            await this.moduloService.getModuloMenu(this.cifCiudadano, this.idModulo).then(response => {
                this.moduloMenu = response.data;
            });
        },
        async updateMenuUsuario(idMenuUsuario, idMenu, estado) {
            this.menuUsuario.id = idMenuUsuario;
            this.menuUsuario.cif = this.cifCiudadano;
            this.menuUsuario.idMenu = idMenu;
            if (estado == 1) {
                this.menuUsuario.estado = 0;
            }
            else this.menuUsuario.estado = 1;

            await this.$swal.fire({
                title: "Desea Activar el Menu para el Ciudadano ?",
                showDenyButton: true,
                icon: "info",
                confirmButtonText: "Aceptar",
                denyButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.menuService.updateMenuUsuario(this.menuUsuario).then((response) => {
                        if (response.status == 200) {
                            this.$swal.fire("El Menu fue Activado Correctamente", "", "success").then((res) => {
                                if (res) location.reload();
                            });
                        } else {
                            this.$swal.fire("Los Datos no fueron Guardados Error" + response.status, "", "error");
                        }
                    });
                } else if (result.isDenied) {
                    this.$swal.fire("Datos Cancelados", "", "info");
                }
            });
        },
        check(estado) {
            if (estado == 1) {
                return true;
            }
            else return false;
        }
    },


}

</script>
<style scoped>
@import 'datatables.net-dt';
</style>
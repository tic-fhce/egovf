<template>
    <CRow>
        <!--Card para los Menus-->
        <CCol :lg="3" v-for="menu in listaMenu" :key="menu.id">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">{{menu.titulo}}</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" :icon="menu.icono" class="menuicon" />
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" @click="getMenu(menu.nombre,menu.titulo)" size="sm">Ingresar
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>

</template>

<script>
export default {
    name: 'MenuMsccView',
    components: {
    },
    data() {
        return {
            listaMenu: [
                {
                    id:1,
                    titulo: "Observaciones",
                    nombre: "MenuObsView",
                    icono: "cil-low-vision" // Agregar icono para mejor UI
                },
                {
                    id:2,
                    titulo: "Empleados",
                    nombre: "TipoEmpleadoView",
                    icono: "cil-group"
                },
                {
                    id:3,
                    titulo: "Aviso",
                    nombre: "AvisoView",
                    icono: "cil-bullhorn"
                }
            ],
            usuario: {...this.$models.usuarioModel}
        }
    },
    created() {
    },
    mounted() {
        this.getDatos();
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
        getMenu(nombre, titulo) {//Funcion que ingresa a los Menus de las opciones del Modulo
            this.$router.push({
                name: nombre,
                params: {
                    titulo: titulo
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
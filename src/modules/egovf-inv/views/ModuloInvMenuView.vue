<template>
    <CRow>
        <CCol :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">AT-UTIC</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-settings" class="menuicon"/> 
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" @click="getOpciones(direcciones[1])">Ingresar</CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">CPU's</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-screen-smartphone" class="menuicon"/> 
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" @click="getOpciones(direcciones[1])">Ingresar</CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">Monitores</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-monitor" class="menuicon"/> 
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" @click="getOpciones(direcciones[1])">Ingresar</CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">Impresoras</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-print" class="menuicon"/> 
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" @click="getOpciones(direcciones[1])">Ingresar</CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">Telefonos</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-rss" class="menuicon"/> 
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" @click="getOpciones(direcciones[1])">Ingresar</CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">Ubicaciones</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-pin" class="menuicon"/> 
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" @click="getOpciones(direcciones[1])">Ingresar</CButton>
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>
</template>
<script>
export default {
    name:'ModuloInvMenuView',
    components:{
    },
    data(){
        return {
            direcciones:["/at-tic","/cpu","/monitores","/impresora","/telefono","/ubicacion"]
        }
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
                this.usuario.unidad = this.$cookies.get('unidad');
                this.usuario.sigla = this.$cookies.get('sigla');
                this.usuario.foto = this.$cookies.get('foto');
            }
        },
        getOpciones(direccion){
            this.$router.push(direccion);
        },
    }
}
</script>
<style scoped>
.menuicon {
    width: 100px;  /* Ajusta el tamaño según necesites */
    height: 100px;
}
</style>
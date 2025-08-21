<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb custom-breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">
            {{titulo}} >
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
                    <h6>Solicitudes Aprobadas</h6>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" @click="getListaSolicitud(1,0,'Solicitudes Aprobadas')">Ingresar</CButton>
                </CCardFooter>
            </CCard>
        </CCol> 

        <CCol :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">L.S.E.E.</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-clipboard" class="menuicon"/> 
                    <h6>Solicitudes En Espera</h6>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" @click="getListaSolicitud(0,0,'Solicitudes En Espera')">Ingresar</CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">L.S.R.</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-trash" class="menuicon"/> 
                    <h6>Solicitudes Rechazadas</h6>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" @click="getListaSolicitud(2,0,'Solicitudes Rechazadas')">Ingresar</CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">L.T.S.</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-code" class="menuicon"/> 
                    <h6>Todas las Solicitudes</h6>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" @click="getListaSolicitud(1,0,'Todas las Solicitudes')">Ingresar</CButton>
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>

export default {
    name:'MenuSolicitudesView',
    components:{
        
    },
    data(){
        return {
            titulo:'Solicitudes',
            empleadoService:null,
            usuario:{
                token:'',
                cif:'',
                correo:'',
                celular:'',
                pass:'',
                unidad:'',
                sigla:'',
                foto:''
            }
        }
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
    },
    mounted(){
        this.getDatos();
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
                this.usuario.foto = this.$cookies.get("foto");
            }
        },
        getListaSolicitud(estado,idEvento,titulo){
            this.$router.push({
                name: 'ListaSolicitudesView',
                params: {
                    estado: estado,
                    idEvento: idEvento,
                    titulo:titulo
                }
            });
        }
    }
}
</script>

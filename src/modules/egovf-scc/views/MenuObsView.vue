<template>
    <CRow>
        <!--Card para observaciones Aprobadas-->
        <CCol :lg="3">
        <br />
            <CCard>
                <CCardHeader class="headercolor text-center">Observaciones</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-check" class="menuicon"/> 
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" size="sm" class="font" @click="clickModalObs(true)">Ingresar</CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <!--Card para observaciones Pendientes-->
        <CCol :lg="3">
        <br />
            <CCard>
                <CCardHeader class="headercolor text-center">Solicitud de Obs.</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-folder-open" class="menuicon"/> 
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" size="sm" @click="obsUsuario()">Ingresar</CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <!--Card para observaciones Eliminadas-->
        <CCol :lg="3">
        <br />
            <CCard>
                <CCardHeader class="headercolor text-center">Obs Eliminadas</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-flip-to-back" class="menuicon"/> 
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" size="sm" @click="obsEliminado()">Ingresar</CButton>
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>

<!-- Observaciones de Gestion-->
<CModal :visible="modalObs" @close="clickModalObs(false)">
    <CForm @submit.prevent="obsLista()">
        <CModalHeader class="headercolor" dismiss @close="clickModalObs(false)">
            <CModalTitle>
                <h6><CIcon icon="cil-featured-playlist"/> Observaciones</h6>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>

            <CInputGroup class="mb-3">
                <CInputGroupText  as="label">Gestion </CInputGroupText>
                <CFormSelect v-model="gestion" :model-value="String(gestion)" @update:model-value="gestion = Number($event)" required="true">
                    <option v-for="y in listaGestion" :key="y" :value="y">{{ y }}</option>
                </CFormSelect>
            </CInputGroup>
            
        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalObs(false)" color="danger" size="sm" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
            <CButton type="submit" class="font" color="success" size="sm"><CIcon icon="cil-file" class="me-2"/>Ver Lista de Observaciones</CButton>
        </CModalFooter>
    </CForm>
</CModal>
<!-- Observaciones de Gestion-->

</template>
<script>

export default {
  name: "MenuObsView",
  components: {},
  data() {
    return {
        listaGestion:[],
        modalObs:false,
        gestion:0,
        usuario: {
            token: "",
            cif: "",
            correo: "",
            celular: "",
            pass: "",
            unidad: "",
            sigla: "",
            foto:""
        },
    };
  },
  beforeCreate() {
    if (this.$cookies.get("cif") == null) {
      this.$router.push("/");
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
      //Cargamos datos del Usuario
      if (this.$cookies.get("cif") != null) {
        this.usuario.token = this.$cookies.get("token");
        this.usuario.cif = this.$cookies.get("cif");
        this.usuario.correo = this.$cookies.get("correo");
        this.usuario.celular = this.$cookies.get("celular");
        this.usuario.pass = this.$cookies.get("pass");
        this.usuario.unidad = this.$cookies.get("unidad");
        this.usuario.sigla = this.$cookies.get("sigla");
        this.usuario.foto = this.$cookies.get("foto");
      }
    },
    clickModalObs(obs){
        this.modalObs = obs;
    },
    getGestion(){ // funcion que crea una lista de gestiones desde el 2021
        var lgestion=[];
        const fecha = new Date();
        this.obsgestion = fecha.getFullYear();
        for(var i=2021; i<= this.obsgestion; i++){
            lgestion.push(i);
        }
        this.listaGestion = lgestion;
    },
    obsLista() {
        this.clickModalObs(false);
      this.$router.push({
        name: "ListaObservacionesView",
        params: {
            gestion:this.gestion
        },
      });
    },
    obsUsuario(){
        this.$router.push("/obsModuloScc");
    },
    obsEliminado(){
        this.$router.push("/obsEliminado");
    }
  },
};
</script>
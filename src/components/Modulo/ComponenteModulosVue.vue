<template>
    <CRow>
        <CCol :lg="12">
            <CCard>
                <CCardHeader class="headercolor">
                    <CRow>
                        <CCol :lg="6">Modulos Del Ciudadano</CCol>
                        <CCol :lg="6" class="text-end">
                          <CButton @click="clickModalModulo(true)" color="success" class="font" size="sm"><CIcon icon="cil-cloud-upload" class="me-2"/>Agregar</CButton>  
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol :lg="3" v-for="l in listaModuloCif" :key="l.id">
                            <br>
                            <CCard>
                                <CCardImage orientation="top" :src=egovf.foto></CCardImage>
                                <CCardBody>
                                    <CCardTitle>{{ l._01nombre }}</CCardTitle>
                                </CCardBody>
                                <CCardFooter class="text-center">
                                    <CButton color="success" class="font" @click="getModulo(l._02ruta)">{{ l._01nombre}}</CButton>
                                </CCardFooter>
                            </CCard>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>

<!-- Modal  MOdulo-->
<CModal :visible="modalModulo" @close="clickModalModulo(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalModulo(false)">
        <CModalTitle>
            <h5>Agregar Modulos</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        
        <div class="mb-3 row">
            <h4 class="card-title">CIF : {{egovf.cif}}</h4>
        </div>
        <div class="mb-3 row">
            <label for="nombre" class="col-4">Nombre : </label>
            <label for="nombre" class="col-8">{{egovf.nombre}}</label>
        </div>
        <div class="mb-3 row">
            <label for="apellido" class="col-4">Apellidos : </label>
            <label for="nombre" class="col-8">{{egovf.paterno}} {{egovf.materno}}</label>
        </div>
        <hr>
        <div class="mb-3 row">
            <label for="datos" class="col-sm-6 col-form-label">Modulo</label>
            <div class="col-sm-6">
                <select v-model="id_modulo" class="form-control">
                    <option v-for="lm in listaModulo" :value="lm.id" :key="lm.id">{{lm._01nombre}}</option>
                </select>
            </div>
        </div>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalModulo(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
        <CButton @click="addModulo()" color="success" class="font"><CIcon icon="cil-check-alt" class="me-2"/>Agregar</CButton>
    </CModalFooter>
</CModal>
<!-- End Modal  Modulo-->

</template>

<script>
import ModuloService from '@/services/moduloService';

export default {
    name:'ComponenteModulosVue',
    props:['cif','egovf'],
    data(){
        return{
            modalModulo:false,
            moduloService:null,
            listaModulo:[],
            listaModuloCif:[],
            id_modulo:0,
            getPB:true,
            usuario:{
                token:'',
                cif:'',
                correo:'',
                celular:'',
                pass:'',
                unidad:'',
                sigla:''
            },
            modulo:{
                cif:0,
                idmodulo:0
            }
        };
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
        this.moduloService = new ModuloService();
    },
    mounted(){
        this.getDatos();
        this.getListaModuloAll();
    },
    updated(){
        if(this.cif>0 && this.getPB)
        {
            this.getListarModuloCif();
            this.getPB=false;
        }
    },
    methods:{
        getDatos(){
            if(this.$cookies.get('cif')!=null){
                this.usuario.token=this.$cookies.get('token');
                this.usuario.cif=this.$cookies.get('cif');
                this.usuario.correo=this.$cookies.get('correo');
                this.usuario.celular=this.$cookies.get('celular');
                this.usuario.pass=this.$cookies.get('pass');
                this.usuario.unidad = this.$cookies.get('unidad');
                this.usuario.sigla = this.$cookies.get('sigla');
                
                this.moduloService.headersUsuario(this.usuario.token);
            }
        },
        async getListaModuloAll(){
            await this.moduloService.getListaModulo().then((response)=>{
                this.listaModulo=response.data;
            });
        },
        async getListarModuloCif(){
            await this.moduloService.getListarModuloCif(this.cif).then((response)=>{
                this.listaModuloCif=response.data;
            });
        },
        async addModulo(){
            this.modulo.cif=this.cif;
            this.modulo.idmodulo=this.id_modulo;
            await this.$swal.fire({
                title: 'Desea Agregar el Modulo al Ciudadano ?',
                showDenyButton: true,
                icon:'info',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.moduloService.addModulo(this.modulo).then(response=>{
                        if(response.status==200){
                            this.$swal.fire('El Modulo fue Agregado al Ciudadano Corectamente', '', 'success').then((res)=>{
                                if(res)
                                    location.reload();
                            });
                        }
                        else{
                            this.$swal.fire('Los Datos no fueron Guardados Error'+ response.status, '', 'error');
                        }
                    });           
                } else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });
        },
        getModulo(ruta){
            this.$router.push({
                name: ruta,
                params:{
                    cifCiudadano: this.cif,
                }
            });
        },
        clickModalModulo(modal) {
            this.modalModulo = modal;
        }
    }
}
</script>
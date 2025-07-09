<template>
    <CRow>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb custom-breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">
                {{titulo}} >
                </li>
            </ol>
        </nav>
        <!--Card para observaciones-->
        <CCol :lg="3">
        <br />
        <CCard>
            <CCardHeader class="headercolor text-center">Observaciones</CCardHeader>
            <CCardBody class="text-center">
                <CIcon customClassName="nav-icon" icon="cil-featured-playlist" class="menuicon"/> 
            </CCardBody>
            <CCardFooter class="text-center">
                <CButton color="success" class="font" @click="getOpciones(direcciones[0])">Ingresar</CButton>
            </CCardFooter>
        </CCard>
        </CCol>

        <!--Card para reporte mensual-->
        <CCol :lg="3">
        <br />
        <CCard>
            <CCardHeader class="headercolor text-center">Reporte Mensual</CCardHeader>
            <CCardBody class="text-center">
                <CIcon customClassName="nav-icon" icon="cil-clipboard" class="menuicon"/> 
            </CCardBody>
            <CCardFooter class="text-center">
                <CButton color="success" class="font" @click="clickModalMes(true)">Ingresar</CButton>
            </CCardFooter>
        </CCard>
        </CCol>

        <!--Card para reporte segmentado-->
        <CCol :lg="3">
        <br />
        <CCard>
            <CCardHeader class="headercolor text-center">R. Segmentado</CCardHeader>
            <CCardBody class="text-center">
                <CIcon customClassName="nav-icon" icon="cil-clipboard" class="menuicon"/> 
            </CCardBody>
            <CCardFooter class="text-center">
                <CButton color="success" class="font" @click="clickModalDias(true)">Ingresar</CButton>
            </CCardFooter>
        </CCard>
        </CCol>
    
        <!--Card para reporte Datos del biometricos-->
        <CCol :lg="3">
        <br />
        <CCard>
            <CCardHeader class="headercolor text-center">Biometricos</CCardHeader>
            <CCardBody class="text-center">
                <CIcon customClassName="nav-icon" icon="cil-monitor" class="menuicon"/> 
            </CCardBody>
            <CCardFooter class="text-center">
                <CButton color="success" class="font" @click="getOpciones(direcciones[1])">Ingresar</CButton>
            </CCardFooter>
        </CCard>
        </CCol>

        <!--Card para reporte Datos del Horarios-->
        <CCol :lg="3">
        <br />
        <CCard>
            <CCardHeader class="headercolor text-center">Horarios</CCardHeader>
            <CCardBody class="text-center">
                <CIcon customClassName="nav-icon" icon="cil-calendar" class="menuicon"/> 
            </CCardBody>
            <CCardFooter class="text-center">
                <CButton color="success" class="font" @click="getOpciones(direcciones[2])">Ingresar</CButton>
            </CCardFooter>
        </CCard>
        </CCol>
    </CRow>

<!-- Modal Reporte Mensual-->
<CModal :visible="modalMes" @close="clickModalMes(false)">
    <form @submit.prevent="getReporteMes()">
        <CModalHeader class="headercolor" dismiss @close="clickModalMes(false)">
            <CModalTitle>
                <h5>Reporte Mensual</h5>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>

            <div class="mb-3 row">
                <label for="gestion" class="col-6 col-form-label">Gestion :</label>
                <div class="col-6">
                    <select v-model="reporteMes.gestion" class="form-control" required="true">
                        <option v-for="y  in listaGestion" :key="y" :value="y">{{y}}</option>
                    </select>
                </div>
            </div>
            <br>
            <div class="mb-3 row">
                <label for="mes" class="col-6 col-form-label">Mes :</label>
                <div class="col-6">
                    <select v-model="reporteMes.mes" class="form-control" required="true">
                        <option v-for = "mes in listaMes" :key = "mes" :value = "mes.m">{{ mes.mes }}</option>
                    </select>
                </div>
            </div>
            
        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalMes(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
            <button class="btn btn-success font" ><CIcon icon="cil-file" class="me-2"/>Ver Reporte</button>
        </CModalFooter>
    </form>
</CModal>
<!-- End Modal Reporte Mensual-->

<!-- Modal Reporte Mensual Segmentado-->
<CModal :visible="modalDias" @close="clickModalDias(false)">
    <form @submit.prevent="getReporteMes()">
        <CModalHeader class="headercolor" dismiss @close="clickModalDias(false)">
            <CModalTitle>
                <h5>Reporte Mensual Segmentado</h5>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <div class="mb-3 row">
                <label for="gestion" class="col-6 col-form-label">Gestion :</label>
                <div class="col-6">
                    <select v-model="reporteMes.gestion" class="form-control" required="true">
                        <option v-for="y  in listaGestion" :key="y" :value="y">{{y}}</option>
                    </select>
                </div>
            </div>
            <br>
            <div class="mb-3 row">
                <label for="mes" class="col-6 col-form-label">Mes :</label>
                <div class="col-6">
                    <select v-model="reporteMes.mes" class="form-control" required="true">
                        <option v-for = "mes in listaMes" :key = "mes" :value = "mes.m">{{ mes.mes }}</option>
                    </select>
                </div>
            </div>
            <br>
            <div class="mb-3 row">
                <label for="inicio" class="col-6 col-form-label">Inicio :</label>
                <div class="col-6">
                    <select  class="form-control" v-model="reporteMes.di" required="true">
                        <option v-for="i=1 in 31" :key="i" :value="i">{{i}}</option>
                    </select>
                </div>
            </div>
            <br>
            <div class="mb-3 row">
                <label for="fin" class="col-6 col-form-label">Fin :</label>
                <div class="col-6">
                    <select  class="form-control" v-model="reporteMes.df" required="true">
                        <option v-for="j=1 in 31" :key="j" :value="j">{{j}}</option>
                    </select>
                </div>
            </div>

        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalDias(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
            <button class="btn btn-success font" ><CIcon icon="cil-file" class="me-2"/>Ver Reporte</button>
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
    name:'ModuloSccMenuView',
    components:{
    },
    data(){
        return {
            titulo:'Modulo M-SCC',
            sccService:null,
            egovfService:null,
            empleadoService:null,
            cifCiudadano:'',
            modalMes:false,
            modalDias:false,
            listaGestion:[],
            listaMes:[{m:"01",mes:"Enero"},{m:"02",mes:"Febrero"},{m:"03",mes:"Marzo"},{m:"04",mes:"Abril"},{m:"05",mes:"Mayo"},{m:"06",mes:"Junio"},{m:"07",mes:"Julio"},{m:"08",mes:"Agosto"},{m:"09",mes:"Septiembre"},{m:"10",mes:"Octubre"},{m:"11",mes:"Noviembre"},{m:"12",mes:"Diciembre"}],
            usuario:{
                token:'',
                cif:'',
                correo:'',
                celular:'',
                pass:'',
                unidad:'',
                sigla:'',
                foto:''
            }, 
            empleado:{
                id:0,
                cif:0,
                empleado:'',
                tipoempleado_id:0,
                fecha:'',
                estado:0,
                salida:'',
                contratos:[]
            },
            direcciones:["/observaciones","/biometricos","/horarios"],
            reporteMes:{
                cif:'',
                gestion:0,
                mes:1,
                di:0,
                df:0,
            },
        }
    },
    created(){
        //Creamos los Sercicios
        this.sccService = new SccService();
        this.uploadService = new UploadService();
        this.getAbiso();
    },
    mounted(){
        this.cifCiudadano = this.$cookies.get('cif');
        this.getDatos();
        this. getGestion();
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
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
        getGestion(){ // funcion que crea una lista de gestiones desde el 2021
            var lgestion=[];
            const fecha = new Date();
            this.obsgestion = fecha.getFullYear();
            for(var i=2021; i<= this.obsgestion; i++){
                lgestion.push(i);
            }
            this.listaGestion = lgestion;
        },
        async getAbiso(){
            const steps = [];
            var x = 0;
            var c = 0;
            await this.sccService.getAviso().then(response=>{
                this.listaAviso = response.data;
            });
            this.listaAviso.forEach(aviso => {
                steps.push(x+1);
                x = x+1;
                c = aviso.id;
            });
            
            const Queue = this.$swal.mixin({
                progressSteps: steps,
                confirmButtonText: 'Siguiente >',
                // optional classes to avoid backdrop blinking between steps
                showClass: { backdrop: 'swal2-noanimation' },
                hideClass: { backdrop: 'swal2-noanimation' },
            })
            ;(async () => {
                if(this.listaAviso.length>0){
                    x = 0;
                    c = c +1;
                    while (x < this.listaAviso.length){
                        await Queue.fire({
                            title: this.listaAviso[x].titulo,
                            icon: this.listaAviso[x].icon,
                            text: this.listaAviso[x].detalle,
                            currentProgressStep: x,
                        })
                        x = x+1;
                    }
                }
            })()
        },
        getOpciones(direccion){
            this.$router.push(direccion);
        },
        clickModalMes(rmes){
            if(this.usuario.foto =='https://fhcevirtual.umsa.bo/egovf-img/imagenes/user.png')
                this.getFotoPerfil();
            else
                this.modalMes = rmes;
        },
        clickModalDias(dias){
            if(this.usuario.foto =='https://fhcevirtual.umsa.bo/egovf-img/imagenes/user.png')
                this.getFotoPerfil();
            else
                this.modalDias = dias;
        },
        getFotoPerfil(){ //Funcion que verifica su foto de perfil
            this.$swal.fire({
                title: 'Para obtener tu Reporte Debes de cambiar tu foto de perfil',
                showDenyButton: true,
                icon:'info',
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
        getReporteMes(){//Funcion que muestra los Reportes de Usuario
            this.clickModalMes(false);
            this.clickModalDias(false);
            this.reporteMes.cif = this.usuario.cif;
            if(this.reporteMes.di<10){
                this.reporteMes.di='0'+this.reporteMes.di;
            }
            if(this.reporteMes.df<10){
                this.reporteMes.df='0'+this.reporteMes.df;
            }
            this.$router.push({
                name: "UsuarioReporteView",
                params:{
                    uri:this.reporteMes.cif+'j'+this.reporteMes.gestion+'m'+this.reporteMes.mes+'m'+this.reporteMes.di+'k'+this.reporteMes.df
                }
            });
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
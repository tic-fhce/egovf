<template>

    <CRow>
        <CCol :lg="12">
            <CCard>
                <CCardHeader class="headercolor">
                    <CRow>
                        <CCol :lg="6"><label class="d-none d-md-flex me-auto">Modulo INV</label></CCol>
                        <CCol :lg="6" class="text-end">
                            <CButtonGroup role="group">
                                <CDropdown variant="btn-group">
                                    <CDropdownToggle  color="success" class="font" size="sm"><CIcon icon="cil-menu" class="me-2"/>Opciones</CDropdownToggle>
                                    <CDropdownMenu>
                                        <CDropdownItem><CButton @click="clickModalAt(true)" size="sm">Solicitud de Servicio</CButton></CDropdownItem>                                        
                                    </CDropdownMenu>
                                </CDropdown>
                            </CButtonGroup>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <CNav variant="tabs">
                        <CNavItem><CNavLink :active="tabInv == 1" @click="clicktabInv(1)" ><CButton size="sm"><CIcon icon="cil-settings"></CIcon><label class="d-none d-md-flex me-auto">AT-UTIC</label></CButton></CNavLink></CNavItem>
                        <CNavItem><CNavLink :active="tabInv == 2" @click="clicktabInv(2)" ><CButton size="sm"><CIcon icon="cil-screen-smartphone"></CIcon><label class="d-none d-md-flex me-auto">CPU's</label></CButton></CNavLink></CNavItem>
                        <CNavItem><CNavLink :active="tabInv == 3" @click="clicktabInv(3)" ><CButton size="sm"><CIcon icon="cil-monitor"></CIcon><label class="d-none d-md-flex me-auto">Monitores</label></CButton></CNavLink></CNavItem>
                        <CNavItem><CNavLink :active="tabInv == 4" @click="clicktabInv(4)" ><CButton size="sm"><CIcon icon="cil-print"></CIcon><label class="d-none d-md-flex me-auto">Impresoras</label></CButton></CNavLink></CNavItem>
                        <CNavItem><CNavLink :active="tabInv == 5" @click="clicktabInv(5)" ><CButton size="sm"><CIcon icon="cil-rss"></CIcon><label class="d-none d-md-flex me-auto">Telefonos</label></CButton></CNavLink></CNavItem>
                        <CNavItem><CNavLink :active="tabInv == 6" @click="clicktabInv(6)" ><CButton size="sm"><CIcon icon="cil-pin"></CIcon><label class="d-none d-md-flex me-auto">Ubicaciones</label></CButton></CNavLink></CNavItem>
                    </CNav>

                    <CTabContent>

                        <!--Lista de CPU del Empleado-->
                        <CTabPane :visible="tabInv == 1">
                            <CRow>
                                <CCol :lg="12" class="table-responsive">
                                    <table id="atTabla" class="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th><th>Foto</th><th>CIF</th><th>Datos</th><th>Contacto</th><th>Unidad</th><th>Operaciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                        </tbody>
                                    </table>
                                </CCol>
                            </CRow>
                        </CTabPane>
                        <!-- End Lista de CPU del Empleado-->

                        <!--Lista de CPU del Empleado-->
                        <CTabPane :visible="tabInv == 2">
                            <CRow>
                                <CCol :lg="12">
                                    <br>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th><th>Codigo</th><th>Caracteristicas</th><th>Red</th><th>Datos Actividad</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="cpu in listaCpu" :key="cpu.idPc">
                                                <td>{{ cpu.idPc }}</td>
                                                <td>{{cpu.codigo}}</td>
                                                <td>
                                                    Sistema : {{ cpu.sistema }} <br>
                                                    RAM : {{cpu.capacidad}} - {{ cpu.memorias }}<br>
                                                    Micro Procesador : {{ cpu.micro }} de {{ cpu.micro_capacidad }}<br>
                                                    Capasidad Disco : {{ cpu.disco }}<br>
                                                    Tipo : {{ cpu.detalle }}<br>
                                                    Fuente Pw : {{cpu.fuente  }}<br>
                                                    Cortapico : {{ cpu.cortapico }} 
                                                </td>
                                                <td>
                                                    Ip : {{ cpu.ip }}<br>
                                                    Mascara : {{ cpu.dns }}<br>
                                                    Segmento : {{ cpu.segmento }}<br>
                                                    Mac : {{ cpu.mac }}<br>
                                                    Switch : {{cpu.swit}}<br>
                                                    Puerto : {{ cpu.puerto }}<br>
                                                    Vlan : {{ cpu.vlan }} 
                                                </td>
                                                <td>
                                                    Fehca de Adicion : {{ cpu.fecha_add }}<br>Fecha de Traspaso : {{ cpu.fecha_del }}<br>Estado : <CBadge color="success" v-if="cpu.estado == 1">Activo</CBadge><CBadge color="danger" v-else>Inactivo</CBadge>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table> 
                                </CCol>
                            </CRow>
                        </CTabPane>
                        <!-- End Lista de CPU del Empleado-->

                        <!--Lista de Monitores del Empleado-->
                        <CTabPane :visible="tabInv == 3">
                            <CRow>
                                <CCol :lg="12">
                                    <br>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th><th>Codigo</th><th>Datos Monitor</th><th>Datos Actividad</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="monitor in listaMonitor" :key="monitor.idMonitor">
                                                <td>{{ monitor.idMonitor }}</td>
                                                <td>{{ monitor.codigo }}</td>
                                                <td>Marca : {{ monitor.marca }}<br>Pulgadas : {{ monitor.pulgadas }}<br> Tipo : {{ monitor.tipo }}</td>
                                                <td>Fehca de Adicion : {{ monitor.fecha_add }}<br>Fecha de Traspaso : {{ monitor.fecha_del }}<br>Estado : <CBadge color="success" v-if="monitor.estado == 1">Activo</CBadge><CBadge color="danger" v-else>Inactivo</CBadge></td>
                                            </tr>
                                        </tbody>
                                    </table> 
                                </CCol>
                            </CRow>
                        </CTabPane>
                        <!--End Lista de Monitores del Empleado-->

                        <!--Lista de Impresoras del Empleado-->
                        <CTabPane :visible="tabInv == 4">
                            <CRow>
                                <CCol :lg="12">
                                    <br>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th><th>Codigo</th><th>Datos Impresora</th><th>Datos Actividad</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="impresora in listaImpresora" :key="impresora.idImpresora">
                                                <td>{{ impresora.idImpresora }}</td>
                                                <td>{{ impresora.codigo }}</td>
                                                <td>Marca : {{ impresora.marca }}<br>Modelo : {{ impresora.modelo }}<br>Detalle : {{ impresora.detalle }}</td>
                                                <td>Fehca de Adicion : {{ impresora.fecha_add }}<br>Fecha de Traspaso : {{ impresora.fecha_del }}<br>Estado : <CBadge color="success" v-if="impresora.estado == 1">Activo</CBadge><CBadge color="danger" v-else>Inactivo</CBadge></td>
                                            </tr>
                                        </tbody>
                                    </table> 
                                </CCol>
                            </CRow>
                        </CTabPane>
                        <!--End Lista de Impresoras del Empleado-->

                        <!--Lista de Telefono del Empleado-->
                        <CTabPane :visible="tabInv == 5">
                            <CRow>
                                <CCol :lg="12">
                                    <br>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th><th>Codigo</th><th>Datos Telefono</th><th>Datos Actividad</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="telefono in listaTelefono" :key="telefono.idTelefono">
                                                <td>{{ telefono.idTelefono }}</td>
                                                <td>{{ telefono.codigo }}</td>
                                                <td>Marca : {{ telefono.marca }}<br>Ip : {{ telefono.ip }}<br>Interno : {{ telefono.interno }}</td>
                                                <td>Fehca de Adicion : {{ telefono.fecha_add }}<br>Fecha de Traspaso : {{ telefono.fecha_del }}<br>Estado : <CBadge color="success" v-if="telefono.estado == 1">Activo</CBadge><CBadge color="danger" v-else>Inactivo</CBadge></td>
                                            </tr>
                                        </tbody>
                                    </table> 
                                </CCol>
                            </CRow>
                        </CTabPane>
                        <!--End Lista de Telefonos del Empleado-->
                        
                        <!--Lista de Ubicaciones del Empleado-->
                        <CTabPane :visible="tabInv == 6">
                            <CRow>
                                <CCol :lg="12">
                                    <br>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th><th>Ambiente</th><th>Ubicaion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="ubicacion in listaUbicacion" :key="ubicacion.id">
                                                <td>{{ ubicacion.id }}</td>
                                                <td>{{ ubicacion._02ambiente }}</td>
                                                <td>Latitud: {{ ubicacion._03latitud }}<br>Longitud: {{ ubicacion._04longitud }}</td>
                                            </tr>
                                        </tbody>
                                    </table> 
                                </CCol>
                            </CRow>
                        </CTabPane>
                        <!-- End Lista de Ubicaciones del Empleado-->
                    </CTabContent>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>

<!-- Modal  AT -->
<CModal :visible="modalAt" @close="clickModalAt(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalAt(false)">
        <CModalTitle>
            <h5>Solicitud de Asistencia Tecnica</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos" />
        <CRow>
            <CCol :lg="12">
                <form action="">
                    <div class="mb-3 row">
                        <label for="tipo" class="col-sm-4 col-form-label">Revicion a :</label>
                        <div class="col-sm-8">
                            <select class="form-control" v-model="asistencia.tipo" required="true" @change="getCodigo()">
                                <option v-for="tipo in listaTipo" :key="tipo.id" :value="tipo.id">{{ tipo._01sigla }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="codigo" class="col-sm-4 col-form-label">Codigo :</label>
                        <div class="col-sm-8">
                            <select class="form-control" v-model="asistencia.codigo" required="true">
                                <option v-for="pertenece in lpertenece" :key="pertenece.id"  :value="pertenece.codigo">{{ pertenece.codigo }}</option>
                            </select>
                        </div>
                    </div>
                    <hr> 

                    <div class="mb-3 row text-center" >
                        <div class="col-sm-12 ">
                            <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Solicitar Asistencia Tecnica</button>
                        </div>
                    </div>
                </form>
            </CCol>
        </CRow>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalAt(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
    </CModalFooter>
</CModal>
<!-- END Modal  AT-->

</template>

<script>
// Importamos Componentes
import ComponenteNombres from '@/components/Ciudadano/ComponenteNombres.vue';
//Importamos Servicios
import InventarioService from '@/services/inv/inventarioService';

import UploadService from '@/services/upload/uploadService';

export default {
    name:'ComponenteMInvVue',
    props:['mscc','empleado'],
    components:{
        ComponenteNombres
    },
    data(){
        return{
            tabInv:1,
            modalAt:false,
            modalBiometrico:false,
            modalHorario:false,
            modalObs:false,
            modalObsEditar:false,
            modalMes:false,
            modalDias:false,
            
            uploadService:null,
            inventarioService:null,
            listaUbicacion:[],
            listaCpu:[],
            listaMonitor:[],
            listaImpresora:[],
            listaTelefono:[],
            listaTipo:[],
            listaPertenece:[],
            lpertenece:[],

            getPB:true,

            archivo:'',
            egovf:{
                idPersona:0,
                nombre:'',
                paterno:'',
                materno:'',
                fecha:'',
                sexo:0,
                idUsuario:0,
                cif:0,
                matricula:0,
                ci:'',
                ci_com:0,
                complemento:'',
                correo:'',
                celular:'',
                pass:'',
                unidad:'',
                dependiente:'',
                sigla:'',
                foto:''
            },
            datos:{
                cif:0,
                nombre:'',
                apellido:''
            },
            asistencia:{
                cif:0,
                codigo:0,
                tipo:0,
                caracteristica:0
            }
        }
    },
    created(){
        //Creamos los Sercicios
        this.uploadService = new UploadService();
        this.inventarioService = new InventarioService();
    },
    mounted(){
        
    },
    updated(){
        this.egovf = this.mscc; // pasamos el props a objeto egovf
        if(this.egovf.cif > 0 && this.getPB)
        {
            this.getPB = false; // cambiamos el valor para evitar la actualizacion constante
            this.getUbicacionCif();
            this.getCpuCif();
            this.getMonitorCif();
            this.getImpresoraCif();
            this.getTelefonoCif();
            this.getTipo();
            this.getPerteneceCif();
            
        }
        this.datos.cif = this.egovf.cif;
        this.datos.nombre = this.egovf.nombre;
        this.datos.apellido = this.egovf.paterno+' '+this.egovf.materno;
    },
    methods:{

        async getUbicacionCif(){
            await this.inventarioService.getUbicacionCif(this.egovf.cif).then(response => {
                this.listaUbicacion = response.data;
            });
        },
        async getCpuCif(){// funcion que trae una lista de cpus del empleado
            await this.inventarioService.getCpuCif(this.egovf.cif).then(response => {
                this.listaCpu = response.data;
            });
        },
        async getMonitorCif(){// funcion que trae una lista de Monitores
            await this.inventarioService.getMonitorCif(this.egovf.cif).then(response => {
                this.listaMonitor = response.data;
            });
        },
        async getImpresoraCif(){
            await this.inventarioService.getImpresoraCif(this.egovf.cif).then(response => {
                this.listaImpresora = response.data;
            });
        },
        async getTelefonoCif(){
            await this.inventarioService.getTelefonoCif(this.egovf.cif).then(response => {
                this.listaTelefono = response.data;
            });
        },

        async getTipo(){
            await this.inventarioService.getTipo().then(response => {
                this.listaTipo = response.data;
            });
        },
        async getPerteneceCif(){
            await this.inventarioService.getPerteneceCif(this.egovf.cif).then(response => {
                this.listaPertenece = response.data;
            });
        },
        getCodigo(){
            var tipo = this.asistencia.tipo 
            if(this.asistencia.tipo == 5)
            {
                tipo = 1;
            }
            this.lpertenece = [];
            var e ={
                id:0,
                codigo:0
            };
            this.listaPertenece.forEach(pertenece => {
                if(pertenece._06idtipo == tipo){
                    e.id = pertenece.id;
                    e.codigo = pertenece._02codigo;
                    this.lpertenece.push(e);
                    return false;
                }
            });
        },

        selectFile(){// Funcion que permite cambiar los datos del archivo
            this.archivo = this.$refs.file.files[0];
        },
        async downloadImg(Url,nombre) {// Funcion que permite Descargar imagen o documento
            const blob = await (await fetch(Url)).blob();
            const url = URL.createObjectURL(blob);
            Object.assign(document.createElement('a'), { href: url, download: nombre }).click();
            URL.revokeObjectURL(url);
        },
        clicktabScc(tabH){
            this.tabScc = tabH;
        },
        clickModalAt(at){
            this.modalAt = at;
        },
        clickModalObs(cio){
            this.modalObs = cio;
        },
        clickModalObsEditar(cio){
            this.modalObsEditar = cio;
        },
        clickModalMes(rmes){
            if(this.egovf.foto =='https://fhcevirtual.umsa.bo/egovf-img/imagenes/user.png')
                this.getFotoPerfil()
            else
                this.modalMes = rmes;
        },
        clickModalDias(dias){
            if(this.egovf.foto =='https://fhcevirtual.umsa.bo/egovf-img/imagenes/user.png')
                this.getFotoPerfil()
            else
                this.modalDias = dias;
        },

        clicktabInv(tabI){
            this.tabInv = tabI;
        },
    }
}
</script>
<style scoped>
@import 'datatables.net-dt';
</style>
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

                        <!--Lista de At del Empleado-->
                        <CTabPane :visible="tabInv == 1">
                            <CRow>
                                <CCol :lg="12" class="table-responsive">
                                    <table id="atTabla" class="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th><th>Resumen</th><th>Datos de Solicitud</th><th>Datos de Solucion</th><th>Estado</th><th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="atencion in listaAtencion" :key="atencion.id">
                                                <td>{{ atencion.id }}</td>                                                
                                                <td>{{ atencion.equipo }}<br>{{ atencion.codigo }}</td>
                                                <td>
                                                    Fecha : {{ atencion.fechasolicitud }}<br>Hora : {{ atencion.horasolicitud }}
                                                </td>
                                                <td>
                                                    Fecha : {{ atencion.fechaatencion }}<br>Hora : {{ atencion.atencion }}
                                                </td>
                                                <td>
                                                    <CBadge color="success" v-if="atencion.estado === 1 ">Solicitud Atendida</CBadge>
                                                    <CBadge color="warning" v-else>En Espera</CBadge>
                                                </td>
                                                <td>
                                                    <CButtonGroup role="group">
                                                        <CButton color="success" class="font" size="sm" @click="getAtencionDetalle(atencion.id)"><CIcon icon="cil-featured-playlist"></CIcon></CButton>
                                                        <CButton color="warning" class="font" size="sm" @click="getAtUpdate(atencion.id)"><CIcon icon="cil-pencil"></CIcon></CButton>
                                                    </CButtonGroup> 
                                                </td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                </CCol>
                            </CRow>
                        </CTabPane>
                        <!-- End Lista de At del Empleado-->

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
                                                    Fecha de Adicion : {{ cpu.fecha_add }}<br>Fecha de Traspaso : {{ cpu.fecha_del }}<br>Estado : <CBadge color="success" v-if="cpu.estado == 1">Activo</CBadge><CBadge color="danger" v-else>Inactivo</CBadge>
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
                <form @submit.prevent="addAtencion()">

                    <div class="mb-3 row">
                        <label for="tipo" class="col-4 col-form-label">Revicion a :</label>
                        <div class="col-8">
                            <select class="form-control" v-model="atencion.tipo" required="true" @change="getCodigo()">
                                <option v-for="tipo in listaTipo" :key="tipo.id" :value="tipo.id">{{ tipo._01sigla }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="codigo" class="col-4 col-form-label">Codigo :</label>
                        <div class="col-8">
                            <select class="form-control" v-model="atencion.codigo" required="true">
                                <option v-for="pertenece in lpertenece" :key="pertenece.id"  :value="pertenece.codigo">{{ pertenece.codigo }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="caracteristica" class="col-4 col-form-label">Tipo de Revicion :</label>
                        <div class="col-8">
                            <select class="form-control" v-model="atencion.caracteristica" required="true">
                                <option v-for="tipo in tipocaracteristica" :key="tipo.id"  :value="tipo.id">{{ tipo.detalle }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="detalle" class="col-4 col-form-label">Detalle : </label>
                        <div class="col-8">
                            <textarea class="form-control" v-model="atencion.detalle" required="true"></textarea>
                        </div>
                    </div>

                    <hr> 

                    <div class="mb-3 row text-center" >
                        <div class="col-12 ">
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


<!-- Modal  Atencion Update -->
<CModal :visible="modalAtencionDetalle" @close="clickModalAtencionDetalle(false)" size='lg'>
    <CModalHeader class="headercolor" dismiss @close="clickModalAtencionDetalle(false)">
        <CModalTitle>
            <h5>Detalle Solicitud de Asistencia Tecnica</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos" />
        <CRow>
            <CCol :lg="12">
                <CAlert color="success" v-if="atencionDetalle.estado === 1">Atendido</CAlert>
                <CAlert color="warning" v-else>En Espera</CAlert>

                <div class="mb-3 row">
                    <label for="id" class="col-4 col-form-label"><strong>ID : </strong> {{ atencionDetalle.id }}</label>
                    <label for="tipo" class="col-4 col-form-label"><strong>Tipo : </strong>{{ atencionDetalle.equipo }}</label>
                    <label for="tipo" class="col-4 col-form-label"><strong>Codigo : </strong>{{ atencionDetalle.codigo}}</label>
                </div>
                <hr>
                <div class="mb-3 row">
                    <label for="fecha" class="col-6 col-form-label"><strong>Fecha de Solicitud : </strong></label>
                    <label for="fecha" class="col-6 col-form-label">{{ atencionDetalle.fechasolicitud }} {{ atencionDetalle.horasolicitud }}</label>                    
                </div>
                
                <div class="mb-3 row">
                    <div class="col-4">
                        <ul>
                            <li v-for="resumen in atencionDetalle.resumen" :key="resumen.id">{{ resumen }}</li>                            
                        </ul>
                    </div>
                    <div class="col-8">
                        <ul>
                            <li>Caracteristica : {{ atencionDetalle.caracteristica }}</li>
                            <li>Detalle : {{ atencionDetalle.especificacion }}</li>                            
                        </ul>
                    </div>
                </div>

                <hr>
                <div class="mb-3 row">
                    <label for="fecha" class="col-6 col-form-label"><strong>Fecha de Atencion : </strong></label>
                    <label for="fecha" class="col-6 col-form-label">{{ atencionDetalle.fechaatencion }} {{ atencionDetalle.horaatencion }}</label>                    
                </div>
                
                <div class="mb-3 row">
                    <label for="fecha" class="col-6 col-form-label">Error Encontrado : {{atencionDetalle.error}}</label>
                    <label for="fecha" class="col-6 col-form-label">Solucion : {{atencionDetalle.detalle}}</label>
                </div>
            </CCol>
        </CRow>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalAtencionDetalle(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
    </CModalFooter>
</CModal>
<!-- END Modal  Atencion Detalle-->

<!-- Modal  AT -->
<CModal :visible="modalAtUpdate" @close="clickModalAtUpdate(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalAtUpdate(false)">
        <CModalTitle>
            <h5>Editar Solicitud de Asistencia Tecnica</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos" />
        <CRow>
            <CCol :lg="12">
                <form @submit.prevent="updateAtencion()">

                    <div class="mb-3 row">
                        <label for="tipo" class="col-4 col-form-label">Revicion a :</label>
                        <div class="col-8">
                            <select class="form-control" v-model="atencionDetalle.idtipo" required="true" @change="getCodigoUpdate()">
                                <option v-for="tipo in listaTipo" :key="tipo.id" :value="tipo.id">{{ tipo._01sigla }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="codigo" class="col-4 col-form-label">Codigo :</label>
                        <div class="col-8">
                            <select class="form-control" v-model="atencionDetalle.codigo" required="true">
                                <option v-for="pertenece in lpertenece" :key="pertenece.id"  :value="pertenece.codigo">{{ pertenece.codigo }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="caracteristica" class="col-4 col-form-label">Tipo de Revicion :</label>
                        <div class="col-8">
                            <select class="form-control" v-model="atencionDetalle.idcaracteristica" required="true">
                                <option v-for="tipo in tipocaracteristica" :key="tipo.id"  :value="tipo.id">{{ tipo.detalle }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="detalle" class="col-4 col-form-label">Detalle : </label>
                        <div class="col-8">
                            <textarea class="form-control" v-model="atencionDetalle.especificacion" required="true">
                            </textarea>
                        </div>
                    </div>

                    <hr> 

                    <div class="mb-3 row text-center" >
                        <div class="col-12 ">
                            <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Actualizar Solicitud de Asistencia Tecnica</button>
                        </div>
                    </div>
                </form>
            </CCol>
        </CRow>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalAtUpdate(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
    </CModalFooter>
</CModal>
<!-- END Modal  AT-->


</template>

<script>
// Importamos Componentes
import ComponenteNombres from '@/components/Ciudadano/ComponenteNombres.vue';
//Importamos Servicios
import InventarioService from '@/services/inv/inventarioService';

//Importamos Herramientas 
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import $ from 'jquery';

DataTable.use(DataTablesLib);

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
            modalAtUpdate:false,
            modalAtencionDetalle:false,
            inventarioService:null,
            listaUbicacion:[],
            listaCpu:[],
            listaMonitor:[],
            listaImpresora:[],
            listaTelefono:[],
            listaTipo:[],
            listaPertenece:[],
            lpertenece:[],
            caracteristica:[],
            tipocaracteristica:[],
            listaAtencion:[],
            getPB:true,
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
            atencion:{
                cif:0,
                codigo:0,
                tipo:0,
                caracteristica:0,
                detalle:''
            },
            atencionDetalle:{
                id:0,
                cif:0,
                codigo:'',
                fechasolicitud:'',
                horasolicitud:'',
                equipo:'',
                idtipo:0,
                idcaracteristica:0,
                resumen:[],
                caracteristica:'',
                especificacion:'',
                error:'',
                detalle:'',
                fechaatencion:'',
                horaatencion:'',
                estado:''
            }
        }
    },
    created(){
        //Creamos los Sercicios
        this.inventarioService = new InventarioService();
    },
    mounted(){
    },
    updated(){
        this.egovf = this.mscc; // pasamos el props a objeto egovf
        if(this.egovf.cif > 0 && this.getPB)
        {
            this.getPB = false; // cambiamos el valor para evitar la actualizacion constante
            this.getAtencionCif(); // Llamamos las Atenciones del empleado
            this.getTipo(); // Llamamos el tipo de equipo registrado para el empleado
            this.getPerteneceCif(); // llamamos una lista de equipos pertenecientes al empleado 
            this.getCaracteristica(); // llamamos una lista de posibles caracteristicas de fallas para la atencion
        }
        this.datos.cif = this.egovf.cif;
        this.datos.nombre = this.egovf.nombre;
        this.datos.apellido = this.egovf.paterno+' '+this.egovf.materno;
    },
    methods:{
        tablaAtencion(){
            this.$nextTick(()=>{
                $('#atTabla').DataTable();
            });
        },
        async getAtencionCif(){ // Funcion que trae una lista de atenciones del empleado
            await this.inventarioService.getAtencionCif(this.egovf.cif).then(response => {
                this.listaAtencion = response.data;
                this.tablaAtencion();
                this.getUbicacionCif(); // llamamos una lista de ubicaciones del empleado 
            });
        },
        async getUbicacionCif(){// Funcion que trae una lista de Ubicaciones del usuario
            await this.inventarioService.getUbicacionCif(this.egovf.cif).then(response => {
                this.listaUbicacion = response.data;
                this.getCpuCif();// llamamos una lista de Cpu del en pleado
            });
        },
        async getCpuCif(){// funcion que trae una lista de cpus del empleado
            await this.inventarioService.getCpuCif(this.egovf.cif).then(response => {
                this.listaCpu = response.data;
                this.getMonitorCif();
            });
        },
        async getMonitorCif(){// funcion que trae una lista de Monitores del empleado
            await this.inventarioService.getMonitorCif(this.egovf.cif).then(response => {
                this.listaMonitor = response.data;
                this.getImpresoraCif(); //llamamos una lista de Impresoras del empleado
            });
        },
        async getImpresoraCif(){//Funcion que trae una lista de Impresoras del empleado
            await this.inventarioService.getImpresoraCif(this.egovf.cif).then(response => {
                this.listaImpresora = response.data;
                this.getTelefonoCif(); //llamamos una lista de telefonos
            });
        },
        async getTelefonoCif(){//Funcion que trae una lista de telefonos del empleado
            await this.inventarioService.getTelefonoCif(this.egovf.cif).then(response => {
                this.listaTelefono = response.data;
            });
        },

        async getTipo(){//Funcion que trae una lista de tipos de equipos
            await this.inventarioService.getTipo().then(response => {
                this.listaTipo = response.data;
            });
        },
        async getPerteneceCif(){// Funcion que trae uan lista de equipos pertenecientes al empleado
            await this.inventarioService.getPerteneceCif(this.egovf.cif).then(response => {
                this.listaPertenece = response.data;
            });
        },
        getCodigo(){//Funcion que nos debuelve una lista de codigos del equipo
            var tipo = this.atencion.tipo 
            if(this.atencion.tipo == 5)
            {
                tipo = 1;
            }
            this.lpertenece = [];
            this.listaPertenece.forEach(pertenece => {
                var e ={
                    id:0,
                    codigo:0
                };
                if(pertenece._06idtipo == tipo){
                    e.id = pertenece.id;
                    e.codigo = pertenece._02codigo;
                    this.lpertenece.push(e);
                    return false;
                }
            });
            this.getTipoCaracteristica();// llamamos una lista de caracteristicas de errores 
        },
        getCodigoUpdate(){// Funcion que nos debuelve una lista de codigos para realizar uan actualzacion
            var tipo = this.atencionDetalle.idtipo 
            if(this.atencionDetalle.idtipo == 5)
            {
                tipo = 1;
            }
            this.lpertenece = [];
            this.listaPertenece.forEach(pertenece => {
                var e ={
                    id:0,
                    codigo:0
                };
                if(pertenece._06idtipo == tipo){
                    e.id = pertenece.id;
                    e.codigo = pertenece._02codigo;
                    this.lpertenece.push(e);
                    return false;
                }
            });
            this.getTipoCaracteristicaUpdate();// llamamos una lista de caracteristicas para la actualizacion
        },
        async getCaracteristica(){// Funcion que trae una lista de Caracteristicas de error
            await this.inventarioService.getCaracteristica().then(response => {
                this.caracteristica = response.data;
            });
        },
        getTipoCaracteristica(){// Funcion que permite unir y discriminar el tipo de caracteristica 
            this.tipocaracteristica = [];
            this.caracteristica.forEach(c => {
                var e = {
                    id:0,
                    idtipo:0,
                    detalle:''
                };
                if(c._01idtipo == this.atencion.tipo){
                    e.id = c.id;
                    e.idtipo = c._01idtipo;
                    e.detalle = c._02detalle;
                    this.tipocaracteristica.push(e);
                }
            });
        },
        getTipoCaracteristicaUpdate(){// Funcion que permite unir y discriminar el tipo de caracteristica para la Actualizacion
            this.tipocaracteristica = [];
            this.caracteristica.forEach(c => {
                var e = {
                    id:0,
                    idtipo:0,
                    detalle:''
                };
                if(c._01idtipo == this.atencionDetalle.idtipo){
                    e.id = c.id;
                    e.idtipo = c._01idtipo;
                    e.detalle = c._02detalle;
                    this.tipocaracteristica.push(e);
                }
            });
        },
        async addAtencion(){// funcion para Agregar  Una Atencion
            this.atencion.cif = this.egovf.cif;
            await this.$swal.fire({
                title: 'Desea Solicitar Asistencia Tecnica ?',
                showDenyButton: true,
                icon:'info',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.inventarioService.addAtencion(this.atencion).then(response =>{
                        if(response.status == 200){
                            this.$swal.fire('La Solicitud fue enviada a la unidad correctamente, espere la llamada de los técnicos correspondientes.','', 'success').then((res)=>{
                                if(res)
                                    location.reload();
                            });
                        }
                        else{
                            this.$swal.fire('Los Datos no fueron Guardados Error', ''+ response.status, 'error');
                        }
                    });
                    
                } else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });
        },

        async updateAtencion(){// funcion para Actualizar Una Atencion
            await this.$swal.fire({
                title: 'Desea Actualizar su Solicitud Asistencia Tecnica ?',
                showDenyButton: true,
                icon:'info',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.inventarioService.updateAtencion(this.atencionDetalle).then(response =>{
                        if(response.status == 200){
                            this.$swal.fire('La Solicitud fue Actualizada y enviada a la unidad correctamente, espere la llamada de los técnicos correspondientes.','', 'success').then((res)=>{
                                if(res)
                                    location.reload();
                            });
                        }
                        else{
                            this.$swal.fire('Los Datos no fueron Guardados Error', ''+ response.status, 'error');
                        }
                    });
                    
                } else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });
        },
        getAtencionDetalle(id){// Funcion que Muestra el detalle de las Atenciones del Empleado
            this.listaAtencion.forEach(atencion =>{
                if(atencion.id === id){
                    this.atencionDetalle.id = atencion.id,
                    this.atencionDetalle.cif = atencion.cif,
                    this.atencionDetalle.codigo = atencion.codigo,
                    this.atencionDetalle.fechasolicitud = atencion.fechasolicitud,
                    this.atencionDetalle.horasolicitud = atencion.horasolicitud,
                    this.atencionDetalle.equipo = atencion.equipo,
                    this.atencionDetalle.resumen = atencion.resumen,
                    this.atencionDetalle.caracteristica = atencion.caracteristica,
                    this.atencionDetalle.especificacion = atencion.especificacion,
                    this.atencionDetalle.error = atencion.error,
                    this.atencionDetalle.detalle = atencion.detalle,
                    this.atencionDetalle.fechaatencion = atencion.fechaatencion,
                    this.atencionDetalle.horaatencion = atencion.horaatencion,
                    this.atencionDetalle.estado = atencion.estado
                }
            });
            this.clickModalAtencionDetalle(true);
        },
        getAtUpdate(id){// Funcion para editar las Atenciones del Empleado
            this.listaAtencion.forEach(atencion =>{
                if(atencion.id === id){
                    this.atencionDetalle.id = atencion.id,
                    this.atencionDetalle.cif = atencion.cif,
                    this.atencionDetalle.codigo = atencion.codigo,
                    this.atencionDetalle.fechasolicitud = atencion.fechasolicitud,
                    this.atencionDetalle.horasolicitud = atencion.horasolicitud,
                    this.atencionDetalle.equipo = atencion.equipo,
                    this.atencionDetalle.resumen = atencion.resumen,
                    this.atencionDetalle.caracteristica = atencion.caracteristica,
                    this.atencionDetalle.especificacion = atencion.especificacion,
                    this.atencionDetalle.error = atencion.error,
                    this.atencionDetalle.detalle = atencion.detalle,
                    this.atencionDetalle.fechaatencion = atencion.fechaatencion,
                    this.atencionDetalle.horaatencion = atencion.horaatencion,
                    this.atencionDetalle.estado = atencion.estado,
                    this.atencionDetalle.idtipo = atencion.idtipo,
                    this.atencionDetalle.idcaracteristica = atencion.idcaracteristica
                }
            });
            this.getCodigoUpdate();
            this.clickModalAtUpdate(true);
        },
        clickModalAt(at){
            this.modalAt = at;
        },
        clickModalAtUpdate(at){
            this.modalAtUpdate = at;
        },
        clickModalAtencionDetalle(detalle){
            this.modalAtencionDetalle = detalle;
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